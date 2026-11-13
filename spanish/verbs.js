/* Spanish verb conjugator for GCSE tenses.
 * Regular verbs are built from rules; irregular forms are listed explicitly
 * (a '-' in an override means "use the regular form for that person").
 */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.SpanishVerbs = factory();
})(this, function () {
  'use strict';

  const PERSONS = ['yo', 'tú', 'él / ella', 'nosotros', 'vosotros', 'ellos / ellas'];
  const PERSON_EN = ['I', 'you', 'he / she', 'we', 'you (plural)', 'they'];

  const TENSES = [
    { id: 'present', name: 'Present', hint: 'do / am doing' },
    { id: 'preterite', name: 'Preterite', hint: 'did (a finished action in the past)' },
    { id: 'imperfect', name: 'Imperfect', hint: 'used to / was doing' },
    { id: 'near', name: 'Near future', hint: 'going to… (ir + a + infinitive)' },
    { id: 'future', name: 'Future', hint: 'will…' },
    { id: 'conditional', name: 'Conditional', hint: 'would…' },
    { id: 'perfect', name: 'Perfect', hint: 'have done (haber + past participle)' }
  ];

  const END = {
    present: { ar: ['o', 'as', 'a', 'amos', 'áis', 'an'], er: ['o', 'es', 'e', 'emos', 'éis', 'en'], ir: ['o', 'es', 'e', 'imos', 'ís', 'en'] },
    preterite: { ar: ['é', 'aste', 'ó', 'amos', 'asteis', 'aron'], er: ['í', 'iste', 'ió', 'imos', 'isteis', 'ieron'], ir: ['í', 'iste', 'ió', 'imos', 'isteis', 'ieron'] },
    imperfect: { ar: ['aba', 'abas', 'aba', 'ábamos', 'abais', 'aban'], er: ['ía', 'ías', 'ía', 'íamos', 'íais', 'ían'], ir: ['ía', 'ías', 'ía', 'íamos', 'íais', 'ían'] },
    future: ['é', 'ás', 'á', 'emos', 'éis', 'án'],
    conditional: ['ía', 'ías', 'ía', 'íamos', 'íais', 'ían']
  };
  const HABER = ['he', 'has', 'ha', 'hemos', 'habéis', 'han'];
  const IR_PRESENT = ['voy', 'vas', 'va', 'vamos', 'vais', 'van'];
  const s = (str) => str.split(' ');

  // en: English meaning; irr: tense -> 6 forms ('-' = regular); fut: irregular future/conditional stem; pp: participle
  const VERBS = [
    // regular -ar
    { inf: 'hablar', en: 'to speak' }, { inf: 'trabajar', en: 'to work' }, { inf: 'estudiar', en: 'to study' },
    { inf: 'escuchar', en: 'to listen' }, { inf: 'comprar', en: 'to buy' }, { inf: 'viajar', en: 'to travel' },
    { inf: 'visitar', en: 'to visit' }, { inf: 'tomar', en: 'to take / to have (food, drink)' }, { inf: 'llevar', en: 'to wear / to carry' },
    { inf: 'ayudar', en: 'to help' }, { inf: 'nadar', en: 'to swim' }, { inf: 'bailar', en: 'to dance' },
    { inf: 'ganar', en: 'to win / to earn' }, { inf: 'descansar', en: 'to rest' },
    // regular -er / -ir
    { inf: 'comer', en: 'to eat' }, { inf: 'beber', en: 'to drink' }, { inf: 'aprender', en: 'to learn' },
    { inf: 'vivir', en: 'to live' }, { inf: 'decidir', en: 'to decide' },
    // spelling changes / small irregularities
    { inf: 'llegar', en: 'to arrive', irr: { preterite: s('llegué - - - - -') }, note: 'Preterite yo adds a u to keep the hard g sound: llegué.' },
    { inf: 'jugar', en: 'to play (a sport / game)', irr: { present: s('juego juegas juega - - juegan'), preterite: s('jugué - - - - -') }, note: 'Stem change u → ue in the present (not nosotros/vosotros). Preterite yo: jugué.' },
    { inf: 'empezar', en: 'to start', irr: { present: s('empiezo empiezas empieza - - empiezan'), preterite: s('empecé - - - - -') }, note: 'Stem change e → ie in the present. Preterite yo: z → c, so empecé.' },
    { inf: 'pensar', en: 'to think', irr: { present: s('pienso piensas piensa - - piensan') }, note: 'Stem change e → ie in the present (not nosotros/vosotros).' },
    { inf: 'volver', en: 'to return', irr: { present: s('vuelvo vuelves vuelve - - vuelven') }, pp: 'vuelto', note: 'Stem change o → ue in the present. Past participle: vuelto.' },
    { inf: 'dormir', en: 'to sleep', irr: { present: s('duermo duermes duerme - - duermen'), preterite: s('- - durmió - - durmieron') }, note: 'o → ue in the present; o → u in the preterite for él/ellos (durmió).' },
    { inf: 'pedir', en: 'to ask for / to order', irr: { present: s('pido pides pide - - piden'), preterite: s('- - pidió - - pidieron') }, note: 'e → i in the present and in the preterite for él/ellos (pidió).' },
    { inf: 'preferir', en: 'to prefer', irr: { present: s('prefiero prefieres prefiere - - prefieren'), preterite: s('- - prefirió - - prefirieron') }, note: 'e → ie in the present; e → i in the preterite for él/ellos (prefirió).' },
    { inf: 'leer', en: 'to read', irr: { preterite: s('- leíste leyó leímos leísteis leyeron') }, pp: 'leído', note: 'Preterite él/ellos use a y: leyó, leyeron. Participle: leído.' },
    { inf: 'escribir', en: 'to write', pp: 'escrito', note: 'Regular, except the past participle: escrito.' },
    { inf: 'salir', en: 'to go out / to leave', irr: { present: s('salgo - - - - -') }, fut: 'saldr', note: 'Present yo: salgo. Future stem: saldr-.' },
    // key irregulars
    { inf: 'ser', en: 'to be (permanent)', irr: { present: s('soy eres es somos sois son'), preterite: s('fui fuiste fue fuimos fuisteis fueron'), imperfect: s('era eras era éramos erais eran') }, note: 'Ser is irregular. Its preterite is the same as ir: fui, fuiste, fue…' },
    { inf: 'estar', en: 'to be (temporary / location)', irr: { present: s('estoy estás está estamos estáis están'), preterite: s('estuve estuviste estuvo estuvimos estuvisteis estuvieron') }, note: 'Preterite uses the stem estuv-: estuve, estuviste, estuvo…' },
    { inf: 'ir', en: 'to go', irr: { present: IR_PRESENT, preterite: s('fui fuiste fue fuimos fuisteis fueron'), imperfect: s('iba ibas iba íbamos ibais iban') }, note: 'Ir is irregular: voy (present), fui (preterite), iba (imperfect).' },
    { inf: 'tener', en: 'to have', irr: { present: s('tengo tienes tiene tenemos tenéis tienen'), preterite: s('tuve tuviste tuvo tuvimos tuvisteis tuvieron') }, fut: 'tendr', note: 'tengo / tienes (present), tuve (preterite), tendré (future).' },
    { inf: 'hacer', en: 'to do / to make', irr: { present: s('hago - - - - -'), preterite: s('hice hiciste hizo hicimos hicisteis hicieron') }, fut: 'har', pp: 'hecho', note: 'hago (present yo), hice / hizo (preterite), haré (future), hecho (participle).' },
    { inf: 'poder', en: 'to be able to / can', irr: { present: s('puedo puedes puede - - pueden'), preterite: s('pude pudiste pudo pudimos pudisteis pudieron') }, fut: 'podr', note: 'puedo (present), pude (preterite), podré (future).' },
    { inf: 'querer', en: 'to want / to love', irr: { present: s('quiero quieres quiere - - quieren'), preterite: s('quise quisiste quiso quisimos quisisteis quisieron') }, fut: 'querr', note: 'quiero (present), quise (preterite), querré (future).' },
    { inf: 'decir', en: 'to say / to tell', irr: { present: s('digo dices dice - - dicen'), preterite: s('dije dijiste dijo dijimos dijisteis dijeron') }, fut: 'dir', pp: 'dicho', note: 'digo (present), dije (preterite), diré (future), dicho (participle).' },
    { inf: 'venir', en: 'to come', irr: { present: s('vengo vienes viene - - vienen'), preterite: s('vine viniste vino vinimos vinisteis vinieron') }, fut: 'vendr', note: 'vengo (present), vine (preterite), vendré (future).' },
    { inf: 'poner', en: 'to put', irr: { present: s('pongo - - - - -'), preterite: s('puse pusiste puso pusimos pusisteis pusieron') }, fut: 'pondr', pp: 'puesto', note: 'pongo (present yo), puse (preterite), pondré (future), puesto (participle).' },
    { inf: 'dar', en: 'to give', irr: { present: s('doy - - - dais -'), preterite: s('di diste dio dimos disteis dieron') }, note: 'doy (present yo); the preterite uses -er/-ir endings with no accents: di, dio.' },
    { inf: 'saber', en: 'to know (a fact)', irr: { present: s('sé - - - - -'), preterite: s('supe supiste supo supimos supisteis supieron') }, fut: 'sabr', note: 'sé (present yo), supe (preterite), sabré (future).' },
    { inf: 'ver', en: 'to see / to watch', irr: { present: s('veo - - - veis -'), preterite: s('vi viste vio vimos visteis vieron'), imperfect: s('veía veías veía veíamos veíais veían') }, pp: 'visto', note: 'veo (present yo), vi / vio (no accents), veía (imperfect), visto (participle).' }
  ];

  function group(inf) { return inf.slice(-2); }
  function stem(inf) { return inf.slice(0, -2); }

  function regular(v, tense, p) {
    const g = group(v.inf), st = stem(v.inf);
    switch (tense) {
      case 'present': case 'preterite': case 'imperfect':
        return st + END[tense][g][p];
      case 'future': return (v.fut || v.inf) + END.future[p];
      case 'conditional': return (v.fut || v.inf) + END.conditional[p];
      case 'near': return `${IR_PRESENT[p]} a ${v.inf}`;
      case 'perfect': return `${HABER[p]} ${participle(v)}`;
    }
    throw new Error('Unknown tense ' + tense);
  }
  function participle(v) { return v.pp || stem(v.inf) + (group(v.inf) === 'ar' ? 'ado' : 'ido'); }

  /** The conjugated form for verb v, tense id, person index 0..5. */
  function conj(v, tense, p) {
    const o = v.irr && v.irr[tense];
    if (o && o[p] && o[p] !== '-') return o[p];
    return regular(v, tense, p);
  }
  function table(v, tense) { return PERSONS.map((_, p) => conj(v, tense, p)); }

  /** Is this form different from what the regular rules would give? */
  function isIrregular(v, tense, p) {
    if (tense === 'future' || tense === 'conditional') return !!v.fut;
    if (tense === 'perfect') return !!v.pp;
    if (tense === 'near') return false;
    const o = v.irr && v.irr[tense];
    return !!(o && o[p] && o[p] !== '-');
  }
  /** How the regular form is built, for teaching: [stem, ending] or null. */
  function parts(v, tense, p) {
    if (isIrregular(v, tense, p)) return null;
    const g = group(v.inf);
    if (tense === 'present' || tense === 'preterite' || tense === 'imperfect') return [stem(v.inf), END[tense][g][p]];
    if (tense === 'future' || tense === 'conditional') return [v.inf, END[tense][p]];
    return null;
  }
  function ruleText(v, tense) {
    const g = group(v.inf);
    switch (tense) {
      case 'present': return `Take off -${g}, add: ${END.present[g].join(', ')}`;
      case 'preterite': return `Take off -${g}, add: ${END.preterite[g].join(', ')}`;
      case 'imperfect': return `Take off -${g}, add: ${END.imperfect[g].join(', ')}`;
      case 'future': return v.fut ? `Irregular stem ${v.fut}- plus: ${END.future.join(', ')}` : `Keep the whole infinitive, add: ${END.future.join(', ')}`;
      case 'conditional': return v.fut ? `Irregular stem ${v.fut}- plus: ${END.conditional.join(', ')}` : `Keep the whole infinitive, add: ${END.conditional.join(', ')}`;
      case 'near': return 'Present of ir (voy, vas, va…) + a + infinitive';
      case 'perfect': return `Present of haber (he, has, ha…) + past participle (${participle(v)})`;
    }
  }

  /** Normalise an answer: lower case, single spaces, no punctuation. */
  function clean(str) { return String(str).toLowerCase().replace(/[¿?¡!.,;:"]/g, '').replace(/\s+/g, ' ').trim(); }
  function noAccents(str) { return str.normalize('NFD').replace(/[̀-ͯ]/g, ''); }
  /** 'right' | 'accent' (only accents wrong/missing) | 'wrong' */
  function check(input, target) {
    const a = clean(input), b = clean(target);
    if (!a) return 'wrong';
    if (a === b) return 'right';
    if (noAccents(a) === noAccents(b)) return 'accent';
    return 'wrong';
  }

  return { PERSONS, PERSON_EN, TENSES, VERBS, conj, table, participle, isIrregular, parts, ruleText, check, clean, noAccents };
});
