// ── FILE: src/app/shared/components/sidebar/sidebar.component.ts ──

import { Component, computed, inject, signal } from '@angular/core';
import {
  LucideAngularModule,
  Search,
  ChevronDown,
  Menu,
  X,
  ArrowLeft,
  LucideIconData,
} from 'lucide-angular';
import { Router } from '@angular/router';
import { NavigationService } from '../../../core/services/navigation.service';
import { DocsDataService } from '../../../core/services/docs-data.service';
import { StatusBadgeComponent } from '../status-badge/status-badge.component';
import { Team, Tool } from '../../../core/models';
import { getTeamIcon, getAppIcon, getToolIcon } from '../../../core/utils/icons';

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

  // ── Lucide icon references exposed to template ──────────────────────────
  protected readonly SearchIcon = Search;
  protected readonly ChevronDownIcon = ChevronDown;
  protected readonly MenuIcon = Menu;
  protected readonly CloseIcon = X;
  protected readonly ArrowLeftIcon = ArrowLeft;

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

  /** Track which team groups are expanded (independent of active team) */
  protected readonly expandedKeys = signal<Set<string>>(
    new Set<string>([this._nav.activeTeamKey()])
  );

  /** Whether the given team is currently expanded */
  protected isExpanded(key: string): boolean {
    return this.expandedKeys().has(key);
  }

  /** Returns the tools list for a given team key — removed; tools are now a separate section */

  protected switchToTool(key: string): void {
    this._nav.switchToTool(key);
    this.mobileOpen.set(false);
  }

  protected switchTeam(key: string): void {
    // Toggle the expanded state for this team — do NOT close the mobile sidebar,
    // the user is just expanding/collapsing the dropdown.
    this.expandedKeys.update(set => {
      const next = new Set(set);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
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
}
