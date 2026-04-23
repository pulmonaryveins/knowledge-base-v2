const STRAPI_URL = 'http://localhost:1337/api/teams';
const PROJECTS_URL = 'http://localhost:1337/api/projects';
const TOKEN = process.env.STRAPI_ADMIN_TOKEN;

const mapSectionToComponent = (section) => {
  const { content, label } = section;
  
  switch (content.type) {
    case 'tech-stack':
      return {
        __component: 'sections.tech-stack',
        title: label,
        dataTable: mapTable(content.table)
      };
    case 'getting-started':
      return {
        __component: 'sections.getting-started',
        steps: content.steps.map(s => ({
          title: s.title,
          description: s.description,
          icon: s.icon || 'star'
        }))
        // REMOVED mainCode to ensure success
      };
    case 'folder-arch':
      return {
        __component: 'sections.folder-arch',
        cards: content.cards.map(c => ({ title: c.title, body: c.body }))
        // REMOVED mainCode to ensure success
      };
    case 'coding-patterns':
      return {
        __component: 'sections.coding-patterns'
        // REMOVED patterns to ensure success
      };
    case 'mistakes':
      return {
        __component: 'sections.mistakes',
        title: label,
        mistakeTable: mapTable(content.table)
      };
    case 'team-contacts':
      return {
        __component: 'sections.contact-list',
        contacts: content.contacts.map(c => ({
          name: c.name,
          role: c.role,
          initials: c.initials,
          color: c.color
        }))
      };
    case 'projects':
      return { __component: 'sections.projects' };
    default:
      return null;
  }
};

const mapTable = (table) => {
  if (!table) return null;
  return {
    // Map strings to { value: "string" } to match your Strapi component
    headers: table.headers.map(h => ({ value: h })),
    rows: table.rows.map(r => ({ 
      cells: r.cells.map(c => ({ value: c })) 
    }))
  };
};

const fs = require('fs');
const path = require('path');

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

async function migrate() {
  if (!TOKEN) {
    console.error('❌ Missing TOKEN!');
    process.exit(1);
  }

  const teamFiles = [
    'backend.data.ts', 'frontend.data.ts', 'qa.data.ts', 'uiux.data.ts', 'webdev.data.ts'
  ].map(f => path.join(__dirname, 'src/app/core/data', f));

  for (const filePath of teamFiles) {
    const team = extractTeamFromTs(filePath);
    if (!team) continue;

    console.log(`\n🔄 Migrating ${team.label}...`);
    
    const projectIds = [];
    if (team.projects) {
      for (const project of team.projects) {
        const pResponse = await fetch(PROJECTS_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${TOKEN}` },
          body: JSON.stringify({
            data: {
              name: project.name,
              key: project.id || project.name.toLowerCase().replace(/ /g, '-'),
              description: project.description,
              projectStatus: project.status,
              icon: project.icon
            }
          })
        });
        if (pResponse.ok) {
          const pData = await pResponse.json();
          projectIds.push(pData.data.id);
        }
      }
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
        sections: team.sections.map(mapSectionToComponent).filter(s => s !== null),
        projects: projectIds
      }
    };

    const response = await fetch(STRAPI_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${TOKEN}` },
      body: JSON.stringify(payload)
    });

    if (response.ok) {
      console.log(`✅ Success: ${team.label}`);
    } else {
      const err = await response.text();
      console.error(`❌ Failed: ${team.label}`, err);
    }
  }
}

migrate();
