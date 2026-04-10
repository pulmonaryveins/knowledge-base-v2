// ── FILE: src/app/features/landing-page/landing-page.component.ts ──

import { Component, signal, inject } from '@angular/core';
import { Router } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { BgRippleComponent } from '../../shared/components/bg-ripple/bg-ripple.component';
import { RevealDirective } from '../../shared/directives/reveal.directive';
import {
  Monitor, Server, Globe, TestTube, Microscope, Palette,
  ArrowRight, ChevronRight, Zap, Shield, BookOpen, Users, Code2, Layers,
  LucideIconData,
} from 'lucide-angular';

/**
 * LandingPageComponent — the public entry point for the NCompassTV Dev Portal.
 * Showcases all teams, key features, and provides navigation into the portal.
 * Smart component — injects Router for navigation.
 */
@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [LucideAngularModule, BgRippleComponent, RevealDirective],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss',
})
export class LandingPageComponent {
  private readonly _router = inject(Router);

  // ── Icons ────────────────────────────────────────────────────────────────
  protected readonly ArrowRightIcon  = ArrowRight;
  protected readonly ChevronRightIcon = ChevronRight;
  protected readonly ZapIcon         = Zap;
  protected readonly ShieldIcon      = Shield;
  protected readonly BookOpenIcon    = BookOpen;
  protected readonly UsersIcon       = Users;
  protected readonly Code2Icon       = Code2;
  protected readonly LayersIcon      = Layers;

  // ── Nav open state (mobile) ──────────────────────────────────────────────
  protected readonly navOpen = signal(false);

  // ── Teams data ───────────────────────────────────────────────────────────
  protected readonly teams: ReadonlyArray<{
    key: string;
    label: string;
    color: string;
    gradient: string;
    icon: LucideIconData;
    tagline: string;
    tags: ReadonlyArray<string>;
  }> = [
    {
      key: 'frontend',
      label: 'Frontend',
      color: '#8DCB2C',
      gradient: 'linear-gradient(135deg, #1a2e05, #2d5016)',
      icon: Monitor,
      tagline: 'Angular 21 · Signals · Tailwind v4',
      tags: ['Angular', 'TypeScript', 'Tailwind', 'Vitest'],
    },
    {
      key: 'backend',
      label: 'Backend',
      color: '#7C3AED',
      gradient: 'linear-gradient(135deg, #1e0a4a, #3b0f8c)',
      icon: Server,
      tagline: 'NestJS · PostgreSQL · GraphQL',
      tags: ['NestJS', 'PostgreSQL', 'GraphQL', 'Docker'],
    },
    {
      key: 'webdev',
      label: 'Web Development',
      color: '#3B82F6',
      gradient: 'linear-gradient(135deg, #0a1e4a, #0f3b8c)',
      icon: Globe,
      tagline: 'Astro · Svelte · Edge Functions',
      tags: ['Astro', 'Svelte', 'Cloudflare', 'SCSS'],
    },
    {
      key: 'qa',
      label: 'Quality Assurance',
      color: '#0891B2',
      gradient: 'linear-gradient(135deg, #042f3a, #075e75)',
      icon: TestTube,
      tagline: 'Playwright · Selenium · pytest',
      tags: ['Playwright', 'Python', 'Selenium', 'Maze'],
    },
    {
      key: 'rd',
      label: 'Research & Development',
      color: '#F59E0B',
      gradient: 'linear-gradient(135deg, #3a1f00, #7a3e00)',
      icon: Microscope,
      tagline: 'Prototypes · Experiments · Innovation',
      tags: ['Experiments', 'PoC', 'AI/ML', 'Research'],
    },
    {
      key: 'uiux',
      label: 'UI / UX',
      color: '#EC4899',
      gradient: 'linear-gradient(135deg, #4a0a2e, #831843)',
      icon: Palette,
      tagline: 'Figma · WCAG 2.1 · Design Tokens',
      tags: ['Figma', 'Storybook', 'WCAG', 'Maze'],
    },
  ];

  // ── Feature highlights ────────────────────────────────────────────────────
  protected readonly features: ReadonlyArray<{
    icon: LucideIconData;
    accent: string;
    title: string;
    body: string;
  }> = [
    {
      icon: BookOpen,
      accent: '#8DCB2C',
      title: 'Team Documentation',
      body: 'Every team has structured docs covering tech stack, getting started guides, folder architecture, and coding patterns.',
    },
    {
      icon: Code2,
      accent: '#7C3AED',
      title: 'Code Standards',
      body: 'Canonical patterns, common mistakes, and approved libraries — one source of truth for how we write code at NCompassTV.',
    },
    {
      icon: Layers,
      accent: '#0891B2',
      title: 'Project Registry',
      body: 'Live project cards with status, stack, contacts, and getting-started steps for every app owned by each team.',
    },
    {
      icon: Zap,
      accent: '#F59E0B',
      title: 'Fast Onboarding',
      body: 'New engineers and designers go from zero to productive in hours, not days — all the context they need is here.',
    },
    {
      icon: Users,
      accent: '#EC4899',
      title: 'Cross-team Visibility',
      body: 'See how every team works, what they own, and who to contact — essential for cross-functional collaboration.',
    },
    {
      icon: Shield,
      accent: '#EF4444',
      title: 'Always Up to Date',
      body: 'Documentation lives alongside the codebase and is updated every sprint by the teams who own it.',
    },
  ];

  /** Navigate into the portal docs shell */
  public enterPortal(): void {
    this._router.navigate(['/portal']);
  }

  /** Navigate into the portal docs shell to a specific team */
  public goToTeam(key: string): void {
    this._router.navigate(['/portal'], { queryParams: { team: key } });
  }

  protected toggleNav(): void {
    this.navOpen.update(v => !v);
  }

  // ── Stack logo strip ────────────────────────────────────────────────────
  protected readonly stackLogos: ReadonlyArray<{ name: string; src: string }> = [
    { name: 'Angular',    src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/angularjs/angularjs-original.svg' },
    { name: 'TypeScript', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg' },
    { name: 'Tailwind',   src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg' },
    { name: 'NestJS',     src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nestjs/nestjs-original.svg' },
    { name: 'PostgreSQL', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg' },
    { name: 'Docker',     src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg' },
    { name: 'Figma',      src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg' },
    { name: 'Python',     src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg' },
    { name: 'Playwright', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/playwright/playwright-original.svg' },
    { name: 'Astro',      src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/astro/astro-original.svg' },
    { name: 'Svelte',     src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/svelte/svelte-original.svg' },
    { name: 'Git',        src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg' },
  ];
}
