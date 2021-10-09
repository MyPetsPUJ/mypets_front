import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { UserFundacion } from '../components/interfaces/userFundacion';

@Injectable({
  providedIn: 'root',
})
export class FundacionService {
  private token: string = '';
  dominio: string = 'localhost';
  puerto: number = 3000;
  pathApi: string = 'api';
  pathDashboard: string = 'dashboard-adoptante';
  pathFundaciones: string = 'get-fundaciones';

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

  
}
