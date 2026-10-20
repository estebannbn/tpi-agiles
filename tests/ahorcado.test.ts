import { describe, it, expect } from "vitest";
import { Ahorcado } from "../src/domain/ahorcado";

describe("Ahorcado - Dominio", () => {
  it("revela todas las ocurrencias de la letra acertada", () => {
    const juego = new Ahorcado("ALA");
    juego.adivinar("A");
    expect(juego.palabraEnmascarada()).toBe("A _ A");
  });

  it("descuenta una vida al fallar una letra", () => {
    const juego = new Ahorcado("GATO");
    juego.adivinar("E");
    expect(juego.getVidas()).toBe(5);
  });
});
