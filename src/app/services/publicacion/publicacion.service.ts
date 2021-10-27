import { Injectable } from '@angular/core';
import { EntidadPublicacion } from '../../components/interfaces/entidadPublicacion';
import { HttpClient } from '@angular/common/http';
//import { ServicioBaseService } from '../servicioBase.service';
import { UserFundacion } from '../../components/interfaces/usuarios/userFundacion';

@Injectable({
  providedIn: 'root',
})
export class PublicacionService {
  dominio: string = 'localhost';
  puerto: number = 3000;
  pathIntermedio: string = 'api';
  entidad: string = 'dashboard';
  dashAdoptante: string = 'dashboard-adoptante';
  subTipoEntidad: string = 'publicaciones';
  editarPath: string = 'editar-publicacion';
  entidadConsejos: string = 'consejos';

  publis: EntidadPublicacion[] = [];

  // publicaciones: EntidadPublicacion[] = [
  //   {
  //     titulo: 'Se busca dueño para Betto',
  //     cuerpo: 'Beto es un perro cariñoso con 6 años de vida',
  //     fecha: Date().toLocaleString(),
  //     urlImg: '../../../assets/Images/dog-form.png',
  //     seccion: 'Adopción',
  //     autorPubli: '',
  //   },
  //   {
  //     titulo: 'Lily esta sin hogar',
  //     cuerpo: 'Lily actualmente se encuentra en busca de',
  //     fecha: Date().toLocaleString(),
  //     urlImg: 'src/assets/Images/dog-form.png',
  //     seccion: 'Adopción',
  //     autorPubli: '',
  //   },
  //   {
  //     titulo: 'Adopta a Laura!',
  //     cuerpo: 'Laura fue abandonada por su familia',
  //     fecha: Date().toLocaleString(),
  //     urlImg: '../../../assets/Images/dog-form.png',
  //     seccion: 'Adopción',
  //     autorPubli: '',
  //   },
  // ];
  constructor(private http: HttpClient) {}

  getPublicaciones(id: string) {
    return this.http.get<{
      resultado: UserFundacion;
      publis: EntidadPublicacion[];
    }>(
      `http://${this.dominio}:${this.puerto}/${this.pathIntermedio}/${this.entidad}/${this.subTipoEntidad}/${id}`
    );
  }

  getConsejos() {
    return this.http.get<EntidadPublicacion[]>(
      `http://${this.dominio}:${this.puerto}/${this.pathIntermedio}/${this.dashAdoptante}/${this.entidadConsejos}`
    );
  }

  editarPublicacion(
    titulo: string,
    cuerpo: string,
    imagen: File,
    seccion: string
  ) {
    const fd = new FormData();
    fd.append('titulo', titulo);
    fd.append('cuerpo', cuerpo);
    fd.append('image', imagen);
    fd.append('seccion', seccion);
    return this.http.put(
      `http://${this.dominio}:${this.puerto}/${this.pathIntermedio}/${this.entidad}/${this.subTipoEntidad}/${this.editarPath}`,
      fd
    );
  }
}
