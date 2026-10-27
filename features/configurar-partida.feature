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

        @CA-01
        Escenario: El jugador elige 15 minutos
            Dado que abro la aplicación
            Y ingreso el nombre "Ana" y confirmo
            Cuando elijo un tiempo de partida de "15 minutos"
            Entonces veo el reloj en "15:00"

    Regla: la partida empieza con 6 intentos
        @CA-02
        Escenario: La partida empieza con 6 intentos
            Dado que abro la aplicación
            Y ingreso el nombre "Ana" y confirmo
            Entonces se muestran "6" intentos

    Regla: se puede elegir la cantidad de intentos
        @CA-03
        Escenario: El jugador elige 10 intentos
            Dado que abro la aplicación
            Y ingreso el nombre "Ana" y confirmo
            Cuando elijo "10 intentos"
            Entonces se muestran "10" intentos
