// ── FILE: src/app/shared/components/sidebar/sidebar.component.ts ──

import { Component, computed, inject, signal } from '@angular/core';
import {
  LucideAngularModule,
  Search,
  ChevronDown,
  Menu,
  X,
  ArrowLeft,
  LogOut,
  LayoutDashboard,
  LucideIconData,
} from 'lucide-angular';
import { Router } from '@angular/router';
import { NavigationService } from '../../../core/services/navigation.service';
import { DocsDataService } from '../../../core/services/docs-data.service';
import { AuthService } from '../../../core/services/auth.service';
import { StatusBadgeComponent } from '../status-badge/status-badge.component';
import { Team, Tool } from '../../../core/models';
import { getTeamIcon, getAppIcon, getToolIcon } from '../../../core/utils/icons';
import { ToastService } from '../../../core/services/toast.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [StatusBadgeComponent, LucideAngularModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  private readonly _nav = inject(NavigationService);
  private readonly _docsData = inject(DocsDataService);
  private readonly _router = inject(Router);
  private readonly _auth = inject(AuthService);
  private readonly _toast = inject(ToastService);

  // ── Lucide icon references exposed to template ──────────────────────────
  protected readonly SearchIcon = Search;
  protected readonly ChevronDownIcon = ChevronDown;
  protected readonly MenuIcon = Menu;
  protected readonly CloseIcon = X;
  protected readonly ArrowLeftIcon = ArrowLeft;
  protected readonly LogOutIcon = LogOut;
  protected readonly LayoutDashboardIcon = LayoutDashboard;

  // ── Auth state ───────────────────────────────────────────────────────────
  protected readonly profile         = this._auth.profile;
  protected readonly isAdmin         = this._auth.isAdmin;
  protected readonly isAuthenticated = this._auth.isAuthenticated;

  /** Display name: full_name → email prefix → fallback */
  protected readonly displayName = computed(() => {
    const p = this._auth.profile();
    if (p?.full_name) return p.full_name;
    const email = p?.email ?? this._auth.user()?.email ?? '';
    return email.split('@')[0] ?? 'User';
  });

  /** Email from profile or user object */
  protected readonly displayEmail = computed(() =>
    this._auth.profile()?.email ?? this._auth.user()?.email ?? ''
  );

  protected readonly initials = computed(() => {
    const name = this.displayName();
    return name.split(' ').slice(0, 2).map((w: string) => w[0]).join('').toUpperCase() || '?';
  });

  // ── Mobile sidebar state ─────────────────────────────────────────────────
  protected readonly mobileOpen = signal(false);

  protected readonly teams = computed<ReadonlyArray<Team>>(() =>
    this._docsData.getTeams()
  );

  protected readonly activeKey = computed<string>(() =>
    this._nav.activeTeamKey()
  );

  protected readonly activeProjectId = computed<string | null>(() =>
    this._nav.activeProjectId()
  );

  protected readonly activeTeam = computed(() => this._nav.activeTeam());

  /** Returns the Lucide icon object for the given team key */
  protected teamIcon(key: string): LucideIconData {
    return getTeamIcon(key);
  }

  /** Returns the Lucide icon object for a project icon name */
  protected projectIcon(name: string): LucideIconData {
    return getAppIcon(name);
  }

  /** Returns the Lucide icon object for a tool icon name */
  protected toolIcon(iconKey: string): LucideIconData {
    return getToolIcon(iconKey);
  }

  protected readonly toolsList = computed<ReadonlyArray<Tool>>(() =>
    this._docsData.getTools()
  );

  protected readonly activeToolKey = computed<string>(() =>
    this._nav.activeToolKey()
  );

  /** Key of the single currently expanded team group ('' = all collapsed) */
  protected readonly expandedKey = signal<string>(this._nav.activeTeamKey());

  /** Whether the given team is currently expanded */
  protected isExpanded(key: string): boolean {
    return this.expandedKey() === key;
  }

  /** Returns the tools list for a given team key — removed; tools are now a separate section */

  protected switchToTool(key: string): void {
    this._nav.switchToTool(key);
    this.mobileOpen.set(false);
  }

  protected switchTeam(key: string): void {
    // Collapse if already open; otherwise open this one and close all others.
    this.expandedKey.update(current => (current === key ? '' : key));
    this._nav.switchTeam(key);
  }

  protected openSearch(): void {
    this._nav.openSearch();
  }

  protected toggleProject(id: string): void {
    this._nav.toggleProject(id);
    setTimeout(() => {
      const el = document.getElementById(`project-${id}`);
      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY - 100;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    }, 50);
  }

  protected toggleMobile(): void {
    this.mobileOpen.update(v => !v);
  }

  protected closeMobile(): void {
    this.mobileOpen.set(false);
  }

  /** Navigate back to the landing page */
  protected goHome(): void {
    this._router.navigate(['/']);
  }

  /** Navigate to the admin panel (admin only) */
  protected goAdmin(): void {
    this._router.navigate(['/admin']);
    this.mobileOpen.set(false);
  }

  /** Sign out and redirect to login */
  protected async signOut(): Promise<void> {
    this.mobileOpen.set(false);
    this._toast.show('Signed out successfully.', 'info');
    await this._auth.signOut();
  }
}
