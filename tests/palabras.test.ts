import { describe, it, expect } from "vitest";
import { Mazo } from "../src/domain/palabras";

describe("Mazo - Dominio", () => {
  it("el primer sacar es SOL", () => {
    const mazo = new Mazo(["SOL", "LUNA"], () => 0);
    expect(mazo.sacar()).toBe("SOL");
  });
});
