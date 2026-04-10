// ── FILE: src/app/core/data/pi-player.data.ts ──

import { Team } from '../models/team.model';

export const piPlayerTeam: Team = {
  key: 'pi-player',
  label: 'Pi Player',
  color: '#C2185B',
  gradient: 'linear-gradient(135deg, #1a0010, #4a0020)',
  icon: 'cpu',
  logoUrl: 'https://cdn.simpleicons.org/raspberrypi/C2185B',
  subtitle: 'Raspberry Pi · Embedded Player · Hardware Integration · Display OS',
  stats: [
    { label: 'Devices', value: '0' },
    { label: 'Projects', value: '1' },
    { label: 'In Dev', value: '1' },
    { label: 'Platforms', value: '1' },
  ],
  projects: [
    {
      id: 'pi-player-app',
      name: 'Pi Player',
      description: 'Raspberry Pi-based kiosk player for NCompassTV display hardware.',
      status: 'Dev',
      icon: 'cpu',
      teamKey: 'pi-player',
      teamColor: '#C2185B',
      doc: {
        meta: { stack: 'TBD', repo: 'nctv/pi-player', deploy: 'Raspberry Pi OS', sprint: 'TBD' },
        purpose: 'Content coming soon.',
        features: [],
        folderStructure: {
          language: 'bash',
          code: `pi-player/\n└── (structure TBD)`,
        },
        gettingStarted: [],
        contacts: [
          { name: 'Mikoo Saguindang', role: 'Team Lead', initials: 'MS', color: '#C2185B' },
          { name: 'Earl Vhin Gabuat', role: 'Lead Engineer', initials: 'EV', color: '#6366F1' },
        ],
        links: [
          { label: 'GitHub Repo', url: 'repo', type: 'repo' },
        ],
      },
    },
  ],
  sections: [],
};
