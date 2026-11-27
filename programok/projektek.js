(() => {
  const one = (name, code, run) => ({files:{[name]:code.trim()+'\n'},run});
  const py = code => one('main.py',code,'Python 3.10+ • python main.py');
  const php = code => one('index.php',code,'PHP 8+ • php -S 127.0.0.1:8000 • Nyisd meg: http://127.0.0.1:8000/');
  const node = code => one('main.js',code,'Node.js 22+ • node main.js');
  const bash = code => one('pelda.sh','#!/usr/bin/env bash\nset -eu\n'+code,'Bash • bash pelda.sh');
  const html = (title, body) => one('index.html',/^\s*<!doctype/i.test(body)?body:'<!doctype html>\n<html lang="hu">\n<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>'+title.replaceAll('&','&amp;').replaceAll('<','&lt;')+'</title></head>\n<body>\n'+body+'\n</body>\n</html>', 'Nyisd meg az index.html fájlt a böngészőben.');
  const json = obj => JSON.stringify(obj,null,2)+'\n';
  function react(code) {
    return {run:'Node.js 22.12+ • npm install, majd npm start. Nyisd meg a terminálban kiírt helyi címet.',files:{
      'package.json':json({private:true,scripts:{start:'vite --host 127.0.0.1'},dependencies:{react:'18.3.1','react-dom':'18.3.1',vite:'6.4.1'}}),
      'index.html':'<!doctype html>\n<html lang="hu"><head><meta charset="utf-8"><title>React gyakorlat</title></head><body><div id="root"></div><script type="module" src="/main.jsx"></script></body></html>',
      'main.jsx':'import React from "react";\nimport { createRoot } from "react-dom/client";\nimport App from "./App.jsx";\ncreateRoot(document.getElementById("root")).render(<App />);',
      'App.jsx':'import React from "react";\n'+code}};
  }
  function cs(code,wpf=false) {
    const project='<Project Sdk="Microsoft.NET.Sdk">\n  <PropertyGroup>\n    <OutputType>'+(wpf?'WinExe':'Exe')+'</OutputType>\n    <TargetFramework>net8.0'+(wpf?'-windows':'')+'</TargetFramework>\n    <ImplicitUsings>enable</ImplicitUsings>\n'+(wpf?'    <UseWPF>true</UseWPF>\n':'')+'  </PropertyGroup>\n</Project>';
    const files={'Pelda.csproj':project};
    if(wpf) {
      files['App.xaml']='<Application x:Class="Pelda.App" xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation" xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml" StartupUri="MainWindow.xaml"/>';
      files['App.xaml.cs']='namespace Pelda;\npublic partial class App : System.Windows.Application { }';
      files['MainWindow.xaml']='<Window xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation" xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml" Title="Gyakorlat" Width="480" Height="320">\n'+code+'\n</Window>';
    } else files['Program.cs']=code;
    return {files,run:(wpf?'Windows és .NET 8 SDK':'.NET 8 SDK')+' • dotnet run --project Pelda.csproj'};
  }
  function flask(code,route='/',extras={}) {
    return {run:'Python 3.10+ • python -m pip install -r requirements.txt, majd python -m flask --app app run. Nyisd meg: http://127.0.0.1:5000'+route,
      files:{'app.py':code,'requirements.txt':'Flask>=3,<4\n',...extras}};
  }
  function ts(code) {return {run:'Node.js 22+ • npm install, majd npm start.',files:{
    'package.json':json({private:true,scripts:{start:'tsc && node dist/main.js'},devDependencies:{typescript:'5.8.3'}}),
    'tsconfig.json':json({compilerOptions:{target:'ES2022',module:'commonjs',outDir:'dist',strict:true,experimentalDecorators:true},include:['*.ts']}),
    'main.ts':'export {};\n'+code}};}
  const api={one,py,php,node,bash,html,react,cs,ts,flask,json,legacy:{}};
  window.KA.programs=api;
  api.get=(c,l)=>{
    const slug=c.slug, s=l.code, id=l.id;
    if(slug==='c')return one('main.c',s,'C-fordító • gcc -std=c11 main.c -o pelda, majd ./pelda (Windows alatt pelda.exe).');
    if(slug==='java')return one('Main.java',s,'JDK 17+ • java Main.java');
    if(!/-(adat|felulet|nezet|jelentes|folyam|kontroll)-\d+-\d+$/.test(id))return api.legacy[slug](l);
    switch(slug){
      case 'alapok':case 'python':case 'security':case 'security-lab':return py(s);
      case 'javascript':return node(s);
      case 'typescript':return ts(s);
      case 'csharp':case 'console':return cs(s);
      case 'php':case 'php-api':return php(s);
      case 'nodejs':return one('server.js',s,'Node.js • node server.js • Nyisd meg: http://127.0.0.1:3000/jelentes');
      case 'python-web':return flask(s,'/jelentes');
      case 'html':return html(l.title,s);
      case 'css':return html(l.title,'<style>\n'+s+'\n</style>\n'+l.snippets[1].code);
      case 'jsx':case 'react':return react(s);
      case 'wpf':return cs(s,true);
      case 'terminal':return bash(s);
      case 'xampp':return {files:{'jelentes.sql':s,'main.py':'import sqlite3\nfrom pathlib import Path\n\nsql = Path(__file__).with_name("jelentes.sql").read_text(encoding="utf-8")\nwith sqlite3.connect(":memory:") as db:\n    db.create_function("FLOOR", 1, __import__("math").floor)\n    for row in db.execute(sql):\n        print(*row)\n'},run:'Python 3 • python main.py. A mellékelt önálló SQL-jelentés a XAMPP phpMyAdmin SQL lapján is futtatható.'};
    }
  };
})();

// Tömörítetlen ZIP készül helyben. A UTF-8 jelző a magyar fájlneveket is megőrzi.
window.KA.programs.archive = files => {
  const enc=new TextEncoder(), parts=[], directory=[];
  let offset=0, directorySize=0;
  function record(size,fields){
    const bytes=new Uint8Array(size), view=new DataView(bytes.buffer);
    for(const [at,width,value] of fields) {
      if(width===2)view.setUint16(at,value,true);else view.setUint32(at,value,true);
    }
    return bytes;
  }
  for(const [path,source] of Object.entries(files)){
    const name=enc.encode(path), data=enc.encode(source);
    let crc=0xffffffff;
    for(const b of data){crc^=b;for(let i=0;i<8;i++)crc=(crc>>>1)^((crc&1)?0xedb88320:0);}
    crc=(crc^0xffffffff)>>>0;
    const header=record(30,[[0,4,0x04034b50],[4,2,20],[6,2,2048],[12,2,33],[14,4,crc],[18,4,data.length],[22,4,data.length],[26,2,name.length]]);
    const entry=record(46,[[0,4,0x02014b50],[4,2,20],[6,2,20],[8,2,2048],[14,2,33],[16,4,crc],[20,4,data.length],[24,4,data.length],[28,2,name.length],[42,4,offset]]);
    parts.push(header,name,data);directory.push(entry,name);
    offset+=header.length+name.length+data.length;directorySize+=entry.length+name.length;
  }
  const count=directory.length/2;
  return new Blob([...parts,...directory,record(22,[[0,4,0x06054b50],[8,2,count],[10,2,count],[12,4,directorySize],[16,4,offset]])],{type:'application/zip'});
};
