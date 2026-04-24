// ── FILE: src/app/core/services/docs-data.service.ts ──

import { Injectable } from '@angular/core';
import { Team, TeamSection, AppEntry } from '../models/team.model';
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
        const keywords = this._extractKeywords(section);
        const snippet  = this._extractSnippet(section);
        // Section-level entry (always present — matches section label and overview content)
        results.push({
          id:          `${team.key}-${section.id}`,
          type:        'section',
          teamKey:     team.key,
          toolKey:     '',
          teamColor:   team.color,
          teamLabel:   team.label,
          title:       section.label,
          snippet,
          sectionId:   section.id,
          keywords,
          parentLabel: '',
        });
        // Sub-item entries — each tech row / step / pattern / mistake as its own result
        this._pushSubResults(team.key, team.label, team.color, section, results);
      }
      for (const project of team.projects) {
        const { doc } = project;
        const kw = [
          project.name,
          project.description,
          doc.purpose,
          doc.meta.stack, doc.meta.repo, doc.meta.deploy,
          ...doc.features.map(f => `${f.title} ${f.body}`),
          ...doc.gettingStarted.map(s => `${s.title} ${s.description}`),
        ].filter(Boolean).join(' ');
        results.push({
          id:          `project-${project.id}`,
          type:        'project',
          teamKey:     team.key,
          toolKey:     '',
          teamColor:   team.color,
          teamLabel:   team.label,
          title:       project.name,
          snippet:     project.description,
          sectionId:   `${team.key}-projects`,
          keywords:    kw,
          parentLabel: '',
        });
      }
    }

    for (const tool of this._tools()) {
      results.push({
        id:          `tool-${tool.key}`,
        type:        'tool',
        teamKey:     '',
        toolKey:     tool.key,
        teamColor:   tool.color,
        teamLabel:   tool.category,
        title:       tool.label,
        snippet:     tool.description,
        sectionId:   '',
        keywords:    [tool.label, tool.description, tool.category].join(' '),
        parentLabel: '',
      });
    }

    return results;
  }

  /** Push individual sub-item results for sections whose content is granular enough to warrant it. */
  private _pushSubResults(
    teamKey: string, teamLabel: string, teamColor: string,
    section: TeamSection, results: SearchResult[],
  ): void {
    const c    = section.content;
    const slug = (s: string) => s.toLowerCase().replace(/\W+/g, '-').slice(0, 40);
    const base = {
      type:        'section' as const,
      teamKey,
      toolKey:     '',
      teamColor,
      teamLabel,
      sectionId:   section.id,
      parentLabel: section.label,
    };

    if (c.type === 'tech-stack') {
      for (const row of c.table.rows) {
        const [name, version, purpose] = row.cells;
        if (!name) continue;
        results.push({
          ...base,
          id:       `${teamKey}-${section.id}-tech-${slug(name)}`,
          title:    name,
          snippet:  [purpose, version ? `v${version}` : ''].filter(Boolean).join(' · '),
          keywords: row.cells.join(' '),
        });
      }
    } else if (c.type === 'getting-started') {
      for (const step of c.steps) {
        results.push({
          ...base,
          id:       `${teamKey}-${section.id}-step-${slug(step.title)}`,
          title:    step.title,
          snippet:  step.description?.slice(0, 130) ?? '',
          keywords: [step.title, step.description, step.code].filter(Boolean).join(' '),
        });
      }
    } else if (c.type === 'coding-patterns') {
      for (const p of c.patterns) {
        results.push({
          ...base,
          id:       `${teamKey}-${section.id}-pattern-${slug(p.title)}`,
          title:    p.title,
          snippet:  p.description?.slice(0, 130) ?? '',
          keywords: [p.title, p.description, ...(p.rules ?? []), p.codeBlock?.code ?? ''].join(' '),
        });
      }
    } else if (c.type === 'mistakes') {
      for (const row of c.table.rows) {
        const [mistake, fix] = row.cells;
        if (!mistake) continue;
        results.push({
          ...base,
          id:       `${teamKey}-${section.id}-mistake-${slug(mistake)}`,
          title:    mistake.slice(0, 72),
          snippet:  fix?.slice(0, 130) ?? '',
          keywords: row.cells.join(' '),
        });
      }
    }
  }

  /** Extract all human-readable text from a section's content for full-text keyword matching. */
  private _extractKeywords(section: TeamSection): string {
    const parts: string[] = [];
    if (section.subHeader) parts.push(section.subHeader);
    const c = section.content;

    if (c.type === 'tech-stack') {
      for (const row of c.table.rows) parts.push(...row.cells);
    } else if (c.type === 'getting-started') {
      for (const step of c.steps) {
        parts.push(step.title);
        if (step.description) parts.push(step.description);
        if (step.code)        parts.push(step.code);
      }
    } else if (c.type === 'folder-arch') {
      for (const card of c.cards) { parts.push(card.title, card.body); }
    } else if (c.type === 'coding-patterns') {
      for (const p of c.patterns) {
        parts.push(p.title, p.description);
        if (p.rules)           parts.push(...p.rules);
        if (p.codeBlock?.code) parts.push(p.codeBlock.code);
      }
    } else if (c.type === 'mistakes') {
      for (const row of c.table.rows) parts.push(...row.cells);
    } else if (c.type === 'team-contacts') {
      for (const contact of c.contacts) parts.push(contact.name, contact.role);
    } else if (c.type === 'component-spec') {
      parts.push(c.name, c.description);
    }

    return parts.filter(Boolean).join(' ');
  }

  /** Derive a short human-readable snippet for display from a section's content. */
  private _extractSnippet(section: TeamSection): string {
    if (section.subHeader) return section.subHeader;
    const c = section.content;

    if (c.type === 'getting-started' && c.steps.length > 0) {
      const first = c.steps[0];
      return first.description ? first.description.slice(0, 120) : first.title;
    }
    if (c.type === 'folder-arch' && c.cards.length > 0) {
      return c.cards[0].body.slice(0, 120);
    }
    if (c.type === 'coding-patterns' && c.patterns.length > 0) {
      return c.patterns[0].description.slice(0, 120);
    }
    if (c.type === 'tech-stack') {
      const names = c.table.rows.map(r => r.cells[0]).slice(0, 5).join(', ');
      return `${c.table.rows.length} technologies — ${names}`;
    }
    if (c.type === 'mistakes') {
      return `${c.table.rows.length} common mistakes and correct approaches`;
    }
    if (c.type === 'team-contacts') {
      return c.contacts.map(ct => `${ct.name} (${ct.role})`).join(', ');
    }
    return '';
  }
}
