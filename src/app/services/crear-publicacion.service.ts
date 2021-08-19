import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { EntidadPublicacion } from '../components/interfaces/entidadPublicacion';
@Injectable({
  providedIn: 'root'
})
export class CrearPublicacionService {

  constructor(private http: HttpClient) { }

  crearPublicacion(tituloPublicacion: String, cuerpoPublicacion: String, fechaPublicacion: String, imagenPublicacion: String)
    {

    const entidadPublicacion: EntidadPublicacion = {tituloPublicacion: tituloPublicacion, cuerpoPublicacion: cuerpoPublicacion, fechaPublicacion:fechaPublicacion, imagenPublicacion:imagenPublicacion};
    this.http.post("http://localhost:3000/api/dashboard/publicaciones/crear-publicacion", entidadPublicacion)
    .subscribe(respuesta => {
      console.log(respuesta);
    })

  }
}
