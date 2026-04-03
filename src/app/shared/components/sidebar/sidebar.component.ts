// ── FILE: src/app/shared/components/sidebar/sidebar.component.ts ──

import { Component, computed, inject } from '@angular/core';
import { NavigationService } from '../../../core/services/navigation.service';
import { DocsDataService } from '../../../core/services/docs-data.service';
import { StatusBadgeComponent } from '../status-badge/status-badge.component';
import { Team } from '../../../core/models';

/**
 * SidebarComponent renders the fixed left navigation sidebar.
 * It is a smart component — it injects NavigationService to read and update
 * the active team and exposes team-switching to the template.
 */
@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [StatusBadgeComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  /** Navigation service for reading/writing active team and opening search */
  private readonly _nav = inject(NavigationService);
  /** Data service for the full list of teams */
  private readonly _docsData = inject(DocsDataService);

  /** All portal teams for the team list */
  protected readonly teams = computed<ReadonlyArray<Team>>(() =>
    this._docsData.getTeams()
  );

  /** Currently active team key for highlighting */
  protected readonly activeKey = computed<string>(() =>
    this._nav.activeTeamKey()
  );

  /** Currently expanded project ID for sub-link display */
  protected readonly activeProjectId = computed<string | null>(() =>
    this._nav.activeProjectId()
  );

  /** The full active team object (for project sub-links) */
  protected readonly activeTeam = computed(() => this._nav.activeTeam());

  /**
   * Switch the active team.
   * @param key - Team key to activate
   */
  protected switchTeam(key: string): void {
    this._nav.switchTeam(key);
  }

  /**
   * Open the ⌘K global search overlay.
   */
  protected openSearch(): void {
    this._nav.openSearch();
  }

  /**
   * Toggle the expanded project card and scroll to it.
   * @param id - Project ID to toggle
   */
  protected toggleProject(id: string): void {
    this._nav.toggleProject(id);
    
    // Defer scrolling slightly to allow Angular to render the open state,
    // so we scroll to the actual opened element properly.
    setTimeout(() => {
      const el = document.getElementById(`project-${id}`);
      if (el) {
        // Offset by 100px to account for the sticky header / spacing
        const top = el.getBoundingClientRect().top + window.scrollY - 100;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    }, 50);
  }
}
