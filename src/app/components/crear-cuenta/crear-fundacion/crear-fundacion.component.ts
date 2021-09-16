import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';

import { CrearFundacionService } from 'src/app/services/crearFundacion.service';

@Component({
  selector: 'app-crear-fundacion',
  templateUrl: './crear-fundacion.component.html',
  styleUrls: ['./crear-fundacion.component.css'],
})
export class CrearFundacionComponent implements OnInit {
  maxDate: Date | any;
  constructor(
    public crearFundacionService: CrearFundacionService,
    private sanitizer: DomSanitizer
  ) {
    const currentYear = new Date().getFullYear();
    this.maxDate = new Date();
  }
  public archivos: any = [];
  public previsualizacion: string | undefined;

  ngOnInit(): void {
    this.previsualizacion = '../../../assets/Images/chat.png';
  }

  tipo_doc: any[] = ['Cédula de ciudadanía', 'Cédula de extranjería'];
  localidad: any[] = [
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
  //nombreFun:string = 'nombreFundacion';
  onSignUp(form: NgForm) {
    console.log(form.value);
    if (form.invalid) {
      return;
    }
    const datosFundacion = {
      nombreFund: form.value.nombreFun,
      nombreEncar: form.value.nombreEncar,
      apellidosEncar: form.value.apellidos,
      tipo_doc: form.value.tipo_doc,
      num_doc: form.value.num_doc,
      fecha_creacion: form.value.fecha_creacion,
      localidad: form.value.localidad,
      correo: form.value.correo,
      num_celular: form.value.num_cel,
      password: form.value.contrasena,
      tipo_usuario: 'Fundacion',
    };
    this.crearFundacionService
      .crearUsuarioFundacion(datosFundacion)
      .subscribe((respuesta) => {
        console.log(respuesta);
        // const token = respuesta.token;
        // this.token = token;
      });
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
