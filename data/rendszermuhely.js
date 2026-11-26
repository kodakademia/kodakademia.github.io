(() => {
  const ka=window.KA;
  function quiz(question,answer,why,wrong1,wrong2,index){
    const options=[String(answer),String(wrong1),String(wrong2)];
    const shift=index%3;options.push(...options.splice(0,shift));
    return [question,options,options.indexOf(String(answer)),why];
  }
  const rows=[
    [1,'Tea','ital',4,500],[2,'Víz','ital',0,200],[3,'Kifli','pékáru',8,150],
    [4,'Kenyér','pékáru',2,700],[5,'Alma','gyümölcs',6,300],[6,'Körte','gyümölcs',1,450]
  ];
  const sets=[
    ['Teljes készlet','1=1',()=>true,'A teljes minta mind a hat terméket tartalmazza.'],
    ['Elérhető termékek','db > 0',r=>r[3]>0,'A nulla készletű termék kimarad.'],
    ['Utánrendelési lista','db <= 2',r=>r[3]<=2,'A nulla készlet és a határon lévő két darab is ide tartozik.'],
    ['Italos polc',"kat = 'ital'",r=>r[2]==='ital','A kategórianév alapján választjuk ki a termékeket.'],
    ['Pékség',"kat = 'pékáru'",r=>r[2]==='pékáru','Csak a pékséghez sorolt rekordok jutnak át.'],
    ['Gyümölcsrészleg',"kat = 'gyümölcs'",r=>r[2]==='gyümölcs','A szöveges feltétel az eredeti kategóriát vizsgálja.'],
    ['Kedvező árú tételek','ar < 400',r=>r[4]<400,'Az ár forintban tárolt egész szám.'],
    ['Középső ársáv','ar BETWEEN 300 AND 500',r=>r[4]>=300&&r[4]<=500,'A BETWEEN az alsó és a felső határt is tartalmazza.'],
    ['Első szállítmány','id <= 3',r=>r[0]<=3,'A példában az első három azonosító tartozik a szállítmányhoz.'],
    ['Készleten lévő drágább áru','db > 0 AND ar >= 450',r=>r[3]>0&&r[4]>=450,'Mindkét feltételnek teljesülnie kell.']
  ];
  const reports=[
    ['termékfajták','COUNT(*)',a=>a.length,'Minden kiválasztott rekord egy termékfajta.'],
    ['elérhető darabok','SUM(db)',a=>a.reduce((s,r)=>s+r[3],0),'A készletösszeg a darabszámokból áll össze.'],
    ['legolcsóbb egységár','MIN(ar)',a=>Math.min(...a.map(r=>r[4])),'A minimum a legkisebb árat adja vissza.'],
    ['legdrágább egységár','MAX(ar)',a=>Math.max(...a.map(r=>r[4])),'A maximum a szűrés után megmaradt árakból készül.'],
    ['készletérték','SUM(db * ar)',a=>a.reduce((s,r)=>s+r[3]*r[4],0),'Először soronként szorzunk, majd összeadjuk a tételek értékét.'],
    ['kategóriák száma','COUNT(DISTINCT kat)',a=>new Set(a.map(r=>r[2])).size,'Egy kategória többszöri előfordulása csak egyszer számít.'],
    ['legnagyobb készlet','MAX(db)',a=>Math.max(...a.map(r=>r[3])),'A jelentés a legtöbb darabbal rendelkező tétel készletét adja.'],
    ['árterjedelem','MAX(ar) - MIN(ar)',a=>Math.max(...a.map(r=>r[4]))-Math.min(...a.map(r=>r[4])),'A két szélső ár távolsága forintban értendő.'],
    ['elfogyott tételek','SUM(CASE WHEN db=0 THEN 1 ELSE 0 END)',a=>a.filter(r=>!r[3]).length,'Minden készlethiányos sor egyet ad az összeghez.'],
    ['teljes párok','SUM(FLOOR(db / 2.0))',a=>a.reduce((s,r)=>s+Math.floor(r[3]/2),0),'Két darab azonos termék alkot párt. A maradékot termékenként hagyjuk ki.']
  ];
  const table=rows.map((r,k)=>'    SELECT '+r.map((v,n)=>(typeof v==='string'?"'"+v+"'":v)+(k===0?' AS '+['id','nev','kat','db','ar'][n]:'')).join(', ')).join('\n    UNION ALL\n');
  const sqlLessons=[];
  sets.forEach(([set,condition,filter,why],i)=>reports.forEach(([name,formula,calc,note],j)=>{
    const selected=rows.filter(filter),answer=calc(selected);
    const code='SELECT '+formula+' AS eredmeny\nFROM (\n'+table+'\n) AS keszlet\nWHERE '+condition+';';
    sqlLessons.push(ka.lesson('xampp-jelentes-'+(i+1)+'-'+(j+1),set+' – '+name,'Középhaladó',15,'Készíts raktári jelentést hat mintarekordból. A vizsgált mutató: '+name+'.',
      [why,note],[{label:'SQL – XAMPP / MariaDB',code,usage:'A phpMyAdmin SQL lapján futtatható önálló lekérdezés. A belső SELECT-ek adják a tesztadatokat, ezért saját táblát sem kell előkészíteni.'}],
      ['Az összesítő kifejezés helyére írd ezt: nev, db, ar. Ellenőrizd, hogy ezek a termékek maradnak: '+selected.map(r=>r[1]).join(', ')+'.',
       'Állítsd vissza az összesítést, majd szűrj csak az első rekordra (id = 1). Ennél a jelentésnél az új eredmény '+calc([rows[0]])+'.'],
      quiz('Melyik számot adja az eredeti jelentés?',answer,note+' A szűrt sorokból számított eredmény '+answer+'.',answer+1,answer+2,i+j)));
  }));ka.addLessons('xampp',sqlLessons);

  const streams=[
    ['Két nap naplója',"printf '%s\\n' tea viz; printf '%s\\n' tea mez",['tea','viz','tea','mez'],'A két kiírás folyamatos bemenetet alkot.'],
    ['Első három sor',"printf '%s\\n' zold kek zold piros | head -n 3",['zold','kek','zold'],'A head három sor után lezárja a kivágást.'],
    ['Utolsó három sor',"printf '%s\\n' januar majus junius majus | tail -n 3",['majus','junius','majus'],'A tail a bemenet végét tartja meg.'],
    ['Első oszlop',"printf '%s\\n' 'fa:2' 'ko:3' 'fa:1' | cut -d: -f1",['fa','ko','fa'],'A kettőspont választja el az oszlopokat.'],
    ['Kisbetűsítés',"printf '%s\\n' API WEB api | tr 'A-Z' 'a-z'",['api','web','api'],'Az ASCII nagybetűk helyére kisbetű kerül.'],
    ['Előtag elhagyása',"printf '%s\\n' id-alma id-korte id-alma | sed 's/^id-//'",['alma','korte','alma'],'A sor eleji előtagot eltávolítjuk.'],
    ['Üres sorok kizárása',"printf '%s\\n' piros '' kek piros | grep -v '^$'",['piros','kek','piros'],'Az üres rekordok a további feldolgozásból kimaradnak.'],
    ['Sorrend megfordítása',"printf '%s\\n' egy ketto harom | awk '{a[NR]=$0} END {for(i=NR;i>=1;i--) print a[i]}'",['harom','ketto','egy'],'Az awk elmenti a sorokat, és visszafelé írja ki őket.'],
    ['Második mező',"printf '%s\\n' '1 csiga' '2 hal' '3 csiga' | awk '{print $2}'",['csiga','hal','csiga'],'A szóközzel elválasztott adatok második mezőjét olvassuk.'],
    ['Szóközből sorvég',"printf '%s\\n' 'bal jobb bal fent' | tr ' ' '\\n'",['bal','jobb','bal','fent'],'Minden szó önálló rekorddá válik.']
  ];
  const commands=[
    ['sorok száma','wc -l',a=>String(a.length),'A wc -l a sortöréseket számolja.'],
    ['különböző sorok','sort -u | wc -l',a=>String(new Set(a).size),'A rendezés és egyedivé tétel után számoljuk a sorokat.'],
    ['első sor','head -n 1',a=>a[0],'A feldolgozott adatfolyam elejét olvassuk.'],
    ['utolsó sor','tail -n 1',a=>a.at(-1),'Az utolsó sort a bemenet lezárása után kapjuk meg.'],
    ['első ábécérendes érték','sort | head -n 1',a=>[...a].sort()[0],'C területi beállítással az ASCII szavak rendezése kiszámítható.'],
    ['utolsó ábécérendes érték','sort | tail -n 1',a=>[...a].sort().at(-1),'A rendezés utáni utolsó sor a legnagyobb szöveges érték.'],
    ['leghosszabb sor hossza',"awk 'length>m {m=length} END {print m+0}'",a=>String(Math.max(...a.map(x=>x.length))),'A hosszrekordot csak hosszabb sor érkezésekor írjuk felül.'],
    ['betűk összesen',"awk '{s+=length} END {print s+0}'",a=>String(a.join('').length),'A sorvégeket ez a jelentés kihagyja.'],
    ['második rekord',"sed -n '2p'",a=>a[1],'A sed sorozatszámozása egytől indul.'],
    ['vesszős lista',"paste -sd ',' -",a=>a.join(','),'A paste egy sorba fűzi a rekordokat.']
  ];
  const terminal=[];
  streams.forEach(([name,src,lines,why],i)=>commands.forEach(([job,cmd,fn,reason],j)=>{
    const val=fn(lines), code='export LC_ALL=C\n{ '+src+'; } | '+cmd;
    terminal.push(ka.lesson('terminal-folyam-'+(i+1)+'-'+(j+1),name+' – '+job,'Középhaladó',12,'Készíts Bash-parancssort a következő feladathoz: '+job+'.',[why,reason],
      [{label:'Bash',code,usage:'A kapcsos zárójelbe írt parancsok kimenete kerül a jobb oldali feldolgozóhoz. '+why}],
      ['Először csak a kapcsos blokkot futtasd. A várt sorok sorrendben: '+lines.join(', ')+'.','Illessz a blokk végére egy további sort a printf paranccsal (értéke: zebra). A teljes csővezeték új eredménye: '+fn([...lines,'zebra'])+'.'],
      quiz('Mi a kimenet a szélső szóközök nélkül?',val,reason+' A minta eredménye: '+val+'.',Number.isFinite(Number(val))?String(Number(val)+1):'ures',Number.isFinite(Number(val))?String(Number(val)+2):'0',i+j)));
  }));ka.addLessons('terminal',terminal);
})();
