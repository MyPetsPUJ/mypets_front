import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/auth/login.service';
import { EntidadPublicacion } from 'src/app/components/interfaces/entidadPublicacion';
import { PublicacionService } from 'src/app/services/publicacion/publicacion.service';
import { ActivatedRoute } from '@angular/router';
import { PublicacionListComponent } from '../../publicacion-list/publicacion-list/publicacion-list.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-publicacion-preview',
  templateUrl: './publicacion-preview.component.html',
  styleUrls: ['./publicacion-preview.component.css'],
})
export class PublicacionPreviewComponent implements OnInit {
  userId: string = '';
  publicacionId: string = '';
  file!: File;
  photoSelected: string | ArrayBuffer = '';
  publicacion: EntidadPublicacion = {
    titulo: '',
    cuerpo: '',
    fecha: '',
    urlImg: '',
    seccion: '',
  };

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
  ];
  previsualizacion: string = '';
  constructor(
    // @Inject(MAT_DIALOG_DATA) public data: any,
    // public dialogRef: MatDialogRef<PublicacionPreviewComponent>,
    private activatedRoute: ActivatedRoute,
    private _router: Router,
    private authService: LoginService,
    private publicacionService: PublicacionService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.userId = this.authService.getUserId();
    this.activatedRoute.params.subscribe((params) => {
      this.publicacionId = params['id'];
      this.publicacionService
        .getPublicacion(this.publicacionId)
        .subscribe((res) => {
          console.log(res);
          this.previsualizacion = res.urlImg;
          this.publicacion = res;
        });
    });
  }
  // accion(nombre: string) {
  //   if (nombre == 'cancelar') {
  //     this._router.navigate(['/dashboard/publicaciones/', this.userId]);
  //     this.dialogRef.close();
  //   }
  // }

  onPhotoSelected(event: any): void {
    if (event.target?.files && event.target.files[0]) {
      this.file = <File>event.target.files[0];
      //image preview
      const reader = new FileReader();
      reader.onload = (e) => (this.photoSelected = reader.result as string);
      reader.readAsDataURL(this.file);
    }
  }

  editarPublicacion(titulo: HTMLInputElement, cuerpo: HTMLTextAreaElement) {
    this.publicacionService
      .editarPublicacion(
        this.publicacionId,
        titulo.value,
        cuerpo.value,
        this.file
      )
      .subscribe((res) => {
        console.log(res);
        //this._router.navigate(['dashboard/publicaciones', this.userId]);
      });
  }

  deletePublicacion(id: string) {
    var confirmacion = false;
    const dialogRef = this.dialog.open(PublicacionListComponent,
      {
        width: '370px',
        height: '200px',
        data:
        {
          accion: 'eliminar'
        }
      })
    dialogRef.afterClosed().subscribe(result => {
      confirmacion = result.confirmacion;
      if (confirmacion) {
        this.publicacionService.deletePublicacion(id).subscribe(
          (res) => {
            console.log(res);
            this._router.navigate(['/dashboard/publicaciones', this.userId]);
            this._snackBar.open('Publicación eliminada correctamente ', '', {
              duration: 5000,
              horizontalPosition: 'center',
              verticalPosition: 'bottom',
            });
          },
          (err) => {
            console.log(err);
          }
        );
      }
    })
  }
}
