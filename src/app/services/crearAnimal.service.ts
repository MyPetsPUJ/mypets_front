import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

import { EntidadAnimal } from '../components/interfaces/entidadAnimal';

@Injectable({
  providedIn: 'root'
})
export class CrearAnimalService {
  private token: string = "";
  dominio: string = "localhost";
  puerto: number = 3000;
  pathIntermedio: string = "api";
  entidad: string = "dashboard";
  subTipoEntidad: string = "seleccion-animal";              //TODO cambiar rutas en front y back end
  subTipoEntidadII: string = "crear-animal-perro"; 
  subTipoEntidadGato: string = "crear-animal-gato";
  
  constructor(private http: HttpClient) {
  }
  animales: EntidadAnimal[] = [
    {foto: '../../../assets/Images/paca.png',nombre:'Paca', edad: '11 años', raza: 'Carey', sexo: 'Hembra', tamano: 'Pequeño',color_ojos: 'Negro'
      ,tipo_pelaje:'Pelaje corto',situacion:'Esterilizado',desparasitado:'Sí',ultima_vac: '15/02/2020',descripcion:'Es muy linda', 
      esquema_vac:'Triple felina',tipo_animal:'Gato'},
    {foto: '../../../assets/Images/milu.png',nombre:'Milú', edad: '5 años', raza: 'Schnauzer', sexo: 'Hembra', tamano: 'Pequeño',color_ojos: 'Negro'
      ,tipo_pelaje:'Pelaje largo',situacion:'Esterilizado',desparasitado:'Sí',ultima_vac: '02/02/2020',descripcion:'Es muy juguetona', 
      esquema_vac:'Rabia',tipo_animal:'Perro'},
    {foto: '../../../assets/Images/aslan.png',nombre:'Aslan', edad: '3 años', raza: 'Pitbull', sexo: 'Macho', tamano: 'Mediano',color_ojos: 'Negro'
      ,tipo_pelaje:'Pelaje corto',situacion:'Esterilizado',desparasitado:'Sí',ultima_vac: '15/02/2020',descripcion:'Es muy cariñoso', 
      esquema_vac:'Rabia',tipo_animal:'Perro'},
    {foto: '../../../assets/Images/akino.png',nombre:'Akino', edad: '4 meses', raza: 'Criollo', sexo: 'Macho', tamano: 'Pequeño',color_ojos: 'Negro'
      ,tipo_pelaje:'Pelaje semilargo',situacion:'Sin Esterilizar',desparasitado:'Sí',ultima_vac: 'No aplica',descripcion:'Es muy cansón', 
      esquema_vac:'Ninguno',tipo_animal:'Gato'},
    {foto: '../../../assets/Images/levy.png',nombre:'Levy', edad: '5 años', raza: 'Criollo', sexo: 'Macho', tamano: 'Grande',color_ojos: 'Verde'
      ,tipo_pelaje:'Pelaje semilargo',situacion:'Esterilizado',desparasitado:'Sí',ultima_vac: '15/08/2020',descripcion:'Es muy gordo', 
      esquema_vac:'Refuerzo triple felina',tipo_animal:'Gato'},
  ];
  getAnimales(): EntidadAnimal[]
  {
    return this.animales;
  }
  eliminarAnimal(index: number)
  {
    this.animales.splice(index,1);
  }
  agregarAnimal(animal: EntidadAnimal)
  {
    this.animales.unshift(animal);
  }

  crearAnimalPerro(entidadAnimal: EntidadAnimal)
    {
    this.http.post(`http://${this.dominio}:${this.puerto}/${this.pathIntermedio}/${this.entidad}/${this.subTipoEntidad}/${this.subTipoEntidadII}`, entidadAnimal)
    .subscribe(respuesta => {
      console.log(respuesta);
    })
  }

  crearAnimalGato(entidadAnimal: EntidadAnimal)
    {
    this.http.post(`http://${this.dominio}:${this.puerto}/${this.pathIntermedio}/${this.entidad}/${this.subTipoEntidad}/${this.subTipoEntidadGato}`, entidadAnimal)
    .subscribe(respuesta => {
      console.log(respuesta);
    })
  }

}
