// ── FILE: src/app/shared/components/tech-stack/tech-stack.component.ts ──

import { Component, input, signal } from '@angular/core';
import { DataTable } from '../../../core/models';

// ── Icon map ──────────────────────────────────────────────────────────────────
// Keys are lowercase-normalised technology names from the data files.
// Colors are hex strings WITHOUT the leading #.
// Use `slug` for Simple Icons CDN (cdn.simpleicons.org/<slug>/<color>).
// Use `url` for a direct SVG URL (e.g. devicons) when Simple Icons has no entry.
type TechIcon = { slug: string; color: string } | { url: string; color: string };

const TECH_ICONS: Record<string, TechIcon> = {
  // ── Frontend ──────────────────────────────────────────────────────────────
  'angular':              { slug: 'angular',          color: 'DD0031' },
  'typescript':           { slug: 'typescript',       color: '3178C6' },
  'tailwind css':         { slug: 'tailwindcss',      color: '06B6D4' },
  'rxjs':                 { slug: 'reactivex',        color: 'B7178C' },
  'scss':                 { slug: 'sass',             color: 'CC6699' },
  'scss / sass':          { slug: 'sass',             color: 'CC6699' },
  'auth0':                { slug: 'auth0',            color: 'EB5424' },
  'angular ssr':          { slug: 'angular',          color: 'DD0031' },
  'leaflet':              { slug: 'leaflet',          color: '199900' },
  'apexcharts':           { slug: 'apexcharts',       color: '008FFB' },
  'husky + commitlint':   { slug: 'husky',            color: '42B983' },
  'prettier':             { slug: 'prettier',         color: 'F7B93E' },
  'vitest':               { url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vitest/vitest-original.svg',         color: '6E9F18' },
  'playwright':           { url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/playwright/playwright-original.svg', color: '2EAD33' },
  'jest':                 { slug: 'jest',             color: 'C21325' },
  'react':                { slug: 'react',            color: '61DAFB' },
  'vue':                  { slug: 'vuedotjs',         color: '4FC08D' },
  // ── Backend ───────────────────────────────────────────────────────────────
  'nestjs':               { slug: 'nestjs',           color: 'E0234E' },
  'typeorm':              { slug: 'typeorm',          color: 'FE0803' },
  'mysql':                { slug: 'mysql',            color: '4479A1' },
  'graphql / apollo':     { slug: 'graphql',          color: 'E10098' },
  'graphql':              { slug: 'graphql',          color: 'E10098' },
  'socket.io':            { slug: 'socketdotio',      color: '010101' },
  'aws sam':              { slug: 'serverless',       color: 'FD5750' },
  'aws lambda':           { slug: 'serverless',       color: 'FD5750' },
  'class-transformer':    { slug: 'typescript',       color: '3178C6' },
  'class-validator':      { slug: 'typescript',       color: '3178C6' },
  'postgresql':           { slug: 'postgresql',       color: '4169E1' },
  'mongodb':              { slug: 'mongodb',          color: '47A248' },
  'redis':                { slug: 'redis',            color: 'FF4438' },
  'docker':               { slug: 'docker',           color: '2496ED' },
  'node.js':              { slug: 'nodedotjs',        color: '5FA04E' },
  // ── Web Dev ───────────────────────────────────────────────────────────────
  'astro':                { slug: 'astro',            color: 'FF5D01' },
  'svelte / sveltekit':   { slug: 'svelte',           color: 'FF3E00' },
  'svelte':               { slug: 'svelte',           color: 'FF3E00' },
  'sveltekit':            { slug: 'svelte',           color: 'FF3E00' },
  'next.js':              { slug: 'nextdotjs',        color: '000000' },
  'wordpress':            { slug: 'wordpress',        color: '21759B' },
  'vercel':               { slug: 'vercel',           color: '000000' },
  'claude code':          { slug: 'claude',           color: 'D97757' },
  // Codex (OpenAI) and Kiro (AWS) have no available icons — clean initials shown
  'json files':           { slug: 'json',             color: '000000' },
  // ── QA ────────────────────────────────────────────────────────────────────
  'python':               { slug: 'python',           color: '3776AB' },
  'selenium webdriver':   { slug: 'selenium',         color: '43B02A' },
  'pytest':               { slug: 'pytest',           color: '0A9EDC' },
  'flake8':               { slug: 'python',           color: '3776AB' },
  'page object model':    { slug: 'selenium',         color: '43B02A' },
  'flask':                { slug: 'flask',            color: '000000' },
  // ── UI/UX ─────────────────────────────────────────────────────────────────
  'figma':                { slug: 'figma',            color: 'F24E1E' },
  'figjam':               { slug: 'figma',            color: 'F24E1E' },
  'sketch':               { slug: 'sketch',           color: 'F7B500' },
  'adobe xd':             { slug: 'adobexd',          color: 'FF61F6' },
  'framer':               { slug: 'framer',           color: '0055FF' },
  'storybook':            { slug: 'storybook',        color: 'FF4785' },
  'chromatic':            { slug: 'chromatic',        color: 'FC521F' },
  'maze':                 { slug: 'maze',             color: 'FF4F5E' },
  'lottie':               { slug: 'lottiefiles',      color: '00DDB4' },  // ── R&D ─────────────────────────────────────────────────────────────────────
  'supabase':             { slug: 'supabase',         color: '3ECF8E' },
  'hugging face':         { slug: 'huggingface',      color: 'FF9D00' },
  'raspberry pi os':      { slug: 'raspberrypi',      color: 'A22846' },
  'n8n':                  { slug: 'n8n',              color: 'EA4B71' },
  'anthropic claude':     { slug: 'claude',           color: 'D97757' },  // ── Pi Player ─────────────────────────────────────────────────────────────
  'raspberry pi':         { slug: 'raspberrypi',      color: 'A22846' },
  'raspbian os':          { slug: 'raspberrypi',      color: 'A22846' },
  'nginx':                { slug: 'nginx',            color: '009639' },
  'pm2':                  { slug: 'pm2',              color: '2B037A' },
  'anydesk':              { slug: 'anydesk',          color: 'EF443B' },
  'chromium':             { slug: 'googlechrome',     color: '4285F4' },
};

// ── Badge class map ───────────────────────────────────────────────────────────
const BADGE_CLASS: Record<string, string> = {
  'live':      'ts__badge--live',
  'active':    'ts__badge--live',
  'dev':       'ts__badge--dev',
  'primary':   'ts__badge--primary',
  'flexible':  'ts__badge--flexible',
  'ai tool':   'ts__badge--ai',
  'active r&d': 'ts__badge--ai',
  'deploy':    'ts__badge--deploy',
  'pattern':   'ts__badge--pattern',
};

@Component({
  selector: 'app-tech-stack',
  standalone: true,
  imports: [],
  templateUrl: './tech-stack.component.html',
  styleUrl: './tech-stack.component.scss',
})
export class TechStackComponent {
  public readonly table = input.required<DataTable>();

  /** Tracks row indices where the CDN image failed to load. */
  protected readonly failedImages = signal<ReadonlySet<number>>(new Set());

  /** Called when the CDN <img> fires an error event. */
  protected onImgError(idx: number): void {
    this.failedImages.update(s => new Set([...s, idx]));
  }

  /** Returns the logo URL for a known tech — Simple Icons CDN or direct URL — or empty string. */
  protected logoUrl(name: string): string {
    const entry = TECH_ICONS[name.toLowerCase().trim()];
    if (!entry) return '';
    if ('url' in entry) return entry.url;
    return `https://cdn.simpleicons.org/${entry.slug}/${entry.color}`;
  }

  /** Returns the brand color hex (with #) for the logo background tint. */
  protected logoColor(name: string): string {
    const entry = TECH_ICONS[name.toLowerCase().trim()];
    if (entry) return `#${entry.color}`;
    return this._hashColor(name);
  }

  /** Generates up to 2-letter initials from a tech name. */
  protected initials(name: string): string {
    return name.split(/[\s/\-.]+/).map(w => w[0] ?? '').join('').toUpperCase().slice(0, 2);
  }

  /** Returns the BEM modifier class for a status/usage badge. */
  protected badgeClass(status: string): string {
    return BADGE_CLASS[status.toLowerCase().trim()] ?? 'ts__badge--default';
  }

  /** Deterministic hue from a string for fallback avatar colors. */
  private _hashColor(s: string): string {
    let h = 0;
    for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
    return `hsl(${h % 360}, 52%, 44%)`;
  }
}
