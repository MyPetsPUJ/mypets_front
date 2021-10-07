import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AnyKeys } from 'mongoose';
import { CrearAdoptanteService } from 'src/app/services/crearAdoptante.service';
import { CrearAnimalService } from 'src/app/services/crearAnimal.service';
import { EntidadAnimal } from '../../interfaces/entidadAnimal';
import { UserAdoptante } from '../../interfaces/userAdoptante';
export interface UserData {
  nombre: string;
  cedula: string;
  correo_contacto: string;
  num_telefono: string;
  foto_animal: string;
  animal: string;
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
  displayedColumns: string[] = ['foto_animal','nombre_animal', 'nombre_dueño', 'cedula', 'correo','telefono'];
  dataSource: MatTableDataSource<UserData> | any;
  adoptantes: UserAdoptante[] = [];
  animales : EntidadAnimal[] = [];
  @ViewChild(MatPaginator) paginator: MatPaginator | any;
  @ViewChild(MatSort) sort: MatSort | any;
  listaInfo: UserData[] = [];
  infoMostrar: UserData | any;
  constructor(private adoptanteService: CrearAdoptanteService, private animalService: CrearAnimalService) { 
  }

  ngOnInit(): void {
    this.adoptantes = this.adoptanteService.getAdoptantes();
    this.animales = this.animalService.getAnimales();
    var i = 0;
    var j = 0;
    for(i = 0; i < this.animales.length; i++)
    {
      if(this.animales[i].idPapa != '')
      {
        for(j = 0; j < this.adoptantes.length; j++)
        {
          if(this.animales[i].idPapa == this.adoptantes[j].num_doc)
          {
            this.infoMostrar = {nombre: this.adoptantes[j].nombre + ' ' + this.adoptantes[j].apellidos,
            cedula: this.adoptantes[j].num_doc,
            correo_contacto:this.adoptantes[j].correo,
            num_telefono: this.adoptantes[j].num_celular,
            animal: this.animales[i].nombre,
            foto_animal: this.animales[i].urlImg}
            this.listaInfo.push(this.infoMostrar);
          }
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
}
