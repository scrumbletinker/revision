/* Exam-style practice engine, shared by Physics (and later Maths).
 * Page provides: window.EXAM = { aid, subject, title, prefix, topics: {id: {name, paper}}, papers: {1: 'Paper 1', ...},
 *   sheet: html (optional equation/formula sheet), questions: [...] }
 * Question: { id, topic, paper, title, intro (html), parts: [part] }
 * Part types (t):
 *   num   { q, marks, answer, unit, tol?, range?, ms: ['M1 …', 'A1 …'], working: ['…'] }   auto-marked; method marks self-awarded if wrong
 *   mcq   { q, marks, options: [...], answer: 'exact option text', why? }
 *   multi { q, marks, options, answers: [...] }  tick exactly answers.length boxes; 1 mark each, wrong ticks cancel right ones
 *   text  { q, marks, points: ['…'], notes?: 'allow …' }  self-marked against marking points
 *   lor   { q, marks: 6, indicative: ['…'], levels?: [L3, L2, L1] }  level-of-response, self-marked
 */
(function () {
  const X = window.EXAM;
  const $ = (id) => document.getElementById(id);
  const { esc, shuffle } = GCSE;
  GCSE.mountHeader({ subject: X.subject, title: X.title });

  const qkey = (q) => `${X.prefix}.${q.id}`;
  const pkey = (q, i) => `${X.prefix}.${q.id}.${i}`;
  const qMarks = (q) => q.parts.reduce((a, p) => a + p.marks, 0);
  const LEVELS = [
    'Level 3 (5–6 marks): a detailed, coherent answer. Key points are covered and linked together logically.',
    'Level 2 (3–4 marks): several relevant points, with some links, but not fully detailed or logically ordered.',
    'Level 1 (1–2 marks): a few relevant points, but they are not linked and the answer lacks detail.'
  ];

  let mode = 'topic', topics = [], paperSel = '1', s = null;
  try {
    const saved = JSON.parse(localStorage.getItem(X.prefix + '-prefs') || '{}');
    if (saved.mode) mode = saved.mode;
    if (Array.isArray(saved.topics)) topics = saved.topics.filter((t) => X.topics[t]);
    if (saved.paper && X.papers[saved.paper]) paperSel = saved.paper;
  } catch (e) {}
  if (!topics.length) topics = [Object.keys(X.topics)[0]];
  const savePrefs = () => { try { localStorage.setItem(X.prefix + '-prefs', JSON.stringify({ mode, topics, paper: paperSel })); } catch (e) {} };

  // ---------- start screen ----------
  function wrongParts() {
    const out = [];
    X.questions.forEach((q) => q.parts.forEach((p, i) => { const k = pkey(q, i); if (GCSE.wasWrong(k) || (GCSE.box(k) && GCSE.isDue(k))) out.push(q); }));
    return [...new Set(out)];
  }
  function renderStart() {
    const best = GCSE.bestScore(X.aid), last = GCSE.lastDayScore(X.aid);
    $('targets').innerHTML = `<span class="chip">🏆 Best: ${best || '-'}</span>` + (last ? `<span class="chip">🎯 Beat last time: ${last.score}</span>` : '');
    $('modes').innerHTML = [['topic', '🎯 By topic'], ['mock', '⏱️ Mini mock'], ['redo', '🔁 Redo mistakes']]
      .map(([id, n]) => `<button class="pill ${mode === id ? 'on' : ''}" data-mode="${id}">${n}</button>`).join('');
    const redo = wrongParts().length;
    let html = '';
    if (mode === 'topic') {
      html = Object.entries(X.papers).map(([pid, pname]) => {
        const ts = Object.entries(X.topics).filter(([, t]) => String(t.paper) === pid);
        return `<div class="small muted" style="margin:10px 0 6px;font-weight:800">${esc(pname)}</div><div class="pills">${ts.map(([id, t]) => {
          const n = X.questions.filter((q) => q.topic === id).length;
          const acc = GCSE.topicAccuracy(`${X.subject}.exam.${id}`);
          return `<button class="pill ${topics.includes(id) ? 'on' : ''}" data-topic="${id}">${esc(t.name)} <span class="small">(${n})</span>${acc !== null && acc < 0.6 ? ' <span class="tag">weak</span>' : ''}</button>`;
        }).join('')}</div>`;
      }).join('') + `<p class="small muted">3 questions from the topics you pick, about 25–30 marks.</p>`;
    } else if (mode === 'mock') {
      html = `<div class="pills" style="margin-top:8px">${Object.entries(X.papers).map(([pid, pname]) => `<button class="pill ${paperSel === pid ? 'on' : ''}" data-paper="${pid}">${esc(pname)}</button>`).join('')}</div>
        <p class="small muted">About 40 marks in 45 minutes, mixing topics from that paper, like a shortened real paper. Work on paper as you would in the exam.</p>`;
    } else {
      html = `<p class="small muted" style="margin-top:8px">${redo ? `${redo} question${redo === 1 ? '' : 's'} with parts you dropped marks on. Get them right to clear them.` : 'Nothing to redo yet. Questions where you drop marks will appear here.'}</p>`;
    }
    $('opts').innerHTML = html;
    $('go').disabled = mode === 'redo' && !redo;
  }
  document.addEventListener('click', (e) => {
    const b = e.target.closest('#modes .pill, #opts .pill');
    if (!b) return;
    if (b.dataset.mode) mode = b.dataset.mode;
    if (b.dataset.paper) paperSel = b.dataset.paper;
    if (b.dataset.topic) {
      const id = b.dataset.topic;
      if (topics.includes(id)) { if (topics.length > 1) topics = topics.filter((t) => t !== id); else GCSE.toast('Pick at least one topic'); }
      else topics.push(id);
    }
    savePrefs(); renderStart();
  });

  // ---------- equation sheet ----------
  if (X.sheet) {
    $('sheetbtn').classList.remove('hidden');
    $('sheetbtn').addEventListener('click', () => {
      const ov = GCSE.el('div', { class: 'overlay' });
      ov.innerHTML = `<div class="panel" style="max-width:560px;max-height:85vh;overflow:auto">${X.sheet}<div class="row" style="margin-top:12px"><button class="btn" id="sheetclose">Close</button></div></div>`;
      document.body.appendChild(ov);
      ov.addEventListener('click', (ev) => { if (ev.target === ov || ev.target.id === 'sheetclose') ov.remove(); });
    });
  }

  // ---------- choosing questions ----------
  function pickQuestions() {
    if (mode === 'redo') return shuffle(wrongParts()).slice(0, 3);
    const pool = mode === 'mock' ? X.questions.filter((q) => String(q.paper) === paperSel) : X.questions.filter((q) => topics.includes(q.topic));
    // new questions first, then ones due for review, then the rest; anything done today goes last
    const today = GCSE.today(), done = lastDone();
    const rank = (q) => (done[q.id] === today ? 3 : !GCSE.box(qkey(q)) ? 0 : GCSE.isDue(qkey(q)) ? 1 : 2);
    const order = shuffle(pool).sort((a, b) => rank(a) - rank(b));
    if (mode === 'topic') return order.slice(0, 3);
    // mock: aim for ~40 marks, spreading topics
    const out = [], used = {};
    let total = 0;
    for (const pass of [0, 1]) {
      for (const q of order) {
        if (out.includes(q) || total >= 38) continue;
        if (pass === 0 && used[q.topic]) continue;
        out.push(q); used[q.topic] = 1; total += qMarks(q);
      }
    }
    return out;
  }

  // ---------- session ----------
  function start() {
    const qs = pickQuestions();
    if (!qs.length) { GCSE.toast('No questions to show'); return; }
    s = { qs, qi: 0, got: 0, avail: qs.reduce((a, q) => a + qMarks(q), 0), mistakes: [], mock: mode === 'mock', t0: Date.now(), timeUp: false };
    $('start').classList.add('hidden'); $('game').classList.remove('hidden');
    if (s.mock) {
      const secs = 45 * 60;
      s.timer = GCSE.timer(secs, (left) => {
        const m = Math.floor(left / 60), sec = Math.floor(left % 60);
        $('clock').textContent = `⏱️ ${m}:${String(sec).padStart(2, '0')}`;
        $('clock').classList.toggle('low', left < 300);
      }, () => { s.timeUp = true; GCSE.toast("⏰ Time's up! Finish this question, then see your score."); });
      $('clock').classList.remove('hidden');
    } else $('clock').classList.add('hidden');
    showQuestion();
  }
  function hud() {
    $('prog').textContent = `Question ${s.qi + 1} of ${s.qs.length}`;
    $('marks').textContent = `${s.got} / ${s.avail} marks`;
  }

  function showQuestion() {
    const q = s.qs[s.qi];
    s.q = q; s.pi = 0; s.qgot = 0;
    hud();
    const t = X.topics[q.topic];
    $('qhead').innerHTML = `<div class="kicker">${esc(X.papers[q.paper])} · ${esc(t.name)} · ${qMarks(q)} marks</div><h2 style="margin:4px 0 10px">${esc(q.title)}</h2>`;
    $('intro').innerHTML = q.intro || '';
    $('parts').innerHTML = '';
    $('qnext').innerHTML = '';
    window.scrollTo(0, 0);
    showPart();
  }

  function label(i) { return `${String(s.qi + 1).padStart(2, '0')}.${i + 1}`; }

  function showPart() {
    const q = s.q, i = s.pi, p = q.parts[i];
    const box = GCSE.el('div', { class: 'part', id: 'part' + i });
    box.innerHTML = `${p.pre ? `<div class="pre">${p.pre}</div>` : ''}<div class="pq"><span class="plabel">${label(i)}</span><div class="ptext">${p.q}</div><span class="pmarks">[${p.marks} mark${p.marks === 1 ? '' : 's'}]</span></div><div class="pans"></div><div class="pfb"></div>`;
    $('parts').appendChild(box);
    const ans = box.querySelector('.pans');
    ({ num: partNum, mcq: partMcq, multi: partMulti, text: partText, lor: partLor })[p.t](p, ans, box);
    if (i > 0) box.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function award(p, box, got, msg, detailHtml) {
    const q = s.q, i = s.pi;
    got = Math.max(0, Math.min(p.marks, got));
    s.got += got; s.qgot += got;
    const full = got === p.marks;
    GCSE.grade(pkey(q, i), full);
    GCSE.sound(full ? 'good' : got ? 'tick' : 'bad');
    if (!full) s.mistakes.push({ q: `${esc(q.title)} ${label(i)}`, a: `${got}/${p.marks}`, why: p.summary ? esc(p.summary) : '' });
    box.querySelector('.pfb').innerHTML = `<div class="feedback ${full ? 'good' : 'bad'}"><b>${got}/${p.marks}</b> ${msg || ''}${detailHtml ? `<div class="why">${detailHtml}</div>` : ''}</div>`;
    hud();
    s.pi++;
    if (s.pi < q.parts.length) {
      box.querySelector('.pfb').insertAdjacentHTML('beforeend', `<div class="row" style="margin-top:8px"><button class="btn secondary pnext">Next part ↓</button></div>`);
      const b = box.querySelector('.pnext');
      b.focus({ preventScroll: true });
      b.addEventListener('click', () => { b.parentElement.remove(); showPart(); });
    } else finishQuestion();
  }

  function lastDone() { try { return JSON.parse(localStorage.getItem(X.prefix + '-done') || '{}'); } catch (e) { return {}; } }
  function markDone(id) { const d = lastDone(); d[id] = GCSE.today(); try { localStorage.setItem(X.prefix + '-done', JSON.stringify(d)); } catch (e) {} }

  function finishQuestion() {
    const q = s.q, m = qMarks(q), pct = s.qgot / m;
    GCSE.grade(qkey(q), pct >= 0.75);
    markDone(q.id);
    GCSE.topic(`${X.subject}.exam.${q.topic}`, `${X.title}: ${X.topics[q.topic].name}`, pct >= 0.6);
    const last = s.qi + 1 >= s.qs.length || (s.mock && s.timeUp);
    $('qnext').innerHTML = `<div class="card qsum"><b>${s.qgot}/${m}</b> on this question (${Math.round(pct * 100)}%)
      <div class="row" style="margin-top:10px"><button class="btn" id="nextq">${last ? 'See results' : 'Next question →'}</button></div></div>`;
    $('nextq').focus({ preventScroll: true });
    $('nextq').addEventListener('click', () => { if (last) end(); else { s.qi++; showQuestion(); } });
  }

  // ---------- part types ----------
  function parseNum(v) {
    let t = String(v).trim().replace(/,/g, '').replace(/\s+/g, '').replace(/[−–]/g, '-');
    t = t.replace(/(×|x|\*)10\^?/i, 'e').replace(/[a-zA-Zµμ°Ω/²³%]+$/, '');
    const n = Number(t);
    return t === '' || !isFinite(n) ? NaN : n;
  }
  function numOk(p, v) {
    if (isNaN(v)) return false;
    if (p.range) return v >= p.range[0] - 1e-12 && v <= p.range[1] + 1e-12;
    const tol = p.tol === undefined ? 0.02 : p.tol;
    return [p.answer].concat(p.alt || []).some((a) => Math.abs(v - a) <= Math.abs(a) * tol + 1e-12);
  }
  const fmt = (x) => { const r = Number(Number(x).toPrecision(4)); return Math.abs(r) >= 1e6 || (Math.abs(r) < 1e-3 && r !== 0) ? r.toExponential(2).replace('e', ' × 10^').replace('+', '') : String(r); };

  function partNum(p, ans, box) {
    ans.innerHTML = `<form class="ansrow" autocomplete="off"><input class="answer" inputmode="decimal" placeholder="Answer"><span class="unit">${p.unit || ''}</span><button class="btn" style="flex:none">✓</button></form>
      <div class="small muted" style="margin-top:6px">Standard form: type 3.2e5 or 3.2x10^5.</div>`;
    const f = ans.querySelector('form'), inp = ans.querySelector('input');
    if (s.pi > 0) inp.focus({ preventScroll: true }); else inp.focus();
    f.addEventListener('submit', (e) => {
      e.preventDefault();
      const v = parseNum(inp.value);
      if (isNaN(v)) { GCSE.toast('Type a number'); return; }
      inp.disabled = true; f.querySelector('button').disabled = true;
      const work = `<b>Mark scheme</b><ul class="ms">${p.ms.map((m) => `<li>${m}</li>`).join('')}</ul>${p.working ? `<b>Working</b><ol class="work">${p.working.map((w) => `<li>${w}</li>`).join('')}</ol>` : ''}`;
      const shown = p.range ? `${fmt(p.answer)} (anything from ${fmt(p.range[0])} to ${fmt(p.range[1])})` : fmt(p.answer);
      if (numOk(p, v)) { award(p, box, p.marks, 'Correct!', work); return; }
      if (p.marks === 1) { award(p, box, 0, `The answer is ${shown} ${p.unit || ''}.`, work); return; }
      // wrong answer: let them claim method marks, like a real examiner would
      const methods = p.ms.filter((m) => !/^A\d/.test(m.replace(/<[^>]+>/g, '')));
      const cap = p.marks - 1;
      box.querySelector('.pfb').innerHTML = `<div class="feedback bad">Not quite: the answer is <b>${shown} ${p.unit || ''}</b>.
        <div class="why">${work}<p style="margin:8px 0 4px"><b>Tick any method marks your working earned</b> (up to ${cap}):</p>
        <div class="points">${methods.map((m, n) => `<label><input type="checkbox" data-n="${n}"> <span>${m}</span></label>`).join('')}</div>
        <button class="btn" type="button" id="claim">Done</button></div></div>`;
      box.querySelector('#claim').addEventListener('click', () => {
        const ticks = box.querySelectorAll('.points input:checked').length;
        award(p, box, Math.min(cap, ticks), `Answer: ${shown} ${p.unit || ''}. Method marks claimed.`, work);
      });
    });
  }

  function partMcq(p, ans, box) {
    const opts = p.keepOrder ? p.options.slice() : shuffle(p.options.slice());
    ans.innerHTML = `<div class="choices one">${opts.map((o) => `<button class="choice">${o}</button>`).join('')}</div>`;
    const wrap = ans.firstElementChild;
    wrap.addEventListener('click', (e) => {
      const b = e.target.closest('.choice'); if (!b || wrap.dataset.done) return;
      wrap.dataset.done = '1';
      const idx = [...wrap.children].indexOf(b), ok = opts[idx] === p.answer;
      [...wrap.children].forEach((c, n) => { c.disabled = true; if (opts[n] === p.answer) c.classList.add('correct'); });
      if (!ok) b.classList.add('wrong');
      award(p, box, ok ? p.marks : 0, ok ? 'Correct!' : '', p.why || '');
    });
  }

  function partMulti(p, ans, box) {
    const opts = shuffle(p.options.slice()), need = p.answers.length;
    ans.innerHTML = `<div class="small muted" style="margin-bottom:6px">Tick <b>${need}</b> boxes.</div><div class="choices one ticks">${opts.map((o) => `<button class="choice" type="button"><span class="tickbox"></span>${o}</button>`).join('')}</div>
      <div class="row" style="margin-top:8px"><button class="btn" type="button">Check</button></div>`;
    const wrap = ans.querySelector('.ticks'), go = ans.querySelector('.btn');
    wrap.addEventListener('click', (e) => { const b = e.target.closest('.choice'); if (b && !b.disabled) b.classList.toggle('sel'); });
    go.addEventListener('click', () => {
      const sel = [...wrap.children].map((c, n) => (c.classList.contains('sel') ? opts[n] : null)).filter((x) => x !== null);
      if (sel.length !== need) { GCSE.toast(`Tick exactly ${need} boxes`); return; }
      go.remove();
      const right = sel.filter((o) => p.answers.includes(o)).length, wrong = sel.length - right;
      [...wrap.children].forEach((c, n) => { c.disabled = true; if (p.answers.includes(opts[n])) c.classList.add('correct'); else if (c.classList.contains('sel')) c.classList.add('wrong'); });
      const got = Math.round(Math.max(0, right - wrong) * p.marks / need);
      award(p, box, got, got === p.marks ? 'Correct!' : '', p.why || '');
    });
  }

  function partText(p, ans, box) {
    ans.innerHTML = `<textarea placeholder="Write your answer…"></textarea><div class="row" style="margin-top:8px"><button class="btn" type="button">Mark it</button></div>`;
    const ta = ans.querySelector('textarea'), go = ans.querySelector('.btn');
    go.addEventListener('click', () => {
      if (ta.value.trim().length < 3) { GCSE.toast('Have a go first: write something!'); return; }
      ta.disabled = true; go.remove();
      ans.insertAdjacentHTML('beforeend', `<div class="msbox"><b>Mark scheme</b>: tick each point you made (max ${p.marks})
        <div class="points">${p.points.map((pt, n) => `<label><input type="checkbox" data-n="${n}"> <span>${pt}</span></label>`).join('')}</div>
        ${p.notes ? `<div class="small muted" style="margin:-2px 0 8px">${p.notes}</div>` : ''}<button class="btn" type="button">Done</button></div>`);
      ans.querySelector('.msbox .btn').addEventListener('click', (e) => {
        e.target.remove();
        ans.querySelectorAll('.msbox input').forEach((c) => { c.disabled = true; });
        const ticks = ans.querySelectorAll('.msbox input:checked').length;
        award(p, box, ticks, ticks >= p.marks ? 'Full marks.' : 'Compare your answer with the points you missed.', '');
      });
    });
  }

  function partLor(p, ans, box) {
    const levels = p.levels || LEVELS;
    ans.innerHTML = `<div class="tip" style="margin-bottom:8px"><b>6-mark question:</b> plan first. Aim for 5 or 6 linked points in a logical order.</div>
      <textarea style="min-height:160px" placeholder="Write your answer…"></textarea><div class="row" style="margin-top:8px"><button class="btn" type="button">Mark it</button></div>`;
    const ta = ans.querySelector('textarea'), go = ans.querySelector('.btn');
    go.addEventListener('click', () => {
      if (ta.value.trim().length < 20) { GCSE.toast('Write a proper answer first: a few sentences at least.'); return; }
      ta.disabled = true; go.remove();
      ans.insertAdjacentHTML('beforeend', `<div class="msbox"><b>Indicative content</b> (points a top answer might include):
        <ul class="ms">${p.indicative.map((x) => `<li>${x}</li>`).join('')}</ul>
        <b>Levels</b><ul class="ms">${levels.map((l) => `<li>${l}</li>`).join('')}</ul>
        <p style="margin:8px 0 6px"><b>Be your own examiner.</b> Pick a level, then the mark within it:</p>
        <div class="lvlbtns">${[0, 1, 2, 3, 4, 5, 6].map((n) => `<button class="choice" type="button" data-n="${n}">${n}</button>`).join('')}</div></div>`);
      ans.querySelector('.lvlbtns').addEventListener('click', (e) => {
        const b = e.target.closest('.choice'); if (!b || b.parentElement.dataset.done) return;
        b.parentElement.dataset.done = '1';
        [...b.parentElement.children].forEach((c) => { c.disabled = true; });
        b.classList.add('sel');
        const n = +b.dataset.n;
        award(p, box, n, n >= 5 ? 'Level 3: excellent.' : n >= 3 ? 'Level 2. To reach Level 3, cover more points and link them in a clear order.' : 'Level 1. Re-read the indicative content and try planning with bullet points first.', '');
      });
    });
  }

  function end() {
    if (s.timer) s.timer.stop();
    const mins = Math.round((Date.now() - s.t0) / 60000);
    const pct = s.avail ? Math.round(100 * s.got / s.avail) : 0;
    GCSE.summary({ aid: X.aid, subject: X.subject, score: s.got * 10, correct: s.got, total: s.avail, xp: s.got * 2 + 5, mistakes: s.mistakes,
      extra: `<p class="small muted" style="margin:6px 0 0">${s.got} out of ${s.avail} marks (${pct}%) in ${mins} minute${mins === 1 ? '' : 's'}. "Correct" above counts marks.</p>`,
      onAgain: () => { $('game').classList.add('hidden'); $('start').classList.remove('hidden'); renderStart(); } });
  }

  $('go').addEventListener('click', start);
  renderStart();
})();
