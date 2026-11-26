# Eficiencia de la agencia

Responsable: Director de eficiencia (`.claude/agents/director-eficiencia.md`).

| Archivo | Para qué |
|---|---|
| `registro-consumo.md` | Una fila por encargo a un agente: tokens, llamadas, duración, modelo |
| `modelos.md` | Qué modelo usar según el tipo de tarea |
| `indice-reutilizable.md` | Trabajo ya hecho que se puede reutilizar, con caducidad |
| `../archivo/` | Lo que ya no sirve para el trabajo actual (se mueve, no se borra) |
| `../informes/eficiencia/` | Informe semanal de eficiencia |

## Reglas de comunicación entre agentes
1. **Brief mínimo.** El brief lleva objetivo, rutas de entrada, ruta de salida, criterio de calidad y modelo. No se copia contenido que ya está en un archivo: se da la ruta.
2. **Las reglas comunes no se repiten.** Ya están en `CLAUDE.md`, que todos leen.
3. **Antes de investigar, buscar.** Se mira `indice-reutilizable.md`: si hay algo vigente, se reutiliza y solo se completa lo que falta.
4. **Traspasos cortos.** El bloque `## TRASPASO` y un resumen de 5 líneas como máximo. El detalle va en el archivo entregado, no en la respuesta.
5. **Tareas sencillas, proceso sencillo.** Si basta con leer un par de archivos o hacer una edición, lo hace el director sin lanzar a nadie.
6. **Paralelo cuando no hay dependencias**, en una sola tanda (ver el orden en `director-general.md`).

## Fórmula de prioridad
Cada tarea del backlog se puntúa de 1 a 5 en cada criterio:

`prioridad = (impacto × 3 + probabilidad × 2) − (coste + tiempo + consumo)`

- **Impacto:** crecimiento de la web (uso de herramientas, leads, tráfico cualificado).
- **Probabilidad:** de que salga bien, según datos previos.
- **Coste, tiempo y consumo:** 1 = poco, 5 = mucho.

La fórmula ordena, no decide: el director puede saltársela explicando por qué en `tablero/decisiones.md`.
