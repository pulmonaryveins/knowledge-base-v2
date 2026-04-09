// ── FILE: src/app/shared/components/component-spec/component-spec.component.ts ──

import { Component, input } from '@angular/core';
import { ComponentVariant } from '../../../core/models';

@Component({
  selector: 'app-component-spec',
  standalone: true,
  templateUrl: './component-spec.component.html',
  styleUrl: './component-spec.component.scss',
})
export class ComponentSpecComponent {
  public readonly name        = input.required<string>();
  public readonly description = input.required<string>();
  public readonly variants    = input.required<ReadonlyArray<ComponentVariant>>();
}
