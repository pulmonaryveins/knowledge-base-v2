// ── FILE: src/app/shared/components/color-palette/color-palette.component.ts ──

import { Component, input, signal, computed } from '@angular/core';
import { ColorGroup, ColorTab } from '../../../core/models';

@Component({
  selector: 'app-color-palette',
  standalone: true,
  templateUrl: './color-palette.component.html',
  styleUrl: './color-palette.component.scss',
})
export class ColorPaletteComponent {
  public readonly groups = input<ReadonlyArray<ColorGroup> | undefined>(undefined);
  public readonly tabs = input<ReadonlyArray<ColorTab> | undefined>(undefined);

  protected readonly activeTabIndex = signal(0);

  protected readonly activeTab = computed(() => {
    const t = this.tabs();
    return t ? t[this.activeTabIndex()] : null;
  });

  protected selectTab(index: number): void {
    this.activeTabIndex.set(index);
  }

  /** Returns dark or light text color for best contrast on a given background */
  public textColor(hex: string): string {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance > 0.55 ? '#091635' : '#ffffff';
  }

  /** Returns true if the color is light (needs a border) */
  public isLight(hex: string): boolean {
    return this.textColor(hex) === '#091635';
  }
}
