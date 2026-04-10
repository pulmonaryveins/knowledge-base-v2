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
      subHeader: 'A breakdown of the design tools and platforms used across every phase of the NCompassTV design workflow.',
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
      subHeader: 'Follow the 7-phase curriculum to build your foundation in UX principles, prototyping, accessibility, and production-ready design.',
      content: {
        type: 'getting-started',
        steps: [
          {
            icon: 'layers',
            title: 'Phase 1 — Design Basics: Core Structure & Consistency',
            description: 'Study the foundational balance between aesthetic appeal and functional utility. Understand how visual hierarchy, consistent standardized components, and mental-model alignment reduce cognitive load. Explore simplicity as a design virtue — stripping decorative clutter empowers users to achieve goals efficiently. Duration: 4–6 hours.',
          },
          {
            icon: 'compass',
            title: 'Phase 2 — UX Design Fundamentals',
            description: 'Explore core UX concepts including the Golden Ratio, Design Aesthetics, Centered Design, Product Design, and Design Ethics. Learn Research Methods, Lateral Thinking, and Design Thinking frameworks. Study Gestalt Principles, Skeuomorphism, Visual Hierarchy, and how Human–Computer Interaction shapes inclusive, accessible design. Duration: 8 hours.',
          },
          {
            icon: 'pen-tool',
            title: 'Phase 3 — Wireframing: The Foundation of Blueprinting',
            description: 'Master wireframing as the architectural phase of design. Using low-fidelity skeletons, map user flows and information architecture without the distraction of typography or color. This stage is critical for identifying usability issues early and ensuring the interface hierarchy supports user objectives before any high-fidelity assets are created. Duration: 8 hours.',
          },
          {
            icon: 'play-circle',
            title: 'Phase 4 — Prototyping: Validation Through Motion',
            description: 'Transform static wireframes into interactive experiences, bridging the gap between design concept and finished product. Add transitions and functional interactions to simulate actual user flows. This iterative process allows teams to validate the interface, gather meaningful feedback, and ensure the final developer handoff is a tested, refined flow. Duration: 8 hours.',
          },
          {
            icon: 'globe-2',
            title: 'Phase 5 — Web Design: Responsive Architecture & Accessibility',
            description: 'Apply responsive grids and flexible layouts to ensure seamless experiences across all devices. Incorporate accessibility standards — high color contrast, keyboard navigability, WCAG 2.1 AA compliance — so the digital environment is inclusive and usable regardless of physical or technical constraints. Balance aesthetic impact with technical performance and strategic whitespace. Duration: 8 hours.',
          },
          {
            icon: 'type',
            title: 'Phase 6 — Typography & Color Theory',
            description: 'Use font weight, size, and line height to establish clear visual hierarchy and guide users through content in logical order. Understand how kerning and letter-spacing affect readability and brand personality. Apply color psychology (trust from blue, energy from red) and the color wheel (monochromatic, analogous, complementary) to create harmony and meet accessibility contrast standards. Duration: 6 hours.',
          },
          {
            icon: 'rocket',
            title: 'Phase 7 — UI Design Principles & N-Compass Contribution',
            description: 'Apply all learned principles to production work. Pick up real Jira design tasks from the active sprint. Collaborate with Frontend and Backend teams via Figma Dev Mode annotations. Deliver annotated, accessible, token-driven screens that reflect the full curriculum: hierarchy, consistency, wireframe-first discipline, responsive layouts, readable typography, and WCAG-compliant color. Duration: Ongoing.',
          },
        ],
      },
    },
    {
      id: 'ux-design-process',
      label: 'Design Process',
      num: '03',
      subHeader: 'A phase-by-phase overview of how designs move from initial research through usability testing to engineering handoff.',
      content: {
        type: 'getting-started',
        steps: [
          {
            icon: 'layers',
            title: 'Phase 1 · Design Basics',
            description: '4–6 hrs. Master the balance between aesthetic appeal and functional utility. Study visual hierarchy, consistency, standardized components, and how mental-model alignment reduces cognitive load. Deliver: design critique document.',
          },
          {
            icon: 'compass',
            title: 'Phase 2 · UX Design Fundamentals',
            description: '8 hrs. Explore Golden Ratio, Design Aesthetics, Product Design, Design Ethics, and Constraints. Study Gestalt Principles, Visual Hierarchy, Design Thinking, UX Research Methods, and Inclusive Design. Deliver: design thinking worksheet.',
          },
          {
            icon: 'pen-tool',
            title: 'Phase 3 · Wireframing',
            description: '8 hrs. Use low-fidelity wireframes to map user flows and information architecture without visual distraction. Identify usability issues early. Deliver: 1–3 mobile wireframe screens with annotated user flow.',
          },
          {
            icon: 'play-circle',
            title: 'Phase 4 · Prototyping',
            description: '8 hrs. Transform wireframes into interactive flows with transitions and functional interactions. Run usability tests, gather feedback, and iterate. Deliver: lo-fi prototype + findings report.',
          },
          {
            icon: 'globe-2',
            title: 'Phase 5 · Web Design & Accessibility',
            description: '8 hrs. Apply responsive grids, flexible layouts, and WCAG 2.1 AA accessibility standards. Balance aesthetic impact with performance. Deliver: responsive hi-fi web screen with accessibility audit.',
          },
          {
            icon: 'type',
            title: 'Phase 6 · Typography & Color Theory',
            description: '6 hrs. Use font weight, size, and line height to establish hierarchy. Apply color psychology and the color wheel for harmony and accessibility. Minimum contrast ratio 4.5:1 for body text. Deliver: style guide page.',
          },
          {
            icon: 'rocket',
            title: 'Phase 7 · UI Design Principles & Production',
            description: 'Ongoing. Apply all curriculum phases to real sprint work. Pick up Jira design tasks and deliver annotated, accessible, token-driven Figma screens via Dev Mode for Frontend and Backend handoff.',
          },
        ],
      },
    },
    {
      id: 'ux-coding-patterns',
      label: 'Design Patterns',
      num: '04',
      subHeader: 'Reusable approaches for design tokens, component variants, visual hierarchy, accessibility, and usability testing that all designers on the team follow.',
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
      id: 'ux-branding',
      label: 'Company Branding',
      num: '05',
      subHeader: 'Official NCompassTV logo assets, favicon, and sidebar variants — use these files for all digital touchpoints and never alter the brand colours or proportions.',
      content: {
        type: 'branding',
        mainLogos: [
          { label: 'Lime Green', src: '/LOGO-GREEN.png', background: '#091635', width: '124.8px', height: '123.8px', color: '#8DC63F' },
          { label: 'Midnight Blue', src: '/LOGO-BLUE.png', background: '#ffffff', bordered: true, width: '124.8px', height: '123.8px', color: '#091635' },
          { label: 'White', src: '/LOGO-WHITE.png', background: '#091635', bordered: true, width: '124.8px', height: '123.8px', color: '#ffffff' },
        ],
        favicon: { label: 'Favicon', src: '/GREEN-SINGLE.png', background: 'transparent', width: '16px', height: '16px', color: '#8DC63F' },
        sidebarCollapsed: [
          { label: 'Dark', src: '/BLUE-SINGLE.png', background: '#ffffff', bordered: true },
          { label: 'Light', src: '/WHITE%20SINGLE.png', background: '#8DC63F', bordered: true },
          { label: 'Light', src: '/GREEN-SINGLE.png', background: '#ffffff', bordered: true },
        ],
        sidebarExpanded: [
          { label: 'Dark', src: '/LOGO-BLUE.png', background: '#ffffff', bordered: true  },
          { label: 'Light', src: '/LOGO-WHITE.png', background: '#091635', bordered: true },
        ],
      },
    },
    {
      id: 'ux-color-palette',
      label: 'Color Palette',
      num: '06',
      subHeader: 'The NCompassTV color system — primary, accent, and semantic swatches with full tint/shade scales and WCAG 2.1 contrast compliance ratios.',
      content: {
        type: 'color-palette',
        tabs: [
          // ── Tab 1: Overview ──────────────────────────────────────────────
          {
            label: 'Overview',
            type: 'overview',
            groups: [
              {
                label: 'Primary Color',
                main: [{ name: 'Midnight Blue', hex: '#091635' }],
              },
              {
                label: 'Accent Color',
                main: [{ name: 'Apple Green', hex: '#8DCB2C' }],
              },
              {
                label: 'Semantic Colors',
                main: [
                  { name: 'Danger / Error', hex: '#E73535' },
                  { name: 'Success', hex: '#3ADE30' },
                  { name: 'Information / Links', hex: '#095AF3' },
                  { name: 'Warning', hex: '#FFAA00' },
                  { name: 'Info Alert', hex: '#26A8BA' },
                ],
              },
              {
                label: 'Other Colors',
                main: [
                  { name: 'Hot Pink', hex: '#BE0064' },
                  { name: 'Red Orange', hex: '#FF5800' },
                  { name: 'Purple', hex: '#3808A6' },
                ],
              },
            ],
          },
          // ── Tab 2: Shades ────────────────────────────────────────────────
          {
            label: 'Shades',
            type: 'shades',
            groups: [
              {
                label: 'Shades of Midnight Blue',
                shades: [
                  { name: 'Stargazer Navy', hex: '#080F24' },
                  { name: 'Cosmic Ink', hex: '#081B37' },
                  { name: 'Twilight Armor', hex: '#1a2843' },
                  { name: 'Moonshot Slate', hex: '#384855' },
                  { name: 'Shadow Steel', hex: '#586176' },
                  { name: 'Fogbound Indigo', hex: '#777B95' },
                  { name: 'Dawn Mist', hex: '#98a0ae' },
                  { name: 'Blue Haze', hex: '#B9c1cf' },
                  { name: 'Clouded Pearl', hex: '#d8d9ef' },
                  { name: 'Lunar Frost', hex: '#eaecf5' },
                  { name: 'Snowveil White', hex: '#F0F0F5' },
                ],
              },
              {
                label: 'Shades of Apple Green',
                shades: [
                  { name: 'Black Green', hex: '#0c3104' },
                  { name: 'Gray Green', hex: '#143c08' },
                  { name: 'Evergreen', hex: '#1c4009' },
                  { name: 'Deep Green', hex: '#234c11' },
                  { name: 'Avocado Green', hex: '#4e6b17' },
                  { name: 'Grass Green', hex: '#5e8a1a' },
                  { name: 'Forest Green', hex: '#74af26' },
                  { name: 'Apple Green', hex: '#8DCB2C' },
                  { name: 'Lime Green', hex: '#aedb68' },
                  { name: 'Pistachio Green', hex: '#bcdc8c' },
                  { name: 'Tea Green', hex: '#d8f0b0' },
                ],
              },
              {
                label: 'Semantic Color Shades',
                shades: [
                  { name: 'Deep Wine', hex: '#4c0808' },
                  { name: 'Burnt Garnet', hex: '#7a1010' },
                  { name: 'Blood Maroon', hex: '#a01818' },
                  { name: 'Dark Red', hex: '#c42020' },
                  { name: 'Crimson Red', hex: '#E73535' },
                  { name: 'Fire Engine Red', hex: '#f06060' },
                  { name: 'Light Coral', hex: '#f5a0a0' },
                  { name: 'Rosa Blush', hex: '#fad0d0' },
                  { name: 'Misty Rose', hex: '#fff0f0' },
                  { name: 'Black Forest', hex: '#051304' },
                  { name: 'Charcoal Green', hex: '#0b2c07' },
                  { name: 'Deep Forest', hex: '#11450c' },
                  { name: 'Moss Green', hex: '#1a7019' },
                  { name: 'Forest Green', hex: '#279220' },
                  { name: 'Kelly Green', hex: '#31b828' },
                  { name: 'Fresh Leaf', hex: '#60e448' },
                  { name: 'Light Green', hex: '#90e698' },
                  { name: 'Pale Mint', hex: '#c3f4bf' },
                  { name: 'Deep Space Blue', hex: '#010f2a' },
                  { name: 'Cobalt Blue', hex: '#095AF3' },
                  { name: 'Cornflower Blue', hex: '#6699ee' },
                  { name: 'Alice Blue', hex: '#d0e4ff' },
                ],
              },
              {
                label: 'Other Color Shades',
                shades: [
                  { name: 'Black Cherry', hex: '#240012' },
                  { name: 'Deep Maroon', hex: '#4a0028' },
                  { name: 'Mulberry', hex: '#800040' },
                  { name: 'Hot Pink', hex: '#BE0064' },
                  { name: 'Raspberry', hex: '#d4296b' },
                  { name: 'Flamingo', hex: '#e85b8e' },
                  { name: 'Blush', hex: '#f5aac5' },
                  { name: 'Misty Blush', hex: '#fde0ec' },
                  { name: 'Burnt Umber', hex: '#5c1800' },
                  { name: 'Brick Orange', hex: '#a33200' },
                  { name: 'Red Orange', hex: '#FF5800' },
                  { name: 'Tangerine', hex: '#ff8040' },
                  { name: 'Peach', hex: '#ffb080' },
                  { name: 'Apricot', hex: '#ffd4aa' },
                  { name: 'Midnight Violet', hex: '#100040' },
                  { name: 'Deep Purple', hex: '#220075' },
                  { name: 'Violet', hex: '#3808A6' },
                  { name: 'Medium Purple', hex: '#6840cc' },
                  { name: 'Orchid', hex: '#a47de8' },
                  { name: 'Soft Lavender', hex: '#c9b8f0' },
                  { name: 'Lavender Mist', hex: '#e8e0f8' },
                  { name: 'Whisper Purple', hex: '#f4f0fc' },
                ],
              },
            ],
          },
          // ── Tab 3: WCAG ──────────────────────────────────────────────────
          {
            label: 'WCAG',
            type: 'wcag',
            wcagPairs: [
              { label: 'White on Midnight Blue', foreground: '#ffffff', background: '#091635', ratio: '17.83:1', aaNormal: true, aaLarge: true, aaaNormal: true, aaaLarge: true },
              { label: 'Midnight Blue on Apple Green', foreground: '#091635', background: '#8DCB2C', ratio: '8.63:1', aaNormal: true, aaLarge: true, aaaNormal: true, aaaLarge: true },
              { label: 'White on Danger Red', foreground: '#ffffff', background: '#E73535', ratio: '4.62:1', aaNormal: true, aaLarge: true, aaaNormal: false, aaaLarge: false },
              { label: 'Midnight Blue on White', foreground: '#091635', background: '#ffffff', ratio: '17.83:1', aaNormal: true, aaLarge: true, aaaNormal: true, aaaLarge: true },
              { label: 'White on Hot Pink', foreground: '#ffffff', background: '#BE0064', ratio: '5.56:1', aaNormal: true, aaLarge: true, aaaNormal: false, aaaLarge: false },
              { label: 'White on Purple', foreground: '#ffffff', background: '#3808A6', ratio: '9.32:1', aaNormal: true, aaLarge: true, aaaNormal: true, aaaLarge: true },
              { label: 'White on Info Alert', foreground: '#ffffff', background: '#26A8BA', ratio: '3.21:1', aaNormal: false, aaLarge: true, aaaNormal: false, aaaLarge: false },
            ],
            wcagNote: 'Contrast ratios calculated per WCAG 2.1 standards. AA requires 4.5:1 for normal text and 3:1 for large text. AAA requires 7:1 for normal text and 4.5:1 for large text. Always verify with a contrast checker tool before production handoff.',
          },
        ],
      },
    },
    {
      id: 'ux-typography',
      label: 'Typography Scale',
      num: '07',
      subHeader: 'Nunito type scale for Web, Web (Button), and Mobile contexts, showing Regular and Medium weight specimens at every heading and body level.',
      content: {
        type: 'typography-scale',
        tabs: [
          {
            label: 'Web',
            fontName: 'Nunito - Web',
            preview: 'The quick brown fox jumps over the lazy dog',
            columns: [
              {
                label: 'Regular',
                weight: '400',
                rows: [
                  { tag: 'H1', size: '36px' },
                  { tag: 'H2', size: '30px' },
                  { tag: 'H3', size: '24px' },
                  { tag: 'H4', size: '20px' },
                  { tag: 'H5', size: '18px' },
                  { tag: 'H6', size: '16px' },
                  { tag: 'P', size: '14px' },
                  { tag: 'P.S', size: '12px' },
                  { tag: 'P.XS', size: '10px' },
                  { tag: 'P.XXS', size: '9px' },
                ],
              },
              {
                label: 'Medium',
                weight: '500',
                rows: [
                  { tag: 'H1', size: '36px' },
                  { tag: 'H2', size: '30px' },
                  { tag: 'H3', size: '24px' },
                  { tag: 'H4', size: '20px' },
                  { tag: 'H5', size: '18px' },
                  { tag: 'H6', size: '16px' },
                  { tag: 'P', size: '14px' },
                  { tag: 'P.S', size: '12px' },
                  { tag: 'P.XS', size: '10px' },
                  { tag: 'P.XXS', size: '9px' },
                ],
              },
            ],
          },
          {
            label: 'Web (Button)',
            fontName: 'Nunito - Web (For Button)',
            preview: 'The quick brown fox jumps over the lazy dog',
            columns: [
              {
                label: 'Regular',
                weight: '400',
                rows: [
                  { tag: 'H4', size: '24px' },
                  { tag: 'H5', size: '20px' },
                  { tag: 'H6', size: '18px' },
                  { tag: 'P', size: '16px' },
                  { tag: 'P.S', size: '14px' },
                  { tag: 'P.XS', size: '12px' },
                ],
              },
              {
                label: 'Medium',
                weight: '500',
                rows: [
                  { tag: 'H4', size: '24px' },
                  { tag: 'H5', size: '20px' },
                  { tag: 'H6', size: '18px' },
                  { tag: 'P', size: '16px' },
                  { tag: 'P.S', size: '14px' },
                  { tag: 'P.XS', size: '12px' },
                ],
              },
            ],
          },
          {
            label: 'Mobile',
            fontName: 'Nunito - Mobile',
            preview: 'The quick brown fox jumps over the lazy dog',
            columns: [
              {
                label: 'Regular',
                weight: '400',
                rows: [
                  { tag: 'XL', size: '24px' },
                  { tag: 'H1', size: '20px' },
                  { tag: 'H2', size: '18px' },
                  { tag: 'H3', size: '16px' },
                  { tag: 'H4', size: '14px' },
                  { tag: 'H5', size: '12px' },
                  { tag: 'H6', size: '10px' },
                ],
              },
              {
                label: 'Medium',
                weight: '500',
                rows: [
                  { tag: 'XL', size: '24px' },
                  { tag: 'H1', size: '20px' },
                  { tag: 'H2', size: '18px' },
                  { tag: 'H3', size: '16px' },
                  { tag: 'H4', size: '14px' },
                  { tag: 'H5', size: '12px' },
                  { tag: 'H6', size: '10px' },
                ],
              },
            ],
          },
        ],
      },
    },
    // ── Button Showcase ──────────────────────────────────────────────────
    {
      id: 'ux-button-showcase',
      label: 'Button Styles',
      num: '08',
      subHeader: 'All interactive button variants — Primary, Secondary, and Soft Rounded — across six states (Default, Hover, Active, Disabled, Ghost, Danger) and five sizes.',
      content: {
        type: 'button-showcase',
        tabs: [
          {
            label: 'Primary Button',
            variant: 'primary',
            defaultTag: 'Primary Button (Default)',
          },
          {
            label: 'Secondary Button',
            variant: 'secondary',
            defaultTag: 'Secondary Button (Default)',
          },
          {
            label: 'Soft Rounded Button',
            variant: 'soft-rounded',
            defaultTag: 'Primary Button (Default)',
          },
        ],
      },
    },
    // ── Grid / Screen Sizes ──────────────────────────────────────────────────
    {
      id: 'ux-grid',
      label: 'Grid & Screen Sizes',
      num: '09',
      subHeader: 'Supported viewport dimensions across Desktop, Tablet, and Mobile — every Figma frame must cover each listed size before moving to handoff.',
      content: {
        type: 'grid',
        description: 'NCompassTV designs target three breakpoint tiers. All frames in Figma must include every size listed here before moving to hand-off.',
        groups: [
          {
            sectionLabel: 'Section 1',
            tierLabel: 'Desktop',
            screens: [
              { width: 1920, height: 1080 },
              { width: 1536, height: 864 },
              { width: 1368, height: 768 },
              { width: 1280, height: 720 },
            ],
          },
          {
            sectionLabel: 'Section 2',
            tierLabel: 'Tablet',
            screens: [
              { width: 768,  height: 1024 },
              { width: 1280, height: 800 },
              { width: 768,  height: 1026 },
              { width: 820,  height: 1180 },
            ],
          },
          {
            sectionLabel: 'Section 3',
            tierLabel: 'Mobile',
            screens: [
              { width: 412, height: 917 },
              { width: 390, height: 844 },
              { width: 393, height: 852 },
            ],
          },
        ],
      },
    },
    // ── Iconography ─────────────────────────────────────────────────────────
    {
      id: 'ux-iconography',
      label: 'Iconography',
      num: '10',
      subHeader: 'Font Awesome icon catalog used across all NCompassTV interfaces, displayed at every supported size from 32px down to 8px.',
      content: {
        type: 'iconography',
        description: "Iconography refers to the use of visual symbols or icons to represent actions, content, or ideas in a user interface. It's a key part of UI design that helps users quickly recognize and navigate functions without relying on text. Good iconography is simple, intuitive, and consistent — making the experience faster, cleaner, and more user-friendly.",
        sizes: [
          { px: 32 },
          { px: 24 },
          { px: 20 },
          { px: 14 },
          { px: 12 },
          { px: 10 },
          { px: 8 },
        ],
        icons: [
          { name: 'fa-graduation-cap',  faClass: 'fa-solid fa-graduation-cap',  description: 'Education / learning' },
          { name: 'fa-trash',           faClass: 'fa-solid fa-trash',           description: 'Delete / remove action' },
          { name: 'fa-ban',             faClass: 'fa-solid fa-ban',             description: 'Prohibited / blocked state' },
          { name: 'fa-circle-user',     faClass: 'fa-solid fa-circle-user',     description: 'User profile avatar' },
          { name: 'fa-house',           faClass: 'fa-solid fa-house',           description: 'Home / dashboard' },
          { name: 'fa-magnifying-glass',faClass: 'fa-solid fa-magnifying-glass',description: 'Search / filter' },
          { name: 'fa-bell',            faClass: 'fa-solid fa-bell',            description: 'Notifications / alerts' },
          { name: 'fa-gear',            faClass: 'fa-solid fa-gear',            description: 'Settings / configuration' },
          { name: 'fa-pen-to-square',   faClass: 'fa-solid fa-pen-to-square',   description: 'Edit / modify' },
          { name: 'fa-circle-check',    faClass: 'fa-solid fa-circle-check',    description: 'Success / confirmed state' },
          { name: 'fa-triangle-exclamation', faClass: 'fa-solid fa-triangle-exclamation', description: 'Warning / caution' },
          { name: 'fa-circle-info',     faClass: 'fa-solid fa-circle-info',     description: 'Info / help tooltip' },
          { name: 'fa-arrow-right',     faClass: 'fa-solid fa-arrow-right',     description: 'Navigation / next' },
          { name: 'fa-bars',            faClass: 'fa-solid fa-bars',            description: 'Hamburger menu / sidebar toggle' },
          { name: 'fa-xmark',           faClass: 'fa-solid fa-xmark',           description: 'Close / dismiss' },
          { name: 'fa-tv',              faClass: 'fa-solid fa-tv',              description: 'Display / channel' },
          { name: 'fa-play',            faClass: 'fa-solid fa-play',            description: 'Play media' },
          { name: 'fa-cloud-arrow-up',  faClass: 'fa-solid fa-cloud-arrow-up',  description: 'Upload / sync to cloud' },
        ],
      },
    },
    // ── Spacing & Layout ─────────────────────────────────────────────────────
    {
      id: 'ux-spacing',
      label: 'Spacing & Layout Guide',
      num: '11',
      subHeader: 'The 4px-base spacing scale — Micro (2–12px), Component (16–40px), and Layout (48–128px) tokens for consistent padding, margin, and gap across all screens.',
      content: {
        type: 'spacing',
        description: 'All spacing in the NCompassTV design system is built on Tailwind\'s 4px base grid. Use these tokens consistently for padding, margin, and gap to ensure visual rhythm across every screen.',
        groups: [
          // ── Micro Scale ────────────────────────────────────────────────
          {
            label: 'Micro Scale (2px – 12px)',
            description: 'Tight internal spacers for icons, badges, chips, and inline labels.',
            tokens: [
              { name: '0.5', px: 2,  rem: '0.125rem', tailwind: '*-0.5', usage: 'Hairline gaps between stacked icons or divider offsets' },
              { name: '1',   px: 4,  rem: '0.25rem',  tailwind: '*-1',   usage: 'Icon inner padding, badge border gap to text' },
              { name: '1.5', px: 6,  rem: '0.375rem', tailwind: '*-1.5', usage: 'Dense list item row gap, tight chip padding' },
              { name: '2',   px: 8,  rem: '0.5rem',   tailwind: '*-2',   usage: 'Button icon-to-label gap, inline label spacing' },
              { name: '2.5', px: 10, rem: '0.625rem', tailwind: '*-2.5', usage: 'Status badge padding, table cell micro offset' },
              { name: '3',   px: 12, rem: '0.75rem',  tailwind: '*-3',   usage: 'Small tag / pill padding, compact list row padding' },
            ],
          },
          // ── Component Scale ─────────────────────────────────────────────
          {
            label: 'Component Scale (16px – 40px)',
            description: 'Primary token range for buttons, form fields, cards, and navigation items.',
            tokens: [
              { name: '4',  px: 16, rem: '1rem',    tailwind: '*-4',  usage: 'Default button padding-x, form input inner padding' },
              { name: '5',  px: 20, rem: '1.25rem', tailwind: '*-5',  usage: 'Card body padding (compact variant), modal row gap' },
              { name: '6',  px: 24, rem: '1.5rem',  tailwind: '*-6',  usage: 'Default card padding, sidebar item padding, section gaps' },
              { name: '7',  px: 28, rem: '1.75rem', tailwind: '*-7',  usage: 'Popover / dropdown inner padding' },
              { name: '8',  px: 32, rem: '2rem',    tailwind: '*-8',  usage: 'Large card padding, sidebar section margins' },
              { name: '10', px: 40, rem: '2.5rem',  tailwind: '*-10', usage: 'Full-width panel inner padding, sheet top margin' },
            ],
          },
          // ── Layout Scale ────────────────────────────────────────────────
          {
            label: 'Layout Scale (48px – 128px)',
            description: 'Page-level whitespace for section separation, hero areas, and viewport-spanning containers.',
            tokens: [
              { name: '12', px: 48,  rem: '3rem',  tailwind: '*-12', usage: 'Separation between major content blocks' },
              { name: '16', px: 64,  rem: '4rem',  tailwind: '*-16', usage: 'Hero banner top/bottom padding' },
              { name: '20', px: 80,  rem: '5rem',  tailwind: '*-20', usage: 'Page-level vertical gaps between sections' },
              { name: '24', px: 96,  rem: '6rem',  tailwind: '*-24', usage: 'Full-page section padding (top / bottom)' },
              { name: '32', px: 128, rem: '8rem',  tailwind: '*-32', usage: 'Maximum outer container inset on wide viewports' },
            ],
          },
        ],
        note: 'Avoid arbitrary pixel values. When a standard token doesn\'t fit, choose the nearest step up and adjust via flex/grid alignment. For responsive layouts use responsive variants: md:*-8 lg:*-12.',
      },
    },
    {
      id: 'ux-mistakes',
      label: 'Common Mistakes',
      num: '12',
      subHeader: 'Frequent design errors seen during review — paired with the correct approach to fix them before tickets reach engineering.',
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
      num: '13',
      subHeader: 'Active and completed design projects owned by the UI/UX team, with links to Figma files, prototypes, and Maze research results.',
      content: { type: 'projects' },
    },
  ],
};
