#!/usr/bin/env python3
"""Réplica en Python del motor del tasador de Par Motor (valueAt de index.html).

Lee la base de datos RAW y las constantes directamente de index.html, así que siempre usa
los mismos datos que la web publicada en esa copia. Sirve para que la agencia saque cifras
[ESTIMACIÓN Par Motor] para guiones sin abrir el navegador.

Uso:
  python3 agencia/herramientas-agencia/tasador.py "Toyota" "Yaris" 2018 90000|normal [estado]
  («normal» = los km que usan las fichas /tasar/ para esa edad)
  python3 agencia/herramientas-agencia/tasador.py --versiones "Toyota" "Yaris"
estado: 1 = bueno (por defecto en la web). Imprime una línea por versión del año pedido.
"""
import re, sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
import os
# Por defecto usa el index.html local; con PARMOTOR_INDEX=<ruta> usa otro (p. ej. el último de origin/main:
#   git fetch origin main && git show origin/main:index.html > /tmp/index.html)
html = Path(os.environ.get("PARMOTOR_INDEX", ROOT / "index.html")).read_text(encoding="utf-8")

raw = html[html.index("const RAW = `") + len("const RAW = `"): html.index("`;", html.index("const RAW = `"))]
NOW = eval(re.search(r"const NOW = ([^;]+);", html).group(1))
INFL = float(re.search(r"const INFL = ([\d.]+);", html).group(1))
MARKET = float(re.search(r"const MARKET = ([\d.]+);", html).group(1))
FUEL = {"G": (1, 15000), "D": (0.97, 20000), "H": (1.05, 15000), "P": (0.9, 15000), "E": (0.85, 15000)}
assert 'G:{l:"Gasolina",f:1,kmY:15000}' in html and 'E:{l:"Eléctrico",f:0.85,kmY:15000}' in html, "FUEL ha cambiado en index.html: actualiza este script"
VW = {"Volkswagen", "Seat", "Skoda", "Cupra"}
assert '["Volkswagen","Seat","Skoda","Cupra"].includes(mk) ? 0.87 : 1' in html, "La calibración VW ha cambiado: actualiza este script"


def parse():
    db = []
    for line in raw.strip().split("\n"):
        mk, md, k, *gs = line.split("|")
        k = float(k) * (0.87 if mk in VW else 1)
        gens = []
        for g in gs:
            name, yr, vs = g.split("~")
            y0, y1 = map(int, yr.split("-"))
            vers = []
            for x in vs.split(";"):
                f = x.split(",")
                r = [f[0], float(f[1]), f[2], float(f[3]), float(f[4]) if len(f) > 4 and f[4] else None]
                vers.append(r)
            gens.append({"g": name, "y": (y0, y1), "v": vers})
        db.append({"mk": mk, "md": md, "k": k, "gens": gens})
    return db


def retained(age, k):
    f = 1 - 0.20 * age if age < 1 else 0.80 * 0.91 ** (age - 1)
    return max(f, 0.07) ** k


def value_at(model, ver, year, age, km, st=1):
    pvp_hoy = ver[3] * (1 + INFL) ** (NOW - year)
    k = ver[4] if ver[4] is not None else model["k"]
    f, km_y = FUEL[ver[2]]
    base = pvp_hoy * retained(age, k) * f * MARKET
    exp = km_y * age
    km_adj = min(1.15, max(0.7, 1 - 0.03 * (km - exp) / 10000 - (0.04 * (km - 70000) / 10000 if km > 70000 else 0)))
    return max(1200, base * km_adj * st), pvp_hoy


def find(db, mk, md):
    for m in db:
        if m["mk"].lower() == mk.lower() and m["md"].lower() == md.lower():
            return m
    raise SystemExit(f"No encuentro {mk} {md}. Marcas/modelos parecidos: " +
                     ", ".join(f'{m["mk"]} {m["md"]}' for m in db if mk.lower() in m["mk"].lower())[:400])


if __name__ == "__main__":
    db = parse()
    if sys.argv[1] == "--versiones":
        m = find(db, sys.argv[2], sys.argv[3])
        for g in m["gens"]:
            print(g["g"], g["y"], "|", "; ".join(f'{v[0]} {int(v[1])}CV {v[2]} PVP {int(v[3])}' for v in g["v"]))
        sys.exit()
    mk, md, year, km_arg = sys.argv[1], sys.argv[2], int(sys.argv[3]), sys.argv[4]
    st = float(sys.argv[5]) if len(sys.argv) > 5 else 1
    m = find(db, mk, md)
    age = max(0.25, NOW - (year + 0.5))  # igual que ageOf() de la web
    for g in m["gens"]:
        if g["y"][0] <= year <= g["y"][1]:
            for v in g["v"]:
                km = min(100000, round(FUEL[v[2]][1] * age / 5000) * 5000) if km_arg == "normal" else int(km_arg)  # kmOf() de las fichas
                val, pvp = value_at(m, v, year, age, km, st)
                print(f'{m["mk"]} {m["md"]} · {g["g"]} · {v[0]} ({int(v[1])} CV, {v[2]}) · {year} · {km} km → {round(val, -2):,.0f} € (PVP de entonces {int(v[3]):,} €)'.replace(",", "."))
