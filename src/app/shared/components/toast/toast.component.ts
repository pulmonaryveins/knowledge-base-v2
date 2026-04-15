import { Component, inject } from '@angular/core';
import { ToastService } from '../../../core/services/toast.service';
import { LucideAngularModule, Check, X, Info, AlertCircle } from 'lucide-angular';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss',
})
export class ToastComponent {
  protected readonly _toast     = inject(ToastService);
  protected readonly CheckIcon  = Check;
  protected readonly XIcon      = X;
  protected readonly InfoIcon   = Info;
  protected readonly AlertIcon  = AlertCircle;
}
