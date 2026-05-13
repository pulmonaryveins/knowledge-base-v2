// ── FILE: src/app/core/data/backend.data.ts ──

import { Team } from '../models/team.model';

export const backendTeam: Team = {
  key: 'backend',
  isHidden: false,
  label: 'Backend',
  color: '#7C3AED',
  gradient: 'linear-gradient(135deg, #1e1035, #3b1d6e)',
  icon: 'server',
  subtitle: 'NestJS 10.x · AWS Lambda (SAM) · TypeORM · Aurora MySQL · GraphQL + WebSockets',
  description: 'Monorepo structure, API design patterns, entity conventions, Lambda deployment, and backend development standards for NCompassTV services.',
  projects: [],
  sections: [
    {
      id: 'be-tech-stack',
      label: 'Tech Stack Overview',
      num: '01',
      content: {
        type: 'tech-stack',
        table: {
          headers: ['Technology', 'Version', 'Purpose', 'Status'],
          rows: [
            { cells: ['NestJS', '10.x', 'Opinionated Node.js framework — monorepo with 3 independent apps', 'Live'] },
            { cells: ['TypeORM', '0.3', 'ORM for entity definitions, migrations, and field mapping', 'Live'] },
            { cells: ['Aurora MySQL', '8.x', 'Primary relational database; UUIDs stored as BINARY(16)', 'Live'] },
            { cells: ['GraphQL / Apollo', '4.x', 'Schema-first GraphQL API via @nestjs/graphql', 'Live'] },
            { cells: ['WebSockets', '4.x', 'Real-time event gateway for device health and system events', 'Live'] },
            { cells: ['AWS SAM', '1.x', 'Serverless Application Model for infrastructure as code', 'Live'] },
            { cells: ['AWS Lambda', 'N/A', 'Serverless compute — each monorepo app deploys as one Lambda function', 'Live'] },
            { cells: ['Valkey', 'Forked from Redis', 'Session caching and rate limiting (forked Redis)', 'Live'] },
            { cells: ['Auth0', '2.x', 'Authentication and authorization for all protected endpoints', 'Live'] },
            { cells: ['class-transformer', '0.5', '@Expose() decorators on DTOs for serialisation control', 'Live'] },
            { cells: ['class-validator', '0.14', 'Declarative DTO validation via decorators + ValidationPipe', 'Live'] },
          ],
        },
      },
    },
    {
      id: 'be-getting-started',
      label: 'Getting Started',
      num: '02',
      content: {
        type: 'getting-started',
        steps: [
          { icon: 'git-branch',        title: 'Clone the Monorepo', description: 'Clone the NTV360 monorepo and install all dependencies.', code: 'git clone git@git-ssh.n-compass.online:NTV360/ntv360-api.git\ncd ntv360-api && npm install', language: 'bash' },
          { icon: 'container',         title: 'Start MySQL', description: 'Spin up the local MySQL database with Docker Compose.', code: 'docker-compose up -d mysql', language: 'bash' },
          { icon: 'key-round',         title: 'Configure Environment', description: 'Copy the env template and set your local database URL and secrets.', code: 'cp .env.example .env\n# Set DATABASE_URL, JWT_SECRET, AWS_REGION', language: 'bash' },
          { icon: 'arrow-right-left',  title: 'Run Migrations', description: 'Apply all pending TypeORM migrations to create the schema.', code: 'npm run migration:run', language: 'bash' },
          { icon: 'terminal',          title: 'Start an App', description: 'Launch any of the three apps in watch mode.', code: 'npm run start:dev ntv360-api       # REST API → :3000\nnpm run start:dev graphql          # GraphQL  → :3001\nnpm run start:dev ntv360-websocket # WebSocket → :3002', language: 'bash' },
        ],
        codeBlock: {
          language: 'bash',
          code: `# Full local setup
git clone git@git-ssh.n-compass.online:NTV360/ntv360-api.git
cd ntv360-api && npm install
cp .env.example .env
docker-compose up -d mysql
npm run migration:run
npm run start:dev ntv360-api`,
        },
      },
    },
    {
      id: 'be-folder-arch',
      label: 'Folder Architecture',
      num: '03',
      content: {
        type: 'folder-arch',
        cards: [
          { title: 'apps/', body: 'Three independent deployable NestJS applications: ntv360-api (REST API), graphql (GraphQL API), and ntv360-websocket (WebSocket server). Each compiles to its own Lambda bundle.' },
          { title: 'libs/core/', body: 'Shared library consumed by all three apps. Contains BaseMetadataEntity, all entity definitions, services, DTOs, decorators, guards, interceptors, filters, and utilities.' },
          { title: 'libs/types/', body: 'Shared TypeScript type definitions used across all applications and libraries.' },
          { title: 'env/', body: 'Environment configuration files (.env, .env.dev, .env.staging, .env.prod, .env.test) — only .env.test is committed; others are git-ignored.' },
          { title: 'template.yaml', body: 'AWS SAM template defining all Lambda functions, API Gateway routes, environment variables, and IAM roles for all environments.' },
          { title: 'yaml/', body: 'Additional CloudFormation and Stack templates for infrastructure setup.' },
        ],
        codeBlock: {
          language: 'bash',
          code: `ntv360-api/
├── apps/
│   ├── graphql/                              # GraphQL API application
│   │   └── src/
│   │       ├── modules/
│   │       │   ├── app/                      # GraphQL app module
│   │       │   └── user/                     # User module with resolvers
│   │       └── main.ts
│   ├── ntv360-api/                           # REST API application
│   │   └── src/
│   │       ├── modules/
│   │       │   ├── app/                      # REST app module
│   │       │   └── user/                     # User module with controllers
│   │       └── main.ts
│   └── ntv360-websocket/                     # WebSocket API application
│       ├── src/
│       │   ├── lambda.ts                     # AWS Lambda entry point
│       │   ├── modules/
│       │   │   └── app/                      # WebSocket module
│       │   └── main.ts
│       └── tsconfig.app.json
├── libs/
│   ├── core/                                 # Shared core library
│   │   ├── auth0-management/                 # Auth0 API integration
│   │   ├── common/                           # Common utilities
│   │   │   ├── bootstrap/                    # Bootstrap logic
│   │   │   ├── cookies/                      # Cookie management
│   │   │   ├── decorators/                   # Custom decorators
│   │   │   ├── filters/                      # Exception filters
│   │   │   ├── guards/                       # Auth/authorization guards
│   │   │   ├── interceptors/                 # Request/response interceptors
│   │   │   ├── middlewares/                  # Custom middlewares
│   │   │   ├── responses/                    # Standard response classes
│   │   │   └── transformers/                 # Data transformers
│   │   ├── constants/
│   │   │   └── tokens/                       # DI tokens
│   │   ├── dtos/                             # Data Transfer Objects
│   │   ├── entities/                         # Database entities with BaseMetadataEntity
│   │   ├── modules/                          # Shared modules
│   │   ├── services/                         # Business logic services
│   │   ├── strategies/                       # Passport auth strategies
│   │   └── utils/                            # Utility functions
│   └── types/                                # TypeScript type definitions
├── config/                                   # Configuration files
├── docs/                                     # Documentation
├── env/                                      # Environment variables (.env.*)
├── scripts/                                  # Build/deployment scripts
├── tools/                                    # Development tools (scaffold-entity.ts)
├── yaml/                                     # CloudFormation templates
├── template.yaml                             # AWS SAM config
├── nest-cli.json                             # NestJS CLI configuration
├── jest.config.cjs                           # Jest testing configuration
├── webpack.config.js                         # Webpack bundler config
└── package.json                              # Project dependencies`,
        },
      },
    },
    {
      id: 'be-environment-config',
      label: 'Environment Configuration',
      num: '04',
      content: {
        type: 'coding-patterns',
        layout: 'stack',
        patterns: [
          {
            title: 'Environment Variables Setup',
            description: 'All environments have dedicated .env files in the /env folder. Only .env.test is git-committed; others must be obtained from your team lead.',
            codeBlock: {
              language: 'bash',
              code: `# Environment file locations
env/.env           — Local development (localhost DB)
env/.env.dev       — Development environment (Aurora dev DB)
env/.env.staging   — Staging environment
env/.env.prod      — Production environment
env/.env.test      — Test environment (unit/e2e tests) [COMMITTED]

# Copy template and configure
cp env/.env.test env/.env
# Then ask team lead for actual values`,
            },
          },
          {
            title: 'Run Commands by Environment',
            description: 'Each npm run start command loads a specific .env file based on the environment flag.',
            codeBlock: {
              language: 'bash',
              code: `# Start REST API in different environments
npm run start              # Uses env/.env (local)
npm run start:dev          # Uses env/.env.dev (development)
npm run start:staging      # Uses env/.env.staging (staging)
npm run start:prod         # Runs built dist/ with env/.env.prod
npm run start:debug        # Debug mode with watch

# Start other apps
npm run start:dev --project graphql         # GraphQL API
npm run start:dev --project ntv360-websocket  # WebSocket`,
            },
          },
          {
            title: 'Build Commands by Environment',
            description: 'Build commands compile TypeScript and run tests before deployment.',
            codeBlock: {
              language: 'bash',
              code: `npm run build              # Clean + compile (uses env/.env)
npm run build:dev          # Clean + compile (dev environment)
npm run build:staging      # Tests + clean + compile (staging)
npm run build:prod         # Tests + clean + compile (production)`,
            },
          },
        ],
      },
    },
    {
      id: 'be-database-migrations',
      label: 'Database Migrations & Seeders',
      num: '05',
      content: {
        type: 'coding-patterns',
        layout: 'stack',
        patterns: [
          {
            title: 'Running Migrations',
            description: 'Apply all pending TypeORM migrations to create or update the database schema.',
            codeBlock: {
              language: 'bash',
              code: `# Run all pending migrations
npm run migrate run

# This creates or updates the database schema based on entity definitions`,
            },
          },
          {
            title: 'Running Seeders',
            description: 'Populate the database with initial or test data.',
            codeBlock: {
              language: 'bash',
              code: `# Run all seeders
npm run migrate seed

# This inserts initial data into the database for testing or setup`,
            },
          },
          {
            title: 'Creating New Migrations',
            description: 'Generate a new migration file when you modify entity structures. Always use camelCase for migration names.',
            codeBlock: {
              language: 'bash',
              code: `# Create a new migration
npm run migrate generate <migration-name>

# Example:
npm run migrate generate addDeviceStatusColumn

# This creates a new migration file that can be customized before running`,
            },
          },
        ],
      },
    },
    {
      id: 'be-entity-scaffolding',
      label: 'Entity Scaffolding',
      num: '06',
      content: {
        type: 'coding-patterns',
        layout: 'stack',
        patterns: [
          {
            title: 'Scaffold a Complete Entity Module',
            description: 'Generate a full module structure for both REST and GraphQL APIs with one command. The tool creates entities, DTOs, services, controllers, and tests.',
            codeBlock: {
              language: 'bash',
              code: `# Interactive mode
npx ts-node tools/scaffold-entity.ts

# Specify entity name
npx ts-node tools/scaffold-entity.ts device-category

# Preview without creating files
npx ts-node tools/scaffold-entity.ts device-category --dry-run`,
            },
          },
          {
            title: 'What Gets Generated',
            description: 'The scaffolding tool creates a complete module structure across all three apps and the core library.',
            codeBlock: {
              language: 'bash',
              code: `Generated files:
├── libs/core/src/
│   ├── entities/DeviceCategory.ts
│   ├── dtos/
│   │   ├── createDeviceCategory.dto.ts
│   │   ├── updateDeviceCategory.dto.ts
│   │   ├── deviceCategory.dto.ts
│   │   └── deviceCategoryRaw.dto.ts
│   ├── services/DeviceCategory.service.ts
│   └── services/DeviceCategory.service.spec.ts
├── apps/ntv360-api/src/modules/
│   ├── device-category/
│   │   ├── controller/deviceCategory.controller.ts
│   │   ├── controller/deviceCategory.controller.spec.ts
│   │   └── deviceCategory.module.ts
├── apps/graphql/src/modules/
│   ├── device-category/
│   │   ├── resolver/deviceCategory.resolver.ts
│   │   ├── resolver/deviceCategory.resolver.spec.ts
│   │   ├── response/deviceCategory.response.ts
│   │   └── deviceCategory.module.ts
└── apps/graphql/src/constants/Providers.ts [UPDATED]`,
            },
          },
        ],
      },
    },
    {
      id: 'be-deployment',
      label: 'Deployment Architecture',
      num: '07',
      content: {
        type: 'coding-patterns',
        layout: 'stack',
        patterns: [
          {
            title: 'Branch-based Deployment Strategy',
            description: 'Each branch automatically deploys to its corresponding AWS environment. Every deployment runs tests first.',
            codeBlock: {
              language: 'bash',
              code: `development branch → Development environment
staging branch     → Staging environment
production branch  → Production environment

All deployments:
1. Run lint + unit tests
2. Deploy independent Lambda applications via CloudFormation
3. Create/update stacks for each service`,
            },
          },
          {
            title: 'Manual Deployment Commands',
            description: 'Deploy specific applications to the development environment manually.',
            codeBlock: {
              language: 'bash',
              code: `# Deploy GraphQL application
npm run deploy:graphql-app

# Deploy REST API application
npm run deploy:rest-api-app

# Deploy both applications
npm run deploy:both-apps

# CloudFormation stacks created:
# - ntv360-graphql-app-{environment}
# - ntv360-rest-api-app-{environment}
# - ntv360-websocket-app-{environment}`,
            },
          },
          {
            title: 'API Endpoints — Development',
            description: 'Access the APIs during local development or in deployed environments.',
            codeBlock: {
              language: 'bash',
              code: `# Local Development
Swagger (REST API):     http://localhost:42052/api/docs#/
GraphQL Playground:     http://localhost:42055/graphql

# Development Environment (deployed)
Swagger:   https://{rest-api-id}.execute-api.us-east-1.amazonaws.com/development/api/docs
GraphQL:   https://{graphql-api-id}.execute-api.us-east-1.amazonaws.com/development/graphql

# Staging & Production
Same structure but /staging and /production paths
Production has Swagger & GraphQL Playground DISABLED for security`,
            },
          },
        ],
      },
    },
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
    {
      id: 'be-mistakes',
      label: 'Common Mistakes',
      num: '09',
      content: {
        type: 'mistakes',
        table: {
          headers: ['❌ Mistake', '✅ Correct Approach'],
          rows: [
            { cells: ['Hard-coding column names as strings in queries', 'Use BASE_*_FIELDS constants from libs/core via FieldMappingService'] },
            { cells: ['Storing UUIDs as VARCHAR(36)', 'Use BINARY(16) with UuidBinaryTransformer for all primary keys'] },
            { cells: ['Missing @Expose() on DTO properties', 'Decorate every DTO field with @Expose() and use excludeExtraneousValues: true'] },
            { cells: ['Returning raw entity objects from controllers', 'Return serialised DTOs — never expose database entities directly'] },
            { cells: ['Using process.env.KEY directly', "Use ConfigService.get<string>('KEY') for type-safe environment access"] },
            { cells: ['Committing directly to main or develop', 'Branch from develop (feat/, fix/) or main (hotfix/); open a PR'] },
            { cells: ['Extending a plain class instead of BaseMetadataEntity', 'All domain entities must extend BaseMetadataEntity for audit columns'] },
          ],
        },
      },
    },
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
