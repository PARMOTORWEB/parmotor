# Registro de calibración del tasador (tarea diaria del asesor)

La tarea diaria lee este archivo al empezar y lo actualiza al terminar.
Formato: una línea por caso comprobado. Los «Pendientes» se vuelven a comprobar primero.

## Pendientes
- Dacia Sandero III (1.0 TCe 90, ECO-G 100, Stepway): tasador −7 % a −37 % (mediana −27 %) en 6 anuncios de motor.es (20/11/2026). Faltan ≥10 anuncios comparables por versión y año (mejor coches.net /dacia/sandero/segunda-mano/AAAA/). Ojo: el Stepway 1.0 TCe 90 no existe en Sandero III de la base de datos.
- Nissan Leaf II: ajustado k 1,15 → 1,35 el 20/11/2026 (mediana +22 % → +8 %). Confirmar con la media por año de coches.net; el e+ 2024 sigue alto (+24 %, 1 anuncio).

## Historial
- 19/11/2026 · Opel Corsa, Kia Sportage, Audi A3, Skoda Octavia, Mazda MX-5, Tesla Model 3 · sin cambios.
- 20/11/2026 · VW T-Roc 2024 (coches.net, 194 anuncios, media 24.613 €, 53.354 km): −10 % (1.5 TSI) a +4 % (2.0 TDI) · sin cambios.
- 20/11/2026 · Hyundai i30 N Performance 2018–2023 (5 anuncios AutoUncle): −5 % a +2 % · sin cambios.
- 20/11/2026 · Nissan Leaf II 40 kWh y e+ (7 anuncios ≤100.000 km): mediana +22 % · k 1,35 en ambas versiones.
- 20/11/2026 · Dacia Sandero III (6 anuncios): mediana −27 % · pendiente.
- 20/11/2026 · Nissan Qashqai 2012 (todos >100.000 km) y BMW 320d (páginas bloqueadas) · sin datos válidos. (El commit 20ab8ad dice por error que se comprobó el 320d).

## Fuentes que funcionan
- coches.net /marca/modelo/segunda-mano/AAAA/ (por año): el bloque de preguntas frecuentes da precio medio, km medio, nº de anuncios, CV medio y % de combustible. Es la mejor fuente.
- motor.es /segunda-mano/marca/modelo/: anuncios sueltos (año, CV, km, precio).
- autouncle.es: el 20/11/2026 bloqueó la mayoría de páginas al leerlas.
