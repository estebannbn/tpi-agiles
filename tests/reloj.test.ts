import { describe, it, expect } from "vitest";
import { formatearReloj, tiempoRestante } from "../src/domain/reloj";

describe("reloj", () => {
  it("formatearReloj(10) es 10:00", () => {
    expect(formatearReloj(10)).toBe("10:00");
  });

  it("formatearReloj(5) es 05:00", () => {
    expect(formatearReloj(5)).toBe("05:00");
  });

  it("tiempoRestante(10, 1) descuenta un segundo", () => {
    expect(tiempoRestante(10, 1)).toBe("09:59");
  });

  it("tiempoRestante no baja de 00:00", () => {
    expect(tiempoRestante(1, 90)).toBe("00:00");
  });
});

