-- ── R&D Document Link Manager ────────────────────────────────────────────────
-- Creates the `rd_documents` table and configures Row Level Security so that:
--   • Any authenticated user can read all document rows.
--   • Only users with role = 'admin' in the profiles table can write.
--
-- Also creates the `rd-documents` storage bucket with matching policies.
-- All operations use the Supabase JS client directly — no Edge Function needed.
--
-- If the table already exists, run the patch block at the bottom of this file
-- to add the section/subsection columns.

-- ── Admin helper (SECURITY DEFINER) ──────────────────────────────────────────
-- Reads from `profiles` with RLS bypassed, avoiding infinite recursion when
-- this function is called from another table's RLS policy.

create or replace function is_portal_admin()
returns boolean
language sql
security definer
stable
set search_path = public
as $$
  select exists (
    select 1 from profiles where id = auth.uid() and role = 'admin'
  );
$$;

-- ── Table ─────────────────────────────────────────────────────────────────────

create table if not exists rd_documents (
  id         uuid        primary key default gen_random_uuid(),
  title      text        not null,
  url        text        not null,
  file_path  text,
  section    text,                          -- optional grouping label
  subsection text,                          -- optional sub-grouping label
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Patch: add columns if table was already created without them
alter table rd_documents add column if not exists section    text;
alter table rd_documents add column if not exists subsection text;

comment on table  rd_documents              is 'R&D team document links — files uploaded to storage or external URLs.';
comment on column rd_documents.title        is 'Human-readable display title for the hyperlink.';
comment on column rd_documents.url          is 'Final accessible URL (storage public URL or external link).';
comment on column rd_documents.file_path    is 'Storage object path inside the rd-documents bucket; null for external links.';
comment on column rd_documents.section      is 'Optional section label for grouping on the R&D page.';
comment on column rd_documents.subsection   is 'Optional subsection label within a section.';

-- ── Auto-update updated_at ────────────────────────────────────────────────────

create or replace function update_rd_documents_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_rd_documents_updated_at on rd_documents;
create trigger trg_rd_documents_updated_at
  before update on rd_documents
  for each row execute function update_rd_documents_updated_at();

-- ── Row Level Security (table) ────────────────────────────────────────────────

alter table rd_documents enable row level security;

drop policy if exists "rd_documents: authenticated read" on rd_documents;
create policy "rd_documents: authenticated read"
  on rd_documents for select
  to authenticated
  using (true);

drop policy if exists "rd_documents: admin insert" on rd_documents;
create policy "rd_documents: admin insert"
  on rd_documents for insert
  to authenticated
  with check (is_portal_admin());

drop policy if exists "rd_documents: admin update" on rd_documents;
create policy "rd_documents: admin update"
  on rd_documents for update
  to authenticated
  using (is_portal_admin())
  with check (is_portal_admin());

drop policy if exists "rd_documents: admin delete" on rd_documents;
create policy "rd_documents: admin delete"
  on rd_documents for delete
  to authenticated
  using (is_portal_admin());

-- ── Storage bucket ────────────────────────────────────────────────────────────

insert into storage.buckets (id, name, public)
values ('rd-documents', 'rd-documents', true)
on conflict (id) do nothing;

drop policy if exists "rd-documents: public read" on storage.objects;
create policy "rd-documents: public read"
  on storage.objects for select
  to public
  using (bucket_id = 'rd-documents');

drop policy if exists "rd-documents: admin upload" on storage.objects;
create policy "rd-documents: admin upload"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'rd-documents' and is_portal_admin());

drop policy if exists "rd-documents: admin delete" on storage.objects;
create policy "rd-documents: admin delete"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'rd-documents' and is_portal_admin());
