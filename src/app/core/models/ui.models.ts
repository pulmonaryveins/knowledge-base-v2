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
  /** Optional Lucide icon name shown alongside the number badge */
  readonly icon?: string;
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

/** WCAG contrast pair shown in the accessibility tab */
export interface WcagPair {
  readonly label: string;
  readonly foreground: string;
  readonly background: string;
  readonly ratio: string;
  readonly aaNormal: boolean;
  readonly aaLarge: boolean;
  readonly aaaNormal: boolean;
  readonly aaaLarge: boolean;
}

/** A tab within the color palette section */
export interface ColorTab {
  readonly label: string;
  readonly type: 'overview' | 'shades' | 'wcag';
  readonly groups?: ReadonlyArray<ColorGroup>;
  readonly wcagPairs?: ReadonlyArray<WcagPair>;
  readonly wcagNote?: string;
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

/** A single row in the typography tab — shows tag + size, rendered in a specific weight */
export interface TypographyRow {
  /** e.g. 'H1', 'P', 'P.S' */
  readonly tag: string;
  /** Font size, e.g. '36px' */
  readonly size: string;
}

/** One column (Regular or Medium) inside a typography tab */
export interface TypographyColumn {
  /** Column heading, e.g. 'Regular' */
  readonly label: string;
  /** Font weight value, e.g. '400' or '500' */
  readonly weight: string;
  readonly rows: ReadonlyArray<TypographyRow>;
}

/** A single tab group, e.g. 'Nunito – Web' */
export interface TypographyTab {
  /** Tab label shown in the tab bar, e.g. 'Web' */
  readonly label: string;
  /** Font family name shown as the large heading, e.g. 'Nunito - Web' */
  readonly fontName: string;
  /** Preview sentence shown below the heading */
  readonly preview: string;
  /** Exactly two columns: [Regular, Medium] */
  readonly columns: ReadonlyArray<TypographyColumn>;
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
/** A single screen/device size for the grid guide */
export interface ScreenSize {
  readonly width: number;
  readonly height: number;
}

/** A group of screen sizes representing a breakpoint tier */
export interface GridBreakpointGroup {
  /** Section label shown on the badge, e.g. 'Section 1' */
  readonly sectionLabel: string;
  /** Human-readable tier name, e.g. 'Desktop', 'Tablet', 'Mobile' */
  readonly tierLabel: string;
  /** Screen sizes to display */
  readonly screens: ReadonlyArray<ScreenSize>;
}

/** A Font Awesome icon entry for the iconography section */
export interface FaIconEntry {
  /** Display name shown in the catalog, e.g. 'fa-trash' */
  readonly name: string;
  /** Full Font Awesome class string, e.g. 'fa-solid fa-trash' */
  readonly faClass: string;
  /** Short description of the icon's purpose */
  readonly description?: string;
}

/** A single icon size spec */
export interface IconSizeSpec {
  readonly px: number;
}

/** A single tab for the button showcase (Primary / Secondary / Soft Rounded) */
export interface ButtonShowcaseTab {
  readonly label: string;
  readonly variant: 'primary' | 'secondary' | 'soft-rounded';
  readonly defaultTag: string;
}

/** A single spacing token in the design system scale */
export interface SpacingToken {
  /** Tailwind scale step name, e.g. '1', '4', '12' */
  readonly name: string;
  /** Numeric pixel value, e.g. 4, 16, 48 */
  readonly px: number;
  /** CSS rem equivalent, e.g. '0.25rem' */
  readonly rem: string;
  /** Tailwind utility shorthand, e.g. '*-4' (covers p-4, m-4, gap-4, etc.) */
  readonly tailwind: string;
  /** Where this token is typically used */
  readonly usage?: string;
}

/** A named group of spacing tokens */
export interface SpacingGroup {
  readonly label: string;
  readonly description?: string;
  readonly tokens: ReadonlyArray<SpacingToken>;
}

/** A single logo asset entry for the brand guide section */
export interface BrandingLogoItem {
  /** Display label shown below the logo card */
  readonly label: string;
  /** Image src path relative to the public/ folder, e.g. '/COMPASS-BLUE.png' */
  readonly src: string;
  /** CSS background value for the logo card (color, gradient) */
  readonly background: string;
  /** Whether to draw a border around the card (for light/white backgrounds) */
  readonly bordered?: boolean;
  /** Pixel dimensions shown in the caption */
  readonly width?: string;
  readonly height?: string;
  /** Hex color shown in the caption */
  readonly color?: string;
}
