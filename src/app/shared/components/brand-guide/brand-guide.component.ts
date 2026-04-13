// ── FILE: src/app/shared/components/brand-guide/brand-guide.component.ts ──

import { Component, computed, input, signal } from '@angular/core';
import { BrandingLogoItem } from '../../../core/models';
import { RevealDirective } from '../../directives/reveal.directive';

@Component({
  selector: 'app-brand-guide',
  standalone: true,
  imports: [RevealDirective],
  templateUrl: './brand-guide.component.html',
  styleUrl: './brand-guide.component.scss',
})
export class BrandGuideComponent {
  public readonly mainLogos = input.required<ReadonlyArray<BrandingLogoItem>>();
  public readonly favicon = input<BrandingLogoItem | undefined>(undefined);
  public readonly sidebarCollapsed = input<ReadonlyArray<BrandingLogoItem> | undefined>(undefined);
  public readonly sidebarExpanded = input<ReadonlyArray<BrandingLogoItem> | undefined>(undefined);

  protected readonly activeTab = signal<number>(0);

  protected readonly tabs = computed(() => {
    const t: { label: string }[] = [{ label: 'Main Logos' }];
    if (this.sidebarCollapsed()?.length) t.push({ label: 'Sidebar Icons' });
    if (this.sidebarExpanded()?.length)  t.push({ label: 'Sidebar Expanded' });
    return t;
  });

  protected setTab(i: number): void {
    this.activeTab.set(i);
  }
}
