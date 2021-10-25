import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CrearAdoptanteService } from 'src/app/services/adoptante/crearAdoptante.service';
import { CrearAnimalService } from 'src/app/services/animal/crearAnimal.service';
import { FormularioAdopcion } from '../../interfaces/formularios/formularioAdopcion';
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
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  solicitudes: Solicitud[] = [
    {id: 6545423, nombreAnimal: "Paca", nombreSolicitante: "Felipe Vanegas",localidad: "8. Kennedy", numTel: "3205586237", fecha:'5/02/2021'},
    {id: 8789565, nombreAnimal: "Milú", nombreSolicitante: "Carlos Barreto",localidad: "9. Fontibon", numTel: "3205586757", fecha:'6/05/2021'},
  ]
  solicitudAdopcion: FormularioAdopcion |  undefined;
  solicitudesAdopcion: FormularioAdopcion[] = [];
  idSolicitud: number = Math.floor(Math.random() * (1000000 - 1) + 0);
  constructor(private adoptanteService: CrearAdoptanteService, private animalService: CrearAnimalService,
      private dialog: MatDialog) { 
  
  }
  openDialog(solicitud: FormularioAdopcion) {
    console.log(solicitud);
    const dialogRef = this.dialog.open(FormulariosViewComponent, {
      width: '830px',
      height: '600px',
      data: { formulario: solicitud },
    });
  }
  ngOnInit(): void {
    this.solicitudAdopcion = 
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


    this.solicitudesAdopcion.push(this.solicitudAdopcion);

    this.dataSource = new MatTableDataSource(this.solicitudesAdopcion);
    setTimeout(() => this.dataSource.paginator = this.paginator);
  }

}
