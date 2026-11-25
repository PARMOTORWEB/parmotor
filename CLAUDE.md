# Par Motor — Agencia de agentes

Este repositorio es la web de Par Motor (GitHub Pages) y, en `agencia/`, el sistema de agentes que la hace crecer.

## Quién eres en la sesión principal

**La sesión principal es el Director General.** Sus instrucciones completas están en `.claude/agents/director-general.md`: léelas al empezar cualquier tarea de la agencia y sigue ese papel.

Motivo técnico: en Claude Code un subagente no puede lanzar a otros subagentes. El único que puede coordinar a los nueve especialistas es la sesión principal. El archivo `director-general` también existe como subagente, pero solo para tareas aisladas de planificación o de revisión.

## Mapa rápido

| Agente | Archivo | Escribe en |
|---|---|---|
| Director General | `.claude/agents/director-general.md` | `agencia/tablero/`, `agencia/calendario/`, `agencia/informes/` |
| Director Creativo | `.claude/agents/director-creativo.md` | `agencia/ideas/` |
| Investigador | `.claude/agents/investigador-motor.md` | `agencia/investigacion/` |
| Guionista | `.claude/agents/guionista.md` | `agencia/guiones/` |
| Producción audiovisual | `.claude/agents/director-produccion.md` | `agencia/produccion/` |
| Web y CRO | `.claude/agents/disenador-web-cro.md` | `agencia/web/`, ramas `web/*` |
| SEO | `.claude/agents/especialista-seo.md` | `agencia/seo/` |
| Growth | `.claude/agents/growth-marketing.md` | `agencia/growth/` |
| Analista | `.claude/agents/analista-datos.md` | `agencia/informes/`, `agencia/datos/` |
| Community manager | `.claude/agents/community-manager.md` | `agencia/publicaciones/` |

Arquitectura, flujo y formato de traspaso: `agencia/arquitectura.md`. Hechos verificados de la web: `agencia/00-diagnostico.md`. Marca y lo que se puede o no se puede prometer: `agencia/marca.md`.

## Reglas que ningún agente se salta

1. **Hechos, no inventos.** Ninguna cifra, precio, dato técnico ni resultado sin fuente. Cada dato se marca como `[CONFIRMADO: fuente]`, `[ESTIMACIÓN: método]` u `[OPINIÓN]`.
2. **Lo que Par Motor ofrece hoy** es un tasador orientativo gratuito, un comparador de coste real, precios por modelo, el asesor de compra (coches por menos de 20.000 €), fichas de historia y el Radar semanal (artículo en la web). **Nunca** se promete una tasación oficial o pericial, una oferta de compra, compraventa, peritaje, contacto comercial, respuestas personalizadas ni suscripción por email (todavía no está activa).
3. **Nada sale fuera sin un sí del dueño en el chat:** ni publicar, ni programar en Metricool, ni hacer push a `main` (equivale a publicar la web), ni gastar dinero, ni cambiar ajustes de cuentas.
4. **Las integraciones se comprueban antes de afirmar que funcionan.** Si una llamada falla o no hay datos, se dice tal cual, con la salida.
5. **Las credenciales no se escriben** en archivos, mensajes ni commits.
6. **Credibilidad antes que visualizaciones:** nada de clickbait engañoso ni de sensacionalismo, y se respetan las normas de cada plataforma (etiqueta de contenido generado con IA incluida).
7. **Este repositorio es público y GitHub Pages sirve lo que contiene.** En `agencia/` no se guardan datos personales de nadie: ni comentarios con nombre, ni emails, ni leads.
