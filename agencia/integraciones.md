# Herramientas e integraciones

Estado comprobado el 25 de noviembre de 2026. **Conectada** significa que se ha probado con una llamada real.

| Integración | Para qué | Estado | Qué hace falta |
|---|---|---|---|
| **Metricool, redes** (IG, TikTok, YouTube) | Lectura de métricas, calendario y mejores horas | **Conectada.** Marca 8158748. Las llamadas de lectura funcionan: se leyeron la configuración de la marca, las métricas disponibles y las publicaciones programadas | Nada. Las publicaciones solo se programan con aprobación del dueño |
| **Metricool, web** | Visitas, fuentes y páginas | **Código instalado y sin datos.** `analitica.js` carga `be.js` con el hash de la marca, pero la API devuelve 0 entre el 16 y el 25 de noviembre, y la marca no muestra la web entre sus redes | **El dueño:** en Metricool, ajustes de la marca → Conexiones → conectar «Web/Blog» con `https://parmotorweb.github.io/parmotor/`. Después, comprobar visitando la web y mirando Metricool al día siguiente |
| **Medición de eventos** (uso del tasador y del comparador) | Saber si el vídeo trae uso real | **No existe** | **Decisión del dueño.** Opciones: (a) GoatCounter, gratuito, sin cookies y con eventos, sin banner de cookies **[a confirmar en sus condiciones]**; (b) GA4, gratuito, pero usa cookies y obliga a poner un banner de consentimiento y a cambiar la política de privacidad; (c) Plausible, de pago y sin cookies. **Recomendación: (a)**, por coherencia con la promesa de privacidad de la web |
| **Rastreo del enlace de la bio** | Atribuir visitas a cada vídeo | **No existe.** La bio apunta a la portada | Opción 1: Metricool SmartLinks (el conector permite leer `timeline`, `buttons` e `images`). Opción 2: una página `/parmotor/enlaces/` con UTM, que construiría Web/CRO |
| **Google Search Console** | SEO | **Verificada** (archivo de Google en el repositorio), **sin conexión con los agentes** | El dueño exporta cada semana el informe de rendimiento (CSV) a `agencia/datos/gsc/` |
| **Proveedor de email** (Radar) | Primer lead | **No existe.** La privacidad ya lo anuncia | **Decisión del dueño.** Proveedor con formulario incrustable en una web estática y doble confirmación (MailerLite, Brevo, Buttondown…) **[comparar condiciones y precios actuales antes de decidir]**. Hay que actualizar la política de privacidad |
| **GitHub** (`PARMOTORWEB/parmotor`) | Cambios en la web y memoria de la agencia | Clonado en local. Hacer push requiere credenciales del dueño | Las ramas `web/*` se suben con permiso. **Push a `main` = publicar** |
| **Canva / Adobe Express** | Miniaturas y gráficos | Conectores disponibles en esta app; **sin probar con la cuenta de Par Motor** | Probar al primer encargo de miniatura |
| **Generación de vídeo con IA** | Producción | Fuera del sistema (lo hace el flujo actual del dueño) | Indicar qué herramienta se usa para adaptar los prompts de producción |
| **Ahrefs / Similarweb** | Volúmenes de palabras clave y competencia | Configurados y **sin autorizar** | Opcional. Autorizar desde `/mcp` si se quieren volúmenes reales |
| **TikTok @usuario** | Enlazarlo desde la web y el JSON-LD | Metricool solo muestra «Par Motor» | El dueño confirma el @ en la app |

## Reglas de uso
- Las herramientas de Metricool que **escriben** (`createScheduledPost`, `updateScheduledPost`, etc.) solo las usa la sesión principal y solo tras un sí explícito del dueño en el chat.
- Si una integración falla, se apunta en `tablero/incidencias.md` con la salida del error. No se rellena con datos supuestos.
