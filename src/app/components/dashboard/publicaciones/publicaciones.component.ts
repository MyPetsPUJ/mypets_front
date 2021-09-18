import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { EntidadPublicacion } from '../../interfaces/entidadPublicacion';
import { MatTableDataSource } from '@angular/material/table';
import { PublicacionService } from 'src/app/services/publicacion.service';
import { CrearPublicacionComponent } from './crear-publicacion/crear-publicacion.component';

@Component({
  selector: 'app-publicaciones',
  templateUrl: './publicaciones.component.html',
  styleUrls: ['./publicaciones.component.css'],
})
export class PublicacionesComponent implements OnInit {
  publicaciones: EntidadPublicacion[] = [];
  displayedColumns: String[] = [
    'tituloPublicacion',
    'cuerpoPublicacion',
    'fechaPublicacion',
    'imagenPublicacion',
  ];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private publicacionService: PublicacionService,
    private snackbar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.publicacionService.getPublicaciones()
    .subscribe(
      res => console.log(res),
      err => console.log(err)
    )
  }
  // cargarPublicaciones() {
  //   this.publicaciones = this.publicacionesService.getPublicaciones();
  //   this.dataSource = new MatTableDataSource(this.publicaciones);
  // }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
