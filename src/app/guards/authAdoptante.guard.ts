import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../services/auth/login.service';

@Injectable()
export class AuthGuardAdoptante implements CanActivate {
  constructor(private authService: LoginService, private _router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    const tipoUser = this.authService.getTipoUser();
    if (!tipoUser) {
      this._router.navigate(['/dashboard']);
    }
    return tipoUser;
  }
}
