# Plan SEO a 90 días: del 26 de noviembre de 2026 al 23 de febrero de 2027

Versión 1. Especialista SEO, 26 de noviembre de 2026. Basado en `keywords.md` y `competencia.md`.

## 0. Auditoría técnica: lo comprobado antes de planificar

El rastreo de las **461 URLs del sitemap** con `curl` terminó el 25 y 26 de noviembre de 2026, antes de que llegara la instrucción de limitarse a una muestra. Se ha usado ese resultado sin lanzar descargas nuevas. Las comprobaciones de contenido se hicieron sobre ese rastreo y sobre una revisión manual de la portada, `/tasar/`, `/historia/`, 5 fichas `/tasar/` (Seat León, Dacia Sandero, Mazda MX-5, Tesla Model 3, Peugeot 207 y 208) y 3 fichas `/historia/` (Seat Ibiza, Mazda MX-5, Porsche 911).

| Comprobación | Resultado | Estado |
|---|---|---|
| Respuesta de las URLs del sitemap | 461 de 461 dan **200** [CONFIRMADO: rastreo] | Bien |
| `FAQPage` en las fichas `/tasar/` | **396 de 396 lo tienen**, con 3, 4 o 5 preguntas (79, 234 y 83 fichas) [CONFIRMADO] | **Ya está. No hay que proponerlo** |
| `BreadcrumbList` en las fichas `/tasar/` | **396 de 396** [CONFIRMADO] | Ya está |
| Datos estructurados en `/historia/<modelo>/` | `Article` + `BreadcrumbList` + `ImageObject` (muestra de 3) [CONFIRMADO] | Bien |
| Datos estructurados en `/tasar/` | `CollectionPage` [CONFIRMADO] | Bien |
| Datos estructurados en `/historia/` (índice) | **Ninguno** [CONFIRMADO] | Falta (bajo impacto) |
| Fecha en los datos estructurados de las fichas `/tasar/` | **Sin `dateModified`** (muestra) | Falta |
| Titles duplicados o metas duplicadas | 0 y 0 [CONFIRMADO] | Bien |
| Longitud de los titles en `/tasar/` | Mediana de 54 caracteres; **78 fichas pasan de 60** (máximo 73) [CONFIRMADO] | Riesgo de que Google los corte |
| Canonical | Autorreferente en todas las de la muestra | Bien |
| `og:image` | Imagen propia del modelo en cada ficha (muestra) | Bien |
| Peso de las fichas | Entre 6 y 15 KB de HTML. Imagen WebP con `width` y `height` (muestra) | Bien para Core Web Vitals [ESTIMACIÓN: por tamaño, sin medición de campo] |
| Peso de la portada | Unos 350 KB de HTML, intro en scroll, 3D y scripts `cine.js` y `puerta.js` | **Riesgo para LCP e INP** [ESTIMACIÓN: sin medición] |
| Enlaces `/historia/` → `/tasar/` | **26 de las 63** páginas de historia enlazan a una ficha de precio [CONFIRMADO] | Mejorable |
| Enlaces `/tasar/` → `/historia/` | **Solo 17 fichas** enlazan a su historia [CONFIRMADO] | Mejorable |
| Historia con ficha de precio equivalente pero sin enlace | `mini` → `mini-mini-3-y-5-puertas`, `renault-5` → `renault-renault-5`, `toyota-supra-mk4` → `toyota-gr-supra`, `volkswagen-escarabajo` → `volkswagen-beetle`, `range-rover` → `land-rover-range-rover`, `bmw-m3-e30` → `bmw-serie-3`, `nissan-skyline-gt-r-r32` → `nissan-gt-r` [CONFIRMADO: los slugs existen] | Arreglo rápido. La equivalencia de modelo la decide el investigador |
| Páginas de marca `/historia/historia-de-<marca>/` | Enlazan a **1 sola** ficha `/tasar/` | Mejorable |
| Huérfanas | Ninguna: la portada enlaza a las 396 fichas y el índice de historia a sus fichas [CONFIRMADO] | Bien |
| Herramientas con URL propia | Tasador, comparador, asesor, Radar y «Cómo calculamos» son **anclas de la portada** (`#tasador`, `#calculadora`…) | **Es el mayor problema on-page:** las consultas de más intención no tienen página que pueda posicionar |
| `/tasar/toyota-corolla/` | **404** (la ficha es `toyota-corolla-y-auris`) | Valorar una redirección HTML con `meta refresh` + canonical. Prioridad baja |
| `lastmod` del sitemap | Las 461 URLs con la misma fecha (2026-11-25) | Google puede ignorar el `lastmod` si no refleja cambios reales [OPINIÓN] |
| Año en los titles | «… de segunda mano **2026**» y «actualizada en **noviembre de 2026**» | **Caduca el 1 de enero.** Hay que regenerar con 2027 |
| robots.txt | 404 en `/parmotor/robots.txt`. Normal en un subdirectorio de `github.io`: no se puede controlar | Limitación estructural (ver el dominio propio) |

**Conclusión:** la base técnica de las fichas es buena. El trabajo está en (1) dar URL propia a las herramientas, (2) contenidos con intención comercial que enlacen a las fichas, (3) cerrar el enlazado entre historia y tasar, (4) refrescar el año, (5) conseguir autoridad y (6) el dominio propio.

## A. Datos de Search Console que necesito del dueño

Es la primera tarea y no se puede saltar. Sin estos datos, las prioridades salen de los resultados del buscador, no de la demanda real. Pasos para el dueño (formato CSV o captura; **no hay datos personales** en estas exportaciones):

1. **Rendimiento → Resultados de búsqueda**, últimos 3 meses (o desde la verificación), filtrado por País = España:
   - pestaña **Consultas** (exportar), pestaña **Páginas** (exportar) y pestaña **Dispositivos** (captura).
2. **Indexación → Páginas**: captura del gráfico «Indexadas / No indexadas» y exportación de cada motivo de exclusión («Rastreada: actualmente sin indexar», «Descubierta: actualmente sin indexar», duplicadas…).
3. **Sitemaps**: captura del estado de `sitemap.xml` (URLs descubiertas).
4. **Inspección de URLs**: captura de la portada, `/tasar/seat-leon/` y `/historia/seat-ibiza/` (indexada o no, canonical elegido por Google).
5. **Experiencia → Core Web Vitals** (móvil y ordenador): captura. Lo normal es que salga «sin datos suficientes» con poco tráfico.
6. **Mejoras**: captura de «Rutas de navegación» (y de FAQ si aparece).
7. **Enlaces**: exportar «Sitios con más enlaces» y «Páginas con más enlaces».
8. Indicar qué **tipo de propiedad** es (prefijo de URL o dominio).

Cadencia: la primera exportación esta semana. Después, el **rendimiento cada 2 semanas** (el lunes, junto al Radar) y la **indexación cada mes**. El analista las guarda en `agencia/datos/` (solo cifras agregadas).

## B. Calendario por quincenas

Responsables: **SEO** (especialista SEO), **Web** (Web y CRO), **Guion** (guionista), **Inv** (investigador, verifica datos), **Anal** (analista).
Esfuerzo: S = menos de 2 h · M = medio día · L = 1 o 2 días · XL = más de 2 días.
«Aprobación»: **Sí** = hace falta el sí del dueño en el chat (todo lo que llega a `main` publica la web; gastar dinero; cambiar ajustes de cuentas).

### Q1: del 26 de noviembre al 9 de diciembre (medir y arreglos rápidos)

| # | Acción | Resp. | Esf. | KPI | Aprobación |
|---|---|---|---|---|---|
| 1 | Pedir al dueño la exportación de Search Console (apartado A) | SEO → dueño | S | Exportación recibida | No (es una petición) |
| 2 | Recoger la línea base: indexadas sobre 461, impresiones, clics, CTR y posición; top 20 consultas y páginas | Anal + SEO | M | Línea base en `agencia/datos/` | No |
| 3 | Medir Core Web Vitals de laboratorio (PageSpeed Insights) en la portada, `/tasar/` y 3 fichas, en móvil | Web | S | LCP, CLS e INP o TBT anotados | No |
| 4 | Enlazado entre historia y tasar: añadir los 7 enlaces que faltan (tabla del apartado 0) y el enlace de vuelta en las fichas `/tasar/` cuyo modelo tiene historia. Rama `web/seo-enlazado-historia` | Web (SEO da la lista, Inv valida qué modelo es equivalente) | M | De 17 a 24 o más fichas `/tasar/` con enlace a historia; de 26 a 33 o más historias con enlace a tasar | **Sí** (fusionar con `main`) |
| 5 | Páginas de marca de historia (9): enlazar a todas las fichas `/tasar/` de esa marca | Web | S | 9 páginas con N enlaces | **Sí** |
| 6 | Brief de las URLs propias de las herramientas (`/tasador/`, `/coste-real/`, `/asesor/`, `/como-calculamos/`): qué contenido estático llevan además de la herramienta, title, H1, FAQ y enlaces | SEO | M | Brief entregado a Web | No |

### Q2: del 10 al 23 de diciembre (herramientas con URL propia)

| # | Acción | Resp. | Esf. | KPI | Aprobación |
|---|---|---|---|---|---|
| 7 | Crear `/tasador/` (keywords 1 a 8): herramienta + texto de método + FAQ («¿piden mis datos?», «¿es una tasación oficial?» → no) + enlaces a `/tasar/`. Rama `web/seo-urls-herramientas` | Web | L | Indexada; impresiones en «tasar coche gratis» y sus variantes | **Sí** |
| 8 | Crear `/coste-real/` (keywords 58 a 63), con las fuentes de cada partida de coste. Se cita al RACE como referencia, sin copiarlo | Web + Inv | L | Indexada; impresiones en «cuánto cuesta mantener un coche» | **Sí** |
| 9 | Crear `/como-calculamos/`: método citable. Base para los enlaces (apartado D) | Web + SEO | M | Indexada; enlaces entrantes | **Sí** |
| 10 | Incluir las nuevas URLs en el sitemap, enlazarlas desde la portada (manteniendo las anclas) y añadirles `BreadcrumbList` y `WebApplication` | Web | S | Sitemap con 461 + N URLs | **Sí** |
| 11 | Preparar la regeneración de titles y metas para 2027 (plantilla con el año y el mes como variables). **No se publica todavía** | Web | M | Script listo en la rama | No (hasta la Q3) |

### Q3: del 24 de diciembre al 6 de enero (año nuevo y primer contenido)

| # | Acción | Resp. | Esf. | KPI | Aprobación |
|---|---|---|---|---|---|
| 12 | **Publicar el cambio a 2027** en titles, metas y H1 de las 396 fichas **solo cuando los precios se hayan actualizado de verdad**, y añadir `dateModified` en el JSON-LD. Aprovechar para recortar los 78 titles de más de 60 caracteres (p. ej. «Precio X segunda mano 2027 \| Par Motor») | Web + SEO | M | 0 titles con «2026» a partir del 2 de enero; 0 titles de más de 60 caracteres | **Sí** |
| 13 | `lastmod` real en el sitemap (solo cambia la fecha de las URLs que cambian) | Web | S | — | **Sí** |
| 14 | Crear `/asesor/` (keywords 43 y 44) | Web | M | Indexada | **Sí** |
| 15 | Artículo: `/mejores-coches-segunda-mano/menos-de-10000/` (keyword 39) | SEO brief → Guion redacta → Inv verifica → Web publica | L | Impresiones y posición; clics a las fichas | **Sí** |

### Q4: del 7 al 20 de enero (contenido comercial)

| # | Acción | Resp. | Esf. | KPI | Aprobación |
|---|---|---|---|---|---|
| 16 | `/coches-que-menos-se-deprecian/` con datos propios del tasador (keywords 55 y 56): método, tabla por segmento, límites («precio orientativo»). **Es el recurso citable principal** | SEO + Inv + Web | XL | Impresiones; enlaces entrantes | **Sí** |
| 17 | Artículo: `/mejores-coches-segunda-mano/menos-de-5000/` (keyword 40) | Guion + Inv + Web | L | Impresiones | **Sí** |
| 18 | Revisar las FAQ de las fichas: en eléctricos (Tesla, ID., EV…), añadir la pregunta sobre batería y garantía si hay fuente del fabricante. Empezar por las 20 fichas con más impresiones | SEO + Inv | M | FAQ con fuente; CTR de esas 20 | **Sí** |
| 19 | Primer informe de seguimiento SEO (tras 6 u 8 semanas de datos) | Anal + SEO | M | Informe en `agencia/informes/` | No |

### Q5: del 21 de enero al 3 de febrero (comparativas y guías)

| # | Acción | Resp. | Esf. | KPI | Aprobación |
|---|---|---|---|---|---|
| 20 | `/comparar/seat-ibiza-vs-volkswagen-polo/` (keyword 49): dos tablas de precio + coste al mes + veredicto con criterio explícito | Guion + Inv + Web | L | Impresiones | **Sí** |
| 21 | `/guias/como-saber-si-un-coche-usado-esta-caro/` (keyword 66): enlaza a `/tasar/` y explica cómo usar la tabla | Guion + Web | M | Clics hacia las fichas | **Sí** |
| 22 | `/mejores-coches-segunda-mano/menos-de-20000/` (keyword 42) | Guion + Inv + Web | L | Impresiones | **Sí** |
| 23 | Elegir 2 comparativas más (keywords 50 a 53) **solo** si Search Console o el buscador muestran demanda | SEO | S | Decisión documentada | No |

### Q6: del 4 al 17 de febrero (Radar citable y marcas)

| # | Acción | Resp. | Esf. | KPI | Aprobación |
|---|---|---|---|---|---|
| 24 | Radar con URL propia por número (`/radar/2027-06/`) y archivo `/radar/`. Datos estructurados `Article` y fuentes enlazadas | Web + SEO | L | Números indexados; enlaces entrantes | **Sí** |
| 25 | Páginas de marca `/tasar/marca/<marca>/` **solo para unas 15 marcas** con más de 8 modelos y datos que aporten (rango por modelo, el que menos se deprecia de la marca). Nada de páginas vacías | SEO + Web | L | Impresiones en «precio <marca> segunda mano» | **Sí** |
| 26 | Guía `/guias/kilometros-coche-usado/` (keyword 68), con los datos propios de «Km normales» | Guion + Web | M | Impresiones | **Sí** |

### Cierre: del 18 al 23 de febrero

| # | Acción | Resp. | Esf. | KPI | Aprobación |
|---|---|---|---|---|---|
| 27 | Informe de 90 días frente a la línea base: indexadas, impresiones, clics, consultas comerciales en el top 10 y páginas nuevas indexadas | Anal + SEO | M | Informe | No |
| 28 | Replanificación del siguiente trimestre con datos reales | SEO + Director | S | Plan v2 | No |

**Contenidos nuevos en total: 4 URLs de herramienta + 9 artículos o recursos + el archivo del Radar + unas 15 marcas.** Es deliberadamente poco: nada de generar páginas en masa.

## C. Briefs resumidos de los contenidos nuevos

Cada brief completo se entrega al guionista una semana antes. Reglas comunes: cada cifra con su etiqueta `[CONFIRMADO / ESTIMACIÓN]`, la frase «precio orientativo, no es una tasación oficial», cero promesas de compra o de contacto y enlaces a las fichas `/tasar/` de cada modelo citado.

| URL | Keyword principal | Ángulo que nos diferencia | Secciones mínimas | Enlaza a |
|---|---|---|---|---|
| `/mejores-coches-segunda-mano/menos-de-10000/` | mejores coches de segunda mano por menos de 10.000 euros | Qué año se consigue por 10.000 € (de nuestra tabla) + coste al mes | Criterio de selección, de 6 a 10 modelos por uso, qué año y km entran por ese precio, coste al mes, qué revisar | Fichas `/tasar/`, `/coste-real/`, `/asesor/` |
| `/mejores-coches-segunda-mano/menos-de-5000/` | … por menos de 5.000 euros | Igual, con más peso en el mantenimiento | Igual | Igual |
| `/mejores-coches-segunda-mano/menos-de-20000/` | mejor coche segunda mano por 20.000 euros | Valor por defecto del asesor | Igual + híbrido o eléctrico | Igual |
| `/coches-que-menos-se-deprecian/` | coches que menos se deprecian | Ranking con datos propios y método público | Método, ranking por segmento, los que más se deprecian, límites del dato | Fichas, `/como-calculamos/` |
| `/comparar/seat-ibiza-vs-volkswagen-polo/` | seat ibiza o volkswagen polo segunda mano | Precio por año + coste al mes, no ficha técnica de nuevo | Tabla lado a lado por año, coste al mes, para quién es cada uno | Las 2 fichas + `/historia/seat-ibiza/` |
| `/guias/como-saber-si-un-coche-usado-esta-caro/` | cómo saber si un coche usado está bien de precio | Pasos con nuestra tabla | 5 pasos, ejemplo con una ficha, errores típicos | `/tasar/`, `/tasador/` |
| `/guias/kilometros-coche-usado/` | cuántos km son muchos para un coche usado | Datos propios de «Km normales» por año | Tabla, cuándo preocuparse, cómo afecta al precio | Fichas |
| `/tasador/`, `/coste-real/`, `/asesor/`, `/como-calculamos/` | Ver keywords 1 a 8, 58 a 63, 43 y 44 | Gratis, sin registro, cálculo en el móvil, método público | Herramienta + 300 a 600 palabras + FAQ | `/tasar/` y entre ellas |

**Guionista:** cada artículo puede tener un short asociado con CTA a la URL del artículo (por ejemplo, «3 coches por menos de 10.000 € que pierden poco valor»). Sin clickbait.

## D. Autoridad: enlaces lícitos

Prohibido: comprar enlaces, granjas, intercambios masivos, comentarios con enlace y notas de prensa pagadas.

| Táctica | Recurso que lo sostiene | Resp. | Cuándo | Aprobación |
|---|---|---|---|---|
| Recurso citable de depreciación | `/coches-que-menos-se-deprecian/` + `/como-calculamos/` | SEO + Growth | Q4 a Q6 | **Sí**, si supone contactar con medios en nombre de la marca |
| Radar con URL propia y fuentes | `/radar/<número>/` | SEO + Web | Q6 | **Sí** (publicar) |
| Ofrecer el dato a periodistas del motor que ya escriben sobre depreciación (highmotor, Autofácil, hibridosyelectricos…). Sin pagar | Ranking propio | Growth (contacto) | Q5 y Q6 | **Sí** (contacto externo) |
| Enlaces de perfil propios: YouTube (descripción), Instagram (bio), TikTok (que hoy no aparece en la web) | Ya existen las cuentas | Community + Web | Q1 | **Sí** si se cambian ajustes de cuentas |
| Foros o comunidades donde se pregunte «cuánto vale mi X»: respuestas útiles enlazando la ficha **solo si las normas del foro lo permiten** y **sin respuestas personalizadas en nombre de Par Motor** (`marca.md`) | Fichas | — | **Aparcado** hasta que el dueño decida | **Sí** |

KPI: dominios que enlazan (Search Console → Enlaces), mensual. Sin meta numérica: no hay línea base.

## E. Dominio propio: recomendación con argumentos

**Recomendación: comprar y configurar un dominio propio antes de publicar los contenidos de la Q3**, cuando todavía hay poca autoridad que migrar. Coste orientativo: unos 10 a 15 € al año [ESTIMACIÓN: `00-diagnostico.md`]. **Es una decisión y un gasto del dueño.**

Argumentos, sin cifras inventadas:

1. **Control técnico.** En `parmotorweb.github.io/parmotor/` no se puede servir `robots.txt` (da 404 en el subdirectorio) [CONFIRMADO]. Con dominio propio en la raíz se controla el rastreo.
2. **Search Console completa.** Una propiedad de tipo **Dominio** (verificación por DNS) solo es posible con un dominio que controles. Con `github.io` solo cabe la de prefijo de URL.
3. **La autoridad es tuya y se puede llevar a otro sitio.** Hoy cada enlace que se consiga apunta a un subdirectorio de un dominio de GitHub. Si un día se cambia de alojamiento o de nombre de organización, se pierde. Cuanto más tarde se migre, más autoridad hay que trasladar y más riesgo tiene la migración [OPINIÓN, razonada].
4. **Confianza y clics.** Un resultado que dice `github.io` parece un proyecto personal frente a coches.com o Motor.es. Hay más probabilidad de clic con una marca reconocible [OPINIÓN: sin datos propios; se puede medir el CTR antes y después en Search Console].
5. **Email del Radar.** La suscripción, cuando se active, necesita enviar desde un dominio propio con SPF, DKIM y DMARC para tener buena entregabilidad. Con `github.io` no se puede.
6. **Coste de migración bajo hoy.** GitHub Pages admite dominio personalizado con HTTPS. Hay que verificar en la documentación de GitHub cómo redirige las URLs antiguas de `github.io` en un sitio de proyecto **antes** de migrar, y revisar canonical, sitemap, JSON-LD y `og:url` (todos llevan la URL absoluta `parmotorweb.github.io/parmotor/`).

Si el dueño dice que sí: checklist de migración en rama `web/seo-dominio` (canonical, sitemap, JSON-LD, OG, nueva propiedad de Search Console, cambio de dirección si procede y enlaces de redes). Esfuerzo L. Responsables: Web + SEO.

## F. KPI del trimestre

Las metas no tienen cifra hasta tener la línea base (Q1). Inventarlas iría contra la regla 1.

| KPI | Fuente | Línea base | Revisión |
|---|---|---|---|
| Páginas indexadas sobre las del sitemap | Search Console → Indexación | Pendiente (Q1) | Mensual |
| Impresiones y clics orgánicos (España) | Search Console → Rendimiento | Pendiente | Quincenal |
| Consultas comerciales de `keywords.md` en el top 10 | Search Console → Consultas | Pendiente | Quincenal |
| CTR de las fichas `/tasar/` | Search Console → Páginas | Pendiente | Quincenal |
| URLs nuevas indexadas sobre las publicadas | Search Console | 0 | Mensual |
| Fichas con enlace cruzado historia ↔ tasar | Rastreo propio | 17 en un sentido y 26 en el otro [CONFIRMADO] | Al publicar |
| Dominios que enlazan | Search Console → Enlaces | Pendiente | Mensual |
| LCP, INP y CLS en móvil | PageSpeed Insights (laboratorio) e informe CWV | Pendiente (Q1) | Mensual |
