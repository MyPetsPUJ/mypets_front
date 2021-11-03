import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SSL_OP_ALL } from 'constants';
import { EnviarSolicitudAdopcionService } from 'src/app/services/adopcion/enviar-solicitud-adopcion.service';
import { CrearAdoptanteService } from 'src/app/services/adoptante/crearAdoptante.service';
import { AnimalService } from 'src/app/services/animal/animal.service';
import { CrearAnimalService } from 'src/app/services/animal/crearAnimal.service';
import { LoginService } from 'src/app/services/auth/login.service';
import { FormularioAdopcion } from '../../interfaces/formularios/formularioAdopcion';
import { EntidadSolicitudAdopcion } from '../../interfaces/solicitud-adopcion/entidadSolicitudAdopcion';
import { EntidadAnimal } from '../../interfaces/usuarios/entidadAnimal';
import { UserAdoptante } from '../../interfaces/usuarios/userAdoptante';
import { UserFundacion } from '../../interfaces/usuarios/userFundacion';
import { FundacionesComponent } from '../fundaciones/fundaciones.component';
import { FormulariosViewComponent } from './formularios-view/formularios-view.component';
export interface Solicitud {
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
    'numeroSolicitante'
  ];
  displayedColumns1: String[] =
    [
      'foto',
      'interesado',
      'localidad',
      'celular',
      'accion'
    ]
  dataSource!: MatTableDataSource<any>;
  dataSource1!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatPaginator) paginator1!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  solicitudes: Solicitud[] = [
    { id: 6545423, nombreAnimal: "Paca", nombreSolicitante: "Felipe Vanegas", localidad: "8. Kennedy", numTel: "3205586237", fecha: '5/02/2021' },
    { id: 8789565, nombreAnimal: "Milú", nombreSolicitante: "Carlos Barreto", localidad: "9. Fontibon", numTel: "3205586757", fecha: '6/05/2021' },
  ]

  formAdopcion: FormularioAdopcion | undefined;
  formulariosAdopcion: FormularioAdopcion[] = [];
  solicitudesAdopcion: EntidadSolicitudAdopcion[] = [];
  idSolicitud: number = Math.floor(Math.random() * (1000000 - 1) + 0);
  estados: FormGroup | any;
  fundacionId: string = '';
  solicitudesAdopcion2: EntidadSolicitudAdopcion[] = [];
  adoptantesAnimales: UserAdoptante[] = [];
  animales: EntidadAnimal[] = [];
  fundacion: UserFundacion | undefined;
  datosTabla: any[] = [];
  solis: any[] = [];

  constructor(private authService: LoginService, private adoptanteService: CrearAdoptanteService, private animalService: AnimalService,
    private dialog: MatDialog, fb: FormBuilder, private solicitudService: EnviarSolicitudAdopcionService) {
    this.estados = fb.group
      ({
        solicitudesAdop: false,
        formulariosAdop: true,
      });
    console.log(this.estados.controls.formulariosAdop.value);
  }
  openDialog(solicitud: FormularioAdopcion) {
    console.log(solicitud);
    const dialogRef = this.dialog.open(FormulariosViewComponent, {
      width: '830px',
      height: '600px',
      data: { formulario: solicitud, accion: 'formulario' },
    });
  }
  ngOnInit(): void {

    //this.formulariosAdopcion.push(this.formAdopcion);


    this.cargarSolicitudes();
    this.cargarDatosSolicitudes();

  }
  cargarDatosSolicitudes() {
    this.fundacionId = this.authService.getUserId();
    this.solicitudService.populateSolicitudesFundaciones(this.fundacionId).subscribe((res) => {
      console.log(res);
      console.log("Fundacion:", res.fundacion);
      console.log("solicitudes:", res.solicitudes);
      console.log("adoptantes:", res.adoptantes);
      console.log("animales:", res.animales);

      this.fundacion = res.fundacion;
      this.solicitudesAdopcion2 = res.solicitudes;
      this.adoptantesAnimales = res.adoptantes;
      this.animales = res.animales;
      this.solis = res.solicitudes;
      console.log('AKJKLSAJKASLDJ ', this.solis);
      var filaTabla;
      var encontrado = false;
      this.animalService.getAnimales().subscribe((resAnimales) => {
        for (var i = 0; i < this.solis.length; i++) {
          for (var j = 0; j < this.adoptantesAnimales.length; j++) {
            for (var k = 0; k < resAnimales.length; k++) {
              if (this.solis[i].idAnimal._id == resAnimales[k]._id &&
                this.adoptantesAnimales[j]._id == this.solis[i].idAdoptante) {
                if (!encontrado) {
                  filaTabla =
                  {
                    animal: resAnimales[k],
                    adoptante: this.adoptantesAnimales[j],
                    solicitud: this.solis[i]
                  }
                  this.datosTabla.push(filaTabla);
                  encontrado = true
                }
              }
            }
          }
          encontrado = false;
        }
        //console.log('Estos son los datos a mostrar ', this.datosTabla);
        this.dataSource1 = new MatTableDataSource(this.datosTabla);
      });

    });

    this.animalService.getAnimales().subscribe({
      next: (res) => {
        //console.log(res);
        this.animales = res;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  cargarSolicitudes() {
    this.solicitudesAdopcion = [];
    for (var i = 0; i < this.solicitudService.getSolicitudesQuemadas().length; i++) {
      if (this.solicitudService.getSolicitudesQuemadas()[i].estado == 'En espera') {
        this.solicitudesAdopcion.push(this.solicitudService.getSolicitudesQuemadas()[i]);
      }
      if (this.solicitudService.getSolicitudesQuemadas()[i].estado == 'Aceptado, formulario en espera de respuesta.') {
        this.formulariosAdopcion.push(this.solicitudService.getSolicitudesQuemadas()[i].formulario);
      }
    }
    this.dataSource = new MatTableDataSource(this.formulariosAdopcion);
    setTimeout(() => this.dataSource.paginator = this.paginator);
    this.dataSource1 = new MatTableDataSource(this.solicitudesAdopcion);
    setTimeout(() => this.dataSource1.paginator = this.paginator1);
  }
  accion(nombre: string, index: number) {
    if (nombre == 'Aceptado' || nombre == 'Rechazado') {
      if(nombre == 'Aceptado')
        this.solicitudService.actualizarEstadoSolicitud(this.datosTabla[index].solicitud._id,'Aceptado, formulario no enviado.');
      if(nombre == 'Rechazado')
        this.solicitudService.actualizarEstadoSolicitud(this.datosTabla[index].solicitud._id,'Rechazado, sin posibilidad de enviar formulario.');
      for (var i = 0; i < this.solicitudService.getSolicitudesQuemadas().length; i++) {
        if (this.solicitudesAdopcion[index] == this.solicitudService.getSolicitudesQuemadas()[i]) {
          this.solicitudService.getSolicitudesQuemadas()[i].estado = nombre;
          if (nombre == 'Aceptado') {
            this.solicitudService.getSolicitudesQuemadas()[i].estado = nombre + ', formulario no enviado.';
          }
          if (nombre == 'Rechazado') {
            this.solicitudService.getSolicitudesQuemadas()[i].estado = nombre + ', sin posibilidad de enviar formulario.';
          }
        }
      }
      this.cargarDatosSolicitudes();
    }
    if (nombre == 'adoptante') {
      const dialogRef = this.dialog.open(FormulariosViewComponent, {
        width: '830px',
        height: '600px',
        data: { adoptante: this.datosTabla[index].adoptante, accion:'adoptante' },
      });
    }
  }
}
