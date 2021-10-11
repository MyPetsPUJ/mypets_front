import { LatLng } from '@agm/core';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ListaFundacionesComponent } from './lista-fundaciones/lista-fundaciones.component';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})

export class MapaComponent implements OnInit {
  latitude: number | any;
  longitude: number | any;
  map:any;
  infoFunds: any[] = [];
  cargar: boolean = false;
  clicks: number = 0;
  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
    this.geolocalizar();

  }

  geolocalizar() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        console.log(this.latitude + ' ' + this.longitude);
      });
    }
  }
  abrirVentana()
  {
    this.dialog.open(ListaFundacionesComponent, 
      {
        width: '500px',
        height: '500px',
        data: {informacion : this.infoFunds}
      });
      
  }
  calcularRuta()
  {
    const origin = { lat: 4.6474866, lng: -74.1655377};
    const destination={ lat: 4.650743586540149, lng: -74.14916171363397};
    const directionsService = new google.maps.DirectionsService();
    var info;
    var fundaciones;
    if(!this.cargar)
    {
      var coordenadasFund: any[]=[
        {lat: 4.741765335769153,lng: -74.02332319625492},
        {lat: 4.607630539524677,lng: -74.17644514449711},
        {lat: 4.679491660505332,lng: -74.0823747099268},
        {lat: 4.809507241630877,lng: -74.10160078414555},
        {lat: 4.698653384887069,lng: -74.12975324996586},
        {lat: 4.618581277506073,lng: -74.07756819137211},
        {lat: 4.559034610195376,lng: -74.10915388473148}]
        var i = Number(0);
        for(i = 0; i< coordenadasFund.length; i++)
        {
          directionsService.route({
            origin: origin,
            destination: coordenadasFund[i],
            travelMode: google.maps.TravelMode.DRIVING,
          }, (response, status) => {
            if(status == google.maps.DirectionsStatus.OK)
            {
              //console.log(response?.routes[0].legs[0].distance?.text);
              var distancia = String(response?.routes[0].legs[0].distance?.text);
              var tiempoViaje = String(response?.routes[0].legs[0].duration?.text);
              var direccion = String(response?.routes[0].legs[0].end_address);
              //console.log('Coordenada ' + i + ' distancia: ' + distancia);
              //console.log('Coordenada ' + i + ' tiempo de viaje: ' + response?.routes[0].legs[0].duration?.text);
              //console.log('Coordenada ' + i + ' dirección: ' + response?.routes[0].legs[0].end_address);
              //console.log(response);
              info = {
                nombreFundacion: 'Fundacion'+(this.infoFunds.length + 1),
                distancia: distancia,
                duracion: tiempoViaje,
                dir: direccion
              }
              this.infoFunds.push(info);
              if (this.infoFunds.length == coordenadasFund.length)
              {
                this.cargar = true;
              }
              
            }
            else{
      
            }
          });
        }
    }
    if(this.cargar)
    {
      this.openDialog();
    }
  }
  openDialog()
  {
    this.dialog.open(ListaFundacionesComponent, 
      {
        width: '900px',
        height: '500px',
        data: {informacion : this.infoFunds}
      });
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

}
