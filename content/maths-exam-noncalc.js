/* Maths exam-style questions: NON-CALCULATOR (Edexcel 1MA1 Higher style, Paper 1).
 * Original questions, modelled on the topics and question types in recent GCSE Higher papers.
 * Types: num, nums, alg (fn = correct expression; must = required form), mcq, text. See exam-engine.js.
 */
(function () {
  const F = window.FIG;
  const tri = (labels, caption) => F.svg('0 0 300 190',
    `<polygon points="40,160 250,160 250,30" class="fg-fill"/><rect x="238" y="148" width="12" height="12" class="fg-axis" fill="none"/>
     ${labels}`, caption);

  window.MATHS_NC = [
    // ===================== NUMBER =====================
    { id: 'estimate', topic: 'number', paper: 1, title: 'Estimation',
      parts: [
        { t: 'num', q: 'Work out an estimate for <span style="white-space:nowrap">(6.12 × 19.8) ÷ 0.49</span>', marks: 3, answer: 240, tol: 0,
          ms: ['M1 for rounding to 6, 20 and 0.5 (at least two correct)', 'M1 for 120 ÷ 0.5', 'A1 240'], working: ['Round each number to 1 significant figure: 6 × 20 ÷ 0.5', '6 × 20 = 120', '120 ÷ 0.5 = 240 (dividing by a half doubles it)'] }
      ] },

    { id: 'primes', topic: 'number', paper: 1, title: 'Prime factors, HCF and LCM',
      parts: [
        { t: 'alg', q: 'Write 360 as a product of its prime factors. Give your answer in index form.', marks: 2, vars: [], fn: () => 360, show: '2³ × 3² × 5',
          must: /^(?=.*2\^3)(?=.*3\^2)(?=.*5)[0-9^*.()]+$/, formMsg: 'write it as powers of primes, e.g. 2^3 × 3^2 × 5', hint: '2^3 × 3^2 × 5',
          ms: ['M1 for a correct method, e.g. a factor tree with at least two correct steps', 'A1 2³ × 3² × 5'] },
        { t: 'num', q: '84 = 2² × 3 × 7. Find the highest common factor (HCF) of 360 and 84.', marks: 2, answer: 12, tol: 0,
          ms: ['M1 for identifying common prime factors 2, 2, 3', 'A1 12'], working: ['Common factors: 2² (both have at least two 2s) and 3', 'HCF = 2² × 3 = 12'] },
        { t: 'num', q: 'Find the lowest common multiple (LCM) of 360 and 84.', marks: 2, answer: 2520, tol: 0,
          ms: ['M1 for 2³ × 3² × 5 × 7 or a list of multiples', 'A1 2520'], working: ['Take the highest power of each prime: 2³ × 3² × 5 × 7', '= 8 × 9 × 5 × 7 = 2520'] }
      ] },

    { id: 'indices', topic: 'number', paper: 1, title: 'Indices and surds',
      parts: [
        { t: 'num', q: 'Work out the value of 64<sup>−2/3</sup>. Give your answer as a fraction.', marks: 2, answer: 1 / 16, tol: 1e-9, show: '1/16',
          ms: ['M1 for 64<sup>1/3</sup> = 4 or 64<sup>2/3</sup> = 16', 'A1 1/16'], working: ['Cube root of 64 = 4', 'Squared: 4² = 16', 'Negative power means reciprocal: 1/16'] },
        { t: 'alg', q: 'Simplify √75 − √12. Give your answer in the form a√3', marks: 2, vars: [], fn: () => 3 * Math.sqrt(3), show: '3√3',
          must: /^3(√|\*?sqrt\(?)3\)?$/, formMsg: 'give it in the form a√3', hint: '3√3',
          ms: ['M1 for √75 = 5√3 or √12 = 2√3', 'A1 3√3'], working: ['√75 = √25 × √3 = 5√3', '√12 = √4 × √3 = 2√3', '5√3 − 2√3 = 3√3'] },
        { t: 'alg', q: 'Rationalise the denominator of 6 ÷ √3. Give your answer in its simplest form.', marks: 2, vars: [], fn: () => 2 * Math.sqrt(3), show: '2√3',
          must: /^2(√|\*?sqrt\(?)3\)?$/, formMsg: 'there should be no surd in a denominator, and it should be simplified', hint: '2√3',
          ms: ['M1 for multiplying top and bottom by √3: 6√3 ÷ 3', 'A1 2√3'], working: ['(6 × √3) ÷ (√3 × √3) = 6√3 ÷ 3', '= 2√3'] }
      ] },

    { id: 'recurring', topic: 'number', paper: 1, title: 'Recurring decimals',
      parts: [
        { t: 'alg', q: 'Write 0.454545… (0.4̇5̇) as a fraction in its simplest form.', marks: 3, vars: [], fn: () => 5 / 11, show: '5/11',
          must: /^5\/11$/, formMsg: 'give it as a fraction in its simplest form', hint: '5/11',
          ms: ['M1 for x = 0.4545… and 100x = 45.4545…', 'M1 for 99x = 45', 'A1 5/11'], working: ['Let x = 0.454545…', '100x = 45.454545…', 'Subtract: 99x = 45', 'x = 45/99 = 5/11'] }
      ] },

    // ===================== ALGEBRA =====================
    { id: 'expand', topic: 'algebra', paper: 1, title: 'Expanding and factorising',
      parts: [
        { t: 'alg', q: 'Expand and simplify (2x − 3)(x + 4)', marks: 2, fn: (v) => (2 * v.x - 3) * (v.x + 4), show: '2x² + 5x − 12',
          must: /^[^()]+$/, formMsg: 'expand the brackets fully', hint: '2x^2 + 5x − 12',
          ms: ['M1 for at least three of the four terms correct: 2x², +8x, −3x, −12', 'A1 2x² + 5x − 12'] },
        { t: 'alg', q: 'Factorise fully 6x² − 15x', marks: 2, fn: (v) => 6 * v.x * v.x - 15 * v.x, show: '3x(2x − 5)',
          must: /^(?=.*3x)(?=.*\()/, formMsg: 'factorise fully: take out the highest common factor, 3x', hint: '3x(2x − 5)',
          ms: ['M1 for a correct partial factorisation, e.g. 3(2x² − 5x) or x(6x − 15)', 'A1 3x(2x − 5)'] },
        { t: 'alg', q: 'Factorise x² − 49', marks: 1, fn: (v) => v.x * v.x - 49, show: '(x + 7)(x − 7)',
          must: /\(.*\)\(.*\)/, formMsg: 'write it as two brackets (difference of two squares)', hint: '(x + 7)(x − 7)',
          ms: ['B1 (x + 7)(x − 7)'] }
      ] },

    { id: 'linear', topic: 'algebra', paper: 1, title: 'Solving equations',
      parts: [
        { t: 'nums', q: 'Solve 5(x − 2) = 2x + 11', marks: 3, fields: [{ l: 'x =', answer: 7 }],
          ms: ['M1 for expanding: 5x − 10', 'M1 for collecting terms: 3x = 21', 'A1 x = 7'], working: ['5x − 10 = 2x + 11', '3x = 21', 'x = 7'] },
        { t: 'nums', q: 'Solve (3x + 1) ÷ 4 = x − 2', marks: 3, fields: [{ l: 'x =', answer: 9 }],
          ms: ['M1 for multiplying both sides by 4: 3x + 1 = 4x − 8', 'M1 for collecting terms', 'A1 x = 9'], working: ['3x + 1 = 4(x − 2) = 4x − 8', '1 + 8 = 4x − 3x', 'x = 9'] }
      ] },

    { id: 'simult', topic: 'algebra', paper: 1, title: 'Simultaneous equations',
      intro: '<p>3x + 2y = 16<br>5x − 2y = 8</p>',
      parts: [
        { t: 'nums', q: 'Solve the simultaneous equations.', marks: 3, fields: [{ l: 'x =', answer: 3 }, { l: 'y =', answer: 3.5, show: '3.5 (or 7/2)' }],
          ms: ['M1 for adding the equations to eliminate y: 8x = 24', 'M1 for substituting x = 3 to find y', 'A1 x = 3, y = 3.5'], working: ['Add: 8x = 24, so x = 3', '9 + 2y = 16, so 2y = 7', 'y = 3.5'] }
      ] },

    { id: 'quadfactor', topic: 'algebra', paper: 1, title: 'Solving a quadratic',
      parts: [
        { t: 'alg', q: 'Factorise x² + 2x − 15', marks: 2, fn: (v) => v.x * v.x + 2 * v.x - 15, show: '(x + 5)(x − 3)',
          must: /\(.*\)\(.*\)/, formMsg: 'write it as two brackets', hint: '(x + 5)(x − 3)',
          ms: ['M1 for (x ± 5)(x ± 3)', 'A1 (x + 5)(x − 3)'] },
        { t: 'nums', q: 'Hence solve x² + 2x − 15 = 0', marks: 1, anyOrder: true, fields: [{ l: 'x =', answer: -5 }, { l: 'x =', answer: 3 }],
          ms: ['B1 x = −5 and x = 3'], working: ['(x + 5)(x − 3) = 0, so x + 5 = 0 or x − 3 = 0'] }
      ] },

    { id: 'sequence', topic: 'algebra', paper: 1, title: 'Sequences',
      parts: [
        { t: 'alg', q: 'Find an expression for the nth term of the sequence 7, 11, 15, 19, …', marks: 2, vars: ['n'], prefix: 'nth term =', fn: (v) => 4 * v.n + 3, show: '4n + 3', hint: '4n + 3',
          ms: ['M1 for 4n + k (k ≠ 3)', 'A1 4n + 3'] },
        { t: 'alg', q: 'Find an expression for the nth term of the quadratic sequence 4, 9, 18, 31, 48, …', marks: 3, vars: ['n'], prefix: 'nth term =', fn: (v) => 2 * v.n * v.n - v.n + 3, show: '2n² − n + 3', hint: '2n^2 − n + 3',
          ms: ['M1 for second differences of 4, giving 2n²', 'M1 for subtracting 2n² to get 2, 1, 0, −1 (= −n + 3)', 'A1 2n² − n + 3'],
          working: ['First differences: 5, 9, 13, 17. Second differences: 4, so the n² term is 2n²', 'Sequence − 2n²: 4−2, 9−8, 18−18, 31−32 = 2, 1, 0, −1, which is −n + 3', 'nth term = 2n² − n + 3'] }
      ] },

    { id: 'inequal', topic: 'algebra', paper: 1, title: 'Inequalities',
      parts: [
        { t: 'nums', q: 'Solve 3x − 4 < 11', marks: 2, fields: [{ l: 'x <', answer: 5 }],
          ms: ['M1 for 3x < 15', 'A1 x < 5'] },
        { t: 'nums', q: 'n is an integer and −3 ≤ 2n < 5. Write down all the possible values of n.', marks: 2, anyOrder: true,
          fields: [{ l: 'n =', answer: -1 }, { l: 'n =', answer: 0 }, { l: 'n =', answer: 1 }, { l: 'n =', answer: 2 }],
          ms: ['M1 for −1.5 ≤ n < 2.5, or three correct values with no more than one wrong', 'A1 −1, 0, 1, 2'], working: ['Divide by 2: −1.5 ≤ n < 2.5', 'Integers: −1, 0, 1, 2'] }
      ] },

    { id: 'subject', topic: 'algebra', paper: 1, title: 'Changing the subject',
      parts: [
        { t: 'alg', q: 'Make t the subject of v = u + at', marks: 2, vars: ['v', 'u', 'a'], prefix: 't =', fn: (v) => (v.v - v.u) / v.a, show: '(v − u) ÷ a', hint: '(v − u)/a',
          ms: ['M1 for v − u = at', 'A1 t = (v − u)/a'] },
        { t: 'alg', q: 'Make x the subject of y = (2x + 5) ÷ (x − 1)', marks: 4, vars: ['y'], prefix: 'x =', fn: (v) => (v.y + 5) / (v.y - 2), show: '(y + 5) ÷ (y − 2)', hint: '(y + 5)/(y − 2)',
          ms: ['M1 for multiplying both sides by (x − 1): xy − y = 2x + 5', 'M1 for collecting x terms: xy − 2x = y + 5', 'M1 for factorising: x(y − 2) = y + 5', 'A1 x = (y + 5)/(y − 2)'] }
      ] },

    { id: 'algfrac', topic: 'algebra', paper: 1, title: 'Algebraic fractions',
      parts: [
        { t: 'alg', q: 'Simplify fully (x² − 9) ÷ (x² + x − 6)', marks: 3, fn: (v) => (v.x - 3) / (v.x - 2), show: '(x − 3) ÷ (x − 2)', hint: '(x − 3)/(x − 2)',
          must: /^[^\^]+$/, formMsg: 'factorise both and cancel the common factor',
          ms: ['M1 for (x + 3)(x − 3)', 'M1 for (x + 3)(x − 2)', 'A1 (x − 3)/(x − 2)'] }
      ] },

    { id: 'cts', topic: 'algebra', paper: 1, title: 'Completing the square',
      parts: [
        { t: 'alg', q: 'Write x² − 6x + 2 in the form (x + a)² + b', marks: 2, fn: (v) => (v.x - 3) ** 2 - 7, show: '(x − 3)² − 7', hint: '(x − 3)^2 − 7',
          must: /^\(x-3\)\^2-7$/, formMsg: 'write it as (x + a)² + b',
          ms: ['M1 for (x − 3)²', 'A1 (x − 3)² − 7'] },
        { t: 'nums', q: 'Write down the coordinates of the turning point of y = x² − 6x + 2', marks: 1, fields: [{ l: 'x =', answer: 3 }, { l: 'y =', answer: -7 }],
          ms: ['B1 (3, −7)'], working: ['The turning point of (x − a)² + b is (a, b)'] }
      ] },

    // ===================== RATIO =====================
    { id: 'share', topic: 'ratio', paper: 1, title: 'Sharing in a ratio',
      parts: [
        { t: 'num', q: 'Amir, Bea and Cal share £72 in the ratio 2 : 3 : 4. How much does Cal get?', marks: 2, answer: 32, tol: 0, unit: '£',
          ms: ['M1 for 72 ÷ 9 = 8', 'A1 £32'], working: ['Total parts = 2 + 3 + 4 = 9', 'One part = 72 ÷ 9 = £8', 'Cal gets 4 × 8 = £32'] },
        { t: 'num', q: 'The ratio of boys to girls in a club is 5 : 3. There are 12 more boys than girls. How many people are in the club?', marks: 3, answer: 48, tol: 0,
          ms: ['P1 for the difference of 2 parts = 12', 'P1 for one part = 6', 'A1 48'], working: ['5 − 3 = 2 parts = 12 people, so 1 part = 6', 'Total = 8 parts = 48'] }
      ] },

    { id: 'percent', topic: 'ratio', paper: 1, title: 'Percentages',
      parts: [
        { t: 'num', q: 'A jacket costs £80. In a sale, the price is reduced to £68. Work out the percentage decrease.', marks: 2, answer: 15, tol: 0, unit: '%',
          ms: ['M1 for 12 ÷ 80 (× 100)', 'A1 15%'], working: ['Decrease = 80 − 68 = £12', '12 ÷ 80 × 100 = 15%'] },
        { t: 'num', q: 'After a 20% increase, a phone costs £96. What was the price before the increase?', marks: 2, answer: 80, tol: 0, unit: '£',
          ms: ['M1 for 96 ÷ 1.2 or 96 ÷ 120 × 100', 'A1 £80'], working: ['120% = £96', '1% = 96 ÷ 120 = 0.8', '100% = £80'] }
      ] },

    { id: 'inverse', topic: 'ratio', paper: 1, title: 'Inverse proportion',
      parts: [
        { t: 'num', q: 'y is inversely proportional to x². When x = 2, y = 5. Find y when x = 4.', marks: 3, answer: 1.25, tol: 1e-9, show: '1.25 (or 5/4)',
          ms: ['M1 for y = k ÷ x²', 'M1 for k = 20', 'A1 1.25 (or 5/4)'], working: ['y = k/x²', '5 = k/4, so k = 20', 'y = 20/16 = 1.25'] }
      ] },

    { id: 'speednc', topic: 'ratio', paper: 1, title: 'Speed',
      parts: [
        { t: 'num', q: 'A car travels 150 km in 1 hour 15 minutes. Work out its average speed.', marks: 2, answer: 120, tol: 0, unit: 'km/h',
          ms: ['M1 for 150 ÷ 1.25 (1 h 15 min = 1.25 h)', 'A1 120 km/h'], working: ['1 hour 15 minutes = 1.25 hours', '150 ÷ 1.25 = 120 km/h'] },
        { t: 'num', q: 'At this speed, how many minutes would it take to travel 50 km?', marks: 2, answer: 25, tol: 0, unit: 'minutes',
          ms: ['M1 for 50 ÷ 120 (= 5/12 hour)', 'A1 25 minutes'], working: ['Time = 50 ÷ 120 = 5/12 of an hour', '5/12 × 60 = 25 minutes'] }
      ] },

    // ===================== GEOMETRY =====================
    { id: 'polygon', topic: 'geometry', paper: 1, title: 'Angles in polygons',
      parts: [
        { t: 'num', q: 'Work out the size of each interior angle of a regular octagon.', marks: 2, answer: 135, tol: 0, unit: '°',
          ms: ['M1 for 360 ÷ 8 = 45 (exterior) or (8 − 2) × 180 = 1080', 'A1 135°'], working: ['Exterior angle = 360 ÷ 8 = 45°', 'Interior angle = 180 − 45 = 135°'] },
        { t: 'num', q: 'Each exterior angle of a regular polygon is 24°. How many sides does it have?', marks: 2, answer: 15, tol: 0,
          ms: ['M1 for 360 ÷ 24', 'A1 15'] }
      ] },

    { id: 'circleth', topic: 'geometry', paper: 1, title: 'Circle theorems',
      intro: '<p>A, B and C are points on a circle with centre O. Angle ACB = 38°.</p>',
      parts: [
        { t: 'num', q: 'Work out the size of angle AOB.', marks: 1, answer: 76, tol: 0, unit: '°', ms: ['B1 76°'] },
        { t: 'mcq', q: 'Which reason explains your answer?', marks: 1, answer: 'The angle at the centre is twice the angle at the circumference',
          options: ['The angle at the centre is twice the angle at the circumference', 'Angles in the same segment are equal', 'Opposite angles of a cyclic quadrilateral add up to 180°', 'The angle in a semicircle is 90°'] },
        { t: 'mcq', q: 'A tangent touches the circle at A. What is the angle between the tangent and the radius OA?', marks: 1, answer: '90°',
          options: ['90°', '45°', '180°', 'It depends on the size of the circle'] }
      ] },

    { id: 'pythnc', topic: 'geometry', paper: 1, title: 'Pythagoras and exact trigonometry',
      intro: tri(`<text x="145" y="180" text-anchor="middle" class="fg-l">12 cm</text><text x="262" y="100" class="fg-l">5 cm</text><text x="128" y="86" text-anchor="end" class="fg-l">x</text><text x="62" y="152" class="fg-l">θ</text>`, 'Diagram NOT accurately drawn'),
      parts: [
        { t: 'num', q: 'Work out the length x.', marks: 2, answer: 13, tol: 0, unit: 'cm',
          ms: ['M1 for 12² + 5² (= 169)', 'A1 13 cm'], working: ['x² = 12² + 5² = 144 + 25 = 169', 'x = √169 = 13 cm'] },
        { t: 'num', q: 'Write down the exact value of tan θ. Give your answer as a fraction.', marks: 1, answer: 5 / 12, tol: 1e-9, show: '5/12', ms: ['B1 5/12'], working: ['tan θ = opposite ÷ adjacent = 5/12'] },
        { t: 'num', q: 'A different right-angled triangle has a hypotenuse of 10 cm and an angle of 30°. Using sin 30° = 0.5, work out the length of the side opposite the 30° angle.', marks: 2, answer: 5, tol: 0, unit: 'cm',
          ms: ['M1 for 10 × sin 30°', 'A1 5 cm'] }
      ] },

    { id: 'vectors', topic: 'geometry', paper: 1, title: 'Vectors',
      intro: '<p>OAB is a triangle. <b>OA</b> = <b>a</b> and <b>OB</b> = <b>b</b>. M is the midpoint of AB.</p>',
      parts: [
        { t: 'alg', q: 'Find the vector <b>AB</b> in terms of <b>a</b> and <b>b</b>.', marks: 1, vars: ['a', 'b'], prefix: 'AB =', fn: (v) => v.b - v.a, show: 'b − a', hint: 'b − a', ms: ['B1 −a + b'] },
        { t: 'alg', q: 'Find the vector <b>OM</b> in terms of <b>a</b> and <b>b</b>. Give your answer in its simplest form.', marks: 2, vars: ['a', 'b'], prefix: 'OM =', fn: (v) => (v.a + v.b) / 2, show: '½a + ½b', hint: '0.5a + 0.5b',
          ms: ['M1 for a + ½(b − a)', 'A1 ½a + ½b or ½(a + b)'], working: ['OM = OA + AM = a + ½AB', '= a + ½(b − a) = ½a + ½b'] }
      ] },

    // ===================== PROBABILITY & STATISTICS =====================
    { id: 'withoutrep', topic: 'probstats', paper: 1, title: 'Probability without replacement',
      intro: '<p>A bag contains 5 red counters and 3 blue counters. Kai takes a counter at random and keeps it. He then takes a second counter at random.</p>',
      parts: [
        { t: 'num', q: 'Work out the probability that both counters are red.', marks: 3, answer: 5 / 14, tol: 0.003, show: '5/14 (0.357)',
          ms: ['M1 for 5/8 seen', 'M1 for 5/8 × 4/7', 'A1 5/14 (or 20/56)'], working: ['First red: 5/8. Second red (one red gone): 4/7', '5/8 × 4/7 = 20/56 = 5/14'] },
        { t: 'num', q: 'Work out the probability that the counters are different colours.', marks: 3, answer: 15 / 28, tol: 0.003, show: '15/28 (0.536)',
          ms: ['M1 for 5/8 × 3/7 or 3/8 × 5/7', 'M1 for adding both: 15/56 + 15/56', 'A1 15/28 (or 30/56)'], working: ['Red then blue: 5/8 × 3/7 = 15/56', 'Blue then red: 3/8 × 5/7 = 15/56', 'Total = 30/56 = 15/28'] }
      ] },

    { id: 'venn', topic: 'probstats', paper: 1, title: 'Venn diagrams',
      intro: '<p>There are 30 students in a class. 18 play football, 12 play tennis and 5 play both.</p>',
      parts: [
        { t: 'num', q: 'How many students play neither sport?', marks: 2, answer: 5, tol: 0,
          ms: ['M1 for 13 + 5 + 7 (= 25) in a Venn diagram', 'A1 5'], working: ['Football only = 18 − 5 = 13. Tennis only = 12 − 5 = 7', '13 + 5 + 7 = 25 play at least one', '30 − 25 = 5'] },
        { t: 'num', q: 'A student who plays football is chosen at random. Find the probability that they also play tennis.', marks: 2, answer: 5 / 18, tol: 0.003, show: '5/18 (0.278)',
          ms: ['M1 for a denominator of 18', 'A1 5/18'], working: ['Only the 18 football players count', '5 of them play tennis: 5/18'] }
      ] },

    { id: 'meannc', topic: 'probstats', paper: 1, title: 'Averages from a table',
      intro: F.table([['Goals scored', 'Frequency'], ['0', '4'], ['1', '6'], ['2', '7'], ['3', '3']], 'Goals scored in 20 matches'),
      parts: [
        { t: 'num', q: 'Work out the mean number of goals per match.', marks: 3, answer: 1.45, tol: 0,
          ms: ['M1 for at least three products: 0, 6, 14, 9', 'M1 for total 29 ÷ 20', 'A1 1.45'], working: ['Goals: 0×4 + 1×6 + 2×7 + 3×3 = 29', '29 ÷ 20 = 1.45'] },
        { t: 'num', q: 'Write down the median number of goals.', marks: 1, answer: 1.5, tol: 0, ms: ['B1 1.5'], working: ['The 10th and 11th values are 1 and 2, so the median is 1.5'] }
      ] }
  ];
})();
