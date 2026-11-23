/* Közös segédek: szakágak, leckebővítés, tömör leckeíró.
   A meglévő kurzusokat nem írja felül: leckéket fűz hozzá, új kurzust külön ad. */
window.KA = window.KA || {};
window.KA.extraLessons = window.KA.extraLessons || {};
window.KA.extraCourses = window.KA.extraCourses || {};
window.KA.VERSION = '2026-11-23.5';

/* Szakágak: a három nagy témának külön kurzusoldala és külön menüpontja van. */
window.KA.tracks = [
  {
    id: 'web', title: 'Webfejlesztés', icon: '🌐',
    tagline: 'HTML, CSS, JavaScript, React – és a backend JavaScriptből.',
    desc: 'A böngészőtől a szerverig: felület, interakció, API és adatbázis.',
    courses: ['alapok', 'terminal', 'html', 'css', 'javascript', 'typescript', 'jsx', 'react']
  },
  {
    id: 'python', title: 'Python', icon: '🐍',
    tagline: 'Nyelvi alapoktól a webalkalmazásig és az automatizálásig.',
    desc: 'Python alapok, fájlok, adatkezelés, API-k, tesztelés és Flask webalkalmazás.',
    courses: ['python', 'python-web']
  },
  {
    id: 'php', title: 'PHP', icon: '🐘',
    tagline: 'Szerveroldali web: űrlapok, munkamenet, adatbázis, REST API.',
    desc: 'Dinamikus weboldalak PHP-ból, PDO/MySQL adatbázissal és JSON API-val.',
    courses: ['php', 'php-api']
  },
  {
    id: 'security', title: 'Etikus hackelés és védelem', icon: '🛡️',
    tagline: 'Jog és etika, izolált labor, sebezhetőségek és védelem.',
    desc: 'Csak saját laborban és engedéllyel: a támadás megértése a jobb védelemért.',
    courses: ['security', 'security-lab']
  },
  {
    id: 'desktop', title: 'Asztali alkalmazások', icon: '🖥️',
    tagline: 'C# konzoltól a WPF felületig.',
    desc: 'Windowsos asztali programok C#-ban, konzolos és grafikus felülettel.',
    courses: ['csharp', 'console', 'wpf']
  }
];

window.KA.courseTrack = {
  alapok: 'web', terminal: 'web', html: 'web', css: 'web', javascript: 'web',
  typescript: 'web', jsx: 'web', react: 'web',
  python: 'python', 'python-web': 'python',
  php: 'php', 'php-api': 'php',
  security: 'security', 'security-lab': 'security',
  csharp: 'desktop', console: 'desktop', wpf: 'desktop'
};
window.KA.trackOf = function (slug) { return window.KA.courseTrack[slug] || 'web'; };
window.KA.track = function (id) {
  return window.KA.tracks.find(function (t) { return t.id === id; }) || window.KA.tracks[0];
};

window.KA.addLessons = function (slug, list) {
  window.KA.extraLessons[slug] = (window.KA.extraLessons[slug] || []).concat(list);
};
window.KA.addCourses = function (list) {
  list.forEach(function (c) { window.KA.extraCourses[c.slug] = c; });
};

/* lesson(...) – teljes lecke objektum. */
window.KA.lesson = function (id, title, level, minutes, overview, concepts, snippets, exercise, quiz, extra) {
  return Object.assign({
    id: id, title: title, level: level, minutes: minutes,
    overview: overview, concepts: concepts,
    code: (snippets && snippets[0] && snippets[0].code) || '',
    snippets: snippets, exercise: exercise,
    quiz: { question: quiz[0], options: quiz[1], answer: quiz[2], explain: quiz[3] }
  }, extra || {});
};

/* Tömör sorformátum a nagyszámú leckéhez:
   [cím, áttekintés, "fogalom | fogalom", kód, "feladat | feladat",
    kérdés, "A | B | C | D", helyes index, magyarázat, szint?, perc?, címkék?]
   A kódban \n a sortörés, a fogalmak/feladatok | jellel válnak el. */
window.KA.bulk = function (slug, rows, prefix) {
  var list = rows.map(function (r, i) {
    var id = (prefix || slug) + '-' + (i + 1);
    return window.KA.lesson(
      id, r[0], r[9] || (i < 4 ? 'Kezdő' : i < 10 ? 'Középhaladó' : 'Haladó'),
      r[10] || (14 + (i % 5) * 4),
      r[1],
      r[2].split('|').map(function (s) { return s.trim(); }).filter(Boolean),
      [{ label: 'Példakód', code: r[3] }],
      r[4].split('|').map(function (s) { return s.trim(); }).filter(Boolean),
      [r[5], r[6].split('|').map(function (s) { return s.trim(); }).filter(Boolean), r[7], r[8]],
      r[11] ? { tags: r[11] } : undefined
    );
  });
  window.KA.addLessons(slug, list);
  return list;
};
