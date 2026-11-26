# Herramientas e integraciones

Estado comprobado el 25 de noviembre de 2026. **Conectada** significa que se ha probado con una llamada real.

| Integración | Para qué | Estado | Qué hace falta |
|---|---|---|---|
| **Metricool, redes** (IG, TikTok, YouTube) | Lectura de métricas, calendario y mejores horas | **Conectada.** Marca 8158748. Las llamadas de lectura funcionan: se leyeron la configuración de la marca, las métricas disponibles y las publicaciones programadas | Nada. Las publicaciones solo se programan con aprobación del dueño |
| **Metricool, web** | Visitas, fuentes y páginas | **Conectada el 25 de noviembre** (etiqueta JavaScript, verificada con una visita real). Antes: **código instalado y sin datos.** `analitica.js` carga `be.js` con el hash de la marca, pero la API devuelve 0 entre el 16 y el 25 de noviembre, y la marca no muestra la web entre sus redes | **El dueño:** en Metricool, ajustes de la marca → Conexiones → conectar «Web/Blog» con `https://parmotorweb.github.io/parmotor/`. Después, comprobar visitando la web y mirando Metricool al día siguiente |
| **Medición de eventos** (uso del tasador y del comparador) | Saber si el vídeo trae uso real | **No existe** | **Decisión del dueño.** Opciones: (a) GoatCounter, gratuito, sin cookies y con eventos, sin banner de cookies **[a confirmar en sus condiciones]**; (b) GA4, gratuito, pero usa cookies y obliga a poner un banner de consentimiento y a cambiar la política de privacidad; (c) Plausible, de pago y sin cookies. **Recomendación: (a)**, por coherencia con la promesa de privacidad de la web |
| **Rastreo del enlace de la bio** | Atribuir visitas a cada vídeo | **No existe.** La bio apunta a la portada | Opción 1: Metricool SmartLinks (el conector permite leer `timeline`, `buttons` e `images`). Opción 2: una página `/parmotor/enlaces/` con UTM, que construiría Web/CRO |
| **Google Search Console** | SEO | **Verificada** (archivo de Google en el repositorio), **sin conexión con los agentes** | El dueño exporta cada semana el informe de rendimiento (CSV) a `agencia/datos/gsc/` |
| **Proveedor de email** (Radar) | Primer lead | **No existe.** La privacidad ya lo anuncia | **Decisión del dueño.** Proveedor con formulario incrustable en una web estática y doble confirmación (MailerLite, Brevo, Buttondown…) **[comparar condiciones y precios actuales antes de decidir]**. Hay que actualizar la política de privacidad |
| **GitHub** (`PARMOTORWEB/parmotor`) | Cambios en la web y memoria de la agencia | Clonado en local. Hacer push requiere credenciales del dueño | Las ramas `web/*` se suben con permiso. **Push a `main` = publicar** |
| **Canva / Adobe Express** | Miniaturas y gráficos | Conectores disponibles en esta app; **sin probar con la cuenta de Par Motor** | Probar al primer encargo de miniatura |
| **Fábrica de vídeos del repositorio** | Producción automática de shorts | **Existe y funciona** (vídeos de noviembre y diciembre en `social/` y `videos/`). `herramientas/redes.mjs` genera diapositivas e `*-guion.json` con el motor del tasador; `herramientas/video.py` monta un vídeo 1080×1920 con voz Chatterbox (`locutor.py`, con marca de agua de IA) y subtítulos sincronizados con Whisper; `generar-historia.py` crea las fichas `/historia/`. Rutas preparadas para el entorno en la nube del dueño (`/home/user/.venv-voz`, `preparar-voz.sh`) | Los guiones de la agencia se entregan **también en formato `guion.json`** (`estilo` + `escenas[{imagen, frases}]`) para que la fábrica los monte sin reescribirlos. En este Mac no está instalado el entorno de voz: el montaje se hace donde ya funciona la fábrica |
| **Réplica del tasador para la agencia** | Sacar cifras exactas de las fichas para guiones sin abrir la web | **Funciona** (`agencia/herramientas-agencia/tasador.py`, validada al euro contra la ficha publicada del Seat León) | Usar con `PARMOTOR_INDEX` apuntando al `index.html` de `origin/main` para tener la calibración del día |
| **Calibración diaria del tasador** | Precisión de precios | **Existe** (tarea diaria del asesor: `herramientas/calibracion.md` y `herramientas/precios/`) | Nada. La agencia usa sus registros como fuente `[ESTIMACIÓN Par Motor]` |
| **Ahrefs / Similarweb** | Volúmenes de palabras clave y competencia | Configurados y **sin autorizar** | Opcional. Autorizar desde `/mcp` si se quieren volúmenes reales |
| **TikTok @usuario** | Enlazarlo desde la web y el JSON-LD | Metricool solo muestra «Par Motor» | El dueño confirma el @ en la app |

## Automatización: qué está automatizado y qué falta

| Pieza del flujo | Estado | Herramienta |
|---|---|---|
| Informe diario | **Automatizado** (todos los días hacia las 9:10, con la app abierta) | Tarea programada «Par Motor · Informe diario» |
| Investigación, ideas, guiones, producción y textos por red | **Bajo demanda** («arranca la semana») | Agentes de `.claude/agents/` |
| Montaje del vídeo | **Automatizado fuera de este Mac** | Fábrica del repositorio (`redes.mjs` → `video.py`) |
| Programación en Metricool | **Manual con aprobación** | Conector de Metricool (lo hace el Director tras tu sí) |
| Métricas de redes y web | **Automático (lectura)** | Conector de Metricool |
| Eventos del tasador | **Falta** | GoatCounter (recomendado), pendiente de decisión |
| Leads (Radar por email) | **Falta** | Proveedor de email, pendiente de decisión |
| SEO (Search Console) | **Manual** | Exportación semanal del dueño |
| Atribución por vídeo | **Falta** | UTM y página de enlaces de la bio (propuesta de Web/CRO) |

Siguientes automatizaciones propuestas (se crean solo si el dueño las pide): «arrancar la semana» los lunes, informe semanal los lunes e informe mensual el día 1.

## Reglas de uso
- Las herramientas de Metricool que **escriben** (`createScheduledPost`, `updateScheduledPost`, etc.) solo las usa la sesión principal y solo tras un sí explícito del dueño en el chat.
- Si una integración falla, se apunta en `tablero/incidencias.md` con la salida del error. No se rellena con datos supuestos.
