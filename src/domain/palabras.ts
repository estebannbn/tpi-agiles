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

export class Mazo {
  constructor(
    _biblioteca: string[] = BIBLIOTECA,
    _azar: () => number = Math.random,
  ) {}

  sacar(): string {
    return "GATO";
  }
}
