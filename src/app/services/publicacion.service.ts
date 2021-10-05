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
  dashAdoptante: string = 'dashboard-adoptante'
  subTipoEntidad: string = 'publicaciones';
  entidadConsejos: string = 'consejos';

  publicaciones: EntidadPublicacion[] = [
    {
      titulo: 'Se busca dueño para Betto',
      cuerpo: 'Beto es un perro cariñoso con 6 años de vida',
      fecha: Date().toLocaleString(),
      urlImg: '../../../assets/Images/dog-form.png',
      seccion: 'Adopción',
    },
    {
      titulo: 'Lily esta sin hogar',
      cuerpo: 'Lily actualmente se encuentra en busca de',
      fecha: Date().toLocaleString(),
      urlImg: 'src/assets/Images/dog-form.png',
      seccion: 'Adopción',
    },
    {
      titulo: 'Adopta a Laura!',
      cuerpo: 'Laura fue abandonada por su familia',
      fecha: Date().toLocaleString(),
      urlImg: '../../../assets/Images/dog-form.png',
      seccion: 'Adopción',
    },
  ];
  constructor(private http: HttpClient) {}

  getPublicaciones() {
    return this.http.get<EntidadPublicacion[]>(
      `http://${this.dominio}:${this.puerto}/${this.pathIntermedio}/${this.entidad}/${this.subTipoEntidad}`
    );
  }

  getConsejos() {
    return this.http.get<EntidadPublicacion[]>(
      `http://${this.dominio}:${this.puerto}/${this.pathIntermedio}/${this.dashAdoptante}/${this.entidadConsejos}`
    );
  }
}
