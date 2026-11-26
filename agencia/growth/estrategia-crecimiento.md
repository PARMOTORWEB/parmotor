# Estrategia de crecimiento de Par Motor

Versión 1 · 25 nov 2026 · Autor: Growth · Estado: **propuesta**, pendiente de revisión del Director y del dueño.

Leyenda: `[CONFIRMADO: fuente]`, `[ESTIMACIÓN: método]`, `[OPINIÓN]`, `[HIPÓTESIS]` (supuesto por comprobar con datos).

## 0. Punto de partida

- Web estática y gratuita, sin ingresos, sin formularios ni leads. `[CONFIRMADO: 00-diagnostico.md]`
- La web se conectó a Metricool el 25 nov; antes, 0 visitas registradas. Todavía no hay histórico. `[CONFIRMADO: integraciones.md]`
- No se miden eventos: no se sabe cuánta gente completa una tasación. `[CONFIRMADO: 00-diagnostico.md]`
- Hay 14 shorts por semana programados hasta el 14 dic, todos de historia y con un CTA genérico al perfil. `[CONFIRMADO: 00-diagnostico.md]`
- Presupuesto aprobado: 0 €. El mercado es nacional, sin SEO local. `[CONFIRMADO: tablero/decisiones.md]`

**Consecuencia:** no hay CAC ni CPL que optimizar. Durante los próximos 30 días el trabajo de growth es **poder medir y cerrar el embudo**, no captar más.

---

## 1. Estrategia en 3 fases

Las fases se pasan cuando se cumplen sus **criterios de salida**, no por fecha. Las fechas son solo la referencia del plan.

### Fase 1 · Medir y conectar (días 0-30, del 25 nov al 25 dic de 2026, como referencia)

**Objetivo:** saber, con datos, cuántas personas llegan desde cada red y cuántas usan una herramienta.

**Palancas:**
1. Comprobar que Metricool web registra visitas a diario, incluidas las fuentes (redes y referidos).
2. Medir eventos: `tasacion_completada`, `comparacion_completada` y `asesor_usado`. Lo decide el dueño (recomendación: GoatCounter, ver `integraciones.md`) y lo implementa Web/CRO.
3. Hacer rastreable el enlace de la bio: una página `/enlaces/` con UTM por red, o SmartLinks de Metricool.
4. Desde el 15 dic, conectar cada vídeo con su ficha: el CTA nombra el modelo y la web tiene la ficha `/tasar/<modelo>/`.
5. Añadir TikTok al pie y al `sameAs` de la web, en cuanto el dueño confirme el @.
6. Elegir el proveedor de email del Radar (solo la decisión; se activa en la fase 2).

**Criterios de salida (todos):**
- [ ] 7 días seguidos con visitas registradas en Metricool web y con la fuente identificada.
- [ ] Al menos 1 evento de uso de herramienta registrándose en producción y comprobado con una prueba real.
- [ ] Enlace de la bio rastreable en Instagram y, si la cuenta lo permite, en TikTok.
- [ ] Base de 2 semanas en redes: visualizaciones, retención, guardados y paso a la web.
- [ ] Proveedor de email decidido y política de privacidad redactada (sin publicar todavía).

### Fase 2 · Cerrar el embudo y encontrar el canal que trae uso (días 30-90, hasta el 23 feb de 2027 como referencia)

**Objetivo:** tener el primer lead (suscriptor del Radar) y saber qué pilar o canal trae más **uso de herramienta por cada 1.000 visualizaciones**.

**Palancas:**
1. Activar la suscripción al Radar con doble confirmación, en dos sitios: al final del Radar y después de una tasación completada.
2. Correr los experimentos del 1 al 5 (ver `experimentos.md`), con un máximo de 3 activos a la vez.
3. SEO: lo lleva el especialista. Growth solo mide qué fichas convierten a uso y a lead.
4. Comunidades: respuestas útiles que publica el dueño (experimento 7).
5. Preparar la lista de colaboraciones (sección 3.6). Sin contactar a nadie hasta que el dueño apruebe.

**Criterios de salida (todos):**
- [ ] Radar activo, con al menos 4 envíos hechos y una tasa de apertura medida.
- [ ] Al menos 100 suscriptores `[HIPÓTESIS: umbral para que las tasas de apertura y clic tengan algo de señal; se recalibra]`.
- [ ] Conversión de visita a uso de herramienta medida y estable durante 3 semanas, sin variaciones semanales de más de ±30 %.
- [ ] Identificado al menos 1 pilar o canal cuyo uso por cada 1.000 visualizaciones duplique la media.
- [ ] 3 o más experimentos cerrados, con su resultado apuntado.

### Fase 3 · Escalar lo que funciona (días 90-180, hasta el 24 may de 2027 como referencia)

**Objetivo:** hacer crecer las personas que usan una herramienta cada semana (la estrella polar) y los suscriptores activos, apoyándose en el canal ganador.

**Palancas:**
1. Doblar la apuesta por el pilar y el formato ganadores. Pasar a 2 vídeos largos por semana si se cumple el umbral de `calendario/README.md`.
2. Colaboraciones piloto: entre 1 y 3, sin pago, con el contacto hecho por el dueño.
3. Lead magnet descargable (sección 5).
4. **Solo si se cumple todo lo de la sección 3.8:** una prueba de pago pequeña, con presupuesto aprobado por el dueño.
5. Bucle de recurrencia: el Radar enlaza a las fichas y a las herramientas cada semana.

**Criterios de revisión a los 180 días:**
- La estrella polar crece 4 semanas seguidas, en tendencia.
- Al menos el 25 % de los suscriptores son «activos», según la definición de `kpis.md`.
- Hay suficiente información para decidir si se explora la monetización. Esa decisión es del dueño y se presenta solo como propuesta.

---

## 2. Embudo completo

| # | Etapa | Métrica | Acción concreta | ¿Dónde se pierde hoy gente? | ¿Medible hoy? |
|---|---|---|---|---|---|
| 1 | **Descubrimiento** | Visualizaciones y alcance por red | 14 shorts por semana. Desde el 15 dic, la mezcla nueva con un 14 % de historia (`calendario/README.md`) | No se pierde aquí: el volumen ya está programado. El límite es el **tipo** de audiencia: 100 % nostalgia y poca intención de compra o venta `[OPINIÓN]` | Sí |
| 2 | **Interés** | Retención, vídeos completos, guardados y compartidos por cada 1.000 visualizaciones | Gancho en el segundo 1. Que cada vídeo dé un dato útil y guardable (precio, coste o error). La historia mantiene el gancho | Sin histórico todavía. Los reels no aparecen en Metricool del 1 al 25 nov | Sí (redes) |
| 3 | **Visita** | Clics en la bio y visitas con UTM | CTA con el nombre del modelo («mira cuánto vale hoy un [modelo] en el enlace»), página `/enlaces/` con UTM por red y comentario fijado | **Fuga 1:** el CTA es genérico («tasador gratis»). **Fuga 2:** la bio va a la portada, que abre con una intro en scroll; la evaluación es cosa de la auditoría de Web/CRO. **Fuga 3:** TikTok no aparece en la web, y no está verificado que la cuenta pueda poner un enlace en la bio `[SIN VERIFICAR]` | No |
| 4 | **Encuentra la herramienta** | Visitas a `/tasar/*`, `#tasador`, `#calculadora` y `#asesor` | El destino es la ficha del modelo del vídeo, no la portada. Las fichas de `/historia/` llevan un CTA «¿Cuánto vale hoy?» hacia `/tasar/<modelo>/` | **Fuga 4:** quien llega por un vídeo de historia no tiene un puente claro a la ficha de precio `[HIPÓTESIS: pendiente de revisar en la auditoría web]` | No |
| 5 | **Usa la herramienta** | `tasacion_completada` y `comparacion_completada` | Eventos sin cookies. Tras el resultado, un siguiente paso: comparar el coste real, ver modelos parecidos o leer el Radar | **Fuga 5:** no se mide, así que no se sabe | No |
| 6 | **Lead** | Suscripciones al Radar | Formulario con doble confirmación al final del Radar y después del resultado de la tasación | **Fuga 6 (la mayor):** el embudo termina en el resultado. No hay nada que dejar ni ningún motivo para volver | No (no existe) |
| 7 | **Seguimiento** | Aperturas y clics del Radar | Envío semanal los lunes: 3 noticias con fuente, 1 modelo de la semana con enlace a su ficha y 1 herramienta | No existe | No |
| 8 | **Cliente o recurrente** | Suscriptores activos (abren al menos 1 de cada 4 envíos) y visitantes que vuelven | El Radar crea el hábito. Opción de guardar la última tasación en el propio móvil (`localStorage`, sin enviar nada) | Sin recurrencia medible | No |

**Lectura:** las etapas 1 y 2 ya funcionan, porque hay producción. A partir de la etapa 3 todo está a ciegas, y de la 6 en adelante no existe. Por eso las palancas de la fase 1 son 3, 4 y 5, y las de la fase 2 son 6 y 7.

---

## 3. Canales evaluados

Escala: coste (0 € / bajo / medio), esfuerzo (bajo / medio / alto) y potencial de tráfico **cualificado**, es decir, gente con intención de comprar o vender un coche. Las valoraciones de potencial son `[OPINIÓN]` hasta que haya datos.

| Canal | Coste | Esfuerzo | Potencial cualificado | Prioridad | Cuándo |
|---|---|---|---|---|---|
| Vídeo corto (IG, TikTok, Shorts) | 0 € | Alto (ya en marcha) | Medio: mucho alcance y paso a la web bajo | **1** | Ya |
| SEO (fichas `/tasar/`) | 0 € (dominio de unos 10-15 €/año, opcional) | Medio | **Alto**: búsquedas tipo «precio X segunda mano» | **1** (lo lleva SEO) | Ya |
| Newsletter Radar | 0 € al principio `[SIN VERIFICAR: comprobar los planes gratuitos del proveedor]` | Medio | Alto en recurrencia, bajo en captación nueva | **1** | Fase 2 |
| YouTube largo | 0 € | Alto | Medio-alto: más confianza y enlaces que se pueden pulsar en la descripción | 2 | Fase 1-2 |
| Contenido de actualidad (Radar en 30 s) | 0 € | Medio | Medio: picos de alcance y refuerzo del Radar | 2 | Desde el 15 dic |
| Comunidades y foros | 0 € | Medio (lo hace el dueño) | Alto por visita, pero poco volumen | 2 | Fase 2 |
| Colaboraciones con creadores | 0 € (intercambio) | Medio-alto | Alto si el perfil encaja | 3 | Fase 2 (lista) y 3 (piloto) |
| Remarketing | Medio | Medio | Bajo hoy | **No por ahora** | Ver 3.8 |
| Pago de captación | Medio | Medio | Desconocido | **No por ahora** | Fase 3, con condiciones |

### 3.1 Vídeo corto
- **Papel:** el motor de descubrimiento. No hace falta producir más, sino **conectar mejor**.
- **Acciones de growth:**
  - CTA con el nombre del modelo.
  - Dato de precio o coste en pantalla en los pilares con intención comercial.
  - Comentario fijado con «busca [modelo] en parmotor» para que se pueda encontrar aunque el enlace no se pueda pulsar.
  - Reutilizar en el Radar los vídeos que más se guarden.
- **Métrica clave de growth:** visitas a la web por cada 1.000 visualizaciones, por pilar. No las visualizaciones a secas.
- **Riesgo:** en Shorts y TikTok los enlaces tienen limitaciones según el tipo de cuenta y la plataforma `[SIN VERIFICAR: el dueño revisa las opciones de su cuenta]`.

### 3.2 YouTube largo
- **Papel:** confianza y tráfico de búsqueda dentro de YouTube («qué coche comprar con 15.000 €»).
- **Acciones:**
  - Capítulos.
  - Enlaces con UTM en la descripción a cada ficha mencionada.
  - Tarjeta o pantalla final hacia el vídeo de herramienta.
  - Mención hablada del tasador con su aviso: «precio orientativo, no es una tasación oficial».
- **Prioridad 2**, porque el coste de producción es alto. Se mide con visitas a la web por vídeo, gracias a la UTM.

### 3.3 SEO
- Lo lleva el especialista en SEO; aquí no se duplica.
- Growth aporta la medición de qué fichas convierten de visita a uso y de uso a lead, para que SEO priorice las que, además de tráfico, generan uso.

### 3.4 Contenido de actualidad
- **Papel:** picos de alcance y el motivo semanal para suscribirse al Radar.
- **Regla:** solo noticias con fuente, como el Radar actual. Si hay prisa, se publica menos antes que algo sin verificar.

### 3.5 Comunidades y foros (sin spam)
- **Dónde:** foros de marca y modelo, subforos de coches en Reddit en español y grupos de compra de usados `[SIN VERIFICAR: el investigador confirma cuáles existen, si están activos y si sus normas permiten enlaces]`.
- **Cómo:**
  - Responder la pregunta concreta en el propio comentario, con el dato útil.
  - Poner un enlace a la ficha **solo si aporta** y si las normas del sitio lo permiten.
  - Usar la UTM `utm_source=comunidad`.
  - Máximo 2 o 3 respuestas por semana.
  - Las publica siempre el dueño, identificado como Par Motor. **Nada de cuentas falsas.**
- **Prohibido:** publicar el mismo mensaje en varios sitios, abrir hilos promocionales o pedir votos.
- **Growth prepara los borradores** en `growth/comunidades/` sin datos personales de nadie (las preguntas se parafrasean, sin el usuario que las hizo).

### 3.6 Colaboraciones con creadores (perfiles tipo, sin contactar a nadie)

| Perfil tipo | Por qué encaja | Qué aporta Par Motor | Qué pide Par Motor |
|---|---|---|---|
| Divulgador de compra de usado o de «qué coche me compro» | Su audiencia tiene la misma intención | Tabla de precios por año y coste real mensual de los modelos de su vídeo, con fuente y metodología | Mención y enlace a la ficha en la descripción |
| Mecánico o taller con canal | Autoridad técnica en averías conocidas (pilar 8) | Datos de depreciación y de coste de mantenimiento según nuestra metodología | Validar o corregir los vídeos de averías; vídeo conjunto |
| Autoescuela con redes | Conductores nuevos que van a comprar su primer coche | Un «primer coche por menos de X €» hecho con el asesor | Compartirlo con sus alumnos |
| Creador de clásicos o restauración | Encaje con el pilar de historia y el Museo del box | Fichas de historia y el valor actual del modelo | Mención cruzada y dúo o stitch |
| Creador de finanzas personales | El coste real del coche es un tema de dinero | El desglose de «¿En qué se va el dinero?» de un caso concreto | Mención; vídeo «lo que de verdad cuesta tu coche» |
| Creador de eléctricos o híbridos | El comparador incluye la energía | Comparativa de coste mensual entre eléctrico y combustión para su caso | Mención y enlace a `#calculadora` |
| Club de marca o de modelo | Comunidad muy cualificada y pequeña | Ficha del modelo y su evolución de precio | Difusión en su canal, si sus normas lo permiten |

- **Propuesta de valor del intercambio:** «Te damos datos verificados y una herramienta gratuita para tu audiencia, sin pedirles datos. Tú citas la fuente.» No hay pago ni promesas de resultados.
- **Proceso:**
  1. Growth prepara una lista de perfiles, con criterios públicos (tamaño, temática y tono), y un borrador de mensaje.
  2. El dueño aprueba y contacta.
  3. Si hay acuerdo, se crea una UTM propia para la colaboración.
- **Regla:** si hay contraprestación, la colaboración se etiqueta según las normas de cada plataforma.

### 3.7 Newsletter Radar
- **Es el primer y único lead posible hoy.**
- **Formato propuesto `[OPINIÓN]`:**
  - El lunes, el mismo contenido del artículo de la web.
  - 3 noticias con fuente.
  - 1 «modelo de la semana» con su precio y su ficha.
  - 1 herramienta.
  - Sin publicidad.
- **Requisitos:**
  - Doble confirmación.
  - Baja con un clic.
  - Política de privacidad actualizada.
  - Los datos se quedan **en el proveedor**, nunca en el repositorio.
- **Mientras no esté activo**, en ningún sitio se dice «suscríbete» (`marca.md`).

### 3.8 Remarketing y pago: cuándo tendría sentido

**Hoy, no.** Motivos:
1. No hay lead ni medición de conversiones, así que no se puede saber si el gasto funciona.
2. **El remarketing choca con la promesa de privacidad:** los píxeles de Meta, TikTok y Google usan cookies o identificadores, y eso obliga a poner un banner de consentimiento y a cambiar la política, en contra de lo de «no se envía nada» `[OPINIÓN, con base en marca.md e integraciones.md]`.
3. Sin ingresos, el valor económico de un lead es 0 €. Pagar solo sirve **para aprender**, no para rentabilizar.

**Condiciones para proponer una prueba (todas):**
- Radar activo y con al menos 4 envíos, y conversión orgánica de visita a suscripción medida.
- Eventos de conversión medidos con UTM; puede hacerse sin píxel y sin remarketing.
- Un vídeo orgánico con un paso a la web claramente por encima de la media, que sería la pieza a promocionar.
- Aprobación explícita del dueño del presupuesto y del criterio para pararla.

**Prueba propuesta (hipótesis, no aprobada):**

| Campo | Propuesta |
|---|---|
| Tipo | Promoción del mejor short orgánico, sin píxel, hacia la ficha `/tasar/<modelo>/` o hacia el Radar, con UTM `utm_medium=paid` |
| Público | España, mayores de 18 años, intereses de motor o compra de coche |
| Presupuesto | **50 € en 7 días** `[ESTIMACIÓN: lo mínimo para tener algunos cientos de clics con un CPC de referencia de 0,10-0,30 € en redes sociales en España; SIN VERIFICAR, lo comprueba el analista con datos de la plataforma antes de proponerla]` |
| CPL objetivo | **≤ 1,50 € por suscriptor confirmado** `[HIPÓTESIS sin fuente: se recalibra con la conversión orgánica real]` |
| Criterio para pararla | Se para si, tras gastar 25 €, hay 0 suscriptores o el coste por visita supera 3 veces el estimado. Se para si el CPL supera el doble del objetivo al final |
| Qué se aprende | Si existe una audiencia que se suscribe al Radar a un coste asumible y qué mensaje funciona |

**El remarketing** solo se plantea si el dueño decide aceptar las cookies y el banner de consentimiento. Growth no lo recomienda mientras la privacidad sea parte de la propuesta de valor `[OPINIÓN]`.

---

## 4. Ventajas competitivas y huecos

Razonado desde la propuesta de Par Motor. **El análisis de competidores lo está haciendo el investigador**; lo que sigue son hipótesis que esa investigación debe confirmar o tumbar.

### Ventajas a explotar
1. **Gratis, sin registro y sin enviar datos.** `[CONFIRMADO: marca.md]` Hueco probable: muchos tasadores online piden email o teléfono porque viven de vender el lead o de comprar el coche `[HIPÓTESIS]`. Mensaje: «aquí nadie te va a llamar».
2. **Neutralidad.** Par Motor no compra ni vende coches. `[CONFIRMADO: marca.md]` Es «el amigo que sabe y no te vende nada», algo difícil de copiar para un portal o un compraventa `[OPINIÓN]`.
3. **Coste real, no solo precio.** El comparador desglosa depreciación, energía, seguro, neumáticos, mantenimiento, impuestos e ITV `[CONFIRMADO: 00-diagnostico.md]`. Hueco: la mayoría de los contenidos hablan del precio de compra, no del coste mensual `[HIPÓTESIS]`.
4. **Transparencia de método** («Cómo calculamos»). Permite hacer vídeos de tipo «así calculamos» que construyen confianza.
5. **Unas 400 fichas de precio** con intención comercial clara `[CONFIRMADO: sitemap]`. Es una cola larga en la que cada short de modelo tiene su página de destino.
6. **Narrativa e historia.** El tono cinematográfico y las 63 fichas de historia dan un puente emocional al dato: «el mito → cuánto vale hoy» `[OPINIÓN]`.

### Huecos que la competencia probablemente no aprovecha (todos `[HIPÓTESIS]`)
- Mostrar en el mismo sitio **cuánto pierde un modelo cada año**, en clave de «¿cuándo me conviene venderlo?».
- **Coste real de un eléctrico usado frente a uno de combustión**, para un caso concreto y con fuentes.
- **Errores al comprar un usado** explicados con números, no solo con listas.
- **Un historia-a-precio** («este clásico de los 90 hoy vale X»), que une nostalgia e intención.
- **Un boletín semanal del mercado con fuentes**, sin publicidad ni venta.

---

## 5. Lead magnets (propuesta)

Todos deben funcionar en una web estática y cumplir la promesa de privacidad. Los que capturan email dependen del proveedor del Radar.

| # | Lead magnet | ¿Captura email? | Encaje | Esfuerzo | Prioridad |
|---|---|---|---|---|---|
| 1 | **Suscripción al Radar** (el lunes, en tu correo) | Sí (proveedor con doble confirmación) | Ya existe el contenido | Bajo, una vez elegido el proveedor | **1** |
| 2 | **Checklist «Comprar un coche usado sin que te la cuelen»** en PDF de 1-2 páginas: documentos, ITV, revisión física, prueba y negociación | Fase A sin email, como descarga libre para medir la demanda. Fase B: opción de recibirla por el Radar | Pilares 3, 13 y 6 | Bajo (investigador, guionista y Web/CRO) | **2** |
| 3 | **Guía «Vender tu coche: cómo fijar el precio»** con el tasador como paso 1 | Igual que el 2 | Pilar 6 | Bajo | 3 |
| 4 | **Compartir el resultado de la tasación** (imagen o enlace con parámetros generados en el móvil) | No; es un bucle de difusión | Uso, en etapa 5 | Medio (Web/CRO) | 3 |
| 5 | **«Guardar mi tasación» en el móvil** (`localStorage`) con un recordatorio de que se puede volver a mirar en un mes | No | Recurrencia, en etapa 8 | Medio | 4 |
| 6 | **Informe trimestral «Qué modelos han perdido o ganado valor»** en PDF, con método y fuentes | Sí, para suscriptores del Radar | Pilares 4 y 5 | Alto: requiere datos históricos de precios propios y verificables | 5, a partir de la fase 3 |

**Reglas:**
- Los PDF llevan fuentes, el aviso de «precio orientativo, no es una tasación oficial» y ningún dato sin verificar.
- Nada de «descarga a cambio de tu email» hasta que el proveedor y la privacidad estén listos.
- El investigador verifica cada punto de los checklists antes de publicarlos.

---

## 6. Dependencias y decisiones del dueño (resumen)

| Decisión | Desbloquea | Fase |
|---|---|---|
| Herramienta de eventos (recomendado GoatCounter) | Etapa 5 y experimentos 1, 3, 4, 6 y 8 | 1 |
| Rastreo de la bio (`/enlaces/` o SmartLinks) | Etapa 3 y experimentos 1 y 2 | 1 |
| Confirmar el @ de TikTok y si la cuenta puede poner enlace en la bio | Etapa 3 en TikTok | 1 |
| Proveedor de email y actualización de la privacidad | Etapa 6 y experimento 5 | 1 (decisión) y 2 (activación) |
| Publicar en comunidades como Par Motor | Experimento 7 | 2 |
| Dominio propio (unos 10-15 €/año `[ESTIMACIÓN]`) | Confianza y SEO; no bloquea growth | Cuando decida |
| Cualquier gasto en pago | Sección 3.8 | 3, si se cumplen las condiciones |

Experimentos detallados: `agencia/growth/experimentos.md`.
