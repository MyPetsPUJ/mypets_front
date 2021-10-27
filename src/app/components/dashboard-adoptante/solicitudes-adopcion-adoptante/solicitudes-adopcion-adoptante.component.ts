import { Component, OnInit,ViewChild } from '@angular/core';
import { EntidadEstadoSolicitudAdopcion } from '../../interfaces/solicitud-adopcion/entidadEstadoSolicitudAdopcion';
import { EstadoSolicitudAdopcionService } from 'src/app/services/adopcion/estado-solicitud-adopcion.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator } from '@angular/material/paginator';
import { EnviarSolicitudAdopcionService } from 'src/app/services/adopcion/enviar-solicitud-adopcion.service';
import { EntidadSolicitudAdopcion } from '../../interfaces/solicitud-adopcion/entidadSolicitudAdopcion';
import { CrearAdoptanteService } from 'src/app/services/adoptante/crearAdoptante.service';
import { FormularioAdopcionComponent } from './formulario-adopcion/formulario-adopcion.component';
import { EnviarFormularioAdopcionService } from 'src/app/services/formulario/enviar-formulario-adopcion.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-solicitudes-adopcion-adoptante',
  templateUrl: './solicitudes-adopcion-adoptante.component.html',
  styleUrls: ['./solicitudes-adopcion-adoptante.component.css']
})

export class SolicitudesAdopcionAdoptanteComponent implements OnInit {
  solicitudes: EntidadSolicitudAdopcion[] = [];
  solicitud: EntidadSolicitudAdopcion | undefined;
  displayedColumns: String[] = ['foto','estado', 'fecha', 'formulario'];
  dataSource!: MatTableDataSource<any>;
  formulario: boolean  = false;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
   servicio: EnviarFormularioAdopcionService | any;
  constructor(private solicitudesService: EnviarSolicitudAdopcionService, private snackbar: MatSnackBar,
    private adoptantesService: CrearAdoptanteService, private router: Router) { }
  
  ngOnInit(): void {
    this.cargarSolicitudes();
  }
  cargarSolicitudes()
  {
    //Encontrar el adoptante, codigo para encontrarlo
    var index = 1; // Eso se debe quitar, es solo por ser datos quemados
    //index = this.adoptantesService.getIndex(adoptante)  //Esto se debe dejar cuando se tenga el id del adoptante logueado
    //se obtienen las solicitudes realizadas por el usuario en específico
    for(var i = 0; i < this.solicitudesService.getSolicitudesQuemadas().length; i++)
    {
      if(this.solicitudesService.getSolicitudesQuemadas()[i].adoptante == this.adoptantesService.getAdoptantes()[index])
      {
        //solo imprimirá las solicitudes de un adoptante en específico (el que se encuentra logueado)
        this.solicitud = this.solicitudesService.getSolicitudesQuemadas()[i];
        this.solicitudes.push(this.solicitud);
      }
    }
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
  accion(nombre: string,solicitud: EntidadSolicitudAdopcion)
  {
    if(nombre == 'eliminar')
    {

    }
    if(nombre == 'formulario')
    {
      this.solicitud = solicitud;
      this.formulario = true;
    }
  }
  salir(data)
  {
    this.formulario = data;
  }
}
