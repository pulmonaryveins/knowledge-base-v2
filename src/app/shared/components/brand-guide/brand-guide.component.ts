// ── FILE: src/app/shared/components/brand-guide/brand-guide.component.ts ──

import { Component, input } from '@angular/core';
import { BrandingLogoItem } from '../../../core/models';

@Component({
  selector: 'app-brand-guide',
  standalone: true,
  templateUrl: './brand-guide.component.html',
  styleUrl: './brand-guide.component.scss',
})
export class BrandGuideComponent {
  public readonly mainLogos = input.required<ReadonlyArray<BrandingLogoItem>>();
  public readonly favicon = input<BrandingLogoItem | undefined>(undefined);
  public readonly sidebarCollapsed = input<ReadonlyArray<BrandingLogoItem> | undefined>(undefined);
  public readonly sidebarExpanded = input<ReadonlyArray<BrandingLogoItem> | undefined>(undefined);
}
