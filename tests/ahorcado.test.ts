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

  it("inicia con las vidas indicadas", () => {
    const juego = new Ahorcado("GATO", 10);
    expect(juego.getVidas()).toBe(10);
  });

  it("gano es true cuando la palabra está completa", () => {
    const juego = new Ahorcado("GATO");
    juego.adivinar("G");
    juego.adivinar("A");
    juego.adivinar("T");
    juego.adivinar("O");
    expect(juego.gano()).toBe(true);
  });

  it("una partida nueva no está ganada", () => {
    expect(new Ahorcado("GATO").gano()).toBe(false);
  });

  it("perdio es true al quedarse sin vidas", () => {
    const juego = new Ahorcado("GATO");
    for (const letra of ["B", "C", "D", "F", "H", "I"]) {
      juego.adivinar(letra);
    }
    expect(juego.perdio()).toBe(true);
  });

  it("una partida nueva no está perdida", () => {
    expect(new Ahorcado("GATO").perdio()).toBe(false);
  });
});
