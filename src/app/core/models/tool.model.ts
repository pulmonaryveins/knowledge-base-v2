// ── FILE: src/app/core/models/tool.model.ts ──

/** A single key feature entry for a tool page */
export interface ToolFeature {
  readonly title: string;
  readonly body: string;
}

/** A numbered install step or usage example with an inlined code block */
export interface ToolCodeStep {
  readonly title: string;
  readonly description: string;
  readonly code: string;
  readonly language: string;
}

/** Full data record for a tool page */
export interface Tool {
  /** Unique key used for routing and icon resolution */
  readonly key: string;
  /** Display label */
  readonly label: string;
  /** Icon key mapped in TOOL_ICON_MAP (kept for fallback) */
  readonly iconKey: string;
  /** URL to the actual software brand logo (Simple Icons CDN) */
  readonly logoUrl: string;
  /** Brand color */
  readonly color: string;
  /** Category label, e.g. "Frontend Framework" */
  readonly category: string;
  /** Version string shown as a badge */
  readonly version: string;
  /** Short description paragraph */
  readonly description: string;
  /** Official website */
  readonly website: string;
  /** Team labels that use this tool */
  readonly usedBy: ReadonlyArray<string>;
  /** Up to 4 feature cards */
  readonly features: ReadonlyArray<ToolFeature>;
  /** Why NCompassTV chose this tool */
  readonly whyWeUseIt: string;
  /** Step-by-step installation guide */
  readonly install: ReadonlyArray<ToolCodeStep>;
  /** Basic usage code examples */
  readonly basicUse: ReadonlyArray<ToolCodeStep>;
}
