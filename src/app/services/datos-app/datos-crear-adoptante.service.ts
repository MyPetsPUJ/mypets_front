import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Genero } from 'src/app/components/interfaces/datos-app/entidadGenero';
import { Localidad } from 'src/app/components/interfaces/datos-app/entidadLocalidad';
import { TipoDoc } from 'src/app/components/interfaces/datos-app/entidadTipoDoc';

@Injectable({
  providedIn: 'root',
})
export class DatosCrearAdoptanteService {
  dominio: string = 'localhost';
  puerto: number = 3000;
  pathApi: string = 'api';
  signUp: string = 'crear-cuenta';
  adoptante: string = 'crear-adoptante';
  fundacion: string = 'crear-fundacion';
  constructor(private http: HttpClient) {}

  getDatos() {
    return this.http.get<{
      generos: Genero[];
      tipo_docs: TipoDoc[];
      localidades: Localidad[];
    }>(
      `http://${this.dominio}:${this.puerto}/${this.pathApi}/${this.signUp}/${this.adoptante}`
    );
  }
}
