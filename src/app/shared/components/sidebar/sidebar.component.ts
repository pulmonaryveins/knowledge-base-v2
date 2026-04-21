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

/**
 * Portal sidebar — persistent navigation shell for the authenticated portal area.
 *
 * Responsibilities:
 * - Renders the team list and per-team project accordion
 * - Renders the tools section
 * - Displays the signed-in user's profile chip with role badge
 * - Provides admin panel link (visible to `admin` role only)
 * - Handles sign-out with an immediate toast notification
 * - Manages a mobile drawer toggle (`mobileOpen` signal)
 */
@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [StatusBadgeComponent, LucideAngularModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  private readonly _nav     = inject(NavigationService);
  private readonly _docsData = inject(DocsDataService);
  private readonly _router  = inject(Router);
  private readonly _auth    = inject(AuthService);
  private readonly _toast   = inject(ToastService);

  // ── Lucide icon references exposed to template ──────────────────────────
  protected readonly SearchIcon         = Search;
  protected readonly ChevronDownIcon    = ChevronDown;
  protected readonly MenuIcon           = Menu;
  protected readonly CloseIcon          = X;
  protected readonly ArrowLeftIcon      = ArrowLeft;
  protected readonly LogOutIcon         = LogOut;
  protected readonly LayoutDashboardIcon = LayoutDashboard;

  // ── Auth state ───────────────────────────────────────────────────────────

  /** Reactive profile from `AuthService` — contains `full_name`, `email`, `role`. */
  protected readonly profile         = this._auth.profile;
  /** `true` when the signed-in user has `role === 'admin'`. */
  protected readonly isAdmin         = this._auth.isAdmin;
  /** `true` when a Supabase session is active. */
  protected readonly isAuthenticated = this._auth.isAuthenticated;

  /**
   * Best available display name for the signed-in user.
   * Priority: `full_name` → email prefix → `'User'` fallback.
   */
  protected readonly displayName = computed(() => {
    const p = this._auth.profile();
    if (p?.full_name) return p.full_name;
    const email = p?.email ?? this._auth.user()?.email ?? '';
    return email.split('@')[0] ?? 'User';
  });

  /**
   * Email address of the signed-in user, sourced from the profile
   * or directly from the Supabase user object.
   */
  protected readonly displayEmail = computed(() =>
    this._auth.profile()?.email ?? this._auth.user()?.email ?? ''
  );

  /**
   * Up-to-two-character initials derived from `displayName`.
   * Used for the avatar circle when no profile image is available.
   */
  protected readonly initials = computed(() => {
    const name = this.displayName();
    return name.split(' ').slice(0, 2).map((w: string) => w[0]).join('').toUpperCase() || '?';
  });

  // ── Mobile sidebar state ─────────────────────────────────────────────────

  /** Controls visibility of the mobile overlay drawer. */
  protected readonly mobileOpen = signal(false);

  // ── Navigation state ─────────────────────────────────────────────────────

  /** All teams from `DocsDataService`. Re-computed when data changes. */
  protected readonly teams = computed<ReadonlyArray<Team>>(() =>
    this._docsData.getTeams()
  );

  /** Key of the currently active team (drives highlighted state). */
  protected readonly activeKey = computed<string>(() =>
    this._nav.activeTeamKey()
  );

  /** ID of the currently expanded project accordion item. */
  protected readonly activeProjectId = computed<string | null>(() =>
    this._nav.activeProjectId()
  );

  /** Full team object for the active team. */
  protected readonly activeTeam = computed(() => this._nav.activeTeam());

  /**
   * Returns the Lucide icon object for a given team key.
   *
   * @param key Team identifier string (e.g. `'frontend'`, `'backend'`).
   */
  protected teamIcon(key: string): LucideIconData {
    return getTeamIcon(key);
  }

  /**
   * Returns the Lucide icon object for a project icon name.
   *
   * @param name Icon name as stored in the project data.
   */
  protected projectIcon(name: string): LucideIconData {
    return getAppIcon(name);
  }

  /**
   * Returns the Lucide icon object for a tool icon key.
   *
   * @param iconKey Icon key as stored in the tool data.
   */
  protected toolIcon(iconKey: string): LucideIconData {
    return getToolIcon(iconKey);
  }

  /** All tools from `DocsDataService`. */
  protected readonly toolsList = computed<ReadonlyArray<Tool>>(() =>
    this._docsData.getTools()
  );

  /** Key of the currently active tool. */
  protected readonly activeToolKey = computed<string>(() =>
    this._nav.activeToolKey()
  );

  /**
   * Key of the currently expanded team accordion group.
   * An empty string means all groups are collapsed.
   * Initialised to the active team so the correct group opens on load.
   */
  protected readonly expandedKey = signal<string>(this._nav.activeTeamKey());

  /**
   * Returns `true` if the given team's accordion is currently expanded.
   *
   * @param key Team identifier string.
   */
  protected isExpanded(key: string): boolean {
    return this.expandedKey() === key;
  }

  /**
   * Switches the active tool and closes the mobile drawer.
   *
   * @param key Tool identifier string.
   */
  protected switchToTool(key: string): void {
    this._nav.switchToTool(key);
    this.mobileOpen.set(false);
  }

  /**
   * Toggles the accordion for the given team.
   * Collapses it if already open; expands it and collapses all others if closed.
   *
   * @param key Team identifier string.
   */
  protected switchTeam(key: string): void {
    this.expandedKey.update(current => (current === key ? '' : key));
    this._nav.switchTeam(key);
  }

  /** Opens the global search overlay. */
  protected openSearch(): void {
    this._nav.openSearch();
  }

  /**
   * Expands a project section and smoothly scrolls it into view.
   *
   * @param id The project's unique identifier.
   */
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

  /** Toggles the mobile drawer open/closed. */
  protected toggleMobile(): void {
    this.mobileOpen.update(v => !v);
  }

  /** Closes the mobile drawer. */
  protected closeMobile(): void {
    this.mobileOpen.set(false);
  }

  /** Navigates back to the public landing page. */
  protected goHome(): void {
    this._router.navigate(['/']);
  }

  /**
   * Navigates to the admin panel.
   * Only reachable by users with `role === 'admin'` (guarded by `AdminGuard`).
   */
  protected goAdmin(): void {
    this._router.navigate(['/admin']);
    this.mobileOpen.set(false);
  }

  /**
   * Closes the mobile drawer, shows an info toast, then ends the Supabase
   * session and redirects to `/login`.
   *
   * The toast is shown before `signOut()` awaits the Supabase call so it
   * renders immediately rather than after the navigation completes.
   */
  protected async signOut(): Promise<void> {
    this.mobileOpen.set(false);
    this._toast.show('Signed out successfully.', 'info');
    await this._auth.signOut();
  }
}
