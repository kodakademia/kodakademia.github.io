function createPracticeLabs(select) {
  const engines = {
    java:['Java','java'], javascript:['JavaScript','javascript'],typescript:['TypeScript','typescript'],
    react:['JSX és React','react'],node:['Node.js (server.js)','nodejs'],
    mysql:['MySQL – XAMPP SQL-gyakorlatok','mysql'],php:['PHP','php'],csharp:['C# és C# Console App','csharp'],bash:['Parancssor (Bash)','bash'],other:['További nyelvek (OneCompiler)','']
  };
  const modes = {sql:'SQL – kapcsolt mintatáblák','node-api':'API – Node.js útvonalak','php-api':'API – PHP végpontok',xaml:'WPF – XAML alapelőnézet'};
  for (const [key,title] of [...Object.entries(engines).map(([k,v])=>[k,v[0]]),...Object.entries(modes)]) select.add(new Option(title,key));
  const sample = 'SELECT k.id, k.cim, s.nev AS szerzo\nFROM konyvek AS k\nJOIN szerzok AS s ON s.id = k.szerzo_id\nORDER BY k.id;';
  let snapshot, worker, timer;
  const panels = new Map();
  function stop() {
    clearTimeout(timer);
    if (worker) worker.terminate();
    worker = null;
  }
  function build(mode, panel) {
    if (engines[mode]) {
      const [name,slug] = engines[mode];
      panel.innerHTML = '<p>A kódot a beágyazott OneCompiler futtatja. A futtatáshoz használd a Run gombot.</p>';
      const frame = document.createElement('iframe');
      frame.src = 'https://onecompiler.com/embed/'+slug+'?theme=dark'+(slug?'&hideLanguageSelection=true':'');
      frame.title = name+' szerkesztő'; frame.style.cssText = 'width:100%;height:65vh;min-height:390px;border:0';
      panel.append(frame);
      return;
    }
    if (mode === 'xaml') {
      panel.innerHTML = '<p>Szerkeszd a StackPanel, TextBlock, TextBox és Button elemeket. Ez elrendezési előnézet. A WPF-események futtatásához Windows szükséges.</p><section class="editor-panel"><textarea aria-label="XAML"></textarea></section><button class="btn btn-primary">Előnézet</button><section class="module"></section>';
      const source = panel.querySelector('textarea'), preview = panel.querySelector('.module');
      source.value = '<StackPanel>\n  <TextBlock Text="Mi a neved?" />\n  <TextBox Text="Anna" />\n  <Button Content="Mentés" />\n</StackPanel>';
      panel.querySelector('button').onclick = () => {
        const xml = new DOMParser().parseFromString(source.value,'application/xml');
        function convert(node) {
          const tag = {StackPanel:'div',TextBlock:'p',TextBox:'input',Button:'button'}[node.localName];
          if (typeof tag !== 'string') throw Error('Ismeretlen elem: '+node.localName);
          const el = document.createElement(tag);
          if (tag === 'div') {el.style.cssText='display:flex;gap:8px;padding:12px;flex-direction:'+(node.getAttribute('Orientation')==='Horizontal'?'row':'column');for (const child of node.children) el.append(convert(child));}
          else if (tag === 'input') el.value=node.getAttribute('Text') || '';
          else el.textContent=node.getAttribute(tag==='button'?'Content':'Text') || node.textContent;
          return el;
        }
        try {if (xml.querySelector('parsererror')) throw Error('Hibás XML.');preview.replaceChildren(convert(xml.documentElement));} catch(e){preview.textContent=e.message;}
      };
      panel.querySelector('button').click();
      return;
    }
    const sql = mode === 'sql', php = mode === 'php-api';
    const base = '/api/konyvek'+(php?'.php':'');
    panel.innerHTML = '<p>A két kapcsolt tábla: szerzok(id, nev) és konyvek(id, cim, szerzo_id). A konyvek.szerzo_id a szerzok.id értékére hivatkozik. Az SQL és a két helyi teszt-API ugyanazokat az adatokat használja a játszótér elhagyásáig.</p>'+
      (sql ? '<section class="editor-panel"><label>SQLite-parancsok<textarea spellcheck="false"></textarea></label></section>' :
      '<p>Helyi REST-szimuláció. GET: könyvek vagy szerzők listája, illetve egy rekord. POST: új könyv a lista útvonalán. PUT és DELETE: egy könyv azonosítóval. Példa: '+base+(php?'?id=1':'/1')+'.</p><label>Metódus <select><option>GET</option><option>POST</option><option>PUT</option><option>DELETE</option></select></label> <label>Útvonal <input type="text"></label><section class="editor-panel"><label>JSON-törzs (POST, PUT)<textarea spellcheck="false"></textarea></label></section>')+
      '<div class="actions"><button class="btn btn-primary">Futtatás</button><button class="btn btn-ghost">Mintaadatbázis visszaállítása</button></div><section class="editor-panel"><h3>Eredmény</h3><div role="status" style="overflow:auto"></div></section>';
    const source=panel.querySelector('textarea'), out=panel.querySelector('[role=status]'), [run,reset]=panel.querySelectorAll('button');
    source.value = sql ? sample : '{"cim":"Új könyv","szerzo_id":1}';
    if (!sql) panel.querySelector('input').value=base;
    reset.onclick=()=>{stop();snapshot=undefined;out.textContent='A mintaadatbázis visszaállítva.';};
    run.onclick=()=>{
      stop();out.textContent='Betöltés…';
      worker=new Worker('lab-worker.js?v=1');
      const timeout=ms=>setTimeout(()=>{stop();out.textContent='A futtatási idő lejárt.';},ms);
      timer=timeout(45000);
      worker.onerror=()=>{stop();out.textContent='A futtatókörnyezet betöltése sikertelen.';};
      worker.onmessage=({data})=>{
        if (data.ready) {clearTimeout(timer);timer=timeout(5000);out.textContent='Futás…';return;}
        stop();out.replaceChildren();
        if (data.error) {out.textContent=data.error;return;}
        snapshot=data.snapshot;
        if (data.reply) {const pre=document.createElement('pre');pre.textContent='HTTP '+data.reply.status+'\n'+(data.reply.data===null?'':JSON.stringify(data.reply.data,null,2));out.append(pre);return;}
        if (!data.results.length) out.textContent='A parancs lefutott.';
        for (const {columns,values,count} of data.results) {
          const table=document.createElement('table');
          table.createCaption().textContent=count+' sor'+(count>100?' (az első 100 látható)':'');
          const head=table.createTHead().insertRow();
          for (const name of columns) {const th=document.createElement('th');th.textContent=name;head.append(th);}
          const tbody=table.createTBody();
          for (const row of values) {const tr=tbody.insertRow();for(const value of row) tr.insertCell().textContent=value===null?'NULL':String(value);}
          out.append(table);
        }
      };
      worker.postMessage({mode,snapshot,code:source.value,method:panel.querySelector('select')?.value,path:panel.querySelector('input')?.value,body:source.value});
    };
  }
  return {stop, has:mode=>Object.hasOwn(modes,mode)||Object.hasOwn(engines,mode), show(mode,host){
    let panel=panels.get(mode);
    if (!panel) {panel=document.createElement('div');panels.set(mode,panel);host.append(panel);build(mode,panel);}
    for (const item of panels.values()) item.hidden = item !== panel;
  }};
}
