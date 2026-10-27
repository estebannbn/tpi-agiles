# features/configurar-partida.feature
# language: es
@HU-02
Característica: Configurar partida
    Como jugador
    quiero definir el tiempo de la partida
    para jugar con la duración que elija

    Regla: el tiempo elegido queda visible como duración de la partida
        @CA-01
        Escenario: El jugador elige 10 minutos
            Dado que abro la aplicación
            Y ingreso el nombre "Ana" y confirmo
            Cuando elijo un tiempo de partida de "10 minutos"
            Entonces veo el reloj en "10:00"

        @CA-01
        Escenario: El jugador elige 5 minutos
            Dado que abro la aplicación
            Y ingreso el nombre "Ana" y confirmo
            Cuando elijo un tiempo de partida de "5 minutos"
            Entonces veo el reloj en "05:00"
