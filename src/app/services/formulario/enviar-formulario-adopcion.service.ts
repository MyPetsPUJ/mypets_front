import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormularioAdopcion } from '../../components/interfaces/formularios/formularioAdopcion';
@Injectable({
  providedIn: 'root'
})
export class EnviarFormularioAdopcionService {
  private token: string = "";
  dominio: string = "localhost";
  puerto: number = 3000;
  pathIntermedio: string = "api";
  entidad: string = "dashboard-adoptante";
  subTipoEntidad: string = "adoptame";
  subTipoEntidadII: string = "solicitud-adopcion";
  SubTipoEntidadIII: string ="solicitudes-adopcion-adoptante";
  SubTipoEntidadIV: string = "formulario-solicitud"
  subTipoEntidadV: string = "formulario-adopcion";

  constructor(private http: HttpClient) { }

  formularioAdopcion( formularioAdopcion: FormularioAdopcion, id : string )
  {
    const body = { idSolicitud :id , adoptante: formularioAdopcion.adoptante,
      informacionFamiliar: formularioAdopcion.informacionFamiliar , 
      informacionRelacionada:formularioAdopcion.informacionRelacionada , 
      referenciaFamiliar: formularioAdopcion.referenciaFamiliar , 
      referenciaPersonal: formularioAdopcion.referenciaPersonal
    };

    console.log("body",body);
    this.http.post(`http://${this.dominio}:${this.puerto}/${this.pathIntermedio}/${this.entidad}/${this.SubTipoEntidadIII}/${this.subTipoEntidadV}`, body)
    .subscribe(respuesta => {
      console.log(respuesta);
    })
  }

  getFormularioSolicitud(id : string)
  {
    return this.http.get<any>(`http://${this.dominio}:${this.puerto}/${this.pathIntermedio}/${this.entidad}/${this.SubTipoEntidadIII}/${this.SubTipoEntidadIV}/${id}`
    );
  }

}
