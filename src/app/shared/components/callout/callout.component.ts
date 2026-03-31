// ── FILE: src/app/shared/components/callout/callout.component.ts ──

import { Component, computed, input } from '@angular/core';
import { CalloutData, CalloutType } from '../../../core/models';

/**
 * CalloutComponent renders a styled tip, warning, info, or danger callout block.
 * It is a pure display component — accepts CalloutData as a single input.
 */
@Component({
  selector: 'app-callout',
  standalone: true,
  imports: [],
  templateUrl: './callout.component.html',
  styleUrl: './callout.component.scss',
})
export class CalloutComponent {
  /** Full callout data including type, optional title, and body */
  public readonly data = input.required<CalloutData>();

  /** CSS modifier class derived from the callout type */
  protected readonly modifier = computed<string>(() => this.data().type);

  /** Icon emoji mapped from the callout type */
  protected readonly icon = computed<string>(() => {
    const map: Record<CalloutType, string> = {
      tip: '💡',
      warning: '⚠️',
      info: 'ℹ️',
      danger: '🚨',
    };
    return map[this.data().type];
  });
}
