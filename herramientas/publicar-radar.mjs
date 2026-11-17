// Publica un nuevo número del Radar semanal.
// Uso: node herramientas/publicar-radar.mjs 02
//  1. Guarda el número que hay ahora en la portada en /radar/<nº>/ (página propia, indexable).
//  2. Pone en la portada el borrador radar/borradores/<nº>.html y lo borra.
//  3. Actualiza la lista de números anteriores y regenera páginas de modelo y sitemap.
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const SITE = "https://parmotorweb.github.io/parmotor/";
const nuevo = (process.argv[2] || "").padStart(2, "0");
const borrador = path.join(ROOT, "radar", "borradores", `${nuevo}.html`);
if (!fs.existsSync(borrador)) throw new Error(`No existe ${borrador}`);

const idxPath = path.join(ROOT, "index.html");
let html = fs.readFileSync(idxPath, "utf8");
const A = '<article class="card edition rv">', i = html.indexOf(A), j = html.indexOf("</article>", i) + "</article>".length;
if (i < 0) throw new Error("No encuentro el Radar en index.html");
const actual = html.slice(i, j);
const n = actual.match(/<span class="num">Nº (\d+)<\/span>/)[1];
const titulo = actual.match(/<h3>([^<]+)<\/h3>/)[1];
const fecha = actual.match(/<div class="ed-date">([^<]+)<\/div>/)[1];
const esc = s => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;");

// 1. archivar el número actual
const dir = path.join(ROOT, "radar", n);
fs.mkdirSync(dir, { recursive: true });
const url = `${SITE}radar/${n}/`;
const desc = `Radar semanal de Par Motor nº ${n} (${fecha.toLowerCase()}): ${titulo}. Qué se mueve en el mercado del coche y qué significa si vas a comprar o vender.`;
const logo = html.match(/<a class="logo"[^>]*>(<svg[\s\S]*?<\/svg>)/)[1];
fs.writeFileSync(path.join(dir, "index.html"), `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Radar nº ${n}: ${esc(titulo)} | Par Motor</title>
<meta name="description" content="${esc(desc)}">
<link rel="canonical" href="${url}">
<meta name="robots" content="index,follow">
<meta name="theme-color" content="#0f0f0e">
<link rel="icon" href="../../favicon.svg" type="image/svg+xml">
<meta property="og:type" content="article">
<meta property="og:locale" content="es_ES">
<meta property="og:site_name" content="Par Motor">
<meta property="og:title" content="Radar nº ${n}: ${esc(titulo)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${SITE}og.png">
<meta name="twitter:card" content="summary_large_image">
<link rel="stylesheet" href="../../assets/modelos.css">
<script type="application/ld+json">${JSON.stringify({ "@context": "https://schema.org", "@type": "NewsArticle", headline: titulo, url, inLanguage: "es-ES", publisher: { "@type": "Organization", name: "Par Motor", url: SITE } })}</script>
</head>
<body>
<header><div class="wrap nav"><a class="logo" href="../../">${logo}Par Motor</a><a class="cta" href="../../#tasador">Tasador</a></div></header>
<main class="wrap">
<p class="crumbs"><a href="../../">Par Motor</a> › <a href="../../#radar">Radar semanal</a> › Nº ${n}</p>
${actual.replace(' rv">', '">')}
</main>
<footer><div class="wrap">Par Motor · Radar semanal nº ${n}, ${fecha.toLowerCase()}. · <a href="../../#radar">Último número</a> · <a href="../../#aviso-legal">Aviso legal</a></div></footer>
</body>
</html>
`);

// 2. el borrador pasa a la portada
html = html.slice(0, i) + fs.readFileSync(borrador, "utf8").trim() + html.slice(j);
fs.rmSync(borrador);

// 3. lista de números anteriores (bloque entre marcadores, justo después del artículo)
const nums = fs.readdirSync(path.join(ROOT, "radar")).filter(d => /^\d+$/.test(d)).sort().reverse();
const lista = `<!-- RADAR:ARCHIVO --><p class="ed-archive">Números anteriores: ${nums.map(d => `<a href="radar/${d}/">Nº ${d}</a>`).join(" · ")}</p><!-- /RADAR:ARCHIVO -->`;
html = /<!-- RADAR:ARCHIVO -->[\s\S]*?<!-- \/RADAR:ARCHIVO -->/.test(html)
  ? html.replace(/<!-- RADAR:ARCHIVO -->[\s\S]*?<!-- \/RADAR:ARCHIVO -->/, lista)
  : html.replace(/(<article class="card edition rv">[\s\S]*?<\/article>)/, `$1\n      ${lista}`);
if (!html.includes(".ed-archive{")) html = html.replace("</style>", "  .ed-archive{margin:22px 0 0;font-size:14.5px;color:var(--ink-3)}\n  .ed-archive a{color:var(--ink-2);text-underline-offset:3px}\n  .ed-archive a:hover{color:var(--accent)}\n</style>");
fs.writeFileSync(idxPath, html);

execFileSync("node", [path.join(ROOT, "herramientas", "generar-modelos.mjs")], { stdio: "inherit" });
console.log(`Publicado el Radar nº ${nuevo}; el nº ${n} queda en /radar/${n}/`);
