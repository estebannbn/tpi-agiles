import { describe, it, expect } from "vitest";
import { formatearDuracion, Historial, tiempoMaximo } from "../src/domain/historial";

describe("Historial - Dominio", () => {
  it("el historial guarda la partida ganada", () => {
    const historial = new Historial();
    historial.registrar({ palabra: "GATO", resultado: "GANASTE" });
    expect(historial.listado()[0]).toEqual({ palabra: "GATO", resultado: "GANASTE" });
  });

  it("la partida más reciente queda primera", () => {
    const historial = new Historial();
    historial.registrar({ palabra: "GATO", resultado: "GANASTE" });
    historial.registrar({ palabra: "LATA", resultado: "GANASTE" });
    expect(historial.listado()[0].palabra).toBe("LATA");
    expect(historial.listado()[1].palabra).toBe("GATO");
  });

  it("tiempoMaximo de 10 minutos es 10:00", () => {
    expect(tiempoMaximo(10)).toBe("10:00");
  });

  it("tiempoMaximo de 5 minutos es 05:00", () => {
    expect(tiempoMaximo(5)).toBe("05:00");
  });

  it("formatearDuracion de 90 segundos es 01:30", () => {
    expect(formatearDuracion(90)).toBe("01:30");
  });
});
