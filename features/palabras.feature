# features/palabras.feature
# language: es
@HU-06
Característica: Palabras sin repetir
    Como jugador
    quiero una palabra distinta en cada partida
    para no jugar siempre la misma

    Regla: cada partida usa la siguiente carta del mazo
        @CA-01
        Escenario: La primera partida usa la primera carta del mazo
            Dado que abro la aplicación con la biblioteca "SOL,LUNA" y azar "0"
            Y ingreso el nombre "Ana" y confirmo
            Cuando inicio la partida
            Entonces veo la palabra "_ _ _"
            Y no veo la palabra "_ _ _ _"

        @CA-02
        Escenario: La segunda partida usa la carta siguiente
            Dado que abro la aplicación con la biblioteca "SOL,LUNA" y azar "0"
            Y ingreso el nombre "Ana" y confirmo
            Cuando inicio la partida
            Y inicio la partida
            Entonces veo la palabra "_ _ _ _"

        @CA-03
        Escenario: La tercera partida vuelve a mezclar
            Dado que abro la aplicación con la biblioteca "SOL,LUNA" y azar "0"
            Y ingreso el nombre "Ana" y confirmo
            Cuando inicio la partida
            Y inicio la partida
            Y inicio la partida
            Entonces veo la palabra "_ _ _"
