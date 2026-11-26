(() => {
  const ka=window.KA;
  // Minden szerkezet két közvetlen gyerekelemet ad az elrendezési kísérlethez.
  const items=[
    ['Cikkajánló','article','h2','Olvasnivaló','p','A hét könyve','Az article önálló tartalmi egység.','article'],
    ['Oldalsó tudnivaló','aside','h2','Tipp','p','A jegyzet letölthető.','Az aside a fő tartalomhoz lazábban kapcsolódó információt jelöl.','aside'],
    ['Témablokk','section','h2','Következő óra','p','Kezdés kilenckor.','A címsor megnevezi a tematikus szakaszt.','h2'],
    ['Oldalfej','header','h1','Tanulónapló','p','Heti összefoglaló','A header bevezető tartalmat fog össze.','header'],
    ['Lábléc','footer','p','Szerkesztőség','p','Utolsó frissítés hétfőn.','A footer az oldal vagy szakasz záró adatait tartalmazza.','footer'],
    ['Bevásárlólista','ul','li','Tea','li','Kenyér','A sorrendtől független felsorolás elemei li címkét kapnak.','ul'],
    ['Lépéssor','ol','li','Olvasd el a példát','li','Próbáld ki','Az ol számozott sorrendet ad a lépéseknek.','ol'],
    ['Fogalomkártya','dl','dt','Kulcs','dd','Egy rekord azonosítója.','A dt a fogalom neve, a dd a hozzá tartozó leírás.','dd'],
    ['Idézetdoboz','blockquote','p','Lassan járj, tovább érsz.','p','Magyar közmondás','A blockquote hosszabb idézetet jelöl.','blockquote'],
    ['Ábra képaláírással','figure','pre','A → B → C','figcaption','A feladat menete','A figcaption az ábra egészéhez rendeli a feliratot.','figcaption']
  ];
  const layouts=[
    ['függőleges térköz','display: grid; gap: 1.5rem;','gap','a két belső elem közötti távolság','3rem','A gap a szomszédos elemek között hagy helyet.'],
    ['belső margó','padding: 1rem; border: 1px solid;','padding','a szöveg és a keret távolsága','2rem','A padding a határolóvonalon belül érvényesül.'],
    ['olvasható szélesség','max-width: 24ch; border: 1px solid;','max-width','a blokk megengedett legnagyobb szélessége','12ch','A ch betűmérethez kötött egység, így alkalmas sorhossz közelítésére.'],
    ['sorköz','line-height: 1.4; width: 16ch;','line-height','a többsoros szöveg sorainak távolsága','2','Az egység nélküli sormagasság a betűmérettel arányos.'],
    ['felső hangsúly','border-top: 3px solid teal; padding: 1rem;','border-top','a felső szegély vastagsága','6px dashed navy','Az oldalankénti szegély egyetlen élt emel ki.'],
    ['háttérszín','background-color: lavender; color: midnightblue; padding: 1rem;','background-color','a tartalom mögötti kitöltés','ivory','A háttér a tartalmat és a belső térközt is lefedi.'],
    ['lekerekített sarok','border-radius: 8px; border: 2px solid; padding: 1rem;','border-radius','a keret sarkának íve','24px','A sugár változtatásával ugyanaz a blokk más körvonalat kap.'],
    ['reszponzív oszlopok','display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 12rem), 1fr)); gap: 1rem;','grid-template-columns','az egymás mellett elférő oszlopok kiosztása','1fr','Az auto-fit elférő oszlopokat készít, az 1fr önállóan egy oszlopot ír le.'],
    ['szövegigazítás','text-align: center; max-width: 32rem;','text-align','a szöveg vízszintes igazítása','start','A start az írásirány kezdőoldalát követi.'],
    ['árnyék','box-shadow: 0 2px 6px #777; padding: 1rem; margin: 1rem;','box-shadow','a doboz árnyéka','0 4px 12px #777','Az árnyék kirajzolása külön történik a doboz méretezésétől.']
  ];
  for(const slug of ['html','css','jsx','react']){
    const lessons=[];
    items.forEach(([name,parent,t1,v1,t2,v2,meaning,semantic],i)=>layouts.forEach(([style,rules,prop,effect,change,mechanism],j)=>{
      const title=name+' – '+style;
      const nodes='<'+t1+'>'+v1+'</'+t1+'>\n  <'+t2+'>'+v2+'</'+t2+'>';
      const html='<'+parent+' class="minta">\n  '+nodes+'\n</'+parent+'>';
      const css='.minta { '+rules+' }\n.minta > * { margin-block: 0; }';
      const jsx=html.replace('class=', 'className=');
      let code='<style>\n'+css+'\n</style>\n'+html,label='HTML – teljes példa',extra='Vizsgáld meg a szerkezetet a böngésző elemvizsgálójában.';
      if(slug==='css'){label='CSS';code=css;extra='A CSS-szabályokat az alábbi HTML-szerkezeten próbáld ki.';}
      if(slug==='jsx'){label='App.jsx';code='export default function App() {\n  return <>\n    <style>{'+JSON.stringify(css)+'}</style>\n    '+jsx+'\n  </>;\n}';extra='Kövesd, melyik JSX-elemhez kerül a className, és mely gyerekeire hat a közös szabály.';}
      if(slug==='react'){
        label='App.jsx';const changed='.minta { '+prop+': '+change+'; }';
        code='import { useState } from "react";\n\nexport default function App() {\n  const [masik, valt] = useState(false);\n  return <>\n    <button type="button" aria-pressed={masik} onClick={() => valt(!masik)}>Nézetváltás</button>\n    <style>{'+JSON.stringify(css)+' + (masik ? '+JSON.stringify(changed)+' : "")}</style>\n    '+jsx+'\n  </>;\n}';
        extra='A nézetváltó gomb állapotot frissít. A második szabály csak a bekapcsolt nézetben érvényesül.';
      }
      const snippets=[{label,code,usage:extra+' Ebben a példában a megfigyelt változás: '+effect+'.'}];
      if(slug==='css')snippets.push({label:'HTML a stílus kipróbálásához',code:html,usage:meaning+' A minta osztály a külső elemen van, ezért mindkét gyermek ugyanahhoz a panelhez tartozik.'});
      const askSemantic=slug==='html';
      const opts=askSemantic?[semantic,'script','html']:[prop,'opacity','z-index'];
      const rotation=(i+j)%3;opts.push(...opts.splice(0,rotation));
      lessons.push(ka.lesson(slug+'-felulet-'+(i+1)+'-'+(j+1),title,j===7?'Középhaladó':'Kezdő',12,
        name+' készítésekor most a cél '+effect+' beállítása. '+extra,[meaning,mechanism],snippets,
        ['Készítsd el a példát, majd bővítsd hosszabb szöveggel a második elemet.',
         (slug==='react'?'Válts nézetet a gombbal. Ellenőrizd az elemvizsgálóban':'Írd át a szabályt erre')+': '+prop+': '+change+'; Hasonlítsd össze az eredeti és a módosított nézetet.'],
        [askSemantic?'Melyik elem jelöli ebben a példában ezt a szerepet: '+['önálló cikk','kiegészítő információ','második szintű címsor','bevezető fejléc','záró információk','rendezetlen lista','számozott lépéssor','fogalom meghatározása','hosszabb idézet','ábra felirata'][i]+'?':'Melyik tulajdonsággal módosítható itt '+effect+'?',opts,opts.indexOf(askSemantic?semantic:prop),askSemantic?meaning:mechanism]));
    }));ka.addLessons(slug,lessons);
  }
  const controls=[
    ['Beküldőgomb','Button','Content','Mentés','Kattintható parancsindító.'],
    ['Egysoros mező','TextBox','Text','Jegyzet','A tanuló szerkesztheti a Text értékét.'],
    ['Állapotfelirat','TextBlock','Text','Készen áll','A TextBlock olvasásra szánt szöveget jelenít meg.'],
    ['Jelölőnégyzet','CheckBox','Content','Értesítések','Önálló be- és kikapcsolható választás.'],
    ['Választógomb','RadioButton','Content','Kezdő szint','Egy csoportból választott lehetőség.'],
    ['Csoportdoboz','GroupBox','Header','Szállítás','A fejléc közös témát jelöl a csoportnak.'],
    ['Lenyitható rész','Expander','Header','Részletek','A fejléc alatt tartalom nyitható ki.'],
    ['Mezőcímke','Label','Content','Név','Egy adatmező szerepét nevezheti meg.'],
    ['Hosszan olvasható szöveg','TextBlock','Text','Hétfőn indul a következő kurzus.','A hosszabb szöveg tördelése külön figyelmet igényel.'],
    ['Többsoros beviteli mező','TextBox','Text','Első bekezdés','Az AcceptsReturn lehetővé teszi az új sor bevitelét.']
  ];
  const props=[
    ['külső térköz','Margin','12','24','a vezérlő körüli szabad hely'],
    ['balra igazítás','HorizontalAlignment','Left','Center','az elem vízszintes helye a szülőben'],
    ['függőleges igazítás','VerticalAlignment','Top','Center','az elem függőleges helye a szülőben'],
    ['betűméret','FontSize','16','24','a megjelenített szöveg mérete'],
    ['betűvastagság','FontWeight','Normal','Bold','a felirat betűvastagsága'],
    ['szövegszín','Foreground','Navy','DarkGreen','a szöveg színe'],
    ['rögzített szélesség','Width','180','240','az elem szélessége'],
    ['súgóbuborék','ToolTip','Rövid súgó','További tudnivalók','az egérrel előhívható súgó szövege'],
    ['engedélyezettség','IsEnabled','True','False','az elem engedélyezett állapota'],
    ['átlátszatlanság','Opacity','1','0.5','az egész vezérlő átlátszatlansága']
  ];
  const wpf=[];
  controls.forEach(([name,tag,key,value,meaning],i)=>props.forEach(([title,prop,v,newV,effect],j)=>{
    const extra=i===8?' TextWrapping="Wrap"':i===9?' AcceptsReturn="True" TextWrapping="Wrap"':'';
    const sample='<Grid>\n  <'+tag+' '+key+'="'+value+'" '+prop+'="'+v+'"'+extra+(tag==='Expander'||tag==='GroupBox'?' >\n    <TextBlock Text="Mintaadat" />\n  </'+tag+'>':' />')+'\n</Grid>';
    wpf.push(ka.lesson('wpf-nezet-'+(i+1)+'-'+(j+1),name+' – '+title,'Kezdő',12,effect.charAt(0).toUpperCase()+effect.slice(1)+' XAML-ből állítható. '+meaning,
      [meaning,'A Grid a rendelkezésre álló helyet adja a vezérlőnek.'],[{label:'MainWindow.xaml – a Window tartalma',code:sample,usage:'Windowsos WPF-űrlap tervezésekor a '+prop+' tulajdonsággal változtatható '+effect+'. A példát az ablak meglévő tartalma helyére illeszd.'}],
      ['Futtasd a példát '+v+' értékkel, majd állítsd erre: '+newV+'.','Vizsgáld meg az eltérést széles és keskeny ablakban is.'],
      ['Melyik beállítás vezérli ezt: '+effect+'?',j%2?[prop,'Name','Tag']:['Name',prop,'Tag'],j%2?0:1,'Az érintett tulajdonság a '+prop+'.']));
  }));ka.addLessons('wpf',wpf);
})();
