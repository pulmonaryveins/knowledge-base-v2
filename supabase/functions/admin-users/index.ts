/**
 * Supabase Edge Function: admin-users
 *
 * Handles all admin CRUD operations on users via Supabase's admin auth API.
 * The service role key is only available in the edge function environment —
 * it is never sent to the browser.
 *
 * Caller must be authenticated AND have role = 'admin' in the profiles table.
 *
 * Actions:
 *   list   — returns all users with their profiles
 *   create — creates a new auth user + profile row
 *   update — updates email, password (optional), role, full_name
 *   delete — deletes the auth user (profile deleted via CASCADE)
 */

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

// base64url → base64 → string (standard atob doesn't handle - and _ chars in JWTs)
function decodeJwtPayload(token: string): Record<string, unknown> {
  const base64url = token.split('.')[1];
  const base64 = base64url.replace(/-/g, '+').replace(/_/g, '/').padEnd(
    base64url.length + (4 - base64url.length % 4) % 4, '='
  );
  return JSON.parse(atob(base64));
}

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const authHeader = req.headers.get('Authorization') ?? '';
    const token = authHeader.replace(/^Bearer\s+/i, '').trim();
    if (!token) return json({ error: 'Missing token' }, 401);

    let userId: string;
    try {
      const payload = decodeJwtPayload(token);
      if (!payload?.sub || typeof payload.sub !== 'string') throw new Error('no sub');
      userId = payload.sub;
    } catch (e) {
      return json({ error: 'Invalid token: ' + String(e) }, 401);
    }

    const adminClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      { auth: { autoRefreshToken: false, persistSession: false } }
    );

    const { data: profile } = await adminClient
      .from('profiles').select('role').eq('id', userId).single();
    if (profile?.role !== 'admin') return json({ error: 'Forbidden' }, 403);

    const body = await req.json();
    const { action, userId: targetId, email, password, role, fullName } = body;

    switch (action) {
      case 'list': {
        const { data: { users }, error } = await adminClient.auth.admin.listUsers();
        if (error) return json({ error: error.message }, 500);
        const { data: profiles } = await adminClient.from('profiles').select('*');
        const profileMap = new Map((profiles ?? []).map((p: any) => [p.id, p]));
        return json(users.map(u => ({
          id: u.id,
          email: u.email ?? '',
          role: profileMap.get(u.id)?.role ?? 'member',
          full_name: profileMap.get(u.id)?.full_name ?? null,
          created_at: u.created_at,
          last_sign_in_at: u.last_sign_in_at ?? null,
        })));
      }
      case 'create': {
        if (!email || !password || !role) return json({ error: 'email, password and role are required' }, 400);
        const { data, error } = await adminClient.auth.admin.createUser({
          email, password, email_confirm: true,
          user_metadata: { role, full_name: fullName ?? '' },
        });
        if (error) return json({ error: error.message }, 400);
        await adminClient.from('profiles').upsert({ id: data.user.id, email, role, full_name: fullName ?? null });
        return json(data.user);
      }
      case 'update': {
        if (!targetId) return json({ error: 'userId is required' }, 400);
        const updatePayload: any = { email, user_metadata: { role, full_name: fullName ?? '' } };
        if (password) updatePayload.password = password;
        const { data, error } = await adminClient.auth.admin.updateUserById(targetId, updatePayload);
        if (error) return json({ error: error.message }, 400);
        await adminClient.from('profiles').update({ email, role, full_name: fullName ?? null }).eq('id', targetId);
        return json(data.user);
      }
      case 'delete': {
        if (!targetId) return json({ error: 'userId is required' }, 400);
        const { error } = await adminClient.auth.admin.deleteUser(targetId);
        if (error) return json({ error: error.message }, 400);
        return json({ success: true });
      }
      default:
        return json({ error: `Unknown action: ${action}` }, 400);
    }

  } catch (err) {
    return json({ error: String(err) }, 500);
  }
});

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}
