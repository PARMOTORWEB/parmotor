# Línea base de Par Motor — 25 nov 2026

Elaborado por el Analista de datos el 25 nov 2026. Fuente única: API de Metricool (marca `8158748`, zona `Europe/Madrid`), solo herramientas de lectura. Periodo de métricas: **16 al 25 nov 2026** (la marca se creó el 16 nov y la primera conexión fue el 17 nov `[CONFIRMADO: getBrandSettings]`).

**Aviso de solidez:** son menos de 7 días con datos reales y ningún contenido llega a 1.000 visualizaciones. Todo lo que sigue es **punto de partida, no tendencia**.

Convenciones: un valor `0` aparece solo cuando la API lo devuelve explícitamente; cuando la API no devuelve fila o devuelve `null`, se escribe «sin dato (motivo)».

## 1. Estado de las conexiones (getBrandSettings, 25 nov)

| Red | Identificador en Metricool | Estado |
|---|---|---|
| Instagram | `parmotorrr` | Conectada |
| TikTok | «Par Motor» (@usuario sin confirmar) | Conectada |
| YouTube | `UCdaSZmZUMuUJtuB3xbGmAJA` | Conectada |
| Web | `webData: https://parmotorweb.github.io` | **Conectada** (nuevo hoy). Ojo: registrada como el dominio raíz, no `/parmotor/`; de momento las páginas llegan como `/parmotor/…`, así que funciona |

## 2. Métricas disponibles en Metricool (IDs comprobados con getAnalyticsAvailableMetrics)

### Instagram (`evolution`, cuenta) — los de Reels por vídeo están en el conector `reels`
| Qué | ID |
|---|---|
| Seguidores (último valor) | `IGEV01` |
| Seguidores ganados / perdidos | `IGEV43` / `IGEV44` |
| Visualizaciones de la cuenta (todos los formatos) | `IGEV05` |
| Alcance de la cuenta | `IGEV06` |
| Contenido publicado (feed + reels) | `IGEV37` |
| Reels publicados / vistas / alcance | `IGEV22` / `IGEV23` / `IGEV26` |
| Interacciones, guardados y compartidos de reels | `IGEV25` / `IGEV29` / `IGEV39` |
| Cuentas que interactúan | `IGEV42` |
| Por reel: vistas, alcance, tiempo medio, retención, pasan antes de 3 s, guardados, compartidos, comentarios | `IGRE23`, `IGRE11`, `IGRE24`, `IGRE27`, `IGRE30`, `IGRE12`, `IGRE21`, `IGRE07` |
| Clics a la web | **No existe**: `IGEV10` (Website Clicks) está marcado como obsoleto («Do not use») |

### TikTok
| Qué | ID |
|---|---|
| Vídeos publicados | `TKEV01` |
| Visualizaciones de los vídeos del periodo / de la cuenta en el periodo | `TKEV02` / `TKEV12` |
| Alcance | `TKEV11` |
| Interacciones (me gusta + comentarios + compartidos) | `TKEV06` |
| Seguidores (último) / balance diario | `TKEV07` / `TKEV08` |
| Seguidores ganados / perdidos | `TKEV16` / `TKEV17` |
| Visitas al perfil | `TKEV09` |
| Por vídeo: fecha, duración, vistas, alcance, % visto entero, tiempo medio | `TKPO01`, `TKPO06`, `TKPO07`, `TKPO11`, `TKPO13`, `TKPO15` |
| Por vídeo: origen de la vista (Para ti, seguidos, perfil, búsqueda, hashtag, sonido) | `TKPO16`–`TKPO21` |
| Clics a la web | **No existe** en Metricool |

### YouTube
| Qué | ID |
|---|---|
| Suscriptores (último) / ganados / perdidos | `YTEV01` / `YTEV05` / `YTEV06` |
| Visualizaciones del canal | `YTEV02` |
| Vídeos publicados (largos + Shorts) | `YTEV04` |
| Vistas de los vídeos publicados en el rango | `YTEV13` |
| Por vídeo publicado en el rango: vistas, minutos vistos, duración media vista, me gusta, comentarios, compartidos | `YTVP06`, `YTVP07`, `YTVP08`, `YTVP09`, `YTVP11`, `YTVP12` |
| Fuentes de tráfico | `YTTS01` / `YTTS02` |
| Obsoletos, no usar | `YTEV07`–`YTEV09`, todo `YTVI*` |
| Clics a la web | **No existe** en Metricool |

### Web
| Qué | ID |
|---|---|
| Páginas vistas / visitas / visitantes | `WTEV01` / `WTEV02` / `WTEV03` |
| Fuentes de tráfico (nombre / valor) | `WTSO01` / `WTSO02` |
| Páginas (ruta / valor) | `WTPA01` / `WTPA02` |

## 3. Valores reales del 16 al 25 nov 2026

### Instagram
| Indicador | Valor | Nota |
|---|---|---|
| Seguidores (`IGEV01`) | 0 | La API devuelve `0.0` todos los días del 16 al 24. **A verificar en la app**: puede ser un 0 real o que Metricool aún no lo recoja |
| Contenido publicado (`IGEV37`) | 1 (18 nov) | Ningún reel contado (`IGEV22` sin dato) |
| Visualizaciones (`IGEV05`) | 45 (18 nov) | Resto de días sin dato (la API no devuelve valor) |
| Alcance (`IGEV06`) | 43 (18 nov); 0 el resto de días | |
| Reels (`IGRE*`) | sin dato (la API no devuelve ningún reel entre el 16 y el 25 nov) | Coincide con el diagnóstico: aún no hay reels publicados o Metricool no los tiene |
| Retención, pasan antes de 3 s, guardados, compartidos | sin dato (no hay reels) | |

### TikTok
| Indicador | Valor | Nota |
|---|---|---|
| Seguidores (`TKEV07`) | 1 (desde el 17 nov) | `TKEV08` registra +1 el 17 nov |
| Vídeos publicados (`TKEV01`) | 0 el 25 nov; sin dato el resto | |
| Visualizaciones, alcance, interacciones, visitas al perfil | 0 el 25 nov; sin dato el resto | |
| Vídeos (`TKPO*`) | sin dato (la API no devuelve ningún vídeo) | |

### YouTube
| Indicador | Valor | Nota |
|---|---|---|
| Suscriptores (`YTEV01`) | 0 | Todos los días |
| Vídeos publicados (`YTEV04`) | 1 (18 nov) | `YTVP01` confirma un vídeo con fecha 18 nov |
| Visualizaciones del canal (`YTEV02`) | 32 en total: 24 (18 nov), 3 (19 nov), 5 (22 nov) | |
| Métricas del vídeo del 18 nov (`YTVP06`–`YTVP11`) | sin dato (la API devuelve la fila sin valores) | |
| Fuentes de tráfico (`YTTS*`) | sin dato (la API no devuelve filas) | |

### Web (conectada el 25 nov; consulta actualizada el 26 nov)
| Indicador | 24 nov | 25 nov | 26 nov | Total |
|---|---|---|---|---|
| 16–23 nov | **sin medición** (web no conectada en Metricool), no «cero visitas» | | | |
| Páginas vistas (`WTEV01`) | 11 | 12 | sin dato (día en curso; Metricool lo consolida al día siguiente) | 23 |
| Visitas (`WTEV02`) | 7 | 10 | sin dato (ídem) | 17 |
| Visitantes (`WTEV03`) | 4 | 7 | sin dato (ídem) | 11 (suma diaria, no son únicos del periodo) |

- **Fuentes (`WTSO*`, 24–26 nov):** Directo 22 y `l.instagram.com` 1. El tráfico social es 1 de 23 páginas vistas.
- **Páginas (`WTPA*`, 24–26 nov):** `/parmotor/` 22 y `/parmotor/tasar/seat-leon/` 1. Es la primera ficha de modelo vista; coincide con la ficha que se usó de ejemplo en el diagnóstico.

**Lectura:** las visitas del 24 nov tienen fecha anterior a la conexión que comunica el director (25 nov), así que la conexión o las visitas de comprobación empezaron el 24 por la tarde. Con 11 visitantes, el 96 % «Directo» y la ficha del Seat León (la misma del diagnóstico), **lo más probable es que casi todo sean visitas de comprobación del propio equipo** `[ESTIMACIÓN: volumen, fuente y páginas]`. Metricool no filtra el tráfico interno, así que la base real empieza la semana del 1 dic.

## 4. Inventario de publicaciones programadas (getScheduledPosts)

Consultado por tramos de 1 a 3 días. Todas en estado `PENDING`, con publicación automática.

| Tramo | YouTube | Instagram | TikTok | Total | Cómo se comprobó |
|---|---|---|---|---|---|
| 25–30 nov | 0 | 0 | 0 | **0** | Barrido completo: **hueco de 6 días** |
| 1–26 dic | 52 Shorts + 3 largos | 52 reels | 52 | **159** | Barrido completo |
| 27–30 dic | sin dato | sin dato | sin dato | — | **No consultado** (límite de contexto de esta ronda) |
| 31 dic – 3 ene | 8 Shorts + 1 largo | 8 | 8 | **25** | Barrido completo |
| 15 ene (sondeo) | 2 | 2 | 2 | 6 | Un solo día |
| 1 feb (sondeo) | 2 | 2 | 2 | 6 | Un solo día |
| 1 mar (sondeo) | 0 | 0 | 0 | 0 | Un solo día |

- **Total contado:** 196 publicaciones (184 en los tramos barridos y 12 en los sondeos). El calendario **llega al menos al 1 de febrero de 2027 y termina antes del 1 de marzo** `[CONFIRMADO: sondeos]`. El diagnóstico decía «al menos hasta el 14 de diciembre»: hay que actualizarlo.
- **Patrón diario:** 6 publicaciones (2 por red). Horario: YouTube e Instagram a las 10:00, TikTok a las 10:30, YouTube a las 16:00, Instagram a las 18:00 y TikTok a las 18:30. El 15 de enero un lote usa otro horario (14:00, 19:00 y 20:00).
- **Vídeos largos de YouTube (domingo, 11:00):** Ferrari (6 dic), Porsche (13 dic), Lamborghini (20 dic) y Volkswagen (3 ene). En el tramo no consultado entraría el domingo 27 dic.
- **Formato:** el 100 % de los Shorts son «4 cosas que no sabías del [modelo]» (historia y nostalgia). La marca de contenido generado con IA está activada en las tres redes (`isAiGenerated`, `isAiGeneratedContent`, `isAigc`).
- **Destino de los enlaces:** YouTube enlaza a la portada `https://parmotorweb.github.io/parmotor/` **sin UTM**; Instagram y TikTok remiten al «enlace del perfil». Ninguna publicación lleva a una ficha `/tasar/<modelo>/`. El acortador está desactivado.
- **Incidencias de texto (para el community manager):**
  - Al menos **18 publicaciones de TikTok** (todas de las 10:30, creadas entre el 24 y el 25 nov, del 11 dic al 15 ene) **no llevan CTA al tasador**. El resto sí lo lleva.
  - Las de Instagram mezclan dos fórmulas de cierre: «dos coches nuevos cada día» y «la historia de un coche cada día».

## 5. Qué falta para una línea base completa
1. Completar el barrido del 27 al 30 dic y del 4 ene al 28 feb.
2. Confirmar en la app los seguidores de Instagram (la API da 0).
3. Esperar a que Metricool recoja los primeros reels y vídeos de TikTok para tener retención y «pasan antes de 3 s».
4. Las visitas a la web cuentan desde el 24-25 nov. Base útil: a partir del lunes 1 dic, con 2 semanas de datos (hasta el 14 dic).
5. Eventos del tasador, leads y Search Console: **sin medición** (ver `cuadro-de-mando.md`).
