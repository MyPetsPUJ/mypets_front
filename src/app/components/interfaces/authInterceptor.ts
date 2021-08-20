import { HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CrearFundacionService } from "src/app/services/crearFundacion.service";


@Injectable()
export class AuthInterceptor implements HttpInterceptor{

    constructor(private crearFundacionService: CrearFundacionService){}

    intercept(req: HttpRequest<any>, next: HttpHandler){
        const authToken = this.crearFundacionService.getToken();
        const authRequest = req.clone({
            headers: req.headers.set('Authorization', authToken)
        });
        return next.handle(authRequest);
    }
}