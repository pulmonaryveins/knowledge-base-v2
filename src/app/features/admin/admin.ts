import { Component, effect, inject, signal, computed, untracked, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import {
  LucideAngularModule,
  UserPlus, Pencil, Trash2, Shield, User, ArrowLeft, LogOut, X, Check, Users, Search,
  ChevronLeft, ChevronRight, ChevronDown, FileText, Link, Upload, ExternalLink, FolderPlus, Folder, Plus, GripVertical,
} from 'lucide-angular';
import { AuthService } from '../../core/services/auth.service';
import { ToastService } from '../../core/services/toast.service';
import { RdDocumentsService } from '../../core/services/rd-documents.service';
import { RdSectionsService } from '../../core/services/rd-sections.service';
import type { AdminUserRecord, UserRole } from '../../core/models/profile.model';
import type { RdDocument } from '../../core/models/rd-document.model';
import type { RdSection } from '../../core/models/rd-section.model';

/** Modal can be in create-new or edit-existing mode. */
type ModalMode = 'create' | 'edit';

/** Active tab in the admin panel. */
type AdminTab = 'users' | 'documents';

/** Document modal can be in create-new or edit-existing mode. */
type DocModalMode = 'create' | 'edit';

/** How the document URL is provided — upload a file or paste an external link. */
type DocLinkType = 'upload' | 'url';

/**
 * Stricter email validator than Angular's built-in `Validators.email`.
 *
 * Requires a proper local part, a domain with at least one dot, and a
 * TLD of at least two characters — rejects values like `user@localhost`
 * or `dwad@ddwad`.
 *
 * @param ctrl The form control being validated.
 * @returns `{ email: true }` when the value fails the regex; `null` when valid or empty.
 */
const EMAIL_RE = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;
function strictEmail(ctrl: AbstractControl): ValidationErrors | null {
  const v = ctrl.value as string;
  return !v || EMAIL_RE.test(v.trim()) ? null : { email: true };
}

/**
 * Admin panel smart component — user management for the NCompassTV Dev Portal.
 *
 * Provides a full CRUD interface for portal users:
 * - Lists all Supabase auth users with their profiles
 * - Creates new users via the `admin-users` Edge Function
 * - Edits email, full name, password, and role
 * - Deletes users with last-admin protection
 *
 * Access is guarded by `AdminGuard` — only users with `role === 'admin'`
 * can reach this route.
 */
@Component({
  selector: 'app-admin',
  imports: [ReactiveFormsModule, LucideAngularModule],
  templateUrl: './admin.html',
  styleUrl: './admin.scss',
})
export class Admin implements OnInit {
  private readonly _auth      = inject(AuthService);
  private readonly _router    = inject(Router);
  private readonly _fb        = inject(FormBuilder);
  private readonly _toast     = inject(ToastService);
  private readonly _rdDocs    = inject(RdDocumentsService);
  private readonly _rdSections = inject(RdSectionsService);

  // ── Table state ────────────────────────────────────────────────────────────

  /** Full list of users returned by the admin Edge Function. */
  protected readonly users      = signal<AdminUserRecord[]>([]);
  /** True while the initial or refresh fetch is in-flight. */
  protected readonly isLoading  = signal(true);
  /** Error message to display in the table-level error banner. */
  protected readonly tableError = signal<string | null>(null);

  // ── Create / Edit modal state ──────────────────────────────────────────────

  /** Controls modal visibility. */
  protected readonly modalOpen  = signal(false);
  /** Distinguishes between create and edit flows. */
  protected readonly modalMode  = signal<ModalMode>('create');
  /** Error message shown inside the modal banner. */
  protected readonly modalError = signal<string | null>(null);
  /** True while the save request is in-flight — disables the submit button. */
  protected readonly isSaving   = signal(false);
  /** Supabase user ID of the record being edited; `null` in create mode. */
  protected readonly editingId  = signal<string | null>(null);

  // ── Delete confirmation state ──────────────────────────────────────────────

  /** The user record staged for deletion; `null` when no confirmation is open. */
  protected readonly deleteTarget = signal<AdminUserRecord | null>(null);
  /** True while the delete request is in-flight — disables the confirm button. */
  protected readonly isDeleting   = signal(false);
  /** Error message shown inside the delete confirmation modal. */
  protected readonly deleteError  = signal<string | null>(null);

  // ── Derived state ──────────────────────────────────────────────────────────

  /** The currently signed-in user's ID — prevents self-deletion. */
  protected readonly currentUserId = computed(() => this._auth.user()?.id);

  /** Number of users with `role === 'admin'`. */
  protected readonly adminCount  = computed(() => this.users().filter(u => u.role === 'admin').length);
  /** Number of users with `role === 'member'`. */
  protected readonly memberCount = computed(() => this.users().filter(u => u.role === 'member').length);

  /** True when only one admin exists — blocks deletion of that account. */
  protected readonly isLastAdmin = computed(() => this.adminCount() === 1);
  /** True when the current delete target has the `admin` role. */
  protected readonly deleteTargetIsAdmin = computed(() => this.deleteTarget()?.role === 'admin');

  // ── Search / Filter ────────────────────────────────────────────────────────

  /** Current value of the search input. */
  protected readonly searchQuery = signal('');
  /** Active role filter tab: `'all'` | `'admin'` | `'member'`. */
  protected readonly roleFilter  = signal<'all' | 'admin' | 'member'>('all');

  /**
   * Users filtered by the active role tab and search query.
   * Re-computes reactively whenever `users`, `searchQuery`, or `roleFilter` change.
   */
  protected readonly filteredUsers = computed(() => {
    const q    = this.searchQuery().toLowerCase().trim();
    const role = this.roleFilter();
    return this.users().filter(u => {
      const matchesRole   = role === 'all' || u.role === role;
      const matchesSearch = !q ||
        (u.full_name?.toLowerCase().includes(q) ?? false) ||
        u.email.toLowerCase().includes(q);
      return matchesRole && matchesSearch;
    });
  });

  // ── Pagination ─────────────────────────────────────────────────────────────

  /** Number of rows per page. */
  protected readonly pageSize   = signal(7);
  /** Zero-based index of the current page. */
  protected readonly pageIndex  = signal(0);
  /** Total number of pages given the current filtered list. */
  protected readonly totalPages = computed(() =>
    Math.max(1, Math.ceil(this.filteredUsers().length / this.pageSize()))
  );
  /** Slice of `filteredUsers` for the current page. */
  protected readonly paginatedUsers = computed(() => {
    const start = this.pageIndex() * this.pageSize();
    return this.filteredUsers().slice(start, start + this.pageSize());
  });
  /** 1-based index of the first visible row (for the "Showing X–Y" label). */
  protected readonly pageStart = computed(() => this.pageIndex() * this.pageSize() + 1);
  /** 1-based index of the last visible row. */
  protected readonly pageEnd   = computed(() =>
    Math.min(this.filteredUsers().length, (this.pageIndex() + 1) * this.pageSize())
  );

  // ── Tab state ──────────────────────────────────────────────────────────────

  /** Active top-level tab in the admin panel (`'users'` | `'documents'`). */
  protected readonly activeTab = signal<AdminTab>('users');

  // ── R&D Documents state ────────────────────────────────────────────────────

  /** Full list of R&D documents returned by the Edge Function. */
  protected readonly documents      = signal<RdDocument[]>([]);
  /** True while the documents fetch is in-flight. */
  protected readonly docsLoading    = signal(false);
  /** Error message shown in the documents table-level error banner. */
  protected readonly docsError      = signal<string | null>(null);

  /** Controls document create/edit modal visibility. */
  protected readonly docModalOpen   = signal(false);
  /** Distinguishes create vs. edit doc flows. */
  protected readonly docModalMode   = signal<DocModalMode>('create');
  /** Error message shown inside the document modal. */
  protected readonly docModalError  = signal<string | null>(null);
  /** True while the document save request is in-flight. */
  protected readonly docSaving      = signal(false);
  /** UUID of the document being edited; `null` in create mode. */
  protected readonly editingDocId   = signal<string | null>(null);

  /** Tracks whether the user has attempted to submit, to show section validation errors. */
  protected readonly docSectionTouched = signal(false);
  /** Whether the user wants to upload a file or paste a URL. */
  protected readonly docLinkType    = signal<DocLinkType>('url');
  /** The `File` object staged for upload (only set when `docLinkType === 'upload'`). */
  protected readonly stagedFile     = signal<File | null>(null);

  /** Display name of the staged file for the UI. */
  protected readonly stagedFileName = signal<string>('');
  /** R&D document staged for deletion. */
  protected readonly deleteDocTarget = signal<RdDocument | null>(null);
  /** True while the document delete request is in-flight. */
  protected readonly docDeleting     = signal(false);

  /** Error shown inside the document delete confirmation. */
  protected readonly deleteDocError  = signal<string | null>(null);

  // ── Section management state ───────────────────────────────────────────────

  /** Full list of sections (with subsections) loaded from rd_sections table. */
  protected readonly sections         = signal<RdSection[]>([]);
  /** True while sections are being loaded or saved. */
  protected readonly sectionsLoading  = signal(false);
  /** Controls the section management modal visibility. */
  protected readonly secMgmtOpen      = signal(false);
  /** Inline error inside the section management modal. */
  protected readonly secMgmtError     = signal<string | null>(null);
  /** Input value for the new section name field. */
  protected readonly newSectionInput  = signal('');
  /** ID of the section currently being renamed; null when none. */
  protected readonly editingSecId     = signal<string | null>(null);
  /** Current value inside the rename input field. */
  protected readonly editingSecInput  = signal('');
  /** ID of the section being dragged. */
  protected readonly dragSectionId   = signal<string | null>(null);
  /** ID of the section currently hovered during drag (drop target). */
  protected readonly dragOverSecId   = signal<string | null>(null);
  /** True while a section mutation (create / rename / delete / reorder) is in flight. */
  protected readonly secMgmtSaving   = signal(false);
  /** ID of the currently expanded section (only one at a time); null when none. */
  protected readonly expandedSecId   = signal<string | null>(null);
  /** ID of the document currently being dragged (to move between sections). */
  protected readonly dragDocId       = signal<string | null>(null);
  /** ID of the document row currently under the drag cursor. */
  protected readonly dragDocOverId   = signal<string | null>(null);

  /**
   * The section dropdown value in the doc modal.
   * `''` = no section, any other string = existing section name.
   */
  protected readonly docSectionSelect    = signal<string>('');

  /** Unique section names sourced exclusively from the rd_sections table. */
  protected readonly availableSections = computed<string[]>(() =>
    this.sections().map(s => s.name)
  );

  /** Documents grouped by section name, each group sorted by position. */
  protected readonly docsBySection = computed<Map<string, RdDocument[]>>(() => {
    const map = new Map<string, RdDocument[]>();
    for (const sec of this.sections()) map.set(sec.name, []);
    for (const doc of this.documents()) {
      const key = doc.section?.trim() || '';
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(doc);
    }
    for (const docs of map.values()) {
      docs.sort((a, b) => (a.position ?? 0) - (b.position ?? 0));
    }
    return map;
  });

  /**
   * Per-section document counts shown in the Documents tab overview.
   * Sections with no label are grouped under `'(No section)'`.
   */
  protected readonly sectionStats = computed(() => {
    const map = new Map<string, number>();
    for (const doc of this.documents()) {
      const key = doc.section?.trim() || '(No section)';
      map.set(key, (map.get(key) ?? 0) + 1);
    }
    return [...map.entries()]
      .map(([section, count]) => ({ section, count }))
      .sort((a, b) => {
        if (a.section === '(No section)') return 1;
        if (b.section === '(No section)') return -1;
        return a.section.localeCompare(b.section);
      });
  });

  // ── Docs search / filter / pagination ────────────────────────────────────

  /** Search query for the documents table. */
  protected readonly docSearchQuery  = signal('');
  /** Active section filter; `'all'` means no filter. */
  protected readonly docSectionFilter  = signal<string>('all');
  /** Controls the custom section filter dropdown visibility. */
  protected readonly docDropdownOpen            = signal(false);
  /** Controls the custom section dropdown in the add/edit document modal. */
  protected readonly docSectionModalDropdownOpen = signal(false);
  /** Zero-based page index for the documents table. */
  protected readonly docPageIndex      = signal(0);
  /** Rows per page for the documents table (fixed at 7). */
  protected readonly docPageSize     = 7;

  /** Documents filtered by search query and section filter. */
  protected readonly filteredDocs = computed(() => {
    const q   = this.docSearchQuery().toLowerCase().trim();
    const sec = this.docSectionFilter();
    return this.documents().filter(doc => {
      const matchesSec    = sec === 'all' || (doc.section?.trim() || '(No section)') === sec;
      const matchesSearch = !q || doc.title.toLowerCase().includes(q) ||
                            (doc.section ?? '').toLowerCase().includes(q);
      return matchesSec && matchesSearch;
    });
  });

  /** Total pages for docs pagination. */
  protected readonly docTotalPages = computed(() =>
    Math.max(1, Math.ceil(this.filteredDocs().length / this.docPageSize))
  );

  /** Slice of filteredDocs for the current page. */
  protected readonly paginatedDocs = computed(() => {
    const start = this.docPageIndex() * this.docPageSize;
    return this.filteredDocs().slice(start, start + this.docPageSize);
  });

  /** 1-based first row index for the "Showing X–Y" label. */
  protected readonly docPageStart = computed(() =>
    this.filteredDocs().length === 0 ? 0 : this.docPageIndex() * this.docPageSize + 1
  );

  /** 1-based last row index for the "Showing X–Y" label. */
  protected readonly docPageEnd = computed(() =>
    Math.min(this.filteredDocs().length, (this.docPageIndex() + 1) * this.docPageSize)
  );

  /** Section names available as filter options (from loaded sections + 'all'). */
  protected readonly docFilterSections = computed<string[]>(() =>
    this.sections().map(s => s.name)
  );

  /** Navigate to previous docs page. */
  protected prevDocPage(): void {
    this.docPageIndex.update(p => Math.max(0, p - 1));
  }

  /** Navigate to next docs page. */
  protected nextDocPage(): void {
    this.docPageIndex.update(p => Math.min(this.docTotalPages() - 1, p + 1));
  }

  /** Set docs section filter and reset to first page. */
  protected setDocSectionFilter(sec: string): void {
    this.docSectionFilter.set(sec);
    this.docPageIndex.set(0);
  }

  /** Toggle the custom section filter dropdown open/closed. */
  protected toggleDocDropdown(): void {
    this.docDropdownOpen.update(v => !v);
  }

  /** Select a section from the custom dropdown and close it. */
  protected pickDocSection(sec: string): void {
    this.setDocSectionFilter(sec);
    this.docDropdownOpen.set(false);
  }

  /** Toggle the section dropdown inside the add/edit document modal. */
  protected toggleDocSectionModal(): void {
    this.docSectionModalDropdownOpen.update(v => !v);
  }

  /** Pick a section inside the document modal and close its dropdown. */
  protected pickDocSectionModal(sec: string): void {
    this.onSectionChange(sec);
    this.docSectionTouched.set(true);
    this.docSectionModalDropdownOpen.set(false);
  }

  /** Called on search input — resets to first page. */
  protected onDocSearch(q: string): void {
    this.docSearchQuery.set(q);
    this.docPageIndex.set(0);
  }

  // ── Icon references ────────────────────────────────────────────────────────
  protected readonly UserPlusIcon      = UserPlus;
  protected readonly PencilIcon        = Pencil;
  protected readonly Trash2Icon        = Trash2;
  protected readonly ShieldIcon        = Shield;
  protected readonly UserIcon          = User;
  protected readonly ArrowLeftIcon     = ArrowLeft;
  protected readonly LogOutIcon        = LogOut;
  protected readonly XIcon             = X;
  protected readonly CheckIcon         = Check;
  protected readonly UsersIcon         = Users;
  protected readonly SearchIcon        = Search;
  protected readonly ChevronLeftIcon   = ChevronLeft;
  protected readonly ChevronRightIcon  = ChevronRight;
  protected readonly FileTextIcon      = FileText;
  protected readonly LinkIcon          = Link;
  protected readonly UploadIcon        = Upload;
  protected readonly ExternalLinkIcon  = ExternalLink;
  protected readonly FolderPlusIcon    = FolderPlus;
  protected readonly FolderIcon        = Folder;
  protected readonly PlusIcon          = Plus;
  protected readonly GripVerticalIcon  = GripVertical;
  protected readonly ChevronDownIcon   = ChevronDown;

  // ── Reactive form ──────────────────────────────────────────────────────────

  /**
   * Shared form used by both create and edit user modals.
   * Password validators are swapped dynamically:
   * - Create: required + minLength(8)
   * - Edit: optional, but minLength(8) if a value is provided
   */
  protected readonly form = this._fb.nonNullable.group({
    fullName: ['', Validators.required],
    email:    ['', [Validators.required, strictEmail]],
    password: ['', Validators.minLength(8)],
    role:     ['member' as UserRole, Validators.required],
  });

  /**
   * Form for the R&D document create/edit modal.
   * `externalUrl` is only required when `docLinkType === 'url'`.
   */
  protected readonly docForm = this._fb.nonNullable.group({
    title:       ['', Validators.required],
    externalUrl: [''],
  });

  constructor() {
    // Reset to page 1 whenever the search query or role filter changes
    effect(() => {
      this.searchQuery();
      this.roleFilter();
      untracked(() => this.pageIndex.set(0));
    });
  }

  /** Loads users on first render. */
  async ngOnInit(): Promise<void> {
    await this._loadUsers();
  }

  // ── Tab navigation ─────────────────────────────────────────────────────────

  /**
   * Switches the active admin tab and lazy-loads documents on first visit.
   *
   * @param tab The tab to activate (`'users'` | `'documents'`).
   */
  protected async switchTab(tab: AdminTab): Promise<void> {
    this.activeTab.set(tab);
    if (tab === 'documents') {
      if (this.documents().length === 0 && !this.docsLoading()) {
        await this._loadDocuments();
      }
      if (this.sections().length === 0 && !this.sectionsLoading()) {
        await this._loadSections();
      }
    }
  }

  // ── Modal actions ──────────────────────────────────────────────────────────

  /**
   * Resets the form to create-mode defaults and opens the modal.
   * Password is required when creating a new user.
   */
  protected openCreateModal(): void {
    this.form.reset({ role: 'member' });
    this.form.controls.password.setValidators([Validators.required, Validators.minLength(8)]);
    this.form.controls.password.updateValueAndValidity();
    this.modalMode.set('create');
    this.editingId.set(null);
    this.modalError.set(null);
    this.modalOpen.set(true);
  }

  /**
   * Pre-fills the form with the given user's data and opens the modal in edit mode.
   * Password is optional — leaving it blank preserves the existing password.
   *
   * @param user The user record to edit.
   */
  protected openEditModal(user: AdminUserRecord): void {
    this.form.reset({
      fullName: user.full_name ?? '',
      email:    user.email,
      password: '',
      role:     user.role,
    });
    this.form.controls.password.setValidators(
      (v) => v.value ? Validators.minLength(8)(v) : null
    );
    this.form.controls.password.updateValueAndValidity();
    this.modalMode.set('edit');
    this.editingId.set(user.id);
    this.modalError.set(null);
    this.modalOpen.set(true);
  }

  /** Closes the create/edit modal without saving. */
  protected closeModal(): void {
    this.modalOpen.set(false);
  }

  /**
   * Validates the form, checks for duplicate email, then calls the appropriate
   * admin API method (create or update). Shows a success toast on completion
   * and refreshes the user list in the background.
   */
  protected async onSave(): Promise<void> {
    this.form.markAllAsTouched();
    if (this.form.invalid || this.isSaving()) return;

    this.isSaving.set(true);
    this.modalError.set(null);

    const { fullName, email, password, role } = this.form.getRawValue();

    // Duplicate email guard — skip the current record on edit
    const duplicate = this.users().find(u =>
      u.email.toLowerCase() === email.toLowerCase() &&
      u.id !== this.editingId()
    );
    if (duplicate) {
      this.modalError.set('A user with this email address already exists.');
      this.isSaving.set(false);
      return;
    }

    try {
      if (this.modalMode() === 'create') {
        await this._auth.adminCreateUser({ fullName, email, password, role });
      } else {
        await this._auth.adminUpdateUser({
          userId: this.editingId()!,
          fullName,
          email,
          role,
          ...(password ? { password } : {}),
        });
      }
      const mode = this.modalMode();
      this.modalOpen.set(false);
      this._toast.show(
        mode === 'create' ? 'User created successfully.' : 'User updated successfully.',
        'success'
      );
      await this._loadUsers();
    } catch (err: unknown) {
      this.modalError.set(err instanceof Error ? err.message : 'An error occurred.');
    } finally {
      this.isSaving.set(false);
    }
  }

  // ── Delete actions ─────────────────────────────────────────────────────────

  /**
   * Stages the given user for deletion and opens the confirmation dialog.
   *
   * @param user The user record the admin wants to delete.
   */
  protected confirmDelete(user: AdminUserRecord): void {
    this.deleteError.set(null);
    this.deleteTarget.set(user);
  }

  /** Closes the delete confirmation dialog without deleting. */
  protected cancelDelete(): void {
    this.deleteTarget.set(null);
    this.deleteError.set(null);
  }

  /**
   * Executes the deletion of the staged user after passing all guards:
   * - Cannot delete the currently signed-in user (UI hides the button).
   * - Cannot delete the last remaining admin account.
   *
   * Shows a success toast and refreshes the list on completion.
   */
  protected async executeDelete(): Promise<void> {
    const target = this.deleteTarget();
    if (!target || this.isDeleting()) return;

    if (target.role === 'admin' && this.isLastAdmin()) {
      this.deleteError.set('Cannot delete the only admin account. Promote another user to admin first.');
      return;
    }

    this.isDeleting.set(true);
    try {
      const name = target.full_name ?? target.email;
      await this._auth.adminDeleteUser(target.id);
      this.deleteTarget.set(null);
      this.deleteError.set(null);
      this._toast.show(`"${name}" has been removed.`, 'success');
      await this._loadUsers();
    } catch (err: unknown) {
      this.deleteError.set(err instanceof Error ? err.message : 'Delete failed.');
    } finally {
      this.isDeleting.set(false);
    }
  }

  // ── Pagination helpers ─────────────────────────────────────────────────────

  /** Navigates to the previous page if one exists. */
  protected prevPage(): void {
    if (this.pageIndex() > 0) this.pageIndex.update(p => p - 1);
  }

  /** Navigates to the next page if one exists. */
  protected nextPage(): void {
    if (this.pageIndex() < this.totalPages() - 1) this.pageIndex.update(p => p + 1);
  }

  // ── Navigation ─────────────────────────────────────────────────────────────

  /** Navigates back to the main portal. */
  protected goToPortal(): void {
    this._router.navigate(['/portal']);
  }

  /** Shows a sign-out toast then ends the Supabase session and redirects to login. */
  protected async signOut(): Promise<void> {
    this._toast.show('Signed out successfully.', 'info');
    await this._auth.signOut();
  }

  // ── Document modal actions ─────────────────────────────────────────────────

  /**
   * Resets the document form to create-mode defaults and opens the modal.
   * Defaults to URL link type.
   */
  protected openCreateDocModal(): void {
    this.docForm.reset({ title: '', externalUrl: '' });
    this.docModalMode.set('create');
    this.editingDocId.set(null);
    this.docModalError.set(null);
    this.docLinkType.set('url');
    this.stagedFile.set(null);
    this.stagedFileName.set('');
    this.docSectionSelect.set('');
    this.docSectionTouched.set(false);
    this.docSectionModalDropdownOpen.set(false);
    this.docModalOpen.set(true);
  }

  /**
   * Pre-fills the document form with the given record's data and opens the
   * modal in edit mode.
   *
   * @param doc The document record to edit.
   */
  protected openEditDocModal(doc: RdDocument): void {
    this.docForm.reset({
      title:       doc.title,
      externalUrl: doc.file_path ? '' : doc.url,
    });
    this.docModalMode.set('edit');
    this.editingDocId.set(doc.id);
    this.docModalError.set(null);
    this.docLinkType.set(doc.file_path ? 'upload' : 'url');
    this.stagedFile.set(null);
    this.stagedFileName.set(doc.file_path ? doc.url.split('/').pop() ?? '' : '');
    this.docSectionSelect.set(doc.section ?? '');
    this.docSectionTouched.set(false);
    this.docSectionModalDropdownOpen.set(false);
    this.docModalOpen.set(true);
  }

  /** Closes the document create/edit modal without saving. */
  protected closeDocModal(): void {
    this.docSectionModalDropdownOpen.set(false);
    this.docModalOpen.set(false);
  }

  /**
   * Updates the section dropdown signal and resets the subsection selection
   * whenever the section changes (old subsection would belong to a different section).
   *
   * @param val Selected section value from the dropdown.
   */
  protected onSectionChange(val: string): void {
    this.docSectionSelect.set(val);
  }

  /**
   * Handles file input change — stages the selected file for upload.
   *
   * @param event The DOM `change` event from the file input.
   */
  protected onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file  = input.files?.[0] ?? null;
    this.stagedFile.set(file);
    this.stagedFileName.set(file?.name ?? '');
  }

  /**
   * Validates the document form and either uploads the staged file or saves
   * the external URL, then calls create or update via the Edge Function.
   */
  protected async onDocSave(): Promise<void> {
    this.docForm.markAllAsTouched();
    this.docSectionTouched.set(true);
    if (this.docSaving()) return;

    const { title, externalUrl } = this.docForm.getRawValue();

    if (!title.trim()) {
      this.docModalError.set('Title is required.');
      return;
    }

    // Section is required
    const sectionVal = this.docSectionSelect();

    if (!sectionVal) {
      this.docModalError.set('Section is required.');
      return;
    }

    const isUpload = this.docLinkType() === 'upload';

    if (isUpload && !this.stagedFile() && this.docModalMode() === 'create') {
      this.docModalError.set('Please select a file to upload.');
      return;
    }
    if (!isUpload && !externalUrl.trim()) {
      this.docModalError.set('Please enter a URL.');
      return;
    }

    this.docSaving.set(true);
    this.docModalError.set(null);

    try {
      let url       = externalUrl.trim();
      let file_path: string | null = null;

      if (isUpload && this.stagedFile()) {
        const uploaded = await this._rdDocs.uploadFile(this.stagedFile()!);
        url       = uploaded.url;
        file_path = uploaded.file_path;
      } else if (isUpload && this.docModalMode() === 'edit') {
        // Editing an upload record but no new file selected — keep existing values
        const existing = this.documents().find(d => d.id === this.editingDocId());
        url       = existing?.url ?? '';
        file_path = existing?.file_path ?? null;
      }

      const mode = this.docModalMode();

      if (mode === 'create') {
        await this._rdDocs.adminCreateDocument({ title: title.trim(), url, file_path, section: sectionVal });
      } else {
        await this._rdDocs.adminUpdateDocument(this.editingDocId()!, { title: title.trim(), url, file_path, section: sectionVal });
      }

      this.docModalOpen.set(false);
      this._toast.show(
        mode === 'create' ? 'Document added successfully.' : 'Document updated successfully.',
        'success'
      );
      await this._loadDocuments();
    } catch (err: unknown) {
      this.docModalError.set(err instanceof Error ? err.message : 'An error occurred.');
    } finally {
      this.docSaving.set(false);
    }
  }

  // ── Document delete actions ────────────────────────────────────────────────

  /**
   * Stages the given document for deletion and opens the confirmation dialog.
   *
   * @param doc The document record to delete.
   */
  protected confirmDeleteDoc(doc: RdDocument): void {
    this.deleteDocError.set(null);
    this.deleteDocTarget.set(doc);
  }

  /** Closes the document delete confirmation without deleting. */
  protected cancelDeleteDoc(): void {
    this.deleteDocTarget.set(null);
    this.deleteDocError.set(null);
  }

  /**
   * Executes deletion of the staged document via the Edge Function.
   * Also removes the associated storage object if the document was a file upload.
   */
  protected async executeDeleteDoc(): Promise<void> {
    const target = this.deleteDocTarget();
    if (!target || this.docDeleting()) return;

    this.docDeleting.set(true);
    try {
      await this._rdDocs.adminDeleteDocument(target.id, target.file_path);
      this.deleteDocTarget.set(null);
      this.deleteDocError.set(null);
      this._toast.show(`"${target.title}" has been removed.`, 'success');
      await this._loadDocuments();
    } catch (err: unknown) {
      this.deleteDocError.set(err instanceof Error ? err.message : 'Delete failed.');
    } finally {
      this.docDeleting.set(false);
    }
  }

  // ── Section management actions ─────────────────────────────────────────────

  /** Opens the section management modal and resets transient state. */
  protected openSecMgmt(): void {
    this.secMgmtError.set(null);
    this.newSectionInput.set('');    
    this.editingSecId.set(null);
    this.editingSecInput.set('');
    this.expandedSecId.set(null);
    if (this.documents().length === 0 && !this.docsLoading()) {
      void this._loadDocuments();
    }
    this.secMgmtOpen.set(true);
  }

  /** Closes the section management modal without saving. */
  protected closeSecMgmt(): void {
    this.secMgmtOpen.set(false);
  }

  /** Creates a new section and refreshes the list. */
  protected async createSection(): Promise<void> {
    const name = this.newSectionInput().trim();
    if (!name || this.secMgmtSaving()) return;
    this.secMgmtSaving.set(true);
    this.secMgmtError.set(null);
    try {
      await this._rdSections.createSection(name);
      this.newSectionInput.set('');
      this._toast.show(`Section "${name}" created.`, 'success');
      await this._loadSections();
    } catch (err: unknown) {
      this.secMgmtError.set(err instanceof Error ? err.message : 'Failed to create section.');
    } finally {
      this.secMgmtSaving.set(false);
    }
  }

  /** Starts inline rename for the given section. */
  protected startRenameSection(id: string, currentName: string): void {
    this.editingSecId.set(id);
    this.editingSecInput.set(currentName);
    this.secMgmtError.set(null);
  }

  /** Cancels the inline rename without saving. */
  protected cancelRenameSection(): void {
    this.editingSecId.set(null);
    this.editingSecInput.set('');
  }

  /** Commits the rename for the section currently being edited. */
  protected async commitRenameSection(): Promise<void> {
    const id   = this.editingSecId();
    const name = this.editingSecInput().trim();
    if (!id || !name || this.secMgmtSaving()) return;
    this.secMgmtSaving.set(true);
    this.secMgmtError.set(null);
    try {
      await this._rdSections.renameSection(id, name);
      this.editingSecId.set(null);
      this.editingSecInput.set('');
      this._toast.show('Section renamed.', 'success');
      await this._loadSections();
    } catch (err: unknown) {
      this.secMgmtError.set(err instanceof Error ? err.message : 'Failed to rename section.');
    } finally {
      this.secMgmtSaving.set(false);
    }
  }

  /** Deletes a section. */
  protected async deleteSection(id: string, name: string): Promise<void> {
    if (this.secMgmtSaving()) return;
    this.secMgmtSaving.set(true);
    this.secMgmtError.set(null);
    try {
      await this._rdSections.deleteSection(id);
      this._toast.show(`Section "${name}" deleted.`, 'success');
      await this._loadSections();
    } catch (err: unknown) {
      this.secMgmtError.set(err instanceof Error ? err.message : 'Failed to delete section.');
    } finally {
      this.secMgmtSaving.set(false);
    }
  }

  /** Called when the user starts dragging a section row. */
  protected onSecDragStart(event: DragEvent, id: string): void {
    this.dragSectionId.set(id);
    if (event.dataTransfer) event.dataTransfer.effectAllowed = 'move';
  }

  /** Called continuously while dragging over a potential drop target. */
  protected onSecDragOver(event: DragEvent, id: string): void {
    event.preventDefault();
    if (event.dataTransfer) event.dataTransfer.dropEffect = 'move';
    this.dragOverSecId.set(id);
  }

  /** Called when the drag cursor leaves a potential drop target. */
  protected onSecDragLeave(event: DragEvent, id: string): void {
    // Only clear when the cursor has genuinely left the element (not entered a child)
    const related = event.relatedTarget as Node | null;
    if (!related || !(event.currentTarget as HTMLElement).contains(related)) {
      if (this.dragOverSecId() === id) this.dragOverSecId.set(null);
    }
  }

  /** Handles the drop: reorders sections OR moves a document to this section. */
  protected async onSecDrop(event: DragEvent, targetId: string): Promise<void> {
    event.preventDefault();

    // ── Case 1: a document is being dropped onto this section ──────────────
    const docId = this.dragDocId();
    if (docId) {
      this.dragDocId.set(null);
      this.dragDocOverId.set(null);
      this.dragOverSecId.set(null);
      const targetSec = this.sections().find(s => s.id === targetId);
      const sourceDoc = this.documents().find(d => d.id === docId);
      if (!targetSec || !sourceDoc || sourceDoc.section === targetSec.name || this.secMgmtSaving()) return;

      // Optimistic: reflect the move in the UI immediately
      const movedDoc = { ...sourceDoc, section: targetSec.name };
      this.documents.update(docs => docs.map(d => d.id === docId ? movedDoc : d));

      this.secMgmtSaving.set(true);
      this.secMgmtError.set(null);
      try {
        await this._rdDocs.adminUpdateDocument(docId, {
          title: sourceDoc.title,
          url:   sourceDoc.url,
          file_path: sourceDoc.file_path,
          section: targetSec.name,
        });
        this._toast.show(`"${sourceDoc.title}" moved to "${targetSec.name}".`, 'success');
        await this._loadDocuments();
      } catch (err: unknown) {
        // Revert optimistic update on failure
        this.documents.update(docs => docs.map(d => d.id === docId ? sourceDoc : d));
        this.secMgmtError.set(err instanceof Error ? err.message : 'Failed to move document.');
      } finally {
        this.secMgmtSaving.set(false);
      }
      return;
    }

    // ── Case 2: a section is being dropped onto another section ────────────
    const sourceId = this.dragSectionId();
    this.dragSectionId.set(null);
    this.dragOverSecId.set(null);
    if (!sourceId || sourceId === targetId || this.secMgmtSaving()) return;

    const secs = [...this.sections()];
    const fromIdx = secs.findIndex(s => s.id === sourceId);
    const toIdx   = secs.findIndex(s => s.id === targetId);
    if (fromIdx < 0 || toIdx < 0) return;

    const [moved] = secs.splice(fromIdx, 1);
    secs.splice(toIdx, 0, moved);
    const reordered = secs.map((s, i) => ({ ...s, position: i }));
    this.sections.set(reordered);

    this.secMgmtSaving.set(true);
    this.secMgmtError.set(null);
    try {
      await this._rdSections.reorderSections(reordered.map(s => ({ id: s.id, position: s.position })));
    } catch (err: unknown) {
      this.secMgmtError.set(err instanceof Error ? err.message : 'Failed to reorder sections.');
      await this._loadSections();
    } finally {
      this.secMgmtSaving.set(false);
    }
  }

  /** Clears drag state when a drag ends without a valid drop. */
  protected onSecDragEnd(): void {
    this.dragSectionId.set(null);
    this.dragOverSecId.set(null);
  }

  /** Toggles the expanded section; collapses it if already open. */
  protected toggleSecExpand(id: string): void {
    this.expandedSecId.set(this.expandedSecId() === id ? null : id);
  }

  /** Starts a document drag (prevents parent section drag from firing). */
  protected onDocDragStart(event: DragEvent, docId: string): void {
    this.dragDocId.set(docId);
    if (event.dataTransfer) event.dataTransfer.effectAllowed = 'move';
  }

  /** Highlights a document row as the drag target. */
  protected onDocDragOver(event: DragEvent, docId: string): void {
    event.preventDefault();
    this.dragDocOverId.set(docId);
  }

  /**
   * Handles a drop onto a document row.
   * - Same section: reorders documents within that section.
   * - Different section: moves the source document into the target section.
   */
  protected async onDocDrop(event: DragEvent, sectionId: string, targetDocId: string): Promise<void> {
    event.stopPropagation();
    event.preventDefault();

    const sourceDocId = this.dragDocId();
    if (!sourceDocId) return;

    // Dropped onto itself — no-op
    if (sourceDocId === targetDocId) {
      this.dragDocId.set(null);
      this.dragDocOverId.set(null);
      return;
    }

    const sourceDoc  = this.documents().find(d => d.id === sourceDocId);
    const targetSec  = this.sections().find(s => s.id === sectionId);
    if (!sourceDoc || !targetSec || this.secMgmtSaving()) return;

    // ── Same section: reorder ────────────────────────────────────────────────
    if (sourceDoc.section === targetSec.name) {
      this.dragDocId.set(null);
      this.dragDocOverId.set(null);

      const sectionDocs = [...(this.docsBySection().get(targetSec.name) ?? [])];
      const fromIdx = sectionDocs.findIndex(d => d.id === sourceDocId);
      const toIdx   = sectionDocs.findIndex(d => d.id === targetDocId);
      if (fromIdx < 0 || toIdx < 0 || fromIdx === toIdx) return;

      const [moved] = sectionDocs.splice(fromIdx, 1);
      sectionDocs.splice(toIdx, 0, moved);
      const reordered = sectionDocs.map((d, i) => ({ ...d, position: i }));

      // Optimistic update
      const reorderedMap = new Map(reordered.map(d => [d.id, d]));
      this.documents.update(docs => docs.map(d => reorderedMap.has(d.id) ? reorderedMap.get(d.id)! : d));

      this.secMgmtSaving.set(true);
      this.secMgmtError.set(null);
      try {
        await this._rdDocs.reorderDocuments(reordered.map(d => ({ id: d.id, position: d.position })));
      } catch (err: unknown) {
        await this._loadDocuments();
        this.secMgmtError.set(err instanceof Error ? err.message : 'Failed to reorder documents.');
      } finally {
        this.secMgmtSaving.set(false);
      }
      return;
    }

    // ── Different section: move doc to target section ────────────────────────
    void this.onSecDrop(event, sectionId);
  }

  /** Clears the document drag-over highlight. */
  protected onDocDragLeave(docId: string): void {
    if (this.dragDocOverId() === docId) this.dragDocOverId.set(null);
  }

  /** Clears all document drag state when the drag ends. */
  protected onDocDragEnd(): void {
    this.dragDocId.set(null);
    this.dragDocOverId.set(null);
  }

  // ── Private helpers ────────────────────────────────────────────────────────

  /**
   * Fetches the full user list from the admin Edge Function and updates
   * the `users` signal. Sets `tableError` on failure.
   */
  private async _loadUsers(): Promise<void> {
    this.isLoading.set(true);
    this.tableError.set(null);
    try {
      const list = await this._auth.adminListUsers();
      this.users.set(list);
    } catch (err: unknown) {
      this.tableError.set(err instanceof Error ? err.message : 'Failed to load users.');
    } finally {
      this.isLoading.set(false);
    }
  }

  /**
   * Fetches all R&D documents via the `RdDocumentsService` and updates
   * the `documents` signal. Sets `docsError` on failure.
   */
  private async _loadDocuments(): Promise<void> {
    this.docsLoading.set(true);
    this.docsError.set(null);
    try {
      const list = await this._rdDocs.listDocuments();
      this.documents.set(list);
      this.docPageIndex.set(0);
    } catch (err: unknown) {
      this.docsError.set(err instanceof Error ? err.message : 'Failed to load documents.');
    } finally {
      this.docsLoading.set(false);
    }
  }

  /**
   * Fetches all R&D sections (with subsections) from the `RdSectionsService`
   * and updates the `sections` signal. Non-critical — errors are silently ignored.
   */
  private async _loadSections(): Promise<void> {
    this.sectionsLoading.set(true);
    try {
      this.sections.set(await this._rdSections.listSections());
    } catch {
      // Non-critical, fall back to document-derived sections
    } finally {
      this.sectionsLoading.set(false);
    }
  }

  /**
   * Formats an ISO date string into a short locale string (e.g. `Apr 15, 2026`).
   *
   * @param iso ISO 8601 date string or `null`.
   * @returns Formatted date string, or `'—'` when the value is absent.
   */
  protected formatDate(iso: string | null): string {
    if (!iso) return '—';
    return new Date(iso).toLocaleDateString('en-US', {
      year: 'numeric', month: 'short', day: 'numeric',
    });
  }
}
