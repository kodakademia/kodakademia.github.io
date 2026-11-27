// Cím | gyakorlati feladat | bemenet (név=érték) | kifejezés | egység | ellenőrző eset (első mező, eredmény).
window.KA.projektSorok = `
Bevásárlókosár végösszege|A pénztár két külön tétel mennyiségéből és árából készít nyugtát.|tea_db=3,tea_ar=450,viz_db=2,viz_ar=200|tea_db*tea_ar+viz_db*viz_ar|Ft|0,400
Közös számla felosztása|Az éttermi számlát borravalóval együtt egyenlően osztjuk fel a vendégek között.|szamla=12000,borravalo=1200,vendegek=4|(szamla+borravalo)/vendegek|Ft/fő|6800,2000
Tankolási napló|A megtett út és a tankolás alapján hasonlíts össze autókat száz kilométerre vetítve.|liter=24,km=400|liter*100/km|l/100 km|32,8
Érkezési idő tervezése|A sofőr az indulási időből, menetidőből és pihenőből számolja ki az érkezés percét aznap.|ora=8,perc=15,ut=95,piheno=10|ora*60+perc+ut+piheno|perc éjféltől|9,660
Festékrendelés|Egy fal két rétegéhez rendelj egész literes kiszerelést a festék kiadóssága alapján.|terulet=38,reteg=2,kiadossag=10|ceil(terulet*reteg/kiadossag)|liter|50,10
Csempecsomagok száma|A burkoló a tartalékot is beleszámolja, majd egész dobozokra kerekít.|felulet=20,tartalek=10,doboz=2|ceil(felulet*(100+tartalek)/(100*doboz))|doboz|10,6
Kerítésanyag kimérése|A téglalap alakú telek kerületéből vond le a kapu helyét.|hossz=24,szeles=12,kapu=4|2*(hossz+szeles)-kapu|méter|14,48
Esővízgyűjtő becslése|Számítsd ki, hány liter csapadék gyűjthető össze a tetőről adott gyűjtési hatásfokkal.|teto=80,eso_mm=12,hatasfok=75|teto*eso_mm*hatasfok/100|liter|40,360
Öntöző időkapcsoló|Az ágyás vízigényét váltsd át egész percben beállítható öntözési időre.|agyas=12,igeny=4,hozam=8|ceil(agyas*igeny/hozam)|perc|5,3
Recept átméretezése|A recept eredeti adagjához mérd ki a vendégekhez szükséges lisztet.|liszt=360,alap_adag=4,uj_adag=6|liszt*uj_adag/alap_adag|gramm|200,300
Tésztakeverék hidratáltsága|A pék a hozzáadott víz tömegét a liszt százalékában követi.|viz=350,liszt=500|100*viz/liszt|százalék|400,80
Italhígító|Határozd meg, mennyi vizet adj a koncentrátumhoz a kívánt tömegszázalék eléréséhez.|alap=200,eredeti=60,cel=20|alap*eredeti/cel-alap|gramm víz|100,200
Árucímke egységárral|Eltérő kiszerelésű termékeket a kilogrammonkénti ár alapján lehet összevetni.|ar=720,tomeg=400|ar*1000/tomeg|Ft/kg|360,900
Kuponos pénztár|A százalékos kedvezményt a kosárra alkalmazd, utána add hozzá a szállítást.|kosar=8000,kupon=15,posta=600|kosar*(100-kupon)/100+posta|Ft|4000,4000
Betétdíj-elszámoló|A kasszában az új és a visszahozott palackok különbözete módosítja a végösszeget.|termek=1200,uj_db=5,vissza_db=3,dij=50|termek+(uj_db-vissza_db)*dij|Ft|500,600
Készlet-utánrendelés|A célkészlethez számolj rendelést úgy, hogy a már úton lévő árut is figyelembe veszed.|cel=80,raktar=27,uton=15|max(0,cel-raktar-uton)|darab|30,0
Raklapok megtervezése|Dobozokból egész raklapokat indítasz. A részben töltött utolsó raklap is helyet foglal.|dobozok=73,sor=6,reteg=4|ceil(dobozok/(sor*reteg))|raklap|72,3
Szabad raktárhely|A polcok teljes befogadóképességéből vond le az aktuális foglalást.|polc=8,hely=12,foglalt=65|polc*hely-foglalt|hely|10,55
Selejtezési arány|A minőségellenőrzési jelentésben a hibás darabok arányát mutasd meg.|hibas=7,osszes=350|100*hibas/osszes|százalék|14,4
Műszak elszámolása|Éjfél előtti, aznap befejezett műszakból vond le a fizetetlen szünetet.|vege=1020,kezdet=510,szunet=30|vege-kezdet-szunet|fizetett perc|900,360
Heti túlóra|Csak a keret feletti órák kerüljenek a túlórák közé.|ledolgozott=46,keret=40|max(0,ledolgozott-keret)|óra|36,0
Rendezvény beléptetője|A korábbi belépők és kilépők alapján állapítsd meg, hány embert engedhetsz még be.|ferohely=120,belepett=98,kilepett=13|max(0,ferohely-belepett+kilepett)|szabad hely|100,15
Színházi kihasználtság|A lezárt székeket vedd ki az eladható helyekből a terem kihasználtságának számításakor.|nezok=150,szekek=220,lezart=20|100*nezok/(szekek-lezart)|százalék|100,50
Jegybevételi jelentés|A teljes árú és a kedvezményes jegyeket külön egységáron összesítsd.|teljes=25,ar=2000,diak=16,diakar=1200|teljes*ar+diak*diakar|Ft|0,19200
Bérlet vagy napijegy|Egy időszakra add vissza az olcsóbb közlekedési lehetőség költségét.|napok=16,napijegy=900,berlet=12000|min(napok*napijegy,berlet)|Ft|5,4500
Parkolási automata|Az ingyenes idő után minden megkezdett negyedóráért számolj díjat.|perc=61,ingyen=15,negyedora=150|ceil(max(0,perc-ingyen)/15)*negyedora|Ft|15,0
Postai súlysáv|A csomag alapdíjához minden megkezdett további kilogramm után felár jár.|tomeg=2.4,alap=900,felar=300|alap+ceil(max(0,tomeg-1))*felar|Ft|1,900
Biciklitúra szintemelkedése|Két szakasz közül csak az emelkedések számítanak az összes szintnyereségbe.|start=100,kozep=160,cel=130|max(0,kozep-start)+max(0,cel-kozep)|méter|180,0
Futótempó napló|A mért időt váltsd kilométerenkénti másodpercre a futások összehasonlításához.|ido_perc=25,tav=5|ido_perc*60/tav|mp/km|30,360
Váltóverseny időmérő|A csapat ideje a részidőkből és a váltásért kapott büntetésekből áll össze.|elso=65,masodik=72,harmadik=70,buntetes=3|elso+masodik+harmadik+buntetes|másodperc|55,200
Liga ponttáblázata|A győzelmeket és döntetleneket eltérő súllyal számolják el.|gyozelem=8,iksz=3|3*gyozelem+iksz|pont|0,3
Párharc összesítése|Az oda-visszavágó gólkülönbségét a két csapat összesített góljából kapod.|elso=2,ellen1=1,masodik=0,ellen2=2|elso+masodik-ellen1-ellen2|gólkülönbség|4,1
Kieséses torna párosítója|Számold meg, hány teljes pár indulhat az első fordulóban.|nevezok=15|floor(nevezok/2)|mérkőzés|20,10
Olvasási ütemterv|Oszd el a hátralévő oldalakat a rendelkezésre álló napokra, egész napi céllal.|oldalak=280,olvasott=95,nap=10|ceil(max(0,oldalak-olvasott)/nap)|oldal/nap|95,0
Tanulási ciklus időzítője|A munkaszakaszok közé szünetet teszünk, az utolsó után nincs újabb szünet.|korok=4,munka=25,szunet=5|korok*munka+max(0,korok-1)*szunet|perc|1,25
Súlyozott dolgozatértékelő|A gyakorlati és írásbeli pontszámot megadott százalékos súllyal egyesítsd.|iras=70,gyakorlat=90,iras_suly=40|(iras*iras_suly+gyakorlat*(100-iras_suly))/100|pont|100,94
Vizsga ponthatára|Számold ki, mennyi további pont kell a minimum eléréséhez.|cel=60,eddig=43|max(0,cel-eddig)|hiányzó pont|40,0
Tesztlap javítója|A helyes válasz pontot hoz, a hibás levonást ér, a végeredmény legalább nulla.|helyes=18,hibas=5,jo_pont=2,levonas=1|max(0,helyes*jo_pont-hibas*levonas)|pont|1,0
Könyvtári késés|A türelmi idő levonása után számíts napi késedelmi díjat a példában megadott szabállyal.|keses=9,turelem=2,napi=80|max(0,keses-turelem)*napi|Ft|1,0
Szállásfoglalás elszámolása|Éjszakánkénti szobadíjból és egyszeri takarításból készíts ajánlatot.|ejszaka=3,szobak=2,dij=9000,takaritas=2500|ejszaka*szobak*dij+takaritas|Ft|1,20500
Térképi távolság|A papírtérképen mért centimétert a méretarány alapján váltsd kilométerre.|cm=8,meretarany=25000|cm*meretarany/100000|km|4,1
Fénykép nyomtatási mérete|A képpontok és a nyomtatási felbontás alapján számolj szélességet centiméterben.|pixel=3000,dpi=300|pixel*2.54/dpi|cm|1500,12.7
Képarányos átméretezés|Rögzített új szélességhez igazítsd a magasságot, a képarány megőrzésével.|uj=640,szeles=1920,magas=1080|floor(uj*magas/szeles)|pixel|320,180
Mozaikkép szeletelője|A szélén levő részleges csempéket is bele kell számítani a képdarabokba.|szeles=513,magas=300,csempe=256|ceil(szeles/csempe)*ceil(magas/csempe)|csempe|512,4
Animáció képkockái|Az animáció hosszából és sebességéből határozd meg az exportálandó képkockák számát.|masodperc=12,fps=24|ceil(masodperc*fps)|képkocka|5,120
Videó tárhelyigénye|A videó és a hang együttes bitrátájából becsüld meg a fájlméretet decimális megabájtban.|mp=120,video_mbit=6,hang_mbit=0.4|mp*(video_mbit+hang_mbit)/8|MB|60,48
Hangfelvétel mintaszáma|Tömörítetlen hangnál a mintavételt minden csatornára külön számoljuk.|mp=3,hz=44100,csatorna=2|mp*hz*csatorna|minta|1,88200
Lejátszási lista hossza|Az egymásba úsztatott számok átfedése csökkenti a teljes műsoridőt.|elso=180,masodik=210,harmadik=195,atfedes=5|elso+masodik+harmadik-2*atfedes|másodperc|120,515
Podcast fejezetjelző|Alakítsd át az óra-perc-másodperc időbélyeget a lejátszó pozíciójává.|ora=1,perc=12,mp=35|3600*ora+60*perc+mp|másodperc|0,755
Felirat időkorrekció|A felirat kezdőidejéhez adj késleltetést; a felirat a videó előtt nem kezdődhet.|kezdes=2400,eltolas=-500|max(0,kezdes+eltolas)|ms|300,0
Letöltési idő becslése|A decimális MB-ban megadott fájlméretet és az Mbit/s sebességet egyező egységre kell hozni.|meret=125,mbit=20|8*meret/mbit|másodperc|250,100
Mentés szabad helye|A megtartott példányok és az új mentés együttes helyigényét vond le a lemezből.|lemez=500,peldany=3,meret=80,uj=90|lemez-peldany*meret-uj|GB|400,70
Darabolt feltöltés|A fájlt azonos méretű részekre bontjuk; az utolsó rész kisebb is lehet.|bajt=10001,blokk=1000|ceil(bajt/blokk)|rész|10000,10
Oldalankénti találatok|Az utolsó oldalon csak a maradék rekordok jelenjenek meg.|rekord=53,oldal=3,meret=20|min(meret,max(0,rekord-(oldal-1)*meret))|találat|40,0
Lapozó kezdőindexe|A felület egytől számoz, az adatréteg nullától. Számolj lekérdezési eltolást.|oldal=4,meret=15|(oldal-1)*meret|kihagyott rekord|1,0
Gyorsítótár találati aránya|Külön kezeld a találatokat és a kihagyásokat a gyorsítótár mérésében.|talalat=90,hiany=10|100*talalat/(talalat+hiany)|százalék|10,50
Kéréskvóta kijelzése|Mutasd meg a ciklusban még felhasználható hívások számát, túlfutásnál nullát jelezve.|limit=1200,hivas=930|max(0,limit-hivas)|kérés|800,0
Feladatváró sor|A munkások által már elvégzett és az újonnan érkező feladatokból vezesd le a sor hosszát.|kezdo=70,erkezett=30,kesz=55|max(0,kezdo+erkezett-kesz)|feladat|10,0
Párhuzamos köteg futásideje|Azonos idejű feladatok több munkáson futnak hullámokban. Az utolsó hullám is teljes időt kér.|feladat=17,munkas=4,ido=3|ceil(feladat/munkas)*ido|perc|16,12
Újrapróbálás késleltetése|A várakozást próbánként duplázod, de a példában van beállított felső időkorlát.|elozo=8,plafon=12|min(elozo*2,plafon)|másodperc|3,6
Válaszidő eltérése|Hasonlítsd a mostani mérést az alapértékhez az alap százalékában.|most=240,alap=200|100*(most-alap)/alap|százalék|180,-10
Elérhetőségi jelentés|A megfigyelt időszakból a kiesett perceket levonva állapítsd meg az elérhetőséget.|ido=1000,kieses=8|100*(ido-kieses)/ido|százalék|800,99
Kiadási hibakeret|A helyi projekt által engedett hibás kérésekből vond le a megfigyelt hibákat.|keres=10000,keret_szazalek=1,hiba=65|floor(keres*keret_szazalek/100)-hiba|kérés a keretből|5000,-15
Incidens észlelési késése|A napló két időbélyegéből határozd meg az észlelésig eltelt időt.|eszleles=1700,kezdet=1260|eszleles-kezdet|másodperc|1500,240
Megőrzési tárhelyterv|Napi naplóforgalomból és a példában választott megőrzési időből számolj tömörített méretet.|napi=12,nap=30,arany=4|napi*nap/arany|GB|8,60
Kötelező mezők lefedettsége|Adatimport előtt jelezd, a szükséges mezők mekkora része van kitöltve.|kitoltott=18,szukseges=24|100*kitoltott/szukseges|százalék|12,50
Duplikált rekordok aránya|Az összes importált sorból és az egyedi azonosítókból becsüld meg az ismétlődést.|sor=250,egyedi=230|100*(sor-egyedi)/sor|százalék|230,0
Adatátvitel ellenőrzése|Az exportált és az importált darabszám eltéréséből jelezz hiányzó rekordot.|exportalt=850,importalt=835|exportalt-importalt|rekord eltérés|835,0
Kérdőív válaszadási aránya|Csak a kézbesített meghívásokat számítsd bele az elérhető célcsoportba.|valasz=72,kikuldott=100,vissza=10|100*valasz/(kikuldott-vissza)|százalék|45,50
Hírlevél kattintásmérő|Az egyedi kattintók arányát számold az egyedi megnyitók között.|kattinto=36,megnyito=240|100*kattinto/megnyito|százalék|60,25
Webes tölcsér lemorzsolódása|Számold ki, a kosarat megnyitók hány százaléka nem fejezte be a rendelést.|kosarak=200,rendeles=150|100*(kosarak-rendeles)/kosarak|százalék|300,50
Kampány költsége látogatónként|A hirdetési keret felhasznált részét oszd el a tényleges látogatók számával.|keret=60000,maradt=12000,latogato=800|(keret-maradt)/latogato|Ft/látogató|52000,50
Rendezvény nullszaldója|A jegyárból vond le a résztvevőnkénti költséget, ebből kell fedezni a fix kiadásokat.|fix=100000,jegyar=3000,valtozo=500|ceil(fix/(jegyar-valtozo))|fizető résztvevő|101000,41
Költségkeret figyelő|A már kifizetett és lekötött kiadás együtt csökkenti az elkölthető egyenleget.|keret=50000,koltott=17000,lekotott=9000|keret-koltott-lekotott|Ft|25000,-1000
Mérőóra elszámolása|A számlázott fogyasztást a két leolvasás különbsége és a díjtétel adja.|most=1480,elozo=1400,dij=36|(most-elozo)*dij|Ft|1500,3600
Napelem saját fogyasztása|A megtermelt és a hálózatba visszatáplált energia különbsége helyben hasznosult.|termelt=18,vissza=5|termelt-vissza|kWh|12,7
Akkumulátor töltési ideje|A hiányzó kapacitást a becsült tényleges töltőteljesítménnyel oszd el.|kapacitas=50,hiany=40,kw=5,hatasfok=80|kapacitas*hiany/(kw*hatasfok)|óra|25,2.5
Világítás energiaigénye|Több azonos lámpa napi használatát alakítsd kilowattórává.|lampak=8,watt=12,ora=5|lampak*watt*ora/1000|kWh|10,0.6
Hőmérő kalibrálása|Egy referencia és az ugyanott mért érték eltérésével javíts egy másik mérést.|uj=23.5,referencia=20,mert=21|uj+referencia-mert|°C|18,17
Fagyasztó ingadozása|Két szélső hőmérsékletből határozd meg a megfigyelt tartomány közepét.|also=-22,felso=-16|(also+felso)/2|°C|-20,-18
Mérleg tárázása|A csomagolt termék nettó tömegéből hagyd ki a dobozt és a töltőanyagot.|brutto=1250,doboz=170,tolto=30|brutto-doboz-tolto|gramm|800,600
Hengeres tároló térfogata|Átmérőből és magasságból számolj litert; a példában a pi közelítése 3.1416.|atmero=20,magas=30|3.1416*atmero*atmero*magas/4000|liter|10,2.3562
Lépcső kiosztása|Adott szintkülönbséghez számolj egyforma fellépéseket megengedett maximális magassággal.|magassag=280,maximum=18|ceil(magassag/maximum)|fellépés|270,15
Polclapok szabása|Egy szál anyagból vágj azonos hosszúságú darabokat, számolj a vágás veszteségével is.|anyag=2400,darab=590,vagas=3|floor((anyag+vagas)/(darab+vagas))|polclap|1180,1
Csomag térfogatsúlya|Szállítási ajánlathoz hasonlítsd össze a fizikai tömeget a példabeli térfogatsúllyal.|hossz=50,szeles=40,magas=30,tomeg=8|max(tomeg,hossz*szeles*magas/5000)|elszámolt kg|20,8
Adagolószalag sebessége|A szükséges óránkénti darabszámot és a terméktávolságot váltsd méter/percre.|darab=1200,tav_cm=25|darab*tav_cm/6000|m/perc|600,2.5
Gépkihasználási mutató|A tervezett műszakból levonjuk az állásidőt és az átállást.|muszak=480,allas=40,atallas=20|100*(muszak-allas-atallas)/muszak|százalék|300,80
Karbantartási visszaszámláló|Az üzemórás karbantartási periódusból számolj hátralévő üzemidőt.|periodus=500,most=2200,utolso=1800|max(0,periodus-(most-utolso))|üzemóra|350,0
Címkenyomtató ívterve|A már megkezdett ív szabad címkéit használd el az új ívek előtt.|cimke=85,szabad=7,iven=24|ceil(max(0,cimke-szabad)/iven)|új ív|7,0
Műsorrendi csúszás|A hátralévő műsoridőt vesd össze az élő adásból még rendelkezésre álló idővel.|hatralevo=48,keret=40|max(0,hatralevo-keret)|perc rövidítés|38,0
`.trim().split('\n').map(row=>row.split('|'));
