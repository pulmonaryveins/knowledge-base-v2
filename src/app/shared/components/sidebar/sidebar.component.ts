// ── FILE: src/app/shared/components/sidebar/sidebar.component.ts ──

import { Component, computed, inject, signal } from '@angular/core';
import {
  LucideAngularModule,
  Search,
  ChevronDown,
  Menu,
  X,
  LucideIconData,
} from 'lucide-angular';
import { NavigationService } from '../../../core/services/navigation.service';
import { DocsDataService } from '../../../core/services/docs-data.service';
import { StatusBadgeComponent } from '../status-badge/status-badge.component';
import { Team } from '../../../core/models';
import { getTeamIcon, PROJECT_ICON } from '../../../core/utils/icons';

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

  // ── Lucide icon references exposed to template ──────────────────────────
  protected readonly SearchIcon = Search;
  protected readonly ChevronDownIcon = ChevronDown;
  protected readonly MenuIcon = Menu;
  protected readonly CloseIcon = X;
  protected readonly ProjectIcon = PROJECT_ICON;

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

  protected switchTeam(key: string): void {
    this._nav.switchTeam(key);
    this.mobileOpen.set(false);
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
}
