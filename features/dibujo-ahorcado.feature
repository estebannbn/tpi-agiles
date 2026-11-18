# features/dibujo-ahorcado.feature
# language: es
@HU-05
Característica: Dibujo del ahorcado
    Como jugador
    quiero ver el muñeco
    para saber cuántos errores llevo

    Regla: cada error suma una parte del muñeco
        @CA-01
        Escenario: El primer error dibuja la cabeza
            Dado que abro la aplicación con la palabra "GATO"
            Y ingreso el nombre "Ana" y confirmo
            Cuando inicio la partida
            Y arriesgo la letra "Z"
            Entonces veo la parte "cabeza"
            Y no veo la parte "torso"
