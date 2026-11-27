// A Bash-példák mindegyike saját ideiglenes mappában dolgozik.
window.KA.parancsProjektek = `
Könyvtárfa építése|mkdir -p bolt/{adat,naplo,export}; find bolt -type d | sort|A projekt három alkönyvtára megjelenik a listában.
Rejtett beállítás megkeresése|echo tema=sotet > .pelda; find . -maxdepth 1 -type f -name '.*'|A keresés megtalálja a ponttal kezdődő .pelda fájlt.
Üres mappák leltára|mkdir -p kep jegyzet; touch jegyzet/elso; find . -type d -empty|Csak a kep mappa üres.
Kiterjesztés szerinti rendezés|touch a.txt b.csv; mkdir szoveg; for f in *.txt; do mv -- "$f" szoveg/; done; ls szoveg|A szoveg mappába csak a.txt kerül.
Szóközös fájlnevek másolása|mkdir cel; touch "elso nap.txt"; for f in *.txt; do cp -- "$f" cel/; done; ls cel|A másolat neve a szóközzel együtt marad meg.
Legutóbb módosított jegyzet|touch -t 202501010800 elso; touch -t 202502010800 masodik; ls -1t | head -n 1|A masodik fájl kapta a frissebb időpontot.
Fájlméret bájtban|printf abcde > adat; wc -c < adat|Az öt ASCII betű öt bájt.
Hivatkozás céljának feloldása|mkdir verzio1; ln -s verzio1 aktualis; readlink aktualis|A logikai névhez a verzio1 könyvtár tartozik.
Törött hivatkozások leltára|ln -s hianyzik rovidites; for f in *; do if [[ -L "$f" && ! -e "$f" ]]; then echo "$f"; fi; done|A rovidites szimbolikus link célja hiányzik.
Névütközés nélküli mentés|echo elso > jegyzet; nev=$(mktemp jegyzet.XXXXXX); cp jegyzet "$nev"; cat "$nev"|A mentés önálló nevet kap, a tartalma elso.
Szöveges fájlok összevetése|printf 'tea\\nviz\\n' > regi; printf 'tea\\nmez\\n' > uj; diff -u regi uj || test "$?" = 1|Az eltérésben a viz helyére mez kerül.
Két lista közös elemei|printf 'alma\\ntea\\n' > a; printf 'alma\\nviz\\n' > b; comm -12 a b|A rendezett listák közös sora alma.
Új leltári tételek|printf 'ceruza\\n' > regi; printf 'ceruza\\ntoll\\n' > uj; comm -13 regi uj|Csak a toll új tétel.
Névlista egyesítése|printf 'Anna\\nBori\\n' > a; printf 'Anna\\nEva\\n' > b; sort -u a b|A két névlistában Anna csak egyszer szerepel az eredményben.
Névjegyek számozása|printf 'Anna\\nBori\\n' > nevek; nl -ba nevek|Mindkét név sorszámot kap.
Markdown tartalomjegyzék|printf '# Naplo\\n## Reggel\\nSzoveg\\n## Este\\n' > naplo.md; sed -n 's/^## /- /p' naplo.md|A két második szintű címből lista készül.
Konfiguráció értékének kiolvasása|printf 'MOD=proba\\nPORT=8081\\n' > app.conf; sed -n 's/^PORT=//p' app.conf|A port értéke 8081.
Megjegyzések kiszűrése|printf '# minta\\n\\nnev=Anna\\n' > app.conf; grep -Ev '^[[:space:]]*(#|$)' app.conf|A beállítási fájlból csak az aktív sor marad.
Windowsos sorvégek javítása|printf 'egy\\r\\nketto\\r\\n' > regi; tr -d '\\r' < regi > uj; wc -c < uj|Az új fájlban a két sorvégi CR bájt eltűnik.
Tabulátoros tábla exportja|printf 'nev\\tpont\\nAnna\\t8\\n' > adat; tr '\\t' ';' < adat|Az egyszerű mezők pontosvesszővel kerülnek a kimenetre.
Fejléc átugrása importáláskor|printf 'nev,pont\\nAnna,7\\nBori,9\\n' > adat; tail -n +2 adat | cut -d, -f1|A nev fejléc helyett csak a két tényleges név jelenik meg.
Ranglista pontszám alapján|printf 'Anna 8\\nBori 12\\nEva 3\\n' | sort -k2,2nr|Bori kerül előre a numerikus rendezésben.
Pontegyenlőség feloldása|printf 'Eva 8\\nAnna 8\\nBori 10\\n' | sort -k2,2nr -k1,1|Azonos pontnál a név dönt, Anna megelőzi Evát.
Szógyakoriság szövegben|printf 'Tea tea viz' | tr '[:upper:] ' '[:lower:]\\n' | sort | uniq -c|A tea kétszer, a viz egyszer szerepel.
Leghosszabb bejegyzés|printf 'piros\\nkek\\nnarancs\\n' | awk 'length>n {n=length; s=$0} END {print s}'|A narancs a leghosszabb sor.
Hibanapló összefoglaló|printf 'INFO start\\nERROR io\\nERROR io\\nERROR format\\n' | awk '$1=="ERROR"{n[$2]++} END{for(k in n) print k,n[k]}' | sort|Az io kétszer, a format egyszer számít hibának.
HTTP-státuszok csoportosítása|printf '200\\n201\\n404\\n503\\n' | cut -c1 | sort | uniq -c|A 2-es osztályban kettő, a 4-esben és az 5-ösben egy kérés van.
Lassú műveletek keresése|printf 'betolt 120\\nment 850\\n' | awk '$2>500 {print $1}'|A fél másodpercet túllépő művelet a ment.
Mérési átlag készítése|printf '12\\n15\\n18\\n' | awk '{s+=$1} END{if(NR) print s/NR}'|A három mérés átlaga 15.
Futó egyenleg|printf '120\\n-30\\n15\\n' | awk '{s+=$1; print NR,s}'|A harmadik tranzakció után az egyenleg 105.
Oszlopok felcserélése|printf 'Kiss Anna\\nNagy Bori\\n' | awk '{print $2,$1}'|A kimenetben a keresztnév szerepel elöl.
Egyszerű cikkszámellenőrzés|printf 'AB-123\\nrossz\\nCD-456\\n' | grep -Ex '[A-Z]{2}-[0-9]{3}'|Két azonosító teljesíti a teljes sorra vonatkozó mintát.
E-mail-tartományok leltára|printf 'a@example.org\\nb@example.org\\nc@example.net\\n' | cut -d@ -f2 | sort -u|Két különböző mintatartományt kapunk.
Dátumozott jelentés létrehozása|nap=$(date +%F); printf 'Napi jelentés\\n' > "jelentes-$nap.txt"; ls jelentes-*.txt|A fájlnévben az aktuális helyi dátum szerepel.
Fájlnévből azonosító|f='szamla-0042.csv'; id=\${f#szamla-}; echo "\${id%.csv}"|Az azonosító a kezdő nullákkal együtt 0042.
Sorszámozott képfájlnevek|for n in 1 2 3; do printf 'kep-%03d.jpg\\n' "$n"; done|Az azonos hosszú sorszámok szövegként is rendezhetők.
Dupla szóközök normalizálása|printf 'egy    kis   bolt\\n' | tr -s ' '|A szavak között pontosan egy szóköz marad.
Címkék tömbbe olvasása|IFS=, read -r -a cimkek <<< 'web,java,sql'; printf '%s címke\\n' "\${#cimkek[@]}"|Három mezőt tárol a Bash tömb.
Soronkénti adatbevitel|printf 'alma fa\\nkorte\\n' > lista; while IFS= read -r sor; do printf '[%s]\\n' "$sor"; done < lista|Az első rekord belső szóköze megmarad.
Kulcsos számláló|declare -A n=(); for szin in kek zold kek; do n[$szin]=$(( \${n[$szin]:-0} + 1 )); done; echo "\${n[kek]}"|Az asszociatív tömbben a kek kulcshoz 2 tartozik.
Alapértelmezett környezet|unset MOD; printf '%s\\n' "\${MOD:-helyi}"; MOD=teszt; printf '%s\\n' "\${MOD:-helyi}"|Az első sor helyi, a második teszt.
Egyszeri folyamatbeállítás|MOD=szulo; export MOD; MOD=gyerek bash -c 'echo "$MOD"'; echo "$MOD"|A felülírás csak a gyermekfolyamatra hat.
Parancssori kapcsoló|set -- -n Anna; while getopts 'n:' opt; do case "$opt" in n) printf 'Szia, %s!\\n' "$OPTARG";; esac; done|A -n után kapott név Anna.
Pozicionális argumentumok|set -- kosar tea mez; muvelet=$1; shift; printf '%s: %s tétel\\n' "$muvelet" "$#"|A művelet kiemelése után két tétel marad.
Névvel hívható parancsok|parancs=lista; case "$parancs" in lista) printf 'Tea\\nViz\\n';; *) echo 'Ismeretlen művelet';; esac|A lista parancs a két terméket adja vissza.
Értéktartomány ellenőrzése|ervenyes(){ [[ $1 =~ ^[0-9]+$ ]] && ((10#$1 <= 100)); }; for n in 8 101 x; do if ervenyes "$n"; then echo "$n OK"; else echo "$n hibás"; fi; done|A 8 érvényes, a 101 és az x kiesik.
Kilépési kód értelmezése|if grep -q alma <<< korte; then echo talalat; else kod=$?; printf 'Állapot: %d\\n' "$kod"; fi|A grep találat hiányában 1-es állapotot jelez.
Hibakimenet szétválasztása|{ echo eredmeny; echo figyelem >&2; } > normal 2> hibak; cat normal; cat hibak|A két üzenet két külön fájlba kerül.
Jelentés egyidejű mentése|printf 'kész\\n' | tee eredmeny.txt; wc -l < eredmeny.txt|A sor a terminálon és a mentett fájlban is megjelenik.
Parancs elérhetőségi próbája|for cmd in bash awk sort; do if command -v "$cmd" >/dev/null; then echo "$cmd elérhető"; fi; done|A telepített segédprogramokat név szerint jelzi a próba.
Elkülönített munkakönyvtár|mkdir feladat; (cd feladat && pwd); pwd|A zárójeles blokk után a szülő munkakönyvtára változatlan.
Atomi jelentéscsere|echo regi > lista; printf 'uj\\n' > lista.tmp; mv lista.tmp lista; cat lista|A kész ideiglenes fájl váltja fel a régi jelentést.
Üres bemenet kezelése|: > adat; if [[ -s adat ]]; then cat adat; else echo 'Nincs feldolgozható adat'; fi|A nulla bájtos fájl érthető üzenetet ad.
Mintaadat előállítása|for n in 1 2 3; do printf '%03d;teszt-%s\\n' "$n" "$n"; done > proba.csv; cat proba.csv|Három megismételhető tesztrekord készül.
Két oszlop összefésülése|printf 'Anna\\nBori\\n' > nevek; printf '7\\n9\\n' > pontok; paste -d ';' nevek pontok|A nevek és a pontok soronként párokat alkotnak.
Kód szerinti táblakapcsolás|printf '1 Anna\\n2 Bori\\n' > tanulo; printf '1 8\\n2 9\\n' > pont; join tanulo pont|A két rendezett fájlt a közös első oszlop kapcsolja össze.
Változások arányának mérése|printf '10\\n15\\n12\\n' | awk 'NR>1 {print $1-elozo} {elozo=$1}'|A változások rendre 5 és -3.
Hisztogram készítése|printf 'kek 3\\nzold 2\\n' | awk '{printf "%s ",$1; for(i=0;i<$2;i++) printf "*"; print ""}'|A csillagok száma jelzi a két darabszámot.
Hiányzó sorszám keresése|printf '1\\n2\\n4\\n' | awk 'NR>1 {for(i=utolso+1;i<$1;i++) print i} {utolso=$1}'|A számsorban a 3 hiányzik.
Első érvényes érték|printf 'hiba\\n18\\n22\\n' | awk '/^[0-9]+$/ {print; exit}'|Az első teljesen numerikus rekord 18.
Egymást követő ismétlések|printf 'nyit\\nnyit\\nzar\\nnyit\\n' | uniq -c|Az utolsó nyit külön eseménysorozatot alkot.
Számla végösszege fájlból|printf 'tea;3;450\\nviz;2;200\\n' | awk -F';' '{s+=$2*$3} END {print s,"Ft"}'|A kosár végösszege 1750 Ft.
Alacsony készlet riasztása|printf 'tea 2 5\\nviz 9 3\\n' | awk '$2<$3 {print $1,$3-$2}'|A teából három darab hiányzik a küszöbhöz.
Havi csoportosítás|printf '2025-01-03 4\\n2025-01-12 5\\n2025-02-01 2\\n' | awk '{s[substr($1,1,7)]+=$2} END{for(m in s) print m,s[m]}' | sort|Január összesen 9, február 2.
Időbélyegek átváltása|printf '2:30\\n0:45\\n' | awk -F: '{print 60*$1+$2}'|A perc és másodperc mezőkből 150 és 45 lesz.
Útvonalelemek felbontása|f='archiv/2025/naplo.txt'; dirname "$f"; basename "$f" .txt|A könyvtárrészt és a kiterjesztés nélküli nevet külön kapod meg.
Ellenőrzőösszeg összevetése|echo minta > eredeti; cp eredeti masolat; a=$(cksum < eredeti); b=$(cksum < masolat); [[ "$a" == "$b" ]] && echo 'Azonos próbaösszeg'|A bájtra megegyező mintákhoz azonos ellenőrzőösszeg tartozik.
Archívum tartalomjegyzéke|mkdir jegyzet; echo adat > jegyzet/a.txt; tar -cf ment.tar jegyzet; tar -tf ment.tar|A csomag fájljai kibontás nélkül listázhatók.
Mentés próba-visszaállítása|mkdir eredeti proba; echo 42 > eredeti/a; tar -C eredeti -cf ment.tar a; tar -C proba -xf ment.tar; cmp eredeti/a proba/a && echo 'Helyreállítva'|A visszaállított minta megegyezik az eredetivel.
Tömörített szöveg visszaolvasása|printf 'naplo\\nnaplo\\n' | gzip > naplo.gz; gzip -dc naplo.gz | wc -l|A tömörített állományból két sor olvasható ki.
Darabolt fájl egyesítése|printf 'almafa' > eredeti; split -b 2 eredeti resz; cat resz* > teljes; cmp teljes eredeti && echo 'Hiánytalan'|A három kétbájtos rész az eredetit állítja vissza.
Állapotjelző fájl|if [[ ! -e kesz ]]; then echo 'Első feldolgozás'; touch kesz; fi; [[ -e kesz ]] && echo 'Következő futás kihagyható'|A jelző megkülönbözteti a feldolgozott állapotot.
Zárolás könyvtárral|mkdir feladat.lock; if mkdir feladat.lock 2>/dev/null; then echo 'Második zárolás'; else echo 'Foglalt'; fi; rmdir feladat.lock|Az azonos név újralétrehozása meghiúsul, a második munkás várhat.
Háttérfeladat eredménye|(printf 'elkészült\\n' > eredmeny) & pid=$!; wait "$pid"; cat eredmeny|A wait után a fájl biztosan elkészült.
Párhuzamos jelentések|for n in 1 2 3; do (echo "$((n*n))" > "resz$n") & done; wait; cat resz1 resz2 resz3|A három munkás eredménye 1, 4 és 9.
Mért futási idő|start=$SECONDS; sleep 1; echo "$((SECONDS-start)) másodperc"|A várakozás ideje egész másodpercben mérhető.
Próbálkozásszámláló|for n in 1 2 3; do if ((n==2)); then echo "Siker a(z) $n. kísérletre"; break; fi; done|A siker után nincs harmadik próbálkozás.
Leállási feltétel|kesz=0; while ((kesz < 3)); do ((kesz+=1)); echo "Feldolgozva: $kesz"; done|A harmadik feldolgozott tétel után megáll a ciklus.
Jelszómentes beállításminta|printf 'PORT=8080\\nMOD=helyi\\n' > pelda.env; cut -d= -f1 pelda.env|A dokumentációba csak a PORT és MOD kulcs kerül.
Szöveg keresése mappában|mkdir src; printf 'TODO: javítás\\n' > src/app.txt; grep -rn 'TODO:' src|A találat tartalmazza a fájlnevet és a sorszámot.
Keresési találat környezete|printf 'indul\\nhiba\\nleall\\n' > naplo; grep -n -C 1 hiba naplo|A hibasor előtti és utáni esemény is olvasható.
Szöveg biztonságos behelyettesítése|nev='Anna & Bori'; printf 'Üdv, %s!\\n' "$nev"|Az ampersand a név része marad, a teljes név egy argumentum.
Lekérdezés TSV-adatból|printf 'Anna\\tB\\nBori\\tA\\n' | awk -F'\\t' '$2=="A"{print $1}'|Az A csoportból Bori szerepel a kimeneten.
Logikai állapotok összegzése|printf 'ok\\nhiba\\nok\\n' | awk '$1=="ok"{jo++} END{print jo "/" NR}'|A három műveletből kettő sikeres.
Sorhossz határának ellenőrzése|printf 'rovid\\negy-hosszu-sor\\n' | awk 'length>8 {print NR,length}'|A második sor túllépi a nyolc karaktert.
Utolsó mező kiolvasása|printf 'egy ketto kesz\\nuj hiba\\n' | awk '{print $NF}'|A mezők száma eltérhet, az utolsó állapot mindig olvasható.
Fájlkiterjesztések összesítése|touch a.txt b.txt c.csv; for f in *; do echo "\${f##*.}"; done | sort | uniq -c|Két txt és egy csv állomány készült.
Dinamikus súgó|sugo(){ printf '%s\\n' 'Használat: jelentes [lista|osszeg]' 'lista: rekordok kiírása'; }; sugo|A külön függvényből a belépési pontok ugyanazt a leírást kaphatják.
Jegyzékből hiányzó fájl|touch a.txt; for f in a.txt b.txt; do [[ -f "$f" ]] || echo "Hiányzik: $f"; done|Csak a b.txt hiányzik a jegyzékből.
Munkamenet zárójelentése|printf '3\\n2\\n4\\n' > tetelek; awk '{s+=$1} END{print NR,"köteg,",s,"tétel"}' tetelek|A lezárt munkamenetben három köteg és kilenc tétel van.
`.trim().split('\n').map(row=>{const first=row.indexOf('|'),last=row.lastIndexOf('|');return [row.slice(0,first),row.slice(first+1,last),row.slice(last+1)];});
