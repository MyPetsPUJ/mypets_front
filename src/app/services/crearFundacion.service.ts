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
  
  fundaciones:UserFundacion[]=[ 
    {nombreFund: 'Huellita',nombreEncar: 'Luis', apellidosEncar: 'Lopez', tipo_doc: 'CC', num_doc: '12312313',
    fecha_creacion: new Date('12/3/2020'), localidad: 'Engativa', correo: 'perritos@gmail.com', num_celular: '313125530',
    password: "user123", tipo_usuario: "Fundacion"},

    {nombreFund: 'Adoptame',nombreEncar: 'Amrio', apellidosEncar: 'Perez', tipo_doc: 'CC', num_doc: '123326',
    fecha_creacion: new Date('02/10/2019'), localidad: 'Suba', correo: 'adopta@gmail.com', num_celular: '3131354330',
    password: "user123", tipo_usuario: "Fundacion"}
  ];
  
  getFundaciones(): UserFundacion[]
  {
    return this.fundaciones;
  }

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
