# features/registrar-usuario.feature
# language: es
@HU-01
Característica: Registrar usuario
    Como jugador
    quiero registrarme
    para poder guardar mi progreso

    Regla: un nombre no vacío queda visible como identidad
        @CA-01
        Escenario: El jugador define su nombre
            Dado que abro la aplicación
            Cuando ingreso el nombre "Ana" y confirmo
            Entonces se muestra el nombre "Ana"
        
    Regla: no se puede jugar sin elegir un nombre
        @CA-02
        Escenario: El jugador no define un nombre
            Dado que abro la aplicación
            Cuando ingreso el nombre "" y confirmo
            Entonces se muestra el mensaje "El nombre no puede estar vacío"