// Önálló műhelyfeladatok a meglévő kurzusok folytatásához.
(() => {
  const ka = window.KA;
  function add(slug, title, overview, concept, label, code, usage, task, question, options, answer, explanation) {
    ka.addLessons(slug, [ka.lesson(slug+'-muhely-20261125', title, 'Középhaladó', 15,
      overview, [concept], [{label, code, usage}], [task], [question, options, answer, explanation])]);
  }

  add('alapok', 'Határértékek próbája', 'Egy ingyenes szállítási szabályt a határ két oldalán is kipróbálunk.',
    'A >= az egyenlőséget is elfogadja.', 'Python',
    'for osszeg in [9999, 10000, 10001]:\n    dij = 0 if osszeg >= 10000 else 850\n    print(osszeg, dij)',
    'Pénztár készítésekor gyakori kérdés, hogy pontosan a határösszegnél jár-e a kedvezmény. A három próba megkülönbözteti a > és a >= viselkedését.',
    'Állítsd a határt 8000-re. Válassz hozzá három szomszédos próbaértéket, és ellenőrizd a 850, 0, 0 díjakat.',
    'Melyik összeg mutat eltérést > és >= között az eredeti példában?', ['9999','10000','10001'], 1, 'Pontosan 10000 egyenlő a határral.');
  add('html', 'Letölthető jegyzet hivatkozása', 'Készíts külön hivatkozást egy szöveges jegyzet megnyitásához és letöltéséhez.',
    'A download attribútum azonos eredetű fájlnál javasolt fájlnevet is megadhat.', 'index.html',
    '<a href="./jegyzet.txt">Jegyzet megnyitása</a>\n<a href="./jegyzet.txt" download="elso-lecke.txt">Jegyzet letöltése (.txt)</a>',
    'Tananyag mellékleténél a két feliratból már kattintás előtt kiderül a cél. Mindkét link ugyanarra a fájlra mutat.',
    'Helyi webszerveren tedd a HTML mellé a jegyzet.txt fájlt. Próbáld ki mindkét linket, és nézd meg a letöltött fájl nevét.',
    'Melyik adja meg a forrásfájlt?', ['href','download','A link szövege'], 0, 'A href a célcímet tartalmazza.');
  add('css', 'Olvasható sorhossz clamp segítségével', 'Keskeny és széles kijelzőn is alakíts ki kényelmes olvasófelületet.',
    'A clamp alsó határt, kívánt értéket és felső határt fogad.', 'CSS – a HTML mezőbe tegyél egy article elemet szöveggel',
    'article {\n  max-width: 65ch;\n  margin-inline: auto;\n  padding-inline: clamp(1rem, 4vw, 3rem);\n  line-height: 1.6;\n}',
    'Hosszú lecke szedésekor a maximális szélesség rövidebben tartja a sorokat, a belső margó pedig a képernyővel együtt változhat.',
    'Változtasd az előnézet szélességét. Próbáld ki a 35ch és 65ch felső korlátot ugyanazzal a bekezdéssel.',
    'Melyik szabály korlátozza itt a szövegterület szélességét?', ['line-height','margin-inline','max-width'], 2, 'A max-width felső határt szab.');
  add('javascript','Lekérdezési paraméterek összeállítása','Készíts keresőcímet ékezetes szavakkal és szóközzel.',
    'A URLSearchParams kezeli a paraméterek kódolását és visszaolvasását.','JavaScript',
    'const keres = new URLSearchParams({ q: "zöld tea", oldal: "2" });\nconsole.log("/kereses?" + keres.toString());\nconsole.log(keres.get("q"));',
    'Keresőmezőnél a szövegben & jel is lehet. A paraméterkezelő gondoskodik róla, hogy ez a keresőkifejezés része maradjon.',
    'Írd át a keresést erre: tea & méz. Ellenőrizd, hogy a get a teljes eredeti kifejezést adja.',
    'Melyik adja vissza egy paraméter értékét?', ['get','delete','has'],0,'A get név alapján olvas.');
  add('typescript','Kulcsbiztos mezőolvasó','Készíts olyan függvényt, amely csak egy ismert objektum létező mezőnevét fogadja.',
    'A keyof T a típus megengedett kulcsait írja le.','TypeScript',
    'function mezo<T, K extends keyof T>(adat: T, kulcs: K): T[K] {\n  return adat[kulcs];\n}\nconst lecke = { cim: "Tömbök", perc: 12 };\nconsole.log(mezo(lecke, "perc"));',
    'Táblázat építésekor ugyanazzal a függvénnyel olvasható a cím és a hossz. A fordító már futtatás előtt észreveszi az elírt mezőnevet.',
    'Olvasd ki a cim mezőt, majd írd a kulcsot percek alakban. Vizsgáld meg a típusellenőrző jelzését.',
    'Mi a perc mező eredménytípusa?', ['string','number','boolean'],1,'A T[K] az adott mező típusát őrzi meg.');
  add('jsx','Gombfelirat az összetevő tartalmából','Ugyanaz a gombkeret többféle feliratot vagy ikont fogadhat.',
    'A nyitó és záró komponenscímke közötti tartalom a children propba kerül.','App.jsx',
    'function Muvelet({ children }) {\n  return <button type="button">{children}</button>;\n}\nexport default function App() {\n  return <Muvelet><strong>Mentés</strong> most</Muvelet>;\n}',
    'Eszköztárban a felirat lehet összetett JSX is. A közös gomb gondoskodik a típusról, a hívó pedig eldönti, mi jelenjen meg rajta.',
    'Tegyél a gomb mellé egy második Muvelet példányt Előnézet felirattal. Fogd őket közös fragmentbe.',
    'Hová kerül a strong elem?', ['A children propba','A type attribútumba','Az oldal címébe'],0,'A komponens belső tartalma childrenként érkezik.');
  add('react','Szűrt lista külön állapot nélkül','Egy keresőmező minden gépeléskor leszűri a leckéket.',
    'Ha egy érték a meglévő adatokból kiszámítható, rendereléskor előállítható.','App.jsx',
    'import { useState } from "react";\nexport default function App() {\n  const [q, setQ] = useState("");\n  const talalat = ["Java", "JavaScript", "Python"].filter(n => n.toLowerCase().includes(q.toLowerCase()));\n  return <><label>Keresés <input value={q} onChange={e => setQ(e.target.value)} /></label><ul>{talalat.map(n => <li key={n}>{n}</li>)}</ul></>;\n}',
    'Élő keresésnél elég a begépelt szöveget tárolni. Ha törlöd a keresést, a teljes lista automatikusan visszatér.',
    'Keress a java szóra, majd ürítsd a mezőt. Adj visszajelzést arra az esetre is, ha nincs találat.',
    'Mit tárol az állapot?', ['A találatok számát','A listát és a másolatát','A keresőszöveget'],2,'A találatok a keresőszövegből és a listából következnek.');
  add('python','Tételek csoportosítása szótárba','Több rendelés tételeit vásárlónként gyűjtjük össze.',
    'A setdefault létrehozza a kezdőértéket, ha a kulcs még hiányzik.','Python',
    'kosarak = {}\nfor nev, tetel in [("Anna", "tea"), ("Bori", "víz"), ("Anna", "méz")]:\n    kosarak.setdefault(nev, []).append(tetel)\nprint(kosarak["Anna"])',
    'Rendelési exportnál egy név többször is előfordulhat. Az első tétel új listát kap, a második ugyanabba kerül.',
    'Adj hozzá Borinak még egy tételt. Írd ki mindkét kosár elemszámát.',
    'Mennyi tétel van eredetileg Anna kosarában?', ['1','2','3'],1,'Anna kétszer szerepel a bemenetben.');
  add('php','Listából felirat implode segítségével','Olvasható címkesort készítünk egy tömbből.',
    'Az implode az elemek közé teszi az elválasztót.','PHP',
    '<?php\n$cimkek = ["web", "adat", "alapok"];\necho implode(" · ", $cimkek);',
    'Cikk alatt a címkék egy sorban jelenhetnek meg. Az utolsó elem után már nem kerül elválasztó.',
    'Próbáld ki egyetlen címkével és üres tömbbel is. Üres tömb esetén írj ki külön feliratot.',
    'Hány elválasztó kerül három elem közé?', ['2','3','4'],0,'Három elem között két köz van.');
  add('csharp','Ismétlődések felismerése HashSet segítségével','Egy névsor feldolgozásakor észrevesszük a már látott neveket.',
    'Az Add logikai visszatérési értéke jelzi, hogy új elem került-e a halmazba.','Program.cs',
    'using System;\nusing System.Collections.Generic;\nvar latott = new HashSet<string>();\nforeach (var nev in new[] { "Anna", "Bori", "Anna" })\n    if (!latott.Add(nev)) Console.WriteLine(nev);',
    'Jelenléti ív importálásakor így jelezhető az ismételt bejegyzés a korábbi névsor újbóli bejárása nélkül.',
    'Tegyél a végére egy újabb Bori értéket. Ellenőrizd, milyen sorrendben jelennek meg az ismétlések.',
    'Mit ad az Add, ha az elem már megvan?', ['true','null','false'],2,'A halmaz ilyenkor változatlan marad.');
  add('console','Oszlopok igazítása konzolkimeneten','Készíts apró, olvasható eredménytáblát.',
    'Interpolált szövegben a pozitív mezőszélesség jobbra, a negatív balra igazít.','Program.cs',
    'using System;\nforeach (var sor in new[] { ("Anna", 8), ("Benedek", 12) })\n    Console.WriteLine($"{sor.Item1,-10} {sor.Item2,3}");',
    'Parancssori jelentésben az egyes helyi értékek egymás alá kerülnek, így az egy- és kétjegyű pontszámokat is könnyű összevetni.',
    'Adj hozzá egy háromjegyű pontszámot, majd változtasd meg a névoszlop szélességét.',
    'Mit jelent a -10 a név mellett?', ['Tíz sor','Balra igazított, legalább tíz karakter széles mező','Legfeljebb tíz karakter'],1,'A szélesség minimum, a negatív előjel balra igazít.');
  add('wpf','Közös méretezés Grid csillagos oszlopokkal','Oszd fel a rendelkezésre álló szélességet két panel között.',
    'Az 1* és 2* a fennmaradó helyet egy a kettőhöz arányban osztja fel.','MainWindow.xaml – a Window belseje',
    '<Grid>\n  <Grid.ColumnDefinitions><ColumnDefinition Width="*"/><ColumnDefinition Width="2*"/></Grid.ColumnDefinitions>\n  <TextBlock Text="Menü" Background="LightGray"/>\n  <TextBlock Grid.Column="1" Text="Lecke" Background="LightBlue"/>\n</Grid>',
    'Asztali olvasóprogramban az oldalsáv keskenyebb maradhat a tartalomnál az ablak átméretezésekor is.',
    'Futtasd Windowsos WPF-projektben. Változtasd 3*-ra a második oszlopot, és hasonlítsd össze az arányokat.',
    'Melyik oszlop szélesebb az eredeti példában?', ['Az első','Egyformák','A második'],2,'A második két részt kap a háromból.');
  add('security','Adattakarékos eseménynapló','Egy eseményből csak a működés megértéséhez kiválasztott mezőket másoljuk a naplóba.',
    'Az engedélyezett mezők felsorolása új mező érkezésekor is változatlan kimenetet ad.','Python – mintaadatok',
    'esemeny = {"muvelet": "mentes", "allapot": "ok", "jegyzet": "személyes szöveg"}\nnaplo = {k: esemeny[k] for k in ("muvelet", "allapot")}\nprint(naplo)',
    'Dokumentummentés hibakereséséhez elég lehet a művelet és a kimenetele. A jegyzet szövegét ilyenkor fölösleges naplózni.',
    'Adj hozzá egy email mezőt kitalált értékkel. Ellenőrizd, hogy a naplósor ugyanaz marad.',
    'Mi kerül a naplóba egy új bemeneti kulcs hozzáadásakor?', ['Az új érték automatikusan','Csak a kijelölt mezők','A teljes esemény'],1,'A kimenet kulcsait a felsorolás szabja meg.');
  add('terminal','Sorok összesítése csővezetékkel','A rövid listából gyakorisági jelentést készítünk.',
    'A uniq -c az egymás melletti azonos sorokat számolja, ezért a rendezés sorrendje számít.','Bash',
    "printf '%s\\n' tea viz tea | sort | uniq -c",
    'Egyszerű szöveglistán így megállapíthatod, melyik érték hányszor fordul elő, külön program írása nélkül.',
    'Tegyél egy új viz sort a bemenetre. Hagyd ki a sort parancsot is, és figyeld meg a különbséget.',
    'Melyik parancs hozza egymás mellé az azonos sorokat?', ['sort','printf','uniq -c'],0,'A rendezett sorozatban az azonos értékek szomszédosak.');
  add('nodejs','URL feldolgozása a szerveren','Válaszd külön a kérés útvonalát és lapozási paraméterét.',
    'A relatív kéréscímet a URL konstruktor egy alapcímmel tudja értelmezni.','server.js – futtatás: node server.js',
    'const ut = new URL("/api/leckek?oldal=2", "http://localhost");\nconsole.log(ut.pathname);\nconsole.log(ut.searchParams.get("oldal") ?? "1");',
    'Kéréskezelőben a pathname alapján választhatsz végpontot, miközben a lapozás külön értékként olvasható. A példa helyben értelmezi a címet.',
    'Távolítsd el a kérdőjeltől kezdődő részt. Ellenőrizd, hogy az útvonal változatlan, a kiírt oldal pedig 1.',
    'Milyen típusú a megadott oldal paraméter?', ['number','string','boolean'],1,'Az URL lekérdezési paraméterei szövegként érkeznek.');
  add('xampp','Kapcsolt táblák LEFT JOIN-nal','Listázd a szerzőket akkor is, ha még egy könyvük sincs.',
    'A LEFT JOIN a bal oldali tábla minden sorát megtartja. A COUNT(k.id) csak a kapcsolódó könyveket számolja.','SQL – a játszótér mintatábláival vagy ugyanezzel a sémával XAMPP-ban',
    'SELECT s.nev, COUNT(k.id) AS darab\nFROM szerzok AS s\nLEFT JOIN konyvek AS k ON k.szerzo_id = s.id\nGROUP BY s.id, s.nev\nORDER BY s.nev;',
    'Katalógus jelentésében a könyv nélküli szerző is fontos lehet. Nála a darabszám nulla lesz, és megmarad a listában.',
    "Futtasd az SQL-játszótérben. Adj hozzá egy szerzőt az INSERT INTO szerzok(nev) VALUES ('Teszt Elek'); paranccsal, és kérd le újra a listát.",
    'Miért a könyv id mezőjét számoljuk?', ['A nevek rendezése miatt','Mert minden sor könyvet jelöl','Mert hiányzó kapcsolatnál ez NULL'],2,'A COUNT(oszlop) kihagyja a NULL értéket.');
  add('python-web','Többértékű szűrő Flaskben','Egy kérésben több kiválasztott címke is szerepelhet.',
    'A getlist ugyanazon paraméternév összes előfordulását olvassa.','app.py – Flask telepítése után: flask --app app run',
    'from flask import Flask, request, jsonify\napp = Flask(__name__)\n\n@app.get("/szuro")\ndef szuro():\n    return jsonify(cimkek=request.args.getlist("cimke"))',
    'Jelölőnégyzetes keresőben a felhasználó több témát is kiválaszthat. A szerver sorrendben visszakapja a kiválasztott értékeket.',
    'Nyisd meg a /szuro?cimke=web&cimke=java címet, majd a /szuro címet. Hasonlítsd össze a két JSON-listát.',
    'Mi a lista hossza két cimke paraméternél?', ['2','1','0'],0,'Mindkét előfordulás saját listaelem lesz.');
  add('php-api','Üres találati lista JSON-ban','Szűrés után is őrizd meg a JSON-válasz lista alakját.',
    'Az array_filter megőrzi a kulcsokat. Az array_values újraindexeli az eredményt.','PHP',
    '<?php\n$nevek = ["Anna", "Bori", "Bence"];\n$talalat = array_filter($nevek, fn($n) => str_starts_with($n, "B"));\nheader("Content-Type: application/json");\necho json_encode(array_values($talalat));',
    'A kliens tömbre számít akkor is, ha az első rekord kiesik. Újraindexeléssel a találatok JSON-listaként érkeznek.',
    'PHP 8 vagy újabb verzióban cseréld B-t Z-re, és ellenőrizd a [] választ. Ezután próbáld ki újra B-vel.',
    'Melyik művelet indexeli újra a tömböt?', ['header','array_values','array_filter'],1,'Az array_values folytonos, nullától induló indexeket készít.');
  add('security-lab','Mentési jegyzék ellenőrzése','Hasonlíts össze két kitalált fájllistát, és keresd meg a mentésből hiányzó neveket.',
    'A halmazkülönbségben azok az elemek maradnak, amelyek csak az első halmazban szerepelnek.','Python – mintajegyzék',
    'elvart = {"lecke.txt", "kep.png", "kviz.json"}\nmentett = {"kviz.json", "lecke.txt"}\nprint(sorted(elvart - mentett))',
    'Visszaállítási próbán először ellenőrizheted a jegyzék teljességét. A fájl tartalmának épségéhez további ellenőrzés szükséges.',
    'Tedd bele a kep.png nevet is a mentett halmazba. Ellenőrizd, hogy az eredmény üres lista.',
    'Melyik fájl hiányzik az eredeti mentésből?', ['kviz.json','lecke.txt','kep.png'],2,'Csak a kep.png nincs benne a mentett halmazban.');
  add('c','Karakterlánc hossza ciklussal','Keresd meg a C-karakterlánc végét, és számold meg az előtte álló elemeket.',
    'A lezáró nulla karakter jelzi a sorozat végét.','main.c',
    '#include <stdio.h>\nint main() {\n    char s[] = "alma";\n    int i = 0;\n    while (s[i] != 0) {\n        i++;\n    }\n    printf("%d\\n", i);\n    return 0;\n}',
    'Egyszerű ASCII-azonosítónál így látható, hogyan különül el a hasznos szöveg a lezáró elemtől. Az alma négy bájtot ad a lezáró nulla előtt.',
    'Cseréld a szöveget üres karakterláncra, majd a barack szóra. A várt hossz 0 és 6.',
    'Beleszámít a lezáró nulla a kiírt hosszba?', ['Igen','Nem','Csak üres szövegnél'],1,'A ciklus még a növelés előtt megáll a lezáró nullánál.');
})();
