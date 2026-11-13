/* Number Ninja question generators.
 * Each generator(d) takes difficulty 1..3 and returns
 * { q: HTML question, answer: display string, check(input) -> 'right' | 'wrong' | 'simplify', why: explanation }
 * Works in the browser (window.NinjaGen) and in Node (module.exports) for self-checking.
 */
(function (root) {
  'use strict';
  const rand = (a, b) => a + Math.floor(Math.random() * (b - a + 1));
  const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
  const gcd = (a, b) => { a = Math.abs(a); b = Math.abs(b); while (b) [a, b] = [b, a % b]; return a || 1; };
  const tidy = (x) => Math.round(x * 1e6) / 1e6;
  const fmt = (x) => {
    x = tidy(x);
    const neg = x < 0; const s = Math.abs(x).toString();
    const [i, dec] = s.split('.');
    const withCommas = i.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return (neg ? '−' : '') + withCommas + (dec ? '.' + dec : '');
  };
  const sgn = (n) => (n < 0 ? `− ${Math.abs(n)}` : `+ ${n}`);

  // ----- answer parsing -----
  function clean(s) {
    return String(s).trim().replace(/[−–]/g, '-').replace(/,/g, '').replace(/£/g, '')
      .replace(/^[a-z]\s*=\s*/i, '').replace(/\s+/g, ' ');
  }
  function parseNum(s) {
    s = clean(s).replace(/\s/g, '');
    if (!/^-?(\d+\.?\d*|\.\d+)$/.test(s)) return null;
    return parseFloat(s);
  }
  /** Parse "a/b", "-a/b", "n", or mixed "1 3/4" into {n, d} (not simplified). */
  function parseFrac(s) {
    s = clean(s);
    let m = s.match(/^(-?)(\d+) (\d+)\/(\d+)$/);
    if (m) { const w = +m[2], n = +m[3], d = +m[4]; if (!d) return null; return { n: (m[1] ? -1 : 1) * (w * d + n), d, mixed: true }; }
    m = s.replace(/\s/g, '').match(/^(-?\d+)\/(-?\d+)$/);
    if (m) { const n = +m[1], d = +m[2]; if (!d) return null; return d < 0 ? { n: -n, d: -d } : { n, d }; }
    m = s.replace(/\s/g, '').match(/^-?\d+$/);
    if (m) return { n: +m[0], d: 1 };
    return null;
  }
  const numCheck = (ans) => (input) => {
    const v = parseNum(input);
    return v !== null && Math.abs(v - ans) < 1e-6 ? 'right' : 'wrong';
  };
  function fracCheck(n, d) {
    return (input) => {
      const f = parseFrac(input);
      if (!f) return 'wrong';
      if (f.n * d !== n * f.d) return 'wrong';
      if (!f.mixed && gcd(f.n, f.d) !== 1) return 'simplify';
      return 'right';
    };
  }
  const fracHTML = (n, d) => (d === 1 ? `${n < 0 ? '−' : ''}${Math.abs(n)}`
    : `${n < 0 ? '−' : ''}<span class="frac"><span>${Math.abs(n)}</span><span>${d}</span></span>`);
  const fracText = (n, d) => (d === 1 ? `${n}` : `${n}/${d}`);
  function simp(n, d) { const g = gcd(n, d); return [n / g, d / g]; }

  const SKILLS = {};

  // ----- Percentages -----
  SKILLS.percent = {
    label: 'Percentages of amounts',
    gen(d) {
      const p = d === 1 ? pick([10, 20, 25, 50, 75]) : d === 2 ? pick([5, 15, 30, 35, 45, 60]) : pick([12.5, 17.5, 2.5, 3, 7, 120]);
      const n = d === 3 ? pick([40, 80, 120, 160, 240, 360, 480]) : rand(2, 30) * 20;
      const ans = tidy(p * n / 100);
      return {
        q: `Find ${p}% of ${fmt(n)}`,
        answer: fmt(ans), check: numCheck(ans),
        why: `${p}% = ${p}/100, so ${p} ÷ 100 × ${fmt(n)} = ${fmt(ans)}. (Quick way: 10% of ${fmt(n)} is ${fmt(n / 10)}, then build ${p}% from that.)`
      };
    }
  };

  SKILLS.pchange = {
    label: 'Percentage increase/decrease',
    gen(d) {
      const up = Math.random() < 0.5;
      const p = d === 1 ? pick([10, 20, 50]) : d === 2 ? pick([5, 15, 25, 30, 40]) : pick([2.5, 12, 17.5, 35, 4]);
      const n = d === 3 ? pick([40, 80, 120, 200, 400, 640]) : rand(2, 25) * 20;
      const mult = tidy(up ? 1 + p / 100 : 1 - p / 100);
      const ans = tidy(n * mult);
      return {
        q: `${up ? 'Increase' : 'Decrease'} ${fmt(n)} by ${p}%`,
        answer: fmt(ans), check: numCheck(ans),
        why: `Multiplier = ${up ? '1 + ' : '1 − '}${tidy(p / 100)} = ${mult}. ${fmt(n)} × ${mult} = ${fmt(ans)}.`
      };
    }
  };

  // ----- Fractions -----
  SKILLS.fractions = {
    label: 'Fractions',
    gen(d) {
      const dens = [2, 3, 4, 5, 6, 8, 10, 12];
      let a, b, c, e, op;
      if (d === 1) {
        b = e = pick([5, 7, 8, 9, 11, 12]);
        a = rand(1, b - 1); c = rand(1, b - 1); op = '+';
      } else if (d === 2) {
        do { b = pick(dens); e = pick(dens); } while (b === e);
        a = rand(1, b - 1); c = rand(1, e - 1); op = pick(['+', '−']);
      } else {
        b = pick(dens.slice(0, 6)); e = pick(dens.slice(0, 6));
        a = rand(1, b + 2); c = rand(1, e - 1); op = pick(['×', '÷']);
      }
      if (gcd(a, b) !== 1 || gcd(c, e) !== 1) return SKILLS.fractions.gen(d); // keep question fractions in simplest form
      let n, m, why;
      if (op === '+' || op === '−') {
        const L = b * e / gcd(b, e);
        const x = a * (L / b), y = c * (L / e);
        n = op === '+' ? x + y : x - y; m = L;
        const [sn, sd] = simp(n, m);
        why = b === e
          ? `Same denominator, so ${op === '+' ? 'add' : 'subtract'} the tops: ${a} ${op} ${c} = ${n}, giving ${fracText(n, m)}${sn !== n ? ` = ${fracText(sn, sd)}` : ''}.`
          : `Common denominator ${L}: ${a}/${b} = ${x}/${L} and ${c}/${e} = ${y}/${L}. ${x} ${op} ${y} = ${n}, so ${fracText(n, m)}${sn !== n || sd !== m ? ` = ${fracText(sn, sd)}` : ''}.`;
      } else if (op === '×') {
        n = a * c; m = b * e;
        const [sn, sd] = simp(n, m);
        why = `Multiply tops and bottoms: ${a}×${c} = ${n}, ${b}×${e} = ${m}. ${fracText(n, m)}${sn !== n ? ` simplifies to ${fracText(sn, sd)}` : ''}.`;
      } else {
        n = a * e; m = b * c;
        const [sn, sd] = simp(n, m);
        why = `Keep, change, flip: ${a}/${b} × ${e}/${c} = ${n}/${m}${sn !== n ? ` = ${fracText(sn, sd)}` : ''}.`;
      }
      const [sn, sd] = simp(n, m);
      return {
        q: `${fracHTML(a, b)} ${op} ${fracHTML(c, e)} = ?<div class="small muted" style="font-weight:600;margin-top:6px">Simplest form. Type it like 3/4</div>`,
        answer: fracText(sn, sd), check: fracCheck(sn, sd), why
      };
    }
  };

  // ----- Indices -----
  SKILLS.indices = {
    label: 'Laws of indices',
    gen(d) {
      const v = pick(['x', 'y', 'a', 'n']);
      const kind = d === 1 ? pick(['mul', 'div']) : d === 2 ? pick(['mul', 'div', 'pow']) : pick(['div', 'pow', 'mixed', 'neg']);
      let q, ans, why;
      const sup = (k) => `${v}<span class="sup">${k}</span>`;
      if (kind === 'mul') {
        const a = rand(2, 9), b = rand(2, 9); ans = a + b;
        q = `${sup(a)} × ${sup(b)} = ${v}<span class="sup">?</span>`; why = `Multiplying: add the powers. ${a} + ${b} = ${ans}.`;
      } else if (kind === 'div') {
        const b = rand(2, 7), a = b + rand(1, 8); ans = a - b;
        q = `${sup(a)} ÷ ${sup(b)} = ${v}<span class="sup">?</span>`; why = `Dividing: subtract the powers. ${a} − ${b} = ${ans}.`;
      } else if (kind === 'pow') {
        const a = rand(2, 6), b = rand(2, 5); ans = a * b;
        q = `(${sup(a)})<span class="sup">${b}</span> = ${v}<span class="sup">?</span>`; why = `Power of a power: multiply. ${a} × ${b} = ${ans}.`;
      } else if (kind === 'mixed') {
        const a = rand(2, 6), b = rand(2, 6), c = rand(2, 8); ans = a + b - c;
        q = `${sup(a)} × ${sup(b)} ÷ ${sup(c)} = ${v}<span class="sup">?</span>`; why = `Add then subtract the powers: ${a} + ${b} − ${c} = ${ans}.`;
      } else {
        const a = rand(2, 5), b = a + rand(1, 5); ans = a - b;
        q = `${sup(a)} ÷ ${sup(b)} = ${v}<span class="sup">?</span>`;
        why = `Subtract the powers: ${a} − ${b} = ${ans}. A negative power means 1 over: ${v}<sup>${ans}</sup> = 1/${v}<sup>${-ans}</sup>.`;
      }
      return { q, answer: String(ans), check: numCheck(ans), why };
    }
  };

  // ----- Standard form -----
  function sfString(digits, p) {
    // digits like "34" means 3.4; value = 3.4 × 10^p
    const len = digits.length;
    if (p >= len - 1) return fmt(Number(digits + '0'.repeat(p - (len - 1))));
    if (p < 0) return '0.' + '0'.repeat(-p - 1) + digits;
    return digits.slice(0, p + 1) + '.' + digits.slice(p + 1);
  }
  SKILLS.standard = {
    label: 'Standard form',
    gen(d) {
      const digits = String(rand(1, 9)) + (Math.random() < 0.7 ? String(rand(1, 9)) : '') ;
      const m = digits.length > 1 ? `${digits[0]}.${digits.slice(1)}` : digits;
      if (d === 1 || (d === 2 && Math.random() < 0.4)) {
        const p = rand(digits.length + 1, 8);
        return { q: `${sfString(digits, p)} = ${m} × 10<span class="sup">?</span>`, answer: String(p), check: numCheck(p),
          why: `Count how many places the decimal point moves to get ${m}: ${p} places left, so the power is ${p}.` };
      }
      if (d === 2) {
        const p = -rand(2, 6);
        return { q: `${sfString(digits, p)} = ${m} × 10<span class="sup">?</span>`, answer: String(p), check: numCheck(p),
          why: `Small number, so negative power. The point moves ${-p} places right to make ${m}: power is ${p}.` };
      }
      // multiply two standard-form numbers
      const a = rand(2, 9), b = rand(2, 9), p1 = rand(2, 6), p2 = rand(-3, 6);
      const prod = a * b, carry = prod >= 10 ? 1 : 0;
      const mant = carry ? prod / 10 : prod, ans = p1 + p2 + carry;
      return {
        q: `(${a} × 10<span class="sup">${p1}</span>) × (${b} × 10<span class="sup">${p2}</span>) = ${mant} × 10<span class="sup">?</span>`,
        answer: String(ans), check: numCheck(ans),
        why: `${a} × ${b} = ${prod}; add powers ${p1} + ${p2} = ${p1 + p2}.${carry ? ` ${prod} = ${mant} × 10¹, so add 1 more: ${ans}.` : ''}`
      };
    }
  };

  // ----- Order of operations -----
  SKILLS.bidmas = {
    label: 'Order of operations (BIDMAS)',
    gen(d) {
      let q, ans, why;
      const t = d === 1 ? pick([0, 1]) : d === 2 ? pick([1, 2, 3]) : pick([3, 4, 5]);
      if (t === 0) { const a = rand(2, 20), b = rand(2, 9), c = rand(2, 9); ans = a + b * c; q = `${a} + ${b} × ${c}`; why = `Multiply first: ${b} × ${c} = ${b * c}, then ${a} + ${b * c} = ${ans}.`; }
      else if (t === 1) { const a = rand(2, 12), b = rand(2, 9), c = rand(2, 6); ans = (a + b) * c; q = `(${a} + ${b}) × ${c}`; why = `Brackets first: ${a} + ${b} = ${a + b}, then × ${c} = ${ans}.`; }
      else if (t === 2) { const c = rand(2, 9), k = rand(2, 9), a = rand(c * k, c * k + 40); ans = a - (c * k) / c; q = `${a} − ${c * k} ÷ ${c}`; why = `Divide first: ${c * k} ÷ ${c} = ${k}, then ${a} − ${k} = ${ans}.`; }
      else if (t === 3) { const a = rand(2, 9), b = rand(2, 6), c = rand(2, 9); ans = a * a - b * c; q = `${a}² − ${b} × ${c}`; why = `Indices: ${a}² = ${a * a}. Multiply: ${b} × ${c} = ${b * c}. Then ${a * a} − ${b * c} = ${ans}.`; }
      else if (t === 4) { const a = rand(-9, -2), b = rand(2, 6), c = rand(-6, -2); ans = a * b - c; q = `(${a}) × ${b} − (${c})`; why = `${a} × ${b} = ${a * b}. Subtracting a negative is adding: ${a * b} + ${-c} = ${ans}.`; }
      else { const a = rand(2, 5), b = rand(1, 4), c = rand(2, 5); ans = (a + b) * (a + b) / 1 - c * c; q = `(${a} + ${b})² − ${c}²`; why = `Brackets: ${a + b}. Indices: ${(a + b) ** 2} and ${c * c}. ${(a + b) ** 2} − ${c * c} = ${ans}.`; }
      return { q: `${q} = ?`.replace(/-/g, '−'), answer: fmt(ans), check: numCheck(ans), why };
    }
  };

  // ----- Ratio -----
  SKILLS.ratio = {
    label: 'Sharing in a ratio',
    gen(d) {
      const thing = pick(['£', 'sweets', 'marbles', 'stickers']);
      const parts = d === 3 ? [rand(1, 5), rand(1, 5), rand(1, 5)] : [rand(1, 7), rand(1, 7)];
      if (new Set(parts).size === 1) parts[0]++;
      const total = parts.reduce((a, b) => a + b, 0);
      const k = d === 1 ? rand(2, 10) : rand(3, 25);
      const amount = total * k;
      const askLargest = Math.random() < 0.6;
      const target = askLargest ? Math.max(...parts) : Math.min(...parts);
      const ans = target * k;
      const amt = thing === '£' ? `£${fmt(amount)}` : `${fmt(amount)} ${thing}`;
      return {
        q: `Share ${amt} in the ratio ${parts.join(' : ')}.<br><span style="font-size:.8em">What is the ${askLargest ? 'largest' : 'smallest'} share?</span>`,
        answer: thing === '£' ? `£${fmt(ans)}` : fmt(ans), check: numCheck(ans),
        why: `Total parts = ${parts.join(' + ')} = ${total}. One part = ${fmt(amount)} ÷ ${total} = ${k}. ${askLargest ? 'Largest' : 'Smallest'} = ${target} × ${k} = ${fmt(ans)}.`
      };
    }
  };

  // ----- Linear equations -----
  SKILLS.equations = {
    label: 'Solving linear equations',
    gen(d) {
      const x = d === 1 ? rand(1, 12) : rand(-6, 12) || 3;
      let q, why;
      if (d === 1) {
        const a = rand(2, 9), b = rand(1, 20), c = a * x + b;
        q = `${a}x + ${b} = ${c}`;
        why = `Subtract ${b}: ${a}x = ${c - b}. Divide by ${a}: x = ${x}.`;
      } else if (d === 2) {
        if (Math.random() < 0.5) {
          const a = rand(2, 9), b = rand(1, 15), c = a * x - b;
          q = `${a}x − ${b} = ${c}`;
          why = `Add ${b}: ${a}x = ${c + b}. Divide by ${a}: x = ${x}.`;
        } else {
          const a = rand(2, 6), b = rand(-5, 6) || 2, c = a * (x + b);
          q = `${a}(x ${sgn(b)}) = ${c}`;
          why = `Divide by ${a}: x ${sgn(b)} = ${c / a}. So x = ${x}.`;
        }
      } else {
        const a = rand(3, 9), c = rand(1, a - 1), b = rand(-10, 10), e = (a - c) * x + b;
        q = `${a}x ${sgn(b)} = ${c}x ${sgn(e)}`;
        why = `Take ${c}x from both sides: ${a - c}x ${sgn(b)} = ${e}. Then ${a - c}x = ${e - b}, so x = ${x}.`;
      }
      return { q: `Solve: ${q}`.replace(/-(\d)/g, '−$1'), answer: `x = ${x}`, check: numCheck(x), why: why.replace(/-(\d)/g, '−$1') };
    }
  };

  const api = { SKILLS, parseFrac, parseNum, gcd };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.NinjaGen = api;
})(typeof window !== 'undefined' ? window : this);
