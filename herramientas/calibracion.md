# Registro de calibración del tasador (tarea diaria del asesor)

La tarea diaria lee este archivo al empezar y lo actualiza al terminar.
Formato: una línea por caso comprobado. Los «Pendientes» se vuelven a comprobar primero.

## Pendientes
- Dacia Sandero III: k 0,85 → 0,65 en todas las versiones el 21/11/2026 (coches.net 2022: 117 anuncios, media 12.893 €, 58.283 km; antes ≈ −17 %, ahora ≈ −7 %). Falta la versión «Stepway 1.0 TCe 90» (la más anunciada); añadirla cuando haya PVP fiable.
- Enlace coches.net con modelos de dos palabras: la web usa guion bajo (/mercedes-benz/clase_c/, /bmw/serie_1/, /citroen/c3_aircross/) y el asesor genera guion (/clase-c/, /serie-1/). El 22/11/2026 no se pudo abrir la versión con guion (permiso de WebFetch). El 23/11/2026 hay más indicios de que coches.net acepta variantes: Google indexa como listas válidas /land-rover/ y /land_rover/, /mazda/cx-5/, /mazda/cx5/ y /mazda/cx__5/, /volkswagen/troc/ y /t__roc/. Probablemente /clase-a/ funciona; no se toca shopLinks hasta abrir una URL con guion.
- Mercedes Clase A W177: en 2019 ≈ −25 % (media >100.000 km), pero el 24/11/2026 anuncios de 2022 a ~65.000 km dan solo −6/−7 % (A 200 d, A 250 e). Falta un A 180/A 200 gasolina 2020–2021 <100.000 km para cerrarlo.
- Cupra Formentor VZ 2.0 TSI 310 CV 2021: +16 % con solo 3 anuncios (≈32.000 € a 43.000–64.500 km). Repetir con más datos (no tocar sin error claro: calibración VW/Cupra).

- Hyundai i20 N (i20 III): PVP corregido 26.000 → 30.000 € el 24/11/2026 (tarifa oficial 29.990 €, motor.es y autonocion.com). Aun así sigue ≈ −8 a −17 % frente a 4 anuncios de coches.net (2022–2024, 50.000–60.000 km, 26.490–28.990 €). Si se confirma con más anuncios, subir k 0,85 → 0,95.
- Volvo XC40 T5 Recharge 2020: datos contradictorios (58.500 km 23.300 € → tasador +27 %; 110.900 km 23.900 € → −11 %). Repetir con más anuncios.
- Enlaces: coches.net sigue indexando /mercedes-benz/clase_a/ y /mercedes__benz/clase_a/ (24/11/2026); sigue sin abrirse la variante con guion.

## Historial
- 19/11/2026 · Opel Corsa, Kia Sportage, Audi A3, Skoda Octavia, Mazda MX-5, Tesla Model 3 · sin cambios.
- 20/11/2026 · VW T-Roc 2024 (coches.net, 194 anuncios, media 24.613 €, 53.354 km): −10 % (1.5 TSI) a +4 % (2.0 TDI) · sin cambios.
- 20/11/2026 · Hyundai i30 N Performance 2018–2023 (5 anuncios AutoUncle): −5 % a +2 % · sin cambios.
- 20/11/2026 · Nissan Leaf II 40 kWh y e+ (7 anuncios ≤100.000 km): mediana +22 % · k 1,35 en ambas versiones.
- 20/11/2026 · Dacia Sandero III (6 anuncios): mediana −27 % · pendiente.
- 20/11/2026 · Nissan Qashqai 2012 (todos >100.000 km) y BMW 320d (páginas bloqueadas) · sin datos válidos. (El commit 20ab8ad dice por error que se comprobó el 320d).
- 21/11/2026 · Nissan Leaf II 40 kWh 2019 (coches.net, 22 anuncios, 12.831 €, 83.779 km): +2 % · confirma el ajuste del 20/11.
- 21/11/2026 · Dacia Sandero III 2022 (coches.net, 117 anuncios): ≈ −17 % · k 0,65 en Sandero III.
- 21/11/2026 · Abarth 595 2019 (coches.net, 40 anuncios, 18.305 €, 69.966 km, 162 CV medios): ≈ +1 % · sin cambios.
- 21/11/2026 · Peugeot 3008 II 1.5 BlueHDi 2020 (coches.net, 157 anuncios, 15.401 €, 100.173 km): +1 % · sin cambios.
- 21/11/2026 · Mercedes Clase C W205 2019 (coches.net, 209 anuncios, media 125.000 km, mezcla con AMG): anuncios sueltos C 220 d/C 200/C 200 d −7 % a −1 % · sin cambios.
- 21/11/2026 · Seat León IV 2021 (coches.net, 300 anuncios, 16.429 €, 113.460 km >100.000): TDI 115/150 ≈ −5 % · sin cambios.
- 22/11/2026 · Cupra Formentor 2021 (coches.net, 185 anuncios, 24.322 €, 83.303 km, 196 CV medios): 1.5 TSI 150 a ~70.000 km ≈ +3 %; VZ 310 ≈ +16 % (3 anuncios) · sin cambios.
- 22/11/2026 · Toyota C-HR 1.8 Hybrid 2019 (coches.net, 106 anuncios, 19.463 €, 97.288 km): −12 % · sin cambios (cierra el pendiente).
- 22/11/2026 · BMW Serie 1 F40 2020 (coches.net, 228 anuncios, 20.350 €, 103.927 km >100.000, 63 % diésel): mezcla ≈ −14 %; 118i 59.790 km +9 %, 97.000 km −20 % · sin cambios.
- 22/11/2026 · Ford Mustang 5.0 GT 2018 (coches.net, anuncios sueltos): 450 CV +7 % (36.999 € a 63.500 km; 38.499 € a 73.500 km), 418 CV ≈ −2 % · sin cambios.
- 22/11/2026 · Renault Zoe II 2020 (coches.net, 22 anuncios, 13.033 €, 63.024 km, 114 CV medios): R110 +14 %, mezcla +16 % · k 1,3 en Zoe II.
- 22/11/2026 · Citroën C3 III 2019 (coches.net, 148 anuncios, 8.677 €, 100.217 km): mezcla ≈ −9 % (PureTech 82 a 120.000 km −12 %, 110 a 40.000 km +5 %, BlueHDi 100 −8 %) · sin cambios.

- 23/11/2026 · Renault Zoe II 2021 (coches.net, 17 anuncios, 13.509 €, 56.961 km): R110 +10 % · sin cambios (cierra el pendiente del ajuste k 1,3).
- 23/11/2026 · VW Polo VI 1.0 TSI 95 2019 (coches.net, 164 anuncios, 14.118 €, 106.319 km >100.000, 87 % gasolina): anuncios a 64.000–68.000 km ≈ −5 % · sin cambios.
- 23/11/2026 · Hyundai Tucson NX4 2022 (coches.net, 419 anuncios, 22.492 €, 84.185 km, 52 % HEV, 16 % PHEV): mezcla ≈ +4 %; HEV 56.100 km +2 % · sin cambios.
- 23/11/2026 · Mercedes Clase A W177 2019 (coches.net, 430 anuncios, 23.982 €, 108.787 km): ≈ −25 % · pendiente (>100.000 km).
- 23/11/2026 · Porsche 718 2018 (coches.net, 22 anuncios, 62.013 €, 64.209 km, mezcla Cayman/Boxster/S/GTS): ≈ −1 %; Cayman 300 CV a 44.655 km −11 % · sin cambios.
- 23/11/2026 · Ford Focus Mk4 1.0 EcoBoost 125 2019 (coches.net, 168 anuncios, 13.900 €, 112.675 km >100.000): anuncios ≤100.000 km ≈ −10 % · sin cambios.
- 24/11/2026 · Seat Ibiza V 1.0 TSI 115 2020 (coches.net, 75–92 anuncios, 13.093 €, 93.073 km): FR 65.000–80.000 km −11 a −15 %, Xcellence 61.933 km −4 % · sin cambios (calibración VW/Seat).
- 24/11/2026 · Renault Clio V 2021 (coches.net, 240–261 anuncios, 12.440 €, 88.634 km, 45 % gasolina): mezcla ≈ −13 %; Blue dCi 100 a 89.703 km −4 % · sin cambios.
- 24/11/2026 · Mercedes Clase A W177 2022 (anuncios sueltos coches.net): A 200 d 64.610 km −6 %, A 250 e 68.500 km −7 % · sin cambios.
- 24/11/2026 · Hyundai i20 N 2022–2024 (coches.net, 4 anuncios N 204 CV): −20 a −28 % · PVP 26.000 → 30.000 € (error de tarifa).
- 24/11/2026 · Toyota Corolla XII 1.8 Hybrid 2020 (coches.net, 88–98 anuncios, 18.730 €, 112.250 km >100.000): 39.392 km +13 %, 87.000 km −5 %, 90.048 km −18 % · sin cambios.
- 24/11/2026 · Volvo XC40 2020 (coches.net, 121–132 anuncios, 22.802 €, 116.981 km >100.000): D3 AWD 64.488 km −2 %; T5 Recharge contradictorio · sin cambios.
- 24/11/2026 · Enlaces: coches.net /marca/modelo/segunda-mano/ vigente; AutoScout24 /lst/ y Wallapop /search no salen en WebSearch hoy (sin indicios de cambio) · shopLinks sin tocar.

## Fuentes que funcionan
- coches.net /marca/modelo/segunda-mano/AAAA/ (por año): el bloque de preguntas frecuentes da precio medio, km medio, nº de anuncios, CV medio y % de combustible. Es la mejor fuente.
- motor.es /segunda-mano/marca/modelo/: anuncios sueltos (año, CV, km, precio).
- autouncle.es: el 20 y 21/11/2026 bloqueó la mayoría de páginas al leerlas.
- WebSearch con allowed_domains ["coches.net"] y «Marca Modelo AAAA segunda mano» devuelve directamente la página por año (22/11/2026).
- coches.net escribe Porsche 718 como /porsche/718/ (Cayman y Boxster son versiones: /porsche/718/cayman/).
- WebSearch con allowed_domains ["autoscout24.es"] da error del proxy (23/11/2026); sin filtro de dominio sí devuelve /lst/marca/modelo (autoscout24.com).
- Las URL de coches.net por año solo se pueden leer si antes salen en un WebSearch (p. ej. «coches.net Marca Modelo año AAAA de segunda mano»); construirlas a mano da error de permiso. Toyota C-HR es /toyota/chr/.
- coches.com (antibots Incapsula), autouncle.es y Wallapop fallan al leerlos con WebFetch (24/11/2026). Tarifas oficiales: motor.es/noticias y autonocion.com se leen bien.
