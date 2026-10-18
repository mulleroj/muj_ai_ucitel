# Můj AI učitel

Samostatná responzivní stránka v češtině se studijním promptem 2.1 pro studenty středních škol.

## Lokální spuštění

Otevři PowerShell v této složce a spusť jednoduchý HTTP server:

```powershell
python -m http.server 8000
```

Potom otevři <http://localhost:8000>. Stránka načítá `prompt.txt` přes HTTP, proto ji neotvírej přímo přes `file://`.

## QR kód

Po nasazení stránka ve výchozím nastavení vytvoří QR kód z aktuální veřejné adresy. Pokud chceš použít jinou adresu, nastav konstantu `QR_PAGE_URL` na začátku `app.js` na veřejnou URL stránky, například:

```js
const QR_PAGE_URL = "https://example.org/";
```

Na místní adrese se QR kód záměrně nezobrazuje jako odkaz ke sdílení. Knihovna QR kódu a její licence jsou uloženy ve `vendor/`.
