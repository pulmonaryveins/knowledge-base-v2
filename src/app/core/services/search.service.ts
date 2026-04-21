// ── FILE: src/app/core/services/search.service.ts ──

import { Injectable, inject } from '@angular/core';
import { SearchResult } from '../models';
import { DocsDataService } from './docs-data.service';

/**
 * SearchService exposes a single search() method that queries the
 * pre-built index from DocsDataService and returns ranked results.
 *
 * Scoring:
 *   3 — all query words match the title
 *   2 — partial title match
 *   1 — snippet or label match only
 *
 * Multi-word queries require ALL words to match somewhere in the result.
 * Results are sorted by score descending (title matches first).
 */
@Injectable({ providedIn: 'root' })
export class SearchService {
  private readonly _docsData = inject(DocsDataService);

  public search(query: string): ReadonlyArray<SearchResult> {
    const q = query.trim().toLowerCase();
    if (!q) return [];

    const words = q.split(/\s+/).filter(Boolean);

    const scored = this._docsData
      .getSearchIndex()
      .map((r) => ({ result: r, score: this._score(r, words) }))
      .filter(({ score }) => score > 0);

    scored.sort((a, b) => b.score - a.score);

    return scored.map(({ result }) => result);
  }

  private _score(r: SearchResult, words: string[]): number {
    const title   = r.title.toLowerCase();
    const snippet = r.snippet.toLowerCase();
    const label   = r.teamLabel.toLowerCase();

    // All words must match at least somewhere in the combined haystack
    const haystack = `${title} ${snippet} ${label}`;
    const allMatch = words.every((w) => haystack.includes(w));
    if (!allMatch) return 0;

    // Score based on how many words hit the title specifically
    const titleMatches = words.filter((w) => title.includes(w)).length;
    if (titleMatches === words.length) return 3; // full title match
    if (titleMatches > 0)             return 2; // partial title match
    return 1;                                    // snippet / label only
  }
}

