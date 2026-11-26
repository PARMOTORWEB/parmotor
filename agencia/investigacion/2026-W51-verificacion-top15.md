# Verificación del TOP 15 (semana 51, 15-21 dic 2026)

Verificado por el Investigador el 26-11-2026. Origen: `agencia/ideas/banco-inicial.md`, sección «TOP 15». Todas las fuentes se consultaron el **26-11-2026**. Base URL de las fichas: `https://parmotorweb.github.io/parmotor/`.

Convenciones: las cifras de las fichas son `[ESTIMACIÓN Par Motor, ficha X, consultada 26-11-2026]`. Redondeo a 100 €. Las tablas suponen buen estado y km normales para la edad (15.000 al año en gasolina, híbrido y eléctrico; 20.000 en diésel; **máximo 100.000 km**). Por eso la fila de un coche de 2019 o anterior es siempre «a 100.000 km».

## Avisos que afectan a varios guiones

1. **Precios de 2026 por encima del precio de nuevo.** En varias fichas el usado de 2026 (5.000 km) sale más caro que el nuevo de la propia ficha: Sandero III 1.0 SCe 11.700 € frente a 11.000 € nuevo; Jimny 22.500 € frente a 21.000 €; Panda III 1.2 11.000 € frente a 10.500 €; Corsa F 1.2 15.900 € frente a 15.500 €; Tiguan III 1.5 eTSI 38.600 € frente a 37.000 €. Es coherente con el método («precio de nuevo de la época pasado a euros de hoy») y con la subida de precios, pero **no se debe decir «un usado de 2026 cuesta más que el nuevo»** sin matizarlo. Para los guiones, mejor usar 2025 o años anteriores. Aviso para Web/CRO: revisar las filas de 2026.
2. **El tasador y las fichas tienen un límite de 100.000 km** `[CONFIRMADO: portada, «Solo tasamos coches de hasta 100.000 km»]`.
3. **Comparador (`#calculadora`) no consultable por WebFetch.** La página pide elegir dos coches y no muestra resultado por defecto. Hay que calcularlo a mano en el navegador el día de grabación.
4. **Comparador: campos reales** (lectura de la portada): intercambiar A↔B, años que lo tendrás, km al año, edad del conductor (18–24, 25–29, 30+), precio de gasolina 95, gasolina 98, gasóleo y electricidad (€/kWh). **No hay campo de GLP ni selector «carga en casa / fuera».** Los campos aparecían sin valores en mi lectura, así que hay que anotar qué precios usa por defecto. Partidas: depreciación, combustible, seguro, mantenimiento, neumáticos e impuestos, a 4 años según la nota del asesor.

---

## 48 · ¿Un eléctrico siempre sale más barato? (`#calculadora`)

| Dato | Veredicto | Versión correcta para guion | Fuente | Fecha |
|---|---|---|---|---|
| El comparador distingue carga en casa y fuera | **FALSO** | No hay selector de dónde cargas. Solo hay un campo de **precio de la electricidad (€/kWh)**. Se simula «casa» y «calle» cambiando ese precio. Hay que decirlo así: «Cambia el precio del kWh y mira el resultado». El desarrollo (1. Carga en casa, 2. Carga en la calle) sigue valiendo con dos pasadas del comparador | Portada `#calculadora` | 26-11-2026 |
| Precios de electricidad usados | **NO VERIFICABLE** | No se ve qué valor trae por defecto el comparador. Hay que mirarlo en pantalla y anotarlo con fecha. Cifras de contexto, solo ilustrativas: hora valle unos 0,07 €/kWh y hora punta unos 0,32 €/kWh (18-nov) `[ESTIMACIÓN: cálculo propio del otro investigador, ver 2026-11-mercado.md, sec. 5]`. Yo no las he comprobado en la fuente | `agencia/investigacion/2026-11-mercado.md` | 26-11-2026 |
| «Depende de la depreciación» | **CONFIRMADO** (con fuente propia) | Ficha del Renault Zoe: pierde «en torno al 12 % al año» (R110, Zoe II), frente al 3-7 % de las fichas leídas (Jimny 3 %, Sandero 4 %, Yaris 5 %, Golf y Ibiza 6 %, Corsa, 208, Tucson, Sportage y Clase C 7 %). Zoe II R110: 30.000 € nuevo y 10.500 € de 2019 a 100.000 km `[ESTIMACIÓN Par Motor, ficha Renault Zoe]`. Es un caso, no «todos los eléctricos» | `tasar/renault-zoe/` | 26-11-2026 |
| Contexto externo (el eléctrico se deprecia más) | **MATIZAR** | Solo atribuido: según un estudio de carVertical publicado por Autofácil, el Nissan Leaf pierde un 63,6 % a 5 años. No explica metodología (ver W48, fila 4). Mejor usar solo la ficha | https://www.autofacil.es/coches-que-mas-se-deprecian-espana-2026/ | 25-11-2026 (de W48) |

**Veredicto de la idea: LISTA CON CAMBIOS.** Cambiar «casa / calle» por «precio del kWh». Cifra del resultado: **a calcular en el comparador**.
Supuestos para `#calculadora`: coche A = un eléctrico (p. ej. Renault Zoe R135 2022, ficha) y coche B = un gasolina equivalente de la base (p. ej. Clio o 208 1.2 PureTech); años 4; km al año 15.000; edad 30+. Pasada 1: kWh barato (hora valle, ~0,07 €). Pasada 2: kWh caro (carga pública, a decidir con fuente). Gasolina 95 con la media de MITECO vigente el día (23-nov: 1,548 €/l, ver W48). Anotar los dos resultados y la fecha.

---

## 02 · Mismo Golf, distinto motor (`/tasar/volkswagen-golf/`)

| Dato | Veredicto | Versión correcta para guion | Fuente | Fecha |
|---|---|---|---|---|
| Versiones y precios del Golf del mismo año | **CONFIRMADO** | Rango de la ficha: 4.700 a 37.500 €. Depreciación en torno al 6 % anual. **Mejor par para el gancho: Golf VII.5 de 2019 a 100.000 km: 1.0 TSI 115 CV 13.000 €, 1.6 TDI 115 CV 16.000 € y GTE 204 CV 21.200 €** (entre el TSI y el GTE hay 8.200 €; entre el TSI y el TDI, 3.000 €) | `tasar/volkswagen-golf/` | 26-11-2026 |
| Alternativa con coche más reciente | **CONFIRMADO** | Golf VIII de 2023 (50.000 km): 1.0 eTSI 22.000 €, 2.0 TDI 23.500 €, eHybrid 29.300 € (7.300 € de diferencia entre eTSI y eHybrid) | Igual | 26-11-2026 |
| «Golf de 2019 no es un precio» | **CONFIRMADO** | Gancho: «Dos Golf del mismo año de 2019. Entre uno y otro hay 8.200 €». Precisar que el GTE es un híbrido enchufable, no solo «otro motor». El resultado es un precio orientativo, no una tasación | Igual | 26-11-2026 |

**Veredicto: LISTA PARA GUION.**

---

## 40 · 1 de enero y el carburante (`#radar`)

| Dato | Veredicto | Versión correcta para guion | Fuente | Fecha |
|---|---|---|---|---|
| Rebaja del Impuesto sobre Hidrocarburos que termina el 31-12-2026 | **CONFIRMADO** | Hacienda: las medidas «se prorrogan hasta el 31 de diciembre de este año» (nota del 29-09-2026) | https://www.hacienda.gob.es/es-ES/Prensa/Noticias/paginas/2026/20260929-np-cm-medidas-fiscales.aspx | 26-11-2026 |
| «RDL 25/2026» | **MATIZAR** | La nota de Hacienda dice solo «un Real Decreto-ley» y no da el número. El «25/2026» viene de W48 y yo no lo he reconfirmado en el BOE. Decir «un real decreto-ley de septiembre de 2026» hasta confirmarlo en el BOE | Nota de Hacienda (arriba) | 26-11-2026 |
| «Hasta 20 céntimos por litro antes de IVA» | **MATIZAR** | Base de Hacienda: 20 céntimos en octubre, 13 en noviembre y 6 en diciembre. Con una cláusula de salvaguarda del IPC (umbral del 15 % interanual) se mantienen 20 céntimos. La nota ya no confirma por sí misma cuánto es en diciembre: depende del IPC de octubre y **no he visto la confirmación en BOE ni INE**. Fórmula segura: «una rebaja de hasta 20 céntimos por litro en el impuesto, que de momento termina el 31 de diciembre». Nunca «20 céntimos más barato en el surtidor» (va antes de IVA) | Nota de Hacienda · W48 fila 2d | 26-11-2026 |
| «A fecha de hoy no hay nada aprobado para 2027» | **CONFIRMADO a 26-11-2026** | Una búsqueda específica no encuentra ninguna prórroga ni decisión del Consejo de Ministros para el carburante. Con las elecciones del 29-11, la situación puede cambiar. Lo que sí hay para 2027 es otra cosa (impuesto a la producción eléctrica, tope de la bombona de butano) y **no se debe mezclar** | Búsqueda del 26-11-2026; ver `2026-11-mercado.md` sec. 1 y 6 | 26-11-2026 |
| Precio de la gasolina y del gasóleo | **CADUCA** | Última referencia verificada: 23-nov, gasolina 95 a 1,548 €/l y gasóleo a 1,781 €/l (MITECO vía Demócrata, W48). Poner siempre la fecha | W48 filas 2a y 2b · Radar Nº 02 | 26-11-2026 |

**Veredicto: LISTA CON CAMBIOS** y **hay que volver a verificarla el día de publicación (16-12)**: prórroga, cuantía de diciembre (IPC de octubre en el INE, Orden/BOE) y precios MITECO del día. Si hay prórroga, el guion cambia de «¿y después?» a «qué se ha aprobado».

---

## 09 · Dacia Sandero: cuánto pierde al año (`/tasar/dacia-sandero/`)

| Dato | Veredicto | Versión correcta para guion | Fuente | Fecha |
|---|---|---|---|---|
| «Un Sandero usado va de 3.300 a 11.600 €» | **FALSO** (el máximo) | La ficha dice **de 3.300 € a 13.800 €**. El mínimo es el 1.2 de 2008 (3.300 € a 100.000 km). El máximo es el 1.0 ECO-G (GLP) 100 CV de 2026 (13.800 € a 5.000 km). El 11.600 no aparece en la ficha. Gancho: «Un Sandero usado va de 3.300 a 13.800 € según nuestro tasador» | `tasar/dacia-sandero/` | 26-11-2026 |
| Depreciación del 4 % anual | **CONFIRMADO** | «Unos 4 % al año», calculado sobre el 1.0 SCe del Sandero III. La caída es mayor al principio y se acelera a partir de 70.000 km | Igual | 26-11-2026 |
| Tres generaciones y GLP | **CONFIRMADO** | Sandero I (2008-2012), II (2012-2020) y III (2020-hoy). El GLP es el 1.0 ECO-G 100 CV: 13.000 € nuevo; 12.600 € de 2025 (20.000 km); 9.400 € de 2020 (95.000 km) | Igual | 26-11-2026 |
| Mínimo «1.2 de 2008» / máximo «1.0 SCe de 2026» | **MATIZAR** | El mínimo es correcto. El máximo no es el 1.0 SCe (11.700 €) sino el ECO-G (13.800 €) | Igual | 26-11-2026 |

**Veredicto: LISTA CON CAMBIOS** (corregir el 11.600 por 13.800 y el motor del máximo). Mejor no apoyarse en 2026 (ver aviso 1).

---

## 51 · 150.000 km y el tasador (`#tasador`)

| Dato | Veredicto | Versión correcta para guion | Fuente | Fecha |
|---|---|---|---|---|
| El tasador funciona hasta 100.000 km | **CONFIRMADO** | Portada: «Solo tasamos coches de hasta 100.000 km». «Cómo calculamos»: «Solo coches de hasta 100.000 km» | Portada `#tasador` y «Cómo calculamos» | 26-11-2026 |
| Motivo del límite | **CONFIRMADO** (literal de la web) | «A partir de ahí el precio cae mucho y depende demasiado del historial de cada coche». Se puede citar tal cual | Igual | 26-11-2026 |
| Qué hace el tasador con más km | **NO VERIFICABLE** | Es interactivo y no lo he probado. La página no ofrece una tasación alternativa. Hay que probarlo en el navegador (¿bloquea o avisa?) antes de grabar | Igual | 26-11-2026 |
| «Usa la ficha como techo orientativo» | **MATIZAR** | La web no lo recomienda. Es una deducción del método: las fichas de coches de más de unos 6-7 años están calculadas **a 100.000 km** y el método añade una caída extra desde 70.000 km, así que con 150.000 km lo razonable es esperar un precio menor que el de la ficha `[OPINIÓN: Investigador, deducido de «Cómo calculamos»]`. Decir: «El precio de la ficha es para 100.000 km; con más, espera menos». Sin cifras de descuento | Igual | 26-11-2026 |
| «Comparar anuncios similares» | **MATIZAR** | Consejo general. Si se dice, aclarar que los anuncios son precios pedidos, no de venta | Criterio de fuentes de la marca | 26-11-2026 |

**Veredicto: LISTA CON CAMBIOS.** Enfoque: «hasta 100.000 km, sí; más, no, y te explicamos por qué», con el límite literal de la web. El «techo orientativo» solo con el matiz de arriba.

---

## 14 · Tucson contra Sportage al mes (`#calculadora`)

| Dato | Veredicto | Versión correcta para guion | Fuente | Fecha |
|---|---|---|---|---|
| Comparten base técnica y motores | **MATIZAR** (fuente débil) | Prensa técnica indica que el Tucson NX4 y el Sportage NQ5 usan la plataforma N3 de Hyundai-Kia y el 1.6 T-GDi. Las fuentes que encontré son comparativas, no del fabricante, y no consulté Km77 ni nota de Hyundai/Kia. Para el guion: «según [fuente], comparten plataforma» solo con Km77 o la marca; si no, «son primos: ambos del grupo Hyundai-Kia» (hecho de público conocimiento, con la fuente oficial pendiente) | https://www.auto-motor-und-sport.de/marken-modelle/kia/sportage/typ-nq5/ (no he leído la página entera) · https://carvago.com/articles/car-battle/hyundai-tucson-vs-kia-sportage | 26-11-2026 |
| Precios de las fichas (apoyo) | **CONFIRMADO** | Ambos pierden «unos 7 % al año» (ficha). 1.6 T-GDi 150 CV: nuevo 31.000 € (Tucson) y 30.000 € (Sportage). De 2023 (50.000 km): Tucson 23.800 €, Sportage 23.100 €. De 2022 (65.000 km): 22.200 € y 21.500 €. HEV 230 CV de 2024: Tucson 32.000 €, Sportage 31.100 €. Rangos: Tucson 5.200-40.100 €; Sportage 4.900-39.000 € | `tasar/hyundai-tucson/` · `tasar/kia-sportage/` | 26-11-2026 |
| Coste al mes de cada uno | **A CALCULAR EN EL COMPARADOR** | No inventar cifra. Supuestos a introducir: coche A = Hyundai Tucson NX4 1.6 T-GDi 150 CV (2023, 50.000 km); coche B = Kia Sportage V 1.6 T-GDi 150 CV (2023, 50.000 km); años 4; km al año 15.000; edad 30+; gasolina 95 con el precio que traiga por defecto o 1,548 €/l del 23-nov (anotar cuál). Repetir con el HEV 230 CV si se quiere una segunda pasada. Anotar el desglose por partida y la fecha | `#calculadora` | 26-11-2026 |

**Veredicto: LISTA CON CAMBIOS.** Falta la cifra del comparador y una fuente sólida de «plataforma compartida». Si no llega, quitar el paso 1 del desarrollo o decir «dos SUV muy parecidos» (opinión).

---

## 59 · Museo del box: Fiat Panda (`/tasar/fiat-panda/`)

| Dato | Veredicto | Versión correcta para guion | Fuente | Fecha |
|---|---|---|---|---|
| Lanzamiento en 1980, diseño de Giugiaro | **CONFIRMADO** (fuente propia) | La ficha de historia dice 1980 y Giorgetto Giugiaro. Sin otra fuente externa leída | `historia/fiat-panda/` | 26-11-2026 |
| Dos datos de la historia | **CONFIRMADO** (fuente propia) | El asiento trasero podía convertirse en una especie de cama; existió el Panda 4x4; en España, SEAT fabricó su versión (SEAT Marbella). La ficha no cita cifras | Igual | 26-11-2026 |
| Rango del Panda actual | **CONFIRMADO** | De 2.600 € (Panda II 1.1 de 2003) a 22.200 € (Grande Panda eléctrico de 2026). Panda III 1.2 69 CV de 2025 (20.000 km): 9.600 €; de 2019 (100.000 km): 6.300 €. No se da la depreciación anual (la ficha dice que la caída mayor es la del primer año, de 11.000 a 9.600 €) | `tasar/fiat-panda/` | 26-11-2026 |
| «Del Panda de 1980 al de hoy» | **MATIZAR** | La ficha de precio **no incluye el Panda original de 1980** (empieza en el Panda II, 2003). El guion debe decir «el Panda moderno» y no sugerir que se tasa el clásico. El 2026 sale sobre el precio de nuevo (aviso 1) | Igual | 26-11-2026 |

**Veredicto: LISTA CON CAMBIOS.** Usar 2025 o años anteriores en pantalla. Fuente externa opcional (Fiat) si el guion añade más historia.

---

## 35 · ¿Cuándo vender? (Corsa) (`/tasar/opel-corsa/`)

| Dato | Veredicto | Versión correcta para guion | Fuente | Fecha |
|---|---|---|---|---|
| La curva de la ficha tiene saltos | **CONFIRMADO** | No es lineal: la ficha cae «unos 7 % al año», pero el Corsa F 1.2 75 CV baja de **15.900 € (2026, 5.000 km) a 13.500 € (2025, 20.000 km)**, es decir, **−2.400 € (−15 %)**. Después: 12.500, 11.600, 10.800, 9.600, 8.400 y 7.900 € de 2024 a 2019 | `tasar/opel-corsa/` | 26-11-2026 |
| «Hay un año en el que baja más» | **MATIZAR** | Sí, el primer año. Pero la curva mezcla antigüedad y kilometraje (5.000 km frente a 20.000 km), y el 2026 está por encima del precio de nuevo (15.500 €). Gancho honesto: «El primer año es el que más se nota en el precio» | Igual | 26-11-2026 |
| Cambio de generación como causa | **NO VERIFICABLE** | La ficha no lo dice. Corsa F 1.2 de 2019 (100.000 km): 7.900 €; Corsa E 1.2 de 2019: 6.100 €. Eso no es depreciación. Omitir la causa o buscar fuente de prensa | Igual | 26-11-2026 |

**Veredicto: LISTA CON CAMBIOS** (reformular a «el primer año» y sin causa).

---

## 36 · 208 PureTech y la correa (`/tasar/peugeot-207-y-208/`) — verificación reforzada

| Dato | Veredicto | Versión correcta para guion | Fuente | Fecha |
|---|---|---|---|---|
| Existe un problema documentado de la correa de distribución «en baño de aceite» del 1.2 PureTech | **CONFIRMADO** | Stellantis reconoció y extendió la garantía de los PureTech de generaciones anteriores por el consumo de aceite y la degradación de la correa. Prensa y OCU recogen reclamaciones. Decir «se han documentado casos de…», nunca «el motor se rompe» | https://www.motor.es/noticias/stellantis-ampliacion-garantia-compensacion-motores-puretech-2025106231.html · https://www.carwow.es/noticias/4908/stellantis-reembolsara-reparaciones-motores-puretech-desde-2022 | 26-11-2026 |
| Motores y años afectados | **CONFIRMADO** (vía prensa citando a Stellantis) | Correa: 1.2 PureTech atmosférico fabricado de junio de 2012 a junio de 2022; 1.0/1.2 PureTech turbo de abril de 2014 a junio de 2022. Consumo de aceite: 1.2 anterior a Euro 6.2 (abril 2014-julio 2018) y Euro 6.2 en adelante (febrero 2018-febrero 2023). El artículo lista las marcas (Citroën, DS, Opel, Vauxhall y Peugeot) **pero no menciona el modelo 208** | Motor.es, 17-01-2025 | 26-11-2026 |
| Garantía ampliada | **MATIZAR** | Garantía especial de **10 años o 175.000 km** (cobertura de piezas y mano de obra) para las generaciones anteriores, desde marzo de 2024. **Km77 y Motor1 dan 180.000 km.** Hay que decir «hasta 10 años» y no citar los km hasta leer el PDF oficial. Condiciones: mantenimiento según el plan del fabricante, tres últimas facturas, diagnóstico y reparación en taller oficial. Tolerancia aceptada: 3 meses o 3.000 km de retraso | Motor.es (arriba) · https://www.km77.com/revista/engendro-mecanico/stellantis-compensacion-afectados-puretech/ | 26-11-2026 |
| Reembolso retroactivo en España | **CONFIRMADO** | Reparaciones entre el 1-01-2022 y el 18-03-2024; la evaluación de reclamaciones empezó en Francia y España | Motor.es · Carwow | 26-11-2026 |
| Documento oficial | **NO VERIFICADO POR MÍ** | El PDF de Stellantis (Citroën España, «PureTech Special Coverage Conditions») devolvió **403** a mi lectura. Es la fuente oficial que hay que abrir a mano antes de grabar: https://www.citroen.es/content/dam/citroen/spain/pdf/postventa/PureTech-Special-Coverage-Conditions.pdf. No he encontrado un comunicado propio de Peugeot España | Citroën España (PDF) | 26-11-2026 |
| Intervalo recomendado de cambio de correa | **NO VERIFICABLE** | Las fuentes discrepan (algunas hablan de 180.000 km o diez años, otras de 100.000 km). **No se menciona ningún intervalo.** Frase segura: «Pide las facturas del cambio de correa y del aceite» | Búsqueda del 26-11-2026 | 26-11-2026 |
| Qué 208 entran | **NO VERIFICABLE** | Con el bastidor, en un concesionario Peugeot o en la web de la marca. No decir «tu 208 entra». La ficha de Par Motor dice 2013-2019 para el 208 I en un sitio y 2013-2023 en la FAQ (incoherencia interna) | Ficha del 208 | 26-11-2026 |

**Veredicto: LISTA CON CAMBIOS, condicionada.** Tiene fuente sólida (Stellantis citado por Motor.es, Carwow y Km77), pero **no se graba hasta que alguien abra el PDF oficial** y confirme los km (175.000 o 180.000) y los años. Guion seguro: «Si miras un 208 de gasolina de primera o segunda generación, pregunta por la correa. Stellantis ha ampliado la garantía de algunos motores PureTech. Pide las facturas y consulta con el bastidor si entra». **Plan B: sustituir por la 39 (FAP)**, que **no he verificado** (no hizo falta; si el PDF no se abre, hay que encargarlo con fuente técnica general). No decir «correa que se rompe»: la ficha dice que «puede» degradarse.

---

## 18 · Tienes 10.000 € (`#asesor`)

| Dato | Veredicto | Versión correcta para guion | Fuente | Fecha |
|---|---|---|---|---|
| El asesor admite 10.000 € | **MATIZAR** | W48 (25-11, página renderizada): presupuesto máximo de **3.000 a 150.000 €**, por defecto 20.000 €. Mi lectura de hoy da botones rápidos de 8.000, 12.000, 20.000, 30.000 y 50.000 €, sin 10.000 €, y no veo un campo numérico. **Las dos lecturas no concuerdan** y no puedo renderizar la página. Antes de grabar, comprobar en pantalla si 10.000 € se puede escribir. Si solo hay botones, cambiar el título a 8.000 o 12.000 € | https://parmotorweb.github.io/parmotor/#asesor · W48 fila 3a | 26-11-2026 |
| Contador de resultados | **NO VERIFICABLE hoy** | W48: con 20.000 € el contador decía «288 modelos · 502 generaciones · 2.811 motores». Con 10.000 € hay que leerlo el día de grabación (cambia con la base de datos) | W48 fila 3b | 25-11-2026 |
| Qué muestra cada tarjeta | **CONFIRMADO** (texto de la web) | «Qué modelos, generaciones y motores encajan, con su precio justo y lo que te costarían al mes». Muestra 20 tarjetas y «Ver más resultados». Enlaza a búsquedas en coches.net, Wallapop y AutoScout24 con los filtros | Portada | 26-11-2026 |
| CTA «De 3.000 a 150.000 €» | **MATIZAR** | Cierto según W48; mi lectura de hoy no lo reproduce. Comprobar con la captura | W48 | 26-11-2026 |

**Veredicto: LISTA CON CAMBIOS.** Todo depende de lo que se vea en pantalla el día de grabación. No escribir la cifra de modelos hasta entonces.

---

## 53 · Caso: Yaris de 2018 (`/tasar/toyota-yaris/`)

| Dato | Veredicto | Versión correcta para guion | Fuente | Fecha |
|---|---|---|---|---|
| Referencia de la ficha para un Yaris de 2018 | **CONFIRMADO** | Yaris III de 2018 a 100.000 km: 1.0 69 CV gasolina 7.400 €; 1.4 D-4D 90 CV diésel 10.400 €; 1.5 Hybrid 100 CV 10.900 €. Rango de la ficha: 2.500-23.000 €. Depreciación: unos 5 % anual | `tasar/toyota-yaris/` | 26-11-2026 |
| Resultado del caso (90.000 km) | **A CALCULAR EN EL TASADOR** | La ficha es a 100.000 km. Con 90.000 km y buen estado el tasador dará otra cifra. No estimarla a ojo: pasar el caso (marca, año, generación, motor, 90.000 km, estado) por el tasador el día de grabación y anotarlo | `#tasador` | 26-11-2026 |
| «Yaris de 2018 híbrido» | **MATIZAR** | Hay tres motores en 2018; en el guion hay que decir cuál se usa (el híbrido 1.5 de 100 CV es el más caro de los tres) y rotular «caso de ejemplo» | Igual | 26-11-2026 |

**Veredicto: LISTA CON CAMBIOS** (falta el resultado del tasador).

---

## 27 · La versión y el motor (Tiguan) (`/tasar/volkswagen-tiguan/`)

| Dato | Veredicto | Versión correcta para guion | Fuente | Fecha |
|---|---|---|---|---|
| Dos Tiguan del mismo año con su diferencia | **CONFIRMADO** | La ficha da tres diferencias calculadas: **2016** (Tiguan I): 2.0 TDI 177 CV 20.600 € frente a 1.4 TSI 150 CV 14.800 € = **5.800 €**; **2024** (Tiguan II): eHybrid 245 CV 34.900 € frente a 1.5 TSI 150 CV 26.700 € = **8.200 €**; 2026 (Tiguan III): eHybrid 272 CV 44.100 € frente a 1.5 eTSI 150 CV 38.600 € = 5.500 €. Rango: 9.700-44.100 €. La ficha no indica la depreciación anual | `tasar/volkswagen-tiguan/` | 26-11-2026 |
| Gancho «Por dentro, [X] € de diferencia» | **MATIZAR** | Recomendada: Tiguan II de 2024 (35.000 km), 8.200 € entre el 1.5 TSI y el eHybrid. Aclarar que uno es híbrido enchufable (un coche distinto en tecnología). Más comparable, mismo año y motor de combustión: **2024: 1.5 TSI 26.700 € frente a 2.0 TDI 29.000 € = 2.300 €** | Igual | 26-11-2026 |
| «Por fuera son iguales» | **[OPINIÓN]** | Es una afirmación visual, no un dato. Decir «a primera vista se parecen» o dejarlo como opinión del guion | — | 26-11-2026 |

**Veredicto: LISTA PARA GUION** (con el cambio del gancho).

---

## 07 · Suzuki Jimny, el que casi no baja (`/tasar/suzuki-jimny/`)

| Dato | Veredicto | Versión correcta para guion | Fuente | Fecha |
|---|---|---|---|---|
| Depreciación anual de la ficha | **CONFIRMADO** | «Un 3 % al año», calculado sobre la generación 2018 (1.5 de 102 CV). Rango: 9.200-22.500 € | `tasar/suzuki-jimny/` | 26-11-2026 |
| «Entre las más bajas de la web» | **MATIZAR** | Entre las **11 fichas que he leído** es la más baja: Jimny 3 %, Sandero 4 %, Yaris 5 %, Golf 6 %, Ibiza 6 %, Corsa 7 %, 208 7 %, Tucson 7 %, Sportage 7 %, Clase C 7 %, Zoe 12 %. **No he comparado las 400 fichas**: decir «de las más bajas que hemos mirado», no «la más baja de la web» | Fichas anteriores | 26-11-2026 |
| Curva | **CONFIRMADO** | Jimny 1.5 (2018): 21.000 € nuevo; 2025 (20.000 km) 20.800 €; 2022 (65.000 km) 19.200 €; 2019 (100.000 km) 16.100 €. Jimny 1.3 de 1998-2018 (85 CV, nuevo 16.000 €): 12.500 € en 2018 y **13.400 € en 2014**; es decir, uno de 2014 vale más que uno de 2018 en la tabla | Igual | 26-11-2026 |
| Causas de la demanda | **NO VERIFICABLE** | No hay fuente de prensa en la ficha. No buscada. **Omitir** (ver regla de la idea) | — | 26-11-2026 |

**Veredicto: LISTA CON CAMBIOS** (sin causas; con «de las más bajas»). Evitar la fila de 2026 (22.500 € frente a 21.000 € nuevo).

---

## 30 · ¿Chollo o caro?: Ibiza de 2019 (`/tasar/seat-ibiza/`)

| Dato | Veredicto | Versión correcta para guion | Fuente | Fecha |
|---|---|---|---|---|
| Precio del Ibiza de 2019 | **CONFIRMADO** | Ibiza V de 2019 a 100.000 km: 1.0 MPI 80 CV 8.300 €; 1.6 TDI 95 CV 11.200 €; 1.0 TSI 95 CV 9.400 €. Vecinos: 2018 → 8.200/11.200/9.300 € y 2020 (95.000 km) → 8.600/11.200/9.900 €. Rango de la ficha: 3.400-17.500 €. Depreciación: unos 6 % anual | `tasar/seat-ibiza/` | 26-11-2026 |
| Anuncio de ejemplo | **A DEFINIR POR EL GUIONISTA** | Rotular «ejemplo». Si el ejemplo tiene menos de 100.000 km, **no comparar con la tabla sin más**: la tabla es a 100.000 km y el coche del ejemplo valdría más. Pasarlo por el tasador con sus km y su estado, y usar ese resultado como veredicto | Igual · `#tasador` | 26-11-2026 |

**Veredicto: LISTA PARA GUION** (con el matiz de los km).

---

## L1 · Lo que pierde un coche en 10 años (6 fichas)

Fichas leídas el 26-11-2026. El ejemplo «10 años» es la fila de 2016 (a 100.000 km) frente al precio de nuevo de esa generación que da la ficha. Las pérdidas son **cálculo propio del Investigador `[ESTIMACIÓN: precio de nuevo de la ficha − precio de 2016 de la ficha; nominal, sin ajustar por inflación]`**.

| Modelo | Ficha | Dato de la ficha | Pérdida a 10 años (2016) | Veredicto |
|---|---|---|---|---|
| Dacia Sandero | `tasar/dacia-sandero/` | Depreciación 4 % anual; rango 3.300-13.800 € | Sandero II 1.0 SCe 75 CV: 9.000 € nuevo → 5.200 € de 2016 = −3.800 € (−42 %) | CONFIRMADO |
| Toyota RAV4 | `tasar/toyota-rav4/` | Rango 10.300-48.900 €; la ficha **no da depreciación anual** | 2016: 2.5 Hybrid 197 CV 21.400 €; 2.0 gasolina 151 CV 16.900 €. **El precio de nuevo de esa generación no se leyó**, así que no se calcula la pérdida | **NO VERIFICABLE** hasta leer el nuevo de la generación IV |
| Suzuki Jimny | `tasar/suzuki-jimny/` | Depreciación 3 % anual | Jimny 1.3 85 CV: 16.000 € nuevo → 13.000 € de 2016 = −3.000 € (−19 %) | CONFIRMADO |
| BMW Serie 5 | `tasar/bmw-serie-5/` | Rango 7.100-66.400 €; sin tasa anual oficial (entre 2025 y 2026 la tabla cae un 15,9 % en el 520i) | F10 520i 184 CV: 45.000 € nuevo → 19.900 € de 2016 = −25.100 € (−56 %) | CONFIRMADO |
| Renault Zoe | `tasar/renault-zoe/` | Depreciación 12 % anual (R110); **la tabla llega solo a 2024** | Zoe I R90: 23.000 € nuevo → 7.700 € de 2016 = −15.300 € (−67 %) | CONFIRMADO (Zoe I) |
| Mercedes Clase C | `tasar/mercedes-benz-clase-c/` | Depreciación 7 % anual. **La URL correcta es `mercedes-benz-clase-c`**, no `mercedes-clase-c` (404) | W205 C 180 156 CV: 38.000 € nuevo → 17.700 € de 2016 = −20.300 € (−53 %) | CONFIRMADO |

| Dato adicional | Veredicto | Versión correcta | Fuente | Fecha |
|---|---|---|---|---|
| «Uno pierde casi nada» (gancho) | **CONFIRMADO con matiz** | El Jimny es el que menos pierde (−19 % a 10 años frente al −42/−67 % de los demás). Es una comparación entre fichas y el Jimny 1.3 de 2016 es de una generación antigua | Fichas arriba | 26-11-2026 |
| Contexto externo (Ganvam-DAT, carVertical vía Autofácil) | **MATIZAR** | Solo atribuido: carVertical vía Autofácil, depreciación a 5 años (Leaf −63,6 %, etc.). Ganvam-DAT (53 % a 3 años el eléctrico) lo cita Carwow y **no lo leí en origen** (W48 fila 4) | https://www.autofacil.es/coches-que-mas-se-deprecian-espana-2026/ | 25-11-2026 (W48) |
| «Busca tu modelo entre las 400 fichas» | **NO VERIFICABLE** | No he contado las fichas del `sitemap.xml`. Contarlas el día de guion y decir «más de X fichas» con el número real | `sitemap.xml` | 26-11-2026 |
| Nombres de las fichas en pantalla | **MATIZAR** | El Clase C es «Mercedes-Benz Clase C»; Zoe: la tabla llega a 2024 (es 2026) | Fichas | 26-11-2026 |

**Veredicto: LISTA CON CAMBIOS.** Falta el precio de nuevo del RAV4 (leer la ficha completa) y contar las fichas. La pérdida del Zoe es de la generación I (R90), no de «los eléctricos». Evitar la fila de 2026 de todos (aviso 1).

---

## Resumen final

| Estado | Ideas |
|---|---|
| **Listas para guion** | 02 (Golf), 27 (Tiguan), 30 (Ibiza) |
| **Con cambios (listas cuando se apliquen)** | 09 (Sandero: 13.800 €, no 11.600 €), 35 (Corsa: solo «el primer año», sin causa), 07 (Jimny: «de las más bajas que hemos mirado», sin causas), 59 (Panda: ficha sin el de 1980), 51 (tasador: 100.000 km literal; «techo» matizado), 53 (Yaris: pasar el caso por el tasador), 14 (Tucson/Sportage: calcular en el comparador y fuente de plataforma), 48 (eléctrico: «precio del kWh», no «casa/calle»), 18 (10.000 €: comprobar la entrada y el contador en pantalla), L1 (falta nuevo del RAV4 y contar las fichas) |
| **Con verificación el mismo día** | 40 (carburante: prórroga, cuantía de diciembre, precios MITECO; el 16-12) |
| **Condicionada** | 36 (208 PureTech): hay que abrir el PDF oficial de Stellantis; si no se abre, sustituir por la 39 (FAP, **sin verificar**) |
| **Sustituir** | Ninguna. La 36 se sustituye solo si no hay PDF oficial |

Pendientes para otros agentes: Web/CRO (filas de 2026 por encima del precio de nuevo; incoherencia de años del 208 I; enlaces de las `/historia/`; comparador sin selector de carga ni GLP). Director: la 48 y la 14 necesitan una sesión con el comparador.

## TRASPASO
- **Para:** Director General
- **De:** Investigador
- **Hecho:** `agencia/investigacion/2026-W51-verificacion-top15.md` con tablas de verificación de las 15 ideas del TOP 15. Leídas las fichas de Golf, Sandero, Corsa, 207/208, Yaris, Tiguan, Ibiza, Jimny, Panda (precio e historia), Tucson, Sportage, RAV4, Serie 5, Zoe y Clase C, además de la portada. Fuentes oficiales para el 40 y la 36.
- **Pendiente / bloqueos:**
  1. **36:** el PDF oficial de Stellantis devolvió 403; que alguien lo abra a mano (175.000 o 180.000 km) antes de grabar. Si no es posible, sustituir por la 39 (sin verificar).
  2. **40:** volver a verificar el 16-12 (prórroga, cuantía de diciembre, MITECO). El número del RDL y la cuantía no están confirmados en el BOE.
  3. **48, 14, 18, 53:** hay que operar la web en el navegador (comparador, asesor con 10.000 €, tasador con 90.000 km); WebFetch no devuelve el resultado.
  4. **09:** el guion lleva 11.600 € y la ficha dice 13.800 €.
- **Riesgos:** las fichas muestran usados de 2026 por encima del precio de nuevo (evitar el 2026 en pantalla). La fuente de «Tucson y Sportage comparten plataforma» es débil. El mensaje «eléctrico» no se debe generalizar desde el Zoe.

## Verificación guion 25 (26-11-2026)

Guion: `agencia/guiones/2026-W51/25-kilometros-que-no-cuadran.md`. Consultado el 26-11-2026.

| Dato | Veredicto | Versión correcta | Fuente |
|---|---|---|---|
| La ITV registra el kilometraje | CONFIRMADO (con matiz) | La DGT indica que en miDGT constan los kilómetros anotados en la última inspección. Es el dato del registro de ITV, no una lectura verificada del cuentakilómetros | https://sede.dgt.gob.es/es/vehiculos/informacion-de-vehiculos/informe-de-un-vehiculo/ |
| Se puede consultar el historial de km vía informe DGT | CONFIRMADO | El informe **completo** incluye historial de ITV, kilometraje, nº de titulares y cargas. El **reducido** (gratuito) no incluye km | misma URL |
| Coste y forma | CONFIRMADO, caduca | Tasa 4.1: 8,67 € por informe completo (consulta 26-11-2026). Internet con certificado/DNIe/Cl@ve, app miDGT, teléfono 060 (envío por email) o presencial con cita. No se dice la cifra en el guion | misma URL |
| «Según la OCU, enseña embargos, cargas y siniestros» | MATIZAR | La fuente oficial habla de cargas y de si hay incidencias; «siniestros» no figura en la página de la DGT. Se sustituye por la fuente DGT | misma URL |
| «Pídele los papeles de las ITV anteriores» | CONFIRMADO como consejo | Consejo general, sin cifra. Es mejor apoyarlo en el informe completo, que ya trae el historial | misma URL |
| RD 920/2017 (ITV) | NO VERIFICABLE | No se localizó en el texto el artículo que obligue a anotar km en el informe de inspección (Anexo II no consultado). Se usa solo la DGT | https://www.boe.es/buscar/pdf/2017/BOE-A-2017-12841-consolidado.pdf |
| Ejemplo 120.000 → 90.000 | Rotulado como inventado | Sin cambios | n/a |

Cambios aplicados en el .md y el .guion.json: fila 18–25 s reescrita («informe completo… historial de ITV con kilómetros y las cargas. Tiene tasa»), quitada la marca [PENDIENTE DE VERIFICAR], actualizada la lista de datos. Rutas de imagen intactas.

## TRASPASO
- **Para:** Director General
- **De:** Investigador
- **Hecho:** guion 25 verificado y corregido (.md y .guion.json).
- **Pendiente:** regenerar las tablas de las 15 ideas de este archivo, borradas por error mío (ver aviso arriba).
- **Riesgos:** la tasa de 8,67 € caduca; no se locuta.
