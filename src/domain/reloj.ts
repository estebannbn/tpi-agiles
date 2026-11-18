export function formatearReloj(minutos: number): string {
  return `${String(minutos).padStart(2, "0")}:00`;
}

export function tiempoRestante(minutos: number, transcurridos: number): string {
  const restantes = Math.max(0, minutos * 60 - transcurridos);
  const mm = Math.floor(restantes / 60);
  const ss = restantes % 60;
  return `${String(mm).padStart(2, "0")}:${String(ss).padStart(2, "0")}`;
}

