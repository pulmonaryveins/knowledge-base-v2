// ── FILE: src/app/shared/components/right-rail/right-rail.component.ts ──

import {
  Component,
  computed,
  inject,
  OnInit,
  ElementRef,
  DestroyRef,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { fromEvent } from 'rxjs';
import { NavigationService } from '../../../core/services';

/**
 * RightRailComponent renders the "On This Page" sticky navigation rail.
 * It observes scroll position to highlight the active section and
 * snaps from transparent-over-hero to opaque when the hero leaves the viewport.
 */
@Component({
  selector: 'app-right-rail',
  standalone: true,
  imports: [],
  templateUrl: './right-rail.component.html',
  styleUrl: './right-rail.component.scss',
})
export class RightRailComponent implements OnInit {
  /** Navigation service for active section and scroll progress signals */
  private readonly _nav = inject(NavigationService);
  /** DestroyRef for automatic subscription cleanup */
  private readonly _destroyRef = inject(DestroyRef);
  /** Host element reference for computing hero offset */
  private readonly _el = inject(ElementRef);

  /** Whether the right rail has snapped past the hero */
  protected readonly snapped = signal<boolean>(false);

  /** Sections to display in the rail, sourced from NavigationService */
  protected readonly sections = computed(() => this._nav.activeSections());

  /** Index of the currently active section */
  protected readonly activeIndex = computed(() => this._nav.activeSectionIndex());

  /** Scroll progress percentage for the bottom progress bar */
  protected readonly progress = computed(() => this._nav.scrollProgress());

  /** Formatted counter string, e.g. "03 / 06" */
  protected readonly counter = computed<string>(() => {
    const idx = this.activeIndex();
    const total = this.sections().length;
    return `${String(idx + 1).padStart(2, '0')} / ${String(total).padStart(2, '0')}`;
  });

  /** @inheritdoc */
  public ngOnInit(): void {
    this._setupScrollTracking();
  }

  /**
   * Subscribe to window scroll events to update active section,
   * scroll progress, and hero-snap state.
   */
  private _setupScrollTracking(): void {
    fromEvent(window, 'scroll', { passive: true })
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe(() => {
        this._updateScrollState();
      });
  }

  /**
   * Read the current scroll position, update NavigationService signals,
   * and snap the rail when scrolled past the hero.
   */
  private _updateScrollState(): void {
    const scrollY = window.scrollY;
    const docHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollY / docHeight) * 100 : 0;
    this._nav.setScrollProgress(progress);

    // Snap past hero when scrolled 220px (hero min-height)
    this.snapped.set(scrollY > 200);

    // Determine active section by checking element visibility
    const sections = this._nav.activeSections();
    for (let i = sections.length - 1; i >= 0; i--) {
      const el = document.getElementById(sections[i].id);
      if (el && el.getBoundingClientRect().top <= 120) {
        this._nav.setActiveSection(sections[i].id);
        return;
      }
    }
    if (sections.length > 0) {
      this._nav.setActiveSection(sections[0].id);
    }
  }

  /**
   * Scroll smoothly to the section identified by the given ID.
   * @param sectionId - The HTML element id to scroll to
   */
  protected scrollTo(sectionId: string): void {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
