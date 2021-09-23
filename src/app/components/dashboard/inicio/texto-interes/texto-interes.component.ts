import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-texto-interes',
  templateUrl: './texto-interes.component.html',
  styleUrls: ['./texto-interes.component.css']
})
export class TextoInteresComponent implements OnInit {
  
  tituloDevuelta: string | any;
  textoDevuelta: string | any;
  constructor( public dialogRef: MatDialogRef<TextoInteresComponent>,@Inject(MAT_DIALOG_DATA) public data: any,
  private _snackBar: MatSnackBar,) { 
    console.log(this.data.texto);
    this.textoDevuelta = this.data.texto;
  }

  ngOnInit(): void {
  }
  guardarTexto()
  {
      this.tituloDevuelta = (document.getElementById("tituloPunto") as HTMLInputElement).value
      this.textoDevuelta = (document.getElementById("txtInput") as HTMLInputElement).value
    if(this.tituloDevuelta == '')
    {
      this._snackBar.open('Proporcione un título a su punto de interés','', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
      });
    }
    else if(this.textoDevuelta == '')
    {
      this._snackBar.open('Proporcione una descripción de su punto de interés','', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
      });
    }
    else
    {
      this._snackBar.open('Punto de interés creado','', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
      });
     this.dialogRef.close({titulo: this.tituloDevuelta, texto: this.textoDevuelta});
    }
  }
}
