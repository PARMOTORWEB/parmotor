# Propuestas web y CRO, priorizadas por ICE (25 nov 2026)

Autor: Diseñador web y CRO. Se basa en `agencia/web/auditoria-2026-11-25.md`.
**No he implementado nada.** Todo se hará en ramas `web/<tema>`, con prueba local (`python3 -m http.server` desde la raíz y abriendo `/…`) y capturas de antes y después. **Ningún merge ni push a `main` sin el sí del dueño.**

ICE: Impacto, Confianza y Facilidad, cada uno de 1 a 10. La puntuación es la media, y las tres notas son [OPINIÓN] del diseñador.
**Elemento crítico (EC)** quiere decir que toca la intro o la «puerta» de la portada, la analítica (`analitica.js` o una herramienta nueva), los textos legales, el JSON-LD, o que trata datos. Todo lo que va a `main` necesita aprobación; los EC además necesitan una decisión explícita sobre el fondo.

## Tabla resumen

| # | Propuesta | I | C | F | ICE | Esfuerzo | EC |
|---|---|---|---|---|---|---|---|
| 1 | (b) Enlaces sociales directos a la herramienta (`?mk=&md=&y=#tasador` y fichas) | 8 | 8 | 10 | **8,7** | 0 código | No |
| 2 | (a) Página de enlaces de la bio `/enlaces/` con UTM por vídeo | 8 | 7 | 8 | **7,7** | 3-4 h | No (tráfico y atribución) |
| 3 | (f) La intro no descarga fotogramas ni 3D si se entra directo a una herramienta | 8 | 8 | 6 | **7,3** | 2-3 h y pruebas | **Sí** (intro) |
| 4 | (f) 404 propio con salida al tasador | 5 | 9 | 9 | **7,7** | 1 h | No |
| 5 | (f) Puente historia → tasador (CTA con modelo relacionado y precarga) | 7 | 7 | 7 | **7,0** | 3-5 h (generador) | No |
| 6 | (f) Botón visible «Ir al tasador» en la intro, sin bloquear nada | 7 | 7 | 7 | **7,0** | 1-2 h | **Sí** (intro) |
| 7 | (e) Medición de eventos con GoatCounter | 9 | 7 | 5 | **7,0** | 4-6 h | **Sí** (analítica y privacidad) |
| 8 | (f) Fichas: precarga sin `y=2026` y enlace a «Cómo calculamos» | 5 | 7 | 9 | **7,0** | 1-2 h (plantilla) | No |
| 9 | (f) Arreglos de texto: «clientes» y «generaciónes» | 3 | 9 | 10 | **7,3** | 15 min | No |
| 10 | (c) Suscripción al Radar (solo diseño) | 9 | 6 | 4 | **6,3** | Diseño hecho; implementación de 4-6 h tras elegir proveedor | **Sí** (datos y legal) |
| 11 | (d) TikTok en el pie y en `sameAs` | 3 | 9 | 9 | **7,0** | 15 min | **Sí** (JSON-LD) y **bloqueada** |
| 12 | (f) Propuesta de valor visible en la primera pantalla de la portada | 7 | 5 | 6 | **6,0** | 2-3 h | **Sí** (intro) |
| 13 | (f) Buscador o filtro en `/tasar/` | 5 | 6 | 6 | **5,7** | 2-3 h | No |
| 14 | (f) Accesibilidad: grupos de botones con `role="group"` y `aria-pressed`; imagen principal de `/historia/` sin `lazy` | 3 | 8 | 8 | **6,3** | 1 h | No |

**Orden recomendado de ejecución:**
1. Sin código y ya: la 1.
2. Rama `web/atajos`: 4, 8, 9 y 14.
3. Rama `web/enlaces`: la 2.
4. Rama `web/intro-ligera`: 3 y 6 (EC).
5. Rama `web/puente-historia`: la 5.
6. Cuando decida el dueño: 7, 10 y 11.

---

## 1. (b) Destino directo al tasador desde el tráfico social: ICE 8,7

**Qué.** Hoy ya funciona, sin tocar código, un enlace que abre el tasador con el modelo cargado y sin intro (auditoría §4, camino C):

```
https://parmotorweb.github.io/parmotor/?mk=Seat&md=Le%C3%B3n&y=2018&utm_source=youtube&utm_medium=descripcion&utm_campaign=short-2026-12-01-seat-leon#tasador
```

**Reglas:**
- `mk` y `md` tienen que coincidir **exactamente** con los valores del selector (con acentos y mayúsculas; por ejemplo `Le%C3%B3n` o `Serie%203`). Si no coinciden, el tasador se queda vacío, aunque sin error. Las cadenas correctas se copian del botón de cada ficha `/tasar/<modelo>/`.
- `y` debe ser un año realista para ese modelo (por ejemplo, el que más se vende de segunda mano). Ver la propuesta 8.
- **Para vídeos de un modelo actual:** enlace a `/tasar/<modelo>/` (página ligera, de 15 KB) o el enlace directo de arriba.
- **Para vídeos de clásicos:** `/historia/<coche>/` (ver la propuesta 5).
- No escribir las direcciones de memoria. Hay slugs combinados (`peugeot-207-y-208`, `toyota-corolla-y-auris`), y la referencia es `sitemap.xml`.

**Hipótesis.** Si el enlace del vídeo lleva al tasador ya cargado, en lugar de a la portada, entonces subirá la proporción de visitas sociales que llegan al resultado. Se medirá con el evento `tasador_resultado` y `utm_source` (propuesta 7). Hasta entonces, con las páginas vistas por URL en Metricool.

**Dónde se usa.** En la descripción de YouTube (admite enlaces), en el comentario fijado y en la página de enlaces de la bio (propuesta 2). Se lo paso a Growth y al Community manager.

## 2. (a) Página de enlaces de la bio con UTM por vídeo: ICE 7,7

**Qué.** Una página nueva `/enlaces/` (HTML estático, **menos de 20 KB, sin intro ni 3D**), que será el único enlace de la bio en Instagram y TikTok. Si hace falta, se le añade `?utm_source=instagram` o `?utm_source=tiktok` en cada bio.

**Diseño (de arriba abajo, en móvil):**
1. Cabecera: logotipo y una línea: «Cuánto vale y cuánto cuesta un coche. Gratis y sin registro.»
2. **Botón principal** (acento `#e4ff4f`, a todo el ancho): «Tasar mi coche gratis →», que lleva a `../?utm_source={red}&utm_medium=bio&utm_campaign=bio-tasador#tasador`.
3. **«Los coches de los últimos vídeos»:** de 6 a 9 tarjetas, de la más reciente a la más antigua, con foto pequeña, nombre del coche y fecha del vídeo. Cada tarjeta lleva a la ficha del coche (`../historia/<coche>/` o `../tasar/<modelo>/`) con:
   `?utm_source={red}&utm_medium=bio&utm_campaign=short-AAAA-MM-DD-<slug>`
4. Botones secundarios: «Comparar dos coches» (`#calculadora`), «Qué coche me compro» (`#asesor`) y «Radar de esta semana» (`#radar`), todos con UTM.
5. Pie: «Precio orientativo, no es una tasación oficial.», con enlaces a la privacidad y al aviso legal.

**Convención de UTM (propuesta para el Analista):**
- `utm_source`: `instagram`, `tiktok` o `youtube`.
- `utm_medium`: `bio`, `descripcion` o `comentario`.
- `utm_campaign`: `short-AAAA-MM-DD-<slug-del-coche>` o `bio-<herramienta>`.
- Todo en minúsculas y sin acentos.

**Mantenimiento.** Las tarjetas se generan desde una lista (por ejemplo, `herramientas/enlaces.json`, con la fecha, el slug, la red y el destino), que actualiza la sesión principal con cada tanda de publicaciones. Así nadie edita HTML a mano.

**Notas:**
- Con `.nojekyll`, `/enlaces/index.html` se sirve tal cual.
- Hay que añadirla a `sitemap.xml` con `noindex`, o dejarla fuera (es una página de utilidad).
- **SIN VERIFICAR:** si Metricool web guarda los parámetros `utm_*` o solo la página de procedencia. Lo tiene que comprobar el Analista. Si no los guarda, la atribución por vídeo depende de la propuesta 7.
- Alternativa: los SmartLinks de Metricool (`integraciones.md`). Ventaja: cuentan los clics sin tocar la web. Inconvenientes: dependen de otra herramienta, y el aterrizaje sigue siendo la portada si no se configura bien.

**Hipótesis.** Si la bio lleva a una página ligera con un botón al tasador y enlaces por vídeo, entonces (1) se podrá atribuir cada visita a un vídeo y (2) el paso de la bio a la herramienta será mayor que llevando a la portada. Se medirá con los clics por `utm_campaign` y el porcentaje de visitas de `/enlaces/` que acaban en `tasador_resultado`.

## 3. (f) La intro no descarga fotogramas ni 3D si se entra directo a una herramienta: ICE 7,3, EC

**Problema** (auditoría §3.2): quien entra con `#tasador` (desde una ficha, un enlace directo o `/enlaces/`) no ve la intro, pero descarga unos 21,8 MB de fotogramas y unos 6,4 MB de 3D [ESTIMACIÓN deducida del código].

**Cambio propuesto en `assets/cine.js`** (esbozo; hay que probarlo en la rama). El arranque de la secuencia y de la escena 3D pasa a una función que solo se ejecuta cuando la intro es visible:

```diff
-  if (seqCv && !RM.matches) {
+  // si se entra directo a un apartado (p. ej. #tasador), la intro está oculta: no se descarga hasta que se vea
+  const arrancarSeq = () => {
+  if (seqCv && !RM.matches) {
     ...carga de fotogramas sin cambios...
   }
+  };
 ...
-  import('./sala3d/viaje.js?v=13')
-    .then(m => { viaje = m.iniciarViaje({ ... }); if (!viaje) sec.classList.add('sin3d'); })
-    .catch(() => sec.classList.add('sin3d'));
+  const arrancar3d = () => import('./sala3d/viaje.js?v=13')
+    .then(m => { viaje = m.iniciarViaje({ ... }); if (!viaje) sec.classList.add('sin3d'); })
+    .catch(() => sec.classList.add('sin3d'));
+  let arrancado = false;
+  const arranca = () => { if (arrancado) return; arrancado = true; arrancarSeq(); arrancar3d(); };
+  // la intro está oculta (display:none) mientras hay un apartado abierto; IntersectionObserver salta al volver a la sala
+  const io = new IntersectionObserver(es => { if (es.some(e => e.isIntersecting)) { io.disconnect(); arranca(); } });
+  io.observe(sec);
```

Hay que tener en cuenta que:
- `puerta.js` se ejecuta después de `cine.js` (los dos con `defer`, en ese orden), así que en el primer *tick* la intro todavía es visible. Por eso se usa `IntersectionObserver`, que dispara después del primer *layout*, y no una comprobación síncrona.
- Hay que probar que «← Volver a la sala» sigue funcionando (al volver se descargan los fotogramas: aceptable).

**Más ahorro, opcional:** bajar el umbral de `SEQ_Q` para que los móviles reciban `hdv` (15,0 MB) en lugar de `qhdv` (21,8 MB). Es una decisión de calidad visual, del dueño.

**Hipótesis.** Si quien entra directo a una herramienta no descarga la intro, entonces bajará el peso transferido de unos 29 MB a menos de 1 MB [ESTIMACIÓN], y mejorará el tiempo hasta la interacción con el tasador en móvil. Se medirá con Lighthouse móvil (`/?mk=Seat&md=Le%C3%B3n&y=2018#tasador`), comparando el peso transferido y el TBT o INP antes y después, con capturas de la pestaña «Red».

## 4. (f) 404 propio: ICE 7,7

**Qué.** Un archivo `404.html` en la raíz del repositorio. En un sitio de proyecto, GitHub Pages lo usa para las rutas inexistentes bajo `/parmotor/` [SIN VERIFICAR en este sitio; es el comportamiento documentado de GitHub Pages para un `404.html` en la raíz de la fuente]. El texto:

```html
<!-- 404.html (nuevo, en la raíz). Rutas absolutas porque el 404 se sirve en cualquier profundidad -->
<!DOCTYPE html><html lang="es"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Página no encontrada | Par Motor</title><meta name="robots" content="noindex">
<link rel="stylesheet" href="/parmotor/assets/modelos.css"></head>
<body><main class="wrap">
<h1>Esta página no existe (o ha cambiado de nombre)</h1>
<p class="lead">Busca tu coche en la lista de modelos o tásalo directamente.</p>
<a class="btn" href="/parmotor/#tasador">Abrir el tasador gratis →</a>
<p><a href="/parmotor/tasar/">Precios por modelo</a> · <a href="/parmotor/historia/">Historia del motor</a></p>
</main></body></html>
```

**Hipótesis.** Si un enlace roto lleva a una página con salida, entonces una parte de esas visitas seguirá navegando, en lugar de perderse. Se medirá con las páginas vistas del 404 en Metricool y la navegación posterior (con eventos: `404_salida`).

## 5. (f) Puente historia → tasador: ICE 7,0

**Problema.** Los vídeos son de clásicos y llevan a `/historia/<coche>/`, cuyo CTA es un `#tasador` genérico sin precarga.

**Qué.** En el generador de `/historia/` (`herramientas/generar-historia.py`; no está descargado en esta copia, y hay que añadirlo con `git sparse-checkout add /herramientas/`), un campo opcional `pariente` (el slug de `/tasar/`) para cada coche. Con ese campo, el bloque final queda así:

```
¿Y su heredero de hoy? Un BMW Serie 3 de segunda mano vale de X € a Y €.
[Ver precios del BMW Serie 3 →]  (../../tasar/bmw-serie-3/)
[Tasar el mío →]                 (../../?mk=BMW&md=Serie%203&y=AAAA#tasador)
Precio orientativo, no es una tasación oficial.
```

- Las cifras X e Y salen de la ficha `/tasar/` (mismo generador o mismos datos). **No se escriben a mano.**
- El investigador valida la relación entre cada clásico y su «heredero». Ejemplos: M3 E30 → Serie 3 o M3; SEAT 600 → no hay un heredero claro, y se usa el CTA genérico.
- Si no hay pariente, se mantiene el CTA actual.

**Hipótesis.** Si la ficha del clásico ofrece el precio del modelo actual de la misma familia, entonces aumentará el porcentaje de visitas de `/historia/*` que pasan a `/tasar/*` o al tasador. Se medirá con los clics del evento `historia_a_tasar` (o con la navegación entre páginas en Metricool).

## 6. (f) Botón visible «Ir al tasador» en la intro: ICE 7,0, EC

**Qué.** Convertir el *skip link* en un botón pequeño, fijo y visible en la cabecera durante toda la intro (por ejemplo, «Tasador →» arriba a la derecha, el mismo que ya tienen las fichas). Lleva a `#tasador`, que `puerta.js` ya sabe abrir como apartado. No es un pop-up ni tapa nada: es un atajo.

```diff
 <header>
   <div class="wrap nav">
     <a class="logo" href="#top" aria-label="Par Motor, ir al inicio">…PAR MOTOR</a>
+    <a class="cta" href="#tasador">Tasador</a>
   </div>
```

Hay que añadir el estilo `.cta` de `modelos.css`. `puerta.js` ya intercepta los `a[href^="#"]`.

**Hipótesis.** Si hay un atajo visible desde el primer segundo, entonces disminuirá el abandono en la intro y aumentarán las aperturas del tasador desde la portada. Se medirá con la proporción del evento `apartado_abierto{tasador}` sobre las visitas a `/`, con un experimento antes y después de dos semanas cada uno.

## 7. (e) Medición de eventos: ICE 7,0, EC, pendiente de decisión del dueño

**Recomendación:** GoatCounter (por lo que dice `integraciones.md`: gratuito, sin cookies y con eventos; **sus condiciones y su límite de uso están por confirmar**). Es coherente con «sin registro ni cookies».

**Eventos mínimos** (nombres para el Analista):

| Evento | Cuándo | Parámetro |
|---|---|---|
| `apartado_abierto` | `puerta.js` abre un apartado | `asesor`, `tasador`, `calculadora`, `radar` o `legal` |
| `tasador_resultado` | Primer precio que se pinta con marca, modelo y año | Marca y modelo (sin datos personales) |
| `tasador_precio_pedido` | El usuario rellena «¿Cuánto te piden?» | Solo si es chollo, justo o caro |
| `tasador_a_comparador` | Clic en `#toCmp` | — |
| `comparador_resultado` | Primer resultado con dos coches | — |
| `asesor_resultado` | Lista de resultados mostrada | Rango de presupuesto |
| `salida_portal` | Clic en coches.net, Wallapop o AutoScout24 | El portal |
| `ficha_a_tasador` | Clic en «Tasar mi … con mis datos» | El slug |
| `historia_a_tasar` | Clic en el puente de la propuesta 5 | El slug |
| `entrada_utm` | Carga de la página con `utm_campaign` | `utm_source` y `utm_campaign` |

**Qué hay que tocar:**
- Un script nuevo (o `analitica.js`, **que no se toca sin el sí del dueño**).
- Unas llamadas en `index.html`, `puerta.js` y las plantillas.
- **La política de privacidad y el `README.md`**: añadir GoatCounter como encargado y corregir «sin analítica».

**Hipótesis.** Si se miden los eventos del tasador, entonces la estrella polar («personas que usan una herramienta a la semana», `kpis.md`) pasará de no medible a medible, y se podrá atribuir el uso a cada vídeo. Se medirá con la presencia de datos diarios en el panel la primera semana y su coherencia con las páginas vistas de Metricool.

## 8. (f) Fichas `/tasar/`: precarga realista y enlace al método: ICE 7,0

**Qué:**
- En la plantilla del generador de `/tasar/` (sin localizar en esta copia local), cambiar `y=2026` por el año central de la generación más reciente, o quitar `y`, para que el usuario elija.
- Añadir debajo del botón: «¿Cómo calculamos este precio?» → `../../#metodo` (`puerta.js` lo abre dentro del apartado del tasador).

```diff
-<a class="btn" href="../../?mk=Seat&amp;md=Le%C3%B3n&amp;y=2026#tasador">Tasar mi León con mis datos →</a>
+<a class="btn" href="../../?mk=Seat&amp;md=Le%C3%B3n#tasador">Tasar mi León con mis datos →</a>
+<p class="note"><a href="../../#metodo">¿Cómo calculamos este precio?</a> Precio orientativo, no es una tasación oficial.</p>
```

Hay que comprobar en local que, sin `y`, el tasador elige un año por defecto razonable (la función `onMd()`).

**Hipótesis.** Si el tasador no arranca con un coche de 2026, entonces más usuarios ajustarán el año y los km y verán un precio útil. Se medirá con la proporción de `tasador_resultado` con año distinto del inicial y con las interacciones con `#metodo`.

## 9. (f) Arreglos de texto: ICE 7,3

En `index.html` (tasador):

```diff
-… depende demasiado del historial de cada coche. Nos sentimos en la responsabilidad de ser veraces, coherentes y transparentes con nuestros clientes y usuarios.
+… depende demasiado del historial de cada coche. Preferimos no darte una cifra que no podamos defender.
```

En la plantilla de las fichas `/tasar/`: «generaciónes» → «generaciones» (y «1 generación» en singular, si hace falta).

En `README.md` (no publica cambios visibles, pero es público): sustituir «sin cookies, sin analítica» por «sin cookies; estadísticas de visitas agregadas con Metricool (ver privacidad)».

## 10. (c) Suscripción al Radar: diseño, sin código que envíe datos: ICE 6,3, EC

**Estado:** bloqueada hasta que el dueño elija proveedor (MailerLite, Brevo, Buttondown u otro; comparar condiciones y precios actuales antes de decidir, `integraciones.md`). **Hasta entonces, no se añade ningún formulario funcional ni ningún texto que diga «suscríbete»** (`marca.md`).

**Dónde aparecerá (sin pop-ups ni bloqueos):**
1. Al final de cada edición del Radar (`#radar`), con el bloque completo.
2. Debajo del resultado del tasador, en una línea discreta: «¿Te avisamos cada lunes de lo que se mueve en el mercado? →», que lleva al bloque del Radar.
3. En el pie de las fichas `/tasar/` y `/historia/` y en `/enlaces/`.

**Bloque:**

```
RADAR SEMANAL
Cada lunes, en tu correo: precios de combustible, mercado de segunda mano
y qué significa para ti si vas a comprar o vender. Un email a la semana.

[ tu email                        ]  [ Quiero el Radar ]

Te mandaremos un email para confirmar. Si no lo confirmas, no te escribimos.
Puedes darte de baja en cualquier momento con un clic.
Responsable: Par Motor. Finalidad: enviarte el Radar semanal. Base legal: tu
consentimiento. Proveedor de envío: [PROVEEDOR] (ver Privacidad). Derechos:
acceso, rectificación, supresión y demás, en parmotorweb22@gmail.com.
[Política de privacidad]
```

**Reglas del diseño:**
- **Un solo campo** (el email) y, como mucho, una pregunta opcional («¿Vas a comprar o a vender?»), solo si el proveedor permite segmentar.
- **Sin casillas premarcadas.** Si el proveedor exige una casilla de consentimiento, va desmarcada.
- **Doble confirmación (*double opt-in*) obligatoria.** Página de «Revisa tu correo» y página de «Confirmado» dentro de la web (`/radar/gracias/`), sin datos en la URL.
- Ni urgencias falsas ni contadores.
- **Accesibilidad:** `<label>` visible, `autocomplete="email"`, `inputmode="email"` y errores anunciados con `aria-live`.
- **Datos:** el email va **directamente al proveedor** (formulario incrustado o `action` del proveedor). Nada pasa por el repositorio y no se guarda ningún lead en `agencia/`.

**Antes de activar, obligatorio:**
- **Actualizar la política de privacidad:**
  - Tratamiento nuevo.
  - Encargado: el proveedor.
  - Posibles transferencias internacionales si el proveedor está fuera del EEE.
  - Plazo de conservación (hasta la baja).
  - Base legal (consentimiento).
  - Fecha de actualización.
- **Revisar el aviso legal**, que ya habla de «un boletín semanal».
- Si el proveedor carga scripts o cookies en la web, revisar si hace falta un banner de consentimiento.

**Hipótesis.** Si al final del Radar y después del resultado del tasador se ofrece una suscripción de un solo campo con doble confirmación, entonces aparecerá el primer lead medible. Se medirá con las altas confirmadas por semana (proveedor) entre las visitas a `#radar` y los `tasador_resultado`. Meta inicial: la marca el Analista después de dos semanas de base.

## 11. (d) TikTok en la web y en el JSON-LD: ICE 7,0, BLOQUEADA

**Bloqueo:** el @ de TikTok no está confirmado (`integraciones.md`; Metricool solo muestra «Par Motor»). **No se publica una URL supuesta.**

**Diff preparado** (se sustituye `{USUARIO}` cuando el dueño lo confirme):

```diff
-"sameAs": ["https://www.instagram.com/parmotorrr/", "https://www.youtube.com/channel/UCdaSZmZUMuUJtuB3xbGmAJA"]
+"sameAs": ["https://www.instagram.com/parmotorrr/", "https://www.tiktok.com/@{USUARIO}", "https://www.youtube.com/channel/UCdaSZmZUMuUJtuB3xbGmAJA"]
```

```diff
 <a href="https://www.instagram.com/parmotorrr/" rel="me noopener">Instagram</a>
+<a href="https://www.tiktok.com/@{USUARIO}" rel="me noopener">TikTok</a>
 <a href="https://www.youtube.com/channel/UCdaSZmZUMuUJtuB3xbGmAJA" rel="me noopener">YouTube</a>
```

Va en el pie de la portada y en el de `/historia/` (generador). Se aprovecha para añadir también las tres redes al pie de las fichas `/tasar/`, que hoy no tienen ninguna.

**Hipótesis.** Si la web enlaza las tres redes, entonces se refuerza la identidad de la entidad (`sameAs`) y se abre un camino de la web a TikTok. Se medirá con los clics de salida (evento `salida_red`) y los seguidores de TikTok llegados desde la web, si la plataforma lo reporta (**SIN VERIFICAR**).

## 12. (f) Propuesta de valor en la primera pantalla: ICE 6,0, EC

**Qué.** Sin quitar la intro, que la primera pantalla incluya una línea fija y legible («Cuánto vale y cuánto cuesta de verdad un coche. Gratis y sin registro.») junto al botón de la propuesta 6, en lugar de que el mensaje aparezca en la 3.ª-6.ª pantalla.

**Hipótesis.** Si la promesa se lee en el primer segundo, entonces aumentará el porcentaje de visitas a `/` que abren una herramienta. Se medirá con `apartado_abierto` sobre las visitas a `/`. Es una decisión creativa del dueño y del Director Creativo.

## 13. (f) Filtro en `/tasar/`: ICE 5,7

Un `<input type="search">` con un filtro en JS local sobre la lista de 396 modelos, sin enviar nada.

**Hipótesis.** Si se puede escribir «León», entonces bajará el tiempo hasta llegar a la ficha. Se medirá con los clics desde `/tasar/` a las fichas por cada visita.

## 14. (f) Accesibilidad básica: ICE 6,3

- `#tStL` y `#ageL`: pasar de `<label>` a `<span id>`, poner `role="group" aria-labelledby` en el contenedor y `aria-pressed` en el botón activo (hay que revisar `setSeg()`).
- Imagen principal de `/historia/<coche>/`: quitar `loading="lazy"` y añadir `fetchpriority="high"` (generador).

---

## Avisos que se mantienen en todas las propuestas
«Precio orientativo, no es una tasación oficial», «No sustituyen a una tasación ni a un presupuesto real» y el aviso legal del tasador. Ninguna propuesta los quita, y la 2, la 5 y la 8 los repiten cerca del CTA.

## TRASPASO
- **Decisiones del dueño:**
  - (1) Proveedor de eventos: se recomienda GoatCounter, que toca la privacidad y quizá `analitica.js`.
  - (2) Proveedor de email del Radar, que obliga a actualizar la privacidad y el aviso legal.
  - (3) El @ de TikTok.
  - (4) El sí para las ramas EC: `web/intro-ligera` (propuestas 3 y 6) y la 12.
- **Se puede empezar ya, sin decisión** (en rama, sin `main`): las propuestas 1 (solo enlaces), 2, 4, 8, 9, 13 y 14. La 5 necesita `git sparse-checkout add /herramientas/` y que el investigador valide los «herederos».
- **Para Growth y el Community manager:** la convención de UTM y los enlaces directos de la propuesta 1, para usarlos ya en las descripciones de YouTube y los comentarios fijados.
- **Para el Analista:** comprobar si Metricool guarda `utm_*` y las aperturas de apartado con hash.
- **Riesgo:** hasta que exista la propuesta 7, ningún cambio de CRO se puede evaluar con datos de uso, solo con páginas vistas.
