import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DatosAnimal } from 'src/app/components/interfaces/datos-app/entidadDatosAnimal';

@Injectable({
  providedIn: 'root',
})
export class DatosAnimalService {
  dominio: string = 'localhost';
  puerto: number = 3000;
  pathApi: string = 'api';
  dashboardPath: string = 'dashboard';
  eleccionPath: string = 'seleccion-animal';
  perroPath: string = 'crear-animal-perro';
  gatoPath: string = 'crear-animal-gato';

  constructor(private http: HttpClient) {}

  getDatosPerro() {
    return this.http.get<DatosAnimal[]>(
      `http://${this.dominio}:${this.puerto}/${this.pathApi}/${this.dashboardPath}/${this.eleccionPath}/${this.perroPath}`
    );
  }

  getDatosGato() {
    return this.http.get<DatosAnimal[]>(
      `http://${this.dominio}:${this.puerto}/${this.pathApi}/${this.dashboardPath}/${this.eleccionPath}/${this.gatoPath}`
    );
  }
}
