import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { EntidadAnimal } from '../../components/interfaces/usuarios/entidadAnimal';

@Injectable({
  providedIn: 'root',
})
export class CrearAnimalService {
  private token: string = '';
  dominio: string = 'localhost';
  puerto: number = 3000;
  pathIntermedio: string = 'api';
  entidad: string = 'dashboard';
  subTipoEntidad: string = 'seleccion-animal'; //TODO cambiar rutas en front y back end
  subTipoEntidadPerro: string = 'crear-animal-perro';
  subTipoEntidadGato: string = 'crear-animal-gato';

  constructor(private http: HttpClient) {}
  animales: EntidadAnimal[] = [
    {
      urlImg: '../../../assets/Images/paca.png',
      nombre: 'Paca',
      edad: '11 años',
      raza: 'Carey',
      sexo: 'Hembra',
      tamano: 'Pequeño',
      color_ojos: 'Negro',
      tipo_pelaje: 'Pelaje corto',
      situacion: 'Esterilizado',
      desparasitado: 'Sí',
      ultima_vac: '15/02/2020',
      descripcion: 'Dwayne Douglas Johnson2​(Hayward, California; 2 de mayo de 1972) es un actor y luchador profesional estadounidense, conocido popularmente como «La Roca» o «The Rock».2​Se desempeñó como luchador profesional para la WWE hasta su retirada oficial en 2019, con el objetivo de centrarse en su carrera artística. Johnson ha participado en una gran diversidad de películas siendo premiado en bastantes de ellas, siendo su papel como Luke Hobbs en The Fast and the Furious uno de los más reconocidos.',
      esquema_vac: 'Triple felina',
      tipo_animal: 'Gato',
      owner: '',
      enAdopcion: false
    },
    {
      urlImg: '../../../assets/Images/milu.png',
      nombre: 'Milú',
      edad: '5 años',
      raza: 'Schnauzer',
      sexo: 'Hembra',
      tamano: 'Pequeño',
      color_ojos: 'Negro',
      tipo_pelaje: 'Pelaje largo',
      situacion: 'Esterilizado',
      desparasitado: 'Sí',
      ultima_vac: '02/02/2020',
      descripcion: 'Es muy juguetona',
      esquema_vac: 'Rabia',
      tipo_animal: 'Perro',
      owner: '1233511884',
      enAdopcion: false
    },
    {
      urlImg: '../../../assets/Images/aslan.png',
      nombre: 'Aslan',
      edad: '3 años',
      raza: 'Pitbull',
      sexo: 'Macho',
      tamano: 'Mediano',
      color_ojos: 'Negro',
      tipo_pelaje: 'Pelaje corto',
      situacion: 'Esterilizado',
      desparasitado: 'Sí',
      ultima_vac: '15/02/2020',
      descripcion: 'Es muy cariñoso',
      esquema_vac: 'Rabia',
      tipo_animal: 'Perro',
      owner: '1233511885',
      enAdopcion: false
    },
    {
      urlImg: '../../../assets/Images/akino.png',
      nombre: 'Akino',
      edad: '4 meses',
      raza: 'Criollo',
      sexo: 'Macho',
      tamano: 'Pequeño',
      color_ojos: 'Negro',
      tipo_pelaje: 'Pelaje semilargo',
      situacion: 'Sin Esterilizar',
      desparasitado: 'Sí',
      ultima_vac: 'No aplica',
      descripcion: 'Es muy cansón',
      esquema_vac: 'Ninguno',
      tipo_animal: 'Gato',
      owner: '',
      enAdopcion: false
    },
    {
      urlImg: '../../../assets/Images/levy.png',
      nombre: 'Levy',
      edad: '5 años',
      raza: 'Criollo',
      sexo: 'Macho',
      tamano: 'Grande',
      color_ojos: 'Verde',
      tipo_pelaje: 'Pelaje semilargo',
      situacion: 'Esterilizado',
      desparasitado: 'Sí',
      ultima_vac: '15/08/2020',
      descripcion: 'Es muy gordo',
      esquema_vac: 'Refuerzo triple felina',
      tipo_animal: 'Gato',
      owner: '1233511886',
      enAdopcion: false
    },
  ];
  getAnimales(): EntidadAnimal[] {
    return this.animales;
  }
  eliminarAnimal(index: number) {
    this.animales.splice(index, 1);
  }
  agregarAnimal(animal: EntidadAnimal) {
    this.animales.unshift(animal);
  }
  ponerEnAdopcion(index: number, accion: string)
  {
    if(accion == 'publicar')
    {
      this.animales[index].enAdopcion = true;
    }
    if(accion == 'cancelar')
    {
      this.animales[index].enAdopcion = false;
    }
  }

  crearAnimalPerro(
    nombre: string,
    edad: string,
    raza: string,
    sexo: string,
    tamano: string,
    color_ojos: string,
    tipo_pelaje: string,
    situacion: string,
    desparasitado: string,
    ultima_vac: string,
    descripcion: string,
    imagen: File,
    esquema_vac: string,
    tipo_animal: string
  ) {
    const fd = new FormData();
    fd.append('nombre', nombre);
    fd.append('edad', edad);
    fd.append('raza', raza);
    fd.append('sexo', sexo);
    fd.append('tamano', tamano);
    fd.append('color_ojos', color_ojos);
    fd.append('tipo_pelaje', tipo_pelaje);
    fd.append('situacion', situacion);
    fd.append('desparasitado', desparasitado);
    fd.append('ultima_vac', ultima_vac);
    fd.append('descripcion', descripcion);
    fd.append('image', imagen);
    fd.append('esquema_vac', esquema_vac);
    fd.append('tipo_animal', tipo_animal);

    return this.http.post(
      `http://${this.dominio}:${this.puerto}/${this.pathIntermedio}/${this.entidad}/${this.subTipoEntidad}/${this.subTipoEntidadPerro}`,
      fd
    );
  }

  crearAnimalGato(
    nombre: string,
    edad: string,
    raza: string,
    sexo: string,
    tamano: string,
    color_ojos: string,
    tipo_pelaje: string,
    situacion: string,
    desparasitado: string,
    ultima_vac: string,
    descripcion: string,
    imagen: File,
    esquema_vac: string,
    tipo_animal: string
  ) {
    const fd = new FormData();
    fd.append('nombre', nombre);
    fd.append('edad', edad);
    fd.append('raza', raza);
    fd.append('sexo', sexo);
    fd.append('tamano', tamano);
    fd.append('color_ojos', color_ojos);
    fd.append('tipo_pelaje', tipo_pelaje);
    fd.append('situacion', situacion);
    fd.append('desparasitado', desparasitado);
    fd.append('ultima_vac', ultima_vac);
    fd.append('descripcion', descripcion);
    fd.append('image', imagen);
    fd.append('esquema_vac', esquema_vac);
    fd.append('tipo_animal', tipo_animal);
    return this.http.post(
      `http://${this.dominio}:${this.puerto}/${this.pathIntermedio}/${this.entidad}/${this.subTipoEntidad}/${this.subTipoEntidadGato}`,
      fd
    );
  }
}
