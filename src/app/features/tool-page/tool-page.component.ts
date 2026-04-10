// ── FILE: src/app/features/tool-page/tool-page.component.ts ──

// ── FILE: src/app/features/tool-page/tool-page.component.ts ──

import { Component, computed, inject } from '@angular/core';
import { LucideAngularModule, LucideIconData } from 'lucide-angular';
import { NavigationService } from '../../core/services/navigation.service';
import { DocsDataService } from '../../core/services/docs-data.service';
import { Tool } from '../../core/models/tool.model';
import { getToolIcon } from '../../core/utils/icons';
import { SectionHeaderComponent } from '../../shared/components/section-header/section-header.component';

@Component({
  selector: 'app-tool-page',
  standalone: true,
  imports: [LucideAngularModule, SectionHeaderComponent],
  templateUrl: './tool-page.component.html',
  styleUrl: './tool-page.component.scss',
})
export class ToolPageComponent {
  private readonly _nav = inject(NavigationService);
  private readonly _docsData = inject(DocsDataService);

  /** The currently active tool object */
  protected readonly tool = computed<Tool | undefined>(() => {
    const key = this._nav.activeToolKey();
    return this._docsData.getTools().find((t) => t.key === key);
  });

  /** Resolves the tool's icon key to a LucideIconData object */
  protected toolIcon(iconKey: string): LucideIconData {
    return getToolIcon(iconKey);
  }

  /** Generates a dark gradient background from the tool's hex color */
  protected toolGradient(hex: string): string {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    const d1 = `rgb(${Math.round(r * 0.18)},${Math.round(g * 0.18)},${Math.round(b * 0.18)})`;
    const d2 = `rgb(${Math.round(r * 0.32)},${Math.round(g * 0.32)},${Math.round(b * 0.32)})`;
    return `linear-gradient(135deg, ${d1}, ${d2})`;
  }
}
