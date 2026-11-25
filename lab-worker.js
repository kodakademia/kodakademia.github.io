// Each run starts from the last successful snapshot of this practice database.
const seed = `
CREATE TABLE szerzok (id INTEGER PRIMARY KEY, nev TEXT NOT NULL);
CREATE TABLE konyvek (
  id INTEGER PRIMARY KEY, cim TEXT NOT NULL,
  szerzo_id INTEGER NOT NULL REFERENCES szerzok(id)
);
INSERT INTO szerzok VALUES (1, 'Kiss Anna'), (2, 'Nagy Bence');
INSERT INTO konyvek VALUES (1, 'Első lépések', 1), (2, 'Webes példák', 1), (3, 'SQL alapok', 2);`;

function request(db, {method, path, body, mode}) {
  const url = new URL(path, 'https://gyakorlas.invalid');
  const match = mode === 'node-api'
    ? /^\/api\/(konyvek|szerzok)(?:\/(\d+))?$/.exec(url.pathname)
    : /^\/api\/(konyvek|szerzok)\.php$/.exec(url.pathname);
  const response = (status, data) => ({status, data});
  if (!match || url.origin !== 'https://gyakorlas.invalid') return response(404, {hiba:'Ismeretlen végpont'});
  const table = match[1];
  const id = mode === 'node-api' ? match[2] : url.searchParams.get('id');
  if (id != null && !/^\d+$/.test(id)) return response(400, {hiba:'Az id egész szám legyen.'});
  const rows = (sql, params) => {
    const stmt = db.prepare(sql, params);
    const result = [];
    try { while (stmt.step() && result.length < 100) result.push(stmt.getAsObject()); }
    finally { stmt.free(); }
    return result;
  };
  if (method === 'GET') {
    const data = id == null ? rows('SELECT * FROM '+table+' ORDER BY id LIMIT 100', []) : rows('SELECT * FROM '+table+' WHERE id=?', [Number(id)]);
    if (id == null) return response(200, data);
    return data.length ? response(200, data[0]) : response(404, {hiba:'Nincs ilyen rekord.'});
  }
  if (table !== 'konyvek') return response(405, {hiba:'A szerzők csak olvashatók.'});
  if ((method === 'POST') !== (id == null)) return response(405, {hiba:'Ellenőrizd a metódust és a rekord azonosítóját.'});
  if (id != null && !rows('SELECT id FROM konyvek WHERE id=?', [Number(id)]).length) return response(404, {hiba:'Nincs ilyen könyv.'});
  if (method === 'DELETE') {
    db.run('DELETE FROM konyvek WHERE id=?', [Number(id)]);
    return response(204, null);
  }
  if (!['POST','PUT'].includes(method)) return response(405, {hiba:'Ismeretlen metódus.'});
  let item;
  try { item = JSON.parse(body); } catch { return response(400, {hiba:'Hibás JSON.'}); }
  if (!item || typeof item.cim !== 'string' || !item.cim.trim() || !Number.isSafeInteger(item.szerzo_id)) return response(422, {hiba:'A cim szöveg, a szerzo_id egész szám legyen.'});
  if (!rows('SELECT id FROM szerzok WHERE id=?', [item.szerzo_id]).length) return response(422, {hiba:'Ismeretlen szerző.'});
  if (method === 'POST') db.run('INSERT INTO konyvek(cim,szerzo_id) VALUES (?,?)', [item.cim,item.szerzo_id]);
  else db.run('UPDATE konyvek SET cim=?, szerzo_id=? WHERE id=?', [item.cim,item.szerzo_id,Number(id)]);
  const key = method === 'POST' ? db.exec('SELECT last_insert_rowid()')[0].values[0][0] : Number(id);
  return response(method === 'POST' ? 201 : 200, rows('SELECT * FROM konyvek WHERE id=?',[key])[0]);
}

self.onmessage = async ({data}) => {
  try {
    importScripts('https://cdn.jsdelivr.net/npm/sql.js@1.13.0/dist/sql-asm.js');
    const SQL = await initSqlJs();
    const db = new SQL.Database(data.snapshot);
    if (!data.snapshot) db.run(seed);
    db.run('PRAGMA foreign_keys=ON');
    self.postMessage({ready:true});
    let results = [], reply;
    if (data.mode === 'sql') {
      for (const stmt of db.iterateStatements(data.code)) {
        const columns = stmt.getColumnNames();
        const values = [];
        let count = 0;
        while (stmt.step()) { if (count++ < 100) values.push(stmt.get()); }
        if (columns.length) results.push({columns, values, count});
      }
    } else reply = request(db, data);
    const snapshot = db.export();
    db.close();
    self.postMessage({results,reply,snapshot}, [snapshot.buffer]);
  } catch (e) {self.postMessage({error:String(e.message || e)});}
};
