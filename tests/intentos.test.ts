import { describe, expect, it } from "vitest";
import { intentosIniciales } from "../src/domain/intentos";

describe("intentos", () => {
  it("intentosIniciales devuelve 6", () => {
    expect(intentosIniciales()).toBe(6);
  });
});
