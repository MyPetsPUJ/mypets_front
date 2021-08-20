import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient} from '@angular/common/http';

import { UserFundacion } from '../components/interfaces/userFundacion';
import { InicioSesion } from '../components/interfaces/inicioSesion';

@Injectable({
  providedIn: 'root'
})
export class CrearFundacionService {

  private token: string = "";
  dominio: string = "localhost";
  puerto: number = 3000;
  pathIntermedio: string = "api";
  entidad: string = "crear-cuenta";
  subTipoEntidad: string = "crear-fundacion";
  login: string = "login";
  
  constructor(private http: HttpClient) { }
  
  

  getToken(){
    return this.token;
  }

  crearUsuarioFundacion(userFundacion: UserFundacion)
  {
    this.http.post<{token: string}>(`http://${this.dominio}:${this.puerto}/${this.pathIntermedio}/${this.entidad}/${this.subTipoEntidad}`, userFundacion)
    .subscribe(respuesta => {
      console.log(respuesta);
      const token = respuesta.token;
      this.token = token;
    });
  }

  inicioSesion(inicioSesion: InicioSesion ){
    this.http.post(`http://${this.dominio}:${this.puerto}/${this.pathIntermedio}/${this.login}`, inicioSesion)
      .subscribe(respuesta => {
        console.log(respuesta);
      })
  }

}
