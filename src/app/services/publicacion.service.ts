import { Injectable } from '@angular/core';
import { EntidadPublicacion } from '../components/interfaces/entidadPublicacion';

@Injectable({
  providedIn: 'root',
})
export class PublicacionService {
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
  constructor() {}
  getPublicaciones(): EntidadPublicacion[] {
    return this.publicaciones;
  }
}
