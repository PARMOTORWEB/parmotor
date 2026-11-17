// Genera las imágenes de perfil: logo (foto de perfil) y portada de YouTube.
// Uso: node herramientas/perfil.mjs   → social/perfil/
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
const { chromium } = createRequire(import.meta.url)("playwright");
const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const out = path.join(ROOT, "social", "perfil");
fs.mkdirSync(out, { recursive: true });
const font = f => `data:font/woff2;base64,${fs.readFileSync(path.join(ROOT, "assets", "fonts", f)).toString("base64")}`;
const gear = s => `<svg width="${s}" height="${s}" viewBox="0 0 120 120"><g fill="#e4ff4f">${[0,45,90,135,180,225,270,315].map(a => `<rect x="54" y="10" width="12" height="18" rx="2" transform="rotate(${a} 60 60)"/>`).join("")}<circle cx="60" cy="60" r="36"/></g><circle cx="60" cy="60" r="14" fill="#0f0f0e"/></svg>`;
const css = `@font-face{font-family:B;font-weight:800;font-style:italic;src:url(${font("BarlowCondensed-800i.woff2")})}@font-face{font-family:I;font-weight:600;src:url(${font("Inter-600.woff2")})}*{margin:0}body{background:#0f0f0e;display:grid;place-items:center;width:100vw;height:100vh;overflow:hidden}`;
const b = await chromium.launch();
async function shot(name, w, h, body) {
  const p = await b.newPage({ viewport: { width: w, height: h } });
  await p.setContent(`<!doctype html><html><head><style>${css}</style></head><body>${body}</body></html>`);
  await p.evaluate(() => document.fonts.ready);
  await p.screenshot({ path: path.join(out, name) });
  await p.close();
}
// Foto de perfil: el engranaje ocupa el 62 % para que el recorte redondo no lo corte
await shot("logo-perfil-1080.png", 1080, 1080, gear(670));
// Portada de YouTube 2560×1440: collage de deportivos en franjas inclinadas.
// En escritorio solo se ve la franja central (2560×423) y en móvil 1546×423: el letrero va ahí.
const web = fs.readFileSync(path.join(ROOT, "index.html"), "utf8");
const fotos = {};
for (const m of web.matchAll(/<img src="(data:image\/webp;base64,[^"]+)"[^>]*alt="([^"]+)"/g)) fotos[m[2]] = m[1];
// Fila central (la que se ve en todos los dispositivos): deportivos. Arriba y abajo (solo TV): el resto.
const tile = (alt, pos = "50% 55%") => `<div style="flex:1 1 0;min-width:0;height:100%;overflow:hidden;transform:skewX(-12deg);border-radius:6px"><img src="${fotos[alt]}" style="width:100%;height:100%;object-fit:cover;object-position:${pos};transform:skewX(12deg) scale(1.28)"></div>`;
const fila = (alts, h) => `<div style="display:flex;gap:16px;height:${h}px;margin:0 -120px">${alts.map(a => tile(...[].concat(a))).join("")}</div>`;
const collage = `<div style="position:absolute;inset:0;display:flex;flex-direction:column;justify-content:center;gap:16px;background:#0f0f0e">
${fila(["Volkswagen Golf", "BMW Serie 3", "Mazda MX-5 NA", "Seat León"], 470)}
${fila([["Toyota GR Yaris", "50% 60%"], ["Volkswagen Golf GTI", "50% 60%"], ["BMW Serie 3 E30", "50% 50%"], ["Mazda MX-5", "50% 60%"], ["BMW Serie 3 E30 de rally en pleno salto", "60% 55%"]], 423)}
${fila(["Volkswagen Golf GTI de primera generación aparcado en la calle", "Toyota Corolla", "SEAT 600", "Mazda MX-5 NA"], 470)}</div>`;
await shot("portada-youtube-2560x1440.png", 2560, 1440, `${collage}
<div style="position:absolute;inset:0;background:linear-gradient(180deg,rgba(15,15,14,.7) 0,rgba(15,15,14,.7) 34%,rgba(15,15,14,.15) 36%,rgba(15,15,14,.15) 64%,rgba(15,15,14,.7) 66%),radial-gradient(ellipse 20% 14% at 50% 50%,rgba(15,15,14,.75),transparent)"></div>
<div style="position:absolute;inset:0;background:repeating-linear-gradient(-45deg,#e4ff4f 0 34px,#0f0f0e 34px 68px);clip-path:polygon(0 0,100% 0,100% 3%,0 3%,0 97%,100% 97%,100% 100%,0 100%)"></div>
<div style="position:relative;display:flex;align-items:center;gap:30px;padding:30px 48px;background:rgba(15,15,14,.88);border-left:10px solid #e4ff4f;border-radius:10px">${gear(130)}<div><div style="font:800 italic 104px/.9 B;color:#f2f1ec;letter-spacing:.03em">PAR MOTOR</div><div style="font:600 32px/1.3 I;color:#bdbcb4;margin-top:12px">Cuánto vale y cuánto cuesta <span style="color:#e4ff4f">de verdad</span> tu coche</div></div></div>`);
await b.close();
console.log(fs.readdirSync(out).join("\n"));
