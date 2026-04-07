// ── FILE: src/app/features/docs-shell/docs-shell.component.ts ──

import { Component, computed, inject } from '@angular/core';
import { NavigationService } from '../../core/services';
import { SidebarComponent } from '../../shared/components/sidebar/sidebar.component';
import { RightRailComponent } from '../../shared/components/right-rail/right-rail.component';
import { SearchOverlayComponent } from '../../shared/components/search-overlay/search-overlay.component';
import { TeamPageComponent } from '../team-page/team-page.component';
import { AppsPageComponent } from '../apps-page/apps-page.component';

/**
 * DocsShellComponent is the root layout shell of the portal.
 * It composes the fixed sidebar, the main content area, and the fixed right rail.
 * Switches between TeamPageComponent and AppsPageComponent based on active team key.
 * Smart component — injects NavigationService.
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
  ],
  templateUrl: './docs-shell.component.html',
  styleUrl: './docs-shell.component.scss',
})
export class DocsShellComponent {
  /** Navigation service for reading the active team key */
  private readonly _nav = inject(NavigationService);

  /** True when the Research & Development page should be rendered */
  protected readonly isAppsPage = computed<boolean>(
    () => this._nav.activeTeamKey() === 'rd'
  );

  /** True when a regular team documentation page should be rendered */
  protected readonly isTeamPage = computed<boolean>(
    () => this._nav.activeTeamKey() !== 'rd'
  );
}
