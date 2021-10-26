import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { EnviarSolicitudAdopcionService } from 'src/app/services/adopcion/enviar-solicitud-adopcion.service';
import { CrearAdoptanteService } from 'src/app/services/adoptante/crearAdoptante.service';
import { CrearAnimalService } from 'src/app/services/animal/crearAnimal.service';
import { FormularioAdopcion } from '../../interfaces/formularios/formularioAdopcion';
import { EntidadSolicitudAdopcion } from '../../interfaces/solicitud-adopcion/entidadSolicitudAdopcion';
import { UserAdoptante } from '../../interfaces/usuarios/userAdoptante';
import { FormulariosViewComponent } from './formularios-view/formularios-view.component';
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
    {id: 6545423, nombreAnimal: "Paca", nombreSolicitante: "Felipe Vanegas",localidad: "8. Kennedy", numTel: "3205586237", fecha:'5/02/2021'},
    {id: 8789565, nombreAnimal: "Milú", nombreSolicitante: "Carlos Barreto",localidad: "9. Fontibon", numTel: "3205586757", fecha:'6/05/2021'},
  ]
  formAdopcion: FormularioAdopcion |  undefined;
  formulariosAdopcion: FormularioAdopcion[] = [];
  solicitudesAdopcion: EntidadSolicitudAdopcion[] = [];
  idSolicitud: number = Math.floor(Math.random() * (1000000 - 1) + 0);
  estados: FormGroup | any;

  constructor(private adoptanteService: CrearAdoptanteService, private animalService: CrearAnimalService,
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
      data: { formulario: solicitud, accion:'formulario' },
    });
  }
  ngOnInit(): void {
    this.formAdopcion = 
    {
      adoptante: this.adoptanteService.getAdoptantes()[0],
      animalAdopcion: this.animalService.getAnimales()[0],
      informacionFamiliar: {
        numAdultos: '4',
        numNinos: '2',
        edadesAdultos: '87',
        edadesNinos: '16',
        numMascotas: '3',
        razasMascotas: 'Schnauzer, carey y 2 hamsters',
        temperamentoMascotas: 'Amigable',
        tiempoConMascotas: '11',
        nombreFamiliarContacto: 'Angela Patiño',
        numeroFamiliarContacto: '3057471184',
        familiaresDeAcuerdo: 'SI',
        familiaresAlergias: 'NO',
        familiaresPlaneaEmbarazo: 'NO'
      },
      informacionRelacionada: 
      {
        tiempoEnCasaHoras: '12',
        horaRegresoCasa: 'Hasta las 6 P.M',
        lugarViviendaDeMascota: 'Casa',
        patioInteriorJugar: 'Zonas verdes cercanas, Parques en las zonas de domicilio',
        veterinarioGastos: 'Menos de 50 mil pesos',
        mascotaAnterior: 'SI',
        conoceCuidadosMascota: 'SI',
        veterinarioDeConfianza: 'SI',
        conscienteResponsabilidad15anos: 'SI',
        actividadesConMascota: 'Llevarla con usted de viaje, Llevarla a parques',
        alternativaPaseador: 'SI',
        espacioViviendaMascota: 'Dentro de la casa, Dormirá conmigo',
        razonesAdopcion:'Me gustán las mascotas y considero que le puedo dar una buena vida a mi peludito',
        disposicionMudarseConElAnimal: 'SI',
        disposicionPasearAlAnimalPerro: 'NO',
        disposicionAdaptacionAnimal: 'El tiempo que sea necesario',
        asumirGastosAnimal: 'yo',
        adoptanteAlternativoAusencia: 'Mis hermanas',
        permisionTenenciaAnimales: 'SI'
      },
      referenciaFamiliar: 
      {
        nombres:'Angela Yesenia',
        apellidos: 'Patiño Gantiva',
        numFijo: 'No aplica',
        numCelular: '3057471184',
        parentezco: 'Padre o madre',
        tiempoDeConocimiento: ''
      },
      referenciaPersonal: 
      {
        nombres:'Juan Sebastian',
        apellidos: 'Martinez Alvarado',
        numFijo: 'No aplica',
        numCelular: '3205586321',
        parentezco: '',
        tiempoDeConocimiento: 'Entre 2 y 5 años'
      }
    
    }
    this.formulariosAdopcion.push(this.formAdopcion);

    this.dataSource = new MatTableDataSource(this.formulariosAdopcion);
    setTimeout(() => this.dataSource.paginator = this.paginator);
    this.cargarSolicitudes();
    
  }
  cargarSolicitudes()
  {
    this.solicitudesAdopcion = [];
    for(var i = 0; i < this.solicitudService.getSolicitudesQuemadas().length; i++)
    {
      if(this.solicitudService.getSolicitudesQuemadas()[i].estado == 'En espera')
      {
        this.solicitudesAdopcion.push(this.solicitudService.getSolicitudesQuemadas()[i]);
      }
    }
    this.dataSource1 = new MatTableDataSource (this.solicitudesAdopcion);
    setTimeout(() => this.dataSource1.paginator = this.paginator1);
  }
  accion(nombre: string, index: number)
  {
    if(nombre == 'Aceptado' || nombre == 'Rechazado')
    {
      for(var i = 0; i < this.solicitudService.getSolicitudesQuemadas().length; i++)
      {
        if(this.solicitudesAdopcion[index] == this.solicitudService.getSolicitudesQuemadas()[i])
        {
          this.solicitudService.getSolicitudesQuemadas()[i].estado = nombre;
          if(nombre == 'Aceptado')
          {
            this.solicitudService.getSolicitudesQuemadas()[i].estado = nombre + ', formulario no enviado.';
          }
          if (nombre == 'Rechazado')
          {
            this.solicitudService.getSolicitudesQuemadas()[i].estado = nombre + ', sin posibilidad de enviar formulario.';
          }
        }
      }
      this.cargarSolicitudes();
    }
    if(nombre == 'adoptante')
    {
      const dialogRef = this.dialog.open(FormulariosViewComponent, {
        width: '830px',
        height: '600px',
        data: { adoptante: this.solicitudesAdopcion[index].adoptante, accion:'adoptante' },
      });
    }
  }
}
