import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Localidad } from '../../components/interfaces/datos-app/entidadLocalidad';

@Injectable({
  providedIn: 'root',
})
export class LocalidadesService {
  dominio: string = 'localhost';
  puerto: number = 3000;
  pathApi: string = 'api';
  signUp: string = 'crear-cuenta';
  adoptante: string = 'crear-adoptante';
  fundacion: string = 'crear-fundacion';

  constructor(private http: HttpClient) {}

  getLocalidadesAdoptante() {
    return this.http.get<Localidad[]>(
      `http://${this.dominio}:${this.puerto}/${this.pathApi}/${this.signUp}/${this.adoptante}`
    );
  }

  getLocalidadesFundacion() {
    return this.http.get<Localidad[]>(
      `http://${this.dominio}:${this.puerto}/${this.pathApi}/${this.signUp}/${this.fundacion}`
    );
  }
}
