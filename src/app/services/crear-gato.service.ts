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

  crearGato( entidadGato : EntidadGato)
    {
      this.http.post(`http://${this.dominio}:${this.puerto}/${this.pathIntermedio}/${this.entidad}/${this.subTipoEntidad}/${this.subTipoEntidadII}`, entidadGato)
      .subscribe(respuesta => {
          console.log(respuesta);
        });
    }
}
