// The December Deck: screens and behavior. Content lives in days.js, data calls in api.js.
const V = new URL(import.meta.url).search;
const { api, DEMO } = await import('./api.js' + V);
const { DAYS, NUMERALS, ART } = await import('./days.js' + V);
const { YEAR, HOST_NAME } = await import('./config.js');

const $app = document.getElementById('app');
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const store = {
  get(k, d) { try { const v = localStorage.getItem('dd:' + k); return v == null ? d : JSON.parse(v); } catch (e) { return d; } },
  set(k, v) { try { localStorage.setItem('dd:' + k, JSON.stringify(v)); } catch (e) {} },
  del(k) { try { localStorage.removeItem('dd:' + k); } catch (e) {} }
};
const EMOJI = ['❤️', '😂', '🥹', '😮', '🎄', '☃️'];
const EMOJI_NAME = ['Love', 'Ha ha', 'Aww', 'Wow', 'Festive', 'Cozy'];
const WORDS = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen', 'twenty', 'twenty-one', 'twenty-two', 'twenty-three', 'twenty-four', 'twenty-five'];
const cap = s => s.charAt(0).toUpperCase() + s.slice(1);
const plural = (n, w) => `${n} ${w}${n === 1 || /s$/.test(w) ? '' : 's'}`;

let me = store.get('me', null);
let S = { members: [], posts: [], draw: null, loaded: false };
let ui = {};
let lastRoute = '';

// ---------- Dates ----------
(() => {
  const p = new URLSearchParams(location.search).get('date');
  if (p === 'off') store.del('pretend');
  else if (p && /^\d{4}-\d{2}-\d{2}$/.test(p)) store.set('pretend', p);
})();
function now() {
  const p = store.get('pretend', null), n = new Date();
  if (p) { const [y, m, d] = p.split('-').map(Number); return new Date(y, m - 1, d, n.getHours(), n.getMinutes(), n.getSeconds()); }
  return n;
}
// 0 = before December 1, 1..24 = that day, 25 = after Christmas Eve
function dayNum() {
  const n = now();
  if (n < new Date(YEAR, 11, 1)) return 0;
  if (n >= new Date(YEAR, 11, 25)) return 25;
  return n.getDate();
}
const unlocked = () => Math.min(dayNum(), 24);
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const opened = () => store.get('opened', []);
function markOpened(n) { const o = opened(); if (!o.includes(n)) { o.push(n); store.set('opened', o); } }
const waiting = () => { const o = opened(), w = []; for (let i = 1; i <= unlocked(); i++) if (!o.includes(i)) w.push(i); return w; };

// ---------- Icons ----------
const I = {
  back: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 3L5 8l5 5"/></svg>',
  up: '<svg width="16" height="16" viewBox="0 0 18 18" fill="none" stroke="#101B45" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 15V3M4 8l5-5 5 5"/></svg>',
  go: '<svg width="10" height="10" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 3l5 5-5 5"/></svg>',
  x: '<svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" aria-hidden="true"><path d="M2 2l8 8M10 2l-8 8"/></svg>',
  cam: '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><rect x="2" y="4" width="16" height="12" rx="3"/><circle cx="10" cy="10" r="3"/></svg>',
  lock: '<svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><rect x="3" y="7" width="10" height="7" rx="2"/><path d="M5.5 7V5a2.5 2.5 0 015 0v2"/></svg>',
  check: '<svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="#F5F8FF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2 6.5l2.5 2.5L10 3.5"/></svg>',
  star: (s, c) => `<svg width="${s}" height="${s}" viewBox="0 0 34 34" aria-hidden="true"><path d="M17 0 C17.8 11 20 15 34 17 C20 19 17.8 23 17 34 C16.2 23 14 19 0 17 C14 15 16.2 11 17 0 Z" fill="${c}"/></svg>`,
  spark: (s, c, cls = '', st = '') => `<svg class="${cls}" style="${st}" width="${s}" height="${s}" viewBox="0 0 12 12" aria-hidden="true"><path d="M6 0 L7 5 L12 6 L7 7 L6 12 L5 7 L0 6 L5 5 Z" fill="${c}"/></svg>`,
  snow: s => `<svg width="${s}" height="${s}" viewBox="0 0 26 26" aria-hidden="true"><g fill="none" stroke="#F5F8FF" stroke-width="1.3" stroke-linecap="round"><path d="M13 2v22M13 6.5l-3-3M13 6.5l3-3M13 19.5l-3 3M13 19.5l3 3"/><g transform="rotate(60 13 13)"><path d="M13 2v22M13 6.5l-3-3M13 6.5l3-3M13 19.5l-3 3M13 19.5l3 3"/></g><g transform="rotate(120 13 13)"><path d="M13 2v22M13 6.5l-3-3M13 6.5l3-3M13 19.5l-3 3M13 19.5l3 3"/></g></g></svg>`,
  emblem: (s, c) => `<svg width="${s}" height="${s}" viewBox="0 0 100 100" fill="none" aria-hidden="true"><circle cx="50" cy="50" r="46" stroke="${c}" stroke-width="1" stroke-dasharray="1.5 5" stroke-linecap="round"/><path d="M50 12 C52 40 60 48 88 50 C60 52 52 60 50 88 C48 60 40 52 12 50 C40 48 48 40 50 12 Z" stroke="${c}" stroke-width="1.3" stroke-linejoin="round"/><circle cx="50" cy="4" r="2.2" fill="${c}"/></svg>`,
  note: '<svg width="16" height="16" viewBox="0 0 18 18" fill="none" stroke="#DDF23C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 13.5V4l7-1.5v9"/><circle cx="5" cy="13.5" r="2"/><circle cx="12" cy="11.5" r="2"/></svg>'
};
const SUIT = {
  cups: '<path d="M14 8h20v9a10 10 0 0 1-20 0z"/><path d="M24 27v11M16 40h16"/>',
  wands: '<path d="M12 40L36 8"/><path d="M27 20c5-1 8-4 9-9M21 28c-5 1-8 4-9 9M33 12l5 1M34 11l-1-5"/>',
  swords: '<path d="M24 5v29M24 5l-3 5M24 5l3 5M15 30h18M24 34v6"/><circle cx="24" cy="42" r="2"/>',
  pentacles: '<circle cx="24" cy="24" r="17"/><path d="M24 10l8.2 25.300L10.700 19.700h26.600L15.800 35.300z"/>'
};
const suitIcon = (k, s, c) => `<svg width="${s}" height="${s}" viewBox="0 0 48 48" fill="none" stroke="${c}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${SUIT[k]}</svg>`;
const GRAIN = '<svg class="gr" aria-hidden="true"><rect width="100%" height="100%" filter="url(#grain)"/></svg>';

// Face of a card: the art if it exists, otherwise the gradient card.
function face(n, cls = '', snow = 16, extra = '') {
  return `<span class="card ${cls}">${ART[n] ? `<img src="${ART[n]}" alt="">` : GRAIN}<span class="frame"><span class="num">${NUMERALS[n - 1]}</span>${extra}${snow ? I.snow(snow) : ''}</span></span>`;
}
function wrapped(n, cls = '', em = 74) {
  return `<span class="card ${cls}">${GRAIN}<span class="frame mid">${I.emblem(em, '#F5F8FF')}<span class="num">${NUMERALS[n - 1]}</span></span></span>`;
}
// A luminaria: a paper bag with a light inside. Lit ones glow.
const bag = (on, id) => `<svg width="26" height="32" viewBox="0 0 26 32" aria-hidden="true">${on ? `<defs><linearGradient id="lg${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#F5F8FF" stop-opacity=".5"/><stop offset=".55" stop-color="#EAF7A0"/><stop offset="1" stop-color="#DDF23C"/></linearGradient></defs>` : ''}<path d="M3 6 L6 3 L9 6 L12 3 L15 6 L18 3 L21 6 L23 4 L23 31 L3 31 Z" fill="${on ? `url(#lg${id})` : 'none'}" stroke="${on ? '#F5F8FF' : '#5F74A8'}" stroke-width="1" stroke-linejoin="round"/>${on ? '<ellipse cx="13" cy="24" rx="5" ry="4.500" fill="#F5F8FF" opacity=".9"/>' : ''}</svg>`;
// A night wall of luminarias. Every friend has one; it glows once she lights it.
function windowHtml(posts) {
  const lit = new Map(posts.map(p => [p.member_id, p]));
  const all = [...S.members].sort((x, y) => (lit.has(y.id) ? 1 : 0) - (lit.has(x.id) ? 1 : 0));
  const glow = Math.min(1, posts.length / Math.max(1, all.length));
  return `<div class="arch" style="--glow:${(0.12 + glow * 0.7).toFixed(2)}">
    <span class="haze"></span>${I.spark(10, '#F5F8FF', 'tw', 'position:absolute;left:22%;top:54px')}${I.spark(7, '#B9CCF5', 'tw2', 'position:absolute;right:20%;top:84px')}${I.spark(6, '#B9CCF5', 'tw', 'position:absolute;right:30%;top:40px')}
    <div class="count"><b>${posts.length}</b><span>of ${all.length} lit</span></div>
    <div class="lums">${all.map((m, k) => { const on = lit.has(m.id), mine = me && m.id === me.id;
      return `<span class="lum ${on ? 'on' : ''} ${mine ? 'me' : ''}" title="${esc(m.name)}"><span class="bg">${bag(on, k)}</span><b>${mine ? 'You' : esc(m.name.charAt(0).toUpperCase())}</b></span>`; }).join('')}</div>
  </div>`;
}
// Book covers come from Open Library's free search.
const coverOk = u => typeof u === 'string' && (u.startsWith('https://covers.openlibrary.org/') || /^https:\/\/is\d-ssl\.mzstatic\.com\//.test(u));
const isSongDay = () => { const r = route(); return r.a === 'card' && DAYS[+r.b - 1]?.type === 'playlist'; };
function cover(b, cls = '') {
  return coverOk(b.cover) ? `<span class="bk ${cls}"><img src="${esc(b.cover)}" alt="Cover of ${esc(b.title)}" loading="lazy"></span>`
    : `<span class="bk none ${cls}">${GRAIN}<em>${esc(b.title)}</em></span>`;
}
function bookResults() {
  const q = (document.getElementById('bq')?.value || '').trim();
  if (ui.bookState === 'loading') return '<div class="note">Searching…</div>';
  const manual = q ? `<button class="manual" data-act="book-manual">Can't find it? Add “${esc(q)}” without a cover</button>` : '';
  if (ui.bookState === 'error') return `<div class="note">The search isn't answering right now.</div><div class="sugg">${manual}</div>`;
  if (!ui.books || !q) return '';
  if (!ui.books.length) return `<div class="note">Nothing found for that.</div><div class="sugg">${manual}</div>`;
  return `<div class="sugg">${ui.books.map((b, i) => `<button class="bookrow" data-act="book-pick" data-i="${i}">${cover(b, isSongDay() ? 'sm sq' : 'sm')}<span><b>${esc(b.title)}</b><small>${esc(b.by || 'Unknown')}</small></span></button>`).join('')}${manual}</div>`;
}
let bookTimer, bookSeq = 0;
function bookSearch(q) {
  clearTimeout(bookTimer);
  const box = () => document.getElementById('bres');
  if (q.trim().length < 3) { ui.books = null; ui.bookState = ''; if (box()) box().innerHTML = ''; return; }
  bookTimer = setTimeout(async () => {
    const seq = ++bookSeq; ui.bookState = 'loading'; if (box()) box().innerHTML = bookResults();
    try {
      if (isSongDay()) {
        const r = await fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(q.trim())}&entity=song&limit=6`);
        const j = await r.json(); if (seq !== bookSeq) return;
        ui.books = (j.results || []).map(t => ({ title: t.trackName, by: t.artistName || '', cover: (t.artworkUrl100 || '').replace('100x100', '300x300') }));
      } else {
        const r = await fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(q.trim())}&limit=6&fields=title,author_name,cover_i`);
        const j = await r.json(); if (seq !== bookSeq) return;
        ui.books = (j.docs || []).map(d => ({ title: d.title, by: (d.author_name || [])[0] || '', cover: d.cover_i ? `https://covers.openlibrary.org/b/id/${d.cover_i}-M.jpg` : '' }));
      }
      ui.bookState = '';
    } catch (e) { if (seq !== bookSeq) return; ui.bookState = 'error'; }
    if (box()) box().innerHTML = bookResults();
  }, 350);
}
const av = (name, cls = '') => `<span class="av ${cls}">${esc((name || '?').charAt(0).toUpperCase())}</span>`;

// ---------- Data helpers ----------
const dayPosts = n => S.posts.filter(p => p.day === n);
const mine = (n, kind = 'answer') => S.posts.filter(p => p.day === n && p.kind === kind && me && p.member_id === me.id);
const tagOf = n => `${NUMERALS[n - 1]} · ${DAYS[n - 1].name}`;
function summ(p) {
  const b = p.body || {}, d = p.day ? DAYS[p.day - 1] : null;
  if (b.fields) return Object.values(b.fields).filter(Boolean).join(' · ');
  if (b.choice != null && d && d.options) return d.options[b.choice] || '';
  if (b.title) return b.title + (b.by ? ` · ${b.by}` : '');
  if (b.carol) return b.carol;
  if (b.score != null) return `${b.score} of ${b.total} right`;
  if (b.result) return b.result;
  if (b.cause) return b.cause;
  if (b.lit) return 'Lit a luminaria';
  if (b.word) return b.word;
  return b.text || b.caption || '';
}
const full = p => (p.body.fields ? Object.entries(p.body.fields).map(([k, v]) => `${k}: ${v}`).join('\n') : summ(p));
function causes() {
  const map = new Map();
  S.posts.filter(p => p.kind === 'cause').forEach(p => {
    const k = p.body.cause.trim().toLowerCase();
    if (!map.has(k)) map.set(k, { name: p.body.cause.trim(), n: 0 });
    map.get(k).n++;
  });
  return [...map.values()].sort((a, b) => b.n - a.n);
}
function seenAt(bucket) { return store.get('seen', {})[bucket] || ''; }
function markSeen(bucket) { const s = store.get('seen', {}); s[bucket] = new Date().toISOString(); store.set('seen', s); }
const isNew = p => me && p.member_id !== me.id && p.created_at > seenAt(p.day == null ? 'chat' : p.day);
const anyNew = () => S.posts.some(isNew);

async function load() {
  if (!me) return;
  try {
    const s = await api.state(me.token);
    S = { ...s, loaded: true };
  } catch (e) {
    if (e.code === 'not_signed_in') { me = null; store.del('me'); S = { members: [], posts: [], draw: null, loaded: false }; }
    else { S.loaded = true; S.offline = true; throw e; }
  }
}

let toastTimer;
function toast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg; t.classList.add('show');
  clearTimeout(toastTimer); toastTimer = setTimeout(() => t.classList.remove('show'), 2800);
}

// ---------- Router ----------
function route() {
  const parts = location.hash.replace(/^#\/?/, '').split('/');
  return { a: parts[0] || 'deck', b: parts[1], c: parts[2] };
}
function go(hash) { if (location.hash === hash) render(); else location.hash = hash; }
const standalone = () => window.matchMedia('(display-mode: standalone)').matches || navigator.standalone === true;
const touch = () => window.matchMedia('(pointer: coarse)').matches;

function render() {
  const r = route(), key = location.hash;
  if (key !== lastRoute) { ui = { spin: ui.nextSpin, up: ui.nextUp }; lastRoute = key; ui.top = true; }
  // keep what is typed when the screen redraws
  const keep = {}; let focus = null;
  $app.querySelectorAll('input[id],textarea[id]').forEach(el => { if (el.type !== 'file') keep[el.id] = el.value; });
  if (document.activeElement && document.activeElement.id) focus = document.activeElement.id;

  const feedEl = $app.querySelector('.circle .feed'), feedTop = feedEl ? feedEl.scrollTop : 0;
  let html;
  if (!me) html = (!store.get('tip', false) && !standalone() && touch()) ? tipPage() : welcomePage();
  else if (!S.loaded) html = `<div class="page sky"><div class="loading">Shuffling the deck…</div></div>`;
  else if (r.a === 'spread') html = spreadPage();
  else if (r.a === 'card' && DAYS[+r.b - 1]) html = cardPage(+r.b, r.c === 's');
  else if (r.a === 'circle' && r.b && DAYS[+r.b - 1]) html = collectionPage(+r.b);
  else if (r.a === 'circle') html = circlePage();
  else html = deckPage();
  if (html == null) return;
  html += overlays();
  const pd = store.get('pretend', null), canTest = me && (me.is_host || DEMO) && (r.a === 'deck' || r.a === 'spread') && !ui.tester && !ui.dialog;
  if (canTest) html += `<button class="pretend" data-act="test-open">${pd ? `Testing ${esc(pretendLabel())} · change` : 'Host: test a day'}</button>`;
  else if (pd && (!me || r.a === 'deck' || r.a === 'spread')) html += `<div class="pretend">Pretend date: ${esc(pd)}</div>`;
  $app.innerHTML = html;
  if (ui.top) { $app.scrollTop = 0; ui.top = false; } else { const f = $app.querySelector('.circle .feed'); if (f) f.scrollTop = feedTop; }

  Object.entries(keep).forEach(([id, v]) => { const el = document.getElementById(id); if (el && !el.value) el.value = v; });
  if (focus) { const el = document.getElementById(focus); if (el) { el.focus(); if (el.setSelectionRange && el.type !== 'file') { try { el.setSelectionRange(el.value.length, el.value.length); } catch (e) {} } } }
  if (ui.viewer && ui.viewerJump) { const el = document.getElementById('slide-' + ui.viewer.at); if (el) el.scrollIntoView({ inline: 'center', block: 'nearest' }); ui.viewerJump = false; }
  ui.spin = false;
}
window.addEventListener('hashchange', render);

function pretendLabel() { const T = dayNum(); return T === 0 ? 'before December' : T === 25 ? 'after Christmas' : `December ${T}`; }

// ---------- Welcome ----------
function tipPage() {
  return `<div class="page sky welcome">
    <div style="margin-top:44px">${I.star(30, '#DDF23C')}</div>
    <div class="eyebrow" style="margin-top:14px">The December Deck</div>
    <h1>First, give it a spot on your home screen</h1>
    <p class="soft center" style="margin:12px 0 0">You'll open this every morning in December. Add it now and it's one tap away, like an app.</p>
    <div class="steps">
      <div><b>1</b><span>Tap the Share button in your browser</span></div>
      <div><b>2</b><span>Choose <strong>Add to Home Screen</strong></span></div>
      <div><b>3</b><span>Open the Deck from your home screen and sign in there</span></div>
    </div>
    <p class="muted center" style="font-size:13px;margin:14px 0 0">On Android, open the browser menu and choose Add to Home screen.</p>
    <div class="form" style="margin-top:auto;padding-top:24px">
      <button class="btn" data-act="tip-done">I've added it</button>
      <button class="btn quiet" data-act="tip-done">Skip for now</button>
    </div></div>`;
}
function welcomePage() {
  const err = ui.err ? `<div class="err" role="alert">${esc(ui.err)}</div>` : '';
  return `<div class="page sky welcome">
    <div style="margin-top:44px">${I.star(30, '#DDF23C')}</div>
    <div class="eyebrow" style="margin-top:14px">An advent calendar from ${esc(HOST_NAME)}</div>
    <h1>The December Deck</h1>
    <div class="trio"><span class="b" style="left:22px;transform:rotate(-12deg)"></span><span class="b" style="left:108px;transform:rotate(12deg)"></span>${wrapped(24, '', 52)}</div>
    <p class="soft center" style="margin:10px 0 0">Twenty-four cards. One unwraps each morning until Christmas Eve.</p>
    <form class="form" data-form="join" novalidate>
      <div class="field"><label for="wname">Your first name</label><input id="wname" type="text" autocomplete="given-name" maxlength="24" placeholder="Jess" value="${esc(ui.name || '')}"></div>
      <div class="field"><label for="wword">Invite word</label><input id="wword" type="text" autocapitalize="none" autocomplete="off" class="${ui.err ? 'bad' : ''}" placeholder="The word ${esc(HOST_NAME)} texted you"></div>
      ${err}
      <button class="btn" type="submit" ${ui.busy ? 'disabled' : ''} style="margin-top:6px;height:54px">${ui.busy ? 'Opening the door…' : 'Come in from the cold'}</button>
      <div class="muted center" style="font-size:12px">Your first name is how friends will see you in the Circle.</div>
    </form></div>`;
}

// ---------- Deck ----------
function tabs(on) {
  return `<nav class="tabs" aria-label="Sections"><a href="#/" class="${on === 'deck' ? 'on' : ''}">Deck</a><a href="#/circle" class="${on === 'circle' ? 'on' : ''}">Circle${on !== 'circle' && anyNew() ? '<span class="dot" aria-label="New activity"></span>' : ''}</a></nav>`;
}
function deckPage() {
  const T = dayNum(), w = waiting(), n = now(), name = esc(me.name);
  const dateLabel = `${MONTHS[n.getMonth()]} ${n.getDate()}`;
  let hi, sleeps, hero, cta, target = null;
  const o = opened().length;
  if (T === 0) {
    const left = Math.ceil((new Date(YEAR, 11, 1) - new Date(n.getFullYear(), n.getMonth(), n.getDate())) / 864e5);
    hi = `Not long now, ${name}`;
    sleeps = left <= 25 ? `${cap(WORDS[left])} ${left === 1 ? 'sleep' : 'sleeps'} until the first card` : 'The first card opens December 1';
    hero = `<span class="holder">${wrapped(1)}</span>`;
    cta = `<button class="btn cta" disabled>Opens December 1</button>`;
  } else if (w.length) {
    target = w[0];
    const today = w.length === 1 && target === T;
    hi = today ? `Come in from the cold, ${name}` : `Welcome back, ${name}`;
    sleeps = today ? sleepsLine(T) : `${cap(WORDS[w.length])} ${w.length === 1 ? 'card is' : 'cards are'} waiting for you`;
    hero = `<span class="holder"><button data-act="unwrap" data-n="${target}" aria-label="Unwrap card ${NUMERALS[target - 1]}">${wrapped(target)}</button></span>`;
    cta = `<button class="btn cta" data-act="unwrap" data-n="${target}">${today ? "Unwrap today's card" : `Unwrap card ${WORDS[target]}${w.length > 1 ? ` · 1 of ${w.length}` : ''}`}</button>`;
  } else if (T === 25) {
    hi = `Merry Christmas, ${name}`; sleeps = 'All twenty-four cards are yours';
    hero = `<span class="holder"><a href="#/card/24" aria-label="Open the last card" style="display:block;height:100%">${face(24)}</a></span>`;
    cta = `<a class="btn cta" href="#/spread">See your whole spread</a>`;
  } else {
    hi = `Come in from the cold, ${name}`; sleeps = sleepsLine(T);
    hero = `<span class="holder"><a href="#/card/${T}" aria-label="Open today's card" style="display:block;height:100%">${face(T)}</a></span>`;
    cta = `<a class="btn cta" href="#/card/${T}">${esc(DAYS[T - 1].cta)}</a>`;
  }
  const d = S.draw;
  const banner = d && (T === 9 || (Date.now() - new Date(d.at).getTime()) < 36 * 3600e3)
    ? `<a class="banner" href="#/circle/8"><span class="eyebrow">Last night's draw</span><b>The pot went to ${esc(d.cause)}</b>$${d.total} from ${plural(d.entries, 'entry').replace('entrys', 'entries')}. ${esc(HOST_NAME)} is sending it.</a>` : '';
  const next = T >= 1 && T < 24 && !w.length ? T + 1 : (target || (T === 0 ? 1 : null));
  return `<div class="page sky deck">
    <div class="stars">${I.star(34, '#DDF23C').replace('<svg', '<svg style="right:34px;top:34px"')}
      ${I.spark(14, '#F5F8FF', 'tw', 'left:36px;top:112px')}${I.spark(9, '#F5F8FF', 'tw2', 'right:80px;top:104px')}${I.spark(16, '#B9CCF5', 'tw2', 'right:28px;top:246px')}${I.spark(10, '#B9CCF5', 'tw', 'left:22px;top:318px')}${I.spark(12, '#F5F8FF', 'tw2', 'left:52px;top:500px')}${I.spark(10, '#F5F8FF', 'tw', 'right:54px;top:540px')}
      <i style="left:96px;top:76px;width:4px;height:4px"></i><i style="right:116px;top:196px;width:3px;height:3px"></i><i style="left:60px;top:236px;width:5px;height:5px"></i><i style="right:46px;top:430px;width:4px;height:4px"></i></div>
    ${tabs('deck')}
    <div class="greet"><div class="hi">${hi}</div><div class="date">${dateLabel}</div><div class="sleeps">${sleeps}</div></div>
    <div class="hero"><span class="glow"></span><span class="ring">${I.spark(18, '#DDF23C')}</span>${hero}</div>
    ${cta}
    ${T === 25 && !w.length ? `<a class="spreadlink" href="#/circle/24">Read the group card</a>` : `<a class="spreadlink" href="#/spread">Your spread · ${o} of 24 unwrapped</a>`}
    ${banner}
    <div class="fan" aria-hidden="true"><span class="hill"></span>
      <span class="b" style="left:-6px;top:58px;transform:rotate(-24deg)"></span><span class="b" style="left:48px;top:36px;transform:rotate(-16deg)"></span><span class="b" style="left:102px;top:22px;transform:rotate(-8deg)"></span>
      <span class="b" style="left:210px;top:22px;transform:rotate(8deg)"></span><span class="b" style="left:264px;top:36px;transform:rotate(16deg)"></span><span class="b" style="left:318px;top:58px;transform:rotate(24deg)"></span>
      ${next ? `<span class="f">${NUMERALS[next - 1]}</span>` : ''}</div>
  </div>`;
}
function sleepsLine(T) { const left = 25 - T; return `${cap(WORDS[left])} ${left === 1 ? 'sleep' : 'sleeps'} until Christmas`; }

// ---------- Spread ----------
function spreadPage() {
  const U = unlocked(), o = opened(), w = waiting();
  const cells = DAYS.map((d, i) => {
    const n = i + 1;
    if (n > U) return `<button class="locked" data-act="locked" data-n="${n}" aria-label="Card ${NUMERALS[i]}, still wrapped">${NUMERALS[i]}</button>`;
    if (!o.includes(n)) return `<button class="today" data-act="unwrap" data-n="${n}" style="background:none" aria-label="Unwrap card ${NUMERALS[i]}">${NUMERALS[i]}<small>${n === dayNum() ? 'Today' : 'Waiting'}</small></button>`;
    return `<a href="#/card/${n}/s" aria-label="${esc(d.name)}">${face(n, '', 0, `<span class="nm">${esc(d.name)}</span>`).replace('class="card ', 'style="width:100%;height:100%;border-radius:9px" class="card ')}</a>`;
  }).join('');
  return `<div class="page sky">
    <div class="bar"><a class="round" href="#/" aria-label="Back to the deck">${I.back}</a><div class="eyebrow">${o.length} of 24 unwrapped</div><div class="sp"></div></div>
    <div style="padding:10px 20px 0"><div class="display" style="font-size:32px;line-height:1.1">Your spread</div>
    <div class="soft" style="font-size:14px;margin-top:4px">${w.length > 1 ? 'Cards open oldest first. Tap a glowing card to unwrap it.' : "Tap any card you've unwrapped to visit it again."}</div></div>
    <div class="grid">${cells}</div>
    <div class="muted center" style="padding:0 20px 28px;font-size:12px;margin-top:auto">On Christmas Eve, the last card turns and your whole spread is yours to keep.</div>
  </div>`;
}

// ---------- Opened card ----------
function cardPage(n, fromSpread) {
  if (n > unlocked()) { setTimeout(() => { toast(`Card ${NUMERALS[n - 1]} is still wrapped. It opens December ${n}.`); go('#/spread'); }); return null; }
  markOpened(n);
  const d = DAYS[n - 1], up = !!ui.up, spin = !!ui.spin;
  return `<div class="page sky cardpage">
    <div class="bar"><a class="round" href="${fromSpread ? '#/spread' : '#/'}" aria-label="Back">${I.back}</a><div class="eyebrow">December ${n}</div><div class="sp"></div></div>
    <button class="stage ${up ? 'back' : ''}" data-act="respin" aria-label="Spin the card again"><span class="flip ${spin ? 'go' : ''}" style="display:block">
      ${face(n, 'face', 22)}<span class="face faceback back">${I.emblem(120, '#DDF23C')}</span></span></button>
    <div class="sheet ${up ? 'up' : ''} ${spin ? 'rise' : ''}" id="sheet">
      <button class="grab" data-act="toggle" aria-label="Pull the card details up or down"><span></span></button>
      <div class="in">
        <div class="head"><div class="t">${esc(d.name)}</div><div class="c">Card ${NUMERALS[n - 1]}</div></div>
        <div class="keys">${d.keys.map(k => `<span>${esc(k)}</span>`).join('')}</div>
        <div class="blurb">${esc(d.blurb)}</div>
        <button class="btn toggle ${up ? 'quiet' : ''}" data-act="toggle" id="togglebtn">${up ? 'Back to the card' : esc(d.cta)}</button>
        <div class="body" id="body">${sheetBody(n)}</div>
      </div>
    </div></div>`;
}
function refreshBody() {
  const r = route(), el = document.getElementById('body');
  if (r.a === 'card' && el) el.innerHTML = sheetBody(+r.b); else render();
}
const postRow = (label, noun, attrs = '') => `<div class="postrow"><button class="btn" ${attrs}>${I.up}${label || 'Post to the Circle'}</button><div class="note">Your ${noun} will appear in the Circle.</div></div>`;
const seeAll = (n, label = "See everyone's answers") => `<a class="linkbtn" href="#/circle/${n}" style="display:inline-flex;align-items:center">${label}</a>`;
const privateTag = `<div class="private">${I.lock}Only you can see this</div>`;
// A letter on ruled paper, with the day's card as the stamp.
const letter = (lines, n) => `<div class="paper"><div class="postage"><span class="mark"><b>Dec ${n}</b><i>The December Deck</i></span><span class="stamp">${ART[n] ? `<img src="${ART[n]}" alt="">` : `<em>${NUMERALS[n - 1]}</em>`}</span></div>
  ${lines.map((l, k) => `<p class="${k === 0 ? 'hi' : k === lines.length - 1 ? 'bye' : ''}">${esc(l.replace('{name}', me.name))}</p>`).join('')}<span class="seal">${I.star(18, '#101B45')}</span></div>`;

function sheetBody(n) {
  const d = DAYS[n - 1], my = mine(n), first = my[0], edit = !!ui.edit;
  switch (d.type) {
    case 'letter': return letter(d.letter, n);
    case 'gift': return `<div class="box dark"><div class="eyebrow">A small treat</div><div class="display" style="font-size:24px;color:var(--lime)">Coffee on me</div><div>${esc(d.gift.replace('{name}', me.name))}</div></div>`;
    case 'movie': return `<div class="box dark"><div class="eyebrow">Tonight's movie</div><div class="display" style="font-size:22px">${esc(d.movie)}</div><div class="soft">${esc(d.movieWhy)}</div></div>
      <div class="box"><div class="lbl">The snack pairing</div><div class="display" style="font-size:20px">${esc(d.snack)}</div><div style="color:var(--ink2)">${esc(d.snackWhy)}</div></div>`;
    case 'question': case 'word': {
      if (first && !edit) return `<div class="q">${esc(d.question)}</div><div class="box"><div class="lbl">Your ${d.noun}</div><div style="font-size:16px;white-space:pre-wrap">${esc(summ(first))}</div></div>
        <div class="postrow"><button class="btn quiet small" data-act="edit">Edit</button>${seeAll(n, d.type === 'word' ? 'See the tree' : undefined)}</div>`;
      const val = first ? summ(first) : '';
      return `<label class="q" for="ans">${esc(d.question)}</label>
        ${d.type === 'word' ? `<input type="text" id="ans" maxlength="24" placeholder="${esc(d.placeholder)}" value="${esc(val)}">` : `<textarea id="ans" maxlength="600" placeholder="${esc(d.placeholder)}">${esc(val)}</textarea>`}
        ${postRow('', d.noun, `data-act="post-text" data-n="${n}"`)}`;
    }
    case 'finale': {
      const three = store.get('priv7', []).filter(Boolean);
      const sign = first && !edit
        ? `<div class="box"><div class="lbl">Your line on the group card</div><div style="font-size:16px">${esc(summ(first))}</div></div><div class="postrow"><button class="btn quiet small" data-act="edit">Edit</button>${seeAll(n, 'Read the group card')}</div>`
        : `<label class="q" for="ans">${esc(d.question)}</label><textarea id="ans" maxlength="300" placeholder="${esc(d.placeholder)}">${esc(first ? summ(first) : '')}</textarea>${postRow('', d.noun, `data-act="post-text" data-n="${n}"`)}`;
      return `${letter(d.letter, n)}
        <div class="box"><div class="lbl">Your three good things · from December 7</div>${three.length ? three.map(t => `<div style="font-size:16px">${esc(t)}</div>`).join('') : `<div style="color:var(--ink2)">You didn't save any on this device. Think of three now. They still count.</div>`}<div class="note">Only you see these.</div></div>
        ${sign}`;
    }
    case 'favorites': {
      if (first && !edit) return `<div class="box"><div class="lbl">${esc(d.label)}</div>${Object.entries(first.body.fields).map(([k, v]) => `<div><span style="color:var(--ink2)">${esc(k)}:</span> ${esc(v)}</div>`).join('')}</div>
        <div class="postrow"><button class="btn quiet small" data-act="edit">Edit</button>${seeAll(n, d.all)}</div>`;
      const cur = first ? first.body.fields : {};
      return (d.question ? `<div class="q">${esc(d.question)}</div>` : '') + d.fields.map((f, i) => `<div class="field"><label class="lbl" for="f${i}">${esc(f)}</label><input type="text" id="f${i}" maxlength="60" value="${esc(cur[f] || '')}"></div>`).join('') + postRow('', d.noun, `data-act="post-fields" data-n="${n}"`);
    }
    case 'pick': {
      const all = dayPosts(n), counts = d.options.map((_, i) => all.filter(p => p.body.choice === i).length), total = all.length;
      if (!first || edit) return `<div class="q">${esc(d.question)}</div>${d.options.map((o, i) => `<button class="opt ${first && first.body.choice === i ? 'sel' : ''}" data-act="pick" data-n="${n}" data-i="${i}">${esc(o)}</button>`).join('')}<div class="note center">Pick one to see how the Circle voted.</div>`;
      const c = first.body.choice;
      return `<div class="q">${esc(d.question)}</div>${d.options.map((o, i) => `<div class="barrow"><div class="top"><b>${esc(o)}</b><span>${i === c ? '<span class="pill">Your pick</span>' : ''}${counts[i]}</span></div><div class="track"><i class="${i === c ? 'me' : ''}" style="width:${total ? Math.round(counts[i] / total * 100) : 0}%"></i></div></div>`).join('')}
        <div style="color:var(--ink2)">You're with ${esc(d.crowd[c])}. ${counts[c]} of ${plural(total, 'friend')} ${counts[c] === 1 ? 'agrees' : 'agree'} so far.</div>
        <button class="btn quiet small" data-act="edit" style="align-self:flex-start">Change my answer</button>`;
    }
    case 'playlist': case 'yourpick': {
      const isBook = d.type === 'yourpick';
      const top = isBook
        ? `<div class="box dark chosen">${cover({ title: d.pickTitle, cover: d.pickCover })}<div><div class="eyebrow">${esc(HOST_NAME)}'s pick</div><div class="display" style="font-size:20px;line-height:1.2">${esc(d.pickTitle)}</div><div class="soft">by ${esc(d.pickBy)}</div><div style="margin-top:6px">${esc(d.pickWhy)}</div></div></div>`
        : (d.link ? `<a class="btn quiet" href="${esc(d.link)}" target="_blank" rel="noopener">${esc(d.linkLabel)}</a>` : `<div class="box"><div class="lbl">The playlist</div><div style="color:var(--ink2)">[${esc(HOST_NAME)}, your playlist link goes here.]</div></div>`);
      const sq = isBook ? '' : ' sq', thing = isBook ? 'book' : 'song';
      const mineList = my.length ? `<div class="lbl">You added</div>${my.map(p => `<div class="entry book">${cover(p.body, 'sm' + sq)}<span><b>${esc(p.body.title)}</b><small>${esc(p.body.by || '')}</small></span><button data-act="del" data-id="${p.id}" aria-label="Remove ${esc(p.body.title)}">${I.x}</button></div>`).join('')}` : '';
      const form = ui.book
        ? `<div class="box chosen">${cover(ui.book, sq)}<div><div class="lbl">Your ${thing}</div><div class="display" style="font-size:19px;line-height:1.2">${esc(ui.book.title)}</div><div style="color:var(--ink2)">${esc(ui.book.by || '')}</div><button class="linkbtn" data-act="book-clear">Choose a different ${thing}</button></div></div>${postRow('', d.noun, `data-act="post-book" data-n="${n}"`)}`
        : `<div class="field"><label class="lbl" for="bq">Search for a ${thing}</label><input type="text" id="bq" maxlength="80" autocomplete="off" placeholder="${isBook ? 'Title or author' : 'Song or artist'}"></div><div id="bres">${bookResults()}</div>`;
      return `${top}${mineList}<div class="q">${esc(d.question)}</div>${form}${my.length ? seeAll(n, isBook ? 'See the whole shelf' : 'See the playlist') : ''}`;
    }
    case 'private': {
      const v = store.get('priv' + n, []);
      return `${privateTag}<div class="q" style="font-size:17px">${esc(d.question)}</div>
        ${Array.from({ length: d.count }, (_, i) => `<div class="field"><label class="sr" for="p${i}">Good thing ${i + 1}</label><input type="text" id="p${i}" maxlength="160" placeholder="${i + 1}." value="${esc(v[i] || '')}"></div>`).join('')}
        <button class="btn" data-act="save-private" data-n="${n}" data-count="${d.count}" style="align-self:flex-start">${esc(d.save)}</button>
        <div class="note">Kept on this card, on this device. Nothing goes to the Circle.</div>`;
    }
    case 'kind': {
      return `${privateTag}<label class="q" style="font-size:17px" for="kind">${esc(d.question)}</label>
        <textarea id="kind" maxlength="400" placeholder="Your sentence">${esc(store.get('priv' + n, ''))}</textarea>
        <button class="btn" data-act="copy-kind" data-n="${n}" style="align-self:flex-start">Copy my sentence</button>
        <div class="note">Paste it into a text. Nothing goes to the Circle.</div>`;
    }
    case 'checklist': {
      const t = store.get('tick' + n, []), done = t.filter(Boolean).length;
      return `${d.items.map((it, i) => `<button class="tick ${t[i] ? 'on' : ''}" data-act="tick" data-n="${n}" data-i="${i}" aria-pressed="${!!t[i]}"><i>${t[i] ? I.check : ''}</i><span>${esc(it)}</span></button>`).join('')}
        <div class="postrow"><button class="btn quiet small" data-act="save-image" data-n="${n}">Save as an image</button><div class="note">${done} of ${d.items.length} done. Only you can see this list.</div></div>`;
    }
    case 'recipe': {
      const r = d.recipe, tab = ui.tab || 'need', t = store.get('tick' + n, []), got = r.need.filter((_, i) => t[i]).length;
      return `<div class="keys" style="margin-top:0"><span>${esc(r.makes)}</span><span>${esc(r.time)}</span></div><div class="display" style="font-size:22px">${esc(r.title)}</div>
        <div class="segs" role="tablist"><button role="tab" aria-selected="${tab === 'need'}" class="${tab === 'need' ? 'on' : ''}" data-act="tab" data-tab="need">You'll need</button><button role="tab" aria-selected="${tab === 'how'}" class="${tab === 'how' ? 'on' : ''}" data-act="tab" data-tab="how">How to make it</button></div>
        ${tab === 'need'
          ? r.need.map((it, i) => `<button class="tick ${t[i] ? 'on' : ''}" data-act="tick" data-n="${n}" data-i="${i}" aria-pressed="${!!t[i]}"><i>${t[i] ? I.check : ''}</i><span>${esc(it)}</span></button>`).join('') + `<div class="note">${got} of ${r.need.length} gathered</div>`
          : r.steps.map((s, i) => `<div class="numstep"><b>${i + 1}</b><span>${esc(s)}</span></div>`).join('')}`;
    }
    case 'tutorial': {
      const i = Math.min(ui.step || 0, d.steps.length - 1);
      return `<div class="lbl">Step ${i + 1} of ${d.steps.length}</div><div class="photo-pick" style="cursor:default">Photo or video of this step</div>
        <div style="font-size:16px;line-height:1.5">${esc(d.steps[i])}</div>
        <div class="postrow"><button class="btn quiet small" data-act="step" data-d="-1" ${i === 0 ? 'disabled' : ''}>Back</button><button class="btn small" data-act="step" data-d="1" ${i === d.steps.length - 1 ? 'disabled' : ''}>Next step</button></div>`;
    }
    case 'carol': {
      if (first && !ui.words) return `<div class="box dark"><div class="eyebrow">Your carol</div><div class="display" style="font-size:19px;line-height:1.4">${esc(first.body.carol)}</div></div>
        <div class="postrow"><button class="btn quiet small" data-act="carol-again">Write another</button>${seeAll(n, "See everyone's carols")}</div>`;
      if (ui.words && ui.words.done) {
        const text = d.carol.replace(/\{(\d)\}/g, (_, k) => ui.words.v[+k]);
        return `<div class="box dark"><div class="eyebrow">Your carol</div><div class="display" style="font-size:19px;line-height:1.4">${esc(text)}</div></div>
          ${postRow('', d.noun, `data-act="post-carol" data-n="${n}"`)}<button class="btn quiet small" data-act="carol-again" style="align-self:flex-start">Try again</button>`;
      }
      return d.fields.map((f, i) => `<div class="field"><label class="lbl" for="w${i}">${esc(f)}</label><input type="text" id="w${i}" maxlength="24" autocapitalize="none"></div>`).join('') + `<button class="btn" data-act="carol-make" data-n="${n}" style="align-self:flex-start">Make my carol</button>`;
    }
    case 'quiz': {
      const st = store.get('quiz' + n, { i: 0, right: 0, picked: null }), total = d.questions.length;
      if (st.i >= total) return `<div class="box dark"><div class="eyebrow">Your score</div><div class="display" style="font-size:30px;color:var(--lime)">${st.right} of ${total}</div></div>
        ${first ? `<div class="note">Your score is on the scoreboard.</div>${seeAll(n, 'See the scoreboard')}` : postRow('', d.noun, `data-act="post-score" data-n="${n}"`)}`;
      const q = d.questions[st.i], done = st.picked != null;
      return `<div class="lbl">Question ${st.i + 1} of ${total} · ${st.right} right so far</div><div class="q">${esc(q.q)}</div>
        ${q.a.map((a, i) => `<button class="opt ${done && i === q.right ? 'right' : ''} ${done && i === st.picked && i !== q.right ? 'wrong' : ''}" data-act="quiz" data-n="${n}" data-i="${i}" ${done ? 'disabled' : ''}>${esc(a)}</button>`).join('')}
        ${done ? `<div class="box"><b>${st.picked === q.right ? 'Right.' : `Not quite. It's ${esc(q.a[q.right])}.`}</b><span>${esc(q.note)}</span></div><button class="btn" data-act="quiz-next" data-n="${n}" style="align-self:flex-start">${st.i + 1 === total ? 'See my score' : 'Next question'}</button>` : ''}`;
    }
    case 'creature': {
      const st = store.get('cr' + n, { i: 0, tally: [] });
      const wall = k => { const r = d.results[k]; return `<div class="wallrow"><div class="wall">${r.art ? `<img src="${r.art}" alt="">` : GRAIN}<span class="wt"><b>${esc(r.name)}</b><i>${esc(r.line)}</i></span></div>
        <div class="wside"><div class="lbl">Your wallpaper</div><div style="color:var(--ink2);font-size:14px">Made to fit your lock screen, with room for the clock.</div><button class="btn quiet small" data-act="save-wall" data-n="${n}" data-k="${k}">Save wallpaper</button></div></div>`; };
      if (first && !edit) { const k = Math.max(0, d.results.findIndex(r => r.name === first.body.result));
        return `<div class="box dark"><div class="eyebrow">${esc(d.youAre || 'You are')}</div><div class="display" style="font-size:26px;color:var(--lime)">${esc(first.body.result)}</div><div>${esc(first.body.line || '')}</div></div>${wall(k)}
        <div class="postrow"><button class="btn quiet small" data-act="creature-again" data-n="${n}">Take it again</button>${seeAll(n, 'See everyone')}</div>`; }
      if (st.i >= d.questions.length) {
        const k = creatureResult(d, st.tally), r = d.results[k];
        return `<div class="box dark"><div class="eyebrow">${esc(d.youAre || 'You are')}</div><div class="display" style="font-size:26px;color:var(--lime)">${esc(r.name)}</div><div>${esc(r.line)}</div></div>
          ${postRow('', d.noun, `data-act="post-creature" data-n="${n}"`)}${wall(k)}<button class="btn quiet small" data-act="creature-again" data-n="${n}" style="align-self:flex-start">Take it again</button>`;
      }
      const q = d.questions[st.i];
      return `<div class="lbl">${esc(d.title)} · ${st.i + 1} of ${d.questions.length}</div><div class="q">${esc(q.q)}</div>${q.a.map((a, i) => `<button class="opt" data-act="creature" data-n="${n}" data-i="${i}">${esc(a)}</button>`).join('')}`;
    }
    case 'photo': {
      if (d.cats) {
        const got = mine(n, 'photo'), by = k => got.find(p => p.body.cat === k), extras = got.filter(p => p.body.cat === d.cats.length), X = d.cats.length;
        const plus = '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M10 4v12M4 10h12"/></svg>';
        const tile = (id, cat, label, p, busy, repId) => `<div class="slot ${p ? 'has' : ''}"><label class="ptile" for="${id}">${p ? `<img src="${esc(p.body.url)}" alt="${esc(label)}">` : ''}${busy ? '<span class="add"><span class="spinner"></span><span>Adding…</span></span>' : p ? '' : `<span class="add"><span class="plus">${plus}</span><span>Add photo</span></span>`}</label>
          ${p && !busy ? `<button class="rm" data-act="del" data-id="${p.id}" aria-label="Remove ${esc(label)} photo">${I.x}</button>` : ''}<div class="nm">${esc(label)}${p && !busy ? '<i>Tap photo to change</i>' : ''}</div>
          <input class="sr" type="file" id="${id}" accept="image/*" data-cat="${cat}" data-n="${n}" ${repId ? `data-rep="${repId}"` : ''} aria-label="${esc(label)}"></div>`;
        const done = d.cats.filter((_, k) => by(k)).length;
        return `<div class="slots">${d.cats.map((c, k) => tile('file-' + k, k, c, by(k), ui.slotBusy === k)).join('')}
          ${extras.map((p, k) => tile('file-x' + p.id, X, d.extraLabel, p, ui.slotBusy === 'x' + p.id, p.id)).join('')}
          ${extras.length < d.extraMax ? tile('file-new', X, d.extraLabel, null, ui.slotBusy === 'new') : ''}</div>
          <div class="note">${done} of ${d.cats.length} favorites added${extras.length ? `, plus ${extras.length} more` : ''}. Each photo goes onto the mood board in the Circle as soon as you pick it.</div>${got.length ? seeAll(n, d.all) : ''}`;
      }
      const ph = mine(n, 'photo'), full = d.max && ph.length >= d.max;
      return `${d.hint ? `<div style="color:var(--ink2)">${esc(d.hint)}</div>` : ''}${ph.length ? `<div class="lbl">Your ${ph.length === 1 ? 'photo' : 'photos'}${d.max ? ` · ${ph.length} of ${d.max}` : ''}</div><div class="pgrid">${ph.map(p => `<button data-act="view" data-id="${p.id}" aria-label="Open photo"><img src="${esc(p.body.url)}" alt="${esc(p.body.caption || 'Your photo')}"></button>`).join('')}</div>` : ''}
        ${full ? `<div class="note">That's all ${d.max}. Open a photo to delete it if you want to swap one.</div>` : `<label class="photo-pick" for="file">${ui.photo ? `<img src="${ui.photo.url}" alt="Your chosen photo">` : `${I.cam}<span>${ph.length ? 'Add another photo' : 'Choose a photo'}</span>`}</label>
        <input class="sr" type="file" id="file" accept="image/*" data-n="${n}">`}
        ${ui.photo && !full ? `<div class="field"><label class="lbl" for="capt">${esc(d.captionLabel || 'Say something about it')}</label><input type="text" id="capt" maxlength="140"></div>${postRow('', d.noun, `data-act="post-photo" data-n="${n}" ${ui.busy ? 'disabled' : ''}`)}` : ''}
        ${ph.length ? seeAll(n, d.all || "See everyone's photos") : ''}`;
    }
    case 'charity': return charityBody(n, d);
  }
  return '';
}
function creatureResult(d, tally) {
  const c = d.results.map(() => 0);
  tally.forEach((pick, qi) => { const to = d.questions[qi] && d.questions[qi].to; if (to && to[pick]) { c[to[pick][0]] += 2; c[to[pick][1]] += 1; } else if (c[pick] != null) c[pick] += 2; });
  return c.indexOf(Math.max(...c));
}
function charityBody(n, d) {
  const all = S.posts.filter(p => p.kind === 'cause'), my = mine(n, 'cause'), list = causes(), friends = new Set(all.map(p => p.member_id)).size;
  const pot = `<div class="box dark pot"><div><div class="eyebrow">${S.draw ? 'The pot' : 'The pot so far'}</div><div class="soft" style="font-size:13px">${plural(all.length, 'entry').replace('entrys', 'entries')} from ${plural(friends, 'friend')}</div></div><div class="amt">$${all.length * 5}</div></div>`;
  let host = '';
  if (me.is_host) {
    host = `<div class="box white"><div class="private">${I.lock}Host view · only you see this</div>
      ${list.length ? list.map(c => `<div class="entry"><span>${esc(c.name)} <small style="color:var(--line2)">· ${plural(c.n, 'entry').replace('entrys', 'entries')}</small></span>${S.draw ? '' : `<button data-act="rename" data-name="${esc(c.name)}" aria-label="Rename ${esc(c.name)}" style="width:auto;padding:0 10px;color:var(--ink2);text-decoration:underline;font-size:13px">Rename</button>`}</div>`).join('') : '<div style="color:var(--ink2)">No entries yet.</div>'}
      ${S.draw ? '' : `<div class="note">Every entry has an equal chance. Rename a cause to match another and they combine.</div><button class="btn" data-act="draw-ask" ${all.length ? '' : 'disabled'} style="align-self:flex-start">Draw a cause</button>`}</div>`;
  }
  if (S.draw) {
    const when = new Date(S.draw.at);
    return `<div class="box dark"><div class="eyebrow">The pot went to</div><div class="display" style="font-size:26px;color:var(--lime)">${esc(S.draw.cause)}</div><div class="soft">$${S.draw.total} from ${plural(S.draw.entries, 'entry').replace('entrys', 'entries')}. Drawn at random on ${MONTHS[when.getMonth()]} ${when.getDate()}.</div></div>
      ${my.length ? `<div class="lbl">Your entries</div>${my.map(p => `<div class="entry"><span>${esc(p.body.cause)}</span></div>`).join('')}<div class="note">Thank you for adding yours.</div>` : ''}${host}${seeAll(n, 'See every cause')}`;
  }
  const left = 3 - my.length;
  return `${pot}
    <div style="display:flex;justify-content:space-between;align-items:baseline"><div class="lbl">Your entries</div><div class="note">${my.length} of 3 used</div></div>
    ${my.map(p => `<div class="entry"><span>${esc(p.body.cause)}</span><button data-act="del" data-id="${p.id}" aria-label="Remove ${esc(p.body.cause)}">${I.x}</button></div>`).join('')}
    ${left > 0 ? `<div class="field"><label class="lbl" for="cause">${my.length ? 'Add another cause' : 'Add a cause'}</label><input type="text" id="cause" maxlength="80" autocomplete="off" placeholder="A charity or cause you care about"></div>
      <div id="sugg">${suggHtml('')}</div>${postRow('', d.noun, `data-act="post-cause" data-n="${n}"`)}` : `<div class="note">You've used all three entries. Remove one to change it.</div>`}
    ${host}`;
}
function suggHtml(q) {
  q = q.trim().toLowerCase();
  const list = causes().filter(c => !q || c.name.toLowerCase().includes(q)).slice(0, 4);
  if (!list.length) return '';
  return `<div class="sugg"><div class="lbl" style="padding:6px 14px 2px">Already in the pot</div>${list.map(c => `<button data-act="sugg" data-name="${esc(c.name)}"><span>${esc(c.name)}</span><small>${plural(c.n, 'entry').replace('entrys', 'entries')} · tap to add yours</small></button>`).join('')}</div>`;
}

// ---------- Circle ----------
function reactions(p) {
  const chips = EMOJI.filter(e => p.reactions[e]).map(e => `<button class="${p.mine.includes(e) ? 'mine' : ''}" data-act="react" data-id="${p.id}" data-e="${e}" aria-pressed="${p.mine.includes(e)}">${e}<span>${p.reactions[e]}</span></button>`).join('');
  const can = p.member_id === me.id || me.is_host;
  const picker = ui.pick === p.id ? `<div class="picker" role="group" aria-label="React">${EMOJI.map((e, i) => `<button class="${p.mine.includes(e) ? 'mine' : ''}" data-act="react" data-id="${p.id}" data-e="${e}" aria-label="${EMOJI_NAME[i]}">${e}</button>`).join('')}</div>` : '';
  return `${picker}<div class="rx">${chips}<button class="add" data-act="pick-open" data-id="${p.id}" aria-label="Add a reaction" aria-expanded="${ui.pick === p.id}">☺ +</button>${can ? `<button class="del" data-act="del-ask" data-id="${p.id}">Delete</button>` : ''}</div>`;
}
function bubble(p, text) {
  const img = p.body.url ? `<button class="imgbtn" data-act="view" data-id="${p.id}" aria-label="Open photo"><img src="${esc(p.body.url)}" alt="${esc(p.body.caption || `Photo from ${p.name}`)}" loading="lazy"></button>` : '';
  const t = text != null ? text : (p.body.text || p.body.caption || '');
  return `<div class="msg ${p.is_host ? 'host' : ''}">${av(p.name, 'big')}<div class="col"><div class="bubble"><div class="who">${esc(p.name)}${p.is_host ? '<em>Host</em>' : ''}</div>${img}${t ? `<div class="tx">${esc(t)}</div>` : ''}</div>${reactions(p)}</div></div>`;
}
function tile(n) {
  const d = DAYS[n - 1], posts = dayPosts(n), fresh = posts.some(isNew);
  const people = [...new Map(posts.map(p => [p.member_id, p.name])).values()];
  let mid = '', count = plural(posts.length, d.noun || 'post'), goLabel = 'Read all', title = d.circle || d.name;
  if (d.type === 'photo') {
    const ph = posts.filter(p => p.body.url);
    mid = `<div class="thumbs">${ph.slice(0, 4).map((p, i) => `<div class="${i === 3 && ph.length > 4 ? 'more' : ''}" style="background-image:url('${esc(p.body.url)}')">${i === 3 && ph.length > 4 ? `<span>+${ph.length - 3}</span>` : ''}</div>`).join('')}</div>`;
    goLabel = 'See all';
  } else if (d.type === 'word') {
    const m = new Map(); posts.forEach(p => { const k = (p.body.word || '').toLowerCase(); m.set(k, (m.get(k) || 0) + 1); });
    mid = `<div class="words">${[...m.entries()].slice(0, 8).map(([w, c]) => `<span class="${c > 1 ? 'hot' : ''}">${esc(w)}</span>`).join('')}</div>`; goLabel = 'See all';
  } else if (d.type === 'pick') {
    mid = mine(n).length ? `<div class="ln"><span>${d.options.map((o, i) => `${esc(o)}: ${posts.filter(p => p.body.choice === i).length}`).join(' · ')}</span></div>` : `<div class="ln"><span>Pick one to see how the Circle voted.</span></div>`;
    goLabel = 'See the vote';
  } else if (d.type === 'charity') {
    title = S.draw ? `The pot went to ${S.draw.cause}` : d.circle;
    mid = `<div class="ln"><span>${S.draw ? `$${S.draw.total} from ${S.draw.entries} entries.` : `$${posts.length * 5} in the pot so far.`}</span></div>`;
    count = plural(causes().length, 'cause'); goLabel = S.draw ? 'See the draw' : 'See all';
  } else if (d.type === 'yourpick') {
    mid = `<div class="covers">${posts.slice(-5).reverse().map(p => cover(p.body, 'sm')).join('')}</div>`; goLabel = 'See the shelf';
  } else if (d.type === 'candle') {
    mid = `<div class="flames">${posts.slice(0, 10).map((_, k) => `<span>${bag(true, 't' + k)}</span>`).join('')}</div>`; count = `${posts.length} lit`; goLabel = 'See the wall';
  } else if (d.type === 'playlist') {
    mid = posts.slice(-3).map(p => `<div class="ln" style="align-items:center">${I.note}<span>${esc(p.body.title)} <span class="muted">${esc(p.body.by || '')}</span></span></div>`).join(''); goLabel = 'See all';
  } else {
    mid = posts.slice(-2).map(p => `<div class="ln"><b>${esc(p.name.charAt(0).toUpperCase())}</b><span>${esc(summ(p))}</span></div>`).join('');
  }
  return `<a class="tile" href="#/circle/${n}"><div class="top"><span class="tag">${tagOf(n)}</span>${fresh ? '<span class="dot" aria-label="New"></span>' : ''}</div><div class="t">${esc(title)}</div>${mid}
    <div class="foot"><div class="who"><span class="avs">${people.slice(0, 4).map(x => av(x)).join('')}</span>${count}</div><div class="go">${goLabel}${I.go}</div></div></a>`;
}
function circlePage() {
  const posts = S.posts, U = unlocked();
  const items = posts.filter(p => p.day == null).map(p => ({ t: p.created_at, html: bubble(p) }));
  for (let n = 1; n <= 24; n++) { const dp = dayPosts(n); if (dp.length && (n <= U || me.is_host)) items.push({ t: dp[dp.length - 1].created_at, html: tile(n) }); }
  items.sort((a, b) => (a.t < b.t ? 1 : -1));
  const real = new Date(), sameDay = t => { const x = new Date(t); return x.toDateString() === real.toDateString(); };
  const today = items.filter(i => sameDay(i.t)), earlier = items.filter(i => !sameDay(i.t));
  const n = now();
  // ornaments: most recent posters first, lit if they posted in the last day
  const last = new Map(); posts.forEach(p => last.set(p.member_id, p.created_at));
  const ms = [...S.members].sort((a, b) => ((last.get(b.id) || '') > (last.get(a.id) || '') ? 1 : -1));
  const show = ms.slice(0, ms.length > 6 ? 5 : 6), lit = id => last.get(id) && Date.now() - new Date(last.get(id)).getTime() < 864e5;
  const orns = show.map((m, i) => `<div class="orn ${lit(m.id) ? 'on' : ''}"><span class="s" style="height:${i % 2 ? 34 : 16}px"></span><span class="c"></span><span class="o">${esc(m.name.charAt(0).toUpperCase())}</span><span class="n">${esc(m.name)}</span></div>`).join('')
    + (ms.length > 6 ? `<div class="orn more"><span class="s" style="height:34px"></span><span class="c"></span><span class="o">+${ms.length - 5}</span><span class="n">More</span></div>` : '');
  const feed = items.length
    ? `${today.length ? `<div class="rule">Today · ${MONTHS[n.getMonth()]} ${n.getDate()}</div>${today.map(i => i.html).join('')}` : ''}${earlier.length ? `<div class="rule">Earlier</div>${earlier.map(i => i.html).join('')}` : ''}`
    : `<div class="empty"><div class="t">Quiet as fresh snow</div><div>Nobody has posted yet. Say hello, or unwrap today's card and your answer will land here.</div></div>`;
  setTimeout(() => markSeen('chat'));
  return `<div class="page circle">${tabs('circle')}
    <div class="title-row"><div class="t">The Circle</div><div class="muted" style="font-size:12px">${plural(S.members.length, 'friend')}</div></div>
    <div class="orns" style="${show.length < 4 ? 'justify-content:flex-start;gap:18px' : ''}">${orns}</div>
    <div class="feed">${S.offline ? `<div class="err" role="alert">Can't reach the Circle right now. Check your connection.</div>` : ''}${feed}</div>
    <div class="composer">${ui.photo ? `<div class="prev"><img src="${ui.photo.url}" alt="Your chosen photo"><span>Photo ready. Add a note if you like.</span><button class="linkbtn" data-act="photo-clear" style="color:var(--soft)">Remove</button></div>` : ''}
      <form data-form="chat"><label class="ic" for="file" aria-label="Add a photo" style="cursor:pointer;color:var(--white)">${I.cam}</label><input class="sr" type="file" id="file" accept="image/*">
      <label class="sr" for="msg">Message</label><input id="msg" type="text" maxlength="500" autocomplete="off" placeholder="Say something to the Circle">
      <button class="ic send" type="submit" aria-label="Post to the Circle" ${ui.busy ? 'disabled' : ''}>${I.up}</button></form></div>
  </div>`;
}
// A night sky: one star per answer, joined into a constellation. Stars keep their place as more arrive.
const halton = (i, b) => { let f = 1, r = 0; while (i > 0) { f /= b; r += f * (i % b); i = Math.floor(i / b); } return r; };
function skyPage(n) {
  const d = DAYS[n - 1], posts = dayPosts(n), since = seenAt(n), my = mine(n)[0];
  const W = Math.min(window.innerWidth, 430), H = Math.max(320, window.innerHeight - 170), padX = 44, padT = 26, padB = 54;
  const pts = posts.map((p, k) => ({ p, x: padX + halton(k + 1, 2) * (W - 2 * padX), y: padT + halton(k + 1, 3) * (H - padT - padB) }));
  // nudge apart any stars that land too close
  for (let pass = 0; pass < 12; pass++) for (let i = 0; i < pts.length; i++) for (let j = i + 1; j < pts.length; j++) {
    const dx = pts[j].x - pts[i].x, dy = pts[j].y - pts[i].y, dist = Math.hypot(dx, dy) || 1, min = 64;
    if (dist < min) { const push = (min - dist) / 2, nx = dx / dist, ny = dy / dist; pts[j].x = Math.max(padX, Math.min(W - padX, pts[j].x + nx * push)); pts[j].y = Math.max(padT, Math.min(H - padB, pts[j].y + ny * push)); pts[i].x = Math.max(padX, Math.min(W - padX, pts[i].x - nx * push)); pts[i].y = Math.max(padT, Math.min(H - padB, pts[i].y - ny * push)); }
  }
  const lines = pts.map((s, k) => { if (!k) return ''; let best = 0, bd = Infinity; for (let m = 0; m < k; m++) { const q = Math.hypot(pts[m].x - s.x, pts[m].y - s.y); if (q < bd) { bd = q; best = m; } }
    return `<line x1="${s.x.toFixed(1)}" y1="${s.y.toFixed(1)}" x2="${pts[best].x.toFixed(1)}" y2="${pts[best].y.toFixed(1)}"/>`; }).join('');
  const dust = Array.from({ length: 46 }, (_, k) => `<i style="left:${(halton(k + 7, 5) * 100).toFixed(1)}%;top:${(halton(k + 7, 7) * 100).toFixed(1)}%;opacity:${[0.25, 0.4, 0.55][k % 3]};width:${k % 4 ? 2 : 3}px;height:${k % 4 ? 2 : 3}px"></i>`).join('');
  const stars = pts.map(({ p, x, y }, k) => {
    const own = p.member_id === me.id, total = Object.values(p.reactions).reduce((u, v) => u + v, 0), size = 18 + Math.min(total, 6) * 2, fresh = p.created_at > since && !own;
    return `<button class="star ${own ? 'me' : ''} ${total ? 'loved' : ''} ${fresh ? 'fresh' : ''}" data-act="orn" data-id="${p.id}" style="left:${x.toFixed(1)}px;top:${y.toFixed(1)}px" aria-label="${esc(p.name)}'s star${fresh ? ', new' : ''}"><span class="sp ${k % 2 ? 'tw' : 'tw2'}">${I.spark(size, own || total ? '#DDF23C' : '#F5F8FF')}</span><b>${own ? 'You' : esc(p.name)}</b></button>`;
  }).join('');
  setTimeout(() => markSeen(n), 1500);
  return `<div class="page skypage">
    <div class="bar"><a class="round" href="#/circle" aria-label="Back to the Circle">${I.back}</a><span class="tag">${tagOf(n)}</span><div class="sp"></div></div>
    <div style="padding:14px 20px 0;position:relative"><div class="display" style="font-size:28px;line-height:1.12">${esc(d.circle)}</div><div class="muted" style="font-size:13px;margin-top:6px">${posts.length ? `${plural(posts.length, 'star')} · tap a star to read it` : 'No stars yet'}</div></div>
    <div class="skyfield"><span class="milky"></span>${dust}<svg aria-hidden="true">${lines}</svg>${stars}
      ${!posts.length ? `<div class="empty"><div>The sky is dark. Add the first star.</div></div>` : ''}
      ${my ? '' : `<a class="btn" href="#/card/${n}" style="position:absolute;left:50%;bottom:calc(20px + env(safe-area-inset-bottom));transform:translateX(-50%)">Add your star</a>`}</div>
  </div>`;
}
// One ornament per word, hung on a tiered tree with a star on top.
function treePage(n) {
  const d = DAYS[n - 1], posts = dayPosts(n), since = seenAt(n), my = mine(n)[0];
  const count = new Map(); posts.forEach(p => { const k = (p.body.word || '').toLowerCase(); count.set(k, (count.get(k) || 0) + 1); });
  const rows = []; let k = 0, tier = 1, step = 0;
  while (k < posts.length) { const len = Math.min(5, tier + step); rows.push(posts.slice(k, k + len)); k += len; if (++step === 3) { step = 0; tier = Math.min(tier + 1, 3); } }
  const orn = p => { const w = p.body.word || '', hot = count.get(w.toLowerCase()) > 1, total = Object.values(p.reactions).reduce((x, y) => x + y, 0), top = EMOJI.filter(e => p.reactions[e]).sort((x, y) => p.reactions[y] - p.reactions[x])[0];
    return `<button class="word-orn ${hot ? 'hot' : ''} ${p.member_id === me.id ? 'me' : ''}" data-act="orn" data-id="${p.id}" style="font-size:${w.length <= 6 ? 13 : w.length <= 9 ? 11 : 9}px" aria-label="${esc(w)}, from ${esc(p.name)}">${p.created_at > since && p.member_id !== me.id ? '<span class="dot"></span>' : ''}<span>${esc(w)}</span>${total ? `<span class="rc">${top} ${total}</span>` : ''}</button>`; };
  setTimeout(() => markSeen(n), 1500);
  return `<div class="page" style="padding-bottom:40px">
    <div class="bar"><a class="round" href="#/circle" aria-label="Back to the Circle">${I.back}</a><span class="tag">${tagOf(n)}</span><div class="sp"></div></div>
    <div style="padding:14px 20px 0"><div class="display" style="font-size:28px;line-height:1.12">${esc(d.circle)}</div><div class="muted" style="font-size:13px;margin-top:6px">${posts.length ? `${plural(posts.length, 'word')} · tap an ornament to see whose it is. Words picked twice glow.` : 'No words yet'}</div></div>
    <div class="tree"><span class="topper">${I.star(40, '#DDF23C')}</span>
      ${rows.map(r => `<div class="trow">${r.map(orn).join('')}</div>`).join('')}
      ${posts.length ? '<span class="trunk"></span>' : `<div class="empty" style="margin-top:8px"><div>The tree is bare. Hang the first word.</div></div>`}
      ${my ? '' : `<a class="btn" href="#/card/${n}" style="margin-top:8px">Hang your word</a>`}</div>
  </div>`;
}
function collectionPage(n) {
  if (DAYS[n - 1].view === 'sky') return skyPage(n);
  if (DAYS[n - 1].view === 'tree') return treePage(n);
  const d = DAYS[n - 1], posts = dayPosts(n), my = mine(n)[0], since = seenAt(n);
  let top = '', list = posts;
  if (d.type === 'pick') {
    if (!my) top = `<div class="empty" style="margin-top:8px"><div>Pick one to see how the Circle voted.</div><a class="btn" href="#/card/${n}">Make your pick</a></div>`;
    else top = d.options.map((o, i) => { const c = posts.filter(p => p.body.choice === i); return `<div class="tile" style="gap:8px"><div class="t">${esc(o)}</div><div class="foot"><div class="who"><span class="avs">${c.slice(0, 8).map(p => av(p.name)).join('')}</span>${plural(c.length, 'friend')}</div>${my.body.choice === i ? '<span class="tag" style="border-color:var(--lime);color:var(--lime)">Your pick</span>' : ''}</div></div>`; }).join('');
    list = [];
  } else if (d.type === 'word') {
    const m = new Map(); posts.forEach(p => { const k = (p.body.word || '').toLowerCase(); m.set(k, (m.get(k) || 0) + 1); });
    top = `<div class="words">${[...m.entries()].map(([w, c]) => `<span class="${c > 1 ? 'hot' : ''}">${esc(w)}</span>`).join('')}</div><div class="muted" style="font-size:12px">Words picked twice glow.</div>`;
  } else if (d.view === 'board') {
    top = `<div class="mood">${d.fields.map((f, fi) => { const m = new Map(); posts.forEach(p => { const v = (p.body.fields || {})[f]; if (!v) return; const key = v.trim().toLowerCase(); if (!m.has(key)) m.set(key, { v: v.trim(), who: [] }); m.get(key).who.push(p.member_id === me.id ? 'You' : p.name); });
      const tags = [...m.values()].sort((x, y) => y.who.length - x.who.length);
      return `<section><h3><span>${String(fi + 1).padStart(2, '0')}</span>${esc(f)}</h3><div class="pins">${tags.length ? tags.map((t, k) => `<button class="pin s${Math.min(t.who.length, 3)} ${t.who.includes('You') ? 'me' : ''}" style="transform:rotate(${[-2, 1.5, -1, 2.5, 0, -1.5][(k + fi) % 6]}deg)" data-act="tag" data-f="${esc(f)}" data-who="${esc(t.who.join(', '))}" data-v="${esc(t.v)}">${esc(t.v)}${t.who.length > 1 ? `<i>×${t.who.length}</i>` : ''}</button>`).join('') : '<span class="muted" style="font-size:13px">Nothing pinned yet</span>'}</div></section>`; }).join('')}</div>
      ${my ? `<a class="btn quiet small" href="#/card/${n}" style="align-self:center">Edit my favorites</a>` : `<a class="btn" href="#/card/${n}" style="align-self:center">Pin your favorites</a>`}`; list = [];
  } else if (d.type === 'playlist') {
    const adders = new Set(posts.map(p => p.member_id)).size;
    top = `<div class="plhead"><span class="plcover">${ART[n] ? `<img src="${ART[n]}" alt="">` : GRAIN}</span><div><div class="eyebrow">Playlist</div><div class="display" style="font-size:24px;line-height:1.15">The December Deck mix</div><div class="muted" style="font-size:13px;margin-top:4px">${plural(posts.length, 'song')} · added by ${plural(adders, 'friend')}</div></div></div>
      ${d.link ? `<a class="btn" href="${esc(d.link)}" target="_blank" rel="noopener" style="align-self:flex-start"><svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true"><path d="M3 1.5v11l9-5.5z" fill="#101B45"/></svg>${esc(d.linkLabel)}</a>` : ''}
      <div class="tracks">${posts.map((p, k) => { const total = Object.values(p.reactions).reduce((x, y) => x + y, 0), best = EMOJI.filter(e => p.reactions[e]).sort((x, y) => p.reactions[y] - p.reactions[x])[0];
        return `<button class="track" data-act="orn" data-id="${p.id}"><span class="no">${k + 1}</span>${cover(p.body, 'sm sq')}<span class="ti"><b>${esc(p.body.title)}</b><small>${esc(p.body.by || 'Unknown artist')}</small></span>${total ? `<span class="tr">${best} ${total}</span>` : ''}${av(p.name)}</button>`; }).join('')}</div>
      <a class="btn quiet small" href="#/card/${n}" style="align-self:center">Add a song</a>`; list = [];
  } else if (d.type === 'creature') {
    top = `<div class="dens">${d.results.map(r => { const who = posts.filter(p => p.body.result === r.name), here = who.some(p => p.member_id === me.id);
      return `<section class="den ${here ? 'me' : ''}"><span class="dpic">${r.art ? `<img src="${r.art}" alt="">` : GRAIN}</span><div class="dtx"><h3>${esc(r.name)}<span>${who.length}</span></h3><p>${esc(r.line)}</p>
        <div class="dwho">${who.length ? who.map(p => `<span class="${p.member_id === me.id ? 'you' : ''}">${av(p.name)}${esc(p.member_id === me.id ? 'You' : p.name)}</span>`).join('') : '<span class="none">Nobody yet</span>'}</div></div></section>`; }).join('')}</div>
      ${my ? '' : `<a class="btn" href="#/card/${n}" style="align-self:center">${esc(d.cta)}</a>`}`; list = [];
  } else if (d.type === 'carol') {
    // find the four words each friend put in, so they can be highlighted
    const parts = d.carol.split(/\{\d\}/), re = new RegExp('^' + parts.map(s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('(.+?)') + '$');
    const lyric = t => { const m = t.match(re); if (!m) return esc(t); return parts.map((s, k) => esc(s) + (k < parts.length - 1 ? `<mark>${esc(m[k + 1])}</mark>` : '')).join(''); };
    top = [...posts].reverse().map((p, k) => `<div class="songwrap"><div class="carolcard" style="transform:rotate(${k % 2 ? 0.8 : -0.8}deg)">${GRAIN}<div class="in"><div class="by">${I.note.replace(/#DDF23C/g, '#F5F8FF')}<span>${esc(p.member_id === me.id ? 'Your' : p.name + "'s")} carol</span></div><div class="ly">${lyric(p.body.carol)}</div></div></div>${reactions(p)}</div>`).join(''); list = [];
  } else if (d.type === 'quiz') {
    const ranked = [...posts].sort((x, y) => y.body.score - x.body.score); let rank = 0, prev = null;
    top = `<div class="board"><div class="bhead"><span class="eyebrow">Trivia night</span><span class="eyebrow">Score</span></div>
      ${ranked.map((p, k) => { if (p.body.score !== prev) { rank = k + 1; prev = p.body.score; } const lead = rank === 1;
        return `<div class="brow ${lead ? 'lead' : ''}"><span class="rk">${lead ? I.star(18, '#DDF23C') : rank}</span><span class="who"><b>${esc(p.member_id === me.id ? 'You' : p.name)}</b><span class="pips">${Array.from({ length: p.body.total }, (_, q) => `<i class="${q < p.body.score ? 'on' : ''}"></i>`).join('')}</span></span><span class="sc">${p.body.score}<small>/${p.body.total}</small></span></div>`; }).join('')}</div>
      ${my ? '' : `<a class="btn" href="#/card/${n}" style="align-self:center">Take the quiz</a>`}`; list = [];
  } else if (d.type === 'charity') {
    top = `<div class="tile"><div class="t">${S.draw ? `The pot went to ${esc(S.draw.cause)}` : 'The pot so far'}</div><div class="ln"><span>${S.draw ? `$${S.draw.total} from ${S.draw.entries} entries, drawn at random.` : `$${posts.length * 5} from ${posts.length} entries. One is drawn on the evening of December 8.`}</span></div></div>
      ${causes().map(c => `<div class="score"><span>${esc(c.name)}</span><b>${c.n}</b></div>`).join('')}`; list = [];
  } else if (d.type === 'yourpick') {
    top = `<div class="tile chosen" style="flex-direction:row;align-items:center;gap:14px">${cover({ title: d.pickTitle, cover: d.pickCover })}<div style="min-width:0"><div class="eyebrow">${esc(HOST_NAME)}'s pick</div><div class="t">${esc(d.pickTitle)}</div><div class="soft" style="font-size:13px">by ${esc(d.pickBy)}</div></div></div>
      <div class="shelf">${[...posts].reverse().map(p => `<div class="vol">${cover(p.body)}<b>${esc(p.body.title)}</b><small>${esc(p.name)}${p.member_id === me.id || me.is_host ? ` · <button class="linkbtn" data-act="del-ask" data-id="${p.id}">Remove</button>` : ''}</small></div>`).join('')}</div>`; list = [];
  } else if (d.type === 'candle') {
    top = windowHtml(posts) + (my ? '' : `<a class="btn" href="#/card/${n}" style="align-self:center">Light your luminaria</a>`); list = [];
  } else if (d.type === 'photo' && d.view === 'mood') {
    const allPh = posts.filter(p => p.body.url).reverse(), f = ui.cat == null ? -1 : ui.cat, ph = f < 0 ? allPh : allPh.filter(p => p.body.cat === f), left = d.cats.filter((_, k) => !mine(n, 'photo').some(p => p.body.cat === k)).length;
    top = `<div class="chips" role="group" aria-label="Show">${['All', ...d.short].map((s, k) => `<button class="${f === k - 1 ? 'on' : ''}" data-act="cat" data-k="${k - 1}" aria-pressed="${f === k - 1}">${esc(s)}</button>`).join('')}</div>
      <div class="collage">${ph.map((p, k) => `<button class="shot" data-act="view" data-id="${p.id}" style="transform:rotate(${[-1.2, 0.8, 0, 1.4, -0.6][k % 5]}deg)" aria-label="${esc(d.cats[p.body.cat] || 'Photo')} from ${esc(p.name)}"><img src="${esc(p.body.url)}" alt="${esc(d.cats[p.body.cat] || 'Photo')} from ${esc(p.name)}" loading="lazy"><span class="cap">${av(p.name)}<b>${esc(d.short[p.body.cat] || '')}</b></span></button>`).join('')}</div>
      ${!ph.length ? '<div class="empty" style="margin-top:8px"><div>Nothing pinned here yet.</div></div>' : ''}
      ${left > 0 ? `<a class="btn ${left < d.cats.length ? 'quiet small' : ''}" href="#/card/${n}" style="align-self:center">${left < d.cats.length ? `Add your other ${left === 1 ? 'photo' : left + ' photos'}` : 'Add your favorites'}</a>` : ''}`; list = [];
  } else if (d.type === 'photo') {
    const ph = posts.filter(p => p.body.url);
    const tilt = [-3, 2.5, 2, -2.5, -1.5, 3];
    const pol = (p, k) => { const best = EMOJI.filter(e => p.reactions[e]).sort((x, y) => p.reactions[y] - p.reactions[x])[0], total = Object.values(p.reactions).reduce((x, y) => x + y, 0);
      return `<button class="pol" data-act="view" data-id="${p.id}" style="transform:rotate(${tilt[k % 6]}deg)" aria-label="Photo from ${esc(p.name)}"><span class="tape" style="transform:rotate(${-tilt[k % 6] * 1.5}deg)"></span><img src="${esc(p.body.url)}" alt="${esc(p.body.caption || `Photo from ${p.name}`)}" loading="lazy"><span class="strip"><b>${esc(p.member_id === me.id ? 'You' : p.name)}</b>${total ? `<i>${best} ${total}</i>` : ''}</span></button>`; };
    const newest = [...ph].reverse();
    top = `<div class="pwall"><div>${newest.filter((_, k) => k % 2 === 0).map((p, k) => pol(p, k * 2)).join('')}</div><div>${newest.filter((_, k) => k % 2 === 1).map((p, k) => pol(p, k * 2 + 1)).join('')}</div></div>${mine(n, 'photo').length ? '' : `<a class="btn" href="#/card/${n}" style="align-self:center;margin-top:8px">Add your photo</a>`}`; list = [];
  }
  const others = list.filter(p => p.member_id !== me.id || (d.type !== 'question' && d.type !== 'finale' && d.type !== 'favorites'));
  const mineCard = my && others.length !== list.length ? `<div class="mine-card"><div class="top"><div class="lbl">Your ${d.noun}</div><a href="#/card/${n}">Edit</a></div><div style="white-space:pre-wrap">${esc(summ(my))}</div></div>` : '';
  const rows = [...others].reverse(), fresh = rows.filter(p => p.created_at > since && p.member_id !== me.id), old = rows.filter(p => !fresh.includes(p));
  const body = `${fresh.length ? `<div class="rule"><span class="dot"></span>New</div>${fresh.map(p => bubble(p, full(p))).join('')}` : ''}${old.length ? `${fresh.length ? '<div class="rule">Earlier</div>' : ''}${old.map(p => bubble(p, full(p))).join('')}` : ''}`;
  setTimeout(() => markSeen(n), 1500);
  return `<div class="page" style="padding-bottom:40px">
    <div class="bar"><a class="round" href="#/circle" aria-label="Back to the Circle">${I.back}</a><span class="tag">${tagOf(n)}</span><div class="sp"></div></div>
    <div style="padding:16px 20px 0"><div class="display" style="font-size:28px;line-height:1.12">${esc(d.circle || d.name)}</div><div class="muted" style="font-size:13px;margin-top:6px">${plural(posts.length, d.noun || 'post')}</div></div>
    <div class="feed">${top}${mineCard}${body}${!posts.length ? `<div class="empty"><div>Nothing here yet.</div><a class="btn" href="#/card/${n}">Open the card</a></div>` : ''}</div>
  </div>`;
}

// ---------- Overlays ----------
function overlays() {
  let h = '';
  if (ui.viewer) {
    const list = ui.viewer.ids.map(id => S.posts.find(p => p.id === id)).filter(Boolean);
    if (list.length) h += `<div class="viewer" role="dialog" aria-label="Photos"><div class="vbar"><button class="round" data-act="view-close" aria-label="Close" style="color:var(--white)">${I.x}</button><div class="eyebrow">${list.length > 1 ? 'Swipe for more' : ''}</div><div style="width:44px"></div></div>
      <div class="strip">${list.map(p => `<div class="slide" id="slide-${p.id}"><img src="${esc(p.body.url)}" alt="${esc(p.body.caption || `Photo from ${p.name}`)}"><div class="cap"><div class="who"><span>${esc(p.name)}${p.day ? ` · ${tagOf(p.day)}` : ''}</span>${p.member_id === me.id || me.is_host ? `<button class="linkbtn" style="color:var(--coral)" data-act="del-ask" data-id="${p.id}">${p.member_id === me.id ? 'Delete my post' : 'Remove'}</button>` : ''}</div>${p.body.caption ? `<div>${esc(p.body.caption)}</div>` : ''}${reactions(p).replace(/<button class="del"[^>]*>Delete<\/button>/, '')}</div></div>`).join('')}</div></div>`;
  }
  if (ui.bubble) {
    const p = S.posts.find(x => x.id === ui.bubble);
    if (!p) ui.bubble = null;
    else h += `<div class="scrim" data-act="bubble-close"><div class="dialog" role="dialog" aria-label="Answer from ${esc(p.name)}">
      <div style="display:flex;align-items:center;gap:10px">${av(p.name, 'big')}<div class="t" style="flex:1">${esc(p.name)}${p.body.word ? "'s word" : DAYS[(p.day || 1) - 1].view === 'sky' ? "'s star" : DAYS[(p.day || 1) - 1].type === 'playlist' ? "'s song" : ''}</div><button class="round" data-act="bubble-close" aria-label="Close" style="color:var(--ink)">${I.x}</button></div>
      <div style="font-size:17px;line-height:1.5;white-space:pre-wrap;overflow-wrap:anywhere">${esc(summ(p))}</div>
      <div class="rxrow" role="group" aria-label="React">${EMOJI.map((e, i) => `<button class="${p.mine.includes(e) ? 'mine' : ''}" data-act="react" data-id="${p.id}" data-e="${e}" aria-label="${EMOJI_NAME[i]}" aria-pressed="${p.mine.includes(e)}">${e}${p.reactions[e] ? `<span>${p.reactions[e]}</span>` : ''}</button>`).join('')}</div>
      ${p.member_id === me.id ? `<div class="postrow"><a class="btn quiet small" href="#/card/${p.day}">Edit my answer</a><button class="linkbtn" style="color:var(--red)" data-act="del-ask" data-id="${p.id}">Delete</button></div>` : me.is_host ? `<button class="linkbtn" style="color:var(--red);align-self:flex-start" data-act="del-ask" data-id="${p.id}">Remove this answer</button>` : ''}
    </div></div>`;
  }
  if (ui.info) h += `<div class="scrim" data-act="info-close"><div class="dialog" role="dialog" aria-labelledby="inf-t"><div class="lbl">${esc(ui.info.label)}</div><div class="t" id="inf-t">${esc(ui.info.title)}</div><div style="color:var(--ink2)">${esc(ui.info.text)}</div><button class="btn quiet" data-act="info-close">Close</button></div></div>`;
  if (ui.tester) {
    const T = store.get('pretend', null) ? dayNum() : -1;
    h += `<div class="scrim" data-act="test-close"><div class="dialog" role="dialog" aria-labelledby="tst-t"><div class="t" id="tst-t">Test a day</div>
      <div style="color:var(--ink2)">Only you see this. Pick a day and the app behaves as if it were that date. Earlier cards are marked as opened so the day you pick is the one waiting.</div>
      <div class="daygrid">${DAYS.map((_, i) => `<button class="${T === i + 1 ? 'on' : ''}" data-act="test-day" data-d="${i + 1}">${i + 1}</button>`).join('')}</div>
      <div class="postrow"><button class="btn quiet small ${T === 0 ? 'on' : ''}" data-act="test-day" data-d="0">Before Dec 1</button><button class="btn quiet small ${T === 25 ? 'on' : ''}" data-act="test-day" data-d="25">After Dec 24</button></div>
      <button class="btn quiet small" data-act="test-wrap">Wrap every card again</button>
      <button class="btn" data-act="test-day" data-d="real">Back to today's real date</button></div></div>`;
  }
  if (ui.dialog) {
    const g = ui.dialog;
    h += `<div class="scrim" data-act="dialog-close"><div class="dialog" role="alertdialog" aria-labelledby="dlg-t"><div class="t" id="dlg-t">${esc(g.title)}</div><div style="color:var(--ink2)">${esc(g.text)}</div>
      <button class="btn ${g.kill ? 'kill' : ''}" data-act="dialog-yes">${esc(g.yes)}</button><button class="btn quiet" data-act="dialog-close">Cancel</button></div></div>`;
  }
  return h;
}

// ---------- Actions ----------
async function send(fn, okMsg) {
  if (ui.busy) return false;
  ui.busy = true;
  try { await fn(); await load(); ui.busy = false; if (okMsg) toast(okMsg); return true; }
  catch (e) {
    ui.busy = false;
    const m = { entry_limit: "You've used all three entries.", draw_done: 'The draw has already happened.', too_long: 'That is a little too long. Trim it and try again.', no_entries: 'There are no entries to draw from yet.' }[e.code];
    toast(m || "That didn't post. Check your connection and try again."); return false;
  }
}
const val = id => (document.getElementById(id)?.value || '').trim();
async function postAnswer(n, body, single = true, kind = 'answer') {
  const ok = await send(() => api.post(me.token, n, kind, body, single), 'Posted to the Circle');
  if (ok) { ui.edit = false; ui.words = null; ui.photo = null; document.querySelectorAll('#body input[type=text],#body textarea').forEach(el => el.value = ''); refreshBody(); }
}
function shrink(file) {
  return new Promise((res, rej) => {
    const url = URL.createObjectURL(file), img = new Image();
    img.onload = () => {
      const max = 1600, k = Math.min(1, max / Math.max(img.width, img.height)), c = document.createElement('canvas');
      c.width = Math.round(img.width * k); c.height = Math.round(img.height * k);
      c.getContext('2d').drawImage(img, 0, 0, c.width, c.height); URL.revokeObjectURL(url);
      c.toBlob(b => b ? res(b) : rej(new Error('photo')), 'image/jpeg', 0.82);
    };
    img.onerror = () => { URL.revokeObjectURL(url); rej(new Error('photo')); };
    img.src = url;
  });
}
// A lock-screen wallpaper for a quiz result. Art fills it when it exists; the name sits low, clear of the clock.
async function saveWallpaper(n, k) {
  const r = DAYS[n - 1].results[k], W = 1170, H = 2532, c = document.createElement('canvas'), x = c.getContext('2d');
  c.width = W; c.height = H;
  try { await Promise.all([document.fonts.load('96px Aboreto'), document.fonts.load('44px Jost')]); } catch (e) {}
  const g = x.createLinearGradient(0, 0, W, H); g.addColorStop(0, '#86A6EC'); g.addColorStop(1, '#5B7FD0'); x.fillStyle = g; x.fillRect(0, 0, W, H);
  const glow = (cx, cy, rad, col) => { const q = x.createRadialGradient(cx, cy, 0, cx, cy, rad); q.addColorStop(0, col); q.addColorStop(1, 'rgba(227,245,74,0)'); x.fillStyle = q; x.fillRect(0, 0, W, H); };
  glow(W * 0.8, H * 0.16, W * 0.9, 'rgba(227,245,74,.95)'); glow(W * 0.12, H * 0.88, W * 0.95, 'rgba(212,238,85,.95)');
  if (r.art) { try { const img = new Image(); img.src = r.art; await img.decode(); const s = Math.max(W / img.width, H / img.height); x.drawImage(img, (W - img.width * s) / 2, (H - img.height * s) / 2, img.width * s, img.height * s); } catch (e) {} }
  else { const id = x.getImageData(0, 0, W, H), px = id.data; for (let i = 0; i < px.length; i += 4) { const v = (Math.random() - 0.5) * 46; px[i] += v; px[i + 1] += v; px[i + 2] += v; } x.putImageData(id, 0, 0); }
  const sh = x.createLinearGradient(0, H * 0.62, 0, H); sh.addColorStop(0, 'rgba(9,15,42,0)'); sh.addColorStop(1, 'rgba(9,15,42,.55)'); x.fillStyle = sh; x.fillRect(0, H * 0.62, W, H * 0.38);
  x.strokeStyle = 'rgba(245,248,255,.9)'; x.lineWidth = 3; const m = 54; x.beginPath(); x.roundRect(m, m, W - 2 * m, H - 2 * m, 60); x.stroke();
  x.textAlign = 'center'; x.fillStyle = '#F5F8FF'; x.shadowColor = 'rgba(9,15,42,.6)'; x.shadowBlur = 24;
  x.font = '96px Aboreto, Optima, sans-serif'; x.fillText(r.name, W / 2, H * 0.8);
  x.font = '44px Jost, sans-serif'; const words = r.line.split(' '); let line = '', y = H * 0.8 + 90;
  for (const w of words) { if (x.measureText(line + w).width > W - 300) { x.fillText(line.trim(), W / 2, y); y += 62; line = ''; } line += w + ' '; } x.fillText(line.trim(), W / 2, y);
  c.toBlob(async b => {
    const file = new File([b], 'december-deck-wallpaper.jpg', { type: 'image/jpeg' });
    try { if (navigator.canShare && navigator.canShare({ files: [file] })) { await navigator.share({ files: [file] }); return; } } catch (e) { return; }
    const a2 = document.createElement('a'); a2.href = URL.createObjectURL(b); a2.download = 'december-deck-wallpaper.jpg'; a2.click(); toast('Saved your wallpaper');
  }, 'image/jpeg', 0.92);
}
function checklistImage(n) {
  const d = DAYS[n - 1], t = store.get('tick' + n, []), c = document.createElement('canvas'), W = 1080, H = 1350, x = c.getContext('2d');
  c.width = W; c.height = H;
  const g = x.createLinearGradient(0, 0, 0, H); g.addColorStop(0, '#0D1638'); g.addColorStop(.55, '#142152'); g.addColorStop(1, '#090F2A'); x.fillStyle = g; x.fillRect(0, 0, W, H);
  x.fillStyle = '#B9CCF5'; x.font = '500 30px Jost, sans-serif'; x.textAlign = 'center'; x.fillText('THE DECEMBER DECK', W / 2, 150);
  x.fillStyle = '#F5F8FF'; x.font = '76px Aboreto, Optima, sans-serif'; x.fillText('My cozy checklist', W / 2, 260);
  x.textAlign = 'left'; x.font = '44px Jost, sans-serif';
  d.items.forEach((it, i) => {
    const y = 420 + i * 130; x.lineWidth = 3; x.strokeStyle = '#DDF23C'; x.beginPath(); x.arc(150, y - 14, 28, 0, Math.PI * 2); x.stroke();
    if (t[i]) { x.fillStyle = '#DDF23C'; x.fill(); x.strokeStyle = '#101B45'; x.lineWidth = 6; x.beginPath(); x.moveTo(136, y - 14); x.lineTo(146, y - 2); x.lineTo(166, y - 26); x.stroke(); }
    x.fillStyle = t[i] ? '#A9B6D6' : '#F5F8FF'; x.fillText(it, 210, y);
  });
  c.toBlob(async b => {
    const file = new File([b], 'cozy-checklist.png', { type: 'image/png' });
    try { if (navigator.canShare && navigator.canShare({ files: [file] })) { await navigator.share({ files: [file] }); return; } } catch (e) { return; }
    const a = document.createElement('a'); a.href = URL.createObjectURL(b); a.download = 'cozy-checklist.png'; a.click(); toast('Saved your checklist image');
  }, 'image/png');
}

const acts = {
  'tip-done'() { store.set('tip', true); render(); },
  unwrap(el) { const n = +el.dataset.n, w = waiting(); if (w.length && n !== w[0]) { toast(`Cards open oldest first. Card ${NUMERALS[w[0] - 1]} is next.`); return; } markOpened(n); ui.nextSpin = true; ui.nextUp = false; go(`#/card/${n}`); },
  locked(el) { toast(`Card ${NUMERALS[el.dataset.n - 1]} is still wrapped. It opens December ${el.dataset.n}.`); },
  toggle() {
    ui.up = !ui.up;
    document.getElementById('sheet')?.classList.toggle('up', ui.up); document.getElementById('sheet')?.classList.remove('rise');
    document.querySelector('.stage')?.classList.toggle('back', ui.up);
    const b = document.getElementById('togglebtn'), r = route();
    if (b) { b.classList.toggle('quiet', ui.up); b.textContent = ui.up ? 'Back to the card' : DAYS[+r.b - 1].cta; }
    if (!ui.up) document.querySelector('.sheet .in')?.scrollTo(0, 0);
  },
  respin() { if (ui.up) return acts.toggle(); const f = document.querySelector('.stage .flip'); if (f) { f.classList.remove('go'); void f.offsetWidth; f.classList.add('go'); } },
  edit() { ui.edit = true; refreshBody(); },
  tab(el) { ui.tab = el.dataset.tab; refreshBody(); },
  step(el) { ui.step = Math.max(0, (ui.step || 0) + +el.dataset.d); refreshBody(); },
  tick(el) { const k = 'tick' + el.dataset.n, t = store.get(k, []); t[+el.dataset.i] = !t[+el.dataset.i]; store.set(k, t); refreshBody(); },
  'save-image'(el) { checklistImage(+el.dataset.n); },
  'save-wall'(el) { saveWallpaper(+el.dataset.n, +el.dataset.k); },
  'save-private'(el) { const v = []; for (let i = 0; i < +el.dataset.count; i++) v.push(val('p' + i)); store.set('priv' + el.dataset.n, v); toast('Saved. Only you can see this.'); },
  async 'copy-kind'(el) { const v = val('kind'); if (!v) return toast('Write your sentence first.'); store.set('priv' + el.dataset.n, v); try { await navigator.clipboard.writeText(v); toast('Copied. Now send it to them.'); } catch (e) { toast('Saved. Select the text to copy it.'); } },
  'post-text'(el) {
    const n = +el.dataset.n, d = DAYS[n - 1], v = val('ans'); if (!v) return toast('Write something first.');
    if (d.type === 'word') { if (/\s/.test(v)) return toast('Just one word.'); return postAnswer(n, { word: v.toLowerCase() }); }
    postAnswer(n, { text: v });
  },
  'post-fields'(el) { const n = +el.dataset.n, d = DAYS[n - 1], fields = {}; d.fields.forEach((f, i) => { const v = val('f' + i); if (v) fields[f] = v; }); if (!Object.keys(fields).length) return toast('Fill in at least one.'); postAnswer(n, { fields }); },
  'post-title'(el) { const t = val('ta'); if (!t) return toast('Add a title first.'); postAnswer(+el.dataset.n, { title: t, by: val('tb') }, false); },
  light(el) { postAnswer(+el.dataset.n, { lit: true }); },
  'book-pick'(el) { ui.book = ui.books[+el.dataset.i]; refreshBody(); },
  'book-manual'() { const t = val('bq'); if (!t) return; ui.book = { title: t, by: '', cover: '' }; refreshBody(); },
  'book-clear'() { ui.book = null; ui.books = null; refreshBody(); },
  async 'post-book'(el) { if (!ui.book) return; const b = ui.book; await postAnswer(+el.dataset.n, { title: b.title.slice(0, 120), by: (b.by || '').slice(0, 80), cover: coverOk(b.cover) ? b.cover : '' }, false); if (!ui.busy) { ui.book = null; ui.books = null; refreshBody(); } },
  pick(el) { postAnswer(+el.dataset.n, { choice: +el.dataset.i }); },
  'carol-make'(el) { const d = DAYS[+el.dataset.n - 1], v = d.fields.map((_, i) => val('w' + i)); if (v.some(x => !x)) return toast('Fill in all four words.'); ui.words = { v, done: true }; refreshBody(); },
  'carol-again'() { ui.words = { v: [], done: false }; refreshBody(); },
  'post-carol'(el) { const n = +el.dataset.n, d = DAYS[n - 1]; postAnswer(n, { carol: d.carol.replace(/\{(\d)\}/g, (_, k) => ui.words.v[+k]) }); },
  quiz(el) { const n = el.dataset.n, d = DAYS[n - 1], st = store.get('quiz' + n, { i: 0, right: 0, picked: null }); if (st.picked != null) return; st.picked = +el.dataset.i; if (st.picked === d.questions[st.i].right) st.right++; store.set('quiz' + n, st); refreshBody(); },
  'quiz-next'(el) { const k = 'quiz' + el.dataset.n, st = store.get(k); st.i++; st.picked = null; store.set(k, st); refreshBody(); },
  'post-score'(el) { const n = +el.dataset.n, st = store.get('quiz' + n); postAnswer(n, { score: st.right, total: DAYS[n - 1].questions.length }); },
  creature(el) { const k = 'cr' + el.dataset.n, st = store.get(k, { i: 0, tally: [] }); st.tally.push(+el.dataset.i); st.i++; store.set(k, st); refreshBody(); },
  'creature-again'(el) { store.set('cr' + el.dataset.n, { i: 0, tally: [] }); ui.edit = true; refreshBody(); },
  'post-creature'(el) { const n = +el.dataset.n, d = DAYS[n - 1], r = d.results[creatureResult(d, store.get('cr' + n).tally)]; postAnswer(n, { result: r.name, line: r.line }); },
  async 'post-photo'(el) {
    if (!ui.photo) return; const n = +el.dataset.n, caption = val('capt'), blob = ui.photo.blob;
    const ok = await send(async () => { const url = await api.upload(blob); await api.post(me.token, n, 'photo', { url, caption }, false); }, 'Posted to the Circle');
    if (ok) { ui.photo = null; refreshBody(); }
  },
  'photo-clear'() { ui.photo = null; render(); },
  sugg(el) { const i = document.getElementById('cause'); if (i) { i.value = el.dataset.name; i.focus(); } },
  async 'post-cause'(el) { const v = val('cause'); if (!v) return toast('Name a cause first.'); const ok = await send(() => api.post(me.token, +el.dataset.n, 'cause', { cause: v }, false), 'Added to the pot'); if (ok) { document.getElementById('cause').value = ''; refreshBody(); } },
  async del(el) { const ok = await send(() => api.del(me.token, +el.dataset.id)); if (ok) refreshBody(); },
  async rename(el) { const a = el.dataset.name, b = prompt('Rename this cause. Use the exact name of another cause to combine them.', a); if (!b || b.trim() === a) return; const ok = await send(() => api.rename(me.token, a, b), 'Renamed'); if (ok) refreshBody(); },
  'draw-ask'() { ui.dialog = { title: 'Draw a cause now?', text: 'One entry is picked at random and everyone will see the result. This can only be done once.', yes: 'Draw a cause', run: async () => { const ok = await send(() => api.draw(me.token)); if (ok) toast(`The pot goes to ${S.draw.cause}`); } }; render(); },
  'pick-open'(el) { const id = +el.dataset.id; ui.pick = ui.pick === id ? null : id; render(); },
  async react(el) { ui.pick = null; await send(() => api.react(me.token, +el.dataset.id, el.dataset.e)); render(); },
  'del-ask'(el) {
    const id = +el.dataset.id, p = S.posts.find(x => x.id === id); if (!p) return;
    const own = p.member_id === me.id;
    ui.dialog = { title: own ? 'Delete your post?' : `Remove ${p.name}'s post?`, text: "It will disappear for everyone, along with its reactions. This can't be undone.", yes: own ? 'Delete my post' : 'Remove it', kill: true,
      run: async () => { await send(() => api.del(me.token, id), own ? 'Deleted' : 'Removed'); if (ui.viewer) { ui.viewer.ids = ui.viewer.ids.filter(x => x !== id); if (!ui.viewer.ids.length) ui.viewer = null; } } };
    render();
  },
  'dialog-close'(el, ev) { if (ev.target.closest('.dialog') && !ev.target.closest('[data-act="dialog-close"].btn')) return; ui.dialog = null; render(); },
  async 'dialog-yes'() { const g = ui.dialog; ui.dialog = null; render(); await g.run(); render(); },
  view(el) {
    const id = +el.dataset.id, p = S.posts.find(x => x.id === id); if (!p) return;
    const ids = S.posts.filter(x => x.body.url && x.day === p.day).map(x => x.id);
    ui.viewer = { ids, at: id }; ui.viewerJump = true; render();
  },
  'view-close'() { ui.viewer = null; render(); },
  'bubble-close'(el, ev) { if (ev.target.closest('.dialog') && !el.classList.contains('round')) return; ui.bubble = null; render(); },
  orn(el) { ui.bubble = +el.dataset.id; render(); },
  tag(el) { ui.info = { label: el.dataset.f, title: el.dataset.v, text: 'Picked by ' + el.dataset.who.replace(/, ([^,]*)$/, ' and $1') }; render(); },
  'info-close'(el, ev) { if (ev.target.closest('.dialog') && !el.classList.contains('btn')) return; ui.info = null; render(); },
  flip(el) { el.classList.toggle('flipped'); },
  cat(el) { ui.cat = +el.dataset.k; render(); },
  'test-open'() { ui.tester = true; render(); },
  'test-close'(el, ev) { if (ev.target.closest('.dialog')) return; ui.tester = false; render(); },
  'test-wrap'() { store.set('opened', []); ui.tester = false; toast('Every card is wrapped again'); go('#/'); },
  'test-day'(el) {
    const d = el.dataset.d; ui.tester = false;
    if (d === 'real') store.del('pretend');
    else {
      const n = +d; store.set('pretend', n === 0 ? `${YEAR}-11-27` : n === 25 ? `${YEAR}-12-26` : `${YEAR}-12-${String(n).padStart(2, '0')}`);
      if (n >= 1 && n <= 24) store.set('opened', Array.from({ length: n - 1 }, (_, i) => i + 1));
      if (n === 25) store.set('opened', Array.from({ length: 24 }, (_, i) => i + 1));
    }
    go('#/');
  }
};

document.addEventListener('click', ev => {
  const el = ev.target.closest('[data-act]'); if (!el || el.disabled) return;
  const f = acts[el.dataset.act]; if (f) { if (el.tagName !== 'A') ev.preventDefault(); f(el, ev); }
});
document.addEventListener('keydown', ev => { if (ev.key === 'Escape') { if (ui.info) { ui.info = null; render(); } else if (ui.bubble) { ui.bubble = null; render(); } else if (ui.tester) { ui.tester = false; render(); } else if (ui.dialog) { ui.dialog = null; render(); } else if (ui.viewer) { ui.viewer = null; render(); } } });
document.addEventListener('input', ev => { if (ev.target.id === 'bq') bookSearch(ev.target.value); if (ev.target.id === 'cause') { const s = document.getElementById('sugg'); if (s) s.innerHTML = suggHtml(ev.target.value); } });
document.addEventListener('change', async ev => {
  if (ev.target.dataset && ev.target.dataset.cat != null && ev.target.files[0]) {
    const k = +ev.target.dataset.cat, n = +ev.target.dataset.n, d = DAYS[n - 1]; let blob;
    try { blob = await shrink(ev.target.files[0]); } catch (e) { toast("That photo wouldn't open. Try a different one."); return; }
    const repId = ev.target.dataset.rep ? +ev.target.dataset.rep : null, extra = k >= d.cats.length;
    ui.slotBusy = extra ? (repId ? 'x' + repId : 'new') : k; refreshBody();
    const old = mine(n, 'photo').filter(p => (extra ? p.id === repId : p.body.cat === k));
    await send(async () => { const url = await api.upload(blob); for (const p of old) await api.del(me.token, p.id); await api.post(me.token, n, 'photo', { url, cat: k, caption: d.cats[k] || '' }, false); }, 'Added to the mood board');
    ui.slotBusy = null; refreshBody(); return;
  }
  if (ev.target.id !== 'file' || !ev.target.files[0]) return;
  try { const blob = await shrink(ev.target.files[0]); ui.photo = { blob, url: URL.createObjectURL(blob) }; }
  catch (e) { toast("That photo wouldn't open. Try a different one."); return; }
  if (route().a === 'card') refreshBody(); else render();
});
document.addEventListener('submit', async ev => {
  const form = ev.target.closest('[data-form]'); if (!form) return; ev.preventDefault();
  if (form.dataset.form === 'join') {
    const name = val('wname'), word = val('wword'); ui.name = name;
    if (!name) { ui.err = 'Add your first name so friends know who you are.'; return render(); }
    if (!word) { ui.err = `Add the invite word ${HOST_NAME} texted you.`; return render(); }
    ui.busy = true; ui.err = ''; render();
    try { me = await api.join(name, word); store.set('me', me); ui = {}; await load(); render(); }
    catch (e) {
      ui.busy = false;
      ui.err = e.code === 'wrong_word' ? `That isn't the invite word. Check ${HOST_NAME}'s text and try again.`
        : e.code === 'name_taken' ? 'That name is taken. Add your last initial.'
        : e.code === 'bad_name' ? 'Use a first name up to 24 letters.' : "Couldn't open the door. Check your connection and try again.";
      render();
    }
  }
  if (form.dataset.form === 'chat') {
    const text = val('msg'), photo = ui.photo; if (!text && !photo) return;
    const ok = await send(async () => {
      if (photo) { const url = await api.upload(photo.blob); await api.post(me.token, null, 'photo', { url, caption: text }, false); }
      else await api.post(me.token, null, 'chat', { text }, false);
    });
    if (ok) { ui.photo = null; const i = document.getElementById('msg'); if (i) i.value = ''; markSeen('chat'); render(); }
  }
});

// ---------- Start ----------
async function refresh() {
  if (!me || document.hidden) return;
  const before = JSON.stringify(S.posts) + JSON.stringify(S.draw);
  try { await load(); S.offline = false; } catch (e) {}
  if (!me) return render();
  const r = route(), typing = document.activeElement && /INPUT|TEXTAREA/.test(document.activeElement.tagName) && document.activeElement.value;
  if (before !== JSON.stringify(S.posts) + JSON.stringify(S.draw) && !ui.dialog && !ui.viewer && !ui.tester && !ui.bubble && !typing && r.a !== 'card') render();
}
(async () => {
  render();
  if (me) { try { await load(); } catch (e) {} render(); }
  setInterval(refresh, 30000);
  document.addEventListener('visibilitychange', refresh);
})();
