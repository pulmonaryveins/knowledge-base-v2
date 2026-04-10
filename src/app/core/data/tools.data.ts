// â”€â”€ FILE: src/app/core/data/tools.data.ts â”€â”€

import { Tool } from '../models/tool.model';

export const tools: ReadonlyArray<Tool> = [
  {
    key: 'angular',
    label: 'Angular',
    iconKey: 'atom',
    logoUrl: 'https://cdn.simpleicons.org/angular/DD0031',
    color: '#DD0031',
    category: 'Frontend Framework',
    version: '21.x',
    description: 'Angular is a TypeScript-based platform and framework for building single-page client applications. NCompassTV uses Angular as the primary frontend framework for all operator-facing dashboards and portals, leveraging its strict type system and built-in tooling for large-scale maintainability.',
    website: 'https://angular.dev',
    usedBy: ['Frontend'],
    features: [
      { title: 'Standalone Components', body: 'Angular 17+ uses standalone components by default, eliminating NgModules and reducing boilerplate for a cleaner, more maintainable codebase.' },
      { title: 'Signals-Based Reactivity', body: 'Zone-free change detection using Angular Signals delivers fine-grained reactivity with predictable performance across large component trees.' },
      { title: 'Typed Reactive Forms', body: 'Strictly typed reactive forms catch form control errors at compile time, preventing runtime bugs in data-entry workflows.' },
      { title: 'Built-in Deferred Loading', body: '@defer blocks enable lazy rendering of heavy UI sections, reducing initial load time and improving Core Web Vitals scores.' },
    ],
    whyWeUseIt: "Angular's strict TypeScript support, comprehensive built-in tooling, and signals-based reactivity make it the ideal choice for building large, maintainable enterprise dashboards like the NCompassTV operator portal.",
    install: [
      {
        title: 'Prerequisites',
        description: 'Verify Node.js 18 or later is installed. The Angular CLI requires it at minimum.',
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
        description: 'Use the CLI to scaffold a typed, standalone component inside a feature folder.',
        code: `ng generate component features/dashboard --standalone`,
        language: 'bash',
      },
      {
        title: 'Signals & Computed Values',
        description: 'Use signal() and computed() for reactive, zone-free state â€” the standard pattern in Angular 17+.',
        code: `import { Component, signal, computed } from '@angular/core';

@Component({
  selector: 'app-counter',
  standalone: true,
  template: \`
    <button (click)="count.update(v => v + 1)">Increment</button>
    <p>Count: {{ count() }}  |  Double: {{ double() }}</p>
  \`,
})
export class CounterComponent {
  protected readonly count = signal(0);
  protected readonly double = computed(() => this.count() * 2);
}`,
        language: 'typescript',
      },
      {
        title: 'HTTP Client with inject()',
        description: "Use Angular's inject() in a service to fetch typed data from the NestJS API.",
        code: `import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class UsersService {
  private readonly http = inject(HttpClient);

  getUsers() {
    return this.http.get<User[]>('/api/users');
  }
}`,
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
    description: 'Next.js is a React framework that provides server-side rendering, static site generation, and full-stack capabilities out of the box. It is used by the Web Development team for public-facing sites, landing pages, and content-driven portals.',
    website: 'https://nextjs.org',
    usedBy: ['Web Development'],
    features: [
      { title: 'App Router', body: 'The App Router leverages React Server Components to co-locate data fetching with UI, reducing client-side JavaScript and improving Time To First Byte.' },
      { title: 'Static & Server Rendering', body: 'Supports SSG, SSR, and ISR in a single project, allowing each route to choose the optimal rendering strategy independently.' },
      { title: 'API Routes', body: 'Built-in API route support lets the Web Dev team build lightweight backend endpoints without a separate server process.' },
      { title: 'Image Optimisation', body: 'Automatic image resizing, lazy loading, and WebP conversion via the built-in Image component improve Lighthouse scores with zero configuration.' },
    ],
    whyWeUseIt: "Next.js provides a mature full-stack foundation for marketing sites and SEO-sensitive pages where Angular's SPA model introduces unnecessary complexity.",
    install: [
      {
        title: 'Prerequisites',
        description: 'Verify Node.js 18 or later is installed.',
        code: `node --version   # >= 18.x required`,
        language: 'bash',
      },
      {
        title: 'Create a Next.js App',
        description: 'Use create-next-app to scaffold with TypeScript, ESLint, Tailwind, and the App Router.',
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
        description: 'App Router pages are React Server Components by default â€” fetch data directly in the component body.',
        code: `// app/page.tsx
export default async function HomePage() {
  const data = await fetch('https://api.example.com/items').then(r => r.json());

  return (
    <main>
      <h1>NCompassTV Portal</h1>
      <ul>
        {data.map((item: { id: number; name: string }) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </main>
  );
}`,
        language: 'tsx',
      },
      {
        title: 'API Route Handler',
        description: 'Define a lightweight REST endpoint using App Router route handlers.',
        code: `// app/api/status/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ status: 'ok', timestamp: Date.now() });
}`,
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
    description: 'TypeORM is an ORM for TypeScript and JavaScript that supports both Active Record and Data Mapper patterns. The Backend team uses it to interact with MySQL databases through strongly-typed entity classes, keeping database access type-safe from entity to controller.',
    website: 'https://typeorm.io',
    usedBy: ['Backend'],
    features: [
      { title: 'Entity Decorators', body: 'TypeORM entities use TypeScript decorators to define database schema directly in code, keeping schema and model in sync without a separate migration tool.' },
      { title: 'Migrations', body: 'Auto-generated and hand-written migrations track schema changes over time, enabling safe deploys with reversible rollbacks.' },
      { title: 'Repository Pattern', body: 'Custom repositories provide a clean abstraction over raw SQL, making data access logic testable and consistent across all NestJS services.' },
      { title: 'Relations Support', body: 'First-class support for OneToOne, OneToMany, and ManyToMany relations with configurable eager and lazy loading strategies.' },
    ],
    whyWeUseIt: "TypeORM's seamless TypeScript integration and MySQL support made it the natural choice for the NestJS-based backend, enabling type-safe data access from entity model to REST response.",
    install: [
      {
        title: 'Install Packages',
        description: 'Install TypeORM, the MySQL driver, and reflect-metadata (required for decorators).',
        code: `npm install typeorm mysql2 reflect-metadata\nnpm install -D @types/node`,
        language: 'bash',
      },
      {
        title: 'Enable Decorator Metadata',
        description: 'Add these two options to your tsconfig.json to allow TypeORM decorators to work.',
        code: `// tsconfig.json
{
  "compilerOptions": {
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true
  }
}`,
        language: 'json',
      },
      {
        title: 'Configure DataSource',
        description: 'Create a DataSource that connects TypeORM to your MySQL database.',
        code: `import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: 3306,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: [__dirname + '/entities/**/*.entity.ts'],
  synchronize: false, // use migrations in production
});`,
        language: 'typescript',
      },
    ],
    basicUse: [
      {
        title: 'Define an Entity',
        description: 'Use decorator-based schema definition â€” TypeORM synchronises the class with the database table.',
        code: `import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column({ unique: true })
  email: string;

  @CreateDateColumn()
  createdAt: Date;
}`,
        language: 'typescript',
      },
      {
        title: 'Repository Queries',
        description: 'Inject a repository to run typed queries without writing raw SQL.',
        code: `import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly users: Repository<User>,
  ) {}

  findAll() {
    return this.users.find({ order: { createdAt: 'DESC' } });
  }

  findByEmail(email: string) {
    return this.users.findOneBy({ email });
  }
}`,
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
    description: 'MySQL is an open-source relational database management system. NCompassTV uses MySQL 8 as the primary production database for all structured data, managed through TypeORM on the NestJS backend with InnoDB engine for full ACID compliance.',
    website: 'https://mysql.com',
    usedBy: ['Backend'],
    features: [
      { title: 'ACID Compliance', body: 'Full ACID transaction support ensures data integrity across all write operations, critical for financial and scheduling data in the NCompassTV platform.' },
      { title: 'InnoDB Engine', body: 'InnoDB provides row-level locking and foreign key constraints, enabling safe concurrent access to production data without table-level collisions.' },
      { title: 'JSON Column Support', body: 'Native JSON column type allows semi-structured data storage with the ability to query nested fields via generated columns and indexes.' },
      { title: 'Full-Text Search', body: 'Built-in full-text indexing enables efficient keyword searches across large text fields without requiring a separate search engine.' },
    ],
    whyWeUseIt: "MySQL 8's maturity, strong ecosystem, and tight TypeORM integration made it the reliable choice for NCompassTV's production workloads with proven performance at scale.",
    install: [
      {
        title: 'Install MySQL 8 (Ubuntu/Debian)',
        description: 'Install MySQL server from the system package manager.',
        code: `sudo apt update\nsudo apt install -y mysql-server`,
        language: 'bash',
      },
      {
        title: 'Secure & Start',
        description: 'Start the service and run the interactive security setup to set the root password.',
        code: `sudo systemctl start mysql\nsudo systemctl enable mysql\nsudo mysql_secure_installation`,
        language: 'bash',
      },
      {
        title: 'Connect & Create Database',
        description: 'Log in as root and create the application database and a dedicated user.',
        code: `mysql -u root -p

CREATE DATABASE ncompass CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'nctv'@'localhost' IDENTIFIED BY 'strongpassword';
GRANT ALL PRIVILEGES ON ncompass.* TO 'nctv'@'localhost';
FLUSH PRIVILEGES;`,
        language: 'sql',
      },
    ],
    basicUse: [
      {
        title: 'Create Tables & Insert Data',
        description: 'Basic DDL and DML to define a table and insert a row.',
        code: `USE ncompass;

CREATE TABLE users (
  id         INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name       VARCHAR(100)        NOT NULL,
  email      VARCHAR(255) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO users (name, email) VALUES ('Alice', 'alice@nctv.com');`,
        language: 'sql',
      },
      {
        title: 'Queries & Joins',
        description: 'Filter, sort, and join tables using standard SQL syntax.',
        code: `-- Filter with LIKE
SELECT id, name, email FROM users
WHERE name LIKE '%alice%'
ORDER BY created_at DESC
LIMIT 10;

-- Inner join example
SELECT u.name, o.total
FROM users u
JOIN orders o ON o.user_id = u.id
WHERE o.total > 100;`,
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
    description: 'Astro is a web framework focused on content-driven websites that ships zero JavaScript by default. The Web Development team uses it for fast, static marketing pages and documentation sites where Core Web Vitals scores directly impact SEO rankings.',
    website: 'https://astro.build',
    usedBy: ['Web Development'],
    features: [
      { title: 'Islands Architecture', body: "Astro's Islands model hydrates only interactive components, keeping the majority of the page as static HTML for near-instant load times." },
      { title: 'Zero JS by Default', body: 'Pages ship no JavaScript unless explicitly opted in, drastically reducing bundle size for content-heavy marketing and documentation pages.' },
      { title: 'Multi-Framework Support', body: 'Use React, Vue, Svelte, or plain HTML in the same project â€” each island can run a different framework without conflicts.' },
      { title: 'Content Collections', body: 'Type-safe content collections with Zod validation keep Markdown and MDX content structured, queryable, and refactor-friendly.' },
    ],
    whyWeUseIt: "Astro's performance-first approach makes it ideal for NCompassTV's documentation and marketing pages where Core Web Vitals scores directly affect organic search visibility.",
    install: [
      {
        title: 'Scaffold a New Site',
        description: 'Run the interactive CLI wizard â€” choose the "Minimal" template and enable TypeScript.',
        code: `npm create astro@latest my-site`,
        language: 'bash',
      },
      {
        title: 'Run the Dev Server',
        description: 'Start Astro in dev mode with hot module replacement at http://localhost:4321.',
        code: `cd my-site\nnpm install\nnpm run dev`,
        language: 'bash',
      },
      {
        title: 'Add an Integration',
        description: 'Use astro add to install official integrations like Tailwind or React with one command.',
        code: `npx astro add tailwind\nnpx astro add react`,
        language: 'bash',
      },
    ],
    basicUse: [
      {
        title: 'Astro Page Component',
        description: 'Pages live in src/pages/. The frontmatter fence (---) is server-only JavaScript.',
        code: `---
// src/pages/index.astro
const title = 'NCompassTV Docs';
const items = await fetch('/api/products').then(r => r.json());
---
<html lang="en">
  <head><title>{title}</title></head>
  <body>
    <h1>{title}</h1>
    <ul>
      {items.map((item: { id: number; name: string }) => (
        <li>{item.name}</li>
      ))}
    </ul>
  </body>
</html>`,
        language: 'astro',
      },
      {
        title: 'Content Collections',
        description: 'Define a type-safe schema for Markdown content and query it at build time.',
        code: `// src/content/config.ts
import { z, defineCollection } from 'astro:content';

const blog = defineCollection({
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog };

// Usage in a page:
import { getCollection } from 'astro:content';
const posts = await getCollection('blog', ({ data }) => !data.draft);`,
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
    description: 'Tailwind CSS is a utility-first CSS framework providing low-level utility classes for building designs directly in markup. All NCompassTV frontend teams use Tailwind exclusively for styling, bridging design tokens from Figma to production CSS through CSS custom properties.',
    website: 'https://tailwindcss.com',
    usedBy: ['Frontend', 'Web Development', 'UI / UX'],
    features: [
      { title: 'Utility-First Styling', body: 'Atomic utility classes eliminate custom CSS files, keeping styles co-located with markup and making component extraction trivial across the codebase.' },
      { title: 'Design Token Integration', body: "Tailwind's config extends naturally with NCompassTV's design tokens, bridging Figma variables and production CSS via CSS custom properties seamlessly." },
      { title: 'JIT Compiler', body: 'The Just-In-Time engine generates only the classes actually used in source files, keeping production CSS bundles minimal with no purge configuration.' },
      { title: 'Responsive Modifiers', body: 'Mobile-first responsive modifiers (sm:, md:, lg:) make breakpoint-aware layouts declarative and readable directly in the HTML markup.' },
    ],
    whyWeUseIt: "Tailwind's design token compatibility and utility-first philosophy align perfectly with the NCompassTV component library, enabling fast iteration without context-switching between HTML and separate CSS files.",
    install: [
      {
        title: 'Install Tailwind CSS',
        description: 'Install Tailwind and its peer dependencies as dev dependencies.',
        code: `npm install -D tailwindcss postcss autoprefixer\nnpx tailwindcss init -p`,
        language: 'bash',
      },
      {
        title: 'Configure Content Paths',
        description: "Tell Tailwind where your templates live so it can tree-shake unused classes.",
        code: `// tailwind.config.ts
import type { Config } from 'tailwindcss';

export default {
  content: [
    './src/**/*.{html,ts,tsx,astro}',
  ],
  theme: {
    extend: {
      colors: {
        navy: 'var(--navy)',
        green: 'var(--green)',
      },
    },
  },
} satisfies Config;`,
        language: 'typescript',
      },
      {
        title: 'Add Directives to CSS',
        description: 'Import Tailwind base, components, and utilities into your global stylesheet.',
        code: `/* src/styles.scss */
@import "tailwindcss";

/* Your global custom properties */
:root {
  --navy: #091635;
  --green: #8DCB2C;
}`,
        language: 'scss',
      },
    ],
    basicUse: [
      {
        title: 'Utility Classes in HTML',
        description: 'Compose layouts and visual styles directly in markup without leaving your template.',
        code: `<button class="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-600
               text-white font-semibold text-sm px-4 py-2 rounded-lg
               transition-colors duration-150 focus:outline-none
               focus:ring-2 focus:ring-blue-400 focus:ring-offset-2">
  Save Changes
</button>`,
        language: 'html',
      },
      {
        title: 'Responsive & State Variants',
        description: 'Use responsive prefixes and state variants for adaptive, interactive designs.',
        code: `<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
  <div class="p-6 rounded-lg bg-white hover:shadow-lg transition-shadow
              dark:bg-gray-800 dark:text-white">
    Card content
  </div>
</div>`,
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
    description: 'Docker is a platform for building, shipping, and running applications in isolated containers. The Backend and QA teams use Docker to ensure consistent, reproducible environments across local development, CI pipelines, and production deployments.',
    website: 'https://docker.com',
    usedBy: ['Backend', 'Quality Assurance'],
    features: [
      { title: 'Consistent Environments', body: "Docker containers package application code and all its dependencies, eliminating environment drift between developer machines, CI runners, and production." },
      { title: 'Docker Compose', body: 'Multi-service orchestration with docker-compose.yml spins up the full NCompassTV stack â€” API, MySQL, and Redis â€” with a single command.' },
      { title: 'Layer Caching', body: "Docker's layer cache speeds up CI/CD pipelines by reusing unchanged build layers between commits, cutting average build time significantly." },
      { title: 'Production Parity', body: 'Local containers mirror the production environment, catching environment-specific bugs in development before they reach staging or production.' },
    ],
    whyWeUseIt: "Docker removes environment drift between the team's machines, CI runners, and production, making every deployment a known and reproducible artifact.",
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
        description: 'Download and install Docker Desktop which bundles the engine, CLI, and Compose.',
        code: `# Download from https://docs.docker.com/get-started/get-docker/
# After install, verify:
docker version`,
        language: 'bash',
      },
    ],
    basicUse: [
      {
        title: 'Dockerfile for a Node.js API',
        description: 'Multi-stage build that keeps the production image small by discarding dev dependencies.',
        code: `# Build stage
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production stage
FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
EXPOSE 3000
CMD ["node", "dist/main.js"]`,
        language: 'dockerfile',
      },
      {
        title: 'Docker Compose Stack',
        description: 'Define the full NCompassTV local stack â€” API + MySQL â€” in a single compose file.',
        code: `services:
  api:
    build: .
    ports:
      - "3000:3000"
    environment:
      DB_HOST: db
      DB_NAME: ncompass
    depends_on:
      db:
        condition: service_healthy

  db:
    image: mysql:8
    environment:
      MYSQL_DATABASE: ncompass
      MYSQL_ROOT_PASSWORD: secret
    healthcheck:
      test: ["CMD", "mysqladmin", "ping", "-h", "localhost"]
      interval: 10s
      retries: 5`,
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
    description: 'Figma is the collaborative design platform used by the UI/UX team for all wireframing, high-fidelity mockups, component libraries, and engineering handoff. It is the single source of truth for all visual design decisions at NCompassTV.',
    website: 'https://figma.com',
    usedBy: ['UI / UX'],
    features: [
      { title: 'Component Library', body: '120+ reusable Figma components with auto-layout and interactive variants mirror the Angular component library for pixel-perfect design-to-code handoff.' },
      { title: 'Design Tokens via Variables', body: "Figma Variables sync with Style Dictionary to export design tokens as CSS custom properties, SCSS variables, and JSON for cross-platform use." },
      { title: 'Dev Mode', body: 'Dev Mode provides engineers with CSS specs, spacing annotations, color tokens, and asset exports directly from the design file, reducing back-and-forth.' },
      { title: 'FigJam Workshops', body: 'FigJam boards facilitate user journey mapping, stakeholder workshops, usability synthesis, and sprint retrospectives in a shared digital workspace.' },
    ],
    whyWeUseIt: "Figma's real-time collaboration model keeps designers and engineers aligned, reducing handoff friction and ensuring that the component library in code always reflects the design source of truth.",
    install: [
      {
        title: 'Download Figma Desktop',
        description: 'Install the native desktop app for the best performance and offline access.',
        code: `# Visit https://www.figma.com/downloads/
# Available for Windows, macOS, and Linux (Snap/AppImage)

# Linux (Snap):
sudo snap install figma-linux`,
        language: 'bash',
      },
      {
        title: 'Access the NCompassTV Workspace',
        description: 'Request access to the shared team workspace from the UI/UX lead.',
        code: `# 1. Sign in at https://figma.com with your @ncompasstv.com email
# 2. Ask @lena-morozova or @carlos-vega to invite you to:
#    "NCompassTV Design System" team
# 3. You will receive an email invite â€” click to join`,
        language: 'bash',
      },
      {
        title: 'Install Required Plugins',
        description: 'Install these plugins from the Figma Community for the team workflow.',
        code: `# Essential plugins (search in: Main Menu > Plugins > Browse plugins):
# - Tokens Studio for Figma  (design token sync)
# - Figma Contrast           (WCAG 2.1 contrast checker)
# - Iconify                  (icon library browser)
# - Unsplash                 (stock photo placeholder images)`,
        language: 'bash',
      },
    ],
    basicUse: [
      {
        title: 'Create a Component',
        description: "Select a frame and convert it to a reusable component â€” it will appear in the team's asset panel.",
        code: `# Create component:   Ctrl+Alt+K  (Windows) / Cmd+Option+K (Mac)
# Duplicate instance:  Ctrl+D              / Cmd+D
# Edit main component: Dbl-click instance â†’ "Go to main component"
# Add variant:         Select component â†’ "Add variant" in right panel`,
        language: 'bash',
      },
      {
        title: 'Inspect & Export for Dev Handoff',
        description: 'Switch to Dev Mode to let engineers copy CSS values, spacing, and exported assets.',
        code: `# Enter Dev Mode:    Press D  (or toggle top-right toolbar)
# Copy CSS:           Select any layer â†’ "Code" panel â†’ copy CSS snippet
# Export asset:       Select layer â†’ right panel "Export" â†’ choose SVG/PNG
# View token values:  Hover a colour/spacing â†’ Tokens Studio panel shows variable name`,
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
    description: 'Python is a high-level, general-purpose programming language used by the QA and R&D teams for test automation, data analysis scripts, and feature prototyping before production implementation in TypeScript.',
    website: 'https://python.org',
    usedBy: ['Quality Assurance', 'Research & Development'],
    features: [
      { title: 'Test Automation', body: 'The QA team uses Pytest and Playwright bindings to write end-to-end and integration tests against the NCompassTV API and browser UI layers.' },
      { title: 'Data Scripting', body: 'R&D uses Python for data transformation, analytics prototyping, and generating seeded fixture data for backend integration test suites.' },
      { title: 'Rich Ecosystem', body: 'Libraries like Requests, BeautifulSoup, and Pandas enable rapid scripting of API validation, web scraping, and data-processing pipelines without heavy setup.' },
      { title: 'Fast Prototyping', body: "Python's minimal boilerplate allows R&D to quickly validate algorithms and hypotheses before porting to TypeScript for production implementation." },
    ],
    whyWeUseIt: "Python's versatility and rich testing ecosystem make it the go-to for QA automation and R&D experimentation, where speed of iteration takes precedence over strict typing.",
    install: [
      {
        title: 'Install Python 3.12',
        description: 'Install via the system package manager or from python.org.',
        code: `# Ubuntu / Debian
sudo apt update && sudo apt install -y python3.12 python3-pip python3.12-venv

# macOS (Homebrew)
brew install python@3.12

# Verify
python3 --version && pip3 --version`,
        language: 'bash',
      },
      {
        title: 'Create a Virtual Environment',
        description: 'Always isolate project dependencies in a venv to avoid polluting the system Python.',
        code: `python3 -m venv .venv

# Activate (Linux / macOS)
source .venv/bin/activate

# Activate (Windows PowerShell)
.\.venv\Scripts\Activate.ps1

# Install deps
pip install -r requirements.txt`,
        language: 'bash',
      },
      {
        title: 'Install Common QA Packages',
        description: 'Install the packages used by the NCompassTV QA team for API and browser testing.',
        code: `pip install pytest pytest-asyncio requests playwright
python -m playwright install chromium`,
        language: 'bash',
      },
    ],
    basicUse: [
      {
        title: 'Pytest API Test',
        description: 'Write a simple Pytest test that validates the NestJS health endpoint.',
        code: `# tests/test_health.py
import requests

BASE_URL = "http://localhost:3000"

def test_health_endpoint():
    resp = requests.get(f"{BASE_URL}/api/health")
    assert resp.status_code == 200
    body = resp.json()
    assert body["status"] == "ok"

def test_users_returns_list():
    resp = requests.get(f"{BASE_URL}/api/users")
    assert resp.status_code == 200
    assert isinstance(resp.json(), list)

# Run with: pytest tests/ -v`,
        language: 'python',
      },
      {
        title: 'Data Fixture Generator',
        description: 'Generate seeded JSON fixtures for backend integration tests.',
        code: `import json, random, pathlib
from datetime import datetime, timedelta

def make_user(i: int) -> dict:
    return {
        "id": i,
        "name": f"User {i}",
        "email": f"user{i}@nctv.com",
        "createdAt": (datetime.now() - timedelta(days=i)).isoformat(),
    }

fixtures = [make_user(i) for i in range(1, 51)]
pathlib.Path("fixtures/users.json").write_text(json.dumps(fixtures, indent=2))
print(f"Generated {len(fixtures)} user fixtures")`,
        language: 'python',
      },
    ],
  },
];
