import { describe, it, expect } from "vitest";
import { Historial } from "../src/domain/historial";

describe("Historial - Dominio", () => {
  it("el historial guarda la partida ganada", () => {
    const historial = new Historial();
    historial.registrar({ palabra: "GATO", resultado: "GANASTE" });
    expect(historial.listado()[0]).toEqual({ palabra: "GATO", resultado: "GANASTE" });
  });
});
