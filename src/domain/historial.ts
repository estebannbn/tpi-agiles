import { formatearReloj } from "./reloj";

export interface PartidaResumen {
  palabra: string;
  resultado: string;
  errores?: number;
  fallidas?: string;
  tiempoMaximo?: string;
  duracion?: string;
}

export function tiempoMaximo(minutos: number): string {
  return formatearReloj(minutos);
}

export function formatearDuracion(segundos: number): string {
  const minutos = Math.floor(segundos / 60);
  const resto = segundos % 60;
  return `${String(minutos).padStart(2, "0")}:${String(resto).padStart(2, "0")}`;
}

export class Historial {
  private partidas: PartidaResumen[] = [];

  registrar(partida: PartidaResumen): void {
    this.partidas.unshift(partida);
  }

  listado(): PartidaResumen[] {
    return [...this.partidas];
  }
}
