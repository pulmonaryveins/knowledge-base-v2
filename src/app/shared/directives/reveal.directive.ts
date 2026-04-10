import { Directive, ElementRef, OnInit, OnDestroy } from '@angular/core';

/**
 * RevealDirective — adds `.reveal--in` when the host element enters the viewport.
 * Initial hidden state and transition are controlled by `.reveal` in styles.scss.
 * Usage: <div appReveal>
 */
@Directive({
  selector: '[appReveal]',
  standalone: true,
  host: { 'class': 'reveal' },
})
export class RevealDirective implements OnInit, OnDestroy {
  private _observer!: IntersectionObserver;

  constructor(private readonly _el: ElementRef<HTMLElement>) {}

  ngOnInit(): void {
    this._observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal--in');
          this._observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' },
    );
    this._observer.observe(this._el.nativeElement);
  }

  ngOnDestroy(): void {
    this._observer.disconnect();
  }
}
