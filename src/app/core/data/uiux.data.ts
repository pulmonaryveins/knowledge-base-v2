// ── FILE: src/app/core/data/uiux.data.ts ──

import { Team } from '../models/team.model';

export const uiuxTeam: Team = {
  key: 'uiux',
  label: 'UI / UX',
  color: '#EC4899',
  gradient: 'linear-gradient(135deg, #4a0a2e, #831843)',
  icon: 'palette',
  subtitle: 'Figma · Design Tokens · Storybook 7 · WCAG 2.1',
  stats: [
    { label: 'Components', value: '120+' },
    { label: 'Projects', value: '3' },
    { label: 'Design Tokens', value: '240' },
    { label: 'WCAG Score', value: 'AA' },
  ],
  projects: [
    {
      id: 'ux-dashboard-design',
      name: 'Dashboard Design',
      description: 'Figma design system and component library for the operator dashboard.',
      status: 'Live',
      icon: 'palette',
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
      icon: 'pencil',
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
      icon: 'paintbrush',
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
  ],
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
};
