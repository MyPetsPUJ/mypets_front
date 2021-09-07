import { Component, OnInit } from '@angular/core';
import { Loader } from "@googlemaps/js-api-loader"
import { MouseEvent as AGMMouseEvent } from '@agm/core';
export interface Coordenada {
  latitude: number | any;
  longitude: number | any;
}
var activarPuntos: boolean = false;
@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})

export class InicioComponent implements OnInit {
  geolocalizacion: google.maps.LatLng | any;
  latitude: number | any;
  longitude: number | any;
  zoom: number = 20;
  coordenadas: Coordenada[] = [];
  coord: Coordenada | any;
  coordenada1: number | any
  constructor() {
  }
  ngOnInit(): void {
    this.geolocalizar();
  }
  geolocalizar() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
      });
    }
  }
  mapClicked($event: AGMMouseEvent) {
    if (activarPuntos) {
      const coordinates: Coordenada = { latitude: $event.coords.lat, longitude: $event.coords.lng }
      this.coordenadas.push(coordinates);
      console.log('coordenadaSize ' + this.coordenadas.length);
    }

  }
  activarPuntos() {
    activarPuntos = true;
  }
  desactivarPuntos()
  {
    activarPuntos = false;
  }
}
