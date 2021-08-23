import { Injectable } from '@angular/core';
import { EntidadSolicitudAdopcion } from '../components/interfaces/entidadSolicitudAdopcion';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EnviarSolicitudAdopcionService {
  private token: string = "";
  dominio: string = "localhost";
  puerto: number = 3000;
  pathIntermedio: string = "api";
  entidad: string = "dashboard-adoptante";
  subTipoEntidad: string = "adoptame";
  subTipoEntidadII: string = "solicitud-adopcion";

  constructor(private http: HttpClient) { }


  solicitudAdopcion(entidadSolicitudAdopcion : EntidadSolicitudAdopcion)
    {
    this.http.post(`http://${this.dominio}:${this.puerto}/${this.pathIntermedio}/${this.entidad}/${this.subTipoEntidad}/${this.subTipoEntidadII}`, entidadSolicitudAdopcion)
    .subscribe(respuesta => {
      console.log(respuesta);
    })

  }
}
