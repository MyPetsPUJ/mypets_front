import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-lista-fundaciones',
  templateUrl: './lista-fundaciones.component.html',
  styleUrls: ['./lista-fundaciones.component.css']
})
export class ListaFundacionesComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, 
  public dialogRef: MatDialogRef<ListaFundacionesComponent>) {
   }

  ngOnInit(): void {
  }
}
