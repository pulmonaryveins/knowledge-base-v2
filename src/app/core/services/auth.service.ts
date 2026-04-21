import { Injectable, inject, signal, computed } from '@angular/core';
import { Router } from '@angular/router';
import type { User } from '@supabase/supabase-js';
import { SupabaseService } from './supabase.service';
import { environment } from '../../../environments/environment';
import type { Profile, AdminUserRecord } from '../models/profile.model';

/**
 * Central authentication and user-management service for the NCompassTV Dev Portal.
 *
 * Wraps the Supabase JS client to provide:
 * - Reactive auth state via Angular signals (`user`, `profile`, `isLoading`, `isAuthenticated`, `isAdmin`)
 * - Session restoration on startup via `getSession()`
 * - Sign-in / sign-out helpers
 * - Admin CRUD operations proxied through the `admin-users` Supabase Edge Function
 *   so the service-role key is never exposed to the browser
 */
@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly _sb     = inject(SupabaseService);
  private readonly _router = inject(Router);

  // ── Auth state signals ─────────────────────────────────────────────────────

  /** Raw Supabase `User` object; `null` when unauthenticated. */
  private readonly _user        = signal<User | null>(null);
  /** Portal profile row (`id`, `email`, `role`, `full_name`) from the `profiles` table. */
  private readonly _profile     = signal<Profile | null>(null);
  /** `true` until the initial session check and profile load have both completed. */
  private readonly _loading     = signal(true);
  /**
   * Most recent JWT access token cached in a signal.
   * Acts as a fallback for `_invokeAdmin` when `getSession()` hasn't
   * refreshed yet (early-load race condition).
   */
  private readonly _accessToken = signal<string | null>(null);

  /** Read-only view of the Supabase `User` object. */
  readonly user            = this._user.asReadonly();
  /** Read-only view of the portal `Profile` row. */
  readonly profile         = this._profile.asReadonly();
  /** `true` while the session or profile is being resolved on startup. */
  readonly isLoading       = this._loading.asReadonly();
  /** `true` when a valid Supabase session is active. */
  readonly isAuthenticated = computed(() => this._user() !== null);
  /** `true` when the signed-in user's profile has `role === 'admin'`. */
  readonly isAdmin         = computed(() => this._profile()?.role === 'admin');

  constructor() {
    // Restore any persisted session from local/session storage on startup
    this._sb.client.auth.getSession().then(({ data: { session } }) => {
      this._user.set(session?.user ?? null);
      this._accessToken.set(session?.access_token ?? null);
      if (session?.user) {
        this._loadProfile(session.user.id);
      } else {
        this._loading.set(false);
      }
    });

    // Keep all signals in sync with subsequent Supabase auth events
    // (sign-in, token refresh, sign-out, session expiry)
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

  // ── Public auth methods ────────────────────────────────────────────────────

  /**
   * Signs the user in with email and password via Supabase Auth.
   *
   * @param email    The user's email address.
   * @param password The user's plaintext password.
   * @returns The Supabase `AuthError` on failure, or `null` on success.
   */
  async signIn(email: string, password: string) {
    const { error } = await this._sb.client.auth.signInWithPassword({ email, password });
    return error;
  }

  /**
   * Signs the current user out, clears the Supabase session,
   * and redirects to `/login`.
   */
  async signOut(): Promise<void> {
    await this._sb.client.auth.signOut();
    this._router.navigate(['/login']);
  }

  // ── Admin: user management via Edge Function ───────────────────────────────

  /**
   * Fetches all portal users (Supabase auth + profile data) from the Edge Function.
   *
   * @returns Array of {@link AdminUserRecord} objects sorted by creation date.
   * @throws `Error` when the caller lacks admin privileges or the request fails.
   */
  async adminListUsers(): Promise<AdminUserRecord[]> {
    const { data, error } = await this._invokeAdmin<AdminUserRecord[]>({ action: 'list' });
    if (error) throw error;
    return data ?? [];
  }

  /**
   * Creates a new Supabase auth user and inserts a matching `profiles` row.
   * The email is automatically confirmed — no verification email is sent.
   *
   * @param payload User creation payload.
   * @param payload.email    New user's email address.
   * @param payload.password New user's initial password (minimum 8 characters).
   * @param payload.role     Portal role — `'admin'` | `'member'`.
   * @param payload.fullName Display name for the `profiles` row.
   * @throws `Error` when validation fails, the email is already in use, or the request fails.
   */
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

  /**
   * Updates an existing user's email, password (optional), role, and full name.
   * Omitting `password` keeps the user's current password unchanged.
   *
   * @param payload Update payload.
   * @param payload.userId   Supabase auth user ID of the record to update.
   * @param payload.email    New email address.
   * @param payload.password New password (omit to preserve the existing one).
   * @param payload.role     Updated portal role.
   * @param payload.fullName Updated display name.
   * @throws `Error` when the target user does not exist or the request fails.
   */
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

  /**
   * Permanently deletes a Supabase auth user.
   * The associated `profiles` row is removed automatically via a `CASCADE` delete rule.
   *
   * @param userId Supabase auth user ID of the account to delete.
   * @throws `Error` when the target user does not exist or the request fails.
   */
  async adminDeleteUser(userId: string): Promise<void> {
    const { error } = await this._invokeAdmin({ action: 'delete', userId });
    if (error) throw error;
  }

  // ── Private helpers ────────────────────────────────────────────────────────

  /**
   * Sends a POST request to the `admin-users` Supabase Edge Function using
   * raw `fetch` for reliable Authorization header delivery.
   *
   * Always resolves a fresh token via `getSession()` to avoid stale-token
   * issues during early-load race conditions; falls back to the cached
   * `_accessToken` signal if the session hasn't refreshed yet.
   *
   * Error handling covers both Supabase infrastructure errors (`message` key)
   * and application-level function errors (`error` key).
   *
   * @param body Request payload — must include an `action` string field.
   * @returns `{ data, error }` tuple. `error` is non-null on any failure.
   */
  private async _invokeAdmin<T = unknown>(body: Record<string, unknown>): Promise<{ data: T | null; error: Error | null }> {
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
      // Supabase infrastructure errors use "message"; function-level errors use "error"
      const msg = json?.['error'] ?? json?.['message'] ?? `Edge Function error ${resp.status}`;
      return { data: null, error: new Error(String(msg)) };
    }
    return { data: json as T, error: null };
  }

  /**
   * Loads the signed-in user's profile from the `profiles` table.
   *
   * Strategy:
   * 1. Calls the `get_my_profile` RPC (a `SECURITY DEFINER` function that
   *    bypasses RLS to guarantee a read regardless of policy).
   * 2. Falls back to a direct `.from('profiles').select()` query if the RPC
   *    is not yet deployed.
   * 3. Inserts a default `member` profile row if none exists (first-login case).
   *
   * Sets `_loading` to `false` once the profile is resolved.
   *
   * @param userId Supabase auth user ID to load the profile for.
   */
  private async _loadProfile(userId: string): Promise<void> {
    const { data: rows, error } = await this._sb.client.rpc('get_my_profile');
    const data = Array.isArray(rows) && rows.length > 0 ? rows[0] : null;

    if (error) {
      // RPC not deployed yet — fall back to direct table read
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
        // Row does not exist yet — create a default member profile
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
