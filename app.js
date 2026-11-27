(()=>{
'use strict';
const COURSES=window.COURSES||[];
const KA=window.KA||{tracks:[],courseTrack:{},extraLessons:{},extraCourses:{}};
const mergeExtras=c=>{const extra=KA.extraLessons&&KA.extraLessons[c.slug];if(extra)extra.forEach(l=>{if(!c.lessons.some(x=>x.id===l.id))c.lessons.push(l)})};
COURSES.forEach(mergeExtras);
Object.values(KA.extraCourses||{}).forEach(c=>{if(!COURSES.some(x=>x.slug===c.slug))COURSES.push(c)});
COURSES.forEach(mergeExtras);
const TRACKS=KA.tracks||[];
const trackOf=c=>(KA.courseTrack&&KA.courseTrack[c.slug])||'web';
const trackInfo=id=>TRACKS.find(t=>t.id===id)||{id,title:id,icon:'•',desc:'',tagline:''};
const courseTitle=c=>c.slug==='security'?'Kiberbiztonság alapok':c.slug==='security-lab'?'Biztonsági labor':c.slug==='php-api'?'PHP REST API':c.slug==='python-web'?'Python web (Flask)':c.title;
const $=s=>document.querySelector(s);
const key='kodakademia-standalone-v2';
let state={done:[],bookmarks:[],quiz:{},last:null};
try{state={...state,...JSON.parse(localStorage.getItem('kodakademia-standalone-v1')||'{}'),...JSON.parse(localStorage.getItem(key)||'{}')}}catch{}
// A korábbi JavaScript-kurzus Node-leckéinek haladását és könyvjelzőit megőrizzük.
const movedLesson=k=>KA.lessonAliases?.[k] || (typeof k==='string'?k.replace(/^javascript\/(nodejs-\d+)$/,'nodejs/$1'):k);
state.done=[...new Set((state.done||[]).map(movedLesson))];
state.bookmarks=[...new Set((state.bookmarks||[]).map(movedLesson))];
state.last=movedLesson(state.last);
state.quiz=Object.fromEntries(Object.entries(state.quiz||{}).map(([k,v])=>[movedLesson(k),v]));
const save=()=>{try{localStorage.setItem(key,JSON.stringify(state))}catch{};updateSidebar()};
const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const courseOf=s=>COURSES.find(c=>c.slug===s);
const lkey=(c,l)=>`${c.slug}/${l.id}`;
const total=()=>COURSES.reduce((n,c)=>n+c.lessons.length,0);
const pct=c=>c.lessons.length?Math.round(100*c.lessons.filter(l=>state.done.includes(lkey(c,l))).length/c.lessons.length):0;
const nav=n=>{document.querySelectorAll('[data-nav]').forEach(el=>el.classList.toggle('active',el.dataset.nav===n))};
const meter=v=>`<div class="meter"><span style="width:${Math.max(0,Math.min(100,v))}%"></span></div>`;
const breadcrumb=s=>$('#breadcrumb').textContent=s;
const app=$('#app');
function toast(t){let el=$('#toast');el.textContent=t;el.classList.add('show');clearTimeout(toast.timer);toast.timer=setTimeout(()=>el.classList.remove('show'),2100)}
function updateSidebar(){let n=COURSES.reduce((sum,c)=>sum+c.lessons.filter(l=>state.done.includes(lkey(c,l))).length,0);let p=Math.round(n/total()*100)||0;$('#globalPercent').textContent=p+'%';$('#globalBar').style.width=p+'%'}
function courseCard(c){const t=trackInfo(trackOf(c));return `<a class="course-card" href="#/course/${c.slug}"><span class="course-icon">${c.icon}</span><h3>${esc(courseTitle(c))}</h3><p>${esc(c.description)}</p><span class="meta">${t.icon} ${esc(t.title)} • ${c.lessons.length} lecke • ${pct(c)}% kész</span>${meter(pct(c))}</a>`}
function home(){nav('home');breadcrumb('Áttekintés');let done=state.done.length;let track=COURSES.filter(c=>c.lessons.some(l=>state.done.includes(lkey(c,l)))).length;let resume=state.last?`<a href="#/lesson/${state.last}" class="btn btn-outline">↗ Folytatás, ahol abbahagytad</a>`:'';
app.innerHTML=`<section class="hero"><p class="eyebrow">✦ A tudás itt kezdődik</p><h1>Tanulj <span class="gradient">programozni</span> magyarul. A nulláról a saját projektjeidig.</h1><p>${total()} részletes, lépésről lépésre magyarázott lecke öt tanulási ágban. Kódpéldák, gyakorlatok, kvízek, mentett haladás és egy belső tanulótárs, amely a tananyagból válaszol. Előfizetés és regisztráció nélkül.</p><div class="actions"><a class="btn btn-primary" href="#/course/alapok">🚀 Kezdd a nulláról</a><a class="btn btn-ghost" href="#/courses">Összes tananyag →</a><a class="btn btn-outline" href="#/ai">🤖 Kérdezz az AI-tól</a>${resume}</div></section>
<div class="stats"><div class="stat"><strong>${COURSES.length}</strong><span>Kurzus ${TRACKS.length} ágban</span></div><div class="stat"><strong>${total()}</strong><span>Részletes lecke</span></div><div class="stat"><strong>${done}</strong><span>Elvégzett lecke · ${track} kurzus érintve</span></div></div>
<div class="section-head"><div><h2>Így indulj el</h2><p>Teljesen kezdőként ezt a sorrendet ajánljuk.</p></div><a href="#/path">Teljes útvonal →</a></div>
<div class="grid-courses">${['alapok','html','css','javascript','python','csharp'].map(s=>courseOf(s)).filter(Boolean).map(courseCard).join('')}</div>
<div class="section-head"><div><h2>Válassz irányt</h2><p>Öt ág, saját kurzusoldallal: webfejlesztés, Python, PHP, etikus hackelés és asztali alkalmazások.</p></div><a href="#/courses">Felfedezés →</a></div>
<div class="branch-grid">${TRACKS.map(t=>{let list=COURSES.filter(c=>trackOf(c)===t.id);return `<a class="branch-card" href="#/track/${t.id}"><span class="branch-ico">${t.icon}</span><h3>${esc(t.title)}</h3><p>${esc(t.desc)}</p><span class="meta">${list.length} kurzus • ${list.reduce((n,c)=>n+c.lessons.length,0)} lecke</span></a>`}).join('')}</div>
<div class="info-box"><h3>💡 Hogyan működik a tanulás?</h3>Olvasd el a leckét, nézd át a kódot, oldd meg saját gépen a feladatokat, majd válaszolj a kvízkérdésre. A <strong>„Lecke teljesítve”</strong> gombbal mentheted az eredményt. A HTML/CSS/JavaScript kódokat a Kódjátszótérben kipróbálhatod. Elakadsz? Nyisd meg az <a href="#/ai" style="color:var(--cyan)">AI tanulótársat</a>, és kérdezz a tananyagból.</div>`;}

let filter='Mind',search='',trackFilter='';
const CATS=['Mind','Alapok','Webfejlesztés','Backend','Programozás','Asztali alkalmazások','Kiberbiztonság'];
function catalog(){nav('courses');breadcrumb('Tananyagok');
let chips=[{id:'all',title:'Minden ág',icon:'✳️'}].concat(TRACKS);
app.innerHTML=`<p class="eyebrow">TANANYAGTÁR</p><h1 class="page-title">Minden kurzus egy helyen</h1><p class="muted">${COURSES.length} kurzus, ${total()} lecke ${TRACKS.length} ágban, kezdőtől haladó szintig.</p><div class="branch-row">${chips.map(b=>`<button class="branch-chip ${((b.id==='all'&&!trackFilter)||b.id===trackFilter)?'active':''}" data-branch="${b.id}"><span>${b.icon}</span>${esc(b.title)} <em>${b.id==='all'?COURSES.length:COURSES.filter(c=>trackOf(c)===b.id).length}</em></button>`).join('')}</div><div class="toolbar"><input class="search" id="courseSearch" value="${esc(search)}" placeholder="🔎 Keress kurzust, leckét vagy témát…" aria-label="Kurzus keresése" /><div id="filters">${CATS.map(x=>`<button class="filter ${x===filter?'active':''}" data-filter="${x}">${x}</button>`).join('')}</div></div><div id="branchInfo"></div><div id="catalogResults" class="grid-courses"></div>`;
$('#courseSearch').addEventListener('input',e=>{search=e.target.value;renderFiltered()});
$('#filters').addEventListener('click',e=>{let b=e.target.closest('[data-filter]');if(b){filter=b.dataset.filter;$('#filters').querySelectorAll('button').forEach(x=>x.classList.toggle('active',x===b));renderFiltered()}});
$('.branch-row').addEventListener('click',e=>{let b=e.target.closest('[data-branch]');if(!b)return;trackFilter=b.dataset.branch==='all'?'':b.dataset.branch;document.querySelectorAll('[data-branch]').forEach(x=>x.classList.toggle('active',x===b));renderFiltered()});
renderFiltered();}
function renderFiltered(){let q=norm(search);let arr=COURSES.filter(c=>(filter==='Mind'||c.category===filter)&&(!trackFilter||trackOf(c)===trackFilter)&&(!q||norm(c.title+' '+c.description+' '+c.lessons.map(l=>l.title+' '+l.overview).join(' ')).includes(q)));let bi=trackFilter?trackInfo(trackFilter):null;
$('#branchInfo').innerHTML=bi?`<div class="branch-intro"><span>${bi.icon}</span><div><strong>${esc(bi.title)}</strong><p>${esc(bi.desc)}</p></div><a class="btn btn-ghost small" href="#/track/${bi.id}">Ág oldala →</a></div>`:'';
$('#catalogResults').innerHTML=arr.length?arr.map(courseCard).join(''):'<p class="muted">Nincs találat. Próbálj másik keresést, vagy nyisd meg az AI tanulótársat.</p>'}

/* ---------- Ág (track) oldal ---------- */
function trackPage(id){const t=trackInfo(id);nav('track-'+id);breadcrumb(t.title);if(!TRACKS.some(x=>x.id===id))return notFound();
const list=COURSES.filter(c=>trackOf(c)===id).sort((a,b)=>t.courses.indexOf(a.slug)-t.courses.indexOf(b.slug));
const lessons=list.reduce((n,c)=>n+c.lessons.length,0);
const doneCount=list.reduce((n,c)=>n+c.lessons.filter(l=>state.done.includes(lkey(c,l))).length,0);
app.innerHTML=`<div class="breadcrumbs"><a href="#/courses">Tananyagok</a> / ${esc(t.title)}</div>
<section class="detail-head"><span class="course-icon">${t.icon}</span><div><span class="pill">Kurzuság • ${list.length} kurzus • ${lessons} lecke</span><h1>${esc(t.title)}</h1><p class="muted" style="margin:0">${esc(t.tagline||t.desc)}</p><p class="muted" style="margin:9px 0">${doneCount} / ${lessons} lecke elvégezve</p>${meter(lessons?Math.round(100*doneCount/lessons):0)}</div></section>
<div class="setup-box"><h3>🧭 Hogyan tanulj ebben az ágban?</h3><p>${esc(t.desc)}</p><p class="muted">Haladj a kurzusok sorrendjében, és minden leckénél oldd meg a gyakorlatot. Az ág kurzusaiból bármikor kérdezhetsz az <a href="#/ai" style="color:var(--cyan)">AI tanulótársnál</a>.</p></div>
<div class="section-head"><div><h2>Kurzusok ebben az ágban</h2><p>Kattints a kurzusra a teljes leckesorhoz.</p></div></div>
${id==='web'?`<div class="section-head"><h2>Frontend</h2></div><div class="grid-courses">${list.filter(c=>!['nodejs','xampp'].includes(c.slug)).map(courseCard).join('')}</div><div class="section-head"><div><h2>Backend</h2><p>A Node.js server.js fájlt futtat, a PHP-t XAMPP alatt az Apache szolgálja ki. Mindkettőnek saját API-leckéi vannak.</p></div></div><div class="grid-courses">${list.filter(c=>['nodejs','xampp'].includes(c.slug)).map(courseCard).join('')}</div>`:`<div class="grid-courses">${list.map(courseCard).join('')}</div>`}
<div class="section-head"><div><h2>Leckék sorrendben</h2><p>Ez a javasolt haladási sorrend az ágon belül.</p></div></div>
<div class="modules">${list.map(c=>`<section class="module"><div class="module-header"><h3>${c.icon} ${esc(courseTitle(c))}</h3><span class="pill">${c.lessons.length} lecke • ${pct(c)}%</span></div>${c.lessons.slice(0,8).map(l=>`<a class="lesson-link" href="#/lesson/${c.slug}/${l.id}"><span class="tick ${state.done.includes(lkey(c,l))?'done':''}">${state.done.includes(lkey(c,l))?'✓':'○'}</span><span>${esc(l.title)}</span><small>◷ ${l.minutes} perc</small></a>`).join('')}${c.lessons.length>8?`<a class="lesson-link" href="#/course/${c.slug}"><span class="tick">…</span><span>Még ${c.lessons.length-8} lecke a kurzusban</span><small>Megnyitás →</small></a>`:''}</section>`).join('')}</div>`;}

function detail(slug){const c=courseOf(slug);if(!c)return notFound();nav(slug);breadcrumb(courseTitle(c));
const prereqs=c.prereqs.length?c.prereqs.map(s=>`<a href="#/course/${s}" style="color:var(--cyan)">${esc(courseOf(s)?courseTitle(courseOf(s)):s)}</a>`).join(' → '):'Nincs előfeltétel';
app.innerHTML=`<div class="breadcrumbs"><a href="#/courses">Tananyagok</a> / <a href="#/track/${trackOf(c)}">${esc(trackInfo(trackOf(c)).title)}</a> / ${esc(courseTitle(c))}</div><section class="detail-head"><span class="course-icon">${c.icon}</span><div><span class="pill">${esc(c.category)}</span><h1>${esc(courseTitle(c))}</h1><p class="muted" style="margin:0">${esc(c.description)}</p><p class="muted" style="margin:9px 0">${c.lessons.length} lecke • ${pct(c)}% elkészült • Előfeltétel: ${prereqs}</p>${meter(pct(c))}</div></section>
<div class="setup-box"><h3>🧰 Hogyan kezdj hozzá?</h3><p>${esc(c.setup)}</p>${c.runtime==='local'?'<p class="muted">A programot a saját gépeden futtathatod. A böngészős felület itt csak a példákat és a magyarázatokat mutatja.</p>':''}${(c.slug==='security'||c.slug==='security-lab')?'<p class="warning">Csak saját vagy kifejezetten engedélyezett laborrendszeren végezz biztonsági teszteket.</p>':''}</div>
<div class="section-head"><div><h2>Leckék és modulok</h2><p>Haladj sorban, és jelöld teljesítettnek a leckéket.</p></div><a href="#/lesson/${slug}/${c.lessons[0].id}">Első lecke →</a></div><div class="modules">${['Kezdő','Középhaladó','Haladó'].map(level=>{let ls=c.lessons.filter(l=>l.level===level);if(!ls.length)return '';return `<section class="module"><div class="module-header"><h3>${level} szint</h3><span class="pill">${ls.length} lecke</span></div>${ls.map(l=>`<a class="lesson-link" href="#/lesson/${slug}/${l.id}"><span class="tick ${state.done.includes(lkey(c,l))?'done':''}">${state.done.includes(lkey(c,l))?'✓':'○'}</span><span>${esc(l.title)}</span><small>◷ ${l.minutes} perc</small></a>`).join('')}</section>`}).join('')}</div>`}

function programBlock(project){
  const files=Object.entries(project.files);
  return `<details class="note"><summary><strong>Teljes program · ${files.length} fájl</strong></summary><p>${esc(project.run)}</p><button id="projektZip" class="btn btn-outline">Program letöltése (.zip)</button>${files.map(([name,code],i)=>`<div class="code-wrap"><div class="code-head"><span>${esc(name)}</span><button class="copy-btn" data-copy="program" data-i="${i}">Másolás</button></div><pre><code>${esc(code)}</code></pre></div>`).join('')}</details>`;
}
function blocks(c,l){const list=(l.snippets&&l.snippets.length)?l.snippets:[{label:'Példakód',code:l.code}];return list.map((s,i)=>`<div class="code-wrap"><div class="code-head"><span>${esc(s.label||('Példakód '+(i+1)))} • ${esc(c.title)}</span><button class="copy-btn" data-copy="snippet" data-i="${i}">Másolás</button></div><pre><code>${esc(s.code)}</code></pre></div><p><strong>Mikor használod, és mire jó?</strong> ${esc(s.usage || KA.snippetNotes?.[c.slug+'/'+l.id]?.[i] || l.overview)}</p>`).join('')}
function figures(l){if(!l.figures||!l.figures.length)return '';return l.figures.map(f=>`<figure class="fig"><img src="${esc(f.src)}" alt="${esc(f.alt)}" width="${f.w||720}" height="${f.h||300}" loading="lazy"><figcaption>${esc(f.caption||f.alt)}</figcaption></figure>`).join('')}
function lesson(slug,id){const target=movedLesson(slug+'/'+id);if(target!==slug+'/'+id){location.replace('#/lesson/'+target);return;}let c=courseOf(slug),l=c&&c.lessons.find(x=>x.id===id);if(!l)return notFound();nav(slug);breadcrumb(courseTitle(c)+' / '+l.title);const project=l.fullProject || KA.programs.get(c,l);let k=lkey(c,l);state.last=k;save();let index=c.lessons.indexOf(l);let before=c.lessons[index-1],next=c.lessons[index+1];
app.innerHTML=`<div class="breadcrumbs"><a href="#/courses">Tananyagok</a> / <a href="#/track/${trackOf(c)}">${esc(trackInfo(trackOf(c)).title)}</a> / <a href="#/course/${slug}">${esc(courseTitle(c))}</a> / ${esc(l.title)}</div><div class="lesson-layout"><div class="lesson-body"><article class="lesson-content"><div style="display:flex;justify-content:space-between;gap:8px;align-items:center"><span class="pill">${l.level} • ◷ ${l.minutes} perc</span><button class="btn btn-ghost small" id="bookmarkBtn">${state.bookmarks.includes(k)?'★ Könyvjelzőzve':'☆ Könyvjelző'}</button></div><h1>${esc(l.title)}</h1><p class="lead">${esc(l.overview)}</p><h2>📚 Amit értened kell</h2>${l.concepts.map((s,i)=>`<div class="concept"><strong>${i+1}.</strong> ${esc(s)}</div>`).join('')}<div class="note">💡 <strong>Tanulási tipp:</strong> Ne csak olvasd! Mondd el a fogalmakat a saját szavaiddal, majd módosítsd a példakódot. Ha elakadsz, lépésenként ellenőrizd az értékeket, vagy kérdezd meg az <a href="#/ai" data-ask="Magyarázd el egyszerűbben: ${esc(l.title)}" style="color:var(--cyan)">AI tanulótársat</a>.</div><h2>💻 Kódpélda és értelmezés</h2><p class="muted">Nézd végig sorról sorra: melyik adat kerül be, milyen művelet történik, és mi lesz az eredmény? Másold ki a kódot, majd próbáld ki a saját fejlesztői környezetedben.</p>${programBlock(project)}${blocks(c,l)}${figures(l)}<p class="muted">${c.slug==='java'?'A teljes Main.java példát a <a href="#/playground">Kódjátszótér</a> Java módjában futtathatod.':c.slug==='c'?'A teljes példát a <a href="#/playground">Kódjátszótér</a> C (alapok) módjában próbálhatod ki.':c.runtime==='browser'?'A HTML/CSS/JavaScript példákkal a Kódjátszótérben is kísérletezhetsz.':'A kód futtatásához használd a kurzus elején leírt helyi eszközöket. A weboldal nem futtat távoli C#, Python, PHP vagy WPF kódot.'}</p><h2>🛠️ Gyakorlófeladatok</h2><ol class="task-list">${l.exercise.map(x=>`<li>${esc(x)}</li>`).join('')}</ol><div class="note">🧪 <strong>Extra kihívás:</strong> írj a saját megoldásodhoz három tesztesetet: egy szokásosat, egy szélsőértéket és egy hibás bemenetet. Röviden dokumentáld, mit vársz mindegyiknél.</div></article><section class="quiz"><h3>🧠 Tudásellenőrző kvíz</h3><p>${esc(l.quiz.question)}</p><div class="quiz-options">${l.quiz.options.map((o,i)=>`<button class="option" data-answer="${i}"><span>${['A','B','C','D','E'][i]||i+1}.</span> ${esc(o)}</button>`).join('')}</div><div class="quiz-result" id="quizResult"></div></section><div class="lesson-bottom"><a class="btn btn-ghost" href="${before?'#/lesson/'+slug+'/'+before.id:'#/course/'+slug}">← ${before?'Előző lecke':'Kurzus'}</a><button class="btn ${state.done.includes(k)?'btn-ghost':'btn-primary'}" id="completeBtn">${state.done.includes(k)?'✓ Teljesítve • Visszavonás':'✓ Lecke teljesítve'}</button>${next?`<a class="btn btn-outline" href="#/lesson/${slug}/${next.id}">Következő →</a>`:`<a class="btn btn-outline" href="#/course/${slug}">Kurzus vége →</a>`}</div></div><aside class="lesson-side"><h3>${c.icon} ${esc(courseTitle(c))}</h3><p class="muted" style="font-size:12px;margin-top:0">${pct(c)}% kész</p>${meter(pct(c))}<div style="margin-top:13px">${c.lessons.map(x=>`<a class="lesson-link ${x.id===id?'current':''}" href="#/lesson/${slug}/${x.id}"><span class="tick ${state.done.includes(lkey(c,x))?'done':''}">${state.done.includes(lkey(c,x))?'✓':'○'}</span><span>${esc(x.title)}</span></a>`).join('')}</div></aside></div>`;
$('#projektZip').addEventListener('click',()=>{
  const url=URL.createObjectURL(KA.programs.archive({...project.files,'INDITAS.txt':project.run+'\n'}));
  const a=document.createElement('a');a.href=url;a.download=l.id+'.zip';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
});
$('#bookmarkBtn').addEventListener('click',()=>{state.bookmarks=state.bookmarks.includes(k)?state.bookmarks.filter(x=>x!==k):[...state.bookmarks,k];save();$('#bookmarkBtn').textContent=state.bookmarks.includes(k)?'★ Könyvjelzőzve':'☆ Könyvjelző';toast('Könyvjelző mentve')});
$('#completeBtn').addEventListener('click',()=>{state.done=state.done.includes(k)?state.done.filter(x=>x!==k):[...state.done,k];save();toast(state.done.includes(k)?'Lecke teljesítve! 🎉':'Teljesítés visszavonva');lesson(slug,id)});
$('.quiz-options').addEventListener('click',e=>{let b=e.target.closest('[data-answer]');if(!b)return;let i=Number(b.dataset.answer),ok=i===l.quiz.answer;document.querySelectorAll('.quiz-options button').forEach(x=>{x.disabled=true;x.classList.toggle('correct',Number(x.dataset.answer)===l.quiz.answer);x.classList.toggle('wrong',x===b&&!ok)});$('#quizResult').textContent=(ok?'✅ Helyes! ':'❌ Nem egészen. ')+l.quiz.explain;if(ok){state.quiz[k]=Math.max(1,state.quiz[k]||0);save()}});
document.querySelectorAll('[data-copy]').forEach(b=>b.addEventListener('click',()=>{if(b.dataset.copy==='program'){copy(Object.values(project.files)[Number(b.dataset.i)]);return;}const list=(l.snippets&&l.snippets.length)?l.snippets:[{code:l.code}];copy(list[Number(b.dataset.i||0)].code)}));}

function path(){nav('path');breadcrumb('Tanulási útvonal');let plans=[['Webfejlesztés',['alapok','terminal','html','css','javascript','typescript','jsx','react']],['Python ág',['alapok','terminal','python','python-web']],['PHP ág',['alapok','terminal','html','php','php-api']],['Etikus hackelés és védelem',['alapok','terminal','html','javascript','python','security','security-lab']],['Java programozás',['alapok','java']],['C programozás',['alapok','c']],['Windowsos alkalmazások',['alapok','csharp','console','wpf']]];app.innerHTML=`<p class="eyebrow">MERRE INDULJ?</p><h1 class="page-title">Tanulási útvonalak</h1><p class="muted">Nem kell mindent egyszerre megtanulnod. Válassz célt, és építsd fel a tudást lépésről lépésre.</p>${plans.map(([title,slugs])=>`<div class="section-head"><div><h2>${esc(title)}</h2><p>A javasolt sorrend a fontos előfeltételekre épül.</p></div></div>${slugs.map((slug,i)=>{let c=courseOf(slug);if(!c)return '';return `<div class="path-item"><span class="path-num">${i+1}</span><div><h3>${c.icon} ${esc(courseTitle(c))} <span class="pill">${pct(c)}%</span></h3><p>${esc(c.description)}</p>${meter(pct(c))}</div><a class="btn btn-ghost small" href="#/course/${slug}">Megnyitás →</a></div>`}).join('')}`).join('')}`;}

function bookmarks(){nav('bookmarks');breadcrumb('Könyvjelzők');let links=state.bookmarks.flatMap(k=>{let [slug,id]=k.split('/');let c=courseOf(slug),l=c&&c.lessons.find(x=>x.id===id);return l?[`<a class="lesson-link" href="#/lesson/${slug}/${id}"><span class="tick">★</span><span>${esc(courseTitle(c))} / ${esc(l.title)}</span><small>Megnyitás →</small></a>`]:[]});app.innerHTML=`<p class="eyebrow">MENTETT LECKÉK</p><h1 class="page-title">Könyvjelzők</h1><p class="muted">Azokat a leckéket találod itt, amelyeket későbbre elmentettél.</p><section class="module">${links.length?links.join(''):'<p class="muted" style="padding:20px">Még nincs könyvjelződ. Egy leckén belül kattints a csillagra.</p>'}</section>`;}

const templates={html:'<h1>Helló, KódAkadémia!</h1>\n<p>Írd át a szöveget, és nézd meg a változást.</p>\n<button id="gomb">Kattints!</button>\n<p id="eredmeny"></p>',css:'body { font-family: system-ui; padding: 24px; color: #223; }\nh1 { color: rebeccapurple; }\nbutton { background: #754ced; border: 0; color: white; border-radius: 8px; padding: 12px 18px; cursor: pointer; }',js:'document.querySelector("#gomb").addEventListener("click", () => {\n  document.querySelector("#eredmeny").textContent = "Sikerült! 🎉";\n});'};
const consoleTemplates = {
  python: 'for nev in ["Anna", "Bence"]:\n    print("Szia,", nev)',
  c: '#include <stdio.h>\n\nint main() {\n    for (int i = 1; i <= 3; i++) {\n        printf("%d\\n", i);\n    }\n    return 0;\n}'
};
let stopPlayground = () => {};
function playground() {
  nav('playground');
  breadcrumb('Kódjátszótér');
  const drafts = {...templates, ...consoleTemplates};
  const inputs = {python: '', c: ''};
  app.innerHTML = `<h1 class="page-title">Kódjátszótér</h1>
    <label for="playLanguage">Nyelv</label>
    <select id="playLanguage" class="btn btn-ghost">
      <option value="web">Web (HTML, CSS, JavaScript)</option>
      <option value="python">Python 3</option><option value="c">C (alapok)</option>
    </select>
    <p id="playHint" class="muted"></p>
    <div class="actions"><button class="btn btn-primary" id="runBtn">▶ Futtatás</button>
    <button class="btn btn-ghost" id="stopBtn" hidden>Leállítás</button>
    <button class="btn btn-ghost" id="resetEditor">Példa visszaállítása</button></div>
    <div id="workspace"></div>`;
  const selector = $('#playLanguage');
  const labs = createPracticeLabs(selector);
  const labHost = document.createElement('div');
  $('#workspace').after(labHost);
  const editors = {html:'editorHtml', css:'editorCss', js:'editorJs'};
  let language = 'web', worker, timer;
  function stop() {
    labs.stop();
    clearTimeout(timer);
    if (worker) worker.terminate();
    worker = null;
    $('#stopBtn').hidden = true;
  }
  stopPlayground = stop;
  function draw() {
    const lab = labs.has(language);
    $('#runBtn').parentElement.hidden = lab;
    $('#runBtn').parentElement.style.display = lab ? 'none' : '';
    $('#workspace').hidden = lab;
    labHost.hidden = !lab;
    if (lab) {
      $('#playHint').textContent = '';
      labs.show(language, labHost);
      return;
    }
    if (language === 'web') {
      $('#playHint').textContent = 'Szerkeszd a három fájlt, majd futtasd az oldalt az elkülönített előnézetben.';
      $('#workspace').innerHTML = `<div class="editor-grid"><div class="playgrid"><section class="editor-panel"><h3>🌐 HTML</h3><textarea spellcheck="false" id="editorHtml" aria-label="HTML kód"></textarea></section><section class="editor-panel"><h3>🎨 CSS</h3><textarea spellcheck="false" id="editorCss" aria-label="CSS kód"></textarea></section><section class="editor-panel"><h3>⚡ JavaScript</h3><textarea spellcheck="false" id="editorJs" aria-label="JavaScript kód"></textarea></section></div><section class="editor-panel"><h3>👁 Élő előnézet</h3><iframe id="previewFrame" sandbox="allow-scripts" title="A HTML CSS JavaScript kód előnézete"></iframe></section></div>`;
      for (const [key,id] of Object.entries(editors)) $('#'+id).value = drafts[key];
      run();
    } else {
      const python = language === 'python';
      $('#playHint').textContent = python ? 'Python 3 alapgyakorlatok Skulpt értelmezővel. Az input() soronként olvas a bemenetből.' : 'C alapgyakorlatok JSCPP értelmezővel. A teljes C szabvány és a külső könyvtárak helyi fordítót igényelnek.';
      $('#workspace').innerHTML = `<div class="editor-grid"><section class="editor-panel"><h3><label for="sourceCode">${python?'main.py':'main.c'}</label></h3>
      <textarea id="sourceCode" spellcheck="false"></textarea><h3><label for="programInput">Bemenet</label></h3><textarea id="programInput" rows="3"></textarea></section>
      <section class="editor-panel"><h3>Kimenet</h3><pre id="programOutput" role="status" style="white-space:pre-wrap;overflow-wrap:anywhere"></pre></section></div>`;
      $('#sourceCode').value = drafts[language];
      $('#programInput').value = inputs[language];
    }
  }
  function run() {
    if (language === 'web') {
      const html = $('#editorHtml').value, css = $('#editorCss').value, js = $('#editorJs').value;
      $('#previewFrame').srcdoc = '<!doctype html><meta charset="utf-8"><style>'+css.replace(/<\/style/gi,'<\\/style')+'</style>'+html+'<script>'+js.replace(/<\/script/gi,'<\\/script')+'</script>';
      return;
    }
    stop();
    const output = $('#programOutput');
    output.textContent = 'Értelmező betöltése…';
    $('#stopBtn').hidden = false;
    worker = new Worker('language-worker.js?v=1');
    timer = setTimeout(() => {stop(); output.textContent = 'A betöltés túllépte az időkeretet.'}, 45000);
    worker.onmessage = ({data}) => {
      if (data.ready) {
        clearTimeout(timer);
        output.textContent = 'Futás…';
        timer = setTimeout(() => {stop(); output.textContent = 'A program túllépte az 5 másodperces futásidőt.'}, 5000);
      } else {
        output.textContent = data.result || 'A program kimenet nélkül fejeződött be.';
        stop();
      }
    };
    worker.onerror = () => {stop(); output.textContent = 'Az értelmező betöltése vagy futtatása sikertelen.'};
    worker.postMessage({language, code:$('#sourceCode').value, input:$('#programInput').value});
  }
  selector.onchange = () => {
    stop();
    if (language === 'web') {
      for (const [key,id] of Object.entries(editors)) drafts[key] = $('#'+id).value;
    } else if (!labs.has(language)) {
      drafts[language] = $('#sourceCode').value;
      inputs[language] = $('#programInput').value;
    }
    language = selector.value;
    draw();
  };
  $('#runBtn').onclick = run;
  $('#stopBtn').onclick = () => {stop(); $('#programOutput').textContent = 'Leállítva.'};
  $('#resetEditor').onclick = () => {
    stop();
    if (language === 'web') Object.assign(drafts, templates);
    else {drafts[language] = consoleTemplates[language]; inputs[language] = ''}
    draw();
  };
  draw();
}

/* ---------------- AI tanulótárs ---------------- */
const STOP=new Set('a az egy és vagy de hogy nem is van vannak volt lesz mit mi miert hogyan hogyan kell kellene tud szamit nem nekem neki ez ezt ezek olyan mint nagyon mert akkor ha akar csak meg tudom tudok legyen lehessen valami valamit hozza ki be fel le el ra rol tol ig kezd kezdeni kezdd tanul tanulni tanulok magyar programozas programozni segitseg kerdes valasz mit csinal mit jelent'.split(' '));
function norm(s){return String(s||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/\s+/g,' ').trim()}
function words(s){return norm(s).replace(/[^a-z0-9+#._\-\s]/g,' ').split(/\s+/).filter(w=>w.length>=3&&!STOP.has(w))}
const AI_INDEX=(()=>{const idx=[];COURSES.forEach(c=>c.lessons.forEach(l=>{const hay={t:norm(l.title),o:norm(l.overview),c:norm((l.concepts||[]).join(' ')),x:norm((l.exercise||[]).join(' ')),k:norm(l.code).slice(0,1200),g:norm((l.tags||[]).join(' '))};idx.push({c,l,hay})}));return idx})();
function aiSearch(q){const ws=words(q);if(!ws.length)return [];const out=[];AI_INDEX.forEach(e=>{let s=0;ws.forEach(w=>{if(e.hay.t.includes(w))s+=9;if(e.hay.g.includes(w))s+=5;if(e.hay.c.includes(w))s+=4;if(e.hay.o.includes(w))s+=3;if(e.hay.x.includes(w))s+=2;if(e.hay.k.includes(w))s+=1});if(s>0)out.push({...e,s})});out.sort((a,b)=>b.s-a.s);return out.slice(0,5)}
function aiAnswer(q){
const qn=norm(q);const hits=aiSearch(q);const ws=words(q);
if(!qn)return {html:'<p>Írj be egy kérdést, és a tananyagból keresek rá választ.</p>',chips:[]};
if(/^(szia|hello|halo|hi|udv|jo napot|koszi|koszonom)/.test(qn))return {html:'<p>Szia! 👋 Kérdezz bátran a kurzusok anyagából. Például: „Mi az a változó?”, „Hogyan kezdjem a Pythont?”, „Mi a különbség a map és a filter között?”</p>',chips:['Hogyan kezdjem a Pythont?','Mi az a változó?','Mi a különbség a map és a filter között?']};
if(/hogyan kezd|hol kezd|mivel kezd|kezdeni/.test(qn)){
  let focus=TRACKS.find(t=>qn.includes(norm(t.id))||qn.includes(norm(t.title).split(' ')[0]))||null;
  if(!focus){if(/python/.test(qn))focus=trackInfo('python');else if(/php/.test(qn))focus=trackInfo('php');else if(/hack|biztonsag|security/.test(qn))focus=trackInfo('security');else if(/c#|csharp|asztali|wpf/.test(qn))focus=trackInfo('desktop');else focus=trackInfo('web')}
  const cs=COURSES.filter(c=>trackOf(c)===focus.id);
  return {html:`<p><strong>${esc(focus.title)}:</strong> ezt a sorrendet ajánlom.</p><ol class="ai-list">${cs.map(c=>`<li><a href="#/course/${c.slug}">${esc(courseTitle(c))}</a> – ${esc(c.description)} <span class="ai-meta">${c.lessons.length} lecke</span></li>`).join('')}</ol><p>Kezdd az első kurzus első leckéjével, és naponta 1-2 leckét vegyél. Ha elakadsz, itt kérdezz tovább.</p>`,chips:[`Mutasd a ${focus.title} első leckéjét`,'Milyen sorrendben tanuljak?','Mi az a változó?']};
}
if(!hits.length){const tops=COURSES.slice(0,4);
 return {html:`<p>Erre a kérdésre nem találtam egyértelmű leckét a tananyagban. Próbáld meg konkrétabban, például egy fogalom nevével (ciklus, tömb, .env, API, SQL, flex).</p><p>Addig ezekből indulhatsz ki:</p><ul class="ai-list">${tops.map(c=>`<li><a href="#/course/${c.slug}">${esc(courseTitle(c))}</a> <span class="ai-meta">${c.lessons.length} lecke</span></li>`).join('')}</ul>`,chips:['Mi az a ciklus?','Mi az a .env fájl?','Hogyan működik egy API?']};
}
let best=hits[0];
const concept=best.l.concepts.find(k=>ws.some(w=>norm(k).includes(w)))||best.l.concepts[0];
const concept2=best.l.concepts.find(k=>k!==concept)||'';
const rel=hits.slice(1,4).map(h=>`<li><a href="#/lesson/${h.c.slug}/${h.l.id}">${esc(h.l.title)}</a> <span class="ai-meta">${esc(courseTitle(h.c))}</span></li>`).join('');
const code=(best.l.code||'').split('\n').slice(0,12).join('\n');
let html=`<p><strong>${esc(best.l.title)}</strong> (${esc(courseTitle(best.c))}, ${esc(best.l.level)}) leckében ezt találod:</p><p>${esc(best.l.overview)}</p>`;
if(concept)html+=`<ul class="ai-list"><li>${esc(concept)}</li>${concept2?`<li>${esc(concept2)}</li>`:''}</ul>`;
if(code)html+=`<div class="ai-code"><div class="ai-code-head">Példa • ${esc(best.c.title)}</div><pre>${esc(code)}</pre></div>`;
html+=`<p><a class="btn btn-ghost small" href="#/lesson/${best.c.slug}/${best.l.id}">Megnyitom a leckét →</a></p>`;
if(rel)html+=`<p class="ai-meta" style="margin-top:10px">Kapcsolódó leckék:</p><ul class="ai-list">${rel}</ul>`;
return {html,chips:[`Magyarázd el egyszerűbben: ${best.l.title}`,`Mutass példát: ${best.l.title}`,`Mi a következő lépés a ${courseTitle(best.c)} kurzusban?`]};
}
let aiLog=[];
function ai(){nav('ai');breadcrumb('AI tanulótárs');
app.innerHTML=`<p class="eyebrow">BELSŐ TANULÓTÁRS</p><h1 class="page-title">Kérdezz a tananyagból</h1><p class="muted" style="max-width:760px">Ez a tanulótárs a kurzusok ${total()} leckéjéből dolgozik: megkeresi a kérdésedhez illő leckét, és onnan ad magyarázatot, példát és linket. Nincs szükség regisztrációra, és azonnal válaszol.</p>
<div class="ai-shell"><div class="ai-chat" id="aiChat" aria-live="polite"></div><div class="ai-suggest" id="aiSuggest"></div><form class="ai-form" id="aiForm"><input id="aiInput" class="search" placeholder="Írd be a kérdésed… pl. Mi az a tömb?" aria-label="Kérdés az AI tanulótársnak" autocomplete="off"><button class="btn btn-primary" type="submit">Kérdezek →</button></form><p class="ai-meta">A válaszok a tananyagból származnak, nem külső AI-szolgáltatásból. Tanuláshoz használd, és mindig ellenőrizd a megnyitott leckében.</p></div>`;
const chat=$('#aiChat'),suggest=$('#aiSuggest');
function bubble(role,html){const el=document.createElement('div');el.className='ai-msg '+role;el.innerHTML=html;chat.appendChild(el);chat.scrollTop=chat.scrollHeight;return el}
function chips(list){suggest.innerHTML=list.map(t=>`<button type="button" class="ai-chip">${esc(t)}</button>`).join('');suggest.querySelectorAll('.ai-chip').forEach(b=>b.addEventListener('click',()=>ask(b.textContent)))}
function ask(q){q=String(q||'').trim();if(!q)return;bubble('user',esc(q));const a=aiAnswer(q);bubble('bot',a.html);if(a.chips&&a.chips.length)chips(a.chips);$('#aiInput').value='';}
bubble('bot','<p>Szia! 👋 Én vagyok a belső tanulótárs. Kérdezz a tananyagról: fogalmakról, kódról, sorrendről vagy hibákról.</p>');
chips(['Hogyan kezdjem a Pythont?','Mi az a változó?','Mi a különbség a map és a filter között?','Mi az a .env fájl?','Hogyan működik egy API?']);
$('#aiForm').addEventListener('submit',e=>{e.preventDefault();ask($('#aiInput').value)});
const seed=window.KA_AI_SEED;if(seed){window.KA_AI_SEED='';setTimeout(()=>ask(seed),60)}
}

function notFound(){nav('');breadcrumb('Nem található');app.innerHTML='<h1 class="page-title">Ez az oldal nem található</h1><a class="btn btn-primary" href="#/">Vissza a főoldalra</a>'}
function copy(t){if(navigator.clipboard&&window.isSecureContext){navigator.clipboard.writeText(t).then(()=>toast('Kód kimásolva')).catch(()=>fallbackCopy(t))}else fallbackCopy(t)}
function fallbackCopy(t){let el=document.createElement('textarea');el.value=t;document.body.appendChild(el);el.select();try{document.execCommand('copy');toast('Kód kimásolva')}catch{toast('Jelöld ki és másold a kódot!')}el.remove()}
function route(){stopPlayground();stopPlayground=()=>{};let parts=decodeURIComponent(location.hash.replace(/^#\/?/,'')).split('/').filter(Boolean);if(parts[0]==='lesson'&&parts[1]==='javascript'&&/^nodejs-\d+$/.test(parts[2]||'')){location.replace('#/lesson/nodejs/'+parts[2]);return}if(!parts.length)home();else if(parts[0]==='courses')catalog();else if(parts[0]==='track')trackPage(parts[1]);else if(parts[0]==='course')detail(parts[1]);else if(parts[0]==='lesson')lesson(parts[1],parts[2]);else if(parts[0]==='path')path();else if(parts[0]==='bookmarks')bookmarks();else if(parts[0]==='playground')playground();else if(parts[0]==='ai')ai();else notFound();window.scrollTo({top:0,behavior:'instant'});$('#sidebar').classList.remove('open');}
$('#menuBtn').addEventListener('click',()=>$('#sidebar').classList.toggle('open'));
document.addEventListener('click',e=>{const a=e.target.closest('[data-ask]');if(a){e.preventDefault();window.KA_AI_SEED=a.dataset.ask;if(location.hash==='#/ai')ai();else location.hash='#/ai'}});
document.addEventListener('click',e=>{let b=e.target.closest('[data-open-branch]');if(!b)return;e.preventDefault();trackFilter=b.dataset.openBranch;if(location.hash==='#/courses')catalog();else location.hash='#/courses';});
$('#sidebar').addEventListener('click',e=>{if(e.target.closest('a'))$('#sidebar').classList.remove('open')});
$('#exportBtn').addEventListener('click',()=>{const blob=new Blob([JSON.stringify({version:1,exportedAt:new Date().toISOString(),...state},null,2)],{type:'application/json'});let a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='kodakademia-haladas.json';a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1000);toast('Haladás exportálva')});
window.addEventListener('hashchange',route);updateSidebar();route();
})();
