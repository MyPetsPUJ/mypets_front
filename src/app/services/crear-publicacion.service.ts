import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EntidadPublicacion } from '../components/interfaces/entidadPublicacion';
@Injectable({
  providedIn: 'root',
})
export class CrearPublicacionService {
  private token: string = '';
  dominio: string = 'localhost';
  puerto: number = 3000;
  pathIntermedio: string = 'api';
  entidad: string = 'dashboard';
  subTipoEntidad: string = 'publicaciones';
  subTipoEntidadII: string = 'crear-publicacion';

  constructor(private http: HttpClient) {}

  crearPublicacion(entidadPublicacion: EntidadPublicacion) {
    this.http
      .post(
        `http://${this.dominio}:${this.puerto}/${this.pathIntermedio}/${this.entidad}/${this.subTipoEntidad}/${this.subTipoEntidadII}`,
        entidadPublicacion
      )
      .subscribe((respuesta) => {
        console.log(respuesta);
      });
  }

  crearPublicacionFoto(
    titulo: string,
    cuerpo: string,
    fecha: string,
    imagen: File,
    seccion: string
  ) {
    const fd = new FormData();
    fd.append('titulo', titulo);
    fd.append('cuerpo', cuerpo);
    fd.append('fecha', fecha);
    fd.append('image', imagen);
    fd.append('seccion', seccion);

    return this.http.post(
      `http://${this.dominio}:${this.puerto}/${this.pathIntermedio}/${this.entidad}/${this.subTipoEntidad}/${this.subTipoEntidadII}`,
      fd
    );
  }
}
