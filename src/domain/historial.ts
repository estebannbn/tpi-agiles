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

export class Historial {
  private partidas: PartidaResumen[] = [];

  registrar(partida: PartidaResumen): void {
    this.partidas.unshift(partida);
  }

  listado(): PartidaResumen[] {
    return [...this.partidas];
  }
}
