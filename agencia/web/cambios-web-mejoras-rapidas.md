# Cambios web: mejoras rápidas (26 nov 2026)

Rama `web/mejoras-rapidas` (worktree `.worktrees/web-mejoras-rapidas`). Sin push ni merge.

## Qué cambió
1. **404.html propio** (raíz). Marca (#0f0f0e, #e4ff4f), fuentes por ruta absoluta `/parmotor/assets/fonts/…` (comprobado: 200 en la web publicada), salidas a `/parmotor/#tasador`, `/parmotor/tasar/` y la portada, aviso «valores orientativos». Sin scripts. `noindex`.
   - Constancia: la documentación de GitHub Pages solo dice que el archivo `404.html` va en la fuente de publicación (raíz). **No dice explícitamente** cómo se comporta en un sitio de proyecto (/parmotor/). `[POR VERIFICAR]` tras publicar: abrir `https://parmotorweb.github.io/parmotor/no-existe`.
2. **Erratas.** «generaciónes» → «generaciones» corregido en `herramientas/generar-modelos.mjs` (plural construido con «+es»; ahora elige palabra entera) y en 219 fichas `tasar/*/index.html` (reemplazo exacto; 438 líneas -/+ con solo esa palabra, verificado con diff por palabras; 0 apariciones restantes). En `index.html` no estaba esa errata. «con nuestros clientes y usuarios» → «Queremos ser veraces, coherentes y transparentes con quienes usan la web.» (solo `index.html`; las fichas no lo contenían). No pude ejecutar el generador (no hay `node`); revisado a ojo.
3. **`enlaces/index.html`**, link-in-bio ligera, móvil primero, sin cookies ni terceros. Botones: Tasador, Comparador (#calculadora), Asesor (#asesor), Precios por modelo, Radar (#radar), Instagram y YouTube. UTM en cada botón: `utm_source=bio` por defecto; con `?from=instagram|tiktok|youtube` un JS de 3 líneas lo sustituye. `utm_medium=bio`, `utm_campaign=enlaces`, `utm_content=<botón>` (los UTM van antes del ancla). Es una versión base: los botones por vídeo con `utm_content` modelo+fecha de la sección 4 del cuadro de mando se añaden después.
   - **noindex y fuera del sitemap**: es una página de paso para el tráfico social, sin contenido propio que posicionar. No se toca `sitemap.xml`.
   - Pendiente: usar `?from=` en cada red, p. ej. `https://parmotorweb.github.io/parmotor/enlaces/?from=instagram`. Comprobar que Metricool lee los `utm_*` (punto 4 del cuadro de mando).

## Commits
`git log main..web/mejoras-rapidas`: erratas, 404, enlaces (3 commits).

## Cómo probar
`cd .worktrees/web-mejoras-rapidas && python3 -m http.server`: `/404.html` y `/enlaces/` dan 200 (probado, igual que `/tasar/`). Las fuentes de `/parmotor/assets/…` no cargan en local (el checkout parcial no las trae y la ruta lleva `/parmotor/`); en la web publicada sí. Los destinos publicados `/parmotor/` y `/parmotor/tasar/` dan 200. Nota: la página `enlaces` en local usa enlaces absolutos a la web publicada.

## Para publicar (requiere el sí del dueño)
Push de `web/mejoras-rapidas` y merge a `main` = publicar la web. Tras publicar: probar `/enlaces/?from=instagram` y una URL inexistente. No hay tratamiento nuevo de datos (sin cookies ni formularios), así que la política de privacidad no cambia. Al tocar 219 fichas, GitHub Pages las reconstruye: normal.
