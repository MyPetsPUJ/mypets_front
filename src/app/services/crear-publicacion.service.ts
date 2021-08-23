import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { EntidadPublicacion } from '../components/interfaces/entidadPublicacion';
@Injectable({
  providedIn: 'root'
})
export class CrearPublicacionService {
  private token: string = "";
  dominio: string = "localhost";
  puerto: number = 3000;
  pathIntermedio: string = "api";
  entidad: string = "dashboard";
  subTipoEntidad: string = "publicaciones";
  subTipoEntidadII: string = "crear-publicacion";

  constructor(private http: HttpClient) { }

  crearPublicacion(entidadPublicacion: EntidadPublicacion)
    {
    this.http.post(`http://${this.dominio}:${this.puerto}/${this.pathIntermedio}/${this.entidad}/${this.subTipoEntidad}/${this.subTipoEntidadII}`, entidadPublicacion)
    .subscribe(respuesta => {
      console.log(respuesta);
    })

  }
}
