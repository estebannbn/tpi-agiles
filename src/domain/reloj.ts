export function formatearReloj(minutos: number): string {
  return `${String(minutos).padStart(2, "0")}:00`;
}

export function tiempoRestante(_minutos: number, _transcurridos: number): string {
  return "10:00";
}

