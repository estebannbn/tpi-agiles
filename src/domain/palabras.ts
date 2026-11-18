export const BIBLIOTECA = [
  "SOL",
  "GATO",
  "PERRO",
  "CASA",
  "LUNA",
  "FLOR",
  "NUBE",
  "ARBOL",
];

function mezclar(palabras: string[], azar: () => number): string[] {
  const copia = [...palabras];
  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(azar() * (i + 1));
    [copia[i], copia[j]] = [copia[j], copia[i]];
  }
  return copia;
}

export class Mazo {
  private biblioteca: string[];
  private azar: () => number;
  private pila: string[] = [];

  constructor(
    biblioteca: string[] = BIBLIOTECA,
    azar: () => number = Math.random,
  ) {
    this.biblioteca = [...biblioteca];
    this.azar = azar;
  }

  sacar(): string {
    if (this.pila.length === 0) {
      this.pila = mezclar(this.biblioteca, this.azar);
    }
    return this.pila.pop() as string;
  }
}
