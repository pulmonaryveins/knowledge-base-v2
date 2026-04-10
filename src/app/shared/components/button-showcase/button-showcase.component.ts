// ── FILE: src/app/shared/components/button-showcase/button-showcase.component.ts ──

import { Component, input, signal, computed } from '@angular/core';
import { ButtonShowcaseTab } from '../../../core/models';

export interface ButtonStateConfig {
  readonly label: string;
  readonly key: string;
}

@Component({
  selector: 'app-button-showcase',
  standalone: true,
  templateUrl: './button-showcase.component.html',
  styleUrl: './button-showcase.component.scss',
})
export class ButtonShowcaseComponent {
  public readonly tabs = input<ReadonlyArray<ButtonShowcaseTab>>([]);

  protected readonly activeTabIndex = signal(0);
  protected readonly activeTab = computed(() => {
    const t = this.tabs();
    return t.length ? t[this.activeTabIndex()] : null;
  });

  protected selectTab(index: number): void {
    this.activeTabIndex.set(index);
  }

  readonly SIZES = ['XS', 'S', 'M', 'L', 'XL'] as const;

  readonly STATES: ReadonlyArray<ButtonStateConfig> = [
    { label: 'Default State', key: 'default'  },
    { label: 'Hover State',   key: 'hover'    },
    { label: 'Active State',  key: 'active'   },
    { label: 'Disable State', key: 'disabled' },
    { label: 'Ghost State',   key: 'ghost'    },
    { label: 'Danger State',  key: 'danger'   },
  ];

  public btnClass(variant: string, state: string, size: string): string {
    return `btn btn--${variant} btn--${state} btn--${size.toLowerCase()}`;
  }
}
