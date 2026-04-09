// ── FILE: src/app/shared/components/typography-scale/typography-scale.component.ts ──

import { Component, input } from '@angular/core';
import { TypographySample } from '../../../core/models';

@Component({
  selector: 'app-typography-scale',
  standalone: true,
  templateUrl: './typography-scale.component.html',
  styleUrl: './typography-scale.component.scss',
})
export class TypographyScaleComponent {
  public readonly samples = input.required<ReadonlyArray<TypographySample>>();
}
