export function intentosIniciales(): number {
  return 6;
}

export function configurarIntentos(cantidad: number): number {
  return cantidad === 10 ? 10 : 6;
}
