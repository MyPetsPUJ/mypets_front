import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TipoDoc } from 'src/app/components/interfaces/datos-app/entidadTipoDoc';

@Injectable({
  providedIn: 'root'
})
export class TipoDocsService {

  dominio: string = 'localhost';
  puerto: number = 3000;
  pathApi: string = 'api';
  signUp: string = 'crear-cuenta';
  adoptante: string = 'crear-adoptante';
  fundacion: string = 'crear-fundacion';

  constructor(private http: HttpClient) { }

  getTipoDocAdoptante(){
    return this.http.get<TipoDoc[]>(`http://${this.dominio}:${this.puerto}/${this.pathApi}/${this.signUp}/${this.adoptante}`);
  }

  getTipoDocFundacion(){
    return this.http.get<TipoDoc[]>(`http://${this.dominio}:${this.puerto}/${this.pathApi}/${this.signUp}/${this.fundacion}`);
  }


}
