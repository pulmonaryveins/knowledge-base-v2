// ── FILE: src/app/core/models/ui.models.ts ──

/** Represents the variant type of a project status badge */
export type StatusType = 'Live' | 'Dev' | 'Beta' | 'Revamp' | 'Design';

/** Represents the variant type of a callout block */
export type CalloutType = 'tip' | 'warning' | 'info' | 'danger';

/** Data model for a callout block component */
export interface CalloutData {
  /** Visual variant controlling colors and icon */
  readonly type: CalloutType;
  /** Optional bold heading for the callout */
  readonly title?: string;
  /** Body text of the callout */
  readonly body: string;
}

/** Data model for an info card component */
export interface InfoCardData {
  /** Card heading in Syne font */
  readonly title: string;
  /** Card body paragraph text */
  readonly body: string;
  /** Optional emoji icon displayed in a colored bubble above the title */
  readonly icon?: string;
  /** Optional hex accent color for the icon bubble background and left border */
  readonly accent?: string;
}

/** A single step in a numbered step list */
export interface Step {
  /** Short, bold step title */
  readonly title: string;
  /** Longer description of what to do */
  readonly description: string;
  /** Optional inline code snippet shown below the description */
  readonly code?: string;
  /** Programming language label for the inline code snippet */
  readonly language?: string;
}

/** A single row in a data table */
export interface TableRow {
  /** Ordered array of cell values; first cell is rendered in mono font */
  readonly cells: ReadonlyArray<string>;
}

/** Data model for a reusable dark-header data table */
export interface DataTable {
  /** Column header labels rendered in the navy thead */
  readonly headers: ReadonlyArray<string>;
  /** Table body rows */
  readonly rows: ReadonlyArray<TableRow>;
}

/** Data model for a syntax-highlighted code block */
export interface CodeBlockData {
  /** Language label shown in the top-right of the code block header */
  readonly language: string;
  /** Raw code string rendered inside the pre element */
  readonly code: string;
}

/** A coding pattern entry with an example and optional callout */
export interface CodingPattern {
  /** Short pattern title */
  readonly title: string;
  /** Explanation of the pattern */
  readonly description: string;
  /** Code block demonstrating the pattern */
  readonly codeBlock: CodeBlockData;
  /** Optional tip/warning callout attached to this pattern */
  readonly callout?: CalloutData;
}

// ── UI/UX Visual Section Models ──────────────────────────────────────────────

/** A single color swatch with name and hex value */
export interface ColorSwatch {
  readonly name: string;
  readonly hex: string;
}

/** A group of color swatches with a section label */
export interface ColorGroup {
  readonly label: string;
  /** Large featured swatches (primary, accent, semantic) */
  readonly main?: ReadonlyArray<ColorSwatch>;
  /** Smaller shade swatches (the full tint/shade scale) */
  readonly shades?: ReadonlyArray<ColorSwatch>;
}

/** A single typography level sample */
export interface TypographySample {
  readonly tag: string;
  readonly label: string;
  readonly useCase: string;
  readonly size: string;
  readonly weight: string;
  readonly font: string;
}

/** A single component size variant with its spec values */
export interface ComponentVariant {
  readonly label: string;
  readonly height: string;
  readonly width: string;
  readonly paddingX: string;
  readonly paddingY: string;
  readonly cornerRadius: string;
  readonly borderSize: string;
  readonly borderPlacement: string;
  readonly gap: string;
  readonly align: string;
}
