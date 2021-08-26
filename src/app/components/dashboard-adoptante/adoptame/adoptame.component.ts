import { Component, OnInit } from '@angular/core';
import { CrearAnimalService } from 'src/app/services/crearAnimal.service';
import { EntidadAnimal } from '../../interfaces/entidadAnimal';

@Component({
  selector: 'app-adoptame',
  templateUrl: './adoptame.component.html',
  styleUrls: ['./adoptame.component.css']
})
export class AdoptameComponent implements OnInit {
  animales:EntidadAnimal[] = [];
  nombreFundacion:string |undefined;
  logoFundacion:string |undefined;
  constructor(private animalService: CrearAnimalService) { }
  ngOnInit(): void {
    this.cargarAnimalesXFundacion()
  }
  cargarAnimalesXFundacion()
  {
    this.animales = this.animalService.getAnimales();
    this.nombreFundacion = 'Perritos Felices';
    this.logoFundacion = "../../../assets/Images/fundacion_logo.png"
  }

}
