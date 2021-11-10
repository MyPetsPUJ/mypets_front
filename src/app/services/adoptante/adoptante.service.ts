import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserAdoptante } from 'src/app/components/interfaces/usuarios/userAdoptante';

@Injectable({
  providedIn: 'root',
})
export class AdoptanteService {
  dominio: string = 'localhost';
  puerto: number = 3000;
  pathIntermedio: string = 'api';
  pathDashboard: string = 'dashboard-adoptante';
  pathPerfil: string = 'mi-cuenta';

  constructor(private http: HttpClient) {}

  getAdoptanteById(id: string) {
    return this.http.get<UserAdoptante>(
      `http://${this.dominio}:${this.puerto}/${this.pathIntermedio}/${this.pathDashboard}/${this.pathPerfil}/${id}`
    );
  }

  editarAdoptante(
    id: string,
    nombre: string,
    apellidos: string,
    tipo_doc: string,
    num_doc: string,
    fecha_nac: string,
    genero: string,
    localidad: string,
    correo: string,
    num_celular: string,
    password: string,
    imagen: File
  ) {
    if (!imagen) {
      const fd = new FormData();
      fd.append('nombre', nombre);
      fd.append('apellidos', apellidos);
      fd.append('tipo_doc', tipo_doc);
      fd.append('num_doc', num_doc);
      fd.append('fecha_nacimiento', fecha_nac);
      fd.append('correo', correo);
      fd.append('genero', genero);
      fd.append('localidad', localidad);
      fd.append('num_celular', num_celular);
      fd.append('password', password);
      return this.http.put(
        `http://${this.dominio}:${this.puerto}/${this.pathIntermedio}/${this.pathDashboard}/${this.pathPerfil}/${id}`,
        fd
      );
    } else {
      const fd = new FormData();
      fd.append('nombre', nombre);
      fd.append('apellidos', apellidos);
      fd.append('tipo_doc', tipo_doc);
      fd.append('num_doc', num_doc);
      fd.append('fecha_nacimiento', fecha_nac);
      fd.append('correo', correo);
      fd.append('genero', genero);
      fd.append('localidad', localidad);
      fd.append('num_celular', num_celular);
      fd.append('password', password);
      fd.append('image', imagen);
      return this.http.put(
        `http://${this.dominio}:${this.puerto}/${this.pathIntermedio}/${this.pathDashboard}/${this.pathPerfil}/${id}`,
        fd
      );
    }
  }
}
