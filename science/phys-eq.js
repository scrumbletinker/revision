/* AQA GCSE Physics: the equations students must learn (recall), with question generator.
 * Each equation: vars[0] is calculated from the others by calc(). Any one variable can be the unknown.
 * vals = realistic "nice" values in SI units. conv = an alternative unit to test conversions.
 * rearr = how to rearrange for each symbol (shown in worked solutions).
 * UMD so it can be checked in Node.
 */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.PhysEq = factory();
})(typeof self !== 'undefined' ? self : this, function () {
  const G = [9.8];
  const EQS = [
    { id: 'weight', group: 'forces', name: 'weight, mass and gravitational field strength', show: 'W = m × g',
      vars: [{ s: 'W', n: 'weight', u: 'N' }, { s: 'm', n: 'mass', u: 'kg', vals: [0.5, 2, 5, 12, 50, 65, 80], conv: { u: 'g', f: 0.001 } }, { s: 'g', n: 'gravitational field strength', u: 'N/kg', vals: [9.8, 9.8, 9.8, 1.6] }],
      calc: (m, g) => m * g, rearr: { m: 'm = W ÷ g', g: 'g = W ÷ m' } },
    { id: 'work', group: 'forces', name: 'work done, force and distance moved along the line of action of the force', show: 'W = F × s',
      vars: [{ s: 'W', n: 'work done', u: 'J', conv: { u: 'kJ', f: 1000 } }, { s: 'F', n: 'force', u: 'N', vals: [5, 20, 40, 150, 250, 800] }, { s: 's', n: 'distance', u: 'm', vals: [0.5, 1.5, 2, 3, 12, 25], conv: { u: 'cm', f: 0.01 } }],
      calc: (F, s) => F * s, rearr: { F: 'F = W ÷ s', s: 's = W ÷ F' } },
    { id: 'spring', group: 'forces', name: 'force, spring constant and extension', show: 'F = k × e',
      vars: [{ s: 'F', n: 'force', u: 'N' }, { s: 'k', n: 'spring constant', u: 'N/m', vals: [20, 40, 50, 200, 250] }, { s: 'e', n: 'extension', u: 'm', vals: [0.02, 0.05, 0.1, 0.15, 0.3], conv: { u: 'cm', f: 0.01 } }],
      calc: (k, e) => k * e, rearr: { k: 'k = F ÷ e', e: 'e = F ÷ k' } },
    { id: 'moment', group: 'forces', name: 'moment of a force, force and distance', show: 'M = F × d',
      vars: [{ s: 'M', n: 'moment', u: 'N m' }, { s: 'F', n: 'force', u: 'N', vals: [10, 25, 40, 120, 300] }, { s: 'd', n: 'perpendicular distance from the pivot', u: 'm', vals: [0.2, 0.5, 0.75, 1.5, 2], conv: { u: 'cm', f: 0.01 } }],
      calc: (F, d) => F * d, rearr: { F: 'F = M ÷ d', d: 'd = M ÷ F' } },
    { id: 'pressure', group: 'forces', name: 'pressure, force and area', show: 'p = F ÷ A',
      vars: [{ s: 'p', n: 'pressure', u: 'Pa' }, { s: 'F', n: 'force', u: 'N', vals: [20, 50, 200, 600, 1500] }, { s: 'A', n: 'area', u: 'm²', vals: [0.01, 0.02, 0.05, 0.5, 2] }],
      calc: (F, A) => F / A, rearr: { F: 'F = p × A', A: 'A = F ÷ p' } },
    { id: 'speed', group: 'forces', name: 'distance travelled, speed and time', show: 's = v × t',
      vars: [{ s: 's', n: 'distance', u: 'm', conv: { u: 'km', f: 1000 } }, { s: 'v', n: 'speed', u: 'm/s', vals: [1.5, 3, 8, 12, 25, 340] }, { s: 't', n: 'time', u: 's', vals: [4, 10, 20, 30, 60, 120], conv: { u: 'minutes', f: 60 } }],
      calc: (v, t) => v * t, rearr: { v: 'v = s ÷ t', t: 't = s ÷ v' } },
    { id: 'accel', group: 'forces', name: 'acceleration, change in velocity and time', show: 'a = Δv ÷ t',
      vars: [{ s: 'a', n: 'acceleration', u: 'm/s²' }, { s: 'Δv', n: 'change in velocity', u: 'm/s', vals: [4, 10, 12, 20, 30] }, { s: 't', n: 'time taken', u: 's', vals: [2, 4, 5, 8, 10] }],
      calc: (dv, t) => dv / t, rearr: { 'Δv': 'Δv = a × t', t: 't = Δv ÷ a' } },
    { id: 'newton2', group: 'forces', name: 'resultant force, mass and acceleration', show: 'F = m × a',
      vars: [{ s: 'F', n: 'resultant force', u: 'N' }, { s: 'm', n: 'mass', u: 'kg', vals: [0.5, 2, 5, 60, 1200], conv: { u: 'g', f: 0.001 } }, { s: 'a', n: 'acceleration', u: 'm/s²', vals: [0.5, 2, 3, 4, 9.8] }],
      calc: (m, a) => m * a, rearr: { m: 'm = F ÷ a', a: 'a = F ÷ m' } },
    { id: 'momentum', group: 'forces', name: 'momentum, mass and velocity', show: 'p = m × v',
      vars: [{ s: 'p', n: 'momentum', u: 'kg m/s' }, { s: 'm', n: 'mass', u: 'kg', vals: [0.15, 2, 5, 70, 1200], conv: { u: 'g', f: 0.001 } }, { s: 'v', n: 'velocity', u: 'm/s', vals: [3, 8, 12, 20, 25] }],
      calc: (m, v) => m * v, rearr: { m: 'm = p ÷ v', v: 'v = p ÷ m' } },
    { id: 'kinetic', group: 'energy', name: 'kinetic energy, mass and speed', show: 'Eₖ = ½ × m × v²',
      vars: [{ s: 'Eₖ', n: 'kinetic energy', u: 'J', conv: { u: 'kJ', f: 1000 } }, { s: 'm', n: 'mass', u: 'kg', vals: [0.5, 2, 4, 60, 1000] }, { s: 'v', n: 'speed', u: 'm/s', vals: [2, 4, 5, 10, 20] }],
      calc: (m, v) => 0.5 * m * v * v, rearr: { m: 'm = 2 × Eₖ ÷ v²', v: 'v = √(2 × Eₖ ÷ m)' } },
    { id: 'gpe', group: 'energy', name: 'gravitational potential energy, mass, gravitational field strength and height', show: 'Eₚ = m × g × h',
      vars: [{ s: 'Eₚ', n: 'gravitational potential energy', u: 'J' }, { s: 'm', n: 'mass', u: 'kg', vals: [0.5, 2, 50, 60], conv: { u: 'g', f: 0.001 } }, { s: 'g', n: 'gravitational field strength', u: 'N/kg', vals: G }, { s: 'h', n: 'height', u: 'm', vals: [1.5, 2, 5, 10, 20, 100] }],
      calc: (m, g, h) => m * g * h, rearr: { m: 'm = Eₚ ÷ (g × h)', g: 'g = Eₚ ÷ (m × h)', h: 'h = Eₚ ÷ (m × g)' } },
    { id: 'powerE', group: 'energy', name: 'power, energy transferred and time', show: 'P = E ÷ t',
      vars: [{ s: 'P', n: 'power', u: 'W' }, { s: 'E', n: 'energy transferred', u: 'J', vals: [600, 1200, 3000, 6000, 24000], conv: { u: 'kJ', f: 1000 } }, { s: 't', n: 'time', u: 's', vals: [10, 30, 60, 120, 300], conv: { u: 'minutes', f: 60 } }],
      calc: (E, t) => E / t, rearr: { E: 'E = P × t', t: 't = E ÷ P' } },
    { id: 'powerW', group: 'energy', name: 'power, work done and time', show: 'P = W ÷ t',
      vars: [{ s: 'P', n: 'power', u: 'W' }, { s: 'W', n: 'work done', u: 'J', vals: [500, 1200, 2400, 9000] }, { s: 't', n: 'time', u: 's', vals: [5, 10, 20, 60] }],
      calc: (W, t) => W / t, rearr: { W: 'W = P × t', t: 't = W ÷ P' } },
    { id: 'efficiency', group: 'energy', name: 'efficiency, useful energy output and total energy input', show: 'efficiency = useful output ÷ total input',
      vars: [{ s: 'efficiency', n: 'efficiency', u: '(as a decimal)', pct: true }, { s: 'useful', n: 'useful energy output', u: 'J', vals: [100, 150, 300, 600, 1800] }, { s: 'total', n: 'total energy input', u: 'J', vals: [2000, 2500, 4000] }],
      calc: (u, t) => u / t, rearr: { useful: 'useful output = efficiency × total input', total: 'total input = useful output ÷ efficiency' } },
    { id: 'charge', group: 'electricity', name: 'charge flow, current and time', show: 'Q = I × t',
      vars: [{ s: 'Q', n: 'charge flow', u: 'C' }, { s: 'I', n: 'current', u: 'A', vals: [0.5, 1.5, 2, 3, 5, 13], conv: { u: 'mA', f: 0.001 } }, { s: 't', n: 'time', u: 's', vals: [10, 30, 60, 120, 300], conv: { u: 'minutes', f: 60 } }],
      calc: (I, t) => I * t, rearr: { I: 'I = Q ÷ t', t: 't = Q ÷ I' } },
    { id: 'ohm', group: 'electricity', name: 'potential difference, current and resistance', show: 'V = I × R',
      vars: [{ s: 'V', n: 'potential difference', u: 'V' }, { s: 'I', n: 'current', u: 'A', vals: [0.2, 0.5, 1.5, 2, 3], conv: { u: 'mA', f: 0.001 } }, { s: 'R', n: 'resistance', u: 'Ω', vals: [4, 6, 12, 20, 50, 100] }],
      calc: (I, R) => I * R, rearr: { I: 'I = V ÷ R', R: 'R = V ÷ I' } },
    { id: 'powerVI', group: 'electricity', name: 'power, potential difference and current', show: 'P = V × I',
      vars: [{ s: 'P', n: 'power', u: 'W' }, { s: 'V', n: 'potential difference', u: 'V', vals: [1.5, 3, 6, 12, 230] }, { s: 'I', n: 'current', u: 'A', vals: [0.5, 2, 3, 5, 10, 13] }],
      calc: (V, I) => V * I, rearr: { V: 'V = P ÷ I', I: 'I = P ÷ V' } },
    { id: 'powerIR', group: 'electricity', name: 'power, current and resistance', show: 'P = I² × R',
      vars: [{ s: 'P', n: 'power', u: 'W' }, { s: 'I', n: 'current', u: 'A', vals: [0.5, 2, 3, 5] }, { s: 'R', n: 'resistance', u: 'Ω', vals: [4, 10, 20, 50] }],
      calc: (I, R) => I * I * R, rearr: { I: 'I = √(P ÷ R)', R: 'R = P ÷ I²' } },
    { id: 'energyQV', group: 'electricity', name: 'energy transferred, charge flow and potential difference', show: 'E = Q × V',
      vars: [{ s: 'E', n: 'energy transferred', u: 'J' }, { s: 'Q', n: 'charge flow', u: 'C', vals: [2, 5, 10, 60, 300] }, { s: 'V', n: 'potential difference', u: 'V', vals: [1.5, 6, 12, 230] }],
      calc: (Q, V) => Q * V, rearr: { Q: 'Q = E ÷ V', V: 'V = E ÷ Q' } },
    { id: 'energyPt', group: 'electricity', name: 'energy transferred, power and time', show: 'E = P × t',
      vars: [{ s: 'E', n: 'energy transferred', u: 'J', conv: { u: 'kJ', f: 1000 } }, { s: 'P', n: 'power', u: 'W', vals: [40, 60, 100, 500, 2000], conv: { u: 'kW', f: 1000 } }, { s: 't', n: 'time', u: 's', vals: [10, 30, 60, 120, 300], conv: { u: 'minutes', f: 60 } }],
      calc: (P, t) => P * t, rearr: { P: 'P = E ÷ t', t: 't = E ÷ P' } },
    { id: 'density', group: 'matter', name: 'density, mass and volume', show: 'ρ = m ÷ V',
      vars: [{ s: 'ρ', n: 'density', u: 'kg/m³' }, { s: 'm', n: 'mass', u: 'kg', vals: [2, 5, 27, 79, 400] }, { s: 'V', n: 'volume', u: 'm³', vals: [0.002, 0.01, 0.05, 0.2] }],
      calc: (m, V) => m / V, rearr: { m: 'm = ρ × V', V: 'V = m ÷ ρ' } },
    { id: 'wave', group: 'waves', name: 'wave speed, frequency and wavelength', show: 'v = f × λ',
      vars: [{ s: 'v', n: 'wave speed', u: 'm/s' }, { s: 'f', n: 'frequency', u: 'Hz', vals: [2, 5, 50, 250, 500, 1000], conv: { u: 'kHz', f: 1000 } }, { s: 'λ', n: 'wavelength', u: 'm', vals: [0.02, 0.5, 0.68, 1.5, 3], conv: { u: 'cm', f: 0.01 } }],
      calc: (f, l) => f * l, rearr: { f: 'f = v ÷ λ', 'λ': 'λ = v ÷ f' } },
    { id: 'magnification', group: 'waves', name: 'magnification, image height and object height (lenses)', show: 'magnification = image height ÷ object height',
      vars: [{ s: 'magnification', n: 'magnification', u: '(no unit)' }, { s: 'image height', n: 'image height', u: 'cm', vals: [3, 6, 12, 20, 24] }, { s: 'object height', n: 'object height', u: 'cm', vals: [1.5, 2, 3, 4, 6] }],
      calc: (i, o) => i / o, rearr: { 'image height': 'image height = magnification × object height', 'object height': 'object height = image height ÷ magnification' } }
  ];
  const GROUPS = { forces: 'Forces & motion', energy: 'Energy', electricity: 'Electricity', matter: 'Density', waves: 'Waves & lenses' };

  const pick = (a) => a[Math.floor(Math.random() * a.length)];
  function fmt(x) {
    if (!isFinite(x)) return String(x);
    const r = Number(x.toPrecision(4));
    return Math.abs(r) >= 100000 ? r.toLocaleString('en-GB') : String(r);
  }

  /** Build one calculation. convChance: probability that a given value is shown in a non-SI unit. */
  function make(eq, convChance) {
    const inputs = eq.vars.slice(1).map((v) => pick(v.vals));
    const out = eq.calc.apply(null, inputs);
    const values = [out].concat(inputs);
    const u = Math.floor(Math.random() * eq.vars.length);
    let conv = null;
    const given = [];
    eq.vars.forEach((v, i) => {
      if (i === u) return;
      let shown = values[i], unit = v.u;
      if (!conv && v.conv && Math.random() < convChance) {
        const sv = values[i] / v.conv.f;
        if (Math.abs(sv - Number(sv.toPrecision(4))) < 1e-9 * Math.max(1, Math.abs(sv))) { conv = { s: v.s, from: v.conv.u, to: v.u, f: v.conv.f }; shown = sv; unit = v.conv.u; }
      }
      given.push({ s: v.s, n: v.n, value: shown, unit });
    });
    return { eq, unknown: eq.vars[u], answer: values[u], given, conv, values };
  }

  /** Mark a typed answer. Accepts within 2%, and percentages for efficiency. */
  function check(input, q) {
    const s = String(input).replace(/,/g, '').replace(/\s+/g, '').replace(/×10\^?/i, 'e');
    let x = parseFloat(s);
    if (!isFinite(x)) return false;
    const a = q.answer;
    if (q.unknown.pct && (x > 1 || /%/.test(s))) x = x / 100;
    return Math.abs(x - a) <= Math.abs(a) * 0.02 + 1e-12;
  }

  return { EQS, GROUPS, make, check, fmt };
});
