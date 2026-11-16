export interface PartidaResumen {
  palabra: string;
  resultado: string;
  errores?: number;
  fallidas?: string;
  tiempoMaximo?: string;
  duracion?: string;
}

export class Historial {
  registrar(_partida: PartidaResumen): void { }

  listado(): PartidaResumen[] {
    return [];
  }
}
