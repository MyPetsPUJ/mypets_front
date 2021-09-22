import { HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable, Injector } from "@angular/core";
import { CrearFundacionService } from "src/app/services/crearFundacion.service";
import { LoginComponent } from "../login/login.component";


@Injectable()
export class AuthInterceptor implements HttpInterceptor{

    constructor(private injector: Injector){}

    intercept(req: HttpRequest<any>, next: HttpHandler){
        const authTokenService = this.injector.get(LoginComponent)
        console.log("Este es el token------");
        console.log(`${authTokenService.getToken()}`);
        const authRequest = req.clone({
            headers: req.headers.set('auth-token', `${authTokenService.getToken()}`)
        });
        return next.handle(authRequest);
    }
}