// ── FILE: src/app/core/data/backend.data.ts ──

import { Team } from '../models/team.model';

export const backendTeam: Team = {
  key: 'backend',
  isHidden: false,
  label: 'Backend',
  color: '#7C3AED',
  gradient: 'linear-gradient(135deg, #1e1035, #3b1d6e)',
  icon: 'server',
  subtitle: 'NestJS Monorepo · AWS Lambda (SAM) · TypeORM · Aurora MySQL · GraphQL · Auth0 · Valkey',
  description: 'Monorepo structure, API design patterns, entity conventions, Lambda deployment, Auth0 authentication, and backend development standards for NCompassTV services.',
  projects: [],
  sections: [

    // ── 01 Tech Stack ──────────────────────────────────────────────────────────
    {
      id: 'be-tech-stack',
      label: 'Tech Stack Overview',
      num: '01',
      content: {
        type: 'tech-stack',
        table: {
          headers: ['Technology', 'Version', 'Purpose', 'Status'],
          rows: [
            { cells: ['NestJS',               '10.x', 'Opinionated Node.js framework — monorepo with 3 apps',                        'Live'] },
            { cells: ['TypeORM',              '0.3',  'ORM for entity definitions, migrations, and field mapping',                   'Live'] },
            { cells: ['Aurora MySQL',         '8.x',  'AWS-managed relational database; UUIDs stored as BINARY(16)',                 'Live'] },
            { cells: ['GraphQL / Apollo',     '4.x',  'Schema-first GraphQL API via @nestjs/graphql',                               'Live'] },
            { cells: ['WebSockets (Socket.IO)','4.x', 'Real-time WebSocket gateway for device health events',                       'Live'] },
            { cells: ['Auth0',                'N/A',  'OAuth 2.0 authentication via @nestjs/passport + Auth0 Management API',       'Live'] },
            { cells: ['Valkey',               '7.x',  'Redis-compatible cache and pub/sub (community fork of Redis)',                'Live'] },
            { cells: ['AWS SAM',              '1.x',  'Serverless deployment template for all three Lambda apps',                   'Live'] },
            { cells: ['AWS Lambda',           'N/A',  'Serverless compute — each monorepo app is one Lambda function',              'Live'] },
            { cells: ['class-transformer',    '0.5',  '@Expose() decorators on DTOs for serialisation control',                     'Live'] },
            { cells: ['class-validator',      '0.14', 'Declarative DTO validation via decorators + ValidationPipe',                 'Live'] },
          ],
        },
      },
    },

    // ── 02 Getting Started ─────────────────────────────────────────────────────
    {
      id: 'be-getting-started',
      label: 'Getting Started',
      num: '02',
      content: {
        type: 'getting-started',
        steps: [
          {
            icon: 'git-branch',
            title: 'Clone the Repository',
            description: 'Clone the NTV360 API repository and install all dependencies.',
            code: 'git clone git@git-ssh.n-compass.online:NTV360/ntv360-api.git\ncd ntv360-api && npm install',
            language: 'bash',
          },
          {
            icon: 'database',
            title: 'Set Up MySQL',
            description: 'Install MySQL locally, set username/password to root, and create a database named ntv360. Then spin up via Docker Compose.',
            code: 'docker-compose -f docker-compose.db.yml up -d',
            language: 'bash',
          },
          {
            icon: 'key-round',
            title: 'Configure Environment',
            description: 'Copy the env template inside the /env folder and fill in values (ask your team lead). All .env files except .env.test are git-ignored.',
            code: 'cp env/.env.test env/.env\n# Set DB credentials, Auth0 keys, Valkey URL, AWS region',
            language: 'bash',
          },
          {
            icon: 'arrow-right-left',
            title: 'Run Migrations & Seeders',
            description: 'Apply all pending TypeORM migrations to initialise the schema, then optionally run seeders.',
            code: 'npm run migrate run      # apply pending migrations\nnpm run migrate seed     # run database seeders',
            language: 'bash',
          },
          {
            icon: 'terminal',
            title: 'Start the Apps',
            description: 'Launch any of the three apps. REST API → :42052  |  GraphQL → :42055',
            code: 'npm run start                          # REST API (local)\nnpm run start:dev                      # REST API watch mode (dev)\nnpm run start:dev --project graphql    # GraphQL watch mode',
            language: 'bash',
          },
        ],
        codeBlock: {
          language: 'bash',
          code: `# Full local setup
git clone git@git-ssh.n-compass.online:NTV360/ntv360-api.git
cd ntv360-api && npm install
cp env/.env.test env/.env
docker-compose -f docker-compose.db.yml up -d
npm run migrate run
npm run start`,
        },
      },
    },

    // ── 03 Run & Build Commands ────────────────────────────────────────────────
    {
      id: 'be-commands',
      label: 'Run & Build Commands',
      num: '03',
      content: {
        type: 'coding-patterns',
        layout: 'stack',
        patterns: [
          {
            title: 'Run Commands',
            description: 'All run commands and the environment file each one uses.',
            codeBlock: {
              language: 'bash',
              code: `npm run start           # env/.env         — start the app (local)
npm run start:dev       # env/.env.dev      — start in watch mode (dev)
npm run start:staging   # env/.env.staging  — start the app (staging)
npm run start:prod      #  —                — run built app from dist/
npm run start:debug     # env/.env          — start in debug + watch mode`,
            },
          },
          {
            title: 'Build Commands',
            description: 'Build commands run tests and compile for each environment.',
            codeBlock: {
              language: 'bash',
              code: `npm run build           # env/.env          — clean and compile
npm run build:dev       # env/.env.dev       — clean and compile (dev)
npm run build:staging   # env/.env.staging   — test, clean, compile (staging)
npm run build:prod      # env/.env.prod      — test, clean, compile (production)`,
            },
          },
          {
            title: 'Test Commands',
            description: 'Run unit tests, end-to-end tests, or generate a coverage report.',
            codeBlock: {
              language: 'bash',
              code: `npm run test        # unit tests
npm run test:e2e    # end-to-end tests
npm run test:cov    # test coverage report`,
            },
          },
          {
            title: 'Migration & Seeder Commands',
            description: 'Manage database schema with TypeORM migrations and seed initial data.',
            codeBlock: {
              language: 'bash',
              code: `npm run migrate run                         # apply all pending migrations
npm run migrate seed                        # run database seeders
npm run migrate generate <migration-name>   # create a new migration (camelCase name)`,
            },
          },
        ],
      },
    },

    // ── 04 Folder Architecture ─────────────────────────────────────────────────
    {
      id: 'be-folder-arch',
      label: 'Folder Architecture',
      num: '04',
      content: {
        type: 'folder-arch',
        cards: [
          { title: 'apps/', body: 'Three deployable NestJS applications: ntv360-api (REST → :42052), graphql (GraphQL → :42055), and ntv360-websocket. Each compiles to its own Lambda bundle via SAM.' },
          { title: 'libs/core/', body: 'Shared library consumed by all three apps. Contains 73 entities, 247 services, 442 DTOs, Auth0 management, Passport strategies, guards, interceptors, and common decorators.' },
          { title: 'libs/core/entities/', body: 'BaseMetadataEntity extends all domain entities with audit columns: created_at/by, updated_at/by, deleted_at/by. UUIDs stored as BINARY(16) via UuidBinaryTransformer.' },
          { title: 'libs/types/', body: 'Shared TypeScript type definitions used across all apps and libraries to keep domain types consistent.' },
          { title: 'yaml/', body: 'CloudFormation and AWS SAM stack templates defining Lambda functions, API Gateway routes, environment variables, and IAM roles per environment.' },
          { title: 'tools/', body: 'Development tooling — scaffold-entity.ts generates a full module structure (entity, DTOs, service, controller, resolver, tests) for both REST and GraphQL.' },
        ],
        codeBlock: {
          language: 'bash',
          code: `ntv360-api/
├── apps/
│   ├── graphql/                         # GraphQL API application
│   │   └── src/modules/
│   │       ├── app/                     # Main GraphQL app module with providers
│   │       └── user/                    # User module for GraphQL resolvers
│   │           ├── resolver/            # user.resolver.ts, user.resolver.spec.ts
│   │           ├── response/            # GraphQL response DTOs (2 items)
│   │           └── user.module.ts
│   ├── ntv360-api/                      # REST API → :42052
│   │   └── src/modules/
│   │       ├── app/                     # app.controller.ts, app.module.ts, app.service.ts
│   │       └── user/                    # User module for REST controllers
│   │           ├── controller/          # user.controller.ts, user.controller.spec.ts
│   │           ├── swagger/             # OpenAPI schemas (2 items)
│   │           └── user.module.ts
│   └── ntv360-websocket/               # WebSocket API application
│       ├── src/
│       │   ├── lambda.ts               # AWS Lambda entry point
│       │   └── modules/app/            # app.controller.ts, app.module.ts, app.service.ts
│       └── tsconfig.app.json
├── libs/
│   ├── core/src/
│   │   ├── auth0-management/           # Auth0 Management API service
│   │   ├── common/                     # Guards, interceptors, filters, decorators
│   │   │   ├── bootstrap/              # Application bootstrap logic
│   │   │   ├── cookies/                # Cookie management service
│   │   │   ├── decorators/             # Custom decorators
│   │   │   ├── filters/                # Exception filters
│   │   │   ├── guards/                 # Authentication/authorization guards
│   │   │   ├── interceptors/           # Request/response interceptors
│   │   │   ├── middlewares/            # Custom middlewares
│   │   │   ├── responses/              # Standard response classes
│   │   │   └── transformers/           # Data transformers
│   │   ├── constants/tokens/           # DI injection tokens
│   │   ├── dtos/                       # 442 shared Data Transfer Objects
│   │   ├── entities/                   # 73 domain entities (BaseMetadataEntity)
│   │   ├── modules/                    # Shared NestJS modules
│   │   ├── services/                   # 247 business logic services
│   │   ├── strategies/                 # Passport / Auth0 strategies
│   │   └── utils/                      # Utility functions
│   └── types/                          # Shared TypeScript type definitions
├── config/                             # Configuration files
├── docs/                               # Documentation
├── env/                                # .env files per environment (git-ignored)
├── scripts/                            # Build/deployment scripts
├── tools/                              # scaffold-entity.ts development tool
├── yaml/                               # CloudFormation / SAM stack templates
├── docker-compose.db.yml               # Local MySQL via Docker
├── nest-cli.json                       # NestJS monorepo project config
├── samconfig.toml                      # AWS SAM deployment config
├── schema.gql                          # GraphQL schema definition
├── jest.config.cjs                     # Jest testing configuration
└── webpack.config.js                   # Webpack bundler configuration`,
        },
      },
    },

    // ── 05 Deployment Architecture ─────────────────────────────────────────────
    {
      id: 'be-deployment',
      label: 'Deployment Architecture',
      num: '05',
      content: {
        type: 'coding-patterns',
        layout: 'stack',
        patterns: [
          {
            title: 'Branch-based Deployment Strategy',
            description: 'Each git branch maps to a specific environment. Every deployment automatically runs lint and unit tests before proceeding.',
            codeBlock: {
              language: 'bash',
              code: `development  →  Development environment
staging      →  Staging environment
production   →  Production environment

# Each environment deploys three independent Lambda Applications:
#   ntv360-graphql-app-{environment}
#   ntv360-rest-api-app-{environment}
#   ntv360-websocket-app-{environment}`,
            },
          },
          {
            title: 'Manual Deployment Commands',
            description: 'Deploy individual Lambda applications manually to the development environment.',
            codeBlock: {
              language: 'bash',
              code: `# Deploy GraphQL Application to development
npm run deploy:graphql-app

# Deploy NTV360 REST API Application to development
npm run deploy:rest-api-app

# Deploy both GraphQL and REST API together
npm run deploy:both-apps`,
            },
          },
          {
            title: 'CloudFormation Stack Names',
            description: 'Each application creates its own independently managed CloudFormation stack. Stack names follow the pattern below — replace {environment} with development, staging, or production.',
            codeBlock: {
              language: 'bash',
              code: `ntv360-graphql-app-{environment}
ntv360-rest-api-app-{environment}
ntv360-websocket-app-{environment}`,
            },
          },
        ],
      },
    },

    // ── 06 API Documentation ───────────────────────────────────────────────────
    {
      id: 'be-api-docs',
      label: 'API Documentation',
      num: '06',
      content: {
        type: 'coding-patterns',
        layout: 'stack',
        patterns: [
          {
            title: 'Local Development — Swagger (REST API)',
            description: 'Once the NTV360 REST API is running locally, interactive Swagger documentation is available at the URL below.',
            codeBlock: {
              language: 'bash',
              code: `http://localhost:42052/api/docs#/`,
            },
          },
          {
            title: 'Local Development — GraphQL Playground',
            description: 'Once the GraphQL application is running locally, the interactive playground is available at the URL below.',
            codeBlock: {
              language: 'bash',
              code: `http://localhost:42055/graphql`,
            },
          },
          {
            title: 'Deployed Environments — API Gateway URLs',
            description: 'Deployed environment URLs follow the pattern below. The actual API Gateway IDs are displayed in GitHub Actions deployment logs and AWS CloudFormation outputs. Note: Swagger and GraphQL Playground are disabled on production for security.',
            codeBlock: {
              language: 'bash',
              code: `# NTV360 REST API — Swagger
https://{rest-api-id}.execute-api.us-east-1.amazonaws.com/{environment}/api/docs

# GraphQL API — Playground
https://{graphql-api-id}.execute-api.us-east-1.amazonaws.com/{environment}/graphql

# environments: development | staging
# Note: Swagger and GraphQL Playground are DISABLED on production`,
            },
          },
        ],
      },
    },

    // ── 07 Entity Scaffolding Tool ─────────────────────────────────────────────
    {
      id: 'be-scaffolding',
      label: 'Entity Scaffolding Tool',
      num: '07',
      content: {
        type: 'coding-patterns',
        layout: 'stack',
        patterns: [
          {
            title: 'scaffold-entity.ts',
            description: 'A code-generation tool that scaffolds a full module structure for a new entity across both REST and GraphQL APIs. The entity name must be in kebab-case and is auto-converted to PascalCase and UPPER_SNAKE_CASE.',
            codeBlock: {
              language: 'bash',
              code: `# Interactive mode (prompts for entity name)
npx ts-node tools/scaffold-entity.ts

# Specify entity name directly
npx ts-node tools/scaffold-entity.ts device-category

# Preview files without creating them (dry run)
npx ts-node tools/scaffold-entity.ts device-category --dry-run

# Full example workflow
npx ts-node tools/scaffold-entity.ts user-profile --dry-run
npx ts-node tools/scaffold-entity.ts user-profile`,
            },
          },
          {
            title: 'What the Scaffolding Tool Creates',
            description: 'Running the tool generates a complete module structure across all relevant locations in the monorepo.',
            codeBlock: {
              language: 'bash',
              code: `# GraphQL API — apps/graphql/src/modules/{entity}/
  {entity}.module.ts         # NestJS module definition
  resolver/{entity}.resolver.ts  # Query/mutation resolvers
  response/                  # Response DTO types
  *.spec.ts                  # Resolver test files

# REST API — apps/ntv360-api/src/modules/{entity}/
  {entity}.module.ts         # NestJS module definition
  controller/{entity}.controller.ts  # CRUD endpoints
  swagger/                   # OpenAPI schema decorators
  *.spec.ts                  # Controller test files

# Core Library — libs/core/src/
  entities/{entity}.entity.ts     # TypeORM entity class
  dtos/{entity}/               # Create, Update, Raw, main DTOs
  services/{entity}.service.ts    # Business logic service + tests
  constants/{entity}.constants.ts # Entity constants file

# GraphQL DI — apps/graphql/src/constants/Providers.ts
  # Service token added for dependency injection`,
            },
          },
        ],
      },
    },

    // ── 08 Coding Patterns ─────────────────────────────────────────────────────
    {
      id: 'be-coding-patterns',
      label: 'Coding Patterns',
      num: '08',
      content: {
        type: 'coding-patterns',
        layout: 'stack',
        patterns: [
          {
            title: 'BaseMetadataEntity',
            description: 'All domain entities extend BaseMetadataEntity from libs/core, providing full audit columns and soft-delete. UUIDs are stored as BINARY(16) for storage efficiency.',
            codeBlock: {
              language: 'typescript',
              code: `import { Entity, PrimaryColumn, Column } from 'typeorm';
import { BaseMetadataEntity, UuidBinaryTransformer } from 'libs/core';

@Entity('devices')
export class DeviceEntity extends BaseMetadataEntity {

  @PrimaryColumn({ type: 'binary', length: 16 })
  id: Buffer;

  @Column({ name: 'display_name', length: 255 })
  name: string;

  @Column({ name: 'group_id', type: 'binary', length: 16 })
  groupId: Buffer;

  // createdAt, updatedAt, createdBy, updatedBy, deletedAt
  // are all inherited from BaseMetadataEntity — do not redeclare
}`,
            },
          },
          {
            title: 'Field Mapping with FieldMappingService',
            description: 'Use BASE_*_FIELDS constants and FieldMappingService to map camelCase DTO properties to snake_case database column names. Never hard-code column strings inline.',
            codeBlock: {
              language: 'typescript',
              code: `// libs/core/fields/device.fields.ts
export const BASE_DEVICE_FIELDS: FieldMap = {
  name:    'display_name',
  groupId: 'group_id',
  status:  'device_status',
};

// In DevicesService
async getDevices(filters: DeviceFilterDto) {
  const mapped = this._fieldMappingService.map(
    filters,
    BASE_DEVICE_FIELDS,
  );
  return this._repo.find({ where: mapped });
}`,
            },
          },
          {
            title: 'DTO Serialisation with @Expose()',
            description: 'Use class-transformer @Expose() on all DTO properties and enable excludeExtraneousValues in the ClassSerializerInterceptor to prevent leaking unmapped database fields.',
            codeBlock: {
              language: 'typescript',
              code: `import { Expose } from 'class-transformer';
import { IsString, IsUUID, IsEnum } from 'class-validator';

export class DeviceResponseDto {
  @Expose()
  @IsUUID()
  id: string;

  @Expose()
  @IsString()
  name: string;

  @Expose()
  @IsEnum(DeviceStatus)
  status: DeviceStatus;

  // Un-decorated properties are stripped by excludeExtraneousValues
}`,
            },
          },
          {
            title: 'Git Branch & Commit Conventions',
            description: 'All branches follow a prefix convention and commits use a typed sentence-case format. PRs must reference a Jira ticket.',
            codeBlock: {
              language: 'bash',
              code: `# Branch naming — prefix + Jira ticket + short description
git checkout -b feat/NTV-123-add-device-heartbeat
git checkout -b fix/NTV-456-fix-token-expiry
git checkout -b hotfix/NTV-789-critical-auth-bypass
git checkout -b release/v2.4.0

# Commit messages — sentence case, typed prefix
git commit -m "feat: Add device heartbeat endpoint"
git commit -m "fix: Correct token expiry calculation"
git commit -m "refactor: Extract FieldMappingService to libs/core"

# PR title must reference the Jira ticket
# [NTV-123] feat: Add device heartbeat endpoint`,
            },
          },
        ],
      },
    },

    // ── 09 Common Mistakes ─────────────────────────────────────────────────────
    {
      id: 'be-mistakes',
      label: 'Common Mistakes',
      num: '09',
      content: {
        type: 'mistakes',
        table: {
          headers: ['❌ Mistake', '✅ Correct Approach'],
          rows: [
            { cells: ['Hard-coding column names as strings in queries',          'Use BASE_*_FIELDS constants from libs/core via FieldMappingService'] },
            { cells: ['Storing UUIDs as VARCHAR(36)',                            'Use BINARY(16) with UuidBinaryTransformer for all primary keys'] },
            { cells: ['Missing @Expose() on DTO properties',                    'Decorate every DTO field with @Expose() and use excludeExtraneousValues: true'] },
            { cells: ['Returning raw entity objects from controllers',           'Return serialised DTOs — never expose database entities directly'] },
            { cells: ['Using process.env.KEY directly',                         "Use ConfigService.get<string>('KEY') for type-safe environment access"] },
            { cells: ['Committing directly to main or develop',                 'Branch from develop (feat/, fix/) or main (hotfix/); open a PR'] },
            { cells: ['Extending a plain class instead of BaseMetadataEntity',  'All domain entities must extend BaseMetadataEntity for audit columns'] },
            { cells: ['Calling the Auth0 Management API directly from controllers', 'Use the shared Auth0ManagementService from libs/core/auth0-management'] },
            { cells: ['Running npm run migration:run',                          'Correct command is npm run migrate run (see README)'] },
            { cells: ['Using entity name in PascalCase with the scaffolding tool', 'Entity name must be kebab-case — the tool converts to PascalCase automatically'] },
          ],
        },
      },
    },

    // ── 10 Team Contacts ───────────────────────────────────────────────────────
    {
      id: 'be-contacts',
      label: 'Team Contacts',
      num: '10',
      content: {
        type: 'team-contacts',
        contacts: [
          {
            name: 'Lester Vitor',
            role: 'Team Lead',
            initials: 'LV',
            color: '#7C3AED',
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
