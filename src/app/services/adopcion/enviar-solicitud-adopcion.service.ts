import { Injectable } from '@angular/core';
import { EntidadSolicitudAdopcion } from '../../components/interfaces/solicitud-adopcion/entidadSolicitudAdopcion';
import { HttpClient } from '@angular/common/http';
import { UserAdoptante } from 'src/app/components/interfaces/usuarios/userAdoptante';
import { EntidadAnimal } from 'src/app/components/interfaces/usuarios/entidadAnimal';
import { UserFundacion } from 'src/app/components/interfaces/usuarios/userFundacion';

@Injectable({
  providedIn: 'root'
})
export class EnviarSolicitudAdopcionService {
  private token: string = "";
  dominio: string = "localhost";
  puerto: number = 3000;
  pathIntermedio: string = "api";
  entidad: string = "dashboard-adoptante";
  entidadII: string = "dashboard";
  subTipoEntidad: string = "adoptame";
  subTipoEntidadII: string = "solicitud-adopcion";
  subTipoEntidadIII: string = "solicitud-adoptante";
  subTipoEntidadIV: string = "solicitud-fundacion";
  subTipoEntidadV: string = "eliminar-solicitud-adoptante";
  subTipoEntidadVI: string = "solicitudes";
  solicitudes: EntidadSolicitudAdopcion[] =[];

  constructor(private http: HttpClient) { }


  postSolicitudAdopcion(entidadSolicitudAdopcion : EntidadSolicitudAdopcion)
    {
    this.http.post(`http://${this.dominio}:${this.puerto}/${this.pathIntermedio}/${this.entidad}/${this.subTipoEntidad}/${this.subTipoEntidadII}`, entidadSolicitudAdopcion)
    .subscribe(respuesta => {
      console.log(respuesta);
    })
  }
  getSolicitudesAdoptante(id: string)
  {
    return this.http.get<EntidadSolicitudAdopcion[]>(`http://${this.dominio}:${this.puerto}/${this.pathIntermedio}/${this.entidad}/${this.subTipoEntidad}/${this.subTipoEntidadIII}/${id}`
    )
  }
  populateSolicitudesFundaciones(id: string) {
    return this.http.get<{
      fundacion: UserFundacion;
      solicitudes: EntidadSolicitudAdopcion[];
      adoptantes: UserAdoptante[];
      animales: EntidadAnimal[];
    }>(
      `http://${this.dominio}:${this.puerto}/${this.pathIntermedio}/${this.entidad}/${this.subTipoEntidad}/${this.subTipoEntidadIV}/${id}`
    );
  }
  addSolicitud(solicitud: EntidadSolicitudAdopcion)
  {
    this.solicitudes.push(solicitud);
    console.log(this.solicitudes);
  }
  getSolicitudesQuemadas()
  {
    return this.solicitudes;
  }
  
  deleteSolicitud(id: string)
  {
    this.http.delete(`http://${this.dominio}:${this.puerto}/${this.pathIntermedio}/${this.entidad}/${this.subTipoEntidad}/${this.subTipoEntidadII}/${this.subTipoEntidadV}/${id}`)
    .subscribe(respuesta => {
      console.log(respuesta);
    })
  }

  deleteSolicitu(usuario: UserAdoptante, animal: EntidadAnimal)
  {
    for(var i = 0; i < this.solicitudes.length; i++)
    {
      if( usuario == this.solicitudes[i].adoptante && animal == this.solicitudes[i].animal)
      {
        this.solicitudes.splice(i,1);
      }
    }
  }

  actualizarEstadoSolicitud(id: string,estado: string)
  {
    return this.http.put(
      `http://${this.dominio}:${this.puerto}/${this.pathIntermedio}/${this.entidadII}/${this.subTipoEntidadVI}/${id}`,estado
    );
  }

}
