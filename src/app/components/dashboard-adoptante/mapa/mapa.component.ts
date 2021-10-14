import { LatLng } from '@agm/core';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CrearFundacionService } from 'src/app/services/fundacion/crearFundacion.service';
import { UserFundacion } from '../../interfaces/usuarios/userFundacion';
import { ListaFundacionesComponent } from './lista-fundaciones/lista-fundaciones.component';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})

export class MapaComponent implements OnInit {
  latitude: number | any;
  longitude: number | any;
  latitudeMarker: number | any;
  longitudeMarker: number | any;
  map: any;
  infoFunds: any[] = [];
  cargar: boolean = false;
  clicks: number = 0;
  displayedColumns: string[] = ['nombreFund', 'direccion','accion'];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  amarillo: string = "http://maps.google.com/mapfiles/ms/icons/yellow-dot.png";
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  fundaciones: UserFundacion[] = [];
  constructor(public dialog: MatDialog, public servicioFundacion: CrearFundacionService) { }

  ngOnInit(): void {
    this.geolocalizar();
    this.fundaciones = this.servicioFundacion.getFundaciones();
    this.dataSource = new MatTableDataSource(this.fundaciones);
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
    for(i = 0; i < this.fundaciones.length; i ++)
    {
      direccion = {lat: this.fundaciones[i].latitud, lng: this.fundaciones[i].longitud}
      direcciones.push(direccion);
    }
    if(!this.cargar)
    {
      for (i = 0; i < direcciones.length; i++) {
        directionsService.route({
          origin: origin,
          destination: direcciones[i],
          travelMode: google.maps.TravelMode.DRIVING,
        }, (response, status) => {
          if (status == google.maps.DirectionsStatus.OK) {
            //console.log(response?.routes[0].legs[0].distance?.text);
            var distancia = String(response?.routes[0].legs[0].distance?.text);
            var tiempoViaje = String(response?.routes[0].legs[0].duration?.text);
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
              direccion: response?.routes[0].legs[0].end_address
            }
            this.infoFunds.push(info);
            var j;
            var k
            if(this.infoFunds.length == this.fundaciones.length)
            {
              console.log(this.infoFunds.length);
              for(j = 0; j < this.infoFunds.length; j++)
              {
                for(k = 0; k < this.infoFunds.length; k++)
                {
                  if(this.infoFunds[j].direccion == this.fundaciones[k].direccion)
                  {
                    this.fundaciones[k].distancia= this.infoFunds[j].distancia;
                    this.fundaciones[k].duracion = this.infoFunds[j].duracion;
                    console.log( this.fundaciones[k].distancia);
                  }
                }
              }
            }
            //console.log(this.infoFunds);
          }
        });
        //console.log(this.infoFunds);
      }
            this.columnsToDisplay.push('');
            this.columnsToDisplay.push('');
            this.columnsToDisplay[2]='distancia';
            this.columnsToDisplay[3]='duracion';
            this.columnsToDisplay[4]='accion';

            this.displayedColumns.push('');
            this.displayedColumns.push('');
            this.displayedColumns[2]='distancia';
            this.displayedColumns[3]='duracion';
            this.displayedColumns[4]='accion';
            this.cargar = true;
            //console.log(this.infoFunds);
            for(i = 0; i < this.infoFunds.length; i++)
            {
              this.llenarFundaciones(i, this.infoFunds[i].distancia, this.infoFunds[i].duracion);
            }

    }       
  }

  llenarFundaciones(index: number, distancia: string, duracion: string)
  {
      this.fundaciones[index]['duracion'] = duracion;
      this.fundaciones[index]['distancia'] = distancia;
    console.log(this.fundaciones);
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
  public getDistance(latitudOr: number, longitudOr: number, latitudDes: number, longDes: number) {
    const matrix = new google.maps.DistanceMatrixService();
    return new Promise((resolve, reject) => {
      matrix.getDistanceMatrix({
        origins: [new google.maps.LatLng(latitudOr, longitudOr)],
        destinations: [new google.maps.LatLng(latitudDes, longDes)],
        travelMode: google.maps.TravelMode.DRIVING,
      }, function (response, status) {
        if (status === 'OK') {
          resolve(response)

        } else {
          reject(response);
        }
      });
    })
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
  verFundacion(fundacion: UserFundacion)
  {
    const dialogRef = this.dialog.open(ListaFundacionesComponent, {
      width: '700px',
      height: '600px',
      data: { fundacion: fundacion}
    });
  }
  cambiarVista(latitud: number, longitud: number)
  {
    this.latitude = latitud;
    this.longitude = longitud;
  }
}
