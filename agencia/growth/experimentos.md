# Experimentos

Actualizado el 25 nov 2026 por Growth. Estrategia completa: `estrategia-crecimiento.md`.

## Reglas
- **Máximo 3 activos a la vez.** Dos experimentos que toquen la misma etapa y el mismo canal no se corren a la vez, para no mezclar efectos.
- Los umbrales son `[HIPÓTESIS]` sin histórico. Se recalibran con la base de 2 semanas que marca la fase 1.
- Coste en euros: 0 € salvo que se indique otra cosa. Cualquier gasto requiere el sí del dueño.
- **Ninguno puede arrancar hasta cumplir el prerrequisito P0.**

## Prerrequisito P0 · Poder medir (no es un experimento, es la condición para los demás)

| Comprobación | Responsable | Estado |
|---|---|---|
| Metricool web registra visitas y fuentes durante 7 días seguidos | Analista | Pendiente: web conectada el 25 nov, falta comprobar los datos |
| Eventos `tasacion_completada`, `comparacion_completada` y `asesor_usado`, sin cookies | Dueño decide la herramienta; Web/CRO la implementa | Bloqueado: falta la decisión |
| UTM normalizadas: `utm_source` = `instagram` / `tiktok` / `youtube` / `comunidad` / `radar` / `colab-<id>`; `utm_medium` = `bio` / `descripcion` / `comentario` / `email`; `utm_campaign` = `<semana>-<slug>` | Growth (convención) y Web/CRO | Propuesta |

## Tabla de experimentos (priorizados)

| # | Prioridad | Hipótesis | Métrica | Umbral de éxito | Duración | Coste | Dependencias o bloqueos | Estado | Resultado |
|---|---|---|---|---|---|---|---|---|---|
| 1 | **Ola 1** | Si el CTA del short nombra el modelo y su ficha («mira cuánto vale hoy un [modelo]») en vez de «tasador gratis», más gente visita la ficha | Visitas a `/tasar/<modelo>/` desde redes por cada 1.000 visualizaciones. Diseño: CTA nominal y CTA genérico alternados por días, desde el 15 dic | ≥ +50 % en el nominal frente al genérico | 2 semanas (unos 14 shorts por variante) | 0 € | P0 completo y bio rastreable. Lo de antes del 14 dic no se toca, así que arranca el 15 dic | Bloqueado (P0) | — |
| 2 | Ola 2 | Una página `/enlaces/` con un botón por vídeo reciente (directo a su ficha) convierte más que mandar la bio a la portada | Porcentaje de visitas desde la bio que acaban en una tasación completada | ≥ 1,5 veces la tasa de la portada | 2 semanas | 0 € | Web/CRO crea `/enlaces/`, P0 y el experimento 1 cerrado (los dos tocan el paso a la web) | Propuesto | — |
| 3 | **Ola 1** | Un bloque «¿Cuánto vale hoy?» en las fichas de `/historia/` lleva parte del público nostálgico a la ficha de precio | Porcentaje de visitas a `/historia/<m>/` con clic a `/tasar/<m>/` (evento de clic o visitas con referente interno) | ≥ 10 % de las visitas de historia | 3 semanas | 0 € | Web/CRO, en una rama `web/*` con el sí del dueño para publicar, y P0 | Propuesto | — |
| 4 | Ola 2 | Proponer un siguiente paso después del resultado del tasador («y al mes, ¿cuánto te cuesta?», que lleva a `#calculadora`) aumenta el uso de una segunda herramienta | Porcentaje de `tasacion_completada` seguidas de `comparacion_completada` en la misma visita | ≥ 15 % | 3 semanas | 0 € | Eventos (P0) y Web/CRO | Propuesto | — |
| 5 | Ola 2 | La suscripción al Radar convierte más justo después de una tasación (momento de máxima intención) que al final del artículo del Radar | Suscripciones confirmadas por cada 100 visitas, en cada ubicación (los dos formularios a la vez, con una etiqueta de origen) | Mínimo de viabilidad: ≥ 2 % en `#radar` o ≥ 1 % de las tasaciones completadas. Gana la ubicación con la tasa mayor y al menos 20 altas | 4 semanas | 0 € `[SIN VERIFICAR: plan gratuito del proveedor]` | Proveedor de email, privacidad actualizada (decisiones del dueño) y P0 | Bloqueado (no hay proveedor) | — |
| 6 | Ola 3 | Hay demanda de un checklist de compra de usado: si se ofrece en descarga libre, una parte de los visitantes de las fichas lo descarga | Descargas del PDF entre las visitas a las páginas donde se ofrece | ≥ 5 % de esas visitas `[HIPÓTESIS]` | 3 semanas | 0 € | Contenido verificado por el investigador, maqueta de producción, publicación por Web/CRO y un evento de descarga (P0) | Propuesto | — |
| 7 | Ola 3 | Responder con valor en comunidades de coches (2-3 respuestas por semana, publicadas por el dueño como Par Motor) trae visitas con más uso de herramienta que las redes | Visitas y tasaciones con `utm_source=comunidad`, por respuesta; tasa de uso frente a la de las redes | ≥ 2 veces la tasa de uso de las redes y 0 respuestas retiradas o denunciadas | 4 semanas | 0 € (tiempo del dueño: unos 30 min por semana `[ESTIMACIÓN]`) | Lista de comunidades y sus normas, del investigador; sí del dueño; P0. Los borradores no llevan datos personales | Propuesto | — |
| 8 | **Ola 1** | El vídeo largo de YouTube, con enlaces con UTM a las fichas en la descripción y en el comentario fijado, trae más visitas por cada 1.000 visualizaciones que los shorts | Visitas con `utm_source=youtube&utm_medium=descripcion` por cada 1.000 visualizaciones del largo, frente a la media de los shorts | ≥ 3 veces la de los shorts | 4 vídeos largos | 0 € | Medición web con UTM (P0) y la plantilla de descripción del community manager | Propuesto | — |

## Orden de activación propuesto

- **Ola 1**, cuando se complete P0 (como referencia, desde el 15 dic): los experimentos 1, 3 y 8. Tocan canales y etapas distintos (CTA del short, web de historia y YouTube largo), así que no se interfieren.
- **Ola 2**, al cerrar la ola 1 o al activarse el Radar: el 2, el 4 y el 5.
- **Ola 3**: el 6 y el 7.

## Registro de resultados
Al cerrar cada experimento se apunta aquí lo siguiente:
- Fecha de cierre.
- Resultado con su cifra y su fuente: `[CONFIRMADO: Metricool web / GoatCounter / proveedor]`.
- Decisión: escalar, iterar o descartar.
- Siguiente paso.
