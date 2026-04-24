// ── FILE: src/app/core/models/team.model.ts ──

import { Project } from './project.model';
import { DataTable, Step, CodeBlockData, InfoCardData, CodingPattern, ColorGroup, ColorTab, TypographySample, TypographyTab, ComponentVariant, BrandingLogoItem, SpacingGroup, GridBreakpointGroup, FaIconEntry, IconSizeSpec, ButtonShowcaseTab } from './ui.models';

/** A stat pill shown in the hero banner */
export interface HeroStat {
  /** Stat label, e.g. "Components" */
  readonly label: string;
  /** Stat value, e.g. "42" */
  readonly value: string;
}

/** Content for a Tech Stack Overview section */
export interface TechStackSection {
  /** Discriminant for @switch rendering */
  readonly type: 'tech-stack';
  /** Data table of technologies */
  readonly table: DataTable;
}

/** Content for a Getting Started section */
export interface GettingStartedSection {
  /** Discriminant for @switch rendering */
  readonly type: 'getting-started';
  /** Numbered steps with descriptions */
  readonly steps: ReadonlyArray<Step>;
  /** Optional summary code block shown below the steps */
  readonly codeBlock?: CodeBlockData;
  /** 'grid' renders steps as icon cards in a 4-col grid instead of a numbered list */
  readonly layout?: 'grid';
}

/** Content for a Folder Architecture section */
export interface FolderArchSection {
  /** Discriminant for @switch rendering */
  readonly type: 'folder-arch';
  /** Info cards describing each major layer */
  readonly cards: ReadonlyArray<InfoCardData>;
  /** Optional tree code block showing the folder structure */
  readonly codeBlock?: CodeBlockData;
}

/** Content for a Coding Patterns section */
export interface CodingPatternsSection {
  /** Discriminant for @switch rendering */
  readonly type: 'coding-patterns';
  /** List of patterns, each with code and optional callout */
  readonly patterns: ReadonlyArray<CodingPattern>;
  /** 'stack' renders patterns as a single column list instead of a grid */
  readonly layout?: 'stack';
}

/** Content for a Common Mistakes section */
export interface MistakesSection {
  /** Discriminant for @switch rendering */
  readonly type: 'mistakes';
  /** Two-column table: ❌ mistake / ✅ correct approach */
  readonly table: DataTable;
}

/** Marker content for the Projects section (renders team.projects) */
export interface ProjectsSection {
  /** Discriminant for @switch rendering */
  readonly type: 'projects';
}

/** Visual color palette section */
export interface ColorPaletteSection {
  /** Discriminant for @switch rendering */
  readonly type: 'color-palette';
  /** Legacy flat groups (kept for other teams) */
  readonly groups?: ReadonlyArray<ColorGroup>;
  /** Tabbed layout: Overview / Shades / WCAG */
  readonly tabs?: ReadonlyArray<ColorTab>;
}

/** Visual typography scale section */
export interface TypographyScaleSection {
  /** Discriminant for @switch rendering */
  readonly type: 'typography-scale';
  /** Legacy flat samples (kept for non-uiux teams) */
  readonly samples?: ReadonlyArray<TypographySample>;
  /** Tabbed layout: Web / Web(Button) / Mobile */
  readonly tabs?: ReadonlyArray<TypographyTab>;
}

/** Visual component specification section */
export interface ComponentSpecSection {
  /** Discriminant for @switch rendering */
  readonly type: 'component-spec';
  /** Component name shown as section heading */
  readonly name: string;
  /** Short description of the component */
  readonly description: string;
  /** Size variants with their dimension specs */
  readonly variants: ReadonlyArray<ComponentVariant>;
}

/** Company brand guide section — logos, favicon, sidebar variants */
export interface BrandingSection {
  /** Discriminant for @switch rendering */
  readonly type: 'branding';
  /** Primary logo variants (dark bg, green bg, white bg) */
  readonly mainLogos: ReadonlyArray<BrandingLogoItem>;
  /** Favicon entry */
  readonly favicon?: BrandingLogoItem;
  /** Collapsed sidebar icon variants */
  readonly sidebarCollapsed?: ReadonlyArray<BrandingLogoItem>;
  /** Expanded sidebar logo variants */
  readonly sidebarExpanded?: ReadonlyArray<BrandingLogoItem>;
}

/** Spacing / padding / margin guide section */
export interface SpacingSection {
  readonly type: 'spacing';
  readonly description?: string;
  readonly groups: ReadonlyArray<SpacingGroup>;
  readonly note?: string;
}

/** Button styles showcase section — Primary / Secondary / Soft Rounded */
export interface ButtonShowcaseSection {
  readonly type: 'button-showcase';
  readonly tabs: ReadonlyArray<ButtonShowcaseTab>;
}

/** Responsive grid breakpoints / screen sizes section */
export interface GridSection {
  readonly type: 'grid';
  readonly description?: string;
  readonly groups: ReadonlyArray<GridBreakpointGroup>;
}

/** Iconography catalog section (Font Awesome) */
export interface IconographySection {
  readonly type: 'iconography';
  readonly description?: string;
  readonly sizes: ReadonlyArray<IconSizeSpec>;
  readonly icons: ReadonlyArray<FaIconEntry>;
}

/** Visual showcase — Phase 1: Design Basics */
export interface NcDesignBasicsSection {
  readonly type: 'nc-design-basics';
}

/** Visual showcase — Phase 2: UX Design Fundamentals */
export interface NcUxDesignSection {
  readonly type: 'nc-ux-design';
}

/** Visual showcase — Phase 3: Wireframing & Prototyping */
export interface NcPrototypeSection {
  readonly type: 'nc-prototype';
}

/** Visual showcase — Phase 5: Web Design & Accessibility */
export interface NcWebDesignSection {
  readonly type: 'nc-web-design';
}

/** Visual showcase — Phase 6: Print Design & Typography/Color */
export interface NcPrintSection {
  readonly type: 'nc-print-design';
}

/** Visual showcase — Phase 7: Brand & Storytelling */
export interface NcBrandSection {
  readonly type: 'nc-brand-storytelling';
}

/** A single contact person displayed in a Team Contacts section */
export interface TeamContact {
  readonly name: string;
  readonly role: string;
  readonly initials: string;
  readonly color: string;
}

/** Team Contacts section — renders a grid of contact cards */
export interface TeamContactsSection {
  readonly type: 'team-contacts';
  readonly contacts: ReadonlyArray<TeamContact>;
}

/** Pi Player ecosystem architecture diagram section */
export interface PiEcosystemSection {
  readonly type: 'pi-ecosystem';
}

/** Discriminated union of all possible section content types */
export type SectionContent =
  | TechStackSection
  | GettingStartedSection
  | FolderArchSection
  | CodingPatternsSection
  | MistakesSection
  | ProjectsSection
  | ColorPaletteSection
  | TypographyScaleSection
  | ComponentSpecSection
  | BrandingSection
  | SpacingSection
  | GridSection
  | IconographySection
  | ButtonShowcaseSection
  | NcDesignBasicsSection
  | NcUxDesignSection
  | NcPrototypeSection
  | NcWebDesignSection
  | NcPrintSection
  | NcBrandSection
  | TeamContactsSection
  | PiEcosystemSection;

/** A single documentation section within a team page */
export interface TeamSection {
  /** Unique ID used for scroll anchoring and right-rail nav */
  readonly id: string;
  /** Display label shown in section header and right rail */
  readonly label: string;
  /** Zero-padded display number, e.g. "01" */
  readonly num: string;
  /** Optional one-line description shown beneath the section title */
  readonly subHeader?: string;
  /** Typed content payload for this section */
  readonly content: SectionContent;
}

/** A team tab in the portal */
export interface Team {
  /** Unique key used for routing and active state */
  readonly key: string;
  /** Display name shown in sidebar and hero */
  readonly label: string;
  /** Brand hex color for dots, accents, badges, and hero gradient */
  readonly color: string;
  /** CSS gradient string used for hero background */
  readonly gradient: string;
  /** Emoji icon representing the team */
  readonly icon: string;
  /** Optional brand logo URL — when set, renders an <img> instead of a Lucide icon in the sidebar */
  readonly logoUrl?: string;
  /** Hero subtitle text */
  readonly subtitle: string;
  /** Short description shown in the hero below the subtitle */
  readonly description: string;
  /** Ordered documentation sections */
  readonly sections: ReadonlyArray<TeamSection>;
  /** Projects owned by this team */
  readonly projects: ReadonlyArray<Project>;
}

/** A simplified app entry for the Apps & Projects page */
export interface AppEntry {
  /** App display name */
  readonly name: string;
  /** One-line description */
  readonly description: string;
  /** Status badge */
  readonly status: import('./ui.models').StatusType;
  /** Comma-separated technology tags */
  readonly tags: ReadonlyArray<string>;
  /** Owning team key */
  readonly ownerTeam: string;
  /** Emoji icon */
  readonly icon: string;
  /** Any notable notes */
  readonly notes: string;
}
