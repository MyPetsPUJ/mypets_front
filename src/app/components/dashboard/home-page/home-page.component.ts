import { Component, OnInit } from '@angular/core';
import { EntidadAnimal } from '../../interfaces/usuarios/entidadAnimal';
import { AnimalService } from 'src/app/services/animal/animal.service';
import { MatDialog } from '@angular/material/dialog';



@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  users: string[] = ['Felipe Perez','Andres Castro','Felipe Vanegas'];
  animales: EntidadAnimal[] = [];
  columnas: number=this.animales.length;
  nombreFundacion: string | undefined;
  logoFundacion: string | undefined;
  

  constructor(private animalService: AnimalService,  public dialog: MatDialog) { }

  ngOnInit(): void {
    this.animalService.getAnimales().subscribe({
      next: (res) => {
        console.log(res)
        this.animales = res;
        console.log("animales", this.animales)
      
      },
      error: (error) => {
        console.log(error);
      }
    });
    
  }
 
}
