import { Component, OnInit } from '@angular/core';
import { CrearProductoService } from 'src/app/services/tienda/crear-producto.service';
import { NgForm } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.css']
})
export class CrearProductoComponent implements OnInit {

  constructor(
    public crearPublicacionService: CrearProductoService,
    private sanitizer: DomSanitizer,
    private _snackBar: MatSnackBar,
    private router: Router
  ) { }

  public archivos: any = [];
  public previsualizacion: string | undefined;
  file!: File;
  photoSelected: string | any;

  ngOnInit(): void {
    this.photoSelected = '../../../assets/Images/no-image.png';
  }
  fechaPublicacion: string = Date().toLocaleString();
  imagenPublicacion: string = 'srcassetsImagesdog.png';
  categorias: any[] = [
    "Alimento","Snacks","Farmapet","Cuidado e Higiene","Juguetes","Accesorios"
  ];
  tipo: any[] = [
    "Perro","Gato"
  ];
  onCrearPublicacion(form: NgForm) {
    if (this.photoSelected == '../../../assets/Images/no-image.png') {
      this._snackBar.open(
        'Por favor seleccione una imágen para la publicación',
        '',
        {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        }
      );
    } else if (form.invalid || form.value.seccionPublicacion == '') {
      if (form.value.seccionPublicacion == '') {
        this._snackBar.open('Por favor rellene los espacios solicitados', '', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        });
      } else {
        this._snackBar.open('Por favor rellene los espacios solicitados', '', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        });
      }
    } else {
      // this.crearPublicacionService.crearPublicacionQuemada(
      //   form.value.nombrePublicacion,
      //   form.value.cuerpoPublicacion,
      //   this.fechaPublicacion,
      //   this.photoSelected,
      //   form.value.seccionPublicacion
      // );
      this.crearPublicacionService.crearProducto(
          form.value.nombreProducto,
          form.value.tipoAnimal,
          this.file,
          form.value.seccionPublicacion,
          form.value.precio
        )
        .subscribe(
          (res) => console.log(res),
          (err) => console.log(err)
        );
      this._snackBar.open('Producto agregado', '', {
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
}
