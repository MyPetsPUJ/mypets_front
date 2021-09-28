import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { CrearPublicacionService } from 'src/app/services/crear-publicacion.service';
import { DomSanitizer } from '@angular/platform-browser';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
//import { read } from 'fs';

interface HtmlInputEvent extends Event {
  target: (HTMLInputElement & EventTarget) | null;
}

@Component({
  selector: 'app-crear-publicacion',
  templateUrl: './crear-publicacion.component.html',
  styleUrls: ['./crear-publicacion.component.css'],
})
export class CrearPublicacionComponent implements OnInit {
  constructor(
    public crearPublicacionService: CrearPublicacionService,
    private sanitizer: DomSanitizer,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {}

  public archivos: any = [];
  public previsualizacion: string | undefined;
  file!: File;
  photoSelected: string | any;

  ngOnInit(): void {
    this.photoSelected = '../../../assets/Images/no-image.png';
  }
  fechaPublicacion: string = Date().toLocaleString();
  imagenPublicacion: string = 'srcassetsImagesdog.png';
  seccion: any[] = [
    'Adquisición',
    'Adultos',
    'Alimentación',
    'Cambios en mi mascota',
    'Cachorros',
    'Cuidados y bienestar',
    'Entrenamiento',
    'Nutrición',
    'Salud',
  ]; //Dato quemado para poder compilar, luego borrar

  onCrearPublicacion(form: NgForm) {
    if(this.photoSelected == "../../../assets/Images/no-image.png")
      {
        this._snackBar.open('Por favor seleccione una imágen para la publicación','', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        });
      }
    else if (form.invalid || form.value.seccionPublicacion == '')  {
      
      if(form.value.seccionPublicacion == '')
      {
        this._snackBar.open('Por favor rellene los espacios solicitados','', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        });
      }
      else 
      {
        this._snackBar.open('Por favor rellene los espacios solicitados','', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        });
      }
    }
    else 
    {
      this.crearPublicacionService.crearPublicacionQuemada(form.value.nombrePublicacion,
        form.value.cuerpoPublicacion,
        this.fechaPublicacion,
        this.photoSelected,
        form.value.seccionPublicacion);
      this.crearPublicacionService
      .crearPublicacion(
        form.value.nombrePublicacion,
        form.value.cuerpoPublicacion,
        this.fechaPublicacion,
        this.file,
        form.value.seccionPublicacion
      )
      .subscribe(
        (res) => console.log(res),
        (err) => console.log(err)
      );
      this._snackBar.open('Publicación creada','', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
      });
      this.router.navigate([['']]);
    }
    
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
