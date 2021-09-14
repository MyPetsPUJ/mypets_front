import { DatePipe } from '@angular/common';
import { HOST_ATTR } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { stringify } from 'querystring';
import { VentanaReporteComponent } from './ventana-reporte/ventana-reporte.component';


@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent implements OnInit {
  range = new FormGroup({
    inicio: new FormControl(),
    final: new FormControl()
  });
  minDate: Date | any;
  maxDate: Date | any;
  constructor(public dialog: MatDialog) { 
    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 1, 0, 1);
    this.maxDate = new Date();
  }

  ngOnInit(): void {
  }
  verFecha()
  {
    console.log(this.range.value);
  }
  abrirVentana()
  {
    this.dialog.open(VentanaReporteComponent, 
      {
        width: '250px',
        data: {fechaInicio: this.range.get('inicio')?.value, fechaFinal: this.range.get('final')?.value}
      });
  }
}
