// ── FILE: src/app/features/apps-page/apps-page.component.ts ──

import { Component, computed, inject } from '@angular/core';
import { DocsDataService } from '../../core/services/docs-data.service';
import { NavigationService } from '../../core/services/navigation.service';
import { AppEntry, Team } from '../../core/models';
import { HeroComponent } from '../../shared/components/hero/hero.component';
import { SectionHeaderComponent } from '../../shared/components/section-header/section-header.component';
import { StatusBadgeComponent } from '../../shared/components/status-badge/status-badge.component';
import { InfoCardComponent } from '../../shared/components/info-card/info-card.component';

/**
 * AppsPageComponent renders the "Apps & Projects" page.
 * It shows an all-apps grid, projects-by-team blocks, an ownership matrix,
 * and shared infrastructure cards.
 * Smart component — injects DocsDataService and NavigationService.
 */
@Component({
  selector: 'app-apps-page',
  standalone: true,
  imports: [HeroComponent, SectionHeaderComponent, StatusBadgeComponent, InfoCardComponent],
  templateUrl: './apps-page.component.html',
  styleUrl: './apps-page.component.scss',
})
export class AppsPageComponent {
  /** Data service for app entries and team data */
  private readonly _docsData = inject(DocsDataService);
  /** Navigation service for the active team (used for hero) */
  private readonly _nav = inject(NavigationService);

  /** The Apps & Projects team object (for hero) */
  protected readonly appsTeam = computed<Team>(
    () => this._nav.activeTeam()
  );

  /** All application entries */
  protected readonly apps = computed<ReadonlyArray<AppEntry>>(
    () => this._docsData.getAppEntries()
  );

  /** All teams (excluding the Apps meta-team) for the by-team section */
  protected readonly teams = computed<ReadonlyArray<Team>>(() =>
    this._docsData.getTeams().filter((t) => t.key !== 'apps')
  );

  /** Unique team keys for the ownership matrix columns */
  protected readonly matrixTeams = computed<ReadonlyArray<Team>>(() =>
    this.teams()
  );

  /**
   * Return whether the given team owns the given app.
   * @param app - The app entry to check
   * @param teamKey - The team key to match against
   * @returns True when the team owns the app
   */
  protected owns(app: AppEntry, teamKey: string): boolean {
    return app.ownerTeam === teamKey;
  }

  /**
   * Filter apps to only those owned by the given team key.
   * @param teamKey - The team key to filter by
   * @returns Subset of apps owned by that team
   */
  protected appsForTeam(teamKey: string): ReadonlyArray<AppEntry> {
    return this.apps().filter((a) => a.ownerTeam === teamKey);
  }
}
