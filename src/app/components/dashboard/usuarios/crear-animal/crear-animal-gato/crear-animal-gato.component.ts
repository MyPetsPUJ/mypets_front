import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { DomSanitizer } from '@angular/platform-browser';

import { CrearAnimalService } from 'src/app/services/animal/crearAnimal.service';
import { VacunasService } from 'src/app/services/datos-app/vacunas.service';
import { Vacuna } from 'src/app/components/interfaces/datos-app/entidadVacuna';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DatosAnimalService } from 'src/app/services/datos-app/datos-animal.service';
import { Edad } from 'src/app/components/interfaces/datos-app/datos-animal/entidadEdadAnimal';
import { ColorOjos } from 'src/app/components/interfaces/datos-app/datos-animal/entidadColorOjos';
import { Desparasitado } from 'src/app/components/interfaces/datos-app/datos-animal/entidadDesparasitado';
import { GeneroAnimal } from 'src/app/components/interfaces/datos-app/datos-animal/entidadGeneroAnimal';
import { Situacion } from 'src/app/components/interfaces/datos-app/datos-animal/entidadSituacion';
import { Tamano } from 'src/app/components/interfaces/datos-app/datos-animal/entidadTamano';
import { TipoAnimal } from 'src/app/components/interfaces/datos-app/datos-animal/entidadTipoAnimal';
import { TipoPelaje } from 'src/app/components/interfaces/datos-app/datos-animal/entidadTipoPelaje';

export interface Vacuna_box {
  nombre: String;
  completado: boolean;
  color: ThemePalette;
  esquema?: Vacuna_box[];
}

interface HtmlInputEvent extends Event {
  target: (HTMLInputElement & EventTarget) | null;
}

@Component({
  selector: 'app-crear-animal-gato',
  templateUrl: './crear-animal-gato.component.html',
  styleUrls: ['./crear-animal-gato.component.css'],
})
export class CrearAnimalGatoComponent implements OnInit {
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
  constructor(
    public crearGatoService: CrearAnimalService,
    private sanitizer: DomSanitizer,
    private getVacunasService: VacunasService,
    private _router: Router,
    private _snackbar: MatSnackBar,
    private getDatosAnimal: DatosAnimalService
  ) {
    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 19, 0, 1);
    this.maxDate = new Date();
  }

  public vacunas: Vacuna[] = [];
  public archivos: any = [];
  public previsualizacion: string | undefined;
  file!: File;
  photoSelected: string | ArrayBuffer = '';
  ngOnInit(): void {
    this.previsualizacion = '../../../assets/Images/cat-form.png';
    this.cargarDatos();
    this.getVacunasService.getVacunasGato().subscribe(
      (res) => {
        this.vacunas = res;
      },
      (err) => console.log(err)
    );
  }

  lista_vacunas: any[] = [
    'Leucemia viral felina',
    'Triple felina',
    'Segunda dosis leucemia',
    'Refuerzo triple felina',
    'Rabia',
  ];

  situacion: any[] = ['Sin esterilizar', 'Esterilizado'];

  // vacunas: Vacuna_box = {
  //   nombre: 'Seleccione el esquema de vacunas del animal',
  //   completado: false,
  //   color: 'primary',
  //   esquema: [
  //     { nombre: 'Leucemia viral felina', completado: false, color: 'primary' },
  //     { nombre: 'Triple felina', completado: false, color: 'primary' },
  //     { nombre: 'Segunda dosis leucemia', completado: false, color: 'primary' },
  //     { nombre: 'Refuerzo triple felina', completado: false, color: 'primary' },
  //     { nombre: 'Rabia', completado: false, color: 'primary' },
  //   ],
  // };

  all_complete: boolean = false;

  // updateAllComplete() {
  //   this.all_complete =
  //     this.vacunas.esquema != null &&
  //     this.vacunas.esquema.every((t) => t.completado);
  // }

  // someComplete() {
  //   if (this.vacunas.esquema == null) {
  //     return false;
  //   }
  //   return (
  //     this.vacunas.esquema.filter((t) => t.completado).length > 0 &&
  //     !this.all_complete
  //   );
  // }

  // setAll(completado: boolean) {
  //   this.all_complete = completado;
  //   if (this.vacunas.esquema == null) {
  //     return;
  //   }
  //   this.vacunas.esquema.forEach((t) => (t.completado = completado));
  // }

  cargarDatos() {
    this.getDatosAnimal.getDatosGato().subscribe((respuesta) => {
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

  onCrearGato(form: NgForm) {
    console.log(form.value);
    if (form.invalid) {
      return;
    }

    // const esquema: string[] = []
    // esquema.push(form.value.esquema_vac);
    console.log(JSON.stringify(form.value.esquema_vac));

    this.crearGatoService
      .crearAnimalGato(
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
        form.value.esquema_vac.nombre,
        'Gato'
      )
      .subscribe(
        (res) => console.log(res),
        (err) => console.log(err)
      );
    this.mensaje('crear');
    setTimeout(() => {
      this._router.navigate(['/dashboard/mis-animales']);
    }, 2000);
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
      this._snackbar.open('Animal creado de forma exitosa', '', {
        duration: 5000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
      });
    }
  }
}
