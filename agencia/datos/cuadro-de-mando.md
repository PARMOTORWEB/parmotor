# Cuadro de mando de Par Motor

Versión 1, del 26 nov 2026. Autor: Analista de datos. Valores de partida en `linea-base-2026-11-25.md`. Las definiciones de lead y de cliente son las de `kpis.md`.

**Cómo leerlo**
- **¿Medible hoy?** Sí, parcial o no, y qué falta.
- **Objetivo:** solo se pone cifra si hay base para ello. Las cifras de `kpis.md` van marcadas como `[HIPÓTESIS kpis.md]`.
- **«Tras 2 semanas»:** el objetivo se fija con los datos del 1 al 14 dic. Método:
  1. Mediana semanal de las 2 semanas.
  2. Objetivo a 30 días = mediana × 1,2.
  3. Objetivo a 90 días = mediana × 1,5 (o el umbral de `kpis.md` si es más exigente).
  4. Se revisa en el informe mensual de enero.

  Las cifras de crecimiento son `[OPINIÓN]`: son convenciones de arranque, no benchmarks.

## 1. Redes

| Indicador | Definición | Fuente / ID Metricool | Frecuencia | ¿Medible hoy? | Valor de partida (16–25 nov) | Objetivo 30 d | Objetivo 90 d |
|---|---|---|---|---|---|---|---|
| Visualizaciones | Veces que se ve el contenido, por red y semana | IG `IGEV05` (cuenta), `IGEV23` y `IGRE23` (reels); TikTok `TKEV12` y `TKPO07`; YouTube `YTEV02` y `YTVP06` | Semanal | **Sí** | IG 45; TikTok 0 (solo el 25 nov); YouTube 32 | Tras 2 semanas | Tras 2 semanas |
| Alcance | Personas únicas que ven el contenido | IG `IGEV06`, `IGEV26` e `IGRE11`; TikTok `TKEV11` y `TKPO11`; YouTube no tiene alcance en Metricool (se usan las vistas) | Semanal | **Parcial** (YouTube no) | IG 43; TikTok 0; YouTube sin dato (no existe la métrica) | Tras 2 semanas | Tras 2 semanas |
| Retención | IG: retención (`IGRE27`), tiempo medio (`IGRE24`) y % que pasa el vídeo antes de 3 s (`IGRE30`). TikTok: % visto entero (`TKPO13`) y tiempo medio (`TKPO15`). YouTube: duración media vista (`YTVP08`) | Metricool, por vídeo | Semanal | **Sí**, en cuanto haya vídeos registrados | sin dato (Metricool aún no tiene reels ni vídeos con métricas) | IG: pasan antes de 3 s < 50 % `[HIPÓTESIS kpis.md]`; resto tras 2 semanas | Tras 2 semanas |
| Interacciones | Me gusta, comentarios, guardados y compartidos; también por cada 1.000 visualizaciones | IG `IGEV38`, `IGEV25`, `IGEV29`, `IGEV39` e `IGRE12/21/07`; TikTok `TKEV06`; YouTube `YTVP09`, `YTVP11` y `YTVP12` | Semanal | **Sí** | sin dato (sin contenidos medidos) | Guardados IG > 5 por cada 1.000 visualizaciones `[HIPÓTESIS kpis.md]` | Tras 2 semanas |
| Seguidores | Seguidores o suscriptores al cierre de la semana y saldo neto | IG `IGEV01` e `IGEV43/44`; TikTok `TKEV07` y `TKEV16/17`; YouTube `YTEV01` y `YTEV05/06` | Semanal | **Sí** (IG: a verificar en la app) | IG 0 (a verificar); TikTok 1; YouTube 0 | Tras 2 semanas | Tras 2 semanas |
| Clics a la web | Visitas a la web desde cada red | No hay métrica en ninguna red: `IGEV10` está obsoleto y TikTok y YouTube no la tienen. Sustituto: fuentes de la web (`WTSO*`) y UTM (sección 4) | Semanal | **Parcial**: solo la fuente por dominio (`l.instagram.com`…) y sin vídeo concreto | 1 visita desde `l.instagram.com` (24–26 nov) | Más del 0,3 % de las visualizaciones `[HIPÓTESIS kpis.md]` | Tras 2 semanas con UTM |

## 2. Web

| Indicador | Definición | Fuente / ID Metricool | Frecuencia | ¿Medible hoy? | Valor de partida | Objetivo 30 d | Objetivo 90 d |
|---|---|---|---|---|---|---|---|
| Usuarios únicos | Visitantes distintos | `WTEV03` | Semanal | **Sí**, desde el 24 nov. Metricool no filtra el tráfico interno | 11 (suma diaria del 24 y 25 nov, probablemente internos) | Tras 2 semanas (base: 1–14 dic) | Tras 2 semanas |
| Sesiones | Visitas | `WTEV02`; páginas vistas `WTEV01` | Semanal | **Sí** | 17 visitas y 23 páginas vistas (24–25 nov) | Tras 2 semanas | Tras 2 semanas |
| Tráfico orgánico | Visitas desde buscadores | `WTSO*` (fuente google, bing…) + Search Console (clics) | Semanal | **Parcial**: Metricool sí; Search Console solo con la exportación manual del dueño a `agencia/datos/gsc/` | 0 visitas desde buscadores en Metricool (24–26 nov); Search Console sin dato (sin exportación) | Tras 2 semanas | Tras 2 semanas |
| Tráfico social | Visitas desde IG, TikTok o YouTube | `WTSO*` + `utm_source` (sección 4) | Semanal | **Parcial**: sin UTM no se sabe qué vídeo trae la visita | 1 (`l.instagram.com`) | Tras 2 semanas | Tras 2 semanas |
| Posicionamiento | Posición media, impresiones, CTR y páginas indexadas (de 461) | Search Console (no está en Metricool) | Semanal | **Parcial (manual)** | sin dato (no hay exportación de Search Console) | Tras recibir 2 exportaciones | Tras recibir 2 exportaciones |
| Conversiones | Uso completado de una herramienta (tasación o comparación) | Eventos (no existen) | Semanal | **No**: hay que instalar la medición de eventos (decisión del dueño, ver `integraciones.md`) | sin medición | Tras 2 semanas con eventos | Tras 2 semanas con eventos |
| Solicitudes de tasación | **Uso del tasador** (no es una tasación oficial). Sustituto mientras no haya eventos: páginas vistas en `/tasar/*` | Eventos; sustituto `WTPA*` | Semanal | **No** (sin eventos); el sustituto es **parcial** | sin medición; sustituto: 1 vista de ficha (`/tasar/seat-leon/`, 24–26 nov) | Tras 2 semanas | Tras 2 semanas |
| Formularios | Envíos de formulario | — | — | **No aplica**: la web no tiene formularios | no aplica | no aplica | no aplica |

## 3. Negocio

| Indicador | Definición | Fuente | Frecuencia | ¿Medible hoy? | Valor de partida | Objetivo 30 d | Objetivo 90 d |
|---|---|---|---|---|---|---|---|
| Leads | Suscripciones al Radar (`kpis.md`) | Proveedor de email (no existe) | Semanal | **No**: la suscripción no está activa | sin medición (no existe captación) | Se fija cuando se active la suscripción | Se fija cuando se active la suscripción |
| Coste por lead | Gasto / leads | — | Mensual | **No aplica**: no hay gasto ni leads | no aplica (gasto 0 €) | no aplica | no aplica |
| Clientes | Suscriptor activo (abre al menos 1 de cada 4 envíos) o usuario recurrente (`kpis.md`) | Email + analítica | Mensual | **No** | sin medición | Tras 2 envíos del Radar por email | Tras 2 envíos del Radar por email |
| Tasa de conversión | Leads / usuarios únicos (y, de paso intermedio, usos de herramienta / usuarios únicos) | Email + eventos + `WTEV03` | Mensual | **No** | sin medición | Tras 2 semanas con eventos o leads | Tras 2 semanas con eventos o leads |
| CAC | Gasto de adquisición / clientes nuevos | — | Mensual | **No aplica** | no aplica (gasto 0 €) | no aplica | no aplica |

## 4. Plan de etiquetado UTM para enlaces de vídeos (propuesta)

**Para qué sirve:** saber qué vídeo y qué red trae visitas a qué herramienta. Es la pregunta de siempre del analista.

### Convención (todo en minúsculas, sin tildes, con guiones; nunca datos personales)
| Parámetro | Valores | Ejemplo |
|---|---|---|
| `utm_source` | `instagram`, `tiktok`, `youtube` | `youtube` |
| `utm_medium` | Dónde está el enlace: `bio` (enlace del perfil), `descripcion` (descripción en YouTube), `comentario` (comentario fijado), `story`, `largo` (descripción de un vídeo largo) | `descripcion` |
| `utm_campaign` | Serie + mes: `4cosas-2026-12`, `historia-marca-2026-12`, `radar-2026-12`; los nuevos pilares, con el mismo patrón | `4cosas-2026-12` |
| `utm_content` | Modelo + fecha de publicación (`AAAAMMDD`), y `-am` o `-pm` si hay dos pases el mismo día | `seat-600-20261203-am` |

Ejemplo completo (Short de YouTube del 3 dic que lleva a la ficha del modelo):
`https://parmotorweb.github.io/parmotor/tasar/seat-600/?utm_source=youtube&utm_medium=descripcion&utm_campaign=4cosas-2026-12&utm_content=seat-600-20261203-am`
(Antes hay que comprobar que la ficha `/tasar/<modelo>/` existe. Si no existe, se enlaza a `/parmotor/#tasador`, con los UTM delante del ancla.)

### Reglas
1. **YouTube:** un enlace con UTM en cada descripción. Hoy todas apuntan a la portada y sin UTM.
2. **Instagram y TikTok:** los textos no tienen enlaces clicables, así que la atribución por vídeo **solo es posible con una página de enlaces en la bio** que tenga un botón por vídeo reciente, cada uno con su UTM. Puede ser Metricool SmartLinks (se lee con `smartLinks` → `buttons`) o la página `/parmotor/enlaces/` de Web y CRO. El propio enlace de la bio lleva `utm_medium=bio&utm_content=perfil`.
3. Se crea **un registro de enlaces** en `agencia/datos/utm-registro.csv` (fecha, red, vídeo, URL final). Lo rellena el community manager al preparar cada publicación.
4. **Por comprobar antes de desplegar:** si el informe de fuentes de Metricool web (`WTSO*`) desglosa los parámetros `utm_*` o solo el dominio de referencia. Prueba: una visita con UTM de ejemplo y consulta al día siguiente. Si Metricool no los lee, los UTM se medirán con la herramienta de eventos que se elija (GoatCounter u otra).
5. Cambiar los enlaces de publicaciones ya programadas en Metricool es **modificar publicaciones**: necesita el sí del dueño y lo hace la sesión principal, no el analista.

## 5. Calendario de medición
- **Semanal (lunes):** redes, web, fuentes, páginas y Top 3 / Bottom 3 vídeos (`informes/semanal/`).
- **15 dic:** fijar los objetivos «tras 2 semanas» con los datos del 1 al 14 dic.
- **Mensual (enero):** recalibrar las hipótesis de `kpis.md`.
