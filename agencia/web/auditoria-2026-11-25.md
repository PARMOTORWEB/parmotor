# Auditoría web y CRO: Par Motor (25 nov 2026)

Autor: Diseñador web y CRO. Ronda 1 de la agencia.
Método: descargas con `curl` de la web publicada (`https://parmotorweb.github.io/parmotor/`) el 25-26 nov 2026, lectura del HTML, CSS y JS publicados (`index.html`, `assets/cine.js`, `assets/puerta.js`, `assets/editorial.css`, `assets/sala3d/viaje.src.js`) y peticiones HEAD para medir pesos.
**Límites del método:** no he abierto la web en un navegador real ni en un móvil, así que **no hay capturas** ni mediciones de LCP/INP/CLS. Lo que se deduce del código va marcado como tal. Faltan las capturas de antes y después: hay que hacerlas en la rama `web/*` cuando se implemente.

Muestra revisada:
- Portada: todas las secciones.
- `/tasar/` (índice).
- Fichas `/tasar/`: `seat-leon`, `bmw-serie-3`, `dacia-sandero`, `renault-clio`, `tesla-model-3` y `volkswagen-golf` (6 fichas de 6 marcas).
- `/historia/` (índice).
- Fichas `/historia/`: `bmw-m3-e30`, `citroen-2cv`, `delorean-dmc-12` y `seat-600` (4 fichas).

---

## 0. Correcciones al diagnóstico (`00-diagnostico.md`)

| Dato del diagnóstico | Medido | Fuente |
|---|---|---|
| Portada «unos 457 KB de HTML» | **355.868 bytes** sin comprimir y **104.028 bytes** con gzip (GitHub Pages sirve `content-encoding: gzip`). El `index.html` local es idéntico byte a byte al publicado | [CONFIRMADO: `curl -w %{size_download}` y `cmp`, 25 nov] |
| El HTML es lo que pesa | **No.** Lo que pesa es la intro: de **15 a 44 MB de fotogramas** más **unos 6,7 MB de modelos 3D** (ver §3) | [CONFIRMADO: HEAD de cada recurso] |
| Asesor con «288 modelos, 502 generaciones» | El manifiesto de la portada dice «**396** modelos con precio de segunda mano · **757** generaciones». Puede que las dos cifras midan cosas distintas (asesor frente a tasador), pero hay que aclararlo | [CONFIRMADO: texto de `index.html`] |
| `README.md`: «sin cookies, sin analítica» | Falso desde que se instaló Metricool (`assets/analitica.js`, que la política de privacidad sí declara) | [CONFIRMADO: `README.md` y `analitica.js`] |

---

## 1. Propuesta de valor (¿se entiende en 5 segundos?)

**Portada (`/`).** Lo que se ve al aterrizar:
- **Arriba:** un póster del concesionario bajo la lluvia (`viaje-0.webp`), el logotipo y el titular de la primera pantalla de la intro: «La última curva, bajo la lluvia. El asfalto mojado y, al fondo, las luces de la sala encendidas.»
- **Más abajo:** el `<h1>` real («¿Cuánto te cuesta de verdad ese deportivo?») y la frase «Dentro no vendemos coches: te decimos cuánto valen» no aparecen hasta la 3.ª-6.ª pantalla del recorrido, porque el texto aparece y desaparece al ritmo del scroll (`cine.js`, `copies[...]`).
- **Veredicto [OPINIÓN]:** en 5 segundos **no** se entiende qué es ni para quién. Se entiende que es algo de coches con estética de cine. El `<title>` y la meta descripción («Cuánto vale y cuánto cuesta tu coche… Tasador gratis… Sin registro») sí son claros, pero solo se ven en Google y al compartir.
- **El `<h1>` habla de «ese deportivo»** (los cuatro coches de la sala son un M4, un AMG GT, un Rolls-Royce Ghost y un Clase G), mientras que la parrilla recomendada y las fichas son Golf, León, Corolla o Sandero. Hay una tensión de público (ver §2).

**Fichas `/tasar/<modelo>/`.** Se entienden en menos de 5 segundos: H1 en pregunta («¿Cuánto vale un Seat León de segunda mano?»), un rango («de 3.700 € a 33.500 €»), tres cifras destacadas y un botón «Tasar mi León con mis datos →» antes de la tabla. Es **la mejor página de aterrizaje que tiene hoy la web**. [CONFIRMADO: `/tasar/seat-leon/`]

**Fichas `/historia/<coche>/`.** Son claras como contenido («4 cosas que no sabías del BMW M3 E30»), con un CTA «¿Y cuánto vale tu coche? Abrir el tasador gratis →». La transición de la historia a la herramienta es brusca y genérica (ver §4).

## 2. Público objetivo implícito

[OPINIÓN, a partir del contenido]
- **Portada e intro:** aficionado a los deportivos y al lujo (M4, G 63, Ghost, Spectre), con un tono aspiracional.
- **Herramientas y fichas:** comprador o vendedor práctico de un coche de segunda mano normal (de 3.000 € a 30.000 €), que quiere saber si le piden de más.
- **Vídeos (todos «4 cosas que no sabías del [clásico]») y `/historia/`:** nostálgico o aficionado a los clásicos.

Son tres públicos, y el que tiene intención de uso (el segundo) es el que peor recibe la portada. El tráfico social de hoy (el tercero) aterriza en una portada pensada para el primero.

## 3. Peso y velocidad

### 3.1 Medido

| Recurso | Peso | Cuándo se carga |
|---|---|---|
| `index.html` | 355.868 B (gzip: 104.028 B) | Siempre |
| Póster `cine/viaje-0.webp` (escritorio) / `cine/hdv/f000.webp` (móvil) | 120.920 B / 72.954 B | Siempre (preload, `fetchpriority=high`) |
| Fotogramas del recorrido, móvil `hdv` (285) | **15,0 MB** | Ver 3.2 |
| Fotogramas del recorrido, móvil `qhdv` (285) | **21,8 MB** | Ver 3.2 |
| Fotogramas del recorrido, escritorio `hd` (381) | **29,3 MB** | Ver 3.2 |
| Fotogramas del recorrido, escritorio `qhd` (381) | **43,7 MB** | Ver 3.2 |
| `sala.webp` (hdv / hd) | 155.492 B / 144.794 B | Con los fotogramas |
| `sala3d/viaje.js` (three.js y la escena) | 719.899 B (gzip: 198.786 B) | `import()` dinámico al cargar `cine.js` |
| Modelos 3D `m4.glb` + `amggt.glb` + `ghost.glb` + `g500.glb` | 1.972.044 + 459.744 + 1.473.548 + 2.836.244 = **6.741.580 B (unos 6,4 MB)** | Los cuatro, uno tras otro, en `viaje.src.js` línea 507 |
| Draco (`draco_decoder.wasm` + wrapper) | 192.420 + 58.456 B | Con los modelos [deducido del código] |
| Fuentes precargadas (Inter-400, Barlow 800i) | 23.664 + 23.780 B | Siempre |
| `Archivo-var.woff2` (precarga al final del `<head>`) | 90.104 B | Siempre |
| Ficha `/tasar/seat-leon/` (HTML) | 15.263 B (+ `modelos.css`, 5.482 B) | — |
| Índices `/tasar/` y `/historia/` | 23.916 B y 25.454 B | — |
| Fichas `/historia/` (HTML) | de 6.431 a 6.641 B | — |

[CONFIRMADO: `curl -sI`, `content-length`, 25-26 nov. Los totales de fotogramas suman la cabecera de cada uno de los archivos `f000`-`f284` y `f000`-`f380`.]

### 3.2 Hallazgo crítico: la intro se descarga entera aunque no se vea

Según el código de `assets/cine.js`, si el usuario no tiene activado «reducir movimiento»:
- La carga de fotogramas arranca siempre (`for (let c = 0; c < 6; c++) sig();`, con 6 descargas en paralelo) y **sigue hasta descargar todos** (`siguiente()` solo devuelve −1 cuando no queda ninguno).
- También se importa siempre `sala3d/viaje.js`, que carga los 4 modelos `.glb`.
- **No hay ninguna condición que lo evite** cuando se entra con `#tasador` (por ejemplo, desde el botón de una ficha), y eso que `puerta.js` oculta la intro en ese caso (`body.puerta.en-apartado .cine{display:none}`).
- Qué juego de fotogramas recibe un móvil: el `qhdv` si `innerWidth × dpr > 960`. Un móvil típico de 390 px de ancho y dpr 3 da 1.170, así que **recibe el `qhdv` (21,8 MB)**, salvo que tenga activado el ahorro de datos o esté en 2G o 3G.
- **[ESTIMACIÓN, deducida del código; no observada en un navegador]:** un móvil moderno que entra en la portada descarga unos **21,8 MB de fotogramas + unos 6,4 MB de 3D + unos 0,5 MB del resto, es decir, unos 29 MB**, entre o no en la herramienta.

Consecuencias [OPINIÓN]:
- Con datos móviles es un coste real para el usuario.
- Compite por ancho de banda y CPU con el tasador justo cuando alguien viene de un vídeo.
- `powerPreference: 'high-performance'` en WebGL puede calentar el móvil y gastar batería.

### 3.3 Lo que no he podido medir
LCP, INP, CLS y el tiempo hasta que el tasador responde en un móvil real. Hace falta pasar Lighthouse o PageSpeed Insights (móvil) sobre `/` y sobre `/?mk=Seat&md=León&y=2020#tasador`, en la rama, antes y después de cada cambio.

## 4. Recorrido desde un vídeo (bio → resultado del tasador)

Hoy la bio apunta a la portada y el CTA de los vídeos es «tasador gratis en el enlace del perfil» [CONFIRMADO: `00-diagnostico.md`].

| Camino | Pasos hasta ver un precio | Evidencia |
|---|---|---|
| **A. Bio → `/` (lo de hoy)** | Hay que recorrer toda la intro: `.cine{height:calc(6*100vh + 40vh)}` son **640 vh**, es decir, unas **6 o 7 pasadas de dedo** [ESTIMACIÓN: 1 pasada ≈ 1 pantalla]. Después, **1 toque** en el coche «02 Tasador de usados» (el scroll se detiene en la sala: `puerta.js` oculta el resto de la página hasta que eliges un coche). Por último, elegir **marca, modelo y año** (3 selectores). **Total: unas 10 u 11 interacciones** | `editorial.css`, `puerta.js` (`body.puerta main > :not(.cine):not(.ap-on){display:none}`) |
| A'. «Saltar al tasador» | Es un *skip link* oculto (`.skip{top:-60px}`) que **solo aparece con el foco del teclado**. En un móvil no se ve | `index.html`, `.skip` / `.skip:focus` |
| **B. Bio → `/tasar/<modelo>/` → botón** | **1 toque** («Tasar mi León con mis datos →») abre la portada con `?mk=Seat&md=León&y=2026#tasador`. La precarga rellena marca, modelo y año, y `puerta.js` abre el apartado directamente, sin intro. El precio aparece con **el año 2026 por defecto**, así que casi todos tendrán que cambiar el año y los km: **unas 3 interacciones** | `/tasar/seat-leon/` (`a.btn`) e `index.html` («precarga del tasador desde la URL») |
| **C. Enlace directo `/?mk=…&md=…&y=…#tasador`** | **0 toques** hasta el primer precio. Ya funciona hoy, sin tocar código | `index.html` (`URLSearchParams`) |
| D. Bio → `/historia/<clásico>/` → «Abrir el tasador gratis» | 1 toque, pero llega a `#tasador` **sin precarga**: el usuario empieza de cero (3 selectores). No hay enlace a una ficha `/tasar/` relacionada | `/historia/bmw-m3-e30/` y `/historia/seat-600/` |

Hallazgos del recorrido:
1. **Los vídeos hablan de clásicos y la mayoría de esos clásicos no tiene ficha en el tasador** (que solo tasa hasta 100.000 km y años recientes). El destino coherente de un vídeo «4 cosas que no sabías del BMW M3 E30» es `/historia/bmw-m3-e30/`, y de ahí, un puente al pariente actual (`/tasar/bmw-serie-3/` o `/tasar/bmw-serie-4/`). Ese puente no existe. [CONFIRMADO: el CTA de las fichas de historia es `../../#tasador`]
2. **Las direcciones de las fichas no se pueden adivinar:** `/tasar/peugeot-208/` y `/tasar/toyota-corolla/` dan 404, porque las reales son `/tasar/peugeot-207-y-208/` y `/tasar/toyota-corolla-y-auris/`. Si alguien escribe un enlace a mano en un vídeo o en la bio, puede romperse. [CONFIRMADO: HTTP 404]
3. **El 404 es la página por defecto de GitHub** («Page not found · GitHub Pages», 9.379 B), sin enlace a Par Motor. Es un callejón sin salida. [CONFIRMADO: `/enlaces/` y `/tasar/no-existe/`]
4. No existe una página de enlaces para la bio (`/enlaces/` da 404), así que hoy no se puede atribuir qué vídeo trae cada visita.

## 5. Móvil

- La viewport es correcta en todas las páginas (`width=device-width`, con `viewport-fit=cover` en la portada).
- **Portada:** la intro ocupa unas 6,4 pantallas de scroll forzado, y en el modo «puerta» no hay forma visible de llegar a las herramientas sin recorrerla (ver A y A'). Para un usuario que viene de un vídeo de 30 s, es el mayor punto de abandono previsible [OPINIÓN; hace falta medirlo con eventos].
- **Fichas `/tasar/`:** según el diagnóstico, se ven limpias en móvil, con el botón «TASADOR» fijo en la cabecera [CONFIRMADO en `00-diagnostico.md`; hoy no lo he vuelto a ver en pantalla]. Las tablas de precios van dentro de `.tbl` (deduzco que con scroll horizontal; **sin verificar en pantalla**).
- **Fichas `/historia/`:** la imagen principal lleva `loading="lazy"`. Como es la imagen grande de arriba, eso puede retrasar el LCP [deducido del HTML].

## 6. CTAs

| Página | CTA | Problema |
|---|---|---|
| Portada, intro | Los 4 coches de la sala (01 Asesor, 02 Tasador, 03 Comparador, 04 Radar) | Solo aparecen al final del recorrido. Las 4 herramientas tienen el mismo peso visual, sin una principal |
| Portada, «Nuestra parrilla de salida» | «¿Cuánto vale? →» en 6 coches | Bien: lleva al tasador con el modelo |
| Portada, tasador | «Calcular cuánto me costaría al mes →» (`#toCmp`) | Bien: encadena herramientas. **No hay un paso siguiente de retención** («recibe el Radar», «guarda este resultado») |
| Portada, Museo del box | Ninguno | Las 4 fichas de clásicos no enlazan a `/historia/` (solo hay 1 enlace a `historia/` en toda la portada, en el pie) |
| Portada, Radar | Fuentes externas | Ningún CTA para volver el lunes siguiente (lógico mientras no haya suscripción) |
| `/tasar/<modelo>/` | «Tasar mi [modelo] con mis datos →» y «Abrir el comparador →» | Precarga **siempre `y=2026`** (lo he visto en las 6 fichas): el usuario ve el precio de un coche casi nuevo, no el del suyo. El comparador no se precarga con el modelo |
| `/historia/<coche>/` | «Abrir el tasador gratis →» | Genérico y sin precarga. No enlaza a la ficha `/tasar/` del pariente actual |

## 7. Navegación

- **Portada:** la cabecera solo tiene el logotipo. En modo «puerta» cada herramienta es una «página» con un botón «← Volver a la sala» que te devuelve **al final de la intro**. No hay menú para saltar de una herramienta a otra, salvo los enlaces que hay dentro de cada una. [CONFIRMADO: `puerta.js`]
- **`/tasar/` y fichas:** migas de pan (Par Motor › Precios por modelo › Modelo), el botón «Tasador» en la cabecera y «Otros [marca]». Es correcto. El pie de las fichas `/tasar/` **no enlaza a las redes, al Radar ni a `/historia/`**.
- **`/tasar/` índice:** solo una lista por marcas (396 modelos), **sin buscador**. En móvil hay que hacer scroll hasta la marca [OPINIÓN: un filtro sería una mejora].
- **`/historia/`:** las cartas de marca y de coche funcionan, y el pie enlaza a Instagram y YouTube, **pero no a TikTok** (como en el resto de la web).

## 8. Confianza

Puntos fuertes [CONFIRMADO]:
- «Cómo calculamos» (`#metodo`) explica la depreciación, la energía, el seguro (con multiplicadores por edad), los neumáticos, el mantenimiento, el tasador y los impuestos e ITV, y la fecha de revisión («noviembre de 2026»).
- Avisos visibles:
  - Pie de la portada: «Valores orientativos… No sustituyen a una tasación ni a un presupuesto real».
  - Aviso legal: «No son una tasación oficial ni pericial, ni una oferta de compra o venta».
  - Pie de cada ficha: el mismo aviso. **Hay que mantenerlos.**
- Los créditos de las fotos van con su autor y licencia.
- Las fuentes del Radar van enlazadas.
- «Par Motor no tiene relación comercial con ninguna marca».

Puntos débiles:
1. En el tasador, junto al límite de 100.000 km: «Nos sentimos en la responsabilidad de ser veraces, coherentes y transparentes con nuestros **clientes** y usuarios.» Par Motor no tiene clientes (`marca.md`), y la frase suena a plantilla. [CONFIRMADO: texto de `index.html`]
2. Hay una errata en todas las fichas `/tasar/` de la muestra: «en 4 **generaciónes**» (las 6 la tienen). Sale de la plantilla del generador. [CONFIRMADO: `grep`]
3. La metodología está en la portada (`#metodo`), pero las fichas `/tasar/` no enlazan a ella. Justo donde se ve un precio no hay un «¿Cómo calculamos este precio?».
4. Que la dirección sea `github.io` y no un dominio propio resta credibilidad [OPINIÓN; ya está en el diagnóstico].
5. El aviso legal publica el NIF y el domicilio del titular. La LSSI lo exige a ciertos prestadores, pero **conviene que el dueño confirme si su caso lo requiere** [OPINIÓN; no es asesoramiento jurídico]. No reproduzco esos datos aquí.

## 9. Accesibilidad básica

- `lang="es"`, *skip link* (aunque solo se ve con el teclado) y `aria-label` en la intro y en los canvas.
- **Formularios:**
  - Bien: los `select` y los `range` del tasador y del asesor tienen `<label for>`.
  - Mal: «Estado» (`#tStL`) y «Edad del conductor» (`#ageL`) son `<label>` sin control asociado que agrupan botones. Lo correcto sería `role="group"` con `aria-labelledby`, y `aria-pressed` en el botón activo. No he comprobado si `setSeg()` pone `aria-pressed`.
- **Contraste** (calculado sobre `--bg #0f0f0e`):
  - `--ink-3 #8a897f`: 5,45:1.
  - `--ink-2 #bdbcb4`: 10,06:1.
  - Acento `#e4ff4f`: 17,09:1.
  - Todos pasan AA para texto normal. [CONFIRMADO: cálculo WCAG]
- **Movimiento:** se respeta `prefers-reduced-motion`. Con esa preferencia, la intro se queda quieta y `puerta.js` no se activa.
- **Imágenes:** las cartas de `/historia/` usan `alt=""` dentro de enlaces que tienen texto. Es aceptable.
- Los enlaces externos del Radar no avisan de que salen de la web. Es menor.

## 10. Conversión: resumen de problemas, por gravedad

1. **No se mide nada de lo que importa:** ni el uso del tasador, ni qué vídeo trae la visita, ni los clics a portales. Además, `puerta.js` cambia de «página» con `pushState` y un hash, y **no sé si Metricool cuenta esos cambios como páginas vistas** (SIN VERIFICAR; probablemente solo cuenta la carga inicial).
2. **La bio lleva a la portada, que es el camino más largo:** unas 10 u 11 interacciones y unos 29 MB en móvil [ESTIMACIÓN], cuando los caminos de 0 a 3 interacciones ya existen.
3. **Los vídeos (clásicos) no tienen puente** hacia una herramienta relacionada.
4. **No hay ningún paso de retención** después del resultado (el Radar no se puede suscribir).
5. Las fichas precargan `y=2026`.
6. El 404 de GitHub es un callejón sin salida.
7. No aparece TikTok (bloqueado: falta el @).

## TRASPASO
- **Hecho:** auditoría de la portada (todas sus secciones), de `/tasar/` (índice y 6 fichas de 6 marcas) y de `/historia/` (índice y 4 fichas), con pesos medidos.
- **Para el Director:**
  - Corregir en `00-diagnostico.md` el peso de la portada (355.868 B; 104.028 B con gzip) y añadir que la intro descarga entre 15 y 44 MB de fotogramas y unos 6,4 MB de 3D.
  - Aclarar con el investigador la diferencia entre 288/502 y 396/757.
- **Para el Analista:** comprobar si Metricool registra las aperturas de apartado por hash y si guarda los parámetros `utm_*`.
- **Para SEO:** las fichas no enlazan a `#metodo`. Hay una errata «generaciónes» en la plantilla. Las direcciones son combinadas (`peugeot-207-y-208`). No hay 404 propio.
- **Pendiente:** capturas en móvil y escritorio, y Lighthouse, que exigen navegador y rama `web/*`.
