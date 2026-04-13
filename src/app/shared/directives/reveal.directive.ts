import { Directive, ElementRef, Input, OnInit, OnDestroy } from '@angular/core';

type RevealVariant = 'up' | 'left' | 'right' | 'zoom' | 'fade';

/**
 * RevealDirective — adds `.reveal--in` when the host element enters the viewport.
 *
 * Usage:
 *   <div appReveal>                         — default fade-up
 *   <div [appReveal]="'left'">              — slide in from left
 *   <div [appReveal]="'zoom'">              — scale + fade
 *   <div appReveal [appRevealDelay]="120">  — 120 ms stagger delay
 *
 * Variants: 'up' | 'left' | 'right' | 'zoom' | 'fade'
 * Global styles for .reveal and its modifiers live in styles.scss.
 */
@Directive({
  selector: '[appReveal]',
  standalone: true,
  host: { 'class': 'reveal' },
})
export class RevealDirective implements OnInit, OnDestroy {
  /** Animation variant — passed as the directive value: [appReveal]="'left'" */
  @Input('appReveal') variant: RevealVariant | '' = 'up';

  /** Stagger delay in milliseconds — sets --reveal-delay CSS custom property */
  @Input() appRevealDelay = 0;

  private _observer!: IntersectionObserver;

  constructor(private readonly _el: ElementRef<HTMLElement>) {}

  ngOnInit(): void {
    const el = this._el.nativeElement;

    // Apply the variant class (falls back to 'up' if no value passed)
    const v: RevealVariant = (this.variant as RevealVariant) || 'up';
    el.classList.add(`reveal--${v}`);

    // Apply stagger delay via CSS custom property
    if (this.appRevealDelay > 0) {
      el.style.setProperty('--reveal-delay', `${this.appRevealDelay}ms`);
    }

    this._observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal--in');
          this._observer.unobserve(entry.target);
        }
      },
      { threshold: 0.08, rootMargin: '0px 0px -48px 0px' },
    );
    this._observer.observe(el);
  }

  ngOnDestroy(): void {
    this._observer.disconnect();
  }
}
