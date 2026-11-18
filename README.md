# Ahorcado — Metodologías Ágiles

Juego del Ahorcado en el navegador. La lógica vive en `src/domain/` y la pantalla en `src/ui/`. El comportamiento visible se especifica con Gherkin y corre contra la app real. La lógica se prueba con Vitest, sin DOM.

## Entrega

- Repositorio: https://github.com/estebannbn/tpi-agiles
- App en producción: https://estebannbn.github.io/tpi-agiles/
- Última corrida del pipeline en `master`: https://github.com/estebannbn/tpi-agiles/actions/runs/44231561196
- Story map: https://app.diagrams.net/#G1X2hekHfpzbOiyQvD_E8iFB-XJqZ_7hIm#%7B%22pageId%22%3A%22GXs0erJQ62o2Be2boEGZ%22%7D
- Trazabilidad historia → criterio → escenario → unit test: [NOTES.md](NOTES.md)

La cobertura del dominio y el análisis estático no tienen un tablero aparte. Los dos se ven en esa corrida: el job de coverage corta si `src/domain/` baja del 90%, y el de ESLint corta con cualquier warning (`--max-warnings 0`).

## Historias

Cada historia es un `.feature`. El tag `@HU-0X` marca la historia y `@CA-0X` el criterio. Una historia está terminada cuando todos sus escenarios están verdes (`npx playwright test --grep @HU-03`).

| Historia | Feature | Qué cubre |
|---|---|---|
| HU-01 Registrar usuario | `features/registrar-usuario.feature` | Nombre del jugador, y rechazo si está vacío |
| HU-02 Configurar partida | `features/configurar-partida.feature` | Tiempo, intentos y reloj |
| HU-03 Jugar partida | `features/jugar-partida.feature` | Partida: acertar, fallar, ganar, perder, volver a jugar |
| HU-04 Resumen de partidas | `features/resumen-partidas.feature` | Historial de la sesión, de la más reciente a la más antigua |
| HU-05 Dibujo del ahorcado | `features/dibujo-ahorcado.feature` | Partes del muñeco según los errores |
| HU-06 Palabras sin repetir | `features/palabras.feature` | Mazo que no repite hasta agotar la biblioteca |

## Pipeline

En cada push, `.github/workflows/ci.yml` corre las etapas en orden. Si una falla, no se despliega.

1. Build (`npm run build`)
2. Unit tests (`npm test`)
3. Coverage del dominio, umbral 90% (`npm run coverage`)
4. Análisis estático (`npm run lint`)
5. Acceptance tests (`npm run at`)
6. Deploy a GitHub Pages, solo en `main` o `master`, si las etapas anteriores pasaron

## Cómo correrlo

```bash
npm install
npm run dev          # http://localhost:5173
npm test             # unit tests del dominio
npm run coverage     # cobertura, falla bajo 90% en src/domain/
npm run lint         # ESLint, falla si hay warnings
npm run at           # acceptance tests contra la app levantada
```

Para una partida determinista: `http://localhost:5173/?word=GATO`. El mazo se fija con `?biblioteca=SOL,LUNA&azar=0`. La duración del resumen se fija con `?duracion=90`.
