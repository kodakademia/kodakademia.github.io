(() => {
 const P=window.KA.programs,L=P.legacy;
 L.nodejs=l=>{
   const id=l.id,s=l.code,base='const express=require("express");\nconst app=express();\napp.use(express.json());\n',end='\napp.listen(3000,"127.0.0.1");';
   const route='app.get("/api/leckek",(req,res)=>res.json([{id:1,cim:"Első lecke"}]));';
   const sample=base+'const leckek=[{id:1,cim:"Első lecke"}];\napp.get("/api/leckek",(req,res)=>res.json(leckek));\napp.post("/api/leckek",(req,res)=>{const cim=req.body?.cim;if(typeof cim!=="string" || !cim.trim())return res.sendStatus(400);const uj={id:leckek.length+1,cim:cim.trim()};leckek.push(uj);res.status(201).json(uj);});'+end;
   let src=sample,files={},deps={express:'4.21.2'},path='/api/leckek';
   if(id==='nodejs-muhely-20261125')return P.node(s);
   if(id==='nodejs-2'||id==='nodejs-3'){src=(s.includes('require("http")')?'':'const http=require("node:http");\n')+s;if(!src.includes('.listen('))src+='\nserver.listen(3000,"127.0.0.1");';deps={};path='/'}
   if(['nodejs-4','nodejs-api-4'].includes(id)){src=base+'require("dotenv").config();\napp.get("/",(req,res)=>res.json({port:process.env.PORT}));\napp.listen(Number(process.env.PORT),"127.0.0.1");';files['.env']='PORT=3000';deps.dotenv='16.6.1';path='/'}
   if(id==='nodejs-7')src=base+s+'\n'+route+end;
   if(id==='nodejs-8'){src=base+'app.get("/api/lecke/:id",(req,res)=>{const id=Number(req.params.id);if(!Number.isInteger(id))return res.sendStatus(400);if(id!==1)return res.sendStatus(404);res.json({id,cim:"Első lecke"});});'+end;path='/api/lecke/1'}
   if(['nodejs-9','nodejs-api-5'].includes(id))return P.one('server.js','const {DatabaseSync}=require("node:sqlite");\nconst db=new DatabaseSync(":memory:");\ndb.exec("CREATE TABLE lecke(id INTEGER PRIMARY KEY,cim TEXT)");\ndb.prepare("INSERT INTO lecke(cim) VALUES (?)").run("Első lecke");\nconsole.table(db.prepare("SELECT * FROM lecke").all());\ndb.close();','Node.js 22.13+ • node server.js');
   if(['nodejs-10','nodejs-api-3'].includes(id)){files['routes/leckek.js']='const r=require("express").Router();\nr.get("/",(req,res)=>res.json([{id:1,cim:"Tömbök"}]));\nmodule.exports=r;';src=base+'app.use("/api/leckek",require("./routes/leckek"));'+end}
   if(id==='nodejs-api-2')return P.node('const path=require("node:path");\nconst fs=require("node:fs/promises");\nfs.stat(__filename).then(s=>console.log(path.basename(__filename),s.size,"bájt"));');
   files['server.js']=src;files['package.json']=P.json({private:true,scripts:{start:'node server.js'},dependencies:deps});return {files,run:'Node.js 22+ • npm install, majd npm start. Nyisd meg: http://127.0.0.1:3000'+path};
 };
 L['python-web']=l=>{
   const start='from flask import Flask, jsonify, request, redirect, render_template, flash, url_for\napp=Flask(__name__)\n',home='\n@app.get("/")\ndef fooldal():\n    return "Első Flask-lecke"\n',id=l.id;
   if(id==='python-web-muhely-20261125')return P.flask(l.code,'/szuro?cimke=web&cimke=java');
   if(id==='python-web-1')return P.flask(l.code);
   if(['pyweb-b-1','pyweb-b-3','python-web-2','pyweb-b-10'].includes(id))return P.flask(start+'\n@app.get("/")\ndef fooldal():\n    return render_template("index.html", lista=["HTML","Python"])','/',{'templates/base.html':'<!doctype html><html lang="hu"><meta charset="utf-8"><title>Leckék</title><main>{% block tartalom %}{% endblock %}</main></html>','templates/index.html':'{% extends "base.html" %}{% block tartalom %}<h1>Leckék</h1><ul>{% for nev in lista %}<li>{{ nev }}</li>{% endfor %}</ul>{% endblock %}'});
   if(['python-web-6','pyweb-b-9'].includes(id)){let p=P.flask(start+home);p.files['test_app.py']='import unittest\nfrom app import app\n\nclass OldalTeszt(unittest.TestCase):\n    def test_fooldal(self):\n        with app.test_client() as c:\n            self.assertEqual(c.get("/").status_code,200)\n\nif __name__=="__main__": unittest.main()';p.run+=' • Teszt: python test_app.py';return p}
   if(id==='pyweb-b-5')return P.flask(start+'from flask_sqlalchemy import SQLAlchemy\napp.config["SQLALCHEMY_DATABASE_URI"]="sqlite:///:memory:"\ndb=SQLAlchemy(app)\nclass Lecke(db.Model):\n    id=db.Column(db.Integer,primary_key=True)\n    cim=db.Column(db.String(100))\nwith app.app_context():\n    db.create_all()\n    db.session.add(Lecke(cim="Tömbök"))\n    db.session.commit()\n@app.get("/")\ndef lista():\n    return jsonify([x.cim for x in Lecke.query.all()])','/',{'requirements.txt':'Flask>=3,<4\nFlask-SQLAlchemy>=3,<4'});
   if(id==='python-web-5')return P.flask(start+'import sqlite3\n@app.get("/")\ndef lista():\n    with sqlite3.connect(":memory:") as db:\n        db.execute("CREATE TABLE lecke(cim TEXT)")\n        db.execute("INSERT INTO lecke VALUES (?)",("Tömbök",))\n        return jsonify([r[0] for r in db.execute("SELECT cim FROM lecke")])');
   if(['pyweb-b-7','python-web-4'].includes(id))return P.flask(start+'from dotenv import load_dotenv\nimport os\nload_dotenv()\napp.config["SECRET_KEY"]=os.environ["SECRET_KEY"]\n'+home,'/',{'.env':'SECRET_KEY=helyi-gyakorlokulcs','requirements.txt':'Flask>=3,<4\npython-dotenv>=1,<2'});
   if(['pyweb-b-4','python-web-3'].includes(id))return P.flask(start+'from secrets import token_hex\napp.secret_key=token_hex(32)\n@app.route("/", methods=["GET","POST"])\ndef nev():\n    if request.method=="POST":\n        flash("Mentve: "+request.form.get("nev",""))\n        return redirect("/")\n    return render_template("form.html")','/',{'templates/form.html':'<form method="post"><input name="nev" required><button>Küldés</button></form>{% for u in get_flashed_messages() %}<p>{{u}}</p>{% endfor %}'});
   if(id==='pyweb-b-6')return P.flask(start+home+'\n@app.errorhandler(404)\ndef hiba(e):\n    return "A lecke nem található.",404','/nincs');
   if(id==='pyweb-b-2')return P.flask(start+l.code,'/lecke/3');
   return P.flask(start+l.code,'/api/leckek');
 };
 L['php-api']=l=>{
   const id=l.id;
   if(id.endsWith('20261125')||['php-api-1','phpapi-b-2'].includes(id))return P.php(l.code);
   let src='header("Content-Type: application/json; charset=utf-8");\n';
   if(['php-api-4','phpapi-b-5'].includes(id))src+='$kulcs = $_SERVER["HTTP_AUTHORIZATION"] ?? "";\nif (!hash_equals("Bearer helyi-minta", $kulcs)) {http_response_code(401); echo json_encode(["hiba"=>"Azonosítás szükséges"]); exit;}\necho json_encode(["ok"=>true]);';
   else if(['php-api-5','phpapi-b-6'].includes(id))src+='try { if (isset($_GET["probahiba"])) throw new RuntimeException("Mintahiba"); echo json_encode(["ok"=>true]); } catch (Throwable $e) {error_log($e->getMessage());http_response_code(500);echo json_encode(["hiba"=>"Szerverhiba"]);}';
   else if(id==='phpapi-b-7')src+='$lista=["HTML","PHP","C","Java"];\n$limit=max(1,min(4,(int)($_GET["limit"] ?? 2)));\n$offset=max(0,(int)($_GET["offset"] ?? 0));\necho json_encode(array_slice($lista,$offset,$limit));';
   else if(id==='phpapi-b-8')src+='header("Access-Control-Allow-Origin: http://127.0.0.1:3000");\nheader("Access-Control-Allow-Methods: GET");\necho json_encode(["ok"=>true]);';
   else src+='session_start();\n$_SESSION["leckek"] ??= [["id"=>1,"cim"=>"Első lecke"]];\n$m=$_SERVER["REQUEST_METHOD"];\nif($m==="GET"){echo json_encode($_SESSION["leckek"]);exit;}\nif($m!=="POST"){http_response_code(405);exit;}\n$adat=json_decode(file_get_contents("php://input"),true);\nif(!is_string($adat["cim"]??null) || trim($adat["cim"])===""){http_response_code(400);echo json_encode(["hiba"=>"Hiányzó cím"]);exit;}\n$uj=["id"=>count($_SESSION["leckek"])+1,"cim"=>trim($adat["cim"])];\n$_SESSION["leckek"][]=$uj;http_response_code(201);echo json_encode($uj);';
   let p=P.php('<?php\n'+src);if(src.includes('HTTP_AUTHORIZATION'))p.run+=' • curl -H "Authorization: Bearer helyi-minta" http://127.0.0.1:8000/';if(src.includes('php://input'))p.run+=' • curl -H "Content-Type: application/json" -d \'{"cim":"Java"}\' http://127.0.0.1:8000/';return p;
 };
 L.csharp=L.console=l=>{
   let s=l.code,id=l.id;
   if(id==='csharp-5'||id==='console-3'){const i=s.indexOf('\nvar ');s=s.slice(i+1)+'\n'+s.slice(0,i)}
   if(id==='console-6')s='using System.IO;\nConsole.Write("Jegyzet: ");\nstring? sor=Console.ReadLine();\nif(!string.IsNullOrWhiteSpace(sor))File.AppendAllLines("jegyzetek.txt",new[]{sor});\nif(File.Exists("jegyzetek.txt"))foreach(var tetel in File.ReadLines("jegyzetek.txt")) Console.WriteLine(tetel);';
   if(id==='console-b-6')s='try { Console.WriteLine(int.Parse(args.Length>0?args[0]:"proba")); } catch (FormatException) { Console.Error.WriteLine("Egész szám szükséges."); }';
   if(id==='console-b-1')s='Console.Write("Adj meg egy számot: ");\nif(double.TryParse(Console.ReadLine(),out var n))Console.WriteLine(n*n);';
   if(id==='csharp-b-4')s='int[] szamok = {3,2,8,1};\n'+s+'\nConsole.WriteLine(string.Join(", ",paros));';
   if(id==='csharp-b-8')s='Console.WriteLine(new App.Models.Termek().GetType().Name);\n'+s;
   if(id==='csharp-b-9')s='IForma kor = new Kor { R=2 };\nConsole.WriteLine(kor.Ter());\n'+s;
   if(id==='csharp-b-11')s='using System.Diagnostics;\nint x=42;\n'+s+'\nConsole.WriteLine(x);';
   if(id==='csharp-b-1')s+='\nConsole.WriteLine($"{nev}: {kor}, {ar}, {aktiv}");';
   if(id==='csharp-b-2')s='var tea=new Termek{Nev="Tea",Ar=450};\nConsole.WriteLine(tea.Nev);\n'+s;
   if(id==='csharp-b-7')s+='\nConsole.WriteLine(await Betolt());';
   if(id==='console-b-4')s='string bejegyzes="Első nap";\n'+s+'\nConsole.WriteLine(tartalom);';
   if(id==='console-b-2')s=s.replace('v == "2"','v == null || v == "2"');
   const p=P.cs(s);if(id==='console-5')p.run+=' -- Anna';return p;
 };
 L.wpf=l=>{
   let x=l.code;
   if(['wpf-4','wpf-7','wpf-b-3'].includes(l.id))x='<StackPanel><TextBox x:Name="Nev" Text="Anna"/><TextBlock Text="{Binding Text, ElementName=Nev}"/></StackPanel>';
   else if(/Command|ItemsSource/.test(x))x='<StackPanel><ListBox x:Name="Lista"><ListBoxItem>Első feladat</ListBoxItem><ListBoxItem>Második feladat</ListBoxItem></ListBox><TextBlock Text="{Binding SelectedItem.Content,ElementName=Lista}"/><Button Content="Másolás" Command="ApplicationCommands.Copy" CommandTarget="{Binding ElementName=Mezo}"/><TextBox x:Name="Mezo" Text="Jelöld ki a szöveget!"/></StackPanel>';
   else if(x.startsWith('<Window.Resources>'))x=x.slice(0,x.indexOf('</Window.Resources>')+19)+'\n<Button Content="Mintagomb"/>';
   else if(x.includes('<Window '))x=x.replace(/^.*?<Window\b[^>]*>/s,'').replace(/<\/Window>[\s\S]*/,'').replace(/ Click="[^"]*"/g,'');
   else if(!x.startsWith('<'))x='<StackPanel><TextBlock Text="Név"/><TextBox x:Name="Nev"/><Button Name="Gomb" Content="Köszönés"/><TextBlock x:Name="Uzenet"/></StackPanel>';
   const p=P.cs(x,true);if(x.includes('Name="Gomb"')){p.files['MainWindow.xaml']=p.files['MainWindow.xaml'].replace('<Window ','<Window x:Class="Pelda.MainWindow" ');p.files['MainWindow.xaml.cs']='using System.Windows;\nnamespace Pelda;\npublic partial class MainWindow : Window {\n    public MainWindow(){InitializeComponent(); Gomb.Click += (_,_)=> Uzenet.Text="Szia, "+Nev.Text+"!";}\n}';}return p;
 };
})();
