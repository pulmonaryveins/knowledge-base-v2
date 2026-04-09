// ── FILE: src/app/core/data/uiux.data.ts ──

import { Team } from '../models/team.model';

export const uiuxTeam: Team = {
  key: 'uiux',
  label: 'UI / UX',
  color: '#EC4899',
  gradient: 'linear-gradient(135deg, #4a0a2e, #831843)',
  icon: 'palette',
  subtitle: 'Figma · WCAG 2.1 · Design Tokens · Storybook 7 · Maze',
  stats: [
    { label: 'Components', value: '120+' },
    { label: 'Projects', value: '3' },
    { label: 'Training Phases', value: '7' },
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
            { cells: ['Figma', 'Enterprise', 'Primary design, prototyping, and handoff tool for all teams', 'Live'] },
            { cells: ['FigJam', 'Enterprise', 'Collaborative whiteboarding for user research, flows, and workshops', 'Live'] },
            { cells: ['Sketch', '100+', 'Alternative wireframing and component design (legacy projects)', 'Live'] },
            { cells: ['Adobe XD', 'Latest', 'Cross-platform prototyping and handoff for select workflows', 'Live'] },
            { cells: ['Framer', 'Latest', 'High-fidelity interactive prototyping with code components', 'Dev'] },
            { cells: ['Storybook', '7.x', 'Component documentation and visual regression testing', 'Live'] },
            { cells: ['Style Dictionary', '3.x', 'Transforms design tokens into CSS, SCSS, and JSON outputs', 'Live'] },
            { cells: ['Chromatic', '11.x', 'Automated visual regression on Storybook stories per PR', 'Live'] },
            { cells: ['Maze', '2.x', 'Remote usability testing, heatmaps, and task completion metrics', 'Live'] },
            { cells: ['UserTesting', '3.x', 'Moderated and unmoderated user research sessions', 'Live'] },
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
          {
            title: 'Phase 1 — Introduction to UI/UX & User Research',
            description: 'Familiarise yourself with the company, teams, and tools. Understand the difference between UI and UX, the importance of user-centered design, and core research methods (surveys, interviews, usability testing). Create user personas and conduct a mini research project. Duration: 4–6 hours.',
            code: `# Key activities\n# · Watch: "What is UI UX?" — Simplilearn (YouTube)\n# · Overview of NCompassTV teams and design tools\n# · Conduct a mini user research project\n# · Deliver: user personas document`,
            language: 'bash',
          },
          {
            title: 'Phase 2 — Information Architecture & Wire-framing',
            description: 'Learn the importance of structure and navigation, create sitemaps and user flows, and get hands-on with wireframing tools (Figma, Sketch, Adobe XD, Framer). Build wireframes for 1–3 mobile app screens. Duration: 8 hours.',
            code: `# Key activities\n# · Read: Information Architecture — Wireframes & Prototype article\n# · Deliver: sitemap for an assigned project\n# · Deliver: 1–3 mobile wireframe screens in Figma`,
            language: 'bash',
          },
          {
            title: 'Phase 3 — Prototyping & Usability Testing',
            description: 'Compare low-fidelity vs high-fidelity prototyping, build a lo-fi prototype from your wireframes, then conduct usability tests with users. Document findings and suggest improvements. Duration: 8 hours.',
            code: `# Key activities\n# · Build lo-fi prototype in Figma or Framer\n# · Run usability test sessions via Maze or UserTesting\n# · Deliver: findings report with suggested improvements`,
            language: 'bash',
          },
          {
            title: 'Phase 4 — Visual Design Principles, Design System & Style Guides',
            description: 'Study colour theory, typography, and layout. Learn why consistency matters in design systems. Create a component using design principles, then produce a full homepage design referencing the N-Compass TV website. Duration: 12 hours.',
            code: `# Key activities\n# · Study: Colour Theory, Typography, Layout fundamentals\n# · Reference: https://ncompasstv.com for the homepage task\n# · Deliver: 1 Figma component using design principles\n# · Deliver: homepage redesign in Figma (high-fidelity)`,
            language: 'bash',
          },
          {
            title: 'Phase 5 — Accessibility, Collaboration & Feedback',
            description: 'Learn inclusive design principles (WCAG 2.1 AA), evaluate existing designs for accessibility issues, and participate in cross-team collaboration sessions. Present your work and receive structured feedback. Duration: 6 hours.',
            code: `# Key activities\n# · Audit a design for WCAG 2.1 AA compliance\n# · Use Figma Contrast plugin — minimum 4.5:1 for body text\n# · Present work to team and incorporate feedback`,
            language: 'bash',
          },
          {
            title: 'Phase 6 — Portfolio Development & Final Presentation',
            description: 'Prepare your portfolio and present the final project incorporating everything learned across all phases. Reflect on the experience, gather peer feedback, and document lessons learned. Duration: 2 hours.',
            code: `# Key activities\n# · Compile all phase deliverables into a Figma portfolio page\n# · Present final design to the UI/UX team\n# · Gather and document structured feedback`,
            language: 'bash',
          },
          {
            title: 'Phase 7 — Assist in Creating N-Compass Web App Pages',
            description: 'Work directly with the UI/UX lead to design production-ready pages for the N-Compass web platform. Real Jira tickets, real users, real impact. This is where your training transitions into active contribution. Duration: Ongoing.',
            code: `# Key activities\n# · Pick up Jira design tasks from the active sprint\n# · Collaborate with Frontend and Backend teams on handoff\n# · Deliver annotated Figma screens via Dev Mode`,
            language: 'bash',
          },
        ],
        codeBlock: {
          language: 'bash',
          code: `# 7-Phase UI/UX Onboarding — total ~42 hours
# Phase 1  Introduction & User Research        4–6 hrs
# Phase 2  Information Architecture & Wireframes  8 hrs
# Phase 3  Prototyping & Usability Testing        8 hrs
# Phase 4  Visual Design & Design Systems        12 hrs
# Phase 5  Accessibility, Collaboration          6 hrs
# Phase 6  Portfolio & Final Presentation        2 hrs
# Phase 7  N-Compass Page Contribution       ongoing`,
        },
      },
    },
    {
      id: 'ux-design-process',
      label: 'Design Process',
      num: '03',
      content: {
        type: 'folder-arch',
        cards: [
          {
            icon: '\uD83D\uDD0D',
            accent: '#8DCB2C',
            title: 'Phase 1 \u00b7 Research & Discovery',
            body: '4\u20136 hrs. Study UI vs UX fundamentals, survey methods, interviews, and usability testing. Deliver a user personas document and a mini research report.',
          },
          {
            icon: '\uD83D\uDDC2\uFE0F',
            accent: '#3B82F6',
            title: 'Phase 2 \u00b7 Information Architecture',
            body: '8 hrs. Define structure and navigation via sitemaps and user flows. Build 1\u20133 mobile wireframe screens in Figma, Sketch, or Adobe XD.',
          },
          {
            icon: '\uD83E\uDDEA',
            accent: '#F59E0B',
            title: 'Phase 3 \u00b7 Prototyping & Testing',
            body: '8 hrs. Build a lo-fi prototype from wireframes and run Maze usability tests. Document findings and improvement recommendations.',
          },
          {
            icon: '\uD83C\uDFA8',
            accent: '#EC4899',
            title: 'Phase 4 \u00b7 Visual Design & Systems',
            body: '12 hrs. Apply colour theory, typography, and layout principles. Create a Figma component and a full homepage design referencing the NCompassTV website.',
          },
          {
            icon: '\u267F',
            accent: '#14B8A6',
            title: 'Phase 5 \u00b7 Accessibility & Collaboration',
            body: '6 hrs. Audit designs for WCAG 2.1 AA \u2014 contrast ratios, touch targets, focus states. Present work to cross-functional teams and incorporate feedback.',
          },
          {
            icon: '\uD83D\uDCC1',
            accent: '#8B5CF6',
            title: 'Phase 6 \u00b7 Portfolio & Presentation',
            body: '2 hrs. Compile all phase deliverables into a Figma portfolio page. Present the final design to the UI/UX team and gather structured peer feedback.',
          },
          {
            icon: '\uD83D\uDE80',
            accent: '#EF4444',
            title: 'Phase 7 \u00b7 N-Compass Contribution',
            body: 'Ongoing. Pick up real Jira design tasks from the active sprint. Collaborate with Frontend and Backend teams via Figma Dev Mode annotations.',
          },
        ],
        codeBlock: {
          language: 'bash',
          code: `# UX Design Workflow — end to end
# ┌──────────────┐    ┌──────────────┐    ┌──────────────┐
# │  1 Research  │ →  │  2 IA + Wires │ →  │ 3 Prototype  │
# └──────────────┘    └──────────────┘    └──────────────┘
#                                                ↓
# ┌──────────────┐    ┌──────────────┐    ┌──────────────┐
# │ 6 Portfolio  │ ←  │5 Accessibility│ ←  │ 4 Visual Des.│
# └──────────────┘    └──────────────┘    └──────────────┘
#       ↓
# ┌──────────────────────┐
# │  7 Ship to Production  │
# └──────────────────────┘`,
        },
      },
    },
    {
      id: 'ux-folder-arch',
      label: 'Folder Architecture',
      num: '04',
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
      num: '05',
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
          {
            title: 'Visual Hierarchy (Phase 4 Principle)',
            description: 'Every screen must establish a clear visual hierarchy using size, weight, contrast, and spacing. Users should be able to identify the primary action within 3 seconds.',
            codeBlock: {
              language: 'bash',
              code: `# Hierarchy checklist for every frame:
# 1. One dominant H1 per screen — largest, highest contrast
# 2. Supporting H2/H3 — 60–80% of H1 size
# 3. Body text — min 16px, line-height 1.5
# 4. Primary CTA — isolated, high-contrast, generous padding
# 5. Secondary elements — muted colour, reduced weight`,
            },
            callout: { type: 'tip', title: 'Squint test', body: 'Squint at your design — the most important element should still be obvious. If it is not, increase size or contrast.' },
          },
          {
            title: 'Accessibility — WCAG 2.1 AA (Phase 5 Principle)',
            description: 'Every design deliverable must be evaluated for WCAG 2.1 AA compliance before handoff. Inclusive design is not optional — it is a team standard.',
            codeBlock: {
              language: 'bash',
              code: `# WCAG 2.1 AA checklist
# · Contrast ratio ≥ 4.5:1 for body text (use Figma Contrast plugin)
# · Contrast ratio ≥ 3:1 for large text (18px+ bold or 24px+ regular)
# · Interactive targets ≥ 44×44 px touch area
# · Focus states visible on all interactive elements
# · No information conveyed by colour alone
# · Alt text annotations on all images in Figma handoff`,
            },
            callout: { type: 'warning', title: 'PR blocker', body: 'Designs failing contrast or touch-target checks will be returned before engineering picks up the ticket.' },
          },
          {
            title: 'Usability Testing Protocol (Phase 3 Principle)',
            description: 'Every major UX flow must be validated through at least one round of remote usability testing via Maze before engineering begins implementation.',
            codeBlock: {
              language: 'bash',
              code: `# Maze test setup
# 1. Export Figma prototype link — set starting frame
# 2. Create Maze project → "Usability Test" template
# 3. Define 2–5 tasks aligned to user goals
# 4. Set success criteria (task completion ≥ 80%)
# 5. Recruit ≥ 5 participants from target personas
# 6. Analyse heatmaps + misclick rate after 48 hrs`,
            },
            callout: { type: 'info', title: 'Minimum bar', body: 'A task completion rate below 70% signals a UX problem that must be resolved before high-fidelity production begins.' },
          },
        ],
      },
    },
    {
      id: 'ux-mistakes',
      label: 'Common Mistakes',
      num: '06',
      content: {
        type: 'mistakes',
        table: {
          headers: ['❌ Mistake', '✅ Correct Approach'],
          rows: [
            { cells: ['Raw hex in Figma frames or code', 'Use Figma Tokens Studio variables mapped to design tokens'] },
            { cells: ['Duplicate component instances in Figma', 'Use main component in the library; create instances only'] },
            { cells: ['Contrast ratio below 4.5:1 for body text', 'Check with Figma Contrast plugin; target WCAG AA minimum (4.5:1)'] },
            { cells: ['Skipping mobile/tablet variants', 'Every frame needs 375px (mobile), 768px (tablet), 1440px (desktop)'] },
            { cells: ['Handoff without redline annotations', 'Use Figma Dev Mode to annotate spacing, tokens, and interactions'] },
            { cells: ['Jumping to high-fi before wireframes are reviewed', 'Always get wireframe sign-off from engineering before producing high-fidelity screens (Phase 2)'] },
            { cells: ['Skipping usability testing entirely', 'Run at least one Maze test per major user flow before engineering picks up the ticket (Phase 3)'] },
            { cells: ['Using colour alone to convey state or error', 'Pair colour with an icon, label, or pattern — required for WCAG 2.1 AA (Phase 5)'] },
            { cells: ['Touch targets smaller than 44×44 px', 'All interactive elements must meet the minimum 44×44 px touch area for accessibility (Phase 5)'] },
            { cells: ['Presenting at Phase 6 without incorporating feedback iterations', 'Gather and apply at least one round of team feedback before the final portfolio presentation (Phase 6)'] },
          ],
        },
      },
    },
    {
      id: 'ux-projects',
      label: 'Projects',
      num: '07',
      content: { type: 'projects' },
    },
  ],
};
