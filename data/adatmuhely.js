// A műhelyek két önálló műveletet kapcsolnak össze: az adatsor előállítását és a kiértékelést.
(() => {
  const ka = window.KA;
  const builders = [
    ['Három forduló','Pontozólapot olvasol be a fordulók eredeti sorrendjében.','Három eredményt tárolunk, köztük két egyformát.',[4,7,4]],
    ['Javított mérés','A műszer utolsó mérését egy ellenőrzött értékkel helyettesíted.','A módosítás a meglévő utolsó helyet érinti.',[3,8,6]],
    ['Új nevező','A nevezés lezárása előtt még egy eredmény érkezik.','A bővítés után a régi elemek sorrendje változatlan.',[5,2,9,3]],
    ['Két csoport','Két csoport számaiból közös jelentés készül.','Az első csoport után a második csoport értékei következnek.',[2,6,3,8]],
    ['Fordított rajtsorrend','A beérkezési sorrendet a végétől kezdve dolgozod fel.','A fordítás az elemek helyét cseréli fel.',[8,2,5]],
    ['Pontduplázó','Bónuszkörben minden eredeti pont kétszer számít.','Az átalakítás egy bemeneti elemből egy új értéket készít.',[4,10,6]],
    ['Küszöb feletti értékek','Csak az ötöt elérő mérési eredmények kerülnek a jelentésbe.','A szűrés kihagyhat elemeket, a megmaradók sorrendjét megőrzi.',[8,5,7]],
    ['Első három nap','Egy hosszabb idősorból csak az első három nap a vizsgálat tárgya.','A kivágás után a negyedik napi adat már nem szerepel az eredményben.',[6,1,5]],
    ['Növekvő eredménysor','Rangsorolás előtt számszerűen növekvő sorrendbe teszed az értékeket.','A rendezés a helyeket módosítja, az értékeket megőrzi.',[2,4,9]],
    ['Felső pontkorlát','Egy versenyszabály hét pontban maximálja egy feladat eredményét.','A kisebb értékek megmaradnak, a túl nagy értékek a korlátra kerülnek.',[5,7,7,2]]
  ];
  const tasks = [
    ['összesítés','az összes érték összege',a=>a.reduce((x,y)=>x+y,0),'Az összegző minden elemet hozzáad az addigi részösszeghez.'],
    ['elemszámlálás','a feldolgozott elemek száma',a=>a.length,'Az elemszám ismétlődés esetén is minden helyet figyelembe vesz.'],
    ['csúcsérték','a legnagyobb érték',a=>Math.max(...a),'A csúcsértéket egy kisebb új adat nem változtatja meg.'],
    ['legkisebb érték','a legkisebb érték',a=>Math.min(...a),'A minimum kiválasztásakor minden jelöltet az addigi legkisebbhez hasonlítunk.'],
    ['terjedelem','a legnagyobb és a legkisebb érték különbsége',a=>Math.max(...a)-Math.min(...a),'A terjedelem megmutatja, mekkora sávot fednek le a megfigyelések.'],
    ['páros elemek','a páros értékek darabszáma',a=>a.filter(n=>n%2===0).length,'Kettővel osztva a páros egész számok maradéka nulla.'],
    ['utolsó megfigyelés','az utolsó elem értéke',a=>a[a.length-1],'A jelentés a feldolgozás utáni sorrend utolsó helyét olvassa.'],
    ['változás az elsőhöz képest','az utolsó és az első érték előjeles különbsége',a=>a[a.length-1]-a[0],'A negatív különbség csökkenést mutat az első megfigyeléshez képest.'],
    ['küszöböt elérők','a legalább hatot érő elemek száma',a=>a.filter(n=>n>=6).length,'A pontosan hatot érő elem már beleszámít az eredménybe.'],
    ['négyzetösszeg','az elemek négyzeteinek összege',a=>a.reduce((s,n)=>s+n*n,0),'A nagy értékek négyzetre emelve nagyobb súlyt kapnak az összesítésben.']
  ];
  const jsBuild = ['[4, 7, 4]','[3, 8, 1].map((n,i) => i === 2 ? 6 : n)','[5, 2, 9].concat(3)','[2, 6].concat([3, 8])','[5, 2, 8].reverse()','[2, 5, 3].map(n => 2*n)','[8, 1, 5, 7].filter(n => n >= 5)','[6, 1, 5, 9].slice(0, 3)','[9, 4, 2].sort((a,b) => a-b)','[5, 9, 8, 2].map(n => Math.min(n,7))'];
  const jsCalc = ['a.reduce((s,n) => s+n, 0)','a.length','Math.max(...a)','Math.min(...a)','Math.max(...a) - Math.min(...a)','a.filter(n => n%2 === 0).length','a[a.length-1]','a[a.length-1] - a[0]','a.filter(n => n >= 6).length','a.reduce((s,n) => s+n*n, 0)'];
  const pyBuild = ['[4, 7, 4]','[3, 8, 1]\na[-1] = 6','[5, 2, 9]\na.append(3)','[2, 6] + [3, 8]','[5, 2, 8][::-1]','[2*n for n in [2, 5, 3]]','[n for n in [8, 1, 5, 7] if n >= 5]','[6, 1, 5, 9][:3]','sorted([9, 4, 2])','[min(n, 7) for n in [5, 9, 8, 2]]'];
  const pyCalc = ['sum(a)','len(a)','max(a)','min(a)','max(a) - min(a)','sum(n % 2 == 0 for n in a)','a[-1]','a[-1] - a[0]','sum(n >= 6 for n in a)','sum(n*n for n in a)'];
  const phpBuild = ['[4, 7, 4]','[3, 8, 1];\n$a[2] = 6','[5, 2, 9];\n$a[] = 3','array_merge([2, 6], [3, 8])','array_reverse([5, 2, 8])','array_map(fn($n) => 2*$n, [2, 5, 3])','array_values(array_filter([8, 1, 5, 7], fn($n) => $n >= 5))','array_slice([6, 1, 5, 9], 0, 3)','[9, 4, 2];\nsort($a, SORT_NUMERIC)','array_map(fn($n) => min($n,7), [5, 9, 8, 2])'];
  const phpCalc = ['array_sum($a)','count($a)','max($a)','min($a)','max($a) - min($a)','count(array_filter($a, fn($n) => $n%2 === 0))','end($a)','end($a) - $a[0]','count(array_filter($a, fn($n) => $n >= 6))','array_sum(array_map(fn($n) => $n*$n, $a))'];
  const csBuild = ['new[]{4,7,4}','new[]{3,8,1};\na[2] = 6','new[]{5,2,9}.Append(3).ToArray()','new[]{2,6}.Concat(new[]{3,8}).ToArray()','new[]{5,2,8}.Reverse().ToArray()','new[]{2,5,3}.Select(n => 2*n).ToArray()','new[]{8,1,5,7}.Where(n => n >= 5).ToArray()','new[]{6,1,5,9}.Take(3).ToArray()','new[]{9,4,2}.OrderBy(n => n).ToArray()','new[]{5,9,8,2}.Select(n => Math.Min(n,7)).ToArray()'];
  const csCalc = ['a.Sum()','a.Length','a.Max()','a.Min()','a.Max()-a.Min()','a.Count(n => n%2 == 0)','a[a.Length-1]','a[a.Length-1]-a[0]','a.Count(n => n >= 6)','a.Sum(n => n*n)'];
  const javaBuild = ['{4,7,4}','{3,8,1};\n        a[2] = 6','=IntStream.concat(IntStream.of(5,2,9), IntStream.of(3)).toArray()','=IntStream.concat(IntStream.of(2,6), IntStream.of(3,8)).toArray()','{5,2,8};\n        int temp=a[0]; a[0]=a[2]; a[2]=temp','=IntStream.of(2,5,3).map(n -> 2*n).toArray()','=IntStream.of(8,1,5,7).filter(n -> n >= 5).toArray()','=IntStream.of(6,1,5,9).limit(3).toArray()','=IntStream.of(9,4,2).sorted().toArray()','=IntStream.of(5,9,8,2).map(n -> Math.min(n,7)).toArray()'];
  const javaCalc = ['Arrays.stream(a).sum()','a.length','Arrays.stream(a).max().getAsInt()','Arrays.stream(a).min().getAsInt()','Arrays.stream(a).max().getAsInt()-Arrays.stream(a).min().getAsInt()','Arrays.stream(a).filter(n -> n%2==0).count()','a[a.length-1]','a[a.length-1]-a[0]','Arrays.stream(a).filter(n -> n>=6).count()','Arrays.stream(a).map(n -> n*n).sum()'];
  const cBuild = ['int a[]={4,7,4}, n=3;','int a[]={3,8,1}, n=3;\na[n-1]=6;','int a[4]={5,2,9}, n=3;\na[n++]=3;','int a[4]={2,6}, n=2, masik[]={3,8};\nfor(int i=0;i<2;i++) a[n++]=masik[i];','int a[]={5,2,8}, n=3;\nfor(int i=0;i<n/2;i++){int t=a[i]; a[i]=a[n-1-i]; a[n-1-i]=t;}','int a[]={2,5,3}, n=3;\nfor(int i=0;i<n;i++) a[i]*=2;','int a[]={8,1,5,7}, n=0;\nfor(int i=0;i<4;i++) if(a[i]>=5) a[n++]=a[i];','int a[]={6,1,5,9}, n=3;','int a[]={9,4,2}, n=3;\nfor(int i=0;i<n;i++) for(int j=i+1;j<n;j++) if(a[j]<a[i]){int t=a[i]; a[i]=a[j]; a[j]=t;}','int a[]={5,9,8,2}, n=4;\nfor(int i=0;i<n;i++) if(a[i]>7) a[i]=7;'];
  const cCalc = ['int r=0; for(int i=0;i<n;i++) r+=a[i];','int r=n;','int r=a[0]; for(int i=1;i<n;i++) if(a[i]>r) r=a[i];','int r=a[0]; for(int i=1;i<n;i++) if(a[i]<r) r=a[i];','int lo=a[0], hi=a[0]; for(int i=1;i<n;i++){if(a[i]<lo) lo=a[i]; if(a[i]>hi) hi=a[i];} int r=hi-lo;','int r=0; for(int i=0;i<n;i++) if(a[i]%2==0) r++;','int r=a[n-1];','int r=a[n-1]-a[0];','int r=0; for(int i=0;i<n;i++) if(a[i]>=6) r++;','int r=0; for(int i=0;i<n;i++) r+=a[i]*a[i];'];
  function code(slug,i,j) {
    const js='const a = '+jsBuild[i]+';\n', py='a = '+pyBuild[i]+'\n', php='<?php\n$a = '+phpBuild[i]+';\n',cs='using System;\nusing System.Linq;\nvar a = '+csBuild[i]+';\n';
    switch(slug) {
      case 'alapok': return ['Python – kézi nyomkövetés',py+'print("Adatsor:", a)\nprint("Eredmény:", '+pyCalc[j]+')'];
      case 'python': return ['Python',py+'eredmeny = '+pyCalc[j]+'\nprint(eredmeny)'];
      case 'python-web': return ['app.py – Flask, majd flask --app app run','from flask import Flask, jsonify\napp = Flask(__name__)\n\n@app.get("/jelentes")\ndef jelentes():\n    '+py.trimEnd().replaceAll('\n','\n    ')+'\n    return jsonify(eredmeny='+pyCalc[j]+')'];
      case 'javascript': return ['JavaScript',js+'console.log('+jsCalc[j]+');'];
      case 'typescript': return ['TypeScript','function meres(a: number[]): number {\n  return '+jsCalc[j]+';\n}\n'+js+'console.log(meres(a));'];
      case 'nodejs': return ['server.js – node server.js','const http = require("node:http");\n'+js+'http.createServer((req,res) => {\n  if (req.url !== "/jelentes") { res.writeHead(404); res.end(); return; }\n  res.writeHead(200, {"Content-Type":"application/json"});\n  res.end(JSON.stringify({eredmeny: '+jsCalc[j]+'}));\n}).listen(3000, "127.0.0.1");'];
      case 'php': return ['PHP 8',php+'echo '+phpCalc[j]+';'];
      case 'php-api': return ['jelentes.php – PHP 8',php+'header("Content-Type: application/json");\necho json_encode(["eredmeny" => '+phpCalc[j]+']);'];
      case 'csharp': return ['Program.cs – .NET',cs+'var eredmeny = '+csCalc[j]+';\nConsole.WriteLine(eredmeny);'];
      case 'console': return ['Program.cs – konzolos jelentés',cs+'Console.WriteLine("{0,-20} {1,6}", "'+tasks[j][0]+'", '+csCalc[j]+');'];
      case 'java': return ['Main.java','import java.util.Arrays;\nimport java.util.stream.IntStream;\n\npublic class Main {\n    public static void main(String[] args) {\n        int[] a = '+javaBuild[i].replace(/^=/,'')+';\n        System.out.println('+javaCalc[j]+');\n    }\n}'];
      case 'c': return ['main.c','#include <stdio.h>\n\nint main() {\n    '+(cBuild[i]+'\n'+cCalc[j]).replaceAll('\n','\n    ')+'\n    printf("%d\\n", r);\n    return 0;\n}'];
    }
  }
  const contexts = {
    alapok:'Először papíron kövesd az értékeket, majd ellenőrizd a két kiírást.',
    python:'Futtasd Pythonban. Az előkészített listát és az abból számított értéket külön is kiírhatod.',
    javascript:'A konzolban ellenőrizd a tömböt a feldolgozás előtt és után.',
    typescript:'A függvény számtömböt fogad és számot ad vissza. Vizsgáld meg, hol jelezne hibát egy szöveges elem.',
    java:'A Main.java programban a tömb előállítása után következik a számítás. A konzol utolsó sora a jelentés értéke.',
    c:'A tömb mellett az n tárolja az érvényes elemek számát. A példa nem üres adatsort dolgoz fel.',
    csharp:'A LINQ és a tömbműveletek eredményét a konzolon hasonlíthatod össze a kézi számítással.',
    console:'Az első oszlop a számítás neve, a második a jobbra igazított eredmény. Ellenőrizd a jelentés mindkét mezőjét.',
    php:'A PHP-t futtatva a kimeneten a feldolgozott tömbből számított szám jelenik meg.',
    nodejs:'Indítsd el a szervert, majd nyisd meg a http://127.0.0.1:3000/jelentes címet. Az eredmeny mezőt figyeld.',
    'python-web':'Indítsd el a Flask-alkalmazást és kérd le a /jelentes végpontot. Az eredmeny mezőben JSON-szám érkezik.',
    'php-api':'A PHP-szerveren a jelentes.php útvonalat kérd le. Ellenőrizd a JSON tartalomtípust és az eredmeny mezőt.'
  };
  for (const [slug,context] of Object.entries(contexts)) {
    const lessons = [];
    builders.forEach(([topic,scenario,concept,values],i) => tasks.forEach(([metric,goal,compute,why],j) => {
      const [label,source] = code(slug,i,j), result=compute(values), changed=[...values,6], after=compute(changed);
      const quizOptions=[String(result),String(result+1),String(result-1)];
      const rotate=(i+j)%3;quizOptions.push(...quizOptions.splice(0,rotate));
      lessons.push(ka.lesson(slug+'-adat-'+(i+1)+'-'+(j+1),topic+' – '+metric,j<4?'Kezdő':'Középhaladó',12,
        scenario+' A jelentés célja: '+goal+'.',[concept,why],
        [{label,code:source,usage:scenario+' Ebben a jelentésben '+goal+' számít. '+context}],
        ['Kövesd végig az adatsor előállítását. Ellenőrző sor: '+values.join(', ')+'.',
         'Közvetlenül a számítás előtt dolgozz ezzel a bővített sorral: '+changed.join(', ')+'. Számold ki újra az eredményt, majd ellenőrizd: '+after+'.'],
        ['Mennyi az eredeti jelentésben '+goal+'?',quizOptions,quizOptions.indexOf(String(result)),values.join(', ')+' esetén '+goal+': '+result+'. '+why]));
    }));
    ka.addLessons(slug,lessons);
  }
})();
