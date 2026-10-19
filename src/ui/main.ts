export function mountApp(container: HTMLElement) {
  container.innerHTML = `
    <div class="game-container">
      <header class="header">
        <h1 class="title">Juego del Ahorcado</h1>
        <p class="subtitle">Desarrollo Ágil con ATDD & TDD</p>
      </header>

      <section class="card" id="registro-card">
        <h2 class="card-title">Registro de Jugador</h2>
        <form id="registro-form" class="form">
          <div class="field-group">
            <label for="nombre" class="label">Nombre del Jugador</label>
            <input 
              id="nombre" 
              name="nombre" 
              type="text" 
              class="input" 
              placeholder="Ingresa tu nombre..." 
              autocomplete="off"
            />
          </div>
          <button type="submit" class="btn btn-primary" id="btn-confirmar">
            Confirmar
          </button>
        </form>
        <div id="mensaje-error" class="error-message" role="alert" style="display: none;"></div>
      </section>

      <section class="card" id="jugador-card" style="display: none;">
        <div class="welcome-box">
          <span class="badge">Jugador Activo</span>
          <h2 id="jugador-nombre" class="player-heading"></h2>
        </div>
      </section>
    </div>
  `;

  const form = container.querySelector<HTMLFormElement>("#registro-form");
  const input = container.querySelector<HTMLInputElement>("#nombre");
  const jugadorCard = container.querySelector<HTMLElement>("#jugador-card");
  const jugadorNombre = container.querySelector<HTMLElement>("#jugador-nombre");

  form?.addEventListener("submit", (e) => {
    e.preventDefault();
    const nombre = input?.value.trim() ?? "";

    if (nombre) {
      if (jugadorCard && jugadorNombre) {
        jugadorNombre.textContent = nombre;
        jugadorCard.style.display = "block";
      }
    }
  });
}
