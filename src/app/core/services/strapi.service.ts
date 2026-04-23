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
      >(`${this._baseUrl}/api/tools?populate=*&sort=label:asc`, { headers })
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
    // populate=sections allows us to get the dynamic zone
    // populate=projects allows us to get the linked projects
    return this._http
      .get<
        StrapiResponse<StrapiEntity<TeamStrapi>[]>
      >(`${this._baseUrl}/api/teams?populate=sections,projects&sort=label:asc`, { headers })
      .pipe(map((response) => response.data.map((entity) => this._mapStrapiTeam(entity))));
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
        map((response) =>
          response.data.map((entity) => {
            const data: any = entity.attributes || entity;
            return {
              ...data,
              id: data.key || entity.id?.toString() || data.id?.toString(),
              status: data.projectStatus || data.status,
            };
          }),
        ),
      );
  }

  private _mapStrapiTeam(entity: StrapiEntity<TeamStrapi>): any {
    const data: any = entity.attributes || entity;
    return {
      ...data,
      key: data.key || '',
      projects: data.projects?.data?.map((p: any) => p.attributes || p) || [],
      sections: (data.sections || []).map((s: any) => this._mapSection(s)),
    };
  }

  private _mapSection(s: any): any {
    // Map Strapi's component naming back to our "type" discriminants
    const typeMap: Record<string, string> = {
      'sections.tech-stack': 'tech-stack',
      'sections.getting-started': 'getting-started',
      'sections.folder-arch': 'folder-arch',
      'sections.coding-patterns': 'coding-patterns',
      'sections.mistakes': 'mistakes',
      'sections.contact-list': 'team-contacts',
      'sections.projects': 'projects',
    };

    const type = typeMap[s.__component] || s.__component.replace('sections.', '');

    // Construct the "content" payload that the UI expects
    return {
      id: s.key || `sec-${s.id}`,
      label: s.title || s.label || '',
      num: s.num || '01',
      subHeader: s.subHeader || '',
      content: {
        type,
        ...s,
        // Handle nested table structure if present
        table: s.dataTable || s.table || s.mistakeTable || undefined,
        // Rename some fields if Strapi uses different names
        steps: s.steps || [],
        cards: s.cards || [],
        patterns: s.patterns || [],
        contacts: s.contacts || [],
      },
    };
  }

  private _getHeaders(): HttpHeaders | undefined {
    return this._token
      ? new HttpHeaders().set('Authorization', `Bearer ${this._token}`)
      : undefined;
  }
}
