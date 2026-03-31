// ── FILE: src/app/features/project-doc/project-doc.component.ts ──

import { Component, computed, inject, input } from '@angular/core';
import { Project } from '../../core/models';
import { NavigationService } from '../../core/services';
import { InfoCardComponent } from '../../shared/components/info-card/info-card.component';
import { CodeBlockComponent } from '../../shared/components/code-block/code-block.component';
import { StepListComponent } from '../../shared/components/step-list/step-list.component';
import { StatusBadgeComponent } from '../../shared/components/status-badge/status-badge.component';

/**
 * ProjectDocComponent renders an expandable inline project documentation card.
 * The trigger row always shows; the doc panel animates open below it.
 * Smart component — injects NavigationService to toggle expand state.
 */
@Component({
  selector: 'app-project-doc',
  standalone: true,
  imports: [InfoCardComponent, CodeBlockComponent, StepListComponent, StatusBadgeComponent],
  templateUrl: './project-doc.component.html',
  styleUrl: './project-doc.component.scss',
})
export class ProjectDocComponent {
  /** The project data to display in this card */
  public readonly project = input.required<Project>();

  /** Navigation service for tracking/toggling the expanded project */
  private readonly _nav = inject(NavigationService);

  /** Whether this specific card is expanded */
  protected readonly isOpen = computed<boolean>(
    () => this._nav.activeProjectId() === this.project().id
  );

  /**
   * Toggle this project's expanded state via NavigationService.
   */
  protected toggle(): void {
    this._nav.toggleProject(this.project().id);
  }
}
