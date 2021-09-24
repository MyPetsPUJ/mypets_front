import { Component, OnInit } from '@angular/core';
import { CrearAnimalService } from 'src/app/services/crearAnimal.service';
import { EntidadAnimal } from '../../interfaces/entidadAnimal';
import { AnimalService } from 'src/app/services/animal.service';

@Component({
  selector: 'app-adoptame',
  templateUrl: './adoptame.component.html',
  styleUrls: ['./adoptame.component.css'],
})
export class AdoptameComponent implements OnInit {
  animales: EntidadAnimal[] = [];
  nombreFundacion: string | undefined;
  logoFundacion: string | undefined;
  constructor(private animalService: AnimalService) {}
  ngOnInit(): void {
    //this.cargarAnimalesXFundacion()
    this.animalService.getAnimales().subscribe({
      next: (res) => {
        this.animales = res;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }
  // cargarAnimalesXFundacion()
  // {
  //   this.animales = this.animalService.getAnimales();
  //   this.nombreFundacion = 'Perritos Felices';
  //   this.logoFundacion = "../../../assets/Images/fundacion_logo.png"
  // }
}
