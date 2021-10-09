import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { InicioSesion } from '../components/interfaces/inicioSesion';

import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private token: string = '';
  private authStatusListener = new Subject<boolean>();
  private isAuth = false;

  constructor(private http: HttpClient, private _router: Router) { }

  getToken() {
    return this.token;
  }

  getIsAuth(){
    return this.isAuth;
  }

  getAuthStatusListener(){
    return this.authStatusListener.asObservable();
  }

  getTokenStorage(){
    return sessionStorage.getItem('token');
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
          if(token){
            this.isAuth = true;
            sessionStorage.setItem('token', this.token);
            this.authStatusListener.next(true);
          }

        })
      );
    //return this.servicioBase.post([this.login], inicioSesion);
  }

  logout(){
    this.token = '';
    this.isAuth = false;
    this.authStatusListener.next(false);
    sessionStorage.removeItem('token');
    this._router.navigate(['/login']);
  }

}
