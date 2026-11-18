import { FormEvent, ReactElement, useEffect, useRef, useState } from "react";
import { Ahorcado } from "../domain/ahorcado";
import { partesDelAhorcado } from "../domain/dibujo";
import { formatearDuracion, Historial, PartidaResumen, tiempoMaximo } from "../domain/historial";
import { configurarIntentos, intentosIniciales } from "../domain/intentos";
import { BIBLIOTECA, Mazo } from "../domain/palabras";
import { formatearReloj, tiempoRestante } from "../domain/reloj";

function crearMazo(params: URLSearchParams): Mazo {
  const bibParam = params.get("biblioteca");
  const biblioteca = bibParam
    ? bibParam.split(",").map((p) => p.trim()).filter(Boolean)
    : BIBLIOTECA;
  const azarParam = params.get("azar");
  const azar =
    azarParam !== null && azarParam !== ""
      ? () => Number(azarParam)
      : Math.random;
  return new Mazo(biblioteca, azar);
}

function Partes({ nombre }: { nombre: string }) {
  const trazo: Record<string, ReactElement> = {
    cabeza: <circle data-testid="parte-cabeza" cx="120" cy="54" r="18" />,
    torso: <line data-testid="parte-torso" x1="120" y1="72" x2="120" y2="130" />,
    "brazo-izquierdo": <line data-testid="parte-brazo-izquierdo" x1="120" y1="88" x2="88" y2="112" />,
    "brazo-derecho": <line data-testid="parte-brazo-derecho" x1="120" y1="88" x2="152" y2="112" />,
    "pierna-izquierda": <line data-testid="parte-pierna-izquierda" x1="120" y1="130" x2="96" y2="176" />,
    "pierna-derecha": <line data-testid="parte-pierna-derecha" x1="120" y1="130" x2="144" y2="176" />,
    "mano-izquierda": <line data-testid="parte-mano-izquierda" x1="88" y1="112" x2="78" y2="122" />,
    "mano-derecha": <line data-testid="parte-mano-derecha" x1="152" y1="112" x2="162" y2="122" />,
    "pie-izquierdo": <line data-testid="parte-pie-izquierdo" x1="96" y1="176" x2="82" y2="176" />,
    "pie-derecho": <line data-testid="parte-pie-derecho" x1="144" y1="176" x2="158" y2="176" />,
  };
  return trazo[nombre] ?? null;
}

const duraciones = [5, 10, 15];
const opcionesIntentos = [6, 7, 8, 9, 10];

export function App() {
  const [nombre, setNombre] = useState("");
  const [jugador, setJugador] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [tiempo, setTiempo] = useState<string | null>(null);
  const [reloj, setReloj] = useState<string | null>(null);
  const [corriendo, setCorriendo] = useState(false);
  const [minutosElegidos, setMinutosElegidos] = useState(5);
  const [intentos, setIntentos] = useState(intentosIniciales());
  const [juego, setJuego] = useState<Ahorcado | null>(null);
  const [palabraMostrada, setPalabraMostrada] = useState("");
  const [vidasRestantes, setVidasRestantes] = useState(6);
  const [letra, setLetra] = useState("");
  const [historial] = useState(() => new Historial());
  const [partidas, setPartidas] = useState<PartidaResumen[]>([]);
  const inicioRef = useRef(Date.now());
  const minutosDePartida = useRef(minutosElegidos);
  const mazoRef = useRef<Mazo | null>(null);

  function segundosJugados(): number {
    const fija = new URLSearchParams(window.location.search).get("duracion");
    if (fija !== null && fija !== "") return Number(fija);
    return Math.floor((Date.now() - inicioRef.current) / 1000);
  }

  useEffect(() => {
    if (!corriendo) return;
    const id = window.setInterval(() => {
      const transcurridos = Math.floor((Date.now() - inicioRef.current) / 1000);
      setReloj(tiempoRestante(minutosDePartida.current, transcurridos));
    }, 1000);
    return () => window.clearInterval(id);
  }, [corriendo]);

  function iniciarPartida() {
    inicioRef.current = Date.now();
    minutosDePartida.current = minutosElegidos;
    setReloj(tiempoRestante(minutosElegidos, 0));
    setCorriendo(true);
    const params = new URLSearchParams(window.location.search);
    const wordParam = params.get("word");
    let palabra: string;
    if (wordParam) {
      palabra = wordParam;
    } else {
      if (!mazoRef.current) {
        mazoRef.current = crearMazo(params);
      }
      palabra = mazoRef.current.sacar();
    }
    const nuevoJuego = new Ahorcado(palabra, intentos);
    setJuego(nuevoJuego);
    setPalabraMostrada(nuevoJuego.palabraEnmascarada());
    setVidasRestantes(nuevoJuego.getVidas());
  }

  function arriesgar(event: FormEvent) {
    event.preventDefault();
    if (juego && !juego.gano() && letra.trim()) {
      juego.adivinar(letra.trim());
      setPalabraMostrada(
        juego.perdio() ? juego.palabra() : juego.palabraEnmascarada(),
      );
      setVidasRestantes(juego.getVidas());
      if (juego.gano()) {
        historial.registrar({
          palabra: juego.palabra(),
          resultado: "GANASTE",
          errores: juego.letrasFallidas().length,
          fallidas: juego.letrasFallidas().join(" "),
          tiempoMaximo: tiempoMaximo(minutosElegidos),
          duracion: formatearDuracion(segundosJugados()),
        });
        setPartidas(historial.listado());
      }
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
    const marca = formatearReloj(5);
    setMinutosElegidos(5);
    setTiempo(marca);
    setReloj(marca);
  }

  return (
    <div className="game-container">
      <header className="header">
        <h1 className="title">Juego del Ahorcado</h1>
        <p className="subtitle">Desarrollo Ágil con ATDD & TDD</p>
      </header>

      <div className="layout">
      <div className="columna columna-config">
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
            <div className="opciones">
            {duraciones.map((minutos) => (
              <label className="opcion" key={minutos}>
                <input
                  type="radio"
                  name="tiempo-partida"
                  value={`${minutos} minutos`}
                  checked={tiempo === formatearReloj(minutos)}
                  onChange={() => {
                    setMinutosElegidos(minutos);
                    const marca = formatearReloj(minutos);
                    setTiempo(marca);
                    setReloj(marca);
                  }}
                />
                {minutos} minutos
              </label>
            ))}
            </div>
          </div>
          <div
            className="tiempo-partida"
            role="group"
            aria-label="Cantidad de intentos"
          >
            <span className="label">Cantidad de intentos</span>
            <div className="opciones">
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
            </div>
            <span>{intentos} intentos</span>
          </div>
          {tiempo ? (
            <div className="reloj-container">
              <span className="label">Tiempo restante</span>
              <div id="reloj" data-testid="reloj" className="reloj">
                {reloj}
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
      </div>

      <div className="columna columna-partida">
      {juego ? (
        <section className="card" id="tablero-card">
          <h2 className="card-title">Partida</h2>
          <div className="tablero">
            <svg data-testid="ahorcado" className="ahorcado" viewBox="0 0 200 220" aria-hidden="true">
              <line x1="20" y1="210" x2="100" y2="210" />
              <line x1="50" y1="210" x2="50" y2="16" />
              <line x1="50" y1="16" x2="120" y2="16" />
              <line x1="120" y1="16" x2="120" y2="36" />
              {partesDelAhorcado(juego.letrasFallidas().length).map((parte) => (
                <Partes key={parte} nombre={parte} />
              ))}
            </svg>
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
          {juego.gano() ? (
            <div data-testid="resultado" className="resultado">
              GANASTE
            </div>
          ) : juego.perdio() ? (
            <div data-testid="resultado" className="resultado">
              PERDISTE
            </div>
          ) : null}
        </section>
      ) : null}
      </div>

      <div className="columna columna-resumen">
      <section className="card" id="resumen-card">
        <h2 className="card-title">Resumen de partidas</h2>
        {partidas.length === 0 ? (
          <p className="resumen-vacio">Todavía no jugaste. Inicia una partida</p>
        ) : (
          <div className="resumen-lista">
            {partidas.map((partida, index) => (
              <article key={index} data-testid="partida" className="partida-resumen">
                <span data-testid="resumen-palabra">{partida.palabra}</span>
                <span data-testid="resumen-resultado">{partida.resultado}</span>
                <span data-testid="resumen-errores">{partida.errores}</span>
                <span data-testid="resumen-fallidas">{partida.fallidas}</span>
                <span data-testid="resumen-tiempo-maximo">{partida.tiempoMaximo}</span>
                <span data-testid="resumen-duracion">{partida.duracion}</span>
              </article>
            ))}
          </div>
        )}
      </section>
      </div>
      </div>
    </div>
  );
}
