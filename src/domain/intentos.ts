export function intentosIniciales(): number {
  return 6;
}

export function configurarIntentos(cantidad: number): number {
  if (cantidad > 10) return 10;
  if (cantidad < 6) return 6;
  return cantidad;
}
