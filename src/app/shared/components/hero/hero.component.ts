// ── FILE: src/app/shared/components/hero/hero.component.ts ──

import { Component, computed, effect, input, signal } from '@angular/core';
import { LucideAngularModule, LucideIconData } from 'lucide-angular';
import { HeroStat } from '../../../core/models';
import { getTeamIcon } from '../../../core/utils/icons';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
})
export class HeroComponent {
  public readonly teamLabel = input.required<string>();
  public readonly gradient  = input.required<string>();
  public readonly teamKey   = input.required<string>();
  public readonly subtitle  = input.required<string>();
  public readonly color     = input.required<string>();
  public readonly stats     = input.required<ReadonlyArray<HeroStat>>();

  protected readonly teamIcon = computed<LucideIconData>(() =>
    getTeamIcon(this.teamKey())
  );

  /** Animated display values — counts up from 0 on load. */
  protected readonly displayedValues = signal<string[]>([]);

  private _timerId: ReturnType<typeof setInterval> | null = null;

  constructor() {
    // Animate on first render and re-animate on every stats change (e.g. team navigation or async load)
    effect(() => {
      const stats = this.stats();
      this.displayedValues.set(stats.map(() => '0'));
      if (this._timerId) clearInterval(this._timerId);
      this._animateStats();
    });
  }

  private _animateStats(): void {
    const stats    = this.stats();
    const duration = 1600;
    const fps      = 60;
    const steps    = Math.round(duration / (1000 / fps));
    const targets  = stats.map(s => { const n = parseInt(s.value, 10); return isNaN(n) ? null : n; });

    this.displayedValues.set(stats.map((s, i) => targets[i] !== null ? '0' : s.value));

    let step = 0;
    this._timerId = setInterval(() => {
      step++;
      const t      = step / steps;
      const eased  = 1 - Math.pow(1 - t, 3);  // ease-out cubic
      this.displayedValues.set(
        stats.map((s, i) => {
          const target = targets[i];
          return target !== null ? Math.round(eased * target).toString() : s.value;
        })
      );
      if (step >= steps) {
        clearInterval(this._timerId!);
        this._timerId = null;
        this.displayedValues.set(stats.map(s => s.value));
      }
    }, 1000 / fps);
  }
}
