import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { InicioSesion } from '../components/interfaces/inicioSesion';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private token: string = '';

  constructor(private http: HttpClient) { }

  getToken() {
    return this.token;
  }

  inicioSesion(inicioSesion: InicioSesion) {
    return this.http
      .post<{ token: string }>(
        'http://localhost:3000/api/login',
        inicioSesion,
        { withCredentials: true }
      )
      .pipe(
        map((res) => {
          console.log(res);
          const token = res.token;
          this.token = token;
        })
      );
    //return this.servicioBase.post([this.login], inicioSesion);
  }

}
