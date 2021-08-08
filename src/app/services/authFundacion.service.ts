import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient} from '@angular/common/http';

import { AuthFundacion } from '../components/interfaces/authFundacion';

@Injectable({
  providedIn: 'root'
})
export class AuthFundacionService {

  constructor(private http: HttpClient) { }

  crearUsuarioFundacion(nombreFund: string, nombreEncar: string, apellidosEncar: string, fecha_creacion: Date, 
  localidad: string, correo: string, num_celular: string, contrasena: string){
    const authFundacion: AuthFundacion = {nombreFund: nombreFund, nombreEncar: nombreEncar, apellidosEncar: apellidosEncar, fecha_creacion: fecha_creacion,
    localidad: localidad, correo: correo, num_celular: num_celular, contrasena: contrasena};
    this.http.post("http://localhost:3000/crear-cuenta/crear-fundacion", authFundacion)
    .subscribe(respuesta => {
      console.log(respuesta);
    });
  }

}
