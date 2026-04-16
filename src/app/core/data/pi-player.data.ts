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
  projects: [],
  sections: [],
};
