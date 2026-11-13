/* Content for "Know Your Texts" (AQA English Literature).
 * No quotations from in-copyright texts here: Leave Taking and the modern poems are covered with facts,
 * context, form and comparisons. Older-poem quotes are in content/quotes.js (Quote Hunter).
 * Each item: { id, topic, q, a, wrong: [3 wrong answers], why }
 */
(function () {
  // tags: nature, power (human power and pride), abuse (abuse of power), war, heroism, fear, guilt, loss, memory, identity
  const THEME_NAME = { nature: 'the power of nature', power: 'human power and pride', abuse: 'the abuse of power', war: 'the reality of war',
    heroism: 'heroism and patriotism', fear: 'fear', guilt: 'guilt', loss: 'loss and grief', memory: 'memory', identity: 'identity' };

  const POEMS = [
    { id: 'ozymandias', title: 'Ozymandias', poet: 'Percy Bysshe Shelley', tags: ['power', 'abuse', 'nature'],
      about: 'A traveller describes a ruined statue of a boastful king in the desert',
      context: 'A Romantic poet who hated tyranny writes about a broken statue of the Egyptian pharaoh Ramesses II',
      form: 'A sonnet with an irregular rhyme scheme, told second-hand through a traveller',
      compare: [['mylastduchess', 'power'], ['tissue', 'power'], ['london', 'abuse']] },
    { id: 'london', title: 'London', poet: 'William Blake', tags: ['abuse', 'power'],
      about: 'A walk through the city, where every face shows misery caused by those in power',
      context: 'Written during the Industrial Revolution by a poet who criticised the Church and the monarchy',
      form: 'Four regular quatrains with an ABAB rhyme, like a relentless, trapped march',
      compare: [['ozymandias', 'abuse'], ['checkingout', 'abuse']] },
    { id: 'prelude', title: 'Extract from The Prelude', poet: 'William Wordsworth', tags: ['nature', 'fear'],
      about: 'A boy steals a boat at night and is terrified when a huge mountain seems to rise up after him',
      context: 'From a long autobiographical poem by a Romantic poet who saw nature as a powerful teacher',
      form: 'Blank verse (unrhymed iambic pentameter) told in the first person, with a sudden shift in mood',
      compare: [['storm', 'nature'], ['exposure', 'nature']] },
    { id: 'mylastduchess', title: 'My Last Duchess', poet: 'Robert Browning', tags: ['power', 'abuse'],
      about: 'A duke shows a visitor a portrait of his late wife, revealing that he had her silenced',
      context: 'Based on a real 16th-century Italian duke, Alfonso II of Ferrara',
      form: 'A dramatic monologue in rhyming couplets with lots of enjambment, so the speaker seems in control',
      compare: [['ozymandias', 'power'], ['tissue', 'power']] },
    { id: 'charge', title: 'The Charge of the Light Brigade', poet: 'Alfred, Lord Tennyson', tags: ['war', 'heroism'],
      about: 'Six hundred cavalrymen obey a mistaken order and ride bravely into enemy guns',
      context: 'Written by the Poet Laureate about the Battle of Balaclava in the Crimean War, 1854',
      form: 'A strong, galloping dactylic rhythm with heavy repetition, like a battle chant',
      compare: [['bayonet', 'war'], ['exposure', 'war']] },
    { id: 'exposure', title: 'Exposure', poet: 'Wilfred Owen', tags: ['war', 'nature'],
      about: 'Soldiers freeze in the trenches overnight, waiting for an attack that never comes',
      context: 'Written in the winter of 1917 by a soldier-poet who was killed a week before the end of WW1',
      form: 'Eight stanzas using pararhyme (half-rhyme), each ending with a short line',
      compare: [['storm', 'nature'], ['charge', 'war'], ['prelude', 'nature']] },
    { id: 'storm', title: 'Storm on the Island', poet: 'Seamus Heaney', tags: ['nature', 'fear'],
      about: 'Islanders prepare for a storm and realise how powerless they are against it',
      context: 'By a Northern Irish poet; the title may hint at Stormont and the Troubles',
      form: 'A single block of blank verse in a chatty, confident voice that slowly becomes fearful',
      compare: [['prelude', 'nature'], ['exposure', 'nature']] },
    { id: 'bayonet', title: 'Bayonet Charge', poet: 'Ted Hughes', tags: ['war', 'fear', 'heroism'],
      about: 'A soldier runs across no man\'s land and his patriotism is replaced by terror',
      context: 'By a poet whose father fought in WW1; it focuses on one soldier going over the top',
      form: 'Three stanzas that start in the middle of the action, with heavy enjambment like running',
      compare: [['charge', 'heroism'], ['exposure', 'war'], ['remains', 'war']] },
    { id: 'remains', title: 'Remains', poet: 'Simon Armitage', tags: ['war', 'guilt', 'memory'],
      about: 'A soldier cannot stop remembering a looter he and his friends shot',
      context: 'Based on interviews with real soldiers, made for a documentary about returning from Iraq and Afghanistan',
      form: 'A dramatic monologue in a casual, chatty voice that becomes haunted (PTSD)',
      compare: [['warphotographer', 'guilt'], ['poppies', 'memory'], ['bayonet', 'war']] },
    { id: 'poppies', title: 'Poppies', poet: 'Jane Weir', tags: ['loss', 'memory', 'war'],
      about: 'A mother remembers her son leaving home for the army and visits a war memorial',
      context: 'Written for a collection about modern conflict; the poet is also a textile designer',
      form: 'Free verse from a mother\'s point of view, full of fabric and sewing imagery',
      compare: [['kamikaze', 'loss'], ['emigree', 'memory'], ['remains', 'memory']] },
    { id: 'warphotographer', title: 'War Photographer', poet: 'Carol Ann Duffy', tags: ['war', 'guilt'],
      about: 'A photographer develops his pictures of war at home and thinks about how little people care',
      context: 'Inspired by the poet\'s friendship with war photographers',
      form: 'Four regular six-line stanzas with a steady rhyme, like the photographer\'s ordered darkroom',
      compare: [['remains', 'guilt'], ['bayonet', 'war']] },
    { id: 'tissue', title: 'Tissue', poet: 'Imtiaz Dharker', tags: ['power', 'identity'],
      about: 'Paper, maps and documents show that human power and borders are fragile',
      context: 'By a poet who grew up between Pakistan, Scotland and India',
      form: 'Free verse in short stanzas, ending on a single separate line',
      compare: [['ozymandias', 'power'], ['emigree', 'identity']] },
    { id: 'emigree', title: 'The Emigrée', poet: 'Carol Rumens', tags: ['memory', 'identity', 'abuse'],
      about: 'A speaker remembers the sunlit city of her childhood, which is now ruled by tyrants',
      context: 'About exile: someone forced to leave their country who can never return',
      form: 'Three stanzas in the first person, each ending with an image of light',
      compare: [['kamikaze', 'memory'], ['checkingout', 'identity'], ['poppies', 'memory']] },
    { id: 'checkingout', title: 'Checking Out Me History', poet: 'John Agard', tags: ['identity', 'abuse'],
      about: 'A speaker angrily rejects the British history he was taught and reclaims Black history',
      context: 'By a Guyanese poet, celebrating figures such as Toussaint L\'Ouverture and Mary Seacole',
      form: 'Caribbean dialect and phonetic spelling, with italic stanzas for the Black historical figures',
      compare: [['emigree', 'identity'], ['london', 'abuse']] },
    { id: 'kamikaze', title: 'Kamikaze', poet: 'Beatrice Garland', tags: ['war', 'loss', 'memory'],
      about: 'A Japanese pilot turns back from a suicide mission and is shunned by his family',
      context: 'Set in WW2 Japan, where turning back from a kamikaze mission was seen as deeply shameful',
      form: 'Mostly in the third person, switching to the daughter\'s voice telling the story',
      compare: [['poppies', 'loss'], ['emigree', 'memory']] }
  ];

  const byId = Object.fromEntries(POEMS.map((p) => [p.id, p]));
  const others = (p, field) => POEMS.filter((x) => x !== p).map((x) => x[field]);
  const pick3 = (arr) => arr.slice().sort(() => Math.random() - 0.5).slice(0, 3);

  // Built fresh on each page load so wrong options vary.
  function poemItems() {
    const items = [];
    POEMS.forEach((p) => {
      items.push({ id: p.id + '.poet', topic: 'poets', q: `Who wrote <i>${p.title}</i>?`, a: p.poet, wrong: pick3(others(p, 'poet')),
        why: `${p.title} is by ${p.poet}.` });
      items.push({ id: p.id + '.about', topic: 'content', q: `What is <i>${p.title}</i> about?`, a: p.about, wrong: pick3(others(p, 'about')),
        why: `Context: ${p.context}.` });
      items.push({ id: p.id + '.context', topic: 'context', q: `Which poem is this?<br><span class="clue">${p.context}</span>`, a: p.title, wrong: pick3(others(p, 'title')),
        why: `${p.title} (${p.poet}): ${p.about.toLowerCase()}.` });
      items.push({ id: p.id + '.form', topic: 'form', q: `Which poem has this form?<br><span class="clue">${p.form}</span>`, a: p.title, wrong: pick3(others(p, 'title')),
        why: `${p.title}: ${p.form.charAt(0).toLowerCase() + p.form.slice(1)}.` });
      p.compare.forEach(([cid, theme]) => {
        const c = byId[cid];
        // wrong options share no theme with the poem, so they are clearly weaker choices
        const weak = POEMS.filter((x) => x !== p && x !== c && !x.tags.some((t) => p.tags.includes(t))).map((x) => x.title);
        items.push({ id: `${p.id}.cmp.${cid}`, topic: 'comparing', worth: 15,
          q: `The exam asks you to compare <i>${p.title}</i> with another poem on <b>${THEME_NAME[theme]}</b>. Which is the strongest choice?`,
          a: c.title, wrong: pick3(weak),
          why: `Both explore ${THEME_NAME[theme]}. ${c.title}: ${c.about.toLowerCase()}.` });
      });
    });
    return items;
  }

  const CHARS = [
    ['Enid', 'A mother who came to England from Jamaica and wants her daughters to fit in and do well'],
    ['Del', 'Enid\'s elder daughter: rebellious, she leaves home and turns out to be pregnant'],
    ['Viv', 'Enid\'s younger daughter: hard-working, studying for her exams and hoping to go to university'],
    ['Mai', 'An obeah woman (healer and fortune teller) from the Caribbean, whose own children have left her'],
    ['Brod', 'An older Caribbean man who has become angry and disillusioned with life in Britain']
  ];
  const leaveItems = [];
  CHARS.forEach(([name, desc]) => {
    const rest = CHARS.filter((c) => c[0] !== name);
    leaveItems.push({ id: 'who.' + name, topic: 'characters', q: `Who is this?<br><span class="clue">${desc}</span>`, a: name, wrong: pick3(rest.map((c) => c[0])),
      why: `${name}: ${desc.charAt(0).toLowerCase() + desc.slice(1)}.` });
    leaveItems.push({ id: 'desc.' + name, topic: 'characters', q: `Which description fits <b>${name}</b>?`, a: desc, wrong: pick3(rest.map((c) => c[1])),
      why: `${name}: ${desc.charAt(0).toLowerCase() + desc.slice(1)}.` });
  });
  leaveItems.push(
    { id: 'author', topic: 'context', q: 'Who wrote <i>Leave Taking</i>?', a: 'Winsome Pinnock', wrong: ['Andrea Levy', 'Benjamin Zephaniah', 'Meera Syal'],
      why: 'Winsome Pinnock, a British playwright whose parents came from Jamaica.' },
    { id: 'year', topic: 'context', q: 'When was <i>Leave Taking</i> first performed?', a: '1987', wrong: ['1958', '1968', '2007'],
      why: 'It was first performed in 1987 and later revised.' },
    { id: 'from', topic: 'context', q: 'Where did Enid come to England from?', a: 'Jamaica', wrong: ['Trinidad', 'Barbados', 'Nigeria'],
      why: 'Enid is from Jamaica, part of the Caribbean migration to Britain after WW2.' },
    { id: 'windrush', topic: 'context', q: 'What is meant by the "Windrush generation"?', a: 'Caribbean people who came to Britain from 1948 to help rebuild it after WW2',
      wrong: ['British people who emigrated to Australia after WW2', 'Soldiers who came home from the Caribbean after WW1', 'Refugees who fled to Britain in the 1990s'],
      why: 'Named after the ship HMT Empire Windrush, which arrived in 1948.' },
    { id: 'mothercountry', topic: 'context', q: 'Many Caribbean migrants had been taught to see Britain as…', a: 'the "Mother Country"', wrong: ['the "New World"', 'the "Fatherland"', 'the "Old Enemy"'],
      why: 'Many expected a warm welcome from the "Mother Country", but often faced racism instead.' },
    { id: 'racism', topic: 'context', q: 'What did many Caribbean migrants face when they arrived in Britain?', a: 'Racism and discrimination, for example in housing and jobs',
      wrong: ['Free houses and guaranteed jobs', 'A ban on working', 'Being made to return within a year'],
      why: 'Signs such as "No Blacks, no Irish, no dogs" appeared on lodgings. This shapes Enid\'s wish to fit in.' },
    { id: 'obeah', topic: 'context', q: 'What is obeah?', a: 'Caribbean spiritual healing and folk magic with roots in West Africa',
      wrong: ['A Jamaican style of music', 'A type of Caribbean church service', 'A traditional Jamaican dish'],
      why: 'Mai is an obeah woman: people come to her for readings and remedies.' },
    { id: 'between', topic: 'themes', q: 'What do Del and Viv feel caught between?', a: 'Their mother\'s Caribbean culture and growing up British',
      wrong: ['Two rival schools', 'Their mother and their father', 'City and countryside life'],
      why: 'Born in Britain, they feel neither fully British nor fully Caribbean: a key part of the identity theme.' },
    { id: 'enidwants', topic: 'themes', q: 'What does Enid want most for her daughters?', a: 'A better, respectable life in England through education and hard work',
      wrong: ['To move back to Jamaica with her', 'To become obeah women like Mai', 'To leave school early and start work'],
      why: 'Enid has sacrificed a lot and wants them to succeed and fit in, which causes clashes with Del.' },
    { id: 'conflict', topic: 'themes', q: 'Which theme drives most of the arguments in the play?', a: 'Conflict between mothers and daughters across generations',
      wrong: ['Rivalry between two families', 'A fight over money left in a will', 'War between Britain and the Caribbean'],
      why: 'Enid and Del clash, and Mai has lost touch with her own daughters too.' },
    { id: 'maidel', topic: 'characters', q: 'What role does Mai come to play for Del?', a: 'A substitute mother figure', wrong: ['Her teacher', 'Her employer', 'Her rival'],
      why: 'Del goes to Mai after leaving home, and Mai cares for her as her own children no longer visit.' },
    { id: 'title', topic: 'themes', q: 'What does the title <i>Leave Taking</i> suggest?', a: 'Leaving home behind, and what is lost when you say goodbye',
      wrong: ['Going on holiday', 'Taking time off work', 'A soldier leaving for war'],
      why: 'Characters leave Jamaica, leave home, and lose people: the play asks what "home" means.' },
    { id: 'identity', topic: 'themes', q: 'Which pair of themes is central to <i>Leave Taking</i>?', a: 'Identity and belonging', wrong: ['Ambition and kingship', 'Greed and redemption', 'Love and revenge'],
      why: 'The characters ask where they belong. (Ambition is Macbeth; greed and redemption are A Christmas Carol.)' }
  );

  window.KNOW_TEXTS = [
    { id: 'poems', title: 'Power and Conflict', icon: '⚔️', items: poemItems(), topics: { poets: 'poets', content: 'what it\'s about', context: 'context', form: 'form and structure', comparing: 'choosing comparisons' },
      note: 'All 15 AQA Power and Conflict poems: poets, context, form, and which poems to compare.' },
    { id: 'leavetaking', title: 'Leave Taking', icon: '🧳', items: leaveItems, topics: { characters: 'characters', context: 'context', themes: 'themes' },
      note: 'Characters, context and themes. There are no quotes because the play is still in copyright. Check details against his class notes.' }
  ];
})();
