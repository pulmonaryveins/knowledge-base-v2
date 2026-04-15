-- ── R&D Sections & Subsections ───────────────────────────────────────────────
-- Allows admins to create/delete sections and subsections independently
-- of documents. The rd_documents table continues to reference sections by
-- name (text) for compatibility.
--
-- RLS mirrors rd_documents:
--   • Any authenticated user can read all rows.
--   • Only admin users (via is_portal_admin()) can write.

-- ── Sections ──────────────────────────────────────────────────────────────────

create table if not exists rd_sections (
  id         uuid        primary key default gen_random_uuid(),
  name       text        not null,
  created_at timestamptz not null default now(),
  constraint rd_sections_name_unique unique (name)
);

-- ── Subsections ───────────────────────────────────────────────────────────────

create table if not exists rd_subsections (
  id         uuid        primary key default gen_random_uuid(),
  section_id uuid        not null references rd_sections(id) on delete cascade,
  name       text        not null,
  created_at timestamptz not null default now(),
  constraint rd_subsections_unique unique (section_id, name)
);

-- ── Row Level Security ────────────────────────────────────────────────────────

alter table rd_sections    enable row level security;
alter table rd_subsections enable row level security;

drop policy if exists "rd_sections: authenticated read"    on rd_sections;
create policy "rd_sections: authenticated read"
  on rd_sections for select
  to authenticated using (true);

drop policy if exists "rd_sections: admin insert"    on rd_sections;
create policy "rd_sections: admin insert"
  on rd_sections for insert
  to authenticated with check (is_portal_admin());

drop policy if exists "rd_sections: admin delete"    on rd_sections;
create policy "rd_sections: admin delete"
  on rd_sections for delete
  to authenticated using (is_portal_admin());

drop policy if exists "rd_subsections: authenticated read"    on rd_subsections;
create policy "rd_subsections: authenticated read"
  on rd_subsections for select
  to authenticated using (true);

drop policy if exists "rd_subsections: admin insert"    on rd_subsections;
create policy "rd_subsections: admin insert"
  on rd_subsections for insert
  to authenticated with check (is_portal_admin());

drop policy if exists "rd_subsections: admin delete"    on rd_subsections;
create policy "rd_subsections: admin delete"
  on rd_subsections for delete
  to authenticated using (is_portal_admin());
