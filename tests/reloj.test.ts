import { describe, it, expect } from "vitest";
import { formatearReloj } from "../src/domain/reloj";

describe("reloj", () => {
  it("formatearReloj(10) es 10:00", () => {
    expect(formatearReloj(10)).toBe("10:00");
  });

  it("formatearReloj(5) es 05:00", () => {
    expect(formatearReloj(5)).toBe("05:00");
  });
});

