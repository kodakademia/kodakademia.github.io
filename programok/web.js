(() => {
  const P=window.KA.programs,L=P.legacy;
  L.html=l=>{
    let s=l.code;
    const art='<svg xmlns="http://www.w3.org/2000/svg" width="120" height="72"><rect width="120" height="72" fill="navy"/><circle cx="60" cy="36" r="22" fill="gold"/></svg>';
    if(/<img\b/.test(s))s=s.replace(/src="[^"]+"/g,'src="minta.svg"').replace(/alt="[^"]*"/g,'alt="Sárga kör kék háttér előtt"');
    if(l.id==='html-b-14')s='<button id="lejatszas">Mintahang lejátszása</button><audio controls></audio><script>\ndocument.querySelector("button").onclick=async()=>{const ctx=new AudioContext(); await ctx.resume(); const o=ctx.createOscillator(); const cel=ctx.createMediaStreamDestination(); o.connect(cel); const a=document.querySelector("audio"); a.srcObject=cel.stream; await a.play(); o.start(); o.stop(ctx.currentTime+0.5);};\n</script>';
    if(l.id==='html-b-15')s='<ul id="lista"></ul><template id="sor"><li></li></template><script>\nfor(const nev of ["Anna","Bori"]){const sor=document.querySelector("#sor").content.cloneNode(true);sor.querySelector("li").textContent=nev;document.querySelector("#lista").append(sor);}\n</script>';
    if(l.id==='html-b-16')s='<iframe title="Jegyzet előnézete" sandbox srcdoc="<h2>Első jegyzet</h2><p>Elkülönített tartalom.</p>"></iframe>';
    if(l.id==='html-b-17')s='<main><h1>Érvényes menetrend</h1><ol><li>Indulás</li><li>Érkezés</li></ol></main>';
    if(/<head>|^<meta/.test(s)&&!/^<!doctype/i.test(s))s='<!doctype html><html lang="hu">'+(s.startsWith('<head>')?s:'<head><meta charset="utf-8">'+s+'</head>')+'<body><h1>Tananyag</h1></body></html>';
    if(l.id==='html-b-5')s=s.replace('href="/tananyag"','href="#tananyag"')+'<section id="tananyag"><h2>Tananyagok</h2></section><section id="quiz">Kvíz</section>';
    if(l.id==='html-b-13')s+='<main id="tartalom"><h1>Jegyzet</h1><p id="eredmeny"></p></main><script>document.querySelector("button").onclick=()=>document.querySelector("#eredmeny").textContent="Mentve";</script>';
    const p=P.html(l.title,s);if(s.includes('minta.svg'))p.files['minta.svg']=art;if(s.includes('jegyzet.txt'))p.files['jegyzet.txt']='Első tanulási jegyzet.';return p;
  };
  L.css=l=>{
    const css=l.id==='css-b-11'?'body{font:1rem/1.5 system-ui} .kartya{border:1px solid;padding:1rem}':l.code;
    const body='<header class="fejlec hero"><h1>Heti tanulási terv</h1></header><nav class="menü"><a href="#fo">Mai lecke</a><button class="gomb">Téma váltása</button></nav><main class="layout racs"><article class="kartya box"><h2>Olvasás</h2><p id="fo">A napi jegyzeted és gyakorlófeladatod itt található.</p></article><article class="kartya box"><h2>Gyakorlás</h2><p>Próbáld átméretezni az ablakot.</p></article></main><footer>Kodakadémia</footer><script>document.querySelector("button").onclick=()=>{const d=document.documentElement;d.dataset.theme=d.dataset.theme==="dark"?"light":"dark";};</script>';
    return P.html(l.title,'<style>\n'+css+'\n</style>\n'+body);
  };
  L.javascript=l=>{
    const s=l.code,id=l.id;
    if(id==='javascript-5')return P.html(l.title,s);
    if(['javascript-10','js-b-19'].includes(id))return {run:'Node.js • node main.mjs',files:{'matek.mjs':'export const atlag = a => a.reduce((s,n)=>s+n,0)/a.length;','main.mjs':'import {atlag} from "./matek.mjs";\nconsole.log(atlag([3,5,7]));'}};
    if(['javascript-6','javascript-9','js-b-13','js-b-14','js-b-15'].includes(id)){
      const post=id==='javascript-9';return {run:'Node.js 22+ • node server.js, majd másik terminálban node kliens.js.',files:{
        'server.js':'const http=require("node:http");\nhttp.createServer(async(req,res)=>{\n  let s=""; for await(const chunk of req) s+=chunk;\n  res.setHeader("Content-Type","application/json");\n  try {const adat=s?JSON.parse(s):{cim:"Első lecke"};res.end(JSON.stringify(adat));}catch{res.writeHead(400);res.end("{}");}\n}).listen(8000,"127.0.0.1");',
        'kliens.js':'async function proba(){\n  const r=await fetch("http://127.0.0.1:8000"'+(post?', {method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({cim:"Mentett lecke"})}':'')+');\n  if(!r.ok) throw Error("HTTP "+r.status);\n  console.log(await r.json());\n}\nproba().catch(console.error);'}};
    }
    if(id==='javascript-7')return P.node('const fs=require("node:fs");\nconsole.log(fs.readFileSync(__filename,"utf8"));');
    if(id==='javascript-8')return {run:'Node.js 22+ • node --env-file=.env main.js',files:{'.env':'PORT=8000','main.js':'console.log("A szerver portja:",process.env.PORT);'}};
    if(['js-b-9','js-b-10','js-b-11','js-b-12','js-b-20','js-b-21','js-b-22','js-b-23'].includes(id)){
      const prefix='<style>.aktiv,.kesz{color:green;text-decoration:underline}</style><form><label>Név <input name="nev" required></label><button id="ment">Mentés</button></form><ul><li class="kartya">Első lecke</li></ul><output></output>';
      const js=({'js-b-11':'const form=document.querySelector("form");\n'+s.replace('console.log(adat)','document.querySelector("output").textContent=JSON.stringify(adat)'),
        'js-b-20':'const lista=["Tea","Víz"];const ul=document.querySelector("ul");\n'+s,
        'js-b-22':'const status=document.querySelector("output");\n'+s,
        'js-b-23':s+'\ndocument.querySelector("output").textContent=teendok.join(", ");\ndocument.querySelector("form").onsubmit=e=>{e.preventDefault();teendok.push(new FormData(e.target).get("nev"));ment();document.querySelector("output").textContent=teendok.join(", ");};',
        'js-b-12':s+'\ndocument.querySelector("output").textContent=JSON.stringify(vissza);',
        'js-b-21':s+'\ndocument.querySelector("output").textContent=localStorage.getItem("nev");'})[id]||s;
      return P.html(l.title,prefix+'<script>\n'+js+'\n</script>');
    }
    return P.node(s+({'js-b-1':'\nconsole.log(szamlalo,MAX);','js-b-5':'\nconsole.log(dupla,paros,osszeg);','js-b-6':'\nconsole.log(masolat);','js-b-7':'\nconsole.log(koszont(),duplaz(5));'}[id]||''));
  };
  L.typescript=l=>{
    const id=l.id;
    const replacements={'ts-b-12':'import {Termek} from "./termek";\nconst tea: Termek = {nev:"Tea"}; console.log(tea.nev);',
      'typescript-6':'const pont: number = 21;\nconsole.log(pont*2);','ts-b-10':'function hossz(s: string): number { return s.length; }\nconsole.log(hossz("alma"));',
      'ts-b-6':'const tanulo: {nev?:string} = {};\n'+l.code};
    const tails={'typescript-3':'console.log(kiir({ok:false,hiba:"Hiányzó lecke"}));','typescript-4':'console.log(a,b);','typescript-5':'console.log(isNev({nev:"Anna"}));','ts-b-1':'console.log(duplaz(kor));','ts-b-2':'const tea:Termek={nev:"Tea",ar:450};console.log(tea);','ts-b-3':'console.log(koszont("Anna"));','ts-b-4':'console.log(kiir({ok:true,adat:"Tea"}));','ts-b-5':'console.log(a);','ts-b-7':'beallit("kezdo");console.log("Kezdő szint kiválasztva");','ts-b-8':'const sz=new Szamla();sz.befizet(120);console.log(sz.ertek);','ts-b-9':'console.log(isTermek({nev:"Tea"}));'};
    const p=P.ts((replacements[id]||l.code)+'\n'+(tails[id]||''));if(id==='ts-b-12')p.files['termek.ts']='export type Termek = {nev:string};';return p;
  };
  L.jsx=l=>{
    if(l.code.includes('export default'))return P.react(l.code);
    if(l.id==='jsx-b-9')return P.react('import {useState} from "react";\nexport default function App(){\n'+l.code+'\n}');
    if(l.id==='jsx-b-10')return P.react('export default function App(){return <figure><svg width="80" height="80" aria-label="Kék kör"><circle cx="40" cy="40" r="35" fill="navy"/></svg><figcaption>Önlezáró elem JSX-ben</figcaption></figure>;}');
    const end=({'jsx-3':'lista','jsx-4':'oldal','jsx-5':'p','jsx-6':'<UI/>','jsx-b-3':'lista','jsx-b-6':'<Kartya cim="Mai lecke">JSX</Kartya>','jsx-b-7':'<Gomb/>'})[l.id]||'elem';
    return P.react(l.code+'\nexport default function App(){ return '+end+'; }');
  };
  L.react=l=>{
    if(l.code.includes('export default'))return P.react(l.code);
    const h='import {useState,useEffect,useContext,createContext,useMemo} from "react";\n';
    const count='export default function App(){const [n,setN]=useState(0);return <button onClick={()=>setN(x=>x+1)}>Pont: {n}</button>;}';
    const list='function Sor({nev,torol}){return <li>{nev} <button onClick={torol}>Törlés</button></li>;}\nexport default function App(){const [nevek,set]=useState(["Anna","Bori"]);return <ul>{nevek.map(n=><Sor key={n} nev={n} torol={()=>set(nevek.filter(v=>v!==n))}/>)}</ul>;}';
    const form='export default function App(){const [s,set]=useState("");const [u,msg]=useState("");return <form onSubmit={e=>{e.preventDefault();msg(s.includes("@")?"Elfogadva":"Hiányzó @");}}><label>E-mail <input value={s} onChange={e=>set(e.target.value)}/></label><button>Ellenőrzés</button><output>{u}</output></form>;}';
    const theme='const Tema=createContext("világos");\nfunction Felirat(){return <p>Téma: {useContext(Tema)}</p>;}\nexport default function App(){const [t,set]=useState("sötét");return <Tema.Provider value={t}><Felirat/><button onClick={()=>set(t==="sötét"?"világos":"sötét")}>Váltás</button></Tema.Provider>;}';
    const timer='export default function App(){const [n,set]=useState(0);useEffect(()=>{const id=setInterval(()=>set(v=>v+1),1000);return ()=>clearInterval(id);},[]);return <output>{n} másodperc</output>;}';
    let src=({'react-2':count,'react-3':form,'react-4':list,'react-5':timer,'react-7':theme,'react-8':form,'react-b-2':count,'react-b-3':timer,'react-b-5':form,'react-b-6':list,'react-b-7':theme,
      'react-b-4':'export default function App(){const [adat,set]=useState(null);useEffect(()=>{fetch("/adat.json").then(r=>r.json()).then(set).catch(()=>set({nev:"Betöltési hiba"}));},[]);return <p>{adat?adat.nev:"Betöltés…"}</p>;}',
      'react-b-8':l.code+'\nexport default function App(){const {n,novel}=useSzamlalo(0);return <button onClick={novel}>{n}</button>;}',
      'react-b-9':'export default function App(){const [limit,set]=useState(400);const lista=useMemo(()=>[350,450,800].filter(n=>n>limit),[limit]);return <><input type="number" value={limit} onChange={e=>set(Number(e.target.value))}/><p>{lista.join(", ")}</p></>;}',
      'react-b-10':'import {HashRouter,Link,Routes,Route} from "react-router-dom";\nexport default function App(){return <HashRouter><Link to="/">Kezdőlap</Link> · <Link to="/lecke">Lecke</Link><Routes><Route path="/" element={<p>Kezdőlap</p>}/><Route path="/lecke" element={<p>Mai lecke</p>}/></Routes></HashRouter>;}',
      'react-b-11':'export default function App(){const [s,set]=useState("");return <><button onClick={()=>set("Mentve")}>Mentés</button><output>{s}</output></>;}',
      'react-b-12':'export default function App(){const [s,set]=useState(()=>localStorage.getItem("jegyzet")||"");return <label>Mai jegyzet <textarea value={s} onChange={e=>{set(e.target.value);localStorage.setItem("jegyzet",e.target.value);}}/></label>;}'
    })[l.id]||'import Lista from "./Lista";\nexport default function App(){return <main><h1>Mai feladatok</h1><Lista/></main>;}';
    const p=P.react(h+src);if(src.includes('"./Lista"'))p.files['Lista.jsx']='import React from "react";\nexport default function Lista(){return <ul>{["Olvasás","Gyakorlás"].map(n=><li key={n}>{n}</li>)}</ul>;}';
    if(l.id==='react-b-4')p.files['public/adat.json']='{"nev":"Első lecke"}';
    if(l.id==='react-b-10'){const pkg=JSON.parse(p.files['package.json']);pkg.dependencies['react-router-dom']='6.30.1';p.files['package.json']=P.json(pkg);}
    return p;
  };
})();
