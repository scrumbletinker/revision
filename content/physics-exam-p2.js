/* Physics exam-style questions: Paper 2 topics (Forces, Waves, Magnetism and electromagnetism, Space).
 * Original questions written in the style of AQA GCSE Physics 8463 Higher papers (not copied from them).
 * g = 9.8 N/kg throughout.
 */
(function () {
  const F = window.FIG;

  const vt = F.graph({ x: { label: 'Time in s', max: 40, step: 10 }, y: { label: 'Velocity in m/s', max: 25, step: 5 },
    lines: [{ pts: [[0, 0], [10, 20], [30, 20], [40, 0]] }], caption: 'Figure 1: velocity–time graph for a car' });

  const fe = F.graph({ x: { label: 'Extension in m', max: 0.3, step: 0.05 }, y: { label: 'Force in N', max: 10, step: 2 },
    lines: [{ pts: [[0, 0], [0.2, 8], [0.22, 8.6], [0.25, 9.2], [0.28, 9.6], [0.3, 9.8]] }], caption: 'Figure 3: force–extension graph for a spring' });

  const seesaw = F.svg('0 0 320 130',
    `<line x1="20" y1="70" x2="300" y2="70" class="fg-thick"/>
     <polygon points="160,72 145,110 175,110" class="fg-fill"/>
     <rect x="54" y="44" width="24" height="24" class="fg-fill"/><text x="66" y="38" text-anchor="middle" class="fg-l">A: 300 N</text>
     <rect x="250" y="44" width="24" height="24" class="fg-fill"/><text x="262" y="38" text-anchor="middle" class="fg-l">B</text>
     <line x1="66" y1="88" x2="160" y2="88" class="fg-axis"/><text x="113" y="102" text-anchor="middle" class="fg-l">1.5 m</text>
     <line x1="160" y1="88" x2="262" y2="88" class="fg-axis"/><text x="211" y="102" text-anchor="middle" class="fg-l">1.8 m</text>
     <text x="160" y="126" text-anchor="middle" class="fg-t">pivot</text>`, 'Figure 2: a see-saw');

  window.PHYS_P2 = [
    // ===================== FORCES =====================
    { id: 'vtgraph', topic: 'forces', paper: 2, title: 'A car journey',
      intro: `<p>Figure 1 shows how the velocity of a car changes during a short journey. The mass of the car is 1200 kg.</p>${vt}`,
      parts: [
        { t: 'num', q: 'Calculate the acceleration of the car during the first 10 s.', marks: 2, answer: 2, unit: 'm/s²',
          ms: ['M1 a = 20 ÷ 10', 'A1 2.0 m/s²'], working: ['a = Δv ÷ t = (20 − 0) ÷ 10 = 2.0 m/s²', 'This is the gradient of the graph'] },
        { t: 'num', q: 'Calculate the resultant force on the car during the first 10 s.', marks: 2, answer: 1200 * 2, unit: 'N',
          ms: ['M1 F = 1200 × 2.0', 'A1 2400 N'], working: ['F = ma = 1200 × 2.0 = 2400 N'] },
        { t: 'num', q: 'Determine the total distance travelled by the car in 40 s.', marks: 3, answer: 600, unit: 'm',
          ms: ['M1 distance = area under the graph', 'M1 (½ × 10 × 20) + (20 × 20) + (½ × 10 × 20)', 'A1 600 m'], working: ['Area of first triangle = ½ × 10 × 20 = 100 m', 'Rectangle = 20 × 20 = 400 m', 'Last triangle = ½ × 10 × 20 = 100 m', 'Total = 600 m'] },
        { t: 'mcq', q: 'What does the gradient of a distance–time graph represent?', marks: 1, answer: 'Speed', options: ['Speed', 'Acceleration', 'Distance travelled', 'Resultant force'] }
      ] },

    { id: 'stopping', topic: 'forces', paper: 2, title: 'Stopping distances',
      intro: `<p>The stopping distance of a car = thinking distance + braking distance.</p>`,
      parts: [
        { t: 'text', q: 'Give <b>two</b> factors that increase a driver\'s thinking distance.', marks: 2,
          points: ['Tiredness', 'Drugs or alcohol', 'Distractions (e.g. using a phone)', 'Travelling at a higher speed'], notes: 'Any two.' },
        { t: 'text', q: 'Give <b>two</b> factors that increase the braking distance of a car.', marks: 2,
          points: ['Wet or icy roads', 'Worn brakes', 'Worn tyres', 'Higher speed', 'A heavier car (more mass)'], notes: 'Any two. Do not accept factors that affect reaction time.' },
        { t: 'num', q: 'A driver has a reaction time of 0.60 s and is travelling at 25 m/s. Calculate the thinking distance.', marks: 2, answer: 25 * 0.6, unit: 'm',
          ms: ['M1 s = 25 × 0.60', 'A1 15 m'], working: ['During the reaction time the car is still travelling at 25 m/s', 's = vt = 25 × 0.60 = 15 m'] },
        { t: 'num', q: 'The car then brakes from 25 m/s to rest with a deceleration of 6.25 m/s². Calculate the braking distance.', marks: 3, answer: 25 * 25 / (2 * 6.25), unit: 'm',
          ms: ['M1 0² − 25² = 2 × (−6.25) × s', 'M1 s = 625 ÷ 12.5', 'A1 50 m'], working: ['v² − u² = 2as (from the equation sheet)', '0 − 625 = 2 × (−6.25) × s', 's = 625 ÷ 12.5 = 50 m'] },
        { t: 'text', q: 'Explain why a large deceleration can be dangerous.', marks: 2,
          points: ['A large deceleration needs a large braking force (and large forces on the passengers)', 'The brakes may overheat, or the car may skid, or the passengers may be injured'] }
      ] },

    { id: 'momentum', topic: 'forces', paper: 2, title: 'A collision between trolleys',
      intro: `<p>Trolley A has a mass of 2.0 kg and moves at 3.0 m/s. It collides with trolley B, which has a mass of 1.0 kg and is stationary. The trolleys stick together.</p>`,
      parts: [
        { t: 'num', q: 'Calculate the momentum of trolley A before the collision.', marks: 2, answer: 6, unit: 'kg m/s',
          ms: ['M1 p = 2.0 × 3.0', 'A1 6.0 kg m/s'], working: ['p = mv = 2.0 × 3.0 = 6.0 kg m/s'] },
        { t: 'num', q: 'Calculate the velocity of the trolleys after the collision.', marks: 3, answer: 2, unit: 'm/s',
          ms: ['M1 momentum before = momentum after (conservation of momentum)', 'M1 6.0 = 3.0 × v', 'A1 2.0 m/s'], working: ['Total momentum before = 6.0 kg m/s (B is not moving)', 'After: (2.0 + 1.0) × v = 6.0, so v = 2.0 m/s'] },
        { t: 'num', q: 'The collision lasts 0.15 s. Calculate the force on trolley B during the collision.', marks: 2, answer: 1 * 2 / 0.15, range: [13, 13.4], unit: 'N',
          ms: ['M1 F = (1.0 × 2.0) ÷ 0.15', 'A1 13 N'], working: ['F = mΔv ÷ Δt (equation sheet) = 1.0 × 2.0 ÷ 0.15 = 13.3 N'] },
        { t: 'text', q: 'Explain how the crumple zone of a car reduces the risk of injury to passengers in a crash.', marks: 3,
          points: ['The crumple zone increases the time taken for the car (and passengers) to stop', 'so the rate of change of momentum is smaller', 'so the force on the passengers is smaller'] }
      ] },

    { id: 'moments', topic: 'forces', paper: 2, title: 'Balancing a see-saw',
      intro: `<p>Figure 2 shows two children on a see-saw. Child A has a weight of 300 N.</p>${seesaw}`,
      parts: [
        { t: 'num', q: 'Calculate the moment of child A about the pivot.', marks: 2, answer: 300 * 1.5, unit: 'N m',
          ms: ['M1 M = 300 × 1.5', 'A1 450 N m'], working: ['M = Fd = 300 × 1.5 = 450 N m'] },
        { t: 'num', q: 'The see-saw is balanced. Calculate the weight of child B.', marks: 2, answer: 450 / 1.8, unit: 'N',
          ms: ['M1 450 = W × 1.8', 'A1 250 N'], working: ['Clockwise moment = anticlockwise moment', 'W × 1.8 = 450 so W = 250 N'] },
        { t: 'text', q: 'State the principle of moments.', marks: 1,
          points: ['For an object in balance, the total clockwise moment about a pivot equals the total anticlockwise moment about that pivot'] },
        { t: 'mcq', q: 'A small gear drives a larger gear. What happens to the larger gear?', marks: 1, answer: 'It turns more slowly, with a bigger turning effect',
          options: ['It turns more slowly, with a bigger turning effect', 'It turns faster, with a bigger turning effect', 'It turns faster, with a smaller turning effect', 'It turns at the same speed in the same direction'] }
      ] },

    { id: 'spring', topic: 'forces', paper: 2, title: 'Stretching a spring',
      intro: `<p>A student hung masses on a spring and measured its extension. Figure 3 shows the results.</p>${fe}`,
      parts: [
        { t: 'num', q: 'Use Figure 3 to calculate the spring constant of the spring.', marks: 2, answer: 40, range: [38, 42], unit: 'N/m',
          ms: ['M1 k = 8.0 ÷ 0.20 (any pair of values from the straight section)', 'A1 40 N/m'], working: ['F = ke so k = F ÷ e', 'From the straight part: k = 8.0 ÷ 0.20 = 40 N/m'] },
        { t: 'num', q: 'Calculate the elastic potential energy stored in the spring when the extension is 0.10 m.', marks: 2, answer: 0.5 * 40 * 0.1 * 0.1, unit: 'J',
          ms: ['M1 E<sub>e</sub> = 0.5 × 40 × 0.10²', 'A1 0.20 J'], working: ['E<sub>e</sub> = ½ke² (equation sheet) = 0.5 × 40 × 0.10² = 0.20 J'] },
        { t: 'text', q: 'Describe what Figure 3 shows for extensions above 0.20 m.', marks: 2,
          points: ['The extension is no longer directly proportional to the force (the line curves)', 'The limit of proportionality has been exceeded'], notes: 'Allow: the spring may be inelastically deformed (may not return to its original length).' },
        { t: 'lor', q: 'Describe a method the student could use to get the results in Figure 3.', marks: 6,
          levels: ['Level 3 (5–6 marks): the method would lead to valid results. The key steps are identified and logically sequenced.', 'Level 2 (3–4 marks): the method may not lead to valid results. Most steps are identified, but not fully in a logical order.', 'Level 1 (1–2 marks): some relevant steps are identified, but links are not clear.'],
          indicative: ['Hang the spring from a clamp stand, with a metre ruler held vertically beside it', 'Measure the original (unstretched) length of the spring', 'Add a weight (e.g. 1 N) and measure the new length', 'Calculate extension = new length − original length', 'Repeat, adding weights one at a time', 'Read the ruler at eye level / use a pointer on the spring to improve accuracy', 'Plot a graph of force (weight) against extension', 'Safety: wear eye protection; keep feet clear in case the masses fall'] }
      ] },

    { id: 'skydiver', topic: 'forces', paper: 2, title: 'A skydiver',
      intro: `<p>A skydiver of mass 80 kg jumps from a plane. g = 9.8 N/kg</p>`,
      parts: [
        { t: 'num', q: 'Calculate the weight of the skydiver.', marks: 2, answer: 80 * 9.8, unit: 'N',
          ms: ['M1 W = 80 × 9.8', 'A1 784 N'], working: ['W = mg = 80 × 9.8 = 784 N'] },
        { t: 'text', q: 'Explain why the skydiver accelerates at first, then falls at a constant terminal velocity.', marks: 4,
          points: ['At first, weight is bigger than air resistance, so there is a downward resultant force and they accelerate', 'As speed increases, air resistance increases', 'so the resultant force (and acceleration) decreases', 'When air resistance equals weight, the resultant force is zero, so the velocity is constant (terminal velocity)'] },
        { t: 'text', q: 'The skydiver opens the parachute. Explain what happens to the velocity of the skydiver.', marks: 3,
          points: ['Air resistance increases (because of the larger surface area)', 'Air resistance is now bigger than weight, so the resultant force is upwards and the skydiver decelerates', 'until air resistance equals weight again, at a new, lower terminal velocity'] },
        { t: 'mcq', q: 'Which of these is a vector quantity?', marks: 1, answer: 'Velocity', options: ['Velocity', 'Speed', 'Distance', 'Mass'] }
      ] },

    { id: 'fluids', topic: 'forces', paper: 2, title: 'Pressure in fluids',
      intro: `<p>A diver swims in a lake. The density of the water is 1000 kg/m³. g = 9.8 N/kg</p>`,
      parts: [
        { t: 'num', q: 'Calculate the pressure due to the water at a depth of 4.0 m.', marks: 2, answer: 4 * 1000 * 9.8, unit: 'Pa',
          ms: ['M1 p = 4.0 × 1000 × 9.8', 'A1 39 200 Pa'], working: ['p = hρg (equation sheet) = 4.0 × 1000 × 9.8 = 39 200 Pa'] },
        { t: 'text', q: 'Explain why an object under water experiences an upward force (upthrust).', marks: 2,
          points: ['Pressure increases with depth', 'so the force on the bottom surface is bigger than the force on the top surface, giving a resultant upward force'] },
        { t: 'mcq', q: 'A floating object is not moving up or down. Which statement is correct?', marks: 1, answer: 'Its weight is equal to the upthrust',
          options: ['Its weight is equal to the upthrust', 'Its weight is greater than the upthrust', 'Its weight is less than the upthrust', 'There is no upthrust on a floating object'] },
        { t: 'num', q: 'Atmospheric pressure is 100 000 Pa. Calculate the force of the air on a window of area 0.50 m².', marks: 2, answer: 100000 * 0.5, unit: 'N',
          ms: ['M1 F = 100 000 × 0.50', 'A1 50 000 N'], working: ['p = F ÷ A so F = pA = 100 000 × 0.50 = 50 000 N'] },
        { t: 'text', q: 'Explain why atmospheric pressure decreases as height above the ground increases.', marks: 2,
          points: ['The air gets less dense with height (fewer air particles)', 'and there is less weight of air above, so fewer collisions / smaller force on each unit area'] }
      ] },

    { id: 'cyclist', topic: 'forces', paper: 2, title: 'A cyclist',
      intro: `<p>A cyclist rides along a flat road.</p>`,
      parts: [
        { t: 'text', q: 'The cyclist moves at a constant speed. Explain what this tells you about the forces on the cyclist.', marks: 2,
          points: ['The driving force is equal to the resistive forces (friction and air resistance)', 'so the resultant force is zero (Newton\'s first law)'] },
        { t: 'text', q: 'The tyre pushes backwards on the road. Use Newton\'s third law to describe the force the road exerts on the tyre.', marks: 2,
          points: ['The road pushes forwards on the tyre', 'with a force of the same size (and same type) in the opposite direction'] },
        { t: 'num', q: 'The cyclist applies a driving force of 60 N over a distance of 500 m. Calculate the work done.', marks: 2, answer: 60 * 500, unit: 'J',
          ms: ['M1 W = 60 × 500', 'A1 30 000 J'], working: ['W = Fs = 60 × 500 = 30 000 J'] },
        { t: 'num', q: 'The cyclist takes 100 s to travel the 500 m. Calculate the power of the cyclist.', marks: 2, answer: 30000 / 100, unit: 'W',
          ms: ['M1 P = 30 000 ÷ 100', 'A1 300 W'], working: ['P = W ÷ t = 30 000 ÷ 100 = 300 W'] },
        { t: 'mcq', q: 'What is inertia?', marks: 1, answer: 'The tendency of an object to keep moving at the same velocity (or stay at rest)',
          options: ['The tendency of an object to keep moving at the same velocity (or stay at rest)', 'The force that slows a moving object', 'The energy stored in a moving object', 'The resistance of air to motion'] }
      ] },

    // ===================== WAVES =====================
    { id: 'waveprops', topic: 'waves', paper: 2, title: 'Water waves',
      intro: `<p>A student makes water waves in a ripple tank. 4 complete waves pass a point every 2.0 s. The wavelength is 0.75 m.</p>`,
      parts: [
        { t: 'num', q: 'What is the frequency of the waves?', marks: 1, answer: 2, unit: 'Hz', ms: ['B1 2.0 Hz'], working: ['Frequency = waves per second = 4 ÷ 2.0 = 2.0 Hz'] },
        { t: 'num', q: 'Calculate the speed of the waves.', marks: 2, answer: 2 * 0.75, unit: 'm/s',
          ms: ['M1 v = 2.0 × 0.75', 'A1 1.5 m/s'], working: ['v = fλ = 2.0 × 0.75 = 1.5 m/s'] },
        { t: 'num', q: 'Calculate the period of the waves.', marks: 2, answer: 0.5, unit: 's',
          ms: ['M1 T = 1 ÷ 2.0', 'A1 0.50 s'], working: ['T = 1 ÷ f (equation sheet) = 1 ÷ 2.0 = 0.50 s'] },
        { t: 'text', q: 'Describe the difference between transverse waves and longitudinal waves.', marks: 2,
          points: ['Transverse: the oscillations are perpendicular (at right angles) to the direction of energy transfer', 'Longitudinal: the oscillations are parallel to the direction of energy transfer (compressions and rarefactions)'] },
        { t: 'text', q: 'Describe how you could measure the speed of sound in air using an echo from a large wall.', marks: 4,
          points: ['Measure a large distance from the wall (e.g. 100 m) with a trundle wheel or long tape', 'Make a loud sound (clap) and time how long until the echo is heard', 'Speed = 2 × distance ÷ time (the sound goes there and back)', 'Repeat several times and calculate a mean (or clap in rhythm with the echoes to reduce reaction-time errors)'] }
      ] },

    { id: 'emspectrum', topic: 'waves', paper: 2, title: 'The electromagnetic spectrum',
      intro: `<p>Electromagnetic waves are transverse waves that all travel at 3.0 × 10⁸ m/s in a vacuum.</p>`,
      parts: [
        { t: 'mcq', q: 'Which list is in order of increasing wavelength?', marks: 1, answer: 'gamma, X-ray, ultraviolet, visible, infrared, microwave, radio',
          options: ['gamma, X-ray, ultraviolet, visible, infrared, microwave, radio', 'radio, microwave, infrared, visible, ultraviolet, X-ray, gamma', 'gamma, ultraviolet, X-ray, visible, microwave, infrared, radio', 'radio, infrared, microwave, visible, X-ray, ultraviolet, gamma'] },
        { t: 'multi', q: 'Which <b>two</b> are uses of microwaves?', marks: 2, options: ['Satellite communications', 'Cooking food', 'Medical images of broken bones', 'Fibre optic communications', 'Sterilising surgical instruments'], answers: ['Satellite communications', 'Cooking food'] },
        { t: 'num', q: 'A radio station broadcasts at a frequency of 100 MHz. Calculate the wavelength of the radio waves.', marks: 3, answer: 3e8 / 100e6, unit: 'm',
          ms: ['M1 100 MHz = 1.0 × 10⁸ Hz', 'M1 λ = 3.0 × 10⁸ ÷ 1.0 × 10⁸', 'A1 3.0 m'], working: ['v = fλ so λ = v ÷ f', 'λ = 3.0 × 10⁸ ÷ 1.0 × 10⁸ = 3.0 m'] },
        { t: 'text', q: 'Explain how radio waves produce an electrical signal in a receiving aerial.', marks: 2,
          points: ['The radio waves are absorbed and make electrons in the aerial oscillate', 'creating an alternating current with the same frequency as the radio wave'] },
        { t: 'text', q: 'Explain why too much exposure to ultraviolet radiation is harmful.', marks: 2,
          points: ['Ultraviolet can make skin age prematurely', 'and increase the risk of skin cancer (it can damage cells/DNA)'] }
      ] },

    { id: 'lightlens', topic: 'waves', paper: 2, title: 'Refraction and lenses',
      intro: `<p>A ray of light travels from air into a glass block at an angle to the normal.</p>`,
      parts: [
        { t: 'text', q: 'Explain why the ray changes direction as it enters the glass.', marks: 2,
          points: ['Light slows down when it enters the glass (a denser medium)', 'One side of the wave front slows down first, so the wave changes direction (bends towards the normal)'] },
        { t: 'mcq', q: 'What happens to a ray that enters the glass along the normal?', marks: 1, answer: 'It slows down but does not change direction',
          options: ['It slows down but does not change direction', 'It bends towards the normal', 'It bends away from the normal', 'It is totally reflected'] },
        { t: 'num', q: 'A convex lens produces an image 4.5 cm tall of an object 1.5 cm tall. Calculate the magnification.', marks: 2, answer: 3, unit: '',
          ms: ['M1 magnification = 4.5 ÷ 1.5', 'A1 3 (no unit)'], working: ['magnification = image height ÷ object height = 4.5 ÷ 1.5 = 3'] },
        { t: 'mcq', q: 'What is a real image?', marks: 1, answer: 'An image formed where light rays actually meet, so it can be shown on a screen',
          options: ['An image formed where light rays actually meet, so it can be shown on a screen', 'An image that is always upright', 'An image that only appears to come from behind the lens', 'An image that is always bigger than the object'] },
        { t: 'mcq', q: 'Why does a red object look red in white light?', marks: 1, answer: 'It reflects red light and absorbs the other colours',
          options: ['It reflects red light and absorbs the other colours', 'It absorbs red light and reflects the other colours', 'It transmits all colours equally', 'It emits red light'] }
      ] },

    { id: 'ultrasound', topic: 'waves', paper: 2, title: 'Ultrasound and seismic waves',
      intro: `<p>Ultrasound is sound with a frequency above the range of human hearing.</p>`,
      parts: [
        { t: 'mcq', q: 'What is the range of normal human hearing?', marks: 1, answer: '20 Hz to 20 kHz', options: ['20 Hz to 20 kHz', '2 Hz to 2 kHz', '200 Hz to 200 kHz', '20 kHz to 20 MHz'] },
        { t: 'num', q: 'A ship sends an ultrasound pulse to the seabed. The echo returns after 0.40 s. The speed of sound in water is 1500 m/s. Calculate the depth of the sea.', marks: 3, answer: 1500 * 0.4 / 2, unit: 'm',
          ms: ['M1 distance travelled = 1500 × 0.40 = 600 m', 'M1 divide by 2 (there and back)', 'A1 300 m'], working: ['s = vt = 1500 × 0.40 = 600 m (to the seabed and back)', 'depth = 600 ÷ 2 = 300 m'] },
        { t: 'text', q: 'Explain how ultrasound is used to produce an image of a baby in the womb.', marks: 3,
          points: ['Ultrasound is partly reflected at the boundary between two different tissues (media)', 'The time taken for each reflection to return is measured', 'and used to calculate the distance to each boundary, building up an image'] },
        { t: 'text', q: 'Explain how S-waves give evidence that the Earth has a liquid outer core.', marks: 2,
          points: ['S-waves are transverse and cannot travel through liquids', 'S-waves are not detected on the opposite side of the Earth (a shadow zone), so part of the core must be liquid'] }
      ] },

    { id: 'blackbody', topic: 'waves', paper: 2, title: 'Infrared radiation',
      intro: `<p>All objects emit and absorb infrared radiation.</p>`,
      parts: [
        { t: 'mcq', q: 'Which surface is the best emitter of infrared radiation?', marks: 1, answer: 'Matt black', options: ['Matt black', 'Shiny silver', 'Shiny white', 'Matt white'] },
        { t: 'text', q: 'Explain why the temperature of an object stays constant.', marks: 2,
          points: ['The object absorbs radiation at the same rate as it emits radiation', 'so there is no overall change in its energy'] },
        { t: 'text', q: 'Describe how the radiation emitted by an object changes as its temperature increases.', marks: 2,
          points: ['It emits more radiation (a higher intensity) at every wavelength', 'The peak of the emission moves to shorter wavelengths'] },
        { t: 'text', q: 'Explain how an increase in greenhouse gases makes the temperature of the Earth increase.', marks: 3,
          points: ['Greenhouse gases absorb some of the infrared radiation emitted by the Earth', 'so less radiation is emitted into space', 'The Earth absorbs radiation faster than it emits it, so its temperature rises until a new balance is reached'] }
      ] },

    { id: 'motor', topic: 'magnetism', paper: 2, title: 'Electromagnets and the motor effect',
      intro: `<p>A wire carrying a current is placed between the poles of a magnet.</p>`,
      parts: [
        { t: 'text', q: 'Give <b>two</b> ways of making an electromagnet stronger.', marks: 2,
          points: ['Increase the current', 'Add more turns to the coil', 'Put an iron core inside the coil'], notes: 'Any two.' },
        { t: 'num', q: 'The magnetic flux density is 0.25 T, the current is 4.0 A and the length of wire in the field is 0.15 m. Calculate the force on the wire.', marks: 2, answer: 0.25 * 4 * 0.15, unit: 'N',
          ms: ['M1 F = 0.25 × 4.0 × 0.15', 'A1 0.15 N'], working: ['F = BIl (equation sheet) = 0.25 × 4.0 × 0.15 = 0.15 N'] },
        { t: 'mcq', q: "In Fleming's left-hand rule, what does the first finger represent?", marks: 1, answer: 'The direction of the magnetic field',
          options: ['The direction of the magnetic field', 'The direction of the current', 'The direction of the force (motion)', 'The size of the force'] },
        { t: 'text', q: 'Explain why the coil of a simple d.c. motor keeps rotating.', marks: 3,
          points: ['The current in the coil creates a magnetic field that interacts with the field of the permanent magnet', 'giving forces in opposite directions on the two sides of the coil (motor effect), which turn it', 'The split-ring commutator reverses the current every half turn, so the coil keeps turning the same way'] }
      ] },

    { id: 'transformer', topic: 'magnetism', paper: 2, title: 'Transformers and the National Grid',
      intro: `<p>A transformer has 1150 turns on the primary coil and 50 turns on the secondary coil. The primary coil is connected to the 230 V mains.</p>`,
      parts: [
        { t: 'num', q: 'Calculate the potential difference across the secondary coil.', marks: 2, answer: 230 * 50 / 1150, unit: 'V',
          ms: ['M1 230 ÷ V<sub>s</sub> = 1150 ÷ 50', 'A1 10 V'], working: ['V<sub>p</sub> ÷ V<sub>s</sub> = n<sub>p</sub> ÷ n<sub>s</sub> (equation sheet)', 'V<sub>s</sub> = 230 × 50 ÷ 1150 = 10 V'] },
        { t: 'num', q: 'The current in the secondary coil is 4.6 A. Calculate the current in the primary coil. Assume the transformer is 100% efficient.', marks: 2, answer: 10 * 4.6 / 230, unit: 'A',
          ms: ['M1 230 × I<sub>p</sub> = 10 × 4.6', 'A1 0.20 A'], working: ['V<sub>p</sub>I<sub>p</sub> = V<sub>s</sub>I<sub>s</sub> (equation sheet)', 'I<sub>p</sub> = 10 × 4.6 ÷ 230 = 0.20 A'] },
        { t: 'mcq', q: 'What is true about a step-up transformer?', marks: 1, answer: 'It has more turns on the secondary coil than on the primary coil',
          options: ['It has more turns on the secondary coil than on the primary coil', 'It has more turns on the primary coil than on the secondary coil', 'It increases the current', 'It works with direct current'] },
        { t: 'text', q: 'Explain why the National Grid transmits electricity at a very high potential difference.', marks: 3,
          points: ['For the same power, a high potential difference means a low current', 'A low current means less energy is wasted heating the cables', 'so the transmission is more efficient'] }
      ] },

    { id: 'generator', topic: 'magnetism', paper: 2, title: 'Magnetic fields and the generator effect',
      intro: `<p>A student pushes a bar magnet into a coil of wire connected to a sensitive ammeter.</p>`,
      parts: [
        { t: 'mcq', q: 'Which way do magnetic field lines point outside a bar magnet?', marks: 1, answer: 'From the north pole to the south pole', options: ['From the north pole to the south pole', 'From the south pole to the north pole', 'Around the magnet in circles', 'Straight out from the middle of the magnet'] },
        { t: 'text', q: 'Describe how to plot the magnetic field pattern around a bar magnet using a small compass.', marks: 2,
          points: ['Put the compass near the magnet and mark the direction the needle points (with dots at each end)', 'Move the compass to the last dot and repeat, then join the dots to make a field line'] },
        { t: 'text', q: 'Explain why the ammeter shows a reading when the magnet moves into the coil, and give <b>two</b> ways to increase the reading.', marks: 3,
          points: ['The coil is in a changing magnetic field (field lines are cut), which induces a potential difference, so a current flows', 'Move the magnet faster', 'Use a stronger magnet, or more turns on the coil'] },
        { t: 'mcq', q: 'What is the difference between an alternator and a dynamo?', marks: 1, answer: 'An alternator has slip rings and gives a.c.; a dynamo has a split-ring commutator and gives d.c.',
          options: ['An alternator has slip rings and gives a.c.; a dynamo has a split-ring commutator and gives d.c.', 'An alternator gives d.c.; a dynamo gives a.c.', 'An alternator has no magnet', 'A dynamo has no coil'] }
      ] },

    { id: 'stars', topic: 'space', paper: 2, title: 'Stars and orbits',
      intro: `<p>The Sun is a star in the main sequence stage of its life cycle.</p>`,
      parts: [
        { t: 'mcq', q: 'Which is the life cycle of a star about the same size as the Sun?', marks: 1, answer: 'nebula → protostar → main sequence → red giant → white dwarf',
          options: ['nebula → protostar → main sequence → red giant → white dwarf', 'nebula → protostar → main sequence → red supergiant → supernova', 'protostar → nebula → main sequence → white dwarf → red giant', 'nebula → main sequence → protostar → black hole'] },
        { t: 'text', q: 'Explain why a star stays stable during its main sequence stage.', marks: 2,
          points: ['Gravity pulls the star inwards', 'This is balanced by the outward pressure caused by the energy released by fusion'] },
        { t: 'text', q: 'Where are elements heavier than iron produced?', marks: 1, points: ['In a supernova (the explosion of a massive star)'] },
        { t: 'multi', q: 'A satellite moves in a circular orbit at a constant speed. Which <b>two</b> statements are correct?', marks: 2,
          options: ['Its velocity is constantly changing', 'It is accelerating towards the centre of the orbit', 'Its speed is constantly changing', 'There is no resultant force on it', 'It is moving away from the Earth'],
          answers: ['Its velocity is constantly changing', 'It is accelerating towards the centre of the orbit'] },
        { t: 'text', q: 'Explain why a satellite in a smaller orbit must travel faster.', marks: 2,
          points: ['The gravitational force is stronger closer to the Earth', 'so the satellite must move faster to stay in orbit at that radius'] }
      ] },

    { id: 'redshift', topic: 'space', paper: 2, title: 'Red-shift and the Big Bang',
      intro: `<p>Astronomers study the light from distant galaxies.</p>`,
      parts: [
        { t: 'text', q: 'What is red-shift?', marks: 1, points: ['An increase in the observed wavelength of light from galaxies that are moving away from us'] },
        { t: 'text', q: 'Explain how red-shift gives evidence for the Big Bang theory.', marks: 3,
          points: ['Light from distant galaxies is red-shifted, so the galaxies are moving away from us', 'More distant galaxies have a bigger red-shift, so they are moving away faster', 'so the universe is expanding, which suggests it began from a very small, dense region (the Big Bang)'] },
        { t: 'mcq', q: 'Since 1998, observations of distant supernovae suggest that…', marks: 1, answer: 'the expansion of the universe is speeding up',
          options: ['the expansion of the universe is speeding up', 'the expansion of the universe is slowing down', 'the universe has stopped expanding', 'galaxies are moving towards each other'] },
        { t: 'text', q: 'Suggest why scientists still do not fully understand the universe.', marks: 1,
          points: ['There is evidence of dark mass (dark matter) and dark energy that cannot yet be explained or detected directly'] }
      ] }
  ];
})();
