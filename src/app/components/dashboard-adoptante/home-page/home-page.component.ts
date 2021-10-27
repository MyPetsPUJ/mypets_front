import { Component, OnInit } from '@angular/core';
import { EntidadAnimal } from '../../interfaces/usuarios/entidadAnimal';
import { AnimalService } from 'src/app/services/animal/animal.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { PreviewAnimalComponent } from './preview-animal/preview-animal.component';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  animales: EntidadAnimal[] = [];
  animales2: EntidadAnimal[] = [];
  columnas:number=0;
  especie:string[]=["Perro","Gato","No importa"];
  color_ojos: any[] = [
    'Azul',
    'Verde',
    'Marrón',
    'Dorado',
    'Negro',
    'Heterocromía',
    'No importa'
  ];
  tipo_pelaje: any[] = [
    'Pelaje duro',
    'Pelaje rizado',
    'Pelaje corto',
    'Pelaje largo',
    'No importa'
  ];
  fundacionesPrueba: any[] = [
    'Perritos Felices',
    'Fundacion CR7'
  ]
  tiempoDeEspera:boolean= false;
  edad:boolean= false;
  valoresColumna1:number[]=[];
  valoresColumna2:number[]=[];
  valoresColumna3:number[]=[];
  validador:number=0;
  nombreFundacion: string | undefined;
  logoFundacion: string | undefined;

  constructor(private animalService: AnimalService, private router: Router, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.animalService.getAnimales().subscribe({
      next: (res) => {
        console.log(res)
        this.animales = res;
        this.columnas=this.animales.length;
        console.log(this.validador)
        this.dividirColumnas();
  
        console.log(this.animales)
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
  openPreview(animal: EntidadAnimal | any) 
   {
    const dialogRef = this.dialog.open(PreviewAnimalComponent, {
      width: '600px',
      height: '500px',
      data: { animal: animal}
    });
   }
   filtrarAnimales(form: NgForm){
    const datosFiltro ={
      especie : form.value.especieAnimal,
      colorOjos: form.value.color_ojos,
      tipoPelaje: form.value.tipo_pelaje,
      organizar : form.value.organizar,
      fundacion : form.value.fundacion
    }
    console.log(datosFiltro);
    this.animales=this.animales2;
    if(datosFiltro.especie != null && datosFiltro.especie != "No importa")
    {
      for(var i=0;i<this.animales.length;i++)
      {
        if(this.animales[i].tipo_animal!=datosFiltro.especie)
        {
            this.animales.splice(i,1);
        }
      }

    }
    if(datosFiltro.colorOjos != null && datosFiltro.colorOjos != "No importa")
    {
      for(var i=0;i<this.animales.length;i++)
      {
        if(this.animales[i].color_ojos!=datosFiltro.colorOjos)
        {
            this.animales.splice(i,1);
        }
      }

    }
    if(datosFiltro.tipoPelaje != null && datosFiltro.tipoPelaje != "No importa")
    {
      for(var i=0;i<this.animales.length;i++)
      {
        if(this.animales[i].tipo_pelaje!=datosFiltro.tipoPelaje)
        {
            this.animales.splice(i,1);
        }
      }

    }
    if(datosFiltro.organizar == "true")
    {
      this.animales.reverse();

    }
    this.ngOnInit();
   }

}
