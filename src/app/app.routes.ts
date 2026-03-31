// ── FILE: src/app/app.routes.ts ──

import { Routes } from '@angular/router';

/** Root routes — the docs shell handles all navigation internally via signals */
export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/docs-shell/docs-shell.component').then(
        (m) => m.DocsShellComponent
      ),
  },
  { path: '**', redirectTo: '' },
];
