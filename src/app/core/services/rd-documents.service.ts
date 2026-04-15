import { Injectable, inject } from '@angular/core';
import { SupabaseService } from './supabase.service';
import type { RdDocument, RdDocumentPayload } from '../models/rd-document.model';

/**
 * Service for managing R&D document links.
 *
 * All operations use the Supabase JS client directly. The `rd_documents` table
 * has RLS policies that:
 * - Allow any authenticated user to read all rows.
 * - Allow only users with `role = 'admin'` (checked via the `profiles` table)
 *   to insert, update, or delete rows.
 *
 * File uploads use the `rd-documents` storage bucket, which has matching
 * storage policies restricting writes to admin users.
 */
@Injectable({ providedIn: 'root' })
export class RdDocumentsService {
  private readonly _sb = inject(SupabaseService);

  private readonly BUCKET = 'rd-documents';

  // ── Read ───────────────────────────────────────────────────────────────────

  /**
   * Fetches all R&D document rows ordered by creation date descending.
   *
   * @returns Array of {@link RdDocument} objects; empty array on error.
   */
  async listDocuments(): Promise<RdDocument[]> {
    const { data, error } = await this._sb.client
      .from('rd_documents')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('[RdDocumentsService] listDocuments failed:', error);
      return [];
    }
    return (data as RdDocument[]) ?? [];
  }

  // ── Admin writes ───────────────────────────────────────────────────────────

  /**
   * Creates a new R&D document entry.
   * Requires the signed-in user to have `role = 'admin'` (enforced by RLS).
   *
   * @param payload Document title, URL, and optional storage file path.
   * @returns The created {@link RdDocument} row.
   * @throws `Error` when the caller lacks admin privileges or the insert fails.
   */
  async adminCreateDocument(payload: RdDocumentPayload): Promise<RdDocument> {
    const { data, error } = await this._sb.client
      .from('rd_documents')
      .insert({
        title:      payload.title.trim(),
        url:        payload.url.trim(),
        file_path:  payload.file_path ?? null,
        section:    payload.section    ?? null,
        subsection: payload.subsection ?? null,
      })
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data as RdDocument;
  }

  /**
   * Updates an existing R&D document entry.
   * Requires the signed-in user to have `role = 'admin'` (enforced by RLS).
   *
   * @param docId UUID of the document to update.
   * @param payload Updated title, URL, and file path.
   * @returns The updated {@link RdDocument} row.
   * @throws `Error` when the caller lacks admin privileges or the update fails.
   */
  async adminUpdateDocument(docId: string, payload: RdDocumentPayload): Promise<RdDocument> {
    const { data, error } = await this._sb.client
      .from('rd_documents')
      .update({
        title:      payload.title.trim(),
        url:        payload.url.trim(),
        file_path:  payload.file_path ?? null,
        section:    payload.section    ?? null,
        subsection: payload.subsection ?? null,
      })
      .eq('id', docId)
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data as RdDocument;
  }

  /**
   * Deletes an R&D document entry. If the document has an associated storage
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
      .from('rd_documents')
      .delete()
      .eq('id', docId);

    if (error) throw new Error(error.message);
  }

  // ── File upload ────────────────────────────────────────────────────────────

  /**
   * Uploads a `File` to the `rd-documents` storage bucket using the signed-in
   * user's session (admin RLS policy enforced on the bucket).
   *
   * @param file The browser `File` object to upload.
   * @returns An object with `url` (public download URL) and `file_path` (storage path).
   * @throws `Error` on any storage failure.
   */
  async uploadFile(file: File): Promise<{ url: string; file_path: string }> {
    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
    const filePath = `${Date.now()}_${safeName}`;

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
