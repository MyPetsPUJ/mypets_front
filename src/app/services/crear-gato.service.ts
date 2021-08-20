import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

import { EntidadGato } from '../components/interfaces/entidadGato';

@Injectable({
  providedIn: 'root'
})
export class CrearGatoService {
  private token: string = "";
  dominio: string = "localhost";
  puerto: number = 3000;
  pathIntermedio: string = "api";
  entidad: string = "dashboard";
  subTipoEntidad: string = "seleccion-animal";
  subTipoEntidadII: string = "crear-animal-gato";

  constructor(private http: HttpClient) { }

  crearGato(nombre: string, edad: string, raza: string, sexo: string, color_ojos: string, 
    tipo_pelaje: string, situacion: string, ultima_vac: Date, desparasitado: string, descripcion: string, esquema_vac: Array<string>)
    {

      const entidadGato: EntidadGato = {nombre: nombre, edad: edad, raza: raza, sexo: sexo, color_ojos: color_ojos, 
        tipo_pelaje: tipo_pelaje, situacion: situacion, ultima_vac: ultima_vac, desparasitado: desparasitado, descripcion: descripcion, esquema_vac: esquema_vac}

      this.http.post(`http://${this.dominio}:${this.puerto}/${this.pathIntermedio}/${this.entidad}/${this.subTipoEntidad}/${this.subTipoEntidadII}`, entidadGato)
      .subscribe(respuesta => {
          console.log(respuesta);
        });
    }
}
