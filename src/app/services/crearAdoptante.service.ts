import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { UserAdoptante } from '../components/interfaces/userAdoptante';
import { InicioSesion } from '../components/interfaces/inicioSesion';

@Injectable({
  providedIn: 'root'
})
export class CrearAdoptanteService {

  private token: string = "";
  dominio: string = "localhost";
  puerto: number = 3000;
  pathIntermedio: string = "api";
  entidad: string = "crear-cuenta";
  subTipoEntidad: string = "crear-adoptante";
  login: string = "login";

  constructor(private http: HttpClient) { }


  crearUsuarioAdoptante(userAdoptante: UserAdoptante){
    this.http.post(`http://${this.dominio}:${this.puerto}/${this.pathIntermedio}/${this.entidad}/${this.subTipoEntidad}`, userAdoptante)
    .subscribe(respuesta => {
      console.log(respuesta);
    });
}

  inicioSesion(inicioSesion: InicioSesion){
    this.http.post(`http://${this.dominio}:${this.puerto}/${this.pathIntermedio}/${this.login}`, inicioSesion)
      .subscribe(respuesta => {
        console.log(respuesta);
      })
  }
}
