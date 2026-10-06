// Talks to Supabase. With ?demo=1 in the address it uses a pretend backend kept on this device,
// so the app can be tried without touching the real data.
import { SUPABASE_URL, SUPABASE_KEY } from './config.js';

const params = new URLSearchParams(location.search);
export const DEMO = params.has('demo') || (() => { try { return sessionStorage.getItem('dd:demo') === '1'; } catch (e) { return false; } })();
if (DEMO) { try { sessionStorage.setItem('dd:demo', '1'); } catch (e) {} }

let sb = null;
async function client() {
  if (!sb) {
    const { createClient } = await import('https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm');
    sb = createClient(SUPABASE_URL, SUPABASE_KEY, { auth: { persistSession: false, autoRefreshToken: false } });
  }
  return sb;
}
async function rpc(fn, args) {
  const c = await client();
  const { data, error } = await c.rpc(fn, args);
  if (error) { const e = new Error(error.message || 'failed'); e.code = (error.message || '').trim(); throw e; }
  return data;
}

const real = {
  join: (name, word) => rpc('join', { p_name: name, p_word: word }),
  state: (token) => rpc('state', { p_token: token }),
  post: (token, day, kind, body, single) => rpc('post', { p_token: token, p_day: day, p_kind: kind, p_body: body, p_single: !!single }),
  del: (token, id) => rpc('delete_post', { p_token: token, p_id: id }),
  react: (token, id, emoji) => rpc('react', { p_token: token, p_post: id, p_emoji: emoji }),
  rename: (token, a, b) => rpc('rename_cause', { p_token: token, p_old: a, p_new: b }),
  draw: (token) => rpc('draw', { p_token: token }),
  async upload(blob) {
    const c = await client();
    const path = `${crypto.randomUUID()}.jpg`;
    const { error } = await c.storage.from('photos').upload(path, blob, { contentType: 'image/jpeg', cacheControl: '31536000' });
    if (error) throw new Error(error.message);
    return c.storage.from('photos').getPublicUrl(path).data.publicUrl;
  }
};

// ---- Pretend backend (demo mode) ----
const KEY = 'dd:demo-db';
function db() {
  try { const v = JSON.parse(localStorage.getItem(KEY)); if (v) return v; } catch (e) {}
  const t = (h) => new Date(Date.now() - h * 3600e3).toISOString();
  const m = (id, name, is_host) => ({ id, name, is_host: !!is_host, token: 't-' + id });
  const d = { seq: 100, draw: null, members: [m('h', 'Hannah'), m('p', 'Priya'), m('m', 'Macie', true), m('n', 'Noor'), m('e', 'Elle')], posts: [], reactions: [] };
  const add = (member, day, kind, body, h) => d.posts.push({ id: ++d.seq, member_id: member, day, kind, body, created_at: t(h) });
  add('h', 1, 'answer', { fields: { 'Warm drink': 'Chai', 'Holiday movie': 'The Holiday', 'Winter song': 'River', 'Cozy smell': 'Woodsmoke' } }, 90);
  add('p', 3, 'answer', { choice: 0 }, 80); add('n', 3, 'answer', { choice: 1 }, 79); add('e', 3, 'answer', { choice: 0 }, 78);
  add('h', 5, 'answer', { text: 'Driving around to see the lights with cocoa in a thermos.' }, 60);
  add('p', 5, 'answer', { text: 'My mum reads the same story aloud every Christmas Eve.' }, 58);
  add('n', 8, 'cause', { cause: 'City food bank' }, 40); add('p', 8, 'cause', { cause: 'The animal shelter' }, 39); add('h', 8, 'cause', { cause: 'The animal shelter' }, 38);
  add('m', null, 'chat', { text: 'Good morning, everyone. So glad you are all here.' }, 30);
  add('e', null, 'chat', { text: 'Good morning from a very snowy porch. Who else is up early?' }, 3);
  d.reactions.push({ post_id: d.seq, member_id: 'h', emoji: '☃️' }, { post_id: d.seq, member_id: 'p', emoji: '☃️' });
  return d;
}
function save(d) { try { localStorage.setItem(KEY, JSON.stringify(d)); } catch (e) {} }
function who(d, token) { const m = d.members.find(x => x.token === token); if (!m) { const e = new Error('not_signed_in'); e.code = 'not_signed_in'; throw e; } return m; }
function fail(code) { const e = new Error(code); e.code = code; throw e; }

const demo = {
  async join(name, word) {
    const d = db(); const w = word.trim().toLowerCase(); const n = name.trim();
    if (w !== 'snow' && w !== 'host') fail('wrong_word');
    if (!n) fail('bad_name');
    let m = d.members.find(x => x.name.toLowerCase() === n.toLowerCase());
    if (!m) { m = { id: 'u' + (++d.seq), name: n, is_host: w === 'host', token: 't-' + d.seq }; d.members.push(m); }
    else if (w === 'host') m.is_host = true;
    else if (m.is_host) fail('name_taken');
    save(d); return { token: m.token, id: m.id, name: m.name, is_host: m.is_host };
  },
  async state(token) {
    const d = db(); const me = who(d, token);
    return {
      members: d.members.map(({ id, name, is_host }) => ({ id, name, is_host })),
      posts: d.posts.map(p => {
        const mm = d.members.find(x => x.id === p.member_id) || { name: '?', is_host: false };
        const rs = d.reactions.filter(r => r.post_id === p.id); const reactions = {};
        rs.forEach(r => reactions[r.emoji] = (reactions[r.emoji] || 0) + 1);
        return { ...p, name: mm.name, is_host: mm.is_host, reactions, mine: rs.filter(r => r.member_id === me.id).map(r => r.emoji) };
      }),
      draw: d.draw
    };
  },
  async post(token, day, kind, body, single) {
    const d = db(); const me = who(d, token);
    if (kind === 'cause') { if (d.draw) fail('draw_done'); if (d.posts.filter(p => p.member_id === me.id && p.kind === 'cause').length >= 3) fail('entry_limit'); }
    if (single) d.posts = d.posts.filter(p => !(p.member_id === me.id && p.day === day && p.kind === kind));
    d.posts.push({ id: ++d.seq, member_id: me.id, day, kind, body, created_at: new Date().toISOString() });
    save(d); return d.seq;
  },
  async del(token, id) { const d = db(); const me = who(d, token); d.posts = d.posts.filter(p => !(p.id === id && (p.member_id === me.id || me.is_host))); save(d); },
  async react(token, id, emoji) {
    const d = db(); const me = who(d, token);
    const i = d.reactions.findIndex(r => r.post_id === id && r.member_id === me.id && r.emoji === emoji);
    if (i >= 0) d.reactions.splice(i, 1); else d.reactions.push({ post_id: id, member_id: me.id, emoji });
    save(d);
  },
  async rename(token, a, b) { const d = db(); const me = who(d, token); if (!me.is_host) fail('host_only'); d.posts.forEach(p => { if (p.kind === 'cause' && p.body.cause.trim().toLowerCase() === a.trim().toLowerCase()) p.body.cause = b.trim(); }); save(d); },
  async draw(token) {
    const d = db(); const me = who(d, token); if (!me.is_host) fail('host_only');
    const c = d.posts.filter(p => p.kind === 'cause'); if (!c.length) fail('no_entries');
    d.draw = { cause: c[Math.floor(Math.random() * c.length)].body.cause, entries: c.length, total: c.length * 5, at: new Date().toISOString() };
    save(d); return d.draw;
  },
  upload: (blob) => new Promise((res, rej) => { const r = new FileReader(); r.onload = () => res(r.result); r.onerror = rej; r.readAsDataURL(blob); })
};

export const api = DEMO ? demo : real;
