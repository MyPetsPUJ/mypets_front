import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

import { EntidadPerro } from '../components/interfaces/entidadPerro';

@Injectable({
  providedIn: 'root'
})
export class CrearPerroService {
  private token: string = "";
  dominio: string = "localhost";
  puerto: number = 3000;
  pathIntermedio: string = "api";
  entidad: string = "dashboard";
  subTipoEntidad: string = "seleccion-animal";
  subTipoEntidadII: string = "crear-animal-perro";

  constructor(private http: HttpClient) { }

  crearPerro(nombre: string, edad: string, raza: string, sexo: string, tamano: string, color_ojos: string, 
    tipo_pelaje: string, color_pelaje: string, situacion: string, desparasitado: string, 
    ultima_vac: Date, descripcion: string, esquema_vac: String)
    {

    const entidadPerro: EntidadPerro = {nombre: nombre, edad: edad, raza: raza, sexo: sexo, tamano: tamano, color_ojos: color_ojos, tipo_pelaje: tipo_pelaje, 
      color_pelaje: color_pelaje, situacion: situacion, desparasitado: desparasitado, ultima_vac: ultima_vac, descripcion: descripcion, esquema_vac: esquema_vac};
    this.http.post(`http://${this.dominio}:${this.puerto}/${this.pathIntermedio}/${this.entidad}/${this.subTipoEntidad}/${this.subTipoEntidadII}`, entidadPerro)
    .subscribe(respuesta => {
      console.log(respuesta);
    })

  }
}
