import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { ServicioBaseService } from '../servicioBase.service';

@Injectable({
  providedIn: 'root',
})
export class CrearFundacionService {
  private token: string = '';
  entidad: string = 'crear-cuenta';
  subTipoEntidad: string = 'crear-fundacion';
  login: string = 'login';

  constructor(
    private servicioBase: ServicioBaseService,
    private http: HttpClient
  ) {}

  getToken() {
    return this.token;
  }

  // crearUsuarioFundacion(userFundacion: UserFundacion) {
  //   return this.servicioBase.post(
  //     [this.entidad, this.subTipoEntidad],
  //     userFundacion
  //   );
  // }

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
