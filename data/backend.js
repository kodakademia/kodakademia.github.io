/* Parancssor kurzus + a Node.js/backend anyag a JavaScript kurzus leckéiként */
(function () {
  var L = window.KA.lesson, A = window.KA.addLessons, C = window.KA.addCourses;

  var T = 'kepek/terminal.svg';
  var E = 'kepek/env.svg';
  var H = 'kepek/http.svg';

  /* ---------------- Parancssor alapok (önálló kurzus) ---------------- */
  C([{
    slug: 'terminal', title: 'Parancssor alapok', icon: '⌨️', category: 'Alapok',
    description: 'A terminál használata: mappák, fájlok, futtatás, Git és a leggyakoribb hibák.',
    prereqs: [], runtime: 'local',
    setup: 'Windows: PowerShell vagy Git Bash. macOS/Linux: Terminal. A gyakorláshoz nem kell telepíteni semmit.',
    lessons: [
      L('terminal-1', 'Miért használunk terminált?', 'Kezdő', 12,
        'A terminál szöveges felület, ahol parancsokat írunk a számítógépnek. A fejlesztésben azért használjuk, mert a futtatás, csomagtelepítés és verziókezelés itt a leggyorsabb.',
        ['A parancs egy program neve és esetleg további argumentumok.', 'A parancs a munkakönyvtárban fut, nem „bárhol”.', 'A kimenet fontos: a hibaüzenet elejét olvasd el.', 'A terminál nem varázslat: minden parancs egy futtatható program.'],
        [{ label: 'Első parancsok', lang: 'bash', code: 'pwd\nwhoami\nls' }],
        ['Nyisd meg a terminált és írd be: pwd.', 'Írd be: whoami, majd nézd meg, mit ad vissza.'],
        ['Melyik parancs mutatja az aktuális mappát?', ['ls', 'pwd', 'cd', 'rm'], 1, 'A pwd a print working directory rövidítése.'],
        { figures: [{ src: T, alt: 'Terminál ablak példákkal', caption: 'A terminál kimenete mindig megmondja, hol vagy és mi történt.', w: 720, h: 300 }] }),

      L('terminal-2', 'Mappák és navigáció', 'Kezdő', 15,
        'A fájlrendszer mappák fája. A cd parancs mozgat, az ls listáz. A relatív útvonal a jelenlegi mappából indul.',
        ['cd mappa belép, cd .. egy szinttel feljebb lép.', 'Az ls -la rejtett fájlokat is mutat.', 'A ~ a saját felhasználói mappád rövidítése.', 'Szóközös mappanévnél használj idézőjelet.'],
        [{ label: 'Mozgás', lang: 'bash', code: 'cd projekt\nls -la\ncd ..\ncd ~/projekt' }],
        ['Hozz létre egy gyakorlas mappát és lépj bele.', 'Menj feljebb egy szinttel, majd vissza.'],
        ['Mit csinál a cd .. parancs?', ['Töröl egy mappát', 'Egy szinttel feljebb lép', 'Kilistázza a fájlokat', 'Új mappát hoz létre'], 1, 'A .. mindig a szülőmappát jelöli.']),

      L('terminal-3', 'Fájlok létrehozása és törlése', 'Kezdő', 16,
        'Fájlokat a terminálból is kezelhetsz. Vigyázz a törléssel: a terminál nem kérdez vissza, és a fájl nem kerül kukába.',
        ['touch fájl létrehoz üres fájlt.', 'mkdir -p mély mappaszerkezetet hoz létre.', 'cp másol, mv mozgat vagy átnevez.', 'rm -r mappát töröl rekurzívan, visszafordíthatatlanul.'],
        [{ label: 'Fájlkezelés', lang: 'bash', code: 'mkdir -p projekt/src\ncd projekt\ntouch src/app.js\ncp src/app.js src/app.backup.js\nmv src/app.backup.js src/' }],
        ['Hozz létre egy src mappát és benne két fájlt.', 'Másold az egyik fájlt .bak kiterjesztéssel.'],
        ['Melyik parancs hoz létre új mappát?', ['touch', 'mkdir', 'mv', 'cat'], 1, 'A mkdir a make directory rövidítése.']),

      L('terminal-4', 'Fájltartalom megnézése', 'Kezdő', 12,
        'A cat, less és head segít megnézni egy fájl tartalmát szerkesztő nélkül. Hosszú fájlnál a less a kényelmes.',
        ['cat egész fájlt kiír.', 'less görgethető nézet, kilépés: q.', 'head -n 20 az első húsz sort mutatja.', 'grep szöveget keres fájlokban.'],
        [{ label: 'Olvasás', lang: 'bash', code: 'cat README.md\nhead -n 10 package.json\ngrep -n "env" .gitignore' }],
        ['Nyisd meg a README.md-t cat-tel.', 'Keress egy szót grep segítségével.'],
        ['Hogyan léphetsz ki a less nézetből?', ['Enter', 'Esc', 'q', 'Ctrl+C'], 2, 'A q (quit) zárja be a less nézetet.']),

      L('terminal-5', 'Program futtatása és környezet', 'Középhaladó', 15,
        'A fejlesztés nagy része futtatásból áll. A parancs előtt érdemes ellenőrizni a verziót, mert a régi Python vagy Node gyakori hibák forrása.',
        ['python app.py futtatja a fájlt a megfelelő mappában.', 'node --version ellenőrzi a Node telepítését.', 'A Ctrl+C megszakítja a futó programot.', 'A 0 kilépési kód a sikert jelenti.'],
        [{ label: 'Futtatás', lang: 'bash', code: 'python --version\nnode --version\npython app.py\necho $?' }],
        ['Készíts egy hello.py fájlt, és futtasd.', 'Nézd meg a kilépési kódot echo $? segítségével.'],
        ['Melyik billentyűkombináció állítja le a futó programot?', ['Ctrl+C', 'Ctrl+S', 'Ctrl+P', 'Shift+F5'], 0, 'A Ctrl+C megszakítja az előtérben futó programot.']),

      L('terminal-6', 'Környezeti változók és .env', 'Középhaladó', 20,
        'A titkokat és beállításokat nem a kódba írjuk, hanem környezeti változókba. A .env fájl ezeket kényelmesen tárolja helyben.',
        ['A környezeti változó kulcs=érték pár.', 'A .env csak helyi kényelem; a szerveren a hoszting beállításaiban rögzítsd.', 'A .gitignore-ba írd be: .env.', 'Készíts .env.example fájlt a szükséges kulcsokkal, értékek nélkül.'],
        [{ label: '.env használat', lang: 'bash', code: 'PORT=3000\nDATABASE_URL=postgres://user:pass@localhost:5432/db\nAPI_KULCS=helyi-titok\n\n# .gitignore\n.env\nnode_modules/' },
         { label: 'Beolvasás Node.js-ben', lang: 'js', code: 'require("dotenv").config();\nconsole.log(process.env.PORT);' }],
        ['Készíts .env fájlt PORT=3000 és API_KULCS sorokkal.', 'Írd be a .env-et a .gitignore-ba, majd ellenőrizd git status-szal.'],
        ['Hova kerül a .env fájl?', ['A Git tárolóba', 'A .gitignore-ba és a szerver titokkezelésébe', 'A nyilvános HTML-be', 'A README-be'], 1, 'A titkokat soha nem tesszük verziókezelőbe.'],
        { figures: [{ src: E, alt: 'Projektmappa és .env fájl', caption: 'A .env a projekt gyökerében van, a .gitignore kizárja.', w: 720, h: 300 }] }),

      L('terminal-7', 'Git alapok a terminálból', 'Középhaladó', 18,
        'A Git a változások történetét rögzíti. A napi munkafolyamat: állapot, hozzáadás, commit, feltolás.',
        ['A git status megmutatja, mi változott.', 'A git add előkészíti a commitot.', 'A git commit -m "üzenet" pillanatképet készít.', 'A git log --oneline a történetet mutatja.'],
        [{ label: 'Napi Git', lang: 'bash', code: 'git status\ngit add index.html\ngit commit -m "Főoldal szerkezet"\ngit log --oneline' }],
        ['Készíts commitot egy módosított fájlból.', 'Nézd meg a git log-ot és a git diff-et.'],
        ['Melyik parancs készít pillanatképet a változásokból?', ['git add', 'git commit', 'git status', 'git clone'], 1, 'A commit rögzíti az előkészített változásokat.']),

      L('terminal-8', 'Gyakori hibák és megoldásuk', 'Középhaladó', 14,
        'A hibák nagy része ismétlődő: rossz mappa, hiányzó csomag, elgépelt parancs. A hibaüzenet olvasása gyorsabb, mint a találgatás.',
        ['A „command not found” telepítési vagy PATH-probléma.', 'A „permission denied” jogosultsági hiba; ne futtass mindent rendszergazdaként.', 'A „port already in use” azt jelzi, hogy a port már foglalt.', 'Elakadásnál írd le: mit vártál, mit kaptál, mit próbáltál.'],
        [{ label: 'Diagnózis', lang: 'bash', code: 'which node\nnode --version\nlsof -i :3000\n# Windows: netstat -ano | findstr :3000' }],
        ['Szimulálj hibát: írj be egy nem létező parancsot.', 'Keresd meg a hibaüzenetben a kulcsszót.'],
        ['Mit jelent a „command not found”?', ['A fájl törölve van', 'A parancs nem elérhető a PATH-ban', 'A port foglalt', 'Nincs internet'], 1, 'A rendszer nem találja a parancsot a keresési útvonalon.'])
    ]
  }]);

  /* ---------------- JavaScript kiegészítés: böngészőn túli rész ---------------- */
  A('javascript', [
    L('javascript-7', 'A JavaScript a szerveren', 'Középhaladó', 16,
      'Ugyanaz a nyelv fut a böngészőben és a Node.js alatt is, de a környezet eltér: a böngészőben a DOM, a szerveren a fájlrendszer és a hálózat érhető el.',
      ['A Node.js nem tartalmaz DOM-ot.', 'A fájlkezeléshez a fs modul kell.', 'A require és az import modul betöltést végez.', 'A package.json a projekt leírása és függőségei.'],
      [{ label: 'Ugyanaz a nyelv', lang: 'js', code: '// böngésző\nconsole.log(document.title);\n\n// Node\nconst fs = require("node:fs");\nconsole.log(fs.readFileSync("package.json", "utf8"));' }],
      ['Hozz létre package.json-t: npm init -y.', 'Írj Node-szkriptet, amely beolvas egy szövegfájlt.'],
      ['Melyik állítás igaz?', ['A Node-ban is van document objektum', 'A Node-ban nincs DOM', 'A böngészőben fut a fs modul', 'A kettő ugyanaz a program'], 1, 'A Node nem böngésző: nincs benne DOM.']),

    L('javascript-8', 'Környezeti változók .env fájlból', 'Középhaladó', 18,
      'Beállításokat és titkokat környezeti változókból olvasunk. Így a kód ugyanaz marad fejlesztés és éles üzem között.',
      ['A .env kulcs=érték párokat tartalmaz soronként.', 'A dotenv csomag betölti a fájlt a Node folyamatba.', 'A .env soha nem kerül Gitbe; a .env.example igen.', 'Hiányzó kötelező kulcsnál állj le érthető hibával.'],
      [{ label: '.env', lang: 'bash', code: 'PORT=3000\nAPI_URL=http://localhost:8000\nAPI_KULCS=helyi-titok' },
       { label: 'Használat', lang: 'js', code: 'require("dotenv").config();\n\nconst kulcs = process.env.API_KULCS;\nif (!kulcs) throw new Error("Hiányzó API_KULCS");\n\nconsole.log("Kulcs hossza:", kulcs.length);' }],
      ['Telepítsd a dotenv-et: npm install dotenv.', 'Írd be a .env-et a .gitignore-ba, és ellenőrizd.'],
      ['Hova való a .env fájl?', ['A Git repóba', 'Csak a helyi gépre, a .gitignore-ba', 'A HTML-be', 'A böngésző localStorage-ába'], 1, 'A .env helyi titkokat tartalmaz, ezért kimarad a verziókezelésből.']),

    L('javascript-9', 'Saját API hívása', 'Haladó', 18,
      'A frontend gyakran a saját backendünket hívja. A fetch hívásnál kezelni kell a betöltés, siker és hiba állapotát.',
      ['A fetch nem dob hibát minden 4xx/5xx válaszra.', 'A response.ok ellenőrzése kötelező.', 'POST-nál fejlécben jelezd a JSON tartalmat.', 'A hibát a felhasználónak érthetően mutasd meg.'],
      [{ label: 'POST kérés', lang: 'js', code: 'async function mentes(adat) {\n  const res = await fetch("/api/leckek", {\n    method: "POST",\n    headers: { "Content-Type": "application/json" },\n    body: JSON.stringify(adat)\n  });\n  if (!res.ok) throw new Error("Mentés sikertelen: " + res.status);\n  return res.json();\n}' }],
      ['Hívd meg a saját API-t fetch-csel, és jelenítsd meg az eredményt.', 'Kezeld a hálózati hibát try/catch-ben.'],
      ['Mit kell ellenőrizni a fetch után?', ['Semmit', 'A response.ok értékét', 'A böngésző verzióját', 'A CSS-t'], 1, 'A fetch csak hálózati hibánál dob; a HTTP hibát a response.ok mutatja.']),

    L('javascript-10', 'Modulok és projektstruktúra', 'Haladó', 16,
      'Nagyobb projekten a fájlok szétválasztása áttekinthetővé teszi a kódot. A modulok exportálnak és importálnak.',
      ['Az export function más fájlból importálható.', 'Az import útja lehet relatív vagy csomagnév.', 'A type="module" szükséges a böngészőben.', 'Egy modul egy feladatot lásson el.'],
      [{ label: 'matek.js', lang: 'js', code: 'export const atlag = (szamok) =>\n  szamok.reduce((a, b) => a + b, 0) / szamok.length;' },
       { label: 'app.js', lang: 'js', code: 'import { atlag } from "./matek.js";\nconsole.log(atlag([4, 5, 3]));' }],
      ['Bontsd két modulra a korábbi számológépedet.', 'Ellenőrizd, hogy a konzol nem jelez-e hibát.'],
      ['Mi kell a böngészőben a modulok használatához?', ['Semmi', 'type="module" a script tagen', 'Egy CSS fájl', 'Szerver telepítése'], 1, 'A böngésző csak type="module" esetén kezeli modulként a fájlt.']),

    /* ---- Backend (Node.js) leckék a JavaScript kurzushoz ---- */
    L('nodejs-1', 'Mit jelent a backend?', 'Középhaladó', 14,
      'A frontend a böngészőben fut, a backend a szerveren: adatot tárol, dönt, és választ küld. A Node.js lehetővé teszi, hogy JavaScriptet futtass a szerveren.',
      ['A kliens kérést küld, a szerver válaszol.', 'A backend kezeli a jogosultságot és az üzleti logikát.', 'A titkok a szerveren maradnak, nem kerülnek a böngészőbe.', 'A HTTP a kommunikáció nyelve: metódus, útvonal, fejlécek, törzs.'],
      [{ label: 'Egy kérés útja', lang: 'text', code: 'Böngésző → GET /api/leckek → Szerver → adatbázis → 200 OK + JSON' }],
      ['Sorolj fel három dolgot, amit a backend végez.', 'Rajzold le egy bejelentkezés kérés-válasz folyamatát.'],
      ['Hol fut a backend kód?', ['A böngészőben', 'A szerveren', 'A képernyőn', 'A routerben'], 1, 'A backend a szerveroldalon fut.'],
      { figures: [{ src: H, alt: 'HTTP kérés és válasz', caption: 'A kliens kér, a szerver dönt és válaszol.', w: 720, h: 280 }] }),

    L('nodejs-2', 'Az első HTTP szerver', 'Középhaladó', 20,
      'A Node beépített http moduljával néhány sorban indítható szerver. Ez a legjobb módja annak, hogy megértsd, mi történik egy keretrendszer alatt.',
      ['createServer visszaad egy szerverobjektumot.', 'A kérés metódusa és url-je a kérés objektumban van.', 'A válasz fejléce és törzse külön állítható.', 'A szerver a listen hívással figyel egy porton.'],
      [{ label: 'server.js', lang: 'js', code: 'const http = require("http");\n\nconst server = http.createServer((req, res) => {\n  res.writeHead(200, { "Content-Type": "application/json; charset=utf-8" });\n  res.end(JSON.stringify({ uzenet: "Szia, backend!" }));\n});\n\nserver.listen(3000, () => console.log("http://localhost:3000"));' }],
      ['Indíts szervert a 3000-es porton, és nyisd meg böngészőben.', 'Módosítsd a választ, hogy a saját nevedet adja vissza.'],
      ['Melyik metódussal kezd a szerver figyelni a porton?', ['start()', 'listen()', 'open()', 'run()'], 1, 'A server.listen(port) indítja a figyelést.']),

    L('nodejs-3', 'Útvonalak kezelése', 'Középhaladó', 18,
      'A valódi szerver különböző útvonalakra különböző választ ad. Kezdetben egyszerű feltételekkel is elágazhatunk.',
      ['A req.url tartalmazza az útvonalat és a lekérdezést.', 'A 404 válasz a nem létező útvonalra való.', 'A metódus (GET, POST) is számít.', 'A JSON válasznál állítsd be a Content-Type fejlécet.'],
      [{ label: 'Elágazás', lang: 'js', code: 'const server = http.createServer((req, res) => {\n  if (req.url === "/") {\n    res.end("Főoldal");\n  } else if (req.url === "/api/leckek") {\n    res.writeHead(200, { "Content-Type": "application/json" });\n    res.end(JSON.stringify([{ id: 1, cim: "Első lecke" }]));\n  } else {\n    res.writeHead(404);\n    res.end("Nem található");\n  }\n});' }],
      ['Adj hozzá egy /nev útvonalat, amely JSON-ban visszaad egy nevet.', 'Kérj be egy nem létező útvonalat és ellenőrizd a 404-et.'],
      ['Mit ad vissza a szerver nem létező útvonalra?', ['200 OK', '302 átirányítás', '404 Nem található', '500 hiba'], 2, 'A nem létező erőforrásra 404 a helyes válasz.']),

    L('nodejs-4', 'Környezeti változók és .env', 'Középhaladó', 20,
      'A port, adatbázis-cím és API-kulcs ne legyen a kódban. A dotenv csomag beolvassa a .env fájlt, a kód pedig process.env-ből olvas.',
      ['Telepítés: npm install dotenv.', 'A dotenv.config() tölti be a fájlt.', 'process.env.KULCS olvassa az értéket.', 'Adj alapértéket: process.env.PORT || 3000.'],
      [{ label: '.env', lang: 'bash', code: 'PORT=3000\nDATABASE_URL=postgres://localhost:5432/app\nJWT_TITOK=hosszu-veletlen-szoveg' },
       { label: 'Betöltés', lang: 'js', code: 'require("dotenv").config();\nconst port = process.env.PORT || 3000;\n\nif (!process.env.DATABASE_URL) {\n  throw new Error("Hiányzó DATABASE_URL a .env fájlból");\n}\n\nconsole.log("Port:", port);' }],
      ['Telepítsd a dotenv-et, és olvasd be a PORT értéket.', 'Hiányzó kulcs esetén írj ki érthető hibát.'],
      ['Honnan olvassa a kód a .env értékeit?', ['document.env', 'process.env', 'window.env', 'localStorage'], 1, 'A Node a process.env objektumban tartja a környezeti változókat.'],
      { figures: [{ src: E, alt: '.env és .gitignore', caption: 'A .env helyi, a .env.example a csapatnak mutatja a kulcsokat.', w: 720, h: 300 }] }),

    L('nodejs-5', 'JSON törzs beolvasása', 'Középhaladó', 18,
      'POST kérésnél az adat a kérés törzsében érkezik. A törzs adatfolyam, ezért össze kell gyűjteni, majd JSON-ként értelmezni.',
      ['A req egy adatfolyam: data esemény darabokat ad.', 'Az end esemény jelzi a törzs végét.', 'A JSON.parse hibát dobhat sérült adatra.', 'A nagy törzs méretét korlátozni kell.'],
      [{ label: 'Törzs olvasása', lang: 'js', code: 'function body(req) {\n  return new Promise((resolve, reject) => {\n    let adat = "";\n    req.on("data", d => {\n      adat += d;\n      if (adat.length > 1e6) reject(new Error("Túl nagy kérés"));\n    });\n    req.on("end", () => {\n      try { resolve(JSON.parse(adat || "{}")); }\n      catch (e) { reject(new Error("Hibás JSON")); }\n    });\n  });\n}' }],
      ['Küldj POST kérést curl-lel egy JSON törzzsel.', 'Próbálj szándékosan hibás JSON-t küldeni.'],
      ['Miért kell a törzset összegyűjteni?', ['Mert darabokban érkezik', 'Mert titkosított', 'Mert mindig üres', 'Mert a böngésző törli'], 0, 'A kérés törzse adatfolyamként, több részletben érkezhet.']),

    L('nodejs-6', 'Express alapok', 'Középhaladó', 22,
      'Az Express a legelterjedtebb Node keretrendszer. Az útvonalakat és a köztes függvényeket tisztábban kezeli, mint a nyers http modul.',
      ['npm install express', 'app.get("/ut", kezelő) regisztrál egy útvonalat.', 'A res.json objektumot küld JSON-ként.', 'Az app.use köztes függvényt kapcsol be minden kéréshez.'],
      [{ label: 'app.js', lang: 'js', code: 'const express = require("express");\nconst app = express();\napp.use(express.json());\n\napp.get("/api/leckek", (req, res) => {\n  res.json([{ id: 1, cim: "Első lecke" }]);\n});\n\napp.listen(3000);' }],
      ['Készíts Express szervert két útvonallal.', 'Add hozzá az express.json() köztes függvényt.'],
      ['Melyik hívás küld JSON választ Expressben?', ['res.send', 'res.json', 'res.html', 'res.file'], 1, 'A res.json objektumot alakít JSON-ná és beállítja a fejlécet.']),

    L('nodejs-7', 'Köztes függvények és naplózás', 'Középhaladó', 16,
      'A köztes függvény minden kérés előtt lefuthat: naplóz, ellenőriz, hitelesít. A next() enged tovább a következő lépésre.',
      ['A köztes függvény (req, res, next) alakú.', 'A next() nélkül a kérés elakad.', 'A hibakezelő köztes függvénynek négy paramétere van.', 'Ne naplózz jelszót vagy tokent.'],
      [{ label: 'Naplózó', lang: 'js', code: 'app.use((req, res, next) => {\n  const start = Date.now();\n  res.on("finish", () => {\n    console.log(req.method, req.url, res.statusCode, Date.now() - start + "ms");\n  });\n  next();\n});' }],
      ['Írj naplózó köztes függvényt, amely kiírja a metódust és az útvonalat.', 'Ellenőrizd, hogy a válasz után fut-e le a naplózás.'],
      ['Mi történik, ha egy köztes függvény nem hívja meg a next()-et?', ['Gyorsabban fut', 'A kérés elakad', 'Törli a kérést', 'Újraindul a szerver'], 1, 'next() nélkül a lánc nem folytatódik.']),

    L('nodejs-8', 'Hibakezelés és státuszkódok', 'Haladó', 18,
      'A jó API nem omlik össze egy hibás kéréstől. A hibákat elkapatva egységes JSON választ adunk, megfelelő státuszkóddal.',
      ['400 rossz kérés, 401 hitelesítés hiányzik, 403 tiltott, 404 nem található, 500 szerverhiba.', 'Az async útvonal hibáját next(err) adja tovább.', 'A hiba részleteit ne szivárogtasd a kliensnek.', 'A szerver szintű kezelő naplózza a valódi okot.'],
      [{ label: 'Hibakezelő', lang: 'js', code: 'app.get("/api/lecke/:id", (req, res, next) => {\n  const id = Number(req.params.id);\n  if (!Number.isInteger(id)) {\n    return res.status(400).json({ hiba: "Érvénytelen azonosító" });\n  }\n  next();\n});\n\napp.use((err, req, res, next) => {\n  console.error(err);\n  res.status(500).json({ hiba: "Szerverhiba" });\n});' }],
      ['Készíts végpontot, amely 400-at ad nem szám azonosítóra.', 'Írj szándékos hibát, és nézd meg az 500-es választ.'],
      ['Melyik státuszkód jelzi a nem található erőforrást?', ['200', '301', '404', '500'], 2, 'A 404 azt jelenti, hogy a kért erőforrás nem létezik.']),

    L('nodejs-9', 'Adatbázis alapok (SQLite)', 'Haladó', 22,
      'A szerver adatait adatbázisban tároljuk. Az SQLite fájlalapú, ezért kiváló tanuláshoz: nincs külön szerver, mégis valódi SQL.',
      ['npm install better-sqlite3', 'A táblát CREATE TABLE hozza létre.', 'A paraméterezett lekérdezés véd az SQL-befecskendezés ellen.', 'A prepare().run() és .all() a leggyakoribb hívások.'],
      [{ label: 'db.js', lang: 'js', code: 'const Database = require("better-sqlite3");\nconst db = new Database("app.db");\n\ndb.exec(`CREATE TABLE IF NOT EXISTS lecke (\n  id INTEGER PRIMARY KEY AUTOINCREMENT,\n  cim TEXT NOT NULL\n)`);\n\nconst beszur = db.prepare("INSERT INTO lecke (cim) VALUES (?)");\nbeszur.run("Első lecke");\nconsole.log(db.prepare("SELECT * FROM lecke").all());' }],
      ['Hozz létre táblát és szúrj be két rekordot.', 'Kérdezd le az összes rekordot, majd szűrj címre.'],
      ['Miért kell paramétert használni a lekérdezésben?', ['Gyorsabb', 'Véd az SQL-befecskendezés ellen', 'Rövidebb kód', 'Nem kell'], 1, 'A paraméterezés elválasztja az adatot az SQL kódtól.']),

    L('nodejs-10', 'Projekt: kész REST API', 'Haladó', 25,
      'A tanult elemekből összeállítható egy kicsi, de valódi API: .env konfiguráció, Express, SQLite, CRUD végpontok és hibakezelés.',
      ['A mappaszerkezet: src, routes, db, .env.', 'A CRUD: létrehozás, olvasás, módosítás, törlés.', 'A bemenet mindig ellenőrizendő a szerveren.', 'A README írja le a futtatást és a környezeti változókat.'],
      [{ label: 'Szerkezet', lang: 'text', code: 'projekt/\n  .env\n  .env.example\n  .gitignore\n  package.json\n  src/\n    app.js\n    routes/leckek.js\n    db.js' },
       { label: 'Indítás', lang: 'bash', code: 'npm init -y\nnpm install express dotenv better-sqlite3\nnode src/app.js' }],
      ['Készíts CRUD végpontokat a leckékhez.', 'Teszteld curl-lel a létrehozást, olvasást és törlést.'],
      ['Mi a CRUD?', ['Egy adatbázismotor', 'Létrehozás, olvasás, módosítás, törlés', 'Egy HTTP fejléc', 'Egy CSS keretrendszer'], 1, 'A CRUD a négy alap adatművelet rövidítése.'])
  ]);
  var javascriptLessons = window.KA.extraLessons.javascript;
  var nodeLessons = javascriptLessons.filter(function (lesson) { return lesson.id.startsWith('nodejs-'); });
  window.KA.extraLessons.javascript = javascriptLessons.filter(function (lesson) { return !lesson.id.startsWith('nodejs-'); });
  C([{
    slug: 'nodejs', title: 'Node.js API (server.js)', icon: '🟩', category: 'Webfejlesztés',
    description: 'Node.js szerver, HTTP, Express, JSON végpontok, adatbázis és API tesztelés.',
    prereqs: ['javascript'], runtime: 'local',
    setup: 'Telepítsd a Node.js-t. Terminálban ellenőrizd: node --version és npm --version. Hozz létre külön gyakorló mappát: mkdir api-gyakorlat, cd api-gyakorlat, npm init -y. A példák a saját gépeden futnak.',
    lessons: nodeLessons
  }]);
  A('nodejs', [
    L('nodejs-api-1', 'Önálló API server.js fájlban', 'Középhaladó', 24,
      'A Node.js API-t külön server.js fájlban indítod. Ez a példa Express-szel GET és POST végpontot ad, és a futás idejére memóriában tartja a leckéket. A PHP/XAMPP példa ettől külön szerverprogram.',
      ['A node server.js parancs indítja a JavaScript szervert.', 'A GET lekéri a listát, a POST új elemet vesz fel.', 'Az express.json() feldolgozza a JSON kéréstörzset és méretkorlátot állít.', 'A szerver újraindításakor a memóriában tárolt adatok elvesznek.'],
      [{label:'Projekt indítása',lang:'bash',code:'mkdir node-api\ncd node-api\nnpm init -y\nnpm install express\n# Mentsd az alábbi kódot server.js néven\nnode server.js'},
       {label:'server.js',lang:'js',code:'const express = require("express");\nconst app = express();\napp.use(express.json({ limit: "10kb" }));\n\nconst leckek = [{ id: 1, cim: "Első lecke" }];\napp.get("/api/leckek", (req, res) => res.json(leckek));\napp.post("/api/leckek", (req, res) => {\n  const cim = typeof req.body?.cim === "string" ? req.body.cim.trim() : "";\n  if (!cim) return res.status(400).json({ hiba: "Hiányzó cím" });\n  const lecke = { id: leckek.length + 1, cim };\n  leckek.push(lecke);\n  res.status(201).json(lecke);\n});\napp.use((err, req, res, next) => {\n  if (err.type === "entity.too.large") return res.status(413).json({ hiba: "Túl nagy kérés" });\n  if (err instanceof SyntaxError && err.status === 400) return res.status(400).json({ hiba: "Hibás JSON" });\n  res.status(500).json({ hiba: "Szerverhiba" });\n});\napp.listen(3000, () => console.log("http://localhost:3000"));'},
       {label:'API kipróbálása (macOS/Linux/Git Bash)',lang:'bash',code:'curl -i http://localhost:3000/api/leckek\ncurl -i -X POST http://localhost:3000/api/leckek -H "Content-Type: application/json" -d "{\\\"cim\\\":\\\"Új lecke\\\"}"\ncurl -i http://localhost:3000/api/leckek'}],
      ['Indítsd el a szervert, és ellenőrizd a GET válaszát.', 'Küldj POST kérést, majd kérd le újra a listát. Próbálj üres címet is.'],
      ['Melyik parancs indítja ezt a Node.js API-t?', ['node server.js', 'php server.js', 'apache server.js'], 0, 'A server.js JavaScript fájlt a Node.js futtatja.']),

    L('nodejs-api-2', 'Beépített modulok és npm csomagok', 'Kezdő', 20,
      'A Node.js beépített moduljai telepítés nélkül használhatók. Az Express, a dotenv és a better-sqlite3 külön npm csomag, ezért a projektben telepíteni kell őket.',
      ['A node:http HTTP szervert, a node:path fájlútvonalakat kezel.', 'A node:fs/promises aszinkron fájlműveleteket ad.', 'Az express útvonalakat és HTTP válaszokat kezel, a dotenv helyi .env beállításokat olvas.', 'A better-sqlite3 SQLite-adatbázishoz ad paraméterezett SQL-lekérdezéseket.'],
      [{label:'Telepítés a projekt mappájában',lang:'bash',code:'node --version\nnpm --version\nnpm init -y\nnpm install express dotenv better-sqlite3\nnpm list --depth=0'},
       {label:'modulok.js',lang:'js',code:'const path = require("node:path");\nconst fs = require("node:fs/promises");\nconst express = require("express");\n\nasync function main() {\n  const fajl = path.join(process.cwd(), "package.json");\n  const szoveg = await fs.readFile(fajl, "utf8");\n  console.log(JSON.parse(szoveg).name);\n  console.log(typeof express);\n}\nmain().catch(console.error);'}],
      ['A telepítés után futtasd a modulok.js fájlt: node modulok.js.', 'Távolítsd el az express sort, majd ellenőrizd, hogy a két beépített modul továbbra is működik.'],
      ['Melyiket kell npm install paranccsal telepíteni?', ['node:path', 'node:fs/promises', 'express'], 2, 'Az Express külső csomag. A node: előtagú modulokat a Node.js tartalmazza.']),

    L('nodejs-api-3', 'Backend mappaszerkezet és modulok', 'Középhaladó', 24,
      'A server.js indítja a szervert, a routes mappában pedig külön fájl kezeli az API útvonalait. Így a két fájlt külön is meg tudod érteni és bővíteni.',
      ['A package.json rögzíti a telepített csomagokat és a futtató szkripteket.', 'A node_modules telepített csomagokat tartalmaz, ezért .gitignore-ba kerül.', 'A module.exports és require átadja a routert a server.js fájlnak.', 'A routes/leckek.js csak a /api/leckek végpontokkal foglalkozik.'],
      [{label:'Projekt és parancsok',lang:'text',code:'node-api/\n  server.js\n  routes/\n    leckek.js\n  package.json\n  package-lock.json\n  .gitignore\n  node_modules/ (telepítés után)'},
       {label:'routes/leckek.js',lang:'js',code:'const express = require("express");\nconst router = express.Router();\nconst leckek = [{ id: 1, cim: "Első lecke" }];\nrouter.get("/", (req, res) => res.json(leckek));\nrouter.post("/", (req, res) => {\n  const cim = typeof req.body?.cim === "string" ? req.body.cim.trim() : "";\n  if (!cim) return res.status(400).json({ hiba: "Hiányzó cím" });\n  const lecke = { id: leckek.length + 1, cim };\n  leckek.push(lecke);\n  res.status(201).json(lecke);\n});\nmodule.exports = router;'},
       {label:'server.js',lang:'js',code:'const express = require("express");\nconst leckek = require("./routes/leckek");\nconst app = express();\napp.use(express.json({ limit: "10kb" }));\napp.use("/api/leckek", leckek);\napp.listen(3000, () => console.log("http://localhost:3000"));'},
       {label:'Indítás',lang:'bash',code:'mkdir node-api\ncd node-api\nnpm init -y\nnpm install express\nmkdir routes\n# Mentsd el a két JS fájlt a fenti szerkezetben\nnode server.js\n# Másik terminálban: curl -i http://localhost:3000/api/leckek'}],
      ['Hozd létre a megadott fájlokat, majd kérd le a GET végpontot.', 'Írd be a node_modules/ sort a .gitignore fájlba.'],
      ['Melyik fájl indítja a szervert a példában?', ['routes/leckek.js', 'server.js', 'package-lock.json'], 1, 'A server.js hozza létre és indítja el az Express alkalmazást.']),

    L('nodejs-api-4', '.env és biztonságos konfiguráció', 'Középhaladó', 22,
      'A .env helyi beállításokat tartalmaz, például a portot és az adatbázis fájlnevét. Az alkalmazás indításkor olvassa be, ellenőrzi az értékeket, majd használja őket.',
      ['A .env a saját géped beállításait tartalmazza, ezért szerepeljen a .gitignore fájlban.', 'A .env.example csak a kulcsok mintája, így megosztható.', 'A dotenv.config() után a process.env objektumból olvashatók az értékek.', 'A PORT csak 1 és 65535 közötti egész szám lehet. Titkot ne írj konzolra.'],
      [{label:'.env és .env.example',lang:'text',code:'# .env\nPORT=3000\nDB_FILE=./leckek.db\n\n# .env.example (ugyanazok a kulcsok, titkos érték nélkül)\nPORT=3000\nDB_FILE=./leckek.db\n\n# .gitignore\n.env\nnode_modules/\n*.db'},
       {label:'server.js',lang:'js',code:'require("dotenv").config();\nconst express = require("express");\nconst port = Number(process.env.PORT ?? 3000);\nif (!Number.isInteger(port) || port < 1 || port > 65535) {\n  throw new Error("A PORT 1 és 65535 közötti egész szám legyen");\n}\nconst dbFile = process.env.DB_FILE || "./leckek.db";\nconst app = express();\napp.get("/api/config", (req, res) => res.json({ adatbazisFajl: dbFile }));\napp.listen(port, () => console.log(`http://localhost:${port}`));'},
       {label:'Parancsok',lang:'bash',code:'npm install express dotenv\nnode server.js\ncurl -i http://localhost:3000/api/config\n# Állítsd le Ctrl+C-vel, módosítsd a PORT-ot, majd indítsd újra.'}],
      ['Készíts .env, .env.example és .gitignore fájlt a projekt gyökerében.', 'Állítsd a PORT-ot 3001-re, indítsd újra a szervert, és próbáld ki a localhost:3001 címet.'],
      ['Melyik fájlt kell kizárni a Gitből?', ['.env', '.env.example', 'package.json'], 0, 'A .env helyi értékeket és akár titkokat is tartalmazhat.']),

    L('nodejs-api-5', 'SQL-lekérdezések SQLite adatbázissal', 'Középhaladó', 26,
      'A memóriában tárolt lista újraindításkor eltűnik. Az SQLite fájlba menti az adatokat. Az alábbi példa létrehozza a táblát, majd INSERT, SELECT, UPDATE és DELETE lekérdezést futtat.',
      ['A CREATE TABLE IF NOT EXISTS csak akkor hoz létre táblát, ha még nincs.', 'A SELECT olvas, az INSERT beszúr, az UPDATE módosít, a DELETE töröl.', 'A WHERE id = ? pontosan egy azonosítót céloz meg.', 'A felhasználói adatokat a prepare és az argumentumok választják el az SQL szövegétől.'],
      [{label:'Telepítés',lang:'bash',code:'npm install better-sqlite3\n# Mentsd a példát db.js néven, majd futtasd:\nnode db.js'},
       {label:'db.js',lang:'js',code:'const Database = require("better-sqlite3");\nconst db = new Database("leckek.db");\ndb.exec("CREATE TABLE IF NOT EXISTS leckek (id INTEGER PRIMARY KEY, cim TEXT NOT NULL)");\n\nconst uj = db.prepare("INSERT INTO leckek (cim) VALUES (?)").run("Első SQL lecke");\nconst id = uj.lastInsertRowid;\nconsole.log("Egy lecke:", db.prepare("SELECT id, cim FROM leckek WHERE id = ?").get(id));\nconsole.log("Összes:", db.prepare("SELECT id, cim FROM leckek ORDER BY id").all());\ndb.prepare("UPDATE leckek SET cim = ? WHERE id = ?").run("Javított cím", id);\nconsole.log("Módosítva:", db.prepare("SELECT id, cim FROM leckek WHERE id = ?").get(id));\ndb.prepare("DELETE FROM leckek WHERE id = ?").run(id);\nconsole.log("Törlés után:", db.prepare("SELECT id, cim FROM leckek WHERE id = ?").get(id));\ndb.close();'}],
      ['Futtasd a db.js fájlt, és ellenőrizd az INSERT utáni és a DELETE utáni eredményt.', 'Adj hozzá egy második sort, majd kérdezd le SELECT-tel az összes leckét.'],
      ['Mire szolgál a WHERE id = ? az UPDATE és DELETE utasításban?', ['Az adott sor kiválasztására', 'A tábla létrehozására', 'A szerver indítására'], 0, 'A WHERE feltétel határozza meg, melyik sor változik vagy törlődik.'])
  ]);
})();
