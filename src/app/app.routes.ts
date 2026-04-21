import { Routes } from '@angular/router';
import { authGuard }  from './core/guards/auth.guard';
import { adminGuard } from './core/guards/admin.guard';

export const routes: Routes = [
  // ── Public ─────────────────────────────────────────────────────────────────
  {
    path: 'login',
    loadComponent: () => import('./features/login/login').then(m => m.Login),
  },

  // ── Public: landing page ────────────────────────────────────────────────────
  {
    path: '',
    loadComponent: () =>
      import('./features/landing-page/landing-page.component').then(
        m => m.LandingPageComponent
      ),
  },
  {
    path: 'portal',
    loadComponent: () =>
      import('./features/docs-shell/docs-shell.component').then(
        m => m.DocsShellComponent
      ),
    canActivate: [authGuard],
  },

  // ── Protected: admin only ───────────────────────────────────────────────────
  {
    path: 'admin',
    loadComponent: () => import('./features/admin/admin').then(m => m.Admin),
    canActivate: [authGuard, adminGuard],
  },

  // ── Fallback ────────────────────────────────────────────────────────────────
  { path: '**', redirectTo: 'login' },
];
