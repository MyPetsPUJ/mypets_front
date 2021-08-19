import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient} from '@angular/common/http';

import { AuthFundacion } from '../components/interfaces/authFundacion';

@Injectable({
  providedIn: 'root'
})
export class AuthFundacionService {

  constructor(private http: HttpClient) { }

  crearUsuarioFundacion(nombreFund: string, nombreEncar: string, apellidosEncar: string, tipo_doc: string, num_doc: string, fecha_creacion: Date, 
  localidad: string, correo: string, num_celular: string, password: string, tipo_usuario: string)
  {
    const authFundacion: AuthFundacion = {nombreFund: nombreFund, nombreEncar: nombreEncar, apellidosEncar: apellidosEncar, tipo_doc: tipo_doc, num_doc: num_doc, fecha_creacion: fecha_creacion,
    localidad: localidad, correo: correo, num_celular: num_celular, password: password, tipo_usuario: tipo_usuario};
    this.http.post("http://localhost:3000/api/crear-cuenta/crear-fundacion", authFundacion)
    .subscribe(respuesta => {
      console.log(respuesta);
    });
  }

}
