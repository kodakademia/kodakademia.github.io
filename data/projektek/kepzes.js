(() => {
  const ka=window.KA, P=ka.programs;
  ka.lessonAliases={};
  const projects=ka.projektSorok.map(([title,goal,fields,formula,unit,trial])=>{
    const vars=fields.split(',').map(pair=>{const [name,n]=pair.split('=');return [name,Number(n)]});
    const [test,expected]=trial.split(',').map(Number);
    // Kiértékelés kizárólag a leírófájl aritmetikai nyelvén.
    function calc(values){
      const tokens=formula.match(/[a-z_][a-z_0-9]*|\d+(?:\.\d+)?|[()+*,/\-]/g);
      let pos=0;
      function term(){
        const t=tokens[pos++];
        if(t==='('){const n=expr();pos++;return n;}
        if(t in values)return values[t];
        if(['min','max','ceil','floor'].includes(t)){
          pos++;const args=[expr()];while(tokens[pos]===','){pos++;args.push(expr())}pos++;return Math[t](...args);
        }
        return Number(t);
      }
      function product(){let n=term();while(['*','/'].includes(tokens[pos])){const op=tokens[pos++],v=term();n=op==='*'?n*v:n/v}return n}
      function expr(){let n=product();while(['+','-'].includes(tokens[pos])){const op=tokens[pos++],v=product();n=op==='+'?n+v:n-v}return n}
      return expr();
    }
    const values=Object.fromEntries(vars),result=calc(values);
    if(!Number.isFinite(result)||Math.abs(calc({...values,[vars[0][0]]:test})-expected)>1e-6)throw Error(title);
    return {title,goal,vars,formula,unit,test,expected,result:Number(result.toFixed(6))};
  });
  const symbols={js:['Math.min','Math.max','Math.ceil','Math.floor'],py:['min','max','math.ceil','math.floor'],cs:['Math.Min','Math.Max','Math.Ceiling','Math.Floor'],java:['Math.min','Math.max','Math.ceil','Math.floor'],c:['fmin','fmax','ceil','floor'],sql:['LEAST','GREATEST','CEILING','FLOOR']};
  const expr=(p,lang)=>p.formula.replace(/\b(min|max|ceil|floor)\b/g,m=>symbols[lang][['min','max','ceil','floor'].indexOf(m)]);
  const attrs=s=>s.replaceAll('&','&amp;').replaceAll('"','&quot;').replaceAll('<','&lt;');
  function webProject(p,slug){
    const {vars,title,unit}=p;
    const inputs=vars.map(([k,n])=>'<label>'+k.replaceAll('_',' ')+' <input required type="number" step="any" name="'+k+'" value="'+n+'"></label>').join('\n');
    const style='body { max-width: 44rem; margin: 2rem auto; padding: 0 1rem; font: 1rem/1.5 system-ui; }\nform { display: grid; gap: .7rem; }\nlabel { display: flex; justify-content: space-between; gap: 1rem; }\noutput { font-weight: bold; }';
    const read=vars.map(([k])=>'  const '+k+' = Number(data.get("'+k+'"));').join('\n');
    const logic='const form = document.querySelector("form");\nfunction frissit() {\n  if (!form.reportValidity()) return;\n  const data = new FormData(form);\n'+read+'\n  const n = '+expr(p,'js')+';\n  form.querySelector("output").textContent = Number.isFinite(n) ? n.toLocaleString("hu-HU", { maximumFractionDigits: 6 }) + " '+unit+'" : "Ellenőrizd a bemenetet.";\n}\nform.addEventListener("submit", e => { e.preventDefault(); frissit(); });\nfrissit();';
    if(['react','jsx'].includes(slug)){
      const fields=vars.map(([k,n])=>'      <label>'+k.replaceAll('_',' ')+' <input name="'+k+'" type="number" step="any" required defaultValue={'+n+'} /></label>').join('\n');
      return P.react('import { useState } from "react";\nexport default function App() {\n  const [eredmeny, mutat] = useState("'+p.result+' '+unit+'");\n  function szamol(e) {\n    e.preventDefault();\n    const data = new FormData(e.currentTarget);\n'+read+'\n    const n = '+expr(p,'js')+';\n    mutat(Number.isFinite(n) ? n.toLocaleString("hu-HU") + " '+unit+'" : "Hibás adat");\n  }\n  return <main><h1>'+title+'</h1><p>'+p.goal+'</p><form onSubmit={szamol}>\n'+fields+'\n      <button>Számítás</button> <output>{eredmeny}</output>\n  </form></main>;\n}');
    }
    if(slug==='wpf'){
      const panel='<StackPanel Margin="20"><TextBlock Text="'+attrs(title)+'" FontSize="18"/>\n'+vars.map(([k,n])=>'<TextBlock Text="'+k+'"/><TextBox x:Name="F_'+k+'" Text="'+n+'"/>').join('\n')+'\n<Button Click="Szamol" Content="Számítás"/><TextBlock x:Name="Eredmeny"/></StackPanel>';
      const proj=P.cs('<ScrollViewer>'+panel+'</ScrollViewer>',true);
      proj.files['MainWindow.xaml']=proj.files['MainWindow.xaml'].replace('<Window ','<Window x:Class="Pelda.MainWindow" ');
      proj.files['MainWindow.xaml.cs']='using System;\nusing System.Globalization;\nusing System.Windows;\nnamespace Pelda;\npublic partial class MainWindow : Window {\n    public MainWindow() { InitializeComponent(); }\n    private void Szamol(object sender, RoutedEventArgs e) {\n'+vars.map(([k])=>'        if (!double.TryParse(F_'+k+'.Text.Replace(\',\', \'.\'), NumberStyles.Float, CultureInfo.InvariantCulture, out double '+k+')) { Eredmeny.Text = "Hibás mező: '+k+'"; return; }').join('\n')+'\n        double n = '+expr(p,'cs')+';\n        Eredmeny.Text = double.IsFinite(n) ? $"{n:0.######} '+unit+'" : "Hibás bemenet";\n    }\n}';
      return proj;
    }
    return P.html(title,'<style>\n'+style+'\n</style>\n<h1>'+title+'</h1><p>'+p.goal+'</p>\n<form>\n'+inputs+'\n<button>Számítás</button><output aria-live="polite"></output>\n</form>\n<script>\n'+logic+'\n</script>');
  }
  function program(p,slug){
    const {vars,unit,title}=p,keys=vars.map(v=>v[0]),values=vars.map(v=>v[1]).join(', ');
    const js=expr(p,'js');
    if(['html','css','jsx','react','wpf','javascript'].includes(slug))return webProject(p,slug);
    if(slug==='java') return P.one('Main.java','public class Main {\n    static double szamol('+keys.map(k=>'double '+k).join(', ')+') {\n        return '+expr(p,'java')+';\n    }\n    public static void main(String[] args) {\n        System.out.println(szamol('+values+') + " '+unit+'");\n    }\n}', 'JDK 17+ • java Main.java');
    if(slug==='c')return P.one('main.c','#include <stdio.h>\n#include <math.h>\n\ndouble szamol('+keys.map(k=>'double '+k).join(', ')+') {\n    return '+expr(p,'c')+';\n}\n\nint main(void) {\n    printf("%.6g '+unit+'\\n", szamol('+values+'));\n    return 0;\n}', 'gcc -std=c11 main.c -lm -o pelda, majd ./pelda');
    if(slug==='typescript')return P.ts('function szamol('+keys.map(k=>k+': number').join(', ')+'): number {\n  return '+js+';\n}\nconsole.log(szamol('+values+'), "'+unit+'");');
    if(slug==='csharp'||slug==='console')return P.cs('using System;\nusing System.Globalization;\n\nstatic double Szamol('+keys.map(k=>'double '+k).join(', ')+') => '+expr(p,'cs')+';\n'+(slug==='console'?'double[] adat = {'+values+'};\nstring[] nev = {'+keys.map(JSON.stringify).join(', ')+'};\nfor (int i=0; i<adat.Length; i++) {\n    Console.Write($"{nev[i]} [{adat[i]}]: ");\n    string sor = Console.ReadLine() ?? "";\n    if (sor != "" && !double.TryParse(sor.Replace(\',\', \'.\'), NumberStyles.Float, CultureInfo.InvariantCulture, out adat[i])) { Console.WriteLine("Hibás szám"); return; }\n}\nvar n = Szamol('+keys.map((_,i)=>'adat['+i+']').join(', ')+');':'var n = Szamol('+values+');')+'\nConsole.WriteLine(double.IsFinite(n) ? $"{n:0.######} '+unit+'" : "Hibás bemenet");');
    if(slug==='xampp'){
      const cols=keys.map(k=>'    '+k+' DECIMAL(14,4) NOT NULL').join(',\n');
      return P.one('jelentes.sql','CREATE TEMPORARY TABLE proba (\n'+cols+'\n);\nINSERT INTO proba VALUES ('+values+');\nSELECT '+expr(p,'sql')+' AS eredmeny FROM proba;\nDROP TEMPORARY TABLE proba;','XAMPP • A phpMyAdminban válassz egy gyakorló-adatbázist, majd futtasd a teljes fájlt az SQL lapon.');
    }
    const py='import math\n\ndef szamol('+keys.join(', ')+'):\n    return '+expr(p,'py')+'\n';
    if(slug==='python-web')return P.flask('from flask import Flask, request, jsonify\n'+py+'\napp = Flask(__name__)\n\n@app.get("/")\ndef jelentes():\n    try:\n'+vars.map(([k,n])=>'        '+k+' = float(request.args.get("'+k+'", '+n+'))').join('\n')+'\n        n = szamol('+keys.join(', ')+')\n        if not math.isfinite(n): raise ValueError()\n        return jsonify(eredmeny=n, egyseg="'+unit+'")\n    except (ValueError, OverflowError, ZeroDivisionError):\n        return jsonify(hiba="Hibás bemenet"), 400');
    if(slug==='php'||slug==='php-api'){
      const php=p.formula.replace(/[a-z_][a-z_0-9]*/g,k=>keys.includes(k)?'$'+k:k);
      return P.php('<?php\n'+(slug==='php-api'?'header("Content-Type: application/json; charset=utf-8");\n':'header("Content-Type: text/plain; charset=utf-8");\n')+
        'try {\n'+vars.map(([k,n])=>'    $'+k+' = $_GET["'+k+'"] ?? '+n+';\n    if (!is_numeric($'+k+')) throw new InvalidArgumentException();').join('\n')+'\n    $n = '+php+';\n    if (!is_finite((float)$n)) throw new InvalidArgumentException();\n    '+(slug==='php-api'?'echo json_encode(["eredmeny" => $n, "egyseg" => "'+unit+'"], JSON_UNESCAPED_UNICODE);':'echo "'+title+': " . $n . " '+unit+'";')+'\n} catch (Throwable $e) {\n    http_response_code(400);\n    '+(slug==='php-api'?'echo json_encode(["hiba" => "Hibás bemenet"]);':'echo "Hibás bemenet";')+'\n}');
    }
    if(slug==='nodejs')return P.one('server.js','const http = require("node:http");\nhttp.createServer((req, res) => {\n  const q = new URL(req.url, "http://localhost").searchParams;\n'+vars.map(([k,n])=>'  const '+k+' = Number(q.get("'+k+'") ?? '+n+');').join('\n')+'\n  const n = '+js+';\n  res.writeHead(Number.isFinite(n) ? 200 : 400, {"Content-Type": "application/json; charset=utf-8"});\n  res.end(JSON.stringify(Number.isFinite(n) ? {eredmeny:n,egyseg:"'+unit+'"} : {hiba:"Hibás bemenet"}));\n}).listen(3000, "127.0.0.1");','Node.js • node server.js • http://127.0.0.1:3000/');
    return P.py(py+'\nif __name__ == "__main__":\n    print(szamol('+values+'), "'+unit+'")');
  }
  function lesson(id,title,goal,proj,trial,answer,other){
    const snippet=Object.entries(proj.files).map(([label,code])=>({label,code,usage:goal}));
    return ka.lesson(id,title,'Középhaladó',20,goal,['Indítás: '+proj.run],snippet,
      ['Indítsd el a programot a megadott mintával, majd hasonlítsd össze az eredményt a számításoddal.',trial],
      ['Melyik eredményt várod a módosított próbától?', [String(answer),String(other)],0,'A második próbában a várt eredmény: '+answer+'.'],{fullProject:proj});
  }
  for(const [slug,all] of Object.entries(ka.extraLessons)){
    const old=all.filter(l=>/-(adat|felulet|nezet|jelentes|folyam|kontroll)-\d+-\d+$/.test(l.id));
    if(!old.length)continue;
    const grouped=[];
    for(let offset=0;offset<old.length;offset+=10){
      const batch=old.slice(offset,offset+10),first=batch[0],title=first.title.split(' – ')[0];
      const stages=batch.flatMap(l=>l.snippets.map(s=>({...s,label:l.title.slice(title.length+3)+' • '+s.label})));
      const group={...first,title,snippets:stages,exercise:batch.map(l=>l.title.slice(title.length+3)+': '+l.exercise.at(-1)),fullProject:P.get({slug},first)};
      // A csővezeték minden vizsgálata egyetlen futtatható jelentésben is megjelenik.
      if(slug==='terminal')group.fullProject=P.bash(batch.map(l=>'printf "\\n%s\\n" '+JSON.stringify(l.title.slice(title.length+3))+'\n'+l.code).join('\n\n'));
      grouped.push(group);
      for(const l of batch)ka.lessonAliases[slug+'/'+l.id]=slug+'/'+first.id;
    }
    const added=slug==='terminal'?ka.parancsProjektek.map(([title,cmd,goal],i)=>{
      const proj=P.bash('export LC_ALL=C\nmunka=$(mktemp -d)\ntrap \'rm -rf -- "$munka"\' EXIT\ncd "$munka"\n'+cmd);
      return ka.lesson('terminal-program-'+(i+1),title,'Középhaladó',15,goal,['A teljes program saját ideiglenes munkamappában fut.'],[{label:'pelda.sh',code:proj.files['pelda.sh'],usage:goal}],['Futtasd Bash alatt a teljes programot.','Változtasd meg a mintaadatot, és jegyezd fel a kimenet különbségét.'],['Mi igaz a mintafuttatásra?',[goal,'A program felhasználói adatokat igényel a hálózatról.'],0,goal],{fullProject:proj});
    }):projects.map((p,i)=>{
      if((slug==='html'||slug==='css') && ka.feluletiProjektek[i]){
        const [title,goal,body,css,task,question,answer,wrong]=ka.feluletiProjektek[i];
        const proj=P.html(title,'<style>body{font:1rem/1.55 system-ui;max-width:48rem;margin:auto;padding:1rem}'+css+'</style><h1>'+title+'</h1>'+body);
        const opts=i%2?[wrong,answer]:[answer,wrong];
        return ka.lesson(slug+'-program-'+(i+1),title,'Középhaladó',15,goal,[css],[{label:'index.html',code:proj.files['index.html'],usage:goal}],[task,'Ellenőrizd a kész oldalt keskeny és széles ablakban is.'],[question,opts,opts.indexOf(answer),goal],{fullProject:proj});
      }
      if(slug==='security'||slug==='security-lab')return ka.vedelmiProjekt(slug,p,i,lesson);
      const proj=program(p,slug),trial='Az első mező ('+p.vars[0][0]+') értéke legyen '+p.test+', a többi maradjon a mintában megadott értéken. Ellenőrizd az eredményt.';
      return lesson(slug+'-program-'+(i+1),p.title,p.goal,proj,trial,p.expected+' '+p.unit,(p.expected+1)+' '+p.unit);
    });
    ka.extraLessons[slug]=all.filter(l=>!old.includes(l)).concat(grouped,added);
  }
})();
