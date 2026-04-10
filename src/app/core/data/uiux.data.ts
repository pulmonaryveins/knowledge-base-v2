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
      content: {
        type: 'color-palette',
        groups: [
          {
            label: 'Primary Color',
            main: [
              { name: 'Midnight Blue', hex: '#091635' },
            ],
          },
          {
            label: 'Accent Color',
            main: [
              { name: 'Apple Green', hex: '#8DCB2C' },
            ],
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
              { name: 'Blue Haze', hex: '#B9c1cl' },
              { name: 'Clouded Pearl', hex: '#d8d9ef' },
              { name: 'Lunar Frost', hex: '#f4e7e1' },
              { name: 'Snowveil White', hex: '#F0F0F5' },
            ],
          },
          {
            label: 'Shades of Apple Green',
            shades: [
              { name: 'Black Green', hex: '#0c3104' },
              { name: 'Gray Green', hex: '#143c08' },
              { name: 'Evergreen', hex: '#1c2b09' },
              { name: 'Deep Green', hex: '#234c11' },
              { name: 'Avocado Green', hex: '#4e6b17' },
              { name: 'Grass Green', hex: '#608cda' },
              { name: 'Forest Green', hex: '#74af26' },
              { name: 'Lime Green', hex: '#94cb88' },
              { name: 'Apple Green', hex: '#8DCB2C' },
              { name: 'Pistachio Green', hex: '#bcdc8c' },
              { name: 'Tea Green', hex: '#ceef7df' },
            ],
          },
          {
            label: 'Semantic Color Shades',
            shades: [
              { name: 'Deep Wine', hex: '#6c080B' },
              { name: 'Burnt Garnet', hex: '#453b0c' },
              { name: 'Blood Maroon', hex: '#4c1111' },
              { name: 'Dark Red', hex: '#881a1a' },
              { name: 'Crimson Red', hex: '#8B2a2a' },
              { name: 'Fire Engine Red', hex: '#c83b3b' },
              { name: 'Light Coral', hex: '#f07c7c' },
              { name: 'Rosa Blush', hex: '#f7b4bd' },
              { name: 'Pink Petal', hex: '#ffb1e0' },
              { name: 'Light Rose', hex: '#ffe1e1' },
              { name: 'Misty Rose', hex: '#ffd7fl' },
              { name: 'Black Forest', hex: '#051304' },
              { name: 'Charcoal Green', hex: '#0b2c07' },
              { name: 'Deep Forest', hex: '#f0c20a' },
              { name: 'Evergreen', hex: '#135012' },
              { name: 'Moss Green', hex: '#1a7019' },
              { name: 'Forest Green', hex: '#279220' },
              { name: 'Kelly Green', hex: '#31b828' },
              { name: 'Fresh Leaf', hex: '#60e448' },
              { name: 'Light Green', hex: '#90e698' },
              { name: 'Pale Mint', hex: '#c3f4bf' },
              { name: 'Honeydew', hex: '#4c7ec1' },
            ],
          },
          {
            label: 'Blues & Neutrals Shades',
            shades: [
              { name: 'Deep Space Blue', hex: '#010908' },
              { name: 'Midnight Blue', hex: '#011731' },
              { name: 'Navy Indigo', hex: '#8B2350' },
              { name: 'Cobalt Blue', hex: '#1b63d4' },
              { name: 'Strong Blue', hex: '#1084a3' },
              { name: 'Royal Blue', hex: '#437785' },
              { name: 'Cornflower Blue', hex: '#7099BB' },
              { name: 'Baby Blue', hex: '#B8cbc9' },
              { name: 'Periwinkle', hex: '#b59B81' },
              { name: 'Powder Blue', hex: '#d3cBb0' },
              { name: 'Alice Blue', hex: '#4a7ec1' },
            ],
          },
        ],
      },
    },
    {
      id: 'ux-typography',
      label: 'Typography Scale',
      num: '07',
      content: {
        type: 'typography-scale',
        samples: [
          { tag: 'H1', label: 'Hero-level Heading', useCase: 'Used for main page titles, dashboards, feature headers, or anything that needs a "Welcome" entrance.', size: '40px', weight: '700', font: 'Syne' },
          { tag: 'H2', label: 'Section Titles', useCase: 'Perfect for major content sections, feature blocks, or page subsections.', size: '32px', weight: '700', font: 'Syne' },
          { tag: 'H3', label: 'Subsection Titles', useCase: 'Use for card titles, content groups, or strong labels inside modules.', size: '24px', weight: '700', font: 'Syne' },
          { tag: 'H4', label: 'Lower-level Headings', useCase: 'Ideal for form section titles, smaller card headers, or dividing content inside modals/sidebars.', size: '20px', weight: '600', font: 'Syne' },
          { tag: 'H5', label: 'Small but still heading-ish', useCase: 'Use for supporting titles, filter headings, table section labels, or anywhere you need hierarchy without shouting.', size: '16px', weight: '600', font: 'Syne' },
          { tag: 'H6', label: 'The quiet heading', useCase: 'Great for tiny sections, metadata labels, or places where the style says "heading," but visually close to body text.', size: '14px', weight: '600', font: 'Syne' },
          { tag: 'P', label: 'Paragraph', useCase: 'Use for general text, descriptions, UI details, product copy, and anywhere someone needs to read without squinting.', size: '16px', weight: '400', font: 'DM Sans' },
          { tag: 'P.S', label: 'Secondary Text', useCase: 'Perfect for helper texts, annotations, captions under charts, labels inside compact UI components, and subtle info.', size: '14px', weight: '400', font: 'DM Sans' },
          { tag: 'P.XS', label: 'Micro Text', useCase: 'Used for badges, tags, chips, tiny labels, or cramped UI areas.', size: '12px', weight: '500', font: 'DM Sans' },
          { tag: 'P.XXS', label: 'Ultra-extra Text', useCase: 'Use sparingly. Usually for system-level labels, watermark-like text, footnotes, and fine print in UI form.', size: '10px', weight: '400', font: 'DM Sans' },
        ],
      },
    },
    {
      id: 'ux-component-spec',
      label: 'Component Specs',
      num: '08',
      content: {
        type: 'component-spec',
        name: 'Accordion',
        description: 'An Accordion is a UI component that expands and collapses sections to show or hide related content. All size variants share the same token-driven border, spacing, and alignment rules — only height and padding scale.',
        variants: [
          {
            label: 'Small',
            width: '700px (Fill)',
            height: '36px',
            cornerRadius: '10px',
            paddingX: '20px',
            paddingY: '8px',
            gap: 'Space-Between',
            align: 'Center',
            borderSize: '0.5px',
            borderPlacement: 'Inside',
          },
          {
            label: 'Medium',
            width: '700px (Fill)',
            height: '40px',
            cornerRadius: '10px',
            paddingX: '20px',
            paddingY: '8px',
            gap: 'Space-Between',
            align: 'Center',
            borderSize: '0.5px',
            borderPlacement: 'Inside',
          },
          {
            label: 'Large',
            width: '700px (Fill)',
            height: '44px',
            cornerRadius: '10px',
            paddingX: '20px',
            paddingY: '8px',
            gap: 'Space-Between',
            align: 'Center',
            borderSize: '0.5px',
            borderPlacement: 'Inside',
          },
          {
            label: 'X Large',
            width: '700px (Fill)',
            height: '50px',
            cornerRadius: '10px',
            paddingX: '20px',
            paddingY: '8px',
            gap: 'Space-Between',
            align: 'Center',
            borderSize: '0.5px',
            borderPlacement: 'Inside',
          },
        ],
      },
    },
    {
      id: 'ux-mistakes',
      label: 'Common Mistakes',
      num: '09',
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
      num: '10',
      content: { type: 'projects' },
    },
  ],
};
