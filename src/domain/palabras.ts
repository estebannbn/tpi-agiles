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
  private pila: string[];

  constructor(
    biblioteca: string[] = BIBLIOTECA,
    azar: () => number = Math.random,
  ) {
    this.pila = mezclar(biblioteca, azar);
  }

  sacar(): string {
    return this.pila.pop() as string;
  }
}
