import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { LoginComponent } from '../components/login/login.component';

@Injectable()
export class TokenInterceptorService implements HttpInterceptor{

  constructor(private injector: Injector) { }

  intercept(req: HttpRequest<any>, next: HttpHandler){
    const loginToken = this.injector.get(LoginComponent);
    const tokenizedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${loginToken.getToken()}`
      }
    })
    return next.handle(tokenizedReq)
  }
}
