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
    { label: 'Components', value: '120+' },
    { label: 'Projects', value: '5' },
    { label: 'Test Coverage', value: '91%' },
    { label: 'Avg TTI', value: '1.2s' },
  ],
  projects: [
    {
      id: 'fe-dashboard',
      name: 'Dashboard',
      description: 'Primary operator control plane — analytics, licenses, users, device management, and content approval.',
      status: 'Live',
      icon: 'layout-dashboard',
      teamKey: 'frontend',
      teamColor: '#8DCB2C',
      doc: {
        meta: { stack: 'Angular 21 · TypeScript 5.9 · Tailwind CSS 3.x · RxJS 7.8 · Auth0 2.3 · SSR', repo: 'ncompasstv-dashboard', deploy: 'AWS CloudFront (SSR + Hydration)', sprint: 'Sprint 42' },
        purpose: 'The ncompasstv-dashboard is the primary control plane for NCompassTV operators. Built as an Angular 21 SSR application with zoneless change detection, it provides license management, user administration, advertiser CRUD, host location management, and a media library — all driven exclusively by Angular Signals.',
        features: [
          { title: 'Zoneless Change Detection', body: 'Uses provideZonelessChangeDetection() instead of Zone.js. All UI updates are driven by signals — no manual ChangeDetectorRef.markForCheck() calls needed.' },
          { title: 'Standalone Components Only', body: 'No NgModules anywhere. Every component is standalone: true and imports its own dependencies. Combined with lazy-loaded routes this significantly reduces initial bundle size.' },
          { title: 'SSR + Hydration', body: 'The app renders on the server first then hydrates on the client via Angular SSR, improving SEO and perceived load times.' },
          { title: 'Auth0 Authentication', body: 'Auth0 v2.3 handles all authentication and authorization. Route guards protect all feature routes.' },
          { title: 'ApexCharts Data Visualization', body: 'ApexCharts 5.x renders analytics charts across dashboard views with configurable series and responsive breakpoints.' },
          { title: 'Component Pantry UI Library', body: 'Shared @ntv360/component-pantry components are used throughout — tables, buttons, autocomplete, modals — ensuring visual consistency across all NCompassTV frontends.' },
        ],
        folderStructure: {
          language: 'bash',
          code: `ncompasstv-dashboard/
├── src/app/
│   ├── core/
│   │   ├── guards/          # authGuard, guestGuard
│   │   ├── services/        # auth, licenses, users, dealers, hosts, export
│   │   ├── dto/             # Data Transfer Objects for API requests/responses
│   │   └── index.ts         # Barrel file
│   ├── shared/
│   │   ├── components/      # table, button, autocomplete, modals
│   │   ├── constants/       # colors, icons, timezones
│   │   ├── directives/      # click-outside, copy
│   │   ├── interfaces/      # table, media, stats, city
│   │   ├── pipes/           # duration-formatter, file-size, kebab-case
│   │   ├── utils/           # withLoading, Logger, query-builder
│   │   ├── validators/      # Custom form validators
│   │   └── index.ts
│   ├── features/
│   │   ├── advertisers/     # CRUD for advertisers
│   │   ├── auth/            # Login + Auth0 callback
│   │   ├── dashboard/       # Main dashboard view
│   │   ├── dealers/         # Dealer management
│   │   ├── hosts/           # Host location management
│   │   ├── licenses/        # License management
│   │   ├── media-library/   # Media asset management
│   │   ├── screens/         # Screen/player management
│   │   └── users/           # User management
│   └── layout/
│       ├── authenticated/   # Layout for logged-in users
│       ├── public/          # Layout for guest pages
│       └── main-layout/     # Sidebar + header + router-outlet`,
        },
        gettingStarted: [
          { title: 'Clone & Install', description: 'Clone the repository and install dependencies.', code: 'git clone <repo-url>\ncd ncompasstv-dashboard\nnpm install', language: 'bash' },
          { title: 'Configure Environment', description: 'Copy the example env file and fill in required values.', code: 'cp .env.example .env\n# Required:\n# AWS_API_URL       — backend API URL\n# AUTH0_DOMAIN      — Auth0 domain\n# AUTH0_CLIENT_ID   — Auth0 client ID\n# AUTH0_AUDIENCE    — Auth0 audience\n# ALLOWED_ORIGIN    — allowed CORS origin', language: 'bash' },
          { title: 'Start Dev Server', description: 'Run the Angular development server with hot-reload.', code: 'npm run start\n# Opens at http://localhost:4200', language: 'bash' },
          { title: 'Run Tests', description: 'Execute the Karma + Jasmine unit test suite.', code: 'npm test', language: 'bash' },
          { title: 'Format Code', description: 'Run Prettier across all source files.', code: 'npm run pretty\n# Check only (no write):\nnpm run pretty:check', language: 'bash' },
        ],
        contacts: [
          { name: 'Jeremicah Licup', role: 'Team Lead', initials: 'JL', color: '#8DCB2C' },
          { name: 'Earl Vhin Gabuat', role: 'Lead Engineer', initials: 'EV', color: '#6366F1' },
        ],
        links: [
          { label: 'Git Repository', url: 'https://git.n-compass.online/NTV360/knowledge-base-v2.git', type: 'repo' },
        ],
      },
    },
    {
      id: 'fe-channels',
      name: 'Channels UI',
      description: 'Angular 20 SSR app for managing Channels, Collections, and Content for the NTV360 platform.',
      status: 'Dev',
      icon: 'tv',
      teamKey: 'frontend',
      teamColor: '#8DCB2C',
      doc: {
        meta: { stack: 'Angular 20.3.7 · TypeScript 5.8.3 · SSR (Express 5) · Tailwind 3.4.18 · Component Pantry 0.5.3', repo: 'channels-ui', deploy: 'AWS CloudFront (Lambda SSR + S3 static)', sprint: 'Sprint 40' },
        purpose: 'channels-ui is a standalone Angular 20 SSR application that allows content administrators to manage Channels, Collections, and Content for the NTV360 platform. The Express BFF proxies all API requests, injects runtime config at render time, and handles HttpOnly cookie auth forwarding.',
        features: [
          { title: 'Multi-step Channel Creation Wizard', body: 'A 3-step wizard (Channel Information → Select Content → Preview) guides admins through creating a channel. Name uniqueness is validated in real-time via a debounced API call.' },
          { title: 'Genre-based Collections with Drag-and-Drop', body: 'Collections are grouped by genre. DraggableRowDirective enables drag-and-drop content reordering. CollectionCreationStateService manages the multi-step creation draft.' },
          { title: 'Content Library Browser', body: 'ChannelLibraryComponent provides a paginated content picker with selection state managed by ChannelLibraryStateService.' },
          { title: 'AI Thumbnail Generation', body: 'AiImageModalComponent generates thumbnail suggestions via the Google Gemini API (@google/genai 1.34). Thumbnails are hosted on Filestack CDN.' },
          { title: 'Real-time Video Conversion Status', body: 'VideoConversionWebsocketService maintains a native WebSocket connection to stream video processing events live to the UI.' },
          { title: 'BFF Proxy + SSR Config Injection', body: 'The Express server routes /api/* to the upstream REST API and injects window.__APP_CONFIG__ (apiBaseUrl, wsUrl, user, role) into the SSR HTML at render time.' },
        ],
        folderStructure: {
          language: 'bash',
          code: `channels-ui/
├── src/
│   ├── app/
│   │   ├── app.component.*        # Root component
│   │   ├── app.config.ts          # Providers: zoneless, HTTP, auth
│   │   ├── app.routes.ts          # Root routes (all require authGuard)
│   │   ├── api-endpoints.ts       # Centralized API path constants
│   │   ├── core/                  # Guards, interceptors, models, services
│   │   ├── features/
│   │   │   ├── channels/          # Channel list, create wizard, single view
│   │   │   ├── channel-library/   # Content library browser
│   │   │   └── dashboard/         # Dashboard overview
│   │   ├── shared/
│   │   │   ├── components/        # ChannelGallery, AiImageModal, UploadModal
│   │   │   ├── services/          # Filestack, Gemini, WebSocket, HelperService
│   │   │   └── directives/        # DraggableRowDirective
│   │   └── layout/                # Authenticated & public shell layouts
│   └── server/                    # Express BFF (proxies /api/*, injects config)
├── public/                        # Static assets (default_thumbnail, Lottie JSON)
└── terraform/                     # AWS CloudFront + Lambda + S3 infrastructure`,
        },
        gettingStarted: [
          { title: 'Clone & Install', description: 'Clone the repository and install all packages.', code: 'git clone <repo-url>\ncd channels-ui\nnpm install', language: 'bash' },
          { title: 'Configure Environment', description: 'Set up the .env file with API base URLs, WebSocket URLs, and auth config.', code: '# Required .env variables:\n# DEV_API_BASE_URL, STG_API_BASE_URL, PROD_API_BASE_URL\n# DEV_WS_URL, STG_WS_URL, PROD_WS_URL\n# MOCK_AUTH_* (for local dev)\n# PORT, NODE_ENV, ENABLE_LOGGING', language: 'bash' },
          { title: 'Start Dev Server', description: 'Launch with the development environment (SSR + BFF proxy).', code: 'npm start\n# App at http://localhost:4200', language: 'bash' },
          { title: 'Build for Production', description: 'Compile SSR bundle for deployment.', code: 'npm run build:prod', language: 'bash' },
          { title: 'Format Code', description: 'Run Prettier across all source files.', code: 'npm run pretty\n# Staged only (pre-commit hook):\nnpm run pretty:staged', language: 'bash' },
        ],
        contacts: [
          { name: 'Jeremicah Licup', role: 'Team Lead', initials: 'JL', color: '#8DCB2C' },
          { name: 'Earl Vhin Gabuat', role: 'Lead Engineer', initials: 'EV', color: '#6366F1' },
        ],
        links: [
          { label: 'Git Repository', url: 'https://git.n-compass.online/NTV360/channels-ui.git', type: 'repo' },
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
          { name: 'Jeremicah Licup', role: 'Team Lead', initials: 'JL', color: '#8DCB2C' },
          { name: 'Earl Vhin Gabuat', role: 'Lead Engineer', initials: 'EV', color: '#6366F1' },
        ],
        links: [
          { label: 'Git Repository', url: '#', type: 'repo' },
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
          { name: 'Jeremicah Licup', role: 'Team Lead', initials: 'JL', color: '#8DCB2C' },
          { name: 'Earl Vhin Gabuat', role: 'Lead Engineer', initials: 'EV', color: '#6366F1' },
        ],
        links: [
          { label: 'Git Repository', url: '#', type: 'repo' },
        ],
      },
    },
    {
      id: 'fe-component-pantry',
      name: 'Component Pantry',
      description: 'NTV360 Angular component library with Storybook integration and live hosted docs.',
      status: 'Live',
      icon: 'package',
      teamKey: 'frontend',
      teamColor: '#8DCB2C',
      doc: {
        meta: { stack: 'Angular 20.3 · Storybook 10 · TypeScript 5.9', repo: 'nctv/component-pantry', deploy: 'Vercel', sprint: 'Sprint 41' },
        purpose: 'Component Pantry is the NTV360 Angular component library. It provides a shared set of reusable UI components with interactive Storybook documentation hosted on Vercel, serving as the single source of truth for component behaviour across all NCompassTV frontend projects.',
        features: [
          { title: 'Storybook Integration', body: 'Every component ships with Stories covering all variants and states, viewable live at the hosted Storybook URL without cloning the repo.' },
          { title: 'Library Build Pipeline', body: 'Separate npm scripts for dev and production library builds allow consumers to reference the compiled dist output or the raw source during development.' },
          { title: 'Angular 20 + Storybook 10', body: 'Uses the official @storybook/angular builder with a dedicated .storybook/tsconfig.json to keep story compilation isolated from the app tsconfig.' },
          { title: 'Zone.js Runtime', body: 'Storybook requires zone.js as an explicit runtime dependency alongside Angular; the setup is pre-configured so new contributors can onboard without manual changes.' },
        ],
        folderStructure: {
          language: 'bash',
          code: `component-pantry/
├── projects/
│   └── ntv360/
│       └── component-pantry/   # Component library source
├── .storybook/
│   ├── main.ts                 # Storybook config
│   ├── preview.ts              # Global decorators & parameters
│   └── tsconfig.json           # TypeScript config for stories
├── src/                        # Application source
└── dist/                       # Build output`,
        },
        gettingStarted: [
          {
            title: 'Prerequisites',
            description: 'Ensure Node.js 18+ and npm 9+ are installed.',
            code: 'node --version   # >= 18.x\nnpm --version    # >= 9.x',
            language: 'bash',
          },
          {
            title: 'Install Dependencies',
            description: 'Install all packages including zone.js required by Storybook.',
            code: 'npm install',
            language: 'bash',
          },
          {
            title: 'Run Storybook',
            description: 'Start the interactive component browser at http://localhost:6006.',
            code: 'npm run storybook',
            language: 'bash',
          },
          {
            title: 'Run Angular Dev Server',
            description: 'Launch the Angular app alongside the library at http://localhost:4200.',
            code: 'npm start',
            language: 'bash',
          },
          {
            title: 'Build Component Library',
            description: 'Compile the library to dist/ for consumption by other projects.',
            code: 'npm run build:lib          # development\nnpm run build:lib:prod    # production (minified)',
            language: 'bash',
          },
        ],
        contacts: [
          { name: 'Jeremicah Licup', role: 'Team Lead', initials: 'JL', color: '#8DCB2C' },
          { name: 'Earl Vhin Gabuat', role: 'Lead Engineer', initials: 'EV', color: '#6366F1' },
        ],
        links: [
          { label: 'Git Repository', url: 'https://git.n-compass.online/NTV360/ntv360-component-pantry.git', type: 'repo' },
        ],
      },
    },
  ],
  sections: [
    {
      id: 'fe-projects',
      label: 'Projects',
      num: '01',
      content: { type: 'projects' },
    },
    {
      id: 'fe-tech-stack',
      label: 'Tech Stack Overview',
      num: '02',
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
      num: '03',
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
      num: '04',
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
      num: '05',
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
      num: '06',
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
      id: 'fe-contacts',
      label: 'Team Contacts',
      num: '07',
      content: {
        type: 'team-contacts',
        contacts: [
          {
            name: 'Jeremicah Licup',
            role: 'Team Lead',
            initials: 'JL',
            color: '#8DCB2C',
          },
          {
            name: 'Earl Vhin Gabuat',
            role: 'Lead Engineer',
            initials: 'EV',
            color: '#6366F1',
          },
        ],
      },
    },
  ],
};
