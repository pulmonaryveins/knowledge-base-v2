// ── FILE: src/app/core/models/strapi.model.ts ──

/**
 * Generic Strapi API Response wrapper.
 * @template T - The type of the data being returned.
 */
export interface StrapiResponse<T> {
  /** The actual data payload */
  data: T;
  /** Metadata associated with the response */
  meta: {
    /** Pagination details if the response contains a list */
    pagination?: {
      /** Current page number */
      page: number;
      /** Number of items per page */
      pageSize: number;
      /** Total number of pages available */
      pageCount: number;
      /** Total number of items available across all pages */
      total: number;
    };
  };
}

/**
 * Strapi Entity wrapper with ID and Attributes.
 * Compatible with both Strapi v4 (nested attributes) and v5 (potentially flattened).
 * @template T - The type of the entity attributes.
 */
export interface StrapiEntity<T> {
  /** The unique numeric ID of the entity */
  id: number;
  /** 
   * The attributes object containing the entity's fields.
   * Attributes is optional as Strapi v5 may return flattened data.
   */
  attributes?: T;
}

// ── Raw Strapi component sub-types (as returned from the API) ─────────────────

/**
 * A raw header cell from a Strapi data table component.
 */
export interface StrapiTableHeader {
  /** The text value of the header cell */
  value: string;
}

/**
 * A raw cell from a Strapi data table row.
 */
export interface StrapiTableCell {
  /** The text value of the cell */
  value: string;
}

/**
 * A raw row in a Strapi data table.
 */
export interface StrapiTableRow {
  /** Collection of cells in this row */
  cells: StrapiTableHeader[];
}

/**
 * A Strapi data table component.
 * Used in tech-stack and common mistakes sections.
 */
export interface StrapiDataTable {
  /** The headers for the table */
  headers: StrapiTableHeader[];
  /** The rows containing the table data */
  rows: StrapiTableRow[];
}

/**
 * A raw code block component from Strapi.
 */
export interface StrapiCodeBlock {
  /** The raw source code */
  code: string;
  /** The programming language for syntax highlighting (e.g., 'typescript', 'bash') */
  language: string;
}

/**
 * A raw step component from Strapi.
 * Used in getting-started and QA stages sections.
 */
export interface StrapiStep {
  /** The title of the step */
  title: string;
  /** A detailed description of the step */
  description: string;
  /** Optional Lucide icon name associated with the step */
  icon?: string;
  /** Optional code block associated with the step */
  code?: StrapiCodeBlock;
}

/**
 * A raw coding-pattern rule entry.
 */
export interface StrapiPatternRule {
  /** The text value of the rule or checklist item */
  value: string;
}

/**
 * A raw callout component from Strapi.
 */
export interface StrapiCallout {
  /** The variant type of the callout (e.g., 'tip', 'warning') */
  type: string;
  /** The message text of the callout */
  message: string;
}

/**
 * A raw coding-pattern entry from Strapi.
 */
export interface StrapiCodingPattern {
  /** The title of the pattern */
  title: string;
  /** The description or rationale for the pattern */
  description: string;
  /** Optional list of rules or checklist items for the pattern */
  rules?: StrapiPatternRule[];
  /** Optional code block demonstrating the pattern */
  code?: StrapiCodeBlock;
  /** Optional callout/tip associated with the pattern */
  callout?: StrapiCallout;
}

/**
 * A raw info card component from Strapi.
 * Used in folder-arch sections.
 */
export interface StrapiInfoCard {
  /** The title of the card */
  title: string;
  /** The body content of the card */
  body: string;
}

/**
 * A raw team contact entry from Strapi.
 */
export interface StrapiContact {
  /** The full name of the contact */
  name: string;
  /** The role or title of the contact */
  role: string;
  /** The initials for the avatar placeholder */
  initials: string;
  /** The hex color for the avatar background */
  color: string;
}

/**
 * A raw screen size entry from Strapi.
 * Used in responsive grid documentation.
 */
export interface StrapiScreenSize {
  /** The width in pixels */
  width: number;
  /** The height in pixels */
  height: number;
}

/**
 * A raw breakpoint group from Strapi.
 * Used in the grid section.
 */
export interface StrapiGridGroup {
  /** The label for the section (e.g., 'Desktop') */
  sectionLabel: string;
  /** The label for the tier */
  tierLabel: string;
  /** Collection of screen sizes in this group */
  screens: StrapiScreenSize[];
}

/**
 * A raw icon size specification entry.
 */
export interface StrapiIconSize {
  /** The size in pixels */
  px: number;
}

/**
 * A raw Font Awesome icon entry from Strapi.
 */
export interface StrapiIcon {
  /** The friendly name of the icon */
  name: string;
  /** The full Font Awesome CSS class (e.g., 'fa-solid fa-user') */
  faClass: string;
  /** Optional description of the icon's usage */
  description?: string;
}

/**
 * A raw spacing token entry from Strapi.
 */
export interface StrapiSpacingToken {
  /** The token name (e.g., '4', '8') */
  name: string;
  /** The value in pixels */
  px: number;
  /** The value in rems */
  rem: string;
  /** The corresponding Tailwind utility class (e.g., 'p-4') */
  tailwind: string;
  /** Optional description of typical usage */
  usage?: string;
}

/**
 * A raw spacing group component from Strapi.
 */
export interface StrapiSpacingGroup {
  /** The label for the spacing group */
  label: string;
  /** Optional description of the group's purpose */
  description?: string;
  /** The spacing tokens within this group */
  tokens: StrapiSpacingToken[];
}

/**
 * A raw button showcase tab component from Strapi.
 */
export interface StrapiButtonTab {
  /** The label for the tab */
  label: string;
  /** The variant type for the button */
  variant: 'primary' | 'secondary' | 'soft-rounded';
  /** The default HTML tag for the button */
  defaultTag: string;
}

/**
 * A raw Strapi media object.
 * Handles variations in nested data structures across Strapi versions.
 */
export interface StrapiMediaData {
  /** Direct URL (v5 flattened style) */
  url?: string;
  /** Nested data object (v4 style) */
  data?: {
    /** URL within the data object */
    url?: string;
    /** Attributes containing the URL */
    attributes?: { url?: string };
  };
}

/**
 * A raw logo/asset entry from a Strapi branding section.
 */
export interface StrapiAssetEntry {
  /** The display label for the asset */
  label: string;
  /** The media data for the asset icon/logo */
  asset?: StrapiMediaData;
  /** The background color or style for the asset preview */
  background: string;
  /** Whether the asset preview should have a border */
  bordered?: boolean;
  /** The display width of the asset in documentation */
  width?: string;
  /** The display height of the asset in documentation */
  height?: string;
  /** Optional hex color code associated with the asset */
  color?: string;
}

/**
 * A raw color swatch entry from Strapi.
 */
export interface StrapiColorSwatch {
  /** The name of the color */
  name: string;
  /** The hex color code */
  hex: string;
}

/**
 * A raw color group entry from Strapi.
 */
export interface StrapiColorGroup {
  /** The label for the color group */
  label: string;
  /** Collection of swatches in this group */
  swatches?: StrapiColorSwatch[];
}

/**
 * A raw WCAG contrast pair entry from Strapi.
 */
export interface StrapiWcagPair {
  /** The label for the contrast pair */
  label: string;
  /** The foreground hex color */
  foreground: string;
  /** The background hex color */
  background: string;
  /** The calculated contrast ratio */
  ratio: string;
  /** Whether it passes AA for normal text */
  aaNormal: boolean;
  /** Whether it passes AA for large text */
  aaLarge: boolean;
  /** Whether it passes AAA for normal text */
  aaaNormal: boolean;
  /** Whether it passes AAA for large text */
  aaaLarge: boolean;
}

/**
 * A raw color palette tab component from Strapi.
 */
export interface StrapiColorTab {
  /** The label for the tab */
  label: string;
  /** The type of color view */
  type: 'overview' | 'shades' | 'wcag';
  /** Color groups for overview/shades view */
  groups?: StrapiColorGroup[];
  /** WCAG pairs for the accessibility view */
  wcagPairs?: StrapiWcagPair[];
  /** Optional accessibility notes */
  wcagNote?: string;
}

/**
 * A raw typography row entry from Strapi.
 */
export interface StrapiTypographyRow {
  /** The HTML tag or label (e.g., 'H1', 'Body') */
  tag: string;
  /** The font size (e.g., '24px') */
  size: string;
}

/**
 * A raw typography column component from Strapi.
 */
export interface StrapiTypographyColumn {
  /** The column label (e.g., 'Regular', 'Bold') */
  label: string;
  /** The font weight */
  weight: string;
  /** The typography rows in this column */
  rows: StrapiTypographyRow[];
}

/**
 * A raw typography tab component from Strapi.
 */
export interface StrapiTypographyTab {
  /** The label for the tab */
  label: string;
  /** The name of the font family */
  fontName: string;
  /** The preview text string */
  preview: string;
  /** The columns defining the typography scale */
  columns: StrapiTypographyColumn[];
}

// ── Section component interfaces (raw Strapi dynamic-zone entries) ────────────

/**
 * Base interface for all Strapi dynamic zone components.
 */
export interface StrapiComponent {
  /** Unique numeric ID of the component instance */
  id: number;
  /** The discriminator field for the component type */
  __component: string;
  /** Catch-all for dynamic properties */
  [key: string]: unknown;
}

/**
 * Raw tech-stack section component.
 */
export interface StrapiTechStackSection extends StrapiComponent {
  __component: 'sections.tech-stack';
  /** Optional custom title */
  title?: string;
  /** Optional custom subheader */
  subHeader?: string;
  /** Unique key for the section */
  key?: string;
  /** The data table containing the tech stack */
  dataTable?: StrapiDataTable | StrapiDataTable[];
}

/**
 * Raw getting-started or QA stages section component.
 */
export interface StrapiGettingStartedSection extends StrapiComponent {
  __component: 'sections.getting-started' | 'sections.qa-stages';
  /** Optional custom title */
  title?: string;
  /** Optional custom subheader */
  subHeader?: string;
  /** Unique key for the section */
  key?: string;
  /** The list of steps */
  steps?: StrapiStep[];
  /** Display layout style (e.g., 'list', 'grid') */
  layout?: string;
  /** Optional main code block */
  mainCode?: StrapiCodeBlock | StrapiCodeBlock[];
}

/**
 * Raw folder-architecture section component.
 */
export interface StrapiFolderArchSection extends StrapiComponent {
  __component: 'sections.folder-arch';
  /** Optional custom title */
  title?: string;
  /** Optional custom subheader */
  subHeader?: string;
  /** Unique key for the section */
  key?: string;
  /** Info cards describing the architecture */
  cards?: StrapiInfoCard[];
  /** Code block for the structure (v4 style) */
  maincode?: StrapiCodeBlock;
  /** Code block for the structure (v5 style) */
  mainCode?: StrapiCodeBlock;
}

/**
 * Raw coding-patterns section component.
 */
export interface StrapiCodingPatternsSection extends StrapiComponent {
  __component: 'sections.coding-patterns' | 'shared.coding-patterns';
  /** Optional custom title */
  title?: string;
  /** Optional custom subheader */
  subHeader?: string;
  /** Unique key for the section */
  key?: string;
  /** The list of coding patterns */
  patterns?: StrapiCodingPattern[];
  /** Display layout style */
  layout?: string;
}

/**
 * Raw mistakes section component.
 */
export interface StrapiMistakesSection extends StrapiComponent {
  __component: 'sections.mistakes';
  /** Optional custom title */
  title?: string;
  /** Optional custom subheader */
  subHeader?: string;
  /** Unique key for the section */
  key?: string;
  /** The table of mistakes (v4 style) */
  mistakeTable?: StrapiDataTable | StrapiDataTable[];
  /** The table of mistakes (v5 style) */
  dataTable?: StrapiDataTable | StrapiDataTable[];
}

/**
 * Raw contact-list section component.
 */
export interface StrapiContactListSection extends StrapiComponent {
  __component: 'sections.contact-list';
  /** Optional custom title */
  title?: string;
  /** Optional custom subheader */
  subHeader?: string;
  /** Unique key for the section */
  key?: string;
  /** The list of team contacts */
  contacts?: StrapiContact[];
}

/**
 * Raw projects section component.
 */
export interface StrapiProjectsSection extends StrapiComponent {
  __component: 'sections.projects';
  /** Optional custom title */
  title?: string;
  /** Unique key for the section */
  key?: string;
}

/**
 * Raw branding section component.
 */
export interface StrapiBrandingSection extends StrapiComponent {
  __component: 'sections.branding';
  /** Optional custom title */
  title?: string;
  /** Unique key for the section */
  key?: string;
  /** Main logo assets */
  mainLogos?: StrapiAssetEntry[];
  /** Favicon asset */
  favicon?: StrapiAssetEntry;
  /** Sidebar collapsed state assets */
  sidebarCollapsed?: StrapiAssetEntry[];
  /** Sidebar expanded state assets */
  sidebarExpanded?: StrapiAssetEntry[];
}

/**
 * Raw color-palette section component.
 */
export interface StrapiColorPaletteSection extends StrapiComponent {
  __component: 'sections.color-palette';
  /** Optional custom title */
  title?: string;
  /** Unique key for the section */
  key?: string;
  /** The tabs within the color palette */
  tabs?: StrapiColorTab[];
}

/**
 * Raw typography-scale section component.
 */
export interface StrapiTypographyScaleSection extends StrapiComponent {
  __component: 'sections.typography-scale';
  /** Optional custom title */
  title?: string;
  /** Unique key for the section */
  key?: string;
  /** The tabs within the typography scale */
  tabs?: StrapiTypographyTab[];
}

/**
 * Raw grid section component.
 */
export interface StrapiGridSection extends StrapiComponent {
  __component: 'sections.grid';
  /** Optional custom title */
  title?: string;
  /** Unique key for the section */
  key?: string;
  /** Optional description */
  description?: string;
  /** The breakpoint groups */
  groups?: StrapiGridGroup[];
}

/**
 * Raw iconography section component.
 */
export interface StrapiIconographySection extends StrapiComponent {
  __component: 'sections.iconography';
  /** Optional custom title */
  title?: string;
  /** Unique key for the section */
  key?: string;
  /** Optional description */
  description?: string;
  /** The icon sizes defined */
  sizes?: StrapiIconSize[];
  /** The icons included in the catalog */
  icons?: StrapiIcon[];
}

/**
 * Raw spacing section component.
 */
export interface StrapiSpacingSection extends StrapiComponent {
  __component: 'sections.spacing';
  /** Optional custom title */
  title?: string;
  /** Unique key for the section */
  key?: string;
  /** Optional description */
  description?: string;
  /** Optional note or disclaimer */
  note?: string;
  /** The spacing token groups */
  groups?: StrapiSpacingGroup[];
}

/**
 * Raw button-showcase section component.
 */
export interface StrapiButtonShowcaseSection extends StrapiComponent {
  __component: 'sections.button-showcase';
  /** Optional custom title */
  title?: string;
  /** Unique key for the section */
  key?: string;
  /** The tabs within the button showcase */
  tabs?: StrapiButtonTab[];
}

/**
 * Raw NC Phase section component.
 * Used for dynamic phase-based content (e.g., UX Design, Web Design).
 */
export interface StrapiNcPhaseSection extends StrapiComponent {
  __component: 'sections.nc-phase';
  /** The specific phase identifier */
  phase?: string;
  /** Optional custom title */
  title?: string;
  /** Unique key for the section */
  key?: string;
}

// ── Specific Strapi Data Models ───────────────────────────────────────────────

/**
 * Raw team data structure from Strapi.
 */
export interface TeamStrapi {
  /** The display label for the team */
  label: string;
  /** The unique key for the team (used in routing) */
  key: string;
  /** The brand color of the team */
  color: string;
  /** The CSS gradient for the team hero background */
  gradient: string;
  /** The icon name or emoji for the team */
  icon: string;
  /** Hero subtitle */
  subtitle: string;
  /** Hero description */
  description: string;
  /** The dynamic zone sections for this team's documentation */
  sections: StrapiComponent[];
  /** Related projects (nested entity or flattened list) */
  projects?: StrapiEntity<ProjectStrapi>[] | { data: StrapiEntity<ProjectStrapi>[] };
}

/**
 * Raw project data structure from Strapi.
 */
export interface ProjectStrapi {
  /** The name of the project */
  name: string;
  /** The unique key for the project */
  key: string;
  /** Short description of the project */
  description: string;
  /** Current status of the project */
  projectStatus: string;
  /** Icon or emoji for the project */
  icon: string;
  /** Project metadata (stack, repo, etc.) */
  projectMeta?: { stack: string; repo: string; deploy: string; sprint: string };
  /** Purpose of the project */
  purpose?: string;
  /** Key features list */
  features?: StrapiInfoCard[];
  /** Related links */
  links?: Array<{ label: string; url: string; type: string }>;
  /** Folder structure code block */
  folderStructure?: StrapiCodeBlock;
  /** Getting started steps */
  gettingStarted?: StrapiStep[];
  /** Project contacts */
  contacts?: StrapiContact[];
  /** The owning team relation */
  team?: { data: StrapiEntity<TeamStrapi> };
}

// ── Landing page & Navbar raw types ──────────────────────────────────────────

/**
 * A raw navigation link from Strapi.
 */
export interface StrapiNavLink {
  /** Display label for the link */
  label: string;
  /** URL or anchor for the link */
  href: string;
  /** Optional ID */
  id?: number;
}

/**
 * A raw CTA button configuration from Strapi.
 */
export interface StrapiNavCta {
  /** Label for the CTA button */
  label: string;
  /** URL for the CTA action */
  href: string;
}

/**
 * Raw navbar data structure from Strapi.
 */
export interface StrapiNavbar {
  /** Collection of links in the navbar */
  links?: StrapiNavLink[];
  /** Call to action button configuration */
  cta?: StrapiNavCta;
}

/**
 * Raw footer data structure from Strapi.
 */
export interface StrapiFooter {
  /** Collection of links in the footer */
  links?: StrapiNavLink[];
  /** Copyright text or footer note */
  copyright?: string;
}

/**
 * A raw hero link from a landing page.
 */
export interface StrapiHeroLink {
  /** Label for the link */
  label: string;
  /** URL for the link */
  href: string;
}

/**
 * Base interface for landing page sections.
 */
export interface StrapiLandingSection {
  /** Discriminator for the landing page component type */
  __component: string;
  /** Optional ID */
  id?: number;
  /** Dynamic properties */
  [key: string]: unknown;
}

/**
 * Raw landing page data structure from Strapi.
 */
export interface StrapiLandingPage {
  /** Dynamic zone sections for the landing page */
  sections?: StrapiLandingSection[];
  /** Dynamic properties */
  [key: string]: unknown;
}
