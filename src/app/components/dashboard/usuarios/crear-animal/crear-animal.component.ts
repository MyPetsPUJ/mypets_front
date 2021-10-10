import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Vacuna } from 'src/app/components/interfaces/entidadVacuna';

import { CrearAnimalService } from 'src/app/services/crearAnimal.service';
import { VacunasService } from 'src/app/services/vacunas.service';

interface HtmlInputEvent extends Event {
  target: (HTMLInputElement & EventTarget) | null;
}

@Component({
  selector: 'app-crear-animal',
  templateUrl: './crear-animal.component.html',
  styleUrls: ['./crear-animal.component.css'],
})
export class CrearAnimalComponent implements OnInit {
  minDate: Date | any;
  maxDate: Date | any;
  constructor(
    public crearPerroService: CrearAnimalService,
    private sanitizer: DomSanitizer,
    private getVacunasService: VacunasService,
    private _router: Router
  ) {
    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 19, 0, 1);
    this.maxDate = new Date();
  }
  vacunas: Vacuna[] = []
  public archivos: any = [];
  public previsualizacion: string | undefined;
  file!: File;
  photoSelected: string | ArrayBuffer = '';
  ngOnInit(): void {
    this.previsualizacion = '../../../assets/Images/dog-form.png';
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
    'Pelaje duro',
    'Pelaje rizado',
    'Pelaje corto',
    'Pelaje largo',
  ];
  lista_vacunas: any[] = [
    'Moquillo canino',
    'Hepatitis',
    'Parvovirosis',
    'Leptospirosis',
    'Rabia',
  ];

  desparasitado: any[] = ['Sí', 'No'];
  situacion: any[] = ['Sin esterilizar', 'Esterilizado'];

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
