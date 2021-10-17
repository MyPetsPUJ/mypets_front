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
  columnas:number=this.animales.length;
  valoresColumna1:number[]=[];
  valoresColumna2:number[]=[];
  valoresColumna3:number[]=[];
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
  dividirColumnas(): void{
    for(var i=1;i<=this.animales.length;i+3)
    { 
      this.valoresColumna1.push(i);
      this.valoresColumna2.push(i+2);
      this.valoresColumna3.push(i+3);

      if(this.animales.length - i < 3 )
      {
        this.valoresColumna2.push(i+4)
        this.valoresColumna3.push(i+5)
        this.valoresColumna1.push(i+6)
        break;
      }
      if(this.animales.length - i < 2 )
      {
        this.valoresColumna2.push(i+4)
        this.valoresColumna1.push(i+5)
        break;
      }
      if(this.animales.length - i < 1 )
      {
        this.valoresColumna2.push(i+4)
        break;
      }
      
    }
  }
 
}
