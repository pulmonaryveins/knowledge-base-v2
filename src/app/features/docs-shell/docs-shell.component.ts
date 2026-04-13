// ── FILE: src/app/features/docs-shell/docs-shell.component.ts ──

import { Component, computed, effect, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavigationService } from '../../core/services';
import { SidebarComponent } from '../../shared/components/sidebar/sidebar.component';
import { RightRailComponent } from '../../shared/components/right-rail/right-rail.component';
import { SearchOverlayComponent } from '../../shared/components/search-overlay/search-overlay.component';
import { TeamPageComponent } from '../team-page/team-page.component';
import { AppsPageComponent } from '../apps-page/apps-page.component';
import { ToolPageComponent } from '../tool-page/tool-page.component';
import { SkeletonComponent } from '../../shared/components/skeleton/skeleton.component';

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
    SkeletonComponent,
  ],
  templateUrl: './docs-shell.component.html',
  styleUrl: './docs-shell.component.scss',
})
export class DocsShellComponent implements OnInit {
  /** Navigation service for reading the active team key */
  private readonly _nav = inject(NavigationService);
  private readonly _route = inject(ActivatedRoute);

  /** True while the skeleton should be shown (initial load + every navigation change). */
  protected readonly isLoading = signal(true);
  private _loadTimer = 0;

  constructor() {
    // On every team / tool switch: show skeleton briefly, then reveal content.
    // Also scrolls to top on navigation.
    effect(() => {
      this._nav.activeTeamKey();
      this._nav.activeToolKey();

      window.scrollTo({ top: 0, behavior: 'instant' });
      this.isLoading.set(true);
      clearTimeout(this._loadTimer);
      this._loadTimer = window.setTimeout(() => this.isLoading.set(false), 420);
    });
  }

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
