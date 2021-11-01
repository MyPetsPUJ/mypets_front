import { Injectable } from '@angular/core';

import { EntidadAnimal } from '../../components/interfaces/usuarios/entidadAnimal';
import { HttpClient } from '@angular/common/http';
import { UserFundacion } from '../../components/interfaces/usuarios/userFundacion';

@Injectable({
  providedIn: 'root',
})
export class AnimalService {
  dominio: string = 'localhost';
  puerto: number = 3000;
  pathApi: string = 'api';
  pathAdoptante: string = 'dashboard-adoptante';
  pathAdoptame: string = 'adoptame';
  pathFundacion: string = 'dashboard';
  pathMisAnimales: string = 'mis-animales';
  pathEditarAnimal: string = 'editar-animal';

  // animales: Animal[] = [
  //   {nombreAnimal: 'Paca', edad: 11, tipo: 'Gato', raza: 'Carey', tamano: 'Pequeño'},
  //   {nombreAnimal: 'Milú', edad: 6, tipo: 'Perro', raza: 'Schnauzer', tamano: 'Mediano'},
  //   {nombreAnimal: 'Aslan', edad: 3, tipo: 'Perro', raza: 'American-Pitubull', tamano: 'Grande'},
  //   {nombreAnimal: 'Pelusa', edad: 11, tipo: 'Gato', raza: 'Maine-Coon', tamano: 'Pequeño'},
  //   {nombreAnimal: 'Levy', edad: 4, tipo: 'Gato', raza: 'Criollo', tamano: 'Grande'},
  // ];
  constructor(private http: HttpClient) {}
  getAnimales() {
    return this.http.get<EntidadAnimal[]>(
      `http://${this.dominio}:${this.puerto}/${this.pathApi}/${this.pathAdoptante}/${this.pathAdoptame}`
    );
  }

  populateAnimales(id: string) {
    return this.http.get<{
      resultado: UserFundacion;
      animales: EntidadAnimal[];
    }>(
      `http://${this.dominio}:${this.puerto}/${this.pathApi}/${this.pathFundacion}/${this.pathMisAnimales}/${id}`
    );
  }

  getAnimalById(id: string) {
    return this.http.get<EntidadAnimal>(
      `http://${this.dominio}:${this.puerto}/${this.pathApi}/${this.pathFundacion}/${this.pathEditarAnimal}/${id}`
    );
  }

  editarAnimal(
    id: string,
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
    // esquema_vac: string,
    descripcion: string,
    imagen: File
  ) {
    if (!imagen) {
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
      // fd.append('esquema_vac', esquema_vac);
      fd.append('descripcion', descripcion);

      return this.http.put(
        `http://${this.dominio}:${this.puerto}/${this.pathApi}/${this.pathFundacion}/${this.pathEditarAnimal}/${id}`,
        fd
      );
    }
    else{
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
      // fd.append('esquema_vac', esquema_vac);
      fd.append('descripcion', descripcion);
      fd.append('image', imagen);

      return this.http.put(
        `http://${this.dominio}:${this.puerto}/${this.pathApi}/${this.pathFundacion}/${this.pathEditarAnimal}/${id}`,
        fd
      );
    }
  }

  // getNombre(index: number): string {
  //   return this.animales[index].nombreAnimal;
  // }
  // eliminarAnimal(index: number) {
  //   this.animales.splice(index, 1);
  // }
  // agregarAnimal(animal: Animal) {
  //   this.animales.unshift(animal);
  // }
}
