import { Injectable, signal } from '@angular/core';

export type ToastType = 'success' | 'error' | 'info';

export interface Toast {
  id:       number;
  message:  string;
  type:     ToastType;
  duration: number;
  removing: boolean;
}

@Injectable({ providedIn: 'root' })
export class ToastService {
  private _nextId = 0;
  readonly toasts = signal<Toast[]>([]);

  show(message: string, type: ToastType = 'success', duration = 3500): void {
    const id = ++this._nextId;
    this.toasts.update(ts => [...ts, { id, message, type, duration, removing: false }]);
    setTimeout(() => this._startRemove(id), duration);
  }

  dismiss(id: number): void {
    this._startRemove(id);
  }

  private _startRemove(id: number): void {
    this.toasts.update(ts => ts.map(t => t.id === id ? { ...t, removing: true } : t));
    setTimeout(() => {
      this.toasts.update(ts => ts.filter(t => t.id !== id));
    }, 300);
  }
}
