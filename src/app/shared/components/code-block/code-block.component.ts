// ── FILE: src/app/shared/components/code-block/code-block.component.ts ──

import { Component, input } from '@angular/core';
import { CodeBlockData } from '../../../core/models';

/**
 * CodeBlockComponent renders a dark macOS-styled code block with
 * window traffic-light dots and a language label in the header.
 * Pure display component — no service injection.
 */
@Component({
  selector: 'app-code-block',
  standalone: true,
  imports: [],
  templateUrl: './code-block.component.html',
  styleUrl: './code-block.component.scss',
})
export class CodeBlockComponent {
  /** Code block data: language label and raw code string */
  public readonly data = input.required<CodeBlockData>();
}
