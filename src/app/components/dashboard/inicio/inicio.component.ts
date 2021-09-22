import { Component, OnInit } from '@angular/core';
import { Loader } from "@googlemaps/js-api-loader"
import { MouseEvent as AGMMouseEvent } from '@agm/core';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
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
  coordenada1: number | any;
  map: any;
  searchBox: any;
  direccion: string | any;
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
        console.log('latitud: '+ this.latitude + ' longitud: ' + this.longitude);
      });
    }
  }
  mapClicked($event: AGMMouseEvent) {
    geocoder: google.maps.Geocoder;
    if (activarPuntos) {
      const geocoder = new google.maps.Geocoder();
      
      const coordinates: Coordenada = { latitude: $event.coords.lat, longitude: $event.coords.lng }
      this.coordenadas.push(coordinates);
      console.log('coordenadaSize ' + this.coordenadas.length);
      this.geoCodificacionInversa(geocoder,coordinates.latitude,coordinates.longitude);
      console.log(coordinates.latitude + ',' + coordinates.longitude);
    }
    activarPuntos = false;
  }

  geoCodificacionInversa(geocodificador: google.maps.Geocoder, latitud: number, longitud: number) {
    const latlng = {
      lat: latitud,
      lng: longitud,
    };
    geocodificador
      .geocode({ location: latlng })
      .then((response) => {
        if (response.results[0]) {
  
          this.direccion = response.results[0].formatted_address; //se obtiene la dirección
        }
      })
      .catch((e) => window.alert("Geocoder failed due to: " + e));
  }


  eliminarPuntos()
  {
    this.coordenadas = [];
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
}
function i(i: any) {
  throw new Error('Function not implemented.');
}

