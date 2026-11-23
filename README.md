# kodakademia

https://kodakademia.github.io

## Frissítés GitHub Pages-re

1. Töltsd le a projektet ZIP-ben a workspace-ből, és csomagold ki.
2. A `kodakademia` mappa **tartalmát** másold a `kodakademia.github.io` repó **gyökerébe**
   (`index.html`, `app.js`, `styles.css`, `data/`, `kepek/`).
3. Commitold és pushold. A GitHub Pages 1–2 perc múlva kiszolgálja az új verziót.

A fájlhivatkozások verziózottak (`?v=...`), ezért a böngésző az új JavaScriptet
tölti be, nem a gyorsítótárazott régit. Ha mégis a régi oldalt látod, nyomj
`Ctrl+Shift+R`-t (mobilon: oldal újranyitása).

## Szerkezet

- `index.html` – váz és script sorrend (a `data/*.js` fájlok `defer`-rel töltődnek)
- `app.js` – routing, katalógus, kurzuság-oldalak, leckék, AI tanulótárs
- `data/` – kurzus- és leckeadatok (`lib.js` közös API: `KA.tracks`, `KA.bulk`)
- `kepek/` – SVG ábrák a leckékhez
