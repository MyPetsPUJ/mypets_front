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
  service: google.maps.DistanceMatrixService | any;
  constructor() { }

  ngOnInit(): void {
    this.geolocalizar();
    const origin1 = { lat: 55.93, lng: -3.118 };
    const origin2 = "Greenwich, England";
    const destinationA = "Stockholm, Sweden";
    const destinationB = { lat: 50.087, lng: 14.421 };
    const request = {
      origins: [origin1, origin2],
      destinations: [destinationA, destinationB],
      travelMode: google.maps.TravelMode.DRIVING,
      unitSystem: google.maps.UnitSystem.METRIC,
      avoidHighways: false,
      avoidTolls: false,
    };
    this.service.getDistanceMatrix(request).then((response) => {
      console.log(response.rows[0].elements[0].distance);
    });
    
    
  }

  geolocalizar() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
      });
    }
  }
  distancia()
  {
    
    
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
