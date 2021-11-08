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

  constructor(private http: HttpClient) {}

  getPublicaciones(id: string) {
    return this.http.get<{
      resultado: UserFundacion;
      publis: EntidadPublicacion[];
    }>(
      `http://${this.dominio}:${this.puerto}/${this.pathIntermedio}/${this.entidad}/${this.subTipoEntidad}/${id}`
    );
  }

  getPublicacion(id: string) {
    return this.http.get<EntidadPublicacion>(
      `http://${this.dominio}:${this.puerto}/${this.pathIntermedio}/${this.entidad}/${this.subTipoEntidad}/${this.editarPath}/${id}`
    );
  }

  getConsejos() {
    return this.http.get<EntidadPublicacion[]>(
      `http://${this.dominio}:${this.puerto}/${this.pathIntermedio}/${this.dashAdoptante}/${this.entidadConsejos}`
    );
  }

  getConsejo(id: string){
    return this.http.get<EntidadPublicacion>(`http://${this.dominio}:${this.puerto}/${this.pathIntermedio}/${this.dashAdoptante}/${this.entidadConsejos}/${id}`)
  }

  editarPublicacion(
    id: string,
    titulo: string,
    cuerpo: string,
    imagen: File
  ) {
    if(!imagen){
      const fd = new FormData();
      fd.append('titulo', titulo);
      fd.append('cuerpo', cuerpo);
      return this.http.put(
        `http://${this.dominio}:${this.puerto}/${this.pathIntermedio}/${this.entidad}/${this.subTipoEntidad}/${this.editarPath}/${id}`,
        fd
      );
    }
    else{
      const fd = new FormData();
      fd.append('titulo', titulo);
      fd.append('cuerpo', cuerpo);
      fd.append('image', imagen);
      return this.http.put(
        `http://${this.dominio}:${this.puerto}/${this.pathIntermedio}/${this.entidad}/${this.subTipoEntidad}/${this.editarPath}/${id}`,
        fd
      );
    }
  }

  deletePublicacion(id: string) {
    return this.http.delete(
      `http://${this.dominio}:${this.puerto}/${this.pathIntermedio}/${this.entidad}/${this.subTipoEntidad}/${this.editarPath}/${id}`
    );
  }

  
}
