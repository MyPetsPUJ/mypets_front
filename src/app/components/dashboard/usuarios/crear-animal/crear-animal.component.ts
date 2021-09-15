import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';

import { CrearAnimalService } from 'src/app/services/crearAnimal.service';

export interface Vacuna_box{
  nombre: String;
  completado: boolean;
  color: ThemePalette;
  esquema?: Vacuna_box[];
}

@Component({
  selector: 'app-crear-animal',
  templateUrl: './crear-animal.component.html',
  styleUrls: ['./crear-animal.component.css']
})

export class CrearAnimalComponent implements OnInit {
  minDate: Date | any;
  maxDate: Date | any;
  constructor(public crearPerroService: CrearAnimalService) 
  {
    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 19, 0, 1);
    this.maxDate = new Date();
  }

  ngOnInit(): void {
  }
  tiles: any[] = [
    {text: 'One', cols: 3, rows: 1, color: 'lightblue'},
    {text: 'Two', cols: 1, rows: 2, color: 'lightgreen'},
    {text: 'Three', cols: 1, rows: 1, color: 'lightpink'},
    {text: 'Four', cols: 2, rows: 1, color: '#DDBDF1'},
  ];
  edad: any [] = ['menos de 1 mes ', '1 mes', '2 meses', '3 meses'
  , '4 meses', '5 meses', '6 meses', '7 meses', '8 meses', '9 meses', '10 meses', 
  '11 meses', '1 año',  '2 años',  '3 años',  '4 años',  '5 años',  '6 años',  '7 años',  '8 años',
  '9 años',  '10 años',  '11 años',  '12 años', '13 años', '14 años', '15 años', 'más de 15 años'];
  tipo: any[] = ['Perro', 'Gato'];
  genero: any [] = ['Macho','Hembra'];
  tamano: any[] = ['Pequeño', 'Mediano', 'Grande'];
  color_ojos: any[] = ['Azul', 'Verde', 'Marrón', 'Dorado', 'Negro', 'Heterocromía'];
  tipo_pelaje: any[] = ['Pelaje duro', 'Pelaje rizado', 'Pelaje corto', 'Pelaje largo'];
  lista_vacunas: any[] = ['Moquillo canino', 'Hepatitis', 'Parvovirosis', 'Leptospirosis', 'Rabia']

   
  desparasitado: any[] = ['Sí', 'No'];
  situacion: any[] = ['Sin esterilizar','Esterilizado'];

  onCrearPerro(form: NgForm){
    console.log(form.value);
    if(form.invalid){
      return;
    }
    const datosPerro = {foto: '',nombre: form.value.nombre, edad: form.value.edad, raza: form.value.raza, sexo: form.value.sexo, tamano: form.value.tamano, color_ojos: form.value.color_ojos, tipo_pelaje: form.value.tipo_pelaje, situacion: form.value.situacion, desparasitado: form.value.desparasitado, ultima_vac: form.value.ultima_vac, descripcion: form.value.descripcion, esquema_vac: form.value.esquema_vac, tipo_animal: "Perro"}
    this.crearPerroService.crearAnimalPerro(datosPerro);

  }
}
