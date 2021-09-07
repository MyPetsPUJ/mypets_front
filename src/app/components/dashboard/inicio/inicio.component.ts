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
  }

}
