// ── FILE: src/app/features/docs-shell/docs-shell.component.ts ──

import { Component, computed, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavigationService } from '../../core/services';
import { SidebarComponent } from '../../shared/components/sidebar/sidebar.component';
import { RightRailComponent } from '../../shared/components/right-rail/right-rail.component';
import { SearchOverlayComponent } from '../../shared/components/search-overlay/search-overlay.component';
import { TeamPageComponent } from '../team-page/team-page.component';
import { AppsPageComponent } from '../apps-page/apps-page.component';
import { ToolPageComponent } from '../tool-page/tool-page.component';

/**
 * DocsShellComponent is the root layout shell of the portal.
 * It composes the fixed sidebar, the main content area, and the fixed right rail.
 * Switches between TeamPageComponent and AppsPageComponent based on active team key.
 * Reads optional ?team= query param on init to deep-link from the landing page.
 * Smart component — injects NavigationService and ActivatedRoute.
 */
@Component({
  selector: 'app-docs-shell',
  standalone: true,
  imports: [
    SidebarComponent,
    RightRailComponent,
    SearchOverlayComponent,
    TeamPageComponent,
    AppsPageComponent,
    ToolPageComponent,
  ],
  templateUrl: './docs-shell.component.html',
  styleUrl: './docs-shell.component.scss',
})
export class DocsShellComponent implements OnInit {
  /** Navigation service for reading the active team key */
  private readonly _nav = inject(NavigationService);
  private readonly _route = inject(ActivatedRoute);

  /** True when a tool page should be rendered */
  protected readonly isToolPage = computed<boolean>(
    () => this._nav.activeView() === 'tool'
  );

  /** True when the Research & Development page should be rendered */
  protected readonly isAppsPage = computed<boolean>(
    () => this._nav.activeView() === 'team' && this._nav.activeTeamKey() === 'rd'
  );

  /** True when a regular team documentation page should be rendered */
  protected readonly isTeamPage = computed<boolean>(
    () => this._nav.activeView() === 'team' && this._nav.activeTeamKey() !== 'rd'
  );

  /** Read ?team= query param and switch active team on entry */
  public ngOnInit(): void {
    const teamKey = this._route.snapshot.queryParamMap.get('team');
    if (teamKey) {
      this._nav.switchTeam(teamKey);
    }
  }
}
