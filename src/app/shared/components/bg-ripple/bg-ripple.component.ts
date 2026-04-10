import { Component, input, signal, computed, inject, ElementRef, OnInit, OnDestroy, NgZone } from '@angular/core';

@Component({
  selector: 'app-bg-ripple',
  standalone: true,
  imports: [],
  templateUrl: './bg-ripple.component.html',
  styleUrl: './bg-ripple.component.scss',
  host: { '(click)': '_onGridClick($event)' },
})
export class BgRippleComponent implements OnInit, OnDestroy {
  private readonly _el   = inject(ElementRef);
  private readonly _zone = inject(NgZone);

  readonly cellSize    = input<number>(56);
  readonly borderColor = input<string>('rgba(141,203,44,0.06)');
  readonly fillColor   = input<string>('rgba(141,203,44,0.14)');

  private readonly _rows = signal<number>(20);
  private readonly _cols = signal<number>(40);
  private _resizeObserver?: ResizeObserver;

  protected readonly rowArray = computed(() =>
    Array.from({ length: this._rows() }, (_, i) => i)
  );
  protected readonly colArray = computed(() =>
    Array.from({ length: this._cols() }, (_, i) => i)
  );

  ngOnInit(): void {
    this._resizeObserver = new ResizeObserver(entries => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        const size = this.cellSize();
        this._rows.set(Math.ceil(height / size) + 1);
        this._cols.set(Math.ceil(width  / size) + 1);
      }
    });
    this._resizeObserver.observe(this._el.nativeElement);
  }

  ngOnDestroy(): void {
    this._resizeObserver?.disconnect();
  }

  /** Runs fully outside Angular — no change detection, proper reflow restart. */
  protected _onGridClick(event: MouseEvent): void {
    const host = this._el.nativeElement as HTMLElement;
    const rect = host.getBoundingClientRect();
    const size = this.cellSize();
    const clickedCol = Math.floor((event.clientX - rect.left)  / size);
    const clickedRow = Math.floor((event.clientY - rect.top)   / size);
    const maxDist = 4;
    const animDuration = 900;

    this._zone.runOutsideAngular(() => {
      const rowEls = host.querySelectorAll<HTMLElement>('.bg-ripple__row');

      for (let r = Math.max(0, clickedRow - maxDist);
               r <= Math.min(rowEls.length - 1, clickedRow + maxDist); r++) {
        const cellEls = rowEls[r].querySelectorAll<HTMLElement>('.bg-ripple__cell');

        for (let c = Math.max(0, clickedCol - maxDist);
                 c <= Math.min(cellEls.length - 1, clickedCol + maxDist); c++) {
          const dist = Math.abs(r - clickedRow) + Math.abs(c - clickedCol);
          if (dist > maxDist) continue;

          const cell  = cellEls[c];
          const delay = dist * 45;
          const alpha = Math.max(0.12, 1 - dist * 0.22);

          // Remove → force reflow → re-add: guarantees animation restarts on rapid clicks
          cell.classList.remove('bg-ripple__cell--lit');
          cell.style.setProperty('--delay', `${delay}ms`);
          cell.style.setProperty('--alpha', String(alpha));
          void cell.offsetHeight;                          // force reflow
          cell.classList.add('bg-ripple__cell--lit');

          setTimeout(() => cell.classList.remove('bg-ripple__cell--lit'), animDuration + delay);
        }
      }
    });
  }
}

