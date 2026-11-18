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

        @CA-02
        Escenario: El resumen muestra los errores y las letras fallidas en orden
            Dado que abro la aplicación con la palabra "GATO"
            Y ingreso el nombre "Ana" y confirmo
            Cuando inicio la partida
            Y arriesgo la letra "Z"
            Y arriesgo la letra "B"
            Y arriesgo la letra "G"
            Y arriesgo la letra "A"
            Y arriesgo la letra "T"
            Y arriesgo la letra "O"
            Entonces en la primera partida del resumen la cantidad de errores es "2"
            Y en la primera partida del resumen las letras fallidas son "Z B"

        @CA-03
        Escenario: La partida más reciente aparece arriba
            Dado que abro la aplicación con la palabra "GATO"
            Y ingreso el nombre "Ana" y confirmo
            Cuando inicio la partida
            Y arriesgo la letra "Z"
            Y arriesgo la letra "G"
            Y arriesgo la letra "A"
            Y arriesgo la letra "T"
            Y arriesgo la letra "O"
            Y inicio la partida
            Y arriesgo la letra "G"
            Y arriesgo la letra "A"
            Y arriesgo la letra "T"
            Y arriesgo la letra "O"
            Entonces en la primera partida del resumen la cantidad de errores es "0"
            Y en la segunda partida del resumen las letras fallidas son "Z"

    Regla: el resumen muestra el tiempo máximo elegido
        @CA-04
        Escenario: El resumen muestra el tiempo máximo elegido
            Dado que abro la aplicación con la palabra "GATO"
            Y ingreso el nombre "Ana" y confirmo
            Cuando elijo un tiempo de partida de "10 minutos"
            Y inicio la partida
            Y arriesgo la letra "G"
            Y arriesgo la letra "A"
            Y arriesgo la letra "T"
            Y arriesgo la letra "O"
            Entonces en la primera partida del resumen el tiempo máximo es "10:00"
