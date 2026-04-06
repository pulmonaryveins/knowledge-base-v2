// ── FILE: src/app/shared/components/info-card/info-card.component.ts ──

import { Component, input } from '@angular/core';
import { InfoCardData } from '../../../core/models';

/**
 * InfoCardComponent renders a white bordered card with a title and body paragraph.
 * Pure display component — no service injection.
 */
@Component({
  selector: 'app-info-card',
  standalone: true,
  imports: [],
  templateUrl: './info-card.component.html',
  styleUrl: './info-card.component.scss',
})
export class InfoCardComponent {
  /** Card data containing title and body text */
  public readonly data = input.required<InfoCardData>();
}
