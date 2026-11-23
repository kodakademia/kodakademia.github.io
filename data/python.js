/* Python ág */
(function () {
  var L = window.KA.lesson, A = window.KA.addLessons, C = window.KA.addCourses;
  var V = 'kepek/venv.svg';

  A('python', [
    L('python-7', 'Sztringek és szövegfeldolgozás', 'Kezdő', 16,
      'A szöveg a leggyakoribb adattípus. A Python sok beépített műveletet ad, de a kódolásra (UTF-8) és a tisztításra is figyelni kell.',
      ['A split darabol, a join összefűz.', 'A strip eltávolítja a szélső whitespace-t.', 'Az f-string formáz: f"{ertek:.2f}".', 'A casefold kis- és nagybetűtől független összehasonlításhoz jó.'],
      [{ label: 'Szöveg', lang: 'python', code: 'nyers = "  Anna;Kiss;1990  "\nreszek = [r.strip() for r in nyers.strip().split(";")]\nprint(reszek)\nprint(" | ".join(reszek))\nprint(f"Születési év: {reszek[-1]}")' }],
      ['Darabolj egy CSV-sorot pontosvessző mentén.', 'Alakítsd a nevet nagy kezdőbetűssé title() segítségével.'],
      ['Melyik metódus távolítja el a szélső szóközöket?', ['split()', 'strip()', 'join()', 'upper()'], 1, 'A strip() a két végéről vágja le a whitespace-t.']),

    L('python-8', 'Haladó függvények és dekorátorok', 'Középhaladó', 18,
      'A függvény első osztályú érték: átadható, visszaadható. A dekorátor olyan függvény, amely egy másikat csomagol, például naplózáshoz.',
      ['A *args pozicionális, a **kwargs kulcsszavas argumentumokat gyűjt.', 'A lambda rövid névtelen függvény.', 'A dekorátor @jellel alkalmazható.', 'A functools.wraps megőrzi az eredeti nevet.'],
      [{ label: 'Dekorátor', lang: 'python', code: 'from functools import wraps\n\ndef naploz(func):\n    @wraps(func)\n    def wrapper(*args, **kwargs):\n        print("Hívás:", func.__name__)\n        return func(*args, **kwargs)\n    return wrapper\n\n@naploz\ndef osszead(a, b):\n    return a + b\n\nprint(osszead(2, 3))' }],
      ['Írj dekorátort, amely méri egy függvény futási idejét.', 'Írj lambda kifejezést egy lista rendezéséhez.'],
      ['Mit csinál egy dekorátor?', ['Törli a függvényt', 'Becsomagol egy másik függvényt', 'Típust ad', 'Fájlt nyit'], 1, 'A dekorátor a függvény köré plusz viselkedést tesz.']),

    L('python-9', 'Modulok, csomagok, virtuális környezet', 'Középhaladó', 18,
        'A függőségeket projektenként különítjük el. A virtuális környezet saját Python-értelmezőt és csomagokat ad, így a projektek nem zavarják egymást.',
        ['python -m venv .venv létrehozza a környezetet.', 'Aktiválás után a pip ide telepít.', 'pip freeze > requirements.txt rögzíti a csomagokat.', 'A .venv mappa nem kerül verziókezelőbe.'],
        [{ label: 'Környezet', lang: 'bash', code: 'python -m venv .venv\nsource .venv/bin/activate\npip install requests\npip freeze > requirements.txt' }],
        ['Készíts virtuális környezetet, és telepíts egy csomagot.', 'Mentsd a függőségeket requirements.txt-be.'],
        ['Hova telepít a pip aktivált virtuális környezetben?', ['A rendszer Pythonba', 'A .venv mappába', 'A böngészőbe', 'A Gitbe'], 1, 'Aktiválva a pip a virtuális környezetbe telepít.'],
        { figures: [{ src: V, alt: 'Python virtuális környezet', caption: 'A venv elkülöníti a projektcsomagokat.', w: 720, h: 260 }] }),

    L('python-10', 'Környezeti változók Pythonból', 'Középhaladó', 16,
        'A Pythonból az os.environ olvassa a környezeti változókat. Helyi fejlesztéshez a python-dotenv tölti be a .env fájlt.',
        ['pip install python-dotenv', 'load_dotenv() beolvassa a .env fájlt.', 'os.getenv("KULCS") adja az értéket vagy None-t.', 'Kötelező kulcsnál ellenőrizz és állj le hibával.'],
        [{ label: '.env használat', lang: 'python', code: 'import os\nfrom dotenv import load_dotenv\n\nload_dotenv()\n\napi_kulcs = os.getenv("API_KULCS")\nif not api_kulcs:\n    raise SystemExit("Hiányzó API_KULCS a .env fájlból")\n\nport = int(os.getenv("PORT", "8000"))\nprint("Port:", port)' }],
        ['Hozz létre .env fájlt PORT=8000 értékkel.', 'Olvasd be a portot, és adj neki alapértéket.'],
        ['Melyik függvény olvassa a környezeti változót?', ['os.getenv()', 'open()', 'input()', 'print()'], 0, 'Az os.getenv a környezetből olvas.']),

    L('python-11', 'JSON és CSV feldolgozás', 'Középhaladó', 18,
        'A valós adatok gyakran JSON-ban vagy CSV-ben érkeznek. A beépített json és csv modul elegendő a legtöbb feladathoz.',
        ['json.loads szövegből, json.load fájlból olvas.', 'A json.dump fájlba ír.', 'A csv.DictReader fejléces sorokat ad.', 'Mindig kezeld a sérült vagy hiányzó adatot.'],
        [{ label: 'JSON + CSV', lang: 'python', code: 'import csv, json\n\nwith open("adatok.json", encoding="utf-8") as f:\n    adatok = json.load(f)\n\nwith open("kimenet.csv", "w", newline="", encoding="utf-8") as f:\n    iro = csv.DictWriter(f, fieldnames=["nev", "kor"])\n    iro.writeheader()\n    iro.writerows(adatok)' }],
        ['Olvass be egy JSON-listát, és írd ki CSV-be.', 'Kezeld a hiányzó "kor" mezőt.'],
        ['Melyik függvény olvas JSON-t fájlból?', ['json.loads', 'json.load', 'json.dump', 'json.write'], 1, 'A json.load fájlból olvas.']),

    L('python-12', 'Objektumorientálás mélyebben', 'Haladó', 20,
        'Az osztály adatot és viselkedést kapcsol össze. Az öröklés és a kompozíció két eszköz újrafelhasználásra; a kompozíció gyakran egyszerűbb.',
        ['A __init__ inicializálja a példányt.', 'A @property számított tulajdonságot ad.', 'A __str__ olvasható szöveges megjelenítést ad.', 'Az isinstance típusellenőrzésre használható.'],
        [{ label: 'Osztály', lang: 'python', code: 'class Termek:\n    def __init__(self, nev, ar):\n        self.nev = nev\n        self.ar = ar\n\n    @property\n    def afas(self):\n        return round(self.ar * 1.27, 2)\n\n    def __str__(self):\n        return f"{self.nev} – {self.afas} Ft"\n\nprint(Termek("Tea", 450))' }],
        ['Készíts Kosar osztályt, amely termékeket ad össze.', 'Írj __str__ metódust a szép kiíráshoz.'],
        ['Mit ad a @property dekorátor?', ['Töröl egy mezőt', 'Számított, tulajdonságként használható értéket', 'Új osztályt', 'Fájlt nyit'], 1, 'A property metódus eredményét tulajdonságként érjük el.']),

    L('python-13', 'Hibakezelés és naplózás', 'Haladó', 18,
        'A kivételkezelés nem a hibák elrejtésére való, hanem a várt hibák kezelésére. A naplózás segít visszakövetni, mi történt éles üzemben.',
        ['A try/except a várt kivételt kapja el.', 'A finally mindenképpen lefut.', 'A raise új kivételt dob, esetleg láncolva.', 'A logging modul szintek szerint naplóz.'],
        [{ label: 'Naplózás', lang: 'python', code: 'import logging\n\nlogging.basicConfig(level=logging.INFO)\n\ndef oszt(a, b):\n    try:\n        return a / b\n    except ZeroDivisionError:\n        logging.warning("Nullával osztás")\n        return None\n\nprint(oszt(10, 0))' }],
        ['Készíts függvényt, amely hibát dob érvénytelen bemenetre.', 'Naplózd a hibát logging segítségével.'],
        ['Melyik blokk fut le mindenképpen?', ['except', 'else', 'finally', 'raise'], 2, 'A finally mindenképpen lefut.']),

    L('python-14', 'API-hívás requests-szel', 'Haladó', 18,
        'A requests csomag kényelmessé teszi a HTTP hívásokat. Az időkorlát és a státuszkód ellenőrzése elengedhetetlen.',
        ['requests.get(url, timeout=5)', 'response.raise_for_status() hibát dob rossz státuszra.', 'response.json() értelmezi a JSON választ.', 'Ne tárolj API-kulcsot a kódban.'],
        [{ label: 'API hívás', lang: 'python', code: 'import os, requests\n\nurl = "https://api.pelda.hu/adat"\nvalasz = requests.get(url, timeout=5,\n    headers={"Authorization": f"Bearer {os.environ.get(\'API_KULCS\')}"})\nvalasz.raise_for_status()\nprint(valasz.json())' }],
        ['Hívj meg egy nyilvános JSON API-t requests-szel.', 'Kezeld a timeout és a rossz státuszkód esetét.'],
        ['Mit csinál a raise_for_status()?', ['Lassítja a kérést', 'Hibát dob rossz HTTP státuszra', 'Törli a választ', 'Újraküldi a kérést'], 1, 'A rossz státuszkódot kivétellé alakítja.']),

    L('python-15', 'Tesztelés unittest és pytest', 'Haladó', 20,
        'A teszt rögzíti az elvárt viselkedést, és megvédi a kódot a későbbi módosításoktól. A pytest kevesebb kodolással ad olvasható teszteket.',
        ['pip install pytest', 'A test_ kezdetű fájlokat a pytest megtalálja.', 'Az assert egyszerű ellenőrzést ad.', 'Tesztelj hibás bemenetet és szélsőértéket is.'],
        [{ label: 'test_matek.py', lang: 'python', code: 'from matek import atlag\n\ndef test_atlag():\n    assert atlag([2, 4, 6]) == 4\n\ndef test_ures_lista():\n    import pytest\n    with pytest.raises(ValueError):\n        atlag([])' }],
        ['Írj tesztet az átlag függvényhez.', 'Futtasd: pytest -q.'],
        ['Hogyan futtatod a teszteket?', ['python test.py', 'pytest', 'npm test', 'flask run'], 1, 'A pytest parancs futtatja a teszteket.']),

    L('python-16', 'Projekt: tudásnapló', 'Haladó', 25,
        'A projekt a tanultakat kapcsolja össze: fájlmentés, hibakezelés, osztály, teszt és parancssori használat.',
        ['A CLI argumentumokat az sys.argv vagy az argparse adja.', 'Az adatot JSON fájlban tárolhatod.', 'A bemenetet ellenőrizd.', 'A projekt kapjon README-t és teszteket.'],
        [{ label: 'naplo.py', lang: 'python', code: 'import json, sys\nfrom pathlib import Path\n\nFAJL = Path("naplo.json")\n\ndef betolt():\n    return json.loads(FAJL.read_text(encoding="utf-8")) if FAJL.exists() else []\n\ndef ment(bejegyzesek):\n    FAJL.write_text(json.dumps(bejegyzesek, ensure_ascii=False, indent=2), encoding="utf-8")\n\nif len(sys.argv) > 1:\n    bejegyzesek = betolt()\n    bejegyzesek.append({"szoveg": " ".join(sys.argv[1:])})\n    ment(bejegyzesek)\n    print("Mentve:", len(bejegyzesek), "bejegyzés")' }],
        ['Írj tudásnaplót, amely parancssori szöveget ment.', 'Adj listázó műveletet is, és teszteld.'],
        ['Mit tárol a JSON fájl ebben a projektben?', ['Csak számokat', 'A naplóbejegyzéseket', 'A .env titkokat', 'A CSS-t'], 1, 'A bejegyzések listája kerül a JSON-ba.'])
  ]);

  C([{
    slug: 'python-web', title: 'Python web (Flask)', icon: '🌶️', category: 'Backend',
    description: 'Python webalkalmazás: útvonalak, sablonok, űrlap, .env, adatbázis és tesztelés.',
    prereqs: ['python'], runtime: 'local',
    setup: 'Python 3 telepítése után: python -m venv .venv, aktiválás, majd pip install flask python-dotenv.',
    lessons: [
      L('python-web-1', 'Flask indulás', 'Kezdő', 18,
        'A Flask kicsi keretrendszer, amely gyorsan ad működő webalkalmazást. Az útvonalakat dekorátor jelöli.',
        ['A Flask(__name__) létrehozza az appot.', 'A @app.route("/") útvonalat regisztrál.', 'A debug=True fejlesztés közben hasznos, éles üzemben soha.', 'A app.run() indítja a fejlesztői szervert.'],
        [{ label: 'app.py', lang: 'python', code: 'from flask import Flask\n\napp = Flask(__name__)\n\n@app.route("/")\ndef fooldal():\n    return "<h1>Szia, Flask!</h1>"\n\nif __name__ == "__main__":\n    app.run(debug=True)' }],
        ['Indíts Flask appot, és nyisd meg a 5000-es portot.', 'Adj hozzá egy /rolam útvonalat.'],
        ['Melyik dekorátor regisztrál egy útvonalat?', ['@app.get', '@app.route', '@app.path', '@app.url'], 1, 'A @app.route regisztrálja az útvonalat.']),

      L('python-web-2', 'Sablonok Jinja2-vel', 'Középhaladó', 20,
        'A HTML-t sablonfájlba tesszük. A Jinja2 változókat és ciklusokat is kezel, a kimenet automatikusan escape-elődik.',
        ['A render_template beadja a sablont.', 'A {{ valtozo }} értéket ír ki.', 'A {% for %} ismétlés, a {% if %} feltétel.', 'A sablon a templates mappában legyen.'],
        [{ label: 'app.py', lang: 'python', code: '@app.route("/leckek")\ndef leckek():\n    lista = [{"cim": "HTML"}, {"cim": "CSS"}]\n    return render_template("leckek.html", lista=lista)' },
         { label: 'templates/leckek.html', lang: 'html', code: '<h1>Leckék</h1>\n<ul>\n{% for l in lista %}\n  <li>{{ l.cim }}</li>\n{% endfor %}\n</ul>' }],
        ['Készíts sablont, amely listát jelenít meg.', 'Adj hozzá feltételt üres lista esetére.'],
        ['Hova kerülnek a sablonfájlok?', ['A templates mappába', 'A static mappába', 'A gyökérbe', 'A .venv mappába'], 0, 'A Flask a templates mappában keresi a sablonokat.']),

      L('python-web-3', 'Űrlap és POST adat', 'Középhaladó', 20,
        'Az űrlap adatait POST kérésben küldjük. A szerver ellenőrzi, majd feldolgozza; hibánál visszaadja az űrlapot hibaüzenettel.',
        ['A request.form a beküldött mezőket adja.', 'A method="post" kell a formon.', 'Szerveroldali ellenőrzés nélkül az adat nem megbízható.', 'Siker után irányíts át (redirect), hogy ne lehessen újraküldeni.'],
        [{ label: 'Űrlap kezelése', lang: 'python', code: 'from flask import request, redirect\n\n@app.route("/kapcsolat", methods=["GET", "POST"])\ndef kapcsolat():\n    if request.method == "POST":\n        nev = request.form.get("nev", "").strip()\n        if not nev:\n            return "A név kötelező", 400\n        return redirect("/koszonjuk")\n    return render_template("kapcsolat.html")' }],
        ['Készíts űrlapot név és e-mail mezővel.', 'Ellenőrizd a szerveren, hogy nem üres-e a név.'],
        ['Miért irányítunk át POST után?', ['Mert gyorsabb', 'Hogy ne lehessen újraküldeni az űrlapot', 'Mert kötelező', 'Hogy eltűnjön a hiba'], 1, 'A redirect megakadályozza az ismételt beküldést.']),

      L('python-web-4', 'Konfiguráció és .env', 'Középhaladó', 18,
        'A Flask beállításait környezeti változókból vesszük. Így a titok és a debug mód nem kerül a kódba.',
        ['load_dotenv() a .env fájlt tölti be.', 'app.config["SECRET_KEY"] a munkamenethez kell.', 'Éles környezetben a titkot a hoszting adja.', 'A .env maradjon ki a Gitből.'],
        [{ label: 'Konfiguráció', lang: 'python', code: 'import os\nfrom dotenv import load_dotenv\nload_dotenv()\n\napp.config["SECRET_KEY"] = os.environ["SECRET_KEY"]\napp.config["DEBUG"] = os.getenv("FLASK_DEBUG") == "1"' }],
        ['Hozz létre .env fájlt SECRET_KEY értékkel.', 'Indítsd az appot, és ellenőrizd, hogy a titok nem látszik a kódban.'],
        ['Hova kerül a SECRET_KEY éles üzemben?', ['A HTML-be', 'A szerver környezeti beállításaiba', 'A README-be', 'A CSS-be'], 1, 'A titkot a szerver környezeti változói között tároljuk.']),

      L('python-web-5', 'Adatbázis Flaskben', 'Haladó', 22,
        'Az SQLite fájlalapú adatbázis egyszerűen használható Flaskben. A paraméterezett lekérdezés fontos a biztonság miatt.',
        ['A sqlite3 a standard könyvtár része.', 'A row_factory nevesített oszlopokat ad.', 'A kapcsolatot kérés végén zárd le.', 'A paramétert ? jellel add át.'],
        [{ label: 'Lekérdezés', lang: 'python', code: 'import sqlite3\n\ndef db():\n    conn = sqlite3.connect("app.db")\n    conn.row_factory = sqlite3.Row\n    return conn\n\nconn = db()\nconn.execute("CREATE TABLE IF NOT EXISTS lecke (id INTEGER PRIMARY KEY, cim TEXT)")\nconn.execute("INSERT INTO lecke (cim) VALUES (?)", ("Első lecke",))\nconn.commit()\nfor sor in conn.execute("SELECT * FROM lecke"):\n    print(sor["cim"])' }],
        ['Készíts táblát és szúrj be egy rekordot.', 'Kérdezd le a rekordokat, és jelenítsd meg sablonban.'],
        ['Miért használunk ? paramétert az SQL-ben?', ['Gyorsabb', 'Véd az SQL-befecskendezés ellen', 'Rövidebb', 'Nem szükséges'], 1, 'A paraméterezés elválasztja az adatot az SQL kódtól.']),

      L('python-web-6', 'Projekt és tesztelés', 'Haladó', 24,
        'A Flask alkalmazás tesztelhető a beépített test_client segítségével. A projekt zárásaként legyen README, .env.example és pár teszt.',
        ['app.test_client() szimulál kérést.', 'A válasz status_code ellenőrizhető.', 'A teszt ne függjön külső szolgáltatástól.', 'A projekt indítása legyen egyértelmű a README-ben.'],
        [{ label: 'test_app.py', lang: 'python', code: 'from app import app\n\ndef test_fooldal():\n    with app.test_client() as kliens:\n        valasz = kliens.get("/")\n        assert valasz.status_code == 200' }],
        ['Írj tesztet a főoldalra és egy 404 útvonalra.', 'Futtasd: pytest -q.'],
        ['Melyik módszer szimulál kérést Flask tesztben?', ['app.run()', 'app.test_client()', 'requests.get()', 'flask test'], 1, 'A test_client kérést szimulál a tesztben.'])
    ]
  }]);
})();
