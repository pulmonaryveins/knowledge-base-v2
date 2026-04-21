// ── FILE: src/app/shared/components/grid-guide/grid-guide.component.ts ──

import { Component, input } from '@angular/core';
import { GridBreakpointGroup } from '../../../core/models';

@Component({
  selector: 'app-grid-guide',
  standalone: true,
  templateUrl: './grid-guide.component.html',
  styleUrl: './grid-guide.component.scss',
})
export class GridGuideComponent {
  public readonly groups = input<ReadonlyArray<GridBreakpointGroup>>([]);
  public readonly description = input<string | undefined>(undefined);

  /**
   * Scale a raw pixel dimension to a thumbnail display size.
   * Desktop widths max out at 220px, everything scales proportionally.
   */
  public thumbWidth(w: number): number {
    return Math.round((w / 1920) * 300);
  }

  public thumbHeight(w: number, h: number): number {
    return Math.round(this.thumbWidth(w) * (h / w));
  }
}
