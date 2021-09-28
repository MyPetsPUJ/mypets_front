import {
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { LoginService } from './login.service';

@Injectable()
export class TokenInterceptorService implements HttpInterceptor {
  constructor(private injector: Injector) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const authTokenService = this.injector.get(LoginService);
    console.log('Este es el token------');
    console.log(`${authTokenService.getToken()}`);
    const authRequest = req.clone({
      headers: req.headers.set('auth-token', `${authTokenService.getToken()}`),
      withCredentials: true,
    });
    return next.handle(authRequest);
  }

  // intercept(req: HttpRequest<any>, next: HttpHandler){
  //   const loginToken = this.injector.get(LoginComponent);
  //   const tokenizedReq = req.clone({
  //     setHeaders: {
  //       Authorization: `Bearer ${loginToken.getToken()}`
  //     }
  //   })
  //   return next.handle(tokenizedReq)
  // }
}
