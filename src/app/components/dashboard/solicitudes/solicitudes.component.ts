import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CrearAdoptanteService } from 'src/app/services/adoptante/crearAdoptante.service';
import { CrearAnimalService } from 'src/app/services/animal/crearAnimal.service';
import { FormularioAdopcion } from '../../interfaces/formularios/formularioAdopcion';
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
  solicitudAdopcion: FormularioAdopcion |  any;
  solicitudesAdopcion: FormularioAdopcion[] = [];
  idSolicitud: number = Math.floor(Math.random() * (1000000 - 1) + 0);
  constructor(private adoptanteService: CrearAdoptanteService, private animalService: CrearAnimalService) { 
  
  }

  ngOnInit(): void {
    this.solicitudAdopcion = 
    {
      adoptante: this.adoptanteService.getAdoptantes()[0],
      animalAdopcion: this.animalService.getAnimales()[0],
      informacionFamiliar: {
        numPersonasCasa: 6,
        numAdultos: 4,
        numNiños: 2,
        edadesAdultos: 87,
        edadesNiños: 16,
        numMascotas: 3,
        razasMascotas: 'Schnauzer, carey y 2 hamsters',
        temperamentoMascotas: 'Amigable',
        tiempoConMascotas: 11,
        nombreFamiliarContacto: 'Angela Patiño',
        numeroFamiliarContacto: 3057471184,
        familiaresDeAcuerdo: true,
        familiaresAlergias: false,
        familiaresPlaneaEmbarazo: false
      },
      informacionRelacionada: 
      {
        tiempoEnCasaHoras: 12,
        horaRegresoCasa: 'Hasta las 6 P.M',
        lugarDeVivienda: 'Casa',
        
      }
    }


    this.solicitudesAdopcion.push(this.solicitudAdopcion);

    this.dataSource = new MatTableDataSource(this.solicitudesAdopcion);
  }

}
