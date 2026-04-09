// ── FILE: src/app/shared/components/color-palette/color-palette.component.ts ──

import { Component, input } from '@angular/core';
import { ColorGroup } from '../../../core/models';

@Component({
  selector: 'app-color-palette',
  standalone: true,
  templateUrl: './color-palette.component.html',
  styleUrl: './color-palette.component.scss',
})
export class ColorPaletteComponent {
  public readonly groups = input.required<ReadonlyArray<ColorGroup>>();

  /** Determine whether white or black text gives better contrast on a hex background */
  public textColor(hex: string): string {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance > 0.55 ? '#091635' : '#ffffff';
  }
}
