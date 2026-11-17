#!/bin/bash
# Deja lista la máquina para generar vídeos con voz (idempotente: si ya está, no hace nada).
# Uso: bash herramientas/preparar-voz.sh   (desde la raíz del repositorio)
set -e
cd "$(dirname "$0")/.."
VENV=/home/user/.venv-voz
export HF_HUB_DISABLE_XET=1

# Entorno de Python con PyTorch (CPU), Chatterbox, Whisper y utilidades
if ! "$VENV/bin/python" -c "import chatterbox, faster_whisper, num2words, jiwer, soundfile" 2>/dev/null; then
  python3 -m venv "$VENV"
  "$VENV/bin/pip" install -q --upgrade pip
  "$VENV/bin/pip" install -q torch==2.6.0 torchaudio==2.6.0 --index-url https://download.pytorch.org/whl/cpu
  "$VENV/bin/pip" install -q chatterbox-tts faster-whisper soundfile num2words jiwer praat-parselmouth
fi

# Fuentes de la marca en TTF para los subtítulos
if [ ! -s .fuentes-ttf/BarlowCondensed-800i.ttf ]; then
  "$VENV/bin/pip" install -q fonttools brotli
  mkdir -p .fuentes-ttf
  "$VENV/bin/python" -c "
from fontTools.ttLib import TTFont
for f in ['BarlowCondensed-800i', 'Inter-700']:
    t = TTFont('assets/fonts/' + f + '.woff2'); t.flavor = None; t.save('.fuentes-ttf/' + f + '.ttf')"
fi

# Modelos (se descargan la primera vez: Chatterbox ~3 GB y Whisper small)
"$VENV/bin/python" -c "
from chatterbox.mtl_tts import ChatterboxMultilingualTTS; ChatterboxMultilingualTTS.from_pretrained(device='cpu')
from faster_whisper import WhisperModel; WhisperModel('small', device='cpu', compute_type='int8')" >/dev/null 2>&1
echo "Voz lista"
