// ── FILE: src/app/core/services/search.service.ts ──

import { Injectable, inject } from '@angular/core';
import { SearchResult } from '../models';
import { DocsDataService } from './docs-data.service';
import { RdDocumentsService } from './rd-documents.service';

/**
 * SearchService exposes a single search() method that queries the
 * pre-built index from DocsDataService and returns ranked results.
 *
 * Scoring:
 *   4 — all query words match the title
 *   3 — partial title match
 *   2 — match in snippet or team label
 *   1 — match in keywords (content body — steps, cards, patterns, table rows)
 *
 * Multi-word queries require ALL words to match somewhere in the combined haystack.
 * When a match is keyword-only, the snippet is replaced with the surrounding context
 * so the user can see exactly what matched.
 */
@Injectable({ providedIn: 'root' })
export class SearchService {
  /** Provides the pre-built search index from all static team documentation. */
  private readonly _docsData = inject(DocsDataService);

  /** Provides the live Supabase-backed R&D document cache. */
  private readonly _rdDocs   = inject(RdDocumentsService);

  /**
   * Run a full-text search across all indexed sections and R&D documents.
   *
   * @param query - Raw user input; whitespace-trimmed and lowercased internally.
   * @returns Scored results sorted highest-first. Empty array when query is blank.
   */
  public search(query: string): ReadonlyArray<SearchResult> {
    const q = query.trim().toLowerCase();
    if (!q) return [];

    const words = q.split(/\s+/).filter(Boolean);

    const scored = [
      ...this._docsData.getSearchIndex(),
      ...this._buildRdDocIndex(),
    ]
      .map((r) => ({ result: r, score: this._score(r, words) }))
      .filter(({ score }) => score > 0);

    scored.sort((a, b) => b.score - a.score);

    return scored.map(({ result, score }) => {
      // For keyword-only matches, surface the matching context as the snippet
      if (score === 1 && result.keywords) {
        const ctx = this._matchContext(result.keywords, words);
        if (ctx) return { ...result, snippet: ctx };
      }
      return result;
    });
  }

  /**
   * Score a single search result against the query words.
   *
   * @param r     - The candidate result from the index.
   * @param words - Lowercased, space-split query tokens.
   * @returns 0 if any word is absent from the combined haystack; otherwise 1–4.
   */
  private _score(r: SearchResult, words: string[]): number {
    const title    = r.title.toLowerCase();
    const snippet  = r.snippet.toLowerCase();
    const label    = r.teamLabel.toLowerCase();
    const keywords = r.keywords.toLowerCase();

    const haystack = `${title} ${snippet} ${label} ${keywords}`;
    if (!words.every((w) => haystack.includes(w))) return 0;

    const titleMatches = words.filter((w) => title.includes(w)).length;
    if (titleMatches === words.length) return 4;
    if (titleMatches > 0)             return 3;

    const metaHaystack = `${snippet} ${label}`;
    if (words.every((w) => metaHaystack.includes(w))) return 2;

    return 1; // match is inside keywords (content body)
  }

  /** Find the first matching word in the keywords string and return ±80 chars of context. */
  private _matchContext(keywords: string, words: string[]): string {
    const lower = keywords.toLowerCase();
    for (const word of words) {
      const idx = lower.indexOf(word);
      if (idx === -1) continue;
      const start = Math.max(0, idx - 50);
      const end   = Math.min(keywords.length, idx + word.length + 90);
      let excerpt = keywords.slice(start, end).trim();
      if (start > 0)               excerpt = '…' + excerpt;
      if (end < keywords.length)   excerpt += '…';
      return excerpt;
    }
    return keywords.slice(0, 140);
  }

  /** Build live search entries from the Supabase-backed R&D document cache. */
  private _buildRdDocIndex(): SearchResult[] {
    return this._rdDocs.cachedDocs().map((doc) => ({
      id:          `rd-doc-${doc.id}`,
      type:        'section' as const,
      teamKey:     'rd',
      toolKey:     '',
      teamColor:   '#0D9488',
      teamLabel:   'Research & Development',
      title:       doc.title,
      snippet:     doc.section ?? 'R&D Document',
      sectionId:   doc.section ? `rd-sec-${this._slug(doc.section)}` : '',
      keywords:    [doc.title, doc.section].filter(Boolean).join(' '),
      parentLabel: doc.section ?? '',
    }));
  }

  /**
   * Convert a section label to a URL-safe slug for building anchor `sectionId` values.
   *
   * @param s - Raw section label string.
   * @returns Lowercase hyphen-separated slug with no leading/trailing hyphens.
   */
  private _slug(s: string): string {
    return s.toLowerCase().replace(/\W+/g, '-').replace(/(^-|-$)/g, '');
  }
}

