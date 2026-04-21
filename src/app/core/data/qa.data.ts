// ── FILE: src/app/core/data/qa.data.ts ──

import { Team } from '../models/team.model';

export const qaTeam: Team = {
  key: 'qa',
  label: 'Quality Assurance',
  color: '#0891B2',
  gradient: 'linear-gradient(135deg, #042f3d, #0c4a6e)',
  icon: 'test-tube',
  subtitle: 'Python · Playwright · Selenium · Page Object Model · pytest · flake8',
  description: 'Automation frameworks, Selenium and Playwright test suites, Page Object Model conventions, and QA workflow standards.',
  projects: [],
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
      id: 'qa-contacts',
      label: 'Team Contacts',
      num: '06',
      content: {
        type: 'team-contacts',
        contacts: [
          {
            name: 'Shawn Leif Recentes',
            role: 'Team Lead',
            initials: 'SL',
            color: '#0891B2',
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
