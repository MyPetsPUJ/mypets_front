import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { CrearPublicacionService } from 'src/app/services/crear-publicacion.service';
import { DomSanitizer } from '@angular/platform-browser';
//import { read } from 'fs';

interface HtmlInputEvent extends Event {
  target: HTMLInputElement & EventTarget | null;
}

@Component({
  selector: 'app-crear-publicacion',
  templateUrl: './crear-publicacion.component.html',
  styleUrls: ['./crear-publicacion.component.css'],
})
export class CrearPublicacionComponent implements OnInit {
  constructor(
    public crearPublicacionService: CrearPublicacionService,
    private sanitizer: DomSanitizer
  ) {}

  public archivos: any = [];
  public previsualizacion: string | undefined;
  file!: File;
  photoSelected: string | ArrayBuffer = '';

  ngOnInit(): void {
    this.previsualizacion = '../../../assets/Images/no-image.png';
  }
  fechaPublicacion: string = Date().toLocaleString();
  imagenPublicacion: string = 'srcassetsImagesdog.png';
  seccion: any[] = [
    'Disponible para adoptar',
    'Cuidado animal',
    'Alimentación',
    'Comportamiento',
  ]; //Dato quemado para poder compilar, luego borrar

  onCrearPublicacion(form: NgForm){
    console.log(form.value);
    if(form.invalid){
      return;
    }
    this.crearPublicacionService.crearPublicacion(form.value.nombrePublicacion, form.value.cuerpoPublicacion, this.fechaPublicacion, this.file, form.value.seccionPublicacion)
    .subscribe(res => console.log(res), err => console.log(err))
  }

  onPhotoSelected(event: any): void {
    if (event.target?.files && event.target.files[0]) {
      this.file = <File>event.target.files[0];
      //image preview
      const reader = new FileReader();
      reader.onload = e => this.photoSelected = reader.result as string;
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
