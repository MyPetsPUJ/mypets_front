import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { CrearAdoptanteService } from 'src/app/services/adoptante/crearAdoptante.service';
import { LocalidadesService } from 'src/app/services/datos-app/localidades.service';
import { Localidad } from '../../interfaces/datos-app/entidadLocalidad';


@Component({
  selector: 'app-crear-adoptante',
  templateUrl: './crear-adoptante.component.html',
  styleUrls: ['./crear-adoptante.component.css'],
})
export class CrearAdoptanteComponent implements OnInit {
  minDate: Date | any;
  maxDate: Date | any;

  constructor(
    public crearAdoptanteService: CrearAdoptanteService,
    private sanitizer: DomSanitizer,
    private getLocalidadesService: LocalidadesService
  ) {
    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 110, 0, 1);
    this.maxDate = new Date(currentYear - 18, 11, 31);
  }
  public archivos: any = [];
  public previsualizacion: string | undefined;
  localidades: Localidad[] = [];
  ngOnInit(): void {
    this.previsualizacion = '../../../assets/Images/adopt.png';
    this.getLocalidadesService.getLocalidadesAdoptante().subscribe(
      (res) => {
        this.localidades = res;
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
    const datosAdoptante = {
      nombre: form.value.nombre,
      apellidos: form.value.apellidos,
      fecha_nacimiento: form.value.fecha_nac,
      tipo_doc: form.value.tipo_doc,
      num_doc: form.value.num_doc,
      genero: form.value.genero,
      localidad: form.value.localidad,
      correo: form.value.correo,
      num_celular: form.value.num_cel,
      password: form.value.password,
      tipo_usuario: 'Adoptante',
    }; //TODO pasar objetos y no params
    //this.authservice.crearUsuarioAdoptante(datosAdoptante);
    this.crearAdoptanteService.crearUsuarioAdoptante(datosAdoptante);
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
