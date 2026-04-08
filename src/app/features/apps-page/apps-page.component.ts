// ── FILE: src/app/features/apps-page/apps-page.component.ts ──

import { Component, computed, inject } from '@angular/core';
import { LucideAngularModule, LucideIconData } from 'lucide-angular';
import { DocsDataService } from '../../core/services/docs-data.service';
import { NavigationService } from '../../core/services/navigation.service';
import { AppEntry, Team } from '../../core/models';
import { HeroComponent } from '../../shared/components/hero/hero.component';
import { SectionHeaderComponent } from '../../shared/components/section-header/section-header.component';
import { StatusBadgeComponent } from '../../shared/components/status-badge/status-badge.component';
import { InfoCardComponent } from '../../shared/components/info-card/info-card.component';
import { getAppIcon, getTeamIcon } from '../../core/utils/icons';

@Component({
  selector: 'app-apps-page',
  standalone: true,
  imports: [
    HeroComponent,
    SectionHeaderComponent,
    StatusBadgeComponent,
    InfoCardComponent,
    LucideAngularModule,
  ],
  templateUrl: './apps-page.component.html',
  styleUrl: './apps-page.component.scss',
})
export class AppsPageComponent {
  private readonly _docsData = inject(DocsDataService);
  private readonly _nav = inject(NavigationService);

  protected readonly appsTeam = computed<Team>(() => this._nav.activeTeam());
  protected readonly apps = computed<ReadonlyArray<AppEntry>>(() => this._docsData.getAppEntries());
  protected readonly teams = computed<ReadonlyArray<Team>>(() =>
    this._docsData.getTeams().filter((t) => t.key !== 'rd')
  );
  protected readonly matrixTeams = computed<ReadonlyArray<Team>>(() => this.teams());

  /** Resolve a lucide icon for an app/project icon name string */
  protected appIcon(name: string): LucideIconData {
    return getAppIcon(name);
  }

  /** Resolve a lucide icon for a team key */
  protected teamIcon(key: string): LucideIconData {
    return getTeamIcon(key);
  }

  protected owns(app: AppEntry, teamKey: string): boolean {
    return app.ownerTeam === teamKey;
  }
}
