/**
 * Supabase Edge Function: admin-documents
 *
 * Handles admin CRUD for R&D document entries and file uploads to the
 * `rd-documents` storage bucket. The service-role key is only available in
 * this edge environment — it is never sent to the browser.
 *
 * Caller must be authenticated AND have role = 'admin' in the profiles table.
 *
 * Actions:
 *   list          — returns all rd_documents rows ordered by created_at desc
 *   create        — inserts a new document row (title + url + optional file_path)
 *   update        — updates title, url, and/or file_path for an existing row
 *   delete        — deletes a document row (and removes the storage object if file_path is set)
 *   upload-url    — returns a signed upload URL for the rd-documents bucket
 *   public-url    — returns the public URL for a given storage path
 */

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const BUCKET = 'rd-documents';

/** Decode a JWT without verifying the signature (used only to extract `sub`). */
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
    // ── Auth ────────────────────────────────────────────────────────────────
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

    // Verify admin role
    const { data: profile } = await adminClient
      .from('profiles').select('role').eq('id', userId).single();
    if (profile?.role !== 'admin') return json({ error: 'Forbidden' }, 403);

    const body = await req.json();
    const { action } = body;

    switch (action) {

      // ── List ───────────────────────────────────────────────────────────────
      case 'list': {
        const { data, error } = await adminClient
          .from('rd_documents')
          .select('*')
          .order('created_at', { ascending: false });
        if (error) return json({ error: error.message }, 500);
        return json(data);
      }

      // ── Create ─────────────────────────────────────────────────────────────
      case 'create': {
        const { title, url, file_path } = body;
        if (!title || !url) return json({ error: 'title and url are required' }, 400);
        const { data, error } = await adminClient
          .from('rd_documents')
          .insert({ title: title.trim(), url: url.trim(), file_path: file_path ?? null })
          .select()
          .single();
        if (error) return json({ error: error.message }, 400);
        return json(data);
      }

      // ── Update ─────────────────────────────────────────────────────────────
      case 'update': {
        const { docId, title, url, file_path } = body;
        if (!docId) return json({ error: 'docId is required' }, 400);
        if (!title || !url) return json({ error: 'title and url are required' }, 400);
        const { data, error } = await adminClient
          .from('rd_documents')
          .update({ title: title.trim(), url: url.trim(), file_path: file_path ?? null })
          .eq('id', docId)
          .select()
          .single();
        if (error) return json({ error: error.message }, 400);
        return json(data);
      }

      // ── Delete ─────────────────────────────────────────────────────────────
      case 'delete': {
        const { docId } = body;
        if (!docId) return json({ error: 'docId is required' }, 400);

        // Fetch the row first so we can clean up storage
        const { data: doc } = await adminClient
          .from('rd_documents').select('file_path').eq('id', docId).single();

        if (doc?.file_path) {
          await adminClient.storage.from(BUCKET).remove([doc.file_path]);
        }

        const { error } = await adminClient.from('rd_documents').delete().eq('id', docId);
        if (error) return json({ error: error.message }, 400);
        return json({ success: true });
      }

      // ── Upload URL (signed) ────────────────────────────────────────────────
      case 'upload-url': {
        const { filePath, contentType } = body;
        if (!filePath) return json({ error: 'filePath is required' }, 400);
        const { data, error } = await adminClient.storage
          .from(BUCKET)
          .createSignedUploadUrl(filePath);
        if (error) return json({ error: error.message }, 500);
        return json({ signedUrl: data.signedUrl, path: data.path });
      }

      // ── Public URL ─────────────────────────────────────────────────────────
      case 'public-url': {
        const { filePath } = body;
        if (!filePath) return json({ error: 'filePath is required' }, 400);
        const { data } = adminClient.storage.from(BUCKET).getPublicUrl(filePath);
        return json({ publicUrl: data.publicUrl });
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
