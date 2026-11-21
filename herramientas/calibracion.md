# Registro de calibración del tasador (tarea diaria del asesor)

La tarea diaria lee este archivo al empezar y lo actualiza al terminar.
Formato: una línea por caso comprobado. Los «Pendientes» se vuelven a comprobar primero.

## Pendientes
- Dacia Sandero III: k 0,85 → 0,65 en todas las versiones el 21/11/2026 (coches.net 2022: 117 anuncios, media 12.893 €, 58.283 km; antes ≈ −17 %, ahora ≈ −7 %). Falta la versión «Stepway 1.0 TCe 90» (la más anunciada); añadirla cuando haya PVP fiable.
- Toyota C-HR I 1.8 Hybrid 2019: solo 4 anuncios ≤100.000 km (−17 % a +6 %). La página /toyota/chr/segunda-mano/2019/ dio error; repetir.
- Enlace coches.net de Mercedes Clase C: la web usa /mercedes-benz/clase_c/ y el asesor genera /clase-c/. Comprobar si redirige.

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

## Fuentes que funcionan
- coches.net /marca/modelo/segunda-mano/AAAA/ (por año): el bloque de preguntas frecuentes da precio medio, km medio, nº de anuncios, CV medio y % de combustible. Es la mejor fuente.
- motor.es /segunda-mano/marca/modelo/: anuncios sueltos (año, CV, km, precio).
- autouncle.es: el 20 y 21/11/2026 bloqueó la mayoría de páginas al leerlas.
- Las URL de coches.net por año solo se pueden leer si antes salen en un WebSearch (p. ej. «coches.net Marca Modelo año AAAA de segunda mano»); construirlas a mano da error de permiso. Toyota C-HR es /toyota/chr/.
