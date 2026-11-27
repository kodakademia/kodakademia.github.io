(() => {
  const P=window.KA.programs, L=P.legacy;
  const cleanBash=s=>P.bash('mappa=$(mktemp -d)\ntrap \'rm -rf -- "$mappa"\' EXIT\ncd "$mappa"\n'+s);
  const git='git init -q\ngit config user.name Tanulo\ngit config user.email tanulo@example.invalid\necho "# Próba" > README.md\ngit add README.md\ngit commit -qm "Első változat"\ngit log --oneline';
  L.terminal=l=>cleanBash(({
    'terminal-2':'mkdir projekt\ncd projekt\npwd\ncd ..\nls',
    'terminal-4':'printf "# Napló\\n" > README.md\nprintf "PORT=8000\\n" > app.conf\ncat README.md\nhead -n 1 app.conf',
    'terminal-5':'printf \'print("Fut a program")\\n\' > app.py\npython3 app.py\necho "$?"',
    'terminal-6':'printf "PORT=3000\\n" > .env\ngrep "^PORT=" .env | cut -d= -f2',
    'terminal-7':git,'terminal-8':'for eszkoz in bash git node; do command -v "$eszkoz" || echo "Hiányzik: $eszkoz"; done',
    'terminal-b-1':'mkdir -p projekt/src\ncd projekt\nkiindulas=$PWD\ncd ./src\npwd\ncd "$kiindulas"\npwd',
    'terminal-b-2':'mkdir src\necho TODO > src/app.js\nfind . -name "*.js"\ngrep -rn TODO src',
    'terminal-b-3':'printf \'#!/bin/sh\\necho Kész\\n\' > proba\nchmod +x proba\n./proba',
    'terminal-b-4':'printf "Anna\\nAnna\\nBori\\n" | sort | uniq -c > lista.txt\ncat lista.txt',
    'terminal-b-5':'npm init -y\nnpm pkg set description="Helyi mintaprojekt"\nnpm pkg get description',
    'terminal-b-6':'export PORT=8080\nprintenv PORT\nPORT=9000 bash -c \'echo "$PORT"\'\necho "$PORT"',
    'terminal-b-7':'printf "Host gyakorlat\\n  HostName localhost\\n  User tanulo\\n" > ssh.conf\nssh -G -F ssh.conf gyakorlat | grep -E "^(hostname|user) "',
    'terminal-b-8':'(echo elkeszult > naplo.txt) &\npid=$!\nwait "$pid"\ncat naplo.txt'
  })[l.id]||l.code);
  L.alapok=l=>{
    if(['alapok-5','alapok-b-8'].includes(l.id))return cleanBash(git+(l.id.endsWith('8')?'\ngit checkout -qb kiserlet\ngit branch --show-current':''));
    if(['alapok-7','alapok-3'].includes(l.id))return cleanBash(l.id==='alapok-3'?'pwd\nmkdir gyakorlas\ncd gyakorlas\npwd':l.code);
    if(l.id==='alapok-4')return P.one('server.py','from http.server import BaseHTTPRequestHandler, HTTPServer\nclass Oldal(BaseHTTPRequestHandler):\n    def do_GET(self):\n        self.send_response(200)\n        self.send_header("Content-Type","text/plain; charset=utf-8")\n        self.end_headers()\n        self.wfile.write("Kész".encode())\nHTTPServer(("127.0.0.1",8000), Oldal).serve_forever()','python server.py • http://127.0.0.1:8000');
    return P.py(({'alapok-2':'from pathlib import Path\nfor p in map(Path, ["index.html","app.js","kepek/logo.png"]):\n    print(p.parent, p.stem, p.suffix)',
      'alapok-b-1':'import os, sys\nadatok = list(range(1000))\nprint("Logikai processzorok:", os.cpu_count())\nprint("A lista mérete bájtban:", sys.getsizeof(adatok))',
      'alapok-b-2':'from pathlib import Path\np = Path.cwd() / "src" / "app.js"\nprint(p, p.name, p.parent, sep="\\n")',
      'alapok-b-3':'n = int(input("Egész szám: "))\nprint("Negatív bemenet" if n < 0 else n*n)',
      'alapok-b-7':'ertek = 12\nprint("Előtte:", ertek)\nertek *= 3\nprint("Utána:", ertek)\nassert ertek == 36',
      'alapok-b-9':'lepesek = ["adatmodell", "betöltés", "listázás", "szűrés", "mentés"]\nfor i, lepes in enumerate(lepesek, 1):\n    print(f"{i}. [ ] {lepes}")',
      'alapok-b-10':'from pathlib import Path\nf = Path("README-minta.md")\nf.write_text("# Napló\\n\\n## Indítás\\npython main.py\\n", encoding="utf-8")\nprint(f.read_text(encoding="utf-8"))'
    })[l.id]||l.code);
  };
  L.python=l=>{
    const p=P.py(l.code);
    if(['python-9','py-b-1','py-b-19'].includes(l.id)){p.files['main.py']='import sys\nfrom importlib.metadata import version\nprint(sys.executable)\nprint("Requests:",version("requests"))';p.files['requirements.txt']='requests>=2.32,<3';p.run='python -m venv .venv • Aktiváld a környezetet, majd python -m pip install -r requirements.txt és python main.py.'}
    if(l.id==='python-10'){p.files['.env']='API_KULCS=helyi-proba';p.run='python -m pip install python-dotenv • python main.py'}
    if(l.id==='python-11')p.files['adatok.json']='[{"nev":"Anna","kor":21}]';
    if(l.id==='python-14'){p.files['adat.json']='{"pont":42}';p.files['main.py']='import requests\nr = requests.get("http://127.0.0.1:8000/adat.json", timeout=3)\nr.raise_for_status()\nprint(r.json())';p.run='python -m pip install requests • Indítsd el: python -m http.server 8000 --bind 127.0.0.1 • Második terminál: python main.py'}
    if(l.id==='python-15'){p.files['matek.py']='def atlag(szamok):\n    if not szamok: raise ValueError("Üres lista")\n    return sum(szamok)/len(szamok)';p.run='python -m pip install pytest • python -m pytest main.py'}
    if(['python-16','py-b-22'].includes(l.id))p.run='python main.py "Első jegyzet"';
    if(l.id==='py-b-8')p.files['main.py']+='\nprint(atlag([4, 6]))\n';
    if(l.id==='py-b-9')p.files['main.py']+='\nnovel()\nprint(szamlalo)\n';
    if(l.id==='py-b-15')p.files['main.py']+='\ns = Szamla()\ns.befizet(300)\nprint(s.egyenleg)\n';
    return p;
  };
  const db='<?php\n$db = new PDO("sqlite::memory:");\n$db->exec("CREATE TABLE leckek (id INTEGER PRIMARY KEY, cim TEXT, szint TEXT)");\n$q = $db->prepare("INSERT INTO leckek(cim,szint) VALUES (?,?)");\n$q->execute(["Tömbök","Kezdő"]);\n$q = $db->prepare("SELECT cim FROM leckek WHERE szint=?");\n$q->execute(["Kezdő"]);\necho json_encode($q->fetchAll(PDO::FETCH_COLUMN), JSON_UNESCAPED_UNICODE);';
  const form='<?php\n$nev = trim($_POST["nev"] ?? "");\n?><form method="post"><label>Név <input name="nev" required></label><button>Küldés</button></form>\n<?php if ($_SERVER["REQUEST_METHOD"] === "POST") echo $nev === "" ? "Hiányzó név" : "Szia, " . htmlspecialchars($nev, ENT_QUOTES, "UTF-8");';
  L.php=l=>{
    if(['php-3','php-12','php-b-7'].includes(l.id))return P.php(form);
    if(['php-14','php-b-15'].includes(l.id))return {...P.php(db),run:'PHP 8 és pdo_sqlite • php index.php'};
    if(['php-15','php-b-18'].includes(l.id))return P.php('<?php\nsession_start();\n$_SESSION["lista"] ??= [];\nif ($_SERVER["REQUEST_METHOD"] === "POST") {\n    $cim=trim($_POST["cim"] ?? "");\n    if ($cim !== "") $_SESSION["lista"][]=$cim;\n    if (isset($_POST["torol"])) unset($_SESSION["lista"][(int)$_POST["torol"]]);\n    header("Location: /"); exit;\n}\n?><form method="post"><input name="cim" required><button>Új jegyzet</button></form>\n<?php foreach ($_SESSION["lista"] as $id=>$cim): ?><form method="post"><?=htmlspecialchars($cim)?><button name="torol" value="<?=$id?>">Törlés</button></form><?php endforeach; ?>');
    if(l.id==='php-b-9')return P.php('<?php\nif (isset($_FILES["jegyzet"]) && $_FILES["jegyzet"]["error"] === UPLOAD_ERR_OK) {\n    echo "Fogadott bájtok: ", filesize($_FILES["jegyzet"]["tmp_name"]);\n}\n?><form method="post" enctype="multipart/form-data"><input type="file" name="jegyzet" required><button>Méretezés</button></form>');
    if(l.id==='php-11')return {files:{'.env':'APP_ENV=helyi','index.php':'<?php\n$cfg=parse_ini_file(__DIR__."/.env");\necho $cfg["APP_ENV"];'},run:'Helyi parancssorban: php index.php'};
    if(['php-6','php-b-14'].includes(l.id))return {files:{'composer.json':'{"autoload":{"files":["udvozlet.php"]}}','udvozlet.php':'<?php function udvozlet(): string { return "Szia!"; }','index.php':'<?php require __DIR__."/vendor/autoload.php"; echo udvozlet();'},run:'Composer és PHP • composer install, majd php index.php'};
    if(!l.code.startsWith('<?php'))return P.php('<?php echo "PHP fut: " . PHP_VERSION;');
    if(l.id==='php-b-13')return P.php(l.code+'\necho (new Termek())::class;');
    if(l.id==='php-10')return {...P.php(l.code),files:{'index.php':l.code,'adatok.json':'["Tea","Víz"]'}};
    return P.php(l.code);
  };
  const sqlSetup="CREATE TEMPORARY TABLE szerzok(id INT PRIMARY KEY, nev VARCHAR(60));\nCREATE TEMPORARY TABLE konyvek(id INT PRIMARY KEY, szerzo_id INT, cim VARCHAR(80));\nINSERT INTO szerzok VALUES(1,'Anna'),(2,'Bori');\nINSERT INTO konyvek VALUES(1,1,'Kód');\n";
  L.xampp=l=>{
    if(l.id.endsWith('20261125'))return P.one('jelentes.sql',sqlSetup+l.code,'XAMPP / MariaDB • Válassz gyakorló-adatbázist a phpMyAdminban, küldd el egyben a teljes SQL fájlt.');
    if(l.id==='xampp-4'){const p=P.php(l.snippets[1].code);p.files['adatbazis.sql']=l.code;p.run='XAMPP • Indítsd az Apache és MySQL szolgáltatást. Importáld az adatbazis.sql fájlt, majd az index.php kapcsolati adatait igazítsd a saját helyi felhasználódhoz. Helyezd az index.php-t a htdocs/pelda alá és nyisd meg a localhost/pelda címet.';return p}
    const p=P.php(l.code);if(l.id==='xampp-3')p.run+=' • Próbakérés: curl -H "Content-Type: application/json" -d \'{"cim":"Java"}\' http://127.0.0.1:8000/';return p;
  };
})();
