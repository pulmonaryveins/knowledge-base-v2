// ── FILE: src/app/core/data/frontend.data.ts ──

import { Team } from '../models/team.model';

export const frontendTeam: Team = {
  key: 'frontend',
  label: 'Frontend',
  color: '#8DCB2C',
  gradient: 'linear-gradient(135deg, #091635, #1a3366)',
  icon: 'monitor',
  subtitle: 'Angular 21 · Tailwind CSS v4 · TypeScript 5 · Zoneless Signals',
  stats: [
    { label: 'Components', value: '84' },
    { label: 'Projects', value: '4' },
    { label: 'Test Coverage', value: '91%' },
    { label: 'Avg TTI', value: '1.2s' },
  ],
  projects: [
    {
      id: 'fe-dashboard',
      name: 'Dashboard',
      description: 'Main operator dashboard — analytics, schedules, and device management.',
      status: 'Live',
      icon: 'layout-dashboard',
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
      icon: 'tv',
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
      icon: 'paintbrush',
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
      icon: 'monitor',
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
  ],
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
          { icon: 'git-branch',   title: 'Clone the Repository', description: 'Clone the target repo to your local machine using SSH.', code: 'git clone git@github.com:nctv/<repo>.git\ncd <repo>', language: 'bash' },
          { icon: 'package-open', title: 'Install Dependencies', description: 'Use the exact Node version in .nvmrc, then install packages.', code: 'nvm use\nnpm install', language: 'bash' },
          { icon: 'key-round',    title: 'Configure Environment', description: 'Copy the example environment file and fill in required API values.', code: 'cp .env.example .env.local\n# Edit VITE_API_URL and VITE_WS_URL', language: 'bash' },
          { icon: 'terminal',     title: 'Start the Dev Server', description: 'Launch the Angular development server with hot-reload.', code: 'npm start\n# App runs at http://localhost:4200', language: 'bash' },
          { icon: 'flask-conical',title: 'Run Tests', description: 'Run unit tests with Vitest and E2E tests with Playwright.', code: 'npm test          # unit\nnpm run test:e2e  # E2E', language: 'bash' },
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
        layout: 'stack',
        patterns: [
          {
            title: 'Signal-based State',
            description: 'All UI state is managed with signal(), computed(), and effect(). Never BehaviorSubject for local component state.',
            codeBlock: {
              language: 'typescript',
              code: `@Component({ ... })
export class DeviceListComponent {
  // ✅ Mutable state
  readonly devices      = signal<Device[]>([]);
  readonly searchQuery  = signal('');

  // ✅ Derived state — no manual subscriptions
  readonly filtered = computed(() =>
    this.devices().filter(d =>
      d.name.toLowerCase().includes(this.searchQuery().toLowerCase())
    )
  );

  addDevice(device: Device): void {
    this.devices.update(list => [...list, device]);
  }
}`,
            },
          },
          {
            title: 'inject() Dependency Injection',
            description: 'Always use the inject() function in field declarations. Constructor injection is forbidden.',
            codeBlock: {
              language: 'typescript',
              code: `@Component({ ... })
export class DeviceListComponent {
  // ✅ inject() at field declaration
  private readonly _deviceService = inject(DeviceService);
  private readonly _router        = inject(Router);
  private readonly _destroyRef    = inject(DestroyRef);

  // ❌ Constructor injection — strictly forbidden
  // constructor(private _deviceService: DeviceService) {}
}`,
            },
          },
          {
            title: '@if / @for Control Flow',
            description: 'Use the new Angular template syntax. The old *ngIf and *ngFor directives are banned.',
            codeBlock: {
              language: 'html',
              code: `@if (isLoading()) {
  <app-spinner />
} @else if (devices().length === 0) {
  <p class="device-list__empty">No devices found.</p>
} @else {
  @for (device of devices(); track device.id) {
    <app-device-card [device]="device" />
  }
}

<!-- ❌ Banned — do not use structural directives -->
<!-- <div *ngIf="isLoading()">...</div>          -->
<!-- <div *ngFor="let d of devices()">...</div>  -->`,
            },
          },
          {
            title: 'BEM + SCSS @apply',
            description: 'Define BEM class names in SCSS using @apply for Tailwind utilities. Never put utility classes directly in HTML templates.',
            codeBlock: {
              language: 'scss',
              code: `.device-card {
  @apply flex flex-col gap-3 p-4 rounded-lg;
  @apply bg-[var(--card)] border border-[var(--border)];

  &__title {
    @apply font-bold text-[var(--navy)] text-[15px];
  }

  &__status {
    @apply text-[12px] text-[var(--muted)];

    &--active  { @apply text-[var(--green)]; }
    &--offline { @apply text-[var(--danger)]; }
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
};
