/* Bővítő leckék a webes és asztali ághoz */
(function () {
  var L = window.KA.lesson, A = window.KA.addLessons;
  var H = 'kepek/http.svg', T = 'kepek/terminal.svg', E = 'kepek/env.svg';

  A('alapok', [
    L('alapok-7', 'Mappaszerkezet és projektindítás', 'Kezdő', 14,
      'Egy projekt első perceiben érdemes rendet tenni: mappa, README, .gitignore. Ez később sok fejfájást megspórol.',
      ['Minden projekt kapjon saját mappát.', 'A README írja le az indítást.', 'A .gitignore kizárja a függőségeket és a titkokat.', 'A fájlnevek legyenek beszédesek.'],
      [{ label: 'Első struktúra', lang: 'bash', code: 'mkdir sajat-projekt\ncd sajat-projekt\ngit init\nprintf "node_modules/\\n.env\\n" > .gitignore\necho "# Saját projekt" > README.md' }],
      ['Hozz létre egy projektmappát README-vel és .gitignore-ral.', 'Írd le a README-ben, hogyan indítható a projekt.'],
      ['Miért kell .gitignore?', ['A fájlok színezéséhez', 'Hogy a felesleges és titkos fájlok ne kerüljenek a repóba', 'A CSS-hez', 'Az internethez'], 1, 'A .gitignore kizárja a nem kívánt fájlokat.'])
  ]);

  A('html', [
    L('html-7', 'Táblázatok helyesen', 'Középhaladó', 15,
      'A táblázat táblázatos adatra való, nem elrendezésre. A fejléc és a felirat hozzáférhetőbbé teszi.',
      ['A thead, tbody és tfoot tagolja a táblázatot.', 'A th scope attribútuma segíti a képernyőolvasót.', 'A caption a táblázat címe.', 'Elrendezésre a CSS Grid a helyes eszköz.'],
      [{ label: 'Táblázat', lang: 'html', code: '<table>\n  <caption>Havi pontok</caption>\n  <thead><tr><th scope="col">Hét</th><th scope="col">Pont</th></tr></thead>\n  <tbody><tr><td>1.</td><td>12</td></tr></tbody>\n</table>' }],
      ['Készíts táblázatot három sorból álló adattal.', 'Adj hozzá caption-t és scope-ot.'],
      ['Mire való a caption?', ['Képaláírás', 'A táblázat címe', 'Egy gomb', 'Egy hivatkozás'], 1, 'A caption a táblázat címe.']),

    L('html-8', 'Szemantikus űrlapok és hibák', 'Középhaladó', 16,
      'A hozzáférhető űrlapnál minden mezőnek van címkéje, és a hibát szöveggel is jelezzük, nem csak színnel.',
      ['A label for-ja a mező id-jára mutat.', 'Az aria-describedby hibaüzenethez kapcsol.', 'A required és a pattern segít, de szerveroldali ellenőrzés is kell.', 'A hibát érthető szöveggel írd le.'],
      [{ label: 'Hibás mező', lang: 'html', code: '<label for="email">E-mail</label>\n<input id="email" name="email" type="email" aria-describedby="email-hiba" aria-invalid="true">\n<p id="email-hiba" class="hiba">Adj meg érvényes e-mail-címet.</p>' }],
      ['Készíts űrlapot hibaüzenettel és aria kapcsolattal.', 'Teszteld billentyűzettel.'],
      ['Miért nem elég a piros szín a hiba jelzésére?', ['Mert lassú', 'Mert színtévesztők nem érzékelik', 'Mert nem szép', 'Mert nem működik'], 1, 'A hiba szöveges jelzése mindenki számára érthető.']),

    L('html-9', 'Képek, teljesítmény, betöltés', 'Középhaladó', 14,
      'A nagy képek lassítják az oldalt. A helyes méret, a modern formátum és a lazy loading sokat javít.',
      ['Adj meg width és height értéket a képnek.', 'A loading="lazy" késlelteti a képernyőn kívüli képeket.', 'A WebP/AVIF kisebb, mint a PNG/JPG.', 'A srcset különböző méreteket ad.'],
      [{ label: 'Optimalizált kép', lang: 'html', code: '<img src="kepek/hero.webp" alt="Tanuló diák a laptop előtt"\n     width="1200" height="600" loading="lazy" decoding="async">' }],
      ['Cseréld le egy nagy képedet kisebbre, és mérd meg a betöltést.', 'Adj hozzá lazy loadingot.'],
      ['Mit tesz a loading="lazy"?', ['Azonnal betölt', 'Csak akkor tölti be, ha látható lesz', 'Törli a képet', 'Nagyít'], 1, 'A lazy csak szükség esetén tölti be a képet.'])
  ]);

  A('css', [
    L('css-7', 'Sötét és világos téma', 'Középhaladó', 16,
      'A témaváltás CSS-változókkal egyszerű. A felhasználó rendszerbeállítását a prefers-color-scheme veszi figyelembe.',
      ['A :root változói globálisak.', 'A data-theme attribútummal válthatunk témát.', 'A prefers-color-scheme a rendszerbeállítást követi.', 'A kontraszt mindkét témában legyen megfelelő.'],
      [{ label: 'Téma', lang: 'css', code: ':root { --bg:#fff; --text:#111; }\n[data-theme="dark"] { --bg:#0b1020; --text:#eff4ff; }\nbody { background: var(--bg); color: var(--text); }\n@media (prefers-color-scheme: dark) {\n  :root:not([data-theme]) { --bg:#0b1020; --text:#eff4ff; }\n}' }],
      ['Készíts világos és sötét palettát.', 'Válts témát egy gombbal a data-theme attribútummal.'],
      ['Melyik változó hat globálisan?', ['A :root-ban deklarált', 'A body-ban deklarált', 'Az inline stílus', 'A HTML attribútum'], 0, 'A :root változói az egész dokumentumra érvényesek.']),

    L('css-8', 'Animáció és mozgáscsökkentés', 'Középhaladó', 15,
      'Az animáció visszajelzést adhat, de zavaró is lehet. A prefers-reduced-motion tiszteletben tartása alapkövetelmény.',
      ['A transition egyszerű állapotváltozás.', 'A @keyframes összetett animációt ad.', 'A transform és opacity a legjobban animálható.', 'A prefers-reduced-motion: reduce kapcsolja ki a fölösleges mozgást.'],
      [{ label: 'Finom animáció', lang: 'css', code: '.gomb { transition: transform .15s ease; }\n.gomb:hover { transform: translateY(-2px); }\n@media (prefers-reduced-motion: reduce) {\n  .gomb { transition: none; }\n}' }],
      ['Adj a gombnak finom hover animációt.', 'Kapcsold ki a mozgást reduced-motion esetén.'],
      ['Melyik tulajdonság animálható a legsimábban?', ['width', 'transform', 'margin', 'font-size'], 1, 'A transform és opacity animálása a leghatékonyabb.']),

    L('css-9', 'Modern elrendezés és konténerlekérdezés', 'Haladó', 18,
      'A konténerlekérdezés a szülő méretéhez igazít, nem a képernyőhöz. Ez komponensalapú elrendezést tesz lehetővé.',
      ['A container-type: inline-size bekapcsolja.', 'A @container a szülő méretére reagál.', 'A clamp() rugalmas mérethatárokat ad.', 'A logikai tulajdonságok (padding-inline) jobban nemzetköziesíthetők.'],
      [{ label: 'Konténer', lang: 'css', code: '.kartya { container-type: inline-size; }\n@container (min-width: 400px) {\n  .kartya h2 { font-size: clamp(1.2rem, 3cqi, 2rem); }\n}' }],
      ['Tegyél egy kártyát konténerbe, és váltsd a méretét.', 'Használj clamp()-et egy cím méretéhez.'],
      ['Mihez igazodik a @container?', ['A képernyőhöz', 'A szülő konténer méretéhez', 'A betűtípushoz', 'Az internet sebességéhez'], 1, 'A konténerlekérdezés a szülő méretét figyeli.'])
  ]);

  A('react', [
    L('react-7', 'Context és globális állapot', 'Haladó', 18,
      'A Context elkerüli a sok props továbbadást. Kis alkalmazásnál elég lehet; nagyobbhoz állapotkezelő könyvtár jöhet.',
      ['createContext létrehozza a kontextust.', 'A Provider értéket ad a fában.', 'A useContext kiolvassa.', 'A kontextust ne használd mindenre.'],
      [{ label: 'Téma context', lang: 'jsx', code: 'const Tema = createContext("vilagos");\n\nfunction App() {\n  return <Tema.Provider value="sotet"><Fejlec /></Tema.Provider>;\n}\n\nfunction Fejlec() {\n  const tema = useContext(Tema);\n  return <header className={tema}>Fejléc</header>;\n}' }],
      ['Készíts témaváltó contextet.', 'Olvasd ki egy mélyebb komponensben.'],
      ['Mire való a Context?', ['Hálózati kérésre', 'Props továbbadás elkerülésére', 'CSS írására', 'Adatbázisra'], 1, 'A Context megosztja az értéket a komponensfában.']),

    L('react-8', 'Űrlapkezelés és validáció', 'Haladó', 18,
      'A React űrlapnál a mezőérték állapotban van. A validációt a beküldés előtt és közben is végezhetjük.',
      ['A hibát mezőnként tárold.', 'A beküldést akadályozd meg hiba esetén.', 'Az aria-invalid és aria-describedby segít.', 'A szerveroldali ellenőrzést ne hagyd ki.'],
      [{ label: 'Validáció', lang: 'jsx', code: 'const [hiba, setHiba] = useState({});\n\nfunction bekuld(e) {\n  e.preventDefault();\n  const uj = {};\n  if (!email.includes("@")) uj.email = "Érvénytelen e-mail";\n  setHiba(uj);\n  if (Object.keys(uj).length === 0) mentes();\n}' }],
      ['Készíts űrlapot két mezővel és hibaüzenettel.', 'Akadályozd meg az üres beküldést.'],
      ['Hogyan jelzed a hibát a képernyőolvasónak?', ['Csak piros színnel', 'aria-invalid és szöveges hibaüzenet', 'Rejtett div-vel', 'Semhogy'], 1, 'Az aria attribútumok és a szöveg együtt hozzáférhetők.'])
  ]);

  A('typescript', [
    L('typescript-7', 'Típusok a gyakorlatban', 'Középhaladó', 16,
      'A típusok akkor hasznosak, ha a valós adatmodellt írják le. Túl bonyolult típusok nehezítik a karbantartást.',
      ['Kezdd a valós adatokkal.', 'A Partial és Pick segít a részleges típusokban.', 'A Record kulcs–érték térképet ad.', 'A típusnevek legyenek beszédesek.'],
      [{ label: 'Adatmodell', lang: 'ts', code: 'type Lecke = { id: number; cim: string; kesz?: boolean };\ntype LeckeFrissites = Partial<Pick<Lecke, "cim" | "kesz">>;\n\nfunction frissit(l: Lecke, valtozas: LeckeFrissites): Lecke {\n  return { ...l, ...valtozas };\n}' }],
      ['Definiálj Termek típust és egy frissítő függvényt.', 'Használj Partial-t a részleges módosításhoz.'],
      ['Mit ad a Partial<T>?', ['Az összes mezőt kötelezővé teszi', 'Minden mezőt opcionálissá tesz', 'Törli a típust', 'Számot ad'], 1, 'A Partial minden mezőt opcionálissá alakít.'])
  ]);

  A('csharp', [
    L('csharp-7', 'LINQ alapok', 'Középhaladó', 18,
      'A LINQ gyűjtemények lekérdezését teszi olvashatóvá. A Where, Select és OrderBy a leggyakoribb művelet.',
      ['A Where szűr, a Select átalakít.', 'Az OrderBy rendez.', 'A ToList végrehajtja a lekérdezést.', 'A LINQ lusta kiértékelésű, amíg nem iterálsz.'],
      [{ label: 'LINQ', lang: 'csharp', code: 'var szamok = new[] { 5, 2, 8, 1 };\nvar paros = szamok.Where(n => n % 2 == 0).OrderBy(n => n).ToList();\nConsole.WriteLine(string.Join(", ", paros));' }],
      ['Szűrd a páros számokat és rendezd növekvő sorrendbe.', 'Alakítsd a számokat szöveggé Select-tel.'],
      ['Melyik LINQ metódus szűr?', ['Select', 'Where', 'OrderBy', 'ToList'], 1, 'A Where feltétel alapján szűr.']),

    L('csharp-8', 'Kivételkezelés és fájlok', 'Középhaladó', 16,
      'A C# kivételkezelése try/catch blokkal működik. Fájloknál a using biztosítja az erőforrás lezárását.',
      ['A try/catch a várt hibát kapja el.', 'A using automatikusan lezárja az erőforrást.', 'A File.ReadAllText egyszerű olvasás.', 'Ne kapj el minden kivételt válogatás nélkül.'],
      [{ label: 'Fájl', lang: 'csharp', code: 'try\n{\n    string tartalom = File.ReadAllText("adatok.txt");\n    Console.WriteLine(tartalom);\n}\ncatch (IOException e)\n{\n    Console.WriteLine("Hiba: " + e.Message);\n}' }],
      ['Olvass be egy szövegfájlt, és kezeld a hiányzó fájl hibáját.', 'Írj vissza egy fájlba using segítségével.'],
      ['Mit biztosít a using?', ['Gyorsabb kódot', 'Az erőforrás automatikus lezárását', 'Új szálat', 'Típust'], 1, 'A using a blokk végén lezárja az erőforrást.'])
  ]);

  A('wpf', [
    L('wpf-7', 'Adatkötés (Binding)', 'Középhaladó', 18,
      'A WPF-ben az adatkötés a felületet és az adatot kapcsolja össze. A felület így automatikusan frissül, ha az adat változik.',
      ['A Binding az XAML-ben jelöli a kötést.', 'Az INotifyPropertyChanged értesíti a felületet.', 'A DataContext adja az adatforrást.', 'A Mode=TwoWay kétirányú kötést ad.'],
      [{ label: 'Binding', lang: 'xml', code: '<TextBox Text="{Binding Nev, UpdateSourceTrigger=PropertyChanged}" />\n<TextBlock Text="{Binding Nev}" />' }],
      ['Köss egy TextBoxot és egy TextBlockot ugyanahhoz a tulajdonsághoz.', 'Figyeld meg az azonnali frissülést.'],
      ['Mit tesz az INotifyPropertyChanged?', ['Töröl adatot', 'Értesíti a felületet a változásról', 'Új ablakot nyit', 'Színt vált'], 1, 'A felület így automatikusan frissül.']),

    L('wpf-8', 'Lista és parancsok', 'Haladó', 18,
      'A listás felületet ListBox vagy DataGrid adja, a gombokat ICommand kötheti össze a logikával.',
      ['Az ObservableCollection értesíti a listát a változásról.', 'Az ICommand parancsot köt a gombhoz.', 'Az ItemsSource adja a lista adatforrását.', 'A MVVM szétválasztja a felületet és a logikát.'],
      [{ label: 'Lista', lang: 'xml', code: '<ListBox ItemsSource="{Binding Feladatok}">\n  <ListBox.ItemTemplate>\n    <DataTemplate>\n      <TextBlock Text="{Binding Cim}" />\n    </DataTemplate>\n  </ListBox.ItemTemplate>\n</ListBox>' }],
      ['Készíts ObservableCollection alapú listát.', 'Köss egy törlés gombot parancshoz.'],
      ['Melyik gyűjtemény értesíti a listát a változásról?', ['List<T>', 'ObservableCollection<T>', 'Array', 'Dictionary'], 1, 'Az ObservableCollection értesítést küld a felületnek.'])
  ]);
})();
