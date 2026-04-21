// ── FILE: src/app/core/services/navigation.service.ts ──

import { Injectable, signal, computed, inject } from '@angular/core';
import { Team, TeamSection } from '../models';
import { DocsDataService } from './docs-data.service';

/**
 * NavigationService manages all active-state signals for the portal:
 * active team, active project, active section, scroll progress, and search overlay.
 */
@Injectable({ providedIn: 'root' })
export class NavigationService {
  /** Reference to the data service for resolving active team data */
  private readonly _docsData = inject(DocsDataService);

  /** Currently active team key */
  public readonly activeTeamKey = signal<string>('frontend');

  /** Key of the currently active tool page ('') when on a team page */
  public readonly activeToolKey = signal<string>('');

  /** Whether the portal is showing a tool page or a team page */
  public readonly activeView = signal<'team' | 'tool'>('team');

  /** ID of the currently expanded project card (null = all collapsed) */
  public readonly activeProjectId = signal<string | null>(null);

  /** ID of the section currently in the viewport, used to highlight the right rail */
  public readonly activeSectionId = signal<string>('');

  /** Scroll progress through the current page, 0–100 */
  public readonly scrollProgress = signal<number>(0);

  /** Whether the ⌘K search overlay is visible */
  public readonly searchOpen = signal<boolean>(false);

  /** Whether the hero is still in the viewport (controls right-rail snap behaviour) */
  public readonly heroVisible = signal<boolean>(true);

  /**
   * Section ID to scroll to once the next page finishes loading.
   * Set before a team switch so DocsShellComponent can scroll after the skeleton clears.
   */
  public readonly pendingScrollId = signal<string | null>(null);

  /**
   * The full Team object for the currently active team key.
   * Falls back to the first team if the key is not found.
   */
  public readonly activeTeam = computed<Team>(() => {
    const teams = this._docsData.getTeams();
    return teams.find((t) => t.key === this.activeTeamKey()) ?? teams[0];
  });

  /**
   * The ordered sections of the active team, used by the right rail.
   */
  public readonly activeSections = computed<ReadonlyArray<TeamSection>>(() =>
    this.activeTeam().sections
  );

  /**
   * Zero-based index of the active section within the active team's section list.
   * Returns 0 when no section has been scrolled into view yet.
   */
  public readonly activeSectionIndex = computed<number>(() => {
    const sections = this.activeSections();
    const id = this.activeSectionId();
    const idx = sections.findIndex((s) => s.id === id);
    return idx >= 0 ? idx : 0;
  });

  /**
   * Switch the portal to a different team tab.
   * Resets expanded project, active section, and scroll progress.
   * @param key - The team key to activate
   */
  public switchTeam(key: string): void {
    this.activeTeamKey.set(key);
    this.activeToolKey.set('');
    this.activeView.set('team');
    this.activeProjectId.set(null);
    this.activeSectionId.set('');
    this.scrollProgress.set(0);
    this.heroVisible.set(true);
  }

  /**
   * Switch the portal to a tool documentation page.
   * @param key - The tool key to activate
   */
  public switchToTool(key: string): void {
    this.activeToolKey.set(key);
    this.activeView.set('tool');
    this.activeSectionId.set('');
    this.scrollProgress.set(0);
    this.heroVisible.set(true);
  }

  /**
   * Toggle the expanded project doc card.
   * Clicking an already-open project collapses it.
   * @param id - The project ID to toggle
   */
  public toggleProject(id: string): void {
    this.activeProjectId.update((current) => (current === id ? null : id));
  }

  /**
   * Update the active section ID as the user scrolls.
   * @param sectionId - ID of the section now in view
   */
  public setActiveSection(sectionId: string): void {
    this.activeSectionId.set(sectionId);
  }

  /**
   * Update the scroll progress percentage.
   * Value is clamped to the range 0–100.
   * @param progress - Raw percentage value
   */
  public setScrollProgress(progress: number): void {
    this.scrollProgress.set(Math.min(100, Math.max(0, progress)));
  }

  /**
   * Update whether the hero banner is currently visible.
   * @param visible - True when hero is in the viewport
   */
  public setHeroVisible(visible: boolean): void {
    this.heroVisible.set(visible);
  }

  /** Open the global search overlay. */
  public openSearch(): void {
    this.searchOpen.set(true);
  }

  /** Close the global search overlay. */
  public closeSearch(): void {
    this.searchOpen.set(false);
  }

  /**
   * Queue a section to be scrolled into view after the next page load completes.
   * Pass null to cancel any pending scroll.
   * @param id - The DOM element ID to scroll to
   */
  public setPendingScroll(id: string | null): void {
    this.pendingScrollId.set(id);
  }
}
