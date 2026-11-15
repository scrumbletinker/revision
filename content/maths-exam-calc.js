/* Maths exam-style questions: CALCULATOR (Edexcel 1MA1 Higher style, Papers 2 and 3).
 * Original questions, modelled on the topics and question types in recent GCSE Higher papers.
 * Answers are computed from the question's numbers so the arithmetic is exact.
 */
(function () {
  const F = window.FIG;
  const r = (deg) => deg * Math.PI / 180, d = (rad) => rad * 180 / Math.PI;
  const sin = (x) => Math.sin(r(x)), cos = (x) => Math.cos(r(x));

  const rightTri = (labels) => F.svg('0 0 300 190',
    `<polygon points="40,160 250,160 250,30" class="fg-fill"/><rect x="238" y="148" width="12" height="12" class="fg-axis" fill="none"/>${labels}`, 'Diagram NOT accurately drawn');

  // compound interest / depreciation values
  const ci = 3500 * Math.pow(1.024, 5);
  const dep = 18000 * Math.pow(0.85, 3);
  // iteration x(n+1) = cube root of (5 − 2x(n)), x0 = 1.3
  const it = [1.3]; for (let i = 0; i < 3; i++) it.push(Math.cbrt(5 - 2 * it[i]));
  // cosine rule triangle
  const cr = Math.sqrt(8 * 8 + 11 * 11 - 2 * 8 * 11 * cos(52));
  // cumulative frequency curve (reading by straight segments)
  const cfPts = [[0, 0], [10, 5], [20, 18], [30, 42], [40, 55], [50, 60]];
  const cfAt = (n) => { for (let i = 1; i < cfPts.length; i++) { const [x0, y0] = cfPts[i - 1], [x1, y1] = cfPts[i]; if (n <= y1) return x0 + (n - y0) / (y1 - y0) * (x1 - x0); } return 50; };
  const cfGraph = F.graph({ x: { label: 'Time (minutes)', max: 50, step: 10 }, y: { label: 'Cumulative frequency', max: 60, step: 10 }, lines: [{ pts: cfPts }], caption: 'Cumulative frequency graph for 60 journeys' });
  const profit = (25 * 5 + 15 * 2.5) - 40 * 3.2;

  window.MATHS_C = [
    // ===================== NUMBER =====================
    { id: 'stdform', topic: 'number', paper: 2, title: 'Standard form',
      intro: '<p>The mass of the Earth is 5.97 × 10<sup>24</sup> kg. The mass of the Moon is 7.35 × 10<sup>22</sup> kg.</p>',
      parts: [
        { t: 'num', q: 'How many times heavier is the Earth than the Moon? Give your answer to 3 significant figures.', marks: 2, answer: 5.97e24 / 7.35e22, tol: 0.003, show: '81.2',
          ms: ['M1 for 5.97 × 10²⁴ ÷ 7.35 × 10²²', 'A1 81.2'] },
        { t: 'num', q: 'Work out the total mass of the Earth and the Moon. Give your answer in standard form.', marks: 2, answer: 5.97e24 + 7.35e22, tol: 0.001, unit: 'kg', show: '6.0435 × 10²⁴ kg (6.04 × 10²⁴ is fine)',
          ms: ['M1 for 597 × 10²² + 7.35 × 10²² or equivalent', 'A1 6.0435 × 10²⁴ (accept 6.04 × 10²⁴)'] }
      ] },

    { id: 'bounds', topic: 'number', paper: 2, title: 'Bounds',
      intro: '<p>A rectangle has length 12.4 cm, correct to 1 decimal place, and width 6.3 cm, correct to 1 decimal place.</p>',
      parts: [
        { t: 'nums', q: 'Write down the error interval for the length L.', marks: 2, fields: [{ l: 'lower', answer: 12.35, tol: 0 }, { l: 'upper', answer: 12.45, tol: 0 }],
          ms: ['B1 12.35', 'B1 12.45 (12.35 ≤ L < 12.45)'] },
        { t: 'num', q: 'Calculate the upper bound for the area of the rectangle.', marks: 2, answer: 12.45 * 6.35, tol: 0.0005, unit: 'cm²',
          ms: ['M1 for 12.45 × 6.35', 'A1 79.0575'], working: ['Use the upper bounds of both: 12.45 × 6.35 = 79.0575 cm²'] }
      ] },

    { id: 'interest', topic: 'number', paper: 2, title: 'Compound interest and depreciation',
      parts: [
        { t: 'num', q: 'Maya invests £3500 for 5 years at 2.4% per year compound interest. Work out the value of the investment at the end of 5 years. Give your answer to the nearest penny.', marks: 3, answer: ci, tol: 0.0002, unit: '£',
          ms: ['M1 for 1.024 seen', 'M1 for 3500 × 1.024⁵', `A1 £${ci.toFixed(2)}`], working: [`3500 × 1.024⁵ = ${ci.toFixed(4)} = £${ci.toFixed(2)}`] },
        { t: 'num', q: 'A car costs £18 000. Its value decreases by 15% each year. Work out its value after 3 years.', marks: 2, answer: dep, tol: 0.0002, unit: '£',
          ms: ['M1 for 18 000 × 0.85³', `A1 £${dep.toFixed(2)}`] }
      ] },

    // ===================== ALGEBRA =====================
    { id: 'quadformula', topic: 'algebra', paper: 2, title: 'The quadratic formula',
      parts: [
        { t: 'nums', q: 'Solve 2x² − 7x + 2 = 0. Give your answers correct to 2 decimal places.', marks: 3, anyOrder: true,
          fields: [{ l: 'x =', answer: (7 + Math.sqrt(33)) / 4, tol: 0.003, show: '3.19' }, { l: 'x =', answer: (7 - Math.sqrt(33)) / 4, tol: 0.02, show: '0.31' }],
          ms: ['M1 for substituting a = 2, b = −7, c = 2 into the formula', 'M1 for (7 ± √33) ÷ 4', 'A1 3.19 and 0.31'], working: ['b² − 4ac = 49 − 16 = 33', 'x = (7 ± √33) ÷ 4', 'x = 3.186… or 0.313…'] }
      ] },

    { id: 'iteration', topic: 'algebra', paper: 2, title: 'Iteration',
      intro: '<p>The equation x³ + 2x − 5 = 0 has a solution between 1 and 2.</p>',
      parts: [
        { t: 'mcq', q: 'Which rearrangement of x³ + 2x − 5 = 0 is correct?', marks: 1, answer: 'x = ∛(5 − 2x)', options: ['x = ∛(5 − 2x)', 'x = ∛(5 + 2x)', 'x = ∛(2x − 5)', 'x = (5 − x³) × 2'] },
        { t: 'num', q: `Using x<sub>n+1</sub> = ∛(5 − 2x<sub>n</sub>) with x<sub>0</sub> = 1.3, find x<sub>3</sub>. Give your answer to 4 decimal places.`, marks: 3, answer: it[3], tol: 0.00005,
          ms: ['M1 for one correct iteration', 'M1 for x₁ and x₂ correct', `A1 ${it[3].toFixed(4)}`], working: [`x₁ = ${it[1].toFixed(6)}`, `x₂ = ${it[2].toFixed(6)}`, `x₃ = ${it[3].toFixed(6)}`] }
      ] },

    { id: 'functions', topic: 'algebra', paper: 2, title: 'Functions',
      intro: '<p>f(x) = 3x − 2 and g(x) = x² + 1</p>',
      parts: [
        { t: 'num', q: 'Work out fg(2).', marks: 2, answer: 13, tol: 0, ms: ['M1 for g(2) = 5', 'A1 13'], working: ['g(2) = 4 + 1 = 5', 'f(5) = 15 − 2 = 13'] },
        { t: 'alg', q: 'Find f<sup>−1</sup>(x).', marks: 2, prefix: 'f⁻¹(x) =', fn: (v) => (v.x + 2) / 3, show: '(x + 2) ÷ 3', hint: '(x + 2)/3',
          ms: ['M1 for x = 3y − 2 or y + 2 = 3x', 'A1 (x + 2)/3'] },
        { t: 'alg', q: 'Find gf(x). Give your answer in its simplest form.', marks: 2, prefix: 'gf(x) =', fn: (v) => (3 * v.x - 2) ** 2 + 1, show: '9x² − 12x + 5', hint: '9x^2 − 12x + 5',
          ms: ['M1 for (3x − 2)² + 1', 'A1 9x² − 12x + 5'] }
      ] },

    { id: 'lines', topic: 'algebra', paper: 2, title: 'Straight-line graphs',
      parts: [
        { t: 'alg', q: 'Find the equation of the line through (2, 5) with gradient 3.', marks: 2, prefix: 'y =', fn: (v) => 3 * v.x - 1, show: '3x − 1', hint: '3x − 1',
          ms: ['M1 for 5 = 3 × 2 + c', 'A1 y = 3x − 1'] },
        { t: 'num', q: 'Write down the gradient of a line perpendicular to y = 3x − 1.', marks: 1, answer: -1 / 3, tol: 0.01, show: '−1/3', ms: ['B1 −1/3'] },
        { t: 'alg', q: 'Find the equation of the line through (4, 1) and (8, 9).', marks: 3, prefix: 'y =', fn: (v) => 2 * v.x - 7, show: '2x − 7', hint: '2x − 7',
          ms: ['M1 for gradient (9 − 1) ÷ (8 − 4) = 2', 'M1 for 1 = 2 × 4 + c', 'A1 y = 2x − 7'] }
      ] },

    { id: 'turning', topic: 'algebra', paper: 2, title: 'Quadratic graphs',
      parts: [
        { t: 'alg', q: 'Write x² − 8x + 11 in the form (x − a)² − b', marks: 2, fn: (v) => (v.x - 4) ** 2 - 5, show: '(x − 4)² − 5', hint: '(x − 4)^2 − 5',
          must: /^\(x-4\)\^2-5$/, formMsg: 'write it as (x − a)² − b', ms: ['M1 for (x − 4)²', 'A1 (x − 4)² − 5'] },
        { t: 'nums', q: 'Write down the coordinates of the turning point of y = x² − 8x + 11', marks: 1, fields: [{ l: 'x =', answer: 4 }, { l: 'y =', answer: -5 }], ms: ['B1 (4, −5)'] },
        { t: 'nums', q: 'Find the roots of x² − 8x + 11 = 0. Give your answers to 2 decimal places.', marks: 2, anyOrder: true,
          fields: [{ l: 'x =', answer: 4 + Math.sqrt(5), tol: 0.002, show: '6.24' }, { l: 'x =', answer: 4 - Math.sqrt(5), tol: 0.004, show: '1.76' }],
          ms: ['M1 for x − 4 = ±√5', 'A1 6.24 and 1.76'] }
      ] },

    { id: 'nonlinear', topic: 'algebra', paper: 2, title: 'Simultaneous equations with a circle',
      intro: '<p>y = x + 1<br>x² + y² = 13</p>',
      parts: [
        { t: 'nums', q: 'Solve the simultaneous equations. Give the solution with the larger value of x first.', marks: 5,
          fields: [{ l: 'x =', answer: 2 }, { l: 'y =', answer: 3 }, { l: 'x =', answer: -3 }, { l: 'y =', answer: -2 }],
          ms: ['M1 for substituting: x² + (x + 1)² = 13', 'M1 for 2x² + 2x − 12 = 0', 'M1 for (x + 3)(x − 2) = 0', 'A1 for x = 2 and x = −3', 'A1 for y = 3 and y = −2 paired correctly'],
          working: ['x² + x² + 2x + 1 = 13', '2x² + 2x − 12 = 0, so x² + x − 6 = 0', '(x + 3)(x − 2) = 0: x = 2 or x = −3', 'y = x + 1: y = 3 or y = −2'] }
      ] },

    { id: 'proof', topic: 'algebra', paper: 2, title: 'Algebraic proof',
      parts: [
        { t: 'text', q: 'Prove that the sum of any three consecutive integers is always a multiple of 3.', marks: 3,
          points: ['M1 for using n, n + 1, n + 2 (or similar)', 'M1 for adding to get 3n + 3', 'C1 for 3(n + 1) and a conclusion that this is a multiple of 3'] },
        { t: 'text', q: 'Prove that (2n + 3)² − (2n − 1)² is always a multiple of 8.', marks: 3,
          points: ['M1 for expanding one bracket correctly: 4n² + 12n + 9 or 4n² − 4n + 1', 'M1 for simplifying to 16n + 8', 'C1 for 8(2n + 1) with a conclusion that this is a multiple of 8'] }
      ] },

    // ===================== RATIO =====================
    { id: 'density', topic: 'ratio', paper: 2, title: 'Density',
      parts: [
        { t: 'num', q: 'A solid copper cube has sides of 4 cm. The density of copper is 8.9 g/cm³. Work out the mass of the cube.', marks: 3, answer: 64 * 8.9, unit: 'g',
          ms: ['P1 for volume = 4³ = 64', 'P1 for 64 × 8.9', 'A1 569.6 g'] },
        { t: 'num', q: 'A block of wood has a mass of 5.4 kg. The density of the wood is 0.75 g/cm³. Work out the volume of the block.', marks: 3, answer: 5400 / 0.75, unit: 'cm³',
          ms: ['P1 for 5.4 kg = 5400 g', 'P1 for 5400 ÷ 0.75', 'A1 7200 cm³'] }
      ] },

    { id: 'workers', topic: 'ratio', paper: 2, title: 'Proportion problems',
      parts: [
        { t: 'num', q: '6 workers can build a wall in 15 days. How many days would 9 workers take, working at the same rate?', marks: 2, answer: 10, tol: 0,
          ms: ['M1 for 6 × 15 = 90 worker-days', 'A1 10'] },
        { t: 'num', q: '40 fish in a lake are caught, tagged and released. Later, 50 fish are caught and 8 of them are tagged. Estimate the number of fish in the lake.', marks: 2, answer: 250, tol: 0,
          ms: ['M1 for 40 × 50 ÷ 8', 'A1 250'], working: ['8 out of 50 tagged, so the 40 tagged fish are 8/50 of the population', '40 ÷ (8/50) = 250'] }
      ] },

    { id: 'growth', topic: 'ratio', paper: 2, title: 'Growth',
      parts: [
        { t: 'num', q: 'A town has a population of 2400. The population increases by 6% each year. After how many whole years will the population first be more than 3000?', marks: 3, answer: 4, tol: 0,
          ms: ['M1 for 2400 × 1.06ⁿ for at least one n', 'M1 for 2400 × 1.06³ = 2858.4… and 2400 × 1.06⁴ = 3029.9…', 'A1 4 years'] }
      ] },

    { id: 'profit', topic: 'ratio', paper: 2, title: 'Profit',
      intro: '<p>Jo buys 40 cushions for £3.20 each. She sells 25 of them for £5 each and the rest for £2.50 each.</p>',
      parts: [
        { t: 'num', q: 'Work out Jo\'s percentage profit. Give your answer to 1 decimal place.', marks: 4, answer: profit / 128 * 100, tol: 0.002, unit: '%',
          ms: ['P1 for cost 40 × 3.20 = 128', 'P1 for income 25 × 5 + 15 × 2.50 = 162.50', 'P1 for (162.50 − 128) ÷ 128 × 100', `A1 ${(profit / 128 * 100).toFixed(1)}%`] }
      ] },

    // ===================== GEOMETRY =====================
    { id: 'trigside', topic: 'geometry', paper: 2, title: 'Trigonometry: finding a side',
      intro: rightTri(`<text x="128" y="86" text-anchor="end" class="fg-l">12 cm</text><text x="262" y="100" class="fg-l">x</text><text x="68" y="152" class="fg-l">35°</text>`),
      parts: [
        { t: 'num', q: 'Work out the length x. Give your answer to 3 significant figures.', marks: 3, answer: 12 * sin(35), tol: 0.002, unit: 'cm',
          ms: ['M1 for recognising sin 35° = x ÷ 12', 'M1 for 12 × sin 35°', `A1 ${(12 * sin(35)).toFixed(2)}`] },
        { t: 'num', q: 'Work out the length of the base of the triangle, to 3 significant figures.', marks: 2, answer: 12 * cos(35), tol: 0.002, unit: 'cm',
          ms: ['M1 for 12 × cos 35°', `A1 ${(12 * cos(35)).toFixed(2)}`] }
      ] },

    { id: 'trigangle', topic: 'geometry', paper: 2, title: 'Trigonometry: finding an angle',
      intro: rightTri(`<text x="145" y="180" text-anchor="middle" class="fg-l">10 cm</text><text x="262" y="100" class="fg-l">7 cm</text><text x="68" y="152" class="fg-l">y</text>`),
      parts: [
        { t: 'num', q: 'Work out the size of angle y. Give your answer to 1 decimal place.', marks: 2, answer: d(Math.atan(0.7)), tol: 0.002, unit: '°',
          ms: ['M1 for tan y = 7 ÷ 10', `A1 ${d(Math.atan(0.7)).toFixed(1)}°`] }
      ] },

    { id: 'sinerule', topic: 'geometry', paper: 2, title: 'The sine and cosine rules',
      parts: [
        { t: 'num', q: 'In triangle ABC, angle A = 48°, angle B = 67° and BC = 9 cm. Work out the length of AC.', marks: 3, answer: 9 * sin(67) / sin(48), tol: 0.002, unit: 'cm',
          ms: ['M1 for AC ÷ sin 67° = 9 ÷ sin 48°', 'M1 for 9 × sin 67° ÷ sin 48°', `A1 ${(9 * sin(67) / sin(48)).toFixed(2)}`] },
        { t: 'num', q: 'Triangle PQR has PQ = 8 cm, PR = 11 cm and angle QPR = 52°. Work out the length of QR.', marks: 3, answer: cr, tol: 0.002, unit: 'cm',
          ms: ['M1 for 8² + 11² − 2 × 8 × 11 × cos 52°', 'M1 for √(…)', `A1 ${cr.toFixed(2)}`] },
        { t: 'num', q: 'Work out the area of triangle PQR.', marks: 2, answer: 0.5 * 8 * 11 * sin(52), tol: 0.002, unit: 'cm²',
          ms: ['M1 for ½ × 8 × 11 × sin 52°', `A1 ${(0.5 * 8 * 11 * sin(52)).toFixed(2)}`] }
      ] },

    { id: 'sector', topic: 'geometry', paper: 2, title: 'Arcs and sectors',
      intro: '<p>A sector of a circle has radius 9 cm and angle 140°.</p>',
      parts: [
        { t: 'num', q: 'Work out the arc length of the sector.', marks: 2, answer: 140 / 360 * 2 * Math.PI * 9, tol: 0.002, unit: 'cm',
          ms: ['M1 for 140/360 × 2 × π × 9', `A1 ${(140 / 360 * 2 * Math.PI * 9).toFixed(2)}`] },
        { t: 'num', q: 'Work out the perimeter of the sector.', marks: 1, answer: 140 / 360 * 2 * Math.PI * 9 + 18, tol: 0.002, unit: 'cm', ms: [`B1 ${(140 / 360 * 2 * Math.PI * 9 + 18).toFixed(2)} (arc + 2 radii)`] },
        { t: 'num', q: 'Work out the area of the sector.', marks: 2, answer: 140 / 360 * Math.PI * 81, tol: 0.002, unit: 'cm²',
          ms: ['M1 for 140/360 × π × 9²', `A1 ${(140 / 360 * Math.PI * 81).toFixed(2)}`] }
      ] },

    { id: 'volumes', topic: 'geometry', paper: 2, title: 'Volume and surface area',
      parts: [
        { t: 'num', q: 'A cone has base radius 6 cm and height 10 cm. Work out its volume.', marks: 2, answer: Math.PI * 36 * 10 / 3, tol: 0.002, unit: 'cm³',
          ms: ['M1 for ⅓ × π × 6² × 10', `A1 ${(Math.PI * 120).toFixed(1)}`] },
        { t: 'num', q: 'A sphere has radius 6 cm. Work out its surface area.', marks: 2, answer: 4 * Math.PI * 36, tol: 0.002, unit: 'cm²',
          ms: ['M1 for 4 × π × 6²', `A1 ${(4 * Math.PI * 36).toFixed(1)}`] },
        { t: 'num', q: 'A cuboid measures 3 cm by 4 cm by 12 cm. Work out the length of the longest diagonal inside it (from one corner to the opposite corner).', marks: 3, answer: 13, tol: 0, unit: 'cm',
          ms: ['M1 for 3² + 4² = 25 (diagonal of the base = 5)', 'M1 for 5² + 12²', 'A1 13'] }
      ] },

    { id: 'similar', topic: 'geometry', paper: 2, title: 'Similar shapes',
      parts: [
        { t: 'num', q: 'Two cylinders are mathematically similar. Their heights are 8 cm and 12 cm. The volume of the smaller cylinder is 320 cm³. Work out the volume of the larger cylinder.', marks: 3, answer: 320 * 1.5 ** 3, tol: 0, unit: 'cm³',
          ms: ['M1 for length scale factor 12 ÷ 8 = 1.5', 'M1 for 1.5³ (= 3.375)', 'A1 1080 cm³'] },
        { t: 'num', q: 'The surface area of the smaller cylinder is 280 cm². Work out the surface area of the larger cylinder.', marks: 2, answer: 280 * 1.5 ** 2, tol: 0, unit: 'cm²',
          ms: ['M1 for 1.5² (= 2.25)', 'A1 630 cm²'] }
      ] },

    // ===================== PROBABILITY & STATISTICS =====================
    { id: 'tree', topic: 'probstats', paper: 2, title: 'Tree diagrams',
      intro: '<p>The probability that it rains on a given day is 0.3. If it rains, the probability that Ben is late is 0.4. If it does not rain, the probability that Ben is late is 0.1.</p>',
      parts: [
        { t: 'num', q: 'Work out the probability that Ben is late.', marks: 3, answer: 0.3 * 0.4 + 0.7 * 0.1, tol: 0.001,
          ms: ['M1 for 0.3 × 0.4 (= 0.12)', 'M1 for 0.7 × 0.1 (= 0.07)', 'A1 0.19'] },
        { t: 'num', q: 'Ben is late. Work out the probability that it rained. Give your answer to 3 decimal places.', marks: 2, answer: 0.12 / 0.19, tol: 0.002, show: '0.632',
          ms: ['M1 for 0.12 ÷ 0.19', 'A1 0.632'] }
      ] },

    { id: 'groupedmean', topic: 'probstats', paper: 2, title: 'Estimating the mean',
      intro: F.table([['Time t (minutes)', 'Frequency'], ['0 < t ≤ 10', '4'], ['10 < t ≤ 20', '9'], ['20 < t ≤ 30', '5'], ['30 < t ≤ 40', '2']], 'Time taken by 20 students to get to school'),
      parts: [
        { t: 'num', q: 'Work out an estimate for the mean time.', marks: 3, answer: 17.5, tol: 0, unit: 'minutes',
          ms: ['M1 for using midpoints 5, 15, 25, 35', 'M1 for 350 ÷ 20', 'A1 17.5'] },
        { t: 'mcq', q: 'Why is your answer only an estimate?', marks: 1, answer: 'The exact times are not known, so the midpoints are used',
          options: ['The exact times are not known, so the midpoints are used', 'The sample is too small', 'Some students may have lied', 'The frequencies are too low'] }
      ] },

    { id: 'histogram', topic: 'probstats', paper: 2, title: 'Histograms',
      intro: F.table([['Time t (seconds)', 'Frequency density'], ['0 < t ≤ 10', '0.6'], ['10 < t ≤ 20', '1.8'], ['20 < t ≤ 40', '1.2'], ['40 < t ≤ 60', '0.4']], 'Frequency densities from a histogram'),
      parts: [
        { t: 'num', q: 'Work out the total number of people in the survey.', marks: 2, answer: 6 + 18 + 24 + 8, tol: 0,
          ms: ['M1 for frequency = frequency density × class width for at least two classes', 'A1 56'] },
        { t: 'num', q: 'Estimate the number of people who took more than 30 seconds.', marks: 2, answer: 12 + 8, tol: 0,
          ms: ['M1 for ½ × 24 (= 12)', 'A1 20'] }
      ] },

    { id: 'cumfreq', topic: 'probstats', paper: 2, title: 'Cumulative frequency',
      intro: cfGraph,
      parts: [
        { t: 'num', q: 'Use the graph to estimate the median time.', marks: 1, answer: cfAt(30), range: [24, 26], unit: 'minutes', ms: ['B1 25 (accept 24 to 26)'] },
        { t: 'num', q: 'Use the graph to estimate the interquartile range.', marks: 2, answer: cfAt(45) - cfAt(15), range: [13, 16.5], unit: 'minutes',
          ms: ['M1 for reading at 15 and 45 (≈ 17.7 and ≈ 32.3)', `A1 ${(cfAt(45) - cfAt(15)).toFixed(1)} (accept 13 to 16.5)`] },
        { t: 'num', q: 'Estimate how many journeys took longer than 35 minutes.', marks: 2, answer: 60 - (42 + 13 * 0.5), range: [10, 14],
          ms: ['M1 for reading 48 to 49 at 35 minutes', 'A1 11.5 (accept 10 to 14)'] }
      ] }
  ];
})();
