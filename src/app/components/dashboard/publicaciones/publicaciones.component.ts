import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { EntidadPublicacion } from '../../interfaces/entidadPublicacion';
import { UserFundacion } from '../../interfaces/usuarios/userFundacion';
import { MatTableDataSource } from '@angular/material/table';
import { PublicacionService } from 'src/app/services/publicacion/publicacion.service';
import { CrearPublicacionComponent } from './crear-publicacion/crear-publicacion.component';
import { CrearPublicacionService } from 'src/app/services/publicacion/crear-publicacion.service';
import { MatDialog } from '@angular/material/dialog';
import { PublicacionPreviewComponent } from './publicacion-preview/publicacion-preview/publicacion-preview.component';
import { LoginService } from 'src/app/services/auth/login.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-publicaciones',
  templateUrl: './publicaciones.component.html',
  styleUrls: ['./publicaciones.component.css'],
})
export class PublicacionesComponent implements OnInit {
  publicaciones: EntidadPublicacion[] = [];
  publi: EntidadPublicacion | undefined;
  userFundacion: UserFundacion = {
    nombreFund: '',
    nombreEncar: '',
    apellidosEncar: '',
    tipo_doc: '',
    num_doc: '',
    fecha_creacion: '',
    latitud:0,
    longitud: 0,
    distancia: '',
    duracion: '',
    correo: '',
    num_celular: '',
    password: '',
    urlImg: '',
    tipo_usuario: '',
    direccion: '',
    mision: '',
    vision: '',
    publicaciones: [],
    ubicacion: null,
    _id: '',
  };
  userId: string = '';
  id: string = '';
  displayedColumns: String[] = [
    'imagenPublicacion',
    'tituloPublicacion',
    'seccionPublicacion',
    'fechaPublicacion',
  ];

  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private publicacionService: PublicacionService,
    private snackbar: MatSnackBar,
    public dialog: MatDialog,
    private authService: LoginService,
    private route: ActivatedRoute,
    private _router: Router
  ) {}

  ngOnInit(): void {
    /*this.publicacionService.getPublicaciones()
    .subscribe(
      res => console.log(res),
      err => console.log(err)
    )*/
    this.userId = this.authService.getUserId();
    console.log('Este es el id', this.userId);
    this.cargarPublicaciones();
    // this.id = this.route.snapshot.paramMap.get('id')!;
    // console.log('Id:', this.id);
    // this.route.paramMap.subscribe((params) => {
    //   if (params.has('id')) {
    //     this.publicacionService
    //       .getPublicaciones(params.get('id')!)
    //       .subscribe((publis) => console.log(publis));
    //   }
    //   else{
    //     return;
    //   }
    // });
  }
  openDialog(publicacion: EntidadPublicacion) {
    const dialogRef = this.dialog.open(PublicacionPreviewComponent, {
      width: '600px',
      height: '500px',
      data: { publicacion: publicacion },
    });
  }
  cargarPublicaciones() {
    this.publicacionService.getPublicaciones(this.userId).subscribe((res) => {
      console.log(res)
      console.log("publis", res.publis)
      console.log("user", res.resultado)
      this.userFundacion = res.resultado
      console.log("ahora siiuuu", this.userFundacion)
      this.publicaciones = res.publis
      console.log("ahora si", this.publicaciones)
      this.dataSource = new MatTableDataSource(this.publicaciones)
    });
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
