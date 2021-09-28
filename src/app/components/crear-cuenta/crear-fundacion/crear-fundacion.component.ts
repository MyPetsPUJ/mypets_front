import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';

import { CrearFundacionService } from 'src/app/services/crearFundacion.service';
import { LocalidadesService } from 'src/app/services/localidades.service';
import { Localidad } from '../../interfaces/entidadLocalidad';

interface HtmlInputEvent extends Event {
  target: (HTMLInputElement & EventTarget) | null;
}

@Component({
  selector: 'app-crear-fundacion',
  templateUrl: './crear-fundacion.component.html',
  styleUrls: ['./crear-fundacion.component.css'],
})
export class CrearFundacionComponent implements OnInit {
  maxDate: Date | any;
  constructor(
    public crearFundacionService: CrearFundacionService,
    private sanitizer: DomSanitizer,
    private getLocalidadesService: LocalidadesService
  ) {
    const currentYear = new Date().getFullYear();
    this.maxDate = new Date();
  }
  //public archivos: any = [];
  public previsualizacion: string | undefined;
  file!: File;
  photoSelected: string | ArrayBuffer = '';
  localidades: Localidad[] = []

  ngOnInit(): void {
    this.previsualizacion = '../../../assets/Images/chat.png';
    this.getLocalidadesService.getLocalidadesFundacion().subscribe(
      (res) => {
        this.localidades = res;
      },
      (err) => console.log(err)
    );
  }

  tipo_doc: any[] = ['Cédula de ciudadanía', 'Cédula de extranjería'];
  
  
  onSignUp(form: NgForm) {
    console.log(form.value);
    if (form.invalid) {
      return;
    }

    this.crearFundacionService
      .crearUsuarioFundacion(
        form.value.nombreFun,
        form.value.nombreEncar,
        form.value.apellidos,
        form.value.tipo_doc,
        form.value.num_doc,
        form.value.fecha_creacion,
        form.value.localidad.nombre,
        form.value.correo,
        form.value.num_cel,
        form.value.contrasena,
        this.file,
        'Fundacion'
      )
      .subscribe((respuesta) => {
        console.log(respuesta);
        (err) => console.log(err);
        // const token = respuesta.token;
        // this.token = token;
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

  // onFileInput(event): any {
  //   const archivo = event.target.files[0];
  //   this.archivos.push(archivo);
  //   this.extraerBase64(archivo).then((imagen: any) => {
  //     this.previsualizacion = imagen.base;
  //   });
  // }
  // extraerBase64 = async ($event: any) =>
  //   new Promise((resolve) => {
  //     try {
  //       const unsafeImg = window.URL.createObjectURL($event);
  //       const image = this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
  //       const reader = new FileReader();
  //       reader.readAsDataURL($event);
  //       reader.onload = () => {
  //         resolve({
  //           base: reader.result,
  //         });
  //       };
  //       reader.onerror = (error) => {
  //         resolve({
  //           base: null,
  //         });
  //       };
  //       return resolve;
  //     } catch (e) {
  //       return null;
  //     }
  //   });
}
