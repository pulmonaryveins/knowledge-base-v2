// ── FILE: src/app/features/landing-page/landing-page.component.ts ──

import { Component, HostListener, OnInit, OnDestroy, signal, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { LucideAngularModule } from 'lucide-angular';
import { BgRippleComponent } from '../../shared/components/bg-ripple/bg-ripple.component';
import { RevealDirective } from '../../shared/directives/reveal.directive';
import { LandingSkeleton } from '../../shared/components/landing-skeleton/landing-skeleton';
import {
  Monitor, Server, Globe, TestTube, Microscope, Palette, Tv,
  ArrowRight, ChevronRight, Zap, Shield, BookOpen, Users, Code2, Layers, ExternalLink,
  MapPin, Building2, Tv2, Wifi,
  LucideIconData,
} from 'lucide-angular';

interface TermLine {
  id: number;
  prefix: string; prefixCls: string;
  content: string; contentCls: string;
  isTyping: boolean;
}

/**
 * LandingPageComponent — the public entry point for the NCompassTV Dev Portal.
 * Showcases all teams, key features, and provides navigation into the portal.
 * Smart component — injects Router for navigation.
 */
@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [LucideAngularModule, BgRippleComponent, RevealDirective, LandingSkeleton],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss',
})
export class LandingPageComponent implements OnInit, OnDestroy {
  private readonly _router = inject(Router);
  private readonly _auth   = inject(AuthService);

  // ── Icons ────────────────────────────────────────────────────────────────
  protected readonly ArrowRightIcon    = ArrowRight;
  protected readonly ChevronRightIcon  = ChevronRight;
  protected readonly ExternalLinkIcon  = ExternalLink;
  protected readonly MapPinIcon        = MapPin;
  protected readonly Building2Icon     = Building2;
  protected readonly Tv2Icon           = Tv2;
  protected readonly WifiIcon          = Wifi;
  protected readonly ZapIcon          = Zap;
  protected readonly ShieldIcon       = Shield;
  protected readonly BookOpenIcon     = BookOpen;
  protected readonly UsersIcon        = Users;
  protected readonly Code2Icon        = Code2;
  protected readonly LayersIcon       = Layers;

  // ── Terminal ─────────────────────────────────────────────────────────────
  protected readonly termLines = signal<TermLine[]>([]);
  protected readonly termDone  = signal(false);
  private readonly _tt: ReturnType<typeof setTimeout>[] = [];

  private readonly _seq = [
    { prefix: '$', pCls: 'lp__t-dim', text: 'git clone git@nctv/dev-portal', tCls: 'lp__t-cmd', cmd: true  },
    { prefix: '✓', pCls: 'lp__t-ok',  text: 'Cloned knowledge-base-v2',      tCls: 'lp__t-ok',  cmd: false },
    { prefix: '$', pCls: 'lp__t-dim', text: 'npm install',                    tCls: 'lp__t-cmd', cmd: true  },
    { prefix: '✓', pCls: 'lp__t-ok',  text: 'Added 412 packages in 4.1s',    tCls: '',          cmd: false },
    { prefix: '$', pCls: 'lp__t-dim', text: 'ng serve',                       tCls: 'lp__t-cmd', cmd: true  },
    { prefix: '✓', pCls: 'lp__t-ok',  text: 'Compiled successfully in 1.2s', tCls: '',          cmd: false },
    { prefix: '➜', pCls: 'lp__t-dim', text: 'http://localhost:4200',          tCls: 'lp__t-url', cmd: false },
  ] as const;

  // ── Nav / scroll state ─────────────────────────────────────────────────── 
  protected readonly isLoading     = signal(false);
  protected readonly navOpen       = signal(false);
  protected readonly scrolled      = signal(false);
  protected readonly scrollProgress = signal(0);

  ngOnInit(): void { this._runTerminal(); }
  ngOnDestroy(): void { this._tt.forEach(clearTimeout); }

  private _run(ms: number, fn: () => void) { this._tt.push(setTimeout(fn, ms)); }

  private _runTerminal(): void {
    const CH = 52, CP = 400, OP = 300;
    let t = 500;

    for (let i = 0; i < this._seq.length; i++) {
      const s = this._seq[i], id = i;

      if (s.cmd) {
        this._run(t, () =>
          this.termLines.update(ls => [...ls,
            { id, prefix: s.prefix, prefixCls: s.pCls, content: '', contentCls: s.tCls, isTyping: true }
          ])
        );
        t += CH;
        for (let j = 0; j < s.text.length; j++) {
          const ci = j;
          this._run(t, () =>
            this.termLines.update(ls => ls.map(l => l.id !== id ? l : {
              ...l,
              content: s.text.slice(0, ci + 1),
              isTyping: ci + 1 < s.text.length,
            }))
          );
          t += CH;
        }
        t += CP;
      } else {
        t += 100;
        this._run(t, () =>
          this.termLines.update(ls => [...ls,
            { id, prefix: s.prefix, prefixCls: s.pCls, content: s.text, contentCls: s.tCls, isTyping: false }
          ])
        );
        t += OP;
      }
    }

    this._run(t + 150, () => this.termDone.set(true));
  }

  @HostListener('window:scroll')
  onScroll(): void {
    const y = window.scrollY;
    this.scrolled.set(y > 40);
    const max = document.documentElement.scrollHeight - window.innerHeight;
    this.scrollProgress.set(max > 0 ? Math.round((y / max) * 100) : 0);
  }

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
      tagline: 'NestJS · MySQL · TypeORM',
      tags: ['NestJS', 'MySQL', 'TypeORM', 'Docker'],
    },
    {
      key: 'webdev',
      label: 'Web Development',
      color: '#3B82F6',
      gradient: 'linear-gradient(135deg, #0a1e4a, #0f3b8c)',
      icon: Globe,
      tagline: 'Astro · Next.js · Edge Functions',
      tags: ['Astro', 'Next.js', 'Cloudflare', 'SCSS'],
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
    {
      key: 'pi-player',
      label: 'Pi Player',
      color: '#C51A4A',
      gradient: 'linear-gradient(135deg, #3a0515, #7a0f2e)',
      icon: Tv,
      tagline: 'Raspberry Pi · Digital Signage · CMS',
      tags: ['Raspberry Pi', 'Node.js', 'HDMI', 'Linux'],
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
      accent: '#3B82F6',
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

  // ── Company facts ─────────────────────────────────────────────────────────
  protected readonly companyFacts: ReadonlyArray<{
    icon: LucideIconData;
    label: string;
    value: string;
  }> = [
    { icon: Building2, label: 'Industry',  value: 'Digital Advertising'        },
    { icon: Tv2,       label: 'Format',    value: 'Indoor Digital Billboards'  },
    { icon: MapPin,    label: 'HQ',        value: 'Lakewood, CO, USA'          },
    { icon: Wifi,      label: 'Network',   value: 'High-traffic venues'        },
    { icon: Monitor,   label: 'Placement', value: 'Community-wide coverage'    },
    { icon: Users,     label: 'Model',     value: 'Dealership franchise'       },
  ];

  protected readonly companySectors: ReadonlyArray<string> = [
    'Restaurants', 'Fitness & Gyms', 'Medical Offices', 'Auto Repair', 'Retail', 'Local Business',
  ];

  protected readonly companyHighlights: ReadonlyArray<string> = [
    'Indoor digital billboards placed in high-traffic community venues across the US',
    'Reach customers where they already spend time — restaurants, gyms, and clinics',
    'Business-to-business marketing network connecting local advertisers to audiences',
    'Franchise dealership model with high revenue potential and low startup costs',
    'Community-focused coverage putting brands in front of local customers daily',
  ];

  /** Navigate to the login page */
  public navigateToLogin(): void {
    this._router.navigate(['/login']);
  }

  /** Navigate into the portal — requires login */
  public enterPortal(): void {
    if (this._auth.isAuthenticated()) {
      this._router.navigate(['/portal']);
    } else {
      this._router.navigate(['/login'], { queryParams: { returnUrl: '/portal' } });
    }
  }

  /** Navigate into the portal to a specific team — requires login */
  public goToTeam(key: string): void {
    const dest = `/portal?team=${key}`;
    if (this._auth.isAuthenticated()) {
      this._router.navigate(['/portal'], { queryParams: { team: key } });
    } else {
      this._router.navigate(['/login'], { queryParams: { returnUrl: dest } });
    }
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
    { name: 'MySQL',      src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg' },
    { name: 'Docker',     src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg' },
    { name: 'Figma',      src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg' },
    { name: 'Python',     src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg' },
    { name: 'Playwright', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/playwright/playwright-original.svg' },
    { name: 'Astro',      src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/astro/astro-original.svg' },
    { name: 'Linux',      src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg' },
    { name: 'Git',        src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg' },
  ];
}
