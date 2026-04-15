import { Component, inject } from '@angular/core';
import { ToastService } from '../../../core/services/toast.service';
import { LucideAngularModule, Check, X, Info, AlertCircle } from 'lucide-angular';

/**
 * Renders the global toast notification stack.
 *
 * Placed once at the application root (inside `AppComponent`) so it persists
 * across route changes. Reads the reactive `toasts` signal from
 * {@link ToastService} and renders each item with an icon, message,
 * dismiss button, and an auto-dismiss progress bar.
 *
 * The component itself has no public API — all interaction goes through
 * `ToastService.show()` and `ToastService.dismiss()`.
 */
@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss',
})
export class ToastComponent {
  /** Injected service that owns the reactive toasts list. */
  protected readonly _toast = inject(ToastService);

  /** Icon shown inside success toasts. */
  protected readonly CheckIcon  = Check;
  /** Icon shown inside error toasts. */
  protected readonly AlertIcon  = AlertCircle;
  /** Icon shown inside info toasts. */
  protected readonly InfoIcon   = Info;
  /** Icon used for the dismiss (×) button on every toast. */
  protected readonly XIcon      = X;
}
