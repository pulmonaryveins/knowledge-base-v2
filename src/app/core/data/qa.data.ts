// ── FILE: src/app/core/data/qa.data.ts ──

import { Team } from '../models/team.model';

export const qaTeam: Team = {
  key: 'qa',
  label: 'Quality Assurance',
  color: '#0891B2',
  gradient: 'linear-gradient(135deg, #042f3d, #0c4a6e)',
  icon: 'test-tube',
  subtitle: 'Python · Playwright · Selenium · Page Object Model · pytest · flake8',
  stats: [
    { label: 'Automation Suites', value: '3' },
    { label: 'Tools', value: '7' },
    { label: 'POM Classes', value: '20+' },
    { label: 'Test Coverage', value: 'E2E + API' },
  ],
  projects: [
    {
      id: 'qa-dashboard',
      name: 'Dashboard Automation Suite',
      description: 'Python + Selenium POM automation suite for the NCompassTV Dashboard, covering module scripts, suites, and test data.',
      status: 'Live',
      icon: 'test-tube',
      teamKey: 'qa',
      teamColor: '#0891B2',
      doc: {
        meta: {
          stack: 'Python 3.8+ · Selenium WebDriver · pytest · flake8',
          repo: 'N-Compass-TV/qa-automation-nctv-dashboardv1',
          deploy: 'GitHub Actions CI',
          sprint: 'Active',
        },
        purpose: 'Maintains the full automated test coverage for the NCompassTV Dashboard using Python and Selenium WebDriver. Tests are organized with the Page Object Model (POM) pattern — page classes inherit from BasePage, encapsulating locators and actions. pytest manages test execution; flake8 enforces code quality.',
        features: [
          {
            title: 'Page Object Model Architecture',
            body: 'Every page has a dedicated Page class extending BasePage. Locators are class-level attributes; interactions are methods. Tests import page objects and never interact with raw selectors directly.',
          },
          {
            title: 'Fixture-Based Setup with conftest.py',
            body: 'conftest.py provides `setup_browser` (session-scoped WebDriver setup/teardown) and `setup_session(role)` (login fixture per role). Tests declare fixtures — no manual browser init in test files.',
          },
          {
            title: 'Structured Test Arrangements',
            body: 'Every test follows the Ticket Information header (Header, Description, Objective, NSP/NAB Link, Date, Author, Updated by, Change log) and Test Arrangements (Arrange, Test Data, Precondition, Act, Assert, Cleanup) structure.',
          },
        ],
        folderStructure: {
          language: 'bash',
          code: `qa-automation-nctv-dashboardv1/
├── dashboard/
│   ├── module_scripts/      # Individual page automation scripts
│   ├── module_suites/       # Full test suite runners
│   └── module_data/         # Test data files (JSON, CSV)
├── helpers/
│   ├── base_page.py         # BasePage class (driver, wait, shared actions)
│   ├── base_player.py       # BasePlayer for player-specific helpers
│   └── base_api.py          # BaseApi for API request helpers
├── locators/
│   └── <module>_locators.py # CSS/XPath locators per module
├── conftest.py              # pytest fixtures (browser, session, roles)
├── pytest.ini               # pytest configuration
└── .flake8                  # flake8 linting config (max-line-length=100)`,
        },
        gettingStarted: [
          {
            title: 'Clone & Install',
            description: 'Clone the dashboard automation repo and install dependencies.',
            code: 'git clone git@github.com:N-Compass-TV/qa-automation-nctv-dashboardv1.git\ncd qa-automation-nctv-dashboardv1\npip install -r requirements.txt',
            language: 'bash',
          },
          {
            title: 'Configure Environment',
            description: 'Set up your .env file with base URL and credentials.',
            code: 'cp .env.example .env\n# Set BASE_URL, USERNAME, PASSWORD',
            language: 'bash',
          },
          {
            title: 'Run Tests',
            description: 'Execute the full suite with pytest.',
            code: 'pytest dashboard/module_suites/ -v',
            language: 'bash',
          },
          {
            title: 'Lint Check',
            description: 'Run flake8 to ensure code quality before committing.',
            code: 'flake8 . --max-line-length=100',
            language: 'bash',
          },
        ],
        contacts: [
          { name: 'QA Lead', role: 'QA Team Lead', initials: 'QL', color: '#0891B2' },
        ],
        links: [
          { label: 'GitHub Repo', url: '#', type: 'repo' },
          { label: 'Test Reports', url: '#', type: 'docs' },
        ],
      },
    },
    {
      id: 'qa-playwright',
      name: 'Playwright Automation Suite',
      description: 'TypeScript Playwright POM test suite with role-based selectors, test isolation, and structured test data management.',
      status: 'Live',
      icon: 'play',
      teamKey: 'qa',
      teamColor: '#0891B2',
      doc: {
        meta: {
          stack: 'Playwright · TypeScript · Page Object Model',
          repo: 'N-Compass-TV/qa-playwright-suite',
          deploy: 'GitHub Actions CI',
          sprint: 'Active',
        },
        purpose: 'TypeScript-based Playwright automation suite following strict POM conventions. Page classes extend BasePage, all locators are readonly properties initialized in the constructor. Selector priority enforces semantic, role-based selectors over CSS or XPath. Tests use testLoginAccount() helpers and test.describe() blocks for isolation.',
        features: [
          {
            title: 'Strict Selector Priority',
            body: 'Selector usage is enforced in order: getByRole() → getByText() → locator() with CSS. XPath selectors are forbidden. Role-based selectors improve test reliability and accessibility alignment.',
          },
          {
            title: 'POM with BasePage Inheritance',
            body: 'All page classes extend BasePage. Locators are readonly Locator properties initialized in the constructor — never inside methods. Page methods perform one action only and are named with action verbs (click, fill, select).',
          },
          {
            title: 'testLoginAccount() Workflow',
            body: 'Login is centralized via the testLoginAccount() helper. Tests never duplicate authentication logic. The helper manages navigation, credentials, and wait-for-URL confirmation.',
          },
        ],
        folderStructure: {
          language: 'bash',
          code: `playwright-suite/
├── tests/
│   └── <feature>/
│       └── <feature>.spec.ts    # Test specs, grouped by feature
├── pages/
│   └── <feature>/
│       └── <feature>.page.ts    # Page Object classes
├── helpers/
│   ├── base-page.ts             # BasePage with shared Locator helpers
│   └── login.helper.ts          # testLoginAccount() and auth helpers
├── test-data/
│   └── <feature>.data.ts        # Typed test data constants
├── config/
│   └── playwright.config.ts
└── tsconfig.json`,
        },
        gettingStarted: [
          {
            title: 'Clone & Install',
            description: 'Clone the Playwright suite and install dependencies.',
            code: 'git clone git@github.com:N-Compass-TV/qa-playwright-suite.git\ncd qa-playwright-suite\nnpm install',
            language: 'bash',
          },
          {
            title: 'Install Playwright Browsers',
            description: 'Download Playwright browser binaries.',
            code: 'npx playwright install --with-deps',
            language: 'bash',
          },
          {
            title: 'Run Tests',
            description: 'Execute the full Playwright test suite.',
            code: 'npx playwright test',
            language: 'bash',
          },
          {
            title: 'View Report',
            description: 'Open the HTML test report after a run.',
            code: 'npx playwright show-report',
            language: 'bash',
          },
        ],
        contacts: [
          { name: 'QA Engineer', role: 'Playwright Lead', initials: 'QE', color: '#0891B2' },
        ],
        links: [
          { label: 'GitHub Repo', url: '#', type: 'repo' },
        ],
      },
    },
    {
      id: 'qa-player',
      name: 'Player Testing Suite',
      description: 'API regression and hardware-in-the-loop testing for NCompassTV players — Pi devices with Flask server, SSH-based automation, and Selenium Chromium.',
      status: 'Live',
      icon: 'monitor',
      teamKey: 'qa',
      teamColor: '#0891B2',
      doc: {
        meta: {
          stack: 'Python · Selenium · Flask · SSH · Raspberry Pi',
          repo: 'N-Compass-TV/qa-player-testing',
          deploy: 'Manual / Lab',
          sprint: 'Active',
        },
        purpose: 'Tests NCompassTV player hardware using a two-machine setup: the PC runs API regression tests using Python/Selenium, while SSH connects to Raspberry Pi devices running a Flask server. Selenium Chromium drives browser automation on the Pi. BasePlayer and BaseApi helper classes abstract common player and API interactions.',
        features: [
          {
            title: 'PC-Side API Regression',
            body: 'Python scripts on the PC hit player management APIs (content scheduling, sync, health checks) using BaseApi helper. Tests verify response codes, payloads, and state consistency.',
          },
          {
            title: 'Pi Device Automation via SSH',
            body: 'SSH connects to Raspberry Pi player units in the lab. A Flask server on each Pi receives test commands. Selenium Chromium automates browser-side player behavior on the device.',
          },
          {
            title: 'BasePlayer & BaseApi Helpers',
            body: 'BasePlayer encapsulates SSH session management, Flask endpoint calls, and Selenium WebDriver setup on the Pi. BaseApi provides HTTP session management and assertion helpers for REST endpoints.',
          },
        ],
        folderStructure: {
          language: 'bash',
          code: `qa-player-testing/
├── api-player/
│   └── tests/               # API regression test scripts
├── pi-testing/
│   └── scripts/             # SSH + Flask + Selenium test scripts
├── helpers/
│   ├── base_player.py       # SSH session, Flask calls, Selenium on Pi
│   └── base_api.py          # HTTP session, API assertion helpers
├── conftest.py
└── requirements.txt`,
        },
        gettingStarted: [
          {
            title: 'Clone & Install',
            description: 'Clone the player testing repo.',
            code: 'git clone git@github.com:N-Compass-TV/qa-player-testing.git\ncd qa-player-testing\npip install -r requirements.txt',
            language: 'bash',
          },
          {
            title: 'Configure Pi SSH',
            description: 'Set Pi host, SSH credentials, and Flask server port in .env.',
            code: 'cp .env.example .env\n# Set PI_HOST, SSH_USER, SSH_KEY_PATH, FLASK_PORT',
            language: 'bash',
          },
          {
            title: 'Run API Tests',
            description: 'Execute API regression tests on the PC.',
            code: 'pytest api-player/tests/ -v',
            language: 'bash',
          },
          {
            title: 'Run Pi Tests',
            description: 'Run Pi device automation tests (Pi must be reachable via SSH).',
            code: 'pytest pi-testing/scripts/ -v',
            language: 'bash',
          },
        ],
        contacts: [
          { name: 'QA Engineer', role: 'Player Testing', initials: 'QE', color: '#D97706' },
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
            { cells: ['Python', '3.8+', 'Primary language for Selenium-based automation and API testing', 'Live'] },
            { cells: ['Selenium WebDriver', '4.x', 'Browser automation for Dashboard and Player testing', 'Live'] },
            { cells: ['Playwright', 'Latest', 'TypeScript-based E2E automation with strict POM rules', 'Live'] },
            { cells: ['pytest', '7.x', 'Test runner, fixture management, and reporting for Python suites', 'Live'] },
            { cells: ['flake8', '6.x', 'Python linting — max-line-length=100, snake_case, no wildcard imports', 'Live'] },
            { cells: ['Page Object Model', 'Pattern', 'Architectural pattern for all test suites — BasePage inheritance', 'Live'] },
            { cells: ['Flask', 'Latest', 'Flask server on Raspberry Pi devices for player test command routing', 'Live'] },
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
          {
            icon: 'clipboard-list',
            title: 'Pick a Task from the QA Board',
            description: 'All work flows through the QA board stages: To-dos → In Progress → Integration → Ready for Execution → Executing Scripts → Code Review → Changes Requested → Done. Pick an unassigned item from To-dos and move it to In Progress.',
            code: '# QA Board Stages\n# To-dos → In Progress → Integration → Ready for Execution\n# → Executing Scripts → Code Review → Changes Requested → Done',
            language: 'bash',
          },
          {
            icon: 'git-branch',
            title: 'Branch from Development',
            description: 'Always create your branch from the development branch. Use the ticket number in the branch name.',
            code: 'git checkout development\ngit pull origin development\ngit checkout -b nsp-<ticket-number>/<short-description>',
            language: 'bash',
          },
          {
            icon: 'pen-tool',
            title: 'Write Tests Using POM',
            description: 'Create or update a Page class in helpers/ or pages/. Write your test script importing the page object. Follow Ticket Information header and Test Arrangements format in every test file.',
            code: '# Python: create page class\n# File: helpers/my_module_page.py\nfrom helpers.base_page import BasePage\n\nclass MyModulePage(BasePage):\n    LOCATOR = "css=.my-element"\n\n    def click_element(self):\n        self.click(self.LOCATOR)',
            language: 'python',
          },
          {
            icon: 'terminal',
            title: 'Commit & Push',
            description: 'Use the ticket number in the commit message. Push and set upstream on first push.',
            code: 'git status\ngit add <files>\ngit commit -m "nsp-<ticket>/initial commit containing test data"\ngit push --set-upstream origin nsp-<ticket>/<description>',
            language: 'bash',
          },
          {
            icon: 'git-pull-request',
            title: 'Open a Pull Request',
            description: 'Create a PR targeting the development branch. Move the board ticket to Code Review. Address any Changes Requested feedback before merge.',
            code: 'gh pr create --base development --title "nsp-<ticket>: <description>"',
            language: 'bash',
          },
        ],
        codeBlock: {
          language: 'bash',
          code: `# Run a single test module (Python)
pytest dashboard/module_suites/test_devices.py -v

# Run Playwright tests for a specific feature
npx playwright test tests/devices/

# Run with headed browser (debugging)
npx playwright test --headed

# Check linting before push
flake8 . --max-line-length=100`,
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
          {
            title: 'dashboard/module_scripts/',
            body: 'Individual page automation scripts for discrete dashboard modules. Each script targets one module (devices, schedules, analytics). Scripts are imported by module_suites runners.',
          },
          {
            title: 'dashboard/module_suites/',
            body: 'Full test suite runners that combine multiple module_scripts into end-to-end flows. Suites are the entry point for pytest execution.',
          },
          {
            title: 'helpers/',
            body: 'BasePage, BasePlayer, and BaseApi classes. All page objects extend BasePage. Player tests use BasePlayer for SSH+Flask+Selenium. API tests use BaseApi for HTTP session management.',
          },
          {
            title: 'locators/',
            body: 'One locator file per module (e.g., devices_locators.py). Stores CSS selectors and element identifiers as constants. Imported by page classes — never referenced directly in test scripts.',
          },
          {
            title: 'conftest.py',
            body: 'pytest fixtures: setup_browser (session-scoped WebDriver init/teardown) and setup_session(role) (login per user role). All tests use fixtures — no manual browser setup in test files.',
          },
          {
            title: 'pages/ (Playwright)',
            body: 'TypeScript Page Object classes for the Playwright suite. One folder per feature. All locators are readonly Locator properties initialized in the constructor, never inside methods.',
          },
        ],
        codeBlock: {
          language: 'bash',
          code: `qa-automation-nctv-dashboardv1/
├── dashboard/
│   ├── module_scripts/
│   │   ├── devices_script.py
│   │   └── schedules_script.py
│   ├── module_suites/
│   │   └── test_dashboard_suite.py
│   └── module_data/
│       └── devices_data.json
├── helpers/
│   ├── base_page.py
│   ├── base_player.py
│   └── base_api.py
├── locators/
│   └── devices_locators.py
└── conftest.py`,
        },
      },
    },
    {
      id: 'qa-coding-patterns',
      label: 'Coding Patterns',
      num: '04',
      content: {
        type: 'coding-patterns',
        layout: 'stack',
        patterns: [
          {
            title: 'Ticket Information Header (Python)',
            description: 'Every test file must begin with a structured docstring header: Header (ticket number), Description, Objective, NSP/NAB Link, Date, Author, Updated by, and Change log.',
            codeBlock: {
              language: 'python',
              code: `"""
Header      : NSP-818 | Dashboard Devices Module
Description : Automates the device management flow in the Dashboard
Objective   : Verify that devices can be added, edited, and deleted
NSP/NAB Link: https://ncompasstv.atlassian.net/browse/NSP-818
Date        : 2024-01-15
Author      : QA Engineer
Updated by  : QA Lead
Change log  :
    2024-01-20 - Updated locators after Dashboard v3.2 redesign
"""`,
            },
          },
          {
            title: 'Test Arrangements (Arrange / Act / Assert)',
            description: 'Structure every test with labeled arrangement sections: Arrange (setup), Test Data, Precondition (navigation/login state), Act (user actions), Assert (verifications), and Cleanup.',
            codeBlock: {
              language: 'python',
              code: `def test_add_device(setup_browser, setup_session):
    # ── Arrange ──────────────────────────────────────────────
    devices_page = DevicesPage(setup_browser)

    # ── Test Data ────────────────────────────────────────────
    device_name = "QA-Test-Device-001"
    device_type = "Standard Display"

    # ── Precondition ─────────────────────────────────────────
    devices_page.navigate_to_devices()

    # ── Act ──────────────────────────────────────────────────
    devices_page.click_add_device()
    devices_page.fill_device_name(device_name)
    devices_page.select_device_type(device_type)
    devices_page.submit_form()

    # ── Assert ───────────────────────────────────────────────
    assert devices_page.is_device_visible(device_name)

    # ── Cleanup ──────────────────────────────────────────────
    devices_page.delete_device(device_name)`,
            },
          },
          {
            title: 'Page Object Model — Python (BasePage)',
            description: 'All page classes inherit from BasePage. Locators are class-level constants imported from the module\'s locators file. Methods perform one action only.',
            codeBlock: {
              language: 'python',
              code: `from helpers.base_page import BasePage
from locators.devices_locators import DevicesLocators


class DevicesPage(BasePage):

    def navigate_to_devices(self):
        self.driver.get(f"{self.base_url}/devices")
        self.wait_for_element(DevicesLocators.DEVICES_TABLE)

    def click_add_device(self):
        self.click(DevicesLocators.ADD_DEVICE_BTN)

    def fill_device_name(self, name: str):
        self.fill(DevicesLocators.DEVICE_NAME_INPUT, name)

    def is_device_visible(self, name: str) -> bool:
        return self.is_element_present(
            f"{DevicesLocators.DEVICE_ROW}[data-name='{name}']"
        )`,
            },
          },
          {
            title: 'Page Object Model — Playwright (TypeScript)',
            description: 'Playwright page classes extend BasePage. All locators are readonly Locator properties initialized in the constructor. Methods are action-oriented and use role-based selectors first.',
            codeBlock: {
              language: 'typescript',
              code: `import { Page, Locator } from '@playwright/test';
import { BasePage } from '../helpers/base-page';

export class DevicesPage extends BasePage {
  readonly addDeviceBtn: Locator;
  readonly deviceNameInput: Locator;
  readonly devicesTable: Locator;

  constructor(page: Page) {
    super(page);
    this.addDeviceBtn    = page.getByRole('button', { name: 'Add Device' });
    this.deviceNameInput = page.getByRole('textbox', { name: 'Device Name' });
    this.devicesTable    = page.getByRole('table',  { name: 'Devices' });
  }

  async addDevice(name: string): Promise<void> {
    await this.addDeviceBtn.click();
    await this.deviceNameInput.fill(name);
    await this.page.getByRole('button', { name: 'Save' }).click();
  }
}`,
            },
          },
          {
            title: 'Playwright Selector Priority',
            description: 'Selector types must be used in strict priority order. getByRole is always the first choice. Avoid XPath entirely.',
            codeBlock: {
              language: 'typescript',
              code: `// ✅ Priority 1 — getByRole (preferred)
page.getByRole('button', { name: 'Submit' })
page.getByRole('textbox', { name: 'Email' })

// ✅ Priority 2 — getByText (for non-interactive text)
page.getByText('Welcome back')

// ✅ Priority 3 — locator() with CSS (last resort)
page.locator('[data-testid="submit-btn"]')

// ❌ Never use XPath
page.locator('//button[@class="btn-primary"]')  // Forbidden`,
            },
          },
          {
            title: 'conftest.py — pytest Fixtures',
            description: 'conftest.py provides session-scoped browser setup and role-based login fixtures. All tests declare these as parameters — never initialize WebDriver or log in manually inside test functions.',
            codeBlock: {
              language: 'python',
              code: `import pytest
from selenium import webdriver
from helpers.base_page import BasePage


@pytest.fixture(scope="session")
def setup_browser():
    options = webdriver.ChromeOptions()
    options.add_argument("--headless")
    driver = webdriver.Chrome(options=options)
    driver.maximize_window()
    yield driver
    driver.quit()


@pytest.fixture(scope="function")
def setup_session(setup_browser, role="admin"):
    page = BasePage(setup_browser)
    page.login(role)
    yield setup_browser
    page.logout()`,
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
            { cells: ['Using bare `except:` to catch all exceptions', 'Catch specific exceptions: `except TimeoutException:` or `except NoSuchElementException:`'] },
            { cells: ['Wildcard imports: `from helpers.base_page import *`', 'Always use explicit imports: `from helpers.base_page import BasePage`'] },
            { cells: ['Raw selectors in test scripts: `driver.find_element(By.CSS, ".btn")`', 'Import locators from locators/ files and access them through page object methods'] },
            { cells: ['XPath selectors in Playwright: `page.locator("//div[@class=\'panel\']")`', 'Use role-based selectors: `page.getByRole("region", { name: "Panel" })`'] },
            { cells: ['Hardcoding test data inline in test functions', 'Use test-data/ files or conftest fixtures. Keep test data separate and version-controlled'] },
            { cells: ['Skipping `git pull origin development` before branching', 'Always pull the latest development branch before creating a feature branch to avoid merge conflicts'] },
            { cells: ['No Cleanup section in tests that create data', 'Every test that creates records must clean them up in a Cleanup block — even if the assertion fails'] },
            { cells: ['Missing or outdated Ticket Information header', 'Every file must have the full header with Header, Description, Objective, NSP/NAB Link, Date, Author, Updated by, and Change log'] },
            { cells: ['Defining Playwright locators inside methods', 'Locators must be `readonly` properties initialized in the constructor — never inside action methods'] },
            { cells: ['`await page.waitForTimeout(3000)` for synchronization', 'Use `page.waitForSelector()`, `page.waitForResponse()`, or `expect(locator).toBeVisible()` instead'] },
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
