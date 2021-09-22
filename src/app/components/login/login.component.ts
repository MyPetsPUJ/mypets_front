import { stringify } from '@angular/compiler/src/util';
import { Component, Injectable, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CrearAdoptanteService } from 'src/app/services/crearAdoptante.service';
import { CrearFundacionService } from 'src/app/services/crearFundacion.service';

@Injectable({
  providedIn: "root"
})
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  loading = false;
  cuentaNueva = false;
  private token: string = ""
  constructor(
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private router: Router,
    public crearAdoptanteService: CrearAdoptanteService,
    public crearFundacionService: CrearFundacionService
  ) {
    this.form = this.fb.group({
      usuario: ['', Validators.required],
      contrasena: ['', Validators.required], //inicia vacio y el espacio es requerido
    });
  }

  getToken(){
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

    //Hace falta hacer una verificación de que usuario y contraseña sean los correctos en el front-end

    if (datosLogin.tipo_usuario === usuarioAdoptante) {
      this.crearAdoptanteService
        .inicioSesion(datosLogin)
        .subscribe((respuesta) => {
          console.log(respuesta);
          this.exitoAdoptante(datosLogin.correo);
        });
    } else if (datosLogin.tipo_usuario === usuarioFundacion) {
      this.crearFundacionService
        .inicioSesion(datosLogin)
        .subscribe((respuesta) => {
          console.log(respuesta);
          const token = respuesta.token;
          this.token = token
          //localStorage.setItem('token', JSON.stringify(respuesta.token));
          this.exitoFundacion(datosLogin.correo); //Cambiar dashboard dependiendo del usuario
        });
    }
  }

  ingresar() {
    const usuario = this.form.value.usuario;
    const password = this.form.value.contrasena;

    if (usuario == 'FelipeVan' && password == '12345') {
      this.exitoAdoptante(usuario);
    } else {
      this.error();
    }
    console.log(this.form.value);
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

  crearCuenta() {
    this.cuentaNueva = true;
    this.router.navigate(['crear-cuenta']);
  }
}
