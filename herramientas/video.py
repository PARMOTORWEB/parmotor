#!/usr/bin/env python3
"""Monta un vídeo vertical (1080x1920) con voz en off y subtítulos sincronizados.

Uso: python3 herramientas/video.py guion.json salida.mp4

guion.json:
{
  "voz": "davefx",                       # davefx (masculina) o sharvard
  "escenas": [
    {"imagen": "social/…/ig-1.jpg"  (formato 4:5),
     "frases": [{"voz": "texto que se lee", "sub": "texto que se ve"}, …]},
    …
  ]
}
"sub" es opcional (si falta, se muestra lo mismo que se lee). La voz es Piper (local,
sin conexión); los modelos están en .voces/ y las fuentes de los subtítulos en .fuentes-ttf/.
"""
import json, subprocess, sys, tempfile, wave
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
FPS, W, H, PAUSA = 30, 1080, 1920, 0.28


def run(*a):
    subprocess.run(a, check=True, stdout=subprocess.DEVNULL, stderr=subprocess.PIPE)


def sin_emoji(s):
    """La tipografía de la marca no tiene emojis: se quitan de los subtítulos."""
    return " ".join("".join(ch for ch in s if ord(ch) < 0x2190 or ch in "€−–—…").split())


def ts(t):
    h, r = divmod(t, 3600); m, s = divmod(r, 60)
    return f"{int(h)}:{int(m):02d}:{s:05.2f}"


def main(spec_path, out):
    spec = json.loads(Path(spec_path).read_text())
    modelo = ROOT / ".voces" / f"es_ES-{spec.get('voz', 'davefx')}-medium.onnx"
    tmp = Path(tempfile.mkdtemp(prefix="video-"))
    wavs, subs, clips, t = [], [], [], 0.0
    silencio = tmp / "silencio.wav"
    run("ffmpeg", "-y", "-f", "lavfi", "-i", "anullsrc=r=22050:cl=mono", "-t", str(PAUSA), silencio)
    for i, esc in enumerate(spec["escenas"]):
        t0 = t
        for j, fr in enumerate(esc["frases"]):
            w = tmp / f"f{i}_{j}.wav"
            subprocess.run([sys.executable, "-m", "piper", "-m", str(modelo), "-f", str(w), "--length-scale", "0.95"],
                           input=fr["voz"].encode(), check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
            with wave.open(str(w)) as f:
                d = f.getnframes() / f.getframerate()
            subs.append((t, t + d, fr.get("sub", fr["voz"])))
            wavs += [w, silencio]
            t += d + PAUSA
        dur = t - t0
        # zoom lento sobre la imagen de la escena
        c = tmp / f"c{i}.mp4"
        n = int(round(dur * FPS))
        # imagen 4:5 arriba (1000x1250 en y=100) con zoom lento; abajo queda la franja de subtítulos
        run("ffmpeg", "-y", "-f", "lavfi", "-i", f"color=c=0x0f0f0e:s={W}x{H}:r={FPS}", "-loop", "1", "-i", str(ROOT / esc["imagen"]),
            "-filter_complex",
            f"[1:v]scale=2000:2500,zoompan=z='min(1+0.0008*on,1.10)':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d={n}:s=1000x1250:fps={FPS}[img];"
            f"[0:v][img]overlay=40:100,format=yuv420p",
            "-frames:v", str(n), "-c:v", "libx264", "-preset", "veryfast", "-crf", "20", c)
        clips.append(c)
    # audio
    lista = tmp / "audio.txt"
    lista.write_text("".join(f"file '{w}'\n" for w in wavs))
    voz = tmp / "voz.wav"
    run("ffmpeg", "-y", "-f", "concat", "-safe", "0", "-i", lista, "-ar", "44100", voz)
    # vídeo
    lv = tmp / "video.txt"
    lv.write_text("".join(f"file '{c}'\n" for c in clips))
    mudo = tmp / "mudo.mp4"
    run("ffmpeg", "-y", "-f", "concat", "-safe", "0", "-i", lv, "-c", "copy", mudo)
    # subtítulos ASS con la tipografía de la marca (abajo, por encima de la interfaz de TikTok/Reels)
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
""" + "".join(f"Dialogue: 0,{ts(a)},{ts(b)},Sub,,0,0,0,,{{\\fad(80,60)}}{sin_emoji(s).upper()}\n" for a, b, s in subs))
    run("ffmpeg", "-y", "-i", mudo, "-i", voz, "-vf", f"ass={ass}:fontsdir={ROOT / '.fuentes-ttf'}",
        "-c:v", "libx264", "-preset", "medium", "-crf", "21", "-pix_fmt", "yuv420p",
        "-c:a", "aac", "-b:a", "160k", "-shortest", "-movflags", "+faststart", out)
    print(f"{out}  ({t:.1f} s, {len(subs)} subtítulos)")


if __name__ == "__main__":
    main(*sys.argv[1:3])
