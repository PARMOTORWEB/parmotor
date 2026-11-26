# Índice de producción · Semana 51 y siguientes · TOP 15
Director de producción · 26-11-2026. Fichas por vídeo en esta carpeta. Imágenes en `social/2026-12-DD/` (1080×1920). Todas en estado «por generar».

## Reglas comunes (valen para los 14 cortos y L1)
- **Tipos de diapositiva** (todos salen de la plantilla `slide()` de `herramientas/redes.mjs`): FOTO (foto + título), BIG (cifra grande `.big`), FILAS/LISTA (cuerpo con filas), píldoras `.pill.ok/.ko`, CTA (`ctaSlide`, con mini-captura). Etiqueta en recuadro acento #e4ff4f; título en Barlow Condensed 800 cursiva mayúsculas con `<em>` en acento; texto Inter 600.
- **Formato**: el formato `vid` de `redes.mjs` es 1080×1350 y el brief de cortos es 1080×1920: renderizar las imágenes en el formato `tt` (1080×1920) o añadir un `vid` 9:16. L1 necesita un formato `yt` 1920×1080.
- **Ritmo**: cada corto son 4 escenas de 7–14 s. Para acercarse a un cambio cada 1,5–3 s: subtítulos de 2–4 palabras (cambian cada 1,5–2,5 s), zoom lento alterno (in/out 100↔110 %) y corte seco entre diapositivas; en las FILAS, aparición escalonada de las filas si `video.py` lo admite. Opcional (no obligatorio): dividir las escenas largas en dos diapositivas.
- **Plano final**: logo PAR MOTOR + CTA fijo 1,5 s tras vid-4. La «captura puente» (2 s) va dentro de vid-4: captura Playwright en móvil 390×844 (×3) de la ficha `/tasar/<slug>/` o de la herramienta con el modelo cargado, guardada como `social/2026-12-DD/NN-slug-cap.png`.
- **Subtítulos** quemados, mayúsculas, 2–4 palabras, palabra clave en #e4ff4f (la lista de cada ficha).
- **Música**: sin derechos. Informativo 100–110 BPM electrónica suave · dinámico 120–128 BPM percusión ligera · intriga 80–90 BPM pad oscuro con pulso grave · narrativo 90–100 BPM piano/ambient. Fuente: YouTube Audio Library (comprobar la licencia de la pista el día; atribución en la descripción si la exige) o la biblioteca de música de la propia plataforma (Instagram/TikTok); alternativa Pixabay Music. Voz por encima (−18 dB de música). SFX «tic»/whoosh de las mismas bibliotecas. No se nombran pistas hasta elegirlas.
- **IA**: la voz (Chatterbox) es sintética: marcar `isAiGenerated`/`isAigc` en todos. No hay vídeo ni imágenes generadas por IA, ni coches inventados.
- **Avisos**: «Precio orientativo, no es una tasación oficial» en todo lo que nombra tasador o ficha. No mostrar «2026» en pantalla. Créditos de foto («Foto: autor · licencia (Wikimedia Commons)») en la diapositiva y en la descripción.
- **Fotos**: las de las fichas viven en `assets/modelos/<slug>.webp` (no están en el checkout parcial: la fábrica las lee del repositorio completo). Varias son de otra generación o variante que la del vídeo (Corsa-e, Tucson PHEV, Golf VIII, Yaris IV, etc.): pie «foto ilustrativa». Las licencias «CC BY-SA 3.0 de» (autor «© M 93») tienen que confirmarse en Commons antes de publicar.

## Imágenes por crear
| Ruta | Tipo | Foto / crédito | Estado |
|---|---|---|---|
| social/2026-12-15/02-golf-distinto-motor-vid-1..4.jpg | FOTO+cifra · FILAS · FILAS+píldora · CTA | vid-1 `2020_Volkswagen_Golf_Style_1.5_Front.jpg` · Vauxford · CC BY-SA 4.0 | por generar |
| social/2026-12-15/02-golf-distinto-motor-cap.png | captura | /tasar/volkswagen-golf/ | por capturar |
| social/2026-12-16/09-sandero-cuanto-pierde-vid-1..4.jpg | FOTO+cifra · FILAS · BIG · CTA | vid-1 `2023_Dacia_Sandero_III_DSC_6012.jpg` · Alexander-93 · CC BY-SA 4.0 | por generar |
| …/09-sandero-cuanto-pierde-cap.png | captura | /tasar/dacia-sandero/ | por capturar |
| social/2026-12-17/14-tucson-vs-sportage-al-mes-vid-1..4.jpg | FOTO doble · FILAS · BIG · CTA | `Hyundai_Tucson_1.6_T-GDI_PHEV_Prime_(IV)_–_f_05072025.jpg` · «© M 93» · CC BY-SA 3.0 de · `2025_Kia_Sportage_S_front_only.jpg` · LuvsMG481 · CC BY-SA 4.0 | cifras listas: ver `guiones/2026-W51/CALCULOS.md`|
| …/14-tucson-vs-sportage-al-mes-cap.png | captura | #calculadora con los dos coches | cifras listas: ver `guiones/2026-W51/CALCULOS.md`|
| social/2026-12-18/35-cuando-vender-corsa-vid-1..4.jpg | FOTO+cifra · BIG · FILAS · CTA | `Opel_Corsa-e_at_IAA_2019_IMG_0738.jpg` · Alexander Migl · CC BY-SA 4.0 (es un Corsa-e, ilustrativa) | por generar |
| …/35-cuando-vender-corsa-cap.png | captura | /tasar/opel-corsa/ | por capturar |
| social/2026-12-19/18-tienes-10000-euros-vid-1..4.jpg | BIG · FILAS · LISTA · CTA | sin foto | cifras listas: ver `guiones/2026-W51/CALCULOS.md`|
| …/18-tienes-10000-euros-cap.png | captura | #asesor con 10.000 € | cifras listas: ver `guiones/2026-W51/CALCULOS.md`|
| social/2026-12-20/27-tiguan-version-y-motor-vid-1..4.jpg | FOTO+cifra · FILAS+píldora · FILAS · CTA | `Volkswagen_Tiguan_III_IMG_8823_(cropped).jpg` · Alexander-93 · CC BY-SA 4.0 | por generar |
| …/27-tiguan-version-y-motor-cap.png | captura | /tasar/volkswagen-tiguan/ | por capturar |
| social/2026-12-21/30-chollo-o-caro-ibiza-2019-vid-1..4.jpg | FOTO+cifra · BIG+píldora · FILAS · CTA | `2018_SEAT_Ibiza_SE_Technology_MPi_1.0_Front.jpg` · Vauxford · CC BY-SA 4.0 | por generar |
| …/30-chollo-o-caro-ibiza-2019-cap.png | captura | /tasar/seat-ibiza/ | por capturar |
| social/2026-12-22/53-caso-yaris-2018-vid-1..4.jpg | FOTO · BIG · FILAS+píldoras · CTA | `2020_Toyota_Yaris_Design_HEV_CVT_1.5_Front.jpg` · Vauxford · CC BY-SA 4.0 | cifras listas: ver `guiones/2026-W51/CALCULOS.md`|
| …/53-caso-yaris-2018-cap.png | captura | /tasar/toyota-yaris/ (+ resultado del tasador) | cifras listas: ver `guiones/2026-W51/CALCULOS.md`|
| social/2026-12-23/48-electrico-mas-barato-vid-1..4.jpg | LISTA · BIG · BIG+dato · CTA | vid-3 `Renault_Zoe_R110_Z.E._50_Experience_(Facelift)_–_f_22112020.jpg` · «© M 93» · CC BY-SA 3.0 de | cifras listas: ver `guiones/2026-W51/CALCULOS.md`|
| …/48-electrico-mas-barato-cap.png | captura | #calculadora | cifras listas: ver `guiones/2026-W51/CALCULOS.md`|
| social/2026-12-24/51-150000-km-y-el-tasador-vid-1..4.jpg | BIG · LISTA · LISTA · CTA | sin foto | cifras listas: ver `guiones/2026-W51/CALCULOS.md`|
| …/51-150000-km-y-el-tasador-cap.png | captura | #tasador | por capturar |
| social/2026-12-25/07-suzuki-jimny-casi-no-baja-vid-1..4.jpg | FOTO+cifra · FILAS · FILAS+píldora · CTA | `2019_Suzuki_Jimny_SZ5_4X4_Automatic_1.5.jpg` · Vauxford · CC BY-SA 4.0 | por generar |
| …/07-suzuki-jimny-casi-no-baja-cap.png | captura | /tasar/suzuki-jimny/ | por capturar |
| social/2026-12-26/25-kilometros-que-no-cuadran-vid-1..4.jpg | LISTA · BIG · LISTA · CTA | sin foto | cifras listas: ver `guiones/2026-W51/CALCULOS.md`|
| …/25-kilometros-que-no-cuadran-cap.png | captura | #tasador | por capturar |
| social/2026-12-27/59-museo-del-box-fiat-panda-vid-1..4.jpg | FOTO museo · LISTA · FOTO+FILAS · CTA | vid-3 `2018_Fiat_Panda_Easy_1.2.jpg` · Vauxford · CC BY-SA 4.0; vid-1/2 foto Panda I: PENDIENTE de elegir en Commons (o diapositivas de texto) | parcial |
| …/59-museo-del-box-fiat-panda-cap.png | captura | /tasar/fiat-panda/ | por capturar |
| social/2026-12-28/40-uno-de-enero-y-el-carburante-vid-1..4.jpg | BIG · FILAS · LISTA · CTA | sin foto | cifras listas: ver `guiones/2026-W51/CALCULOS.md`|
| …/40-uno-de-enero-y-el-carburante-cap.png | captura | #radar | por capturar |
| L1 (YouTube 16:9): gráficos de las 6 curvas, tabla €/mes, miniatura | gráfico + miniatura | 6 fotos de fichas (ver L1) | cifras listas: ver `guiones/2026-W51/CALCULOS.md`|

## Portadas / miniaturas (≤3 palabras)
02 «GOLF · 8.200 €» · 09 «SANDERO: ¿CUÁNTO PIERDE?» · 14 «TUCSON VS SPORTAGE» · 35 «¿CUÁNDO VENDER?» · 18 «TIENES 10.000 €» · 27 «TIGUAN: 8.200 €» · 30 «¿CHOLLO O CARO?» · 53 «YARIS 2018» · 48 «¿ELÉCTRICO MÁS BARATO?» · 51 «+100.000 KM» · 07 «JIMNY NO BAJA» · 25 «KM NO CUADRAN» · 59 «PANDA: ¿CUÁNTO VALE?» · 40 «31 DE DICIEMBRE» · L1 «−19 % vs −67 %».

## TRASPASO
- **Para:** community-manager
- **De:** Director de producción
- **Hecho:** 14 fichas de cortos y la de L1 en `agencia/produccion/2026-W51/`, con esta tabla.
- **Pendiente antes de publicar:** las cifras <<C>> ya están (ver `guiones/2026-W51/CALCULOS.md`) y el 25 está verificado; falta reverificar el 40 el 27-dic; elegir foto histórica del Panda I; confirmar la versión de la licencia «CC BY-SA 3.0 de» de las fotos de M 93 (Tucson, Zoe). Nada se publica sin el sí del dueño.
- **Riesgos:** varias fotos de ficha son de otra variante (Corsa-e, Tucson PHEV, Zoe R110): rotular «foto ilustrativa»; marcar IA (voz) en cada plataforma; créditos en la descripción.
