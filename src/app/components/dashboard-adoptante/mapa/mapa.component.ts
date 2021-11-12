import { LatLng } from '@agm/core';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CrearFundacionService } from 'src/app/services/fundacion/crearFundacion.service';
import { MapServiceService } from 'src/app/services/map-service.service';
import { PuntoInteres } from '../../interfaces/entidadPuntoInteres';
import { UserFundacion } from '../../interfaces/usuarios/userFundacion';
import { ListaFundacionesComponent } from './lista-fundaciones/lista-fundaciones.component';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css'],
})
export class MapaComponent implements OnInit {
  latitude: number | any;
  longitude: number | any;
  latitudeMarker: number | any;
  longitudeMarker: number | any;
  map: any;
  verde: string | any;
  azul: string | any;
  infoFunds: any[] = [];
  cargar: boolean = false;
  clicks: number = 0;
  fundacionesBack: UserFundacion[] = [];
  puntosDeInteres: PuntoInteres[] = [];
  displayedColumns: string[] = ['nombreFund', 'direccion', 'num_celular','accion'];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  amarillo: string = 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png';
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator | any;
  @ViewChild(MatSort) sort: MatSort | any;
  fundaciones: UserFundacion[] = [];
  ancho: number | any;
  largo: number | any;
  constructor(
    public dialog: MatDialog,
    public servicioFundacion: CrearFundacionService,
    private mapService: MapServiceService
  ) {}

  ngOnInit(): void {
    this.geolocalizar();
    this.ancho = document.documentElement.clientWidth;
    
    this.largo = document.documentElement.clientHeight;
    // this.fundaciones = this.servicioFundacion.getFundaciones();
    this.azul = 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png';
    this.verde = 'http://maps.google.com/mapfiles/ms/icons/green-dot.png';
    this.mapService.mostrarPuntosDeInteres().subscribe((res) => {
      // console.log('Respuesta: ', res.fundaciones[3].ubicacion.coordinates[0]);
      this.fundacionesBack = res.fundaciones;
      console.log('Fundaciones', this.fundacionesBack);
      this.puntosDeInteres = res.puntos;
      // console.log(this.puntosDeInteres[0].ubicacion.direccionFormateada)

      for (let indexF = 0; indexF < this.fundacionesBack.length; indexF++) {
        console.log('F longitud');
        this.fundacionesBack[indexF].longitud =
          res.fundaciones[indexF].ubicacion.coordinates[0];
        console.log('F latitud');
        this.fundacionesBack[indexF].latitud =
          res.fundaciones[indexF].ubicacion.coordinates[1];
        this.fundacionesBack[indexF].direccion =
          res.fundaciones[indexF].ubicacion.direccionFormateada;
      }
      this.dataSource = new MatTableDataSource(this.fundacionesBack);
      this.dataSource.paginator = this.paginator;
      for (let index = 0; index < this.puntosDeInteres.length; index++) {
        console.log('Entrando a longitud');
        this.puntosDeInteres[index].longitud =
          res.puntos[index].ubicacion.coordinates[0];
        console.log('Entrando a latitud1');
        this.puntosDeInteres[index].latitud =
          res.puntos[index].ubicacion.coordinates[1];
        this.puntosDeInteres[index].direccion =
          res.puntos[index].ubicacion.direccionFormateada;
      }
    });
  }

  geolocalizar() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.latitudeMarker = this.latitude;
        this.longitudeMarker = this.longitude;
        console.log(this.latitude + ' ' + this.longitude);
      });
    }
  }

  calcularRuta() {
    const origin = { lat: this.latitude, lng: this.longitude };
    const directionsService = new google.maps.DirectionsService();
    var info;
    var i = Number(0);
    var direcciones: any[] = [];
    var direccion: any;
    for (i = 0; i < this.fundacionesBack.length; i++) {
      direccion = {
        lat: this.fundacionesBack[i].latitud,
        lng: this.fundacionesBack[i].longitud,
      };
      direcciones.push(direccion);
    }
    if (!this.cargar) {
      var cont = 0;
      for (i = 0; i < direcciones.length; i++) {
        directionsService.route(
          {
            origin: origin,
            destination: direcciones[i],
            travelMode: google.maps.TravelMode.DRIVING,
          },
          (response, status) => {
            if (status == google.maps.DirectionsStatus.OK) {
              //console.log(response?.routes[0].legs[0].distance?.text);
              var distancia = String(
                response?.routes[0].legs[0].distance?.text
              );
              var tiempoViaje = String(
                response?.routes[0].legs[0].duration?.text
              );
              //console.log("COORDS" + response?.routes[0].legs[0].end_location.lat() + response?.routes[0].legs[0].end_location.lng());
              //console.log(response);
              //var direccion = String(response?.routes[0].legs[0].end_address);
              //console.log('Coordenada ' + i + ' distancia: ' + distancia);
              //console.log('Coordenada ' + i + ' tiempo de viaje: ' + response?.routes[0].legs[0].duration?.text);
              //console.log('Coordenada ' + i + ' dirección: ' + response?.routes[0].legs[0].end_address);
              console.log(response?.routes[0].legs[0].end_address);
              console.log(response);
              info = {
                distancia: distancia,
                duracion: tiempoViaje,
                lat: response?.routes[0].legs[0].end_location.lat(),
                lng:response?.routes[0].legs[0].end_location.lng(),
                direccion: response?.routes[0].legs[0].end_address
              };
              this.infoFunds.push(info);
              cont++;
              var j;
              var k;
              if (this.infoFunds.length == this.fundacionesBack.length) {
                for (j = 0; j < this.infoFunds.length; j++) {
                  for (k = 0; k < this.infoFunds.length; k++) {
                    if (
                      this.infoFunds[j].lat ==
                      this.fundacionesBack[k].latitud && this.infoFunds[j].lng == this.fundacionesBack[k].longitud
                    ) {
                      this.fundacionesBack[k].distancia = this.infoFunds[j].distancia;
                      this.fundacionesBack[k].duracion = this.infoFunds[j].duracion;
                      console.log(this.fundacionesBack[k].distancia);
                    }
                    else if(this.infoFunds[j].direccion == this.fundacionesBack[k].direccion)
                    {
                      this.fundacionesBack[k].distancia = this.infoFunds[j].distancia;
                      this.fundacionesBack[k].duracion = this.infoFunds[j].duracion;
                    }
                  }
                }
              }
              //console.log(this.infoFunds);
            }
          }
        );
        //console.log(this.infoFunds);
      }
      this.columnsToDisplay.push('');
      this.columnsToDisplay.push('');
      this.columnsToDisplay[2] = 'distancia';
      this.columnsToDisplay[3] = 'duracion';
      this.columnsToDisplay[4] = 'accion';

      this.displayedColumns.push('');
      this.displayedColumns.push('');
      this.displayedColumns[2] = 'distancia';
      this.displayedColumns[3] = 'duracion';
      this.displayedColumns[4] = 'accion';
      this.cargar = true;
      //console.log(this.infoFunds);
      // for (i = 0; i < this.infoFunds.length; i++) {
      //   this.llenarFundaciones(
      //     i,
      //     this.infoFunds[i].distancia,
      //     this.infoFunds[i].duracion
      //   );
      // }
    }
  }

  llenarFundaciones(index: number, distancia: string, duracion: string) {
    this.fundaciones[index]['duracion'] = duracion;
    this.fundaciones[index]['distancia'] = distancia;
    console.log(this.fundaciones);
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
  public getDistance(
    latitudOr: number,
    longitudOr: number,
    latitudDes: number,
    longDes: number
  ) {
    const matrix = new google.maps.DistanceMatrixService();
    return new Promise((resolve, reject) => {
      matrix.getDistanceMatrix(
        {
          origins: [new google.maps.LatLng(latitudOr, longitudOr)],
          destinations: [new google.maps.LatLng(latitudDes, longDes)],
          travelMode: google.maps.TravelMode.DRIVING,
        },
        function (response, status) {
          if (status === 'OK') {
            resolve(response);
          } else {
            reject(response);
          }
        }
      );
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
  verFundacion(fundacion: UserFundacion) {
    const dialogRef = this.dialog.open(ListaFundacionesComponent, {
      width: '700px',
      height: '600px',
      data: { fundacion: fundacion },
    });
  }
  cambiarVista(latitud: number, longitud: number) {
    this.latitude = latitud;
    this.longitude = longitud;
  }
}
