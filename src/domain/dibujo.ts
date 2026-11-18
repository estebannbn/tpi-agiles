const PARTES = [
  "cabeza",
  "torso",
  "brazo-izquierdo",
  "brazo-derecho",
  "pierna-izquierda",
  "pierna-derecha",
];

export function partesDelAhorcado(errores: number): string[] {
  return PARTES.slice(0, errores);
}
