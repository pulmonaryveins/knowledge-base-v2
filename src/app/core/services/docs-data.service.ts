// ── FILE: src/app/core/services/docs-data.service.ts ──

import { Injectable } from '@angular/core';
import { Team, AppEntry } from '../models/team.model';
import { Tool } from '../models/tool.model';
import { SearchResult } from '../models/search.model';
import { frontendTeam, backendTeam, uiuxTeam, qaTeam, rdTeam, webdevTeam, piPlayerTeam, appEntries, tools } from '../data';

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
    piPlayerTeam,
  ];

  private readonly _appEntries: ReadonlyArray<AppEntry> = appEntries;
  private readonly _tools: ReadonlyArray<Tool> = tools;

  /**
   * Return the full array of team objects including all sections and projects.
   * @returns All five portal teams
   */
  public getTeams(): ReadonlyArray<Team> {
    return this._teams;
  }

  /**
   * Return all tool entries for the TOOLS navigation section.
   * @returns All registered tools
   */
  public getTools(): ReadonlyArray<Tool> {
    return this._tools;
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
          type: 'section',
          teamKey: team.key,
          toolKey: '',
          teamColor: team.color,
          teamLabel: team.label,
          title: section.label,
          snippet: `${team.label} — ${section.label} (section ${section.num})`,
          sectionId: section.id,
        });
      }
      for (const project of team.projects) {
        results.push({
          id: `project-${project.id}`,
          type: 'project',
          teamKey: team.key,
          toolKey: '',
          teamColor: team.color,
          teamLabel: team.label,
          title: project.name,
          snippet: project.description,
          sectionId: `${team.key}-projects`,
        });
      }
    }

    for (const tool of this._tools) {
      results.push({
        id: `tool-${tool.key}`,
        type: 'tool',
        teamKey: '',
        toolKey: tool.key,
        teamColor: tool.color,
        teamLabel: tool.category,
        title: tool.label,
        snippet: tool.description,
        sectionId: '',
      });
    }

    return results;
  }
}
