(() => {
  const ka = window.KA;
  ka.tracks.push({id:'c', title:'C programozás', icon:'Ⓒ', tagline:'Az első kiírástól a mérések feldolgozásáig.',
    desc:'Rövid konzolprogramokon keresztül gyakorolhatod az adattípusokat, döntéseket, ciklusokat, tömböket és függvényeket.', courses:['c']});
  ka.courseTrack.c = 'c';
  function lesson(id,title,overview,concepts,code,usage,exercise,quiz) {
    return ka.lesson('c-'+id,title,id<5?'Kezdő':'Középhaladó',id<5?10:15,overview,concepts,
      [{label:'main.c',code:'#include <stdio.h>\n\n'+code,usage}],exercise,quiz);
  }
  ka.addCourses([{slug:'c', title:'C nyelv – az alapoktól', icon:'Ⓒ', category:'Programozás',
    description:'Írj és futtass hat rövid C-programot. A kurzus végére több mérésből is ki tudsz számítani egy eredményt.',
    prereqs:[], runtime:'c', setup:'A Kódjátszótérben válaszd a C (alapok) módot, másold be a teljes példát, majd kattints a Futtatás gombra.',
    lessons:[
      lesson(1,'Az első program és a kiírás','Egy teljes C-programmal kezdünk, amely egy sort ír a konzolra.',
        ['A stdio.h deklarálja a printf függvényt.','A main a program belépési pontja. A return 0 sikeres befejezést jelez.'],
        'int main() {\n    printf("Szia!\\n");\n    return 0;\n}',
        'Új projekt indításakor egyetlen kiírással ellenőrizheted, hogy a megfelelő fájlt futtatod. A konzolon a Szia! felirat jelenik meg, a sorvégejel pedig új sorba viszi a következő kiírást.',
        ['Írd át a köszöntést a saját nevedre.','Egy második printf hívással írd ki a következő sorba, hogy Indulhat!'],
        ['Hol kezdődik a példa végrehajtása?',['A printf végén','A main függvényben','A fejlécfájlban'],1,'A futtatókörnyezet a main függvényt hívja meg.']),
      lesson(2,'Egész számok és változók','Számítsd ki egy rendelés árát a darabszámból és az egységárból.',
        ['Az int egész szám tárolására szolgál.','A %d helyére a printf a hozzá tartozó int értéket írja.'],
        'int main() {\n    int darab = 3;\n    int ar = 250;\n    int osszeg = darab * ar;\n    printf("%d\\n", osszeg);\n    return 0;\n}',
        'Pénztárprogramban a darabszám és az egész forintban tárolt egységár külön változhat. A szorzás a két aktuális értékből adja a fizetendő összeget. Három darabnál itt a 750 jelenik meg, forintban értve.',
        ['Állítsd a darabszámot ötre, és ellenőrizd az 1250 Ft-os eredményt.','Mi lesz a kimenet, ha a darabszám nulla?'],
        ['Melyik kifejezés adja a rendelés összegét?',['darab + ar','darab / ar','darab * ar'],2,'Az egységárat minden megrendelt darab után egyszer számoljuk fel.']),
      lesson(3,'Döntés küszöbérték alapján','Egy mérés értéke dönti el, hogy meg kell-e jeleníteni egy figyelmeztetést.',
        ['Az if feltétele igaz vagy hamis lehet.','A >= az egyenlőséget is elfogadja. Az else a többi esetet kezeli.'],
        'int main() {\n    int fok = 30;\n    if (fok >= 30) {\n        printf("Meleg\\n");\n    } else {\n        printf("Rendben\\n");\n    }\n    return 0;\n}',
        'Hőmérő kijelzőjén a határértéket elérő méréshez külön üzenet tartozhat. A 30 már a Meleg ágat választja, a 29 még a Rendben ágat.',
        ['Próbáld ki 29, 30 és 31 értékkel.','Cseréld a >= jelet > jelre. Melyik próba eredménye változik meg?'],
        ['Melyik érték különbözteti meg a > 30 és a >= 30 feltételt?',['29','30','31'],1,'Pontosan 30 esetén csak a második feltétel igaz.']),
      lesson(4,'Ismétlés for ciklussal','Egyetlen kiírással sorszámozhatsz meg több fordulót.',
        ['A for fejlécében kezdőérték, folytatási feltétel és léptetés áll.','Az i++ minden kör végén eggyel növeli i értékét.'],
        'int main() {\n    for (int i = 1; i <= 3; i++) {\n        printf("%d.\\n", i);\n    }\n    return 0;\n}',
        'Egy játék három fordulójánál ugyanazt a kijelzést frissítheted más sorszámmal. Az első kiíráskor i értéke 1, az utolsónál 3. Amikor 4 lesz, a ciklus véget ér.',
        ['Írass ki öt fordulót.','Módosítsd a ciklust úgy, hogy 3-tól 1-ig számoljon vissza.'],
        ['Mikor ellenőrzi a for a folytatási feltételt?',['Minden kör előtt','Csak a végén','Csak az első kör előtt'],0,'A ciklustörzs csak akkor fut, ha az adott kör elején a feltétel igaz.']),
      lesson(5,'Mérések összegzése tömbben','Három mérési értéket tárolunk egy tömbben, és kiszámítjuk az összegüket.',
        ['A háromelemű tömb érvényes indexei 0, 1 és 2.','Az összegző változó induló értéke nulla.'],
        'int main() {\n    int meres[3] = {18, 21, 24};\n    int osszeg = 0;\n    for (int i = 0; i < 3; i++) {\n        osszeg += meres[i];\n    }\n    printf("%d\\n", osszeg);\n    return 0;\n}',
        'Napi mérések összesítésénél az index mutatja, melyik szám következik. A részösszeg először 18, majd 39, végül 63. Az i < 3 feltétel az utolsó érvényes elem után megállítja a bejárást.',
        ['Cseréld a 21-et 20-ra. Ellenőrizd, hogy az összeg 62.','Bővítsd négy elemre a tömböt, és igazítsd hozzá a ciklushatárt.'],
        ['Melyik az utolsó érvényes index három elemnél?',['3','1','2'],2,'A számozás nullával indul.']),
      lesson(6,'Saját függvény és visszatérési érték','Szervezd külön függvénybe két mérés nagyobbikának kiválasztását.',
        ['A paraméterek a híváskor kapnak értéket.','A return átadja az eredményt a hívónak, és befejezi a függvényt.'],
        'int nagyobb(int a, int b) {\n    if (a > b) {\n        return a;\n    }\n    return b;\n}\n\nint main() {\n    int csucs = nagyobb(18, 24);\n    printf("%d\\n", nagyobb(csucs, 21));\n    return 0;\n}',
        'Ha új mérés érkezik, az eddigi csúcsértéket elég összevetni az új számmal. Az első hívás 24-et ad vissza, a második ezt veti össze 21-gyel, így a kiírt csúcs továbbra is 24.',
        ['Próbáld ki 21 helyett 27-tel.','Használd a függvényt az előző lecke tömbjének bejárásakor. Az első elemből indulj.'],
        ['Mit kapsz a nagyobb(7, 7) hívásból?',['0-t','7-et','Hibát'],1,'Azonos értéknél a második return adja vissza b értékét, amely szintén 7.'])
    ]}]);
})();
