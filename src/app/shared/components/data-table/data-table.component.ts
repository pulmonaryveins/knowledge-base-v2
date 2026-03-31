// ── FILE: src/app/shared/components/data-table/data-table.component.ts ──

import { Component, input } from '@angular/core';
import { DataTable } from '../../../core/models';

/**
 * DataTableComponent renders a dark-header table with hover rows.
 * Pure display component — no service injection.
 */
@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [],
  templateUrl: './data-table.component.html',
  styleUrl: './data-table.component.scss',
})
export class DataTableComponent {
  /** Full table data including headers and rows */
  public readonly table = input.required<DataTable>();
}
