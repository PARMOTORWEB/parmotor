#!/usr/bin/env python3
"""Monta el vídeo «5 cosas que no sabías del Golf GTI» con la animación de papel y la voz E.

Uso (desde la raíz del repositorio):
    python3 social/golf-gti-50/montar.py [salida.mp4]

Pasos:
 1. Lee voz/voz.json (inicio y fin de cada frase de voz/voz.wav) y calcula voz/timemap.json:
    qué instante de la animación corresponde a cada instante de la voz.
 2. Renderiza los fotogramas con animacion/render.js (Node + Playwright + Chromium).
 3. Genera los efectos (golpes, whoosh, pops) en sus nuevos tiempos, mezcla con la voz a -14 LUFS y codifica.

Para cambiar la voz: genera voz/voz.wav con herramientas/locutor.py (voz/guion.json) y revisa voz/voz.json:
debe tener exactamente 16 frases en el orden de OLD; corrige a mano el inicio de los «¡Uno!», «¡Dos!»…
si la alineación automática los confunde.
"""
import json, subprocess, sys, tempfile
from pathlib import Path

AQUI = Path(__file__).resolve().parent
VOZ = AQUI / "voz"
SALIDA = Path(sys.argv[1]) if len(sys.argv) > 1 else AQUI / "golf-gti-50-vozE.mp4"

# Inicio y fin de cada frase en la línea de tiempo original de la animación (41,33 s)
OLD = [(0.21, 2.30), (2.33, 4.20), (4.46, 7.60), (7.96, 12.10), (12.58, 14.80), (14.83, 16.30), (16.33, 17.60),
       (18.71, 21.33), (21.36, 23.80), (23.83, 25.85), (26.21, 29.05), (29.08, 31.30), (31.58, 34.10),
       (34.12, 36.50), (36.71, 38.30), (38.33, 41.20)]
# Instantes de la animación con efectos de sonido
GOLPES = [0.25, 3.37, 4.5, 5.87, 12.62, 16.87, 18.75, 20.75, 25.42, 26.25, 27.62, 31.62, 34.37, 35.5, 38.87, 39.25]
WHOOSH = [4.3, 12.3, 18.4, 26.0, 31.45, 36.6]
POPS = [8.0 + i * .09 for i in range(6)] + [32.65 + i * .09 for i in range(0, 30, 3)]


def run(*a):
    subprocess.run([str(x) for x in a], check=True)


def main():
    marcas = json.loads((VOZ / "voz.json").read_text())
    assert len(marcas) == len(OLD), f"voz.json tiene {len(marcas)} frases; se esperan {len(OLD)}"
    old, new = [0.0], [0.0]
    for (a, b), m in zip(OLD, marcas):
        old += [a, b]; new += [m["inicio"], m["fin"]]
    dur_voz = float(subprocess.check_output(["ffprobe", "-v", "error", "-show_entries", "format=duration",
                                             "-of", "csv=p=0", str(VOZ / "voz.wav")]))
    D = dur_voz + 0.45
    old.append(41.3333); new.append(D)
    for i in range(1, len(new)):
        assert new[i] >= new[i - 1] and old[i] >= old[i - 1], f"tiempos no crecientes en el punto {i}"
    (VOZ / "timemap.json").write_text(json.dumps({"old": old, "new": new, "end": D}))

    def fwd(t):  # instante de la animación -> instante del vídeo nuevo
        for i in range(1, len(old)):
            if t <= old[i]:
                k = (t - old[i - 1]) / ((old[i] - old[i - 1]) or 1)
                return new[i - 1] + (new[i] - new[i - 1]) * k
        return new[-1]

    tmp = Path(tempfile.mkdtemp(prefix="golf-gti-"))
    print("Renderizando fotogramas…")
    run("node", AQUI / "animacion" / "render.js", VOZ / "timemap.json", tmp / "f")

    g, labs = [], []
    for i, t in enumerate(GOLPES):
        g.append(f"aevalsrc='0.9*sin(2*PI*t*(55+140*exp(-22*t)))*exp(-9*t)+0.25*(random(0)-0.5)*exp(-60*t)':d=0.45:s=48000,"
                 f"volume=-11dB,adelay={int(fwd(t) * 1000)}:all=1[i{i}]"); labs.append(f"[i{i}]")
    for i, t in enumerate(WHOOSH):
        g.append(f"anoisesrc=color=pink:d=0.55:a=0.6:r=48000,highpass=f=400,lowpass=f=5000,afade=t=in:d=0.3:curve=exp,"
                 f"afade=t=out:st=0.3:d=0.25,volume=-19dB,adelay={int(max(0, fwd(t) - 0.3) * 1000)}:all=1[w{i}]"); labs.append(f"[w{i}]")
    for i, t in enumerate(POPS):
        g.append(f"aevalsrc='sin(2*PI*t*(420+800*exp(-45*t)))*exp(-38*t)':d=0.15:s=48000,volume=-23dB,"
                 f"adelay={int(fwd(t) * 1000)}:all=1[p{i}]"); labs.append(f"[p{i}]")
    g.append("".join(labs) + f"amix=inputs={len(labs)}:normalize=0,apad=whole_dur={D},atrim=0:{D}[out]")
    (tmp / "sfx.txt").write_text(";".join(g))
    run("ffmpeg", "-v", "error", "-y", "-filter_complex_script", tmp / "sfx.txt", "-map", "[out]", "-ac", "1", "-ar", "48000", tmp / "sfx.wav")

    af = (f"[1:a]aresample=48000,highpass=f=70,apad=whole_dur={D}[v];[2:a]anull[s];"
          f"[v][s]amix=inputs=2:normalize=0:duration=first,afade=t=out:st={D - 0.35:.3f}:d=0.35")
    medida = subprocess.run(["ffmpeg", "-hide_banner", "-y", "-f", "lavfi", "-i", "anullsrc", "-i", str(VOZ / "voz.wav"),
                             "-i", str(tmp / "sfx.wav"), "-filter_complex", af + ",loudnorm=I=-14:TP=-1.5:LRA=8:print_format=json",
                             "-t", f"{D:.3f}", "-f", "null", "-"], capture_output=True, text=True).stderr
    j = json.loads(medida[medida.rindex("{"):medida.rindex("}") + 1])
    ln = (f"loudnorm=I=-14:TP=-1.5:LRA=8:measured_I={j['input_i']}:measured_TP={j['input_tp']}:measured_LRA={j['input_lra']}:"
          f"measured_thresh={j['input_thresh']}:offset={j['target_offset']}:linear=true,aresample=48000,aformat=channel_layouts=stereo")
    print("Codificando…")
    run("ffmpeg", "-v", "error", "-y", "-framerate", "30", "-i", tmp / "f" / "%05d.jpg", "-i", VOZ / "voz.wav", "-i", tmp / "sfx.wav",
        "-filter_complex", f"{af},{ln}[a];[0:v]format=yuv420p[vv]", "-map", "[vv]", "-map", "[a]",
        "-c:v", "libx264", "-preset", "medium", "-crf", "18", "-profile:v", "high", "-level", "4.2", "-g", "60",
        "-color_primaries", "bt709", "-color_trc", "bt709", "-colorspace", "bt709",
        "-c:a", "aac", "-b:a", "192k", "-movflags", "+faststart", "-t", f"{D:.3f}", SALIDA)
    print(f"Listo: {SALIDA} ({D:.1f} s)")


if __name__ == "__main__":
    main()
