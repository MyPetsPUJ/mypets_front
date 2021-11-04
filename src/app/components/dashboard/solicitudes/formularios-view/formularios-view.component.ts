import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-formularios-view',
  templateUrl: './formularios-view.component.html',
  styleUrls: ['./formularios-view.component.css']
})
export class FormulariosViewComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<FormulariosViewComponent>) { }
  pag: number | any;
  ngOnInit(): void {
    this.pag = 0;
  }
  accion(nombre: string)
  {
    if(nombre == 'siguiente')
    {
      this.pag++;
    }
    if(nombre == 'anterior')
    {
      this.pag--;
    }
    if(nombre == 'confirmar')
    {
      this.dialogRef.close(
        {
          confirmacion: true
        }
      )
    }
    if(nombre == 'cerrar')
    {
      this.dialogRef.close();
    }
  }

}
