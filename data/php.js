/* PHP ág */
(function () {
  var L = window.KA.lesson, A = window.KA.addLessons, C = window.KA.addCourses;

  A('php', [
    L('php-7', 'Környezet: XAMPP, PHP beépített szerver', 'Kezdő', 16,
      'A PHP futtatásához szerver kell. Tanuláshoz a legegyszerűbb a PHP beépített szervere vagy egy csomag (XAMPP).',
      ['php -S localhost:8000 indít fejlesztői szervert.', 'A fájl kiterjesztése .php.', 'A PHP kód <?php ... ?> blokkban van.', 'A fejlesztői szerver nem éles üzemre való.'],
      [{ label: 'Indítás', lang: 'bash', code: '# a projekt mappájában\nphp -S localhost:8000\n# böngésző: http://localhost:8000/index.php' },
       { label: 'index.php', lang: 'php', code: '<?php\necho "Szia, PHP!";' }],
      ['Indítsd el a beépített szervert, és nyisd meg az oldalt.', 'Írj ki egy üdvözlést változóval.'],
      ['Melyik parancs indítja a PHP fejlesztői szervert?', ['php start', 'php -S localhost:8000', 'php run', 'php serve'], 1, 'A -S kapcsoló indítja a beépített szervert.']),

    L('php-8', 'Változók, típusok, szövegek', 'Kezdő', 16,
      'A PHP változóit $ jelöli. A nyelv gyengén tipizált, de a modern PHP szigorú típusokat is enged.',
      ['A $nev változódeklaráció.', 'A .= hozzáfűz, az interpoláció csak " " szövegben működik.', 'A (int) és (float) kasztol.', 'A strict_types=1 szigorúbb típuskezelést kér.'],
      [{ label: 'Alapok', lang: 'php', code: '<?php\ndeclare(strict_types=1);\n\n$nev = "Anna";\n$kor = 21;\necho "Szia, $nev! " . ($kor + 1) . " éves leszel.";' }],
      ['Számold ki két szám átlagát és írd ki 2 tizedesre.', 'Próbáld ki a szigorú típusokat.'],
      ['Hogyan jelölünk változót PHP-ban?', ['@nev', '$nev', 'nev:', 'var nev'], 1, 'A PHP változónevek $ jellel kezdődnek.']),

    L('php-9', 'Feltételek, ciklusok, tömbök', 'Kezdő', 18,
      'A tömb a leggyakoribb adatszerkezet PHP-ban. Lehet indexelt vagy kulcsos (asszociatív).',
      ['Az [] indexelt tömb, a ["kulcs" => érték] asszociatív.', 'A foreach bejárja a tömböt.', 'A count() elemszámot ad.', 'A in_array() és array_key_exists() ellenőrzésre való.'],
      [{ label: 'Tömb', lang: 'php', code: '<?php\n$tanulok = [\n  ["nev" => "Anna", "kor" => 21],\n  ["nev" => "Béla", "kor" => 19]\n];\n\nforeach ($tanulok as $t) {\n  echo $t["nev"] . " (" . $t["kor"] . ")\\n";\n}' }],
      ['Készíts tömböt 3 tanulóval, és listázd ki.', 'Számold ki az átlagéletkort.'],
      ['Melyik ciklus járja be kényelmesen a tömböt?', ['while', 'foreach', 'do-while', 'switch'], 1, 'A foreach tömbök bejárására való.']),

    L('php-10', 'Függvények és fájlok', 'Középhaladó', 18,
      'A függvény újrafelhasználható logikát ad. A fájlkezelésnél figyelj a jogosultságra és a hibakezelésre.',
      ['A function nev(...) függvényt definiál.', 'A file_get_contents egyszerű olvasásra jó.', 'A file_put_contents ír, de vigyázz a jogosultsággal.', 'A json_decode és json_encode JSON-hoz kell.'],
      [{ label: 'Fájl + JSON', lang: 'php', code: '<?php\nfunction betolt(string $ut): array {\n    if (!is_file($ut)) return [];\n    $adat = json_decode(file_get_contents($ut), true);\n    return is_array($adat) ? $adat : [];\n}\n\n$lista = betolt("adatok.json");\necho count($lista) . " elem";' }],
      ['Ments egy tömböt JSON fájlba, majd olvasd vissza.', 'Kezeld a nem létező fájl esetét.'],
      ['Melyik függvény olvas fájlt szövegként?', ['file_put_contents', 'file_get_contents', 'fopen only', 'echo'], 1, 'A file_get_contents szövegként olvassa a fájlt.']),

    L('php-11', 'Környezeti változók és .env', 'Középhaladó', 18,
      'A titkokat PHP-ban is környezeti változókba tesszük. Helyi fejlesztéshez a vlucas/phpdotenv csomag vagy egyszerű betöltő segít.',
      ['A getenv("KULCS") olvas környezeti változót.', 'A $_ENV és $_SERVER is tartalmazhat értékeket.', 'A .env fájl nem kerül a webgyökérbe publikusan.', 'Élesben a szerver környezeti beállításait használd.'],
      [{ label: '.env', lang: 'bash', code: 'APP_ENV=local\nDB_HOST=127.0.0.1\nDB_JELSZO=valtoztasd-meg\nAPP_KULCS=hosszu-veletlen' },
       { label: 'Betöltés', lang: 'php', code: '<?php\n$sorok = file("...", FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);\n// egyszerű példa: kulcs=érték párok beolvasása\n$jelszo = getenv("DB_JELSZO");\nif (!$jelszo) {\n    exit("Hiányzó DB_JELSZO");\n}' }],
      ['Hozz létre .env fájlt DB_JELSZO értékkel.', 'Olvasd be getenv segítségével, és kezeld a hiányzó értéket.'],
      ['Hova nem kerülhet a .env fájl?', ['A .gitignore-ba', 'A nyilvános webgyökérbe', 'A szerver beállításaiba', 'A fejlesztői gépre'], 1, 'A .env nem kerülhet nyilvánosan elérhető helyre.']),

    L('php-12', 'Űrlap és alap validáció', 'Középhaladó', 18,
      'A PHP űrlapadatot a $_POST vagy $_GET tömbökben kap. Az adatot mindig ellenőrizni és tisztítani kell.',
      ['A $_POST a POST mezőket tartalmazza.', 'A htmlspecialchars megvéd a HTML-befecskendezéstől.', 'A filter_var email ellenőrzésre használható.', 'Szerveroldali ellenőrzés nélkül az adat nem megbízható.'],
      [{ label: 'Űrlap', lang: 'php', code: '<?php\nif ($_SERVER["REQUEST_METHOD"] === "POST") {\n    $nev = trim($_POST["nev"] ?? "");\n    if ($nev === "") {\n        $hiba = "A név kötelező";\n    } else {\n        echo "Szia, " . htmlspecialchars($nev, ENT_QUOTES, "UTF-8");\n    }\n}' }],
      ['Készíts űrlapot, és írd ki biztonságosan a nevet.', 'Próbálj HTML-t küldeni a név mezőben.'],
      ['Melyik függvény véd a HTML-befecskendezéstől?', ['trim', 'htmlspecialchars', 'count', 'echo'], 1, 'A htmlspecialchars karakterré alakítja a speciális jeleket.']),

    L('php-13', 'Munkamenet és bejelentkezés', 'Középhaladó', 20,
      'A munkamenet a felhasználó állapotát tárolja a szerveren. A bejelentkezésnél a jelszót hash-elten tároljuk, soha nem simán.',
      ['A session_start() indítja a munkamenetet.', 'A $_SESSION tárolja az állapotot.', 'A password_hash és password_verify a jelszóhoz kell.', 'A kilépésnél session_destroy().'],
      [{ label: 'Bejelentkezés', lang: 'php', code: '<?php\nsession_start();\n\n$hash = password_hash("titkos123", PASSWORD_DEFAULT);\n\nif (password_verify("titkos123", $hash)) {\n    $_SESSION["felhasznalo"] = "Anna";\n}\necho $_SESSION["felhasznalo"] ?? "Vendég";' }],
      ['Írj bejelentkező oldalt, amely ellenőrzi a jelszót.', 'Tárold a felhasználót a munkamenetben.'],
      ['Hogyan tároljuk a jelszót?', ['Sima szövegként', 'password_hash hashel', 'Base64-ben', 'A .env-ben simán'], 1, 'A jelszót mindig hash-elten tároljuk.']),

    L('php-14', 'Adatbázis PDO-val', 'Haladó', 22,
      'A PDO egységes felületet ad különböző adatbázisokhoz. A paraméterezett lekérdezés véd az SQL-befecskendezés ellen.',
      ['new PDO("mysql:host=...;dbname=...", $user, $pass)', 'A prepare + execute paraméterezett lekérdezést ad.', 'A fetchAll és fetchAll(PDO::FETCH_ASSOC) eredményt ad.', 'A hibamódot kivételre állítsd.'],
      [{ label: 'PDO', lang: 'php', code: '<?php\n$pdo = new PDO("mysql:host=127.0.0.1;dbname=app;charset=utf8mb4", $user, $pass, [\n    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION\n]);\n\n$stmt = $pdo->prepare("SELECT * FROM leckek WHERE szint = ?");\n$stmt->execute(["Kezdő"]);\n\nforeach ($stmt->fetchAll(PDO::FETCH_ASSOC) as $sor) {\n    echo $sor["cim"];\n}' }],
      ['Készíts táblát és kérdezd le PDO-val.', 'Használj paramétert a szűréshez.'],
      ['Miért fontos a prepare?', ['Gyorsabb', 'Véd az SQL-befecskendezés ellen', 'Rövidebb', 'Nem fontos'], 1, 'A paraméterezett lekérdezés elválasztja az adatot az SQL-től.']),

    L('php-15', 'Projekt: kicsi CRUD', 'Haladó', 24,
      'A tanult elemekből készíts listázó és rögzítő alkalmazást: űrlap, validáció, PDO és munkamenet-alapú üzenetek.',
      ['A mappaszerkezet: index.php, config.php, functions.php.', 'A listázás és a létrehozás külön nézetben.', 'Az üzeneteket flash munkamenetben tárold.', 'A projekt legyen futtatható README-vel.'],
      [{ label: 'Szerkezet', lang: 'text', code: 'projekt/\n  index.php\n  config.php\n  functions.php\n  views/\n    lista.php\n    urlap.php\n  .env' }],
      ['Készíts listázó és rögzítő oldalt PDO-val.', 'Mutass visszajelzést sikeres mentés után.'],
      ['Hova tesszük a flash üzenetet?', ['A CSS-be', 'A munkamenetbe', 'A GET paraméterbe', 'A HTML kommentbe'], 1, 'A flash üzeneteket a munkamenetben tároljuk ideiglenesen.'])
  ]);

  C([{
    slug: 'php-api', title: 'PHP REST API', icon: '🧾', category: 'Backend',
    description: 'JSON API PHP-ból: útvonalak, metódusok, státuszkódok, validáció és hitelesítés.',
    prereqs: ['php'], runtime: 'local',
    setup: 'PHP 8 és egy szerver (beépített php -S kamp;MySQL-hez XAMPP/MariaDB). Composer a csomagokhoz.',
    lessons: [
      L('php-api-1', 'API szerkezet és JSON', 'Kezdő', 16,
        'A PHP API JSON-ban kommunikál. A fejlécben jelezni kell a tartalmat, és minden válasznak világos szerkezete legyen.',
        ['A header("Content-Type: application/json") fejlécet állít.', 'A json_encode tömböt JSON-ná alakít.', 'A http_response_code státuszkódot állít.', 'A hibaválasz is egységes legyen.'],
        [{ label: 'JSON válasz', lang: 'php', code: '<?php\nheader("Content-Type: application/json; charset=utf-8");\nhttp_response_code(200);\n\necho json_encode(["uzenet" => "Szia, API!"]);' }],
        ['Írj végpontot, amely JSON-ban üdvözöld.', 'Nézd meg a választ curl-lel.'],
        ['Melyik függvény állítja a HTTP státuszkódot?', ['set_status', 'http_response_code', 'header_code', 'echo'], 1, 'A http_response_code állítja a státuszt.']),

      L('php-api-2', 'Metódusok és útvonalak', 'Középhaladó', 18,
        'A REST API metódusokra épül: GET olvas, POST létrehoz, PUT módosít, DELETE töröl. Az útvonal a REQUEST_URI-ból jön.',
        ['A $_SERVER["REQUEST_METHOD"] adja a metódust.', 'A parse_url és REQUEST_URI adja az útvonalat.', 'A nem támogatott metódusra 405 válasz.', 'A nem létező végpontra 404.'],
        [{ label: 'Ágazás', lang: 'php', code: '<?php\n$ut = parse_url($_SERVER["REQUEST_URI"], PHP_URL_PATH);\n$metodus = $_SERVER["REQUEST_METHOD"];\n\nif ($ut === "/api/leckek" && $metodus === "GET") {\n    echo json_encode([]);\n} else {\n    http_response_code(404);\n    echo json_encode(["hiba" => "Nem található"]);\n}' }],
        ['Készíts GET és POST ágat ugyanarra az útvonalra.', 'Teszteld curl-lel.'],
        ['Melyik metódus olvas adatot a REST-ben?', ['POST', 'GET', 'DELETE', 'PUT'], 1, 'A GET olvasásra való.']),

      L('php-api-3', 'Kérés törzsének olvasása', 'Középhaladó', 16,
        'A JSON törzset a php://input-ból olvassuk. A json_decode hibát adhat, ezt kezelni kell.',
        ['file_get_contents("php://input") adja a nyers törzset.', 'A json_decode második paramétere true, ha tömböt akarunk.', 'A hibás JSON-ra 400 válasz.', 'Az adatot validálni kell.'],
        [{ label: 'POST törzs', lang: 'php', code: '<?php\n$nyers = file_get_contents("php://input");\n$adat = json_decode($nyers, true);\n\nif (!is_array($adat)) {\n    http_response_code(400);\n    exit(json_encode(["hiba" => "Hibás JSON"]));\n}' }],
        ['Küldj JSON-t curl-lel, és olvasd be.', 'Küldj szándékosan hibás JSON-t.'],
        ['Honnan olvassuk a JSON törzset?', ['$_POST-ból', 'php://input-ból', '$_GET-ből', 'php://output-ból'], 1, 'A php://input adja a nyers kérés törzsét.']),

      L('php-api-4', 'Hitelesítés token alapján', 'Haladó', 20,
        'Az API-t nem böngészős munkamenet védi, hanem token. A tokent fejlécben küldjük, a szerver ellenőrzi.',
        ['Az Authorization: Bearer <token> fejléc a bevett forma.', 'A tokent hashesen tárolt adatból ellenőrizzük.', 'A hiányzó hitelesítésre 401 válasz.', 'A tokent soha nem tesszük URL-be.'],
        [{ label: 'Token ellenőrzés', lang: 'php', code: '<?php\n$fejlecek = getallheaders();\n$auth = $fejlecek["Authorization"] ?? "";\n\nif (!str_starts_with($auth, "Bearer ")) {\n    http_response_code(401);\n    exit(json_encode(["hiba" => "Hiányzó token"]));\n}\n\n$token = substr($auth, 7);\n// itt ellenőrizzük az adatbázisban' }],
        ['Készíts végpontot, amely tokent kér.', 'Teszteld curl-lel a hiányzó és a megfelelő token esetét.'],
        ['Melyik státuszkód való hiányzó hitelesítésre?', ['400', '401', '404', '500'], 1, 'A 401 hitelesítési hiányt jelent.']),

      L('php-api-5', 'Hibakezelés és naplózás', 'Haladó', 18,
        'Az API hibáját ne a felhasználónak szóló részletekkel add vissza. A valódi hibát naplózni kell, a kliens rövid üzenetet kap.',
        ['A try/catch a PDO kivételeket is elkapja.', 'A hiba részletét error_log írja fájlba.', 'A válaszban egységes hibaobjektum legyen.', 'Az éles módban ne jelenjen meg a hiba részlete.'],
        [{ label: 'Hiba', lang: 'php', code: '<?php\ntry {\n    // adatbázis művelet\n} catch (Throwable $e) {\n    error_log($e->getMessage());\n    http_response_code(500);\n    echo json_encode(["hiba" => "Szerverhiba"]);\n}' }],
        ['Szimulálj hibát, és ellenőrizd az egységes választ.', 'Nézd meg, hova kerül a napló.'],
        ['Hova kerül a valódi hiba részlete?', ['A válaszba', 'A naplóba', 'A HTML-be', 'A CSS-be'], 1, 'A részletes hiba a naplóba kerül, nem a klienshez.']),

      L('php-api-6', 'Projekt: teljes API', 'Haladó', 24,
        'A projekt összeköti a tanultakat: PDO kapcsolat, CRUD végpontok JSON-ben, token védelem és egységes hibakezelés.',
        ['A config külön fájlban, .env-ből.', 'A végpontok külön fájlokban vagy ágakban.', 'A válaszok egységes szerkezetűek.', 'A README tartalmazza a futtatást és a példakéréseket.'],
        [{ label: 'Példa kérés', lang: 'bash', code: 'curl -X POST http://localhost:8000/api/leckek \\\n  -H "Content-Type: application/json" \\\n  -H "Authorization: Bearer TOKEN" \\\n  -d \'{"cim":"Új lecke"}\'' }],
        ['Készíts CRUD API-t token védelemmel.', 'Teszteld az összes metódust.'],
        ['Mit tartalmaz a README az API-nál?', ['Csak a CSS-t', 'A futtatást és a példakéréseket', 'A jelszavakat', 'A tokent'], 1, 'A README segít a használatban és a futtatásban.'])
    ]
  }]);
})();
