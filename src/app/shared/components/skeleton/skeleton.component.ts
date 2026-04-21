// ── FILE: src/app/shared/components/skeleton/skeleton.component.ts ──

import { Component } from '@angular/core';

@Component({
  selector: 'app-skeleton',
  standalone: true,
  imports: [],
  templateUrl: './skeleton.component.html',
  styleUrl: './skeleton.component.scss',
})
export class SkeletonComponent {
  protected readonly rows6 = [1, 2, 3, 4, 5, 6];
  protected readonly rows4 = [1, 2, 3, 4];
  protected readonly rows8 = [1, 2, 3, 4, 5, 6, 7, 8];
  protected readonly codeWidths = ['72%', '88%', '55%', '94%', '63%', '80%', '48%', '76%'];
}
