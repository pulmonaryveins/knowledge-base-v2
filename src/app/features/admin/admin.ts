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

type ModalMode = 'create' | 'edit';

// Stricter than Validators.email — requires a real TLD (≥2 chars) and a proper domain
const EMAIL_RE = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;
function strictEmail(ctrl: AbstractControl): ValidationErrors | null {
  const v = ctrl.value as string;
  return !v || EMAIL_RE.test(v.trim()) ? null : { email: true };
}

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

  // ── State ──────────────────────────────────────────────────────────────────
  protected readonly users        = signal<AdminUserRecord[]>([]);
  protected readonly isLoading    = signal(true);
  protected readonly tableError   = signal<string | null>(null);

  // Modal
  protected readonly modalOpen    = signal(false);
  protected readonly modalMode    = signal<ModalMode>('create');
  protected readonly modalError   = signal<string | null>(null);
  protected readonly isSaving     = signal(false);
  protected readonly editingId    = signal<string | null>(null);

  // Delete confirmation
  protected readonly deleteTarget = signal<AdminUserRecord | null>(null);
  protected readonly isDeleting   = signal(false);

  // Current user (so we can't delete ourselves)
  protected readonly currentUserId = computed(() => this._auth.user()?.id);

  // Stats
  protected readonly adminCount  = computed(() => this.users().filter(u => u.role === 'admin').length);
  protected readonly memberCount = computed(() => this.users().filter(u => u.role === 'member').length);

  // Delete guards
  protected readonly isLastAdmin = computed(() => this.adminCount() === 1);
  protected readonly deleteTargetIsAdmin = computed(() => this.deleteTarget()?.role === 'admin');
  protected readonly deleteError = signal<string | null>(null);

  // Search / Filter
  protected readonly searchQuery   = signal('');
  protected readonly roleFilter    = signal<'all' | 'admin' | 'member'>('all');
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

  // Pagination
  protected readonly pageSize       = signal(7);
  protected readonly pageIndex      = signal(0);
  protected readonly totalPages     = computed(() =>
    Math.max(1, Math.ceil(this.filteredUsers().length / this.pageSize()))
  );
  protected readonly paginatedUsers = computed(() => {
    const start = this.pageIndex() * this.pageSize();
    return this.filteredUsers().slice(start, start + this.pageSize());
  });
  protected readonly pageStart      = computed(() => this.pageIndex() * this.pageSize() + 1);
  protected readonly pageEnd        = computed(() =>
    Math.min(this.filteredUsers().length, (this.pageIndex() + 1) * this.pageSize())
  );

  // ── Icons ──────────────────────────────────────────────────────────────────
  protected readonly UserPlusIcon  = UserPlus;
  protected readonly PencilIcon    = Pencil;
  protected readonly Trash2Icon    = Trash2;
  protected readonly ShieldIcon    = Shield;
  protected readonly UserIcon      = User;
  protected readonly ArrowLeftIcon = ArrowLeft;
  protected readonly LogOutIcon    = LogOut;
  protected readonly XIcon         = X;
  protected readonly CheckIcon     = Check;
  protected readonly UsersIcon     = Users;
  protected readonly SearchIcon       = Search;
  protected readonly ChevronLeftIcon  = ChevronLeft;
  protected readonly ChevronRightIcon = ChevronRight;

  // ── Form ───────────────────────────────────────────────────────────────────
  protected readonly form = this._fb.nonNullable.group({
    fullName: ['', Validators.required],
    email:    ['', [Validators.required, strictEmail]],
    password: ['', Validators.minLength(8)],
    role:     ['member' as UserRole, Validators.required],
  });

  constructor() {
    // Reset to first page when search query or role filter changes
    effect(() => {
      this.searchQuery();
      this.roleFilter();
      untracked(() => this.pageIndex.set(0));
    });
  }

  async ngOnInit() {
    await this._loadUsers();
  }

  // ── Actions ────────────────────────────────────────────────────────────────

  protected openCreateModal() {
    this.form.reset({ role: 'member' });
    this.form.controls.password.setValidators([Validators.required, Validators.minLength(8)]);
    this.form.controls.password.updateValueAndValidity();
    this.modalMode.set('create');
    this.editingId.set(null);
    this.modalError.set(null);
    this.modalOpen.set(true);
  }

  protected openEditModal(user: AdminUserRecord) {
    this.form.reset({
      fullName: user.full_name ?? '',
      email:    user.email,
      password: '',
      role:     user.role,
    });
    // Password optional on edit
    this.form.controls.password.setValidators(
      (v) => v.value ? Validators.minLength(8)(v) : null
    );
    this.form.controls.password.updateValueAndValidity();
    this.modalMode.set('edit');
    this.editingId.set(user.id);
    this.modalError.set(null);
    this.modalOpen.set(true);
  }

  protected closeModal() {
    this.modalOpen.set(false);
  }

  protected async onSave() {
    // Mark all touched so every field shows its error immediately
    this.form.markAllAsTouched();
    if (this.form.invalid || this.isSaving()) return;

    this.isSaving.set(true);
    this.modalError.set(null);

    const { fullName, email, password, role } = this.form.getRawValue();

    // Duplicate email check (skip own record on edit)
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

  protected confirmDelete(user: AdminUserRecord) {
    this.deleteError.set(null);
    this.deleteTarget.set(user);
  }

  protected cancelDelete() {
    this.deleteTarget.set(null);
    this.deleteError.set(null);
  }

  protected async executeDelete() {
    const target = this.deleteTarget();
    if (!target || this.isDeleting()) return;

    // Guard: cannot delete the last admin
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

  protected prevPage() { if (this.pageIndex() > 0) this.pageIndex.update(p => p - 1); }
  protected nextPage() { if (this.pageIndex() < this.totalPages() - 1) this.pageIndex.update(p => p + 1); }

  protected goToPortal() {
    this._router.navigate(['/portal']);
  }

  protected async signOut() {
    this._toast.show('Signed out successfully.', 'info');
    await this._auth.signOut();
  }

  // ── Helpers ────────────────────────────────────────────────────────────────

  private async _loadUsers() {
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

  protected formatDate(iso: string | null): string {
    if (!iso) return '—';
    return new Date(iso).toLocaleDateString('en-US', {
      year: 'numeric', month: 'short', day: 'numeric',
    });
  }
}
