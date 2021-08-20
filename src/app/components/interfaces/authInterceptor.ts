import { HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthFundacionService } from "src/app/services/authFundacion.service";


@Injectable()
export class AuthInterceptor implements HttpInterceptor{

    constructor(private authFundacionService: AuthFundacionService){}

    intercept(req: HttpRequest<any>, next: HttpHandler){
        const authToken = this.authFundacionService.getToken();
        const authRequest = req.clone({
            headers: req.headers.set('Authorization', authToken)
        });
        return next.handle(authRequest);
    }
}