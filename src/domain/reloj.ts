export function formatearReloj(minutos: number): string {
  return `${String(minutos).padStart(2, "0")}:00`;
}

