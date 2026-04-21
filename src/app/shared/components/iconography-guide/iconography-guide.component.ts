// ── FILE: src/app/shared/components/iconography-guide/iconography-guide.component.ts ──

import { Component, input } from '@angular/core';
import { FaIconEntry, IconSizeSpec } from '../../../core/models';

@Component({
  selector: 'app-iconography-guide',
  standalone: true,
  templateUrl: './iconography-guide.component.html',
  styleUrl: './iconography-guide.component.scss',
})
export class IconographyGuideComponent {
  public readonly description = input<string | undefined>(undefined);
  public readonly sizes = input<ReadonlyArray<IconSizeSpec>>([]);
  public readonly icons = input<ReadonlyArray<FaIconEntry>>([]);
}
