import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
export interface Solicitud 
{
  id: number;
  nombreAnimal: string;
  nombreSolicitante: string;
  localidad: string;
  numTel: string;
  fecha: string;
}
@Component({
  selector: 'app-solicitudes',
  templateUrl: './solicitudes.component.html',
  styleUrls: ['./solicitudes.component.css']
})
export class SolicitudesComponent implements OnInit {
  displayedColumns: String[] = [
    'idSolicitud',
    'animalSolicitud',
    'nombreSolicitante',
    'localidadSolicitante',
    'numeroSolicitante',
    'fechaSolicitud'
  ];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  solicitudes: Solicitud[] = [
    {id: 6545423, nombreAnimal: "Paca", nombreSolicitante: "Felipe Vanegas",localidad: "8. Kennedy", numTel: "3205586237", fecha:'5/02/2021'},
    {id: 8789565, nombreAnimal: "Milú", nombreSolicitante: "Carlos Barreto",localidad: "9. Fontibon", numTel: "3205586757", fecha:'6/05/2021'},
  ]
  constructor() { }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.solicitudes);

  }

}
