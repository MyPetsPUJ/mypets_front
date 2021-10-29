import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserAdoptante } from 'src/app/components/interfaces/usuarios/userAdoptante';

@Injectable({
  providedIn: 'root'
})
export class AdoptanteService {

  dominio: string = "localhost";
  puerto: number = 3000;
  pathIntermedio: string = "api";
  pathDashboard: string = "dashboard-adoptante";
  pathPerfil: string = 'mi_cuenta'
  

  constructor(private http: HttpClient) { }


  getAdoptanteById(id: string) {
    return this.http.get<UserAdoptante>(
      `http://${this.dominio}:${this.puerto}/${this.pathIntermedio}/${this.pathDashboard}/${this.pathPerfil}/${id}`
    );
  }

  
}
