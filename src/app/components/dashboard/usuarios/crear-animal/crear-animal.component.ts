import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Vacuna } from 'src/app/components/interfaces/datos-app/entidadVacuna';
import { DatosAnimal } from 'src/app/components/interfaces/datos-app/entidadDatosAnimal';

import { CrearAnimalService } from 'src/app/services/animal/crearAnimal.service';
import { DatosAnimalService } from 'src/app/services/datos-app/datos-animal.service';
import { VacunasService } from 'src/app/services/datos-app/vacunas.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ColorOjos } from 'src/app/components/interfaces/datos-app/datos-animal/entidadColorOjos';
import { Desparasitado } from 'src/app/components/interfaces/datos-app/datos-animal/entidadDesparasitado';
import { Edad } from 'src/app/components/interfaces/datos-app/datos-animal/entidadEdadAnimal';
import { GeneroAnimal } from 'src/app/components/interfaces/datos-app/datos-animal/entidadGeneroAnimal';
import { Situacion } from 'src/app/components/interfaces/datos-app/datos-animal/entidadSituacion';
import { Tamano } from 'src/app/components/interfaces/datos-app/datos-animal/entidadTamano';
import { TipoAnimal } from 'src/app/components/interfaces/datos-app/datos-animal/entidadTipoAnimal';
import { TipoPelaje } from 'src/app/components/interfaces/datos-app/datos-animal/entidadTipoPelaje';

interface HtmlInputEvent extends Event {
  target: (HTMLInputElement & EventTarget) | null;
}

@Component({
  selector: 'app-crear-animal',
  templateUrl: './crear-animal.component.html',
  styleUrls: ['./crear-animal.component.css'],
})
export class CrearAnimalComponent implements OnInit {
  colorOjos: ColorOjos[] = [];
  desparasitados: Desparasitado[] = [];
  edades: Edad[] = [];
  generosAnimal: GeneroAnimal[] = [];
  situaciones: Situacion[] = [];
  tamanos: Tamano[] = [];
  tiposAnimal: TipoAnimal[] = [];
  tiposPelaje: TipoPelaje[] = [];
  minDate: Date | any;
  maxDate: Date | any;
  vacunas: Vacuna[] = [];
  public archivos: any = [];
  public previsualizacion: string | undefined;
  file!: File;
  photoSelected: string | ArrayBuffer = '';

  constructor(
    public crearPerroService: CrearAnimalService,
    private sanitizer: DomSanitizer,
    private getVacunasService: VacunasService,
    private getDatosAnimalService: DatosAnimalService,
    private _router: Router,
    private _snackBar: MatSnackBar
  ) {
    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 19, 0, 1);
    this.maxDate = new Date();
  }

  ngOnInit(): void {
    this.previsualizacion = '../../../assets/Images/dog-form.png';
    this.cargarDatos();
    this.getVacunasService.getVacunasPerro().subscribe(
      (res) => {
        this.vacunas = res;
      },
      (err) => console.log(err)
    );
  }
  tiles: any[] = [
    { text: 'One', cols: 3, rows: 1, color: 'lightblue' },
    { text: 'Two', cols: 1, rows: 2, color: 'lightgreen' },
    { text: 'Three', cols: 1, rows: 1, color: 'lightpink' },
    { text: 'Four', cols: 2, rows: 1, color: '#DDBDF1' },
  ];

  lista_vacunas: any[] = [
    'Moquillo canino',
    'Hepatitis',
    'Parvovirosis',
    'Leptospirosis',
    'Rabia',
  ];
  vacunasAnimal: string[] = [];
  
  onCrearPerro(form: NgForm) {
    console.log(form.value);
    if (form.invalid) {
      return;
    }

    this.crearPerroService
      .crearAnimalPerro(
        form.value.nombre,
        form.value.edad,
        form.value.raza,
        form.value.sexo,
        form.value.tamano,
        form.value.color_ojos,
        form.value.tipo_pelaje,
        form.value.situacion,
        form.value.desparasitado,
        form.value.ultima_vac,
        form.value.descripcion,
        this.file,
        form.value.esquema_vac,
        'Perro'
      )
      .subscribe(
        (res) => console.log(res),
        (err) => console.log(err)
      );
      this.mensaje('crear');
      setTimeout(() => {
        this._router.navigate(['/dashboard/mis-animales'])
      }, 2000);
    
  }

  cargarDatos() {
    this.getDatosAnimalService.getDatosPerro().subscribe((respuesta) => {
      this.colorOjos = respuesta.colorOjos;
      this.desparasitados = respuesta.desparasitados;
      this.edades = respuesta.edades;
      this.generosAnimal = respuesta.generosAnimal;
      this.tamanos = respuesta.tamanos;
      this.tiposAnimal = respuesta.tiposAnimal;
      this.tiposPelaje = respuesta.tiposPelaje;
      this.situaciones = respuesta.situaciones;
    });
  }

  onPhotoSelected(event: any): void {
    if (event.target?.files && event.target.files[0]) {
      this.file = <File>event.target.files[0];
      //image preview
      const reader = new FileReader();
      reader.onload = (e) => (this.photoSelected = reader.result as string);
      reader.readAsDataURL(this.file);
    }
  }

  mensaje(accion: string) {
    if (accion == 'crear') {
      this._snackBar.open('Animal creado de forma exitosa', '', {
        duration: 5000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
      });
    }
  }
}
