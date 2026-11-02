import { FormEvent, useState } from "react";
import { Ahorcado } from "../domain/ahorcado";
import { configurarIntentos, intentosIniciales } from "../domain/intentos";
import { formatearReloj } from "../domain/reloj";

const duraciones = [5, 10, 15];
const opcionesIntentos = [6, 7, 8, 9, 10];

export function App() {
  const [nombre, setNombre] = useState("");
  const [jugador, setJugador] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [tiempo, setTiempo] = useState<string | null>(null);
  const [intentos, setIntentos] = useState(intentosIniciales());
  const [juego, setJuego] = useState<Ahorcado | null>(null);
  const [palabraMostrada, setPalabraMostrada] = useState("");
  const [vidasRestantes, setVidasRestantes] = useState(6);
  const [letra, setLetra] = useState("");

  function iniciarPartida() {
    const params = new URLSearchParams(window.location.search);
    const palabra = params.get("word") || "GATO";
    const nuevoJuego = new Ahorcado(palabra);
    setJuego(nuevoJuego);
    setPalabraMostrada(nuevoJuego.palabraEnmascarada());
    setVidasRestantes(nuevoJuego.getVidas());
  }

  function arriesgar(event: FormEvent) {
    event.preventDefault();
    if (juego && letra.trim()) {
      juego.adivinar(letra.trim());
      setPalabraMostrada(juego.palabraEnmascarada());
      setVidasRestantes(juego.getVidas());
    }
    setLetra("");
  }

  function confirmar(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const limpio = nombre.trim();
    if (!limpio) {
      setError("El nombre no puede estar vacío");
      return;
    }
    setError("");
    setJugador(limpio);
  }

  return (
    <div className="game-container">
      <header className="header">
        <h1 className="title">Juego del Ahorcado</h1>
        <p className="subtitle">Desarrollo Ágil con ATDD & TDD</p>
      </header>

      <section className="card" id="registro-card">
        <h2 className="card-title">Registro de Jugador</h2>
        <form id="registro-form" className="form" onSubmit={confirmar}>
          <div className="field-group">
            <label htmlFor="nombre" className="label">
              Nombre del Jugador
            </label>
            <input
              id="nombre"
              name="nombre"
              type="text"
              className="input"
              placeholder="Ingresa tu nombre..."
              autoComplete="off"
              value={nombre}
              onChange={(event) => setNombre(event.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary" id="btn-confirmar">
            Confirmar
          </button>
        </form>
        {error ? (
          <div id="mensaje-error" className="error-message" role="alert">
            {error}
          </div>
        ) : null}
      </section>

      {jugador ? (
        <section className="card" id="jugador-card">
          <div className="welcome-box">
            <span className="badge">Jugador Activo</span>
            <h2 id="jugador-nombre" className="player-heading">
              {jugador}
            </h2>
          </div>
          <div
            className="tiempo-partida"
            role="radiogroup"
            aria-label="Tiempo de partida"
          >
            <span className="label">Tiempo de partida</span>
            {duraciones.map((minutos) => (
              <label className="opcion" key={minutos}>
                <input
                  type="radio"
                  name="tiempo-partida"
                  value={`${minutos} minutos`}
                  checked={tiempo === formatearReloj(minutos)}
                  onChange={() => setTiempo(formatearReloj(minutos))}
                />
                {minutos} minutos
              </label>
            ))}
          </div>
          <div
            className="tiempo-partida"
            role="group"
            aria-label="Cantidad de intentos"
          >
            <span className="label">Cantidad de intentos</span>
            {opcionesIntentos.map((cantidad) => (
              <label className="opcion" key={cantidad}>
                <input
                  type="radio"
                  name="cantidad-intentos"
                  aria-label={`${cantidad} intentos`}
                  value={`${cantidad} intentos`}
                  checked={intentos === cantidad}
                  onChange={() => setIntentos(configurarIntentos(cantidad))}
                />
                {cantidad}
              </label>
            ))}
            <span>{intentos} intentos</span>
          </div>
          {tiempo ? (
            <div className="reloj-container">
              <span className="label">Tiempo restante</span>
              <div id="reloj" data-testid="reloj" className="reloj">
                {tiempo}
              </div>
            </div>
          ) : null}

          <button
            type="button"
            className="btn btn-primary"
            id="btn-jugar"
            onClick={iniciarPartida}
          >
            Jugar
          </button>
        </section>
      ) : null}

      {juego ? (
        <section className="card" id="tablero-card">
          <h2 className="card-title">Partida</h2>
          <div className="tablero">
            <div data-testid="palabra" className="palabra">
              {palabraMostrada}
            </div>
            <div className="vidas-container">
              <span className="label">Vidas:</span>
              <span data-testid="vidas" className="vidas">
                {vidasRestantes}
              </span>
            </div>
          </div>
          <form className="form" onSubmit={arriesgar}>
            <div className="field-group">
              <label htmlFor="letra" className="label">
                Letra
              </label>
              <input
                id="letra"
                name="letra"
                type="text"
                className="input"
                maxLength={1}
                aria-label="Letra"
                autoComplete="off"
                value={letra}
                onChange={(event) => setLetra(event.target.value)}
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              id="btn-arriesgar"
            >
              Arriesgar
            </button>
          </form>
        </section>
      ) : null}
    </div>
  );
}
