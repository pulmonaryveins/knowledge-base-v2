import { Component, computed, inject, signal, OnInit } from '@angular/core';
import { LucideAngularModule, FileText, ExternalLink } from 'lucide-angular';
import { NavigationService } from '../../core/services/navigation.service';
import { RdDocumentsService } from '../../core/services/rd-documents.service';
import { RdSectionsService } from '../../core/services/rd-sections.service';
import { Team } from '../../core/models';
import type { RdDocument } from '../../core/models/rd-document.model';
import type { RdSection } from '../../core/models/rd-section.model';
import { HeroComponent } from '../../shared/components/hero/hero.component';
import { RevealDirective } from '../../shared/directives/reveal.directive';

interface DocGroup {
  section: string | null;
  docs: RdDocument[];
}

@Component({
  selector: 'app-apps-page',
  standalone: true,
  imports: [HeroComponent, LucideAngularModule, RevealDirective],
  templateUrl: './apps-page.component.html',
  styleUrl: './apps-page.component.scss',
})
export class AppsPageComponent implements OnInit {
  private readonly _nav      = inject(NavigationService);
  private readonly _rdDocs   = inject(RdDocumentsService);
  private readonly _rdSecs   = inject(RdSectionsService);

  protected readonly appsTeam = computed<Team>(() => this._nav.activeTeam());

  /** Raw document list from Supabase. */
  protected readonly rdDocuments   = signal<RdDocument[]>([]);
  /** Sections ordered by position from rd_sections table. */
  protected readonly rdSections    = signal<RdSection[]>([]);
  /** True while the initial fetch is in-flight. */
  protected readonly rdDocsLoading = signal(true);

  protected readonly FileTextIcon     = FileText;
  protected readonly ExternalLinkIcon = ExternalLink;

  /**
   * Documents grouped by section, ordered by the position defined in rd_sections.
   * Sections not found in rd_sections (e.g. legacy docs) are appended at the end.
   */
  protected readonly groupedDocs = computed<DocGroup[]>(() => {
    const docs = this.rdDocuments();
    if (!docs.length) return [];

    // Build a map: sectionName → docs[]
    const map = new Map<string, RdDocument[]>();
    for (const doc of docs) {
      const key = doc.section?.trim() || '';
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(doc);
    }

    // Order by rd_sections position, then append any unmatched keys
    const orderedKeys: string[] = this.rdSections().map(s => s.name);
    const remaining = [...map.keys()].filter(k => !orderedKeys.includes(k));

    return [...orderedKeys, ...remaining]
      .filter(key => map.has(key))
      .map(key => ({ section: key || null, docs: map.get(key)! }));
  });

  async ngOnInit(): Promise<void> {
    this.rdDocsLoading.set(true);
    const [docs, sections] = await Promise.all([
      this._rdDocs.listDocuments(),
      this._rdSecs.listSections(),
    ]);
    this.rdDocuments.set(docs);
    this.rdSections.set(sections);
    this.rdDocsLoading.set(false);
  }
}
