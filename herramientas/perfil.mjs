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
// Portada de YouTube 2560×1440 (zona segura central 1546×423)
await shot("portada-youtube-2560x1440.png", 2560, 1440, `<div style="position:absolute;inset:0;background:repeating-linear-gradient(-45deg,#e4ff4f 0 40px,#0f0f0e 40px 80px);clip-path:polygon(0 0,100% 0,100% 6%,0 6%,0 94%,100% 94%,100% 100%,0 100%)"></div><div style="display:flex;align-items:center;gap:56px">${gear(300)}<div><div style="font:800 italic 210px/.9 B;color:#f2f1ec;letter-spacing:.03em">PAR MOTOR</div><div style="font:600 58px/1.3 I;color:#bdbcb4;margin-top:22px">Cuánto vale y cuánto cuesta <span style="color:#e4ff4f">de verdad</span> tu coche</div></div></div>`);
await b.close();
console.log(fs.readdirSync(out).join("\n"));
