// Két önállóan kipróbálható gyakorlat minden tanulási ághoz.
(function () {
  const add = window.KA.bulk;

  add('html', [
    ['Feliratozott adat­táblázat', 'Egy menetrend akkor is érthető legyen, ha valaki cellánként olvassa. A táblázat címe megadja a témát, az oszlopfejlécek pedig megnevezik az egyes adatok jelentését.',
      'A caption közvetlenül a table elemen belül áll.|A th fejlécet jelöl. A scope="col" ugyanazon oszlop adatcelláihoz kapcsolja.',
      '<table>\n  <caption>Reggeli indulások</caption>\n  <tr><th scope="col">Járat</th><th scope="col">Indulás</th></tr>\n  <tr><td>12-es</td><td>7:15</td></tr>\n</table>',
      'Nyisd meg a példát a játszótérben, és adj hozzá egy 7:45-kor induló járatot.|Adj hozzá Úticél oszlopot. Mindkét járat célállomása a megfelelő fejléc alatt jelenjen meg.',
      'Melyik elem nevezi meg az egész táblázatot?', 'th|caption|td', 1, 'A caption a táblázat címe. A th egy sorhoz vagy oszlophoz tartozó fejléc.', 'Kezdő', 12],
    ['Lenyitható súgó JavaScript nélkül', 'Készíts gyakori kérdéseket tartalmazó súgót, amelyet billentyűzettel is ki lehet nyitni.',
      'A details a nyitható tartalom egésze.|A summary az összecsukott állapotban is látható felirat.|Az open attribútummal kezdetben nyitva jelenik meg a válasz.',
      '<details>\n  <summary>Hol találom a leckéket?</summary>\n  <p>Válassz tanulási ágat, majd kurzust.</p>\n</details>',
      'Adj hozzá második kérdést saját válasszal.|Tabbal lépj a második kérdésre, és nyisd meg Enterrel. Az első kérdés maradjon összecsukva.',
      'Hová kerül a mindig látható kérdés?', 'A summary elembe|A title attribútumba|A details utáni bekezdésbe', 0, 'A summary egyszerre felirat és a nyitást vezérlő elem.', 'Kezdő', 10]
  ], 'html-muhely');

  add('python', [
    ['Szavazatszámláló a Counter osztállyal', 'Egy szavazás minden sora egy voks. Számold össze az azonos válaszokat, és keresd ki a legnépszerűbbet.',
      'A Counter minden különböző kulcshoz darabszámot rendel.|A most_common(1) legfeljebb egy (kulcs, darabszám) párt ad vissza.',
      'from collections import Counter\n\nvoksok = ["kék", "zöld", "kék"]\neredmeny = Counter(voksok)\nprint(eredmeny.most_common(1))\nprint(eredmeny["piros"])',
      'Futtasd a példát. Az első sorban a kékhez 2 tartozik, a második sor értéke 0.|Adj hozzá két zöld voksot. Ellenőrizd, hogy most a zöld vezet 3 szavazattal.',
      'Mit ad itt a hiányzó piros kulcs lekérdezése?', 'None|Kivételt|0', 2, 'A Counter a még nem látott elemek darabszámát nullának veszi.', 'Kezdő', 14],
    ['Egymást követő mérések különbsége', 'Három hőmérsékletből két változás számítható. Párosíts minden mérést az azt követővel.',
      'Az értékek[1:] a második elemtől indul.|A zip addig készít párokat, amíg mindkét sorozatban van elem.',
      'meres = [18, 21, 19]\nvaltozas = [uj - regi for regi, uj in zip(meres, meres[1:])]\nprint(valtozas)  # [3, -2]',
      'Bővítsd a sorozatot egy 19-es méréssel. Az utolsó különbség legyen nulla.|Próbálj üres és egyelemű listát is. Mindkettőnél üres eredményt kell kapnod.',
      'Öt mérésből hány szomszédos pár készül?', '5|4|6', 1, 'Az utolsó mérés után már nincs következő elem.', 'Középhaladó', 15]
  ], 'python-muhely');

  add('php', [
    ['CSV-sor olvasása idézőjeles mezőkkel', 'Egy könyvcímben is szerepelhet a mezőelválasztó. Olvasd be úgy a sort, hogy a cím egyben maradjon.',
      'Az str_getcsv kezeli az idézőjeles mezőket.|A mezőelválasztót a fájl formátumához kell igazítani.',
      '<?php\n$sor = \'"Alma; körte";3\';\n[$cim, $darab] = str_getcsv($sor, ";", \'"\', "");\necho $cim . " (" . $darab . ")";',
      'Futtasd PHP-val. A várt felirat: Alma; körte (3).|Próbáld ki ugyanezt explode(";", $sor) használatával. Számold meg a mezőket, és magyarázd meg az eltérést.',
      'Miért adna itt három részt az explode?', 'Mert egész számmá alakít|Mert az idézőjelen belüli elválasztónál is vág|Mert figyelmen kívül hagyja az utolsó mezőt', 1, 'Az explode egyszerű szövegdarabolást végez, a CSV idézési szabályait nem értelmezi.', 'Középhaladó', 15],
    ['Határidő számítása változatlan kezdődátummal', 'Egy kölcsönzéshez őrizd meg az eredeti dátumot, és számíts külön visszaadási határidőt.',
      'A DateTimeImmutable új objektumot ad a módosítás eredményeként.|A format az eredményt szöveggé alakítja.',
      '<?php\n$kezdet = new DateTimeImmutable("2028-02-28");\n$hatarido = $kezdet->modify("+2 days");\necho $kezdet->format("Y-m-d") . PHP_EOL;\necho $hatarido->format("Y-m-d");',
      'Ellenőrizd, hogy a két kiírt dátum február 28. és március 1.|Cseréld az évet 2027-re. Miért március 2. ekkor a második dátum?',
      'Melyik változóban találod az új dátumot?', 'Mindkettőben|Csak a kezdetben|Csak a határidőben', 2, 'Az eredeti dátum változatlan, a modify visszatérési értékét külön tároljuk.', 'Kezdő', 12]
  ], 'php-muhely');

  add('security', [
    ['Mentés ellenőrzése próbavisszaállítással', 'Egy másolatot akkor tudsz használni, ha vissza is tudod állítani. Gyakorolj egy saját, külön erre létrehozott szövegfájllal.',
      'A visszaállítás célja üres tesztmappa legyen.|A tartalmi összehasonlítás kimutatja, ha a két példány különbözik.',
      'Eredeti: jegyzet.txt → tartalma: próba 42\nMentés: mentes/jegyzet.txt\nVisszaállítás célja: proba/jegyzet.txt',
      'Készítsd el a három példányt a megadott sorrendben. Nyisd meg a visszaállított fájlt.|Csak a visszaállított példányban cseréld a 42-t 43-ra. Hasonlítsd össze az eredetivel, és jegyezd fel, mit észleltél.',
      'Hová érdemes visszaállítani az első próba során?', 'Külön tesztmappába|Az egyetlen eredetire|A mentés helyére', 0, 'A külön célmappa megőrzi az eredetit és a mentést az összehasonlításhoz.', 'Kezdő', 15],
    ['Jogosultsági táblázat csapatmunkához', 'Egy háromfős csapat jegyzeteket ad ki. Tervezd meg, kinek kell olvasnia, szerkesztenie vagy publikálnia.',
      'A szerepkör feladatokhoz rendel jogokat.|A hozzáférést feladatváltáskor is felül kell vizsgálni.',
      'Szerep       Olvas   Szerkeszt   Publikál\nOlvasó       igen    nem         nem\nSzerző       igen    igen        nem\nKiadó        igen    nem         igen',
      'A táblázat alapján döntsd el, ki írhat át egy elgépelést és ki adhatja ki a javítást.|Egy szerző mostantól csak olvas. Sorold fel, melyik jogát kell megszüntetni, és melyik marad.',
      'Melyik műveletet végezheti a szerző ebben a példában?', 'Kiadás jóváhagyása|Jegyzet javítása|Mások jogainak módosítása', 1, 'A szerző szerkeszthet. A kiadáshoz külön szerepkör tartozik.', 'Kezdő', 12]
  ], 'vedelem-muhely');

  add('console', [
    ['Menüválasztás ellenőrzése TryParse-zal', 'Egy konzolos menü számot vár, de a felhasználó üres sort vagy betűt is beírhat. Ellenőrizd a formátumot és a megengedett tartományt külön.',
      'Az int.TryParse logikai értéke a beolvasás sikerét jelzi.|A sikeresen értelmezett szám is kívül eshet a menü tartományán.',
      'using System;\nConsole.Write("Válassz 1 és 3 között: ");\nif (int.TryParse(Console.ReadLine(), out int n) && n >= 1 && n <= 3)\n    Console.WriteLine($"Kiválasztva: {n}");\nelse\n    Console.WriteLine("Érvénytelen választás.");',
      'Futtasd külön az 1, 3, 4 és alma bemenetekkel. Csak az első kettő legyen érvényes.|Bővítsd a menüt négy elemre. A kérdés és a feltétel is tükrözze a változást.',
      'Miért kell tartományellenőrzés a TryParse után?', 'Mert a 4 is egész szám|Mert a TryParse csak betűt fogad el|Mert az 1 nem egész szám', 0, 'A számmá alakítás önmagában nem ismeri a menü méretét.', 'Kezdő', 14],
    ['Visszavonás veremmel', 'Egy szövegszerkesztőben mindig a legutóbbi állapotot szeretnéd visszakapni. Modellezd ezt egy konzolos programmal.',
      'A Stack utoljára betett eleme kerül ki elsőként.|Módosítás előtt az aktuális állapotot tedd el.|A TryPop üres veremnél false értéket ad.',
      'using System;\nusing System.Collections.Generic;\nvar elozo = new Stack<string>();\nstring szoveg = "alma";\nelozo.Push(szoveg);\nszoveg += "fa";\nif (elozo.TryPop(out var regi)) szoveg = regi;\nConsole.WriteLine(szoveg);',
      'Futtasd modern .NET konzolprojektben. A kiírt szöveg legyen alma.|Végezz két módosítást, mindegyik előtt ments állapotot. Kétszeri visszavonás után ellenőrizd az eredeti szöveget.',
      'Két mentés után melyik állapotot kapod vissza először?', 'A legrégebbit|Mindkettőt|A legutóbb mentettet', 2, 'A verem fordított sorrendben adja vissza az eltett állapotokat.', 'Középhaladó', 18]
  ], 'konzol-muhely');
})();
