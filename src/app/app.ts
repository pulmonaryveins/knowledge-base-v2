// ── FILE: src/app/app.ts ──

import { Component, HostListener, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LucideAngularModule, ArrowUp } from 'lucide-angular';
import { ToastComponent } from './shared/components/toast/toast.component';

/** Root application component — renders the router outlet and global scroll-to-top button */
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LucideAngularModule, ToastComponent],
  template: `
    <router-outlet />
    <app-toast />

    <!-- Global scroll-to-top button -->
    <button
      class="stt-btn"
      [class.stt-btn--visible]="visible()"
      (click)="scrollToTop()"
      aria-label="Scroll to top"
    >
      <lucide-icon [img]="ArrowUpIcon" [size]="18" />
    </button>
  `,
  styles: [`
    .stt-btn {
      position: fixed;
      bottom: 32px;
      right: 32px;
      z-index: 500;
      width: 44px;
      height: 44px;
      border-radius: 50%;
      border: none;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #8DCB2C;
      color: #091635;
      box-shadow: 0 4px 20px rgba(141, 203, 44, 0.35), 0 2px 8px rgba(0,0,0,0.25);

      opacity: 0;
      transform: translateY(12px) scale(0.85);
      pointer-events: none;
      transition:
        opacity 0.25s ease,
        transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1),
        box-shadow 0.2s ease,
        background 0.2s ease;
    }

    .stt-btn--visible {
      opacity: 1;
      transform: translateY(0) scale(1);
      pointer-events: auto;
    }

    .stt-btn:hover {
      background: #a0e030;
      box-shadow: 0 6px 28px rgba(141, 203, 44, 0.55), 0 2px 10px rgba(0,0,0,0.3);
      transform: translateY(-3px) scale(1.06);
    }

    .stt-btn:active {
      transform: translateY(0) scale(0.96);
    }

    @media (max-width: 600px) {
      .stt-btn { bottom: 20px; right: 20px; width: 40px; height: 40px; }
    }
  `],
})
export class App {
  protected readonly ArrowUpIcon = ArrowUp;
  protected readonly visible = signal(false);

  @HostListener('window:scroll')
  onScroll(): void {
    this.visible.set(window.scrollY > 300);
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
