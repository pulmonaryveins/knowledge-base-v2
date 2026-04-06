// ── FILE: src/app/shared/components/status-badge/status-badge.component.ts ──

import { Component, computed, input } from '@angular/core';
import { StatusType } from '../../../core/models';

/**
 * StatusBadgeComponent renders a colour-coded pill badge for a project status.
 * It is a pure display component — no service injection.
 */
@Component({
  selector: 'app-status-badge',
  standalone: true,
  imports: [],
  templateUrl: './status-badge.component.html',
  styleUrl: './status-badge.component.scss',
})
export class StatusBadgeComponent {
  /** The status variant controlling the badge colour scheme */
  public readonly status = input.required<StatusType>();

  /**
   * CSS modifier class derived from the status value.
   * Maps 'Live' → 'live', 'Dev' → 'dev', etc.
   */
  protected readonly modifier = computed<string>(() =>
    this.status().toLowerCase()
  );
}
