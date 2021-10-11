import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Vacuna } from '../../components/interfaces/datos-app/entidadVacuna';

@Injectable({
  providedIn: 'root',
})
export class VacunasService {
  dominio: string = 'localhost';
  puerto: number = 3000;
  pathApi: string = 'api';
  entidad: string = 'dashboard';
  eleccionAnimal: string = 'seleccion-animal';
  crearPerro: string = 'crear-animal-perro';
  crearGato: string = 'crear-animal-gato';

  constructor(private http: HttpClient) {}

  getVacunasGato() {
    return this.http.get<Vacuna[]>(
      `http://${this.dominio}:${this.puerto}/${this.pathApi}/${this.entidad}/${this.eleccionAnimal}/${this.crearGato}`
    );
  }

  getVacunasPerro() {
    return this.http.get<Vacuna[]>(
      `http://${this.dominio}:${this.puerto}/${this.pathApi}/${this.entidad}/${this.eleccionAnimal}/${this.crearPerro}`
    );
  }
}
