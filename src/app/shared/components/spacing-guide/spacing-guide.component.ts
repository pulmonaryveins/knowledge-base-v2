// ── FILE: src/app/shared/components/spacing-guide/spacing-guide.component.ts ──

import { Component, input } from '@angular/core';
import { SpacingGroup } from '../../../core/models';

@Component({
  selector: 'app-spacing-guide',
  standalone: true,
  templateUrl: './spacing-guide.component.html',
  styleUrl: './spacing-guide.component.scss',
})
export class SpacingGuideComponent {
  public readonly groups = input<ReadonlyArray<SpacingGroup>>([]);
  public readonly description = input<string | undefined>(undefined);
  public readonly note = input<string | undefined>(undefined);

  /**
   * Returns a display pixel width for the visual token bar,
   * capped at 200px (representing 128px in the scale).
   */
  public barWidth(px: number): number {
    return Math.round(Math.min((px / 128) * 200, 200));
  }
}
