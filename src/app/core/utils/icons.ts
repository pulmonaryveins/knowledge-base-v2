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
  ScanSearch, Layers, Compass, PenTool, PlayCircle, Globe2, Type,
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
  'file-code'       : FileCode,
};

export function getStepIcon(name: string): LucideIconData {
  return STEP_ICON_MAP[name] ?? FileCode;
}
