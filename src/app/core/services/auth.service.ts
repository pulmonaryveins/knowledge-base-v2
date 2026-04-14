import { Injectable, inject, signal, computed } from '@angular/core';
import { Router } from '@angular/router';
import type { User } from '@supabase/supabase-js';
import { SupabaseService } from './supabase.service';
import { environment } from '../../../environments/environment';
import type { Profile, AdminUserRecord } from '../models/profile.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly _sb = inject(SupabaseService);
  private readonly _router = inject(Router);

  // ── Auth state ─────────────────────────────────────────────────────────────
  private readonly _user        = signal<User | null>(null);
  private readonly _profile     = signal<Profile | null>(null);
  private readonly _loading     = signal(true);
  private readonly _accessToken = signal<string | null>(null);

  readonly user            = this._user.asReadonly();
  readonly profile         = this._profile.asReadonly();
  readonly isLoading       = this._loading.asReadonly();
  readonly isAuthenticated = computed(() => this._user() !== null);
  readonly isAdmin         = computed(() => this._profile()?.role === 'admin');

  constructor() {
    // Restore session on startup
    this._sb.client.auth.getSession().then(({ data: { session } }) => {
      this._user.set(session?.user ?? null);
      this._accessToken.set(session?.access_token ?? null);
      if (session?.user) {
        this._loadProfile(session.user.id);
      } else {
        this._loading.set(false);
      }
    });

    // Keep state in sync with Supabase auth events
    this._sb.client.auth.onAuthStateChange((_, session) => {
      this._user.set(session?.user ?? null);
      this._accessToken.set(session?.access_token ?? null);
      if (session?.user) {
        this._loadProfile(session.user.id);
      } else {
        this._profile.set(null);
        this._loading.set(false);
      }
    });
  }

  // ── Public methods ─────────────────────────────────────────────────────────

  async signIn(email: string, password: string) {
    const { error } = await this._sb.client.auth.signInWithPassword({ email, password });
    return error;
  }

  async signOut() {
    await this._sb.client.auth.signOut();
    this._router.navigate(['/login']);
  }

  // ── Admin: user management via edge function ───────────────────────────────

  async adminListUsers(): Promise<AdminUserRecord[]> {
    const { data, error } = await this._invokeAdmin<AdminUserRecord[]>({ action: 'list' });
    if (error) throw error;
    return data ?? [];
  }

  async adminCreateUser(payload: {
    email: string;
    password: string;
    role: 'admin' | 'member';
    fullName: string;
  }) {
    const { data, error } = await this._invokeAdmin({ action: 'create', ...payload });
    if (error) throw error;
    return data;
  }

  async adminUpdateUser(payload: {
    userId: string;
    email: string;
    password?: string;
    role: 'admin' | 'member';
    fullName: string;
  }) {
    const { data, error } = await this._invokeAdmin({ action: 'update', ...payload });
    if (error) throw error;
    return data;
  }

  async adminDeleteUser(userId: string) {
    const { error } = await this._invokeAdmin({ action: 'delete', userId });
    if (error) throw error;
  }

  /** Calls the admin-users edge function using raw fetch for reliable token delivery. */
  private async _invokeAdmin<T = unknown>(body: Record<string, unknown>): Promise<{ data: T | null; error: Error | null }> {
    // Always fetch a fresh session — getSession() reads from storage synchronously in most cases.
    // Using the signal alone risks a stale or null value during early-load race conditions.
    const { data: { session } } = await this._sb.client.auth.getSession();
    const token = session?.access_token ?? this._accessToken();

    if (!token) {
      return { data: null, error: new Error('Not authenticated — please sign in again') };
    }

    const url = `${environment.supabaseUrl}/functions/v1/admin-users`;
    let resp: Response;
    let json: Record<string, unknown> = {};

    try {
      resp = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': environment.supabaseAnonKey,
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });
      json = await resp.json();
    } catch (e) {
      return { data: null, error: new Error('Network error: ' + String(e)) };
    }

    if (!resp.ok) {
      // Supabase infrastructure errors use "message"; function errors use "error"
      const msg = json?.['error'] ?? json?.['message'] ?? `Edge Function error ${resp.status}`;
      return { data: null, error: new Error(String(msg)) };
    }
    return { data: json as T, error: null };
  }

  // ── Private helpers ────────────────────────────────────────────────────────

  private async _loadProfile(userId: string) {
    // Use a SECURITY DEFINER RPC so RLS never blocks the read.
    const { data: rows, error } = await this._sb.client.rpc('get_my_profile');
    const data = Array.isArray(rows) && rows.length > 0 ? rows[0] : null;

    if (error) {
      // RPC not deployed yet — fall back to direct table read.
      const { data: fallback, error: fbError } = await this._sb.client
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .maybeSingle();

      if (fbError) {
        console.error('[AuthService] profile load failed:', fbError);
      }

      if (fallback) {
        this._profile.set(fallback);
      } else {
        // Row does not exist yet — create a default member profile.
        const email = this._user()?.email ?? '';
        const { data: created } = await this._sb.client
          .from('profiles')
          .insert({ id: userId, email, role: 'member' })
          .select()
          .maybeSingle();
        this._profile.set(created ?? null);
      }
    } else {
      this._profile.set(data);
    }

    this._loading.set(false);
  }
}
