import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { CrearAdoptanteService } from 'src/app/services/adoptante/crearAdoptante.service';
import { LocalidadesService } from 'src/app/services/datos-app/localidades.service';
import { Localidad } from '../../interfaces/datos-app/entidadLocalidad';
import { Genero } from '../../interfaces/datos-app/entidadGenero';
import { GenerosService } from 'src/app/services/datos-app/generos.service';
import { TipoDocsService } from 'src/app/services/datos-app/tipo-docs.service';
import { TipoDoc } from '../../interfaces/datos-app/entidadTipoDoc';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-adoptante',
  templateUrl: './crear-adoptante.component.html',
  styleUrls: ['./crear-adoptante.component.css'],
})
export class CrearAdoptanteComponent implements OnInit {
  minDate: Date | any;
  maxDate: Date | any;
  generos: Genero[] = [];
  tipo_docs: TipoDoc[] = [];
  file!: File;
  photoSelected: string | ArrayBuffer = '';

  localidades: any[] = [
    '1.Usaquén',
    '2.Chapinero',
    '3.Santa Fé',
    '4.San Cristobal',
    '5.Usme',
    '6. Tunjuelito',
    '7.Bosa',
    '8.Kennedy',
    '9.Fontibón',
    '10.Engativá',
    '11.Suba',
    '12.Barrios Unidos',
    '13.Teusaquillo',
    '14.Los Mártires',
    '15.Antonio Nariño',
    '16.Puente Aranda',
    '17.Candelaria',
    '18.Rafael Uribe Uribe',
    '19.Ciudad Bolivar',
    '20.Sumapaz',
  ];

  constructor(
    public crearAdoptanteService: CrearAdoptanteService,
    private sanitizer: DomSanitizer,
    private getLocalidadesService: LocalidadesService,
    private getGenerosService: GenerosService,
    private getTipoDocService: TipoDocsService,
    private _router: Router
  ) {
    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 110, 0, 1);
    this.maxDate = new Date(currentYear - 18, 11, 31);
  }
  public archivos: any = [];
  public previsualizacion: string | any;
  // localidades: Localidad[] = [];
  ngOnInit(): void {
    this.previsualizacion = '../../../assets/Images/adopt.png';
    // this.getLocalidadesService.getLocalidadesAdoptante().subscribe(
    //   (res) => {
    //     console.log(res);
    //   },
    //   (err) => console.log(err)
    // );

    this.getTipoDocService.getTipoDocAdoptante().subscribe(
      (res) => {
        console.log(res);
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
  selectedValue: string | undefined;
  selectedCar: string | undefined;

  genero: any[] = ['Masculino', 'Femenino'];
  tipo_doc: any[] = ['Cédula de ciudadanía', 'Cédula de extranjería'];

  onSignUp(form: NgForm) {
    console.log(form.value);
    if (form.invalid) {
      return;
    }

    //TODO pasar objetos y no params
    //this.authservice.crearUsuarioAdoptante(datosAdoptante);
    this.crearAdoptanteService.crearUsuarioAdoptante(
      form.value.nombre,
      form.value.apellidos,
      form.value.fecha_nac,
      form.value.tipo_doc,
      form.value.num_doc,
      form.value.genero,
      form.value.localidad,
      form.value.num_cel,
      form.value.correo,
      form.value.password,
      this.file,
      'Adoptante'
    );
    this._router.navigate(['/login']);
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
