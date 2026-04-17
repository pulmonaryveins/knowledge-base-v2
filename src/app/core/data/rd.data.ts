// ── FILE: src/app/core/data/rd.data.ts ──

import { Team } from '../models/team.model';

export const rdTeam: Team = {
  key: 'rd',
  label: 'Research & Development',
  color: '#0D9488',
  gradient: 'linear-gradient(135deg, #022c22, #065f46)',
  icon: 'microscope',
  subtitle: 'Innovation · Proof of Concepts · Internal Tools · Tech Exploration',
  stats: [
    { label: 'Live Apps', value: '7' },
    { label: 'In Development', value: '4' },
    { label: 'Teams', value: '4' },
    { label: 'Shared Services', value: '3' },
  ],
  projects: [],
  sections: [
    {
      id: 'rd-contacts',
      label: 'Team Contacts',
      num: '01',
      content: {
        type: 'team-contacts',
        contacts: [
          {
            name: 'Fratz Antigua',
            role: 'Team Lead',
            initials: 'FA',
            color: '#0D9488',
          },
          {
            name: 'Earl Vhin Gabuat',
            role: 'Lead Engineer',
            initials: 'EV',
            color: '#6366F1',
          },
        ],
      },
    },  ],
};
