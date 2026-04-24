const STRAPI_URL = 'http://localhost:1337/api/teams';
const PROJECTS_URL = 'http://localhost:1337/api/projects';
const TOKEN = process.env.STRAPI_ADMIN_TOKEN;

/**
 * Mapping logic for Dynamic Zone Sections
 */
const mapSectionToComponent = (section) => {
  const { content, label } = section;

  const base = {};

  switch (content.type) {
    case 'tech-stack':
      return {
        ...base,
        __component: 'sections.tech-stack',
        title: label,
        dataTable: mapTable(content.table),
      };
    case 'getting-started':
      return {
        ...base,
        __component: 'sections.getting-started',
        steps: content.steps.map((s) => ({
          title: s.title,
          description: s.description,
          icon: s.icon || 'star',
          code: s.code
            ? {
                code: s.code,
                language: s.language || 'bash',
              }
            : null,
        })),
        mainCode: [], // mainCode is an array type in Strapi; leave empty (populated via admin UI)
      };
    case 'folder-arch':
      return {
        ...base,
        __component: 'sections.folder-arch',
        cards: content.cards.map((c) => ({
          title: c.title,
          body: c.body,
          icon: c.icon,
          accent: c.accent,
        })),
        // mainCode is NOT a valid field on sections.folder-arch
      };
    case 'coding-patterns':
      // Probe: shared.coding-patterns is in the allowed list; sending minimal payload
      // to discover what field names the component accepts
      return {
        ...base,
        __component: 'shared.coding-patterns',
      };
    case 'mistakes':
      return {
        ...base,
        __component: 'sections.mistakes',
        title: label,
        mistakeTable: mapTable(content.table),
      };
    case 'team-contacts':
      return {
        ...base,
        __component: 'sections.contact-list',
        contacts: content.contacts.map((c) => ({
          name: c.name,
          role: c.role,
          initials: c.initials,
          color: c.color,
        })),
      };
    case 'projects':
      return { ...base, __component: 'sections.projects' };

    // UI/UX Specific Markers
    case 'nc-design-basics':
    case 'nc-ux-design':
    case 'nc-prototype':
    case 'nc-web-design':
      return { ...base, __component: `sections.${content.type}` };

    case 'nc-print-design':
    case 'nc-brand-storytelling':
      return {
        ...base,
        __component: 'shared.simple-text', // Fallback for missing components
        text: `### ${label}\n\nDocumentation for ${label} is coming soon.`,
      };

    case 'branding':
    case 'color-palette':
    case 'grid':
    case 'iconography':
    case 'spacing':
      return { ...base, __component: `sections.${content.type}` };

    case 'typography-scale':
      return { ...base, __component: 'sections.typography' };

    case 'button-showcase':
      return {
        ...base,
        __component: 'shared.simple-text',
        text: '### Button Showcase\n\nRefer to the design system for button specifications.',
      };

    default:
      console.warn(`⚠️ Unknown section type: ${content.type}`);
      return null;
  }
};

/**
 * Mapping logic for the complex Shared.Table component
 */
const mapTable = (table) => {
  if (!table) return null;
  return {
    headers: table.headers.map((h) => ({ value: h })),
    rows: table.rows.map((r) => ({
      cells: r.cells.map((c) => ({ value: c })),
    })),
  };
};

const fs = require('fs');
const path = require('path');

/**
 * Extract data from .ts files
 */
function extractTeamFromTs(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const cleanContent = content
    .replace(/import {.*?}.*?;/g, '')
    .replace(/export const .*?: Team =/g, 'return ')
    .replace(/;$/, '');
  try {
    return new Function(cleanContent)();
  } catch (e) {
    console.error(`❌ Parse error in ${path.basename(filePath)}`);
    return null;
  }
}

async function getExistingId(url, key) {
  // Check both published and draft states
  const response = await fetch(`${url}?filters[key][$eq]=${key}&status=draft`, {
    headers: { Authorization: `Bearer ${TOKEN}` },
  });
  if (response.ok) {
    const json = await response.json();
    return json.data && json.data.length > 0 ? json.data[0].id : null;
  }
  return null;
}

async function migrate() {
  if (!TOKEN) {
    console.error('❌ Missing STRAPI_ADMIN_TOKEN in environment!');
    process.exit(1);
  }

  const teamFiles = [
    'backend.data.ts',
    'frontend.data.ts',
    'pi-player.data.ts',
    'qa.data.ts',
    'rd.data.ts',
    'uiux.data.ts',
    'webdev.data.ts',
  ].map((f) => path.join(__dirname, 'src/app/core/data', f));

  for (const filePath of teamFiles) {
    if (!fs.existsSync(filePath)) continue;

    const team = extractTeamFromTs(filePath);
    if (!team) continue;

    console.log(`\n🔄 Migrating Team: ${team.label}...`);

    // 1. Migrate Projects first
    const projectIds = [];
    if (team.projects) {
      for (const project of team.projects) {
        const key = project.id || project.name.toLowerCase().replace(/ /g, '-');
        const existingId = await getExistingId(PROJECTS_URL, key);

        if (existingId) {
          console.log(`   - Project exists: ${project.name} (ID: ${existingId})`);
          projectIds.push(existingId);
          continue;
        }

        console.log(`   - Creating Project: ${project.name}`);
        const pResponse = await fetch(PROJECTS_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${TOKEN}` },
          body: JSON.stringify({
            data: {
              name: project.name,
              key: key,
              description: project.description,
              projectStatus: project.status,
              icon: project.icon,
              projectMeta: project.doc?.meta,
              purpose: project.doc?.purpose,
              features: project.doc?.features,
              folderStructure: project.doc?.folderStructure,
              gettingStarted: project.doc?.gettingStarted,
              contacts: project.doc?.contacts,
              links: project.doc?.links?.map((l) => ({
                ...l,
                type: l.type === 'deploy' ? 'live' : l.type,
              })),
            },
          }),
        });

        if (pResponse.ok) {
          const pData = await pResponse.json();
          projectIds.push(pData.data.id);
        } else {
          console.error(`   ❌ Failed project: ${project.name}`, await pResponse.text());
        }
      }
    }

    // 2. Migrate the Team (skip if already exists)
    const existingTeamId = await getExistingId(STRAPI_URL, team.key);

    if (existingTeamId) {
      console.log(`⏭️  Team already exists: ${team.label} (ID: ${existingTeamId}) — skipping`);
      continue;
    }

    const payload = {
      data: {
        label: team.label,
        key: team.key,
        color: team.color,
        gradient: team.gradient,
        icon: team.icon,
        subtitle: team.subtitle,
        description: team.description,
        sections: team.sections.map(mapSectionToComponent).filter((s) => s !== null),
        projects: { set: projectIds },
        publishedAt: new Date().toISOString(), // Publish immediately so the frontend API can see it
      },
    };

    const response = await fetch(STRAPI_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${TOKEN}` },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      console.log(`✅ Created: ${team.label}`);
    } else {
      const err = await response.json();
      console.error(`❌ Failed: ${team.label}`, JSON.stringify(err));
    }
  }
}

migrate();
