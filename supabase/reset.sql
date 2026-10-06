-- The December Deck: clear all test data.
-- This removes every friend, post, photo post, reaction, guess and the charity draw.
-- It keeps your invite word and host word. It cannot be undone.
truncate table public.reactions, public.posts, public.members restart identity cascade;
delete from public.app_config where key = 'draw';
