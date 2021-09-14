import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-ventana-reporte',
  templateUrl: './ventana-reporte.component.html',
  styleUrls: ['./ventana-reporte.component.css']
})
export class VentanaReporteComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

}
