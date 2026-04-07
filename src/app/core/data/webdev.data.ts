// ── FILE: src/app/core/data/webdev.data.ts ──

import { Team } from '../models/team.model';

export const webdevTeam: Team = {
  key: 'webdev',
  label: 'Web Dev',
  color: '#F97316',
  gradient: 'linear-gradient(135deg, #3d1500, #7c2d12)',
  icon: '🌐',
  subtitle: 'Next.js · WordPress · Tailwind CSS · Public-facing Web Properties',
  stats: [
    { label: 'Live Sites', value: '6' },
    { label: 'Projects', value: '3' },
    { label: 'Avg Page Speed', value: '94' },
    { label: 'Uptime', value: '99.9%' },
  ],
  projects: [
    {
      id: 'wd-marketing-site',
      name: 'Marketing Site',
      description: 'Public-facing NCompassTV marketing website with landing pages and product info.',
      status: 'Live',
      icon: '🏠',
      teamKey: 'webdev',
      teamColor: '#F97316',
      doc: {
        meta: { stack: 'Next.js 14 · Tailwind CSS · Contentful CMS', repo: 'nctv/marketing-site', deploy: 'Vercel', sprint: 'Sprint 42' },
        purpose: 'The NCompassTV marketing site is the primary public-facing web presence. Built with Next.js for optimal SEO and performance, it uses Contentful as a headless CMS so the marketing team can update copy and images without engineering involvement.',
        features: [
          { title: 'CMS-driven Content', body: 'All page copy, hero images, and blog posts are managed in Contentful and pulled at build time via ISR for fast revalidation.' },
          { title: 'SEO Optimisation', body: 'Structured data (JSON-LD), Open Graph tags, XML sitemap, and canonical URLs configured via next/metadata for every page.' },
          { title: 'Landing Page Builder', body: 'Contentful-modelled component blocks (hero, feature grid, testimonials, CTA) let the marketing team assemble new landing pages without code.' },
        ],
        folderStructure: {
          language: 'bash',
          code: `marketing-site/
├── app/
│   ├── (pages)/
│   │   ├── page.tsx          # Home
│   │   ├── about/
│   │   └── blog/
│   ├── components/
│   │   ├── hero/
│   │   ├── feature-grid/
│   │   └── cta/
│   └── layout.tsx
├── lib/
│   └── contentful.ts         # CMS client
└── public/`,
        },
        gettingStarted: [
          { title: 'Clone & Install', description: 'Clone and install dependencies.', code: 'git clone git@github.com:nctv/marketing-site.git && npm i', language: 'bash' },
          { title: 'Configure Environment', description: 'Add Contentful API keys to your env file.', code: 'cp .env.example .env.local\n# Set CONTENTFUL_SPACE_ID and CONTENTFUL_ACCESS_TOKEN', language: 'bash' },
          { title: 'Start Dev Server', description: 'Launch Next.js in development mode.', code: 'npm run dev\n# Opens at http://localhost:3000', language: 'bash' },
          { title: 'Build & Preview', description: 'Build and run a production preview locally.', code: 'npm run build && npm start', language: 'bash' },
        ],
        contacts: [
          { name: 'Diana Reyes', role: 'Web Dev Lead', initials: 'DR', color: '#F97316' },
          { name: 'Sam Nguyen', role: 'Web Developer', initials: 'SN', color: '#8DCB2C' },
        ],
        links: [
          { label: 'GitHub Repo', url: '#', type: 'repo' },
          { label: 'Vercel Dashboard', url: '#', type: 'deploy' },
          { label: 'Contentful CMS', url: '#', type: 'docs' },
        ],
      },
    },
    {
      id: 'wd-host-portal-web',
      name: 'Host Portal Web',
      description: 'WordPress-based self-service portal for NCompassTV host account management.',
      status: 'Live',
      icon: '🖥️',
      teamKey: 'webdev',
      teamColor: '#F97316',
      doc: {
        meta: { stack: 'WordPress · PHP 8.2 · ACF · WooCommerce', repo: 'nctv/host-portal-wp', deploy: 'WP Engine', sprint: 'Sprint 40' },
        purpose: 'The Host Portal Web is a WordPress-powered self-service hub where NCompassTV host partners manage subscriptions, download invoices, and submit support tickets. Custom ACF fields and a child theme power all business-specific UI.',
        features: [
          { title: 'Subscription Management', body: 'WooCommerce Subscriptions integration lets hosts upgrade, downgrade, or cancel their plans directly without contacting support.' },
          { title: 'Custom ACF Blocks', body: 'Advanced Custom Fields (ACF) Pro blocks power the dashboard widgets, device list, and invoice table with no shortcode spaghetti.' },
          { title: 'Support Ticket Integration', body: 'Embedded Zendesk widget linked to the host\'s account ID lets hosts create and track tickets without leaving the portal.' },
        ],
        folderStructure: {
          language: 'bash',
          code: `host-portal-wp/
├── wp-content/
│   ├── themes/
│   │   └── nctv-host/       # Child theme
│   │       ├── functions.php
│   │       ├── blocks/      # ACF Pro blocks
│   │       └── templates/
│   └── plugins/
│       └── nctv-core/       # Custom plugin`,
        },
        gettingStarted: [
          { title: 'Clone & Setup', description: 'Clone the repo into your local WordPress install.', code: 'git clone git@github.com:nctv/host-portal-wp.git\n# Place in wp-content/themes/nctv-host', language: 'bash' },
          { title: 'Install Dependencies', description: 'Install PHP and Node dependencies.', code: 'composer install\nnpm install', language: 'bash' },
          { title: 'Local WP Environment', description: 'Use Local by Flywheel for the dev environment.', code: '# Import the .sql dump via Local\n# Then activate the nctv-host theme', language: 'bash' },
        ],
        contacts: [
          { name: 'Diana Reyes', role: 'Web Dev Lead', initials: 'DR', color: '#F97316' },
        ],
        links: [
          { label: 'GitHub Repo', url: '#', type: 'repo' },
          { label: 'WP Engine', url: '#', type: 'deploy' },
        ],
      },
    },
    {
      id: 'wd-docs-site',
      name: 'Public Docs Site',
      description: 'Developer-facing documentation site for the NCompassTV public API.',
      status: 'Dev',
      icon: '📖',
      teamKey: 'webdev',
      teamColor: '#F97316',
      doc: {
        meta: { stack: 'Docusaurus 3 · MDX · OpenAPI Plugin', repo: 'nctv/public-docs', deploy: 'Cloudflare Pages', sprint: 'Sprint 41' },
        purpose: 'The Public Docs Site is a Docusaurus 3 site providing API reference documentation, integration guides, and SDK examples for third-party developers integrating with the NCompassTV platform API.',
        features: [
          { title: 'OpenAPI Reference', body: 'Auto-generated REST API reference pages from the ntv360-api OpenAPI 3.1 spec via the docusaurus-plugin-openapi-docs plugin.' },
          { title: 'MDX Guides', body: 'Long-form integration guides written in MDX, enabling interactive code tabs, callout blocks, and live code sandboxes.' },
          { title: 'Versioned Docs', body: 'Docusaurus versioning keeps v1 and v2 API docs accessible simultaneously as the platform evolves.' },
        ],
        folderStructure: {
          language: 'bash',
          code: `public-docs/
├── docs/
│   ├── getting-started/
│   ├── guides/
│   └── api/
├── openapi/
│   └── ntv360-api.yaml      # Synced from monorepo
├── src/
│   └── pages/
└── docusaurus.config.ts`,
        },
        gettingStarted: [
          { title: 'Clone & Install', description: 'Clone the docs repo and install.', code: 'git clone git@github.com:nctv/public-docs.git && npm i', language: 'bash' },
          { title: 'Generate API Docs', description: 'Run the OpenAPI doc generation script.', code: 'npm run gen:api', language: 'bash' },
          { title: 'Start Dev Server', description: 'Launch Docusaurus locally.', code: 'npm start\n# Opens at http://localhost:3000', language: 'bash' },
        ],
        contacts: [
          { name: 'Sam Nguyen', role: 'Web Developer', initials: 'SN', color: '#8DCB2C' },
        ],
        links: [
          { label: 'GitHub Repo', url: '#', type: 'repo' },
          { label: 'Live Docs Site', url: '#', type: 'docs' },
        ],
      },
    },
  ],
  sections: [
    {
      id: 'wd-tech-stack',
      label: 'Tech Stack Overview',
      num: '01',
      content: {
        type: 'tech-stack',
        table: {
          headers: ['Technology', 'Version', 'Purpose', 'Status'],
          rows: [
            { cells: ['Next.js', '14.x', 'React framework for public-facing marketing and landing pages', 'Live'] },
            { cells: ['WordPress', '6.x', 'CMS for the host portal and content-heavy properties', 'Live'] },
            { cells: ['Tailwind CSS', 'v4.1', 'Utility-first CSS for all Next.js and custom theme work', 'Live'] },
            { cells: ['Contentful', 'v10', 'Headless CMS powering marketing site content and blog', 'Live'] },
            { cells: ['Docusaurus', '3.x', 'Static site generator for the public developer docs site', 'Dev'] },
            { cells: ['ACF Pro', '6.x', 'Advanced Custom Fields for WordPress block development', 'Live'] },
            { cells: ['Vercel', 'N/A', 'Deployment and preview environments for Next.js sites', 'Live'] },
            { cells: ['Cloudflare Pages', 'N/A', 'Deployment for the Docusaurus docs site with edge caching', 'Dev'] },
          ],
        },
      },
    },
    {
      id: 'wd-getting-started',
      label: 'Getting Started',
      num: '02',
      content: {
        type: 'getting-started',
        steps: [
          { title: 'Clone the Target Repo', description: 'Each web property has its own repository — clone the one you need.', code: 'git clone git@github.com:nctv/<site-repo>.git\ncd <site-repo>', language: 'bash' },
          { title: 'Install Dependencies', description: 'Install Node packages (and Composer packages for WordPress projects).', code: 'npm install\n# WordPress projects also need:\ncomposer install', language: 'bash' },
          { title: 'Configure Environment', description: 'Copy the env template and add API keys for CMS or database access.', code: 'cp .env.example .env.local\n# Fill in CMS tokens, DB credentials, etc.', language: 'bash' },
          { title: 'Start Dev Server', description: 'Launch the local development server for the project.', code: 'npm run dev      # Next.js / Docusaurus\nnpm start        # Docusaurus alternate\n# WordPress: use Local by Flywheel', language: 'bash' },
        ],
        codeBlock: {
          language: 'bash',
          code: `# Marketing site quick-start
git clone git@github.com:nctv/marketing-site.git
cd marketing-site && npm install
cp .env.example .env.local
# Add CONTENTFUL_SPACE_ID + CONTENTFUL_ACCESS_TOKEN
npm run dev`,
        },
      },
    },
    {
      id: 'wd-folder-arch',
      label: 'Folder Architecture',
      num: '03',
      content: {
        type: 'folder-arch',
        cards: [
          { title: 'app/ (Next.js)', body: 'App Router pages and layouts. Each route segment is a folder with page.tsx, layout.tsx, and loading.tsx. All data fetching is server-side via fetch() with ISR revalidation.' },
          { title: 'components/', body: 'Shared UI components used across multiple pages. Presentational only — no data fetching. Styled with Tailwind utility classes directly (no BEM/SCSS — this is not an Angular project).' },
          { title: 'lib/', body: 'CMS clients (Contentful), utility functions, and type definitions. All external API calls live here, keeping components free of fetch logic.' },
          { title: 'wp-content/themes/nctv-*/ (WordPress)', body: 'Child theme directory containing functions.php, ACF block definitions, and Twig/PHP templates. All custom logic lives in the nctv-core plugin, not the theme.' },
        ],
        codeBlock: {
          language: 'bash',
          code: `# Next.js structure
marketing-site/
├── app/
│   ├── (marketing)/
│   │   ├── page.tsx
│   │   └── about/page.tsx
│   └── layout.tsx
├── components/
│   ├── hero.tsx
│   └── nav.tsx
└── lib/
    └── contentful.ts

# WordPress structure
host-portal-wp/
└── wp-content/
    ├── themes/nctv-host/
    └── plugins/nctv-core/`,
        },
      },
    },
    {
      id: 'wd-coding-patterns',
      label: 'Coding Patterns',
      num: '04',
      content: {
        type: 'coding-patterns',
        patterns: [
          {
            title: 'Server Components with ISR (Next.js)',
            description: 'Fetch CMS content in async React Server Components. Use next/cache revalidation tags instead of time-based ISR where fine-grained cache invalidation is needed.',
            codeBlock: {
              language: 'typescript',
              code: `// app/(marketing)/blog/[slug]/page.tsx
import { getPost } from '@/lib/contentful';

export default async function BlogPost({
  params,
}: {
  params: { slug: string };
}): Promise<JSX.Element> {
  const post = await getPost(params.slug);

  return (
    <article>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
    </article>
  );
}

export const revalidate = 3600; // 1-hour ISR`,
            },
            callout: { type: 'tip', title: 'Prefer Server Components', body: 'Only add \'use client\' when you need browser APIs or event handlers. Data fetching, SEO metadata, and layout should stay server-side.' },
          },
          {
            title: 'ACF Block Registration (WordPress)',
            description: 'Register all custom Gutenberg blocks via acf_register_block_type() in the nctv-core plugin. Block templates live in the theme\'s blocks/ folder as PHP partials.',
            codeBlock: {
              language: 'php',
              code: `// plugins/nctv-core/blocks.php
add_action('acf/init', function (): void {
  acf_register_block_type([
    'name'            => 'nctv-feature-grid',
    'title'           => 'Feature Grid',
    'render_template' => get_template_directory()
                         . '/blocks/feature-grid.php',
    'category'        => 'nctv',
    'icon'            => 'grid-view',
    'keywords'        => ['features', 'grid'],
  ]);
});`,
            },
            callout: { type: 'warning', title: 'No logic in templates', body: 'Block PHP templates should only call get_field() and echo output. All business logic belongs in the nctv-core plugin, not the theme template.' },
          },
          {
            title: 'Metadata & SEO (Next.js)',
            description: 'Export a generateMetadata() function from every page to provide dynamic Open Graph, Twitter card, and canonical URL metadata.',
            codeBlock: {
              language: 'typescript',
              code: `import type { Metadata } from 'next';
import { getPost } from '@/lib/contentful';

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = await getPost(params.slug);
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      images: [post.heroImage.url],
    },
    alternates: { canonical: \`/blog/\${params.slug}\` },
  };
}`,
            },
          },
        ],
      },
    },
    {
      id: 'wd-mistakes',
      label: 'Common Mistakes',
      num: '05',
      content: {
        type: 'mistakes',
        table: {
          headers: ['❌ Mistake', '✅ Correct Approach'],
          rows: [
            { cells: ["Adding 'use client' to every component", 'Only add use client when browser APIs or event handlers are needed'] },
            { cells: ['Fetching CMS data inside a Client Component', 'Fetch in an async Server Component and pass data as props'] },
            { cells: ['Hard-coding copy text in JSX', 'Drive all copy from the Contentful CMS so marketing can update without a deploy'] },
            { cells: ['Business logic in WordPress block templates', 'Keep templates as pure output; move logic to the nctv-core plugin'] },
            { cells: ['Pushing directly to the WordPress production DB', 'Use WP Engine\'s push/pull workflow — always pull prod → local, push local → staging'] },
            { cells: ['Missing revalidate export on Next.js pages', 'Set export const revalidate = N or use revalidateTag() for cache invalidation'] },
          ],
        },
      },
    },
    {
      id: 'wd-projects',
      label: 'Projects',
      num: '06',
      content: { type: 'projects' },
    },
  ],
};
