# Cifras calculadas por el Director (26-11-2026)

Todas son **[ESTIMACIÓN Par Motor]**, sacadas de las herramientas de la web publicada el 26-11-2026. El motor del tasador es el de `origin/main` bea0146 («Precios del 26/11… MARKET 1,09»). **Se vuelven a calcular el día de grabación**: la calibración diaria cambia los precios.

| Guion | Cifra | Valor | Cómo se ha obtenido |
|---|---|---|---|
| 14 | Coste al mes | Tucson 1.6 T-GDi 150 CV (2023, 50.000 km): **479 €/mes** · Sportage 1.6 T-GDi 150 CV (2023, 50.000 km): **473 €/mes** · diferencia **6 €/mes** (296 € en 4 años) | Comparador real (`#calculadora`): 4 años, 15.000 km/año, conductor de 30 años o más, gasolina 95 a 1,55 €/l (valor por defecto) y precio de compra igual al del tasador (23.800 € y 23.100 €). La diferencia viene sobre todo de los 700 € de precio de compra |
| 18 | Asesor con 10.000 € | **189 modelos · 283 generaciones · 1.459 motores**. Tres primeras tarjetas («Más coche por tu dinero»): Citroën Ami (eléctrico, 8 CV, 6.500 €, ≈148 €/mes), Fiat Panda III 1.2 69 CV (9.600 €, ≈272 €/mes), Mitsubishi Space Star 1.0 71 CV (9.400 €, ≈276 €/mes) | Asesor real: deslizador a 10.000 € (permite saltos de 500 €) y el resto de filtros por defecto. **Aviso:** el Ami es un cuadriciclo; el guion lo dice para no engañar. Las tarjetas muestran años recientes: no enseñar «2026» en pantalla |
| 48 | Eléctrico frente a gasolina | Zoe R135 (2022, 60.000 km) frente a 208 1.2 PureTech 75 CV (2022, 60.000 km). A 0,15 €/kWh: **311 frente a 327 €/mes**. Punto de corte: **unos 0,24 €/kWh**. A 0,40 €/kWh: **356 frente a 327 €/mes** | Comparador real, mismos supuestos que el 14 y precio de compra del tasador (16.800 € y 11.600 €). El gasto total del Zoe sube 8.760 € por cada euro que sube el kWh (60.000 km × 14,6 kWh/100 km); corte = 0,15 + (15.712 − 14.911) / 8.760 ≈ 0,241 €/kWh. **No se usan tarifas externas** sin verificar |
| 51 | 150.000 km | El control de km del tasador llega a **100.000 km** y avisa: «Solo tasamos coches de hasta 100.000 km: a partir de ahí el precio cae mucho y depende demasiado del historial de cada coche» | `index.html` (deslizador `max=100000`) |
| 53 | Yaris III 1.5 Hybrid 2018 | **11.700 €** con 90.000 km (10.900 € con 100.000 km, coincide con la ficha) | `agencia/herramientas-agencia/tasador.py` (réplica validada al euro con la ficha) |
| L1 | RAV4 IV 2016 a km normales (100.000) | 2.5 Hybrid 197 CV: 35.000 € nuevo → **21.400 €** (−13.600 €, −39 %) · 2.0 gasolina 151 CV: 29.000 € nuevo → **16.900 €** (−12.100 €, −42 %) | Réplica del tasador. «Precio de nuevo» = el PVP de la base de datos de la web |
| L1 | Número de fichas | **396** fichas `/tasar/` (el guion dice «casi 400») | `sitemap.xml` de `origin/main` |

Sigue pendiente (no son cálculos):
- **25:** verificar que la ITV anota el kilometraje (o usar el plan B del guion).
- **40:** volver a verificar la prórroga y la fecha el 27-12.
