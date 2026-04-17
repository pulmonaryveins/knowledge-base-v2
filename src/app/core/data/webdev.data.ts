// ── FILE: src/app/core/data/webdev.data.ts ──

import { Team } from '../models/team.model';

export const webdevTeam: Team = {
  key: 'webdev',
  label: 'Web Development',
  color: '#F97316',
  gradient: 'linear-gradient(135deg, #3d1500, #7c2d12)',
  icon: 'globe',
  subtitle: 'Astro · Svelte · Tailwind CSS · AI-Assisted Development · Multi-framework',
  stats: [
    { label: 'Live Sites', value: '8' },
    { label: 'Projects', value: '5' },
    { label: 'Frameworks', value: '5+' },
    { label: 'AI Tools', value: '4' },
  ],
  projects: [
    {
      id: 'wd-franchisee-templates',
      name: 'Franchisee / Dealer Templates',
      description: 'Reusable Astro website templates built for franchisee and dealer clients under a unified structure.',
      status: 'Live',
      icon: 'construction',
      teamKey: 'webdev',
      teamColor: '#F97316',
      doc: {
        meta: { stack: 'Astro · Tailwind CSS · PageCMS · JSON', repo: 'nctv/franchisee-templates', deploy: 'Vercel', sprint: 'Sprint 42' },
        purpose: 'The Franchisee / Dealer Templates project builds reusable and scalable static website templates for multiple clients under a unified structure. Astro is the primary framework for performance and maintainability. Static content is managed via JSON files; dynamic content is handled through PageCMS.',
        features: [
          { title: 'Reusable Component Architecture', body: 'Each template is built from composable Astro components — Hero, Nav, Features, CTA, Footer — shared across all franchise instances with client-specific overrides.' },
          { title: 'Dual Content Strategy', body: 'Static content (copy, links, config) lives in JSON files for zero-dependency updates. Dynamic content (blog posts, promos) is managed through PageCMS and fetched at build time.' },
          { title: 'Easy Client Updates', body: 'Template structure is intentionally designed for maintainability — adding a new franchise site requires only a new JSON config and a one-command deploy, with no code duplication.' },
        ],
        folderStructure: {
          language: 'bash',
          code: `franchisee-templates/
├── src/
│   ├── components/
│   │   ├── Hero.astro
│   │   ├── Nav.astro
│   │   ├── Features.astro
│   │   ├── CTA.astro
│   │   └── Footer.astro
│   ├── layouts/
│   │   └── BaseLayout.astro
│   ├── pages/
│   │   └── index.astro
│   └── data/
│       └── site.json        # Client-specific config
├── public/
└── astro.config.mjs`,
        },
        gettingStarted: [
          { title: 'Clone & Install', description: 'Clone the template repo and install dependencies.', code: 'git clone git@github.com:nctv/franchisee-templates.git && npm i', language: 'bash' },
          { title: 'Configure Client Data', description: 'Edit the JSON config file with the client\'s content and branding.', code: '# Edit src/data/site.json\n# Set name, colors, copy, and links', language: 'bash' },
          { title: 'Start Dev Server', description: 'Launch the Astro development server.', code: 'npm run dev\n# Opens at http://localhost:4321', language: 'bash' },
          { title: 'Build for Production', description: 'Generate the static output for deployment.', code: 'npm run build\n# Output in dist/', language: 'bash' },
        ],
        contacts: [
          { name: 'Efraim Gabuat', role: 'Team Lead', initials: 'EG', color: '#F97316' },
          { name: 'Earl Vhin Gabuat', role: 'Lead Engineer', initials: 'EV', color: '#6366F1' },
        ],
        links: [
          { label: 'GitHub Repo', url: 'repo', type: 'repo' },
          { label: 'Vercel Dashboard', url: '#', type: 'deploy' },
          { label: 'PageCMS', url: '#', type: 'docs' },
        ],
      },
    },
    {
      id: 'wd-internal-dashboard',
      name: 'Internal Tools Dashboard',
      description: 'Svelte-powered internal dashboard for team tooling, workflow tracking, and automation monitoring.',
      status: 'Dev',
      icon: 'settings',
      teamKey: 'webdev',
      teamColor: '#F97316',
      doc: {
        meta: { stack: 'Svelte · SvelteKit · Tailwind CSS', repo: 'nctv/webdev-dashboard', deploy: 'Vercel', sprint: 'Sprint 41' },
        purpose: 'The Internal Tools Dashboard is built with Svelte for its performance and reactive UI model. It centralises workflow tracking, automation status monitoring, tool research notes, and project planning for the Web Dev department.',
        features: [
          { title: 'Reactive UI with Svelte', body: 'Svelte\'s compile-time reactivity eliminates virtual DOM overhead, resulting in fast, low-bundle dashboards ideal for internal tooling.' },
          { title: 'Workflow Tracker', body: 'Tracks active projects through the Analyze → Plan → Build → Test → Refine workflow stages, with per-project status and notes.' },
          { title: 'Automation Monitor', body: 'Displays status of automated build pipelines, CMS webhooks, and deployment jobs — surfacing failures before they reach production.' },
        ],
        folderStructure: {
          language: 'bash',
          code: `webdev-dashboard/
├── src/
│   ├── routes/
│   │   ├── +layout.svelte
│   │   ├── +page.svelte       # Overview
│   │   ├── projects/
│   │   └── automation/
│   ├── lib/
│   │   ├── components/
│   │   └── stores/            # Svelte writable stores
│   └── app.html
└── svelte.config.js`,
        },
        gettingStarted: [
          { title: 'Clone & Install', description: 'Clone and install dependencies.', code: 'git clone git@github.com:nctv/webdev-dashboard.git && npm i', language: 'bash' },
          { title: 'Start Dev Server', description: 'Launch SvelteKit in development mode.', code: 'npm run dev\n# Opens at http://localhost:5173', language: 'bash' },
          { title: 'Build', description: 'Build the production version.', code: 'npm run build', language: 'bash' },
        ],
        contacts: [
          { name: 'Efraim Gabuat', role: 'Team Lead', initials: 'EG', color: '#F97316' },
          { name: 'Earl Vhin Gabuat', role: 'Lead Engineer', initials: 'EV', color: '#6366F1' },
        ],
        links: [
          { label: 'GitHub Repo', url: 'repo', type: 'repo' },
          { label: 'Internal Deploy', url: '#', type: 'deploy' },
        ],
      },
    },
    {
      id: 'wd-client-websites',
      name: 'Client Website Projects',
      description: 'Complete multi-page websites and landing pages built for clients using the appropriate framework per project.',
      status: 'Live',
      icon: 'monitor',
      teamKey: 'webdev',
      teamColor: '#F97316',
      doc: {
        meta: { stack: 'Astro · Next.js · WordPress · Svelte', repo: 'nctv/client-sites', deploy: 'Vercel / WP Engine', sprint: 'Sprint 42' },
        purpose: 'The Web Dev team builds complete websites for clients — from single landing pages to full multi-page sites. The framework is selected based on project requirements: Astro for static/marketing sites, Svelte for interactive tools, Next.js for dynamic content, and WordPress for client-managed CMS needs.',
        features: [
          { title: 'Framework-appropriate Selection', body: 'Each client project uses the right tool for the job. Static service sites use Astro, interactive dashboards use Svelte, and CMS-heavy sites use WordPress — never one-size-fits-all.' },
          { title: 'AI-assisted Development', body: 'Claude Code, Codex, and Kiro are used throughout the build lifecycle to accelerate development, catch issues early, and maintain consistent code quality.' },
          { title: 'SEO-first Implementation', body: 'All client sites include structured data, Open Graph tags, XML sitemaps, semantic HTML, and Core Web Vitals optimisation from the start — not as an afterthought.' },
        ],
        folderStructure: {
          language: 'bash',
          code: `# Structure depends on framework — follow the existing project.
# General pattern across all frameworks:

<project-name>/
├── src/
│   ├── components/      # Reusable UI components
│   ├── pages/           # Route-level pages
│   ├── layouts/         # Shared page wrappers
│   └── data/            # JSON / CMS content files
├── public/              # Static assets
└── <config-file>        # astro.config / svelte.config / next.config`,
        },
        gettingStarted: [
          { title: 'Clone the Project Repo', description: 'Each client site has its own repo — clone the relevant one.', code: 'git clone git@github.com:nctv/<client-site>.git && npm i', language: 'bash' },
          { title: 'Start Dev Server', description: 'The dev command is consistent across all frameworks.', code: 'npm run dev', language: 'bash' },
          { title: 'Follow the 5-step Workflow', description: 'Analyze requirements → Plan components → Build → Test responsiveness → Refine.', code: '# See the Development Workflow section for full details', language: 'bash' },
        ],
        contacts: [
          { name: 'Efraim Gabuat', role: 'Team Lead', initials: 'EG', color: '#F97316' },
          { name: 'Earl Vhin Gabuat', role: 'Lead Engineer', initials: 'EV', color: '#6366F1' },
        ],
        links: [
          { label: 'GitHub Repo', url: 'repo', type: 'repo' },
          { label: 'Staging Deploy', url: '#', type: 'deploy' },
        ],
      },
    },
  ],
  sections: [
    {
      id: 'wd-projects',
      label: 'Projects',
      num: '01',
      content: { type: 'projects' },
    },
    {
      id: 'wd-tech-stack',
      label: 'Tech Stack Overview',
      num: '02',
      content: {
        type: 'tech-stack',
        table: {
          headers: ['Technology', 'Version', 'Purpose', 'Usage'],
          rows: [
            { cells: ['Astro', '4.x', 'Primary framework for static sites — franchisee/dealer templates and service-based marketing websites', 'Primary'] },
            { cells: ['Svelte / SvelteKit', '4.x', 'Internal tools and dashboards — performance-focused, reactive UI', 'Primary'] },
            { cells: ['Tailwind CSS', 'v3/v4', 'Utility-first CSS used across all frameworks for consistent styling', 'Primary'] },
            { cells: ['Next.js', '14.x', 'React framework for dynamic, content-heavy, or SSR-required sites', 'Flexible'] },
            { cells: ['WordPress', '6.x', 'CMS-driven sites where clients need self-service content editing', 'Flexible'] },
            { cells: ['PageCMS', 'N/A', 'Headless CMS for dynamic content in Astro-based sites', 'Flexible'] },
            { cells: ['JSON Files', 'N/A', 'Static content management for franchisee template configuration', 'Primary'] },
            { cells: ['Claude Code', 'Latest', 'AI assistant used inside the IDE for writing, refactoring, and debugging', 'AI Tool'] },
            { cells: ['Codex', 'Latest', 'AI-based code generation for boilerplate and repetitive patterns', 'AI Tool'] },
            { cells: ['Kiro', 'Latest', 'AI IDE extension for development assistance and code suggestions', 'AI Tool'] },
            { cells: ['Vercel', 'N/A', 'Primary deployment platform for Astro, Svelte, and Next.js sites', 'Deploy'] },
          ],
        },
      },
    },
    {
      id: 'wd-getting-started',
      label: 'Development Workflow',
      num: '03',
      content: {
        type: 'getting-started',
        steps: [
          {
            icon: 'scan-search',
            title: 'Step 1 — Analyze',
            description: 'Understand the requirements and study all reference materials before writing a single line of code. Identify the correct framework for the project type.',
            code: '# Questions to answer before starting:\n# - What framework fits this project? (Astro / Svelte / Next.js / WordPress)\n# - Is content static (JSON) or dynamic (PageCMS)?\n# - What are the responsiveness requirements?\n# - Are there reference designs or existing sites to study?',
            language: 'bash',
          },
          {
            icon: 'layers',
            title: 'Step 2 — Plan',
            description: 'Break the layout into components before building. Identify reusable pieces, define the folder structure following the existing project convention, and plan the page hierarchy.',
            code: '# Component planning checklist:\n# - List all unique UI components needed\n# - Identify which components are reusable across pages\n# - Sketch the folder structure: components/, pages/, layouts/, data/\n# - Plan responsiveness breakpoints: mobile / tablet / desktop',
            language: 'bash',
          },
          {
            icon: 'terminal',
            title: 'Step 3 — Build',
            description: 'Develop in order: layout shell first, then shared components, then individual pages. Use AI tools (Claude Code, Codex, Kiro) to accelerate boilerplate and catch issues early.',
            code: '# Build order:\n# 1. Base layout / shell (layout.astro or +layout.svelte)\n# 2. Shared components (Nav, Footer, Button, Card)\n# 3. Page-level composition\n# 4. Wire up content (JSON / CMS)\nnpm run dev   # Keep dev server running throughout',
            language: 'bash',
          },
          {
            icon: 'flask-conical',
            title: 'Step 4 — Test',
            description: 'Check responsiveness across all three breakpoints (mobile 375px, tablet 768px, desktop 1440px). Verify all links work, interactions are clear, and there are no console errors.',
            code: '# Testing checklist:\n# - Resize to 375px (mobile), 768px (tablet), 1440px (desktop)\n# - Open browser DevTools → check for console errors\n# - Test all navigation links and buttons\n# - Verify hover states and interactive elements\n# - Run Lighthouse for performance and SEO score',
            language: 'bash',
          },
          {
            icon: 'rocket',
            title: 'Step 5 — Refine',
            description: 'Improve code structure and UI quality. Extract repeated code into reusable components. Ensure code is clean, readable, and follows consistent patterns before submitting.',
            code: '# Refine checklist:\n# - Extract any duplicated markup into components\n# - Remove unused code and commented-out blocks\n# - Ensure consistent spacing and visual clarity\n# - Verify Definition of Done criteria are all met\nnpm run build   # Confirm production build passes with no errors',
            language: 'bash',
          },
        ],
        codeBlock: {
          language: 'bash',
          code: `# Astro project quick-start
git clone git@github.com:nctv/<project>.git
cd <project> && npm install
npm run dev   # http://localhost:4321

# Svelte / SvelteKit quick-start
git clone git@github.com:nctv/<project>.git
cd <project> && npm install
npm run dev   # http://localhost:5173`,
        },
      },
    },
    {
      id: 'wd-folder-arch',
      label: 'Folder Architecture',
      num: '04',
      content: {
        type: 'folder-arch',
        cards: [
          { title: 'No fixed structure', body: 'There is no single folder structure across all projects. Structure depends on the framework used, project type, and client requirements. Always follow the structure of the existing project you are working in.' },
          { title: 'components/', body: 'Reusable UI components shared across pages. Each component handles one UI concern. Avoid duplicating markup — if you write the same HTML twice, it belongs in a component.' },
          { title: 'pages/ or routes/', body: 'Route-level page files. In Astro these are .astro files; in SvelteKit they are +page.svelte files. Pages compose components — they do not contain raw HTML blocks.' },
          { title: 'data/ or lib/', body: 'JSON content files (for static data) and CMS client utilities (for PageCMS or other dynamic sources). All external data access lives here, keeping components and pages clean.' },
        ],
        codeBlock: {
          language: 'bash',
          code: `# Astro (franchisee templates / marketing sites)
<project>/
├── src/
│   ├── components/      # Hero.astro, Nav.astro, CTA.astro
│   ├── layouts/         # BaseLayout.astro
│   ├── pages/           # index.astro, about.astro
│   └── data/            # site.json (client config)
├── public/
└── astro.config.mjs

# Svelte / SvelteKit (internal tools / dashboards)
<project>/
├── src/
│   ├── routes/          # +layout.svelte, +page.svelte
│   ├── lib/
│   │   ├── components/  # Shared Svelte components
│   │   └── stores/      # Svelte writable stores
│   └── app.html
└── svelte.config.js

# General rule: organise components, pages, and data separately.
# Keep files clean and easy to navigate.`,
        },
      },
    },
    {
      id: 'wd-coding-patterns',
      label: 'Dev Principles & Patterns',
      num: '05',
      content: {
        type: 'coding-patterns',
        patterns: [
          {
            title: 'Recreate, Do Not Copy',
            description: 'Study reference websites to understand layout, structure, and interactions. Then rebuild using your own implementation. Never copy-paste source code from a reference site.',
            rules: [
              'Open the reference in the browser and inspect layout via DevTools — identify the grid/flex structure, spacing, and typography',
              'Close the source before opening your editor — implement from understanding, not from copying',
              'Your visual result must match the reference; your code must be entirely your own',
              'Copy-pasting source code bypasses learning and produces unmaintainable output',
            ],
          },
          {
            title: 'Component-Based Development',
            description: 'Break every UI into reusable components. If a block of markup appears more than once — or could appear on multiple pages — it belongs in a component file.',
            rules: [
              'Extract any block of markup that repeats or could be reused into a dedicated component file',
              'Type all component props via an interface Props (Astro) or $props() rune (Svelte)',
              'Each component has a single responsibility — do not bundle unrelated concerns into one file',
              'If you find yourself writing the same HTML structure twice, stop and extract it into a component',
            ],
          },
          {
            title: 'Reactive State with Svelte Stores',
            description: 'For Svelte internal tools, manage shared state with writable stores from svelte/store. Keep stores in lib/stores/ and import them into components — never manage state in page files directly.',
            rules: [
              'All shared state lives in writable stores placed in lib/stores/ — never declare reactive state in page files',
              'Access store values in templates using the $ prefix (e.g. $projects) — never call .subscribe() manually in markup',
              'All store types must be defined with a TypeScript interface in the same file as the store',
              'Use derived() from svelte/store for any value computed from another store — do not re-derive manually in components',
            ],
          },
          {
            title: 'AI-Assisted Development',
            description: 'Use Claude Code, Codex, and Kiro throughout the workflow to accelerate development. AI tools are meant to support understanding, not replace it — always review and understand generated code before committing.',
            rules: [
              'Use Claude Code (IDE) for refactoring existing components, debugging layout issues, and writing repetitive boilerplate',
              'Use Codex for generating starter component code from a description or converting designs to initial markup',
              'Use Kiro for inline suggestions while actively writing code and quick lookups without leaving the editor',
              'Review and understand every line of AI-generated code before committing — you are responsible for everything you ship',
            ],
          },
          {
            title: 'Debugging Practice',
            description: 'When layout or styling issues occur, follow a structured debugging process. Avoid rewriting entire sections — isolate the problem first.',
            rules: [
              'Open browser DevTools (F12) first — select the broken element and inspect its applied and computed styles',
              'Check the layout system on the parent element (display: flex / grid) before adjusting any child properties',
              'Fix one issue at a time — verify the change before moving on to the next',
              'Never rewrite entire sections as a debugging shortcut — always isolate the root cause first',
            ],
          },
          {
            title: 'Code Review & Deployment Checklist',
            description: 'Every task submitted for review must include a working live deploy, a clean repository, and short documentation. Never submit incomplete or untested work.',
            rules: [
              'Push to a feature branch and open a PR — never push directly to main',
              'Every task must include a live Vercel deploy URL linked in the Jira ticket before marking it done',
              'Remove all console.log statements, commented-out blocks, and unused imports before opening a PR',
              'Write a short README or PR description explaining what was built, how to run it, and any known limitations',
            ],
          },
        ],
      },
    },
    {
      id: 'wd-mistakes',
      label: 'Common Mistakes',
      num: '06',
      content: {
        type: 'mistakes',
        table: {
          headers: ['❌ Mistake', '✅ Correct Approach'],
          rows: [
            { cells: ['Copying source code from reference websites', 'Study the layout and structure, then recreate with your own implementation'] },
            { cells: ['Duplicating markup across pages instead of using components', 'Extract repeated UI into reusable components in components/'] },
            { cells: ['Building desktop-only layouts', 'Design and test at 375px (mobile), 768px (tablet), and 1440px (desktop) from the start'] },
            { cells: ['Cluttered navigation with too many items', 'Keep navigation simple, organised, and free of broken links'] },
            { cells: ['Inconsistent button styles or missing hover states', 'Use consistent component-based button styles with clear, non-misleading hover states'] },
            { cells: ['Overcrowded layouts with no breathing room', 'Maintain consistent spacing — avoid overcrowding and ensure visual clarity'] },
            { cells: ['Rewriting entire sections when debugging', 'Use DevTools to isolate the issue, check Flexbox/Grid, and fix step by step'] },
            { cells: ['Submitting without a deployed URL or repo', 'Every task must include a GitHub repo, a live Vercel deploy, and short documentation'] },
            { cells: ['Using AI output without understanding it', 'Review and understand every line of AI-generated code before committing it'] },
            { cells: ['Choosing a framework out of habit, not fit', 'Select the right tool per project: Astro for static, Svelte for reactive tools, WordPress for client CMS'] },
          ],
        },
      },
    },
    {
      id: 'wd-contacts',
      label: 'Team Contacts',
      num: '07',
      content: {
        type: 'team-contacts',
        contacts: [
          {
            name: 'Efraim Gabuat',
            role: 'Team Lead',
            initials: 'EG',
            color: '#F97316',
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
