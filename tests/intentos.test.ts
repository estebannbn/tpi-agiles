import { describe, expect, it } from "vitest";
import { configurarIntentos, intentosIniciales } from "../src/domain/intentos";

describe("intentos", () => {
  it("intentosIniciales devuelve 6", () => {
    expect(intentosIniciales()).toBe(6);
  });

  it("configurarIntentos(10) es 10", () => {
    expect(configurarIntentos(10)).toBe(10);
  });
});
