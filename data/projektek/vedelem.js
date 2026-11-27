(() => {
  // Az értékek és határok a helyi mintaprojekt elfogadási feltételei.
  const rules=`
Biztonsági mentés kora|kor_nap|7|8|0 <= x <= 7
Visszaállítási időkeret|perc|18|35|0 <= x <= 30
Mentési könyvtár teljessége|fajlok|["adat","schema"]|["adat"]|{"adat","schema"} <= set(x)
Kivonat összehasonlítása|visszaolvasott|"abc"|"abd"|hashlib.sha256(x.encode()).digest() == hashlib.sha256(b"abc").digest()
Elkülönített tároló igazolása|helyek|["helyi","offline"]|["helyi"]|"offline" in x
Generációk megőrzése|verziok|[1,2,3]|[2,2,3]|len(set(x)) >= 3
Titkosítási állapot leltára|allapot|"titkositott"|"ismeretlen"|x == "titkositott"
Mentés olvasási próbája|tartalom|{"id":4}|{}|isinstance(x.get("id"), int)
Archivált rekordok egyeztetése|rekordok|[1,2,3]|[1,2]|sorted(x) == [1,2,3]
Katasztrófaterv felelőse|felelos|"ügyelet"|"  "|bool(x.strip())
Olvasói profil jogai|jogok|["olvas"]|["olvas","ir"]|set(x) == {"olvas"}
Tulajdonosi egyezés|azonositok|[42,42]|[42,17]|x[0] == x[1]
Lejárt hozzáférés keresése|lejarat|"2026-12-01"|"2026-10-01"|date.fromisoformat(x) >= date(2026,11,1)
Vendégmegosztás határa|napok|3|32|1 <= x <= 7
Kettős jóváhagyás|szemelyek|["A","B"]|["A","A"]|len(set(x)) >= 2
Megszűnt fiók zárolása|fiok|{"aktiv":false,"zar":true}|{"aktiv":false,"zar":false}|x["aktiv"] or x["zar"]
Csoporttagság egyeztetése|csoportok|["szerzo","olvaso"]|["szerzo","admin"]|set(x) <= {"szerzo","olvaso"}
Ideiglenes szerep visszavonása|ido|[10,12]|[15,12]|x[0] <= x[1]
Szolgáltatásfiók interaktív belépése|interaktiv|false|true|x is False
Munkamenet inaktivitása|inaktiv_perc|5|25|0 <= x < 20
Kilépés utáni állapot|munkamenet|{}|{"user":1}|"user" not in x
Munkamenetsüti védelme|jelzok|["Secure","HttpOnly"]|["Secure"]|{"Secure","HttpOnly"} <= set(x)
Süti eredetkorlátozása|same_site|"Lax"|"ismeretlen"|x in {"Lax","Strict"}
Helyi átirányítás vizsgálata|ut|"/leckek"|"//masik.invalid"|x.startswith("/") and not x.startswith("//") and chr(92) not in x
Megosztott gép teendőlistája|kilepes|{"torolt":true,"kijelentkezett":true}|{"torolt":false,"kijelentkezett":true}|all(x.values())
Személyes mezők leválasztása|export|{"id":1,"pont":7}|{"id":1,"email":"proba"}|set(x) <= {"id","pont"}
Naplózási mezőlista|kulcsok|["muvelet","kod"]|["muvelet","jelszo"]|set(x) <= {"muvelet","kod"}
Hibajelentés adatszűrése|hiba|{"kod":"E01"}|{"kod":"E01","nyers_torzs":"minta"}|"nyers_torzs" not in x
Megőrzési szabály egyeztetése|retencio|[14,30]|[60,30]|0 < x[0] <= x[1]
Törlési kérelmek követése|kert_id|[3,6]|[3,7]|set(x).isdisjoint({1,4,7})
Tesztadatok elkülönítése|cim| "proba@example.invalid"| "proba@example.org"|x.endswith("@example.invalid")
Adatkategória címkézése|cimke|"belso"|"nincs"|x in {"nyilvanos","belso","bizalmas"}
Riport minimális csoportmérete|letszam|12|2|x >= 5
Címzettlista egyeztetése|cimzettek|["ellenor"]|["ellenor","vendeg"]|set(x) <= {"ellenor","gazda"}
Mezőszintű maszkolás próbája|utolso_negy|"****1234"|"55551234"|bool(re.fullmatch(r"[*]{4}[0-9]{4}",x))
Naplófájl méretkorlátja|meret|1024|9500|0 <= x <= 8192
Időbélyeg zónájának ellenőrzése|ido|"2026-11-01T10:00:00+00:00"|"2026-11-01T10:00:00"|datetime.fromisoformat(x).tzinfo is not None
Eseményazonosítók ütközése|esemeny_id|["a1","a2"]|["a1","a1"]|len(x) == len(set(x))
Naplósorok sorrendje|percek|[10,11,13]|[10,9,13]|x == sorted(x)
Ismételt figyelmeztetés összevonása|riasztas|["A","B"]|["A","A"]|all(a != b for a,b in zip(x,x[1:]))
Kötelező auditmezők|sor|{"ki":"A","mit":"ment","mikor":1}|{"mit":"ment"}|{"ki","mit","mikor"} <= set(x)
Válaszidőriasztás|meresek|[10,20,30]|[10,200,30]|max(x) <= 100
Ügyeleti visszajelzés|ido_par|[2,10]|[2,30]|0 <= x[1]-x[0] <= 15
Néma szolgáltatás jelzése|utolso_jel|98|72|0 <= 100-x <= 5
Hibaarány ellenőrzése|meres|[2,200]|[6,100]|x[1] > 0 and x[0]/x[1] <= 0.02
Bemeneti hosszkorlát|nev|"Anna"|""|1 <= len(x.strip()) <= 40
Darabszám típusellenőrzése|darab|3|3.5|type(x) is int and x >= 0
Kategória engedélylistája|muvelet|"olvas"|"kulso"|x in {"olvas","ment"}
Tizedes érték végessége|szam|"12.5"|"Infinity"|math.isfinite(float(x))
Dátumtartomány hitelesítése|idotartam|["2026-01-02","2026-03-04"]|["2026-04-01","2026-03-02"]|date.fromisoformat(x[0]) <= date.fromisoformat(x[1])
Üres mező felismerése|megjegyzes|"kész"|"   "|len(x.strip()) > 0
Lista felső korlátja|elemek|[1,2]|[1,2,3,4]|len(x) <= 3
Összeg és részletek egyezése|szamla|{"osszeg":8,"resz":[3,5]}|{"osszeg":9,"resz":[3,5]}|sum(x["resz"]) == x["osszeg"]
Kódolt kimenet próbája|szoveg|"Tea &amp; méz"|"Tea & méz"|html.escape(html.unescape(x)) == x
Ismeretlen mezők kiszűrése|urlap|{"nev":"Anna","kor":20}|{"nev":"Anna","jog":"admin"}|set(x) <= {"nev","kor"}
Állapotátmenet engedélyezése|atmenet|["uj","ellenorzott"]|["uj","lezart"]|tuple(x) in {("uj","ellenorzott"),("ellenorzott","lezart")}
Lapméret validálása|meret|25|0|1 <= x <= 50
Fájlnév engedélyezett alakja|fajl|"jegyzet-12.txt"|"jegyzet masolat"|bool(re.fullmatch(r"[a-z0-9-]+[.]txt",x))
Feltöltési kvóta|bajtok|[30,20,100]|[80,30,100]|x[0]+x[1] <= x[2]
Fájllista névütközése|nevek|["A.txt","B.txt"]|["A.txt","a.txt"]|len({s.casefold() for s in x}) == len(x)
Relatív archív útvonal|utvonal|"docs/a.txt"|"../a.txt"|not PurePosixPath(x).is_absolute() and ".." not in PurePosixPath(x).parts
Fájltípus fejlécének vizsgálata|fejlec|"89504e470d0a1a0a"|"00112233"|bytes.fromhex(x).startswith(bytes.fromhex("89504e470d0a1a0a"))
Üres melléklet jelzése|tartalom|"jegyzet"|""|len(x.encode()) > 0
Sorvégek egységesítése|sorok|"a\\nb"|"a\\r\\nb"|"\\r" not in x
Szövegkódolás ellenőrzése|hex_adat|"c3a1"|"ff"|bytes.fromhex(x).decode("utf-8",errors="replace").count(chr(65533)) == 0
Csak olvasható példány|jogok|"r--"|"rw-"|"w" not in x
Konfiguráció kötelező kulcsa|konfig|{"port":8000,"mod":"teszt"}|{"port":8000}|{"port","mod"} <= set(x)
Port tartományának próbája|port|8000|70000|1 <= x <= 65535
Helyi tesztszerver címe|cim|"127.0.0.1"|"0.0.0.0"|ipaddress.ip_address(x).is_loopback
Éles hibakeresés jelzője|beallitas|{"eles":true,"debug":false}|{"eles":true,"debug":true}|not (x["eles"] and x["debug"])
HTTPS címkéjű szolgáltatás|url|"https://example.invalid"|"http://example.invalid"|urlsplit(x).scheme == "https"
Engedélyezett webes eredet|origin|"https://iskola.invalid"|"https://vendeg.invalid"|x in {"https://iskola.invalid"}
Gyorsítótár bizalmas oldalon|cache|"private, no-store"|"public"|"no-store" in [s.strip() for s in x.split(",")]
Tartalomtípus egyezése|mime|"application/json; charset=utf-8"|"text/html"|x.split(";")[0].strip() == "application/json"
Keretezési beállítás|frame|"DENY"|"ALLOW"|x in {"DENY","SAMEORIGIN"}
Kiadási verzió alakja|verzio|"2.1.4"|"legujabb"|bool(re.fullmatch(r"[0-9]+[.][0-9]+[.][0-9]+",x))
Függőségleltár rögzítése|verziok|{"modul":"1.2.3"}|{"modul":"*"}|all(re.fullmatch(r"[0-9]+[.][0-9]+[.][0-9]+",v) for v in x.values())
Kiadási jegyzék teljessége|kiadas|["forras","teszt","jegyzet"]|["forras","jegyzet"]|{"forras","teszt","jegyzet"} <= set(x)
Visszaállási pont kiválasztása|elozo|{"verzio":"2.0","tesztelt":true}|{"verzio":"2.0","tesztelt":false}|bool(x["verzio"]) and x["tesztelt"]
Módosítás-jóváhagyás|valtozas|{"szerzo":"A","ellenor":"B"}|{"szerzo":"A","ellenor":"A"}|x["szerzo"] != x["ellenor"]
Tanúsítvány lejárati emlékeztető|hatralevo|40|8|x >= 14
Adatgazda leltára|tetel|{"gazda":"iskola","cel":"oktatas"}|{"gazda":"","cel":"oktatas"}|all(v.strip() for v in x.values())
Nyitott javítási határidők|napok|[2,7,0]|[2,-1,7]|all(n >= 0 for n in x)
Incidensbesorolás|suly|"kozepes"|"?"|x in {"alacsony","kozepes","magas"}
Próbavizsgálat hatóköre|cel|"teszt-A"|"eles-B"|x in {"teszt-A","teszt-B"}
Engedély időablaka|ido|[9,12,17]|[9,18,17]|x[0] <= x[1] < x[2]
Jelentés szakaszainak vizsgálata|reszek|["hatas","javitas","ellenorzes"]|["hatas"]|{"hatas","javitas","ellenorzes"} <= set(x)
Feladat lezárási feltétele|feladat|{"javitva":true,"ellenorizve":true}|{"javitva":true,"ellenorizve":false}|x["javitva"] and x["ellenorizve"]
Kockázati prioritás|kockazat|[2,2]|[5,4]|x[0]*x[1] <= 9
Gyakorlat lezárási jegyzéke|zaras|["mentes","naplo","visszaallitas"]|["naplo","mentes"]|{"mentes","naplo","visszaallitas"} <= set(x)
`.trim().split('\n').map(s=>s.split('|'));
  if(rules.length!==90)throw Error('Védelmi tanterv: '+rules.length);
  window.KA.vedelmiProjekt=(slug,p,i,lesson)=>{
    const [title,key,good,bad,predicate]=rules[i],lab=slug==='security-lab';
    const imports=['import json',...Object.entries({'hashlib':'import hashlib','date.':'from datetime import date','datetime.':'from datetime import datetime','re.':'import re','html.':'import html','math.':'import math','PurePosixPath':'from pathlib import PurePosixPath','ipaddress':'import ipaddress','urlsplit':'from urllib.parse import urlsplit'}).filter(([s])=>predicate.includes(s)).map(x=>x[1])].join('\n');
    const goal=lab?'Készíts ismételhető elfogadási és elutasítási próbát. A vizsgált mező: '+key+'.':'Döntsd el a mintajegyzék minden tételéről, hogy teljesíti-e a helyi szabályt. Vizsgált mező: '+key+'.';
    const code=imports+'\n\ndef megfelel(x):\n    return '+predicate+'\n\n'+(lab?'import unittest\n\nclass Proba(unittest.TestCase):\n    def test_elfogadott(self):\n        self.assertTrue(megfelel(json.loads('+JSON.stringify(good.trim())+')))\n\n    def test_elutasitott(self):\n        self.assertFalse(megfelel(json.loads('+JSON.stringify(bad.trim())+')))\n\nif __name__ == "__main__":\n    unittest.main()':'mintak = json.loads('+JSON.stringify('['+good+','+bad+']')+')\nfor sorszam, ertek in enumerate(mintak, 1):\n    print(sorszam, "megfelel" if megfelel(ertek) else "felülvizsgálat")');
    return lesson(slug+'-program-'+(i+1),lab?title+' próbapadja':title,goal,window.KA.programs.py(code),'Vizsgáld meg külön a második mintát: '+bad+'. A döntési feltétel: '+predicate+'.','felülvizsgálat','megfelel');
  };
})();
