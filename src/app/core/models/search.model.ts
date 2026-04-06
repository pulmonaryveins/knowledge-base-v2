// ── FILE: src/app/core/models/search.model.ts ──

/** Represents a single result returned by the global search */
export interface SearchResult {
  /** Unique identifier for this result */
  readonly id: string;
  /** Team key used for navigation when result is selected */
  readonly teamKey: string;
  /** Hex color of the team, used for the result badge */
  readonly teamColor: string;
  /** Display label of the team */
  readonly teamLabel: string;
  /** Result title shown in bold */
  readonly title: string;
  /** Short snippet of matching content shown below the title */
  readonly snippet: string;
  /** Section ID to scroll to when this result is selected */
  readonly sectionId: string;
}
