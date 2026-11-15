/* Physics exam-style questions: Paper 1 topics (Energy, Electricity, Particle model, Atomic structure).
 * Original questions written in the style of AQA GCSE Physics 8463 Higher papers (not copied from them).
 * Answers are written as calculations so the arithmetic is always right. g = 9.8 N/kg throughout.
 */
(function () {
  const F = window.FIG, S = F.sym;

  // series circuit: battery 6.0 V, resistors 10 Ω and 20 Ω, ammeter
  const seriesCircuit = F.svg('0 0 320 170',
    `<rect x="40" y="30" width="240" height="110" class="fg-axis" fill="none"/>
     ${F.gap(110, 30, 44, 18)}${S.resistor(110, 30)}<text x="110" y="18" text-anchor="middle" class="fg-l">10 Ω</text>
     ${F.gap(210, 30, 44, 18)}${S.resistor(210, 30)}<text x="210" y="18" text-anchor="middle" class="fg-l">20 Ω</text>
     ${F.gap(160, 140, 14, 32)}${S.cell(160, 140)}<text x="160" y="164" text-anchor="middle" class="fg-l">6.0 V</text>
     ${S.meter(40, 85, 'A')}`, 'Figure 1');

  const ivLamp = F.graph({ x: { label: 'Potential difference in V', max: 6, step: 1 }, y: { label: 'Current in A', max: 0.6, step: 0.1 },
    lines: [{ pts: [[0, 0], [0.5, 0.1], [1, 0.18], [1.5, 0.245], [2, 0.3], [2.5, 0.345], [3, 0.38], [3.5, 0.412], [4, 0.44], [4.5, 0.466], [5, 0.49], [5.5, 0.51], [6, 0.53]] }], caption: 'Figure 2: I–V graph for a filament lamp' });

  const heating = F.graph({ x: { label: 'Time in minutes', max: 12, step: 2 }, y: { label: 'Temperature in °C', min: -20, max: 120, step: 20 },
    lines: [{ pts: [[0, -20], [1, 0], [5, 0], [9, 100], [12, 100]] }], caption: 'Figure 3: heating a block of ice' });

  const halfLife = F.graph({ x: { label: 'Time in hours', max: 16, step: 2 }, y: { label: 'Activity in Bq', max: 800, step: 100 },
    lines: [{ pts: Array.from({ length: 33 }, (_, i) => [i / 2, 800 * Math.pow(0.5, (i / 2) / 4)]) }], caption: 'Figure 4: activity of a radioactive sample' });

  window.PHYS_P1 = [
    // ===================== ENERGY =====================
    { id: 'kettle', topic: 'energy', paper: 1, title: 'Heating water in a kettle',
      intro: `<p>An electric kettle has a power of 2.2 kW. It heats 0.80 kg of water from 20 °C to 100 °C.</p><p>Specific heat capacity of water = 4200 J/kg °C</p>`,
      parts: [
        { t: 'num', q: 'Calculate the energy needed to heat the water to 100 °C.', marks: 2, answer: 0.8 * 4200 * 80, unit: 'J',
          ms: ['M1 ΔE = 0.80 × 4200 × 80', 'A1 268 800 J'], working: ['Temperature change Δθ = 100 − 20 = 80 °C', 'ΔE = mcΔθ = 0.80 × 4200 × 80 = 268 800 J'] },
        { t: 'num', q: 'Calculate the time the kettle would take if all the energy from the kettle went into the water. Give your answer to 3 significant figures.', marks: 2, answer: 268800 / 2200, unit: 's',
          ms: ['M1 t = 268 800 ÷ 2200 (allow their answer to 01.1)', 'A1 122 s'], working: ['2.2 kW = 2200 W', 't = E ÷ P = 268 800 ÷ 2200 = 122 s'] },
        { t: 'num', q: 'The kettle actually takes 150 s. Calculate the efficiency of the kettle. Give your answer as a decimal.', marks: 3, answer: 268800 / (2200 * 150), alt: [100 * 268800 / (2200 * 150)], unit: '',
          ms: ['M1 total energy input = 2200 × 150 = 330 000 J', 'M1 efficiency = 268 800 ÷ 330 000', 'A1 0.81 (allow 81%)'], working: ['Total input = P × t = 2200 × 150 = 330 000 J', 'Efficiency = useful output ÷ total input = 268 800 ÷ 330 000 = 0.81'] },
        { t: 'text', q: 'Give <b>two</b> ways energy is wasted by the kettle.', marks: 2,
          points: ['Energy heats the kettle itself (the thermal store of the kettle)', 'Energy is transferred to the surroundings by heating the air', 'Energy is transferred by sound (as the water boils)'], notes: 'Any two. Ignore "heat is lost" without saying where to.' }
      ] },

    { id: 'coaster', topic: 'energy', paper: 1, title: 'A roller coaster',
      intro: `<p>A roller coaster car has a mass of 600 kg. It is pulled to the top of the first hill, 32 m above the ground. It then rolls down the hill.</p><p>g = 9.8 N/kg</p>`,
      parts: [
        { t: 'num', q: 'Calculate the gravitational potential energy gained by the car.', marks: 2, answer: 600 * 9.8 * 32, unit: 'J',
          ms: ['M1 E<sub>p</sub> = 600 × 9.8 × 32', 'A1 188 160 J'], working: ['E<sub>p</sub> = mgh = 600 × 9.8 × 32 = 188 160 J'] },
        { t: 'mcq', q: 'Which energy transfer happens as the car rolls down the hill?', marks: 1, answer: 'Gravitational potential store → kinetic store',
          options: ['Gravitational potential store → kinetic store', 'Kinetic store → gravitational potential store', 'Chemical store → kinetic store', 'Elastic potential store → kinetic store'] },
        { t: 'num', q: 'Calculate the maximum possible speed of the car at the bottom of the hill. Assume no energy is wasted.', marks: 3, answer: Math.sqrt(2 * 188160 / 600), unit: 'm/s',
          ms: ['M1 E<sub>k</sub> = 188 160 J (all the E<sub>p</sub> becomes E<sub>k</sub>)', 'M1 188 160 = ½ × 600 × v²', 'A1 25 m/s'], working: ['E<sub>k</sub> = ½mv² so v² = 2E<sub>k</sub> ÷ m = 2 × 188 160 ÷ 600 = 627.2', 'v = √627.2 = 25.0 m/s'] },
        { t: 'text', q: 'The actual speed at the bottom of the hill is lower than this. Explain why.', marks: 2,
          points: ['Work is done against friction and/or air resistance', 'so some energy is transferred to the thermal store of the surroundings (car, track, air), leaving less in the kinetic store'], notes: 'Ignore "energy is lost" without saying where it goes.' }
      ] },

    { id: 'resources', topic: 'energy', paper: 1, title: 'Generating electricity',
      intro: `<p>The UK generates electricity using a mix of energy resources.</p>`,
      parts: [
        { t: 'multi', q: 'Which <b>two</b> energy resources are renewable?', marks: 2, options: ['Wind', 'Solar', 'Natural gas', 'Nuclear fuel', 'Coal'], answers: ['Wind', 'Solar'] },
        { t: 'text', q: 'Give <b>one</b> advantage and <b>one</b> disadvantage of using wind turbines to generate electricity.', marks: 2,
          points: ['Advantage: renewable, OR no carbon dioxide released while generating, OR no fuel costs', 'Disadvantage: unreliable because it depends on the wind, OR noise/visual pollution, OR needs a large area of land'] },
        { t: 'text', q: 'Gas-fired power stations release carbon dioxide. Explain why they are still used in the UK.', marks: 2,
          points: ['They are reliable: they can generate electricity at any time', 'They can be started up quickly to meet sudden increases in demand'] },
        { t: 'lor', q: 'Compare the use of nuclear power and wind power for generating electricity in the UK.', marks: 6,
          indicative: ['Nuclear: reliable, generates a constant output at any time', 'Nuclear: no carbon dioxide released when generating electricity', 'Nuclear: a small mass of fuel releases a huge amount of energy', 'Nuclear: produces radioactive waste that must be stored safely for a very long time', 'Nuclear: very expensive to build and to decommission; risk of a serious accident', 'Nuclear: uranium is non-renewable', 'Wind: renewable and no carbon dioxide released when generating', 'Wind: unreliable, output depends on the wind speed', 'Wind: many turbines needed for the same output as one power station; large area', 'Wind: cheap to run, no fuel costs; quick to build', 'Wind: visual and noise pollution', 'A comparison should give points for both and link them, e.g. "nuclear is more reliable than wind, but…"'] }
      ] },

    { id: 'crane', topic: 'energy', paper: 1, title: 'A crane motor',
      intro: `<p>An electric motor on a crane lifts a load of mass 250 kg through a height of 12 m in 20 s.</p><p>g = 9.8 N/kg</p>`,
      parts: [
        { t: 'num', q: 'Calculate the gravitational potential energy gained by the load.', marks: 2, answer: 250 * 9.8 * 12, unit: 'J',
          ms: ['M1 E<sub>p</sub> = 250 × 9.8 × 12', 'A1 29 400 J'], working: ['E<sub>p</sub> = mgh = 250 × 9.8 × 12 = 29 400 J'] },
        { t: 'num', q: 'Calculate the useful power output of the motor.', marks: 2, answer: 29400 / 20, unit: 'W',
          ms: ['M1 P = 29 400 ÷ 20', 'A1 1470 W'], working: ['P = E ÷ t = 29 400 ÷ 20 = 1470 W'] },
        { t: 'num', q: 'The input power to the motor is 2.1 kW. Calculate the efficiency of the motor. Give your answer as a decimal.', marks: 2, answer: 1470 / 2100, alt: [70], unit: '',
          ms: ['M1 efficiency = 1470 ÷ 2100', 'A1 0.70 (allow 70%)'], working: ['2.1 kW = 2100 W', 'Efficiency = 1470 ÷ 2100 = 0.70'] },
        { t: 'text', q: 'Suggest <b>one</b> way the efficiency of the motor could be increased.', marks: 1,
          points: ['Lubricate the moving parts to reduce friction', 'Use wires with a lower resistance (e.g. thicker wires) to reduce heating'], notes: 'Either point gets the mark.' }
      ] },

    { id: 'shcprac', topic: 'energy', paper: 1, title: 'Specific heat capacity practical',
      intro: `<p>A student investigates the specific heat capacity of a 1.0 kg aluminium block using an electric heater, a joulemeter and a thermometer.</p>`,
      parts: [
        { t: 'lor', q: 'Describe a method the student could use to find the specific heat capacity of aluminium.', marks: 6,
          levels: ['Level 3 (5–6 marks): the method would lead to a valid result. The key steps are identified and logically sequenced.', 'Level 2 (3–4 marks): the method may not lead to a valid result. Most steps are identified, but not fully in a logical order.', 'Level 1 (1–2 marks): some relevant steps are identified, but links are not clear.'],
          indicative: ['Measure the mass of the block on a balance', 'Put the heater and thermometer in the holes in the block', 'Wrap the block in insulation', 'Connect the heater to a joulemeter (or ammeter, voltmeter and timer)', 'Record the starting temperature', 'Switch on the heater; record the energy transferred and the temperature, e.g. every minute', 'Calculate the temperature rise', 'Use c = ΔE ÷ (m × Δθ), or plot a graph of temperature against energy and use the gradient'] },
        { t: 'num', q: 'In one test, the temperature of the 1.0 kg block increased by 12 °C when 10 800 J of energy was transferred. Calculate the specific heat capacity of aluminium.', marks: 2, answer: 10800 / (1.0 * 12), unit: 'J/kg °C',
          ms: ['M1 10 800 = 1.0 × c × 12', 'A1 900 J/kg °C'], working: ['ΔE = mcΔθ so c = ΔE ÷ (mΔθ) = 10 800 ÷ (1.0 × 12) = 900 J/kg °C'] },
        { t: 'text', q: 'Another student got a value that was much higher than the true value. Explain why.', marks: 2,
          points: ['Some energy was transferred to the surroundings (not all went into the block)', 'so more energy was supplied than was needed to warm the block, making the calculated value too high'] },
        { t: 'text', q: 'Suggest <b>one</b> improvement to the method that would make the result more accurate.', marks: 1,
          points: ['Wrap the block in (more/thicker) insulation', 'Put a few drops of water or oil in the thermometer hole to improve thermal contact'], notes: 'Either point gets the mark.' }
      ] },

    // ===================== ELECTRICITY =====================
    { id: 'series', topic: 'electricity', paper: 1, title: 'A series circuit',
      intro: `<p>Figure 1 shows a series circuit.</p>${seriesCircuit}`,
      parts: [
        { t: 'num', q: 'What is the total resistance of the circuit?', marks: 1, answer: 30, unit: 'Ω', ms: ['B1 30 Ω'], working: ['In series, resistances add: 10 + 20 = 30 Ω'] },
        { t: 'num', q: 'Calculate the current in the circuit.', marks: 2, answer: 6 / 30, unit: 'A',
          ms: ['M1 6.0 = I × 30', 'A1 0.20 A'], working: ['V = IR so I = V ÷ R = 6.0 ÷ 30 = 0.20 A'] },
        { t: 'num', q: 'Calculate the potential difference across the 20 Ω resistor.', marks: 2, answer: 0.2 * 20, unit: 'V',
          ms: ['M1 V = 0.20 × 20', 'A1 4.0 V'], working: ['The current is the same everywhere in a series circuit', 'V = IR = 0.20 × 20 = 4.0 V'] },
        { t: 'num', q: 'Calculate the power transferred by the 10 Ω resistor.', marks: 2, answer: 0.2 * 0.2 * 10, unit: 'W',
          ms: ['M1 P = 0.20² × 10', 'A1 0.40 W'], working: ['P = I²R = 0.20² × 10 = 0.40 W', '(or V across it = 2.0 V, P = VI = 2.0 × 0.20)'] },
        { t: 'mcq', q: 'The 20 Ω resistor is replaced with a 40 Ω resistor. What happens to the current?', marks: 1, answer: 'It decreases',
          options: ['It decreases', 'It increases', 'It stays the same', 'It falls to zero'], why: 'Total resistance increases (to 50 Ω), so the current falls.' }
      ] },

    { id: 'parallel', topic: 'electricity', paper: 1, title: 'A parallel circuit',
      intro: `<p>A 12 V battery is connected to a 6.0 Ω resistor and a 12 Ω resistor. The two resistors are connected <b>in parallel</b>.</p>`,
      parts: [
        { t: 'num', q: 'Calculate the current in the 6.0 Ω resistor.', marks: 2, answer: 12 / 6, unit: 'A',
          ms: ['M1 12 = I × 6.0', 'A1 2.0 A'], working: ['In parallel, each branch has the full 12 V across it', 'I = V ÷ R = 12 ÷ 6.0 = 2.0 A'] },
        { t: 'num', q: 'Calculate the total current from the battery.', marks: 2, answer: 3, unit: 'A',
          ms: ['M1 current in 12 Ω resistor = 12 ÷ 12 = 1.0 A', 'A1 3.0 A'], working: ['Current in 12 Ω branch = 12 ÷ 12 = 1.0 A', 'In parallel, the branch currents add: 2.0 + 1.0 = 3.0 A'] },
        { t: 'mcq', q: 'What is the total resistance of the two resistors in parallel?', marks: 1, answer: 'Less than 6.0 Ω',
          options: ['Less than 6.0 Ω', 'Between 6.0 Ω and 12 Ω', '18 Ω', 'More than 18 Ω'], why: 'Adding a resistor in parallel gives the current another path, so the total resistance is less than the smallest resistor (it is 4.0 Ω).' },
        { t: 'num', q: 'Calculate the charge that flows through the battery in 2.0 minutes.', marks: 2, answer: 3 * 120, unit: 'C',
          ms: ['M1 Q = 3.0 × 120', 'A1 360 C'], working: ['2.0 minutes = 120 s', 'Q = It = 3.0 × 120 = 360 C'] },
        { t: 'num', q: 'Calculate the energy transferred by the battery in this time.', marks: 2, answer: 360 * 12, unit: 'J',
          ms: ['M1 E = 360 × 12', 'A1 4320 J'], working: ['E = QV = 360 × 12 = 4320 J'] }
      ] },

    { id: 'mains', topic: 'electricity', paper: 1, title: 'Mains electricity and safety',
      intro: `<p>A toaster has a metal case and is connected to the mains with a three-core cable.</p>`,
      parts: [
        { t: 'mcq', q: 'What are the frequency and potential difference of the UK mains supply?', marks: 1, answer: '50 Hz and 230 V', options: ['50 Hz and 230 V', '230 Hz and 50 V', '60 Hz and 120 V', '50 Hz and 120 V'] },
        { t: 'mcq', q: 'What colour is the insulation on the live wire?', marks: 1, answer: 'Brown', options: ['Brown', 'Blue', 'Green and yellow stripes', 'Black'] },
        { t: 'mcq', q: 'What is the difference between a.c. and d.c.?', marks: 1, answer: 'a.c. keeps changing direction; d.c. flows in one direction only',
          options: ['a.c. keeps changing direction; d.c. flows in one direction only', 'd.c. keeps changing direction; a.c. flows in one direction only', 'a.c. comes from cells; d.c. comes from the mains', 'a.c. has a higher current than d.c.'] },
        { t: 'text', q: 'Explain why touching the live wire can be dangerous even when the toaster is switched off.', marks: 2,
          points: ['The live wire is still at a high potential (230 V) when the switch is off', 'Your body is at 0 V (earth potential), so the large potential difference drives a current through you: an electric shock'] },
        { t: 'text', q: 'A fault makes the live wire touch the metal case. Explain how the earth wire and the fuse protect the user.', marks: 3,
          points: ['A current flows from the live wire, through the case, along the earth wire (a low-resistance path)', 'This current is large', 'so the fuse melts and breaks the circuit, and the case is no longer live'] }
      ] },

    { id: 'ivlamp', topic: 'electricity', paper: 1, title: 'Investigating a filament lamp',
      intro: `<p>A student measured the current through a filament lamp for different potential differences. Figure 2 shows the results.</p>${ivLamp}`,
      parts: [
        { t: 'num', q: 'Use Figure 2 to find the current through the lamp when the potential difference is 4.0 V.', marks: 1, answer: 0.44, range: [0.42, 0.46], unit: 'A', ms: ['B1 0.44 A (allow 0.42 to 0.46)'] },
        { t: 'num', q: 'Calculate the resistance of the lamp at 4.0 V.', marks: 2, answer: 4 / 0.44, range: [4 / 0.46, 4 / 0.42], unit: 'Ω',
          ms: ['M1 4.0 = 0.44 × R (allow their reading)', 'A1 9.1 Ω (allow 8.7 to 9.5)'], working: ['R = V ÷ I = 4.0 ÷ 0.44 = 9.1 Ω'] },
        { t: 'text', q: 'Explain why the resistance of the lamp increases as the potential difference increases.', marks: 3,
          points: ['As the current increases the filament gets hotter (its temperature increases)', 'The ions (atoms) in the metal vibrate more', 'so the electrons collide with them more often, which increases the resistance'] },
        { t: 'mcq', q: 'Which component has an I–V graph that is a straight line through the origin?', marks: 1, answer: 'A resistor at constant temperature',
          options: ['A resistor at constant temperature', 'A filament lamp', 'A diode', 'A thermistor that is warming up'] },
        { t: 'lor', q: 'Describe a method the student could use to get the results in Figure 2. You may include a circuit diagram in your answer.', marks: 6,
          levels: ['Level 3 (5–6 marks): the method would lead to valid results. The key steps are identified and logically sequenced.', 'Level 2 (3–4 marks): the method may not lead to valid results. Most steps are identified, but not fully in a logical order.', 'Level 1 (1–2 marks): some relevant steps are identified, but links are not clear.'],
          indicative: ['Connect the lamp in series with an ammeter and a power supply', 'Connect a voltmeter in parallel with the lamp', 'Include a variable resistor (or variable power supply) to change the p.d.', 'Record the current and p.d.', 'Change the setting and take readings over a range, e.g. 0 to 6 V in 0.5 V steps', 'Reverse the connections to the supply to get negative values', 'Plot a graph of current against potential difference', 'Switch off between readings so the lamp does not overheat'] }
      ] },

    { id: 'static', topic: 'electricity', paper: 1, title: 'Static electricity',
      intro: `<p>A student rubs a polythene rod with a cloth. The rod becomes negatively charged.</p>`,
      parts: [
        { t: 'text', q: 'Explain how the rod becomes negatively charged.', marks: 2,
          points: ['Electrons are transferred by friction (rubbing)', 'from the cloth to the rod'], notes: 'Do not accept "positive charges move".' },
        { t: 'mcq', q: 'What charge does the cloth now have?', marks: 1, answer: 'Positive', options: ['Positive', 'Negative', 'No charge', 'It depends on the material'] },
        { t: 'text', q: 'A second negatively charged rod is brought close to the first. Describe and explain what happens.', marks: 2,
          points: ['The rods repel (push apart)', 'because like charges repel (a non-contact force due to their electric fields)'] },
        { t: 'mcq', q: 'Which describes the electric field lines around an isolated negatively charged sphere?', marks: 1, answer: 'Straight lines pointing radially inwards, towards the sphere',
          options: ['Straight lines pointing radially inwards, towards the sphere', 'Straight lines pointing radially outwards, away from the sphere', 'Circles around the sphere', 'Parallel lines passing the sphere'] },
        { t: 'text', q: 'When the charged rod is brought very close to an earthed metal object, a spark jumps across the gap. Explain why.', marks: 3,
          points: ['There is a large potential difference between the rod and the earthed object, giving a strong electric field', 'The strong field ionises the air particles', 'so the air conducts and charge (electrons) flows to earth as a spark'] }
      ] },

    // ===================== PARTICLE MODEL =====================
    { id: 'density', topic: 'particles', paper: 1, title: 'Density of a stone',
      intro: `<p>A student finds the density of an irregular stone. The stone has a mass of 156 g. When it is lowered into a eureka can, 60 cm³ of water is displaced.</p>`,
      parts: [
        { t: 'num', q: 'Calculate the density of the stone in g/cm³.', marks: 2, answer: 156 / 60, unit: 'g/cm³',
          ms: ['M1 ρ = 156 ÷ 60', 'A1 2.6 g/cm³'], working: ['The volume of the stone = volume of water displaced = 60 cm³', 'ρ = m ÷ V = 156 ÷ 60 = 2.6 g/cm³'] },
        { t: 'num', q: 'Give the density of the stone in kg/m³.', marks: 1, answer: 2600, unit: 'kg/m³', ms: ['B1 2600 kg/m³'], working: ['1 g/cm³ = 1000 kg/m³, so 2.6 g/cm³ = 2600 kg/m³'] },
        { t: 'text', q: 'Explain, in terms of particles, why the density of a gas is much lower than the density of a solid.', marks: 2,
          points: ['The particles in a gas are much further apart (more space between them)', 'so there is less mass in the same volume'] },
        { t: 'mcq', q: 'What is sublimation?', marks: 1, answer: 'A change of state directly from solid to gas', options: ['A change of state directly from solid to gas', 'A change of state from liquid to gas', 'A change of state from gas to liquid', 'Dissolving a solid in a liquid'] }
      ] },

    { id: 'ice', topic: 'particles', paper: 1, title: 'Heating ice',
      intro: `<p>A block of ice is heated at a constant rate. Figure 3 shows how its temperature changes.</p>${heating}<p>Specific latent heat of fusion of ice = 334 000 J/kg<br>Specific heat capacity of water = 4200 J/kg °C</p>`,
      parts: [
        { t: 'text', q: 'Explain why the temperature stays the same between 1 minute and 5 minutes.', marks: 2,
          points: ['The ice is melting (changing state)', 'The energy supplied breaks bonds between the particles / increases the potential energy of the particles, not their kinetic energy'] },
        { t: 'num', q: 'The mass of the ice is 0.50 kg. Calculate the energy needed to melt all of the ice at 0 °C.', marks: 2, answer: 0.5 * 334000, unit: 'J',
          ms: ['M1 E = 0.50 × 334 000', 'A1 167 000 J'], working: ['E = mL = 0.50 × 334 000 = 167 000 J'] },
        { t: 'num', q: 'Calculate the energy needed to heat the 0.50 kg of water from 0 °C to 100 °C.', marks: 2, answer: 0.5 * 4200 * 100, unit: 'J',
          ms: ['M1 ΔE = 0.50 × 4200 × 100', 'A1 210 000 J'], working: ['ΔE = mcΔθ = 0.50 × 4200 × 100 = 210 000 J'] },
        { t: 'mcq', q: 'What is the internal energy of a substance?', marks: 1, answer: 'The total kinetic energy and potential energy of all its particles',
          options: ['The total kinetic energy and potential energy of all its particles', 'The kinetic energy of its particles only', 'The energy stored in its chemical bonds', 'Its temperature multiplied by its mass'] },
        { t: 'text', q: 'The specific latent heat of vaporisation of water is much bigger than its specific latent heat of fusion. Suggest why.', marks: 1,
          points: ['When boiling, the particles must be separated completely (all the forces between them overcome), but melting only loosens them'] }
      ] },

    { id: 'syringe', topic: 'particles', paper: 1, title: 'Gas in a syringe',
      intro: `<p>A sealed syringe contains 120 cm³ of air at a pressure of 100 kPa. The plunger is pushed in slowly until the volume is 80 cm³. The temperature stays the same.</p>`,
      parts: [
        { t: 'num', q: 'Calculate the new pressure of the air.', marks: 2, answer: 100 * 120 / 80, unit: 'kPa',
          ms: ['M1 100 × 120 = p × 80', 'A1 150 kPa'], working: ['pV = constant, so p₁V₁ = p₂V₂', '100 × 120 = p × 80, so p = 150 kPa'] },
        { t: 'text', q: 'Explain, in terms of particles, why the pressure increases when the volume decreases.', marks: 2,
          points: ['The particles hit the walls of the syringe more often (the rate of collisions increases)', 'so the total force on each unit area of the walls is bigger'] },
        { t: 'text', q: 'When the plunger is pushed in quickly, the temperature of the air rises. Explain why.', marks: 2,
          points: ['Work is done on the gas by the plunger', 'This increases the internal energy (kinetic energy) of the particles, so the temperature rises'] },
        { t: 'text', q: 'The sealed syringe is then put in hot water. Explain why the pressure of the air increases.', marks: 3,
          points: ['The particles gain kinetic energy and move faster', 'so they collide with the walls more often', 'and with more force (a bigger change in momentum each collision)'] }
      ] },

    { id: 'states', topic: 'particles', paper: 1, title: 'States of matter',
      intro: `<p>Matter can be a solid, a liquid or a gas.</p>`,
      parts: [
        { t: 'mcq', q: 'In which state do the particles vibrate about fixed positions?', marks: 1, answer: 'Solid', options: ['Solid', 'Liquid', 'Gas', 'All three states'] },
        { t: 'text', q: 'Some ice melts in a sealed container. Explain why the mass does not change.', marks: 1,
          points: ['The number of particles stays the same (mass is conserved in a change of state)'] },
        { t: 'num', q: 'A room has a volume of 50 m³. The density of air is 1.2 kg/m³. Calculate the mass of air in the room.', marks: 2, answer: 50 * 1.2, unit: 'kg',
          ms: ['M1 m = 1.2 × 50', 'A1 60 kg'], working: ['ρ = m ÷ V so m = ρV = 1.2 × 50 = 60 kg'] },
        { t: 'num', q: 'Calculate the energy needed to boil away 0.20 kg of water at 100 °C. Specific latent heat of vaporisation of water = 2 260 000 J/kg', marks: 2, answer: 0.2 * 2260000, unit: 'J',
          ms: ['M1 E = 0.20 × 2 260 000', 'A1 452 000 J'], working: ['E = mL = 0.20 × 2 260 000 = 452 000 J'] },
        { t: 'mcq', q: 'How does the motion of gas particles change when the temperature of the gas increases?', marks: 1, answer: 'Their average speed increases',
          options: ['Their average speed increases', 'Their average speed decreases', 'They get bigger', 'They stop colliding'] }
      ] },

    // ===================== ATOMIC STRUCTURE =====================
    { id: 'atommodels', topic: 'atomic', paper: 1, title: 'Models of the atom',
      intro: `<p>Scientists' model of the atom has changed over time.</p>`,
      parts: [
        { t: 'mcq', q: 'Which describes the plum pudding model of the atom?', marks: 1, answer: 'A ball of positive charge with negative electrons embedded in it',
          options: ['A ball of positive charge with negative electrons embedded in it', 'A tiny positive nucleus with electrons orbiting it', 'A solid sphere that cannot be divided', 'A nucleus of protons and neutrons with electrons in shells'] },
        { t: 'text', q: 'In the alpha particle scattering experiment, alpha particles were fired at thin gold foil. Explain how the results led to the nuclear model of the atom.', marks: 4,
          points: ['Most alpha particles went straight through, so most of the atom is empty space', 'Some alpha particles were deflected, so the centre of the atom (nucleus) is positively charged', 'Very few bounced back, so most of the mass is concentrated in a tiny nucleus', 'These results could not be explained by the plum pudding model, so it was replaced'] },
        { t: 'mcq', q: 'Which scientist provided evidence that the nucleus contains neutrons?', marks: 1, answer: 'James Chadwick', options: ['James Chadwick', 'Niels Bohr', 'J. J. Thomson', 'Ernest Rutherford'] },
        { t: 'mcq', q: 'What is the approximate radius of an atom?', marks: 1, answer: '1 × 10⁻¹⁰ m', options: ['1 × 10⁻¹⁰ m', '1 × 10⁻¹⁴ m', '1 × 10⁻⁵ m', '1 × 10⁻³ m'] },
        { t: 'text', q: 'Suggest why scientific models of the atom change over time.', marks: 1,
          points: ['New experimental evidence is found that the old model cannot explain'] }
      ] },

    { id: 'decay', topic: 'atomic', paper: 1, title: 'Radioactive decay',
      intro: `<p>Uranium-238 has 92 protons. It decays by emitting an alpha particle.</p>`,
      parts: [
        { t: 'mcq', q: 'What is an alpha particle made of?', marks: 1, answer: 'Two protons and two neutrons', options: ['Two protons and two neutrons', 'One electron', 'Two protons and two electrons', 'Electromagnetic radiation'] },
        { t: 'num', q: 'What is the mass number of the new nucleus formed?', marks: 1, answer: 234, unit: '', ms: ['B1 234'], working: ['An alpha particle has a mass number of 4: 238 − 4 = 234'] },
        { t: 'num', q: 'What is the atomic number of the new nucleus formed?', marks: 1, answer: 90, unit: '', ms: ['B1 90'], working: ['An alpha particle has an atomic number of 2: 92 − 2 = 90'] },
        { t: 'text', q: 'Describe what happens inside a nucleus during beta decay.', marks: 2,
          points: ['A neutron changes into a proton', 'and a high-speed electron (beta particle) is emitted from the nucleus'] },
        { t: 'multi', q: 'Which <b>two</b> statements about gamma radiation are correct?', marks: 2,
          options: ['It is very penetrating; thick lead or concrete is needed to absorb most of it', 'It has no mass and no charge', 'It is the most ionising type of nuclear radiation', 'It is stopped by a sheet of paper', 'It is a stream of electrons'],
          answers: ['It is very penetrating; thick lead or concrete is needed to absorb most of it', 'It has no mass and no charge'] }
      ] },

    { id: 'halflife', topic: 'atomic', paper: 1, title: 'Half-life',
      intro: `<p>Figure 4 shows how the activity of a radioactive sample changes over time.</p>${halfLife}`,
      parts: [
        { t: 'num', q: 'Use Figure 4 to find the half-life of the sample.', marks: 1, answer: 4, unit: 'hours', ms: ['B1 4 hours'], working: ['The activity halves from 800 Bq to 400 Bq in 4 hours'] },
        { t: 'num', q: 'What is the activity of the sample after 12 hours?', marks: 1, answer: 100, range: [90, 110], unit: 'Bq', ms: ['B1 100 Bq'], working: ['12 hours = 3 half-lives: 800 → 400 → 200 → 100 Bq'] },
        { t: 'num', q: 'A different isotope has a half-life of 6 days. A sample has an activity of 320 Bq. Calculate its activity after 18 days.', marks: 2, answer: 40, unit: 'Bq',
          ms: ['M1 18 days = 3 half-lives', 'A1 40 Bq'], working: ['18 ÷ 6 = 3 half-lives', '320 → 160 → 80 → 40 Bq'] },
        { t: 'text', q: 'A radioactive tracer is injected into a patient. Explain why the tracer should have a short half-life.', marks: 2,
          points: ['The activity falls quickly, so the patient is exposed to radiation (irradiated) for a shorter time', 'reducing the risk of damage to cells (e.g. mutations or cancer)'], notes: 'Allow: but long enough to be detected for the scan.' },
        { t: 'mcq', q: 'What is radioactive contamination?', marks: 1, answer: 'Unwanted radioactive atoms getting onto or into an object',
          options: ['Unwanted radioactive atoms getting onto or into an object', 'An object being exposed to nuclear radiation from outside', 'An object becoming radioactive after being irradiated', 'Radiation that comes from the Sun'] }
      ] },

    { id: 'fission', topic: 'atomic', paper: 1, title: 'Nuclear fission and fusion',
      intro: `<p>Nuclear power stations use the fission of uranium-235.</p>`,
      parts: [
        { t: 'text', q: 'Describe what happens during the fission of a uranium-235 nucleus.', marks: 3,
          points: ['A neutron is absorbed by the uranium-235 nucleus (making it unstable)', 'The nucleus splits into two smaller nuclei (daughter nuclei)', 'and releases two or three neutrons and energy (including gamma rays)'] },
        { t: 'text', q: 'Explain how a chain reaction happens, and how it is controlled in a nuclear reactor.', marks: 3,
          points: ['The neutrons released go on to cause more fission reactions', 'Control rods absorb some of the neutrons', 'so the rate of fission (and energy release) is controlled'] },
        { t: 'mcq', q: 'What is nuclear fusion?', marks: 1, answer: 'Two light nuclei join to form a heavier nucleus', options: ['Two light nuclei join to form a heavier nucleus', 'A heavy nucleus splits into two lighter nuclei', 'A nucleus emits an alpha particle', 'Electrons join a nucleus'] },
        { t: 'text', q: 'Suggest why fusion is not yet used in power stations.', marks: 1,
          points: ['It needs extremely high temperatures and pressures, which are very hard to achieve and contain (so far, more energy goes in than comes out)'] }
      ] }
  ];
})();
