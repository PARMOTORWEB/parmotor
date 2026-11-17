#!/usr/bin/env python3
"""Locutor de Par Motor: convierte un guion en una locución natural para Reels, TikTok y Shorts.

Motor: Chatterbox Multilingual (Resemble AI, licencia MIT; añade una marca de agua inaudible
que identifica el audio como generado por IA). Se ejecuta en CPU desde el entorno
/home/user/.venv-voz.

Guion (JSON):
{
  "estilo": "intriga" | "informativo" | "dinamico" | "narrativo",
  "voz": "ruta/a/referencia.wav" (opcional: timbre de referencia; si falta, voz por defecto),
  "frases": ["texto", "texto {rapido}", "[pausa]", "texto {lento}", ...]
}
  · [pausa]           pausa estratégica antes de revelar algo
  · {rapido} / {lento} acelera o frena ligeramente esa frase (sin cambiar el tono)

Uso: HF_HUB_DISABLE_XET=1 /home/user/.venv-voz/bin/python herramientas/locutor.py guion.json salida.wav [semilla]
Escribe salida.wav (masterizado a -14 LUFS) y salida.json con el inicio y fin de cada frase.
"""
import json, random, re, subprocess, sys, tempfile
from pathlib import Path

import numpy as np
import soundfile as sf
import torch

# Parámetros por estilo. En Chatterbox, «exaggeration» sube la emoción y la energía;
# «cfg» bajo hace el habla más pausada y deliberada; «temperature» añade variación.
ESTILOS = {
    "intriga":     dict(exag=0.55, cfg=0.40, temp=0.80, pausa=(0.22, 0.42), tempo=1.00),
    "informativo": dict(exag=0.45, cfg=0.50, temp=0.75, pausa=(0.16, 0.34), tempo=1.02),
    "dinamico":    dict(exag=0.70, cfg=0.45, temp=0.85, pausa=(0.10, 0.24), tempo=1.04),
    "narrativo":   dict(exag=0.40, cfg=0.35, temp=0.70, pausa=(0.30, 0.55), tempo=0.97),
}
PAUSA_REVELACION = (0.55, 0.80)
_modelo = None


def modelo():
    global _modelo
    if _modelo is None:
        torch.set_num_threads(4)
        from chatterbox.mtl_tts import ChatterboxMultilingualTTS
        _modelo = ChatterboxMultilingualTTS.from_pretrained(device="cpu")
    return _modelo


def recortar(a, sr, margen=0.04, umbral_db=-42):
    """Quita el silencio de principio y fin que deja el modelo (deja 40 ms de aire)."""
    if len(a) == 0:
        return a
    ventana = int(sr * 0.01)
    e = np.array([np.sqrt(np.mean(a[i:i + ventana] ** 2) + 1e-12) for i in range(0, len(a), ventana)])
    db = 20 * np.log10(e / (e.max() + 1e-12))
    voz = np.where(db > umbral_db)[0]
    if len(voz) == 0:
        return a
    i0 = max(0, voz[0] * ventana - int(margen * sr))
    i1 = min(len(a), (voz[-1] + 1) * ventana + int(margen * sr))
    return a[i0:i1]


def tempo(a, sr, factor, tmp):
    """Cambia la velocidad sin cambiar el tono (atempo de ffmpeg)."""
    if abs(factor - 1) < 0.005:
        return a
    i, o = tmp / "t_in.wav", tmp / "t_out.wav"
    sf.write(i, a, sr)
    subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-i", i, "-filter:a", f"atempo={factor:.4f}", o], check=True)
    b, _ = sf.read(o, dtype="float32")
    return b


def locutar(guion, salida, semilla=7):
    rnd = random.Random(semilla)
    est = ESTILOS[guion.get("estilo", "informativo")]
    m = modelo()
    sr = m.sr
    ref = guion.get("voz")
    tmp = Path(tempfile.mkdtemp(prefix="locutor-"))
    trozos, marcas, t = [], [], 0.0
    pendiente = None  # pausa que va antes de la próxima frase
    frases = guion["frases"]
    for n, fr in enumerate(frases):
        if fr.strip() == "[pausa]":
            pendiente = rnd.uniform(*PAUSA_REVELACION)
            continue
        ritmo = est["tempo"] * rnd.uniform(0.98, 1.02)
        if "{rapido}" in fr: ritmo *= 1.06
        if "{lento}" in fr: ritmo *= 0.93
        texto = re.sub(r"\{(rapido|lento)\}", "", fr).strip()
        torch.manual_seed(semilla * 1000 + n)
        kw = dict(language_id="es", exaggeration=max(0.25, est["exag"] + rnd.uniform(-0.05, 0.05)),
                  cfg_weight=est["cfg"], temperature=est["temp"])
        if ref:
            kw["audio_prompt_path"] = ref
        wav = m.generate(texto, **kw).squeeze(0).numpy().astype("float32")
        wav = tempo(recortar(wav, sr), sr, ritmo, tmp)
        if trozos:  # pausa entre frases: nunca igual, más larga tras punto y aparte
            p = pendiente if pendiente else rnd.uniform(*est["pausa"])
            if texto.endswith("?") or frases[n - 1].rstrip().endswith((".", "!", "?")):
                p *= rnd.uniform(1.0, 1.2)
            trozos.append(np.zeros(int(p * sr), dtype="float32")); t += p
        elif pendiente:
            trozos.append(np.zeros(int(pendiente * sr), dtype="float32")); t += pendiente
        pendiente = None
        marcas.append({"texto": texto, "inicio": round(t, 3), "fin": round(t + len(wav) / sr, 3)})
        trozos.append(wav); t += len(wav) / sr
    crudo = tmp / "crudo.wav"
    sf.write(crudo, np.concatenate(trozos), sr)
    # Masterización para redes: sin graves de ruido, compresión suave y volumen estándar (-14 LUFS)
    subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-i", crudo, "-af",
                    "highpass=f=75,acompressor=threshold=-21dB:ratio=2.2:attack=10:release=140:makeup=1.5,"
                    "loudnorm=I=-14:TP=-1.5:LRA=8", "-ar", "44100", "-ac", "1", salida], check=True)
    Path(salida).with_suffix(".json").write_text(json.dumps(marcas, ensure_ascii=False, indent=1))
    return marcas


if __name__ == "__main__":
    g = json.loads(Path(sys.argv[1]).read_text())
    marcas = locutar(g, sys.argv[2], int(sys.argv[3]) if len(sys.argv) > 3 else 7)
    print(f"{sys.argv[2]}: {marcas[-1]['fin']:.1f} s, {len(marcas)} frases")
