// ── FILE: src/app/core/services/search.service.ts ──

import { Injectable, inject } from '@angular/core';
import { SearchResult } from '../models';
import { DocsDataService } from './docs-data.service';

/**
 * SearchService exposes a single search() method that queries the
 * pre-built index from DocsDataService and returns matching results.
 */
@Injectable({ providedIn: 'root' })
export class SearchService {
  /** Reference to the data layer for the pre-built search index */
  private readonly _docsData = inject(DocsDataService);

  /**
   * Filter the search index for entries matching the query string.
   * Matching is case-insensitive and checks title, snippet, and team label.
   * Returns an empty array for blank queries.
   * @param query - The raw search string typed by the user
   * @returns Filtered and ranked search results
   */
  public search(query: string): ReadonlyArray<SearchResult> {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return this._docsData
      .getSearchIndex()
      .filter(
        (r) =>
          r.title.toLowerCase().includes(q) ||
          r.snippet.toLowerCase().includes(q) ||
          r.teamLabel.toLowerCase().includes(q)
      );
  }
}
