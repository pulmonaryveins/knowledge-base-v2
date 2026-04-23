// ── FILE: src/app/core/services/docs-data.service.ts ──

import { Injectable } from '@angular/core';
import { Team, AppEntry } from '../models/team.model';
import { Tool } from '../models/tool.model';
import { SearchResult } from '../models/search.model';
import {
  frontendTeam,
  backendTeam,
  uiuxTeam,
  qaTeam,
  rdTeam,
  webdevTeam,
  piPlayerTeam,
  appEntries,
  tools as staticTools,
} from '../data';
import { StrapiService } from './strapi.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { signal, inject } from '@angular/core';

/**
 * DocsDataService is the single source of truth for all portal content.
 * It delegates to per-team data files and exposes three public methods
 * consumed by NavigationService, SearchService, SidebarComponent, and AppsPageComponent.
 */
@Injectable({ providedIn: 'root' })
export class DocsDataService {
  private readonly _staticTeams: ReadonlyArray<Team> = [
    frontendTeam,
    backendTeam,
    webdevTeam,
    qaTeam,
    rdTeam,
    uiuxTeam,
    piPlayerTeam,
  ];

  /** Signal holding the current list of teams (initially populated from static fallback) */
  private readonly _teams = signal<ReadonlyArray<Team>>(this._staticTeams);

  private readonly _appEntries: ReadonlyArray<AppEntry> = appEntries;

  /** Signal holding the current list of tools (initially populated from static fallback) */
  private readonly _tools = signal<ReadonlyArray<Tool>>(staticTools);

  constructor() {
    const strapi = inject(StrapiService);
    
    // 1. Fetch live tools
    strapi
      .getTools()
      .pipe(takeUntilDestroyed())
      .subscribe({
        next: (liveTools: Tool[]) => {
          if (liveTools && liveTools.length > 0) {
            this._tools.set(liveTools);
          }
        },
        error: (err: unknown) => console.error('Failed to load live tools from Strapi:', err),
      });

    // 2. Fetch live teams
    strapi
      .getTeams()
      .pipe(takeUntilDestroyed())
      .subscribe({
        next: (liveTeams: any[]) => {
          if (liveTeams && liveTeams.length > 0) {
            this._teams.set(liveTeams);
          }
        },
        error: (err: unknown) => console.error('Failed to load live teams from Strapi:', err),
      });
  }

  /**
   * Return the full array of team objects including all sections and projects.
   * @returns All five portal teams
   */
  public getTeams(): ReadonlyArray<Team> {
    return this._teams();
  }

  /**
   * Return all tool entries for the TOOLS navigation section.
   * @returns All registered tools
   */
  public getTools(): ReadonlyArray<Tool> {
    return this._tools();
  }

  /**
   * Return all app entries for the Apps & Projects overview grid.
   * @returns All application entries
   */
  public getAppEntries(): ReadonlyArray<AppEntry> {
    return this._appEntries;
  }

  /**
   * Build and return the full search index.
   * Computed based on the current teams and tools signals.
   */
  public getSearchIndex(): ReadonlyArray<SearchResult> {
    const results: SearchResult[] = [];

    for (const team of this._teams()) {
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

    for (const tool of this._tools()) {
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
