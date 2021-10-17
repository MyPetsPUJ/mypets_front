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
  columnas:number=0;
  especie:string[]=["Perro","Gato"];
  color_ojos: any[] = [
    'Azul',
    'Verde',
    'Marrón',
    'Dorado',
    'Negro',
    'Heterocromía',
  ];
  tipo_pelaje: any[] = [
    'Pelaje duro',
    'Pelaje rizado',
    'Pelaje corto',
    'Pelaje largo',
  ];
  valoresColumna1:number[]=[];
  valoresColumna2:number[]=[];
  valoresColumna3:number[]=[];
  validador:number=0;
  nombreFundacion: string | undefined;
  logoFundacion: string | undefined;
  

  constructor(private animalService: AnimalService,  public dialog: MatDialog) { }

  ngOnInit(): void {
    
    this.animalService.getAnimales().subscribe({
      next: (res) => {
        console.log(res)
        this.animales = res;
        this.columnas=this.animales.length;
        console.log(this.validador)
        this.dividirColumnas();
        console.log(this.valoresColumna1)
        console.log(this.valoresColumna2)
        console.log(this.valoresColumna3)
        
      
      },
      error: (error) => {
        console.log(error);
      }
    });
    
  }
  dividirColumnas(): void{
    for(var i=0;i<this.columnas;i++)
    { 
      if(this.validador==0)
      {
        this.valoresColumna1.push(i)
        this.validador++;
      }
      else if(this.validador==1)
      {
        this.valoresColumna2.push(i)
        this.validador++;
      }
      else if(this.validador==2)
      {
        this.valoresColumna3.push(i)
        this.validador=0;
      }
      
      
    }
  }
 
}
