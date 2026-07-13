-- =============================================================
-- BLIP & CO. — Supabase setup script
-- Run this ONCE in your Supabase project's SQL Editor
-- (left sidebar → SQL Editor → New query → paste this whole file → Run)
-- =============================================================

-- One table holds everything (videos, stickers, bundles, updates).
-- `collection` says which list it belongs to, `payload` is the full
-- item (title, price, image, etc.) exactly like the objects in data.js.
create table if not exists content (
  collection text not null,
  id text not null,
  payload jsonb not null,
  updated_at timestamptz not null default now(),
  primary key (collection, id)
);

-- Turn on Row Level Security — required before we can write policies.
alter table content enable row level security;

-- Anyone (including visitors who aren't logged in) can READ content.
-- This is what makes the videos/shop/updates pages work for everyone.
create policy "Public can read content"
  on content for select
  to anon, authenticated
  using (true);

-- Only a logged-in admin (someone who signed in through admin.html)
-- can add, edit, or delete content.
create policy "Only signed-in admins can insert"
  on content for insert
  to authenticated
  with check (true);

create policy "Only signed-in admins can update"
  on content for update
  to authenticated
  using (true)
  with check (true);

create policy "Only signed-in admins can delete"
  on content for delete
  to authenticated
  using (true);

-- Optional but recommended: turn on Realtime so edits appear on other
-- open tabs/devices instantly, not just after a page refresh.
-- Supabase dashboard → Database → Replication → toggle "content" on.
