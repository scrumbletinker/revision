/* Safe maths-expression reader for checking algebra answers (no eval).
 * Understands numbers, single-letter variables (xy = x×y), pi/π, √ and sqrt(), ^ powers, ² ³,
 * × ÷ −, brackets and implicit multiplication: 2x, 3(x+1), (x+2)(x−3), 4√3.
 * ExamAlg.compile(text) → function(vars) or null if it can't be read.
 * ExamAlg.same(text, fn, vars) → true if the typed expression equals fn at several random points.
 * UMD so it can be tested in Node.
 */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.ExamAlg = factory();
})(typeof self !== 'undefined' ? self : this, function () {
  function tokenize(src) {
    const s = String(src).replace(/×|·/g, '*').replace(/÷/g, '/').replace(/[−–]/g, '-').replace(/²/g, '^2').replace(/³/g, '^3')
      .replace(/π/g, 'pi').replace(/½/g, '(1/2)').replace(/\s+/g, '');
    const out = [];
    let i = 0;
    while (i < s.length) {
      const c = s[i];
      if (/[0-9.]/.test(c)) { let j = i; while (j < s.length && /[0-9.]/.test(s[j])) j++; const n = Number(s.slice(i, j)); if (!isFinite(n)) return null; out.push({ t: 'num', v: n }); i = j; continue; }
      if (s.startsWith('sqrt', i)) { out.push({ t: 'sqrt' }); i += 4; continue; }
      if (s.startsWith('pi', i)) { out.push({ t: 'num', v: Math.PI }); i += 2; continue; }
      if (/[a-zA-Z]/.test(c)) { out.push({ t: 'var', v: c }); i++; continue; }
      if (c === '√') { out.push({ t: 'sqrt' }); i++; continue; }
      if ('+-*/^()'.includes(c)) { out.push({ t: c }); i++; continue; }
      return null; // unknown character
    }
    return out;
  }

  function compile(src) {
    const tk = tokenize(src);
    if (!tk || !tk.length) return null;
    let p = 0;
    const peek = () => tk[p], take = () => tk[p++];
    const startsFactor = (t) => t && (t.t === 'num' || t.t === 'var' || t.t === '(' || t.t === 'sqrt');
    function expr() {
      let f = term();
      while (peek() && (peek().t === '+' || peek().t === '-')) {
        const op = take().t, a = f, b = term();
        f = op === '+' ? (v) => a(v) + b(v) : (v) => a(v) - b(v);
      }
      return f;
    }
    function term() {
      let f = unary();
      for (;;) {
        const t = peek();
        if (t && (t.t === '*' || t.t === '/')) { take(); const a = f, b = unary(); f = t.t === '*' ? (v) => a(v) * b(v) : (v) => a(v) / b(v); }
        else if (startsFactor(t)) { const a = f, b = power(); f = (v) => a(v) * b(v); }
        else return f;
      }
    }
    function unary() {
      const t = peek();
      if (t && t.t === '-') { take(); const a = unary(); return (v) => -a(v); }
      if (t && t.t === '+') { take(); return unary(); }
      return power();
    }
    function power() {
      const base = atom();
      if (peek() && peek().t === '^') { take(); const e = unary(); return (v) => Math.pow(base(v), e(v)); }
      return base;
    }
    function atom() {
      const t = take();
      if (!t) throw new Error('end');
      if (t.t === 'num') { const n = t.v; return () => n; }
      if (t.t === 'var') { const name = t.v; return (v) => { if (!(name in v)) throw new Error('var ' + name); return v[name]; }; }
      if (t.t === '(') { const e = expr(); if (!peek() || take().t !== ')') throw new Error('bracket'); return e; }
      if (t.t === 'sqrt') { const a = atom(); return (v) => Math.sqrt(a(v)); }
      throw new Error('unexpected');
    }
    try {
      const f = expr();
      if (p !== tk.length) return null;
      return f;
    } catch (e) { return null; }
  }

  /** Compare typed text with the correct function at random points. */
  function same(text, fn, vars) {
    const f = compile(text);
    if (!f) return false;
    vars = vars || ['x'];
    let tested = 0;
    for (let k = 0; k < 40 && tested < 6; k++) {
      const v = {};
      vars.forEach((name) => { v[name] = Math.round((Math.random() * 8 - 3.7) * 1000) / 1000; });
      let a, b;
      try { a = f(v); b = fn(v); } catch (e) { return false; }
      if (!isFinite(b)) continue;
      if (!isFinite(a)) return false;
      if (Math.abs(a - b) > 1e-6 * Math.max(1, Math.abs(b))) return false;
      tested++;
    }
    return tested >= 3;
  }

  /** Value of a constant expression (e.g. "4√3", "5/7", "2pi"), or NaN. */
  function value(text) {
    const f = compile(text);
    if (!f) return NaN;
    try { const r = f({}); return isFinite(r) ? r : NaN; } catch (e) { return NaN; }
  }

  return { compile, same, value };
});
