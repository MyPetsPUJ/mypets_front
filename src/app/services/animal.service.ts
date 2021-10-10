import { Injectable } from '@angular/core';
import { Animal } from '../components/interfaces/usuario';
import { EntidadAnimal } from '../components/interfaces/entidadAnimal';
import { HttpClient } from '@angular/common/http';
import { UserFundacion } from '../components/interfaces/userFundacion';

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
