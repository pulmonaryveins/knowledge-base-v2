// ── FILE: src/app/shared/components/hero/hero.component.ts ──

import { Component, input } from '@angular/core';
import { HeroStat } from '../../../core/models';

/**
 * HeroComponent renders the full-width hero banner at the top of each team page.
 * It accepts all display data as typed inputs — no service injection.
 */
@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
})
export class HeroComponent {
  /** Team display label shown in the pill badge and H1 */
  public readonly teamLabel = input.required<string>();

  /** CSS gradient string for the hero background */
  public readonly gradient = input.required<string>();

  /** Emoji or icon string for the pill badge */
  public readonly icon = input.required<string>();

  /** Hero subtitle text shown below the H1 */
  public readonly subtitle = input.required<string>();

  /** Team accent colour for the pill badge background */
  public readonly color = input.required<string>();

  /** Stat pills displayed in a row at the bottom of the hero */
  public readonly stats = input.required<ReadonlyArray<HeroStat>>();
}
