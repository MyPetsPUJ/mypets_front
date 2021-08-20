import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

import { EntidadAnimal } from '../components/interfaces/entidadAnimal';

@Injectable({
  providedIn: 'root'
})
export class CrearAnimalService {
  private token: string = "";
  dominio: string = "localhost";
  puerto: number = 3000;
  pathIntermedio: string = "api";
  entidad: string = "dashboard";
  subTipoEntidad: string = "seleccion-animal";              //TODO cambiar rutas en front y back end
  subTipoEntidadII: string = "crear-animal-perro"; 
  subTipoEntidadGato: string = "crear-animal-gato";
  

  constructor(private http: HttpClient) { }

  

  crearAnimalPerro(entidadAnimal: EntidadAnimal)
    {
    this.http.post(`http://${this.dominio}:${this.puerto}/${this.pathIntermedio}/${this.entidad}/${this.subTipoEntidad}/${this.subTipoEntidadII}`, entidadAnimal)
    .subscribe(respuesta => {
      console.log(respuesta);
    })
  }

  crearAnimalGato(entidadAnimal: EntidadAnimal)
    {
    this.http.post(`http://${this.dominio}:${this.puerto}/${this.pathIntermedio}/${this.entidad}/${this.subTipoEntidad}/${this.subTipoEntidadGato}`, entidadAnimal)
    .subscribe(respuesta => {
      console.log(respuesta);
    })
  }

}
