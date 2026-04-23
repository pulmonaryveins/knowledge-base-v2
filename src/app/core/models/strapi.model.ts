// ── FILE: src/app/core/models/strapi.model.ts ──

/** Generic Strapi API Response wrapper */
export interface StrapiResponse<T> {
  data: T;
  meta: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

/** Strapi Entity with ID and Attributes (v4/v5 specific) */
export interface StrapiEntity<T> {
  id: number;
  attributes?: T; // Attributes is optional in Strapi v5 (flattened by default)
}

/** Specific Strapi Data Models */

export interface TeamStrapi {
  label: string;
  key: string;
  color: string;
  gradient: string;
  icon: string;
  subtitle: string;
  description: string;
  sections: Array<StrapiComponent>;
}

export interface ProjectStrapi {
  name: string;
  key: string;
  description: string;
  projectStatus: string;
  icon: string;
  meta?: any;
  purpose?: string;
  features?: any[];
  links?: any[];
  team?: { data: StrapiEntity<TeamStrapi> }; // Relation
}

/** Dynamic Zone Base */
export interface StrapiComponent {
  id: number;
  __component: string; // The Strapi component name, e.g., "sections.tech-stack"
  [key: string]: any;
}
