import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { UserAdoptante } from '../../components/interfaces/usuarios/userAdoptante';
import { InicioSesion } from '../../components/interfaces/auth/inicioSesion';

@Injectable({
  providedIn: 'root'
})
export class CrearAdoptanteService {

  private token: string = "";
  dominio: string = "localhost";
  puerto: number = 3000;
  pathIntermedio: string = "api";
  entidad: string = "crear-cuenta";
  subTipoEntidad: string = "crear-adoptante";
  login: string = "login";
  adoptantes: UserAdoptante[] = [
    {nombre: "Andrés Felipe",
      apellidos: "Barreto Mosquera",
      fecha_nacimiento: '03/09/1999',
      tipo_doc: 'Cédula de ciudadanía',
      num_doc: '1233511885', 
      genero: 'Masculino',
      localidad: '8. Kennedy',
      correo: 'a_barreto@javeriana.edu.co', 
      num_celular:'3205586239', 
      password: 'Barreto1235',
      tipo_usuario:'adoptante'},

      {nombre: "Juan Felipe",
      apellidos: "Vanegas Patiño",
      fecha_nacimiento: '04/12/1999',
      tipo_doc: 'Cédula de ciudadanía',
      num_doc: '1233511884', 
      genero: 'Masculino',
      localidad: '8. Kennedy',
      correo: 'j_vanegas@javeriana.edu.co', 
      num_celular:'3205586237', 
      password: 'Juan1235',
      tipo_usuario:'adoptante'},

      {nombre: "Carlos Eduardo",
      apellidos: "Vanegas Briñez",
      fecha_nacimiento: '02/07/1979',
      tipo_doc: 'Cédula de ciudadanía',
      num_doc: '1233511886', 
      genero: 'Masculino',
      localidad: '8. Kennedy',
      correo: 'c_vanegas@javeriana.edu.co', 
      num_celular:'3205586239', 
      password: 'Carlos1235',
      tipo_usuario:'adoptante'},
  ]
  constructor(private http: HttpClient) { }


  crearUsuarioAdoptante(userAdoptante: UserAdoptante){
    this.http.post(`http://${this.dominio}:${this.puerto}/${this.pathIntermedio}/${this.entidad}/${this.subTipoEntidad}`, userAdoptante)
    .subscribe(respuesta => {
      console.log(respuesta);
    });
}
getAdoptantes()
{
  return this.adoptantes;
}

}










