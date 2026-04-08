// ── FILE: src/app/shared/components/hero/hero.component.ts ──

import { Component, computed, input } from '@angular/core';
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
}
