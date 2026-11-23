/* Etikus hackelés és védelem ág */
(function () {
  var L = window.KA.lesson, C = window.KA.addCourses;
  var H = 'kepek/http.svg';

  C([{
    slug: 'security-lab', title: 'Etikus hackelés és védelem', icon: '🛡️', category: 'Kiberbiztonság',
    description: 'Jogi és etikai alapok, izolált labor, webes sebezhetőségek megértése és a védelem gyakorlata.',
    prereqs: ['alapok', 'html', 'javascript', 'terminal'], runtime: 'local',
    setup: 'Csak saját és izolált laborban dolgozz: pl. VirtualBox + Kali/Ubuntu, vagy helyi Docker (OWASP Juice Shop). Engedély nélküli tesztelés illegális.',
    lessons: [
      L('security-lab-1', 'Etika, jog és engedély', 'Kezdő', 16,
        'Az etikus hackelés engedéllyel végzett biztonsági tesztelés. Az engedély nélküli hozzáférés bűncselekmény lehet, még akkor is, ha nem okozol kárt.',
        ['Csak írásos engedéllyel vagy saját laborban tesztelj.', 'Az engedély határozza meg a célt, az időt és a megengedett módszereket.', 'A talált hibát felelősen jelentsd, ne használd ki.', 'A személyes adatok védelme minden lépésnél kötelező.'],
        [{ label: 'Labor vs. éles', lang: 'text', code: 'ENGEDÉLY NÉLKÜL: tilos\nSAJÁT LABOR: gyakorlás\nMEGBÍZÁS + ÍRÁSOS ENGEDÉLY: tesztelés\nFELELŐS JELENTÉS: hibajelentés' }],
        ['Írd le, mit tartalmazna egy engedélykérés három pontja.', 'Sorolj fel két dolgot, amit soha nem teszel meg.'],
        ['Mikor etikus egy biztonsági teszt?', ['Amikor kíváncsi vagyok', 'Írásos engedéllyel vagy saját laborban', 'Ha nem okoz kárt', 'Ha gyorsan megvan'], 1, 'Az engedély és a saját labor a határ.'],
        { figures: [{ src: H, alt: 'HTTP kérés a támadási felület szemléltetéséhez', caption: 'Minden bemenet potenciális támadási felület – ezt kell megérteni és védeni.', w: 720, h: 280 }] }),

      L('security-lab-2', 'Izolált labor felépítése', 'Kezdő', 20,
        'A laborban biztonságosan kísérletezhetsz. A virtuális gép és a Docker elkülöníti a gyakorlást a saját rendszeredtől.',
        ['A VM pillanatkép (snapshot) visszaállítható állapotot ad.', 'A Docker konténer elkülöníti az alkalmazást.', 'A labor ne legyen nyitva a nyilvános internet felé.', 'Csak a laboron belül tesztelj.'],
        [{ label: 'Labor indítás', lang: 'bash', code: '# OWASP Juice Shop helyi Dockerben\n docker run -d -p 3000:3000 bkimminich/juice-shop\n# böngésző: http://localhost:3000' }],
        ['Indíts egy sebezhető gyakorlóalkalmazást Dockerben vagy VM-ben.', 'Készíts pillanatképet, mielőtt kísérletezni kezdesz.'],
        ['Miért kell izolált labor?', ['Mert gyorsabb', 'Hogy a gyakorlás ne érintse az éles rendszereket', 'Mert kötelező a Docker', 'Hogy legyen internet'], 1, 'A labor elkülöníti a kísérletezést.']),

      L('security-lab-3', 'A támadási felület megértése', 'Középhaladó', 18,
        'A támadó a bemeneteket, a bejelentkezést és a hálózati szolgáltatásokat vizsgálja. A védelem ezeknek a felületeknek a tudatos kezelése.',
        ['Minden felhasználói bemenet gyanús.', 'A hibás üzenetek információt szivárogtathatnak.', 'Az ismeretlen szolgáltatás nyitott kapu lehet.', 'A naplózás segít felismerni a gyanús tevékenységet.'],
        [{ label: 'Kérdések', lang: 'text', code: 'Milyen bemenetek vannak?\nKi érheti el a szolgáltatást?\nMit árul el egy hibaszöveg?\nMilyen napló készül?' }],
        ['Listázz fel egy weboldal öt lehetséges bemenetét.', 'Gondold át, mit árul el egy részletes hibaüzenet.'],
        ['Mi a támadási felület?', ['A vírusirtó', 'A rendszer azon pontjai, ahol behatolás lehetséges', 'A tűzfal neve', 'Egy jelszó'], 1, 'A támadási felület minden elérhető belépési pont.']),

      L('security-lab-4', 'Injekciók és a paraméterezés', 'Középhaladó', 20,
        'Az injekció akkor jön létre, ha a bemenet kódként értelmeződik. A védelem: az adatot soha ne fűzd kódba, használj paraméterezést.',
        ['Az SQL-injekció a lekérdezésbe csempészett adat.', 'A paraméterezett lekérdezés elválasztja az adatot az SQL-től.', 'A parancs- és sabloninjekció hasonló elven működik.', 'A bemenet validálása és a legkisebb jogosultság együtt véd.'],
        [{ label: 'Rossz vs. jó', lang: 'php', code: '// ROSSZ: a bemenet az SQL része lesz\n$sql = "SELECT * FROM user WHERE nev=\'" . $_GET[:nev] . "\'";\n\n// JÓ: paraméterezett lekérdezés\n$stmt = $pdo->prepare("SELECT * FROM user WHERE nev=?");\n$stmt->execute([$_GET[:nev]]);' }],
        ['Magyarázd el, miért veszélyes a szövegösszefűzés SQL-ben.', 'Írj át egy példát paraméterezett lekérdezésre.'],
        ['Mi véd az SQL-injekció ellen?', ['Hosszabb jelszó', 'Paraméterezett lekérdezés', 'Több CSS', 'Nagyobb szerver'], 1, 'A paraméterezés elválasztja az adatot az SQL kódtól.']),

      L('security-lab-5', 'XSS és a kimenet kódolása', 'Középhaladó', 20,
        'A cross-site scripting (XSS) akkor jön létre, ha a felhasználói szöveg HTML-ként kerül az oldalra. A védelem a kimenet kontextus szerinti kódolása.',
        ['A felhasználói szöveget HTML-ként soha ne írd ki nyersen.', 'A htmlspecialchars / textContent megfelelő kódolást ad.', 'A Content Security Policy plusz réteg.', 'Az innerHTML csak megbízható tartalomra való.'],
        [{ label: 'Kimenet kódolása', lang: 'php', code: '<?php\necho htmlspecialchars($nev, ENT_QUOTES | ENT_SUBSTITUTE, "UTF-8");' },
         { label: 'Böngészőben', lang: 'js', code: 'const elem = document.querySelector("#uzenet");\nelem.textContent = felhasznaloiSzoveg; // nem innerHTML' }],
        ['Nézd meg, hogyan jelenik meg a <b> szöveg, ha textContent-el írod ki.', 'Keress egy oldalon olyan helyet, ahol a bemenet megjelenik.'],
        ['Melyik védelem a helyes XSS ellen?', ['A bemenet rövidítése', 'A kimenet kontextus szerinti kódolása', 'Több szín', 'A CSS elrejtése'], 1, 'A kimenetet a megjelenítés helyéhez kódoljuk.']),

      L('security-lab-6', 'Hitelesítés és jelszavak', 'Középhaladó', 20,
        'A hitelesítés a felhasználó azonosítása. A jelszókezelés helyes módja: erős hash, lassított kulcsderiváció és sosem sima tárolás.',
        ['Használj password_hash / bcrypt / argon2 megoldást.', 'A jelszót soha ne naplózd.', 'A bejelentkezésnél egységes hibaüzenet (ne árulja el, melyik mező rossz).', 'A munkamenetet és a tokent is védeni kell.'],
        [{ label: 'Helyes hash', lang: 'python', code: 'from werkzeug.security import generate_password_hash, check_password_hash\n\nh = generate_password_hash("eros-jelszo")\nprint(check_password_hash(h, "eros-jelszo"))  # True' }],
        ['Magyarázd el, miért nem jó az MD5 a jelszóhoz.', 'Nézd meg egy hash könyvtár ajánlott beállítását.'],
        ['Hogyan tároljuk a jelszót?', ['Sima szövegként', 'Erős, lassított hash-sel', 'Base64-ben', 'A HTML-ben'], 1, 'A jelszóhoz lassított, sózott hash kell.']),

      L('security-lab-7', 'Hozzáférés-vezérlés', 'Haladó', 18,
        'A hozzáférés-vezérlés eldönti, ki mit tehet. A leggyakoribb hiba, hogy a döntést csak a kliensre bízzuk.',
        ['Minden érzékeny műveletet a szerver ellenőriz.', 'Az azonosítót ne a kliensből vedd készpénznek.', 'A legkisebb jogosultság elve érvényesüljön.', 'A tiltott hozzáférésre 403 válasz.'],
        [{ label: 'Szerveroldali ellenőrzés', lang: 'js', code: 'app.delete("/api/bejegyzes/:id", (req, res) => {\n  const bejegyzes = db.find(req.params.id);\n  if (bejegyzes.szerzoId !== req.user.id) {\n    return res.status(403).json({ hiba: "Tiltott" });\n  }\n  db.remove(req.params.id);\n  res.status(204).end();\n});' }],
        ['Gondold át, mi történik, ha a törlés azonosítóját a kliens adja, és nem ellenőrzöd a tulajdonost.', 'Írj példát a tulajdonos ellenőrzésére.'],
        ['Hol kell ellenőrizni a jogosultságot?', ['Csak a böngészőben', 'A szerveren is', 'Csak a CSS-ben', 'A README-ben'], 1, 'A kliensoldali ellenőrzés megkerülhető, a szerveren is kell.']),

      L('security-lab-8', 'HTTPS, fejlécek, alapvédelem', 'Haladó', 18,
        'A HTTPS titkosítja a forgalmat. A biztonsági fejlécek és a frissítések további rétegek, de nem helyettesítik a helyes kódot.',
        ['A HTTPS a titkosított átvitel.', 'A HSTS kényszeríti a HTTPS-t.', 'A CSP korlátozza a futtatható szkripteket.', 'A rendszeres frissítés és a mentés alapvédelem.'],
        [{ label: 'Biztonsági fejlécek', lang: 'text', code: 'Strict-Transport-Security: max-age=31536000\nContent-Security-Policy: default-src \'self\'\nX-Content-Type-Options: nosniff\nX-Frame-Options: DENY' }],
        ['Nézd meg egy weboldal fejléceit a böngészőben.', 'Sorolj fel három alapvédelmi lépést.'],
        ['Mit tesz a HTTPS?', ['Gyorsítja az oldalt', 'Titkosítja a forgalmat', 'Törli a vírusokat', 'Jelszót generál'], 1, 'A HTTPS titkosított kapcsolatot ad.']),

      L('security-lab-9', 'Docker és hálózati higiénia', 'Haladó', 18,
        'A labor konténereit is védeni kell: ne futtass root-ként, ne nyisd ki feleslegesen a portokat, és rendszeresen frissíts.',
        ['A konténer ne kapjon felesleges jogosultságot.', 'A portot csak szükség esetén tedd ki.', 'A titkot ne égesd bele a képbe.', 'A napló és a figyelés segít.'],
        [{ label: 'Biztonságosabb indítás', lang: 'bash', code: 'docker run --rm -p 127.0.0.1:3000:3000 \\\n  --read-only --tmpfs /tmp \\\n  bkimminich/juice-shop' }],
        ['Indíts egy konténert csak localhostra kötve.', 'Nézd meg, milyen portok hallgatnak a gépeden.'],
        ['Miért ne tedd ki a labort a nyilvános internetre?', ['Mert lassú', 'Mert mások is elérhetik és visszaélhetnek vele', 'Mert nem működik', 'Mert a Docker tiltja'], 1, 'A nyilvános labor másoknak is támadható felület.']),

      L('security-lab-10', 'Hibajelentés és javítás', 'Haladó', 16,
        'A tesztelés értelme a jobb biztonság. A talált hibát felelősen jelentsd: mit találtál, hogyan bizonyítható, és hogyan javítható.',
        ['A jelentés legyen tömör és bizonyítékalapú.', 'Mutass reprodukálható lépéseket.', 'Adj javaslatot a javításra.', 'Ne tegyél közzé érzékeny adatot.'],
        [{ label: 'Jelentés váza', lang: 'text', code: 'Cím: XSS a keresőmezőben\nSúlyosság: közepes\nLépések: 1) ... 2) ...\nHatás: ...\nJavítás: kimenet kódolása' }],
        ['Írj rövid hibajelentést egy elképzelt sebezhetőségről.', 'Fogalmazz meg egy javítási javaslatot.'],
        ['Mit tartalmazzon egy hibajelentés?', ['Csak a hibát', 'Reprodukálható lépéseket és javítási javaslatot', 'A jelszavakat', 'A szerver árát'], 1, 'A jó jelentés bizonyítható és javításra irányul.'])
    ]
  }]);
})();
