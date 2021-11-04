import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AnyKeys } from 'mongoose';
import { Subject } from 'rxjs';
import { take } from 'rxjs/operators';
import { AdoptanteService } from 'src/app/services/adoptante/adoptante.service';
import { CrearAdoptanteService } from 'src/app/services/adoptante/crearAdoptante.service';
import { AnimalService } from 'src/app/services/animal/animal.service';
import { CrearAnimalService } from 'src/app/services/animal/crearAnimal.service';
import { LoginService } from 'src/app/services/auth/login.service';
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
  displayedColumns: string[] = ['foto_animal', 'nombre_animal', 'nombre_dueño', 'cedula', 'accion'];
  dataSource: MatTableDataSource<UserData> | any;
  adoptantes: UserAdoptante[] = [];
  animales: EntidadAnimal[] = [];
  @ViewChild(MatPaginator) paginator: MatPaginator | any;
  @ViewChild(MatSort) sort: MatSort | any;
  

  listaInfo: UserData[] = [];
  infoMostrar: UserData | any;
  datosTabla: any[] = []; 
  constructor(private adoptanteService: AdoptanteService, private animalService: AnimalService,
    private dialog: MatDialog, private authService: LoginService) {
  }

  ngOnInit(): void {
    this.cargarDatos();
   
  }
  cargarDatos()
  {
    var animales;
    var subject = new Subject <any>();
    var datosFila;
    this.animalService.populateAnimales(this.authService.getUserId()).subscribe(async res=>
      {
        animales = res.animales;
        for(var i =0; i < animales.length; i++)
        {
          if(animales[i].adoptado)
          {
            console.log('ID ADOPTANTE', animales[i].ownerAdoptante)
            this.adoptanteService.getAdoptanteById(animales[i].ownerAdoptante).subscribe(adoptante=>
              {
                console.log('Adoptante: ', adoptante)
                subject.next(adoptante);
              })
              var adopt = await subject.asObservable().pipe(take(1)).toPromise();
              console.log(adopt);
              datosFila= 
              {
                animal : animales[i],
                dueno: adopt
              }
              this.datosTabla.push(datosFila);
          }
        }
        this.dataSource = new MatTableDataSource(this.datosTabla);
        this.dataSource.paginator = this.paginator;
      });
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
