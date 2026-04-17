import { Component, computed, inject, signal, OnInit, OnDestroy } from '@angular/core';
import { LucideAngularModule, FileText, ExternalLink, ArrowUpRight } from 'lucide-angular';
import { NavigationService } from '../../core/services/navigation.service';
import { RdDocumentsService } from '../../core/services/rd-documents.service';
import { RdSectionsService } from '../../core/services/rd-sections.service';
import { SupabaseService } from '../../core/services/supabase.service';
import { Team } from '../../core/models';
import type { HeroStat } from '../../core/models/team.model';
import type { RdDocument } from '../../core/models/rd-document.model';
import type { RdSection } from '../../core/models/rd-section.model';
import type { RealtimeChannel } from '@supabase/supabase-js';
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
export class AppsPageComponent implements OnInit, OnDestroy {
  private readonly _nav      = inject(NavigationService);
  private readonly _rdDocs   = inject(RdDocumentsService);
  private readonly _rdSecs   = inject(RdSectionsService);
  private readonly _sb       = inject(SupabaseService);

  private _channel: RealtimeChannel | null = null;

  protected readonly appsTeam = computed<Team>(() => this._nav.activeTeam());

  /** Raw document list from Supabase. */
  protected readonly rdDocuments   = signal<RdDocument[]>([]);
  /** Sections ordered by position from rd_sections table. */
  protected readonly rdSections    = signal<RdSection[]>([]);
  /** True while the initial fetch is in-flight. */
  protected readonly rdDocsLoading = signal(true);

  protected readonly FileTextIcon     = FileText;
  protected readonly ExternalLinkIcon = ExternalLink;
  protected readonly ArrowUpRightIcon = ArrowUpRight;

  /**
   * Dynamic stats for R&D hero.
   * Shows '—' placeholders while loading so the hero displays a non-numeric
   * dash instead of '0'. Once data arrives the values change to real numbers,
   * which triggers the hero's effect to re-run the count-up animation.
   */
  protected readonly rdStats = computed<HeroStat[]>(() => {
    const loading = this.rdDocsLoading();
    return [
      { label: 'Sections',    value: loading ? '—' : this.rdSections().length.toString() },
      { label: 'Documents',   value: loading ? '—' : this.rdDocuments().length.toString() },
      { label: 'Teams',       value: '4' },
      { label: 'Shared Svcs', value: '3' },
    ];
  });

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
    await this._fetchAll();
    this._subscribeRealtime();
  }

  ngOnDestroy(): void {
    if (this._channel) {
      this._sb.client.removeChannel(this._channel);
      this._channel = null;
    }
  }

  private async _fetchAll(): Promise<void> {
    this.rdDocsLoading.set(true);
    const [docs, sections] = await Promise.all([
      this._rdDocs.listDocuments(),
      this._rdSecs.listSections(),
    ]);
    this.rdDocuments.set(docs);
    this.rdSections.set(sections);
    this.rdDocsLoading.set(false);
  }

  /**
   * Opens a Supabase Realtime channel that watches both rd_documents and
   * rd_sections for any INSERT / UPDATE / DELETE. On each event the affected
   * table is re-fetched and the corresponding signal updated, so the hero
   * stats and document list refresh without a page reload.
   */
  private _subscribeRealtime(): void {
    this._channel = this._sb.client
      .channel('rd-live')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'rd_documents' },
        () => { this._rdDocs.listDocuments().then(docs => this.rdDocuments.set(docs)); }
      )
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'rd_sections' },
        () => { this._rdSecs.listSections().then(secs => this.rdSections.set(secs)); }
      )
      .subscribe();
  }
}
