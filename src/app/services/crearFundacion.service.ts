import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { UserFundacion } from '../components/interfaces/userFundacion';
import { InicioSesion } from '../components/interfaces/inicioSesion';
import { ServicioBaseService } from './servicioBase.service';
//import { url } from 'inspector';

@Injectable({
  providedIn: 'root',
})
export class CrearFundacionService {
  private token: string = '';
  entidad: string = 'crear-cuenta';
  subTipoEntidad: string = 'crear-fundacion';
  login: string = 'login';

  constructor(private servicioBase: ServicioBaseService) {}

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
    localidad: string,
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
    fd.append('localidad', localidad);
    fd.append('correo', correo);
    fd.append('num_celular', num_celular);
    fd.append('password', password);
    fd.append('image', imagen);
    fd.append('tipo_usuario', tipo_usuario);

    return this.servicioBase.post([this.entidad, this.subTipoEntidad], fd);
  }

  inicioSesion(inicioSesion: InicioSesion) {
    return this.servicioBase.post([this.login], inicioSesion);
  }
}
