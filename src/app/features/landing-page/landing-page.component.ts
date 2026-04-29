// ── FILE: src/app/features/landing-page/landing-page.component.ts ──

import { Component, HostListener, OnInit, OnDestroy, signal, inject, computed } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, finalize, of } from 'rxjs';
import { AuthService } from '../../core/services/auth.service';
import { StrapiService } from '../../core/services/strapi.service';
import { LucideAngularModule } from 'lucide-angular';
import { BgRippleComponent } from '../../shared/components/bg-ripple/bg-ripple.component';
import { RevealDirective } from '../../shared/directives/reveal.directive';
import { LandingSkeleton } from '../../shared/components/landing-skeleton/landing-skeleton';
import {
  Monitor, Server, Globe, TestTube, Microscope, Palette, Tv,
  ArrowRight, ChevronRight, Zap, Shield, BookOpen, Users, Code2, Layers, ExternalLink,
  MapPin, Building2, Tv2, Wifi, Star, Lock, Layout,
  LucideIconData,
} from 'lucide-angular';
import { DocsDataService } from '../../core/services/docs-data.service';
import { getTeamIcon } from '../../core/utils/icons';

interface TermLine {
  id: number;
  prefix: string; prefixCls: string;
  content: string; contentCls: string;
  isTyping: boolean;
}

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [LucideAngularModule, BgRippleComponent, RevealDirective, LandingSkeleton],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss',
})
export class LandingPageComponent implements OnInit, OnDestroy {
  private readonly _router   = inject(Router);
  private readonly _auth     = inject(AuthService);
  private readonly _docsData = inject(DocsDataService);
  private readonly _strapi   = inject(StrapiService);

  // ── Icons ────────────────────────────────────────────────────────────────
  protected readonly ArrowRightIcon   = ArrowRight;
  protected readonly ChevronRightIcon = ChevronRight;
  protected readonly ExternalLinkIcon = ExternalLink;
  protected readonly MapPinIcon       = MapPin;
  protected readonly Building2Icon    = Building2;
  protected readonly Tv2Icon          = Tv2;
  protected readonly WifiIcon         = Wifi;
  protected readonly ZapIcon          = Zap;
  protected readonly ShieldIcon       = Shield;
  protected readonly BookOpenIcon     = BookOpen;
  protected readonly UsersIcon        = Users;
  protected readonly Code2Icon        = Code2;
  protected readonly LayersIcon       = Layers;

  // ── Icon map (Strapi string key → Lucide icon) ───────────────────────────
  private readonly _iconMap: Record<string, LucideIconData> = {
    'book-open': BookOpen,
    'code': Code2,
    'layers': Layers,
    'zap': Zap,
    'users': Users,
    'shield': Shield,
    'building': Building2,
    'monitor': Monitor,
    'map-pin': MapPin,
    'wifi': Wifi,
    'layout': Layout,
    'star': Star,
    'lock': Lock,
    'tv': Tv,
    'globe': Globe,
    'server': Server,
    'palette': Palette,
  };

  // Accent colours per feature index (fallback)
  private readonly _accentColors = [
    '#8DCB2C', '#7C3AED', '#3B82F6', '#F59E0B', '#EC4899', '#EF4444',
  ];

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

  // ── State ─────────────────────────────────────────────────────────────────
  protected readonly isLoading      = signal(true);
  protected readonly navOpen        = signal(false);
  protected readonly scrolled       = signal(false);
  protected readonly scrollProgress = signal(0);

  // ── Strapi section signals ────────────────────────────────────────────────
  private readonly _hero          = signal<any>(null);
  private readonly _stats         = signal<any[]>([]);
  private readonly _teamShowcase  = signal<any>(null);
  private readonly _featuresGrid  = signal<any>(null);
  private readonly _companyAbout  = signal<any>(null);
  private readonly _ctaBanner     = signal<any>(null);
  private readonly _navbar        = signal<any>(null);
  private readonly _footer        = signal<any>(null);

  // ── Public computed accessors ─────────────────────────────────────────────
  protected readonly hero         = computed(() => this._hero());
  protected readonly stats        = computed(() => this._stats());
  protected readonly teamShowcase = computed(() => this._teamShowcase());
  protected readonly featuresGrid = computed(() => this._featuresGrid());
  protected readonly companyAbout = computed(() => this._companyAbout());
  protected readonly ctaBanner    = computed(() => this._ctaBanner());
  protected readonly navbar       = computed(() => this._navbar());
  protected readonly footer       = computed(() => this._footer());

  protected readonly navLinks = computed(() =>
    (this._navbar()?.links ?? []) as Array<{ label: string; url: string; type: string }>
  );

  protected readonly footerLinks = computed(() =>
    (this._footer()?.links ?? []) as Array<{ label: string; url: string; type: string }>
  );

  protected readonly featureItems = computed(() => {
    const items: any[] = this._featuresGrid()?.items ?? [];
    return items.map((item, i) => ({
      icon: this._resolveIcon(item.icon),
      accent: this._accentColors[i % this._accentColors.length],
      title: item.title,
      body: item.description,
    }));
  });

  protected readonly companyFactItems = computed(() => {
    const items: any[] = this._companyAbout()?.metaItems ?? [];
    return items.map(item => ({
      icon: this._resolveIcon(item.icon),
      label: item.label,
      value: item.value,
    }));
  });

  // ── Teams data ───────────────────────────────────────────────────────────
  protected readonly teams = computed(() => {
    return this._docsData.getTeams().map(t => ({
      key: t.key,
      label: t.label,
      color: t.color,
      gradient: t.gradient || `linear-gradient(135deg, #1a2e05, #2d5016)`,
      icon: getTeamIcon(t.key),
      tagline: t.subtitle,
      tags: t.projects.map((p: any) => p.name).slice(0, 4),
    }));
  });

  // ── Stack logos ──────────────────────────────────────────────────────────
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

  ngOnInit(): void {
    this._runTerminal();
    this._loadStrapiData();
  }

  ngOnDestroy(): void { this._tt.forEach(clearTimeout); }

  private _loadStrapiData(): void {
    // Load navbar (non-blocking)
    this._strapi.getNavbar().pipe(catchError(() => of(null))).subscribe(data => {
      if (data) this._navbar.set(data);
    });

    // Load footer (non-blocking)
    this._strapi.getFooter().pipe(catchError(() => of(null))).subscribe(data => {
      if (data) this._footer.set(data);
    });

    // Load landing page sections
    this._strapi.getLandingPage().pipe(
      catchError(() => of(null)),
      finalize(() => this.isLoading.set(false)),
    ).subscribe(data => {
      if (data) this._parseSections(data.sections ?? []);
    });
  }

  private _parseSections(sections: any[]): void {
    const stats: any[] = [];
    for (const s of sections) {
      switch (s.__component) {
        case 'landing.hero':         this._hero.set(s);         break;
        case 'landing.stats-item':   stats.push(s);              break;
        case 'landing.team-showcase': this._teamShowcase.set(s); break;
        case 'landing.features-grid': this._featuresGrid.set(s); break;
        case 'landing.company-about': this._companyAbout.set(s); break;
        case 'landing.cta-banner':   this._ctaBanner.set(s);    break;
      }
    }
    this._stats.set(stats);
  }

  private _resolveIcon(key: string): LucideIconData {
    return this._iconMap[key] ?? Star;
  }

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
              ...l, content: s.text.slice(0, ci + 1), isTyping: ci + 1 < s.text.length,
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

  public navigateToLogin(): void  { this._router.navigate(['/login']); }
  public enterPortal(): void {
    if (this._auth.isAuthenticated()) {
      this._router.navigate(['/portal']);
    } else {
      this._router.navigate(['/login'], { queryParams: { returnUrl: '/portal' } });
    }
  }
  public goToTeam(key: string): void {
    const dest = `/portal?team=${key}`;
    if (this._auth.isAuthenticated()) {
      this._router.navigate(['/portal'], { queryParams: { team: key } });
    } else {
      this._router.navigate(['/login'], { queryParams: { returnUrl: dest } });
    }
  }
  protected toggleNav(): void { this.navOpen.update(v => !v); }
}
