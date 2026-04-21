// ── FILE: src/app/core/data/frontend.data.ts ──

import { Team } from '../models/team.model';

export const frontendTeam: Team = {
  key: 'frontend',
  label: 'Frontend',
  color: '#8DCB2C',
  gradient: 'linear-gradient(135deg, #091635, #1a3366)',
  icon: 'monitor',
  subtitle: 'Angular 21 · TypeScript 5.9 · Tailwind 3.x · Auth0 · SSR',
  description: 'Architecture guides, component patterns, coding standards, and project documentation for all NCompassTV Angular applications.',
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
      description: 'Nx monorepo housing the Host Installation flow — a multi-step wizard for host setup and screen provisioning.',
      status: 'Revamp',
      icon: 'paintbrush',
      teamKey: 'frontend',
      teamColor: '#8DCB2C',
      doc: {
        meta: { stack: 'Angular 20+ · Nx 21+ · Tailwind CSS 3.0+ · Jest · Playwright · Storybook 8+', repo: 'ncompass-forgejo/host-installation-setup-v2', deploy: 'AWS CloudFront', sprint: 'Sprint 38' },
        purpose: 'Host Revamp is an Nx Monorepo that manages the end-to-end setup flow for Host Installation and Host Revamp. It separates core application logic from reusable UI components via two Nx projects: the main host-installation app and the shared component-pantry library. The installation flow is a multi-step wizard covering host creation, screen setup, installation scheduling, and final review.',
        features: [
          { title: 'Nx Monorepo Architecture', body: 'The workspace is split into apps/ (host-installation, host-installation-e2e) and libs/ (component-pantry). Focused VS Code workspace configs (npm run open:host, npm run open:pantry) let developers scope their editor to a single project.' },
          { title: 'Multi-step Installation Wizard', body: 'InstallationFlowService acts as the core state machine managing step/sub-step navigation and validation. The four steps are: Create Host → Create Screen → Set Installation → Review Information.' },
          { title: 'Component Pantry Library', body: 'libs/component-pantry is a dedicated atomic design library (Atoms, Molecules, Utilities). Components are self-contained with .ts, .html, .css, and .stories.ts files and documented via Storybook at localhost:4400.' },
          { title: 'Atomic Design System', body: 'Components are layered as Atoms (Button, Input, Badge), Molecules (Modal, Accordion, Table), and Utilities (Pipes, Directives, Utils). All UI is driven from this shared library for consistency.' },
          { title: 'Jest + Playwright Testing', body: 'Unit tests run with Jest (npm run test), E2E tests with Playwright (npm run e2e). The host-installation-e2e app is a dedicated Playwright test suite in the monorepo.' },
          { title: 'Session & Draft Management', body: 'InstallationDraftApiService auto-saves wizard drafts to the backend. SessionExpirationService monitors user activity and handles session timeout across the wizard flow.' },
        ],
        folderStructure: {
          language: 'bash',
          code: `host-installation-setup-v2/               # Nx workspace root
├── apps/
│   ├── host-installation/                 # Main Angular app
│   │   └── src/app/
│   │       ├── installation-flow/         # Multi-step wizard components & logic
│   │       ├── pages/                     # Route components (NotFound, Forbidden)
│   │       ├── components/                # App-specific shared components
│   │       ├── services/                  # API & global state services
│   │       ├── resolvers/                 # Route data pre-fetchers
│   │       ├── interfaces/                # Data models
│   │       └── types/                     # TypeScript definitions
│   └── host-installation-e2e/             # Playwright E2E test suite
├── libs/
│   └── component-pantry/                  # Shared UI library
│       └── src/lib/component-pantry/
│           ├── atoms/                     # Button, Input, Badge
│           ├── molecules/                 # Modal, Accordion, Table
│           └── utilities/                 # Pipes, Directives, Utils
├── workspace-configs/                     # Focused VS Code workspace profiles
└── scripts/                               # Automation & standards scripts`,
        },
        gettingStarted: [
          { title: 'Install Dependencies',      description: 'Ensure Node.js is installed, then install all packages.',                         code: 'npm install',                                                                               language: 'bash' },
          { title: 'Start the App',             description: 'Run the Host Installation app at http://localhost:4200.',                          code: 'npm run serve',                                                                             language: 'bash' },
          { title: 'Start Storybook',           description: 'Run the Component Pantry docs at http://localhost:4400.',                          code: 'npm run storybook',                                                                         language: 'bash' },
          { title: 'Focused Workspaces',        description: 'Open a scoped VS Code workspace for better performance.',                          code: 'npm run open:host    # Host Installation only\nnpm run open:pantry  # Component Pantry only', language: 'bash' },
          { title: 'Tests & Linting',           description: 'Run unit tests (Jest), E2E tests (Playwright), and ESLint.',                       code: 'npm run test   # Unit tests (Jest)\nnpm run e2e    # E2E tests (Playwright)\nnpm run lint   # ESLint', language: 'bash' },
          { title: 'Add a New UI Component',    description: 'Generate a component in the library and scaffold a Storybook story.',             code: 'npx nx g @nx/angular:component my-component --project=component-pantry\nnpx nx g @nx/storybook:story my-component --project=component-pantry', language: 'bash' },
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
            { cells: ['Angular',            '21',                       'Core framework — standalone components, zoneless change detection',    'Live'] },
            { cells: ['TypeScript',         '5.9',                      'Language — strict mode enabled across all source files',              'Live'] },
            { cells: ['Tailwind CSS',       '3.x',                      'Utility-first CSS applied via @apply in BEM SCSS',                    'Live'] },
            { cells: ['SCSS',               '—',                        'Preprocessor with BEM naming conventions',                            'Live'] },
            { cells: ['RxJS',               '7.8',                      'Reactive programming for API calls and async streams',                'Live'] },
            { cells: ['Auth0',              '2.3',                      'Authentication & authorization for all protected routes',             'Live'] },
            { cells: ['Angular SSR',        '—',                        'Server-side rendering with hydration for improved SEO',               'Live'] },
            { cells: ['Component Pantry',   '@ntv360/component-pantry', 'Internal shared UI component library',                               'Live'] },
            { cells: ['Leaflet',            '1.9',                      'Maps integration for territory and location features',                'Live'] },
            { cells: ['ApexCharts',         '5.x',                      'Charts & data visualization across dashboard views',                  'Live'] },
            { cells: ['Husky + Commitlint', '—',                        'Git hooks & commit message format enforcement',                       'Live'] },
            { cells: ['Prettier',           '3.x',                      'Code formatting — run npm run pretty before every PR',                'Live'] },
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
          { icon: 'git-branch',   title: 'Clone the Repository',  description: 'Clone the repo and move into the project folder.',                                  code: 'git clone <repo-url>\ncd ncompasstv-dashboard',                                                                                                                                                                                                                              language: 'bash' },
          { icon: 'package-open', title: 'Install Dependencies',  description: 'Install all packages. Prerequisites: Node.js (LTS) and npm.',                       code: 'npm install',                                                                                                                                                                                                                                                              language: 'bash' },
          { icon: 'key-round',    title: 'Configure Environment', description: 'Copy the example env file and fill in the required API and auth values.',            code: 'cp .env.example .env\n# Required:\n# AWS_API_URL      — backend API URL\n# AUTH0_DOMAIN     — Auth0 domain\n# AUTH0_CLIENT_ID   — Auth0 client ID\n# AUTH0_AUDIENCE    — Auth0 audience\n# ALLOWED_ORIGIN    — allowed CORS origin',                                        language: 'bash' },
          { icon: 'terminal',     title: 'Start the Dev Server',  description: 'Launch the Angular development server with hot-reload.',                             code: 'npm run start\n# Opens at http://localhost:4200',                                                                                                                                                                                                                    language: 'bash' },
        ],
        codeBlock: {
          language: 'bash',
          code: `# Available scripts
npm run start         # Start the development server
npm run build         # Production build
npm test              # Run unit tests (Karma + Jasmine)
npm run pretty        # Format all files with Prettier
npm run pretty:check  # Check formatting without fixing`,
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
          {
            title: 'Component Anatomy',
            description: 'Every component is standalone: true, uses inject() for DI, signal() for state. Always prefix the selector with app- and organise imports into three groups.',
            codeBlock: {
              language: 'typescript',
              code: `/** Angular Imports */
import { Component, inject, signal, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { catchError, EMPTY } from 'rxjs';

/** Third-Party Imports */
import { provideAuth0 } from '@auth0/auth0-angular';

/** Local Imports */
import { SomeService } from '@core';
import { Logger, withLoading } from '@shared/utils';

@Component({
  selector: 'app-my-feature',   // Always 'app-' prefix
  standalone: true,             // Always standalone
  imports: [SomeSharedComponent],
  templateUrl: './my-feature.component.html',
  styleUrl: './my-feature.component.scss',
})
export class MyFeatureComponent {
  private readonly _service = inject(SomeService);
  private readonly _destroy = inject(DestroyRef);
  protected isLoading = signal<boolean>(false);
  protected data      = signal<MyData[]>([]);
}`,
            },
          },
          {
            title: 'Services & API Calling Pattern',
            description: 'Every API call must follow the four-step pipe pattern: withLoading → catchError with Logger → takeUntilDestroyed → map response in subscribe.',
            codeBlock: {
              language: 'typescript',
              code: `this.service.method(params)
  .pipe(
    // 1️⃣ Manage loading state automatically
    withLoading(this.isLoading),

    // 2️⃣ Handle errors with Logger
    catchError((error: unknown) => {
      Logger.error('MyComponent', 'Failed to fetch data:', error);
      return EMPTY;
    }),

    // 3️⃣ Auto-unsubscribe on destroy
    takeUntilDestroyed(this.destroyRef),
  )
  .subscribe({
    next: (response) => {
      // 4️⃣ Map API data → UI data
      this.data.set(this.mapData(response.data));
    },
  });`,
            },
          },
          {
            title: 'Git Commit Conventions',
            description: 'Format: type: Subject in sentence case. Allowed types: feat · fix · refactor · styles · build · chore. Imperative mood, no period at the end.',
            codeBlock: {
              language: 'bash',
              code: `# ✅ Correct
git commit -m "feat(ntv-200): Add license export button"
git commit -m "fix: Resolve table pagination bug"
git commit -m "chore: Update dependencies"

# ❌ Wrong
git commit -m "feat: add license export button"   # lowercase subject
git commit -m "feat: Added the export button."    # past tense + period
git commit -m "update: Fix something"             # invalid type`,
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
            { cells: ['Putting Tailwind classes inline in HTML',    'Use @apply in SCSS with BEM class names'] },
            { cells: ['Using *ngIf / *ngFor structural directives', 'Use @if {} and @for {} with a track expression'] },
            { cells: ['Using constructor injection',                'Use inject() for all dependency injection'] },
            { cells: ['Using any type',                             'Define a proper interface or use unknown with a type guard'] },
            { cells: ['Deep relative imports (../../../)',          'Use path aliases: @core, @shared, @features, @layouts'] },
            { cells: ['Forgetting takeUntilDestroyed',              'Always add it as the last pipe operator in every subscription'] },
            { cells: ['Forgetting JSDoc on classes & methods',      'Add JSDoc on every class, method, function, and interface'] },
            { cells: ['Using console.log directly',                 'Use Logger.log() / Logger.error() / Logger.warn()'] },
            { cells: ['Forgetting to add to barrel file',           'Export new items from the relevant index.ts'] },
            { cells: ['BehaviorSubject for UI state',               'Use signal() and computed() from @angular/core'] },
            { cells: ['Using @media queries in SCSS',               "Use Tailwind's max-lg: / max-md: variants (desktop-first)"] },
            { cells: ['Committing without formatting',              'Run npm run pretty before every commit or PR'] },
          ],
        },
      },
    },
    {
      id: 'fe-contacts',
      label: 'Team Contacts',
      num: '06',
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
