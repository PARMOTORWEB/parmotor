# Diagnóstico inicial: Par Motor (25 nov 2026)

Lo hizo el sistema al arrancar, leyendo la web publicada y la cuenta de Metricool. Todo lo que aparece aquí se comprobó ese día. Lo que no se pudo comprobar está marcado como **SIN VERIFICAR**.

## 1. La web

- **URL:** https://parmotorweb.github.io/parmotor/. Es una web estática en GitHub Pages, con repositorio `PARMOTORWEB/parmotor` y sin dominio propio.
- **Tamaño:** el `sitemap.xml` tiene **461 URLs**: la portada, `/tasar/` con unas 396 fichas «Precio [modelo] de segunda mano 2026» y `/historia/` con 63 fichas de modelos míticos.
- **Portada** (HTML de 355.868 B, 104.028 B comprimido; la cifra inicial de 457 KB era la del DOM ya renderizado. **Lo pesado es la intro:** de 15 a 44 MB de fotogramas según el dispositivo y unos 6,4 MB de modelos 3D, que se descargan aunque se entre directo a `#tasador`, según `web/auditoria-2026-11-25.md`): empieza con una intro cinematográfica en scroll («Desliza para entrar») con modelos 3D, y tiene un enlace «Saltar al tasador». Sus secciones son:
  - Asesor de compra: filtro de presupuesto de 3.000 € a 150.000 € (20.000 € por defecto), con 288 modelos, 502 generaciones y 2.811 motores, y enlaces a anuncios de AutoScout24, coches.net y Wallapop. Corregido por el investigador el 25 de noviembre.
  - Tasador de segunda mano.
  - Comparador de coste real, con el desglose «¿En qué se va el dinero?».
  - Museo del box: 4 clásicos.
  - Radar semanal: el Nº 02 salió el lunes 23 de noviembre de 2026, con fuentes enlazadas.
  - «Cómo calculamos»: depreciación, energía, seguro, neumáticos, mantenimiento, impuestos e ITV.
  - Precios por modelo.
- **Ficha de modelo** (ejemplo: `/tasar/seat-leon/`):
  - Título: «Precio Seat León de segunda mano 2026 | Par Motor».
  - Meta descripción con rango de precios y la fecha (noviembre de 2026).
  - H1 en forma de pregunta, tabla de precios por año, preguntas frecuentes, otros modelos de la marca y enlace al comparador.
  - En móvil se ve limpia, con el botón «TASADOR» fijo arriba.
- **SEO técnico:**
  - `canonical`, `robots index,follow`, Open Graph completo con imagen de 1200×630, `og:locale es_ES`, JSON-LD (`WebSite`, `Organization`, `WebApplication`) y sitemap.
  - `/parmotor/robots.txt` da 404. Es normal: en GitHub Pages, robots.txt solo cuenta en la raíz del dominio.
  - Search Console está verificada, según el dueño.
- **Analítica:**
  - `assets/analitica.js` carga el tracker de Metricool (`be.js`) con el hash de la marca `parmotorrr`, y en el navegador `window.beTracker` existe. **El código está instalado.**
  - Aun así, Metricool registra **0 páginas vistas, 0 visitas y 0 visitantes del 16 al 25 de noviembre**. En la configuración de la marca, `networksData` solo incluye Instagram, TikTok y YouTube, no la web. **Hipótesis:** la web no está conectada como fuente en los ajustes de la marca en Metricool. **SIN VERIFICAR:** lo tiene que mirar el dueño en Metricool.
  - GA4 no está instalado. **No hay medición de eventos:** nadie sabe cuántas personas usan el tasador o el comparador.
- **Captación:** no hay formularios, emails, registro ni contacto. La suscripción al Radar aparece en la política de privacidad, pero no está activa.
- **Redes en la web:** el pie y el `sameAs` del JSON-LD enlazan Instagram y YouTube. **TikTok no aparece.**

## 2. Redes y publicación (Metricool, marca 8158748, zona Europe/Madrid)

- Cuentas conectadas: Instagram `parmotorrr`, TikTok «Par Motor» (el @usuario no está confirmado) y YouTube `UCdaSZmZUMuUJtuB3xbGmAJA`.
- **Ya existe una cadena de publicación automática:**
  - 2 vídeos al día en las 3 redes.
  - Horario: 10:00 (YouTube e Instagram) y 10:30 (TikTok); 16:00 (YouTube), 18:00 (Instagram) y 18:30 (TikTok).
  - Está programada **al menos hasta el 1 de febrero de 2027** (unas 196 publicaciones contadas por el analista el 26 de noviembre). Se creó entre el 23 y el 25 de noviembre.
- **Todo es el mismo formato:** «4 cosas que no sabías del [clásico]», con fotos de Wikimedia Commons y la marca de contenido generado con IA activada.
- El CTA es genérico: en Instagram y TikTok, «tasador gratis en el enlace del perfil»; en YouTube, la URL de la portada.
- **Hueco:** del 25 al 30 de noviembre no hay nada programado.
- En las analíticas de Reels de Metricool del 1 al 25 de noviembre **no aparece ningún reel**. Puede que todavía no se haya publicado nada, o que Metricool aún no tenga los datos.

## 3. Lectura estratégica

| Lo que funciona | Lo que frena el crecimiento |
|---|---|
| Unas 400 fichas de modelo con intención de búsqueda comercial clara («precio X segunda mano») | Sin dominio propio: menos autoridad y menos confianza, y la marca queda atada a github.io |
| La herramienta es gratis y sin registro, así que la fricción es mínima | **El embudo acaba en el tasador:** no hay ningún lead que capturar ni medir |
| Ya se publican 14 shorts por semana | El 100 % es historia y nostalgia: da alcance, pero apenas tiene intención de compra o venta |
| El Radar semanal tiene fuentes, lo que da credibilidad | El CTA no lleva a la ficha del coche del vídeo |
| La transparencia («Cómo calculamos») da confianza | La analítica web marca 0, así que ahora mismo no se puede saber qué vídeo trae visitas |

## 4. Prioridades que salen del diagnóstico (orden propuesto)

1. **Medir.** Conectar la web en Metricool y decidir cómo medir los eventos del tasador (ver `integraciones.md`). Sin esto, el analista no puede hacer su trabajo.
2. **Cerrar el embudo.** Activar la suscripción al Radar. Es el primer lead real que puede tener la web. Hay que elegir un proveedor de email y actualizar la privacidad.
3. **Conectar vídeo y ficha.** Cada short sobre un modelo debe llevar a `/tasar/<modelo>/`, con un enlace en la bio que se pueda rastrear.
4. **Cambiar la mezcla de contenidos a partir del 15 de diciembre.** Bajar la historia del 100 % al 30 % y meter pilares con intención comercial (ver `calendario/`).
5. **Rellenar el hueco del 26 al 30 de noviembre.**
6. **Dominio propio.** Decisión y gasto del dueño (unos 10–15 €/año, **ESTIMACIÓN**).
