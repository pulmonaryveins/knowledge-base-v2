// ── FILE: src/app/features/project-doc/project-doc.component.ts ──

import { Component, computed, inject, input } from '@angular/core';
import { LucideAngularModule, LucideIconData } from 'lucide-angular';
import { Project } from '../../core/models';
import { NavigationService } from '../../core/services';
import { InfoCardComponent } from '../../shared/components/info-card/info-card.component';
import { CodeBlockComponent } from '../../shared/components/code-block/code-block.component';
import { StepListComponent } from '../../shared/components/step-list/step-list.component';
import { StatusBadgeComponent } from '../../shared/components/status-badge/status-badge.component';
import { getAppIcon, ICONS } from '../../core/utils/icons';

@Component({
  selector: 'app-project-doc',
  standalone: true,
  imports: [
    InfoCardComponent,
    CodeBlockComponent,
    StepListComponent,
    StatusBadgeComponent,
    LucideAngularModule,
  ],
  templateUrl: './project-doc.component.html',
  styleUrl: './project-doc.component.scss',
})
export class ProjectDocComponent {
  public readonly project = input.required<Project>();

  private readonly _nav = inject(NavigationService);

  protected readonly ChevronRight = ICONS.ChevronRight;

  protected readonly isOpen = computed<boolean>(
    () => this._nav.activeProjectId() === this.project().id
  );

  protected projectIcon(name: string): LucideIconData {
    return getAppIcon(name);
  }

  protected toggle(): void {
    this._nav.toggleProject(this.project().id);
  }
}
