// ── FILE: src/app/shared/components/typography-scale/typography-scale.component.ts ──

import { Component, input, signal, computed } from '@angular/core';
import { TypographySample, TypographyTab } from '../../../core/models';

@Component({
  selector: 'app-typography-scale',
  standalone: true,
  templateUrl: './typography-scale.component.html',
  styleUrl: './typography-scale.component.scss',
})
export class TypographyScaleComponent {
  public readonly samples = input<ReadonlyArray<TypographySample> | undefined>(undefined);
  public readonly tabs = input<ReadonlyArray<TypographyTab> | undefined>(undefined);

  protected readonly activeTabIndex = signal(0);

  protected readonly activeTab = computed(() => {
    const t = this.tabs();
    return t ? t[this.activeTabIndex()] : null;
  });

  protected selectTab(index: number): void {
    this.activeTabIndex.set(index);
  }
}
