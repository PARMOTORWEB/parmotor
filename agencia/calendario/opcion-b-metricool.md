# Opción B: plan de cambios en Metricool

**Decisión del dueño (26 nov 2026):** desde el 15 de diciembre, la franja de la **tarde** (YouTube 16:00 · Instagram 18:00 · TikTok 18:30) pasa a los vídeos de la agencia. La **mañana** sigue con historia. Los vídeos de historia de la tarde que salen se reprograman al final de la cola.

**Final de la cola** (comprobado en Metricool el 26 nov): hay vídeos de tarde al menos hasta el 8 feb 2027; del 14 al 16 feb solo hay vídeo de mañana, y del 17 feb en adelante no hay nada. **Las tardes del 14 al 27 de febrero están libres.**

## Correspondencia

| Fecha (tarde) | Entra (agencia) | Sale (historia) | Se mueve a (tarde) |
|---|---|---|---|
| Mar 15 dic | 02 · Mismo Golf, distinto motor | Lada Niva | Dom 14 feb |
| Mié 16 dic | 09 · Dacia Sandero: cuánto pierde | Jaguar XJ220 | Lun 15 feb |
| Jue 17 dic | 14 · Tucson contra Sportage al mes | Fiat Multipla | Mar 16 feb |
| Vie 18 dic | 35 · ¿Cuándo vender? (Corsa) | Dodge Viper | Mié 17 feb |
| Sáb 19 dic | 18 · Tienes 10.000 € | Honda S2000 | Jue 18 feb |
| Dom 20 dic | 27 · Tiguan: versión y motor | Jeep Willys | Vie 19 feb |
| Lun 21 dic | 30 · ¿Chollo o caro? Ibiza 2019 | Mercedes W123 | Sáb 20 feb |
| Mar 22 dic | 53 · Caso: Yaris de 2018 | Audi RS2 | Dom 21 feb |
| Mié 23 dic | 48 · ¿Eléctrico siempre más barato? | Tucker 48 | Lun 22 feb |
| Jue 24 dic | 51 · 150.000 km y el tasador | Rolls-Royce Phantom | Mar 23 feb |
| Vie 25 dic | 07 · Suzuki Jimny | Messerschmitt KR200 | Mié 24 feb |
| Sáb 26 dic | 25 · Kilómetros que no cuadran | Ford Escort Cosworth | Jue 25 feb |
| Dom 27 dic | 59 · Museo del box: Fiat Panda | Dacia Logan | Vie 26 feb |
| Lun 28 dic | 40 · 1 de enero y el carburante | Pagani Zonda | Sáb 27 feb |
| Mié 23 dic, 19:00 (solo YouTube) | L1 · Lo que pierde un coche en 10 años (largo) | — (franja nueva) | — |

Cada fila son 3 publicaciones de historia (YouTube, Instagram y TikTok) que se mueven, y 3 de la agencia que se crean.

## Cómo se ejecuta cada fila (lo hace el Director)
1. **Requisito:** el vídeo de la agencia está montado por tu fábrica, con el `.mp4` en una URL pública (como los de ahora: `social/<fecha>/…mp4` publicados en la web), y tú has aprobado el vídeo y sus textos (`publicaciones/2026-W51.md`).
2. Las cifras se recalculan ese día con `herramientas-agencia/tasador.py` y el comparador: la calibración diaria mueve los precios.
3. Se **crea** la publicación de la agencia en Metricool, a la hora de la tarde, en las 3 redes, con la casilla de IA marcada.
4. Se **comprueba** con `getScheduledPosts` que está bien creada.
5. Solo entonces se **mueve** la publicación de historia de esa tarde a su fecha de febrero (misma hora y mismo texto).
6. Se anota en este archivo: fecha, IDs y resultado.

Si un vídeo de la agencia no llega a tiempo, **no se toca esa fila**: se publica la historia como estaba previsto.

## Registro de ejecución
| Fecha | Fila | IDs creados | IDs movidos | Resultado |
|---|---|---|---|---|
