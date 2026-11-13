/* Formula parsing and equation solving for Equation Balancer (browser + Node). */
(function (root) {
  'use strict';
  /** "Ca(OH)2" -> { Ca: 1, O: 2, H: 2 } */
  function parseFormula(f) {
    let i = 0;
    function group() {
      const counts = {};
      while (i < f.length && f[i] !== ')') {
        let part;
        if (f[i] === '(') { i++; part = group(); i++; }
        else {
          const m = f.slice(i).match(/^[A-Z][a-z]?/);
          if (!m) throw new Error('Bad formula ' + f);
          i += m[0].length; part = { [m[0]]: 1 };
        }
        const n = f.slice(i).match(/^\d+/);
        const k = n ? parseInt(n[0], 10) : 1;
        if (n) i += n[0].length;
        for (const el in part) counts[el] = (counts[el] || 0) + part[el] * k;
      }
      return counts;
    }
    return group();
  }
  function parseEquation(eq) {
    const [l, r] = eq.split('->').map((s) => s.split('+').map((x) => x.trim()));
    return { left: l, right: r, all: l.concat(r), atoms: l.concat(r).map(parseFormula) };
  }
  /** Atom totals for each side given coefficients. */
  function tally(p, coefs) {
    const L = {}, R = {};
    p.atoms.forEach((a, idx) => {
      const side = idx < p.left.length ? L : R;
      for (const el in a) side[el] = (side[el] || 0) + a[el] * coefs[idx];
    });
    const els = [];
    p.atoms.forEach((a) => Object.keys(a).forEach((e) => { if (!els.includes(e)) els.push(e); }));
    return els.map((e) => ({ el: e, left: L[e] || 0, right: R[e] || 0 }));
  }
  const gcd = (a, b) => { while (b) [a, b] = [b, a % b]; return a; };
  function isBalanced(p, coefs) { return tally(p, coefs).every((t) => t.left === t.right); }
  function isLowest(coefs) { return coefs.reduce(gcd) === 1; }
  /** Brute-force the smallest solution with coefficients 1..max. */
  function solve(p, max) {
    max = max || 9;
    const n = p.all.length, c = new Array(n).fill(1);
    let best = null, bestSum = Infinity;
    (function rec(i) {
      if (i === n) {
        if (isBalanced(p, c) && isLowest(c)) { const s = c.reduce((a, b) => a + b, 0); if (s < bestSum) { bestSum = s; best = c.slice(); } }
        return;
      }
      for (let k = 1; k <= max; k++) { c[i] = k; rec(i + 1); }
      c[i] = 1;
    })(0);
    return best;
  }
  /** HTML with subscripts: Ca(OH)2 -> Ca(OH)<sub>2</sub> */
  function formulaHTML(f) { return f.replace(/(\d+)/g, '<sub>$1</sub>'); }
  const api = { parseFormula, parseEquation, tally, isBalanced, isLowest, solve, formulaHTML };
  if (typeof module !== 'undefined' && module.exports) module.exports = api; else root.Chem = api;
})(typeof window !== 'undefined' ? window : this);
