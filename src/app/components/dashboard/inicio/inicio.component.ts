import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Loader } from "@googlemaps/js-api-loader"
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



var activarPuntos: boolean = false;
@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})

export class InicioComponent implements OnInit, OnDestroy {
  geolocalizacion: google.maps.LatLng | any;
  latitude: number | any;
  longitude: number | any;
  latitudeMarker: number | any;
  longitudeMarker: number | any;
  zoom: number = 20;
  coordenadas: Coordenada[] = [];
  coord: Coordenada | any;
  coordenada1: number | any;
  map: any;
  searchBox: any;
  direccion: string | any;
  textoInteres: string | any;
  tituloInteres: string | any;
  rojo: string | any;
  verde: string | any;
  azul: string | any;
  private authStatusSub: Subscription | undefined;
  userIsAuth = false;
  displayedColumns: string[] = ['evento', 'direccion','accion'];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(public dialog: MatDialog, private _snackBar: MatSnackBar, private authService: LoginService) {
  }
  ngOnInit(): void {
    this.cargarDatos();
    this.azul = 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png';
    this.verde = 'http://maps.google.com/mapfiles/ms/icons/green-dot.png';
    this.geolocalizar();
    this.userIsAuth = this.authService.getIsAuth();
    this.authStatusSub = this.authService.getAuthStatusListener().subscribe(isAuth => {
      this.userIsAuth = isAuth;
    });
  }
  cargarDatos()
  {
    //Aquí hace falta una línea que cargue puntos de interés desde la BD
    this.dataSource = new MatTableDataSource<Coordenada>(this.coordenadas);
    this.dataSource.paginator = this.paginator;
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
        console.log('latitud: ' + this.latitude + ' longitud: ' + this.longitude);
      });
    }
  }
  mapClicked($event: AGMMouseEvent) {
    geocoder: google.maps.Geocoder;
    if (activarPuntos) {
      const geocoder = new google.maps.Geocoder();

      var coordinates: Coordenada = {
        latitude: $event.coords.lat, longitude: $event.coords.lng,
        titulo: '', descripcion: '', direccion: ''
      }
      console.log('coordenadaSize ' + this.coordenadas.length);
      const dialogRef = this.dialog.open(TextoInteresComponent, {
        disableClose: true,
        width: '600px',
        height: '500px',
        data: { titulo: '', texto: '' }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result.accion == 'aceptar') {
          console.log('The dialog was closed');
          this.tituloInteres = result.titulo;
          this.textoInteres = result.texto;
          coordinates = {
            latitude: $event.coords.lat, longitude: $event.coords.lng,
            titulo: this.tituloInteres, descripcion: this.textoInteres, direccion: ''
          }
          this.geoCodificacionInversa(geocoder, coordinates.latitude, coordinates.longitude,
            coordinates);
          this.coordenadas.push(coordinates);
          this.cargarDatos();
          this._snackBar.open('Punto de interés creado', '', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
          });
        }
        else 
        {
          this._snackBar.open('Se ha cancelado la creación del punto de interés', '', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
          });
        }

      });
      console.log(coordinates.latitude + ',' + coordinates.longitude);
    }
    activarPuntos = false;
  }

  geoCodificacionInversa(geocodificador: google.maps.Geocoder, latitud: number, longitud: number,
    coordinates: Coordenada) {
    const latlng = {
      lat: latitud,
      lng: longitud,
    };
    geocodificador
      .geocode({ location: latlng })
      .then((response) => {
        if (response.results[0]) {
          coordinates.direccion = response.results[0].formatted_address;

        }
      })
      .catch((e) => window.alert("Geocoder failed due to: " + e));
  }

  eliminarPunto(latitud: number, longitud: number) {
    var i = 0;
    var encontrado = false
    for (i = 0; i < this.coordenadas.length; i++) {
      if (latitud == this.coordenadas[i].latitude && longitud == this.coordenadas[i].longitude) {
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
  eliminarPuntos() {
    this.coordenadas = [];
  }
  verPunto(latitud: number, longitud: number)
  {
    this.latitude = latitud;
    this.longitude = longitud;
  }
  editarPunto(latitud: number, longitud: number) {

    var i = 0;
    for (i = 0; i < this.coordenadas.length; i++) {
      if (latitud == this.coordenadas[i].latitude && longitud == this.coordenadas[i].longitude) {

        var coordenadaAux: Coordenada = {
          latitude: latitud,
          longitude: longitud,
          titulo: this.coordenadas[i].titulo,
          descripcion: this.coordenadas[i].descripcion,
          direccion: this.coordenadas[i].direccion
        }
        const dialogRef = this.dialog.open(TextoInteresComponent, {
          disableClose: true,
          width: '600px',
          height: '500px',
          data: { titulo: this.coordenadas[i].titulo, texto: this.coordenadas[i].descripcion }
        });
        this.coordenadas.splice(i, 1);
        dialogRef.afterClosed().subscribe(result => {
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
  mapReady(event: any) {
    this.map = event;
    //const input = document.getElementById('Map-Search');
    //this.searchBox = new google.maps.places.SearchBox(<HTMLInputElement>input);
    this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(document.getElementById('Settings'));
    this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(document.getElementById('Profile'));
    //this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
    this.map.controls[google.maps.ControlPosition.TOP_RIGHT].push(document.getElementById('Logout'));

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


