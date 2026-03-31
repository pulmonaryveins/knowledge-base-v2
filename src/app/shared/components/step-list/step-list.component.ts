// ── FILE: src/app/shared/components/step-list/step-list.component.ts ──

import { Component, input } from '@angular/core';
import { Step } from '../../../core/models';
import { CodeBlockComponent } from '../code-block/code-block.component';

/**
 * StepListComponent renders a numbered vertical step list with a connecting
 * green gradient line and optional inline code snippets per step.
 * Pure display component — no service injection.
 */
@Component({
  selector: 'app-step-list',
  standalone: true,
  imports: [CodeBlockComponent],
  templateUrl: './step-list.component.html',
  styleUrl: './step-list.component.scss',
})
export class StepListComponent {
  /** Ordered array of steps to render */
  public readonly steps = input.required<ReadonlyArray<Step>>();
}
