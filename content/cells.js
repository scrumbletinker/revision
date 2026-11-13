/* Content for "Label It: Cells". Each diagram is an SVG drawing plus the parts to label.
 * a = point on the structure, p = where the numbered pin sits (viewBox 0 0 520 320).
 * Add new diagrams by copying one of these blocks.
 */
window.CELL_DIAGRAMS = [
  {
    id: 'animal', name: 'Animal cell',
    svg: `
      <path class="cyto" d="M130,160 C130,80 210,55 270,58 C350,62 395,110 392,165 C388,235 320,268 255,264 C175,260 130,225 130,160Z"/>
      <circle class="nuc" cx="255" cy="155" r="40"/><circle class="nucleolus" cx="245" cy="145" r="10"/>
      <g transform="translate(180,110) rotate(-25)"><ellipse class="mito" rx="26" ry="12"/><path class="cristae" d="M-18,0 l6,-7 l6,14 l6,-14 l6,14 l6,-7"/></g>
      <g transform="translate(330,205) rotate(30)"><ellipse class="mito" rx="26" ry="12"/><path class="cristae" d="M-18,0 l6,-7 l6,14 l6,-14 l6,14 l6,-7"/></g>
      <g class="ribo"><circle cx="330" cy="105" r="3.5"/><circle cx="338" cy="114" r="3.5"/><circle cx="346" cy="104" r="3.5"/><circle cx="322" cy="118" r="3.5"/><circle cx="185" cy="205" r="3.5"/><circle cx="195" cy="212" r="3.5"/><circle cx="176" cy="214" r="3.5"/></g>`,
    parts: [
      { id: 'nucleus', label: 'Nucleus', a: [282, 170], p: [480, 170] },
      { id: 'membrane', label: 'Cell membrane', a: [132, 165], p: [45, 165] },
      { id: 'cytoplasm', label: 'Cytoplasm', a: [225, 240], p: [45, 275] },
      { id: 'mitochondria', label: 'Mitochondria', a: [180, 110], p: [45, 55] },
      { id: 'ribosomes', label: 'Ribosomes', a: [338, 110], p: [480, 55] }
    ],
    facts: [
      { q: 'Which of these is NOT found in an animal cell?', a: 'Cell wall', wrong: ['Nucleus', 'Mitochondria', 'Ribosomes'] },
      { q: 'Animal cells are eukaryotic. What does that mean?', a: 'Their DNA is enclosed in a nucleus', wrong: ['They have no nucleus', 'They always have a cell wall', 'Their DNA is in plasmids only'] },
      { q: 'A muscle cell needs lots of energy. Which organelle would it have lots of?', a: 'Mitochondria', wrong: ['Chloroplasts', 'Permanent vacuole', 'Plasmids'] }
    ]
  },
  {
    id: 'plant', name: 'Plant cell',
    svg: `
      <rect class="wall" x="108" y="45" width="304" height="230" rx="14"/>
      <rect class="cyto" x="122" y="57" width="276" height="206" rx="9"/>
      <ellipse class="vac" cx="290" cy="150" rx="75" ry="60"/>
      <circle class="nuc" cx="178" cy="215" r="24"/><circle class="nucleolus" cx="172" cy="210" r="6"/>
      <g transform="translate(150,90) rotate(20)"><ellipse class="chloro" rx="18" ry="9"/><path class="thyl" d="M-10,-2 h20 M-10,3 h20"/></g>
      <g transform="translate(375,90) rotate(-20)"><ellipse class="chloro" rx="18" ry="9"/><path class="thyl" d="M-10,-2 h20 M-10,3 h20"/></g>
      <g transform="translate(240,248)"><ellipse class="chloro" rx="18" ry="9"/><path class="thyl" d="M-10,-2 h20 M-10,3 h20"/></g>
      <g transform="translate(160,150) rotate(80)"><ellipse class="chloro" rx="18" ry="9"/><path class="thyl" d="M-10,-2 h20 M-10,3 h20"/></g>
      <g transform="translate(385,190) rotate(80)"><ellipse class="mito" rx="16" ry="7"/><path class="cristae" d="M-10,0 l4,-4 l4,8 l4,-8 l4,8 l4,-4"/></g>
      <g class="ribo"><circle cx="205" cy="75" r="3"/><circle cx="213" cy="82" r="3"/><circle cx="221" cy="72" r="3"/><circle cx="350" cy="235" r="3"/><circle cx="358" cy="243" r="3"/></g>`,
    parts: [
      { id: 'wall', label: 'Cell wall', a: [108, 115], p: [45, 115] },
      { id: 'membrane', label: 'Cell membrane', a: [122, 190], p: [45, 190] },
      { id: 'cytoplasm', label: 'Cytoplasm', a: [140, 250], p: [45, 265] },
      { id: 'chloroplasts', label: 'Chloroplasts', a: [150, 90], p: [45, 40] },
      { id: 'vacuole', label: 'Permanent vacuole', a: [300, 150], p: [480, 150] },
      { id: 'nucleus', label: 'Nucleus', a: [185, 222], p: [480, 290] },
      { id: 'mitochondria', label: 'Mitochondria', a: [385, 190], p: [480, 220] },
      { id: 'ribosomes', label: 'Ribosomes', a: [213, 78], p: [480, 60] }
    ],
    facts: [
      { q: 'Which three structures are found in plant cells but not animal cells?', a: 'Cell wall, chloroplasts, permanent vacuole', wrong: ['Nucleus, cytoplasm, ribosomes', 'Mitochondria, cell wall, plasmids', 'Chloroplasts, flagellum, nucleus'] },
      { q: 'What is a plant cell wall made of?', a: 'Cellulose', wrong: ['Starch', 'Protein', 'Chlorophyll'] },
      { q: 'Why don’t root hair cells have chloroplasts?', a: 'They are underground, so they get no light for photosynthesis', wrong: ['They are too small', 'They don’t need energy', 'Chloroplasts would block water uptake'] }
    ]
  },
  {
    id: 'bacteria', name: 'Bacterial cell',
    svg: `
      <rect class="wall" x="110" y="110" width="300" height="100" rx="50"/>
      <rect class="cyto" x="119" y="119" width="282" height="82" rx="41"/>
      <path class="dna" d="M190,160 C190,135 225,130 240,145 C255,160 275,135 285,150 C295,165 270,190 245,180 C220,170 190,190 190,160Z"/>
      <circle class="plasmid" cx="340" cy="140" r="9"/><circle class="plasmid" cx="358" cy="178" r="7"/><circle class="plasmid" cx="150" cy="178" r="6"/>
      <path class="flag" d="M410,160 c12,-14 24,14 36,0 s24,14 36,0 s18,10 24,4"/>
      <g class="ribo"><circle cx="150" cy="142" r="3"/><circle cx="158" cy="148" r="3"/><circle cx="166" cy="140" r="3"/><circle cx="310" cy="185" r="3"/><circle cx="318" cy="191" r="3"/></g>`,
    parts: [
      { id: 'bwall', label: 'Cell wall', a: [260, 110], p: [260, 40] },
      { id: 'membrane', label: 'Cell membrane', a: [190, 119], p: [140, 40] },
      { id: 'cytoplasm', label: 'Cytoplasm', a: [210, 194], p: [150, 285] },
      { id: 'dna', label: 'Chromosomal DNA', a: [190, 160], p: [45, 160] },
      { id: 'plasmids', label: 'Plasmids', a: [340, 140], p: [380, 40] },
      { id: 'ribosomes', label: 'Ribosomes', a: [314, 188], p: [330, 285] },
      { id: 'flagellum', label: 'Flagellum', a: [458, 160], p: [480, 260] }
    ],
    facts: [
      { q: 'Bacteria are prokaryotic. What does that mean?', a: 'Their DNA is not enclosed in a nucleus', wrong: ['They have a nucleus but no membrane', 'They contain chloroplasts', 'They are made of many cells'] },
      { q: 'Compared with animal and plant cells, bacterial cells are…', a: 'Much smaller', wrong: ['Much larger', 'About the same size', 'Always multicellular'] },
      { q: 'Which microscope lets you see ribosomes and plasmids in detail?', a: 'Electron microscope', wrong: ['Light microscope', 'Hand lens', 'Magnifying glass'] }
    ]
  }
];

/* What each part does. Used for the "What does it do?" questions. */
window.CELL_FUNCTIONS = {
  nucleus: 'Contains the genetic material (DNA) that controls the cell’s activities',
  membrane: 'Controls which substances enter and leave the cell',
  cytoplasm: 'Jelly-like liquid where most of the cell’s chemical reactions happen',
  mitochondria: 'Where aerobic respiration happens, releasing energy',
  ribosomes: 'Where proteins are made (protein synthesis)',
  wall: 'Made of cellulose; strengthens and supports the cell',
  chloroplasts: 'Contain chlorophyll, which absorbs light for photosynthesis',
  vacuole: 'Filled with cell sap; helps keep the cell firm',
  bwall: 'Strengthens and supports the cell (but is not made of cellulose)',
  dna: 'A single loop of DNA, floating free in the cytoplasm, that controls the cell',
  plasmids: 'Small rings of extra DNA, often carrying genes such as antibiotic resistance',
  flagellum: 'A tail-like structure that rotates to move the cell'
};
