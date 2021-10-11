import { Injectable } from '@angular/core';
import { EntidadEstadoSolicitudAdopcion } from '../../components/interfaces/solicitud-adopcion/entidadEstadoSolicitudAdopcion';

@Injectable({
  providedIn: 'root'
})
export class EstadoSolicitudAdopcionService {
  solicitudesActivas: EntidadEstadoSolicitudAdopcion[] = [
    {aceptada: "Aceptada", fundacion: "Perritos felices", fecha: "5 de Febrero de 2010"}
  ];
  constructor() { }
  getSolicitudes(): EntidadEstadoSolicitudAdopcion[]
  {
    return this.solicitudesActivas;
  }
}
