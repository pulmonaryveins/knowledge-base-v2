// ── FILE: src/app/shared/components/step-list/step-list.component.ts ──

import { Component, input } from '@angular/core';
import { LucideAngularModule, LucideIconData } from 'lucide-angular';
import { Step } from '../../../core/models';
import { getStepIcon } from '../../../core/utils/icons';
import { CodeBlockComponent } from '../code-block/code-block.component';

/**
 * StepListComponent renders a numbered vertical step list with a connecting
 * green gradient line and optional inline code snippets per step.
 * Pure display component — no service injection.
 */
@Component({
  selector: 'app-step-list',
  standalone: true,
  imports: [CodeBlockComponent, LucideAngularModule],
  templateUrl: './step-list.component.html',
  styleUrl: './step-list.component.scss',
})
export class StepListComponent {
  /** Ordered array of steps to render */
  public readonly steps = input.required<ReadonlyArray<Step>>();

  /** Resolves an icon name string to LucideIconData */
  protected iconData(name: string): LucideIconData {
    return getStepIcon(name);
  }
}
