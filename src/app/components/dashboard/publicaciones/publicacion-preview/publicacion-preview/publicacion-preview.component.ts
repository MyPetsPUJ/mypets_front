import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-publicacion-preview',
  templateUrl: './publicacion-preview.component.html',
  styleUrls: ['./publicacion-preview.component.css']
})
export class PublicacionPreviewComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, 
  public dialogRef: MatDialogRef<PublicacionPreviewComponent>) { 
  }

  ngOnInit(): void {
  }
  accion(nombre: string)
  {
    if(nombre == 'cancelar')
    {
      this.dialogRef.close();
    }
  }

}
