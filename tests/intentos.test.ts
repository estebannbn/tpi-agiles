import { describe, expect, it } from "vitest";
import { configurarIntentos, intentosIniciales } from "../src/domain/intentos";

describe("intentos", () => {
  it("intentosIniciales devuelve 6", () => {
    expect(intentosIniciales()).toBe(6);
  });

  it("configurarIntentos(10) es 10", () => {
    expect(configurarIntentos(10)).toBe(10);
  });

  it("configurarIntentos(11) queda en 10", () => {
    expect(configurarIntentos(11)).toBe(10);
  });

  it("configurarIntentos(8) devuelve 8", () => {
    expect(configurarIntentos(8)).toBe(8);
  });
});
