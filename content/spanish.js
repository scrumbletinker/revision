/* GCSE Spanish vocabulary, grouped by the common GCSE themes.
 * Board-neutral core vocab. Each word is [spanish, english].
 * Nouns carry their article (el/la/los/las) so gender is learnt with the word.
 * Add or swap words freely: keep each Spanish entry unique.
 */
window.SPANISH_VOCAB = [
  { id: 'me', name: 'Me, family & friends', icon: '👪', words: [
    ['la madre', 'mother'], ['el padre', 'father'], ['los padres', 'parents'],
    ['el hermano', 'brother'], ['la hermana', 'sister'], ['el abuelo', 'grandfather'],
    ['la abuela', 'grandmother'], ['el tío', 'uncle'], ['la tía', 'aunt'],
    ['el primo', 'cousin'], ['el hijo', 'son'], ['la hija', 'daughter'],
    ['el novio', 'boyfriend'], ['la novia', 'girlfriend'], ['el perro', 'dog'],
    ['el gato', 'cat'], ['alto', 'tall'], ['bajo', 'short (height)'],
    ['simpático', 'nice, kind'], ['gracioso', 'funny'], ['perezoso', 'lazy'],
    ['trabajador', 'hard-working'], ['tímido', 'shy'], ['hablador', 'chatty'],
    ['egoísta', 'selfish'], ['celoso', 'jealous'], ['los ojos', 'eyes'],
    ['el pelo', 'hair'], ['rubio', 'blond'], ['pelirrojo', 'red-haired'],
    ['llevarse bien con', 'to get on well with'], ['casarse', 'to get married'],
    ['la boda', 'wedding'], ['la pareja', 'partner, couple']
  ]},
  { id: 'school', name: 'School', icon: '🏫', words: [
    ['el colegio', 'school'], ['el instituto', 'secondary school'], ['la asignatura', 'subject'],
    ['las matemáticas', 'maths'], ['las ciencias', 'science'], ['la historia', 'history'],
    ['la geografía', 'geography'], ['el dibujo', 'art'], ['la educación física', 'PE'],
    ['la informática', 'ICT, computing'], ['el inglés', 'English'], ['el uniforme', 'uniform'],
    ['los deberes', 'homework'], ['el examen', 'exam'], ['aprobar', 'to pass (an exam)'],
    ['suspender', 'to fail (an exam)'], ['el recreo', 'break time'], ['la norma', 'rule'],
    ['la biblioteca', 'library'], ['el patio', 'playground'], ['el comedor', 'canteen'],
    ['la pizarra', 'board (whiteboard)'], ['el horario', 'timetable'], ['el idioma', 'language'],
    ['sacar buenas notas', 'to get good grades'], ['aburrido', 'boring'], ['útil', 'useful'],
    ['difícil', 'difficult'], ['fácil', 'easy'], ['el alumno', 'pupil'], ['la profesora', 'teacher (female)']
  ]},
  { id: 'free', name: 'Free time & tech', icon: '🎮', words: [
    ['el ocio', 'leisure'], ['jugar al fútbol', 'to play football'], ['ir al cine', 'to go to the cinema'],
    ['la película', 'film'], ['ver la tele', 'to watch TV'], ['el móvil', 'mobile phone'],
    ['descargar', 'to download'], ['las redes sociales', 'social media'], ['el videojuego', 'video game'],
    ['tocar la guitarra', 'to play the guitar'], ['leer', 'to read'], ['el libro', 'book'],
    ['salir con amigos', 'to go out with friends'], ['ir de compras', 'to go shopping'], ['el partido', 'match (game)'],
    ['el equipo', 'team'], ['la canción', 'song'], ['el ordenador', 'computer'],
    ['navegar por internet', 'to surf the internet'], ['montar en bici', 'to ride a bike'], ['la natación', 'swimming'],
    ['el baloncesto', 'basketball'], ['bailar', 'to dance'], ['el cumpleaños', 'birthday'],
    ['la fiesta', 'party'], ['el tiempo libre', 'free time'], ['la pantalla', 'screen']
  ]},
  { id: 'food', name: 'Food & drink', icon: '🥘', words: [
    ['el desayuno', 'breakfast'], ['la comida', 'lunch, food'], ['la cena', 'dinner'],
    ['el pollo', 'chicken'], ['el pescado', 'fish (to eat)'], ['la carne', 'meat'],
    ['las verduras', 'vegetables'], ['la fruta', 'fruit'], ['el pan', 'bread'],
    ['el queso', 'cheese'], ['el huevo', 'egg'], ['la leche', 'milk'],
    ['el zumo', 'juice'], ['sano', 'healthy'], ['la manzana', 'apple'],
    ['las patatas fritas', 'chips'], ['beber', 'to drink'], ['comer', 'to eat'],
    ['el arroz', 'rice'], ['la cuenta', 'the bill'], ['el plato', 'dish, plate'], ['picante', 'spicy']
  ]},
  { id: 'town', name: 'Home, town & region', icon: '🏘️', words: [
    ['la casa', 'house'], ['el piso', 'flat'], ['el dormitorio', 'bedroom'],
    ['la cocina', 'kitchen'], ['el salón', 'living room'], ['el jardín', 'garden'],
    ['el barrio', 'neighbourhood'], ['la ciudad', 'city'], ['el pueblo', 'village, small town'],
    ['el campo', 'countryside'], ['la playa', 'beach'], ['la tienda', 'shop'],
    ['el centro comercial', 'shopping centre'], ['la iglesia', 'church'], ['el ayuntamiento', 'town hall'],
    ['la estación', 'station'], ['el mercado', 'market'], ['la calle', 'street'],
    ['ruidoso', 'noisy'], ['tranquilo', 'quiet, calm'], ['limpio', 'clean'],
    ['sucio', 'dirty'], ['cerca de', 'near'], ['lejos de', 'far from'],
    ['a la derecha', 'on the right'], ['a la izquierda', 'on the left'], ['todo recto', 'straight on']
  ]},
  { id: 'travel', name: 'Holidays & travel', icon: '✈️', words: [
    ['las vacaciones', 'holidays'], ['el viaje', 'journey, trip'], ['viajar', 'to travel'],
    ['el avión', 'plane'], ['el tren', 'train'], ['el coche', 'car'],
    ['el barco', 'boat'], ['alojarse', 'to stay (in a hotel etc.)'], ['la habitación', 'room'],
    ['el extranjero', 'abroad'], ['el billete', 'ticket'], ['la maleta', 'suitcase'],
    ['tomar el sol', 'to sunbathe'], ['hacer turismo', 'to go sightseeing'], ['el paisaje', 'landscape'],
    ['el tiempo', 'weather (also: time)'], ['hace calor', "it's hot"], ['hace frío', "it's cold"],
    ['llueve', "it's raining"], ['nieva', "it's snowing"], ['hace sol', "it's sunny"],
    ['la montaña', 'mountain'], ['el museo', 'museum'], ['el mar', 'sea'], ['reservar', 'to book']
  ]},
  { id: 'world', name: 'Environment & world', icon: '🌍', words: [
    ['el medio ambiente', 'environment'], ['la contaminación', 'pollution'], ['reciclar', 'to recycle'],
    ['la basura', 'rubbish'], ['el cambio climático', 'climate change'], ['la energía', 'energy'],
    ['ahorrar', 'to save'], ['malgastar', 'to waste'], ['la pobreza', 'poverty'],
    ['sin techo', 'homeless'], ['el paro', 'unemployment'], ['la salud', 'health'],
    ['las drogas', 'drugs'], ['la sequía', 'drought'], ['el incendio', 'fire'],
    ['la inundación', 'flood'], ['el voluntariado', 'volunteering'], ['ayudar', 'to help'],
    ['la igualdad', 'equality'], ['proteger', 'to protect'], ['el planeta', 'planet'],
    ['el problema', 'problem'], ['la bolsa de plástico', 'plastic bag'], ['el transporte público', 'public transport']
  ]},
  { id: 'key', name: 'Key words & opinions', icon: '🔑', words: [
    ['a menudo', 'often'], ['a veces', 'sometimes'], ['siempre', 'always'], ['nunca', 'never'],
    ['ayer', 'yesterday'], ['mañana', 'tomorrow'], ['hoy', 'today'], ['la semana pasada', 'last week'],
    ['el año que viene', 'next year'], ['después', 'afterwards'], ['luego', 'then, later'],
    ['sin embargo', 'however'], ['porque', 'because'], ['también', 'also'], ['pero', 'but'],
    ['aunque', 'although'], ['además', 'in addition'], ['¿cuándo?', 'when?'], ['¿dónde?', 'where?'],
    ['¿por qué?', 'why?'], ['¿cuánto?', 'how much?'], ['¿quién?', 'who?'], ['me gusta', 'I like'],
    ['me encanta', 'I love'], ['odio', 'I hate'], ['prefiero', 'I prefer'], ['creo que', 'I think that'],
    ['en mi opinión', 'in my opinion'], ['divertido', 'fun'], ['genial', 'great'], ['mejor', 'better'],
    ['peor', 'worse'], ['el día', 'day'], ['la mano', 'hand'], ['el tema', 'topic'], ['la foto', 'photo']
  ]}
];

/* Nouns that break the "-o = masculine, -a = feminine" pattern: worth a special note. */
window.SPANISH_GENDER_TRAPS = {
  'el día': 'Día ends in -a but is masculine.',
  'la mano': 'Mano ends in -o but is feminine.',
  'el tema': 'Many words ending in -ma are masculine: el tema, el problema, el idioma.',
  'el problema': 'Many words ending in -ma are masculine: el problema, el tema, el idioma.',
  'el idioma': 'Many words ending in -ma are masculine: el idioma, el problema, el tema.',
  'el planeta': 'Planeta ends in -a but is masculine.',
  'la foto': 'Foto is short for la fotografía, so it stays feminine.',
  'la canción': 'Words ending in -ción are feminine.',
  'la estación': 'Words ending in -ción are feminine.',
  'la habitación': 'Words ending in -ción are feminine.',
  'la contaminación': 'Words ending in -ción are feminine.',
  'la inundación': 'Words ending in -ción are feminine.',
  'la natación': 'Words ending in -ción are feminine.',
  'la ciudad': 'Words ending in -dad are feminine.',
  'la igualdad': 'Words ending in -dad are feminine.',
  'la salud': 'Words ending in -ud are feminine.',
  'la carne': 'Carne is feminine: learn it with la.',
  'la leche': 'Leche is feminine: learn it with la.',
  'la calle': 'Calle is feminine: learn it with la.',
  'el coche': 'Coche is masculine: learn it with el.',
  'el billete': 'Billete is masculine: learn it with el.',
  'el paisaje': 'Words ending in -aje are masculine.',
  'el viaje': 'Words ending in -aje are masculine.'
};
