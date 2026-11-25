# Cómo usar la agencia Par Motor

1. Abre Claude Code **en la raíz del repositorio** `parmotor`. Así se cargan `CLAUDE.md` y los 10 agentes de `.claude/agents/`.
2. Habla con el Director General (la sesión principal) en lenguaje natural:

| Dices | Pasa |
|---|---|
| «Arranca la semana» | Investigador y Creativo en paralelo → plan de 14 shorts y 1 largo → guiones → producción → textos por red → **te pide aprobación** |
| «Informe diario» | `informes/diario/AAAA-MM-DD.md` |
| «Informe semanal» | El analista lee Metricool → informe → decisiones de la semana |
| «Informe mensual» | Evolución y objetivos del mes siguiente |
| «Auditoría web» | Web/CRO y SEO en paralelo → propuestas priorizadas |
| «Aprobado, prográmalo» | El director programa en Metricool lo que hayas aprobado (y nada más) |

3. Lo que tienes que hacer tú está siempre en `tablero/necesito-del-dueno.md`.

## Mapa de carpetas
```
agencia/
  00-diagnostico.md   arquitectura.md   marca.md   kpis.md   integraciones.md
  calendario/   ideas/   investigacion/   guiones/   produccion/   publicaciones/
  web/   seo/   growth/   datos/   informes/{diario,semanal,mensual}/
  plantillas/   tablero/{backlog,decisiones,incidencias,necesito-del-dueno}.md
```

## Ojo: el repositorio es público
GitHub Pages sirve también esta carpeta (por ejemplo, `…/parmotor/agencia/marca.md`). Aquí no hay secretos ni datos personales, pero la estrategia queda a la vista. Si prefieres ocultarla, hay dos opciones: mover `agencia/` a un repositorio privado aparte, o excluirla de Pages (con `_config.yml` → `exclude`, si la web usa Jekyll).
