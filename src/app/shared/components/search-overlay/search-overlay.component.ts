// ── FILE: src/app/shared/components/search-overlay/search-overlay.component.ts ──

import {
  Component,
  computed,
  inject,
  signal,
  OnInit,
  DestroyRef,
  ElementRef,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { fromEvent } from 'rxjs';
import { filter } from 'rxjs/operators';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { NavigationService } from '../../../core/services/navigation.service';
import { SearchService } from '../../../core/services/search.service';
import { SearchResult } from '../../../core/models';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, Search, FileText, FolderGit2, Wrench, ArrowRight } from 'lucide-angular';

/**
 * SearchOverlayComponent renders the ⌘K global search modal.
 * It is a smart component that injects NavigationService and SearchService.
 * Keyboard events are captured from the document to support ⌘K and Escape.
 */
@Component({
  selector: 'app-search-overlay',
  standalone: true,
  imports: [FormsModule, LucideAngularModule],
  templateUrl: './search-overlay.component.html',
  styleUrl: './search-overlay.component.scss',
})
export class SearchOverlayComponent implements OnInit, AfterViewInit {
  private readonly _nav       = inject(NavigationService);
  private readonly _search    = inject(SearchService);
  private readonly _sanitizer = inject(DomSanitizer);
  private readonly _destroyRef = inject(DestroyRef);

  /** The search input element for auto-focus */
  @ViewChild('searchInput') private readonly _searchInput!: ElementRef<HTMLInputElement>;

  protected readonly SearchIcon   = Search;
  protected readonly SectionIcon  = FileText;
  protected readonly ProjectIcon  = FolderGit2;
  protected readonly ToolIcon     = Wrench;
  protected readonly ArrowIcon    = ArrowRight;

  /** Whether the overlay is currently visible */
  protected readonly isOpen = computed<boolean>(() => this._nav.searchOpen());

  /** Raw query string bound to the search input */
  protected readonly query = signal<string>('');

  /** Zero-based index of the keyboard-focused result */
  protected readonly focusedIndex = signal<number>(0);

  /** Filtered search results derived from the query */
  protected readonly results = computed<ReadonlyArray<SearchResult>>(() =>
    this._search.search(this.query())
  );

  /** @inheritdoc */
  public ngOnInit(): void {
    this._registerKeyboardShortcuts();
  }

  /** @inheritdoc */
  public ngAfterViewInit(): void {
    // Focus the input whenever the overlay becomes open
  }

  /**
   * Register document-level keyboard listeners for ⌘K and Escape.
   */
  private _registerKeyboardShortcuts(): void {
    fromEvent<KeyboardEvent>(document, 'keydown')
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe((e) => {
        if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
          e.preventDefault();
          this._nav.openSearch();
          setTimeout(() => this._searchInput?.nativeElement?.focus(), 50);
        } else if (e.key === 'Escape' && this.isOpen()) {
          this.close();
        } else if (e.key === 'ArrowDown' && this.isOpen()) {
          e.preventDefault();
          this.focusedIndex.update((i) =>
            Math.min(i + 1, this.results().length - 1)
          );
        } else if (e.key === 'ArrowUp' && this.isOpen()) {
          e.preventDefault();
          this.focusedIndex.update((i) => Math.max(i - 1, 0));
        } else if (e.key === 'Enter' && this.isOpen()) {
          const result = this.results()[this.focusedIndex()];
          if (result) this.selectResult(result);
        }
      });
  }

  /**
   * Wrap every query word in the text with a <mark> for highlight rendering.
   * HTML special chars are escaped first to prevent injection.
   */
  protected highlight(text: string): SafeHtml {
    const q = this.query().trim();
    const safe = text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    if (!q) return this._sanitizer.bypassSecurityTrustHtml(safe);

    const words   = q.split(/\s+/).filter(Boolean);
    const pattern = words.map(w => w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|');
    const html    = safe.replace(new RegExp(`(${pattern})`, 'gi'), '<mark class="search-hl">$1</mark>');
    return this._sanitizer.bypassSecurityTrustHtml(html);
  }

  /**
   * Close the search overlay and reset state.
   */
  protected close(): void {
    this._nav.closeSearch();
    this.query.set('');
    this.focusedIndex.set(0);
  }

  /**
   * Handle typing in the search input.
   * @param value - New query string from the input event
   */
  protected onQueryChange(value: string): void {
    this.query.set(value);
    this.focusedIndex.set(0);
  }

  /**
   * Navigate to the team/section referenced by the result.
   * @param result - The search result to navigate to
   */
  protected selectResult(result: SearchResult): void {
    if (result.type === 'tool') {
      this._nav.switchToTool(result.toolKey);
      this.close();
    } else {
      // Queue the scroll BEFORE switching team so DocsShellComponent
      // picks it up after the 420ms skeleton clears and the DOM is ready.
      this._nav.setPendingScroll(result.sectionId);
      this._nav.switchTeam(result.teamKey);
      this.close();
    }
  }

  /**
   * Prevent the backdrop click from propagating to child elements.
   * @param event - The mouse event from the backdrop
   */
  protected onBackdropClick(event: MouseEvent): void {
    if ((event.target as HTMLElement).classList.contains('search-overlay__backdrop')) {
      this.close();
    }
  }
}
