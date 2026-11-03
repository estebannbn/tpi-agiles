export class Ahorcado {
  private palabra: string;
  private letrasAdivinadas: Set<string> = new Set();
  private vidas: number;

  constructor(palabra: string, vidas = 6) {
    this.palabra = palabra.toUpperCase();
    this.vidas = vidas;
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

  gano(): boolean {
    return this.palabra.split("").every((l) => this.letrasAdivinadas.has(l));
  }

  perdio(): boolean {
    return this.vidas === 0;
  }
}
