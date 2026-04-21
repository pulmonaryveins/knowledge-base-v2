import { Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { ToastService } from '../../core/services/toast.service';
import { LucideAngularModule, ArrowLeft, ArrowRight, ExternalLink } from 'lucide-angular';
import { BgRippleComponent } from '../../shared/components/bg-ripple/bg-ripple.component';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, LucideAngularModule, BgRippleComponent],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  private readonly _auth    = inject(AuthService);
  private readonly _router  = inject(Router);
  private readonly _route   = inject(ActivatedRoute);
  private readonly _fb      = inject(FormBuilder);
  private readonly _toast   = inject(ToastService);

  protected readonly form = this._fb.nonNullable.group({
    email:    ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  protected readonly isSubmitting  = signal(false);
  protected readonly errorMessage  = signal<string | null>(null);
  protected readonly showPassword  = signal(false);
  protected readonly mobileNavOpen = signal(false);

  protected readonly ArrowLeftIcon    = ArrowLeft;
  protected readonly ArrowRightIcon   = ArrowRight;
  protected readonly ExternalLinkIcon = ExternalLink;

  protected goToLanding() {
    this._router.navigate(['/']);
  }

  protected async onSubmit() {
    if (this.form.invalid || this.isSubmitting()) return;

    this.isSubmitting.set(true);
    this.errorMessage.set(null);

    const { email, password } = this.form.getRawValue();
    const error = await this._auth.signIn(email, password);

    if (error) {
      this.errorMessage.set(this._friendlyError(error.message));
      this.isSubmitting.set(false);
      return;
    }

    this._toast.show('Signed in successfully. Welcome back!', 'success');
    const returnUrl = this._route.snapshot.queryParams['returnUrl'] ?? '/portal';
    this._router.navigateByUrl(returnUrl);
  }

  private _friendlyError(msg: string): string {
    if (msg.toLowerCase().includes('invalid login'))
      return 'Incorrect email or password.';
    if (msg.toLowerCase().includes('email not confirmed'))
      return 'Account not confirmed. Contact your administrator.';
    return 'Sign in failed. Please try again.';
  }
}
