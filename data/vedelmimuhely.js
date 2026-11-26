(() => {
  const ka = window.KA;
  // Kitalált leltárak. Az oktatási küszöbök az adott feladat szabályai.
  const projects = [
    ['Könyvtári katalógus','a kölcsönzések nyilvántartása','olvasójegy'],
    ['Iskolai napló','a beadott feladatok értékelése','érdemjegy'],
    ['Sportegyesület','a csapattagság követése','tagsági szám'],
    ['Konferencia','a jelentkezések kezelése','jelentkezési azonosító'],
    ['Szerviznapló','a javítási állapot követése','munkalapszám'],
    ['Időpontfoglaló','a szabad időpontok kiosztása','foglalási azonosító'],
    ['Webáruház','a kiszállítás követése','rendelésszám'],
    ['Kurzusportál','a tanulási haladás megőrzése','tanulói azonosító'],
    ['Ügyfélszolgálat','a kérdések megválaszolása','ügyszám'],
    ['Közösségi műhely','a kölcsönadott eszközök követése','kölcsönzési szám']
  ];
  const checks = [
    ['adatminimalizálás','mezok','A kivonat kizárólag a feladathoz kijelölt mezőket tartalmazhatja.', 'set(adat) <= {"azonosito", "allapot"}', ['azonosito','allapot'],['azonosito','allapot','szabad_szoveg'],'A többletmező tartalmát nem szükséges megismerni ahhoz, hogy a jelenlétét észrevegyük.'],
    ['mentés frissessége','kor_nap','A feladatban legfeljebb hét napos mentés fogadható el.','0 <= adat <= 7',7,8,'A határnap még elfogadható. A mentés kora önmagában nem igazolja a visszaállíthatóságát.'],
    ['visszaállítási próba','proba','A mentési jegyzőkönyvben sikeres visszaolvasásnak kell szerepelnie.','adat == "sikeres"', 'sikeres','nem_tesztelt','A mentés elkészítése és egy példány sikeres visszaolvasása két külön esemény.'],
    ['jogosultsági lista','szerepek','A gyakorló olvasói profil csak megtekintést enged.','set(adat) == {"olvas"}',['olvas'],['olvas','torol'],'Az olvasói nézet igazolásához a ténylegesen kiosztott jogokat hasonlítsd az elváráshoz.'],
    ['megőrzési idő','megorzes','E mintaprojekt szabályzata 1 és 30 nap közötti megőrzést ír elő.','1 <= adat <= 30',30,31,'A két határt külön is célszerű vizsgálni. Az itt szereplő számok a mintafeladat saját szabályai.'],
    ['naplózott mezők','naplomezo','A minta eseménynapló engedélyezett kulcsai a művelet és az eredmény.','set(adat) <= {"muvelet", "eredmeny"}',['muvelet','eredmeny'],['muvelet','uzenet_torzse'],'A kulcsok listájával ellenőrizhető a napló szerkezete személyes mintaszöveg kiírása nélkül.'],
    ['felelős kijelölése','felelos','A leltár minden tételéhez legyen megnevezett felelős csoport.','bool(adat.strip())','uzemeltetes','  ','A kizárólag szóközökből álló mező nem jelöl ki felelőst.'],
    ['jóváhagyott címzettek','cimzettek','A belső jelentést kizárólag a két jóváhagyott munkacsoport kaphatja meg.','set(adat) <= {"gazda", "ellenor"}',['gazda'],['gazda','kulso'],'A címzettlista összevetése a mintaszabállyal még a megosztás előtt elvégezhető.'],
    ['mentési jegyzék','fajlok','A próba mentési jegyzékében szerepeljen mind a két szükséges fájl.','{"adat.csv", "leiras.txt"} <= set(adat)',['adat.csv','leiras.txt'],['adat.csv'],'Egy hiányzó név már a jegyzékben látható. Az egyező név mellett a tartalmat is külön kell ellenőrizni.'],
    ['felülvizsgálati állapot','allapot','A minta kiadási kapuján csak ellenőrzött tétel haladhat át.','adat == "ellenorzott"','ellenorzott','folyamatban','A folyamatban lévő feladat és a befejezett felülvizsgálat eltérő döntéshez vezet.']
  ];
  for(const slug of ['security','security-lab']){
    const lab=slug==='security-lab', lessons=[];
    projects.forEach(([project,purpose,field],i)=>checks.forEach(([topic,key,rule,predicate,good,bad,why],j)=>{
      const first=(i+j)%2===0;
      const val=JSON.stringify(first?good:bad), other=JSON.stringify(first?bad:good);
      const name=project+' – '+topic;
      // A tételazonosító a jelentést a vizsgált nyilvántartáshoz köti.
      const sample=lab
        ? 'def megfelel(tetel):\n    adat = tetel['+JSON.stringify(key)+']\n    return '+predicate+'\n\nprobak = [('+JSON.stringify(good)+', True), ('+JSON.stringify(bad)+', False)]\nfor ertek, vart in probak:\n    tetel = {"nyilvantartas": '+JSON.stringify(project)+', "azonosito_tipusa": '+JSON.stringify(field)+', '+JSON.stringify(key)+': ertek}\n    assert megfelel(tetel) == vart, tetel["nyilvantartas"]\nprint("2 próba sikeres")'
        : 'leltar = {"rendszer": '+JSON.stringify(project)+', "'+key+'": '+val+'}\nadat = leltar["'+key+'"]\nprint("megfelel" if '+predicate+' else "felülvizsgálat")';
      const opts=lab?['Mindkét próba sikeres','Csak az első próba sikeres','Csak a második próba sikeres']:['megfelel','felülvizsgálat','hiányzó kulcs'];
      const correct=lab?opts[0]:opts[first?0:1];
      opts.push(...opts.splice(0,(i+j)%3));
      lessons.push(ka.lesson(slug+'-kontroll-'+(i+1)+'-'+(j+1),name,lab?'Középhaladó':'Kezdő',12,
        'A rendszer feladata '+purpose+'. A vizsgált nyilvántartás egyik adata: '+field+'. '+rule,
        [rule,why],[{label:'Python – kitalált leltáradatok',code:sample,usage:lab?'Változtatás után ugyanazt az elfogadási és elutasítási próbát megismételheted. '+why:'Leltárellenőrzéskor a '+key+' mező alapján eldöntheted, melyik tételt kell felülvizsgálni. '+why}],
        lab?['Futtasd a két állítást. Írd le, miért eltérő a két bemenet várt eredménye.','Cseréld fel csak a két várt logikai értéket. Figyeld meg, hol jelez az első assert, majd állítsd vissza az eredeti párt.']:
          ['Futtatás előtt azonosítsd, melyik mezőre vonatkozik a szabály. Jósolj kimenetet.','Cseréld a '+key+' mező értékét erre: '+other+'. Ellenőrizd az új döntést, és írd le az eltérés okát.'],
        [lab?'Mit mutat az eredeti teszt futtatása?':'Mi a kimenet az eredeti leltáradattal?',opts,opts.indexOf(correct),rule+' '+why]));
    }));ka.addLessons(slug,lessons);
  }
})();
