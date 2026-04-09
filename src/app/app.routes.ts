// ── FILE: src/app/app.routes.ts ──

import { Routes } from '@angular/router';

/** Root routes — landing page is the entry point; portal is lazy-loaded */
export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/landing-page/landing-page.component').then(
        (m) => m.LandingPageComponent
      ),
  },
  {
    path: 'portal',
    loadComponent: () =>
      import('./features/docs-shell/docs-shell.component').then(
        (m) => m.DocsShellComponent
      ),
  },
  { path: '**', redirectTo: '' },
];
