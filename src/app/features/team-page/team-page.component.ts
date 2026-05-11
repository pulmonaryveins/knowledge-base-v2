// ── FILE: src/app/features/team-page/team-page.component.ts ──

import { Component, computed, inject, OnInit, OnDestroy, signal } from '@angular/core';
import { LucideAngularModule, LucideIconData, FileText, ExternalLink, ArrowUpRight } from 'lucide-angular';
import { getStepIcon } from '../../core/utils/icons';
import { NavigationService } from '../../core/services';
import { PiDocumentsService } from '../../core/services/pi-documents.service';
import { PiSectionsService } from '../../core/services/pi-sections.service';
import type { PiDocument } from '../../core/models/pi-document.model';
import type { PiSection } from '../../core/models/pi-section.model';
import type { RealtimeChannel } from '@supabase/supabase-js';
import { SupabaseService } from '../../core/services/supabase.service';
import {
  Team,
  TeamSection,
  SectionContent,
  TechStackSection,
  GettingStartedSection,
  FolderArchSection,
  CodingPatternsSection,
  MistakesSection,
  ColorPaletteSection,
  TypographyScaleSection,
  ComponentSpecSection,
  BrandingSection,
  SpacingSection,
  GridSection,
  IconographySection,
  ButtonShowcaseSection,
  TeamContactsSection,
} from '../../core/models';
import { HeroComponent } from '../../shared/components/hero/hero.component';
import { SectionHeaderComponent } from '../../shared/components/section-header/section-header.component';
import { TechStackComponent } from '../../shared/components/tech-stack/tech-stack.component';
import { StepListComponent } from '../../shared/components/step-list/step-list.component';
import { CodeBlockComponent } from '../../shared/components/code-block/code-block.component';
import { InfoCardComponent } from '../../shared/components/info-card/info-card.component';
import { CalloutComponent } from '../../shared/components/callout/callout.component';
import { ProjectDocComponent } from '../project-doc/project-doc.component';
import { ColorPaletteComponent } from '../../shared/components/color-palette/color-palette.component';
import { TypographyScaleComponent } from '../../shared/components/typography-scale/typography-scale.component';
import { ComponentSpecComponent } from '../../shared/components/component-spec/component-spec.component';
import { BrandGuideComponent } from '../../shared/components/brand-guide/brand-guide.component';
import { SpacingGuideComponent } from '../../shared/components/spacing-guide/spacing-guide.component';
import { GridGuideComponent } from '../../shared/components/grid-guide/grid-guide.component';
import { IconographyGuideComponent } from '../../shared/components/iconography-guide/iconography-guide.component';
import { ButtonShowcaseComponent } from '../../shared/components/button-showcase/button-showcase.component';
import { MistakesTableComponent } from '../../shared/components/mistakes-table/mistakes-table.component';
import { NcDesignBasicsShowcaseComponent } from '../../shared/components/nc-design-basics-showcase/nc-design-basics-showcase.component';
import { NcUxDesignShowcaseComponent } from '../../shared/components/nc-ux-design-showcase/nc-ux-design-showcase.component';
import { NcPrototypeShowcaseComponent } from '../../shared/components/nc-prototype-showcase/nc-prototype-showcase.component';
import { NcWebDesignShowcaseComponent } from '../../shared/components/nc-web-design-showcase/nc-web-design-showcase.component';
import { NcPrintShowcaseComponent } from '../../shared/components/nc-print-showcase/nc-print-showcase.component';
import { NcBrandShowcaseComponent } from '../../shared/components/nc-brand-showcase/nc-brand-showcase.component';
import { RevealDirective } from '../../shared/directives/reveal.directive';
import { PiEcosystemComponent } from '../../shared/components/pi-ecosystem/pi-ecosystem.component';

interface PiDocGroup {
  section: string | null;
  docs: PiDocument[];
}

/**
 * TeamPageComponent renders the full documentation page for the active team.
 * It uses the generic section structure from NavigationService, rendering each
 * section's typed content via @switch on the content.type discriminant.
 * Smart component — injects NavigationService.
 */
@Component({
  selector: 'app-team-page',
  standalone: true,
  imports: [
    LucideAngularModule,
    HeroComponent,
    SectionHeaderComponent,
    TechStackComponent,
    StepListComponent,
    CodeBlockComponent,
    InfoCardComponent,
    CalloutComponent,
    ProjectDocComponent,
    ColorPaletteComponent,
    TypographyScaleComponent,
    ComponentSpecComponent,
    BrandGuideComponent,
    SpacingGuideComponent,
    GridGuideComponent,
    IconographyGuideComponent,
    ButtonShowcaseComponent,
    MistakesTableComponent,
    NcDesignBasicsShowcaseComponent,
    NcUxDesignShowcaseComponent,
    NcPrototypeShowcaseComponent,
    NcWebDesignShowcaseComponent,
    NcPrintShowcaseComponent,
    NcBrandShowcaseComponent,
    PiEcosystemComponent,
    RevealDirective,
  ],
  templateUrl: './team-page.component.html',
  styleUrl: './team-page.component.scss',
})
export class TeamPageComponent implements OnInit, OnDestroy {
  private readonly _nav = inject(NavigationService);
  private readonly _piDocs = inject(PiDocumentsService);
  private readonly _piSecs = inject(PiSectionsService);
  private readonly _sb     = inject(SupabaseService);

  private _piChannel: RealtimeChannel | null = null;

  protected readonly team = computed<Team>(() => this._nav.activeTeam());
  protected readonly sections = computed<ReadonlyArray<TeamSection>>(
    () => this._nav.activeSections()
  );

  protected readonly piDocuments = signal<PiDocument[]>([]);
  protected readonly piSections  = signal<PiSection[]>([]);
  protected readonly piDocsLoading = signal(false);

  protected readonly FileTextIcon     = FileText;
  protected readonly ExternalLinkIcon = ExternalLink;
  protected readonly ArrowUpRightIcon = ArrowUpRight;

  protected readonly piGroupedDocs = computed<PiDocGroup[]>(() => {
    const docs = this.piDocuments();
    if (!docs.length) return [];

    const map = new Map<string, PiDocument[]>();
    for (const doc of docs) {
      const key = doc.section?.trim() || '';
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(doc);
    }

    const orderedKeys: string[] = this.piSections().map(s => s.name);
    const remaining = [...map.keys()].filter(k => !orderedKeys.includes(k));

    return [...orderedKeys, ...remaining]
      .filter(key => map.has(key))
      .map(key => ({ section: key || null, docs: map.get(key)! }));
  });

  async ngOnInit(): Promise<void> {
    if (this.team().key === 'pi-player') {
      await this._fetchPiDocs();
      this._subscribePiRealtime();
    }
  }

  ngOnDestroy(): void {
    if (this._piChannel) {
      this._sb.client.removeChannel(this._piChannel);
      this._piChannel = null;
    }
  }

  private async _fetchPiDocs(): Promise<void> {
    this.piDocsLoading.set(true);
    const [docs, sections] = await Promise.all([
      this._piDocs.listDocuments(),
      this._piSecs.listSections(),
    ]);
    this.piDocuments.set(docs);
    this.piSections.set(sections);
    this.piDocsLoading.set(false);
  }

  private _subscribePiRealtime(): void {
    this._piChannel = this._sb.client
      .channel('pi-docs-live')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'pi_documents' },
        () => { this._piDocs.listDocuments().then(docs => this.piDocuments.set(docs)); }
      )
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'pi_sections' },
        () => { this._piSecs.listSections().then(secs => this.piSections.set(secs)); }
      )
      .subscribe();
  }

  protected piDocType(doc: PiDocument): string {
    const source = doc.file_path ?? doc.url ?? '';
    const ext = source.split('?')[0].split('.').pop()?.toLowerCase();
    switch (ext) {
      case 'pdf':          return 'PDF';
      case 'doc':
      case 'docx':         return 'Word Document';
      case 'md':           return 'Markdown';
      case 'ppt':
      case 'pptx':         return 'Presentation';
      case 'xls':
      case 'xlsx':         return 'Spreadsheet';
      default:             return 'URL';
    }
  }

  /** Resolves an icon name string to LucideIconData for process card rendering */
  protected iconData(name: string): LucideIconData {
    return getStepIcon(name);
  }

  /**
   * Narrow a SectionContent to TechStackSection for template binding.
   * @param c - Raw section content
   * @returns The content typed as TechStackSection
   */
  public asTechStack(c: SectionContent): TechStackSection {
    return c as TechStackSection;
  }

  /**
   * Narrow a SectionContent to GettingStartedSection for template binding.
   * @param c - Raw section content
   * @returns The content typed as GettingStartedSection
   */
  public asGettingStarted(c: SectionContent): GettingStartedSection {
    return c as GettingStartedSection;
  }

  /**
   * Narrow a SectionContent to FolderArchSection for template binding.
   * @param c - Raw section content
   * @returns The content typed as FolderArchSection
   */
  public asFolderArch(c: SectionContent): FolderArchSection {
    return c as FolderArchSection;
  }

  /**
   * Narrow a SectionContent to CodingPatternsSection for template binding.
   * @param c - Raw section content
   * @returns The content typed as CodingPatternsSection
   */
  public asCodingPatterns(c: SectionContent): CodingPatternsSection {
    return c as CodingPatternsSection;
  }

  /**
   * Narrow a SectionContent to MistakesSection for template binding.
   * @param c - Raw section content
   * @returns The content typed as MistakesSection
   */
  public asMistakes(c: SectionContent): MistakesSection {
    return c as MistakesSection;
  }

  public asColorPalette(c: SectionContent): ColorPaletteSection {
    return c as ColorPaletteSection;
  }

  public asTypographyScale(c: SectionContent): TypographyScaleSection {
    return c as TypographyScaleSection;
  }

  public asComponentSpec(c: SectionContent): ComponentSpecSection {
    return c as ComponentSpecSection;
  }

  public asBranding(c: SectionContent): BrandingSection {
    return c as BrandingSection;
  }

  public asSpacing(c: SectionContent): SpacingSection {
    return c as SpacingSection;
  }

  public asGrid(c: SectionContent): GridSection {
    return c as GridSection;
  }

  public asIconography(c: SectionContent): IconographySection {
    return c as IconographySection;
  }

  public asButtonShowcase(c: SectionContent): ButtonShowcaseSection {
    return c as ButtonShowcaseSection;
  }

  public asTeamContacts(c: SectionContent): TeamContactsSection {
    return c as TeamContactsSection;
  }
}
