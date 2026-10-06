-- The December Deck: database setup.
-- Paste this whole file into Supabase > SQL Editor and press Run. Safe to run more than once.
-- The invite word and host word are NOT in this file (the repo is public). Set them separately.

create extension if not exists pgcrypto;

create table if not exists public.app_config (
  key text primary key,
  value text not null
);

create table if not exists public.members (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  name_key text not null unique,
  token uuid not null unique default gen_random_uuid(),
  is_host boolean not null default false,
  last_seen timestamptz,
  created_at timestamptz not null default now()
);

alter table public.members add column if not exists avatar text;

create table if not exists public.posts (
  id bigserial primary key,
  member_id uuid not null references public.members(id) on delete cascade,
  day int,
  kind text not null,
  body jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);
create index if not exists posts_day_idx on public.posts(day);

create table if not exists public.reactions (
  post_id bigint not null references public.posts(id) on delete cascade,
  member_id uuid not null references public.members(id) on delete cascade,
  emoji text not null,
  primary key (post_id, member_id, emoji)
);

-- Nobody can read or write the tables directly. Everything goes through the functions below.
alter table public.app_config enable row level security;
alter table public.members enable row level security;
alter table public.posts enable row level security;
alter table public.reactions enable row level security;

create or replace function public._member(p_token uuid) returns public.members
language plpgsql security definer set search_path = public as $$
declare m public.members;
begin
  select * into m from public.members where token = p_token;
  if not found then raise exception 'not_signed_in'; end if;
  return m;
end $$;
revoke execute on function public._member(uuid) from public, anon, authenticated;

-- Sign in with a first name and the invite word (or the host word).
create or replace function public.join(p_name text, p_word text) returns json
language plpgsql security definer set search_path = public as $$
declare
  m public.members;
  w text := lower(btrim(coalesce(p_word, '')));
  n text := btrim(regexp_replace(coalesce(p_name, ''), '\s+', ' ', 'g'));
  host boolean := false;
begin
  if w = '' then raise exception 'wrong_word'; end if;
  if exists (select 1 from public.app_config where key = 'host_word' and lower(btrim(value)) = w) then
    host := true;
  elsif not exists (select 1 from public.app_config where key = 'invite_word' and lower(btrim(value)) = w) then
    raise exception 'wrong_word';
  end if;
  if length(n) < 1 or length(n) > 24 then raise exception 'bad_name'; end if;
  select * into m from public.members where name_key = lower(n);
  if not found then
    insert into public.members(name, name_key, is_host) values (n, lower(n), host) returning * into m;
  elsif host and not m.is_host then
    update public.members set is_host = true where id = m.id returning * into m;
  elsif m.is_host and not host then
    -- The host's name can only be used with the host word.
    raise exception 'name_taken';
  end if;
  return json_build_object('token', m.token, 'id', m.id, 'name', m.name, 'is_host', m.is_host);
end $$;

-- Everything the app shows: friends, posts with reactions, and the charity draw.
create or replace function public.state(p_token uuid) returns json
language plpgsql security definer set search_path = public as $$
declare m public.members;
begin
  m := public._member(p_token);
  update public.members set last_seen = now() where id = m.id;
  return json_build_object(
    'members', (select coalesce(json_agg(json_build_object('id', id, 'name', name, 'is_host', is_host, 'avatar', avatar) order by created_at), '[]'::json) from public.members),
    'posts', (select coalesce(json_agg(x order by x.created_at), '[]'::json) from (
      select p.id, p.member_id, mm.name, mm.is_host, p.day, p.kind, p.body, p.created_at,
        (select coalesce(json_object_agg(e.emoji, e.n), '{}'::json)
           from (select emoji, count(*) as n from public.reactions r where r.post_id = p.id group by emoji) e) as reactions,
        (select coalesce(json_agg(r.emoji), '[]'::json) from public.reactions r where r.post_id = p.id and r.member_id = m.id) as mine
      from public.posts p join public.members mm on mm.id = p.member_id) x),
    'draw', (select value::json from public.app_config where key = 'draw')
  );
end $$;

create or replace function public.post(p_token uuid, p_day int, p_kind text, p_body jsonb, p_single boolean default false) returns bigint
language plpgsql security definer set search_path = public as $$
declare m public.members; new_id bigint;
begin
  m := public._member(p_token);
  if p_kind not in ('chat', 'answer', 'photo', 'cause', 'guess') then raise exception 'bad_kind'; end if;
  if p_day is not null and (p_day < 1 or p_day > 24) then raise exception 'bad_day'; end if;
  if length(p_body::text) > 6000 then raise exception 'too_long'; end if;
  if p_kind = 'cause' then
    if exists (select 1 from public.app_config where key = 'draw') then raise exception 'draw_done'; end if;
    if (select count(*) from public.posts where member_id = m.id and kind = 'cause') >= 3 then raise exception 'entry_limit'; end if;
  end if;
  if p_single then
    delete from public.posts where member_id = m.id and day is not distinct from p_day and kind = p_kind;
  end if;
  insert into public.posts(member_id, day, kind, body) values (m.id, p_day, p_kind, p_body) returning id into new_id;
  return new_id;
end $$;

-- Friends delete their own posts. The host can delete anything.
create or replace function public.delete_post(p_token uuid, p_id bigint) returns void
language plpgsql security definer set search_path = public as $$
declare m public.members;
begin
  m := public._member(p_token);
  delete from public.posts where id = p_id and (member_id = m.id or m.is_host);
end $$;

create or replace function public.react(p_token uuid, p_post bigint, p_emoji text) returns void
language plpgsql security definer set search_path = public as $$
declare m public.members;
begin
  m := public._member(p_token);
  if p_emoji not in ('❤️', '😂', '🥹', '😮', '🎄', '☃️') then raise exception 'bad_emoji'; end if;
  if exists (select 1 from public.reactions where post_id = p_post and member_id = m.id and emoji = p_emoji) then
    delete from public.reactions where post_id = p_post and member_id = m.id and emoji = p_emoji;
  else
    insert into public.reactions(post_id, member_id, emoji) values (p_post, m.id, p_emoji);
  end if;
end $$;

-- Host only: rename a cause everywhere, so duplicates combine.
create or replace function public.rename_cause(p_token uuid, p_old text, p_new text) returns void
language plpgsql security definer set search_path = public as $$
declare m public.members;
begin
  m := public._member(p_token);
  if not m.is_host then raise exception 'host_only'; end if;
  if length(btrim(p_new)) < 1 then raise exception 'bad_name'; end if;
  update public.posts set body = jsonb_set(body, '{cause}', to_jsonb(btrim(p_new)))
   where kind = 'cause' and lower(btrim(body->>'cause')) = lower(btrim(p_old));
end $$;

-- Host only: draw one entry at random. Every entry has an equal chance.
create or replace function public.draw(p_token uuid) returns json
language plpgsql security definer set search_path = public as $$
declare m public.members; winner text; n int; result json;
begin
  m := public._member(p_token);
  if not m.is_host then raise exception 'host_only'; end if;
  if exists (select 1 from public.app_config where key = 'draw') then raise exception 'draw_done'; end if;
  select count(*) into n from public.posts where kind = 'cause';
  if n = 0 then raise exception 'no_entries'; end if;
  select body->>'cause' into winner from public.posts where kind = 'cause' order by random() limit 1;
  result := json_build_object('cause', winner, 'entries', n, 'total', n * 5, 'at', now());
  insert into public.app_config(key, value) values ('draw', result::text);
  return result;
end $$;

-- A friend sets her own profile photo.
create or replace function public.set_avatar(p_token uuid, p_url text) returns void
language plpgsql security definer set search_path = public as $$
declare m public.members;
begin
  m := public._member(p_token);
  if length(coalesce(p_url, '')) > 500 then raise exception 'too_long'; end if;
  update public.members set avatar = nullif(btrim(coalesce(p_url, '')), '') where id = m.id;
end $$;

-- A friend renames herself. The host can rename anyone, and renaming someone
-- to a name that already exists combines the two into one person.
create or replace function public.rename_member(p_token uuid, p_id uuid, p_name text) returns json
language plpgsql security definer set search_path = public as $$
declare
  m public.members; t public.members; o public.members;
  n text := btrim(regexp_replace(coalesce(p_name, ''), '\s+', ' ', 'g'));
begin
  m := public._member(p_token);
  if length(n) < 1 or length(n) > 24 then raise exception 'bad_name'; end if;
  select * into t from public.members where id = p_id;
  if not found then raise exception 'bad_name'; end if;
  if t.id <> m.id and not m.is_host then raise exception 'host_only'; end if;
  select * into o from public.members where name_key = lower(n) and id <> t.id;
  if found then
    if not m.is_host or t.is_host or t.id = m.id then raise exception 'name_taken'; end if;
    update public.posts set member_id = o.id where member_id = t.id;
    insert into public.reactions(post_id, member_id, emoji)
      select post_id, o.id, emoji from public.reactions where member_id = t.id on conflict do nothing;
    delete from public.members where id = t.id;
    return json_build_object('name', o.name, 'merged', true);
  end if;
  update public.members set name = n, name_key = lower(n) where id = t.id;
  return json_build_object('name', n, 'merged', false);
end $$;

grant execute on function public.set_avatar(uuid, text) to anon;
grant execute on function public.rename_member(uuid, uuid, text) to anon;
grant execute on function public.join(text, text) to anon;
grant execute on function public.state(uuid) to anon;
grant execute on function public.post(uuid, int, text, jsonb, boolean) to anon;
grant execute on function public.delete_post(uuid, bigint) to anon;
grant execute on function public.react(uuid, bigint, text) to anon;
grant execute on function public.rename_cause(uuid, text, text) to anon;
grant execute on function public.draw(uuid) to anon;

-- Photo storage: a public bucket with unguessable file names, JPEG only, 5 MB limit.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('photos', 'photos', true, 5242880, array['image/jpeg'])
on conflict (id) do update set public = true, file_size_limit = 5242880, allowed_mime_types = array['image/jpeg'];

drop policy if exists "december deck photo upload" on storage.objects;
create policy "december deck photo upload" on storage.objects
  for insert to anon with check (bucket_id = 'photos');
