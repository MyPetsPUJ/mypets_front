import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { PuntoInteres } from '../components/interfaces/entidadPuntoInteres';
import { UserFundacion } from '../components/interfaces/usuarios/userFundacion';
@Injectable({
  providedIn: 'root',
})
export class MapServiceService {
  dominio: string = 'localhost';
  puerto: number = 3000;
  apiPath: string = 'api';
  dashboardPath: string = 'dashboard';
  adoptantePath: string = 'dashboard-adoptante';
  mapaPath: string = 'mapa';
  editarPath: string = 'editar-punto';

  constructor(private http: HttpClient) {}

  crearPuntoInteres(puntoDeInteres: PuntoInteres, id: string) {
    return this.http
      .post(
        `http://${this.dominio}:${this.puerto}/${this.apiPath}/${this.dashboardPath}/${this.mapaPath}/${id}`,
        puntoDeInteres
      )
      .subscribe((res) => {
        console.log(res);
      });
  }

  getPuntosDeInteres(id: string) {
    return this.http.get<{ fundacion: UserFundacion; puntos: PuntoInteres[] }>(
      `http://${this.dominio}:${this.puerto}/${this.apiPath}/${this.dashboardPath}/${this.mapaPath}/${id}`
    );
  }

  mostrarPuntosDeInteres() {
    return this.http.get<{
      fundaciones: UserFundacion[];
      puntos: PuntoInteres[];
    }>(
      `http://${this.dominio}:${this.puerto}/${this.apiPath}/${this.adoptantePath}/${this.mapaPath}`
    );
  }

  getPuntoById(id: string) {
    return this.http.get<PuntoInteres>(
      `http://${this.dominio}:${this.puerto}/${this.apiPath}/${this.dashboardPath}/${this.mapaPath}/${this.editarPath}/${id}`
    );
  }

  deletePunto(id: string) {
    return this.http.delete(
      `http://${this.dominio}:${this.puerto}/${this.apiPath}/${this.dashboardPath}/${this.mapaPath}/${id}`
    );
  }
}
