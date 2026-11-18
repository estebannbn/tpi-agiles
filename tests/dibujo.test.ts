import { describe, expect, it } from "vitest";
import { partesDelAhorcado } from "../src/domain/dibujo";

describe("Dibujo del ahorcado", () => {
  it("partesDelAhorcado(1) es la cabeza", () => {
    expect(partesDelAhorcado(1)).toEqual(["cabeza"]);
  });
});
