import { describe, it, expect } from "vitest";
import { Mazo } from "../src/domain/palabras";

describe("Mazo - Dominio", () => {
  it("el primer sacar es SOL", () => {
    const mazo = new Mazo(["SOL", "LUNA"], () => 0);
    expect(mazo.sacar()).toBe("SOL");
  });

  it("el segundo sacar es LUNA", () => {
    const mazo = new Mazo(["SOL", "LUNA"], () => 0);
    mazo.sacar();
    expect(mazo.sacar()).toBe("LUNA");
  });

  it("al acabarse el mazo se vuelve a mezclar", () => {
    const mazo = new Mazo(["SOL", "LUNA"], () => 0);
    mazo.sacar();
    mazo.sacar();
    expect(mazo.sacar()).toBe("SOL");
  });
});
