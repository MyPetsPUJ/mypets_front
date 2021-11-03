import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ColorOjos } from 'src/app/components/interfaces/datos-app/datos-animal/entidadColorOjos';
import { Desparasitado } from 'src/app/components/interfaces/datos-app/datos-animal/entidadDesparasitado';
import { Edad } from 'src/app/components/interfaces/datos-app/datos-animal/entidadEdadAnimal';
import { GeneroAnimal } from 'src/app/components/interfaces/datos-app/datos-animal/entidadGeneroAnimal';
import { Situacion } from 'src/app/components/interfaces/datos-app/datos-animal/entidadSituacion';
import { Tamano } from 'src/app/components/interfaces/datos-app/datos-animal/entidadTamano';
import { TipoAnimal } from 'src/app/components/interfaces/datos-app/datos-animal/entidadTipoAnimal';
import { TipoPelaje } from 'src/app/components/interfaces/datos-app/datos-animal/entidadTipoPelaje';
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
    return this.http.get<{
      colorOjos: ColorOjos[];
      desparasitados: Desparasitado[];
      edades: Edad[];
      generosAnimal: GeneroAnimal[];
      situaciones: Situacion[];
      tamanos: Tamano[];
      tiposAnimal: TipoAnimal[];
      tiposPelaje: TipoPelaje[];
    }>(
      `http://${this.dominio}:${this.puerto}/${this.pathApi}/${this.dashboardPath}/${this.eleccionPath}/${this.perroPath}`
    );
  }

  getDatosGato() {
    return this.http.get<{
      colorOjos: ColorOjos[];
      desparasitados: Desparasitado[];
      edades: Edad[];
      generosAnimal: GeneroAnimal[];
      situaciones: Situacion[];
      tamanos: Tamano[];
      tiposAnimal: TipoAnimal[];
      tiposPelaje: TipoPelaje[];
    }>(
      `http://${this.dominio}:${this.puerto}/${this.pathApi}/${this.dashboardPath}/${this.eleccionPath}/${this.gatoPath}`
    );
  }
}
