import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  loading = false;
  cuentaNueva = false;
  constructor(private fb: FormBuilder, private _snackBar: MatSnackBar, private router: Router, public authService: AuthService)
  {
    this.form = this.fb.group ({
      usuario: ['',Validators.required],
      contrasena: ['',Validators.required] //inicia vacio y el espacio es requerido
    })
  }

  ngOnInit(): void {
  }

  inicioSesionAdoptante(form: NgForm){
    
    if(form.invalid){
      return;
    }
    const correo_adoptante = form.value.correo;
    const password_adoptante = form.value.password;
    const tipo_adoptante = form.value.tipo_usuario;
    
    this.authService.inicioSesion(correo_adoptante, password_adoptante, tipo_adoptante);
    
    this.loading = true;
    setTimeout(() => 
    {
      this.router.navigate(['dashboard']);
    },1500)
    
    
  }

  ingresar()
  {
    const usuario = this.form.value.usuario;
    const password = this.form.value.contrasena;
    
    if(usuario == 'FelipeVan' && password == '12345')
    {
      this.exito(usuario);
    }
    else 
    {
      this.error();
    }
    console.log(this.form.value); 
  }

  error()
  {
    this._snackBar.open('Usuario o contraseña inválidos','',
    {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition : 'bottom'
    } )
    this.form.reset();
  }
  exito(usuario: string)
  {
    this._snackBar.open('Bienvenido ' + usuario,'',
    {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition : 'bottom'
    } )
    this.loading = true;
    setTimeout(() => 
    {
      this.router.navigate(['dashboard']);
    },1500)
  }

  crearCuenta()
  {
    this.cuentaNueva = true
    this.router.navigate(['crear-cuenta']);
  }
}
