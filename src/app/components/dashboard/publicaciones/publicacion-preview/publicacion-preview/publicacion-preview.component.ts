import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/auth/login.service';
import { EntidadPublicacion } from 'src/app/components/interfaces/entidadPublicacion';
import { PublicacionService } from 'src/app/services/publicacion/publicacion.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-publicacion-preview',
  templateUrl: './publicacion-preview.component.html',
  styleUrls: ['./publicacion-preview.component.css'],
})
export class PublicacionPreviewComponent implements OnInit {
  userId: string = '';
  publicacionId: string = '';
  publicacion: EntidadPublicacion = {
    titulo: '',
    cuerpo: '',
    fecha: '',
    urlImg: '',
    seccion: '',
  };
  constructor(
    // @Inject(MAT_DIALOG_DATA) public data: any,
    // public dialogRef: MatDialogRef<PublicacionPreviewComponent>,
    private activatedRoute: ActivatedRoute,
    private _router: Router,
    private authService: LoginService,
    private publicacionService: PublicacionService
  ) {}

  ngOnInit(): void {
    this.userId = this.authService.getUserId();
    this.activatedRoute.params.subscribe((params) => {
      this.publicacionId = params['id'];
      this.publicacionService
        .getPublicacion(this.publicacionId)
        .subscribe((res) => {
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

  editarPublicacion(form: NgForm) {
    console.log(form.value);
    if (form.invalid) {
      return;
    }
  }

  deletePublicacion(id: string) {
    this.publicacionService.deletePublicacion(id).subscribe(
      (res) => {
        console.log(res);
        this._router.navigate(['/dashboard/publicaciones', this.userId]);
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
