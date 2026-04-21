import { Injectable, signal } from '@angular/core';

/** Visual style variant for a toast notification. */
export type ToastType = 'success' | 'error' | 'info';

/**
 * Represents a single toast notification managed by {@link ToastService}.
 */
export interface Toast {
  /** Auto-incremented unique identifier used for tracking and dismissal. */
  id:       number;
  /** Human-readable message displayed inside the toast. */
  message:  string;
  /** Visual style variant — controls color and icon. */
  type:     ToastType;
  /** Auto-dismiss delay in milliseconds. Used to drive the progress bar animation. */
  duration: number;
  /** Whether the toast is in the exit-animation phase before being removed from the list. */
  removing: boolean;
}

/**
 * Global singleton service for displaying non-blocking toast notifications.
 *
 * Usage:
 * ```ts
 * this._toast.show('Saved successfully.', 'success');
 * this._toast.show('Something went wrong.', 'error', 5000);
 * ```
 *
 * Toasts are rendered by `ToastComponent` which reads the `toasts` signal.
 * The service is tree-shakable and provided at the root level.
 */
@Injectable({ providedIn: 'root' })
export class ToastService {
  private _nextId = 0;

  /**
   * Reactive list of active toast notifications.
   * Read by `ToastComponent` to render the stack.
   */
  readonly toasts = signal<Toast[]>([]);

  /**
   * Adds a new toast notification to the stack and schedules its removal.
   *
   * @param message  Text to display inside the toast.
   * @param type     Visual variant — `'success'` | `'error'` | `'info'`. Defaults to `'success'`.
   * @param duration Auto-dismiss delay in milliseconds. Defaults to `3500`.
   */
  show(message: string, type: ToastType = 'success', duration = 3500): void {
    const id = ++this._nextId;
    this.toasts.update(ts => [...ts, { id, message, type, duration, removing: false }]);
    setTimeout(() => this._startRemove(id), duration);
  }

  /**
   * Immediately begins the exit animation for a toast then removes it.
   *
   * @param id The `id` of the toast to dismiss.
   */
  dismiss(id: number): void {
    this._startRemove(id);
  }

  /**
   * Sets `removing: true` on the target toast (triggers the CSS exit animation),
   * then removes it from the list after 300 ms to match the animation duration.
   *
   * @param id The `id` of the toast to remove.
   */
  private _startRemove(id: number): void {
    this.toasts.update(ts => ts.map(t => t.id === id ? { ...t, removing: true } : t));
    setTimeout(() => {
      this.toasts.update(ts => ts.filter(t => t.id !== id));
    }, 300);
  }
}
