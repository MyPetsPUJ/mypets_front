import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AuthData } from '../components/interfaces/authData';
import { InicioSesion } from '../components/interfaces/inicioSesion';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private token: string = "";
  dominio: string = "localhost";
  puerto: number = 3000;
  pathIntermedio: string = "api";
  entidad: string = "crear-cuenta";
  subTipoEntidad: string = "crear-adoptante";
  login: string = "login";

  constructor(private http: HttpClient) { }


  crearUsuarioAdoptante(authData: AuthData){
    this.http.post(`http://${this.dominio}:${this.puerto}/${this.pathIntermedio}/${this.entidad}/${this.subTipoEntidad}`, authData)
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
