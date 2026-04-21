// ── FILE: src/app/core/data/apps.data.ts ──

import { AppEntry } from '../models/team.model';

export const appEntries: ReadonlyArray<AppEntry> = [
  { name: 'Dashboard', description: 'Main operator control panel.', status: 'Live', tags: ['Angular 21', 'WebSocket'], ownerTeam: 'frontend', icon: 'layout-dashboard', notes: 'Core platform app; highest traffic.' },
  { name: 'Channels App', description: 'Channel lineup builder.', status: 'Dev', tags: ['Angular 21', 'NgRx'], ownerTeam: 'frontend', icon: 'tv', notes: 'Beta launch in Sprint 43.' },
  { name: 'Host Revamp', description: 'Redesigned host portal.', status: 'Revamp', tags: ['Angular 21', 'SCSS'], ownerTeam: 'frontend', icon: 'paintbrush', notes: 'Migrating from AngularJS.' },
  { name: 'Screen Player', description: 'Kiosk display player.', status: 'Live', tags: ['Electron', 'Chromium'], ownerTeam: 'frontend', icon: 'monitor', notes: 'Deployed on 2,400 displays.' },
  { name: 'ntv360-api', description: 'Core NestJS REST API.', status: 'Live', tags: ['NestJS', 'MySQL'], ownerTeam: 'backend', icon: 'zap', notes: '99.97% uptime SLA.' },
  { name: 'ntv360-graphql', description: 'GraphQL API for flexible queries.', status: 'Dev', tags: ['NestJS', 'GraphQL'], ownerTeam: 'backend', icon: 'network', notes: 'In active development.' },
  { name: 'ntv360-websocket', description: 'Real-time WebSocket gateway.', status: 'Live', tags: ['NestJS', 'Socket.IO'], ownerTeam: 'backend', icon: 'plug', notes: 'Handles device health events.' },
];
