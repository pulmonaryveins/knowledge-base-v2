// ── FILE: src/app/core/models/project.model.ts ──

import { StatusType, InfoCardData, Step, CodeBlockData } from './ui.models';

/** Four-column metadata grid shown at the top of an expanded project doc */
export interface ProjectMeta {
  /** Primary technology stack string */
  readonly stack: string;
  /** Repository path or URL label */
  readonly repo: string;
  /** Deployment target label */
  readonly deploy: string;
  /** Current sprint identifier */
  readonly sprint: string;
}

/** A team member contact entry in the project doc */
export interface Contact {
  /** Full name of the contact */
  readonly name: string;
  /** Role or title */
  readonly role: string;
  /** Two-letter initials for the avatar circle */
  readonly initials: string;
  /** Hex background color for the avatar circle */
  readonly color: string;
}

/** A documentation or external link in the project doc */
export interface DocLink {
  /** Display label for the link */
  readonly label: string;
  /** Href value */
  readonly url: string;
  /** Icon category used to select the link icon */
  readonly type: 'repo' | 'deploy' | 'docs' | 'design' | 'jira';
}

/** Full expanded documentation content for a project */
export interface ProjectDoc {
  /** Four-column metadata overview grid */
  readonly meta: ProjectMeta;
  /** Purpose paragraph describing what the project does */
  readonly purpose: string;
  /** Three info cards covering key features */
  readonly features: ReadonlyArray<InfoCardData>;
  /** Folder-structure code block */
  readonly folderStructure: CodeBlockData;
  /** Getting-started step list */
  readonly gettingStarted: ReadonlyArray<Step>;
  /** Team member contacts */
  readonly contacts: ReadonlyArray<Contact>;
  /** Related links */
  readonly links: ReadonlyArray<DocLink>;
}

/** A project card in the portal sidebar and team page */
export interface Project {
  /** Unique project identifier */
  readonly id: string;
  /** Display name of the project */
  readonly name: string;
  /** One-line description shown in the collapsed card */
  readonly description: string;
  /** Current project status */
  readonly status: StatusType;
  /** Emoji or icon string shown in the 40px rounded icon */
  readonly icon: string;
  /** Key of the team that owns this project */
  readonly teamKey: string;
  /** Hex color of the owning team */
  readonly teamColor: string;
  /** Full expanded documentation data */
  readonly doc: ProjectDoc;
}
