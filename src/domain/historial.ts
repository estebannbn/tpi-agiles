export interface PartidaResumen {
  palabra: string;
  resultado: string;
  errores?: number;
  fallidas?: string;
  tiempoMaximo?: string;
  duracion?: string;
}

export class Historial {
  private partidas: PartidaResumen[] = [];

  registrar(partida: PartidaResumen): void {
    this.partidas.push(partida);
  }

  listado(): PartidaResumen[] {
    return [...this.partidas];
  }
}
