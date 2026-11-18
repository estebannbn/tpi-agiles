const PARTES = [
  "cabeza",
  "torso",
  "brazo-izquierdo",
  "brazo-derecho",
  "pierna-izquierda",
  "pierna-derecha",
  "mano-izquierda",
  "mano-derecha",
  "pie-izquierdo",
  "pie-derecho",
];

export function partesDelAhorcado(errores: number): string[] {
  return PARTES.slice(0, errores);
}
