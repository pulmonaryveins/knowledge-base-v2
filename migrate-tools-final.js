// ── FILE: c:\Users\ocliasa\knowledge-base-v2\migrate-tools-final.js ──

/**
 * FINAL SELF-CONTAINED MIGRATION SCRIPT
 * This script contains the hardcoded data to bypass all environment/import issues.
 */

const STRAPI_URL = 'http://localhost:1337/api/tools';
const TOKEN = process.env.STRAPI_ADMIN_TOKEN;

const tools = [
  {
    key: 'angular',
    label: 'Angular',
    iconKey: 'atom',
    logoUrl: 'https://cdn.simpleicons.org/angular/DD0031',
    color: '#DD0031',
    category: 'Frontend Framework',
    version: '21.x',
    description:
      'Angular is a TypeScript-based platform and framework for building single-page client applications. NCompassTV uses Angular as the primary frontend framework for all operator-facing dashboards and portals, leveraging its strict type system and built-in tooling for large-scale maintainability.',
    website: 'https://angular.dev',
    usedBy: ['Frontend'],
    features: [
      {
        title: 'Standalone Components',
        body: 'Angular 17+ uses standalone components by default, eliminating NgModules and reducing boilerplate for a cleaner, more maintainable codebase.',
      },
      {
        title: 'Signals-Based Reactivity',
        body: 'Zone-free change detection using Angular Signals delivers fine-grained reactivity with predictable performance across large component trees.',
      },
      {
        title: 'Typed Reactive Forms',
        body: 'Strictly typed reactive forms catch form control errors at compile time, preventing runtime bugs in data-entry workflows.',
      },
      {
        title: 'Built-in Deferred Loading',
        body: '@defer blocks enable lazy rendering of heavy UI sections, reducing initial load time and improving Core Web Vitals scores.',
      },
    ],
    whyWeUseIt:
      "Angular's strict TypeScript support, comprehensive built-in tooling, and signals-based reactivity make it the ideal choice for building large, maintainable enterprise dashboards like the NCompassTV operator portal.",
    install: [
      {
        title: 'Prerequisites',
        description:
          'Verify Node.js 18 or later is installed. The Angular CLI requires it at minimum.',
        code: `node --version   # >= 18.x required\nnpm --version`,
        language: 'bash',
      },
      {
        title: 'Install Angular CLI',
        description: 'Install the CLI globally so you can run ng commands anywhere.',
        code: `npm install -g @angular/cli@latest\nng version`,
        language: 'bash',
      },
      {
        title: 'Create & Serve a Project',
        description: 'Scaffold a new workspace with SCSS, standalone components, and no SSR.',
        code: `ng new my-app --style=scss --standalone --ssr=false\ncd my-app\nng serve`,
        language: 'bash',
      },
    ],
    basicUse: [
      {
        title: 'Generate a Standalone Component',
        description:
          'Use the CLI to scaffold a typed, standalone component inside a feature folder.',
        code: `ng generate component features/dashboard --standalone`,
        language: 'bash',
      },
      {
        title: 'Signals & Computed Values',
        description:
          'Use signal() and computed() for reactive, zone-free state — the standard pattern in Angular 17+.',
        code: `import { Component, signal, computed } from '@angular/core';\n\n@Component({\n  selector: 'app-counter',\n  standalone: true,\n  template: \\\`\n    <button (click)="count.update(v => v + 1)">Increment</button>\n    <p>Count: {{ count() }}  |  Double: {{ double() }}</p>\n  \\\`,\n})\nexport class CounterComponent {\n  protected readonly count = signal(0);\n  protected readonly double = computed(() => this.count() * 2);\n}`,
        language: 'typescript',
      },
      {
        title: 'HTTP Client with inject()',
        description: "Use Angular's inject() in a service to fetch typed data from the NestJS API.",
        code: `import { Injectable, inject } from '@angular/core';\nimport { HttpClient } from '@angular/common/http';\n\n@Injectable({ providedIn: 'root' })\nexport class UsersService {\n  private readonly http = inject(HttpClient);\n\n  getUsers() {\n    return this.http.get<User[]>('/api/users');\n  }\n}`,
        language: 'typescript',
      },
    ],
  },
  {
    key: 'nextjs',
    label: 'Next.js',
    iconKey: 'globe',
    logoUrl: 'https://cdn.simpleicons.org/nextdotjs/FFFFFF',
    color: '#c8d3e0',
    category: 'Full-Stack Framework',
    version: '14.x',
    description:
      'Next.js is a React framework that provides server-side rendering, static site generation, and full-stack capabilities out of the box. It is used by the Web Development team for public-facing sites, landing pages, and content-driven portals.',
    website: 'https://nextjs.org',
    usedBy: ['Web Development'],
    features: [
      {
        title: 'App Router',
        body: 'The App Router leverages React Server Components to co-locate data fetching with UI, reducing client-side JavaScript and improving Time To First Byte.',
      },
      {
        title: 'Static & Server Rendering',
        body: 'Supports SSG, SSR, and ISR in a single project, allowing each route to choose the optimal rendering strategy independently.',
      },
      {
        title: 'API Routes',
        body: 'Built-in API route support lets the Web Dev team build lightweight backend endpoints without a separate server process.',
      },
      {
        title: 'Image Optimisation',
        body: 'Automatic image resizing, lazy loading, and WebP conversion via the built-in Image component improve Lighthouse scores with zero configuration.',
      },
    ],
    whyWeUseIt:
      "Next.js provides a mature full-stack foundation for marketing sites and SEO-sensitive pages where Angular's SPA model introduces unnecessary complexity.",
    install: [
      {
        title: 'Prerequisites',
        description: 'Verify Node.js 18 or later is installed.',
        code: `node --version   # >= 18.x required`,
        language: 'bash',
      },
      {
        title: 'Create a Next.js App',
        description:
          'Use create-next-app to scaffold with TypeScript, ESLint, Tailwind, and the App Router.',
        code: `npx create-next-app@latest my-app \\\n  --typescript \\\n  --tailwind \\\n  --eslint \\\n  --app`,
        language: 'bash',
      },
      {
        title: 'Run the Dev Server',
        description: 'Start the local dev server with hot-reload at http://localhost:3000.',
        code: `cd my-app\nnpm run dev`,
        language: 'bash',
      },
    ],
    basicUse: [
      {
        title: 'Server Component Page',
        description:
          'App Router pages are React Server Components by default — fetch data directly in the component body.',
        code: `// app/page.tsx\nexport default async function HomePage() {\n  const data = await fetch('https://api.example.com/items').then(r => r.json());\n\n  return (\n    <main>\n      <h1>NCompassTV Portal</h1>\n      <ul>\n        {data.map((item: { id: number; name: string }) => (\n          <li key={item.id}>{item.name}</li>\n        ))}\n      </ul>\n    </main>\n  );\n}`,
        language: 'tsx',
      },
      {
        title: 'API Route Handler',
        description: 'Define a lightweight REST endpoint using App Router route handlers.',
        code: `// app/api/status/route.ts\nimport { NextResponse } from 'next/server';\n\nexport async function GET() {\n  return NextResponse.json({ status: 'ok', timestamp: Date.now() });\n}`,
        language: 'typescript',
      },
    ],
  },
  {
    key: 'typeorm',
    label: 'TypeORM',
    iconKey: 'database',
    logoUrl: 'https://cdn.simpleicons.org/typeorm/E4A44A',
    color: '#E4A44A',
    category: 'ORM / Data Layer',
    version: '0.3.x',
    description:
      'TypeORM is an ORM for TypeScript and JavaScript that supports both Active Record and Data Mapper patterns. The Backend team uses it to interact with MySQL databases through strongly-typed entity classes, keeping database access type-safe from entity to controller.',
    website: 'https://typeorm.io',
    usedBy: ['Backend'],
    features: [
      {
        title: 'Entity Decorators',
        body: 'TypeORM entities use TypeScript decorators to define database schema directly in code, keeping schema and model in sync without a separate migration tool.',
      },
      {
        title: 'Migrations',
        body: 'Auto-generated and hand-written migrations track schema changes over time, enabling safe deploys with reversible rollbacks.',
      },
      {
        title: 'Repository Pattern',
        body: 'Custom repositories provide a clean abstraction over raw SQL, making data access logic testable and consistent across all NestJS services.',
      },
      {
        title: 'Relations Support',
        body: 'First-class support for OneToOne, OneToMany, and ManyToMany relations with configurable eager and lazy loading strategies.',
      },
    ],
    whyWeUseIt:
      "TypeORM's seamless TypeScript integration and MySQL support made it the natural choice for the NestJS-based backend, enabling type-safe data access from entity model to REST response.",
    install: [
      {
        title: 'Install Packages',
        description:
          'Install TypeORM, the MySQL driver, and reflect-metadata (required for decorators).',
        code: `npm install typeorm mysql2 reflect-metadata\nnpm install -D @types/node`,
        language: 'bash',
      },
      {
        title: 'Enable Decorator Metadata',
        description:
          'Add these two options to your tsconfig.json to allow TypeORM decorators to work.',
        code: `// tsconfig.json\n{\n  "compilerOptions": {\n    "experimentalDecorators": true,\n    "emitDecoratorMetadata": true\n  }\n}`,
        language: 'json',
      },
      {
        title: 'Configure DataSource',
        description: 'Create a DataSource that connects TypeORM to your MySQL database.',
        code: `import { DataSource } from 'typeorm';\n\nexport const AppDataSource = new DataSource({\n  type: 'mysql',\n  host: process.env.DB_HOST,\n  port: 3306,\n  username: process.env.DB_USER,\n  password: process.env.DB_PASS,\n  database: process.env.DB_NAME,\n  entities: [__dirname + '/entities/**/*.entity.ts'],\n  synchronize: false, // use migrations in production\n});`,
        language: 'typescript',
      },
    ],
    basicUse: [
      {
        title: 'Define an Entity',
        description:
          'Use decorator-based schema definition — TypeORM synchronises the class with the database table.',
        code: `import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';\n\n@Entity('users')\nexport class User {\n  @PrimaryGeneratedColumn()\n  id: number;\n\n  @Column({ length: 100 })\n  name: string;\n\n  @Column({ unique: true })\n  email: string;\n\n  @CreateDateColumn()\n  createdAt: Date;\n}`,
        language: 'typescript',
      },
      {
        title: 'Repository Queries',
        description: 'Inject a repository to run typed queries without writing raw SQL.',
        code: `import { Injectable } from '@nestjs/common';\nimport { InjectRepository } from '@nestjs/typeorm';\nimport { Repository } from 'typeorm';\nimport { User } from './user.entity';\n\n@Injectable()\nexport class UsersService {\n  constructor(\n    @InjectRepository(User)\n    private readonly users: Repository<User>,\n  ) {}\n\n  findAll() {\n    return this.users.find({ order: { createdAt: 'DESC' } });\n  }\n\n  findByEmail(email: string) {\n    return this.users.findOneBy({ email });\n  }\n}`,
        language: 'typescript',
      },
    ],
  },
  {
    key: 'mysql',
    label: 'MySQL',
    iconKey: 'hard-drive',
    logoUrl: 'https://cdn.simpleicons.org/mysql/4479A1',
    color: '#4479A1',
    category: 'Relational Database',
    version: '8.x',
    description:
      'MySQL is an open-source relational database management system. NCompassTV uses MySQL 8 as the primary production database for all structured data, managed through TypeORM on the NestJS backend with InnoDB engine for full ACID compliance.',
    website: 'https://mysql.com',
    usedBy: ['Backend'],
    features: [
      {
        title: 'ACID Compliance',
        body: 'Full ACID transaction support ensures data integrity across all write operations, critical for financial and scheduling data in the NCompassTV platform.',
      },
      {
        title: 'InnoDB Engine',
        body: 'InnoDB provides row-level locking and foreign key constraints, enabling safe concurrent access to production data without table-level collisions.',
      },
      {
        title: 'JSON Column Support',
        body: 'Native JSON column type allows semi-structured data storage with the ability to query nested fields via generated columns and indexes.',
      },
      {
        title: 'Full-Text Search',
        body: 'Built-in full-text indexing enables efficient keyword searches across large text fields without requiring a separate search engine.',
      },
    ],
    whyWeUseIt:
      "MySQL 8's maturity, strong ecosystem, and tight TypeORM integration made it the reliable choice for NCompassTV's production workloads with proven performance at scale.",
    install: [
      {
        title: 'Install MySQL 8 (Ubuntu/Debian)',
        description: 'Install MySQL server from the system package manager.',
        code: `sudo apt update\nsudo apt install -y mysql-server`,
        language: 'bash',
      },
      {
        title: 'Secure & Start',
        description:
          'Start the service and run the interactive security setup to set the root password.',
        code: `sudo systemctl start mysql\nsudo systemctl enable mysql\nsudo mysql_secure_installation`,
        language: 'bash',
      },
      {
        title: 'Connect & Create Database',
        description: 'Log in as root and create the application database and a dedicated user.',
        code: `mysql -u root -p\n\nCREATE DATABASE ncompass CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;\nCREATE USER 'nctv'@'localhost' IDENTIFIED BY 'strongpassword';\nGRANT ALL PRIVILEGES ON ncompass.* TO 'nctv'@'localhost';\nFLUSH PRIVILEGES;`,
        language: 'sql',
      },
    ],
    basicUse: [
      {
        title: 'Create Tables & Insert Data',
        description: 'Basic DDL and DML to define a table and insert a row.',
        code: `USE ncompass;\n\nCREATE TABLE users (\n  id         INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,\n  name       VARCHAR(100)        NOT NULL,\n  email      VARCHAR(255) UNIQUE NOT NULL,\n  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP\n);\n\nINSERT INTO users (name, email) VALUES ('Alice', 'alice@nctv.com');`,
        language: 'sql',
      },
      {
        title: 'Queries & Joins',
        description: 'Filter, sort, and join tables using standard SQL syntax.',
        code: `-- Filter with LIKE\nSELECT id, name, email FROM users\nWHERE name LIKE '%alice%'\nORDER BY created_at DESC\nLIMIT 10;\n\n-- Inner join example\nSELECT u.name, o.total\nFROM users u\nJOIN orders o ON o.user_id = u.id\nWHERE o.total > 100;`,
        language: 'sql',
      },
    ],
  },
  {
    key: 'astro',
    label: 'Astro',
    iconKey: 'rocket',
    logoUrl: 'https://cdn.simpleicons.org/astro/FF7E33',
    color: '#FF7E33',
    category: 'Static Site Builder',
    version: '4.x',
    description:
      'Astro is a web framework focused on content-driven websites that ships zero JavaScript by default. The Web Development team uses it for fast, static marketing pages and documentation sites where Core Web Vitals scores directly impact SEO rankings.',
    website: 'https://astro.build',
    usedBy: ['Web Development'],
    features: [
      {
        title: 'Islands Architecture',
        body: "Astro's Islands model hydrates only interactive components, keeping the majority of the page as static HTML for near-instant load times.",
      },
      {
        title: 'Zero JS by Default',
        body: 'Pages ship no JavaScript unless explicitly opted in, drastically reducing bundle size for content-heavy marketing and documentation pages.',
      },
      {
        title: 'Multi-Framework Support',
        body: 'Use React, Vue, Svelte, or plain HTML in the same project — each island can run a different framework without conflicts.',
      },
      {
        title: 'Content Collections',
        body: 'Type-safe content collections with Zod validation keep Markdown and MDX content structured, queryable, and refactor-friendly.',
      },
    ],
    whyWeUseIt:
      "Astro's performance-first approach makes it ideal for NCompassTV's documentation and marketing pages where Core Web Vitals scores directly affect organic search visibility.",
    install: [
      {
        title: 'Scaffold a New Site',
        description:
          'Run the interactive CLI wizard — choose the "Minimal" template and enable TypeScript.',
        code: `npm create astro@latest my-site`,
        language: 'bash',
      },
      {
        title: 'Run the Dev Server',
        description:
          'Start Astro in dev mode with hot module replacement at http://localhost:4321.',
        code: `cd my-site\nnpm install\nnpm run dev`,
        language: 'bash',
      },
      {
        title: 'Add an Integration',
        description:
          'Use astro add to install official integrations like Tailwind or React with one command.',
        code: `npx astro add tailwind\nnpx astro add react`,
        language: 'bash',
      },
    ],
    basicUse: [
      {
        title: 'Astro Page Component',
        description:
          'Pages live in src/pages/. The frontmatter fence (---) is server-only JavaScript.',
        code: `---\n// src/pages/index.astro\nconst title = 'NCompassTV Docs';\nconst items = await fetch('/api/products').then(r => r.json());\n---\n<html lang="en">\n  <head><title>{title}</title></head>\n  <body>\n    <h1>{title}</h1>\n    <ul>\n      {items.map((item: { id: number; name: string }) => (\n        <li>{item.name}</li>\n      ))}\n    </ul>\n  </body>\n</html>`,
        language: 'astro',
      },
      {
        title: 'Content Collections',
        description: 'Define a type-safe schema for Markdown content and query it at build time.',
        code: `// src/content/config.ts\nimport { z, defineCollection } from 'astro:content';\n\nconst blog = defineCollection({\n  schema: z.object({\n    title: z.string(),\n    date: z.coerce.date(),\n    draft: z.boolean().default(false),\n  }),\n});\n\nexport const collections = { blog };\n\n// Usage in a page:\nimport { getCollection } from 'astro:content';\nconst posts = await getCollection('blog', ({ data }) => !data.draft);`,
        language: 'typescript',
      },
    ],
  },
  {
    key: 'tailwind',
    label: 'Tailwind CSS',
    iconKey: 'wind',
    logoUrl: 'https://cdn.simpleicons.org/tailwindcss/38BDF8',
    color: '#38BDF8',
    category: 'CSS Utility Framework',
    version: '4.x',
    description:
      'Tailwind CSS is a utility-first CSS framework providing low-level utility classes for building designs directly in markup. All NCompassTV frontend teams use Tailwind exclusively for styling, bridging design tokens from Figma to production CSS through CSS custom properties.',
    website: 'https://tailwindcss.com',
    usedBy: ['Frontend', 'Web Development', 'UI / UX'],
    features: [
      {
        title: 'Utility-First Styling',
        body: 'Atomic utility classes eliminate custom CSS files, keeping styles co-located with markup and making component extraction trivial across the codebase.',
      },
      {
        title: 'Design Token Integration',
        body: "Tailwind's config extends naturally with NCompassTV's design tokens, bridging Figma variables and production CSS via CSS custom properties seamlessly.",
      },
      {
        title: 'JIT Compiler',
        body: 'The Just-In-Time engine generates only the classes actually used in source files, keeping production CSS bundles minimal with no purge configuration.',
      },
      {
        title: 'Responsive Modifiers',
        body: 'Mobile-first responsive modifiers (sm:, md:, lg:) make breakpoint-aware layouts declarative and readable directly in the HTML markup.',
      },
    ],
    whyWeUseIt:
      "Tailwind's design token compatibility and utility-first philosophy align perfectly with the NCompassTV component library, enabling fast iteration without context-switching between HTML and separate CSS files.",
    install: [
      {
        title: 'Install Tailwind CSS',
        description: 'Install Tailwind and its peer dependencies as dev dependencies.',
        code: `npm install -D tailwindcss postcss autoprefixer\nnpx tailwindcss init -p`,
        language: 'bash',
      },
      {
        title: 'Configure Content Paths',
        description: 'Tell Tailwind where your templates live so it can tree-shake unused classes.',
        code: `// tailwind.config.ts\nimport type { Config } from 'tailwindcss';\n\nexport default {\n  content: [\n    './src/**/*.{html,ts,tsx,astro}',\n  ],\n  theme: {\n    extend: {\n      colors: {\n        navy: 'var(--navy)',\n        green: 'var(--green)',\n      },\n    },\n  },\n} satisfies Config;`,
        language: 'typescript',
      },
      {
        title: 'Add Directives to CSS',
        description: 'Import Tailwind base, components, and utilities into your global stylesheet.',
        code: `/* src/styles.scss */\n@import "tailwindcss";\n\n/* Your global custom properties */\n:root {\n  --navy: #091635;\n  --green: #8DCB2C;\n}`,
        language: 'scss',
      },
    ],
    basicUse: [
      {
        title: 'Utility Classes in HTML',
        description:
          'Compose layouts and visual styles directly in markup without leaving your template.',
        code: `<button class="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-600\n               text-white font-semibold text-sm px-4 py-2 rounded-lg\n               transition-colors duration-150 focus:outline-none\n               focus:ring-2 focus:ring-blue-400 focus:ring-offset-2">\n  Save Changes\n</button>`,
        language: 'html',
      },
      {
        title: 'Responsive & State Variants',
        description:
          'Use responsive prefixes and state variants for adaptive, interactive designs.',
        code: `<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4">\n  <div class="p-6 rounded-lg bg-white hover:shadow-lg transition-shadow\n              dark:bg-gray-800 dark:text-white">\n    Card content\n  </div>\n</div>`,
        language: 'html',
      },
    ],
  },
  {
    key: 'docker',
    label: 'Docker',
    iconKey: 'container',
    logoUrl: 'https://cdn.simpleicons.org/docker/2496ED',
    color: '#2496ED',
    category: 'Containerisation',
    version: '26.x',
    description:
      'Docker is a platform for building, shipping, and running applications in isolated containers. The Backend and QA teams use Docker to ensure consistent, reproducible environments across local development, CI pipelines, and production deployments.',
    website: 'https://docker.com',
    usedBy: ['Backend', 'Quality Assurance'],
    features: [
      {
        title: 'Consistent Environments',
        body: 'Docker containers package application code and all its dependencies, eliminating environment drift between developer machines, CI runners, and production.',
      },
      {
        title: 'Docker Compose',
        body: 'Multi-service orchestration with docker-compose.yml spins up the full NCompassTV stack — API, MySQL, and Redis — with a single command.',
      },
      {
        title: 'Layer Caching',
        body: "Docker's layer cache speeds up CI/CD pipelines by reusing unchanged build layers between commits, cutting average build time significantly.",
      },
      {
        title: 'Production Parity',
        body: 'Local containers mirror the production environment, catching environment-specific bugs in development before they reach staging or production.',
      },
    ],
    whyWeUseIt:
      "Docker removes environment drift between the team's machines, CI runners, and production, making every deployment a known and reproducible artifact.",
    install: [
      {
        title: 'Install Docker Engine (Ubuntu)',
        description: 'Use the official convenience script to install Docker Engine and CLI.',
        code: `curl -fsSL https://get.docker.com | sh\nsudo usermod -aG docker $USER\nnewgrp docker`,
        language: 'bash',
      },
      {
        title: 'Verify Installation',
        description: 'Confirm both Docker Engine and Compose plugin are available.',
        code: `docker --version\ndocker compose version\ndocker run --rm hello-world`,
        language: 'bash',
      },
      {
        title: 'Install Docker Desktop (Windows / macOS)',
        description:
          'Download and install Docker Desktop which bundles the engine, CLI, and Compose.',
        code: `# Download from https://docs.docker.com/get-started/get-docker/\n# After install, verify:\ndocker version`,
        language: 'bash',
      },
    ],
    basicUse: [
      {
        title: 'Dockerfile for a Node.js API',
        description:
          'Multi-stage build that keeps the production image small by discarding dev dependencies.',
        code: `# Build stage\nFROM node:20-alpine AS builder\nWORKDIR /app\nCOPY package*.json ./\nRUN npm ci\nCOPY . .\nRUN npm run build\n\n# Production stage\nFROM node:20-alpine\nWORKDIR /app\nCOPY --from=builder /app/dist ./dist\nCOPY --from=builder /app/node_modules ./node_modules\nEXPOSE 3000\nCMD ["node", "dist/main.js"]`,
        language: 'dockerfile',
      },
      {
        title: 'Docker Compose Stack',
        description:
          'Define the full NCompassTV local stack — API + MySQL — in a single compose file.',
        code: `services:\n  api:\n    build: .\n    ports:\n      - "3000:3000"\n    environment:\n      DB_HOST: db\n      DB_NAME: ncompass\n    depends_on:\n      db:\n        condition: service_healthy\n\n  db:\n    image: mysql:8\n    environment:\n      MYSQL_DATABASE: ncompass\n      MYSQL_ROOT_PASSWORD: secret\n    healthcheck:\n      test: ["CMD", "mysqladmin", "ping", "-h", "localhost"]\n      interval: 10s\n      retries: 5`,
        language: 'yaml',
      },
    ],
  },
  {
    key: 'figma',
    label: 'Figma',
    iconKey: 'figma',
    logoUrl: 'https://cdn.simpleicons.org/figma/F24E1E',
    color: '#F24E1E',
    category: 'Design & Prototyping',
    version: 'Enterprise',
    description:
      'Figma is the collaborative design platform used by the UI/UX team for all wireframing, high-fidelity mockups, component libraries, and engineering handoff. It is the single source of truth for all visual design decisions at NCompassTV.',
    website: 'https://figma.com',
    usedBy: ['UI / UX'],
    features: [
      {
        title: 'Component Library',
        body: '120+ reusable Figma components with auto-layout and interactive variants mirror the Angular component library for pixel-perfect design-to-code handoff.',
      },
      {
        title: 'Design Tokens via Variables',
        body: 'Figma Variables sync with Style Dictionary to export design tokens as CSS custom properties, SCSS variables, and JSON for cross-platform use.',
      },
      {
        title: 'Dev Mode',
        body: 'Dev Mode provides engineers with CSS specs, spacing annotations, color tokens, and asset exports directly from the design file, reducing back-and-forth.',
      },
      {
        title: 'FigJam Workshops',
        body: 'FigJam boards facilitate user journey mapping, stakeholder workshops, usability synthesis, and sprint retrospectives in a shared digital workspace.',
      },
    ],
    whyWeUseIt:
      "Figma's real-time collaboration model keeps designers and engineers aligned, reducing handoff friction and ensuring that the component library in code always reflects the design source of truth.",
    install: [
      {
        title: 'Download Figma Desktop',
        description: 'Install the native desktop app for the best performance and offline access.',
        code: `# Visit https://www.figma.com/downloads/\n# Available for Windows, macOS, and Linux (Snap/AppImage)\n\n# Linux (Snap):\nsudo snap install figma-linux`,
        language: 'bash',
      },
      {
        title: 'Access the NCompassTV Workspace',
        description: 'Request access to the shared team workspace from the UI/UX lead.',
        code: `# 1. Sign in at https://figma.com with your @ncompasstv.com email\n# 2. Ask @lena-morozova or @carlos-vega to invite you to:\n#    "NCompassTV Design System" team\n# 3. You will receive an email invite — click to join`,
        language: 'bash',
      },
      {
        title: 'Install Required Plugins',
        description: 'Install these plugins from the Figma Community for the team workflow.',
        code: `# Essential plugins (search in: Main Menu > Plugins > Browse plugins):\n# - Tokens Studio for Figma  (design token sync)\n# - Figma Contrast           (WCAG 2.1 contrast checker)\n# - Iconify                  (icon library browser)\n# - Unsplash                 (stock photo placeholder images)`,
        language: 'bash',
      },
    ],
    basicUse: [
      {
        title: 'Create a Component',
        description:
          "Select a frame and convert it to a reusable component — it will appear in the team's asset panel.",
        code: `# Create component:   Ctrl+Alt+K  (Windows) / Cmd+Option+K (Mac)\n# Duplicate instance:  Ctrl+D              / Cmd+D\n# Edit main component: Dbl-click instance → "Go to main component"\n# Add variant:         Select component → "Add variant" in right panel`,
        language: 'bash',
      },
      {
        title: 'Inspect & Export for Dev Handoff',
        description:
          'Switch to Dev Mode to let engineers copy CSS values, spacing, and exported assets.',
        code: `# Enter Dev Mode:    Press D  (or toggle top-right toolbar)\n# Copy CSS:           Select any layer → "Code" panel → copy CSS snippet\n# Export asset:       Select layer → right panel "Export" → choose SVG/PNG\n# View token values:  Hover a colour/spacing → Tokens Studio panel shows variable name`,
        language: 'bash',
      },
    ],
  },
  {
    key: 'python',
    label: 'Python',
    iconKey: 'code',
    logoUrl: 'https://cdn.simpleicons.org/python/3572A5',
    color: '#3572A5',
    category: 'Programming Language',
    version: '3.12',
    description:
      'Python is a high-level, general-purpose programming language used by the QA and R&D teams for test automation, data analysis scripts, and feature prototyping before production implementation in TypeScript.',
    website: 'https://python.org',
    usedBy: ['Quality Assurance', 'Research & Development'],
    features: [
      {
        title: 'Test Automation',
        body: 'The QA team uses Pytest and Playwright bindings to write end-to-end and integration tests against the NCompassTV API and browser UI layers.',
      },
      {
        title: 'Data Scripting',
        body: 'R&D uses Python for data transformation, analytics prototyping, and generating seeded fixture data for backend integration test suites.',
      },
      {
        title: 'Rich Ecosystem',
        body: 'Libraries like Requests, BeautifulSoup, and Pandas enable rapid scripting of API validation, web scraping, and data-processing pipelines without heavy setup.',
      },
      {
        title: 'Fast Prototyping',
        body: "Python's minimal boilerplate allows R&D to quickly validate algorithms and hypotheses before porting to TypeScript for production implementation.",
      },
    ],
    whyWeUseIt:
      "Python's versatility and rich testing ecosystem make it the go-to for QA automation and R&D experimentation, where speed of iteration takes precedence over strict typing.",
    install: [
      {
        title: 'Install Python 3.12',
        description: 'Install via the system package manager or from python.org.',
        code: `# Ubuntu / Debian\nsudo apt update && sudo apt install -y python3.12 python3-pip python3.12-venv\n\n# macOS (Homebrew)\nbrew install python@3.12\n\n# Verify\npython3 --version && pip3 --version`,
        language: 'bash',
      },
      {
        title: 'Create a Virtual Environment',
        description:
          'Always isolate project dependencies in a venv to avoid polluting the system Python.',
        code: `python3 -m venv .venv\n\n# Activate (Linux / macOS)\nsource .venv/bin/activate\n\n# Activate (Windows PowerShell)\n.\\.venv\\Scripts\\Activate.ps1\n\n# Install deps\npip install -r requirements.txt`,
        language: 'bash',
      },
      {
        title: 'Install Common QA Packages',
        description:
          'Install the packages used by the NCompassTV QA team for API and browser testing.',
        code: `pip install pytest pytest-asyncio requests playwright\npython -m playwright install chromium`,
        language: 'bash',
      },
    ],
    basicUse: [
      {
        title: 'Pytest API Test',
        description: 'Write a simple Pytest test that validates the NestJS health endpoint.',
        code: `# tests/test_health.py\nimport requests\n\nBASE_URL = "http://localhost:3000"\n\ndef test_health_endpoint():\n    resp = requests.get(f"{BASE_URL}/api/health")\n    assert resp.status_code == 200\n    body = resp.json()\n    assert body["status"] == "ok"\n\ndef test_users_returns_list():\n    resp = requests.get(f"{BASE_URL}/api/users")\n    assert resp.status_code == 200\n    assert isinstance(resp.json(), list)\n\n# Run with: pytest tests/ -v`,
        language: 'python',
      },
      {
        title: 'Data Fixture Generator',
        description: 'Generate seeded JSON fixtures for backend integration tests.',
        code: `import json, random, pathlib\nfrom datetime import datetime, timedelta\n\ndef make_user(i: int) -> dict:\n    return {\n        "id": i,\n        "name": f"User {i}",\n        "email": f"user{i}@nctv.com",\n        "createdAt": (datetime.now() - timedelta(days=i)).isoformat(),\n    }\n\nfixtures = [make_user(i) for i in range(1, 51)]\npathlib.Path("fixtures/users.json").write_text(json.dumps(fixtures, indent=2))\nprint(f"Generated {len(fixtures)} user fixtures")`,
        language: 'python',
      },
    ],
  },
];

async function run() {
  if (!TOKEN) {
    console.error('❌ Error: STRAPI_ADMIN_TOKEN is missing.');
    return;
  }

  console.log(`🚀 Starting migration of ${tools.length} tools...`);

  for (const tool of tools) {
    try {
      const { usedBy, ...restOfTool } = tool;
      const payload = {
        data: {
          ...restOfTool,
          usedBy: tool.usedBy,
          features: tool.features,
          install: tool.install,
          basicUse: tool.basicUse,
        },
      };

      // 1. Check if tool already exists
      const checkResponse = await fetch(`${STRAPI_URL}?filters[key][$eq]=${tool.key}`, {
        headers: { Authorization: `Bearer ${TOKEN}` },
      });
      const checkData = await checkResponse.json();
      const existing = checkData.data && checkData.data.length > 0 ? checkData.data[0] : null;

      let response;
      if (existing) {
        // 2. Update existing entry
        console.log(`🔄 Updating: ${tool.label}...`);
        response = await fetch(`${STRAPI_URL}/${existing.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${TOKEN}`,
          },
          body: JSON.stringify(payload),
        });
      } else {
        // 3. Create new entry
        console.log(`🚀 Creating: ${tool.label}...`);
        response = await fetch(STRAPI_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${TOKEN}`,
          },
          body: JSON.stringify(payload),
        });
      }

      if (response.ok) {
        console.log(`✅ Success: ${tool.label}`);
      } else {
        const err = await response.json();
        console.error(`❌ Failed: ${tool.label}`, JSON.stringify(err, null, 2));
      }
    } catch (e) {
      console.error(`💥 Error migrating ${tool.label}:`, e.message);
    }
  }

  console.log('🏁 Migration complete!');
}

run();
