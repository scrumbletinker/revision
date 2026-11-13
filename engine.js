/* GCSE Revision — shared engine
 * Progress, XP/levels, streaks, spaced repetition (Leitner boxes),
 * timer, sounds, toasts, round summaries and drag-and-drop.
 * Everything is stored in this browser only (localStorage).
 */
(function () {
  'use strict';

  const KEY = 'gcse-revision-v1';
  const DEFAULT = {
    xp: 0, subjects: {}, streak: { count: 0, last: null },
    best: {}, history: {}, boxes: {}, topics: {}, muted: false, rounds: 0
  };

  // ---------- storage ----------
  function load() {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) return Object.assign(JSON.parse(JSON.stringify(DEFAULT)), JSON.parse(raw));
    } catch (e) { /* storage blocked or corrupt */ }
    return JSON.parse(JSON.stringify(DEFAULT));
  }
  let state = load();
  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) { /* ignore */ }
  }
  // pick up changes made in another tab
  window.addEventListener('storage', (e) => { if (e.key === KEY) state = load(); });

  // ---------- dates ----------
  function dateStr(d) {
    const y = d.getFullYear(), m = String(d.getMonth() + 1).padStart(2, '0'), day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
  }
  function today() { return dateStr(new Date()); }
  function addDays(str, n) {
    const [y, m, d] = str.split('-').map(Number);
    return dateStr(new Date(y, m - 1, d + n));
  }

  // ---------- helpers ----------
  const rand = (a, b) => a + Math.floor(Math.random() * (b - a + 1));
  const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
    return a;
  }
  function gcd(a, b) { a = Math.abs(a); b = Math.abs(b); while (b) [a, b] = [b, a % b]; return a; }
  function norm(s) { return String(s).toLowerCase().replace(/[^a-z0-9]/g, ''); }
  function lev(a, b) {
    const dp = Array.from({ length: a.length + 1 }, (_, i) => [i]);
    for (let j = 1; j <= b.length; j++) dp[0][j] = j;
    for (let i = 1; i <= a.length; i++) for (let j = 1; j <= b.length; j++)
      dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    return dp[a.length][b.length];
  }
  /** Forgiving text match: ignores case/punctuation, allows one typo on longer words. */
  function fuzzyEqual(input, target) {
    const a = norm(input), b = norm(target);
    if (!a) return false;
    if (a === b) return true;
    return b.length >= 5 && lev(a, b) <= 1;
  }
  function esc(s) { return String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])); }
  function el(tag, attrs, html) {
    const e = document.createElement(tag);
    if (attrs) for (const k in attrs) { if (k === 'class') e.className = attrs[k]; else e.setAttribute(k, attrs[k]); }
    if (html != null) e.innerHTML = html;
    return e;
  }

  // ---------- XP & levels ----------
  // Level L starts at 50·L·(L−1) XP: 0, 100, 300, 600, 1000 ...
  function levelInfo(xp) {
    let L = 1;
    while (50 * (L + 1) * L <= xp) L++;
    const start = 50 * L * (L - 1), next = 50 * (L + 1) * L;
    return { level: L, into: xp - start, need: next - start, pct: (xp - start) / (next - start) };
  }
  const listeners = [];
  function onChange(fn) { listeners.push(fn); }
  function emit() { listeners.forEach((fn) => { try { fn(state); } catch (e) { console.error(e); } }); }

  function addXP(subject, n) {
    if (!n) return;
    const before = levelInfo(state.subjects[subject] || 0).level;
    state.xp += n;
    state.subjects[subject] = (state.subjects[subject] || 0) + n;
    save();
    const after = levelInfo(state.subjects[subject]).level;
    if (after > before) {
      sound('level');
      toast(`⬆️ Level ${after} in ${subject[0].toUpperCase() + subject.slice(1)}!`);
    }
    emit();
  }

  // ---------- streak ----------
  function streak() {
    const s = state.streak;
    if (!s.last) return 0;
    if (s.last === today() || s.last === addDays(today(), -1)) return s.count;
    return 0;
  }
  function touchStreak() {
    const t = today(), s = state.streak;
    if (s.last === t) return false;
    s.count = s.last === addDays(t, -1) ? s.count + 1 : 1;
    s.last = t;
    save(); emit();
    return true;
  }

  // ---------- personal bests & yesterday target ----------
  function bestScore(aid) { return state.best[aid] || 0; }
  /** Best score on the most recent previous day this aid was played. */
  function lastDayScore(aid) {
    const h = state.history[aid] || {};
    const days = Object.keys(h).filter((d) => d < today()).sort();
    return days.length ? { date: days[days.length - 1], score: h[days[days.length - 1]] } : null;
  }
  function recordScore(aid, score) {
    const prevBest = bestScore(aid);
    if (score > prevBest) state.best[aid] = score;
    const h = state.history[aid] = state.history[aid] || {};
    h[today()] = Math.max(h[today()] || 0, score);
    const days = Object.keys(h).sort();
    while (days.length > 30) delete h[days.shift()];
    state.rounds++;
    save();
    return { newBest: score > prevBest && score > 0, prevBest };
  }

  // ---------- topics (weak-area tracking) ----------
  function topic(id, label, correct) {
    const t = state.topics[id] = state.topics[id] || { label, right: 0, wrong: 0, recent: [] };
    t.label = label;
    if (correct) t.right++; else t.wrong++;
    t.recent = (t.recent || []).concat(correct ? 1 : 0).slice(-10);
    save();
  }
  /** Accuracy over the last 10 attempts (0..1), or null if not tried. */
  function topicAccuracy(id) {
    const t = state.topics[id];
    if (!t || !t.recent || !t.recent.length) return null;
    return t.recent.reduce((a, b) => a + b, 0) / t.recent.length;
  }
  function weakTopics(prefix, limit) {
    return Object.keys(state.topics)
      .filter((id) => !prefix || id.startsWith(prefix))
      .map((id) => ({ id, label: state.topics[id].label, acc: topicAccuracy(id), n: state.topics[id].recent.length }))
      .filter((t) => t.n >= 3 && t.acc < 0.7)
      .sort((a, b) => a.acc - b.acc)
      .slice(0, limit || 5);
  }

  // ---------- spaced repetition (Leitner) ----------
  const INTERVALS = [0, 0, 1, 3, 7, 14]; // days until next review, by box 1..5
  function grade(id, correct) {
    const b = state.boxes[id] || { box: 1, due: today(), seen: 0, wrong: 0 };
    b.box = correct ? Math.min(5, b.box + 1) : 1;
    b.due = addDays(today(), INTERVALS[b.box]);
    b.seen++;
    if (!correct) b.wrong++;
    state.boxes[id] = b;
    save();
  }
  function box(id) { return state.boxes[id] || null; }
  /** True if this item was got wrong last time (worth a revenge bonus). */
  function wasWrong(id) { const b = state.boxes[id]; return !!(b && b.box === 1 && b.wrong > 0); }
  function isDue(id) { const b = state.boxes[id]; return !!(b && b.due <= today()); }
  function dueCount(ids) {
    const t = today();
    return (ids || Object.keys(state.boxes)).filter((id) => state.boxes[id] && state.boxes[id].due <= t).length;
  }
  /** Choose n items: overdue first (lowest box first), then unseen, then the rest. */
  function pickItems(ids, n) {
    const t = today();
    const due = [], fresh = [], later = [];
    shuffle(ids).forEach((id) => {
      const b = state.boxes[id];
      if (!b) fresh.push(id);
      else if (b.due <= t) due.push(id);
      else later.push(id);
    });
    due.sort((a, b) => state.boxes[a].box - state.boxes[b].box);
    later.sort((a, b) => (state.boxes[a].due < state.boxes[b].due ? -1 : 1));
    return shuffle(due.concat(fresh, later).slice(0, n));
  }

  // ---------- sound ----------
  let ctx = null;
  function tone(freq, start, dur, type, vol) {
    const o = ctx.createOscillator(), g = ctx.createGain();
    o.type = type || 'sine'; o.frequency.value = freq;
    g.gain.setValueAtTime(0.0001, ctx.currentTime + start);
    g.gain.exponentialRampToValueAtTime(vol || 0.15, ctx.currentTime + start + 0.01);
    g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + start + dur);
    o.connect(g).connect(ctx.destination);
    o.start(ctx.currentTime + start); o.stop(ctx.currentTime + start + dur + 0.05);
  }
  function sound(kind) {
    if (state.muted) return;
    try {
      ctx = ctx || new (window.AudioContext || window.webkitAudioContext)();
      if (ctx.state === 'suspended') ctx.resume();
      if (kind === 'good') { tone(660, 0, 0.12); tone(990, 0.08, 0.16); }
      else if (kind === 'bad') { tone(180, 0, 0.25, 'square', 0.06); }
      else if (kind === 'level') { [523, 659, 784, 1047].forEach((f, i) => tone(f, i * 0.09, 0.2, 'triangle')); }
      else if (kind === 'end') { tone(784, 0, 0.15, 'triangle'); tone(523, 0.15, 0.3, 'triangle'); }
      else if (kind === 'tick') { tone(1200, 0, 0.04, 'sine', 0.05); }
    } catch (e) { /* no audio */ }
  }
  function toggleMute() { state.muted = !state.muted; save(); emit(); return state.muted; }

  // ---------- toast ----------
  function toast(msg, ms) {
    let host = document.getElementById('toast-host');
    if (!host) { host = el('div', { id: 'toast-host' }); document.body.appendChild(host); }
    const t = el('div', { class: 'toast' }, esc(msg));
    host.appendChild(t);
    setTimeout(() => t.remove(), ms || 2200);
  }

  // ---------- header ----------
  function mountHeader(opts) {
    document.body.dataset.subject = opts.subject;
    const bar = el('header', { class: 'topbar' });
    bar.innerHTML = `
      <a class="back" href="${opts.home || '../index.html'}" aria-label="Back to hub">← Hub</a>
      <div class="title">${esc(opts.title)}</div>
      <span class="chip" data-streak title="Day streak">🔥 0</span>
      <span class="chip" data-xp title="Level in this subject">Lv 1</span>
      <button class="iconbtn" data-mute aria-label="Toggle sound">🔊</button>`;
    document.body.prepend(bar);
    const xpChip = bar.querySelector('[data-xp]');
    let lastXP = state.subjects[opts.subject] || 0;
    function render() {
      const xp = state.subjects[opts.subject] || 0;
      const L = levelInfo(xp);
      xpChip.innerHTML = `Lv ${L.level}<span class="xpd"> · ${L.into}/${L.need} XP</span>`;
      if (xp !== lastXP) { xpChip.classList.remove('pulse'); void xpChip.offsetWidth; xpChip.classList.add('pulse'); lastXP = xp; }
      bar.querySelector('[data-streak]').textContent = `🔥 ${streak()}`;
      bar.querySelector('[data-mute]').textContent = state.muted ? '🔇' : '🔊';
    }
    bar.querySelector('[data-mute]').addEventListener('click', toggleMute);
    onChange(render);
    render();
  }

  // ---------- timer ----------
  function timer(seconds, onTick, onEnd) {
    let remaining = seconds * 1000, last = Date.now(), paused = false, done = false;
    const id = setInterval(() => {
      const now = Date.now();
      if (!paused && !done) {
        remaining -= now - last;
        if (remaining <= 0) { remaining = 0; done = true; clearInterval(id); onTick && onTick(0, 0); onEnd && onEnd(); return; }
        onTick && onTick(remaining / 1000, remaining / (seconds * 1000));
      }
      last = now;
    }, 200);
    return {
      pause() { paused = true; },
      resume() { paused = false; last = Date.now(); },
      stop() { done = true; clearInterval(id); },
      get left() { return remaining / 1000; }
    };
  }

  // ---------- round summary ----------
  /**
   * opts: { aid, subject, score, correct, total, xp, mistakes:[{q, a, why}], onAgain, extra }
   */
  function summary(opts) {
    sound('end');
    const target = lastDayScore(opts.aid);
    const prevBestBefore = bestScore(opts.aid);
    const res = recordScore(opts.aid, opts.score);
    const streakStarted = touchStreak();
    if (opts.xp) addXP(opts.subject, opts.xp);
    const acc = opts.total ? Math.round(100 * opts.correct / opts.total) : 0;
    let vsLine = '';
    if (target) {
      vsLine = opts.score > target.score
        ? `✅ You beat your last session (${target.score}).`
        : `🎯 Last session you scored ${target.score}. Go again to beat it!`;
    }
    const ov = el('div', { class: 'overlay' });
    ov.innerHTML = `
      <div class="panel" role="dialog" aria-label="Round summary">
        <div class="kicker">Round complete</div>
        <div class="row" style="align-items:flex-end;margin:6px 0 4px">
          <div class="bigscore">${opts.score}</div><div class="muted">points</div>
          <div class="spacer"></div>
          ${res.newBest ? '<span class="badge">🏆 New personal best!</span>' : `<span class="muted small">Best: ${Math.max(prevBestBefore, opts.score)}</span>`}
        </div>
        ${vsLine ? `<p class="small">${vsLine}</p>` : ''}
        <div class="stats">
          <div class="stat"><b>${opts.correct}/${opts.total}</b><span class="small muted">correct</span></div>
          <div class="stat"><b>${acc}%</b><span class="small muted">accuracy</span></div>
          <div class="stat"><b>+${opts.xp || 0}</b><span class="small muted">XP</span></div>
        </div>
        ${streakStarted ? `<p class="small">🔥 Streak: <b>${streak()} day${streak() === 1 ? '' : 's'}</b>. Come back tomorrow to keep it going.</p>` : ''}
        ${opts.extra || ''}
        ${opts.mistakes && opts.mistakes.length ? `<h3 style="margin-top:12px">Learn from these</h3>
          <p class="small muted" style="margin-top:-4px">These will come back sooner next time.</p>
          <ul class="mistakes">${opts.mistakes.slice(0, 8).map((m) => `<li><b>${m.q}</b><br>✔ ${m.a}${m.why ? `<br><span class="muted">${m.why}</span>` : ''}</li>`).join('')}</ul>` : ''}
        <div class="row" style="margin-top:16px">
          <button class="btn" data-again>One more round ↻</button>
          <a class="btn secondary" href="${opts.home || '../index.html'}" style="text-decoration:none">Hub</a>
        </div>
      </div>`;
    document.body.appendChild(ov);
    const again = ov.querySelector('[data-again]');
    again.focus();
    again.addEventListener('click', () => { ov.remove(); opts.onAgain && opts.onAgain(); });
  }

  // ---------- drag & drop (mouse + touch, with tap-to-place fallback) ----------
  /**
   * dragDrop({ container, itemSelector, targetSelector, onDrop(itemEl, targetEl) })
   * Drag an item onto a target, or tap an item then tap a target.
   */
  function dragDrop(opts) {
    const root = opts.container || document;
    let selected = null, ghost = null, dragItem = null, startX = 0, startY = 0, dragging = false, hoverT = null;

    function targetAt(x, y) {
      const hit = document.elementFromPoint(x, y);
      return hit ? hit.closest(opts.targetSelector) : null;
    }
    function clearSel() { if (selected) selected.classList.remove('selected'); selected = null; }

    root.addEventListener('pointerdown', (e) => {
      const item = e.target.closest(opts.itemSelector);
      if (!item || item.dataset.locked) return;
      dragItem = item; startX = e.clientX; startY = e.clientY; dragging = false;
      item.setPointerCapture && item.setPointerCapture(e.pointerId);
    });
    root.addEventListener('pointermove', (e) => {
      if (!dragItem) return;
      if (!dragging && Math.hypot(e.clientX - startX, e.clientY - startY) > 6) {
        dragging = true; clearSel();
        ghost = dragItem.cloneNode(true);
        ghost.classList.add('drag-ghost');
        ghost.style.width = dragItem.offsetWidth + 'px';
        document.body.appendChild(ghost);
        dragItem.style.opacity = '.35';
      }
      if (dragging) {
        ghost.style.left = e.clientX + 'px'; ghost.style.top = e.clientY + 'px';
        const t = targetAt(e.clientX, e.clientY);
        if (t !== hoverT) { hoverT && hoverT.classList.remove('drop-hover'); hoverT = t; t && t.classList.add('drop-hover'); }
        e.preventDefault();
      }
    });
    function endDrag(e) {
      if (!dragItem) return;
      const item = dragItem; dragItem = null;
      if (dragging) {
        ghost && ghost.remove(); ghost = null; item.style.opacity = '';
        hoverT && hoverT.classList.remove('drop-hover'); hoverT = null;
        const t = e.type === 'pointerup' ? targetAt(e.clientX, e.clientY) : null;
        if (t) opts.onDrop(item, t);
      } else if (e.type === 'pointerup') {
        // tap: select / deselect
        if (selected === item) clearSel();
        else { clearSel(); selected = item; item.classList.add('selected'); }
      }
      dragging = false;
    }
    root.addEventListener('pointerup', endDrag);
    root.addEventListener('pointercancel', endDrag);
    // tap on a target while an item is selected
    root.addEventListener('click', (e) => {
      if (!selected) return;
      const t = e.target.closest(opts.targetSelector);
      if (t) { const item = selected; clearSel(); opts.onDrop(item, t); }
    });
    return { clear: clearSel };
  }

  window.GCSE = {
    get state() { return state; },
    save, today, addDays, rand, pick, shuffle, gcd, fuzzyEqual, esc, el,
    levelInfo, addXP, onChange, streak, touchStreak,
    bestScore, lastDayScore, recordScore,
    topic, topicAccuracy, weakTopics,
    grade, box, wasWrong, isDue, dueCount, pickItems,
    sound, toggleMute, toast, mountHeader, timer, summary, dragDrop
  };
})();
