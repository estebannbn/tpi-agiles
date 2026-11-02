# features/jugar-partida.feature
# language: es
@HU-03
Característica: Jugar partida
    Como jugador
    quiero jugar una partida
    para descubrir la palabra

    Regla: iniciar la partida muestra la palabra y las vidas
        @CA-01
        Escenario: Iniciar partida muestra la palabra y 6 vidas
            Dado que abro la aplicación con la palabra "GATO"
            Y ingreso el nombre "Ana" y confirmo
            Cuando inicio la partida
            Entonces veo la palabra "_ _ _ _"
            Y veo "6" vidas

