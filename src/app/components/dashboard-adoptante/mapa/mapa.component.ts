import { LatLng } from '@agm/core';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit {
  latitude: number | any;
  longitude: number | any;
  constructor() { }

  ngOnInit(): void {
    this.geolocalizar();
    this.getDistance(4.6474928,-74.1655349,4.6480667841504415,-74.1680706334183);
  }
  geolocalizar() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
      });
    }
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
          console.log(response)
        } else {
          reject(response);
        }
      });
    })
  }

}
