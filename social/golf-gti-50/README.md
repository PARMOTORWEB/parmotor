# 5 cosas que no sabías del Golf GTI (50 aniversario)

Vídeo vertical para TikTok, Reels y Shorts (1080×1920, 30 fps, unos 42 s), hecho en el chat «Optimización web y vídeo».

- **`golf-gti-50-vozE.mp4`**: vídeo final. Animación de collage de papel + **voz E** (Chatterbox, `herramientas/locutor.py`, estilo `dinamico`, semilla 7) + efectos de sonido, a -14 LUFS.

## Cómo está hecho

| Carpeta / archivo | Qué es |
|---|---|
| `animacion/anim.html` | La animación completa en un `<canvas>`: papel con grano, trazos de rotulador que «hierven» a 10 fps, sellos, tartán GTI, subtítulos tipo pegatina, insignias de capítulo, transiciones de papel rasgado y barra de progreso. `render(f, t)` dibuja el fotograma `f` en el instante `t` de la línea de tiempo original (41,33 s). |
| `animacion/fonts.css`, `animacion/golf.png` | Tipografías de la marca (Barlow Condensed e Inter) y foto del Golf GTI de 1976 (Foto: Volkswagen AG). |
| `animacion/render.js` | Renderiza los fotogramas con Playwright siguiendo `voz/timemap.json`. |
| `voz/guion.json` | Guion para `herramientas/locutor.py`, con `[pausa]` antes de cada curiosidad, que es donde entran las transiciones. |
| `voz/voz.wav`, `voz/voz.json` | Locución con la voz E, ya editada, y el inicio y fin de cada una de las 16 frases. |
| `voz/voz_orig.wav` | Salida sin editar del locutor. Tenía dos fragmentos inventados por el modelo (26,2–28,9 s y 40,1–44,4 s) que se recortaron en `voz.wav`. |
| `montar.py` | Lo junta todo: mapa de tiempos, fotogramas, efectos, mezcla y codificación. |
| `web/par-motor-optimizado.html` | Versión optimizada de la web del 16 de noviembre, solo como referencia. **No es la web publicada**: `index.html` ha cambiado desde entonces. |

## Regenerar el vídeo

Desde la raíz del repositorio (hace falta Node con Playwright y Chromium, y ffmpeg):

```bash
python3 social/golf-gti-50/montar.py
```

## Cambiar la locución

1. Edita `voz/guion.json` y genera la voz (ver `herramientas/preparar-voz.sh`):
   ```bash
   HF_HUB_DISABLE_XET=1 /home/user/.venv-voz/bin/python herramientas/locutor.py social/golf-gti-50/voz/guion.json social/golf-gti-50/voz/voz.wav 7
   ```
2. Escucha el resultado. Chatterbox a veces se inventa sílabas al final de un bloque: recórtalas en las pausas.
3. Revisa `voz/voz.json`: debe tener 16 frases en el orden del guion. La alineación automática puede confundir el «¡Uno!» del capítulo con el «uno» de «uno de segunda mano»; corrige a mano el inicio de «¡Uno!», «¡Dos!», «¡Tres!», «¡Cuatro!» y «¡Cinco!».
4. Ejecuta `montar.py`. La animación se adapta sola al ritmo de la nueva voz.
