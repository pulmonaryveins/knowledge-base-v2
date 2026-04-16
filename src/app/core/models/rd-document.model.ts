/**
 * Represents a single document entry managed by the R&D Document Link Manager.
 *
 * A document can be either:
 * - A file uploaded to the `rd-documents` Supabase storage bucket (`file_path` is set).
 * - An external URL pasted by an admin (`file_path` is null, `url` points externally).
 *
 * Documents are grouped into sections for organisation on the R&D team page.
 */
export interface RdDocument {
  /** UUID primary key. */
  id: string;
  /** Human-readable display title shown as the hyperlink text on the R&D page. */
  title: string;
  /**
   * Publicly accessible URL for this document.
   * For uploads this is the Supabase storage public URL; for external links it is
   * the value entered by the admin.
   */
  url: string;
  /**
   * Storage object path inside the `rd-documents` bucket (e.g. `reports/q1-2025.pdf`).
   * `null` for externally-linked documents that were not uploaded via storage.
   */
  file_path: string | null;
  /**
   * Optional section label used to group documents on the R&D page.
   * `null` documents are listed under an implicit "General" group.
   */
  section: string | null;
  /** Display order within a section. Lower values appear first. */
  position: number;
  /** ISO 8601 timestamp of when the record was inserted. */
  created_at: string;
  /** ISO 8601 timestamp of the most recent update. */
  updated_at: string;
}

/**
 * Payload used when creating or updating an R&D document entry.
 */
export interface RdDocumentPayload {
  /** Display title for the document link. */
  title: string;
  /** Final accessible URL (storage public URL or external link). */
  url: string;
  /** Storage path; `null` for external URL entries. */
  file_path: string | null;
  /** Optional section label; `null` to leave ungrouped. */
  section?: string | null;
}
