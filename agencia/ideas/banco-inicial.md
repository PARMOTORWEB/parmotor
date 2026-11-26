# Banco inicial de ideas: Par Motor (Ronda 1, 25 nov 2026)

**Autor:** Director Creativo · **Estado:** PROPUESTA para el Director General. Ninguna cifra está confirmada salvo las marcadas como tales. Todo dato numérico de un gancho va en «Datos a verificar» y lo confirma el Investigador antes del guion.

**Base de trabajo:** `agencia/marca.md`, `agencia/calendario/README.md`, `2026-W48.md`, `2026-W51.md`, `agencia/investigacion/2026-W48-verificacion.md` y el `sitemap.xml` de la web (consultado el 25-11-2026). Todos los destinos `/tasar/<slug>/` e `/historia/<slug>/` de este documento existen en ese sitemap.

**Reglas que respeta este banco:**
- No repite modelos de historia programados en Metricool del 1 al 14 dic (Mustang, Renault 4, Escarabajo, Lancia 037, SEAT 600, Suzuki Samurai, Ferrari 250 GTO, Fiat 500, Citroën 2CV, Traction Avant, Peugeot 504, Renault 5). La lista que tengo está incompleta («entre otros»): **hay que cruzar los 5 de historia de este banco con `getScheduledPosts` antes de programar.**
- No repite lo que ya propone `2026-W48.md` (Seat León, Mazda MX-5, «el anuncio no es lo que vale», «3 errores al comprar usado», «antes de vender, haz esto», «coste real al mes» genérico, «20.000 €» genérico) ni los tres modelos de la opción A del lunes 30 (Nissan Leaf, Opel Insignia, Peugeot 308).
- Ningún modelo se repite dentro del banco.
- `preguntas-audiencia.md` está vacío: las ideas del pilar 14 parten de las preguntas frecuentes que ya tienen las fichas de la web y de los límites reales del tasador. En cuanto entren preguntas reales, se sustituyen.
- Aviso obligatorio en todo vídeo que muestre el tasador o una ficha: «precio orientativo, no es una tasación oficial» (rótulo o descripción). Contenido marcado como IA en cada plataforma. Acento visual de la marca: `#e4ff4f`.

---

## Series recurrentes

Se reutilizan las series que ya tiene la fábrica de vídeos (`herramientas/redes.mjs`) y se añaden solo 3 nuevas que no se solapan con ellas.

| Serie | Día | Qué es | Pilares | Destino típico | Estado |
|---|---|---|---|---|---|
| **Radar** | Lun | Lo que se mueve en el mercado en 30 s, con fecha en el rótulo | 9 · 12 | `#radar` | Existe |
| **¿Cuánto vale?** | Mar | Un modelo, su rango y qué mueve el precio, con la ficha en pantalla | 7 · 4 · 15 | `/tasar/<modelo>/` · `#tasador` | Existe |
| **¿Chollo o caro?** | Mié | Un precio de anuncio tipo (inventado como ejemplo y rotulado así) contra el precio orientativo de la ficha | 13 · 12 · 3 | `/tasar/<modelo>/` | Existe |
| **Consejo** | Jue | Un consejo práctico al comprar, vender o mantener; incluye «Tu pregunta» (pilar 14) y los problemas conocidos (pilar 8) | 3 · 6 · 8 · 14 | `#tasador` · `/tasar/<modelo>/` | Existe |
| **Lo que pierde** | Vie | La curva de depreciación de un modelo según la ficha | 5 · 4 | `/tasar/<modelo>/` | Existe |
| **Museo del box** | Sáb | Un clásico de la web y su heredero de hoy: «del museo al tasador» | Historia | `/historia/<modelo>/` → `/tasar/<modelo>/` | Existe |
| **4 cosas que no sabías de…** | Varios | Formato de historia actual | Historia | `/historia/<modelo>/` | Existe |
| **Coste real al mes** | Nueva | Dos coches, mismo uso, el desglose del comparador en pantalla | 1 · 10 | `#calculadora` | **Propuesta** |
| **Mito o realidad** | Nueva | Una creencia, una respuesta con fuente y la herramienta que lo demuestra | 11 | según tema | **Propuesta** |
| **Por menos de 20.000 €** | Nueva | Un perfil y un presupuesto, el asesor en pantalla grabado en directo | 2 · 10 | `#asesor` | **Propuesta** |

---

## 60 ideas de vídeo corto

Abreviaturas de finalidad: **Alcance** (que nos vea gente nueva), **Autoridad** (que nos vea como los que saben), **Confianza** (que crea en nuestras cifras), **Conversión** (que entre en una herramienta).

### Pilar 7 · Cómo calcular el valor real de un coche

### [01] Las 4 cosas que mueven el precio de tu coche
- **Pilar:** 7 · **Finalidad:** Autoridad · **Serie:** ¿Cuánto vale?
- **Concepto:** Año, kilómetros, motorización y estado: el vídeo explica cuál pesa más en el precio orientativo y por qué. Enseña a pensar como un tasador sin prometer una tasación.
- **Público objetivo:** Quien va a vender o comprar en los próximos meses y no sabe por dónde empezar.
- **Gancho inicial (0–3 s, literal):** «Tu coche vale lo que dicen cuatro datos. Solo cuatro.»
- **Desarrollo:** 1) Año: la curva por generación. 2) Kilómetros contra los «normales» de su edad. 3) Motor: dos versiones del mismo año no valen igual. 4) Estado: lo que el tasador supone (buen estado). 5) Los metes en el tasador y sale el número.
- **Objetivo comercial:** Uso del tasador.
- **Página de destino:** `#tasador`
- **CTA:** «Mete tus cuatro datos en el tasador gratis. Sin registro.»
- **Plataforma recomendada:** IG (contenido para guardar) y Shorts.
- **Datos a verificar:** Qué campos pide exactamente el tasador (¿pide estado?). Supuesto de km normales (15.000/20.000 al año) según la nota metodológica de las fichas. Si el tasador ajusta por km reales o solo por los normales.

### [02] Mismo Golf, mismo año, distinto motor: la diferencia
- **Pilar:** 7 · **Finalidad:** Conversión · **Serie:** ¿Cuánto vale?
- **Concepto:** Dos versiones del Volkswagen Golf del mismo año en la tabla de la ficha y la diferencia en euros. Demuestra que «Golf de 2019» no es un precio.
- **Público objetivo:** Comprador de compacto usado que compara anuncios del mismo modelo.
- **Gancho inicial (0–3 s, literal):** «Dos Golf del mismo año. Entre uno y otro hay [X] €.»
- **Desarrollo:** 1) Las dos versiones en pantalla. 2) La tabla de la ficha con el año marcado. 3) Por qué: potencia, combustible, precio de nuevo. 4) Qué mirar en el anuncio para saber cuál es. 5) Ficha y tasador.
- **Objetivo comercial:** Visita a la ficha y clic en «Tasar mi Golf con mis datos».
- **Página de destino:** `/tasar/volkswagen-golf/`
- **CTA:** «La tabla completa del Golf, año a año, en la ficha. Enlace en el perfil.»
- **Plataforma recomendada:** Shorts (búsqueda «precio Golf usado») e IG.
- **Datos a verificar:** Versiones y precios del Golf para un mismo año en la ficha `[ESTIMACIÓN Par Motor]`; elegir el año con más diferencia entre versiones.

### [03] Qué hace el tasador con tus kilómetros (y por qué para en 100.000)
- **Pilar:** 7 · **Finalidad:** Confianza · **Serie:** ¿Cuánto vale?
- **Concepto:** Explicamos con honestidad un límite de la herramienta: llega hasta 100.000 km. Contar lo que no hace da credibilidad a lo que sí hace.
- **Público objetivo:** Quien ha usado o va a usar el tasador y quiere saber si fiarse.
- **Gancho inicial (0–3 s, literal):** «Nuestro tasador tiene un límite. Te lo contamos.»
- **Desarrollo:** 1) Hasta 100.000 km, todas las motorizaciones. 2) Por qué: por encima, el estado pesa más que el kilometraje y un modelo general acierta peor. 3) Qué hacer si tu coche tiene más. 4) Recordatorio: precio orientativo, no tasación oficial.
- **Objetivo comercial:** Uso del tasador con expectativas correctas.
- **Página de destino:** `#tasador`
- **CTA:** «Si estás por debajo de 100.000 km, pruébalo gratis.»
- **Plataforma recomendada:** IG y TikTok.
- **Datos a verificar:** El límite exacto y cómo se comporta el tasador si se mete más km. El motivo del límite tal como lo explica «Cómo calculamos» (no inventar la razón; si la web no la da, preguntar al dueño).

### [04] Cómo calculamos el precio, en 30 segundos
- **Pilar:** 7 · **Finalidad:** Confianza · **Serie:** ¿Cuánto vale?
- **Concepto:** Versión corta de la sección «Cómo calculamos» de la web. Complementa (no repite) el largo de W48, que va al detalle.
- **Público objetivo:** Escéptico que se pregunta «¿y estos de dónde sacan el precio?».
- **Gancho inicial (0–3 s, literal):** «¿De dónde sale el precio de nuestro tasador? De aquí.»
- **Desarrollo:** 1) Precio de nuevo por versión. 2) Curva de depreciación por año. 3) Ajuste por km normales. 4) Redondeo a 100 €. 5) Lo que no es: ni tasación oficial ni oferta.
- **Objetivo comercial:** Credibilidad del tasador.
- **Página de destino:** `#tasador`
- **CTA:** «La explicación entera está en la web, debajo del tasador.»
- **Plataforma recomendada:** Shorts y IG.
- **Datos a verificar:** Pasos del método tal como los describe la sección «Cómo calculamos» de la portada; no añadir ninguno que no esté allí.

### [05] «Precio justo»: qué significa en Par Motor
- **Pilar:** 7 · **Finalidad:** Confianza · **Serie:** ¿Cuánto vale?
- **Concepto:** Las fichas hablan de un precio justo entre particulares y profesionales. Explicamos qué quiere decir y por qué un concesionario y un particular no te dirán lo mismo.
- **Público objetivo:** Vendedor que compara lo que le ofrecen con lo que ve en anuncios.
- **Gancho inicial (0–3 s, literal):** «El concesionario dice una cifra. El anuncio, otra. ¿Y nosotros?»
- **Desarrollo:** 1) El rango de un mismo coche según quién lo venda. 2) Dónde se sitúa nuestro precio orientativo. 3) Por qué es una referencia y no una oferta. 4) Cómo usarlo para negociar.
- **Objetivo comercial:** Uso del tasador como referencia.
- **Página de destino:** `#tasador`
- **CTA:** «Saca tu referencia antes de hablar con nadie.»
- **Plataforma recomendada:** IG.
- **Datos a verificar:** Texto literal de las fichas sobre «precio justo entre particulares y profesionales». No dar márgenes de concesionario sin fuente.

### Pilar 4 · Coches que mantienen valor

### [06] Toyota RAV4 híbrido: lo que conserva a 5 años
- **Pilar:** 4 · **Finalidad:** Conversión · **Serie:** ¿Cuánto vale?
- **Concepto:** La curva del RAV4 en la ficha, de nuevo a 5 años. Un SUV familiar del que se dice que aguanta el precio: lo comprobamos con nuestra estimación.
- **Público objetivo:** Familia que duda entre SUV híbrido nuevo o seminuevo.
- **Gancho inicial (0–3 s, literal):** «Un RAV4 de cinco años todavía vale [X] €. Míralo.»
- **Desarrollo:** 1) Precio de nuevo. 2) Precio a 5 años según la ficha. 3) El % que conserva. 4) Qué significa para quien compra seminuevo. 5) Ficha.
- **Objetivo comercial:** Visita a la ficha y tasador.
- **Página de destino:** `/tasar/toyota-rav4/`
- **CTA:** «Año a año, en la ficha del RAV4.»
- **Plataforma recomendada:** Shorts e IG.
- **Datos a verificar:** Precio de nuevo y a 5 años de la versión híbrida en la ficha `[ESTIMACIÓN Par Motor]`; % de valor conservado calculado a partir de ellos.

### [07] Suzuki Jimny: el que casi no baja
- **Pilar:** 4 · **Finalidad:** Alcance · **Serie:** Lo que pierde
- **Concepto:** Un todoterreno pequeño con fama de mantener el precio usado. Curiosidad (por qué) + dato de la ficha.
- **Público objetivo:** Aficionado al motor y curioso; amplía audiencia más allá del comprador.
- **Gancho inicial (0–3 s, literal):** «Hay coches que apenas pierden valor. Este es uno.» (solo si la ficha lo confirma)
- **Desarrollo:** 1) El coche. 2) La curva de la ficha. 3) Por qué podría pasar: oferta limitada, demanda (solo con fuente). 4) Comparación con la media de la web. 5) Ficha.
- **Objetivo comercial:** Visita a la ficha.
- **Página de destino:** `/tasar/suzuki-jimny/`
- **CTA:** «Mira cuánto ha bajado año a año en la ficha.»
- **Plataforma recomendada:** TikTok y Reels.
- **Datos a verificar:** Depreciación anual aproximada que da la ficha del Jimny; si de verdad está entre las más bajas de la web (comparar con otras fichas). Causas de la demanda solo con fuente de prensa del motor; si no hay, no se dicen.

### [08] ¿Un Porsche 911 usado pierde dinero?
- **Pilar:** 4 · **Finalidad:** Alcance · **Serie:** Lo que pierde
- **Concepto:** El deportivo aspiracional y su curva en la ficha. El sueño se cruza con el número.
- **Público objetivo:** Aficionado; audiencia aspiracional que comparte.
- **Gancho inicial (0–3 s, literal):** «Un 911 de [año] cuesta hoy [X] €. ¿Más o menos de lo que crees?»
- **Desarrollo:** 1) Precio de nuevo por generación. 2) Precio hoy según la ficha. 3) Qué generación pierde menos. 4) Aviso: los de colección no se tasan con este modelo. 5) Ficha.
- **Objetivo comercial:** Visita a la ficha.
- **Página de destino:** `/tasar/porsche-911/`
- **CTA:** «Las generaciones del 911 y su precio, en la ficha.»
- **Plataforma recomendada:** TikTok y Shorts.
- **Datos a verificar:** Generaciones y precios de la ficha `[ESTIMACIÓN Par Motor]`; límite de 100.000 km y si la ficha cubre generaciones clásicas.

### [09] Dacia Sandero: cuánto pierde al año
- **Pilar:** 4 · **Finalidad:** Conversión · **Serie:** ¿Cuánto vale?
- **Concepto:** El coche más racional y su precio usado de punta a punta según la ficha. Útil para quien busca coche barato.
- **Público objetivo:** Comprador con presupuesto ajustado; primer coche.
- **Gancho inicial (0–3 s, literal):** «Un Sandero usado va de 3.300 a 11.600 €, según nuestro tasador.»
- **Desarrollo:** 1) Rango. 2) Las tres generaciones. 3) Depreciación media al año. 4) La versión GLP del Sandero III. 5) Ficha y tasador.
- **Objetivo comercial:** Ficha y «Tasar mi Sandero con mis datos».
- **Página de destino:** `/tasar/dacia-sandero/`
- **CTA:** «Pon el año y el motor del tuyo en la ficha del Sandero.»
- **Plataforma recomendada:** Shorts e IG.
- **Datos a verificar:** Rango 3.300–11.600 € y «depreciación aproximada del 4 % anual» leídos por el Creativo en la ficha el 25-11-2026 `[ESTIMACIÓN Par Motor]`: confirmar. Versiones (1.2 de 2008 el mínimo, 1.0 SCe de 2026 el máximo).

### Pilar 5 · Coches que pierden valor

### [10] BMW Serie 5: lo que se deja en 5 años
- **Pilar:** 5 · **Finalidad:** Conversión · **Serie:** Lo que pierde
- **Concepto:** Berlina premium grande: precio de nuevo contra precio a 5 años en la ficha. La otra cara: una oportunidad para quien compra usado.
- **Público objetivo:** Comprador de premium usado; quien duda entre nuevo y seminuevo.
- **Gancho inicial (0–3 s, literal):** «Este BMW pierde [X] € en cinco años. Para alguien es una ganga.»
- **Desarrollo:** 1) Precio de nuevo. 2) A 5 años según la ficha. 3) La pérdida en euros y %. 4) Lo que eso implica en mantenimiento (comparador). 5) Ficha.
- **Objetivo comercial:** Ficha y comparador.
- **Página de destino:** `/tasar/bmw-serie-5/`
- **CTA:** «Mira la curva del Serie 5 en la ficha.»
- **Plataforma recomendada:** Shorts e IG.
- **Datos a verificar:** Precio de nuevo y a 5 años de una versión de la ficha `[ESTIMACIÓN Par Motor]`. Evitar «se hunde».

### [11] Renault Zoe: cuánto vale hoy un eléctrico de 2021
- **Pilar:** 5 · **Finalidad:** Autoridad · **Serie:** Lo que pierde
- **Concepto:** Uno de los eléctricos más vendidos de su época y su precio hoy en la ficha. Contexto: los eléctricos se deprecian más (dato atribuido).
- **Público objetivo:** Quien piensa en un eléctrico usado barato para ciudad.
- **Gancho inicial (0–3 s, literal):** «Un eléctrico de cinco años. Esto es lo que vale.»
- **Desarrollo:** 1) Precio de nuevo. 2) Hoy, según ficha. 3) Contexto Ganvam-DAT atribuido. 4) Qué mirar: batería (alquilada o en propiedad, solo si se confirma). 5) Ficha.
- **Objetivo comercial:** Ficha.
- **Página de destino:** `/tasar/renault-zoe/`
- **CTA:** «El precio por año del Zoe, en la ficha.»
- **Plataforma recomendada:** Shorts.
- **Datos a verificar:** Precios de la ficha `[ESTIMACIÓN Par Motor]`. Dato Ganvam-DAT (~53 % a 3 años en eléctricos) en fuente original. Si hubo versiones con batería en alquiler y cómo afecta al precio (solo con fuente).

### [12] Kia Niro: híbrido, enchufable o eléctrico, ¿cuál pierde más?
- **Pilar:** 5 · **Finalidad:** Autoridad · **Serie:** Lo que pierde
- **Concepto:** Un mismo modelo con tres tecnologías permite comparar depreciación sin cambiar de coche.
- **Público objetivo:** Indeciso entre tecnologías.
- **Gancho inicial (0–3 s, literal):** «Mismo coche, tres motores. Uno pierde mucho más.» (solo si la ficha lo confirma)
- **Desarrollo:** 1) Las tres versiones. 2) Precio de nuevo y a 3–5 años. 3) Cuál pierde más en %. 4) Por qué puede pasar (atribuido). 5) Ficha.
- **Objetivo comercial:** Ficha y comparador.
- **Página de destino:** `/tasar/kia-niro/`
- **CTA:** «Las tres curvas del Niro, en la ficha.»
- **Plataforma recomendada:** Shorts e IG.
- **Datos a verificar:** Que la ficha incluya HEV, PHEV y EV; precios por año `[ESTIMACIÓN Par Motor]`; % calculados. Si no están las tres, se reformula.

### [13] El primer año es el que más duele
- **Pilar:** 5 · **Finalidad:** Alcance · **Serie:** Lo que pierde
- **Concepto:** Con el Mercedes Clase C: diferencia entre nuevo y un año según la ficha. Idea universal que se comparte.
- **Público objetivo:** Cualquiera que esté pensando en comprar nuevo.
- **Gancho inicial (0–3 s, literal):** «Sales del concesionario y tu coche ya vale menos. ¿Cuánto?»
- **Desarrollo:** 1) Precio de nuevo. 2) A 1 año según ficha. 3) A 3 años. 4) Lectura: el seminuevo como alternativa. 5) Ficha.
- **Objetivo comercial:** Ficha.
- **Página de destino:** `/tasar/mercedes-benz-clase-c/`
- **CTA:** «Mira cuánto baja cada año en la ficha del Clase C.»
- **Plataforma recomendada:** TikTok y Reels.
- **Datos a verificar:** Precio de nuevo, a 1 y a 3 años de una versión `[ESTIMACIÓN Par Motor]`. No afirmar porcentajes de mercado general sin fuente.

### Pilar 1 · Comparativas

### [14] Hyundai Tucson contra Kia Sportage: ¿cuestan lo mismo al mes?
- **Pilar:** 1 · **Finalidad:** Conversión · **Serie:** Coste real al mes
- **Concepto:** Dos SUV que comparten base técnica: el comparador dice si también comparten coste.
- **Público objetivo:** Familia que duda entre los dos.
- **Gancho inicial (0–3 s, literal):** «Son casi el mismo coche. ¿Cuestan lo mismo al mes?»
- **Desarrollo:** 1) Qué comparten (con fuente). 2) Mismos supuestos en el comparador. 3) El desglose: depreciación, energía, seguro… 4) La diferencia final. 5) Haz el tuyo.
- **Objetivo comercial:** Uso del comparador.
- **Página de destino:** `#calculadora`
- **CTA:** «Pon tus kilómetros en el comparador. Gratis.»
- **Plataforma recomendada:** IG y Shorts.
- **Datos a verificar:** Que comparten plataforma y motores (fuente de marca o prensa). Resultado del comparador con supuestos anotados. Fichas `/tasar/hyundai-tucson/` y `/tasar/kia-sportage/` como apoyo.

### [15] Tesla Model 3 contra BMW Serie 3: el coste de verdad
- **Pilar:** 1 · **Finalidad:** Alcance · **Serie:** Coste real al mes
- **Concepto:** El duelo que genera comentarios, resuelto con un desglose y no con opiniones.
- **Público objetivo:** Interesados en eléctrico premium; audiencia de debate.
- **Gancho inicial (0–3 s, literal):** «Eléctrico contra gasolina. Mismos kilómetros. Este es el resultado.»
- **Desarrollo:** 1) Versiones elegidas. 2) Supuestos (km/año, carga en casa o fuera). 3) Desglose en pantalla. 4) Dónde gana cada uno. 5) Cambia los supuestos tú.
- **Objetivo comercial:** Comparador.
- **Página de destino:** `#calculadora`
- **CTA:** «Si cargas fuera de casa, el resultado cambia. Pruébalo en el comparador.»
- **Plataforma recomendada:** TikTok (debate) y Shorts.
- **Datos a verificar:** Salida del comparador con supuestos; precio de la electricidad y del carburante que usa el comparador y su fecha.

### [16] Dacia Duster de GLP: ¿compensa al mes?
- **Pilar:** 1 · **Finalidad:** Conversión · **Serie:** Coste real al mes
- **Concepto:** Versión de GLP contra la de gasolina del mismo coche. Respuesta numérica a una duda muy común.
- **Público objetivo:** Quien hace muchos km y busca SUV barato.
- **Gancho inicial (0–3 s, literal):** «El mismo Duster. Uno con GLP. ¿Cuál gasta menos al mes?»
- **Desarrollo:** 1) Las dos versiones. 2) Supuestos. 3) Coste de energía al mes. 4) Coste total. 5) A partir de cuántos km compensa (si el comparador lo permite).
- **Objetivo comercial:** Comparador.
- **Página de destino:** `#calculadora`
- **CTA:** «Pon tus kilómetros y mira si te compensa.»
- **Plataforma recomendada:** Shorts e IG.
- **Datos a verificar:** Que el comparador incluye GLP como energía y el precio del GLP que usa (fecha). Versiones del Duster en `/tasar/dacia-duster/`.

### [17] Coche de 3.000 € contra coche de 15.000 €: ¿cuál sale más caro?
- **Pilar:** 1 · **Finalidad:** Autoridad · **Serie:** Coste real al mes
- **Concepto:** El barato pierde poco valor pero gasta más en mantenimiento; el caro al revés. El comparador lo pone en números.
- **Público objetivo:** Comprador indeciso entre gastar poco o algo más.
- **Gancho inicial (0–3 s, literal):** «El coche barato no siempre es el barato.»
- **Desarrollo:** 1) Dos coches concretos (elegir en el asesor). 2) Mismo uso. 3) Desglose. 4) Dónde se cruza. 5) Pruébalo.
- **Objetivo comercial:** Comparador.
- **Página de destino:** `#calculadora`
- **CTA:** «Compara tus dos candidatos en el comparador.»
- **Plataforma recomendada:** IG y Shorts.
- **Datos a verificar:** Salida del comparador para ambos con supuestos; cómo modela el mantenimiento según la edad (sección «Cómo calculamos»). Si el modelo no sube el mantenimiento con la edad, la idea se reformula.

### Pilar 2 · Mejores coches por presupuesto

### [18] Tienes 10.000 €: esto es lo que sale
- **Pilar:** 2 · **Finalidad:** Conversión · **Serie:** Por menos de 20.000 €
- **Concepto:** Grabación de pantalla del asesor con 10.000 € y lectura de los primeros resultados.
- **Público objetivo:** Comprador con 10.000 €.
- **Gancho inicial (0–3 s, literal):** «Con 10.000 €, el asesor me da [N] modelos. Mira los primeros.»
- **Desarrollo:** 1) Se pone 10.000 € en el asesor. 2) El contador. 3) Tres tarjetas. 4) Qué mirar en cada una. 5) Hazlo con tu cifra.
- **Objetivo comercial:** Uso del asesor.
- **Página de destino:** `#asesor`
- **CTA:** «Pon tu presupuesto en el asesor. De 3.000 a 150.000 €.»
- **Plataforma recomendada:** IG y TikTok.
- **Datos a verificar:** Contador y primeros resultados del asesor con 10.000 € el día de grabación (cambian con la base de datos).

### [19] SUV por menos de 15.000 €
- **Pilar:** 2 · **Finalidad:** Conversión · **Serie:** Por menos de 20.000 €
- **Concepto:** El asesor filtrado por SUV y 15.000 €.
- **Público objetivo:** Familia joven que quiere SUV con presupuesto medio.
- **Gancho inicial (0–3 s, literal):** «Quieres un SUV y tienes 15.000 €. Vamos a ver.»
- **Desarrollo:** 1) Filtros. 2) Contador. 3) Tres opciones. 4) Lo que no ves en el anuncio: coste al mes. 5) Asesor.
- **Objetivo comercial:** Asesor.
- **Página de destino:** `#asesor`
- **CTA:** «Prueba tu combinación en el asesor.»
- **Plataforma recomendada:** IG y Shorts.
- **Datos a verificar:** Si el asesor filtra por carrocería; si no, se reformula a «lo que sale con 15.000 €».

### [20] Automático por menos de 20.000 €
- **Pilar:** 2 · **Finalidad:** Conversión · **Serie:** Por menos de 20.000 €
- **Concepto:** La caja automática es una de las búsquedas más comunes. El asesor, filtrado.
- **Público objetivo:** Conductor urbano que quiere cambio automático.
- **Gancho inicial (0–3 s, literal):** «Automático y menos de 20.000 €. Hay más de lo que piensas.» (solo si el contador lo confirma)
- **Desarrollo:** 1) Filtro. 2) Contador. 3) Tres opciones. 4) Qué tipo de caja (con cuidado: ver ideas 36–38). 5) Asesor.
- **Objetivo comercial:** Asesor.
- **Página de destino:** `#asesor`
- **CTA:** «Marca automático en el asesor y mira tu lista.»
- **Plataforma recomendada:** IG y Shorts.
- **Datos a verificar:** Si el asesor tiene filtro de cambio; contador con 20.000 €.

### [21] Eléctrico usado por menos de 20.000 €
- **Pilar:** 2 · **Finalidad:** Autoridad · **Serie:** Por menos de 20.000 €
- **Concepto:** Qué eléctricos entran en 20.000 € y qué hay que preguntar antes (autonomía, garantía de batería).
- **Público objetivo:** Curioso del eléctrico con presupuesto medio.
- **Gancho inicial (0–3 s, literal):** «Un eléctrico por menos de 20.000 €. Estos son los que salen.»
- **Desarrollo:** 1) Filtro. 2) Resultados. 3) Las tres preguntas sobre la batería. 4) Coste al mes, si cargas en casa. 5) Asesor.
- **Objetivo comercial:** Asesor.
- **Página de destino:** `#asesor`
- **CTA:** «Filtra por eléctrico en el asesor.»
- **Plataforma recomendada:** Shorts y TikTok.
- **Datos a verificar:** Filtro de energía en el asesor; resultados. Garantías de batería típicas solo con fuente de fabricante.

### Pilar 10 · Mejores coches por perfil

### [22] Primer coche para un conductor novel
- **Pilar:** 10 · **Finalidad:** Conversión · **Serie:** Por menos de 20.000 €
- **Concepto:** El novel paga más seguro y conviene un coche fácil. Asesor y comparador juntos.
- **Público objetivo:** 18–25 años y sus padres.
- **Gancho inicial (0–3 s, literal):** «Tu primer coche. Lo caro no es comprarlo.»
- **Desarrollo:** 1) Presupuesto bajo en el asesor. 2) Potencia moderada. 3) El seguro en el comparador. 4) Dos candidatos. 5) Asesor.
- **Objetivo comercial:** Asesor.
- **Página de destino:** `#asesor`
- **CTA:** «Empieza por tu presupuesto en el asesor.»
- **Plataforma recomendada:** TikTok (público joven) e IG.
- **Datos a verificar:** Que el seguro sea mayor para noveles (fuente: UNESPA, aseguradoras o prensa con fuente). Cómo trata el comparador el seguro (¿supuesto fijo?).

### [23] Familia con tres sillas: coches que caben
- **Pilar:** 10 · **Finalidad:** Autoridad · **Serie:** Consejo
- **Concepto:** Tres sillas infantiles detrás es un problema real; se explica qué mirar (anchura, Isofix en tres plazas, 7 plazas) y se lleva al asesor.
- **Público objetivo:** Familias numerosas o que esperan el tercer hijo.
- **Gancho inicial (0–3 s, literal):** «Tres sillas detrás. No todos los coches pueden.»
- **Desarrollo:** 1) El problema. 2) Qué mirar. 3) Ejemplos, como el Dacia Jogger (solo con dato de fabricante). 4) Presupuesto en el asesor. 5) CTA.
- **Objetivo comercial:** Asesor.
- **Página de destino:** `#asesor`
- **CTA:** «Pon tu presupuesto en el asesor y filtra por plazas.»
- **Plataforma recomendada:** IG (guardar y compartir entre parejas).
- **Datos a verificar:** Modelos con tres anclajes Isofix traseros (fichas técnicas de fabricante). Filtro de plazas en el asesor.

### [24] 30.000 km al año: ¿sigue teniendo sentido el diésel?
- **Pilar:** 10 · **Finalidad:** Autoridad · **Serie:** Coste real al mes
- **Concepto:** Perfil de mucho kilómetro. El comparador enfrenta diésel, híbrido y gasolina para ese uso.
- **Público objetivo:** Comerciales, quien vive lejos del trabajo.
- **Gancho inicial (0–3 s, literal):** «Haces 30.000 km al año. ¿Diésel, híbrido o gasolina?»
- **Desarrollo:** 1) Perfil. 2) Tres coches equivalentes. 3) Desglose. 4) Etiqueta y ciudades con ZBE (sin generalizar). 5) Comparador.
- **Objetivo comercial:** Comparador.
- **Página de destino:** `#calculadora`
- **CTA:** «Pon tus kilómetros reales en el comparador.»
- **Plataforma recomendada:** Shorts e IG.
- **Datos a verificar:** Salida del comparador; precio de carburantes con fecha (1,548 / 1,781 €/l a 23-11-2026 caducan). Diferencias de ZBE por ciudad.

### Pilar 3 · Errores al comprar usado

### [25] Kilómetros que no cuadran: cómo comprobarlo
- **Pilar:** 3 · **Finalidad:** Confianza · **Serie:** Consejo
- **Concepto:** El informe del vehículo de la DGT y las ITV permiten ver si el kilometraje es coherente. Consejo práctico y verificable.
- **Público objetivo:** Comprador de usado entre particulares.
- **Gancho inicial (0–3 s, literal):** «Antes de pagar, mira los kilómetros de la última ITV.»
- **Desarrollo:** 1) Dónde se pide el informe. 2) Qué trae. 3) Qué es una incoherencia. 4) Por qué afecta al precio. 5) Tasador con los km reales.
- **Objetivo comercial:** Tasador.
- **Página de destino:** `#tasador`
- **CTA:** «Con los kilómetros buenos, mira lo que vale de verdad.»
- **Plataforma recomendada:** IG y TikTok.
- **Datos a verificar:** Qué incluye el informe de vehículo de la DGT (¿km de ITV?), su precio y cómo se pide (sede.dgt.gob.es).

### [26] El impuesto que paga el comprador (y casi nadie cuenta)
- **Pilar:** 3 · **Finalidad:** Autoridad · **Serie:** Consejo
- **Concepto:** En la compraventa entre particulares hay un impuesto de transmisión que cambia según la comunidad. Se explica sin dar cifras regionales no verificadas.
- **Público objetivo:** Comprador primerizo de usado.
- **Gancho inicial (0–3 s, literal):** «El precio del coche no es lo único que pagas.»
- **Desarrollo:** 1) Qué impuesto. 2) Quién lo paga. 3) Base: tablas de Hacienda, no el precio pactado (si se confirma). 4) Varía por comunidad. 5) Suma al presupuesto.
- **Objetivo comercial:** Tasador, para tener la referencia completa.
- **Página de destino:** `#tasador`
- **CTA:** «Mira el precio orientativo y súmale el impuesto de tu comunidad.»
- **Plataforma recomendada:** IG (guardar).
- **Datos a verificar:** ITP en vehículos usados: quién lo paga, base imponible (precios medios de Hacienda) y tipos por comunidad (fuentes oficiales). Si hay mucho matiz, solo concepto.

### [27] Te enamoras de la versión y no miras el motor
- **Pilar:** 3 · **Finalidad:** Conversión · **Serie:** ¿Chollo o caro?
- **Concepto:** Con el Volkswagen Tiguan: mismo acabado visual, motores muy distintos y precios distintos en la ficha.
- **Público objetivo:** Comprador de SUV usado que mira fotos antes que la ficha técnica.
- **Gancho inicial (0–3 s, literal):** «Por fuera son iguales. Por dentro, [X] € de diferencia.»
- **Desarrollo:** 1) Dos Tiguan del mismo año. 2) La tabla de la ficha. 3) Dónde mirar la motorización en un anuncio. 4) El tasador con la versión correcta.
- **Objetivo comercial:** Ficha.
- **Página de destino:** `/tasar/volkswagen-tiguan/`
- **CTA:** «Busca tu versión exacta en la ficha del Tiguan.»
- **Plataforma recomendada:** Shorts e IG.
- **Datos a verificar:** Dos versiones del mismo año en la ficha con su diferencia `[ESTIMACIÓN Par Motor]`.

### [28] Nunca veas un coche usado con el motor caliente
- **Pilar:** 3 · **Finalidad:** Alcance · **Serie:** Consejo
- **Concepto:** Consejo clásico y fácil de compartir: el arranque en frío revela cosas que el caliente esconde.
- **Público objetivo:** Cualquier comprador de usado.
- **Gancho inicial (0–3 s, literal):** «Si cuando llegas el motor ya está caliente, pregunta por qué.»
- **Desarrollo:** 1) Qué se ve en frío (humo, ruidos, arranque). 2) Por qué algunos lo calientan antes. 3) Qué pedir. 4) Y el precio, en el tasador.
- **Objetivo comercial:** Tasador (CTA suave).
- **Página de destino:** `#tasador`
- **CTA:** «Y antes de ir, mira cuánto vale en el tasador.»
- **Plataforma recomendada:** TikTok y Reels.
- **Datos a verificar:** Qué síntomas se ven en el arranque en frío (fuente: RACE, OCU o manual técnico). Sin exagerar.

### Pilar 13 · Negociación

### [29] Llega a negociar con un número en el móvil
- **Pilar:** 13 · **Finalidad:** Conversión · **Serie:** ¿Chollo o caro?
- **Concepto:** Cómo usar el precio orientativo como ancla en una negociación, sin presentarlo como tasación oficial.
- **Público objetivo:** Comprador a punto de ver un coche.
- **Gancho inicial (0–3 s, literal):** «En una negociación gana el que llega con un número.»
- **Desarrollo:** 1) Saca el precio orientativo antes. 2) Comprueba versión y km. 3) Pregunta lo que justifica la diferencia. 4) No digas «me lo ha tasado»: di «la referencia que he mirado».
- **Objetivo comercial:** Tasador.
- **Página de destino:** `#tasador`
- **CTA:** «Tu número, en 30 segundos y sin registro.»
- **Plataforma recomendada:** IG y TikTok.
- **Datos a verificar:** Nada numérico; revisar que el texto no sugiera tasación oficial.

### [30] ¿Chollo o caro?: un Seat Ibiza de 2019
- **Pilar:** 13 · **Finalidad:** Conversión · **Serie:** ¿Chollo o caro?
- **Concepto:** Un anuncio tipo (inventado como ejemplo y rotulado así, nunca uno real copiado) contra la ficha.
- **Público objetivo:** Comprador de utilitario usado.
- **Gancho inicial (0–3 s, literal):** «Ibiza de 2019 a [X] €. ¿Chollo o caro?»
- **Desarrollo:** 1) Anuncio de ejemplo. 2) Versión y km. 3) La ficha. 4) Veredicto. 5) Tasa tú el que estás mirando.
- **Objetivo comercial:** Ficha y tasador.
- **Página de destino:** `/tasar/seat-ibiza/`
- **CTA:** «¿Tienes uno visto? Compáralo con la ficha del Ibiza.»
- **Plataforma recomendada:** TikTok y Shorts.
- **Datos a verificar:** Precio de la ficha del Ibiza de 2019 en una versión `[ESTIMACIÓN Par Motor]`. El precio del «anuncio» se fija como ejemplo y se rotula «ejemplo».

### [31] Lo que sí y lo que no se negocia en un usado
- **Pilar:** 13 · **Finalidad:** Autoridad · **Serie:** Consejo
- **Concepto:** Neumáticos, mantenimiento pendiente o ITV próxima son argumentos; «es que me gusta menos» no.
- **Público objetivo:** Comprador sin experiencia negociando.
- **Gancho inicial (0–3 s, literal):** «Hay argumentos que bajan el precio. Y otros que no sirven.»
- **Desarrollo:** 1) Tres argumentos con base. 2) Dos que no funcionan. 3) Cómo calcular el coste de lo pendiente (comparador, partida de mantenimiento). 4) Tasador.
- **Objetivo comercial:** Tasador.
- **Página de destino:** `#tasador`
- **CTA:** «Empieza por la referencia del tasador.»
- **Plataforma recomendada:** IG.
- **Datos a verificar:** Sin cifras de coste de reparación salvo con fuente.

### Pilar 6 · Consejos para vender

### [32] Vender a un particular o entregarlo en el concesionario
- **Pilar:** 6 · **Finalidad:** Autoridad · **Serie:** Consejo
- **Concepto:** Pros y contras de cada vía (precio, tiempo, papeleo, garantía) con el precio orientativo como referencia.
- **Público objetivo:** Quien va a cambiar de coche.
- **Gancho inicial (0–3 s, literal):** «Vender tu coche tú o dejarlo en el concesionario. Esto cambia.»
- **Desarrollo:** 1) Particular: más precio, más trabajo. 2) Concesionario: comodidad. 3) Obligaciones del vendedor particular (vicios ocultos, con fuente). 4) Tu referencia en el tasador.
- **Objetivo comercial:** Tasador.
- **Página de destino:** `#tasador`
- **CTA:** «Antes de decidir, mira tu precio orientativo.»
- **Plataforma recomendada:** IG y Shorts.
- **Datos a verificar:** Responsabilidad del vendedor particular por vicios ocultos (Código Civil, plazo). No dar márgenes de concesionario sin fuente.

### [33] Fotos que hacen que tu coche parezca más barato
- **Pilar:** 6 · **Finalidad:** Alcance · **Serie:** Consejo
- **Concepto:** Ejemplos (recreados, sin copiar anuncios ajenos) de fotos que restan: de noche, mojado, con trastos. Encaja con la estética de la marca.
- **Público objetivo:** Vendedor particular.
- **Gancho inicial (0–3 s, literal):** «Esta foto le quita valor a tu coche.»
- **Desarrollo:** 1) Tres fotos malas. 2) Tres buenas. 3) Orden recomendado. 4) Y el precio, con referencia.
- **Objetivo comercial:** Tasador.
- **Página de destino:** `#tasador`
- **CTA:** «Fotos buenas y precio con referencia. El precio, en el tasador.»
- **Plataforma recomendada:** Reels y TikTok.
- **Datos a verificar:** Nada numérico. Si se cita que las buenas fotos venden antes, solo con fuente (portal de anuncios).

### [34] Vendes tu coche: el papel que te protege
- **Pilar:** 6 · **Finalidad:** Confianza · **Serie:** Consejo
- **Concepto:** La notificación de venta a la DGT y el contrato: qué evitan (multas del nuevo dueño, por ejemplo).
- **Público objetivo:** Vendedor particular.
- **Gancho inicial (0–3 s, literal):** «Vendiste el coche. Y la multa te llega a ti.»
- **Desarrollo:** 1) El caso. 2) La notificación de venta. 3) El contrato. 4) La transferencia. 5) Y antes, el precio.
- **Objetivo comercial:** Tasador.
- **Página de destino:** `#tasador`
- **CTA:** «Primero el precio orientativo; luego los papeles.»
- **Plataforma recomendada:** IG (guardar) y Shorts.
- **Datos a verificar:** Trámite de notificación de venta en la DGT (qué es, coste, plazo) y quién tramita la transferencia (sede.dgt.gob.es).

### [35] ¿Cuándo vender? El año en que más baja tu coche
- **Pilar:** 6 · **Finalidad:** Conversión · **Serie:** Lo que pierde
- **Concepto:** Con la curva del Opel Corsa en la ficha: qué tramo de años tiene el salto mayor.
- **Público objetivo:** Dueño de utilitario que piensa en cambiar.
- **Gancho inicial (0–3 s, literal):** «Hay un año en el que tu coche baja más. Este.» (solo si la curva lo muestra)
- **Desarrollo:** 1) La curva. 2) El salto. 3) Cambio de generación como causa posible. 4) Lo que eso implica para vender. 5) Ficha.
- **Objetivo comercial:** Ficha y tasador.
- **Página de destino:** `/tasar/opel-corsa/`
- **CTA:** «Mira en qué punto de la curva está tu Corsa.»
- **Plataforma recomendada:** Shorts e IG.
- **Datos a verificar:** Si la curva de la ficha tiene saltos (o es lineal por diseño del modelo). Si es lineal, la idea se reformula a «cambio de generación».

### Pilar 8 · Problemas mecánicos conocidos (verificación reforzada)

### [36] Peugeot 208 PureTech: qué pasa con la correa
- **Pilar:** 8 · **Finalidad:** Confianza · **Serie:** Consejo
- **Concepto:** La correa de distribución en baño de aceite del 1.2 PureTech: qué ha reconocido la marca y qué pedir al comprar.
- **Público objetivo:** Comprador de 208, 2008 u otros con ese motor.
- **Gancho inicial (0–3 s, literal):** «Si miras un 208 de gasolina, pregunta por la correa.»
- **Desarrollo:** 1) Qué es la correa húmeda. 2) Qué problema se ha documentado. 3) Qué ha hecho la marca (solo fuente oficial). 4) Qué pedir: facturas, cambios. 5) Ficha.
- **Objetivo comercial:** Ficha.
- **Página de destino:** `/tasar/peugeot-207-y-208/`
- **CTA:** «Y su precio por año, en la ficha del 208.»
- **Plataforma recomendada:** Shorts (búsqueda) e IG.
- **Datos a verificar:** **Reforzado.** Años y motores afectados; programa o ampliación de garantía de Stellantis en España (comunicado oficial); intervalos de cambio recomendados. Sin fuente oficial no se graba.

### [37] Cambio DSG de 7 marchas: qué preguntar en un Polo usado
- **Pilar:** 8 · **Finalidad:** Autoridad · **Serie:** Consejo
- **Concepto:** La caja de doble embrague en seco de algunos VW: qué se ha documentado y cómo revisarlo en una prueba.
- **Público objetivo:** Comprador de Polo, Ibiza o similares automáticos.
- **Gancho inicial (0–3 s, literal):** «Polo automático usado. Haz esto en la prueba.»
- **Desarrollo:** 1) Qué caja es. 2) Síntomas documentados. 3) Cómo probarla. 4) Mantenimiento. 5) Ficha.
- **Objetivo comercial:** Ficha.
- **Página de destino:** `/tasar/volkswagen-polo/`
- **CTA:** «El precio del Polo por versión, en la ficha.»
- **Plataforma recomendada:** Shorts e IG.
- **Datos a verificar:** **Reforzado.** Qué versiones del Polo montan la DQ200; campañas o reconocimientos oficiales; síntomas con fuente técnica fiable. No generalizar a todas las DSG.

### [38] Ford Focus 1.0 EcoBoost: el mantenimiento que no se salta
- **Pilar:** 8 · **Finalidad:** Confianza · **Serie:** Consejo
- **Concepto:** Motor pequeño muy vendido; qué se ha documentado de él y qué mantenimiento exige.
- **Público objetivo:** Comprador de Focus o Fiesta de gasolina.
- **Gancho inicial (0–3 s, literal):** «Un Focus 1.0 de gasolina. Antes de comprarlo, mira esto.»
- **Desarrollo:** 1) El motor. 2) Lo documentado. 3) Qué pedir en el historial. 4) Ficha.
- **Objetivo comercial:** Ficha.
- **Página de destino:** `/tasar/ford-focus/`
- **CTA:** «Su precio por año, en la ficha del Focus.»
- **Plataforma recomendada:** Shorts.
- **Datos a verificar:** **Reforzado.** Problemas documentados del 1.0 EcoBoost (correa húmeda, refrigeración) con años, y acciones oficiales de Ford. Si no hay fuente sólida, se descarta.

### [39] Por qué el filtro de partículas odia la ciudad
- **Pilar:** 8 · **Finalidad:** Alcance · **Serie:** Consejo
- **Concepto:** El FAP se regenera con trayectos largos; un diésel solo urbano puede dar problemas. Ejemplo con el Nissan Qashqai diésel.
- **Público objetivo:** Quien duda si comprar diésel para ciudad.
- **Gancho inicial (0–3 s, literal):** «Si solo haces ciudad, tu diésel lo nota aquí.»
- **Desarrollo:** 1) Qué es el FAP. 2) La regeneración. 3) El uso urbano. 4) Cómo saber si tu uso encaja. 5) Ficha del Qashqai (gasolina contra diésel).
- **Objetivo comercial:** Ficha.
- **Página de destino:** `/tasar/nissan-qashqai/`
- **CTA:** «Compara los precios de las versiones de gasolina y diésel en la ficha.»
- **Plataforma recomendada:** TikTok y Reels.
- **Datos a verificar:** **Reforzado.** Funcionamiento de la regeneración del FAP (fuente técnica: RACE, fabricante). No atribuir fallos al Qashqai en concreto sin fuente.

### Pilar 9 · Noticias (Radar en 30 s)

### [40] 1 de enero: lo que cambia en el surtidor si no hay prórroga
- **Pilar:** 9 · **Finalidad:** Autoridad · **Serie:** Radar
- **Concepto:** Continuación de W48: la rebaja del impuesto termina el 31 de diciembre y, a fecha de hoy, no hay nada aprobado para 2027.
- **Público objetivo:** Conductores en general.
- **Gancho inicial (0–3 s, literal):** «El 31 de diciembre acaba la rebaja del carburante. ¿Y después?»
- **Desarrollo:** 1) Qué rebaja y hasta cuándo (RDL 25/2026). 2) Hasta 20 céntimos por litro antes de IVA. 3) Qué hay aprobado para 2027 (a la fecha). 4) Cómo te afecta al mes (comparador). 5) Radar.
- **Objetivo comercial:** Radar y comparador.
- **Página de destino:** `#radar`
- **CTA:** «Cada lunes lo actualizamos en el Radar de la web.»
- **Plataforma recomendada:** Shorts y TikTok.
- **Datos a verificar:** Volver a verificar el día de publicación si hay prórroga; cuantía de diciembre en BOE (hoy solo prensa); fórmula segura de `2026-W48-verificacion.md`, fila 2d.

### [41] Matriculaciones de noviembre en 30 segundos
- **Pilar:** 9 · **Finalidad:** Alcance · **Serie:** Radar
- **Concepto:** Los datos del mes en cuanto se publiquen: el más vendido y la tendencia por energía.
- **Público objetivo:** Aficionado y comprador que sigue el mercado.
- **Gancho inicial (0–3 s, literal):** «El coche más vendido de noviembre en España fue [modelo].»
- **Desarrollo:** 1) El más vendido. 2) Total y variación. 3) Electrificados. 4) Su precio usado en la ficha. 5) Radar.
- **Objetivo comercial:** Radar y ficha del más vendido.
- **Página de destino:** `#radar`
- **CTA:** «El resto del ranking, en el Radar.»
- **Plataforma recomendada:** TikTok y Shorts.
- **Datos a verificar:** Datos de ANFAC del mes (fecha de publicación, cifras); que el modelo tenga ficha `/tasar/`.

### [42] Ayudas al eléctrico: qué es el plan Auto+ y qué no es
- **Pilar:** 9 · **Finalidad:** Confianza · **Serie:** Radar
- **Concepto:** Hay ruido en prensa sobre el sustituto del MOVES. Contar solo lo confirmado por la fuente oficial.
- **Público objetivo:** Quien piensa en un eléctrico nuevo.
- **Gancho inicial (0–3 s, literal):** «Ayudas al coche eléctrico: lo que está aprobado. Y nada más.»
- **Desarrollo:** 1) Nombre y norma. 2) Cuantía máxima confirmada. 3) A quién deja fuera (por ejemplo, etiqueta). 4) Lo que aún no se sabe. 5) Radar.
- **Objetivo comercial:** Radar.
- **Página de destino:** `#radar`
- **CTA:** «Si cambia, lo verás en el Radar del lunes.»
- **Plataforma recomendada:** Shorts y IG.
- **Datos a verificar:** **Todo.** La prensa da cifras distintas (5.000 y 5.500 €) y nombres distintos (Plan Auto 2030, Auto+). Solo IDAE, Ministerio de Industria o BOE. Fecha de entrada en vigor y requisitos.

### Pilar 12 · Oportunidades

### [43] ¿Diciembre es buen mes para comprar coche?
- **Pilar:** 12 · **Finalidad:** Alcance · **Serie:** Radar
- **Concepto:** Se dice que a final de año hay descuentos para cerrar objetivos. Lo contrastamos con datos, sin prometer gangas.
- **Público objetivo:** Quien piensa en comprar antes de fin de año.
- **Gancho inicial (0–3 s, literal):** «Dicen que diciembre es el mejor mes para comprar coche. ¿Es verdad?»
- **Desarrollo:** 1) La creencia. 2) Lo que dicen los datos (con fuente). 3) Lo que cambia el 1 de enero (ver idea 40). 4) Cómo comprobar si un precio es bueno: tasador o ficha.
- **Objetivo comercial:** Radar y tasador.
- **Página de destino:** `#radar`
- **CTA:** «Lo que se mueve en el mercado, cada lunes en el Radar.»
- **Plataforma recomendada:** TikTok y Reels.
- **Datos a verificar:** Estudios de estacionalidad de precios o matriculaciones en España (ANFAC, Ganvam, portales). Si no hay datos, se convierte en «Mito o realidad» con la respuesta «no lo sabemos con datos».

### [44] Eléctricos de 3 años: ¿la oportunidad está en el usado?
- **Pilar:** 12 · **Finalidad:** Conversión · **Serie:** ¿Chollo o caro?
- **Concepto:** Si los eléctricos pierden más valor, el usado es más barato. Con el Hyundai Kona eléctrico y su ficha.
- **Público objetivo:** Comprador abierto al eléctrico.
- **Gancho inicial (0–3 s, literal):** «Lo que pierde el primer dueño lo ahorra el segundo.»
- **Desarrollo:** 1) Dato atribuido de depreciación del eléctrico. 2) Kona eléctrico: nuevo contra 3 años. 3) Qué comprobar de la batería. 4) Ficha.
- **Objetivo comercial:** Ficha.
- **Página de destino:** `/tasar/hyundai-kona/`
- **CTA:** «Mira la curva del Kona eléctrico en la ficha.»
- **Plataforma recomendada:** Shorts e IG.
- **Datos a verificar:** Que la ficha distinga la versión eléctrica; precios `[ESTIMACIÓN Par Motor]`; Ganvam-DAT en fuente original.

### [45] Coches que vuelven del renting: qué buscar
- **Pilar:** 12 · **Finalidad:** Conversión · **Serie:** ¿Chollo o caro?
- **Concepto:** Los coches de 3–4 años con mantenimiento oficial que salen del renting. Ejemplo con el Toyota C-HR.
- **Público objetivo:** Comprador de seminuevo.
- **Gancho inicial (0–3 s, literal):** «Tres años, mantenimiento al día y un primer dueño que no lo pagó.»
- **Desarrollo:** 1) De dónde vienen. 2) Ventajas y riesgos. 3) Qué pedir. 4) Ficha del C-HR a 3–4 años.
- **Objetivo comercial:** Ficha.
- **Página de destino:** `/tasar/toyota-c-hr/`
- **CTA:** «Compara con la ficha del C-HR antes de decidir.»
- **Plataforma recomendada:** IG y Shorts.
- **Datos a verificar:** Datos sobre el volumen de coches de fin de renting en el mercado de usados (AER, Ganvam). Precios del C-HR `[ESTIMACIÓN Par Motor]`. No decir que el C-HR es habitual en renting sin fuente.

### Pilar 11 · Mitos

### [46] ¿Un diésel dura más?
- **Pilar:** 11 · **Finalidad:** Alcance · **Serie:** Mito o realidad
- **Concepto:** Creencia de bar contrastada con hechos técnicos y con el coste al mes.
- **Público objetivo:** Público general; genera comentarios.
- **Gancho inicial (0–3 s, literal):** «El diésel dura más. ¿Mito o realidad?»
- **Desarrollo:** 1) De dónde sale. 2) Qué ha cambiado (FAP, AdBlue, inyección). 3) Lo que dicen las fuentes. 4) Lo que importa: coste por km (comparador).
- **Objetivo comercial:** Comparador.
- **Página de destino:** `#calculadora`
- **CTA:** «Lo que de verdad te importa es lo que cuesta al mes. Compruébalo.»
- **Plataforma recomendada:** TikTok y Reels.
- **Datos a verificar:** Fuentes técnicas sobre durabilidad (sin cifras de km míticas sin fuente).

### [47] ¿El color cambia el precio de tu coche?
- **Pilar:** 11 · **Finalidad:** Alcance · **Serie:** Mito o realidad
- **Concepto:** Pregunta curiosa y compartible; respuesta con estudios de terceros y lo que hace (o no) nuestro tasador.
- **Público objetivo:** Público general.
- **Gancho inicial (0–3 s, literal):** «¿Un coche amarillo vale menos? Vamos a ver.»
- **Desarrollo:** 1) El mito. 2) Lo que dicen los estudios (atribuidos). 3) Si nuestro tasador lo tiene en cuenta o no, y por qué. 4) Tasador.
- **Objetivo comercial:** Tasador.
- **Página de destino:** `#tasador`
- **CTA:** «Lo que sí mueve el precio, en el tasador.»
- **Plataforma recomendada:** TikTok.
- **Datos a verificar:** Si el tasador pide color. Estudios sobre color y valor residual (iSeeCars es de EE. UU.: no vale para España; buscar uno español o atribuir el país).

### [48] ¿Un eléctrico sale siempre más barato?
- **Pilar:** 11 · **Finalidad:** Autoridad · **Serie:** Mito o realidad
- **Concepto:** Depende de dónde cargas y de cuánto pierde. El comparador enseña los dos escenarios.
- **Público objetivo:** Indeciso con el eléctrico.
- **Gancho inicial (0–3 s, literal):** «Un eléctrico siempre sale más barato. Depende de una cosa.»
- **Desarrollo:** 1) Carga en casa. 2) Carga en la calle. 3) La depreciación. 4) El resultado en el comparador.
- **Objetivo comercial:** Comparador.
- **Página de destino:** `#calculadora`
- **CTA:** «Pon cómo cargas tú y mira el resultado.»
- **Plataforma recomendada:** Shorts y TikTok.
- **Datos a verificar:** Si el comparador distingue carga en casa y fuera; precios de electricidad usados y fecha.

### [49] ¿Un híbrido no necesita mantenimiento?
- **Pilar:** 11 · **Finalidad:** Alcance · **Serie:** Mito o realidad
- **Concepto:** Mito habitual: el híbrido sigue teniendo motor de combustión y revisiones. Lo que cambia y lo que no.
- **Público objetivo:** Comprador de primer híbrido.
- **Gancho inicial (0–3 s, literal):** «Un híbrido casi no tiene mantenimiento. ¿Seguro?»
- **Desarrollo:** 1) Qué tiene un híbrido. 2) Lo que se desgasta menos (frenos, con fuente). 3) Lo que sigue igual. 4) Partida de mantenimiento en el comparador.
- **Objetivo comercial:** Comparador.
- **Página de destino:** `#calculadora`
- **CTA:** «Mira su partida de mantenimiento en el comparador.»
- **Plataforma recomendada:** TikTok y Reels.
- **Datos a verificar:** Fuente técnica sobre el desgaste de frenos por frenada regenerativa; cómo trata el comparador el mantenimiento por tecnología.

### Pilar 14 · Preguntas de la audiencia

### [50] «¿Cómo sé si me piden demasiado por un Octavia?»
- **Pilar:** 14 · **Finalidad:** Conversión · **Serie:** Consejo (Tu pregunta)
- **Concepto:** Es una de las preguntas frecuentes que llevan todas las fichas. Se responde en vídeo con la ficha del Skoda Octavia.
- **Público objetivo:** Comprador con un anuncio concreto delante.
- **Gancho inicial (0–3 s, literal):** «¿Me piden demasiado por este Octavia? Así se mira.»
- **Desarrollo:** 1) Año y motor del anuncio. 2) La tabla de la ficha. 3) Ajuste por km. 4) Si la diferencia es grande, preguntar por qué. 5) Tasador.
- **Objetivo comercial:** Ficha y tasador.
- **Página de destino:** `/tasar/skoda-octavia/`
- **CTA:** «Haz lo mismo con el que estás mirando.»
- **Plataforma recomendada:** Shorts e IG.
- **Datos a verificar:** Que la ficha del Octavia tenga esa FAQ; precios de una versión `[ESTIMACIÓN Par Motor]`.

### [51] «Mi coche tiene 150.000 km: ¿me sirve el tasador?»
- **Pilar:** 14 · **Finalidad:** Confianza · **Serie:** Consejo (Tu pregunta)
- **Concepto:** Respuesta honesta a una pregunta que va a llegar: el tasador cubre hasta 100.000 km. Complementa la idea 03 con enfoque práctico.
- **Público objetivo:** Dueño de coche con muchos km.
- **Gancho inicial (0–3 s, literal):** «Tu coche tiene más de 100.000 km. Te decimos la verdad.»
- **Desarrollo:** 1) El límite. 2) Qué puedes hacer: usar la ficha como techo orientativo, comparar anuncios similares. 3) Lo que no hacemos: tasación oficial. 4) Si estás por debajo, pruébalo.
- **Objetivo comercial:** Confianza y uso correcto.
- **Página de destino:** `#tasador`
- **CTA:** «Por debajo de 100.000 km, el tasador es tuyo. Gratis.»
- **Plataforma recomendada:** IG y TikTok.
- **Datos a verificar:** El límite exacto; que el consejo «la ficha como techo» sea correcto con el método.

### [52] «¿Por qué en la ficha no sale mi versión?»
- **Pilar:** 14 · **Finalidad:** Confianza · **Serie:** Consejo (Tu pregunta)
- **Concepto:** Las tablas muestran 3 versiones por generación; el tasador tiene todas las motorizaciones. Se explica dónde está cada cosa.
- **Público objetivo:** Usuario que ya entró en una ficha.
- **Gancho inicial (0–3 s, literal):** «En la tabla no está tu motor. En el tasador, sí.»
- **Desarrollo:** 1) La tabla (resumen). 2) El botón «Tasar mi [modelo] con mis datos». 3) El tasador con la versión exacta. 4) Aviso.
- **Objetivo comercial:** Paso ficha → tasador.
- **Página de destino:** `#tasador`
- **CTA:** «Desde cualquier ficha, pulsa “Tasar con mis datos”.»
- **Plataforma recomendada:** IG y Shorts.
- **Datos a verificar:** Que el tasador incluya todas las motorizaciones (lo dice marca.md; comprobar en la web) y el texto exacto del botón.

### Pilar 15 · Casos prácticos

### [53] Caso: un Toyota Yaris de 2018 con 90.000 km
- **Pilar:** 15 · **Finalidad:** Conversión · **Serie:** ¿Cuánto vale?
- **Concepto:** Un caso inventado y rotulado como ejemplo, de principio a fin: ficha, tasador y lectura del resultado.
- **Público objetivo:** Vendedor o comprador de utilitario híbrido.
- **Gancho inicial (0–3 s, literal):** «Yaris de 2018, 90.000 km. Lo pasamos por el tasador.»
- **Desarrollo:** 1) Los datos del caso. 2) El tasador en pantalla. 3) Resultado. 4) Qué lo sube y qué lo baja. 5) Haz el tuyo.
- **Objetivo comercial:** Ficha y tasador.
- **Página de destino:** `/tasar/toyota-yaris/`
- **CTA:** «Pon el tuyo en la ficha del Yaris.»
- **Plataforma recomendada:** Shorts e IG.
- **Datos a verificar:** Resultado del tasador para ese caso el día de grabación `[ESTIMACIÓN Par Motor]`.

### [54] Caso: 15.000 € para un SUV familiar, Karoq o Ateca
- **Pilar:** 15 · **Finalidad:** Conversión · **Serie:** Coste real al mes
- **Concepto:** Dos SUV primos con presupuesto fijo: precio usado en fichas y coste al mes en el comparador.
- **Público objetivo:** Familia con 15.000 €.
- **Gancho inicial (0–3 s, literal):** «15.000 € y dos SUV casi iguales. ¿Cuál me compro?»
- **Desarrollo:** 1) Qué año sale de cada uno con 15.000 € (fichas). 2) Coste al mes. 3) Diferencia. 4) Lo decides tú.
- **Objetivo comercial:** Comparador.
- **Página de destino:** `#calculadora`
- **CTA:** «Compara tus dos candidatos en el comparador.»
- **Plataforma recomendada:** IG y Shorts.
- **Datos a verificar:** Fichas `/tasar/skoda-yeti-y-karoq/` y `/tasar/seat-ateca/`; que compartan base (fuente); resultado del comparador.

### [55] Caso: ¿cambio mi diésel de 2012 o lo aguanto?
- **Pilar:** 15 · **Finalidad:** Autoridad · **Serie:** Coste real al mes
- **Concepto:** Coste de seguir con el coche viejo frente a cambiar a uno de 3 años: depreciación contra mantenimiento.
- **Público objetivo:** Dueño de coche de más de 10 años.
- **Gancho inicial (0–3 s, literal):** «Mi coche tiene 14 años. ¿Lo cambio o lo aguanto?»
- **Desarrollo:** 1) Coste al mes del viejo. 2) Del nuevo de 3 años. 3) La diferencia. 4) Factores fuera del número (ZBE, seguridad). 5) Comparador.
- **Objetivo comercial:** Comparador.
- **Página de destino:** `#calculadora`
- **CTA:** «Haz tu cuenta con tu coche en el comparador.»
- **Plataforma recomendada:** Shorts e IG.
- **Datos a verificar:** Salida del comparador; restricciones de ZBE solo si se da una ciudad concreta con fuente municipal.

### Historia del motor

### [56] 4 cosas que no sabías del Toyota Corolla
- **Pilar:** Historia · **Finalidad:** Alcance · **Serie:** 4 cosas que no sabías de…
- **Concepto:** Ficha de historia de la web y puente a su precio usado de hoy.
- **Público objetivo:** Aficionado y público general.
- **Gancho inicial (0–3 s, literal):** «El Corolla tiene un récord que pocos coches tienen.» (solo si la ficha lo recoge)
- **Desarrollo:** 4 datos de la ficha `/historia/toyota-corolla/` y cierre: «¿y cuánto vale uno hoy?».
- **Objetivo comercial:** Historia → ficha de precio.
- **Página de destino:** `/historia/toyota-corolla/` (CTA secundario a `/tasar/toyota-corolla-y-auris/`)
- **CTA:** «Su historia y su precio de hoy, en la web.»
- **Plataforma recomendada:** Reels, TikTok y Shorts.
- **Datos a verificar:** Los 4 datos de la ficha de historia con fuente; que el Corolla no esté en Metricool 1–14 dic.

### [57] 4 cosas que no sabías del Land Rover Defender
- **Pilar:** Historia · **Finalidad:** Alcance · **Serie:** 4 cosas que no sabías de…
- **Concepto:** Clásico de campo con heredero moderno; los dos tienen ficha.
- **Público objetivo:** Aficionado al 4x4.
- **Gancho inicial (0–3 s, literal):** «Este todoterreno estuvo [X] años casi sin cambiar.» (según la ficha)
- **Desarrollo:** 4 datos de `/historia/land-rover-defender/` y cierre con el Defender actual.
- **Objetivo comercial:** Historia → ficha de precio.
- **Página de destino:** `/historia/land-rover-defender/` (CTA secundario a `/tasar/land-rover-defender/`)
- **CTA:** «Del original al de hoy, y su precio usado, en la web.»
- **Plataforma recomendada:** Reels y TikTok.
- **Datos a verificar:** Años de producción y datos de la ficha; cruce con Metricool.

### [58] 4 cosas que no sabías del Renault Espace
- **Pilar:** Historia · **Finalidad:** Alcance · **Serie:** 4 cosas que no sabías de…
- **Concepto:** El monovolumen que marcó a muchas familias españolas; nostalgia con puente a la ficha actual.
- **Público objetivo:** Público de 35–55 años.
- **Gancho inicial (0–3 s, literal):** «Si te criaste en los 90, igual viajaste en este coche.»
- **Desarrollo:** 4 datos de `/historia/renault-espace/` y cierre con el Espace actual.
- **Objetivo comercial:** Historia → ficha de precio.
- **Página de destino:** `/historia/renault-espace/` (CTA secundario a `/tasar/renault-espace/`)
- **CTA:** «Su historia y lo que vale hoy, en la web.»
- **Plataforma recomendada:** Reels y Facebook a través de IG (público de más edad).
- **Datos a verificar:** Datos de la ficha de historia; cruce con Metricool.

### [59] Museo del box: del Fiat Panda de 1980 al de hoy
- **Pilar:** Historia · **Finalidad:** Conversión · **Serie:** Museo del box
- **Concepto:** Formato «del museo al tasador»: dos datos de historia y el precio usado del Panda actual.
- **Público objetivo:** Comprador de urbano barato con gusto por lo clásico.
- **Gancho inicial (0–3 s, literal):** «El Panda nació para ser sencillo. ¿Cuánto vale uno hoy?»
- **Desarrollo:** 1) Dos datos de `/historia/fiat-panda/`. 2) Salto al Panda moderno. 3) Ficha: rango. 4) Tasador.
- **Objetivo comercial:** Ficha de precio.
- **Página de destino:** `/tasar/fiat-panda/` (apoyo en `/historia/fiat-panda/`)
- **CTA:** «El precio de tu Panda, en su ficha.»
- **Plataforma recomendada:** Reels y Shorts.
- **Datos a verificar:** Año de lanzamiento y datos de la ficha de historia; rango de `/tasar/fiat-panda/` `[ESTIMACIÓN Par Motor]`; cruce con Metricool.

### [60] Museo del box: el Mini original y el de ahora
- **Pilar:** Historia · **Finalidad:** Autoridad · **Serie:** Museo del box
- **Concepto:** El Mini clásico y el Mini de BMW: qué conserva y qué no, y su precio usado.
- **Público objetivo:** Aficionado y comprador de urbano premium.
- **Gancho inicial (0–3 s, literal):** «Se llaman igual. Se parecen poco.»
- **Desarrollo:** 1) Dos datos del original. 2) Qué cambió. 3) El Mini actual en la ficha. 4) CTA.
- **Objetivo comercial:** Ficha de precio.
- **Página de destino:** `/historia/mini/` (CTA secundario a `/tasar/mini-mini-3-y-5-puertas/`)
- **CTA:** «Del museo al tasador: el precio de un Mini hoy, en la web.»
- **Plataforma recomendada:** Reels y TikTok.
- **Datos a verificar:** Datos de la ficha de historia; generaciones en la ficha de precio; cruce con Metricool.

---

## 6 ideas de vídeo largo (YouTube, 5–10 min)

### [L1] Lo que pierde un coche en 10 años: 6 modelos, 6 curvas
- **Pilar:** 4 · 5 · **Finalidad:** Conversión · **Serie:** Lo que pierde (especial)
- **Concepto:** Las curvas de depreciación de Sandero, RAV4, Jimny, Serie 5, Zoe y Clase C según las fichas, con contexto atribuido (Ganvam-DAT, carVertical vía Autofácil) y explicación del método.
- **Gancho (0–3 s):** «Seis coches. Uno pierde casi nada. Otro, mucho más.» (según los datos que salgan)
- **Estructura:** intro con método (1 min) · 6 bloques de 1 min · qué tienen en común los que aguantan · cómo mirar el tuyo.
- **Destino:** las 6 fichas `/tasar/` con capítulos y enlaces en la descripción.
- **CTA:** «Busca tu modelo entre las 400 fichas.»
- **Datos a verificar:** Todos los precios de las 6 fichas; contexto externo solo atribuido.

### [L2] Coste real al mes: 5 coches populares, cuenta por cuenta
- **Pilar:** 1 · **Finalidad:** Autoridad · **Serie:** Coste real al mes
- **Concepto:** El comparador desmontado partida a partida con 5 coches de los más vendidos (elegidos con datos de ANFAC).
- **Gancho:** «La letra es lo de menos. Aquí va el resto de la factura.»
- **Estructura:** las 7 partidas explicadas · 5 coches · qué partida pesa más según el uso · cómo cambiar los supuestos.
- **Destino:** `#calculadora`
- **CTA:** «Haz tu cuenta en el comparador.»
- **Datos a verificar:** Los más vendidos (ANFAC); salidas del comparador con supuestos; precios de energía con fecha.

### [L3] Comprar un usado sin llevarte un susto: 10 pasos
- **Pilar:** 3 · 13 · **Finalidad:** Confianza · **Serie:** Consejo (especial)
- **Concepto:** Del anuncio a la transferencia: precio de referencia, informe DGT, prueba en frío, papeles, ITP y negociación.
- **Gancho:** «Diez pasos. Si te saltas uno, puede salirte caro.»
- **Estructura:** 10 capítulos de unos 45 s cada uno.
- **Destino:** `#tasador`
- **CTA:** «El paso uno es saber lo que vale. Gratis, en el tasador.»
- **Datos a verificar:** Todos los trámites (DGT, Hacienda autonómica) con fuente oficial.

### [L4] Por menos de 20.000 €: el asesor con 4 perfiles reales
- **Pilar:** 2 · 10 · **Finalidad:** Conversión · **Serie:** Por menos de 20.000 €
- **Concepto:** Novel, familia, mucho kilómetro y ciudad: los cuatro perfiles (inventados y rotulados como ejemplo) pasan por el asesor y el comparador.
- **Gancho:** «Mismo presupuesto, cuatro personas, cuatro coches distintos.»
- **Estructura:** perfil, filtros, 3 candidatos y coste al mes, por cada perfil.
- **Destino:** `#asesor`
- **CTA:** «Haz tu perfil en el asesor.»
- **Datos a verificar:** Resultados del asesor el día de grabación; filtros disponibles.

### [L5] Vender tu coche bien: del precio a la notificación a la DGT
- **Pilar:** 6 · **Finalidad:** Confianza · **Serie:** Consejo (especial)
- **Concepto:** Referencia de precio, fotos, anuncio, visitas, contrato, notificación y transferencia.
- **Gancho:** «Vender tu coche tiene siete pasos. El primero es el que más dinero mueve.»
- **Estructura:** 7 bloques.
- **Destino:** `#tasador`
- **CTA:** «Empieza por tu precio orientativo.»
- **Datos a verificar:** Trámites DGT y responsabilidad del vendedor (fuente oficial).

### [L6] Motores con fama: PureTech, EcoBoost, DSG… lo que está documentado
- **Pilar:** 8 · 11 · **Finalidad:** Autoridad · **Serie:** Mito o realidad (especial)
- **Concepto:** Separar lo documentado (campañas, garantías ampliadas) del rumor de foro, motor por motor.
- **Gancho:** «Hay motores con mala fama. Vamos a ver cuánta es merecida.»
- **Estructura:** 4–5 motores, cada uno con «qué se dice», «qué está documentado» y «qué pedir al comprar», más un enlace a la ficha del modelo.
- **Destino:** `/tasar/peugeot-207-y-208/`, `/tasar/ford-focus/` y `/tasar/volkswagen-polo/`
- **CTA:** «Antes de comprar, mira el precio por versión en la ficha.»
- **Datos a verificar:** **Reforzado.** Solo comunicados oficiales y fuentes técnicas sólidas. Revisión del Director antes de grabar.

---

## Tabla resumen

| Nº | Título | Pilar | Finalidad | Destino | Serie |
|---|---|---|---|---|---|
| 01 | Las 4 cosas que mueven el precio | 7 | Autoridad | `#tasador` | ¿Cuánto vale? |
| 02 | Mismo Golf, distinto motor | 7 | Conversión | `/tasar/volkswagen-golf/` | ¿Cuánto vale? |
| 03 | El tasador y los 100.000 km | 7 | Confianza | `#tasador` | ¿Cuánto vale? |
| 04 | Cómo calculamos, en 30 s | 7 | Confianza | `#tasador` | ¿Cuánto vale? |
| 05 | «Precio justo»: qué significa | 7 | Confianza | `#tasador` | ¿Cuánto vale? |
| 06 | RAV4 híbrido a 5 años | 4 | Conversión | `/tasar/toyota-rav4/` | ¿Cuánto vale? |
| 07 | Suzuki Jimny, el que casi no baja | 4 | Alcance | `/tasar/suzuki-jimny/` | Lo que pierde |
| 08 | ¿Un 911 usado pierde dinero? | 4 | Alcance | `/tasar/porsche-911/` | Lo que pierde |
| 09 | Dacia Sandero: cuánto pierde al año | 4 | Conversión | `/tasar/dacia-sandero/` | ¿Cuánto vale? |
| 10 | BMW Serie 5 en 5 años | 5 | Conversión | `/tasar/bmw-serie-5/` | Lo que pierde |
| 11 | Renault Zoe de 2021 hoy | 5 | Autoridad | `/tasar/renault-zoe/` | Lo que pierde |
| 12 | Kia Niro: tres motores | 5 | Autoridad | `/tasar/kia-niro/` | Lo que pierde |
| 13 | El primer año es el que más duele | 5 | Alcance | `/tasar/mercedes-benz-clase-c/` | Lo que pierde |
| 14 | Tucson contra Sportage al mes | 1 | Conversión | `#calculadora` | Coste real al mes |
| 15 | Model 3 contra Serie 3 | 1 | Alcance | `#calculadora` | Coste real al mes |
| 16 | Duster de GLP: ¿compensa? | 1 | Conversión | `#calculadora` | Coste real al mes |
| 17 | 3.000 € contra 15.000 € | 1 | Autoridad | `#calculadora` | Coste real al mes |
| 18 | Tienes 10.000 € | 2 | Conversión | `#asesor` | Por menos de 20.000 € |
| 19 | SUV por menos de 15.000 € | 2 | Conversión | `#asesor` | Por menos de 20.000 € |
| 20 | Automático por menos de 20.000 € | 2 | Conversión | `#asesor` | Por menos de 20.000 € |
| 21 | Eléctrico usado por menos de 20.000 € | 2 | Autoridad | `#asesor` | Por menos de 20.000 € |
| 22 | Primer coche de un novel | 10 | Conversión | `#asesor` | Por menos de 20.000 € |
| 23 | Familia con tres sillas | 10 | Autoridad | `#asesor` | Consejo |
| 24 | 30.000 km al año | 10 | Autoridad | `#calculadora` | Coste real al mes |
| 25 | Kilómetros que no cuadran | 3 | Confianza | `#tasador` | Consejo |
| 26 | El impuesto que paga el comprador | 3 | Autoridad | `#tasador` | Consejo |
| 27 | La versión y el motor (Tiguan) | 3 | Conversión | `/tasar/volkswagen-tiguan/` | ¿Chollo o caro? |
| 28 | Nunca lo veas en caliente | 3 | Alcance | `#tasador` | Consejo |
| 29 | Negociar con un número | 13 | Conversión | `#tasador` | ¿Chollo o caro? |
| 30 | ¿Chollo o caro?: Ibiza de 2019 | 13 | Conversión | `/tasar/seat-ibiza/` | ¿Chollo o caro? |
| 31 | Lo que sí y lo que no se negocia | 13 | Autoridad | `#tasador` | Consejo |
| 32 | Particular o concesionario | 6 | Autoridad | `#tasador` | Consejo |
| 33 | Fotos que restan valor | 6 | Alcance | `#tasador` | Consejo |
| 34 | El papel que te protege al vender | 6 | Confianza | `#tasador` | Consejo |
| 35 | ¿Cuándo vender? (Corsa) | 6 | Conversión | `/tasar/opel-corsa/` | Lo que pierde |
| 36 | 208 PureTech y la correa | 8 | Confianza | `/tasar/peugeot-207-y-208/` | Consejo |
| 37 | DSG en un Polo usado | 8 | Autoridad | `/tasar/volkswagen-polo/` | Consejo |
| 38 | Focus 1.0 EcoBoost | 8 | Confianza | `/tasar/ford-focus/` | Consejo |
| 39 | El FAP y la ciudad (Qashqai) | 8 | Alcance | `/tasar/nissan-qashqai/` | Consejo |
| 40 | 1 de enero y el carburante | 9 | Autoridad | `#radar` | Radar |
| 41 | Matriculaciones de noviembre | 9 | Alcance | `#radar` | Radar |
| 42 | Ayudas al eléctrico: lo aprobado | 9 | Confianza | `#radar` | Radar |
| 43 | ¿Diciembre es buen mes? | 12 | Alcance | `#radar` | Radar |
| 44 | Eléctricos de 3 años (Kona) | 12 | Conversión | `/tasar/hyundai-kona/` | ¿Chollo o caro? |
| 45 | Fin de renting (C-HR) | 12 | Conversión | `/tasar/toyota-c-hr/` | ¿Chollo o caro? |
| 46 | ¿Un diésel dura más? | 11 | Alcance | `#calculadora` | Mito o realidad |
| 47 | ¿El color cambia el precio? | 11 | Alcance | `#tasador` | Mito o realidad |
| 48 | ¿Un eléctrico siempre sale más barato? | 11 | Autoridad | `#calculadora` | Mito o realidad |
| 49 | ¿Un híbrido sin mantenimiento? | 11 | Alcance | `#calculadora` | Mito o realidad |
| 50 | ¿Me piden demasiado por un Octavia? | 14 | Conversión | `/tasar/skoda-octavia/` | Consejo |
| 51 | 150.000 km y el tasador | 14 | Confianza | `#tasador` | Consejo |
| 52 | ¿Por qué no sale mi versión? | 14 | Confianza | `#tasador` | Consejo |
| 53 | Caso: Yaris de 2018 | 15 | Conversión | `/tasar/toyota-yaris/` | ¿Cuánto vale? |
| 54 | Caso: Karoq o Ateca con 15.000 € | 15 | Conversión | `#calculadora` | Coste real al mes |
| 55 | Caso: ¿cambio mi diésel de 2012? | 15 | Autoridad | `#calculadora` | Coste real al mes |
| 56 | 4 cosas del Toyota Corolla | Historia | Alcance | `/historia/toyota-corolla/` | 4 cosas que no sabías de… |
| 57 | 4 cosas del Land Rover Defender | Historia | Alcance | `/historia/land-rover-defender/` | 4 cosas que no sabías de… |
| 58 | 4 cosas del Renault Espace | Historia | Alcance | `/historia/renault-espace/` | 4 cosas que no sabías de… |
| 59 | Museo del box: Fiat Panda | Historia | Conversión | `/tasar/fiat-panda/` | Museo del box |
| 60 | Museo del box: Mini | Historia | Autoridad | `/historia/mini/` | Museo del box |
| L1 | Lo que pierde un coche en 10 años | 4 · 5 | Conversión | 6 fichas `/tasar/` | Lo que pierde |
| L2 | Coste real al mes: 5 coches | 1 | Autoridad | `#calculadora` | Coste real al mes |
| L3 | Comprar usado: 10 pasos | 3 · 13 | Confianza | `#tasador` | Consejo |
| L4 | El asesor con 4 perfiles | 2 · 10 | Conversión | `#asesor` | Por menos de 20.000 € |
| L5 | Vender bien tu coche | 6 | Confianza | `#tasador` | Consejo |
| L6 | Motores con fama | 8 · 11 | Autoridad | fichas `/tasar/` | Mito o realidad |

**Reparto de los 60 cortos:** Alcance 15 · Autoridad 15 · Confianza 10 · Conversión 20. **Destinos:** 21 fichas `/tasar/`, 15 `#tasador`, 10 `#calculadora`, 6 `#asesor`, 4 `#radar` y 4 `/historia/`. No hay ninguna idea sin destino.
**Pilares:** 7 (5) · 4 (4) · 5 (4) · 1 (4) · 2 (4) · 10 (3) · 3 (4) · 13 (3) · 6 (4) · 8 (4) · 9 (3) · 12 (3) · 11 (4) · 14 (3) · 15 (3) · Historia (5).

---

## TOP 15 para producir primero (semana 51, del 15 al 21 de diciembre)

Están colocados en los huecos de la plantilla `2026-W51.md`. El 14 ya está programado, así que el par 14 y 15 cubre el lunes 21.

| Hueco W51 | Nº | Idea | Finalidad | Destino |
|---|---|---|---|---|
| Mar 15 · 10:00 · Mito | 48 | ¿Un eléctrico siempre sale más barato? | Autoridad | `#calculadora` |
| Mar 15 · 18:00 · Valor real | 02 | Mismo Golf, distinto motor | Conversión | `/tasar/volkswagen-golf/` |
| Mié 16 · 10:00 · Radar | 40 | 1 de enero y el carburante | Autoridad | `#radar` |
| Mié 16 · 18:00 · Mantiene valor | 09 | Dacia Sandero: cuánto pierde al año | Conversión | `/tasar/dacia-sandero/` |
| Jue 17 · 10:00 · Pregunta | 51 | 150.000 km y el tasador | Confianza | `#tasador` |
| Jue 17 · 18:00 · Comparativa | 14 | Tucson contra Sportage al mes | Conversión | `#calculadora` |
| Vie 18 · 10:00 · Historia | 59 | Museo del box: Fiat Panda | Conversión | `/tasar/fiat-panda/` |
| Vie 18 · 18:00 · Vender | 35 | ¿Cuándo vender? (Corsa) | Conversión | `/tasar/opel-corsa/` |
| Sáb 19 · 10:00 · Problema | 36 | 208 PureTech y la correa | Confianza | `/tasar/peugeot-207-y-208/` |
| Sáb 19 · 18:00 · Presupuesto | 18 | Tienes 10.000 € | Conversión | `#asesor` |
| Dom 20 · 10:00 · Caso práctico | 53 | Caso: Yaris de 2018 | Conversión | `/tasar/toyota-yaris/` |
| Dom 20 · 18:00 · Error | 27 | La versión y el motor (Tiguan) | Conversión | `/tasar/volkswagen-tiguan/` |
| Lun 21 · 10:00 | 07 | Suzuki Jimny, el que casi no baja | Alcance | `/tasar/suzuki-jimny/` |
| Lun 21 · 18:00 | 30 | ¿Chollo o caro?: Ibiza de 2019 | Conversión | `/tasar/seat-ibiza/` |
| Largo · Dom 20 | L1 | Lo que pierde un coche en 10 años | Conversión | 6 fichas `/tasar/` |

**Por qué estos:**
1. **Tráfico cualificado:** 9 de los 14 llevan a una ficha `/tasar/<modelo>/` concreta. Es la prioridad 3 del diagnóstico (conectar el vídeo con la ficha) y son páginas con intención de búsqueda comercial que ya existen. Los otros 5 llevan a herramientas: comparador, asesor, tasador y Radar.
2. **Modelos de volumen:** Golf, Sandero, Corsa, Yaris, Tiguan, Ibiza, 208 y Tucson/Sportage son coches que mucha gente tiene o busca de segunda mano, así que el clic a la ficha es probable `[OPINIÓN]`.
3. **Riesgo de verificación bajo:** casi todo sale de las fichas propias, citadas como `[ESTIMACIÓN Par Motor]`. Solo el 36 necesita verificación reforzada y el 40 hay que volver a verificarlo el mismo día. Si el 36 no tiene fuente oficial a tiempo, entra el 39 (FAP), que necesita una fuente técnica general.
4. **Confianza desde el primer día:** el 51 y el 36 cuentan límites y problemas, algo que un vendedor no haría. Encaja con «un amigo que no te quiere vender nada».
5. **Historia con puente:** el 59 mantiene la serie Museo del box, pero lleva a `/tasar/`, para medir si la historia trae visitas a fichas (criterio del README).
6. **Largo L1:** la regla dice que el largo amplía el mejor short de la semana anterior, pero la W50 es toda de historia ya programada. L1 agrupa varias fichas y es el que más enlaces a `/tasar/` reparte. Si el informe del lunes 14 dice otra cosa, se cambia por L2 o L4.

---

## TRASPASO
- **Para:** Director
- **De:** Director Creativo
- **Hecho:** `agencia/ideas/banco-inicial.md` con 60 cortos y 6 largos con ficha completa. Tiene finalidad y serie en cada idea, una tabla resumen y el TOP 15 encajado en la W51. Reparto de finalidad 15/15/10/20, los 15 pilares con 3 o más ideas cada uno y 5 de historia. Todos los destinos están comprobados en el `sitemap.xml` del 25-11-2026. Se usan las 7 series existentes y se proponen 3 nuevas: «Coste real al mes», «Mito o realidad» y «Por menos de 20.000 €».
- **Pendiente / bloqueos:**
  1. **Investigador:** verificar los «Datos a verificar» del TOP 15 antes del 7 de diciembre (fase 1 de la W51). Reforzado en el 36 (PureTech) y volver a verificar el 40 el día de publicación.
  2. **Director:** cruzar los 5 de historia (Corolla, Defender, Espace, Panda, Mini) con `getScheduledPosts` del 1 al 14 dic, porque mi lista de lo programado está incompleta.
  3. **Web/CRO:** las fichas `/historia/` enlazan solo a `#tasador` y no a su `/tasar/<modelo>/`. Comprobado en `/historia/peugeot-205/`. Para que la historia empuje a las fichas de precio, haría falta ese enlace, o el CTA del vídeo tendrá que apuntar directamente a `/tasar/`.
  4. **Comprobaciones de herramienta que condicionan ideas:** filtros del asesor (carrocería, cambio, energía, plazas: ideas 19, 20, 21 y 23), si el tasador pide color o estado (01 y 47), si el comparador distingue tipo de carga y GLP (15, 16 y 48) y si la ficha del Niro incluye las tres tecnologías (12).
  5. `preguntas-audiencia.md` está vacío: las ideas 50 a 52 salen de las FAQ de las fichas. Hay que cambiarlas por preguntas reales cuando lleguen.
- **Riesgos:** las ideas 36 a 38 (problemas mecánicos) no se graban sin una fuente oficial. La 42 (ayudas) tiene cifras contradictorias en prensa (5.000 y 5.500 €), así que solo vale con IDAE o BOE.
- **Sin publicar ni programar nada.**
