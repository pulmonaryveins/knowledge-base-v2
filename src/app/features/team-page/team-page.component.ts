// ── FILE: src/app/features/team-page/team-page.component.ts ──

import { Component, computed, inject } from '@angular/core';
import { LucideAngularModule, LucideIconData } from 'lucide-angular';
import { getStepIcon } from '../../core/utils/icons';
import { NavigationService } from '../../core/services';
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
export class TeamPageComponent {
  /** Navigation service for the active team signal */
  private readonly _nav = inject(NavigationService);

  /** The currently active team object */
  protected readonly team = computed<Team>(() => this._nav.activeTeam());

  /** Ordered documentation sections for the active team */
  protected readonly sections = computed<ReadonlyArray<TeamSection>>(
    () => this._nav.activeSections()
  );

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
