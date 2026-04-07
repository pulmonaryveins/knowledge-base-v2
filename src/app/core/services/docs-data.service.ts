// ── FILE: src/app/core/services/docs-data.service.ts ──

import { Injectable } from '@angular/core';
import { Team, AppEntry } from '../models/team.model';
import { SearchResult } from '../models/search.model';
import { frontendTeam, backendTeam, uiuxTeam, qaTeam, rdTeam, webdevTeam, appEntries } from '../data';

/**
 * DocsDataService is the single source of truth for all portal content.
 * It delegates to per-team data files and exposes three public methods
 * consumed by NavigationService, SearchService, SidebarComponent, and AppsPageComponent.
 */
@Injectable({ providedIn: 'root' })
export class DocsDataService {
  private readonly _teams: ReadonlyArray<Team> = [
    frontendTeam,
    backendTeam,
    webdevTeam,
    qaTeam,
    rdTeam,
    uiuxTeam,
  ];

  private readonly _appEntries: ReadonlyArray<AppEntry> = appEntries;

  /**
   * Return the full array of team objects including all sections and projects.
   * @returns All five portal teams
   */
  public getTeams(): ReadonlyArray<Team> {
    return this._teams;
  }

  /**
   * Return all app entries for the Apps & Projects overview grid.
   * @returns All application entries
   */
  public getAppEntries(): ReadonlyArray<AppEntry> {
    return this._appEntries;
  }

  /**
   * Build and return the full search index from all teams and sections.
   * @returns Flat array of SearchResult entries for the search overlay
   */
  public getSearchIndex(): ReadonlyArray<SearchResult> {
    const results: SearchResult[] = [];
    for (const team of this._teams) {
      for (const section of team.sections) {
        results.push({
          id: `${team.key}-${section.id}`,
          teamKey: team.key,
          teamColor: team.color,
          teamLabel: team.label,
          title: section.label,
          snippet: `${team.label} documentation — ${section.label} (section ${section.num})`,
          sectionId: section.id,
        });
      }
      for (const project of team.projects) {
        results.push({
          id: `project-${project.id}`,
          teamKey: team.key,
          teamColor: team.color,
          teamLabel: team.label,
          title: project.name,
          snippet: project.description,
          sectionId: `${team.key}-projects`,
        });
      }
    }
    return results;
  }
}
