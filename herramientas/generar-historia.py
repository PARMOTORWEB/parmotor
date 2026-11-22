#!/usr/bin/env python3
"""Genera la sección /historia/ de la web a partir de los guiones de los vídeos.

Uso: python3 herramientas/generar-historia.py [carpeta_de_imagenes_originales]

- Lee los guiones de herramientas/historia-datos/*.json (shorts «4 cosas que no sabías…»
  y vídeos largos «X: la historia completa»).
- Crea /historia/index.html, una página por artículo y las fotos en /historia/img/ (webp),
  siempre con su autor y licencia (Wikimedia Commons).
- Escribe historia/enlaces.json (modelo del tasador -> artículos) para que
  generar-modelos.mjs enlace los artículos desde las páginas de precios.
"""
import html, json, os, re, sys, unicodedata
from datetime import date
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
DATOS = ROOT / "herramientas" / "historia-datos"
OUT = ROOT / "historia"
SITE = "https://parmotorweb.github.io/parmotor/"
IMG_SRC = Path(sys.argv[1]) if len(sys.argv) > 1 else None
HOY = date.today().isoformat()

esc = lambda s: html.escape(str(s), quote=True)


def slug(s):
    s = unicodedata.normalize("NFD", s).encode("ascii", "ignore").decode().lower()
    return re.sub(r"[^a-z0-9]+", "-", s).strip("-")


# Frases propias del vídeo que no tienen sentido en un artículo
FUERA = re.compile(r"(cada imagen lleva su fuente|suscríbete|te leo en los comentarios|nos vemos en el próximo|"
                   r"este domingo|el próximo domingo|cuánto vale hoy tu coche|míralo gratis|enlace en el perfil|"
                   r"ahora te pregunto a ti|cada domingo contamos)", re.I)
NUM = re.compile(r"^(¡?(uno|dos|tres|cuatro)[!.]\s*)", re.I)


def limpia(frases):
    t = " ".join(f.strip() for f in frases)
    t = NUM.sub("", t)
    t = re.sub(r"^¡(.*?)!$", r"\1.", t) if t.count("¡") == 1 and t.endswith("!") else t
    oraciones = re.split(r"(?<=[.!?…])\s+", t)
    t = " ".join(o for o in oraciones if o and not FUERA.search(o))
    return t.strip()


def titulo_escena(e):
    v = e.get("v", {})
    tipo = e.get("tipo")
    if tipo == "cifra":
        antes = v.get("antes", "").strip()
        if antes:
            return f"{antes[0]}{antes[1:].lower()}: {v.get('valor', '')}"
        tx = v.get("texto", "").strip("«»")
        tx = tx[0] + tx[1:].lower() if tx.isupper() else tx
        return f"{v.get('valor', '')} · {tx}".strip(" ·")
    for k in ("titulo", "etiqueta"):
        if v.get(k):
            t = v[k].strip()
            return t[0] + t[1:].lower() if t.isupper() else t
    return ""


# ---------- modelos del tasador (para enlazar) ----------
MODELOS = sorted(p.name for p in (ROOT / "tasar").iterdir() if p.is_dir())


def modelo_de(nombre):
    """Página de precios del mismo coche (no de otro modelo con nombre parecido)."""
    s = slug(nombre)
    if s in MODELOS:
        return s
    hit = [m for m in MODELOS if m.startswith(s + "-y-")]          # «Subaru Impreza» -> subaru-impreza-y-xv
    if hit:
        return hit[0]
    hit = [m for m in MODELOS if s.startswith(m + "-")]            # «Golf GTI» -> volkswagen-golf
    return max(hit, key=len) if hit else None


# ---------- imágenes ----------
(OUT / "img").mkdir(parents=True, exist_ok=True)


def imagen(clave, ruta):
    dst = OUT / "img" / f"{clave}.webp"
    if dst.exists():
        return f"img/{clave}.webp"
    cands = []
    if IMG_SRC:
        cands += [IMG_SRC / Path(ruta).name, IMG_SRC / f"{clave}.jpg"]
    for c in cands:
        if c.exists():
            from PIL import Image
            im = Image.open(c).convert("RGB")
            im.thumbnail((1200, 1200))
            im.save(dst, "WEBP", quality=72, method=6)
            return f"img/{clave}.webp"
    return None


# ---------- plantilla ----------
LOGO = ('<svg width="26" height="26" viewBox="0 0 120 120" aria-hidden="true"><g fill="#e4ff4f">'
        + "".join(f'<rect x="54" y="10" width="12" height="18" rx="2" transform="rotate({a} 60 60)"/>' for a in range(0, 360, 45))
        + '<circle cx="60" cy="60" r="36"/></g><circle cx="60" cy="60" r="14" fill="#0f0f0e"/></svg>')
REDES = ('<a href="https://www.instagram.com/parmotorrr/" rel="me noopener">Instagram</a> · '
         '<a href="https://www.youtube.com/channel/UCdaSZmZUMuUJtuB3xbGmAJA" rel="me noopener">YouTube</a>')
EXTRA_CSS = """<style>
.art p{font-size:18px;line-height:1.75;color:var(--ink-2);max-width:720px}
.art figure{margin:28px 0;max-width:820px}.art figure img{width:100%;height:auto;border-radius:10px;display:block;background:var(--surface)}
.art figcaption{font-size:13.5px;color:var(--ink-3);margin-top:8px}.art figcaption b{color:var(--ink-2);font-weight:600}
.art ol{padding:0;list-style:none;counter-reset:n}.art ol li{counter-increment:n;background:var(--surface);border:1px solid var(--line);border-left:4px solid var(--accent);border-radius:10px;padding:18px 22px;margin:0 0 16px;max-width:760px}
.art ol li h2{font-size:26px;margin:0 0 6px}.art ol li h2::before{content:counter(n) ". ";color:var(--accent)}.art ol li p{margin:0}
.cards{display:grid;grid-template-columns:repeat(auto-fill,minmax(230px,1fr));gap:16px;margin:24px 0 0;padding:0;list-style:none}
.cards a{display:block;height:100%;text-decoration:none;background:var(--surface);border:1px solid var(--line);border-radius:12px;overflow:hidden}
.cards img{width:100%;aspect-ratio:3/2;object-fit:cover;display:block;background:var(--surface-2)}.cards span{display:block;padding:12px 14px;font-weight:600;line-height:1.35}
.cards small{display:block;color:var(--ink-3);font-weight:400;margin-top:4px}
</style>"""


def pagina(rel, url, title, desc, cuerpo, ld, img_abs=None):
    return f"""<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{esc(title)}</title>
<meta name="description" content="{esc(desc)}">
<link rel="canonical" href="{url}">
<meta name="robots" content="index,follow,max-image-preview:large">
<meta name="theme-color" content="#0f0f0e">
<link rel="icon" href="{rel}favicon.svg" type="image/svg+xml">
<meta property="og:type" content="article">
<meta property="og:locale" content="es_ES">
<meta property="og:site_name" content="Par Motor">
<meta property="og:title" content="{esc(title)}">
<meta property="og:description" content="{esc(desc)}">
<meta property="og:url" content="{url}">
<meta property="og:image" content="{img_abs or SITE + 'og.png'}">
<meta name="twitter:card" content="summary_large_image">
<link rel="stylesheet" href="{rel}assets/modelos.css">
{EXTRA_CSS}
<script type="application/ld+json">{json.dumps(ld, ensure_ascii=False)}</script>
<script src="{rel}assets/analitica.js" defer></script>
</head>
<body>
<header><div class="wrap nav"><a class="logo" href="{rel}">{LOGO}Par Motor</a><a class="cta" href="{rel}#tasador">Tasador</a></div></header>
<main class="wrap art">
{cuerpo}
</main>
<footer><div class="wrap">Par Motor · Historia del motor · Fotos de Wikimedia Commons con su autor y licencia · {REDES} · <a href="{rel}#aviso-legal">Aviso legal</a> · <a href="{rel}#privacidad">Privacidad</a></div></footer>
</body>
</html>
"""


def figura(src, alt, cred):
    if not src:
        return ""
    return (f'<figure><img src="{src}" alt="{esc(alt)}" width="1200" height="800" loading="lazy" decoding="async">'
            f'<figcaption><b>{esc(alt)}</b> · {esc(cred.replace("Foto: ", "Foto: "))}</figcaption></figure>')


# ---------- leer guiones ----------
articulos = []
for f in sorted(DATOS.glob("*.json")):
    s = json.load(open(f, encoding="utf-8"))
    largo = "largo" in f.stem
    tit = s["titulo"]
    if largo:
        marca = tit.split(":")[0].strip()
        sl = f"historia-de-{slug(marca)}"
    else:
        marca = None
        coche = re.sub(r"^4 cosas que no sabías del?\s+", "", tit).strip()
        sl = slug(coche)
    articulos.append(dict(fichero=f, s=s, largo=largo, titulo=tit, marca=marca, slug=sl,
                          coche=None if largo else coche))

marcas_largo = {slug(a["marca"]): a for a in articulos if a["largo"]}
enlaces = {}

for a in articulos:
    s, rel = a["s"], "../../"
    url = f"{SITE}historia/{a['slug']}/"
    imgs = s.get("imagenes", {})
    portada = None
    partes = []
    if a["largo"]:
        h1 = f"{a['marca']}: la historia completa"
        intro = []
        cuerpo_txt = []
        for i, e in enumerate(s["escenas"]):
            v = e.get("v", {})
            texto = limpia(e["frases"])
            if v.get("foto"):
                src = imagen(v["foto"], imgs.get(v["foto"], ""))
                if src and not portada:
                    portada = src
                if v.get("cred"):
                    partes.append(figura("../" + src if src else None, v.get("etiqueta", a["marca"]), v["cred"]))
            if e.get("cap") and titulo_escena(e):
                partes.append(f"<h2>{esc(titulo_escena(e))}</h2>")
            if texto:
                partes.append(f"<p>{esc(texto)}</p>")
                cuerpo_txt.append(texto)
        desc = (" ".join(cuerpo_txt)[:150].rsplit(" ", 1)[0] + "…")
        title = f"Historia de {a['marca']}: de sus inicios a hoy | Par Motor"
        relacionados = [b for b in articulos if not b["largo"] and slug(b["coche"]).startswith(slug(a["marca"]).split("-")[0])]
        extra = ""
        if relacionados:
            extra = "<h2>Más curiosidades de " + esc(a["marca"]) + "</h2><ul class=\"cards\">" + "".join(
                f'<li><a href="../{b["slug"]}/"><span>{esc(b["titulo"])}</span></a></li>' for b in relacionados) + "</ul>"
        cuerpo = (f'<p class="crumbs"><a href="{rel}">Par Motor</a> › <a href="../">Historia del motor</a> › {esc(a["marca"])}</p>'
                  f'<span class="tag">Historia del motor</span><h1>{esc(h1)}</h1>' + "\n".join(partes) + extra +
                  f'<h2>¿Cuánto vale hoy un {esc(a["marca"])}?</h2><p>Consulta el precio justo de segunda mano de cualquier modelo, año por año, con el tasador gratis de Par Motor.</p>'
                  f'<a class="btn" href="{rel}tasar/">Ver precios por modelo →</a>')
    else:
        h1 = a["titulo"]
        e0 = s["escenas"][0]
        v0 = e0.get("v", {})
        sub = limpia(e0["frases"][1:]) if len(e0["frases"]) > 1 else ""
        src = imagen(v0["foto"], imgs.get(v0["foto"], "")) if v0.get("foto") else None
        portada = src
        items = [e for e in s["escenas"][1:] if e.get("tipo") != "cierre"]
        lis = "".join(f"<li><h2>{esc(titulo_escena(e))}</h2><p>{esc(limpia(e['frases']))}</p></li>" for e in items if limpia(e["frases"]))
        modelo = modelo_de(a["coche"])
        if modelo:
            enlaces.setdefault(modelo, []).append({"url": f"historia/{a['slug']}/", "titulo": a["titulo"]})
        marca_art = next((m for k, m in marcas_largo.items() if slug(a["coche"]).startswith(k.split("-")[0])), None)
        cta = ""
        if modelo:
            nom = a["coche"]
            cta += (f'<h2>¿Cuánto vale hoy un {esc(nom)}?</h2><p>Mira su precio justo de segunda mano, año por año y con los kilómetros normales para su edad.</p>'
                    f'<a class="btn" href="{rel}tasar/{modelo}/">Precio del {esc(nom)} de segunda mano →</a>')
        else:
            cta += f'<h2>¿Y cuánto vale tu coche?</h2><a class="btn" href="{rel}#tasador">Abrir el tasador gratis →</a>'
        if marca_art:
            cta += f'<p style="margin-top:28px">Y si te gusta la historia, lee <a href="../{marca_art["slug"]}/">{esc(marca_art["marca"])}: la historia completa</a>.</p>'
        cuerpo = (f'<p class="crumbs"><a href="{rel}">Par Motor</a> › <a href="../">Historia del motor</a> › {esc(a["coche"])}</p>'
                  f'<span class="tag">Curiosidades · Historia del motor</span><h1>{esc(h1)}</h1>'
                  + (f'<p class="lead">{esc(sub)}</p>' if sub else "")
                  + figura("../" + src if src else None, v0.get("etiqueta", a["coche"]), v0.get("cred", ""))
                  + f"<ol>{lis}</ol>" + cta)
        primera = limpia(items[0]["frases"]) if items else ""
        desc = f"{sub} {primera}".strip()
        desc = desc[:155].rsplit(" ", 1)[0] + "…" if len(desc) > 158 else desc
        title = f"{a['titulo']} | Par Motor"
    img_abs = f"{SITE}historia/{portada}" if portada else None
    ld = {"@context": "https://schema.org", "@graph": [
        {"@type": "Article", "headline": h1[:110], "description": desc, "inLanguage": "es-ES",
         "mainEntityOfPage": url, "datePublished": HOY, "dateModified": HOY,
         "author": {"@type": "Organization", "name": "Par Motor", "url": SITE},
         "publisher": {"@type": "Organization", "name": "Par Motor", "logo": {"@type": "ImageObject", "url": SITE + "og.png"}},
         **({"image": img_abs} if img_abs else {})},
        {"@type": "BreadcrumbList", "itemListElement": [
            {"@type": "ListItem", "position": 1, "name": "Par Motor", "item": SITE},
            {"@type": "ListItem", "position": 2, "name": "Historia del motor", "item": SITE + "historia/"},
            {"@type": "ListItem", "position": 3, "name": a["marca"] or a["coche"], "item": url}]}]}
    a["portada"], a["desc"] = portada, desc
    d = OUT / a["slug"]
    d.mkdir(parents=True, exist_ok=True)
    (d / "index.html").write_text(pagina(rel, url, title, desc, cuerpo, ld, img_abs), encoding="utf-8")

# ---------- índice ----------
def tarjeta(a):
    img = f'<img src="{a["portada"]}" alt="" loading="lazy" decoding="async" width="300" height="200">' if a["portada"] else ""
    return f'<li><a href="{a["slug"]}/">{img}<span>{esc(a["titulo"])}</span></a></li>'

largos = [a for a in articulos if a["largo"]]
cortos = sorted([a for a in articulos if not a["largo"]], key=lambda a: a["coche"].lower())
cuerpo = (f'<p class="crumbs"><a href="../">Par Motor</a> › Historia del motor</p><span class="tag">Historia del motor</span>'
          '<h1>Historia del motor</h1><p class="lead">La historia completa de las grandes marcas y las curiosidades de los coches más míticos, '
          'con fotos reales de Wikimedia Commons. Cada semana, una marca nueva; cada día, un coche.</p>'
          '<h2>La historia completa de cada marca</h2><ul class="cards">' + "".join(map(tarjeta, largos)) + '</ul>'
          '<h2>4 cosas que no sabías de…</h2><ul class="cards">' + "".join(map(tarjeta, cortos)) + '</ul>'
          '<h2>¿Y tu coche, cuánto vale?</h2><a class="btn" href="../#tasador">Abrir el tasador gratis →</a>')
ld = {"@context": "https://schema.org", "@type": "CollectionPage", "name": "Historia del motor", "url": SITE + "historia/",
      "hasPart": [{"@type": "Article", "headline": a["titulo"], "url": f"{SITE}historia/{a['slug']}/"} for a in articulos]}
(OUT / "index.html").write_text(
    pagina("../", SITE + "historia/", "Historia del motor: marcas y coches míticos | Par Motor",
           "La historia completa de Ferrari, Porsche, Volkswagen, BMW, Mercedes y más marcas, y curiosidades de los coches más míticos. Con fotos reales.",
           cuerpo, ld).replace('href="../../', 'href="../').replace("../img/", "img/"), encoding="utf-8")

json.dump(enlaces, open(OUT / "enlaces.json", "w", encoding="utf-8"), ensure_ascii=False, indent=1)
print(len(articulos), "artículos;", len(enlaces), "modelos enlazados;", sum(1 for a in articulos if a["portada"]), "con foto")
