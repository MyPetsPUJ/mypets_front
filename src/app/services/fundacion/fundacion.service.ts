import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { UserFundacion } from '../../components/interfaces/usuarios/userFundacion';

@Injectable({
  providedIn: 'root',
})
export class FundacionService {
  private token: string = '';
  dominio: string = 'localhost';
  puerto: number = 3000;
  pathApi: string = 'api';
  pathDashboard: string = 'dashboard-adoptante';
  pathDashFund: string = 'dashboard';
  pathPerfil: string = 'mi_cuenta';
  pathFundaciones: string = 'get-fundaciones';
  pathAdmin: string = 'dashboard-admin';
  pathFundacion: string = 'fundacion';
  pathMostrar: string = 'mostrar-todas-las-fundaciones';
  pathFunds: string = 'fundaciones';

  constructor(private http: HttpClient) {}

  // fundaciones:UserFundacion[]=[
  //   {nombreFund: 'Huellita',nombreEncar: 'Luis', apellidosEncar: 'Lopez', tipo_doc: 'CC', num_doc: '12312313',
  //   fecha_creacion: new Date('12/3/2020'), localidad: 'Engativa', correo: 'perritos@gmail.com', num_celular: '313125530',
  //   password: "user123", tipo_usuario: "Fundacion", /*mision : "Poteger las mascotas", vision: "Crecer a nivel capital"*/},

  //   {nombreFund: 'Adoptame',nombreEncar: 'Amrio', apellidosEncar: 'Perez', tipo_doc: 'CC', num_doc: '123326',
  //   fecha_creacion: new Date('02/10/2019'), localidad: 'Suba', correo: 'adopta@gmail.com', num_celular: '3131354330',
  //   password: "user123", tipo_usuario: "Fundacion", /*mision : "Incentivar la adopcion", vision: "Crecer a nivel capital"*/}
  // ];

  // getFundaciones(): UserFundacion[]
  // {
  //   return this.fundaciones;
  // }

  getFundaciones() {
    return this.http.get<UserFundacion[]>(
      `http://${this.dominio}:${this.puerto}/${this.pathApi}/${this.pathDashboard}/${this.pathFundaciones}`
    );
  }

  getFundacionById(id: string) {
    return this.http.get<UserFundacion>(
      `http://${this.dominio}:${this.puerto}/${this.pathApi}/${this.pathDashFund}/${this.pathPerfil}/${id}`
    );
  }

  editarFundacion(
    id: string,
    nombreFund: string,
    nombreEncar: string,
    apellidosEncar: string,
    tipo_doc: string,
    num_doc: string,
    mision: string,
    vision: string,
    fecha_creacion: string,
    direccion: string,
    correo: string,
    num_celular: string,
    contraseña: string,
    imagen: File
  ) {
    if (!imagen) {
      const fd = new FormData();
      fd.append('nombreFund', nombreFund);
      fd.append('nombreEncar', nombreEncar);
      fd.append('apellidosEncar', apellidosEncar);
      fd.append('tipo_doc', tipo_doc);
      fd.append('num_doc', num_doc);
      fd.append('mision', mision);
      fd.append('vision', vision);
      fd.append('fecha_creacion', fecha_creacion);
      fd.append('correo', correo);
      fd.append('direccion', direccion);
      fd.append('num_celular', num_celular);
      fd.append('password', contraseña);
      return this.http.put(
        `http://${this.dominio}:${this.puerto}/${this.pathApi}/${this.pathDashFund}/${this.pathPerfil}/${id}`,
        fd
      );
    } else {
      const fd = new FormData();
      fd.append('nombreFund', nombreFund);
      fd.append('nombreEncar', nombreEncar);
      fd.append('apellidosEncar', apellidosEncar);
      fd.append('tipo_doc', tipo_doc);
      fd.append('num_doc', num_doc);
      fd.append('mision', mision);
      fd.append('vision', vision);
      fd.append('fecha_creacion', fecha_creacion);
      fd.append('correo', correo);
      fd.append('direccion', direccion);
      fd.append('num_celular', num_celular);
      fd.append('password', contraseña);
      fd.append('image', imagen);
      return this.http.put(
        `http://${this.dominio}:${this.puerto}/${this.pathApi}/${this.pathDashFund}/${this.pathPerfil}/${id}`,
        fd
      );
    }
  }

  deleteFundacion(id: string) {
    return this.http.delete(
      `http://${this.dominio}:${this.puerto}/${this.pathApi}/${this.pathAdmin}/${this.pathFundacion}/${id}`
    );
  }

  mostrarFundacionesAdmin() {
    return this.http.get<UserFundacion[]>(
      `http://${this.dominio}:${this.puerto}/${this.pathAdmin}/${this.pathFunds}/${this.pathMostrar}`
    );
  }
}
