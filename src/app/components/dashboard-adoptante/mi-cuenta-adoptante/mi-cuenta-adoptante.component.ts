import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AdoptanteService } from 'src/app/services/adoptante/adoptante.service';
import { LoginService } from 'src/app/services/auth/login.service';
import { DatosCrearAdoptanteService } from 'src/app/services/datos-app/datos-crear-adoptante.service';
import { Genero } from '../../interfaces/datos-app/entidadGenero';
import { Localidad } from '../../interfaces/datos-app/entidadLocalidad';
import { TipoDoc } from '../../interfaces/datos-app/entidadTipoDoc';
import { UserAdoptante } from '../../interfaces/usuarios/userAdoptante';

@Component({
  selector: 'app-mi-cuenta-adoptante',
  templateUrl: './mi-cuenta-adoptante.component.html',
  styleUrls: ['./mi-cuenta-adoptante.component.css'],
})
export class MiCuentaAdoptanteComponent implements OnInit {
  userId: string = '';
  genero: string = '';
  // generos: Genero[] = [];
  // tipoDocs: TipoDoc[] = [];
  // localidades: Localidad[] = [];

  adoptante: UserAdoptante = {
    nombre: '',
    urlImg: '',
    apellidos: '',
    fecha_nacimiento: '',
    tipo_doc: '',
    num_doc: '',
    genero: '',
    localidad: '',
    correo: '',
    num_celular: '',
    tipo_usuario: '',
    password: '',
    animales: [],
    solicitudesAdoptante: [],
  };
  tipo_doc: string = '';
  localidad: string = '';
  file!: File;
  photoSelected: string | ArrayBuffer = '';
  localidades: any[] = [
    'Usaquén',
    'Chapinero',
    'Santa Fé',
    'San Cristobal',
    'Usme',
    'Tunjuelito',
    'Bosa',
    'Kennedy',
    'Fontibón',
    'Engativá',
    'Suba',
    'Barrios Unidos',
    'Teusaquillo',
    'Los Mártires',
    'Antonio Nariño',
    'Puente Aranda',
    'Candelaria',
    'Rafael Uribe Uribe',
    'Ciudad Bolivar',
    'Sumapaz',
  ];

  generos: any[] = ['Masculino', 'Femenino'];
  documentos: String[] = [
    'Cédula de ciudadanía',
    'Cédula de extranjería',
    'Pasaporte',
  ];
  // generos: String[] = ['Masculino', 'Femenino'];

  constructor(
    private authService: LoginService,
    private adoptanteService: AdoptanteService,
    private _router: Router,
    private _snackBar: MatSnackBar,
    private getDatosAdoptanteService: DatosCrearAdoptanteService
  ) {}

  ngOnInit(): void {
    this.userId = this.authService.getUserId();

    this.adoptanteService.getAdoptanteById(this.userId).subscribe((res) => {
      this.adoptante = res;
      this.genero = this.adoptante.genero;
      this.localidad = this.adoptante.localidad;
      this.tipo_doc = this.adoptante.tipo_doc;
    });
    // this.cargarDatos();
  }

  // cargarDatos() {
  //   this.getDatosAdoptanteService.getDatos().subscribe((res) => {
  //     this.generos = res.generos;
  //     this.tipoDocs = res.tipo_docs;
  //     // this.localidades = res.localidades;
  //   });
  // }

  onPhotoSelected(event: any): void {
    if (event.target?.files && event.target.files[0]) {
      this.file = <File>event.target.files[0];
      //image preview
      const reader = new FileReader();
      reader.onload = (e) => (this.photoSelected = reader.result as string);
      reader.readAsDataURL(this.file);
    }
  }

  updateAdoptante(
    nombre: HTMLInputElement,
    apellidos: HTMLInputElement,
    tipo_doc: string,
    num_doc: HTMLInputElement,
    fecha_nac: HTMLInputElement,
    genero: string,
    localidad: string,
    correo: HTMLInputElement,
    num_celular: HTMLInputElement,
    password: HTMLInputElement
  ) {
    if (password.value === '') {
      this._snackBar.open('Porfavor ingrese su contraseña para guardar sus cambios', '', {
        duration: 5000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
      });

      return;
    }
    this.adoptanteService
      .editarAdoptante(
        this.userId,
        nombre.value,
        apellidos.value,
        tipo_doc,
        num_doc.value,
        fecha_nac.value,
        genero,
        localidad,
        correo.value,
        num_celular.value,
        password.value,
        this.file
      )
      .subscribe((res) => {
        console.log('RESPUESTA', res);
        this._router.navigate(['dashboard-adoptante']);
      });
  }
}
