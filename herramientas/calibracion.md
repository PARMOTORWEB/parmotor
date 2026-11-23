# Registro de calibración del tasador (tarea diaria del asesor)

La tarea diaria lee este archivo al empezar y lo actualiza al terminar.
Formato: una línea por caso comprobado. Los «Pendientes» se vuelven a comprobar primero.

## Pendientes
- Dacia Sandero III: k 0,85 → 0,65 en todas las versiones el 21/11/2026 (coches.net 2022: 117 anuncios, media 12.893 €, 58.283 km; antes ≈ −17 %, ahora ≈ −7 %). Falta la versión «Stepway 1.0 TCe 90» (la más anunciada); añadirla cuando haya PVP fiable.
- Enlace coches.net con modelos de dos palabras: la web usa guion bajo (/mercedes-benz/clase_c/, /bmw/serie_1/, /citroen/c3_aircross/) y el asesor genera guion (/clase-c/, /serie-1/). El 22/11/2026 no se pudo abrir la versión con guion (permiso de WebFetch). El 23/11/2026 hay más indicios de que coches.net acepta variantes: Google indexa como listas válidas /land-rover/ y /land_rover/, /mazda/cx-5/, /mazda/cx5/ y /mazda/cx__5/, /volkswagen/troc/ y /t__roc/. Probablemente /clase-a/ funciona; no se toca shopLinks hasta abrir una URL con guion.
- Mercedes Clase A W177 2019: tasador ≈ −25 % frente a la media de coches.net (430 anuncios, 23.982 €, pero 108.787 km de media, >100.000). Anuncios sueltos <100.000 km: A 180 80.000 km 21.900 € (tasador −20 %), A 220 78.900 km 29.900 € (−26 %); A 180 d a 100.000 km ≈ 0 a −8 %. Comprobar 2020 o 2021 (menos km) antes de subir k o PVP de gasolina.
- Cupra Formentor VZ 2.0 TSI 310 CV 2021: +16 % con solo 3 anuncios (≈32.000 € a 43.000–64.500 km). Repetir con más datos (no tocar sin error claro: calibración VW/Cupra).

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

## Fuentes que funcionan
- coches.net /marca/modelo/segunda-mano/AAAA/ (por año): el bloque de preguntas frecuentes da precio medio, km medio, nº de anuncios, CV medio y % de combustible. Es la mejor fuente.
- motor.es /segunda-mano/marca/modelo/: anuncios sueltos (año, CV, km, precio).
- autouncle.es: el 20 y 21/11/2026 bloqueó la mayoría de páginas al leerlas.
- WebSearch con allowed_domains ["coches.net"] y «Marca Modelo AAAA segunda mano» devuelve directamente la página por año (22/11/2026).
- coches.net escribe Porsche 718 como /porsche/718/ (Cayman y Boxster son versiones: /porsche/718/cayman/).
- WebSearch con allowed_domains ["autoscout24.es"] da error del proxy (23/11/2026); sin filtro de dominio sí devuelve /lst/marca/modelo (autoscout24.com).
- Las URL de coches.net por año solo se pueden leer si antes salen en un WebSearch (p. ej. «coches.net Marca Modelo año AAAA de segunda mano»); construirlas a mano da error de permiso. Toyota C-HR es /toyota/chr/.
