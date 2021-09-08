import { Injectable } from '@angular/core';
import { EntidadEstadoSolicitudAdopcion } from '../components/interfaces/entidadEstadoSolicitudAdopcion';

@Injectable({
  providedIn: 'root'
})
export class EstadoSolicitudAdopcionService {
  solicitudesActivas: EntidadEstadoSolicitudAdopcion[] = [
    {aceptada: false, fundacion: "Perritos felices", fecha: Date().toLocaleString()},
  ];
  constructor() { }
  getSolicitudes(): EntidadEstadoSolicitudAdopcion[]
  {
    return this.solicitudesActivas;
  }
}
