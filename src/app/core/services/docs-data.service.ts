// ── FILE: src/app/core/services/docs-data.service.ts ──

import { Injectable } from '@angular/core';
import { Team, AppEntry } from '../models/team.model';
import { Project } from '../models/project.model';
import { SearchResult } from '../models/search.model';

/**
 * DocsDataService is the single source of truth for all portal content.
 * It returns fully-typed dummy data — no HTTP calls are made.
 */
@Injectable({ providedIn: 'root' })
export class DocsDataService {

  // ─── FRONTEND PROJECTS ────────────────────────────────────────────────────

  /** All projects owned by the Frontend team */
  private readonly _frontendProjects: ReadonlyArray<Project> = [
    {
      id: 'fe-dashboard',
      name: 'Dashboard',
      description: 'Main operator dashboard — analytics, schedules, and device management.',
      status: 'Live',
      icon: '📊',
      teamKey: 'frontend',
      teamColor: '#8DCB2C',
      doc: {
        meta: { stack: 'Angular 21 · Signals · Tailwind v4', repo: 'nctv/dashboard-fe', deploy: 'AWS CloudFront', sprint: 'Sprint 42' },
        purpose: 'The Dashboard is the primary control plane for NCompassTV operators. It surfaces real-time device health, schedule management, content approval queues, and analytics in a single Angular SPA.',
        features: [
          { title: 'Real-time Device Health', body: 'WebSocket-powered grid showing online/offline/error states for all registered screens, refreshed every 5 seconds.' },
          { title: 'Schedule Builder', body: 'Drag-and-drop calendar with conflict detection, time-zone support, and bulk publish actions across device groups.' },
          { title: 'Analytics Dashboards', body: 'Recharts-based charts showing impressions, uptime %, play counts, and audience segmentation filters.' },
        ],
        folderStructure: {
          language: 'bash',
          code: `dashboard-fe/
├── src/app/
│   ├── core/
│   │   ├── models/          # TypeScript interfaces
│   │   ├── services/        # Data + state services
│   │   └── guards/          # Route guards
│   ├── shared/
│   │   └── components/      # Reusable dumb components
│   ├── features/
│   │   ├── overview/        # Home analytics page
│   │   ├── devices/         # Device management
│   │   ├── schedules/       # Schedule builder
│   │   └── content/         # Content approval
│   └── layout/
│       └── shell/           # App shell layout
└── public/                  # Static assets`,
        },
        gettingStarted: [
          { title: 'Clone & Install', description: 'Clone the repo and install dependencies.', code: 'git clone git@github.com:nctv/dashboard-fe.git\ncd dashboard-fe && npm install', language: 'bash' },
          { title: 'Configure Environment', description: 'Copy the example env file and fill in your API endpoint.', code: 'cp .env.example .env.local\n# Set VITE_API_URL=http://localhost:3000', language: 'bash' },
          { title: 'Start Dev Server', description: 'Run the Angular dev server with hot-reload.', code: 'npm start\n# Opens at http://localhost:4200', language: 'bash' },
          { title: 'Run Tests', description: 'Execute the full Vitest suite.', code: 'npm test', language: 'bash' },
        ],
        contacts: [
          { name: 'Jeremy Cabrera', role: 'Lead Frontend Engineer', initials: 'JC', color: '#8DCB2C' },
          { name: 'Sofia Park', role: 'Frontend Engineer', initials: 'SP', color: '#0891B2' },
        ],
        links: [
          { label: 'GitHub Repo', url: '#', type: 'repo' },
          { label: 'Staging Deploy', url: '#', type: 'deploy' },
          { label: 'Jira Board', url: '#', type: 'jira' },
        ],
      },
    },
    {
      id: 'fe-channels',
      name: 'Channels App',
      description: 'Channel lineup builder and preview tool for content managers.',
      status: 'Dev',
      icon: '📺',
      teamKey: 'frontend',
      teamColor: '#8DCB2C',
      doc: {
        meta: { stack: 'Angular 21 · NgRx Signals Store', repo: 'nctv/channels-fe', deploy: 'Vercel Preview', sprint: 'Sprint 40' },
        purpose: 'The Channels App lets content managers build, preview, and publish channel lineups. It talks to the Channels API and renders a live preview of on-screen layouts.',
        features: [
          { title: 'Lineup Editor', body: 'Visual drag-and-drop editor for ordering content blocks within a channel schedule, with collision detection.' },
          { title: 'Live Preview', body: 'Embedded player preview rendering the channel output in real time using the same renderer as Screen Player.' },
          { title: 'Publish Workflow', body: 'One-click publish with rollback support and detailed diff view before confirming changes.' },
        ],
        folderStructure: {
          language: 'bash',
          code: `channels-fe/
├── src/app/
│   ├── core/
│   ├── shared/
│   ├── features/
│   │   ├── lineup/          # Lineup editor
│   │   ├── preview/         # Live preview
│   │   └── publish/         # Publish workflow
│   └── layout/`,
        },
        gettingStarted: [
          { title: 'Clone & Install', description: 'Clone repo and install packages.', code: 'git clone git@github.com:nctv/channels-fe.git && npm i', language: 'bash' },
          { title: 'Start Dev Server', description: 'Launch with hot-reload.', code: 'npm start', language: 'bash' },
        ],
        contacts: [
          { name: 'Marcus Lin', role: 'Frontend Engineer', initials: 'ML', color: '#7C3AED' },
        ],
        links: [
          { label: 'GitHub Repo', url: '#', type: 'repo' },
          { label: 'Figma Design', url: '#', type: 'design' },
        ],
      },
    },
    {
      id: 'fe-host-revamp',
      name: 'Host Revamp',
      description: 'Redesigned host portal with updated UX and Angular 21 migration.',
      status: 'Revamp',
      icon: '🎨',
      teamKey: 'frontend',
      teamColor: '#8DCB2C',
      doc: {
        meta: { stack: 'Angular 21 · Tailwind v4 · SCSS', repo: 'nctv/host-revamp', deploy: 'Cloudflare Pages', sprint: 'Sprint 38' },
        purpose: 'A ground-up redesign of the legacy Host Portal, migrating from AngularJS to Angular 21 with a refreshed UI matching the new design system.',
        features: [
          { title: 'Component Migration', body: 'Full replacement of all AngularJS directives with standalone Angular 21 components using signals.' },
          { title: 'Design System Adoption', body: 'Implements the new NCompassTV design tokens, typography scale, and colour variables from Figma.' },
          { title: 'Performance Uplift', body: 'Zoneless change detection and lazy-loaded route chunks cut initial TTI by 58%.' },
        ],
        folderStructure: {
          language: 'bash',
          code: `host-revamp/
├── src/app/
│   ├── core/
│   ├── shared/
│   └── features/
│       ├── login/
│       ├── profile/
│       └── settings/`,
        },
        gettingStarted: [
          { title: 'Clone & Install', description: 'Clone and install.', code: 'git clone git@github.com:nctv/host-revamp.git && npm i', language: 'bash' },
          { title: 'Run Dev Server', description: 'Start with ng serve.', code: 'npm start', language: 'bash' },
        ],
        contacts: [
          { name: 'Aisha Okonkwo', role: 'Senior Frontend Engineer', initials: 'AO', color: '#EC4899' },
        ],
        links: [
          { label: 'GitHub Repo', url: '#', type: 'repo' },
          { label: 'Figma Design', url: '#', type: 'design' },
        ],
      },
    },
    {
      id: 'fe-screen-player',
      name: 'Screen Player',
      description: 'Browser-based kiosk player rendering scheduled content on displays.',
      status: 'Live',
      icon: '🖥️',
      teamKey: 'frontend',
      teamColor: '#8DCB2C',
      doc: {
        meta: { stack: 'Angular 21 · Web Animations API', repo: 'nctv/screen-player', deploy: 'Electron + Chromium', sprint: 'Sprint 41' },
        purpose: 'Screen Player is a headless kiosk application running inside Chromium/Electron on NCompassTV display hardware. It polls the Player Sync API and renders content sequences with smooth transitions.',
        features: [
          { title: 'Offline Playback', body: 'IndexedDB-backed asset cache ensures content plays even during network interruptions.' },
          { title: 'Transition Engine', body: 'Custom Web Animations API engine supporting 12 transition types with configurable easing.' },
          { title: 'Health Reporting', body: 'Heartbeat WebSocket to the Dashboard API, reporting play counts, errors, and hardware metrics every 30s.' },
        ],
        folderStructure: {
          language: 'bash',
          code: `screen-player/
├── src/app/
│   ├── core/
│   │   ├── player-engine/
│   │   └── sync-client/
│   ├── features/
│   │   ├── playlist/
│   │   └── overlay/
│   └── electron/
│       └── main.ts`,
        },
        gettingStarted: [
          { title: 'Clone & Install', description: 'Clone the repo.', code: 'git clone git@github.com:nctv/screen-player.git && npm i', language: 'bash' },
          { title: 'Run in Browser', description: 'Preview in browser mode.', code: 'npm start', language: 'bash' },
          { title: 'Build Electron', description: 'Package for display hardware.', code: 'npm run electron:build', language: 'bash' },
        ],
        contacts: [
          { name: 'Tomás Reyes', role: 'Frontend Engineer', initials: 'TR', color: '#D97706' },
        ],
        links: [
          { label: 'GitHub Repo', url: '#', type: 'repo' },
          { label: 'Staging Deploy', url: '#', type: 'deploy' },
        ],
      },
    },
  ];

  // ─── BACKEND PROJECTS ─────────────────────────────────────────────────────

  /** All projects owned by the Backend team */
  private readonly _backendProjects: ReadonlyArray<Project> = [
    {
      id: 'be-dashboard-api',
      name: 'Dashboard API',
      description: 'NestJS REST + WebSocket API powering the operator dashboard.',
      status: 'Live',
      icon: '⚡',
      teamKey: 'backend',
      teamColor: '#7C3AED',
      doc: {
        meta: { stack: 'NestJS 10 · PostgreSQL 16 · TypeORM', repo: 'nctv/dashboard-api', deploy: 'AWS ECS Fargate', sprint: 'Sprint 42' },
        purpose: 'The Dashboard API exposes all data endpoints consumed by the Dashboard frontend — devices, schedules, analytics aggregations, and real-time WebSocket channels for device health.',
        features: [
          { title: 'REST Endpoints', body: 'Versioned REST API (v1/v2) with OpenAPI 3.1 docs auto-generated via @nestjs/swagger.' },
          { title: 'WebSocket Gateway', body: 'Socket.IO gateway broadcasting real-time device health events with room-based subscriptions per operator.' },
          { title: 'Analytics Pipeline', body: 'TimescaleDB hypertable aggregation jobs running via pg_cron, serving pre-computed analytics in < 50ms.' },
        ],
        folderStructure: {
          language: 'bash',
          code: `dashboard-api/
├── src/
│   ├── modules/
│   │   ├── devices/
│   │   ├── schedules/
│   │   ├── analytics/
│   │   └── auth/
│   ├── common/
│   │   ├── decorators/
│   │   ├── guards/
│   │   └── pipes/
│   └── main.ts
├── migrations/
└── test/`,
        },
        gettingStarted: [
          { title: 'Clone & Install', description: 'Clone and install dependencies.', code: 'git clone git@github.com:nctv/dashboard-api.git && npm i', language: 'bash' },
          { title: 'Start Postgres', description: 'Spin up local DB with Docker.', code: 'docker-compose up -d postgres', language: 'bash' },
          { title: 'Run Migrations', description: 'Apply all TypeORM migrations.', code: 'npm run migration:run', language: 'bash' },
          { title: 'Start API', description: 'Launch in watch mode.', code: 'npm run start:dev', language: 'bash' },
        ],
        contacts: [
          { name: 'Kwame Asante', role: 'Backend Lead', initials: 'KA', color: '#7C3AED' },
          { name: 'Priya Sharma', role: 'Backend Engineer', initials: 'PS', color: '#0891B2' },
        ],
        links: [
          { label: 'GitHub Repo', url: '#', type: 'repo' },
          { label: 'API Docs', url: '#', type: 'docs' },
          { label: 'Jira Board', url: '#', type: 'jira' },
        ],
      },
    },
    {
      id: 'be-channels-api',
      name: 'Channels API',
      description: 'Manages channel lineups, content blocks, and publish events.',
      status: 'Live',
      icon: '📡',
      teamKey: 'backend',
      teamColor: '#7C3AED',
      doc: {
        meta: { stack: 'NestJS 10 · PostgreSQL 16 · Redis', repo: 'nctv/channels-api', deploy: 'AWS Lambda', sprint: 'Sprint 41' },
        purpose: 'The Channels API provides CRUD endpoints for channel lineups and content blocks, and emits publish events consumed by Player Sync API to update running displays.',
        features: [
          { title: 'Lineup CRUD', body: 'Full create/read/update/delete for channel lineups with optimistic locking to prevent concurrent publish conflicts.' },
          { title: 'Redis Pub/Sub', body: 'Publish events are emitted to a Redis channel subscribed by Player Sync API for instant cache invalidation.' },
          { title: 'Rollback System', body: 'Stores last 10 published versions per channel; rollback restores any version in a single API call.' },
        ],
        folderStructure: {
          language: 'bash',
          code: `channels-api/
├── src/
│   ├── modules/
│   │   ├── channels/
│   │   ├── blocks/
│   │   └── publish/
│   └── main.ts`,
        },
        gettingStarted: [
          { title: 'Clone & Install', description: 'Clone and install.', code: 'git clone git@github.com:nctv/channels-api.git && npm i', language: 'bash' },
          { title: 'Start Services', description: 'Start Postgres and Redis.', code: 'docker-compose up -d', language: 'bash' },
          { title: 'Run Dev', description: 'Start in watch mode.', code: 'npm run start:dev', language: 'bash' },
        ],
        contacts: [
          { name: 'Kwame Asante', role: 'Backend Lead', initials: 'KA', color: '#7C3AED' },
        ],
        links: [
          { label: 'GitHub Repo', url: '#', type: 'repo' },
          { label: 'API Docs', url: '#', type: 'docs' },
        ],
      },
    },
    {
      id: 'be-player-sync',
      name: 'Player Sync API',
      description: 'Lightweight edge API syncing content schedules to display players.',
      status: 'Dev',
      icon: '🔄',
      teamKey: 'backend',
      teamColor: '#7C3AED',
      doc: {
        meta: { stack: 'NestJS 10 · Redis · AWS Lambda@Edge', repo: 'nctv/player-sync-api', deploy: 'CloudFront Lambda@Edge', sprint: 'Sprint 39' },
        purpose: 'Player Sync API is a low-latency edge service that delivers the latest channel schedule to Screen Player kiosks. It caches schedules in Redis and subscribes to Channels API publish events.',
        features: [
          { title: 'Edge Caching', body: 'Schedules are served from Redis at the edge with a 200ms p99 latency target, even under 10k concurrent kiosks.' },
          { title: 'Delta Sync', body: 'Players send an ETag; the API returns 304 Not Modified if the schedule has not changed, saving bandwidth.' },
          { title: 'Heartbeat Ingestion', body: 'Accepts player heartbeat payloads and forwards health metrics to Dashboard API via an async queue.' },
        ],
        folderStructure: {
          language: 'bash',
          code: `player-sync-api/
├── src/
│   ├── modules/
│   │   ├── sync/
│   │   ├── heartbeat/
│   │   └── cache/
│   └── main.ts`,
        },
        gettingStarted: [
          { title: 'Clone & Install', description: 'Clone and install.', code: 'git clone git@github.com:nctv/player-sync-api.git && npm i', language: 'bash' },
          { title: 'Start Redis', description: 'Start local Redis.', code: 'docker-compose up -d redis', language: 'bash' },
          { title: 'Run Dev', description: 'Launch in watch mode.', code: 'npm run start:dev', language: 'bash' },
        ],
        contacts: [
          { name: 'Priya Sharma', role: 'Backend Engineer', initials: 'PS', color: '#0891B2' },
        ],
        links: [
          { label: 'GitHub Repo', url: '#', type: 'repo' },
          { label: 'API Docs', url: '#', type: 'docs' },
        ],
      },
    },
  ];

  // ─── UI/UX PROJECTS ───────────────────────────────────────────────────────

  /** All projects owned by the UI/UX team */
  private readonly _uiuxProjects: ReadonlyArray<Project> = [
    {
      id: 'ux-dashboard-design',
      name: 'Dashboard Design',
      description: 'Figma design system and component library for the operator dashboard.',
      status: 'Live',
      icon: '🎨',
      teamKey: 'uiux',
      teamColor: '#EC4899',
      doc: {
        meta: { stack: 'Figma · Design Tokens · Storybook 7', repo: 'figma://nctv/dashboard', deploy: 'Storybook on Vercel', sprint: 'Sprint 42' },
        purpose: 'The Dashboard Design project maintains the Figma component library, design tokens, and Storybook for the operator dashboard. It is the source of truth for all visual specs.',
        features: [
          { title: 'Component Library', body: '120+ Figma components with auto-layout, variants, and interactive prototypes covering all dashboard states.' },
          { title: 'Design Tokens', body: 'Style Dictionary config exporting colours, spacing, and typography to CSS variables, SCSS, and JSON for cross-platform use.' },
          { title: 'Storybook Docs', body: 'Storybook 7 with Chromatic visual regression testing on every PR, catching pixel-level regressions before merge.' },
        ],
        folderStructure: {
          language: 'bash',
          code: `dashboard-design/
├── tokens/
│   ├── colors.json
│   ├── spacing.json
│   └── typography.json
├── storybook/
│   ├── stories/
│   └── .storybook/
└── exports/
    └── css-variables.css`,
        },
        gettingStarted: [
          { title: 'Open Figma File', description: 'Request access to the Figma file from the UI/UX lead.', code: '# Ask @nctv-design for editor access', language: 'bash' },
          { title: 'Install Storybook', description: 'Clone the Storybook repo and install.', code: 'git clone git@github.com:nctv/dashboard-design.git && npm i', language: 'bash' },
          { title: 'Run Storybook', description: 'Launch Storybook locally.', code: 'npm run storybook', language: 'bash' },
        ],
        contacts: [
          { name: 'Lena Morozova', role: 'UI/UX Lead', initials: 'LM', color: '#EC4899' },
          { name: 'Carlos Vega', role: 'UI Designer', initials: 'CV', color: '#8DCB2C' },
        ],
        links: [
          { label: 'Figma File', url: '#', type: 'design' },
          { label: 'Storybook', url: '#', type: 'docs' },
        ],
      },
    },
    {
      id: 'ux-host-revamp-design',
      name: 'Host Revamp Design',
      description: 'New UI/UX designs for the host portal redesign project.',
      status: 'Revamp',
      icon: '✏️',
      teamKey: 'uiux',
      teamColor: '#EC4899',
      doc: {
        meta: { stack: 'Figma · FigJam · Lottie', repo: 'figma://nctv/host-revamp', deploy: 'Figma Prototype', sprint: 'Sprint 38' },
        purpose: 'Provides high-fidelity Figma designs, motion specs, and design-to-dev handoff for the Host Revamp engineering project.',
        features: [
          { title: 'High-fidelity Mockups', body: 'All 14 screens designed in Figma with full light and dark mode variants and responsive breakpoints.' },
          { title: 'Motion Design', body: 'Lottie animations for loading states and transitions, exported as JSON and integrated directly into the Angular app.' },
          { title: 'Handoff Annotations', body: 'Figma Dev Mode annotations covering spacing, tokens, component names, and interaction notes for every screen.' },
        ],
        folderStructure: {
          language: 'bash',
          code: `host-revamp-design/
├── frames/
│   ├── login/
│   ├── profile/
│   └── settings/
├── animations/
│   └── *.json
└── handoff-notes.md`,
        },
        gettingStarted: [
          { title: 'Access Figma', description: 'Open the Figma design file.', code: '# Request access from @lena-morozova', language: 'bash' },
        ],
        contacts: [
          { name: 'Lena Morozova', role: 'UI/UX Lead', initials: 'LM', color: '#EC4899' },
        ],
        links: [
          { label: 'Figma File', url: '#', type: 'design' },
        ],
      },
    },
    {
      id: 'ux-channels-design',
      name: 'Channels Design',
      description: 'UX flows and components for the Channels App lineup builder.',
      status: 'Dev',
      icon: '🖌️',
      teamKey: 'uiux',
      teamColor: '#EC4899',
      doc: {
        meta: { stack: 'Figma · Maze · UserTesting', repo: 'figma://nctv/channels', deploy: 'Figma Prototype', sprint: 'Sprint 40' },
        purpose: 'UX research, wireframes, and high-fidelity designs for the Channels App, validated through Maze usability tests with 12 content manager participants.',
        features: [
          { title: 'UX Research', body: '3 rounds of Maze usability tests with content managers, identifying 8 critical flow improvements.' },
          { title: 'Wireframes', body: 'Low-fidelity wireframes for all lineup editor states, reviewed with engineering before high-fi production.' },
          { title: 'Component Specs', body: 'Annotated Figma specs for every custom component in the lineup editor, including drag handle states.' },
        ],
        folderStructure: {
          language: 'bash',
          code: `channels-design/
├── research/
│   └── usability-reports/
├── wireframes/
└── high-fi/
    ├── editor/
    └── preview/`,
        },
        gettingStarted: [
          { title: 'Access Figma', description: 'Request access from the design lead.', code: '# Ask @lena-morozova', language: 'bash' },
        ],
        contacts: [
          { name: 'Carlos Vega', role: 'UI Designer', initials: 'CV', color: '#8DCB2C' },
        ],
        links: [
          { label: 'Figma File', url: '#', type: 'design' },
          { label: 'Maze Results', url: '#', type: 'docs' },
        ],
      },
    },
  ];

  // ─── QA PROJECTS ──────────────────────────────────────────────────────────

  /** All projects owned by the QA team */
  private readonly _qaProjects: ReadonlyArray<Project> = [
    {
      id: 'qa-dashboard',
      name: 'Dashboard QA',
      description: 'Playwright E2E suite and Postman collections for the Dashboard.',
      status: 'Live',
      icon: '🧪',
      teamKey: 'qa',
      teamColor: '#0891B2',
      doc: {
        meta: { stack: 'Playwright 1.44 · Postman · Vitest', repo: 'nctv/dashboard-qa', deploy: 'GitHub Actions CI', sprint: 'Sprint 42' },
        purpose: 'Maintains the full automated test coverage for the Dashboard — Playwright E2E tests for frontend flows, Postman collections for API contracts, and Vitest unit tests for critical utilities.',
        features: [
          { title: 'E2E Test Suite', body: '340 Playwright tests covering all dashboard flows, running in parallel across Chromium, Firefox, and WebKit.' },
          { title: 'API Contract Tests', body: 'Postman collections with 180 requests verifying Dashboard API responses against OpenAPI specs on every merge.' },
          { title: 'Visual Regression', body: 'Playwright screenshot comparisons for 42 key UI states, catching layout shifts before they reach staging.' },
        ],
        folderStructure: {
          language: 'bash',
          code: `dashboard-qa/
├── e2e/
│   ├── pages/           # Page Object Models
│   ├── fixtures/
│   └── specs/
│       ├── devices.spec.ts
│       ├── schedules.spec.ts
│       └── analytics.spec.ts
├── api/
│   └── collections/
└── playwright.config.ts`,
        },
        gettingStarted: [
          { title: 'Clone & Install', description: 'Clone and install.', code: 'git clone git@github.com:nctv/dashboard-qa.git && npm i', language: 'bash' },
          { title: 'Install Browsers', description: 'Install Playwright browsers.', code: 'npx playwright install', language: 'bash' },
          { title: 'Run E2E Tests', description: 'Run the full E2E suite.', code: 'npm run test:e2e', language: 'bash' },
        ],
        contacts: [
          { name: 'Nia Osei', role: 'QA Lead', initials: 'NO', color: '#0891B2' },
        ],
        links: [
          { label: 'GitHub Repo', url: '#', type: 'repo' },
          { label: 'Test Reports', url: '#', type: 'docs' },
        ],
      },
    },
    {
      id: 'qa-screen-player',
      name: 'Screen Player QA',
      description: 'Hardware-in-the-loop and regression suite for the kiosk player.',
      status: 'Live',
      icon: '🖥️',
      teamKey: 'qa',
      teamColor: '#0891B2',
      doc: {
        meta: { stack: 'Playwright · BrowserStack · k6', repo: 'nctv/screen-player-qa', deploy: 'BrowserStack Automate', sprint: 'Sprint 41' },
        purpose: 'QA coverage for Screen Player, including hardware-in-the-loop tests on real display hardware, BrowserStack Automate for cross-browser kiosk rendering, and k6 load tests for the sync API.',
        features: [
          { title: 'Hardware-in-the-loop', body: 'Automated regression on 4 physical NCompassTV display units in the QA lab, triggered on every release build.' },
          { title: 'Cross-browser Rendering', body: 'BrowserStack Automate runs the player in 8 Chromium versions used by deployed kiosk hardware.' },
          { title: 'Load Testing', body: 'k6 scripts simulating 10,000 concurrent players polling Player Sync API, with p95 SLO assertions.' },
        ],
        folderStructure: {
          language: 'bash',
          code: `screen-player-qa/
├── e2e/
│   └── specs/
├── load/
│   └── k6/
└── hardware/
    └── scripts/`,
        },
        gettingStarted: [
          { title: 'Clone & Install', description: 'Clone and install.', code: 'git clone git@github.com:nctv/screen-player-qa.git && npm i', language: 'bash' },
          { title: 'Run Load Tests', description: 'Execute k6 load test.', code: 'k6 run load/k6/sync.js', language: 'bash' },
        ],
        contacts: [
          { name: 'Nia Osei', role: 'QA Lead', initials: 'NO', color: '#0891B2' },
          { name: 'Ravi Kumar', role: 'QA Engineer', initials: 'RK', color: '#D97706' },
        ],
        links: [
          { label: 'GitHub Repo', url: '#', type: 'repo' },
          { label: 'BrowserStack', url: '#', type: 'docs' },
        ],
      },
    },
    {
      id: 'qa-channels',
      name: 'Channels QA',
      description: 'E2E and API tests for the Channels App and Channels API.',
      status: 'Dev',
      icon: '📡',
      teamKey: 'qa',
      teamColor: '#0891B2',
      doc: {
        meta: { stack: 'Playwright · Postman · Vitest', repo: 'nctv/channels-qa', deploy: 'GitHub Actions CI', sprint: 'Sprint 40' },
        purpose: 'Maintains E2E Playwright tests for the Channels App frontend and Postman collections for the Channels API, with a focus on publish/rollback flow validation.',
        features: [
          { title: 'Publish Flow Tests', body: '42 Playwright tests validating the full publish and rollback flow end-to-end, including optimistic-lock conflict scenarios.' },
          { title: 'API Contract Tests', body: 'Postman collection with 90 requests covering Channels API lineup CRUD and Redis pub/sub behaviour.' },
          { title: 'Regression Suite', body: '160 regression tests run on every PR targeting the develop branch.' },
        ],
        folderStructure: {
          language: 'bash',
          code: `channels-qa/
├── e2e/
│   └── specs/
├── api/
│   └── collections/
└── playwright.config.ts`,
        },
        gettingStarted: [
          { title: 'Clone & Install', description: 'Clone and install.', code: 'git clone git@github.com:nctv/channels-qa.git && npm i', language: 'bash' },
          { title: 'Run Tests', description: 'Run the full test suite.', code: 'npm test', language: 'bash' },
        ],
        contacts: [
          { name: 'Ravi Kumar', role: 'QA Engineer', initials: 'RK', color: '#D97706' },
        ],
        links: [
          { label: 'GitHub Repo', url: '#', type: 'repo' },
        ],
      },
    },
  ];

  // ─── TEAMS ────────────────────────────────────────────────────────────────

  /** All five teams in the portal */
  private readonly _teams: ReadonlyArray<Team> = [
    // ── Frontend ────────────────────────────────────────────────────────────
    {
      key: 'frontend',
      label: 'Frontend',
      color: '#8DCB2C',
      gradient: 'linear-gradient(135deg, #091635, #1a3366)',
      icon: '⚡',
      subtitle: 'Angular 21 · Tailwind CSS v4 · TypeScript 5 · Zoneless Signals',
      stats: [
        { label: 'Components', value: '84' },
        { label: 'Projects', value: '4' },
        { label: 'Test Coverage', value: '91%' },
        { label: 'Avg TTI', value: '1.2s' },
      ],
      projects: this._frontendProjects,
      sections: [
        {
          id: 'fe-tech-stack',
          label: 'Tech Stack Overview',
          num: '01',
          content: {
            type: 'tech-stack',
            table: {
              headers: ['Technology', 'Version', 'Purpose', 'Status'],
              rows: [
                { cells: ['Angular', '21.2', 'Component framework — standalone, zoneless, signals', 'Live'] },
                { cells: ['TypeScript', '5.4', 'Strict-mode typed JavaScript across all source files', 'Live'] },
                { cells: ['Tailwind CSS', 'v4.1', 'Utility-first CSS applied via @apply in BEM SCSS', 'Live'] },
                { cells: ['RxJS', '7.8', 'Async streams for HTTP and legacy event handling', 'Live'] },
                { cells: ['Vitest', '2.x', 'Unit and integration testing with JSDOM environment', 'Live'] },
                { cells: ['SCSS / Sass', '1.77', 'Compiled styles with BEM naming and CSS variables', 'Live'] },
                { cells: ['Playwright', '1.44', 'E2E browser automation tests run in CI', 'Live'] },
              ],
            },
          },
        },
        {
          id: 'fe-getting-started',
          label: 'Getting Started',
          num: '02',
          content: {
            type: 'getting-started',
            steps: [
              { title: 'Clone the Repository', description: 'Clone the target repo to your local machine using SSH.', code: 'git clone git@github.com:nctv/<repo>.git\ncd <repo>', language: 'bash' },
              { title: 'Install Dependencies', description: 'Use the exact Node version in .nvmrc, then install packages.', code: 'nvm use\nnpm install', language: 'bash' },
              { title: 'Configure Environment', description: 'Copy the example environment file and fill in required API values.', code: 'cp .env.example .env.local\n# Edit VITE_API_URL and VITE_WS_URL', language: 'bash' },
              { title: 'Start the Dev Server', description: 'Launch the Angular development server with hot-reload.', code: 'npm start\n# App runs at http://localhost:4200', language: 'bash' },
              { title: 'Run Tests', description: 'Run unit tests with Vitest and E2E tests with Playwright.', code: 'npm test          # unit\nnpm run test:e2e  # E2E', language: 'bash' },
            ],
            codeBlock: {
              language: 'bash',
              code: `# Full setup in one shot
git clone git@github.com:nctv/dashboard-fe.git
cd dashboard-fe
nvm use && npm install
cp .env.example .env.local
npm start`,
            },
          },
        },
        {
          id: 'fe-folder-arch',
          label: 'Folder Architecture',
          num: '03',
          content: {
            type: 'folder-arch',
            cards: [
              { title: 'core/', body: 'Models (interfaces), services (business logic and state), and route guards. Nothing in core/ renders UI.' },
              { title: 'shared/components/', body: 'Dumb, reusable display components. Accept input() signals only; zero service injection. Exported via shared/index.ts.' },
              { title: 'features/', body: 'Smart feature components. Inject services, hold signals, dispatch actions. Each folder owns one business domain.' },
              { title: 'layout/', body: 'App shell and layout wrapper components that compose sidebar, main content area, and navigation rails.' },
            ],
            codeBlock: {
              language: 'bash',
              code: `src/app/
├── core/
│   ├── models/          # Interfaces & types
│   ├── services/        # Injectable services
│   └── guards/          # Route & auth guards
├── shared/
│   ├── components/      # Reusable dumb components
│   │   ├── button/
│   │   ├── data-table/
│   │   └── status-badge/
│   └── index.ts
├── features/
│   ├── overview/
│   ├── devices/
│   └── schedules/
└── layout/
    └── shell/`,
            },
          },
        },
        {
          id: 'fe-coding-patterns',
          label: 'Coding Patterns',
          num: '04',
          content: {
            type: 'coding-patterns',
            patterns: [
              {
                title: 'Signal-based State',
                description: 'All UI state is managed with signal(), computed(), and effect(). Never BehaviorSubject for local component state.',
                codeBlock: {
                  language: 'typescript',
                  code: `/** Whether the panel is expanded */
protected readonly isOpen = signal<boolean>(false);

/** Derived label updates automatically */
protected readonly toggleLabel = computed<string>(() =>
  this.isOpen() ? 'Collapse' : 'Expand'
);

/** Toggle the panel */
public toggle(): void {
  this.isOpen.update(v => !v);
}`,
                },
                callout: { type: 'tip', title: 'No zones needed', body: 'With provideZonelessChangeDetection(), Angular only re-renders when signals change — no NgZone.run() required.' },
              },
              {
                title: 'inject() Dependency Injection',
                description: 'Always use the inject() function in field declarations. Constructor injection is forbidden.',
                codeBlock: {
                  language: 'typescript',
                  code: `// ✅ Correct
private readonly _navService = inject(NavigationService);
private readonly _destroyRef = inject(DestroyRef);

// ❌ Forbidden
constructor(private navService: NavigationService) {}`,
                },
              },
              {
                title: '@if / @for Control Flow',
                description: 'Use the new Angular template syntax. The old *ngIf and *ngFor directives are banned.',
                codeBlock: {
                  language: 'html',
                  code: `<!-- ✅ Correct -->
@if (isOpen()) {
  <app-panel [data]="data()" />
}

@for (item of items(); track item.id) {
  <app-item [item]="item" />
}

<!-- ❌ Forbidden -->
<app-panel *ngIf="isOpen" [data]="data" />
<app-item *ngFor="let item of items" />`,
                },
                callout: { type: 'warning', title: 'Always add track', body: 'The @for block requires a track expression. Use track item.id for stable keys, or track $index only when items have no ID.' },
              },
              {
                title: 'BEM + SCSS @apply',
                description: 'Define BEM class names in SCSS using @apply for Tailwind utilities. Never put utility classes directly in HTML templates.',
                codeBlock: {
                  language: 'scss',
                  code: `// ✅ Correct — in component.scss
.card {
  @apply rounded-xl border p-4;
  background: var(--card);
  border-color: var(--border);

  &__title {
    @apply text-sm font-semibold;
    color: var(--navy);
  }
}`,
                },
              },
            ],
          },
        },
        {
          id: 'fe-mistakes',
          label: 'Common Mistakes',
          num: '05',
          content: {
            type: 'mistakes',
            table: {
              headers: ['❌ Mistake', '✅ Correct Approach'],
              rows: [
                { cells: ['Using *ngIf / *ngFor in templates', 'Use @if and @for with a track expression'] },
                { cells: ['Constructor injection: constructor(private svc: Svc)', 'Field injection: private readonly _svc = inject(Svc)'] },
                { cells: ['BehaviorSubject for component state', 'signal<T>(initialValue) from @angular/core'] },
                { cells: ['Tailwind classes inline in HTML: class="flex p-4"', 'BEM class in HTML, @apply in SCSS'] },
                { cells: ['Missing return type on a method', 'Every method must declare its return type explicitly'] },
                { cells: ['any type: const x: any = ...', 'Use specific types or unknown with a type guard'] },
              ],
            },
          },
        },
        {
          id: 'fe-projects',
          label: 'Projects',
          num: '06',
          content: { type: 'projects' },
        },
      ],
    },

    // ── Backend ─────────────────────────────────────────────────────────────
    {
      key: 'backend',
      label: 'Backend',
      color: '#7C3AED',
      gradient: 'linear-gradient(135deg, #1e1035, #3b1d6e)',
      icon: '🔧',
      subtitle: 'NestJS 10 · PostgreSQL 16 · TypeORM · Redis · AWS',
      stats: [
        { label: 'Endpoints', value: '148' },
        { label: 'Projects', value: '3' },
        { label: 'API Uptime', value: '99.97%' },
        { label: 'Avg Latency', value: '38ms' },
      ],
      projects: this._backendProjects,
      sections: [
        {
          id: 'be-tech-stack',
          label: 'Tech Stack Overview',
          num: '01',
          content: {
            type: 'tech-stack',
            table: {
              headers: ['Technology', 'Version', 'Purpose', 'Status'],
              rows: [
                { cells: ['NestJS', '10.x', 'Opinionated Node.js framework with DI and decorators', 'Live'] },
                { cells: ['PostgreSQL', '16', 'Primary relational database with TimescaleDB extension', 'Live'] },
                { cells: ['TypeORM', '0.3', 'ORM for entity definitions, migrations, and query builder', 'Live'] },
                { cells: ['Redis', '7.x', 'Session cache, pub/sub channel, and rate-limit store', 'Live'] },
                { cells: ['AWS ECS Fargate', 'N/A', 'Container orchestration for production API services', 'Live'] },
                { cells: ['AWS Lambda@Edge', 'N/A', 'Edge compute for Player Sync low-latency responses', 'Dev'] },
                { cells: ['Docker Compose', '2.x', 'Local development environment for all backing services', 'Live'] },
              ],
            },
          },
        },
        {
          id: 'be-getting-started',
          label: 'Getting Started',
          num: '02',
          content: {
            type: 'getting-started',
            steps: [
              { title: 'Clone & Install', description: 'Clone the API repo and install Node dependencies.', code: 'git clone git@github.com:nctv/<api>.git\nnpm install', language: 'bash' },
              { title: 'Start Docker Services', description: 'Launch PostgreSQL and Redis via Docker Compose.', code: 'docker-compose up -d postgres redis', language: 'bash' },
              { title: 'Configure Environment', description: 'Copy and fill in the environment variables.', code: 'cp .env.example .env\n# Set DATABASE_URL, REDIS_URL, JWT_SECRET', language: 'bash' },
              { title: 'Run Migrations', description: 'Apply all pending TypeORM migrations.', code: 'npm run migration:run', language: 'bash' },
              { title: 'Start in Watch Mode', description: 'Launch the API with hot-reload for development.', code: 'npm run start:dev\n# API at http://localhost:3000\n# Swagger at http://localhost:3000/api', language: 'bash' },
            ],
            codeBlock: {
              language: 'bash',
              code: `git clone git@github.com:nctv/dashboard-api.git
cd dashboard-api && npm install
docker-compose up -d
cp .env.example .env
npm run migration:run
npm run start:dev`,
            },
          },
        },
        {
          id: 'be-folder-arch',
          label: 'Folder Architecture',
          num: '03',
          content: {
            type: 'folder-arch',
            cards: [
              { title: 'src/modules/', body: 'Feature modules, each containing a controller, service, DTOs, and TypeORM entities. One business domain per module.' },
              { title: 'src/common/', body: 'Shared decorators, guards, pipes, and interceptors used across modules. No business logic lives here.' },
              { title: 'migrations/', body: 'Auto-generated TypeORM migration files. Never edited by hand — always generated via npm run migration:generate.' },
              { title: 'test/', body: 'Jest unit tests and Supertest integration tests, mirroring the src/ folder structure one-to-one.' },
            ],
            codeBlock: {
              language: 'bash',
              code: `src/
├── modules/
│   ├── devices/
│   │   ├── devices.controller.ts
│   │   ├── devices.service.ts
│   │   ├── dto/
│   │   └── entities/
│   ├── schedules/
│   ├── analytics/
│   └── auth/
├── common/
│   ├── decorators/
│   ├── guards/
│   └── pipes/
└── main.ts`,
            },
          },
        },
        {
          id: 'be-coding-patterns',
          label: 'Coding Patterns',
          num: '04',
          content: {
            type: 'coding-patterns',
            patterns: [
              {
                title: 'Repository Pattern with TypeORM',
                description: 'Always inject the repository via @InjectRepository() and keep all DB queries inside the service layer.',
                codeBlock: {
                  language: 'typescript',
                  code: `@Injectable()
export class DevicesService {
  constructor(
    @InjectRepository(Device)
    private readonly deviceRepo: Repository<Device>,
  ) {}

  async findAll(): Promise<Device[]> {
    return this.deviceRepo.find({ where: { active: true } });
  }
}`,
                },
                callout: { type: 'tip', title: 'Use QueryBuilder for complex joins', body: 'For multi-table joins or aggregations, use deviceRepo.createQueryBuilder() instead of find() options.' },
              },
              {
                title: 'DTO Validation with class-validator',
                description: 'Every incoming request body must pass through a DTO decorated with class-validator rules and the ValidationPipe.',
                codeBlock: {
                  language: 'typescript',
                  code: `export class CreateDeviceDto {
  @IsString()
  @MinLength(3)
  name: string;

  @IsUUID()
  locationId: string;

  @IsEnum(DeviceStatus)
  status: DeviceStatus;
}`,
                },
              },
              {
                title: 'Redis Cache with @CacheKey',
                description: 'Cache expensive read endpoints with the NestJS CacheModule and a TTL appropriate to the data freshness requirements.',
                codeBlock: {
                  language: 'typescript',
                  code: `@Get('summary')
@CacheKey('analytics:summary')
@CacheTTL(60) // 60 seconds
async getSummary(): Promise<AnalyticsSummary> {
  return this.analyticsService.computeSummary();
}`,
                },
              },
            ],
          },
        },
        {
          id: 'be-mistakes',
          label: 'Common Mistakes',
          num: '05',
          content: {
            type: 'mistakes',
            table: {
              headers: ['❌ Mistake', '✅ Correct Approach'],
              rows: [
                { cells: ['Raw SQL strings in service methods', 'Use TypeORM QueryBuilder or entity methods'] },
                { cells: ['Missing @IsString() / @IsUUID() on DTOs', 'Decorate every DTO field with class-validator rules'] },
                { cells: ['Returning entity objects directly from controllers', 'Map to response DTOs — never expose database columns directly'] },
                { cells: ['Environment variables accessed inline (process.env.X)', 'Use ConfigService.get<string>(\'KEY\') for type-safe access'] },
                { cells: ['Synchronous blocking code in request handlers', 'Always use async/await; offload heavy tasks to Bull queues'] },
              ],
            },
          },
        },
        {
          id: 'be-projects',
          label: 'Projects',
          num: '06',
          content: { type: 'projects' },
        },
      ],
    },

    // ── UI / UX ─────────────────────────────────────────────────────────────
    {
      key: 'uiux',
      label: 'UI / UX',
      color: '#EC4899',
      gradient: 'linear-gradient(135deg, #4a0a2e, #831843)',
      icon: '🎨',
      subtitle: 'Figma · Design Tokens · Storybook 7 · WCAG 2.1',
      stats: [
        { label: 'Components', value: '120+' },
        { label: 'Projects', value: '3' },
        { label: 'Design Tokens', value: '240' },
        { label: 'WCAG Score', value: 'AA' },
      ],
      projects: this._uiuxProjects,
      sections: [
        {
          id: 'ux-tech-stack',
          label: 'Tech Stack Overview',
          num: '01',
          content: {
            type: 'tech-stack',
            table: {
              headers: ['Tool', 'Version', 'Purpose', 'Status'],
              rows: [
                { cells: ['Figma', 'Enterprise', 'Primary design and prototyping tool for all teams', 'Live'] },
                { cells: ['Storybook', '7.x', 'Component documentation and visual regression testing', 'Live'] },
                { cells: ['Style Dictionary', '3.x', 'Transforms design tokens into CSS, SCSS, and JSON outputs', 'Live'] },
                { cells: ['Chromatic', '11.x', 'Automated visual regression on Storybook stories per PR', 'Live'] },
                { cells: ['Maze', '2.x', 'Remote usability testing and heatmaps with real users', 'Live'] },
                { cells: ['Lottie', '5.x', 'JSON-format animations for loading states and transitions', 'Dev'] },
              ],
            },
          },
        },
        {
          id: 'ux-getting-started',
          label: 'Getting Started',
          num: '02',
          content: {
            type: 'getting-started',
            steps: [
              { title: 'Request Figma Access', description: 'Contact the UI/UX lead to get editor access to the NCompassTV Figma organisation.', code: '# Slack: @lena-morozova in #design-requests', language: 'bash' },
              { title: 'Install Figma Plugins', description: 'Install the required Figma plugins for the team workflow.', code: '# Plugins: Tokens Studio, Figma to Code, Contrast, Iconify', language: 'bash' },
              { title: 'Clone Token Repo', description: 'Clone the design tokens repository and install dependencies.', code: 'git clone git@github.com:nctv/design-tokens.git && npm i', language: 'bash' },
              { title: 'Run Storybook', description: 'Launch the component documentation site locally.', code: 'npm run storybook\n# Opens at http://localhost:6006', language: 'bash' },
            ],
            codeBlock: {
              language: 'bash',
              code: `# Export tokens from Figma → run transform pipeline
npm run tokens:build

# Outputs:
# dist/css-variables.css
# dist/tokens.scss
# dist/tokens.json`,
            },
          },
        },
        {
          id: 'ux-folder-arch',
          label: 'Folder Architecture',
          num: '03',
          content: {
            type: 'folder-arch',
            cards: [
              { title: 'tokens/', body: 'Raw JSON design token files exported from Figma Tokens Studio. Each file maps to a token category: color, spacing, typography, radius.' },
              { title: 'storybook/', body: 'Storybook stories for every component in the design system, with args-table and accessibility panel enabled.' },
              { title: 'dist/', body: 'Build output from the Style Dictionary transform pipeline — CSS variables, SCSS map, and JSON for cross-platform consumption.' },
              { title: 'docs/', body: 'Markdown documentation for design decisions, naming conventions, and handoff procedures for engineering.' },
            ],
            codeBlock: {
              language: 'bash',
              code: `design-tokens/
├── tokens/
│   ├── colors.json
│   ├── spacing.json
│   ├── typography.json
│   └── radius.json
├── storybook/
│   ├── stories/
│   └── .storybook/
├── dist/
│   ├── css-variables.css
│   ├── tokens.scss
│   └── tokens.json
└── docs/
    └── handoff-guide.md`,
            },
          },
        },
        {
          id: 'ux-coding-patterns',
          label: 'Design Patterns',
          num: '04',
          content: {
            type: 'coding-patterns',
            patterns: [
              {
                title: 'Design Token Usage',
                description: 'All colours, spacing, and typography must reference design tokens — never raw hex values or px sizes in Figma or code.',
                codeBlock: {
                  language: 'scss',
                  code: `// ✅ Correct — use CSS variable tokens
.button--primary {
  background: var(--color-accent);
  padding: var(--spacing-3) var(--spacing-5);
  font-family: var(--font-heading);
}

// ❌ Forbidden — raw values
.button--primary {
  background: #8DCB2C;
  padding: 12px 20px;
}`,
                },
                callout: { type: 'info', title: 'Token sync', body: 'Tokens are synced from Figma via Tokens Studio. Run npm run tokens:build after any token update in Figma.' },
              },
              {
                title: 'Component Variant Naming',
                description: 'Figma component variants must follow the same BEM naming used in code to enable automatic Figma-to-Code mapping.',
                codeBlock: {
                  language: 'typescript',
                  code: `// Figma variant: Button / Primary / Large / Default
// Maps to Angular component:

@Component({ selector: 'app-button' })
export class ButtonComponent {
  public readonly variant = input<'primary' | 'secondary'>('primary');
  public readonly size = input<'sm' | 'md' | 'lg'>('md');
}`,
                },
              },
            ],
          },
        },
        {
          id: 'ux-mistakes',
          label: 'Common Mistakes',
          num: '05',
          content: {
            type: 'mistakes',
            table: {
              headers: ['❌ Mistake', '✅ Correct Approach'],
              rows: [
                { cells: ['Raw hex in Figma frames or code', 'Use Figma Tokens Studio variables mapped to design tokens'] },
                { cells: ['Duplicate component instances in Figma', 'Use main component in the library; create instances only'] },
                { cells: ['Contrast ratio below 4.5:1 for body text', 'Check with Figma Contrast plugin; target AA minimum'] },
                { cells: ['Skipping mobile/tablet variants', 'Every frame needs 375px (mobile), 768px (tablet), 1440px (desktop)'] },
                { cells: ['Handoff without redline annotations', 'Use Figma Dev Mode to annotate spacing, tokens, and interactions'] },
              ],
            },
          },
        },
        {
          id: 'ux-projects',
          label: 'Projects',
          num: '06',
          content: { type: 'projects' },
        },
      ],
    },

    // ── QA ──────────────────────────────────────────────────────────────────
    {
      key: 'qa',
      label: 'QA',
      color: '#0891B2',
      gradient: 'linear-gradient(135deg, #042f3d, #0c4a6e)',
      icon: '🧪',
      subtitle: 'Playwright 1.44 · Postman · Vitest · k6 · BrowserStack',
      stats: [
        { label: 'E2E Tests', value: '540' },
        { label: 'Projects', value: '3' },
        { label: 'CI Pass Rate', value: '98.2%' },
        { label: 'Coverage', value: '87%' },
      ],
      projects: this._qaProjects,
      sections: [
        {
          id: 'qa-tech-stack',
          label: 'Tech Stack Overview',
          num: '01',
          content: {
            type: 'tech-stack',
            table: {
              headers: ['Tool', 'Version', 'Purpose', 'Status'],
              rows: [
                { cells: ['Playwright', '1.44', 'E2E browser automation across Chromium, Firefox, WebKit', 'Live'] },
                { cells: ['Vitest', '2.x', 'Unit and integration test runner for frontend and API code', 'Live'] },
                { cells: ['Postman', '11.x', 'API contract tests and request collections', 'Live'] },
                { cells: ['k6', '0.51', 'Load and performance testing for API endpoints', 'Live'] },
                { cells: ['BrowserStack Automate', 'N/A', 'Cross-browser and device testing for kiosk rendering', 'Live'] },
                { cells: ['GitHub Actions', 'N/A', 'CI pipeline running all test suites on every PR', 'Live'] },
              ],
            },
          },
        },
        {
          id: 'qa-getting-started',
          label: 'Getting Started',
          num: '02',
          content: {
            type: 'getting-started',
            steps: [
              { title: 'Clone QA Repo', description: 'Clone the QA repository for the target project.', code: 'git clone git@github.com:nctv/<project>-qa.git\ncd <project>-qa && npm install', language: 'bash' },
              { title: 'Install Playwright Browsers', description: 'Download Playwright browser binaries.', code: 'npx playwright install --with-deps', language: 'bash' },
              { title: 'Configure Environment', description: 'Set base URL and API URL for the test environment.', code: 'cp .env.test.example .env.test\n# Set BASE_URL and API_URL', language: 'bash' },
              { title: 'Run E2E Suite', description: 'Execute the full Playwright test suite.', code: 'npm run test:e2e\n# Or for headed mode:\nnpm run test:e2e -- --headed', language: 'bash' },
              { title: 'View Reports', description: 'Open the HTML test report after a run.', code: 'npx playwright show-report', language: 'bash' },
            ],
            codeBlock: {
              language: 'bash',
              code: `# Run a single spec file
npx playwright test specs/devices.spec.ts

# Run with a specific browser
npx playwright test --project=firefox

# Run in debug mode
npx playwright test --debug`,
            },
          },
        },
        {
          id: 'qa-folder-arch',
          label: 'Folder Architecture',
          num: '03',
          content: {
            type: 'folder-arch',
            cards: [
              { title: 'e2e/pages/', body: 'Page Object Models (POMs) for every page or major component. Encapsulate selectors and interactions to decouple tests from DOM structure.' },
              { title: 'e2e/specs/', body: 'Test specs grouped by feature. Each file covers one domain (devices, schedules, auth). Tests are independent and can run in parallel.' },
              { title: 'e2e/fixtures/', body: 'Playwright fixtures for authentication setup, seeded test data, and shared browser contexts reused across tests.' },
              { title: 'api/collections/', body: 'Exported Postman JSON collections. Imported into Postman or run via Newman in CI for API contract testing.' },
            ],
            codeBlock: {
              language: 'bash',
              code: `<project>-qa/
├── e2e/
│   ├── pages/
│   │   ├── login.page.ts
│   │   └── devices.page.ts
│   ├── specs/
│   │   ├── auth.spec.ts
│   │   └── devices.spec.ts
│   └── fixtures/
│       └── auth.fixture.ts
├── api/
│   └── collections/
│       └── dashboard-api.json
└── playwright.config.ts`,
            },
          },
        },
        {
          id: 'qa-coding-patterns',
          label: 'Test Patterns',
          num: '04',
          content: {
            type: 'coding-patterns',
            patterns: [
              {
                title: 'Page Object Model',
                description: 'Wrap all page selectors and actions in a Page Object class. Tests call POM methods — never raw locators.',
                codeBlock: {
                  language: 'typescript',
                  code: `export class DevicesPage {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goTo(): Promise<void> {
    await this.page.goto('/devices');
  }

  async searchDevice(name: string): Promise<void> {
    await this.page.getByRole('searchbox').fill(name);
  }

  async getDeviceStatus(id: string): Promise<string> {
    return this.page
      .locator(\`[data-device-id="\${id}"] .status-badge\`)
      .textContent() ?? '';
  }
}`,
                },
                callout: { type: 'tip', title: 'Use data-testid attributes', body: 'Add data-testid attributes to elements in Angular templates rather than relying on CSS classes which may change.' },
              },
              {
                title: 'Test Isolation with Fixtures',
                description: 'Use Playwright fixtures to set up auth and seed data. Each test must be able to run independently.',
                codeBlock: {
                  language: 'typescript',
                  code: `const test = base.extend<{ authedPage: Page }>({
  authedPage: async ({ page }, use) => {
    await page.goto('/login');
    await page.fill('[name="email"]', 'test@nctv.com');
    await page.fill('[name="password"]', 'test1234');
    await page.click('[type="submit"]');
    await page.waitForURL('/dashboard');
    await use(page);
  },
});`,
                },
              },
            ],
          },
        },
        {
          id: 'qa-mistakes',
          label: 'Common Mistakes',
          num: '05',
          content: {
            type: 'mistakes',
            table: {
              headers: ['❌ Mistake', '✅ Correct Approach'],
              rows: [
                { cells: ['Using page.locator(\'.btn-primary\')', 'Use page.getByRole() or data-testid attributes'] },
                { cells: ['Tests sharing state or depending on execution order', 'Each test must set up its own state via fixtures'] },
                { cells: ['Hard-coding sleep: await page.waitForTimeout(3000)', 'Use page.waitForSelector() or page.waitForResponse()'] },
                { cells: ['Committing credentials to test config files', 'Use .env.test files (gitignored) or CI secrets'] },
                { cells: ['One giant spec file with 100+ tests', 'Split by feature domain; keep files under 20 tests each'] },
              ],
            },
          },
        },
        {
          id: 'qa-projects',
          label: 'Projects',
          num: '06',
          content: { type: 'projects' },
        },
      ],
    },

    // ── Apps & Projects ──────────────────────────────────────────────────────
    {
      key: 'apps',
      label: 'Apps & Projects',
      color: '#D97706',
      gradient: 'linear-gradient(135deg, #3d1a00, #78350f)',
      icon: '🗂️',
      subtitle: 'Product Portfolio · Ownership Matrix · Shared Infrastructure',
      stats: [
        { label: 'Live Apps', value: '7' },
        { label: 'In Development', value: '4' },
        { label: 'Teams', value: '4' },
        { label: 'Shared Services', value: '3' },
      ],
      projects: [],
      sections: [],
    },
  ];

  // ─── APPS & PROJECTS PAGE DATA ────────────────────────────────────────────

  /** All app entries for the Apps & Projects overview grid */
  private readonly _appEntries: ReadonlyArray<AppEntry> = [
    { name: 'Dashboard', description: 'Main operator control panel.', status: 'Live', tags: ['Angular 21', 'WebSocket'], ownerTeam: 'frontend', icon: '📊', notes: 'Core platform app; highest traffic.' },
    { name: 'Channels App', description: 'Channel lineup builder.', status: 'Dev', tags: ['Angular 21', 'NgRx'], ownerTeam: 'frontend', icon: '📺', notes: 'Beta launch in Sprint 43.' },
    { name: 'Host Revamp', description: 'Redesigned host portal.', status: 'Revamp', tags: ['Angular 21', 'SCSS'], ownerTeam: 'frontend', icon: '🎨', notes: 'Migrating from AngularJS.' },
    { name: 'Screen Player', description: 'Kiosk display player.', status: 'Live', tags: ['Electron', 'Chromium'], ownerTeam: 'frontend', icon: '🖥️', notes: 'Deployed on 2,400 displays.' },
    { name: 'Dashboard API', description: 'REST + WebSocket backend.', status: 'Live', tags: ['NestJS', 'PostgreSQL'], ownerTeam: 'backend', icon: '⚡', notes: '99.97% uptime SLA.' },
    { name: 'Channels API', description: 'Channel lineup backend.', status: 'Live', tags: ['NestJS', 'Redis'], ownerTeam: 'backend', icon: '📡', notes: 'Pub/sub to Player Sync.' },
    { name: 'Player Sync API', description: 'Edge sync for kiosks.', status: 'Dev', tags: ['Lambda@Edge', 'Redis'], ownerTeam: 'backend', icon: '🔄', notes: 'Moving to CF Lambda@Edge.' },
  ];

  // ─── SEARCH INDEX ─────────────────────────────────────────────────────────

  /**
   * Build and return the full search index from all teams and sections.
   * @returns Flat array of SearchResult entries for the search overlay
   */
  public getSearchIndex(): ReadonlyArray<SearchResult> {
    const results: SearchResult[] = [];
    for (const team of this._teams) {
      for (const section of team.sections) {
        results.push({
          id: `${team.key}-${section.id}`,
          teamKey: team.key,
          teamColor: team.color,
          teamLabel: team.label,
          title: section.label,
          snippet: `${team.label} documentation — ${section.label} (section ${section.num})`,
          sectionId: section.id,
        });
      }
      for (const project of team.projects) {
        results.push({
          id: `project-${project.id}`,
          teamKey: team.key,
          teamColor: team.color,
          teamLabel: team.label,
          title: project.name,
          snippet: project.description,
          sectionId: `${team.key}-projects`,
        });
      }
    }
    return results;
  }

  /**
   * Return the full array of team objects including all sections and projects.
   * @returns All five portal teams
   */
  public getTeams(): ReadonlyArray<Team> {
    return this._teams;
  }

  /**
   * Return all app entries for the Apps & Projects overview grid.
   * @returns All application entries
   */
  public getAppEntries(): ReadonlyArray<AppEntry> {
    return this._appEntries;
  }
}
