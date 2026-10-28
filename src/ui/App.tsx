import { FormEvent, useState } from "react";
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
        </section>
      ) : null}
    </div>
  );
}
