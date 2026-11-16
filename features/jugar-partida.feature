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

    Regla: arriesgar una letra presente revela la letra sin perder vidas
        @CA-02
        Escenario: Acertar A revela la letra y no descuenta vidas
            Dado que abro la aplicación con la palabra "GATO"
            Y ingreso el nombre "Ana" y confirmo
            Cuando inicio la partida
            Y arriesgo la letra "A"
            Entonces veo la palabra "_ A _ _"
            Y veo "6" vidas

    Regla: arriesgar una letra ausente descuenta una vida
        @CA-03
        Escenario: Fallar Z descuenta una vida
            Dado que abro la aplicación con la palabra "GATO"
            Y ingreso el nombre "Ana" y confirmo
            Cuando inicio la partida
            Y arriesgo la letra "Z"
            Entonces veo la palabra "_ _ _ _"
            Y veo "5" vidas

    Regla: la partida usa los intentos configurados
        @CA-04
        Escenario: La partida usa los 10 intentos elegidos
            Dado que abro la aplicación con la palabra "GATO"
            Y ingreso el nombre "Ana" y confirmo
            Cuando elijo "10 intentos"
            Y inicio la partida
            Entonces veo "10" vidas

    Regla: completar la palabra hace ganar la partida
        @CA-05
        Escenario: Completar la palabra muestra GANASTE
            Dado que abro la aplicación con la palabra "GATO"
            Y ingreso el nombre "Ana" y confirmo
            Cuando inicio la partida
            Y arriesgo la letra "G"
            Y arriesgo la letra "A"
            Y arriesgo la letra "T"
            Y arriesgo la letra "O"
            Entonces veo el mensaje "GANASTE"

    Regla: seis fallos hacen perder la partida
        @CA-06
        Escenario: Seis fallos muestran PERDISTE y la palabra
            Dado que abro la aplicación con la palabra "GATO"
            Y ingreso el nombre "Ana" y confirmo
            Cuando inicio la partida
            Y arriesgo la letra "B"
            Y arriesgo la letra "C"
            Y arriesgo la letra "D"
            Y arriesgo la letra "F"
            Y arriesgo la letra "H"
            Y arriesgo la letra "I"
            Entonces veo el mensaje "PERDISTE"
            Y veo la palabra "GATO"

    Regla: una letra fallada repetida no descuenta otra vida
        @CA-07
        Escenario: Repetir una letra fallada no descuenta otra vida
            Dado que abro la aplicación con la palabra "GATO"
            Y ingreso el nombre "Ana" y confirmo
            Cuando inicio la partida
            Y arriesgo la letra "Z"
            Y arriesgo la letra "Z"
            Entonces veo "5" vidas

