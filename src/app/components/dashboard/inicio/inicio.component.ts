import { Component, OnInit } from '@angular/core';
import { Loader } from "@googlemaps/js-api-loader"
@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  geolocalizacion: google.maps.LatLng | any;
  constructor() { 
  }
  ngOnInit(): void {
    const loader = new Loader({
      apiKey: "AIzaSyAesjccMPoVK0aW3au9R9qKHHSqSW8u65E"
    });
    
    loader.load().then(() => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position){
          var geolocate = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
          const mapa = new google.maps.Map(document.getElementById("map") as HTMLElement, {
            center: { lat: -34.397, lng: 150.644 },
            zoom: 20
          });
          var marker = new google.maps.Marker({
            map: mapa,
            position: geolocate,
            title: 'Estás aquí'
          });
          var infoWindow = new google.maps.InfoWindow({
            position: geolocate,
            content:
            '<h1>Estás aqu</h1>'
        });
          mapa.setCenter(geolocate);
      });
      }
    
    });
  }

}
