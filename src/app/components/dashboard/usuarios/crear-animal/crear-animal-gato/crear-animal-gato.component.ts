import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-crear-animal-gato',
  templateUrl: './crear-animal-gato.component.html',
  styleUrls: ['./crear-animal-gato.component.css']
})
export class CrearAnimalGatoComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  edad: any [] = ['menos de 1 mes ', '1 mes', '2 meses', '3 meses'
  , '4 meses', '5 meses', '6 meses', '7 meses', '8 meses', '9 meses', '10 meses', 
  '11 meses', '1 año',  '2 años',  '3 años',  '4 años',  '5 años',  '6 años',  '7 años',  '8 años',
  '9 años',  '10 años',  '11 años',  '12 años', '13 años', '14 años', '15 años', 'más de 15 años'];
  tipo: any[] = ['Perro', 'Gato'];
  genero: any [] = ['Macho','Hembra'];
  vacunas: any[] = ['Ninguno','Triple felina'];
  situacion: any[] = ['Sin esterilizar','Esterilizado'];
}
