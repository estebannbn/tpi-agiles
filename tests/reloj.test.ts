import { describe, it, expect } from "vitest";
import { formatearReloj } from "../src/domain/reloj";

describe("reloj", () => {
  it("formatearReloj(10) es 10:00", () => {
    expect(formatearReloj(10)).toBe("10:00");
  });
});

