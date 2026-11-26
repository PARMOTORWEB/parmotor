# Modelos por tipo de tarea

Estado: **propuesta inicial `[OPINIÓN: Director de eficiencia]`, sin datos de calidad todavía.** Se ajusta cada semana con el registro y la revisión del director.

Alias de Claude Code: `haiku` (rápido y económico), `sonnet` (equilibrado), `opus` (máxima capacidad).

| Tipo de tarea | Modelo | Ejemplos |
|---|---|---|
| Repetitiva o mecánica | `haiku` | Adaptar un texto ya aprobado a otra red, rellenar plantillas, contar filas del registro, extraer métricas de Metricool sin analizarlas |
| Investigación y verificación | `sonnet` | Fichas de modelo, verificación de datos, pulso semanal del mercado |
| Redacción creativa | `sonnet` | Ideas, guiones, textos nuevos por red |
| Análisis | `sonnet` | Informe semanal del analista, auditoría SEO o CRO |
| Estrategia y decisiones de peso | `opus` | Informe mensual y objetivos, cambios de enfoque, plan de captación, decisiones con dinero |

## Propuesta por agente (cuando la tarea es la habitual)
| Agente | Por defecto | Baja a `haiku` cuando | Sube a `opus` cuando |
|---|---|---|---|
| Director Creativo | `sonnet` | — | Replantear pilares de contenido |
| Investigador | `sonnet` | Actualizar un precio ya localizado | — |
| Guionista | `sonnet` | — | Vídeo largo de una serie nueva |
| Producción | `sonnet` | Rótulos y listas de planos de un guion cerrado | — |
| Web y CRO | `sonnet` | — | Rediseño de un embudo |
| SEO | `sonnet` | Revisar títulos y metadatos con un patrón fijo | Estrategia de contenidos trimestral |
| Growth | `sonnet` | — | Propuestas con gasto |
| Analista | `sonnet` | Solo descargar datos | Informe mensual |
| Community manager | `sonnet` | Adaptar un texto aprobado | — |
| Director de eficiencia | `sonnet` | Actualizar el registro | — |

## Cómo se aplica
- El director pasa el modelo al lanzar cada encargo. No se fija en la configuración de los agentes sin el sí del dueño.
- Si una tarea bajada a `haiku` vuelve con fallos de calidad, se repite con `sonnet` y se anota en el registro. Dos fallos seguidos: esa tarea vuelve a `sonnet`.
