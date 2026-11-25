# Calendario editorial: reglas

## Volumen
- **14 shorts originales por semana** (2 al día), cada uno en Instagram Reels, TikTok y YouTube Shorts, con el texto adaptado a cada red.
- **1 vídeo largo de YouTube por semana** (5–10 min), el domingo. Se revisa al cerrar el primer mes: si la producción aguanta y la retención media del largo supera el 35 % **[umbral de partida, a recalibrar]**, se prueba con 2.

## Franjas (patrón actual en Metricool, Europe/Madrid)
| Franja | Instagram | YouTube | TikTok |
|---|---|---|---|
| Mañana (short A) | 10:00 | 10:00 | 10:30 |
| Tarde (short B) | 18:00 | 16:00 | 18:30 |

La franja de la mañana lleva el vídeo de **alcance** y la de la tarde, el de **intención** (el que lleva a una herramienta). El analista puede proponer otras horas con `getBestTimeToPostByNetwork` tras 2 semanas de datos.

## Los 15 pilares y su peso semanal (a partir del 15 de diciembre de 2026)

| # | Pilar | Herramienta de destino | Shorts por semana |
|---|---|---|---|
| 7 | Cómo calcular el valor real de un coche | `#tasador` | 2 |
| 4 · 5 | Coches que mantienen o pierden valor | `/tasar/<modelo>/` | 2 |
| 1 | Comparativas entre coches | `#calculadora` | 1 |
| 2 · 10 | Mejores coches por presupuesto y por perfil | `#asesor` | 1 |
| 3 · 13 | Errores al comprar usado y negociación | `#tasador` | 1 |
| 6 | Consejos para vender | `#tasador` | 1 |
| 8 | Problemas mecánicos conocidos | `/tasar/<modelo>/` | 1 (con verificación reforzada) |
| 9 · 12 | Noticias y oportunidades (Radar en 30 s) | `#radar` | 1 |
| 11 | Mitos del automóvil | según tema | 1 |
| 14 · 15 | Preguntas de la audiencia y casos prácticos | según tema | 1 |
| — | Historia del motor («4 cosas que no sabías de…») | `/historia/<modelo>/` → `/tasar/<modelo>/` | 2 |

Total: 14. El formato de historia baja del 100 % actual al 14 %. **Así no se pierde lo que ya funciona**, pero el contenido con intención comercial pasa a ser mayoritario. Si el informe semanal muestra que la historia trae más visitas a fichas `/tasar/` que otros pilares, se sube su peso.

## Normas
- Un modelo no se repite antes de 4 semanas, salvo en una serie anunciada.
- Cada short lleva una página de destino concreta.
- El vídeo largo de la semana amplía el tema del short que mejor funcionó la semana anterior.
- Antes de programar, se comprueba lo que ya hay en Metricool (`getScheduledPosts`) para no duplicar.

## Estado a 25 de noviembre de 2026
- **26–30 nov:** hueco sin nada programado → `2026-W48.md`.
- **1–14 dic:** ya programado (historia, 2 al día). No se toca salvo que el dueño lo pida.
- **Desde el 15 de diciembre:** nueva mezcla → `2026-W51.md`. Primero hay que comprobar si existe algo programado del 15 en adelante.
