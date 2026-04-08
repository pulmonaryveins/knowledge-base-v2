// ── FILE: src/app/shared/components/code-block/code-block.component.ts ──

import { Component, input, signal } from '@angular/core';
import { LucideAngularModule, Copy, Check } from 'lucide-angular';
import { CodeBlockData } from '../../../core/models';

@Component({
  selector: 'app-code-block',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './code-block.component.html',
  styleUrl: './code-block.component.scss',
})
export class CodeBlockComponent {
  public readonly data = input.required<CodeBlockData>();

  protected readonly CopyIcon  = Copy;
  protected readonly CheckIcon = Check;

  /** Whether the copy-success state is currently showing */
  protected readonly copied = signal(false);

  /** Copy code to clipboard and show a brief ✓ confirmation */
  protected async copyCode(): Promise<void> {
    try {
      await navigator.clipboard.writeText(this.data().code);
      this.copied.set(true);
      setTimeout(() => this.copied.set(false), 2000);
    } catch {
      // Clipboard API unavailable — silently ignore
    }
  }
}
