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
    // ─────────────────────────────────────────────────────────────────────────
    // 01 · TECH STACK OVERVIEW
    // ─────────────────────────────────────────────────────────────────────────
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
            { cells: ['Allure', 'Latest', 'Test reporting — feature/story/title/description decorators on Playwright tests', 'Live'] },
          ],
        },
      },
    },

    // ─────────────────────────────────────────────────────────────────────────
    // 02 · QA BOARD STAGES
    // ─────────────────────────────────────────────────────────────────────────
    {
      id: 'qa-board-stages',
      label: 'QA Board Stages',
      num: '02',
      subHeader: 'A ticket must satisfy each column\'s pre-requisite before it can be moved in.',
      content: {
        type: 'getting-started',
        layout: 'grid',
        steps: [
          {
            icon: 'clipboard-list',
            title: 'To-dos',
            description: 'Pre-req: Done with Triage. All sprint tasks land here after triage. QAs are assigned only once triage is complete.',
          },
          {
            icon: 'pen-tool',
            title: 'In Progress',
            description: 'Pre-req: Scripting in Progress. Ticket moves here once the QA actively starts scripting the bare-bones structure.',
          },
          {
            icon: 'layers',
            title: 'Integration',
            description: 'Pre-req: Amplify link received. Scripting continues here using the provided Amplify environment link.',
          },
          {
            icon: 'scan-search',
            title: 'Ready for Execution',
            description: 'Pre-req: Blocker encountered OR ticket moved back due to concerns found on the Amplify environment.',
          },
          {
            icon: 'play-circle',
            title: 'Executing Scripts',
            description: 'Pre-req: Amplify link + integration of added workflows. QAs run automated scripts and perform manual testing for additional workflows.',
          },
          {
            icon: 'compass',
            title: 'Code Review',
            description: 'Pre-req: Manual Testing Passed + Automated Scripts Passed + Amplify Passed. Include ticket name, Jira link, Amplify link, GitHub link, and tag the reviewer.',
          },
          {
            icon: 'arrow-right-left',
            title: 'Changes Requested',
            description: 'Pre-req: Code Review Done. Reviewer has left feedback. Assignee addresses all comments while the ticket remains in this column.',
          },
          {
            icon: 'award',
            title: 'Done',
            description: 'Pre-req: Automation Script Passed + Automation Script Merged + Amplify Merged.',
          },
        ],
      },
    },

    // ─────────────────────────────────────────────────────────────────────────
    // 02 · GIT & PR WORKFLOW
    // ─────────────────────────────────────────────────────────────────────────
    {
      id: 'qa-git-workflow',
      label: 'Git & PR Workflow',
      num: '03',
      subHeader: 'Branch naming, commit format, pull request steps, and code review practices.',
      content: {
        type: 'getting-started',
        steps: [
          {
            icon: 'git-branch',
            title: 'Branch from Development',
            description: 'Always branch from the latest development. Name your branch using the Jira ticket ID so every branch can be traced back to a ticket.',
            code: 'git checkout development\ngit pull origin development\ngit checkout -b nsp-<ticket-number>/<short-description>',
            language: 'bash',
          },
          {
            icon: 'terminal',
            title: 'Commit with Ticket ID',
            description: 'Include the ticket ID in every commit message so individual commits can be traced and reverted without ambiguity. The first push sets the upstream; subsequent pushes do not need the flag.',
            code: `git commit -m "nsp-818/initial commit containing test data"
git commit -m "nsp-818/adjusted xpaths after profile page redesign"

# First push — sets upstream
git push --set-upstream origin nsp-<ticket>/<description>

# Subsequent pushes
git push origin`,
            language: 'bash',
          },
          {
            icon: 'git-pull-request',
            title: 'Open a Pull Request',
            description: 'Before raising a PR, run git status to confirm only intended files are staged. In the PR description include the ticket name, Jira link, Amplify link, and GitHub link. Tag the assigned reviewer and move the board ticket to Code Review.',
            code: 'git add <file1> <file2>   # stage only intended files\ngit commit -m "nsp-<ticket>/<description>"\ngit push origin\n\n# PR description must include:\n# Ticket name · Jira link · Amplify link · GitHub link · Reviewer tag',
            language: 'bash',
          },
          {
            icon: 'scan-search',
            title: 'Code Review',
            description: 'Announce the review in the "Automation Script Code Review" channel and self-assign on GitHub before leaving comments. Pull the branch, merge the latest development, and run the scripts locally — reading the diff alone is not sufficient.',
            code: 'git fetch origin\ngit checkout nsp-<ticket>/<description>\ngit merge origin/development\n\n# Run scripts — not just a diff review\npytest dashboard/module_suites/test_<module>.py -v',
            language: 'bash',
          },
        ],
      },
    },

    // ─────────────────────────────────────────────────────────────────────────
    // 04 · GETTING STARTED
    // ─────────────────────────────────────────────────────────────────────────
    {
      id: 'qa-getting-started',
      label: 'Getting Started',
      num: '04',
      content: {
        type: 'getting-started',
        steps: [
          {
            icon: 'clipboard-list',
            title: 'Pick a Task from the QA Board',
            description: 'Tasks are assigned from To-dos after triage. Once assigned, move the ticket to In Progress and begin scripting the bare-bones structure. Follow the board stages — To-dos → In Progress → Integration → Executing Scripts → Code Review → Done.',
          },
          {
            icon: 'git-branch',
            title: 'Branch from Development',
            description: 'Always create your branch from the latest development branch. Include the Jira ticket ID in the branch name.',
            code: 'git checkout development\ngit pull origin development\ngit checkout -b nsp-<ticket-number>/<short-description>',
            language: 'bash',
          },
          {
            icon: 'pen-tool',
            title: 'Write Tests Using POM',
            description: 'For Python: create or update a page class in the module\'s scripts folder. For Playwright: create a page class under pages/<feature>/. Every test file must start with the Ticket Information header and follow the Arrange / Act / Assert structure.',
            code: '# Python — create a page class\nfrom helpers.base_page import BasePage\nfrom locators.devices_locators import DevicesLocators\n\nclass DevicesPage(BasePage):\n    def click_add_device(self):\n        self.click(DevicesLocators.ADD_DEVICE_BTN)',
            language: 'python',
          },
          {
            icon: 'terminal',
            title: 'Run Linting Before Committing',
            description: 'Python files must pass flake8 with max-line-length=100. Playwright TypeScript files must pass ESLint. Run these locally before every push to avoid CI failures.',
            code: '# Python linting\nflake8 . --max-line-length=100\n\n# Playwright\nnpx eslint tests/ pages/',
            language: 'bash',
          },
          {
            icon: 'git-pull-request',
            title: 'Open a Pull Request',
            description: 'Create a PR targeting development. Include the ticket name, Jira link, Amplify link, and GitHub link in the PR description. Tag the assigned reviewer. Move the board ticket to Code Review.',
            code: 'gh pr create --base development \\\n  --title "nsp-<ticket>: <description>" \\\n  --body "Jira: ... | Amplify: ... | Reviewer: @<handle>"',
            language: 'bash',
          },
        ],
        codeBlock: {
          language: 'bash',
          code: `# Run a single test module (Python)
pytest dashboard/module_suites/test_devices.py -v

# Run only smoke tests
pytest -m smoke

# Run Playwright tests for a specific feature
npx playwright test tests/devices/

# Run Playwright with headed browser (debugging)
npx playwright test --headed

# Check Python linting before push
flake8 . --max-line-length=100`,
        },
      },
    },

    // ─────────────────────────────────────────────────────────────────────────
    // 04 · FOLDER ARCHITECTURE
    // ─────────────────────────────────────────────────────────────────────────
    {
      id: 'qa-folder-arch',
      label: 'Folder Architecture',
      num: '05',
      content: {
        type: 'folder-arch',
        cards: [
          {
            title: 'dashboard/<module>/tests/module_scripts/',
            body: 'Page action files for a specific dashboard module (e.g., license_page_actions.py). One class/function file per module. Scripts are imported by the module_suites runners — never executed directly.',
          },
          {
            title: 'dashboard/<module>/tests/module_suites/',
            body: 'Test suite files (e.g., test_single_license.py). Each file corresponds to one test case. Suite files call only modularized page action functions — no raw WebDriver calls here.',
          },
          {
            title: 'helpers/ (Python)',
            body: 'BasePage, BasePlayer, and BaseApi base classes. All page objects extend BasePage. Player tests use BasePlayer for SSH + Flask + Selenium. API tests use BaseApi for HTTP session management. Shared conftest.py fixtures (setup_browser, setup_session) live alongside these — no manual browser init inside test files.',
          },
          {
            title: 'locators/',
            body: 'One locator file per module (e.g., license_xpath.py). Stores XPath and CSS selectors as constants. Test data and assertion text do not belong here — constants only.',
          },
          {
            title: 'dashboard/<module>/<module>_data.py',
            body: 'Test data for the module stored as dictionaries. Static and dynamic test values are defined here. Never hardcode data inline inside test functions.',
          },
          {
            title: 'pages/<feature>/ (Playwright)',
            body: 'TypeScript POM class per feature (e.g., host_installation.ts). All locators are readonly Locator properties initialized in the constructor. Grouped by type: buttons, inputs, indicators.',
          },
          {
            title: 'tests/<feature>/ (Playwright)',
            body: 'Test spec files and ticket-specific scripts (tests/<feature>/ticket-scripts/). Test files only call POM methods — no direct Playwright API calls or raw locators in test files.',
          },
          {
            title: 'test-data/ (Playwright)',
            body: 'Feature test data as typed TypeScript interfaces (e.g., host-installation-data.ts). Exported from a central index.ts. Always import from here — never hardcode data in spec files.',
          },
        ],
        codeBlock: {
          language: 'bash',
          code: `# Python (Selenium) structure
qa-automation-nctv-dashboardv1/
├── dashboard/
│   └── licenses/
│       ├── tests/
│       │   ├── module_scripts/
│       │   │   └── license_page_actions.py
│       │   ├── module_suites/
│       │   │   └── test_single_license.py
│       │   └── license_data.py
├── helpers/
│   ├── base_page.py
│   ├── base_player.py
│   └── base_api.py
├── locators/
│   └── license_xpath.py
└── conftest.py

# Playwright (TypeScript) structure
project-root/
├── tests/
│   └── <feature>/
│       ├── <feature>.spec.ts
│       ├── helper_functions.ts
│       └── ticket-scripts/
│           └── test-<ticket>.spec.ts
├── pages/
│   ├── <feature>/
│   │   └── <feature>.ts
│   └── base-page/
│       └── base-page.ts
├── helpers/
│   └── login_parametrization.ts
├── test-data/
│   ├── <feature>-data.ts
│   └── index.ts
└── config/
    └── environment.ts`,
        },
      },
    },

    // ─────────────────────────────────────────────────────────────────────────
    // 05 · PYTHON SCRIPTING STANDARDS
    // ─────────────────────────────────────────────────────────────────────────
    {
      id: 'qa-python-standards',
      label: 'Python Scripting Standards',
      num: '06',
      content: {
        type: 'coding-patterns',
        layout: 'stack',
        patterns: [
          {
            title: 'Ticket Information Header',
            description: 'Every test file must open with a structured docstring. The Change log is only updated once per PR merged to development — not per commit. Remarks must be specific enough to give context without reading the diff.',
            codeBlock: {
              language: 'python',
              code: `"""
===========================================================================
  NSP-818: [Profile] Hide Payment-related tabs in the Profile Settings
===========================================================================

📋 Description:
This script verifies that the Payment-related tabs in the Dealer's
Profile Settings are hidden.

🎯 Objective:
Ensure the following tabs are hidden: Billing, Payment, Transactions,
Orders, and Activity.
Ensure the following tabs are still visible: Profile and Security.

🔗 NSP Link : https://n-compass.atlassian.net/jira/.../NSP-818
🔗 NAB Link : https://n-compass.atlassian.net/browse/NAB-54
📅 Date     : February 6, 2025
👤 Author   : Shawn Leif Resentes
📝 Updated by:
📋 Change log:
   - 2/11/2024 Adjusted xpaths used in the Profile page (elements updated)
"""`,
            },
          },
          {
            title: 'Test Arrangements — Arrange / Act / Assert',
            description: 'Every test function must follow this six-section structure. Cleanup is required for any test that creates persistent data to prevent environment bloat.',
            codeBlock: {
              language: 'python',
              code: `def test_add_device(setup_browser, setup_session):
    # ── Arrange ──────────────────────────────────────────────────────────
    devices_page = DevicesPage(setup_browser)

    # ── Test Data ────────────────────────────────────────────────────────
    test_data = {
        "device_name": "QA-Test-Device-001",
        "device_type": "Standard Display",
    }

    # ── Precondition ─────────────────────────────────────────────────────
    # Navigate to Devices section before the main test action.
    devices_page.navigate_to_devices()

    # ── Act ──────────────────────────────────────────────────────────────
    devices_page.click_add_device()
    devices_page.fill_device_name(test_data["device_name"])
    devices_page.select_device_type(test_data["device_type"])
    devices_page.submit_form()

    # ── Assert ───────────────────────────────────────────────────────────
    assert devices_page.is_device_visible(test_data["device_name"]), \
        f"Device '{test_data['device_name']}' not found after creation"

    # ── Cleanup ──────────────────────────────────────────────────────────
    devices_page.delete_device(test_data["device_name"])`,
            },
          },
          {
            title: 'Page Object Model — BasePage & Page Actions',
            description: 'All page classes extend BasePage. Locators are imported from the module\'s locators file. When a form has more than 3 fields, use a mapping dictionary instead of individual calls. Initialize dynamic test data in a dedicated function, not in the test body.',
            codeBlock: {
              language: 'python',
              code: `from helpers.base_page import BasePage
from locators.devices_locators import DevicesLocators


class DevicesPage(BasePage):

    def navigate_to_devices(self):
        self.driver.get(f"{self.base_url}/devices")
        self.wait_for_element(DevicesLocators.DEVICES_TABLE)

    def fill_form(self, form_data: dict):
        # Use mapping dict when there are more than 3 field elements.
        field_map = {
            "device_name": DevicesLocators.DEVICE_NAME_INPUT,
            "device_type": DevicesLocators.DEVICE_TYPE_SELECT,
            "location":    DevicesLocators.LOCATION_INPUT,
            "zone":        DevicesLocators.ZONE_INPUT,
        }
        for key, locator in field_map.items():
            self.enter_text(locator, form_data[key])

    def is_device_visible(self, name: str) -> bool:
        return self.is_element_present(
            DevicesLocators.DEVICE_ROW.format(name=name)
        )`,
            },
          },
          {
            title: 'conftest.py — pytest Fixtures',
            description: 'conftest.py manages all shared fixtures. setup_browser initializes WebDriver; setup_session logs in the appropriate role and navigates to the target page. Never initialize WebDriver or authenticate manually inside a test function.',
            codeBlock: {
              language: 'python',
              code: `import pytest
from selenium import webdriver
from helpers.base_page import BasePage


@pytest.fixture(scope="session")
def setup_browser():
    """Initialize WebDriver with environment settings."""
    options = webdriver.ChromeOptions()
    if os.getenv("HEADLESS_MODE", "false").lower() == "true":
        options.add_argument("--headless")
    driver = webdriver.Chrome(options=options)
    driver.maximize_window()
    yield driver
    driver.quit()


@pytest.fixture(scope="function")
def setup_session(setup_browser, request):
    """Authenticate as the specified role and navigate to the target page."""
    role = request.param if hasattr(request, "param") else "admin"
    page = BasePage(setup_browser)
    page.login(role)
    yield setup_browser
    page.logout()`,
            },
          },
          {
            title: 'Locators File Convention',
            description: 'Each module has its own locators file containing only XPath or CSS selectors as constants. No assertion text, test data, or logic belongs here.',
            codeBlock: {
              language: 'python',
              code: `# locators/license_xpath.py
LICENSE_SEARCH_BAR = (By.ID, "search")
LICENSE_KEY_LINK   = (By.XPATH, "//a[text()='{key}']")
LICENSE_ROW        = (By.CLASS_NAME, "license-row")`,
            },
            rules: [
              'Selector priority: `By.ID` or `By.NAME` first (unique and resilient), then attribute-based XPath, then `By.CLASS_NAME`, then positional XPath as a last resort.',
              'Never place assertion text, test data, or logic inside a locators file — constants only.',
              'Avoid deeply nested or positional XPath like `//div[@class=\'panel\']//button[2]` — it breaks on any markup change.',
              'One locators file per module, named after the module: `license_xpath.py`, `devices_locators.py`.',
            ],
          },
          {
            title: 'Python Control Flow & Exception Handling',
            description: 'Use elif instead of nested else-if chains. Prefer direct iteration over range(len()). Catch specific exceptions — never use a bare except. Keep try blocks minimal.',
            codeBlock: {
              language: 'python',
              code: `# ✅ Good — elif chain, direct iteration, specific exception
if user.is_active:
    send_email(user)
elif user.is_pending:
    notify_pending(user)
else:
    deactivate_user(user)

for i, user in enumerate(user_list):
    print(f"{i}: {user.name}")

try:
    value = int(user_input)
except ValueError:
    print("Invalid input")

# ❌ Bad — bare except, range(len()), nested else-if
try:
    value = int(user_input)
    some_other_code()
except:                          # catches everything, hides bugs
    print("Something went wrong")

for i in range(len(user_list)):  # unnecessary index
    print(user_list[i].name)`,
            },
          },
          {
            title: 'flake8 Linting Standards',
            description: 'CI enforces flake8 with a 100-character line limit. Create a .flake8 config at the project root. Run flake8 locally before every push. Wildcard imports and bare excepts are hard failures.',
            codeBlock: {
              language: 'ini',
              code: `# .flake8 — place at project root
[flake8]
max-line-length = 100
ignore = E203, W503
exclude =
    .venv,
    __pycache__`,
            },
            rules: [
              'No trailing whitespace on any line.',
              'No redefinition or shadowing of imported names.',
              'Remove all unused imports before committing.',
              'Every file must end with a newline.',
              'Max line length: 100 characters.',
              'Use f-strings only when string formatting is actually needed.',
              'Use lambdas only for simple single-expression one-liners.',
              'Wildcard imports (`from module import *`) are a hard failure.',
              'Bare `except:` statements are a hard failure — always catch a specific exception.',
              '`###` comment style is not allowed — use `#` for inline comments or `"""` docstrings.',
              'Run `flake8 .` locally before every push.',
            ],
          },
          {
            title: 'pytest Marker Standards',
            description: 'Tests are tagged with custom markers defined in pytest.ini. Use @pytest.mark.smoke for critical-path tests, @pytest.mark.regression for coverage tests, and @pytest.mark.slow for tests that are known to take longer.',
            codeBlock: {
              language: 'python',
              code: `# pytest.ini
[pytest]
markers =
    smoke: marks tests as smoke tests (critical-path functionality)
    regression: marks tests as regression tests (check for bugs in existing features)
    slow: marks tests that are slow to run

# Usage in test files
@pytest.mark.smoke
@pytest.mark.parametrize("setup_session", ["admin"], indirect=True)
def test_login_smoke(setup_session):
    driver = setup_session
    assert "Dashboard" in driver.title

# Running by marker
# pytest -m smoke
# pytest -m regression
# pytest -m "regression and not smoke"`,
            },
          },
        ],
      },
    },

    // ─────────────────────────────────────────────────────────────────────────
    // 06 · PLAYWRIGHT SCRIPTING STANDARDS
    // ─────────────────────────────────────────────────────────────────────────
    {
      id: 'qa-playwright-standards',
      label: 'Playwright Scripting Standards',
      num: '07',
      content: {
        type: 'coding-patterns',
        layout: 'stack',
        patterns: [
          {
            title: 'POM Class Structure & Naming',
            description: 'Classes are named after the page or feature they encapsulate. Use "Workflow" as a suffix for multi-step processes. All locators are readonly Locator properties grouped by type (buttons, inputs, indicators) and initialized in the constructor.',
            codeBlock: {
              language: 'typescript',
              code: `import { Page, Locator } from '@playwright/test';
import { BasePage } from '../base-page/base-page';

// ✅ Correct — descriptive, feature-specific name
export class HostInstallationWorkflow extends BasePage {

  // ── Buttons ─────────────────────────────────────────────────────────
  readonly addHostPlaceButton: Locator;
  readonly continueButton:     Locator;
  readonly nextButton:         Locator;
  readonly generateButton:     Locator;

  // ── Inputs ──────────────────────────────────────────────────────────
  readonly dealerNameInput:        Locator;
  readonly searchHostPlaceInput:   Locator;
  readonly generateLicenseInput:   Locator;

  // ── Indicators ──────────────────────────────────────────────────────
  readonly savedToDraftIndicator:            Locator;
  readonly loadingLocationDetailsIndicator:  Locator;

  constructor(page: Page) {
    super(page);
    this.addHostPlaceButton  = page.getByRole('button',  { name: 'Add Host Place' });
    this.continueButton      = page.getByRole('button',  { name: 'Continue' });
    this.nextButton          = page.getByRole('button',  { name: 'Next' });
    this.generateButton      = page.getByRole('button',  { name: 'Generate' });
    this.dealerNameInput     = page.getByRole('textbox', { name: 'Dealer Name' });
    this.searchHostPlaceInput = page.getByRole('textbox', { name: 'Search Host Place' });
    this.generateLicenseInput = page.getByPlaceholder('Generate License (1-50)');
    this.savedToDraftIndicator           = page.getByText('Saved to draft!');
    this.loadingLocationDetailsIndicator = page.getByText('Loading location details');
  }
}

// ❌ Incorrect — too generic, unclear purpose
// export class HostForm extends BasePage {}
// export class WorkflowPage extends BasePage {}`,
            },
          },
          {
            title: 'Locator Naming Convention & Selector Priority',
            description: 'Locator names follow the pattern `[adjective]PurposeElementType`. Selector types must be used in strict priority order — role-based selectors are most resilient to UI changes; XPath must be avoided.',
            rules: [
              'Pattern: `[adjective] + Purpose + ElementType` — adjective is optional and describes state (inactive, empty, loading, saved).',
              'Examples: `addHostPlaceButton`, `dealerNameInput`, `savedToDraftIndicator`, `emptyLicenseDropdown`.',
              'Never use vague names like `btn`, `input1`, or `addButton` — always specify which button or input.',
              'Selector priority 1 — `getByRole()`: use for interactive elements (buttons, inputs, checkboxes). Most resilient to UI changes.',
              'Selector priority 2 — `getByText()`: use for status messages and static visible text.',
              'Selector priority 3 — `getByLabel()`: use when an aria-label is present but role alone is insufficient.',
              'Selector priority 4 — `locator(CSS)`: use for containers and complex elements with no accessible role.',
              'Never use XPath selectors — they are the hardest to maintain and first to break after markup changes.',
            ],
          },
          {
            title: 'Method Organization & Signatures',
            description: 'Group methods by workflow step and order them by execution sequence. Type all parameters explicitly and use Pick<> to specify only the fields a method needs. Never pass an entire data object when only a few fields are used.',
            codeBlock: {
              language: 'typescript',
              code: `export class HostInstallationWorkflow extends BasePage {

  // STEP 1: Host Place Selection & Creation ─────────────────────────────
  async newHostInstallationRedirection(): Promise<void> { /* ... */ }
  async createPageInstance(): Promise<Page> { /* ... */ }

  type hostData = Pick<hostInstallationDataTypes,
    'dealerName' | 'hostPlace' | 'generateButtonText'
  >

  async step1CreateHost(page: Page, hostDataTypes: hostData): Promise<void> {
    // STEP 1.1 Search Host Place
    await super.enter(this.dealerNameInput, hostDataTypes.dealerName)
    await super.expectIsVisible(this.savedToDraftIndicator)
    await super.enter(this.searchHostPlaceInput, hostDataTypes.hostPlace)
    await super.selectFromDropdown(this.searchResultItem)
    await super.waitForInvisibility(this.loadingLocationDetailsIndicator)
    await super.click(this.nextButton)

    // STEP 1.2 Create Host Place
    await super.expectToBeHidden(this.inactiveStepper)
    await this.selectLicenses(page, hostDataTypes.generateButtonText)
    await this.verifyPageValidations(page)
  }

  // STEP 2: Screen & Playlist Creation ─────────────────────────────────
  async step2CreateScreen(page: Page, screenData: screenData): Promise<void> { /* ... */ }

  // Private helpers ─────────────────────────────────────────────────────
  private async selectLicenses(page: Page, testData: string): Promise<void> { /* ... */ }
}

// ❌ Incorrect — untyped parameters, entire object passed unnecessarily
// async step1CreateHost(page, hostDataTypes) {}
// async step1CreateHost(page: Page, config: hostInstallationDataTypes) {}`,
            },
          },
          {
            title: 'Test File Structure',
            description: 'Use test.describe() with a [FeatureName] prefix for quick filtering. Always use the testLoginAccount() helper instead of test() for authenticated flows. Specify roles as the third parameter. Remove .only() before committing.',
            codeBlock: {
              language: 'typescript',
              code: `import { test, expect } from '@playwright/test';
import { testLoginAccount } from '@helpers/login_parametrization';
import { hostInstallationData } from '../../test-data/host-installation-data';
import { HostInstallationWorkflow } from '../../pages/host-page/host_installation';

// ✅ Correct — [Feature] prefix, descriptive name
test.describe('[Host] Host Installation Form Workflow', () => {

  testLoginAccount('Successfully completes host installation workflow',
    async (page, role) => {

      // Step 1 — Instantiate POM
      const workflow = new HostInstallationWorkflow(page)

      // Step 2 — Navigate to feature
      await workflow.newHostInstallationRedirection()

      // Step 3 — Handle popup (opens in new tab)
      const hostFormPageInstance = await workflow.createPageInstance()
      const hostForm = new HostInstallationWorkflow(hostFormPageInstance)

      // Step 4 — Execute workflow steps sequentially
      await hostForm.step1CreateHost(page, {
        dealerName:          hostInstallationData.host.dealerName,
        hostPlace:           hostInstallationData.host.hostPlace,
        generateButtonText:  hostInstallationData.host.generateButtonText,
      })

      // Step 5 — Verify / assert after key steps
      await hostForm.storeDataforAssertion()

      // Step 6 — Continue to next step
      await hostForm.step2CreateScreen(page, {
        screenName:        hostInstallationData.screen.name,
        screenDescription: hostInstallationData.screen.description,
        AdScreenType:      hostInstallationData.screen.ad,
        playlistName:      hostInstallationData.screen.playlistName,
        playlistDesc:      hostInstallationData.screen.description,
      })

    }, ['admin'])   // Roles: 'admin' | 'dealer-admin' | 'dealer'
})

// ❌ Incorrect — no describe block, generic title, no role
// test('Successfully workflow', async ({ page, role }) => {})
// test.describe('Tests', () => {})`,
            },
          },
          {
            title: 'Data Management — Types & Test Data Files',
            description: 'Define a comprehensive TypeScript interface for each feature. Use Pick<> in method signatures to declare which fields are consumed. Export all data from a central index.ts. Never hardcode data inside spec files.',
            codeBlock: {
              language: 'typescript',
              code: `// test-data/host-installation-data.ts
export interface hostInstallationDataTypes {
  dealerName:        string;
  hostPlace:         string;
  generateButtonText: string;
  screenName:        string;
  screenDescription: string;
  AdScreenType:      string;
  playlistName:      string;
  playlistDesc:      string;
}

export const hostInstallationData: hostInstallationDataTypes = {
  host: {
    dealerName:          'Test Dealer Name',
    hostPlace:           'Test Location',
    generateButtonText:  'Generate',
  },
  screen: {
    name:        'Test Screen',
    description: 'Screen Description',
    ad:          'Ad Screen Type',
    playlistName: 'Test Playlist',
  },
}

// test-data/index.ts — central export
export { hostInstallationData, HostInstallationDataTypes } from './host-installation-data';

// ❌ Hardcoded data in spec file — never do this
// await hostForm.step1CreateHost(page, {
//   dealerName: 'Hardcoded Name',
//   hostPlace:  'Hardcoded Place',
// })`,
            },
          },
          {
            title: 'Popup & Modal Handling',
            description: 'Use the BasePage handlePopup() helper for new-tab/popup flows. Create a separate POM instance for the popup page. For in-page modals, trigger the action, fill the form, then submit — the modal auto-closes after submission.',
            codeBlock: {
              language: 'typescript',
              code: `// ── Popup window (new tab) ───────────────────────────────────────────────
async createPageInstance(): Promise<Page> {
  // handlePopup triggers the click and captures the popup page
  const hostFormPageInstance = await super.handlePopup(this.page, async () => {
    await super.click(this.continueButton)
  })
  return hostFormPageInstance
}

// Usage in test
const hostFormPageInstance = await workflow.createPageInstance()
const hostForm = new HostInstallationWorkflow(hostFormPageInstance)

// ── In-page modal ─────────────────────────────────────────────────────────
async step2AssignPlaylist(zones: number, hostDataTypes: screenData): Promise<void> {
  for (let i = 0; i < zones; i++) {
    if (i === 0) {
      // Step 1: trigger modal
      await super.click(this.zoneListItem.nth(i))
      await super.click(this.createNewPlaylistBtn)
      // Step 2: fill modal form
      await super.enter(this.playlistNameInput, hostDataTypes.playlistName)
      await super.enter(this.playlistDescInput, hostDataTypes.playlistDesc)
      // Step 3: submit — modal auto-closes
      await super.click(this.createPlaylistBtn)
    } else {
      await super.click(this.zoneList)
      await super.isVisible(this.zoneListItem.nth(i))
      await super.click(this.selectPlaylist)
    }
  }
}`,
            },
          },
        ],
      },
    },

    // ─────────────────────────────────────────────────────────────────────────
    // 07 · PLAYER TESTING
    // ─────────────────────────────────────────────────────────────────────────
    {
      id: 'qa-player-testing',
      label: 'Player Testing',
      num: '08',
      content: {
        type: 'coding-patterns',
        layout: 'stack',
        patterns: [
          {
            title: 'Overview — PC → Pi Test Pipeline',
            description: 'Player testing follows a four-stage pipeline: the PC runs API regression scripts to validate data consistency, then deploys scripts to each Raspberry Pi device over SSH. The Pi executes the regression suite via Flask, then sends results back to the PC.',
            rules: [
              '[PC] Step 1 — Run API Regression Scripts. Compares Dashboard vs Player API endpoints and generates a timestamped test data file: `mm-dd_hh:mm_test_data.json`.',
              '[PC] Step 2 — Run Player Deployment & Test Scripts. Reads IP addresses from `local_players.txt`. For each Pi: opens SSH, transfers files, installs requirements, and triggers test execution.',
              '[Pi] Step 3 — Execute Player Regression Suite. Starts the Flask server, invokes Flask API endpoints, runs Player Regression test cases, and launches Selenium Chromium for browser-based tests.',
              '[Pi] Step 4 — Generate Test Results. Writes results to `pi_{pi_name}_results.json`. Short-term: SSH results back to the local PC for processing. Long-term: automatic upload to cloud storage.',
            ],
          },
          {
            title: 'Step 1 — API Regression Scripts (PC)',
            description: 'The API regression script compares data between the Dashboard API and the Player API endpoints. A fail-fast mechanism skips Player Regression tests when the piDownloader step encounters an error — avoiding false failures caused by a known upstream issue.',
            codeBlock: {
              language: 'python',
              code: `# helpers/base_api.py (simplified)
import requests
import json
from datetime import datetime


class BaseApi:

    def compare_dashboard_and_player(self, dashboard_url: str, player_url: str) -> dict:
        """Compare API responses between Dashboard and Player endpoints."""
        dashboard_data = self._fetch(dashboard_url)
        player_data    = self._fetch(player_url)
        return self._diff(dashboard_data, player_data)

    def save_test_data(self, data: dict) -> str:
        """Persist processed test data with a timestamp filename."""
        filename = datetime.now().strftime("%m-%d_%H:%M_test_data.json")
        with open(filename, "w") as f:
            json.dump(data, f, indent=2)
        return filename

    def _fetch(self, url: str) -> dict:
        response = requests.get(url)
        response.raise_for_status()
        return response.json()`,
            },
          },
          {
            title: 'Step 2 — Player Deployment Script (PC)',
            description: 'The deployment script reads IP addresses from local_players.txt and, for each Pi, opens an SSH connection, transfers the test files, installs dependencies, and triggers remote execution.',
            codeBlock: {
              language: 'python',
              code: `import paramiko
import os


def deploy_and_run(ip: str, test_data_file: str):
    """Transfer files and trigger player testing on a single Pi device."""
    ssh = paramiko.SSHClient()
    ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    ssh.connect(ip, username="pi", password=os.getenv("PI_PASSWORD"))

    sftp = ssh.open_sftp()
    sftp.put(test_data_file, f"/home/pi/player_tests/{test_data_file}")
    sftp.put("requirements.txt", "/home/pi/player_tests/requirements.txt")
    sftp.close()

    # Install dependencies and trigger test suite
    ssh.exec_command("pip install -r /home/pi/player_tests/requirements.txt")
    ssh.exec_command("python /home/pi/player_tests/run_player_tests.py")
    ssh.close()


with open("local_players.txt") as f:
    for ip in f.read().splitlines():
        deploy_and_run(ip.strip(), "test_data.json")`,
            },
          },
          {
            title: 'Step 3 & 4 — Player Regression Suite & Results (Pi)',
            description: 'On the Pi, a Flask server receives test commands and orchestrates the regression suite. After completion, results are written to a JSON file and returned to the PC over SSH.',
            codeBlock: {
              language: 'python',
              code: `# run_player_tests.py (executes on the Pi)
from flask import Flask, jsonify
import subprocess
import json

app = Flask(__name__)


@app.route("/run-regression", methods=["POST"])
def run_regression():
    """Invoke the Player Regression Suite and return results."""
    result = subprocess.run(
        ["pytest", "player_regression/", "--json-report",
         f"--json-report-file=pi_{get_pi_name()}_results.json"],
        capture_output=True,
        text=True,
    )
    return jsonify({
        "status": "passed" if result.returncode == 0 else "failed",
        "output": result.stdout,
    })


def get_pi_name() -> str:
    with open("/etc/hostname") as f:
        return f.read().strip()


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)`,
            },
          },
        ],
      },
    },

    // ─────────────────────────────────────────────────────────────────────────
    // 08 · COMMON MISTAKES
    // ─────────────────────────────────────────────────────────────────────────
    {
      id: 'qa-mistakes',
      label: 'Common Mistakes',
      num: '09',
      content: {
        type: 'mistakes',
        table: {
          headers: ['❌ Mistake', '✅ Correct Approach'],
          rows: [
            { cells: ['Using bare `except:` to catch all exceptions', 'Catch specific exceptions: `except TimeoutException:` or `except NoSuchElementException:`'] },
            { cells: ['Wildcard imports: `from helpers.base_page import *`', 'Always use explicit imports: `from helpers.base_page import BasePage`'] },
            { cells: ['Raw selectors in test scripts: `driver.find_element(By.CSS, ".btn")`', 'Import locators from locators/ and access them only through page object methods'] },
            { cells: ['XPath selectors in Playwright: `page.locator("//div[@class=\'panel\']")`', 'Use role-based selectors: `page.getByRole("region", { name: "Panel" })`'] },
            { cells: ['Hardcoding test data inline: `dealerName: "Test Dealer"`', 'Store in test-data/ (Playwright) or module_data.py (Python) — never inline in test files'] },
            { cells: ['Skipping `git pull origin development` before branching', 'Always pull the latest development branch before creating a feature branch to avoid conflicts'] },
            { cells: ['No Cleanup section in tests that create data', 'Every test that creates records must clean them up — even if the assertion fails'] },
            { cells: ['Missing or incomplete Ticket Information header', 'Every Python file must have the full header: Header, Description, Objective, NSP/NAB Link, Date, Author, Updated by, Change log'] },
            { cells: ['Defining Playwright locators inside methods', 'Locators must be `readonly` properties initialized in the constructor — never inside action methods'] },
            { cells: ['`await page.waitForTimeout(3000)` for synchronization', 'Use `page.waitForSelector()`, `expect(locator).toBeVisible()`, or conditional waits instead'] },
            { cells: ['Using `import *` (wildcard) in Playwright TypeScript files', 'Use named imports: `import { format_xpath, dealer_name, reset_errors } from "..."`'] },
            { cells: ['Defining form fields individually when there are 4+ fields', 'Use a mapping dictionary to iterate and fill fields — reduces duplication and improves readability'] },
            { cells: ['Leaving `.only()` on a test before committing (Playwright)', 'Always remove `.only()` — it silently skips all other tests in the suite during CI runs'] },
            { cells: ['Updating the Change log on every commit', 'The Change log is only updated once per PR merged to development — not per commit'] },
          ],
        },
      },
    },

    // ─────────────────────────────────────────────────────────────────────────
    // 09 · TEAM CONTACTS
    // ─────────────────────────────────────────────────────────────────────────
    {
      id: 'qa-contacts',
      label: 'Team Contacts',
      num: '10',
      content: {
        type: 'team-contacts',
        contacts: [
          {
            name: 'Shawn Leif Resentes',
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
