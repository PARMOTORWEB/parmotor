# Arquitectura del sistema

## Modelo elegido: orquestador central con tablero compartido

```
                         ┌───────────────────────────┐
         Dueño  ◄──────► │ DIRECTOR GENERAL          │  (sesión principal de Claude Code)
     (aprobaciones)      │ planifica · delega · revisa│
                         └─────────────┬─────────────┘
                                       │ encarga con un «brief» y recibe un «traspaso»
      ┌──────────┬──────────┬──────────┼──────────┬──────────┬──────────┬──────────┬──────────┐
  Creativo  Investigador  Guionista  Producción  Web/CRO     SEO      Growth    Analista   Community
      │          │          │          │          │          │          │          │          │
      └──────────┴──────────┴──────────┴──── agencia/  (tablero, ideas, guiones…) ──┴──────────┘
                                         Metricool (lectura) · Web · Search Console
```

**Por qué esta arquitectura y no otra:**
- En Claude Code los subagentes no pueden llamar a otros subagentes. Por eso la coordinación tiene que vivir en la sesión principal, que hace de Director General.
- Los especialistas trabajan con contexto propio y aislado. Así no se ensucia el contexto del director, y se pueden lanzar en paralelo cuando las tareas no dependen entre sí (por ejemplo, el investigador y el analista a la vez).
- Se comunican **a través de archivos** en `agencia/`, no de memoria. Lo que hace un agente queda escrito, se puede revisar y sobrevive a la sesión, porque está en git.

## Cómo se comunican

1. **Brief (director → especialista).** Al lanzar un agente, el director le pasa:
   - Objetivo y entregable.
   - Rutas de entrada, es decir, los archivos que debe leer.
   - Ruta de salida.
   - Fecha límite dentro de la semana.
   - Criterio de calidad.
2. **Traspaso (especialista → director).** Cada agente termina **siempre** su respuesta con este bloque:

```
## TRASPASO
- Entregable: <ruta del archivo>
- Estado: listo | parcial | bloqueado
- Para: <siguiente agente o "Director">
- Necesito: <datos, permisos o herramientas que faltan — o "nada">
- Riesgos/dudas: <lo que el director debe saber antes de aprobar>
```

3. **Tablero** (`agencia/tablero/`):
   - `backlog.md`: tareas abiertas, con su responsable.
   - `decisiones.md`: decisiones tomadas y quién las aprobó.
   - `incidencias.md`: problemas abiertos, como integraciones caídas o datos que faltan.
   - `necesito-del-dueno.md`: la única lista de cosas que tiene que hacer o aprobar el dueño.

## Flujo semanal (8 fases)

| Fase | Cuándo | Quién | Entra | Sale |
|---|---|---|---|---|
| 1. Investigación | lunes | Investigador y Director Creativo, en paralelo | Radar, noticias, comentarios, informe semanal | `investigacion/AAAA-Wnn.md` y `ideas/AAAA-Wnn.md` (con 20 ideas o más) |
| 2. Planificación | lunes | Director | Ideas, KPI y huecos de Metricool | `calendario/AAAA-Wnn.md`: 14 shorts y 1 vídeo largo |
| 3. Guionización | lunes y martes | Guionista (consulta al investigador si falta un dato) | Calendario y fichas de datos | `guiones/AAAA-Wnn/NN-slug.md` |
| 4. Producción | martes y miércoles | Producción | Guiones | `produccion/AAAA-Wnn/NN-slug.md` (planos, prompts, rótulos, música) |
| 5. Distribución | miércoles | Community manager | Guiones, producción y mejores horas | `publicaciones/AAAA-Wnn.md` (textos por red) → **el dueño aprueba** → el director programa |
| 6. Captación | continua | Growth y Web/CRO | Datos y embudo | Propuestas en `growth/` y `web/`, y cambios en ramas `web/*` |
| 7. Análisis | lunes por la mañana | Analista | Metricool y Search Console | `informes/semanal/AAAA-Wnn.md` |
| 8. Optimización | lunes | Director con todos | Informe | Decisiones en `tablero/decisiones.md` y ajustes del calendario |

Además, cada día el director genera el **informe diario** (`informes/diario/AAAA-MM-DD.md`). El primer lunes de cada mes, el analista prepara el **mensual**.

## Puntos de control humano (no se saltan)

| Acción | Quién la prepara | Quién la aprueba |
|---|---|---|
| Programar o publicar en Metricool | Community manager | Dueño, en el chat |
| Cambios en la web (merge o push a `main`) | Web/CRO o SEO, en la rama `web/*` | Dueño, después de ver la vista previa local |
| Cualquier gasto (anuncios, dominio, herramientas) | Growth | Dueño |
| Responder a comentarios en nombre de la marca | Community manager, como borrador | Dueño |

## Comandos de arranque

Se piden al Director General (la sesión principal) en lenguaje natural:
- «Arranca la semana»: ejecuta las fases 1 a 5.
- «Informe diario».
- «Informe semanal»: lanza al analista y después la fase 8.
- «Informe mensual».
- «Auditoría web»: Web/CRO y SEO, en paralelo.
