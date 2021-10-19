import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { DomSanitizer } from '@angular/platform-browser';

import { CrearAnimalService } from 'src/app/services/animal/crearAnimal.service';
import { VacunasService } from 'src/app/services/datos-app/vacunas.service';
import { Vacuna } from 'src/app/components/interfaces/datos-app/entidadVacuna';
import { Router } from '@angular/router';

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
  minDate: Date | any;
  maxDate: Date | any;
  constructor(
    public crearGatoService: CrearAnimalService,
    private sanitizer: DomSanitizer,
    private getVacunasService: VacunasService,
    private _router: Router
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
    this.getVacunasService.getVacunasGato().subscribe(
      (res) => {
        this.vacunas = res;
      },
      (err) => console.log(err)
    );
  }

  edad: any[] = [
    'menos de 1 mes ',
    '1 mes',
    '2 meses',
    '3 meses',
    '4 meses',
    '5 meses',
    '6 meses',
    '7 meses',
    '8 meses',
    '9 meses',
    '10 meses',
    '11 meses',
    '1 año',
    '2 años',
    '3 años',
    '4 años',
    '5 años',
    '6 años',
    '7 años',
    '8 años',
    '9 años',
    '10 años',
    '11 años',
    '12 años',
    '13 años',
    '14 años',
    '15 años',
    'más de 15 años',
  ];

  tipo: any[] = ['Perro', 'Gato'];

  genero: any[] = ['Macho', 'Hembra'];

  tamano: any[] = ['Pequeño', 'Mediano', 'Grande'];

  color_ojos: any[] = [
    'Azul',
    'Verde',
    'Marrón',
    'Dorado',
    'Negro',
    'Heterocromía',
  ];

  tipo_pelaje: any[] = [
    'Pelaje largo',
    'Pelaje semilargo',
    'Pelaje corto',
    'Sin pelaje',
  ];

  desparasitado: any[] = ['Sí', 'No'];

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
    this._router.navigate(['/dashboard/animales']);
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

  onFileInput(event): any {
    const archivo = event.target.files[0];
    this.archivos.push(archivo);
    this.extraerBase64(archivo).then((imagen: any) => {
      this.previsualizacion = imagen.base;
    });
  }
  extraerBase64 = async ($event: any) =>
    new Promise((resolve) => {
      try {
        const unsafeImg = window.URL.createObjectURL($event);
        const image = this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
        const reader = new FileReader();
        reader.readAsDataURL($event);
        reader.onload = () => {
          resolve({
            base: reader.result,
          });
        };
        reader.onerror = (error) => {
          resolve({
            base: null,
          });
        };
        return resolve;
      } catch (e) {
        return null;
      }
    });
}
