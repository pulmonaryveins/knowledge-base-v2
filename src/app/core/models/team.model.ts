// ── FILE: src/app/core/models/team.model.ts ──

import { Project } from './project.model';
import { DataTable, Step, CodeBlockData, InfoCardData, CodingPattern } from './ui.models';

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
  /** Primary code block shown below the steps */
  readonly codeBlock: CodeBlockData;
}

/** Content for a Folder Architecture section */
export interface FolderArchSection {
  /** Discriminant for @switch rendering */
  readonly type: 'folder-arch';
  /** Info cards describing each major layer */
  readonly cards: ReadonlyArray<InfoCardData>;
  /** Tree code block showing the folder structure */
  readonly codeBlock: CodeBlockData;
}

/** Content for a Coding Patterns section */
export interface CodingPatternsSection {
  /** Discriminant for @switch rendering */
  readonly type: 'coding-patterns';
  /** List of patterns, each with code and optional callout */
  readonly patterns: ReadonlyArray<CodingPattern>;
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

/** Discriminated union of all possible section content types */
export type SectionContent =
  | TechStackSection
  | GettingStartedSection
  | FolderArchSection
  | CodingPatternsSection
  | MistakesSection
  | ProjectsSection;

/** A single documentation section within a team page */
export interface TeamSection {
  /** Unique ID used for scroll anchoring and right-rail nav */
  readonly id: string;
  /** Display label shown in section header and right rail */
  readonly label: string;
  /** Zero-padded display number, e.g. "01" */
  readonly num: string;
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
  /** Hero subtitle text */
  readonly subtitle: string;
  /** Stat pills rendered in the hero banner */
  readonly stats: ReadonlyArray<HeroStat>;
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
