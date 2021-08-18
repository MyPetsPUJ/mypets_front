import { Injectable } from '@angular/core';
import {EntidadPublicacion} from '../components/interfaces/entidadPublicacion'

@Injectable({
  providedIn: 'root'
})
export class PublicacionService {
  publicaciones: EntidadPublicacion[] = [
    {tituloPublicacion : 'Se busca dueño para Betto', 
    cuerpoPublicacion: "Beto es un perro cariñoso con 6 años de vida",
    fechaPublicacion: Date().toLocaleString(),
    imagenPublicacion: "../../../assets/Images/dog-form.png"},
    {tituloPublicacion : "Lily esta sin hogar", 
    cuerpoPublicacion: "Lily actualmente se encuentra en busca de",
    fechaPublicacion: Date().toLocaleString(),
    imagenPublicacion: "src/assets/Images/dog-form.png"},
    {tituloPublicacion : "Adopta a Laura!", 
    cuerpoPublicacion: "Laura fue abandonada por su familia",
    fechaPublicacion: Date().toLocaleString(),
    imagenPublicacion: "../../../assets/Images/dog-form.png"}
  ];
  constructor() { }
  getPublicaciones(): EntidadPublicacion[]
  {
    return this.publicaciones;
  }
}
