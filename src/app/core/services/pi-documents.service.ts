import { Injectable, inject, signal } from '@angular/core';
import { SupabaseService } from './supabase.service';
import type { PiDocument, PiDocumentPayload } from '../models/pi-document.model';

/**
 * Service for managing Pi Player document links.
 *
 * All operations use the Supabase JS client directly. The `pi_documents` table
 * has RLS policies that:
 * - Allow any authenticated user to read all rows.
 * - Allow only users with `role = 'admin'` (checked via the `profiles` table)
 *   to insert, update, or delete rows.
 *
 * File uploads use the `rd-documents` storage bucket under a `pi/` prefix,
 * which has matching storage policies restricting writes to admin users.
 */
@Injectable({ providedIn: 'root' })
export class PiDocumentsService {
  private readonly _sb = inject(SupabaseService);

  /** Cached document list — updated on every successful fetch. */
  readonly cachedDocs = signal<PiDocument[]>([]);

  constructor() {
    // Eagerly warm the cache so search results include Pi documents on first query.
    this.listDocuments();
  }

  private readonly BUCKET = 'rd-documents';

  // ── Read ───────────────────────────────────────────────────────────────────

  /**
   * Fetches all Pi Player document rows ordered by position then creation date.
   *
   * @returns Array of {@link PiDocument} objects; empty array on error.
   */
  async listDocuments(): Promise<PiDocument[]> {
    const { data, error } = await this._sb.client
      .from('pi_documents')
      .select('*')
      .order('position', { ascending: true })
      .order('created_at', { ascending: false });

    if (error) {
      console.error('[PiDocumentsService] listDocuments failed:', error);
      return [];
    }
    const docs = (data as PiDocument[]) ?? [];
    this.cachedDocs.set(docs);
    return docs;
  }

  /** Batch-updates the `position` for a set of documents after a drag reorder. */
  async reorderDocuments(items: { id: string; position: number }[]): Promise<void> {
    const results = await Promise.all(
      items.map(({ id, position }) =>
        this._sb.client.from('pi_documents').update({ position }).eq('id', id)
      )
    );
    const failed = results.find(r => r.error);
    if (failed?.error) throw new Error(failed.error.message);
  }

  // ── Admin writes ───────────────────────────────────────────────────────────

  /**
   * Creates a new Pi Player document entry.
   * Requires the signed-in user to have `role = 'admin'` (enforced by RLS).
   *
   * @param payload Document title, URL, and optional storage file path.
   * @returns The created {@link PiDocument} row.
   * @throws `Error` when the caller lacks admin privileges or the insert fails.
   */
  async adminCreateDocument(payload: PiDocumentPayload): Promise<PiDocument> {
    const { data, error } = await this._sb.client
      .from('pi_documents')
      .insert({
        title:     payload.title.trim(),
        url:       payload.url.trim(),
        file_path: payload.file_path ?? null,
        section:   payload.section   ?? null,
      })
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data as PiDocument;
  }

  /**
   * Updates an existing Pi Player document entry.
   * Requires the signed-in user to have `role = 'admin'` (enforced by RLS).
   *
   * @param docId UUID of the document to update.
   * @param payload Updated title, URL, and file path.
   * @returns The updated {@link PiDocument} row.
   * @throws `Error` when the caller lacks admin privileges or the update fails.
   */
  async adminUpdateDocument(docId: string, payload: PiDocumentPayload): Promise<PiDocument> {
    const { data, error } = await this._sb.client
      .from('pi_documents')
      .update({
        title:     payload.title.trim(),
        url:       payload.url.trim(),
        file_path: payload.file_path ?? null,
        section:   payload.section   ?? null,
      })
      .eq('id', docId)
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data as PiDocument;
  }

  /**
   * Deletes a Pi Player document entry. If the document has an associated storage
   * object (`file_path` is set), that object is removed from the bucket first.
   * Requires the signed-in user to have `role = 'admin'` (enforced by RLS).
   *
   * @param docId UUID of the document to delete.
   * @param filePath Optional storage path to remove from the bucket.
   * @throws `Error` when the caller lacks admin privileges or the delete fails.
   */
  async adminDeleteDocument(docId: string, filePath?: string | null): Promise<void> {
    if (filePath) {
      await this._sb.client.storage.from(this.BUCKET).remove([filePath]);
    }

    const { error } = await this._sb.client
      .from('pi_documents')
      .delete()
      .eq('id', docId);

    if (error) throw new Error(error.message);
  }

  // ── File upload ────────────────────────────────────────────────────────────

  /**
   * Uploads a `File` to the `rd-documents` storage bucket under a `pi/` prefix,
   * using the signed-in user's session (admin RLS policy enforced on the bucket).
   *
   * @param file The browser `File` object to upload.
   * @returns An object with `url` (public download URL) and `file_path` (storage path).
   * @throws `Error` on any storage failure.
   */
  async uploadFile(file: File): Promise<{ url: string; file_path: string }> {
    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
    const filePath = `pi/${Date.now()}_${safeName}`;

    const { error } = await this._sb.client.storage
      .from(this.BUCKET)
      .upload(filePath, file, { contentType: file.type || 'application/octet-stream' });

    if (error) throw new Error(error.message);

    const { data: urlData } = this._sb.client.storage
      .from(this.BUCKET)
      .getPublicUrl(filePath);

    return { url: urlData.publicUrl, file_path: filePath };
  }
}
