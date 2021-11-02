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
import { NgForm } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-publicaciones',
  templateUrl: './publicaciones.component.html',
  styleUrls: ['./publicaciones.component.css'],
})
export class PublicacionesComponent implements OnInit {
  publicaciones: EntidadPublicacion[] = [];
  publicaciones2: EntidadPublicacion[] = [];

  publi: EntidadPublicacion | undefined;
  userFundacion: UserFundacion = {
    nombreFund: '',
    nombreEncar: '',
    apellidosEncar: '',
    tipo_doc: '',
    num_doc: 0,
    fecha_creacion: '',
    latitud: 0,
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
    puntos: [],
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
  seccion: any[] = [
    'Adquisición',
    'Adultos',
    'Alimentación',
    'Cambios en mi mascota',
    'Cachorros',
    'Cuidados y bienestar',
    'Entrenamiento',
    'Nutrición',
    'Salud',
    'Cualquiera'
  ];
  borrarAnimal:string[]=[];

  // dataSource!: MatTableDataSource<any>;
  // @ViewChild(MatPaginator) paginator!: MatPaginator;
  // @ViewChild(MatSort) sort!: MatSort;

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
  // openDialog(publicacion: EntidadPublicacion) {
  //   this._router.navigate(['/dashboard/publicaciones/editar-publicacion']);
  //   const dialogRef = this.dialog.open(PublicacionPreviewComponent, {
  //     width: '600px',
  //     height: '500px',
  //     data: { publicacion: publicacion },
  //   });
  // }
  cargarPublicaciones() {
    this.publicacionService.getPublicaciones(this.userId).subscribe((res) => {
      this.userFundacion = res.resultado;
      console.log('ahora siiuuu', this.userFundacion);
      this.publicaciones = res.publis;
      this.publicaciones2 = Array.from(this.publicaciones);
      console.log('ahora si', this.publicaciones);
      // this.dataSource = new MatTableDataSource(this.publicaciones);
      // setTimeout(() => (this.dataSource.paginator = this.paginator));
    });
  }
  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
  }

  // applyFilter(event: Event) {
  //   const filterValue = (event.target as HTMLInputElement).value;
  //   this.dataSource.filter = filterValue.trim().toLowerCase();
  // }

  onPublicacionSelected(id: string) {
  this._router.navigate(['/dashboard/publicaciones/editar-publicacion', id])   
  }
  filtrarPublicaciones($event){
    console.log($event=="Alimentación");
    this.publicaciones=Array.from(this.publicaciones2);
    let tamanoArreglo=this.publicaciones.length;
    this.borrarAnimal=[];
    if($event!="Cualquiera")
    {
    
      for(var i=0;i<this.publicaciones.length;i++)
      {
        if(this.publicaciones[i].seccion != $event)
        {
          this.borrarAnimal[i]="borrar";
        }
      }
      
      while (tamanoArreglo--) {
        if (this.borrarAnimal[tamanoArreglo] === "borrar") {
          this.publicaciones.splice(tamanoArreglo, 1);
        }
    }
  }
    console.log(this.publicaciones)

  }
}
