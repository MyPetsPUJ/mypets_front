import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { InicioSesion } from '../../components/interfaces/auth/inicioSesion';

import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { threadId } from 'worker_threads';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private token: string = '';
  private tipo_usuario: boolean = false;
  private authStatusListener = new Subject<boolean>();
  private isAuth = false;
  private tokenTimer: NodeJS.Timer | undefined;
  private userId: any;
  private userType: string = 'Adoptante';

  constructor(private http: HttpClient, private _router: Router) {}

  getToken() {
    return this.token;
  }

  getIsAuth() {
    return this.isAuth;
  }

  getUserId() {
    return this.userId;
  }

  getTipoUser() {
    return this.tipo_usuario;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  getTokenStorage() {
    return sessionStorage.getItem('token');
  }

  inicioSesion(inicioSesion: InicioSesion) {
    return this.http
      .post<{
        token: string;
        tipo_usuario: string;
        expiresIn: number;
        userId: string;
      }>('http://localhost:3000/api/login', inicioSesion, {
        withCredentials: true,
      })
      .pipe(
        map((res) => {
          console.log('Respuesta', res);
          const token = res.token;
          this.token = token;
          if (token) {
            const expiresInDuration = res.expiresIn;
            this.setAuthTimer(expiresInDuration);
            this.isAuth = true;
            this.userId = res.userId;
            if (res.tipo_usuario == this.userType) {
              this.tipo_usuario = true;
            }
            this.authStatusListener.next(true);
            const now = new Date();
            const expirationDate = new Date(
              now.getTime() + expiresInDuration * 1000
            );
            console.log(expirationDate);
            this.saveAuthData(token, expirationDate, this.userId);
          }
        })
      );
    //return this.servicioBase.post([this.login], inicioSesion);
  }

  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    const now = new Date();
    const expiresIn = authInformation!.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = authInformation!.token;
      this.isAuth = true;
      this.userId = authInformation?.userId;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
    }
  }

  logout() {
    this.token = '';
    this.isAuth = false;
    this.authStatusListener.next(false);
    clearTimeout(this.tokenTimer!);
    this.userId = '';
    this.clearAuthData();
    this._router.navigate(['/login']);
  }

  private setAuthTimer(duration: number) {
    console.log('Setting timer: ' + duration);
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  private saveAuthData(token: string, expirationDate: Date, userId: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
    localStorage.setItem('userId', userId);
  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('userId');
  }

  private getAuthData() {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    const userId = localStorage.getItem('userId');
    if (!token || !expirationDate) {
      return;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate),
      userId: userId,
    };
  }
}
