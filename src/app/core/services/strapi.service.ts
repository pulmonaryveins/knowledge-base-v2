// ── FILE: src/app/core/services/strapi.service.ts ──

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Tool } from '../models/tool.model';
import { Team, TeamSection, SectionContent } from '../models/team.model';
import { Project } from '../models/project.model';
import {
  StrapiResponse,
  StrapiEntity,
  StrapiComponent,
  TeamStrapi,
  ProjectStrapi,
  StrapiDataTable,
  StrapiStep,
  StrapiCodingPattern,
  StrapiInfoCard,
  StrapiContact,
  StrapiGridGroup,
  StrapiIconSize,
  StrapiIcon,
  StrapiSpacingGroup,
  StrapiButtonTab,
  StrapiAssetEntry,
  StrapiColorTab,
  StrapiTypographyTab,
  StrapiNavbar,
  StrapiFooter,
  StrapiLandingPage,
  StrapiCodeBlock,
} from '../models/strapi.model';
import { ColorGroup, ColorTab, BrandingLogoItem } from '../models/ui.models';

/**
 * Service responsible for interacting with the Strapi CMS API.
 * Handles fetching and mapping tools, teams, projects, landing page, and navbar data.
 */
@Injectable({ providedIn: 'root' })
export class StrapiService {
  private readonly _http = inject(HttpClient);
  private readonly _baseUrl = environment.strapiUrl;
  private readonly _token = environment.strapiToken;

  /**
   * Fetch all registered tools from Strapi.
   *
   * @returns {Observable<Tool[]>} An observable containing an array of Tool objects.
   */
  public getTools(): Observable<Tool[]> {
    const headers = this._getHeaders();

    return this._http
      .get<
        StrapiResponse<StrapiEntity<Tool>[]>
      >(`${this._baseUrl}/api/tools?populate=*`, { headers })
      .pipe(
        map((response) =>
          response.data.map((entity: StrapiEntity<Tool>) => {
            const data = entity.attributes || (entity as unknown as Tool);
            return {
              ...data,
              key: data.key || '',
              usedBy: data.usedBy || [],
            };
          }),
        ),
      );
  }

  /**
   * Fetch a single tool by its unique key.
   *
   * @param {string} key - The unique identifier for the tool.
   * @returns {Observable<Tool | undefined>} An observable containing the Tool object if found, otherwise undefined.
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
          const entity: StrapiEntity<Tool> = response.data[0];
          return (entity.attributes || entity) as unknown as Tool;
        }),
      );
  }

  /**
   * Fetch all Teams from Strapi with deeply populated sections.
   *
   * @returns {Observable<Team[]>} An observable containing an array of mapped Team objects.
   */
  public getTeams(): Observable<Team[]> {
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
   *
   * @returns {Observable<Project[]>} An observable containing an array of mapped Project objects.
   */
  public getProjects(): Observable<Project[]> {
    const headers = this._getHeaders();
    return this._http
      .get<
        StrapiResponse<StrapiEntity<ProjectStrapi>[]>
      >(`${this._baseUrl}/api/projects?populate=*`, { headers })
      .pipe(
        map((response) => {
          console.log('[StrapiService] Raw projects response:', response);
          return response.data.map((entity) => {
            const data: ProjectStrapi = entity.attributes || (entity as unknown as ProjectStrapi);
            const teamRelation = data.team?.data;
            const teamData: TeamStrapi | undefined =
              teamRelation?.attributes ?? (teamRelation as unknown as TeamStrapi | undefined);
            return {
              ...data,
              id: data.key || entity.id?.toString() || '',
              status: data.projectStatus,
              teamKey: teamData?.key || '',
            } as unknown as Project;
          });
        }),
      );
  }

  /**
   * Fetch the landing page content with all sections populated.
   *
   * @returns {Observable<StrapiLandingPage>} An observable containing the mapped StrapiLandingPage object.
   */
  public getLandingPage(): Observable<StrapiLandingPage> {
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
      .get<
        StrapiResponse<StrapiLandingPage>
      >(`${this._baseUrl}/api/landing-page?${query}`, { headers })
      .pipe(map((r) => r.data));
  }

  /**
   * Fetch the navbar content with links and CTA populated.
   *
   * @returns {Observable<StrapiNavbar>} An observable containing the mapped StrapiNavbar object.
   */
  public getNavbar(): Observable<StrapiNavbar> {
    const headers = this._getHeaders();
    return this._http
      .get<
        StrapiResponse<StrapiNavbar>
      >(`${this._baseUrl}/api/navbar?populate[links]=*&populate[cta]=*`, { headers })
      .pipe(map((r) => r.data));
  }
  /**
   * Fetch the footer content with links populated.
   *
   * @returns {Observable<StrapiFooter>} An observable containing the mapped StrapiFooter object.
   */
  public getFooter(): Observable<StrapiFooter> {
    const headers = this._getHeaders();
    return this._http
      .get<StrapiResponse<StrapiFooter>>(`${this._baseUrl}/api/footer?populate[links]=*`, { headers })
      .pipe(map((r) => r.data));
  }

  /**
   * Maps a raw Strapi team entity to the frontend Team model.
   *
   * @param {StrapiEntity<TeamStrapi>} entity - The raw team entity from Strapi.
   * @returns {Team} The mapped Team object.
   * @private
   */
  private _mapStrapiTeam(entity: StrapiEntity<TeamStrapi>): Team {
    const data: TeamStrapi = entity.attributes || (entity as unknown as TeamStrapi);
    const rawProjects: Array<StrapiEntity<ProjectStrapi> | ProjectStrapi> = Array.isArray(
      data.projects,
    )
      ? (data.projects as Array<StrapiEntity<ProjectStrapi>>)
      : (data.projects as { data: StrapiEntity<ProjectStrapi>[] })?.data || [];

    return {
      ...data,
      key: data.key || '',
      projects: rawProjects.map((p) => {
        const pData: ProjectStrapi =
          (p as StrapiEntity<ProjectStrapi>).attributes || (p as unknown as ProjectStrapi);
        return {
          ...pData,
          id: pData.key || (p as StrapiEntity<ProjectStrapi>).id?.toString() || '',
          status: pData.projectStatus,
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
        } as unknown as Project;
      }),
      sections: (data.sections || [])
        .map((s: StrapiComponent, idx: number) => this._mapSection(s, idx))
        .filter((s): s is TeamSection => !!s),
    } as unknown as Team;
  }

  /**
   * Maps a raw Strapi dynamic zone component to a TeamSection.
   * Resolves component names to internal types and deep-maps nested fields.
   *
   * @param {StrapiComponent} s - The raw Strapi component data.
   * @param {number} idx - The index of the section in the ordered list.
   * @returns {TeamSection | null} The mapped TeamSection object or null if invalid.
   *
   * @example
   * const section = this._mapSection({ __component: 'sections.tech-stack', ... }, 0);
   * @private
   */
  private _mapSection(s: StrapiComponent, idx: number): TeamSection | null {
    if (!s || !s.__component) return null;

    // Resolve centralized NC Phase to its specific type
    const componentName =
      s.__component === 'sections.nc-phase'
        ? `sections.${(s['phase'] as string) || 'nc-design-basics'}`
        : s.__component;

    const typeMap: Record<string, string> = {
      'sections.tech-stack': 'tech-stack',
      'sections.qa-stages': 'getting-started',
      'sections.getting-started': 'getting-started',
      'sections.folder-arch': 'folder-arch',
      'sections.coding-patterns': 'coding-patterns',
      'shared.coding-patterns': 'coding-patterns',
      'sections.mistakes': 'mistakes',
      'sections.contact-list': 'team-contacts',
      'sections.projects': 'projects',
    };

    const type = typeMap[componentName] || componentName?.replace('sections.', '') || 'unknown';

    /** Shared base fields reused in every case */
    const base = {
      id: (s['key'] as string) || `sec-${componentName.replace('.', '-')}-${s.id}`,
      label:
        (s['title'] as string) ||
        (s['label'] as string) ||
        (s['sectionTitle'] as string) ||
        this._getDefaultLabel(type),
      num: (idx + 1).toString().padStart(2, '0'),
      subHeader: (s['subHeader'] as string) || '',
    } as const;

    // Each case constructs and returns the full TeamSection so readonly fields
    // are satisfied at object-literal creation time (not via post-hoc assignment).
    switch (type) {
      case 'grid': {
        const groups = (s['groups'] as StrapiGridGroup[] | undefined) || [];
        return {
          ...base,
          content: {
            type: 'grid',
            description: (s['description'] as string) || '',
            groups: groups.map((g) => ({
              sectionLabel: g.sectionLabel,
              tierLabel: g.tierLabel,
              screens: (g.screens || []).map((sc) => ({ width: sc.width, height: sc.height })),
            })),
          },
        };
      }

      case 'iconography': {
        const sizes = (s['sizes'] as StrapiIconSize[] | undefined) || [];
        const icons = (s['icons'] as StrapiIcon[] | undefined) || [];
        return {
          ...base,
          content: {
            type: 'iconography',
            description: (s['description'] as string) || '',
            sizes: sizes.map((sz) => ({ px: sz.px })),
            icons: icons.map((i) => ({
              name: i.name,
              faClass: i.faClass,
              description: i.description,
            })),
          },
        };
      }

      case 'spacing': {
        const groups = (s['groups'] as StrapiSpacingGroup[] | undefined) || [];
        return {
          ...base,
          content: {
            type: 'spacing',
            description: (s['description'] as string) || '',
            note: (s['note'] as string) || '',
            groups: groups.map((g) => ({
              label: g.label,
              description: g.description,
              tokens: (g.tokens || []).map((t) => ({
                name: t.name,
                px: t.px,
                rem: t.rem,
                tailwind: t.tailwind,
                usage: t.usage,
              })),
            })),
          },
        };
      }

      case 'button-showcase': {
        const tabs = (s['tabs'] as StrapiButtonTab[] | undefined) || [];
        return {
          ...base,
          content: {
            type: 'button-showcase',
            tabs: tabs.map((t) => ({
              label: t.label,
              variant: t.variant,
              defaultTag: t.defaultTag,
            })),
          },
        };
      }

      case 'tech-stack': {
        const rawDt = s['dataTable'] as StrapiDataTable | StrapiDataTable[] | undefined;
        const dt: StrapiDataTable | undefined = Array.isArray(rawDt) ? rawDt[0] : rawDt;
        return {
          ...base,
          content: {
            type: 'tech-stack',
            table: dt
              ? {
                  headers: dt.headers?.map((h) => h.value) || [],
                  rows: dt.rows?.map((r) => ({ cells: r.cells?.map((c) => c.value) || [] })) || [],
                }
              : { headers: [], rows: [] },
          },
        };
      }

      case 'mistakes': {
        // Support both mistakeTable (migration) and dataTable (legacy)
        const rawMt = (s['mistakeTable'] || s['dataTable']) as
          | StrapiDataTable
          | StrapiDataTable[]
          | undefined;
        const mtData: StrapiDataTable | undefined = Array.isArray(rawMt) ? rawMt[0] : rawMt;
        return {
          ...base,
          content: {
            type: 'mistakes',
            table: mtData
              ? {
                  headers: mtData.headers?.map((h) => h.value) || [],
                  rows:
                    mtData.rows?.map((r) => ({ cells: r.cells?.map((c) => c.value) || [] })) || [],
                }
              : { headers: [], rows: [] },
          },
        };
      }

      case 'getting-started': {
        const steps = (s['steps'] as StrapiStep[] | undefined) || [];
        const rawMc = s['mainCode'] as StrapiCodeBlock | StrapiCodeBlock[] | undefined;
        const mc: StrapiCodeBlock | undefined = Array.isArray(rawMc) ? rawMc[0] : rawMc;
        return {
          ...base,
          content: {
            type: 'getting-started',
            layout: ((s['layout'] as string) || 'list') as 'grid',
            steps: steps.map((step) => ({
              title: step.title,
              description: step.description,
              icon: step.icon,
              code: step.code?.code || '',
              language: step.code?.language || 'bash',
            })),
            codeBlock: mc ? { code: mc.code || '', language: mc.language || 'bash' } : undefined,
          },
        };
      }

      case 'folder-arch': {
        const cards = (s['cards'] as StrapiInfoCard[] | undefined) || [];
        // Note: Strapi returns 'maincode' (lowercase) for folder-arch in this version
        const fc = (s['maincode'] || s['mainCode']) as StrapiCodeBlock | undefined;
        return {
          ...base,
          content: {
            type: 'folder-arch',
            cards: cards.map((c) => ({ title: c.title, body: c.body })),
            codeBlock: fc ? { code: fc.code || '', language: fc.language || 'bash' } : undefined,
          },
        };
      }

      case 'coding-patterns': {
        const patterns = (s['patterns'] as StrapiCodingPattern[] | undefined) || [];
        return {
          ...base,
          content: {
            type: 'coding-patterns',
            layout: (s['layout'] as 'stack' | undefined) || undefined,
            patterns: patterns.map((p) => ({
              title: p.title,
              description: p.description,
              rules: p.rules?.map((r) => r.value) || [],
              codeBlock: p.code
                ? { code: p.code.code || '', language: p.code.language || 'typescript' }
                : undefined,
              callout: p.callout
                ? {
                    type: p.callout.type as 'tip' | 'warning' | 'info' | 'danger',
                    body: p.callout.message,
                  }
                : undefined,
            })),
          },
        };
      }

      case 'team-contacts': {
        const contacts = (s['contacts'] as StrapiContact[] | undefined) || [];
        return {
          ...base,
          content: {
            type: 'team-contacts',
            contacts: contacts.map((c) => ({
              name: c.name,
              role: c.role,
              initials: c.initials,
              color: c.color,
            })),
          },
        };
      }

      case 'projects':
        return { ...base, content: { type: 'projects' } };

      case 'branding': {
        const mapAsset = (a: StrapiAssetEntry): BrandingLogoItem => {
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

        const mainLogos = (s['mainLogos'] as StrapiAssetEntry[] | undefined) || [];
        const faviconEntry = s['favicon'] as StrapiAssetEntry | undefined;
        const sidebarCollapsed = (s['sidebarCollapsed'] as StrapiAssetEntry[] | undefined) || [];
        const sidebarExpanded = (s['sidebarExpanded'] as StrapiAssetEntry[] | undefined) || [];

        return {
          ...base,
          content: {
            type: 'branding',
            mainLogos: mainLogos.map(mapAsset),
            favicon: faviconEntry ? mapAsset(faviconEntry) : undefined,
            sidebarCollapsed: sidebarCollapsed.map(mapAsset),
            sidebarExpanded: sidebarExpanded.map(mapAsset),
          },
        };
      }

      case 'color-palette': {
        const tabs = (s['tabs'] as StrapiColorTab[] | undefined) || [];
        return {
          ...base,
          content: {
            type: 'color-palette',
            tabs: tabs.map((t): ColorTab => {
              if (t.type === 'wcag') {
                return {
                  label: t.label,
                  type: 'wcag',
                  wcagPairs: (t.wcagPairs || []).map((p) => ({
                    label: p.label,
                    foreground: p.foreground,
                    background: p.background,
                    ratio: p.ratio,
                    aaNormal: p.aaNormal,
                    aaLarge: p.aaLarge,
                    aaaNormal: p.aaaNormal,
                    aaaLarge: p.aaaLarge,
                  })),
                  wcagNote: t.wcagNote || '',
                };
              }
              const groups: ColorGroup[] = (t.groups || []).map((g) => {
                const swatches = (g.swatches || []).map((sw) => ({ name: sw.name, hex: sw.hex }));
                return t.type === 'overview'
                  ? { label: g.label, main: swatches }
                  : { label: g.label, shades: swatches };
              });
              return { label: t.label, type: t.type, groups };
            }),
          },
        };
      }

      case 'typography-scale': {
        const tabs = (s['tabs'] as StrapiTypographyTab[] | undefined) || [];
        return {
          ...base,
          content: {
            type: 'typography-scale',
            tabs: tabs.map((t) => ({
              label: t.label,
              fontName: t.fontName,
              preview: t.preview,
              columns: (t.columns || []).map((col) => ({
                label: col.label,
                weight: col.weight,
                rows: (col.rows || []).map((row) => ({ tag: row.tag, size: row.size })),
              })),
            })),
          },
        };
      }

      default:
        // Unknown section type — pass through raw data cast to the expected shape
        return { ...base, content: { type, ...s } as unknown as SectionContent };
    }
  }

  /**
   * Returns a default display label for a section type if no custom label is provided.
   *
   * @param {string} type - The section type identifier.
   * @returns {string} The human-readable default label.
   * @private
   */
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

  /**
   * Generates HttpHeaders for Strapi API requests, including Authorization token if available.
   *
   * @returns {HttpHeaders | undefined} The configured HttpHeaders or undefined if no token exists.
   * @private
   */
  private _getHeaders(): HttpHeaders | undefined {
    return this._token
      ? new HttpHeaders().set('Authorization', `Bearer ${this._token}`)
      : undefined;
  }
}
