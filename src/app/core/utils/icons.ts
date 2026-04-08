// ── FILE: src/app/core/utils/icons.ts ──
// Central registry mapping team keys and UI elements to Lucide icon data objects.

import {
  Monitor,
  Server,
  Globe,
  TestTube,
  Atom,
  Palette,
  FileCode,
  LucideIconData,
} from 'lucide-angular';

/** Maps each team key to its representative Lucide icon */
export const TEAM_ICON_MAP: Record<string, LucideIconData> = {
  frontend : Monitor,
  backend  : Server,
  webdev   : Globe,
  qa       : TestTube,
  rd       : Atom,
  uiux     : Palette,
};

/** Generic icon used for every project entry in the sidebar */
export const PROJECT_ICON: LucideIconData = FileCode;

/** Returns the Lucide icon data for a given team key, falling back to Monitor. */
export function getTeamIcon(key: string): LucideIconData {
  return TEAM_ICON_MAP[key] ?? Monitor;
}
