// ── FILE: src/app/shared/components/section-header/section-header.component.ts ──

import { Component, input } from '@angular/core';

/**
 * SectionHeaderComponent renders the numbered badge + section title row
 * used at the top of each documentation section.
 */
@Component({
  selector: 'app-section-header',
  standalone: true,
  imports: [],
  templateUrl: './section-header.component.html',
  styleUrl: './section-header.component.scss',
})
export class SectionHeaderComponent {
  /** Zero-padded section number, e.g. "01" */
  public readonly num = input.required<string>();

  /** Section display label */
  public readonly label = input.required<string>();

  /** Optional description rendered below the title */
  public readonly subHeader = input<string | undefined>(undefined);
}
