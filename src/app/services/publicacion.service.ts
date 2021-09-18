import { Injectable } from '@angular/core';
import { EntidadPublicacion } from '../components/interfaces/entidadPublicacion';
import { HttpClient } from '@angular/common/http';
import { ServicioBaseService } from './servicioBase.service';

@Injectable({
  providedIn: 'root',
})
export class PublicacionService {
  dominio: string = 'localhost';
  puerto: number = 3000;
  pathIntermedio: string = 'api';
  entidad: string = 'dashboard';
  subTipoEntidad: string = 'publicaciones';

  publicaciones: EntidadPublicacion[] = [
    {
      titulo: 'Se busca dueño para Betto',
      cuerpo: 'Beto es un perro cariñoso con 6 años de vida',
      fecha: Date().toLocaleString(),
      imagenPath: '../../../assets/Images/dog-form.png',
      seccion: 'Adopción',
    },
    {
      titulo: 'Lily esta sin hogar',
      cuerpo: 'Lily actualmente se encuentra en busca de',
      fecha: Date().toLocaleString(),
      imagenPath: 'src/assets/Images/dog-form.png',
      seccion: 'Adopción',
    },
    {
      titulo: 'Adopta a Laura!',
      cuerpo: 'Laura fue abandonada por su familia',
      fecha: Date().toLocaleString(),
      imagenPath: '../../../assets/Images/dog-form.png',
      seccion: 'Adopción',
    },
  ];
  constructor(private http: HttpClient) {}

  getPublicaciones() {
    return this.http.get<EntidadPublicacion[]>(
      `http://${this.dominio}:${this.puerto}/${this.pathIntermedio}/${this.entidad}/${this.subTipoEntidad}`
    );
  }
}
