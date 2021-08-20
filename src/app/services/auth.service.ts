import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AuthData } from '../components/interfaces/authData';
import { inicioSesion } from '../components/interfaces/inicioSesion';

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

  constructor(private http: HttpClient) { }


  crearUsuarioAdoptanteBonito(authData: AuthData){
    this.http.post(`http://${this.dominio}:${this.puerto}/${this.pathIntermedio}/${this.entidad}/${this.subTipoEntidad}`, authData)
    .subscribe(respuesta => {
      console.log(respuesta);
    });
}

    crearUsuarioAdoptante(nombre: string, apellidos: string, fecha_nacimiento: string, tipo_doc: string, num_doc:string, 
      genero: string, localidad: string, correo: string, num_celular:string, password: string, tipo_usuario: string){
      const authData: AuthData = {nombre: nombre, apellidos: apellidos, fecha_nacimiento: fecha_nacimiento, tipo_doc: tipo_doc, num_doc: num_doc, 
      genero: genero, localidad: localidad, correo: correo, num_celular: num_celular, password: password, tipo_usuario: tipo_usuario};
      this.http.post(`http://${this.dominio}:${this.puerto}/${this.pathIntermedio}/${this.entidad}/${this.subTipoEntidad}`, authData)
      .subscribe(respuesta => {
        console.log(respuesta);
      });
  }

  inicioSesion(correo: string, password: string, tipo_usuario: string){
    const inicioSesion: inicioSesion = {correo: correo, password: password, tipo_usuario: tipo_usuario}
    this.http.post(`http://${this.dominio}:${this.puerto}/${this.pathIntermedio}/${this.entidad}/${this.subTipoEntidad}`, inicioSesion)
      .subscribe(respuesta => {
        console.log(respuesta);
      })
  }
}
