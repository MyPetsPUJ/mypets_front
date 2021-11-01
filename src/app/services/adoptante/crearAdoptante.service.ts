import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { UserAdoptante } from '../../components/interfaces/usuarios/userAdoptante';
import { InicioSesion } from '../../components/interfaces/auth/inicioSesion';
import { CrearAnimalService } from '../animal/crearAnimal.service';

@Injectable({
  providedIn: 'root',
})
export class CrearAdoptanteService {
  private token: string = '';
  dominio: string = 'localhost';
  puerto: number = 3000;
  pathIntermedio: string = 'api';
  entidad: string = 'crear-cuenta';
  entidadII: string = 'dashboard-adoptante';
  subTipoEntidad: string = 'crear-adoptante';
  subTipoEntidadII: string = 'traer-adoptante';
  login: string = 'login';
  adoptantes: UserAdoptante[] = [];
  constructor(private http: HttpClient, servicioAnimal: CrearAnimalService) {
    var animal = (this.adoptantes = [
      {
        nombre: 'Andrés Felipe',
        urlImg: '../../../assets/Images/andres.jpg',
        apellidos: 'Barreto Mosquera',
        fecha_nacimiento: '03/09/1999',
        tipo_doc: 'Cédula de ciudadanía',
        num_doc: '1233511885',
        genero: 'Masculino',
        localidad: '8. Kennedy',
        correo: 'a_barreto@javeriana.edu.co',
        num_celular: '3205586239',
        password: 'Barreto1235',
        tipo_usuario: 'adoptante',
        animales: [servicioAnimal.getAnimales()[0]],
        solicitudesAdoptante: [],
      },
      {
        nombre: 'Juan Felipe',
        urlImg: '../../../assets/Images/felipe.jpg',
        apellidos: 'Vanegas Patiño',
        fecha_nacimiento: '04/12/1999',
        tipo_doc: 'Cédula de ciudadanía',
        num_doc: '1233511884',
        genero: 'Masculino',
        localidad: '8. Kennedy',
        correo: 'j_vanegas@javeriana.edu.co',
        num_celular: '3205586237',
        password: 'Juan1235',
        tipo_usuario: 'adoptante',
        animales: [servicioAnimal.getAnimales()[1]],
        solicitudesAdoptante: [],
      },

      {
        nombre: 'Carlos Eduardo',
        urlImg: '../../../assets/Images/carlos.jpg',
        apellidos: 'Vanegas Briñez',
        fecha_nacimiento: '02/07/1979',
        tipo_doc: 'Cédula de ciudadanía',
        num_doc: '1233511886',
        genero: 'Masculino',
        localidad: '8. Kennedy',
        correo: 'c_vanegas@javeriana.edu.co',
        num_celular: '3205586239',
        password: 'Carlos1235',
        tipo_usuario: 'adoptante',
        animales: [],
        solicitudesAdoptante: [],
      },
    ]);
  }

  crearUsuarioAdoptante(
    nombres: string,
    apellidos: string,
    fecha_nacimiento: string,
    tipo_doc: string,
    num_doc: string,
    genero: string,
    localidad: string,
    num_celular: string,
    correo: string,
    password: string,
    imagen: File,
    tipo_usuario: string
  ) {
    const fd = new FormData();
    fd.append('nombre', nombres);
    fd.append('apellidos', apellidos);
    fd.append('fecha_nacimiento', fecha_nacimiento);
    fd.append('tipo_doc', tipo_doc);
    fd.append('num_doc', num_doc);
    fd.append('genero', genero);
    fd.append('localidad', localidad);
    fd.append('correo', correo);
    fd.append('num_celular', num_celular);
    fd.append('password', password);
    fd.append('image', imagen);
    fd.append('tipo_usuario', tipo_usuario);

    this.http
      .post(
        `http://${this.dominio}:${this.puerto}/${this.pathIntermedio}/${this.entidad}/${this.subTipoEntidad}`,
        fd
      )
      .subscribe((respuesta) => {
        console.log(respuesta);
      });
  }

  getAdoptanteById(id: string) {
    return this.http.get<UserAdoptante>(
      `http://${this.dominio}:${this.puerto}/${this.pathIntermedio}/${this.entidadII}/${this.subTipoEntidadII}/${id}`
    );
  }
  getAdoptantes2() {
    return this.http.get<UserAdoptante[]>(
      `http://${this.dominio}:${this.puerto}/${this.pathIntermedio}/${this.entidadII}`
    );
  }

  getAdoptantes() {
    return this.adoptantes;
  }
  getIndex(adoptante: UserAdoptante): Number {
    var value;
    for (var i = 0; i < this.adoptantes.length; i++) {
      if (adoptante == this.adoptantes[i]) value = i;
    }
    return value;
  }
}
