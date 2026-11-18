# NOTES — trazabilidad

Cadena que se puede recorrer en los dos sentidos:

**Historia → criterio → escenario (acceptance test) → unit tests**

- La historia y el criterio están en el `.feature`: `Característica` con `@HU-0X`, `Regla` con `@CA-0X`, y el `Escenario`.
- El escenario lo ejecuta Playwright contra la app real. Los pasos están en `steps/`.
- El unit test está en `tests/` y ejercita solo `src/domain/`. El dominio no lleva el tag de la historia: la misma regla (revelar una letra, descontar una vida) sirve a más de una historia. Este archivo cierra ese último tramo.
- El story map está en el [README](README.md).

Una historia está terminada cuando todos los escenarios de su feature están verdes.

Donde un criterio es comportamiento de pantalla y no hay regla de dominio, la tabla lo dice. En esos casos el acceptance test es la confirmación, y no hay unit test que inventar en `src/domain/`.

## HU-01 Registrar usuario

`features/registrar-usuario.feature`

Como jugador, quiero registrarme para poder guardar mi progreso.

| Criterio | Escenario | Unit tests |
|---|---|---|
| CA-01 Un nombre no vacío queda visible | El jugador define su nombre | Ninguno. Confirmar el nombre y mostrarlo es estado de la pantalla (`App.tsx`). |
| CA-02 No se puede jugar sin nombre | El jugador no define un nombre | Ninguno. El mensaje "El nombre no puede estar vacío" se decide en `confirmar`, antes de que exista una partida. |

## HU-02 Configurar partida

`features/configurar-partida.feature`

Como jugador, quiero definir el tiempo de la partida para jugar con la duración que elija. También elige la cantidad de intentos.

Dominio: `src/domain/reloj.ts`, `src/domain/intentos.ts`. Tests: `tests/reloj.test.ts`, `tests/intentos.test.ts`.

| Criterio | Escenario | Unit tests |
|---|---|---|
| CA-01 El tiempo elegido queda visible | El jugador elige 10 minutos | `formatearReloj(10) es 10:00` |
| CA-01 | El jugador elige 5 minutos | `formatearReloj(5) es 05:00` |
| CA-01 | El jugador elige 15 minutos | El mismo `formatearReloj`: arma `mm:00`. No hay un caso aparte para 15 porque la función no cambia. |
| CA-06 Al confirmar el nombre quedan 5 minutos | Al confirmar se ven 5 minutos | `formatearReloj(5) es 05:00` |
| CA-02 La partida empieza con 6 intentos | La partida empieza con 6 intentos | `intentosIniciales devuelve 6` |
| CA-03 Se puede elegir la cantidad de intentos | El jugador elige 10 intentos | `configurarIntentos(10) es 10` |
| CA-04 El reloj no corre hasta jugar | El reloj no corre hasta Jugar | Ninguno. Que el intervalo no arranque es de la pantalla (`corriendo` en falso). El dominio solo sabe restar segundos, no decide cuándo corre el reloj. |
| CA-05 Al jugar el reloj corre | Al jugar el reloj corre | `tiempoRestante(10, 1) descuenta un segundo`. El acceptance test comprueba que el intervalo de la pantalla arranca. |
| CA-07 Al terminar, el reloj vuelve al tiempo elegido | Al ganar el reloj vuelve a 10:00 | `formatearReloj(10) es 10:00`. La pantalla vuelve a pintar ese valor al cerrar la partida. |

Unit tests del mismo módulo que el acceptance test no dispara, porque la pantalla solo ofrece 6–10:

- `configurarIntentos(11) queda en 10`
- `configurarIntentos(8) devuelve 8`
- `un valor menor a 6 queda en 6`
- `tiempoRestante no baja de 00:00`

## HU-03 Jugar partida

`features/jugar-partida.feature`

Como jugador, quiero jugar una partida para descubrir la palabra. Es la escalera de la guía: iniciar, acertar, fallar, ganar, perder, letra repetida y no seguir jugando. Volver a jugar es una funcionalidad extra.

Dominio: `src/domain/ahorcado.ts`, y para el CA-04 también `src/domain/intentos.ts`. Tests: `tests/ahorcado.test.ts`, `tests/intentos.test.ts`.

La palabra del acceptance test entra por `/?word=GATO`, así el escenario no depende del azar.

| Criterio | Escenario | Unit tests |
|---|---|---|
| CA-01 Iniciar muestra la palabra y las vidas | Iniciar partida muestra la palabra y 6 vidas | `revela todas las ocurrencias de la letra acertada` fija el formato de `palabraEnmascarada` (`A _ A`, guiones y espacios). `descuenta una vida al fallar una letra` parte de 6 y queda en 5. `intentosIniciales devuelve 6` es el valor que la pantalla le pasa al construir la partida. |
| CA-02 Una letra presente se revela y no descuenta | Acertar A revela la letra y no descuenta vidas | `revela todas las ocurrencias de la letra acertada`. Que no descuente es la otra rama de `adivinar`: solo resta si la letra no está. Esa rama la afirma `descuenta una vida al fallar una letra`. |
| CA-03 Una letra ausente descuenta una vida | Fallar Z descuenta una vida | `descuenta una vida al fallar una letra` |
| CA-04 La partida usa los intentos configurados | La partida usa los 10 intentos elegidos | `configurarIntentos(10) es 10` e `inicia con las vidas indicadas` (`new Ahorcado("GATO", 10)` tiene 10 vidas). |
| CA-05 Completar la palabra hace ganar | Completar la palabra muestra GANASTE | `gano es true cuando la palabra está completa`. `una partida nueva no está ganada` fija el caso contrario. La pantalla muestra `GANASTE` cuando `gano()` es verdadero. |
| CA-06 Seis fallos hacen perder | Seis fallos muestran PERDISTE y la palabra | `perdio es true al quedarse sin vidas`. `una partida nueva no está perdida`. `palabra devuelve la palabra secreta` es lo que la pantalla revela al perder. |
| CA-07 Una letra fallada repetida no descuenta otra vida | Repetir una letra fallada no descuenta otra vida | `una letra fallada repetida descuenta una sola vida` |
| CA-08 La partida muestra las letras erradas | La partida muestra la letra errada | `letrasFallidas conserva el orden de los errores` |
| CA-09 Al terminar no se puede seguir arriesgando | Al ganar no se puede seguir arriesgando | `gano es true cuando la palabra está completa`. El input deshabilitado lo decide la pantalla con `gano()` o `perdio()`. `adivinar` no rechaza una letra después del final. |
| CA-10 Volver a jugar abre otra partida | Volver a jugar abre otra partida | Ninguno propio. Cerrar el tablero y conservar el nombre es estado de la pantalla. La partida nueva vuelve a construir un `Ahorcado`, cubierto por los tests de enmascarado y de vidas del CA-01. |

## HU-04 Resumen de partidas

`features/resumen-partidas.feature`

Como jugador, quiero ver el resumen de mis partidas para revisar cómo jugué, de la más reciente a la más antigua.

Dominio: `src/domain/historial.ts`. Para errores y resultado reutiliza `Ahorcado`. Tests: `tests/historial.test.ts`, `tests/ahorcado.test.ts`.

| Criterio | Escenario | Unit tests |
|---|---|---|
| CA-01 Cada partida ganada entra al resumen | Al ganar se ve la palabra y GANASTE | `el historial guarda la partida ganada`. El resultado sale de `gano es true cuando la palabra está completa`. |
| CA-02 El resumen muestra errores y letras fallidas | El resumen muestra los errores y las letras fallidas en orden | `letrasFallidas conserva el orden de los errores`. El resumen guarda `letrasFallidas().length` y el texto unido. |
| CA-03 La más reciente queda arriba | La partida más reciente aparece arriba | `la partida más reciente queda primera` (`registrar` hace `unshift`). |
| CA-04 El resumen muestra el tiempo máximo elegido | El resumen muestra el tiempo máximo elegido | `tiempoMaximo de 10 minutos es 10:00`. `tiempoMaximo de 5 minutos es 05:00` cubre el otro valor que la pantalla ofrece. |
| CA-05 El resumen muestra la duración | El resumen muestra la duración de la partida | `formatearDuracion de 90 segundos es 01:30`. El escenario abre `/?word=GATO&duracion=90` para no esperar el tiempo real. `formatearDuracion de 45 segundos es 00:45` es el otro caso del mismo formato. |
| CA-06 Si no hay partidas, el resumen lo indica | Sin partidas el resumen avisa | Ninguno. El texto "Todavía no jugaste. Inicia una partida" lo elige la pantalla cuando `partidas` está vacío. `Historial` arranca sin partidas, pero el mensaje no es de dominio. |
| CA-07 El resumen guarda la derrota | Al perder se ve la palabra y PERDISTE | `el historial guarda la partida ganada` muestra que `registrar` conserva palabra y resultado, sea cual sea el texto. El `PERDISTE` sale de `perdio es true al quedarse sin vidas`. |

## HU-05 Dibujo del ahorcado

`features/dibujo-ahorcado.feature`

Como jugador, quiero ver el muñeco para saber cuántos errores llevo.

Dominio: `src/domain/dibujo.ts` dice qué partes corresponden a N errores. La pantalla solo las dibuja en el SVG. Tests: `tests/dibujo.test.ts`.

| Criterio | Escenario | Unit tests |
|---|---|---|
| CA-01 Cada error suma una parte | El primer error dibuja la cabeza | `partesDelAhorcado(1) es la cabeza`. `partesDelAhorcado(2) suma el torso` es el caso siguiente, el que el escenario niega ("no veo el torso"). |

Unit test de más, para cuando los intentos pasan de 6 y el muñeco sigue creciendo:

- `partesDelAhorcado(7) incluye la mano izquierda`

## HU-06 Palabras sin repetir

`features/palabras.feature`

Como jugador, quiero una palabra distinta en cada partida para no jugar siempre la misma.

Dominio: `src/domain/palabras.ts` (`Mazo`). Tests: `tests/palabras.test.ts`.

El acceptance test fija el mazo con `/?biblioteca=SOL,LUNA&azar=0`. Sin esos parámetros se usa la biblioteca real y `Math.random`. Si la URL trae `word`, este mazo no se usa.

| Criterio | Escenario | Unit tests |
|---|---|---|
| CA-01 Cada partida usa la siguiente carta | La primera partida usa la primera carta del mazo | `el primer sacar es SOL` |
| CA-02 | La segunda partida usa la carta siguiente | `el segundo sacar es LUNA` |
| CA-03 | La tercera partida vuelve a mezclar | `al acabarse el mazo se vuelve a mezclar` |

Con `azar` constante en 0, Fisher-Yates intercambia siempre contra el índice 0. Para `["SOL", "LUNA"]` el primer `sacar` devuelve `SOL`, el segundo `LUNA`, y al vaciarse la próxima mezcla vuelve a empezar por `SOL`. Por eso el tercer escenario muestra otra vez tres guiones.
