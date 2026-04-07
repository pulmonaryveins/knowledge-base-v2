// ── FILE: src/app/core/data/qa.data.ts ──

import { Team } from '../models/team.model';

export const qaTeam: Team = {
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
  projects: [
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
  ],
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
            { cells: ["Using page.locator('.btn-primary')", 'Use page.getByRole() or data-testid attributes'] },
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
};
