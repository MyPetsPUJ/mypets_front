import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({ providedIn: 'root' })
export class ServicioBaseService {
  dominio: string = 'localhost';
  puerto: number = 3000;
  pathIntermedio: string = 'api';

  constructor(private http: HttpClient) {}

  get(urlParams: string[], data: any) {
    const jointParams = urlParams.join('/');
    return this.http.get(
      `http://${this.dominio}:${this.puerto}/${this.pathIntermedio}/${jointParams}`,
      data
    );
  }

  post(urlParams: string[], data: any) {
    const jointParams = urlParams.join('/');
    return this.http.post(
      `http://${this.dominio}:${this.puerto}/${this.pathIntermedio}/${jointParams}`,
      data
    );
  }
}
