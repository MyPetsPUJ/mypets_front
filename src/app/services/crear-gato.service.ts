import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

import { EntidadGato } from '../domain/entidadGato';


@Injectable({
  providedIn: 'root'
})
export class CrearGatoService {

  constructor(private http: HttpClient) { }

  crearGato(nombre: string, edad: string, raza: string, sexo: string, color_ojos: string, 
    tipo_pelaje: string, situacion: string, ultima_vac: Date, desparasitado: string, descripcion: string, esquema_vac: Array<string>)
    {

      const entidadGato: EntidadGato = {nombre: nombre, edad: edad, raza: raza, sexo: sexo, color_ojos: color_ojos, 
        tipo_pelaje: tipo_pelaje, situacion: situacion, ultima_vac: ultima_vac, desparasitado: desparasitado, descripcion: descripcion, esquema_vac: esquema_vac}

      this.http.post("http://localhost:3000/api/dashboard/seleccion-animal/crear-animal-gato", entidadGato)
      .subscribe(respuesta => {
          console.log(respuesta);
        });
    }
}
