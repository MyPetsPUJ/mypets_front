import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { UserFundacion } from '../components/interfaces/userFundacion';
import { InicioSesion } from '../components/interfaces/inicioSesion';
import { ServicioBaseService } from './servicioBase.service';

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

  crearUsuarioFundacion(userFundacion: UserFundacion) {
    return this.servicioBase.post(
      [this.entidad, this.subTipoEntidad],
      userFundacion
    );
  }

  inicioSesion(inicioSesion: InicioSesion) {
    return this.servicioBase.post([this.login], inicioSesion);
  }
}
