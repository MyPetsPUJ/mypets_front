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
  mapaPath: string = 'mapa';

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
}
