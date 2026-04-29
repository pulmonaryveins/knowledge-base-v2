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

  /** Canonical key order derived from the hardcoded team data */
  private readonly _teamKeyOrder: ReadonlyArray<string> = this._staticTeams.map(t => t.key);

  /** Canonical key order derived from the hardcoded tools data */
  private readonly _toolKeyOrder: ReadonlyArray<string> = staticTools.map(t => t.key);

  /**
   * Sort an array by a canonical key order list.
   * Items whose key is not in the reference list are appended at the end
   * in their original relative order.
   */
  private _sortByKeyOrder<T extends { key: string }>(items: T[], order: ReadonlyArray<string>): T[] {
    const indexed = new Map(order.map((k, i) => [k, i]));
    return [...items].sort((a, b) => {
      const ia = indexed.has(a.key) ? indexed.get(a.key)! : order.length;
      const ib = indexed.has(b.key) ? indexed.get(b.key)! : order.length;
      return ia - ib;
    });
  }

  /** Signal holding the current list of teams (initially populated from static fallback) */
  private readonly _teams = signal<ReadonlyArray<Team>>(this._staticTeams);

  /** Signal holding the current list of app entries (initially populated from static fallback) */
  private readonly _appEntries = signal<ReadonlyArray<AppEntry>>(appEntries);

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
          console.log('[DocsDataService] Live tools from Strapi:', liveTools);
          if (liveTools && liveTools.length > 0) {
            this._tools.set(this._sortByKeyOrder(liveTools, this._toolKeyOrder));
          }
        },
        error: (err: unknown) => {
          console.error('[DocsDataService] Failed to load live tools from Strapi:', err);
        },
      });

    // 2. Fetch live teams
    strapi
      .getTeams()
      .pipe(takeUntilDestroyed())
      .subscribe({
        next: (liveTeams: any[]) => {
          console.log('[DocsDataService] Live teams from Strapi:', liveTeams);
          if (liveTeams && liveTeams.length > 0) {
            // Sort teams to match hardcoded order; also sort each team's projects
            // to match the hardcoded project order for that team.
            const sortedTeams = this._sortByKeyOrder(liveTeams, this._teamKeyOrder).map(team => {
              const staticTeam = this._staticTeams.find(st => st.key === team.key);

              // Sort projects to match hardcoded order
              if (staticTeam && Array.isArray(team.projects) && team.projects.length > 0) {
                const projectKeyOrder = staticTeam.projects.map((p: any) => p.id);
                team = { ...team, projects: this._sortByKeyOrder(team.projects, projectKeyOrder) };
              }

              // Re-inject hardcoded-only sections that Strapi doesn't manage
              // (e.g. custom frontend-only types like 'pi-ecosystem' that have no Strapi component).
              // Any section id present in static data but absent from the Strapi response
              // is spliced back in at its original index position.
              if (staticTeam && Array.isArray(team.sections)) {
                const liveSectionIds = new Set(team.sections.map((s: any) => s.id));
                const hardcodedOnly = staticTeam.sections.filter(s => !liveSectionIds.has(s.id));

                if (hardcodedOnly.length > 0) {
                  const merged = [...team.sections];
                  for (const section of hardcodedOnly) {
                    const targetIdx = staticTeam.sections.findIndex(s => s.id === section.id);
                    // Clamp to valid range in case live sections are fewer
                    const insertAt = Math.min(targetIdx, merged.length);
                    merged.splice(insertAt, 0, section);
                  }
                  team = { ...team, sections: merged };
                }
              }

              return team;
            });
            this._teams.set(sortedTeams);
          }
        },
        error: (err: unknown) => {
          console.error('[DocsDataService] Failed to load live teams from Strapi:', err);
        },
      });

    // 3. Fetch live projects for appEntries
    strapi
      .getProjects()
      .pipe(takeUntilDestroyed())
      .subscribe({
        next: (liveProjects: any[]) => {
          console.log('[DocsDataService] Live projects from Strapi:', liveProjects);
          if (liveProjects && liveProjects.length > 0) {
            this._appEntries.set(liveProjects.map(p => ({
              name: p.name,
              description: p.description,
              status: p.status,
              tags: (p.projectMeta?.stack || '').split('·').map((s: string) => s.trim()).filter(Boolean),
              ownerTeam: p.teamKey || '',
              icon: p.icon || 'package',
              notes: p.description || ''
            })));
          }
        },
        error: (err: unknown) => {
          console.error('[DocsDataService] Failed to load live projects from Strapi:', err);
        },
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
    return this._appEntries();
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
