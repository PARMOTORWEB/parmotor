#!/usr/bin/env python3
"""Monta un vídeo vertical (1080x1920) con voz en off natural (voz E, Chatterbox) y subtítulos.

Uso: python3 herramientas/video.py guion.json salida.mp4

guion.json (lo genera herramientas/redes.mjs):
{
  "estilo": "intriga" | "informativo" | "dinamico" | "narrativo",
  "escenas": [
    {"imagen": "social/…/tipo-vid-1.jpg", "frases": ["texto", "[pausa]", "texto {lento}", …]},
    …
  ]
}
La locución la hace herramientas/locutor.py (entorno /home/user/.venv-voz). Los subtítulos
se sincronizan con la voz real (Whisper) y usan la tipografía de la marca (.fuentes-ttf/).
"""
import json, os, re, subprocess, sys, tempfile
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
VENV = Path("/home/user/.venv-voz/bin/python")
FPS, W, H = 30, 1080, 1920


def run(*a):
    subprocess.run([str(x) for x in a], check=True, stdout=subprocess.DEVNULL, stderr=subprocess.PIPE)


def ts(t):
    h, r = divmod(t, 3600); m, s = divmod(r, 60)
    return f"{int(h)}:{int(m):02d}:{s:05.2f}"


def sin_emoji(s):
    """La tipografía de la marca no tiene emojis: se quitan de los subtítulos."""
    return " ".join("".join(ch for ch in s if ord(ch) < 0x2190 or ch in "€−–—…").split())


def trocear(texto, ini, fin, maximo=38):
    """Parte una frase larga en subtítulos cortos (por comas y puntos), repartiendo el tiempo."""
    partes = [p.strip() for p in re.split(r"(?<=[,.:;?!…])\s+", texto) if p.strip()]
    juntas, cur = [], ""
    for p in partes:
        if cur and len(cur) + len(p) + 1 > maximo:
            juntas.append(cur); cur = p
        else:
            cur = (cur + " " + p).strip()
    if cur: juntas.append(cur)
    total = sum(len(j) for j in juntas) or 1
    out, t = [], ini
    for j in juntas:
        d = (fin - ini) * len(j) / total
        out.append((t, t + d, j)); t += d
    return out


def main(spec_path, out):
    spec = json.loads(Path(spec_path).read_text())
    tmp = Path(tempfile.mkdtemp(prefix="video-"))
    # 1) locución completa con el locutor (voz E) y tiempos de cada frase
    frases, escena_de = [], []
    for i, esc in enumerate(spec["escenas"]):
        for fr in esc["frases"]:
            frases.append(fr)
            if fr.strip() != "[pausa]": escena_de.append(i)
    guion = tmp / "guion.json"
    guion.write_text(json.dumps({"estilo": spec.get("estilo", "informativo"), "frases": frases}, ensure_ascii=False))
    voz = tmp / "voz.wav"
    env = {**os.environ, "HF_HUB_DISABLE_XET": "1"}
    subprocess.run([str(VENV), str(ROOT / "herramientas" / "locutor.py"), str(guion), str(voz)], check=True, env=env,
                   stdout=subprocess.DEVNULL)
    marcas = json.loads(voz.with_suffix(".json").read_text())
    dur = float(subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", str(voz)],
                               capture_output=True, text=True).stdout) + 0.6
    # 2) duración de cada escena: desde su primera frase hasta la primera de la siguiente
    inicios = {}
    for k, m in enumerate(marcas):
        inicios.setdefault(escena_de[k], m["inicio"])
    cortes = [0.0] + [max(0.0, inicios[i] - 0.15) for i in range(1, len(spec["escenas"])) if i in inicios] + [dur]
    clips = []
    for i, esc in enumerate(spec["escenas"][:len(cortes) - 1]):
        d = max(0.8, cortes[i + 1] - cortes[i]); n = int(round(d * FPS))
        c = tmp / f"c{i}.mp4"
        # imagen 4:5 arriba (1000x1250 en y=100) con zoom lento; abajo, la franja de subtítulos
        run("ffmpeg", "-y", "-f", "lavfi", "-i", f"color=c=0x0f0f0e:s={W}x{H}:r={FPS}", "-loop", "1", "-i", ROOT / esc["imagen"],
            "-filter_complex",
            f"[1:v]scale=2000:2500,zoompan=z='min(1+0.0008*on,1.10)':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d={n}:s=1000x1250:fps={FPS}[img];"
            f"[0:v][img]overlay=40:100,format=yuv420p",
            "-frames:v", n, "-c:v", "libx264", "-preset", "veryfast", "-crf", "20", c)
        clips.append(c)
    lv = tmp / "video.txt"
    lv.write_text("".join(f"file '{c}'\n" for c in clips))
    mudo = tmp / "mudo.mp4"
    run("ffmpeg", "-y", "-f", "concat", "-safe", "0", "-i", lv, "-c", "copy", mudo)
    # 3) subtítulos ASS: amarillo de la marca, Barlow Condensed, por encima de la interfaz de las apps
    subs = [s for m in marcas for s in trocear(m["texto"], m["inicio"], m["fin"])]
    ass = tmp / "subs.ass"
    ass.write_text(f"""[Script Info]
ScriptType: v4.00+
PlayResX: {W}
PlayResY: {H}
WrapStyle: 0

[V4+ Styles]
Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding
Style: Sub,Barlow Condensed ExtraBold,84,&H004FFFE4,&H00FFFFFF,&H000E0F0F,&H96000000,0,1,0,0,100,100,1,0,1,6,0,2,80,80,360,1

[Events]
Format: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text
""" + "".join(f"Dialogue: 0,{ts(a)},{ts(b)},Sub,,0,0,0,,{{\\fad(60,40)}}{sin_emoji(s).upper()}\n" for a, b, s in subs))
    run("ffmpeg", "-y", "-i", mudo, "-i", voz, "-vf", f"ass={ass}:fontsdir={ROOT / '.fuentes-ttf'}",
        "-c:v", "libx264", "-preset", "medium", "-crf", "22", "-pix_fmt", "yuv420p",
        "-c:a", "aac", "-b:a", "160k", "-shortest", "-movflags", "+faststart", out)
    print(f"{out}  ({dur:.1f} s, {len(subs)} subtítulos)")


if __name__ == "__main__":
    main(*sys.argv[1:3])
