import { Component, OnInit, ViewChild } from '@angular/core';
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
import { LoginService } from 'src/app/services/auth/login.service';
import { AnimalService } from 'src/app/services/animal/animal.service';

@Component({
  selector: 'app-solicitudes-adopcion-adoptante',
  templateUrl: './solicitudes-adopcion-adoptante.component.html',
  styleUrls: ['./solicitudes-adopcion-adoptante.component.css'],
})
export class SolicitudesAdopcionAdoptanteComponent implements OnInit {
  solicitudes: EntidadSolicitudAdopcion[] = [];
  solicitud: EntidadSolicitudAdopcion | undefined;
  displayedColumns: String[] = ['foto', 'estado', 'fecha', 'formulario'];
  dataSource!: MatTableDataSource<any>;
  formulario: boolean = false;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  datosTabla: any[] = [];
  servicio: EnviarFormularioAdopcionService | any;
  constructor(
    private solicitudesService: EnviarSolicitudAdopcionService,
    private snackbar: MatSnackBar,
    private adoptantesService: CrearAdoptanteService,
    private router: Router,
    private authService: LoginService,
    private animalService: AnimalService
  ) {}

  ngOnInit(): void {
    this.cargarSolicitudes();
  }
  cargarSolicitudes() {
    var userId = this.authService.getUserId();
    var filaDatos;
    var encontrado = false;
    //console.log('Estas son las solicitudes: ',this.solicitudes);
    this.solicitudesService.getSolicitudesAdoptante(userId).subscribe((res) => {
      this.solicitudes = res;
      this.datosTabla = [];
      this.animalService.getAnimales().subscribe((resAnimal) => {
        for (var i = 0; i < this.solicitudes.length; i++) {
          for (var j = 0; j < resAnimal.length && !encontrado; j++) {
            if (this.solicitudes[i].idAnimal == resAnimal[j]._id) {
              encontrado = true;
              filaDatos = {
                solicitud: this.solicitudes[i],
                animal: resAnimal[j],
              };
              this.datosTabla.push(filaDatos);
            }
          }
          encontrado = false;
        }
        console.log(this.datosTabla);
        this.dataSource = new MatTableDataSource(this.datosTabla);
        this.dataSource.paginator = this.paginator;
      });
    });
    //console.log( this.solicitudesService.getSolicitudesAdoptante(userId));
    //Encontrar el adoptante, codigo para encontrarlo
    var index = 1; // Eso se debe quitar, es solo por ser datos quemados
    //index = this.adoptantesService.getIndex(adoptante)  //Esto se debe dejar cuando se tenga el id del adoptante logueado
    //se obtienen las solicitudes realizadas por el usuario en específico
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  accion(nombre: string, solicitud: any) {
    if (nombre == 'eliminar') {
      for (var i = 0; i < 2; i++) {
        this.solicitudesService.deleteSolicitud(solicitud._id);
        this.cargarSolicitudes();
      }
    }
    if (nombre == 'formulario') {
      this.solicitud = solicitud;
      this.formulario = true;
    }
  }
  salir(data) {
    this.formulario = data;
    console.log('Se salió');
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload'
    this.router.navigate(['dashboard-adoptante/solicitudes-adopcion-adoptante']);
  }
}
