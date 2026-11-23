/* Helyi PHP backend gyakorlás XAMPP-pal a webes ágban. */
(function () {
  var L = window.KA.lesson;
  window.KA.addCourses([{
    slug: 'xampp', title: 'PHP backend XAMPP-pal', icon: '🐘', category: 'Webfejlesztés',
    description: 'Apache, PHP, MySQL és JSON API helyi fejlesztői környezetben.',
    prereqs: ['html'], runtime: 'local',
    setup: 'Telepítsd a XAMPP-ot a saját gépeden. Indítsd el az Apache szolgáltatást a XAMPP Control Panelben. Windows alatt a példák mappája általában C:\\xampp\\htdocs\\api-gyakorlat, macOS-en /Applications/XAMPP/xamppfiles/htdocs/api-gyakorlat, Linuxon /opt/lampp/htdocs/api-gyakorlat. Böngészőben nyisd meg: http://localhost/api-gyakorlat/. A GitHub Pages PHP-t nem futtat.',
    lessons: [
      L('xampp-1', 'XAMPP indítása és első PHP oldal', 'Kezdő', 18,
        'A XAMPP helyben futtatja az Apache webszervert és a PHP-t. A htdocs alatti fájlokat a localhost címen éred el.',
        ['Indítsd el az Apache-ot a vezérlőpulton.', 'A PHP fájl .php végződésű, a böngészőben a localhost URL-en nyisd meg.', 'A php -v terminálparancs ellenőrzi a parancssori PHP elérhetőségét, ha a PHP mappája a PATH-ban van.', 'A szerver leállításához a vezérlőpult Stop gombját használd.'],
        [{label:'htdocs/api-gyakorlat/index.php',lang:'php',code:'<?php\nheader("Content-Type: text/html; charset=utf-8");\necho "<h1>Szia, XAMPP!</h1>";'},
         {label:'Ellenőrzés terminálból',lang:'bash',code:'curl -i http://localhost/api-gyakorlat/index.php\n# Windows PowerShellben: curl.exe -i http://localhost/api-gyakorlat/index.php'}],
        ['Hozd létre az index.php fájlt a htdocs/api-gyakorlat mappában.', 'Indítsd el az Apache-ot, és ellenőrizd a választ böngészőben vagy curl-lel.'],
        ['Melyik cím szolgálja ki a htdocs/api-gyakorlat/index.php fájlt?', ['http://localhost/api-gyakorlat/index.php', 'file:///api-gyakorlat/index.php', 'https://github.io/index.php'], 0, 'A helyi Apache a localhost címen szolgálja ki a htdocs tartalmát.']),
      L('xampp-2', 'GET API PHP-val', 'Középhaladó', 20,
        'Egy API végpont JSON választ ad. A GET kérés lekérdez, a megfelelő fejléc jelzi a JSON formátumot.',
        ['A header függvény a válasz törzse előtt fut.', 'A json_encode PHP tömböt JSON-ná alakít.', 'A $_GET a lekérdezési paramétereket tartalmazza.', 'A paramétert ellenőrizd, mielőtt a válaszban használod.'],
        [{label:'htdocs/api-gyakorlat/leckek.php',lang:'php',code:'<?php\nheader("Content-Type: application/json; charset=utf-8");\n$id = filter_input(INPUT_GET, "id", FILTER_VALIDATE_INT);\nif ($id === false && isset($_GET["id"])) {\n    http_response_code(400);\n    echo json_encode(["hiba" => "Érvénytelen id"]);\n    exit;\n}\necho json_encode(["id" => $id ?: 1, "cim" => "Első lecke"], JSON_UNESCAPED_UNICODE);'},
         {label:'API kipróbálása',lang:'bash',code:'curl -i "http://localhost/api-gyakorlat/leckek.php?id=2"\ncurl -i "http://localhost/api-gyakorlat/leckek.php?id=hiba"'}],
        ['Ellenőrizd a 200-as és a 400-as válasz státuszát.', 'Egészítsd ki a JSON választ egy perc mezővel.'],
        ['Melyik PHP függvény alakítja a tömböt JSON szöveggé?', ['json_encode', 'json_decode', 'print_r'], 0, 'A json_encode készíti a JSON választ.']),
      L('xampp-3', 'POST API és bemenetellenőrzés', 'Középhaladó', 22,
        'A POST kérés JSON törzset küld. A szerver ellenőrzi a metódust és az adatot, majd megfelelő státuszkóddal válaszol.',
        ['A php://input a nyers kéréstörzset adja.', 'A json_decode(..., true) asszociatív tömböt készít.', 'Hibás bemenetre 400, sikeres létrehozásra 201 válasz adható.', 'Ez a példa nem tárol adatot, csak a kérés feldolgozását mutatja.'],
        [{label:'htdocs/api-gyakorlat/uj.php',lang:'php',code:'<?php\nheader("Content-Type: application/json; charset=utf-8");\nif ($_SERVER["REQUEST_METHOD"] !== "POST") {\n    http_response_code(405);\n    header("Allow: POST");\n    echo json_encode(["hiba" => "POST szükséges"]);\n    exit;\n}\n$adat = json_decode(file_get_contents("php://input"), true);\n$cim = is_array($adat) && isset($adat["cim"]) && is_string($adat["cim"]) ? trim($adat["cim"]) : "";\nif ($cim === "") {\n    http_response_code(400);\n    echo json_encode(["hiba" => "Hiányzó cím"]);\n    exit;\n}\nhttp_response_code(201);\necho json_encode(["cim" => $cim], JSON_UNESCAPED_UNICODE);'},
         {label:'POST tesztelése',lang:'bash',code:'curl -i -X POST http://localhost/api-gyakorlat/uj.php -H "Content-Type: application/json" -d "{\\\"cim\\\":\\\"Próba\\\"}"\ncurl -i -X POST http://localhost/api-gyakorlat/uj.php -H "Content-Type: application/json" -d "{}"'}],
        ['Küldj sikeres és hibás POST kérést.', 'Próbáld ki a végpontot GET metódussal is, és ellenőrizd a 405-ös választ.'],
        ['Melyik státuszkód jelzi itt a sikeres létrehozást?', ['200', '201', '404'], 1, 'A példa sikeres POST kérésre 201-et küld.']),
      L('xampp-4', 'MySQL és PDO helyi adatbázissal', 'Haladó', 24,
        'A XAMPP MySQL szolgáltatása tárolhatja a backend adatait. Az SQL-be a felhasználói értékeket paraméterekkel add át.',
        ['Indítsd el a MySQL-t a XAMPP vezérlőpultján.', 'A PDO DSN-ben a host, adatbázisnév és karakterkódolás szerepel.', 'Az előkészített utasítás paramétereket kezel.', 'A helyi alapbeállításokat éles üzem előtt cserélni és védeni kell.'],
        [{label:'Adatbázis létrehozása a helyi mysql klienssel',lang:'sql',code:'CREATE DATABASE gyakorlás CHARACTER SET utf8mb4;\nUSE gyakorlás;\nCREATE TABLE leckek (id INT AUTO_INCREMENT PRIMARY KEY, cim VARCHAR(200) NOT NULL);'},
         {label:'Helyi PDO példa',lang:'php',code:'<?php\n$db = new PDO("mysql:host=127.0.0.1;dbname=gyakorlás;charset=utf8mb4", "root", "", [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]);\n$utasitas = $db->prepare("INSERT INTO leckek (cim) VALUES (:cim)");\n$utasitas->execute(["cim" => "Próba lecke"]);\necho "Elmentve: " . $db->lastInsertId();'}],
        ['Indítsd el a MySQL-t, és futtasd az SQL utasításokat a phpMyAdmin SQL fülén.', 'Futtasd a PDO példát helyben, majd nézd meg a táblában az új sort.'],
        ['Miért használ a példa prepare és execute hívást?', ['A paraméterezett SQL miatt', 'A CSS betöltése miatt', 'A webszerver leállítására'], 0, 'A paraméterek elválasztják az adatot az SQL utasítástól.'])
    ]
  }]);
})();
