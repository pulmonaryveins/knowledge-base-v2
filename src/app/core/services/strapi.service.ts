// ── FILE: src/app/core/services/strapi.service.ts ──

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Tool } from '../models/tool.model';
import { StrapiResponse, StrapiEntity, TeamStrapi, ProjectStrapi } from '../models/strapi.model';

@Injectable({ providedIn: 'root' })
export class StrapiService {
  private readonly _http = inject(HttpClient);
  private readonly _baseUrl = environment.strapiUrl;
  private readonly _token = environment.strapiToken;

  /**
   * Fetch all registered tools from Strapi.
   */
  public getTools(): Observable<Tool[]> {
    const headers = this._getHeaders();

    return this._http
      .get<
        StrapiResponse<StrapiEntity<Tool>[]>
      >(`${this._baseUrl}/api/tools?populate=*`, { headers })
      .pipe(
        map((response) =>
          response.data.map((entity: any) => {
            const data = entity.attributes || entity;
            return {
              ...data,
              key: data.key || '',
              usedBy: data.usedBy || data.useBy || [],
            };
          }),
        ),
      );
  }

  /**
   * Fetch a single tool by its key.
   */
  public getToolByKey(key: string): Observable<Tool | undefined> {
    const headers = this._getHeaders();

    return this._http
      .get<
        StrapiResponse<StrapiEntity<Tool>[]>
      >(`${this._baseUrl}/api/tools?filters[key][$eq]=${key}&populate=*`, { headers })
      .pipe(
        map((response) => {
          if (!response.data || response.data.length === 0) return undefined;
          const entity: any = response.data[0];
          return entity.attributes || entity;
        }),
      );
  }

  /**
   * Fetch all Teams from Strapi.
   */
  public getTeams(): Observable<any[]> {
    const headers = this._getHeaders();
    // Deep populate: sections need per-component field population since
    // nested components (dataTable.headers, steps.code, etc.) are not
    // included with a shallow populate=*
    const query = [
      'populate[projects][populate]=*',
      'populate[sections][populate]=*',
      // Deeply populated sections
      'populate[sections][on][sections.tech-stack][populate][dataTable][populate][headers][populate]=*',
      'populate[sections][on][sections.tech-stack][populate][dataTable][populate][rows][populate][cells][populate]=*',
      'populate[sections][on][sections.getting-started][populate][steps][populate][code][populate]=*',
      'populate[sections][on][shared.coding-patterns][populate][patterns][populate][rules][populate]=*',
      'populate[sections][on][shared.coding-patterns][populate][patterns][populate][code][populate]=*',
      'populate[sections][on][shared.coding-patterns][populate][patterns][populate][callout][populate]=*',
      'populate[sections][on][sections.folder-arch][populate][cards][populate]=*',
      'populate[sections][on][sections.folder-arch][populate][maincode][populate]=*',
      'populate[sections][on][sections.grid][populate][groups][populate][screens][populate]=*',
      'populate[sections][on][sections.iconography][populate][sizes][populate]=*',
      'populate[sections][on][sections.iconography][populate][icons][populate]=*',
      'populate[sections][on][sections.spacing][populate][groups][populate][tokens][populate]=*',
      'populate[sections][on][sections.typography-scale][populate][tabs][populate][columns][populate][rows][populate]=*',
      'populate[sections][on][sections.qa-stages][populate][steps][populate][code][populate]=*',
      'populate[sections][on][sections.nc-phase][populate]=*',
      'populate[sections][on][sections.mistakes][populate][mistakeTable][populate][headers][populate]=*',
      'populate[sections][on][sections.mistakes][populate][mistakeTable][populate][rows][populate][cells][populate]=*',
      'populate[sections][on][sections.button-showcase][populate][tabs][populate]=*',
      'populate[sections][on][sections.contact-list][populate][contacts][populate]=*',
      'populate[sections][on][sections.projects][populate]=*',
      'populate[sections][on][sections.branding][populate][mainLogos][populate]=*',
      'populate[sections][on][sections.branding][populate][favicon][populate]=*',
      'populate[sections][on][sections.branding][populate][sidebarCollapsed][populate]=*',
      'populate[sections][on][sections.branding][populate][sidebarExpanded][populate]=*',
      'populate[sections][on][sections.color-palette][populate][tabs][populate][groups][populate][swatches][populate]=*',
      'populate[sections][on][sections.color-palette][populate][tabs][populate][wcagPairs][populate]=*',
    ].join('&');
    return this._http
      .get<
        StrapiResponse<StrapiEntity<TeamStrapi>[]>
      >(`${this._baseUrl}/api/teams?${query}`, { headers })
      .pipe(
        map((response) => {
          console.log('[StrapiService] Raw teams response:', response);
          return response.data.map((entity) => this._mapStrapiTeam(entity));
        }),
      );
  }

  /**
   * Fetch all Projects from Strapi.
   */
  public getProjects(): Observable<any[]> {
    const headers = this._getHeaders();
    return this._http
      .get<
        StrapiResponse<StrapiEntity<ProjectStrapi>[]>
      >(`${this._baseUrl}/api/projects?populate=*`, { headers })
      .pipe(
        map((response) => {
          console.log('[StrapiService] Raw projects response:', response);
          return response.data.map((entity) => {
            const data: any = entity.attributes || entity;
            const teamData = data.team?.data?.attributes || data.team?.data || data.team;
            return {
              ...data,
              id: data.key || entity.id?.toString() || data.id?.toString(),
              status: data.projectStatus || data.status,
              teamKey: teamData?.key || '',
            };
          });
        }),
      );
  }

  /**
   * Fetch the landing page with all sections populated.
   */
  public getLandingPage(): Observable<any> {
    const headers = this._getHeaders();
    const query = [
      'populate[sections][on][landing.hero][populate][links]=*',
      'populate[sections][on][landing.stats-item]=*',
      'populate[sections][on][landing.team-showcase]=*',
      'populate[sections][on][landing.features-grid][populate][items]=*',
      'populate[sections][on][landing.company-about][populate][bullets]=*',
      'populate[sections][on][landing.company-about][populate][metaItems]=*',
      'populate[sections][on][landing.company-about][populate][venues]=*',
      'populate[sections][on][landing.company-about][populate][link]=*',
      'populate[sections][on][landing.cta-banner][populate][links]=*',
    ].join('&');

    return this._http
      .get<any>(`${this._baseUrl}/api/landing-page?${query}`, { headers })
      .pipe(map((r) => r.data));
  }

  /**
   * Fetch the navbar with links and CTA populated.
   */
  public getNavbar(): Observable<any> {
    const headers = this._getHeaders();
    return this._http
      .get<any>(`${this._baseUrl}/api/navbar?populate[links]=*&populate[cta]=*`, { headers })
      .pipe(map((r) => r.data));
  }

  private _mapStrapiTeam(entity: StrapiEntity<TeamStrapi>): any {
    const data: any = entity.attributes || entity;
    return {
      ...data,
      key: data.key || '',
      projects:
        (Array.isArray(data.projects) ? data.projects : data.projects?.data || []).map((p: any) => {
          const pData = p.attributes || p;
          return {
            ...pData,
            id: pData.key || p.id?.toString() || pData.id?.toString(),
            status: pData.projectStatus || pData.status,
            teamKey: data.key || '',
            teamColor: data.color || '#000000',
            doc: {
              meta: pData.projectMeta || { stack: '', repo: '', deploy: '', sprint: '' },
              purpose: pData.purpose || '',
              features: pData.features || [],
              folderStructure: pData.folderStructure || { code: '', language: 'bash' },
              gettingStarted: pData.gettingStarted || [],
              contacts: pData.contacts || [],
              links: pData.links || [],
            },
          };
        }) || [],
      sections: (data.sections || [])
        .map((s: any, idx: number) => this._mapSection(s, idx))
        .filter((s: any) => !!s),
    };
  }

  private _mapSection(s: any, idx: number): any {
    if (!s || !s.__component) return null;

    // Resolve centralized NC Phase to its specific type
    const componentName =
      s.__component === 'sections.nc-phase'
        ? `sections.${s.phase || 'nc-design-basics'}`
        : s.__component;

    const typeMap: Record<string, string> = {
      'sections.tech-stack': 'tech-stack',
      'sections.qa-stages': 'getting-started',
      'sections.getting-started': 'getting-started',
      'sections.folder-arch': 'folder-arch',
      'sections.coding-patterns': 'coding-patterns',
      'shared.coding-patterns': 'coding-patterns', // Also support shared.coding-patterns
      'sections.mistakes': 'mistakes',
      'sections.contact-list': 'team-contacts',
      'sections.projects': 'projects',
    };

    const type = typeMap[componentName] || componentName?.replace('sections.', '') || 'unknown';

    // Base section structure
    const section: any = {
      // Use component name + id for guaranteed unique keys
      id: s.key || `sec-${componentName.replace('.', '-')}-${s.id}`,
      label: s.title || s.label || s.sectionTitle || this._getDefaultLabel(type),
      num: (idx + 1).toString().padStart(2, '0'),
      subHeader: s.subHeader || '',
      content: { type },
    };

    // Deep mapping handlers
    switch (type) {
      case 'grid':
        section.content.groups = (s.groups || []).map((g: any) => ({
          sectionLabel: g.sectionLabel,
          tierLabel: g.tierLabel,
          screens: (g.screens || []).map((sc: any) => ({
            width: sc.width,
            height: sc.height,
          })),
        }));
        section.content.description = s.description || '';
        break;

      case 'iconography':
        section.content.sizes = (s.sizes || []).map((sz: any) => ({ px: sz.px }));
        section.content.icons = (s.icons || []).map((i: any) => ({
          name: i.name,
          faClass: i.faClass,
          description: i.description,
        }));
        section.content.description = s.description || '';
        break;

      case 'spacing':
        section.content.groups = (s.groups || []).map((g: any) => ({
          label: g.label,
          description: g.description,
          tokens: (g.tokens || []).map((t: any) => ({
            name: t.name,
            px: t.px,
            rem: t.rem,
            tailwind: t.tailwind,
            usage: t.usage,
          })),
        }));
        section.content.note = s.note || '';
        section.content.description = s.description || '';
        break;

      case 'button-showcase':
        section.content.tabs = (s.tabs || []).map((t: any) => ({
          label: t.label,
          variant: t.variant,
          defaultTag: t.defaultTag,
        }));
        break;

      case 'tech-stack':
        const dt = Array.isArray(s.dataTable) ? s.dataTable[0] : s.dataTable;
        section.content.table = dt
          ? {
              headers: dt.headers?.map((h: any) => h.value) || [],
              rows:
                dt.rows?.map((r: any) => ({
                  cells: r.cells?.map((c: any) => c.value) || [],
                })) || [],
            }
          : null;
        break;

      case 'mistakes':
        // Support both mistakeTable (migration) and dataTable (legacy)
        const mt = s.mistakeTable || s.dataTable;
        const mtData = Array.isArray(mt) ? mt[0] : mt;
        section.content.table = mtData
          ? {
              headers: mtData.headers?.map((h: any) => h.value) || [],
              rows:
                mtData.rows?.map((r: any) => ({
                  cells: r.cells?.map((c: any) => c.value) || [],
                })) || [],
            }
          : null;
        break;

      case 'getting-started':
        section.content.steps = (s.steps || []).map((step: any) => ({
          title: step.title,
          description: step.description,
          icon: step.icon,
          code: step.code?.code || '',
          language: step.code?.language || 'bash',
        }));
        section.content.layout = s.layout || 'list';
        const mc = Array.isArray(s.mainCode) ? s.mainCode[0] : s.mainCode;
        section.content.codeBlock = mc
          ? { code: mc.code || '', language: mc.language || 'bash' }
          : null;
        break;

      case 'folder-arch':
        section.content.cards = (s.cards || []).map((c: any) => ({ title: c.title, body: c.body }));
        // Note: Strapi returns 'maincode' (lowercase) for folder-arch in this version
        const fc = s.maincode || s.mainCode;
        section.content.codeBlock = fc
          ? { code: fc.code || '', language: fc.language || 'bash' }
          : null;
        break;

      case 'coding-patterns':
        section.content.patterns = (s.patterns || []).map((p: any) => ({
          title: p.title,
          description: p.description,
          rules: p.rules?.map((r: any) => r.value) || [],
          codeBlock: p.code
            ? { code: p.code.code || '', language: p.code.language || 'typescript' }
            : null,
          callout: p.callout ? { type: p.callout.type, message: p.callout.message } : null,
        }));
        section.content.layout = s.layout || 'grid';
        break;

      case 'team-contacts':
        section.content.contacts = (s.contacts || []).map((c: any) => ({
          name: c.name,
          role: c.role,
          initials: c.initials,
          color: c.color,
        }));
        break;

      case 'projects':
        // No specific mapping needed, triggers related projects list
        break;

      case 'branding':
        const mapAsset = (a: any) => {
          const media = a.asset;
          let url = '';
          if (media) {
            // Strapi 5 / 4 simplified or flattened media
            url = media.url || media.data?.attributes?.url || media.data?.url || '';
          }

          return {
            label: a.label,
            src: url ? (url.startsWith('/') ? `${this._baseUrl}${url}` : url) : '',
            background: a.background,
            bordered: a.bordered,
            width: a.width,
            height: a.height,
            color: a.color,
          };
        };

        section.content.mainLogos = (s.mainLogos || []).map(mapAsset);
        section.content.favicon = s.favicon ? mapAsset(s.favicon) : null;
        section.content.sidebarCollapsed = (s.sidebarCollapsed || []).map(mapAsset);
        section.content.sidebarExpanded = (s.sidebarExpanded || []).map(mapAsset);
        break;

      case 'color-palette':
        section.content.tabs = (s.tabs || []).map((t: any) => {
          const tab: any = {
            label: t.label,
            type: t.type,
          };
          if (t.type === 'wcag') {
            tab.wcagPairs = (t.wcagPairs || []).map((p: any) => ({
              label: p.label,
              foreground: p.foreground,
              background: p.background,
              ratio: p.ratio,
              aaNormal: p.aaNormal,
              aaLarge: p.aaLarge,
              aaaNormal: p.aaaNormal,
              aaaLarge: p.aaaLarge,
            }));
            tab.wcagNote = t.wcagNote || '';
          } else {
            tab.groups = (t.groups || []).map((g: any) => {
              const group: any = { label: g.label };
              const swatches = (g.swatches || []).map((sw: any) => ({
                name: sw.name,
                hex: sw.hex,
              }));
              if (t.type === 'overview') {
                group.main = swatches;
              } else {
                group.shades = swatches;
              }
              return group;
            });
          }
          return tab;
        });
        break;

      case 'typography-scale':
        section.content.tabs = (s.tabs || []).map((t: any) => ({
          label: t.label,
          fontName: t.fontName,
          preview: t.preview,
          columns: (t.columns || []).map((col: any) => ({
            label: col.label,
            weight: col.weight,
            rows: (col.rows || []).map((row: any) => ({
              tag: row.tag,
              size: row.size,
            })),
          })),
        }));
        break;

      default:
        section.content = { ...section.content, ...s };
    }

    return section;
  }

  private _getDefaultLabel(type: string): string {
    const labels: Record<string, string> = {
      'tech-stack': 'Tech Stack Overview',
      'getting-started': 'Getting Started',
      'folder-arch': 'Folder Architecture',
      'coding-patterns': 'Coding Patterns',
      mistakes: 'Common Mistakes',
      projects: 'Projects',
      'team-contacts': 'Team Contacts',
      branding: 'Brand Guide',
      'color-palette': 'Color Palette',
      grid: 'Grid & Breakpoints',
      iconography: 'Iconography',
      spacing: 'Spacing & Layout',
      typography: 'Typography Scale',
      'nc-design-basics': 'Phase 1 - Design Basics',
      'nc-ux-design': 'Phase 2 - UX Design',
      'nc-wireframing': 'Phase 3 - Wireframing',
      'nc-prototype': 'Phase 4 - Prototyping',
      'nc-web-design': 'Phase 5 - Web Design',
      'nc-print-design': 'Phase 6 - Print Design',
      'nc-brand-storytelling': 'Phase 7 - Brand & Storytelling',
    };
    return (
      labels[type] ||
      type
        .split('-')
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ')
    );
  }

  private _getHeaders(): HttpHeaders | undefined {
    return this._token
      ? new HttpHeaders().set('Authorization', `Bearer ${this._token}`)
      : undefined;
  }
}
