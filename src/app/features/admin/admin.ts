import { Component, effect, inject, signal, computed, untracked, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import {
  LucideAngularModule,
  UserPlus, Pencil, Trash2, Shield, User, ArrowLeft, LogOut, X, Check, Users, Search,
  ChevronLeft, ChevronRight,
} from 'lucide-angular';
import { AuthService } from '../../core/services/auth.service';
import { ToastService } from '../../core/services/toast.service';
import type { AdminUserRecord, UserRole } from '../../core/models/profile.model';

/** Modal can be in create-new or edit-existing mode. */
type ModalMode = 'create' | 'edit';

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
  private readonly _auth   = inject(AuthService);
  private readonly _router = inject(Router);
  private readonly _fb     = inject(FormBuilder);
  private readonly _toast  = inject(ToastService);

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

  // ── Icon references ────────────────────────────────────────────────────────
  protected readonly UserPlusIcon     = UserPlus;
  protected readonly PencilIcon       = Pencil;
  protected readonly Trash2Icon       = Trash2;
  protected readonly ShieldIcon       = Shield;
  protected readonly UserIcon         = User;
  protected readonly ArrowLeftIcon    = ArrowLeft;
  protected readonly LogOutIcon       = LogOut;
  protected readonly XIcon            = X;
  protected readonly CheckIcon        = Check;
  protected readonly UsersIcon        = Users;
  protected readonly SearchIcon       = Search;
  protected readonly ChevronLeftIcon  = ChevronLeft;
  protected readonly ChevronRightIcon = ChevronRight;

  // ── Reactive form ──────────────────────────────────────────────────────────

  /**
   * Shared form used by both create and edit modals.
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
