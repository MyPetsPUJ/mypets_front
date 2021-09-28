import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormularioAdopcion } from '../components/interfaces/formularioAdopcion';
@Injectable({
  providedIn: 'root'
})
export class EnviarFormularioAdopcionService {
  private token: string = "";
  dominio: string = "localhost";
  puerto: number = 3000;
  pathIntermedio: string = "api";
  entidad: string = "dashboard-adoptante";
  subTipoEntidad: string = "adoptame";
  subTipoEntidadII: string = "solicitud-adopcion";

  constructor(private http: HttpClient) { }

  formularioAdopcion( formularioAdopcion: FormularioAdopcion)
  {
    this.http.post(`http://${this.dominio}:${this.puerto}/${this.pathIntermedio}/${this.entidad}/${this.subTipoEntidad}/${this.subTipoEntidadII}`, formularioAdopcion)
    .subscribe(respuesta => {
      console.log(respuesta);
    })
  }
}
