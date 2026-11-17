# features/resumen-partidas.feature
# language: es
@HU-04
Característica: Resumen de partidas
    Como jugador
    quiero ver el resumen de mis partidas
    para revisar cómo jugué, de la más reciente a la más antigua

    Regla: cada partida ganada se agrega al resumen con la palabra y el resultado
        @CA-01
        Escenario: Al ganar se ve la palabra y GANASTE
            Dado que abro la aplicación con la palabra "GATO"
            Y ingreso el nombre "Ana" y confirmo
            Cuando inicio la partida
            Y arriesgo la letra "G"
            Y arriesgo la letra "A"
            Y arriesgo la letra "T"
            Y arriesgo la letra "O"
            Entonces en la primera partida del resumen la palabra es "GATO"
            Y en la primera partida del resumen el resultado es "GANASTE"
