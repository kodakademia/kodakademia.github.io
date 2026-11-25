(() => {
  const ka = window.KA;
  ka.tracks.push({id:'java', title:'Java programozás', icon:'☕', tagline:'Az első konzolprogramtól a saját osztályig.',
    desc:'Futtatható példákkal dolgozod fel a változókat, döntéseket, gyűjteményeket és objektumokat.', courses:['java']});
  ka.courseTrack.java = 'java';
  function lesson(id,title,overview,concept,body,usage,exercise,quiz,extra='') {
    const code = 'public class Main {\n'+(extra ? extra+'\n\n' : '')+
      '    public static void main(String[] args) {\n'+body.split('\n').map(line=>'        '+line).join('\n')+'\n    }\n}';
    return ka.lesson('java-'+id,title,id<=3?'Kezdő':'Középhaladó',id<=3?10:15,overview,[concept],[{label:'Main.java',code,usage}],exercise,quiz);
  }
  ka.addCourses([{slug:'java',title:'Java – az első programtól az objektumokig',category:'Programozás',icon:'☕',
    description:'Építs eredményjelzőt egész számokkal, ciklussal, metódussal, listával és saját osztállyal.',
    prereqs:[],runtime:'java',setup:'A Kódjátszótér Java módjában cseréld le a teljes mintakódot, majd nyomd meg a Run gombot. Saját gépen JDK-val mentsd a fájlt Main.java néven, fordítsd a javac Main.java paranccsal, és indítsd a java Main paranccsal.',
    lessons:[
      lesson(1,'Első Java-program és konzolkimenet','Írd ki egy eredményjelző fejlécét két sorban.','A main a belépési pont. A println az üzenet után új sort kezd.',
        'System.out.println("Eredmények");\nSystem.out.println("Első forduló");',
        'Versenyprogram első futtatásakor a két egymás alatti felirat egyszerre ellenőrzi az indítást és a kiírás sorrendjét.',
        ['Cseréld a forduló nevét Döntő szóra.','Adj a végére egy harmadik sort egy játékos nevével.'],
        ['Melyik rész fut le induláskor?',['A fájlnév','A main metódus törzse','Az args név'],1,'A Java futtató a main metódusnak adja át a vezérlést.']),
      lesson(2,'Pontszám és egész osztás','Számítsd ki a két forduló átlagpontját úgy, hogy a fél pont is látszódjon.','Két int osztásakor az eredmény egész. Egy double osztóval a tört rész megmarad.',
        'int elso = 8;\nint masodik = 9;\ndouble atlag = (elso + masodik) / 2.0;\nSystem.out.println(atlag);',
        'Eredménytáblán a 8 és 9 átlaga 8.5. Ha 2-vel osztasz, a tört rész már az értékadás előtt elveszik.',
        ['Tippeld meg az eredményt 2 osztóval, majd futtasd le.','Állítsd vissza a 2.0-t, és próbálj két azonos pontszámot.'],
        ['Melyik adja a 8.5 értéket?',['17 / 2','17 / 2.0','8 + 9'],1,'A 2.0 lebegőpontos osztást eredményez.']),
      lesson(3,'Továbbjutás feltétellel','A döntőbe kerüléshez legalább tíz pont szükséges.','Az if és az else egymást kizáró ágak. A feltétel értéke boolean.',
        'int pont = 10;\nif (pont >= 10) {\n    System.out.println("Döntős");\n} else {\n    System.out.println("Selejtező");\n}',
        'Egy nevezési listán külön jelölheted a továbbjutókat. Pontosan tíz pontnál az egyenlőséget elfogadó feltétel dönti el a besorolást.',
        ['Próbáld ki 9, 10 és 11 ponttal.','Módosítsd a szabályt legalább tizenkét pontra.'],
        ['Melyik eredmény jut már tovább?', ['9','8','10'],2,'A 10 teljesíti a legalább tíz feltételt.']),
      lesson(4,'Tömb bejárása és összegzés','Számítsd ki három forduló összesített eredményét.','A bővített for a tömb elemeit sorban adja át a ciklusváltozónak.',
        'int[] fordulok = {8, 9, 10};\nint osszeg = 0;\nfor (int pont : fordulok) {\n    osszeg += pont;\n}\nSystem.out.println(osszeg);',
        'Ha új forduló kerül a tömbbe, a bejárás automatikusan eléri. Az eredeti részösszegek 8, 17 és 27.',
        ['Adj a tömbhöz egy 4 pontos fordulót. Ellenőrizd a 31-es összeget.','Üres tömbbel is futtasd le a példát.'],
        ['Mennyi lesz az összeg üres tömbnél?',['0','1','Hiba keletkezik'],0,'A ciklus egyszer sem fut, a kezdőérték marad meg.']),
      lesson(5,'Újrafelhasználható metódus','Külön metódusban jutalmazzuk a tízpontos fordulót.','A paraméter a hívásból kap értéket. A return eredménye a hívás helyén használható.',
        'System.out.println(jutalom(9));\nSystem.out.println(jutalom(10));',
        'Ha a kijelző és a jelentés ugyanazt a bónuszt használja, a szabály egyetlen helyen változtatható. A példa 9-et, majd 12-t ír ki.',
        ['Változtasd a bónuszt három pontra.','Nézd meg, kap-e bónuszt egy 11 pontos forduló.'],
        ['Mit ad jutalom(10) az eredeti kódban?',['10','2','12'],2,'A metódus a pontszám és a bónusz összegét adja vissza.'],
        '    static int jutalom(int pont) {\n        return pont >= 10 ? pont + 2 : pont;\n    }'),
      lesson(6,'Bővíthető nevezési lista','Gyűjtsd a nevezőket érkezési sorrendben.','Az ArrayList mérete az add hívásokkal nő. A get indexelése nullánál kezdődik.',
        'java.util.ArrayList<String> nevek = new java.util.ArrayList<>();\nnevek.add("Anna");\nnevek.add("Bori");\nSystem.out.println(nevek.get(0));\nSystem.out.println(nevek.size());',
        'Nevezéskor előre nem ismert a résztvevők száma. Az első helyen Anna marad, miközben a névsor két eleműre nő.',
        ['Adj hozzá harmadik nevet.','Írd ki az utolsó nevezőt a size() alapján számított indexszel.'],
        ['Mi az utolsó elem indexe három névnél?',['3','2','1'],1,'A három index 0, 1 és 2.']),
      lesson(7,'Saját osztály egy játékoshoz','Fogd össze az összetartozó nevet, pontszámot és pontszerzést.','A konstruktor új példányt készít elő. A példánymezők minden játékoshoz külön tartoznak.',
        'Jatekos anna = new Jatekos("Anna");\nJatekos bori = new Jatekos("Bori");\nanna.szerez(5);\nSystem.out.println(anna.nev + ": " + anna.pont);\nSystem.out.println(bori.nev + ": " + bori.pont);',
        'Eredménykövetéskor az Anna példányon végzett pontszerzés csak Anna eredményét növeli. Bori közben nulla ponton marad.',
        ['Adj Borinak két pontot.','Hívd meg Annán még egyszer a szerez metódust, és ellenőrizd az összeget.'],
        ['Mennyi Bori pontja az eredeti kód végén?',['0','5','10'],0,'A szerez hívás csak az anna példányt érinti.'],
        '    static class Jatekos {\n        final String nev;\n        int pont;\n        Jatekos(String nev) { this.nev = nev; }\n        void szerez(int mennyi) { pont += mennyi; }\n    }')
    ]}]);
})();
