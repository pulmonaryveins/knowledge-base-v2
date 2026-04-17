// ── FILE: src/app/core/data/backend.data.ts ──

import { Team } from '../models/team.model';

export const backendTeam: Team = {
  key: 'backend',
  label: 'Backend',
  color: '#7C3AED',
  gradient: 'linear-gradient(135deg, #1e1035, #3b1d6e)',
  icon: 'server',
  subtitle: 'NestJS Monorepo · AWS Lambda (SAM) · TypeORM · MySQL · GraphQL',
  stats: [
    { label: 'API Apps', value: '3' },
    { label: 'Endpoints', value: '148' },
    { label: 'API Uptime', value: '99.97%' },
    { label: 'Avg Latency', value: '38ms' },
  ],
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
            { cells: ['NestJS', '10.x', 'Opinionated Node.js framework — monorepo with 3 apps', 'Live'] },
            { cells: ['TypeORM', '0.3', 'ORM for entity definitions, migrations, and field mapping', 'Live'] },
            { cells: ['MySQL', '8.x', 'Primary relational database; UUIDs stored as BINARY(16)', 'Live'] },
            { cells: ['GraphQL / Apollo', '4.x', 'Schema-first GraphQL API via @nestjs/graphql', 'Dev'] },
            { cells: ['Socket.IO', '4.x', 'Real-time WebSocket gateway for device health events', 'Live'] },
            { cells: ['AWS SAM', '1.x', 'Serverless deployment template for all three Lambda apps', 'Live'] },
            { cells: ['AWS Lambda', 'N/A', 'Serverless compute — each monorepo app is one Lambda function', 'Live'] },
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
          { icon: 'git-branch',        title: 'Clone the Monorepo', description: 'Clone the NTV360 monorepo and install all dependencies.', code: 'git clone git@github.com:nctv/ntv360-monorepo.git\ncd ntv360-monorepo && npm install', language: 'bash' },
          { icon: 'container',         title: 'Start MySQL', description: 'Spin up the local MySQL database with Docker Compose.', code: 'docker-compose up -d mysql', language: 'bash' },
          { icon: 'key-round',         title: 'Configure Environment', description: 'Copy the env template and set your local database URL and secrets.', code: 'cp .env.example .env\n# Set DATABASE_URL, JWT_SECRET, AWS_REGION', language: 'bash' },
          { icon: 'arrow-right-left',  title: 'Run Migrations', description: 'Apply all pending TypeORM migrations to create the schema.', code: 'npm run migration:run', language: 'bash' },
          { icon: 'terminal',          title: 'Start an App', description: 'Launch any of the three apps in watch mode.', code: 'npm run start:dev ntv360-api       # REST API → :3000\nnpm run start:dev graphql          # GraphQL  → :3001\nnpm run start:dev ntv360-websocket # WebSocket → :3002', language: 'bash' },
        ],
        codeBlock: {
          language: 'bash',
          code: `# Full local setup
git clone git@github.com:nctv/ntv360-monorepo.git
cd ntv360-monorepo && npm install
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
          { title: 'apps/', body: 'Three deployable NestJS applications: ntv360-api (REST), graphql (GraphQL), and ntv360-websocket. Each compiles to its own Lambda bundle via SAM.' },
          { title: 'libs/core/', body: 'Shared library consumed by all three apps. Contains BaseMetadataEntity, FieldMappingService, UuidBinaryTransformer, shared DTOs, and common decorators.' },
          { title: 'libs/core/entities/', body: 'BaseMetadataEntity extends all domain entities with audit columns: created_at/by, updated_at/by, deleted_at/by. UUIDs stored as BINARY(16) via UuidBinaryTransformer.' },
          { title: 'template.yaml', body: 'AWS SAM template defining all Lambda functions, API Gateway routes, environment variables, and IAM roles for production deployment.' },
        ],
        codeBlock: {
          language: 'bash',
          code: `ntv360-monorepo/
├── apps/
│   ├── ntv360-api/
│   │   └── src/
│   │       ├── modules/
│   │       │   ├── devices/
│   │       │   ├── schedules/
│   │       │   └── auth/
│   │       └── main.ts
│   ├── graphql/
│   │   └── src/
│   │       ├── modules/
│   │       └── main.ts
│   └── ntv360-websocket/
│       └── src/
│           ├── gateways/
│           └── main.ts
├── libs/
│   └── core/
│       ├── entities/        # BaseMetadataEntity
│       ├── services/        # FieldMappingService
│       ├── dto/             # Shared DTOs
│       └── transformers/    # UuidBinaryTransformer
├── template.yaml            # AWS SAM config
└── nest-cli.json`,
        },
      },
    },
    {
      id: 'be-coding-patterns',
      label: 'Coding Patterns',
      num: '04',
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
      num: '05',
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
      num: '06',
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
