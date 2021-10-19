import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AnyKeys } from 'mongoose';
import { CrearAdoptanteService } from 'src/app/services/adoptante/crearAdoptante.service';
import { CrearAnimalService } from 'src/app/services/animal/crearAnimal.service';
import { EntidadAnimal } from '../../interfaces/usuarios/entidadAnimal';
import { UserAdoptante } from '../../interfaces/usuarios/userAdoptante';
import { PreviewComponent } from './preview/preview.component';
export interface UserData {
  dueno: UserAdoptante;
  animal: EntidadAnimal;
  fecha: Date
}

/**
 * @title Data table with sorting, pagination, and filtering.
 */

@Component({
  selector: 'app-animales-adoptados',
  templateUrl: './animales-adoptados.component.html',
  styleUrls: ['./animales-adoptados.component.css']
})
export class AnimalesAdoptadosComponent implements OnInit {
  displayedColumns: string[] = ['foto_animal', 'nombre_animal', 'nombre_dueño', 'cedula', 'fecha', 'accion'];
  dataSource: MatTableDataSource<UserData> | any;
  adoptantes: UserAdoptante[] = [];
  animales: EntidadAnimal[] = [];
  @ViewChild(MatPaginator) paginator: MatPaginator | any;
  @ViewChild(MatSort) sort: MatSort | any;
  listaInfo: UserData[] = [];
  infoMostrar: UserData | any;
  constructor(private adoptanteService: CrearAdoptanteService, private animalService: CrearAnimalService,
    private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.adoptantes = this.adoptanteService.getAdoptantes();
    this.animales = this.animalService.getAnimales();
    var i = 0;
    var j = 0;
    for (i = 0; i < this.adoptantes.length; i++) {
      if (this.adoptantes[i].animales.length >= 1) {
        for (j = 0; j < this.adoptantes[i].animales.length; j++) {
          var ano = Math.random() * (2021 - 2020) + 2020;
          var mes = Math.random() * (2021 - 2020) + 2020;
          this.infoMostrar =
          {
            dueno:this.adoptantes[i],
            animal: this.adoptantes[i].animales[j],
            fecha: new Date(Math.random() * (2021 - 2019) + 2019)
          }
          //console.log(this.adoptantes[i].animales[j]);
          this.listaInfo.push(this.infoMostrar);
        }
      }
    }
    this.dataSource = new MatTableDataSource(this.listaInfo);
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  accion(nombre: string , adoptante: UserAdoptante, animal: EntidadAnimal)
  {
    if(nombre == 'adoptante')
    {
      const dialogRef = this.dialog.open(PreviewComponent, {
        width: '830px',
        height: '600px',
        data: { adoptante: adoptante, accion:'adoptante' },
      });
    }
    if(nombre == 'mascota')
    {
      const dialogRef = this.dialog.open(PreviewComponent, {
        width: '830px',
        height: '600px',
        data: { animal: animal, accion:'mascota' },
      });
    }
  }
}
