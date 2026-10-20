export class Ahorcado {
  private palabra: string;
  private letrasAdivinadas: Set<string> = new Set();
  private vidas: number = 6;

  constructor(palabra: string = "GATO") {
    this.palabra = palabra.toUpperCase();
  }

  adivinar(letra: string): void {
    const l = letra.toUpperCase();
    this.letrasAdivinadas.add(l);
    if (!this.palabra.includes(l)) {
      this.vidas--;
    }
  }

  palabraEnmascarada(): string {
    return this.palabra
      .split("")
      .map((l) => (this.letrasAdivinadas.has(l) ? l : "_"))
      .join(" ");
  }

  getVidas(): number {
    return this.vidas;
  }
}
