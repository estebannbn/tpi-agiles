export class Ahorcado {
  private palabraSecreta: string;
  private letrasAdivinadas: Set<string> = new Set();
  private vidas: number;

  constructor(palabra: string, vidas = 6) {
    this.palabraSecreta = palabra.toUpperCase();
    this.vidas = vidas;
  }

  adivinar(letra: string): void {
    const l = letra.toUpperCase();
    if (this.letrasAdivinadas.has(l)) return;
    this.letrasAdivinadas.add(l);
    if (!this.palabraSecreta.includes(l)) {
      this.vidas--;
    }
  }

  palabraEnmascarada(): string {
    return this.palabraSecreta
      .split("")
      .map((l) => (this.letrasAdivinadas.has(l) ? l : "_"))
      .join(" ");
  }

  getVidas(): number {
    return this.vidas;
  }

  gano(): boolean {
    return this.palabraSecreta.split("").every((l) => this.letrasAdivinadas.has(l));
  }

  perdio(): boolean {
    return this.vidas === 0;
  }

  palabra(): string {
    return this.palabraSecreta;
  }
}
