// ── FILE: src/app/core/models/search.model.ts ──

/** Discriminates what kind of content a search result points to */
export type SearchResultType = 'section' | 'project' | 'tool';

/** Represents a single result returned by the global search */
export interface SearchResult {
  /** Unique identifier for this result */
  readonly id: string;
  /** Whether this result is a team section, project, or tool */
  readonly type: SearchResultType;
  /** Team key used for navigation when result is selected */
  readonly teamKey: string;
  /** Tool key — populated only when type === 'tool', empty string otherwise */
  readonly toolKey: string;
  /** Hex color of the team/tool, used for the result badge */
  readonly teamColor: string;
  /** Display label of the team or tool category */
  readonly teamLabel: string;
  /** Result title shown in bold */
  readonly title: string;
  /** Short snippet of matching content shown below the title */
  readonly snippet: string;
  /** Section ID to scroll to when this result is selected */
  readonly sectionId: string;
}
