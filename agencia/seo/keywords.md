# Mapa de palabras clave: Par Motor

Versión 1. Hecho el 26 de noviembre de 2026 por el especialista SEO. Ronda 1.

## Cómo se ha hecho y qué NO hay

- **No hay herramienta de volúmenes conectada.** Ninguna consulta lleva un volumen numérico. La columna «Demanda» es una **[ESTIMACIÓN: método SERP]** relativa (Alta / Media / Baja) que se basa en qué tipo de webs compiten por la consulta: si ocupan el top portales grandes (coches.com, Wallapop, Autohero, Motor.es) y aseguradoras o bancos, se toma como señal de demanda alta. **No es un volumen.** Se sustituye por las impresiones reales en cuanto el dueño exporte Search Console (ver `plan-90-dias.md`, apartado A).
- Fuentes: resultados de búsqueda en España consultados el 26 de noviembre de 2026 (ver `competencia.md`), las preguntas frecuentes que ya tienen las fichas y la estructura real de la web, rastreada el 25 y 26 de noviembre de 2026.
- **Criterio de prioridad:** primero la intención comercial (alguien que está a punto de comprar o vender), después el volumen. P1 = atacar en los próximos 30 días; P2 = entre 30 y 90 días; P3 = después de 90 días o solo si Search Console demuestra demanda.
- `<modelo>` significa que el patrón se repite en las 396 fichas. Cuenta como un grupo, pero en la tabla se dan ejemplos reales de fichas que existen.

## Resumen por plantilla

| Plantilla | URL | Intención dominante | Estado |
|---|---|---|---|
| Ficha de precio | `/tasar/<modelo>/` | Comercial y transaccional (comprar o vender un modelo concreto) | Existe (396) |
| Índice de precios | `/tasar/` | Comercial genérica | Existe |
| Portada y tasador | `/` + `#tasador` | Transaccional (tasar mi coche) | Existe, pero el tasador es un ancla dentro de una portada de unos 350 KB |
| Comparador de coste real | `#calculadora` | Comercial e informativa | Solo es un ancla: **no tiene URL propia que se pueda posicionar** |
| Asesor de compra | `#asesor` | Comercial (qué coche compro con X €) | Solo es un ancla: **no tiene URL propia** |
| Artículos nuevos | `/guias/…`, `/comparar/…`, `/mejores-coches/…` (propuestos) | Comercial e informativa | No existen |
| Radar | `#radar` | Informativa (actualidad del mercado) | Sin URL por número: no es citable ni indexable por separado |
| Historia | `/historia/<modelo>/` | Informativa y nostálgica | Existe (62 + índice) |

---

## 1. Transaccional: quiere un precio ya, para su coche

| # | Consulta | Demanda [ESTIMACIÓN: SERP] | Página objetivo | Estado | Prioridad | Nota |
|---|---|---|---|---|---|---|
| 1 | tasar coche gratis | Alta | `/` (tasador) → propuesta `/tasador/` | Existe como ancla | P1 | SERP: motor.es, coches.com, Autonocion, OcasionPlus, Flexicar, BBVA, Renault |
| 2 | tasar coche online sin registro | Media | `/tasador/` (nueva URL propia del tasador) | Nueva | P1 | Ventaja real: «el cálculo se hace en tu móvil, no se envía nada» |
| 3 | tasación coche gratis sin datos personales | Baja | `/tasador/` | Nueva | P1 | Hueco: la mayoría de tasadores son captación para comprar el coche |
| 4 | cuánto vale mi coche | Alta | `/tasador/` | Nueva | P1 | |
| 5 | cuánto vale mi coche sin dar el teléfono | Baja | `/tasador/` + FAQ | Nueva | P2 | Variante de cola larga. Confirmar con Search Console |
| 6 | valorar coche usado gratis | Media | `/tasador/` | Nueva | P1 | |
| 7 | tasador de coches de segunda mano | Media | `/tasador/` | Nueva | P1 | |
| 8 | precio de mi coche por kilómetros y año | Baja | `/tasador/` | Nueva | P2 | |
| 9 | tasar <modelo> (p. ej. «tasar seat león») | Media por grupo | `/tasar/<modelo>/` | Existe | P1 | El slug ya es `/tasar/`. Falta que el texto diga «tasar» |
| 10 | cuánto me dan por mi <modelo> | Baja por modelo | `/tasar/<modelo>/` | Existe | P2 | Cuidado con la marca: Par Motor no compra. Se responde con «precio de mercado orientativo» |
| 11 | precio venta <modelo> particular | Baja | `/tasar/<modelo>/` | Existe | P2 | |
| 12 | valor venal coche | Media | `/guias/valor-venal-coche/` | Nueva | P3 | Informativa con salida al tasador. Verificar la definición legal antes de escribir |

## 2. Comercial: compara antes de comprar o vender

### 2a. Ficha de modelo `/tasar/<modelo>/` (núcleo, unas 396 páginas)

| # | Consulta | Demanda [ESTIMACIÓN: SERP] | Página objetivo | Estado | Prioridad | Nota |
|---|---|---|---|---|---|---|
| 13 | precio <modelo> segunda mano | Alta por grupo | `/tasar/<modelo>/` | Existe | P1 | Está en el title. SERP dominado por listados de anuncios (ver competencia) |
| 14 | precio seat león segunda mano | Alta | `/tasar/seat-leon/` | Existe | P1 | Compiten Motor.es, Wallapop, coches.com, Carnovo, quecochemecompro, AutoUncle, OcasionPlus |
| 15 | cuánto vale un dacia sandero de segunda mano | Alta | `/tasar/dacia-sandero/` | Existe | P1 | El H1 coincide con la consulta |
| 16 | precio volkswagen golf segunda mano | Alta | `/tasar/volkswagen-golf/` | Existe | P1 | |
| 17 | precio toyota corolla segunda mano | Alta | `/tasar/toyota-corolla-y-auris/` | Existe | P1 | Ojo: el slug es `corolla-y-auris`. `/tasar/toyota-corolla/` da 404. Valorar una redirección o enlazar con texto «Toyota Corolla» |
| 18 | precio seat ibiza segunda mano | Alta | `/tasar/seat-ibiza/` | Existe | P1 | Tiene ficha de historia enlazada |
| 19 | precio tesla model 3 segunda mano | Media | `/tasar/tesla-model-3/` | Existe | P1 | Falta una FAQ sobre batería (ver 2d) |
| 20 | precio mazda mx-5 segunda mano | Media | `/tasar/mazda-mx-5/` | Existe | P2 | |
| 21 | precio renault clio segunda mano | Alta | `/tasar/renault-clio/` | Existe | P1 | |
| 22 | precio peugeot 208 segunda mano | Alta | `/tasar/peugeot-207-y-208/` | Existe | P1 | Slug combinado: el title dice «207 y 208». Comprobar en Search Console si rinde peor que una ficha de un solo modelo |
| 23 | precio hyundai tucson segunda mano | Media | `/tasar/hyundai-tucson/` | Existe | P2 | |
| 24 | precio kia sportage segunda mano | Media | `/tasar/kia-sportage/` | Existe | P2 | |
| 25 | precio nissan qashqai segunda mano | Alta | `/tasar/nissan-qashqai/` | Existe | P1 | |
| 26 | <modelo> segunda mano opiniones | Media por grupo | `/tasar/<modelo>/` (FAQ) | Existe parcial | P3 | No inventar opiniones. Solo hechos con fuente |
| 27 | cuánto valor pierde un <modelo> al año | Baja por modelo | `/tasar/<modelo>/` (FAQ) | Existe (FAQ en unas 4 de cada 5 fichas, muestra) | P1 | AutoUncle muestra «pierde X € al mes». Par Motor tiene el dato propio |
| 28 | qué motores del <modelo> dan problemas | Media por grupo | `/tasar/<modelo>/` (FAQ) | Existe en algunas (p. ej. Seat León) | P1 | SERP: Opinautos, Rastreator, au7o, Autohero. Exige fuente en cada afirmación |
| 29 | cómo saber si me piden demasiado por un <modelo> | Baja | `/tasar/<modelo>/` (FAQ) | Existe | P1 | La mejor FAQ comercial: es justo para lo que sirve la ficha |
| 30 | <modelo> km normales por año | Baja | `/tasar/<modelo>/` (columna «Km normales») | Existe | P3 | |
| 31 | precio <modelo> <año> segunda mano (p. ej. «seat león 2018 precio») | Media por grupo | `/tasar/<modelo>/` (ancla por año en la tabla) | Existe parcial | P2 | Añadir `id` por año en la tabla, sin crear páginas por año (serían páginas en masa de poco valor) |
| 32 | precio <modelo> diésel / gasolina / híbrido segunda mano | Media por grupo | `/tasar/<modelo>/` (columnas por motor) | Existe parcial | P3 | Las columnas de la tabla ya son motores |

### 2b. Índice y marcas

| # | Consulta | Demanda [ESTIMACIÓN: SERP] | Página objetivo | Estado | Prioridad | Nota |
|---|---|---|---|---|---|---|
| 33 | precios coches segunda mano por modelo | Media | `/tasar/` | Existe | P1 | |
| 34 | guía de precios coches usados | Media | `/tasar/` | Existe | P1 | Autofácil tiene una «guía de precios definitiva». La tabla GANVAM es solo para asociados (ver competencia) |
| 35 | tabla ganvam gratis | Baja a media | `/guias/tabla-ganvam-alternativa/` | Nueva | P2 | Explicar qué es GANVAM/Eurotax sin decir que somos equivalentes, y ofrecer el precio orientativo |
| 36 | precio seat segunda mano (marca) | Media | `/tasar/marca/seat/` | Nueva | P2 | Solo para unas 15 marcas con datos propios (rango por modelo). No para las cerca de 60 marcas |
| 37 | precio toyota segunda mano | Media | `/tasar/marca/toyota/` | Nueva | P2 | Igual que la anterior |
| 38 | coches segunda mano baratos | Alta | `/mejores-coches-segunda-mano/` (hub) | Nueva | P2 | Muy dominado por portales de anuncios. Se ataca por la vía del «cuál comprar», no del listado |

### 2c. Presupuesto: asesor de compra y artículos

| # | Consulta | Demanda [ESTIMACIÓN: SERP] | Página objetivo | Estado | Prioridad | Nota |
|---|---|---|---|---|---|---|
| 39 | mejores coches de segunda mano por menos de 10.000 euros | Alta | `/mejores-coches-segunda-mano/menos-de-10000/` | Nueva | P1 | SERP: Wallapop, Autohero, OcasionPlus, Motor16, Motor1, quecochemecompro, Autofácil. Casi todo listas sin coste de uso |
| 40 | mejores coches segunda mano por menos de 5.000 euros | Media | `/mejores-coches-segunda-mano/menos-de-5000/` | Nueva | P1 | |
| 41 | coches por menos de 15.000 euros segunda mano | Media | `/mejores-coches-segunda-mano/menos-de-15000/` | Nueva | P2 | |
| 42 | mejor coche segunda mano por 20.000 euros | Media | `/mejores-coches-segunda-mano/menos-de-20000/` | Nueva | P1 | Coincide con el valor por defecto del asesor (20.000 €) |
| 43 | qué coche me compro | Alta | `/asesor/` (URL propia del asesor) | Nueva | P2 | quecochemecompro ocupa la marca exacta. Se ataca con variantes |
| 44 | qué coche comprar según mi presupuesto | Media | `/asesor/` | Nueva | P1 | |
| 45 | mejor suv segunda mano barato | Media | `/mejores-coches-segunda-mano/suv/` | Nueva | P2 | |
| 46 | mejor coche familiar segunda mano | Media | `/mejores-coches-segunda-mano/familiar/` | Nueva | P3 | |
| 47 | mejor coche para ciudad segunda mano | Media | `/mejores-coches-segunda-mano/ciudad/` | Nueva | P3 | |
| 48 | coche eléctrico segunda mano merece la pena | Media | `/guias/comprar-electrico-segunda-mano/` | Nueva | P2 | La OCU, citada por la prensa, habla de una fuerte devaluación de los eléctricos. Verificar la fuente original |

### 2d. Comparativas «X o Y» (plantilla `/comparar/x-vs-y/`)

Solo se hacen los pares que tienen evidencia en el buscador o en Search Console. **No se generan todas las combinaciones.**

| # | Consulta | Demanda [ESTIMACIÓN: SERP] | Página objetivo | Estado | Prioridad | Nota |
|---|---|---|---|---|---|---|
| 49 | seat ibiza o volkswagen polo segunda mano | Media | `/comparar/seat-ibiza-vs-volkswagen-polo/` | Nueva | P1 | SERP: Autohero, carwow, Mapfre, quecochemecompro, Motor1 (de 2017) y webs de Reino Unido. Nadie compara el coste al mes |
| 50 | seat león o volkswagen golf usado | Media [ESTIMACIÓN: patrón análogo, sin comprobar] | `/comparar/seat-leon-vs-volkswagen-golf/` | Nueva | P2 | Comprobar el SERP antes del brief |
| 51 | dacia sandero o renault clio | Media [sin comprobar] | `/comparar/dacia-sandero-vs-renault-clio/` | Nueva | P2 | |
| 52 | toyota corolla o seat león | Baja [sin comprobar] | `/comparar/toyota-corolla-vs-seat-leon/` | Nueva | P3 | Híbrido frente a gasolina o diésel: encaja con el comparador de coste |
| 53 | nissan qashqai o kia sportage segunda mano | Media [sin comprobar] | `/comparar/nissan-qashqai-vs-kia-sportage/` | Nueva | P2 | |
| 54 | híbrido o diésel segunda mano | Media | `/guias/hibrido-o-diesel-segunda-mano/` | Nueva | P2 | Encaja con el comparador de coste real |

### 2e. Depreciación y coste real (comparador)

| # | Consulta | Demanda [ESTIMACIÓN: SERP] | Página objetivo | Estado | Prioridad | Nota |
|---|---|---|---|---|---|---|
| 55 | coches que menos se deprecian | Alta | `/coches-que-menos-se-deprecian/` | Nueva | P1 | SERP: coches.com, highmotor, Autofácil, Mapfre, hibridosyelectricos y un Diariomotor antiguo. **Recurso citable con datos propios** |
| 56 | coches que más se devalúan | Media | `/coches-que-menos-se-deprecian/` (sección) | Nueva | P1 | La misma página con las dos listas |
| 57 | cuánto se devalúa un coche al año | Media | `/guias/cuanto-se-devalua-un-coche/` | Nueva | P2 | Autohero ocupa esta consulta |
| 58 | cuánto cuesta mantener un coche al mes | Alta | `/coste-real/` (URL propia del comparador) | Nueva | P1 | SERP: RACE, Bankinter, Acierto, N26, Autohero, Motor16. **Son artículos, no calculadoras interactivas para España** (lo observado en los resultados) |
| 59 | calculadora coste coche al mes | Media | `/coste-real/` | Nueva | P1 | Hueco claro |
| 60 | cuánto cuesta tener un coche al año en España | Media | `/coste-real/` | Nueva | P1 | |
| 61 | coste por kilómetro coche | Baja | `/coste-real/` (FAQ) | Nueva | P2 | |
| 62 | cuánto cuesta mantener un <modelo> | Baja por modelo | `/tasar/<modelo>/` (bloque «Compara su coste real») | Existe parcial | P2 | Hoy es un enlace al comparador. Mostrar una cifra orientativa en la ficha si el modelo de datos lo permite |
| 63 | coche eléctrico o gasolina qué sale más barato | Media | `/coste-real/` + guía | Nueva | P2 | |

## 3. Informativa con salida comercial

| # | Consulta | Demanda [ESTIMACIÓN: SERP] | Página objetivo | Estado | Prioridad | Nota |
|---|---|---|---|---|---|---|
| 64 | itp coche segunda mano cómo se calcula | Alta | `/guias/itp-coche-segunda-mano/` | Nueva | P2 | Lo ocupan TaxDown, Autohero, las administraciones autonómicas y la prensa. Datos solo del BOE o de la web autonómica. Es YMYL fiscal: máximo rigor |
| 65 | valor fiscal coche hacienda | Media | `/guias/itp-coche-segunda-mano/` (sección) | Nueva | P2 | Explicar la diferencia entre valor fiscal y precio de mercado: lleva de forma natural al tasador |
| 66 | cómo saber si un coche usado está bien de precio | Media | `/guias/como-saber-si-un-coche-usado-esta-caro/` | Nueva | P1 | La intención es la de las fichas: la guía enlaza a las 396 |
| 67 | qué revisar al comprar un coche de segunda mano | Alta | `/guias/revisar-coche-segunda-mano/` | Nueva | P3 | Muy competida. Solo si aporta (lista imprimible) |
| 68 | cuántos km son muchos para un coche usado | Media | `/guias/kilometros-coche-usado/` | Nueva | P2 | Par Motor tiene la columna «Km normales» por año: dato propio |
| 69 | precio medio coche usado España 2026 | Media | Radar (número con URL propia) | Nueva URL | P2 | Barómetro de coches.com y GANVAM. Citar la fuente, no copiar |
| 70 | mercado coches de ocasión noviembre 2026 | Baja | Radar (número con URL propia) | Nueva URL | P2 | Cada número del Radar, en su propia URL |

## 4. Historia `/historia/<modelo>/` (informativa y de marca)

Tráfico de baja intención comercial. Su papel SEO es **dar enlaces y contexto a las fichas `/tasar/`**, y servir de destino de los shorts.

| # | Consulta | Demanda [ESTIMACIÓN: SERP] | Página objetivo | Estado | Prioridad | Nota |
|---|---|---|---|---|---|---|
| 71 | historia del <modelo> (p. ej. «historia seat ibiza») | Baja a media | `/historia/seat-ibiza/` | Existe | P2 | Cada ficha ya tiene un H2 «¿Cuánto vale hoy un X?», que es el puente comercial correcto |
| 72 | curiosidades <modelo> | Baja | `/historia/<modelo>/` | Existe | P3 | Encaja con el formato «4 cosas que no sabías» de los shorts |
| 73 | historia de seat / toyota / bmw (marca) | Media | `/historia/historia-de-<marca>/` | Existe (9) | P3 | Hoy enlazan a 1 sola URL de `/tasar/`. Deberían llevar a los modelos de la marca |
| 74 | cuánto vale un porsche 911 clásico | Baja | `/historia/porsche-911/` → `/tasar/porsche-911/` | Existe | P3 | Ojo: el tasador cubre hasta 100.000 km y años recientes. No prometer precio de clásicos |

---

**Total: 74 consultas.** 30 apuntan a páginas que ya existen, del todo o en parte; 44 necesitan una URL nueva, contando las URLs propias para el tasador, el comparador y el asesor. Las de tipo `<modelo>` representan patrones que se repiten en las 396 fichas.

## Reglas de uso para el resto de la agencia

- **Guionista:** si un short trata de un modelo que tiene ficha `/tasar/`, el CTA nombra la consulta comercial («cuánto vale hoy un X de segunda mano») y lleva a esa ficha.
- **Web/CRO:** no crear URLs nuevas sin que estén en esta tabla o en `plan-90-dias.md`.
- **Nadie** usa «tasación oficial», «te lo compramos» ni «valor garantizado» en titles ni metas (ver `agencia/marca.md`).
