// ── FILE: src/app/shared/components/mistakes-table/mistakes-table.component.ts ──

import { Component, input } from '@angular/core';
import { DataTable } from '../../../core/models';

/**
 * MistakesTableComponent renders a Common Mistakes section as a visual
 * comparison layout — each row shown as a ❌ Don't vs ✅ Do card pair.
 */
@Component({
  selector: 'app-mistakes-table',
  standalone: true,
  imports: [],
  templateUrl: './mistakes-table.component.html',
  styleUrl: './mistakes-table.component.scss',
})
export class MistakesTableComponent {
  public readonly table = input.required<DataTable | null>();
}
