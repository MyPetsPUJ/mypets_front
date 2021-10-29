import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { ServicioBaseService } from '../servicioBase.service';
import { UserFundacion } from 'src/app/components/interfaces/usuarios/userFundacion';

@Injectable({
  providedIn: 'root',
})
export class CrearFundacionService {
  private token: string = '';
  entidad: string = 'crear-cuenta';
  subTipoEntidad: string = 'crear-fundacion';
  login: string = 'login';
   fundaciones: UserFundacion[] = [
     {
       nombreFund: 'Fundacion 1',
       nombreEncar: 'Encargado ',
       apellidosEncar: '1',
       tipo_doc: 'Cédula de ciudadanía',
       distancia: '',
       duracion: '',
       num_doc: 1234567,
       fecha_creacion: '09/02/2001',
       latitud: 4.741765335769153,
       longitud: -74.02332319625492,
       correo: 'correo1@gmail.com',
       num_celular: '3205586234',
       password: 'password1',
       urlImg: '../../../assets/Images/fundacion1.png',
       tipo_usuario: 'fundacion',
       direccion: 'Kr 19B - Cl 24, Bogotá, Colombia',
       mision: 'misión 1',
       vision: 'visión 1',
       publicaciones: [],
       ubicacion: '',
       _id: '123'
     },
  //   {
  //     nombreFund: 'Fundacion 2',
  //     nombreEncar: 'Encargado ',
  //     apellidosEncar: '2',
  //     distancia: '',
  //     duracion: '',
  //     tipo_doc: 'Cédula de ciudadanía',
  //     num_doc: '123456782',
  //     fecha_creacion: '07/05/2004',
  //     latitud: 4.607630539524677,
  //     longitud: -74.17644514449711,
  //     correo: 'correo2@gmail.com',
  //     num_celular: '3205586232',
  //     password: 'password1',
  //     urlImg: '../../../assets/Images/fundacion2.png',
  //     tipo_usuario: 'fundacion',
  //     direccion: 'Fontibón, Bogotá, Colombia',
  //     mision: 'misión 2',
  //     vision: 'visión 2',
  //     publicaciones: []
  //   },
  //   {
  //     nombreFund: 'Fundacion 3',
  //     nombreEncar: 'Encargado ',
  //     distancia: '',
  //     duracion: '',
  //     apellidosEncar: '3',
  //     tipo_doc: 'Cédula de ciudadanía',
  //     num_doc: '123456783',
  //     fecha_creacion: '03/08/2001',
  //     latitud: 4.679491660505332,
  //     longitud: -74.0823747099268,
  //     correo: 'correo3@gmail.com',
  //     num_celular: '3205586233',
  //     password: 'password1',
  //     urlImg: '../../../assets/Images/fundacion3.png',
  //     tipo_usuario: 'fundacion',
  //     direccion: 'Cl. 165 #7 – 52, Bogotá, Colombia',
  //     mision: 'Satisfacer y superar las expectativas de nuestros clientes, a través de una experiencia de compra que combine de manera óptima productos, servicio, entorno y convivencia, logrando así su reiterada preferencia.',
  //     vision: 'Contribuir al mejoramiento de la calidad de vida de nuestros clientes en cada una de las comunidades en las que insertamos.',
  //     publicaciones: []
  //   },
  //   {
  //     nombreFund: 'Fundacion 4',
  //     nombreEncar: 'Encargado ',
  //     apellidosEncar: '4',
  //     tipo_doc: 'Cédula de ciudadanía',
  //     distancia: '',
  //     duracion: '',
  //     num_doc: '123456784',
  //     fecha_creacion: '04/11/2015',
  //     latitud: 4.809507241630877,
  //     longitud: -74.10160078414555,
  //     correo: 'correo4@gmail.com',
  //     num_celular: '3205586234',
  //     password: 'password1',
  //     urlImg: '../../../assets/Images/fundacion4.png',
  //     tipo_usuario: 'fundacion',
  //     direccion: 'Cl. 48b Sur #5f-30, Bogotá, Colombia',
  //     mision: 'misión 4',
  //     vision: 'visión 4',
  //     publicaciones: []
  //   },
  //   {
  //     nombreFund: 'Fundacion 5',
  //     nombreEncar: 'Encargado ',
  //     apellidosEncar: '5',
  //     tipo_doc: 'Cédula de ciudadanía',
  //     num_doc: '123456785',
  //     distancia: '',
  //     duracion: '',
  //     fecha_creacion: '04/10/2013',
  //     latitud: 4.698653384887069,
  //     longitud: -74.12975324996586,
  //     correo: 'correo5@gmail.com',
  //     num_celular: '3205586235',
  //     password: 'password1',
  //     urlImg: '../../../assets/Images/fundacion5.png',
  //     tipo_usuario: 'fundacion',
  //     direccion: 'Cra. 5 ##12-44, Cota, Cundinamarca, Colombia',
  //     mision: 'misión 5',
  //     vision: 'visión 5',
  //     publicaciones: []
  //   },
  //   {
  //     nombreFund: 'Fundacion 6',
  //     nombreEncar: 'Encargado ',
  //     apellidosEncar: '6',
  //     tipo_doc: 'Cédula de ciudadanía',
  //     num_doc: '123456786',
  //     distancia: '',
  //     duracion: '',
  //     fecha_creacion: '23/09/2009',
  //     latitud: 4.618581277506073,
  //     longitud: -74.07756819137211,
  //     correo: 'correo6@gmail.com',
  //     num_celular: '3205586236',
  //     password: 'password1',
  //     urlImg: '../../../assets/Images/fundacion6.png',
  //     tipo_usuario: 'fundacion',
  //     direccion: 'Cra. 78k #5823, Bogotá, Colombia',
  //     mision: 'misión 6',
  //     vision: 'visión 6',
  //     publicaciones: []
  //   },
  //   {
  //     nombreFund: 'Fundacion 7',
  //     nombreEncar: 'Encargado ',
  //     apellidosEncar: '7',
  //     distancia: '',
  //     duracion: '',
  //     tipo_doc: 'Cédula de ciudadanía',
  //     num_doc: '123456787',
  //     fecha_creacion: '27/02/2016',
  //     latitud: 4.559034610195376,
  //     longitud: -74.10915388473148,
  //     correo: 'correo7@gmail.com',
  //     num_celular: '3205586238',
  //     password: 'password1',
  //     urlImg: '../../../assets/Images/fundacion7.png',
  //     tipo_usuario: 'fundacion',
  //     direccion: 'Cl. 75a ##66-39, Bogotá, Colombia',
  //     mision: 'misión 7',
  //     vision: 'visión 7',
  //     publicaciones: []
  //   }
   ];

  constructor(
    private servicioBase: ServicioBaseService,
    private http: HttpClient
  ) { }

  getToken() {
    return this.token;
  }

  // crearUsuarioFundacion(userFundacion: UserFundacion) {
  //   return this.servicioBase.post(
  //     [this.entidad, this.subTipoEntidad],
  //     userFundacion
  //   );
  // }
   getFundaciones() {
     return this.fundaciones;
   }
  crearUsuarioFundacion(
    nombreFund: string,
    nombreEncar: string,
    apellidosEncar: string,
    tipo_doc: string,
    num_doc: string,
    fecha_creacion: string,
    // localidad: string,
    direccion: string,
    mision: string,
    vision: string,
    correo: string,
    num_celular: string,
    password: string,
    imagen: File,
    tipo_usuario: string
  ) {
    const fd = new FormData();
    fd.append('nombreFund', nombreFund);
    fd.append('nombreEncar', nombreEncar);
    fd.append('apellidosEncar', apellidosEncar);
    fd.append('tipo_doc', tipo_doc);
    fd.append('num_doc', num_doc);
    fd.append('fecha_creacion', fecha_creacion);
    // fd.append('localidad', localidad);
    fd.append('direccion', direccion);
    fd.append('mision', mision);
    fd.append('vision', vision);
    fd.append('correo', correo);
    fd.append('num_celular', num_celular);
    fd.append('password', password);
    fd.append('image', imagen);
    fd.append('tipo_usuario', tipo_usuario);

    return this.servicioBase.post([this.entidad, this.subTipoEntidad], fd);
  }

  // inicioSesion(inicioSesion: InicioSesion) {
  //   return this.http
  //     .post<{ token: string }>(
  //       'http://localhost:3000/api/login',
  //       inicioSesion,
  //       { withCredentials: true }
  //     )
  //     .pipe(
  //       map((res) => {
  //         console.log(res);
  //         const token = res.token;
  //         this.token = token;
  //       })
  //     );
  //   //return this.servicioBase.post([this.login], inicioSesion);
  // }
}
