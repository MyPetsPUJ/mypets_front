import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { EntidadPublicacion } from '../../interfaces/entidadPublicacion';
import { MatTableDataSource } from '@angular/material/table';
import { PublicacionService } from 'src/app/services/publicacion.service';
import { CrearPublicacionComponent } from './crear-publicacion/crear-publicacion.component';
import { CrearPublicacionService } from 'src/app/services/crear-publicacion.service';
import { MatDialog } from '@angular/material/dialog';
import { PublicacionPreviewComponent } from './publicacion-preview/publicacion-preview/publicacion-preview.component';

@Component({
  selector: 'app-publicaciones',
  templateUrl: './publicaciones.component.html',
  styleUrls: ['./publicaciones.component.css'],
})
export class PublicacionesComponent implements OnInit {
  publicaciones: EntidadPublicacion[] = [];
  displayedColumns: String[] = [
    'imagenPublicacion',
    'tituloPublicacion',
    'seccionPublicacion',
    'fechaPublicacion',
    
  ];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  constructor(private publicacionService: CrearPublicacionService,private snackbar: MatSnackBar, 
    public dialog: MatDialog) {}

  ngOnInit(): void {
    /*this.publicacionService.getPublicaciones()
    .subscribe(
      res => console.log(res),
      err => console.log(err)
    )*/
    this.cargarPublicaciones();
  }
  openDialog(publicacion: EntidadPublicacion)
  {
    const dialogRef = this.dialog.open(PublicacionPreviewComponent, {
      width: '600px',
      height: '500px',
      data: { publicacion: publicacion }
    });
  }
  cargarPublicaciones() {
  this.publicaciones = this.publicacionService.getPublicaciones();
  this.dataSource = new MatTableDataSource(this.publicaciones);
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
