(() => {
 const P=window.KA.programs,L=P.legacy;
 const topics={
  'security-1':'Próbavizsgálat hatóköre','security-2':'Tartalomtípus egyezése','security-3':'Kockázati prioritás','security-6':'Jelentés szakaszainak vizsgálata',
  'sec-b-2':'Olvasói profil jogai','sec-b-3':'Naplózási mezőlista','sec-b-4':'HTTPS címkéjű szolgáltatás','sec-b-8':'Keretezési beállítás','sec-b-9':'Visszaállási pont kiválasztása','sec-b-10':'Engedély időablaka',
  'vedelem-muhely-1':'Kivonat összehasonlítása','vedelem-muhely-2':'Csoporttagság egyeztetése','security-lab-1':'Próbavizsgálat hatóköre','security-lab-2':'Helyi tesztszerver címe','security-lab-3':'Adatgazda leltára','security-lab-7':'Tulajdonosi egyezés','security-lab-8':'Keretezési beállítás','security-lab-9':'Helyi tesztszerver címe','security-lab-10':'Feladat lezárási feltétele',
  'seclab-b-1':'Kockázati prioritás','seclab-b-2':'Port tartományának próbája','seclab-b-4':'Fájltípus fejlécének vizsgálata','seclab-b-5':'Munkamenetsüti védelme','seclab-b-6':'Jelentés szakaszainak vizsgálata','seclab-b-7':'Helyi tesztszerver címe','seclab-b-8':'Mentési könyvtár teljessége','seclab-b-9':'Engedély időablaka'
 };
 L.security=L['security-lab']=l=>{
  const title=topics[l.id];
  if(title){const found=window.KA.extraLessons.security.find(item=>item.title===title);return found.fullProject;}
  if(['sec-b-1','security-lab-6'].includes(l.id))return P.py('import hashlib, secrets, hmac\nsalt=secrets.token_bytes(16)\ndef kivonat(jelszo):\n    return hashlib.scrypt(jelszo.encode(),salt=salt,n=16384,r=8,p=1)\ntarolt=kivonat("proba-jelszo")\nfor proba in ["hibas","proba-jelszo"]:\n    print(hmac.compare_digest(tarolt,kivonat(proba)))');
  if(['sec-b-5','security-5','security-lab-4'].includes(l.id))return P.py('import sqlite3\nwith sqlite3.connect(":memory:") as db:\n    db.execute("CREATE TABLE tanulo(nev TEXT)")\n    db.execute("INSERT INTO tanulo VALUES (?)",("Anna",))\n    for nev in ["Anna","Bori"]:\n        print(nev, db.execute("SELECT count(*) FROM tanulo WHERE nev=?",(nev,)).fetchone()[0])');
  if(['sec-b-6','security-4','security-lab-5'].includes(l.id))return P.html(l.title,'<label>Üzenet <input id="szoveg" value="Szia!"></label><button>Mutasd</button><p></p><script>document.querySelector("button").onclick=()=>{document.querySelector("p").textContent=document.querySelector("input").value;};</script>');
  if(l.id==='sec-b-7')return P.py('import secrets\nimport hmac\nvedojel=secrets.token_urlsafe(32)\ndef elfogadott(jel):\n    return hmac.compare_digest(jel,vedojel)\nprint("Egyező token:",elfogadott(vedojel))\nprint("Hiányzó token:",elfogadott(""))');
  if(l.id==='seclab-b-3')return P.py('maximum=5\nfor hibak in range(7):\n    print(hibak, "várakozás" if hibak>=maximum else "próba engedélyezve")');
  return P.py(l.code);
 };
})();
