import { stringify } from '@angular/compiler/src/util';
import { Component, Injectable, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CrearAdoptanteService } from 'src/app/services/adoptante/crearAdoptante.service';
import { CrearFundacionService } from 'src/app/services/fundacion/crearFundacion.service';
import { LoginService } from 'src/app/services/auth/login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})

export class LoginComponent implements OnInit {
  form: FormGroup;
  loading = false;
  cuentaNueva = false;
  private token: string = '';
  constructor(
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private router: Router,
    public crearAdoptanteService: CrearAdoptanteService,
    public crearFundacionService: CrearFundacionService,
    private loginService: LoginService
  ) {
    this.form = this.fb.group({
      usuario: ['', Validators.required],
      contrasena: ['', Validators.required], //inicia vacio y el espacio es requerido
    });
  }
  selected=-1;
  
  getToken() {
    return this.token;
  }

  ngOnInit(): void {}

  inicioSesionAdoptante(form: NgForm) {
    if (form.invalid) {
      return;
    }

    const datosLogin = {
      correo: form.value.correo,
      password: form.value.password,
      tipo_usuario: form.value.tipo_usuario,
    };

    const usuarioAdoptante: String = 'Adoptante'; //TODO separar en constantes
    const usuarioFundacion: String = 'Fundacion';
    const usuarioAdmin: String = 'Administrador';

    //Hace falta hacer una verificación de que usuario y contraseña sean los correctos en el front-end

    if (datosLogin.tipo_usuario == usuarioAdoptante) {
      this.loginService
        .inicioSesion(datosLogin)
        .subscribe({
          next: (respuesta) => {
            console.log(respuesta);
            this.exitoAdoptante(datosLogin.correo);
          },
          error: (e) => {
            this.error();
          }
        });
    } else if (datosLogin.tipo_usuario == usuarioFundacion) {
      this.loginService
        .inicioSesion(datosLogin)
        .subscribe({
          next: (respuesta) => {
            console.log(respuesta)
            this.exitoFundacion(datosLogin.correo);
          },
          error: (e) => {
            this.error();
          }
        });
    }else if (datosLogin.tipo_usuario == usuarioAdmin) {
      this.loginService
        .inicioSesion(datosLogin)
        .subscribe({
          next: (respuesta) => {
            console.log(respuesta)
            this.exitoAdmin(datosLogin.correo);
          },
          error: (e) => {
            this.error();
          }
        });
    }
  }

  
  error() {
    this._snackBar.open('Usuario o contraseña inválidos', '', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
    this.form.reset();
  }
  exitoAdoptante(usuario: string) {
    this._snackBar.open('Bienvenido ' + usuario, '', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
    this.loading = true;
    setTimeout(() => {
      this.router.navigate(['dashboard-adoptante']);
    }, 1500);
  }

  exitoFundacion(usuario: string) {
    this._snackBar.open('Bienvenido ' + usuario, '', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
    this.loading = true;
    setTimeout(() => {
      this.router.navigate(['dashboard']);
    }, 1500);
  }

  exitoAdmin(usuario: string){
    this._snackBar.open('Bienvenido ' + usuario, '', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
    this.loading = true;
    setTimeout(() => {
      this.router.navigate(['dashboard-admin']);
    }, 1500);
  }

  crearCuenta() {
    this.cuentaNueva = true;
    this.router.navigate(['crear-cuenta']);
  }
}
