// ── FILE: src/app/core/utils/icons.ts ──
// Central registry mapping team keys, project keys, and app icon names
// to Lucide icon data objects.

import {
  // Team icons
  Monitor, Server, Globe, TestTube, Atom, Palette,
  // Project / App icons
  LayoutDashboard, Tv, Paintbrush, Zap, Network, Plug,
  Construction, Settings, Play, Microscope, Pencil,
  Eye, Database, Gauge,
  // UI chrome icons
  FileCode, Search, ChevronDown, ChevronRight, Menu, X,
  // Step list icons
  GitBranch, PackageOpen, KeyRound, Terminal, FlaskConical,
  Container, ArrowRightLeft, Rocket, ClipboardList, GitPullRequest,
  ScanSearch, Layers, Compass, PenTool, PlayCircle, Globe2, Type, Award,
  // Tools section icons
  Wind, HardDrive, Figma, Code,
  LucideIconData,
} from 'lucide-angular';

// ── Team key → icon ───────────────────────────────────────────────────────────

export const TEAM_ICON_MAP: Record<string, LucideIconData> = {
  frontend : Monitor,
  backend  : Server,
  webdev   : Globe,
  qa       : TestTube,
  rd       : Microscope,
  uiux     : Palette,
};

export function getTeamIcon(key: string): LucideIconData {
  return TEAM_ICON_MAP[key] ?? Monitor;
}

// ── Project / App icon name → Lucide data ─────────────────────────────────────
// Data files store a short string key; this map resolves it to a Lucide icon.

export const APP_ICON_MAP: Record<string, LucideIconData> = {
  // Frontend projects
  'layout-dashboard' : LayoutDashboard,
  'tv'               : Tv,
  'paintbrush'       : Paintbrush,
  'monitor'          : Monitor,
  // Backend projects
  'zap'              : Zap,
  'network'          : Network,
  'plug'             : Plug,
  'database'         : Database,
  // Web Dev projects
  'construction'     : Construction,
  'settings'         : Settings,
  'gauge'            : Gauge,
  // QA projects
  'test-tube'        : TestTube,
  'play'             : Play,
  // R&D
  'microscope'       : Microscope,
  'atom'             : Atom,
  // UI/UX projects
  'palette'          : Palette,
  'pencil'           : Pencil,
  'eye'              : Eye,
  // Fallback
  'file-code'        : FileCode,
};

export function getAppIcon(name: string): LucideIconData {
  return APP_ICON_MAP[name] ?? FileCode;
}

// ── UI chrome icons (exported for direct use in components) ───────────────────

export const ICONS = {
  Search,
  ChevronDown,
  ChevronRight,
  Menu,
  X,
  FileCode,
} as const;

/** Generic icon used for project entries where a specific icon isn't mapped */
export const PROJECT_ICON: LucideIconData = FileCode;

// ── Step list icon name → Lucide data ────────────────────────────────────────────────────

export const STEP_ICON_MAP: Record<string, LucideIconData> = {
  'git-branch'      : GitBranch,
  'package-open'    : PackageOpen,
  'key-round'       : KeyRound,
  'terminal'        : Terminal,
  'flask-conical'   : FlaskConical,
  'container'       : Container,
  'arrow-right-left': ArrowRightLeft,
  'rocket'          : Rocket,
  'clipboard-list'  : ClipboardList,
  'git-pull-request': GitPullRequest,
  'scan-search'     : ScanSearch,
  'layers'          : Layers,
  'compass'         : Compass,
  'pen-tool'        : PenTool,
  'play-circle'     : PlayCircle,
  'globe-2'         : Globe2,
  'type'            : Type,
  'award'           : Award,
  'file-code'       : FileCode,
};

export function getStepIcon(name: string): LucideIconData {
  return STEP_ICON_MAP[name] ?? FileCode;
}

// ── Tool page icon name → Lucide data ───────────────────────────────────────────

export const TOOL_ICON_MAP: Record<string, LucideIconData> = {
  'atom'      : Atom,
  'globe'     : Globe,
  'database'  : Database,
  'hard-drive': HardDrive,
  'rocket'    : Rocket,
  'wind'      : Wind,
  'container' : Container,
  'figma'     : Figma,
  'code'      : Code,
};

export function getToolIcon(key: string): LucideIconData {
  return TOOL_ICON_MAP[key] ?? FileCode;
}

// ── Team tools registry ───────────────────────────────────────────────────────

export interface TeamTool {
  readonly label: string;
  readonly icon: LucideIconData;
  readonly color: string;
}

export const TEAM_TOOLS_MAP: Record<string, ReadonlyArray<TeamTool>> = {
  frontend: [
    { label: 'Angular',      icon: Atom,      color: '#DD0031' },
    { label: 'Tailwind CSS', icon: Wind,       color: '#38BDF8' },
  ],
  backend: [
    { label: 'TypeORM',  icon: Database,  color: '#E4A44A' },
    { label: 'MySQL',    icon: HardDrive, color: '#4479A1' },
    { label: 'Docker',   icon: Container, color: '#2496ED' },
  ],
  webdev: [
    { label: 'Next.js',      icon: Globe,     color: '#e2e8f0' },
    { label: 'Astro',        icon: Rocket,    color: '#FF7E33' },
    { label: 'Tailwind CSS', icon: Wind,      color: '#38BDF8' },
  ],
  qa: [
    { label: 'Python', icon: Code,      color: '#3572A5' },
    { label: 'Docker', icon: Container, color: '#2496ED' },
  ],
  rd: [
    { label: 'Python', icon: Code,      color: '#3572A5' },
    { label: 'Docker', icon: Container, color: '#2496ED' },
  ],
  uiux: [
    { label: 'Figma',        icon: Figma,     color: '#F24E1E' },
    { label: 'Tailwind CSS', icon: Wind,      color: '#38BDF8' },
  ],
};
