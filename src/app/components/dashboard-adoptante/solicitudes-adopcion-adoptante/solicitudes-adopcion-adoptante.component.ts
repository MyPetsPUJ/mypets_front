import { Component, OnInit,ViewChild } from '@angular/core';
import { EntidadEstadoSolicitudAdopcion } from '../../interfaces/entidadEstadoSolicitudAdopcion';
import { EstadoSolicitudAdopcionService } from 'src/app/services/estado-solicitud-adopcion.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator } from '@angular/material/paginator';


@Component({
  selector: 'app-solicitudes-adopcion-adoptante',
  templateUrl: './solicitudes-adopcion-adoptante.component.html',
  styleUrls: ['./solicitudes-adopcion-adoptante.component.css']
})

export class SolicitudesAdopcionAdoptanteComponent implements OnInit {
  solicitudes: EntidadEstadoSolicitudAdopcion[] = [];
  displayedColumns: String[] = ['estado', 'fundacion', 'fecha', 'formulario'];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private solicitudesService: EstadoSolicitudAdopcionService, private snackbar: MatSnackBar) { }
  
  ngOnInit(): void {
    this.cargarSolicitudes();
  }
  cargarSolicitudes()
  {
    this.solicitudes = this.solicitudesService.getSolicitudes();
    this.dataSource = new MatTableDataSource(this.solicitudes);
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
