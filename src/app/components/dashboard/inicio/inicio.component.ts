import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Loader } from '@googlemaps/js-api-loader';
import { MouseEvent as AGMMouseEvent } from '@agm/core';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { MatDialog } from '@angular/material/dialog';
import { TextoInteresComponent } from './texto-interes/texto-interes.component';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Coordenada } from '../../interfaces/entidadCoordenada';
import { LoginService } from 'src/app/services/auth/login.service';
import { Subscription } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { PuntoInteres } from '../../interfaces/entidadPuntoInteres';
import { MapServiceService } from 'src/app/services/map-service.service';
import { Router } from '@angular/router';
import { UserFundacion } from '../../interfaces/usuarios/userFundacion';

var activarPuntos: boolean = false;
@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
})
export class InicioComponent implements OnInit, OnDestroy {
  puntoInteres: PuntoInteres = {
    _id: '',
    titulo: '',
    descripcion: '',
    direccion: '',
    autorPuntoDeInteres: '',
    ubicacion: {
      type: 'Point',
      coordinates: Array<number>(),
      direccionFormateada: '',
    },
    latitud: 0,
    longitud: 0,
  };
  geolocalizacion: google.maps.LatLng | any;
  latitude: number | any;
  longitude: number | any;
  latitudeMarker: number | any;
  longitudeMarker: number | any;
  zoom: number = 20;
  puntosDeInteres: PuntoInteres[] = [];
  coordenadas: Coordenada[] = [];
  coord: Coordenada | any;
  coordenada1: number | any;
  map: any;
  searchBox: any;
  direccion: string | any;
  textoInteres: string | any;
  tituloInteres: string | any;
  direccionInteres: string | any;
  rojo: string | any;
  verde: string | any;
  azul: string | any;
  private authStatusSub: Subscription | undefined;
  userIsAuth = false;
  userId: string = '';
  fundacion: UserFundacion = {
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
    ubicacion: {
      type: 'Point',
      coordinates: Array<number>(),
      direccionFormateada: '',
    },
    _id: '',
  };
  displayedColumns: string[] = ['evento', 'direccion', 'accion'];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  ancho: number | any;
  largo: number | any;
  constructor(
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private authService: LoginService,
    private mapService: MapServiceService,
    private _router: Router
  ) {}
  ngOnInit(): void {
    this.ancho = document.documentElement.clientWidth;

    this.largo = document.documentElement.clientHeight;
    console.log(this.largo);
    console.log(this.ancho);
    window.addEventListener('resize', this.displayWindowSize);

    this.userId = this.authService.getUserId();
    console.log('Este es el user id--', this.userId);
    this.cargarDatos();
    this.azul = 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png';
    this.verde = 'http://maps.google.com/mapfiles/ms/icons/green-dot.png';
    this.geolocalizar();

    this.userIsAuth = this.authService.getIsAuth();
    this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe((isAuth) => {
        this.userIsAuth = isAuth;
      });
  }
  displayWindowSize() {
    var w = document.documentElement.clientWidth;
    var h = document.documentElement.clientHeight;
    this.ancho = w;
    this.largo = h;
    console.log('ancho: ' + this.ancho + ' largo: ' + this.largo);
  }
  cargarDatos() {
    //Aquí hace falta una línea que cargue puntos de interés desde la BD
    this.mapService.getPuntosDeInteres(this.userId).subscribe((res) => {
      console.log('Respuesta', res.puntos);
      console.log('Fundacion', res.fundacion);
      this.fundacion = res.fundacion;
      this.fundacion.longitud = res.fundacion.ubicacion.coordinates[0];
      this.fundacion.latitud = res.fundacion.ubicacion.coordinates[1];
      this.fundacion.direccion = res.fundacion.ubicacion.direccionFormateada;
      this.puntosDeInteres = res.puntos;
      console.log('Puntos: ', this.puntosDeInteres);

      for (let index = 0; index < this.puntosDeInteres.length; index++) {
        console.log('Entrando a longitud');
        console.log(this.puntosDeInteres[index].ubicacion.coordinates[0]);
        // this.puntosDeInteres[index].longitud =
        //   res.puntos[index].ubicacion.coordinates[0];
        console.log('Entrando a latitud');
        console.log(this.puntosDeInteres[index].ubicacion.coordinates[1]);
        // this.puntosDeInteres[index].latitud =
        //   res.puntos[index].ubicacion.coordinates[1];
        // this.puntosDeInteres[index].direccion =
        //   res.puntos[index].ubicacion.direccionFormateada;
      }
      this.dataSource = new MatTableDataSource<PuntoInteres>(
        this.puntosDeInteres
      );
      this.dataSource.paginator = this.paginator;
      // console.log('Punto 1 long', this.puntosDeInteres[0].longitud);
      // console.log('Punto 2 lat', this.puntosDeInteres[1].latitud);
      // console.log('longitud', res.puntos[0].ubicacion.coordinates[0]);
      // console.log('latitud', res.puntos[0].ubicacion.coordinates[1]);
    });

    // this.dataSource.paginator = this.paginator;
  }
  ngOnDestroy() {
    this.authStatusSub?.unsubscribe();
  }
  geolocalizar() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.latitudeMarker = this.latitude;
        this.longitudeMarker = this.longitude;
        console.log(
          'latitud: ' + this.latitude + ' longitud: ' + this.longitude
        );
      });
    }
  }
  mapClicked($event: AGMMouseEvent) {
    geocoder: google.maps.Geocoder;
    if (activarPuntos) {
      
      const geocoder = new google.maps.Geocoder();
      // Coordinates equivale a 1 solo punto de interes y coordenadas equivale al arreglo de puntos de interes
      var coordinates: Coordenada = {
        latitude: $event.coords.lat,
        longitude: $event.coords.lng,
        titulo: '',
        descripcion: '',
        direccion: '',
        autorPunto: '',
        ubicacion: null,
      };
      console.log('coordenadaSize ' + this.coordenadas.length);
      console.log('Puntoooo', this.puntoInteres);
      const dialogRef = this.dialog.open(TextoInteresComponent, {
        disableClose: true,
        width: '600px',
        height: '500px',
        data: { titulo: '', texto: '' },
      });

      dialogRef.afterClosed().subscribe((result) => {
        if (result.accion == 'aceptar') {
          console.log('The dialog was closed');
          console.log('Dir', result.direccion);
          this.puntoInteres.direccion = result.direccion;
          this.puntoInteres.titulo = result.titulo;
          this.puntoInteres.descripcion = result.texto;
          this.puntoInteres.autorPuntoDeInteres = this.userId;
          this.puntoInteres._id = result._id
          // console.log('Ubi', result.ubicacion);
          // this.puntoInteres.ubicacion = result.ubicacion;
          this.puntoInteres.latitud = $event.coords.lat;
          this.puntoInteres.longitud = $event.coords.lng;
          this.puntoInteres.ubicacion.coordinates[0] = $event.coords.lng;
          this.puntoInteres.ubicacion.coordinates[1] = $event.coords.lat;
          console.log('Una coord', this.puntoInteres.ubicacion.coordinates[1]);

          // coordinates = {
          //   latitude: $event.coords.lat,
          //   longitude: $event.coords.lng,
          //   titulo: this.puntoInteres.titulo,
          //   descripcion: this.puntoInteres.descripcion,
          //   direccion: this.puntoInteres.direccion,
          //   ubicacion: this.puntoInteres.ubicacion,
          //   autorPunto: this.userId,
          // };
          this.geoCodificacionInversa(
            geocoder,
            this.puntoInteres.ubicacion.coordinates[1],
            this.puntoInteres.ubicacion.coordinates[0],
            this.puntoInteres
          );
          console.log('After geocodificación inversa', this.puntoInteres);
          // this.coordenadas.push(coordinates);
          console.log('punto de interes', this.puntoInteres);

          this.mapService.crearPuntoInteres(this.puntoInteres, this.userId);
          this._snackBar.open('Punto de interés creado', '', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
          });

          this.cargarDatos();
        } else {
          this._snackBar.open(
            'Se ha cancelado la creación del punto de interés',
            '',
            {
              duration: 3000,
              horizontalPosition: 'center',
              verticalPosition: 'bottom',
            }
          );
        }
      });
      // console.log(coordinates.latitude + ',' + coordinates.longitude);
    }
    activarPuntos = false;
  }

  geoCodificacionInversa(
    geocodificador: google.maps.Geocoder,
    latitud: number,
    longitud: number,
    puntoDeInteres: PuntoInteres
  ) {
    const latlng = {
      lat: latitud,
      lng: longitud,
    };
    geocodificador
      .geocode({ location: latlng })
      .then((response) => {
        if (response.results[0]) {
          puntoDeInteres.direccion = response.results[0].formatted_address;
        }
      })
      .catch((e) => window.alert('Geocoder failed due to: ' + e));
  }

  eliminarPunto(latitud: number, longitud: number) {
    var i = 0;
    var encontrado = false;
    for (i = 0; i < this.coordenadas.length; i++) {
      if (
        latitud == this.coordenadas[i].latitude &&
        longitud == this.coordenadas[i].longitude
      ) {
        this.coordenadas.splice(i, 1);
        this.cargarDatos();
        encontrado = true;
        this._snackBar.open('Punto de interés eliminado', '', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        });
      }
    }
  }

  onEliminarPunto(id: string) {
    console.log('Id punto', id);
    this.mapService.deletePunto(id).subscribe((res) => {
      console.log(id);
      this._router.navigate(['/dashboard']);
    });
  }
  eliminarPuntos() {
    this.coordenadas = [];
  }
  verPunto(latitud: number, longitud: number) {
    this.latitude = latitud;
    this.longitude = longitud;
  }
  editarPunto(latitud: number, longitud: number) {
    var i = 0;
    for (i = 0; i < this.coordenadas.length; i++) {
      if (
        latitud == this.coordenadas[i].latitude &&
        longitud == this.coordenadas[i].longitude
      ) {
        var coordenadaAux: Coordenada = {
          latitude: latitud,
          longitude: longitud,
          titulo: this.coordenadas[i].titulo,
          descripcion: this.coordenadas[i].descripcion,
          direccion: this.coordenadas[i].direccion,
          ubicacion: this.coordenadas[i].ubicacion,
          autorPunto: this.userId,
        };
        const dialogRef = this.dialog.open(TextoInteresComponent, {
          disableClose: true,
          width: '600px',
          height: '500px',
          data: {
            titulo: this.coordenadas[i].titulo,
            texto: this.coordenadas[i].descripcion,
          },
        });
        this.coordenadas.splice(i, 1);
        dialogRef.afterClosed().subscribe((result) => {
          console.log('The dialog was closed');
          coordenadaAux.titulo = result.titulo;
          coordenadaAux.descripcion = result.texto;
          this.coordenadas.push(coordenadaAux);
          this.cargarDatos();
          this._snackBar.open('Punto de interés editado', '', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
          });
        });
      }
    }
  }

  onPuntoSelected(id: string) {
    this._router.navigate(['/dashboard/mapa/editar-punto', id]);
  }

  onFundacionSelected(id: string) {
    this._router.navigate(['/dashboard/mi_cuenta', id]);
  }

  mapReady(event: any) {
    this.map = event;
    //const input = document.getElementById('Map-Search');
    //this.searchBox = new google.maps.places.SearchBox(<HTMLInputElement>input);
    this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(
      document.getElementById('Settings')
    );
    this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(
      document.getElementById('Profile')
    );
    //this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
    this.map.controls[google.maps.ControlPosition.TOP_RIGHT].push(
      document.getElementById('Logout')
    );

    //this.searchBox.addListener('places_changed', () => this.goToSearchedPlace());
  }
  goToSearchedPlace() {
    const places = this.searchBox.getPlaces();
    if (places.length === 0) {
      return;
    }
    const bounds = new google.maps.LatLngBounds();
    places.forEach((place) => {
      if (place.geometry.viewport) {
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
    });
    this.map.fitBounds(bounds);
  }

  activarPuntos() {
    activarPuntos = true;
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
function i(i: any) {
  throw new Error('Function not implemented.');
}
