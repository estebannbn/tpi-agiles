export interface PartidaResumen {
  palabra: string;
  resultado: string;
  errores?: number;
  fallidas?: string;
  tiempoMaximo?: string;
  duracion?: string;
}

export function tiempoMaximo(_minutos: number): string {
  return "10:00";
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
