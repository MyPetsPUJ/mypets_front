import { Component, OnInit } from '@angular/core';
import { EntidadAnimal } from '../../interfaces/usuarios/entidadAnimal';
import { AnimalService } from 'src/app/services/animal/animal.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { PreviewAnimalComponent } from './preview-animal/preview-animal.component';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { FundacionService } from 'src/app/services/fundacion/fundacion.service';
import { UserFundacion } from '../../interfaces/usuarios/userFundacion';
import { LoginService } from 'src/app/services/auth/login.service';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit {
  tipo_usuario: boolean = false;
  animales: EntidadAnimal[] = [];
  animales2: EntidadAnimal[] = [];
  fundaciones: UserFundacion[] = [];
  fundacionNoImporta: UserFundacion = {
    nombreFund: 'No importa',
    nombreEncar: '',
    apellidosEncar: '',
    tipo_doc: '',
    num_doc: 0,
    fecha_creacion: '',
    latitud: 0,
    longitud: 0,
    correo: '',
    distancia: '',
    duracion: '',
    num_celular: '',
    password: '',
    urlImg: '',
    tipo_usuario: '',
    direccion: '',
    mision: '',
    vision: '',
    publicaciones: [],
    ubicacion: '',
    _id: 'No importa',
  };
  columnas: number = 0;
  especie: string[] = ['Perro', 'Gato', 'No importa'];
  color_ojos: any[] = [
    'Azul',
    'Verde',
    'Marrón',
    'Dorado',
    'Negro',
    'Heterocromía',
    'No importa',
  ];
  tipo_pelaje: any[] = [
    'Pelaje duro',
    'Pelaje rizado',
    'Pelaje corto',
    'Pelaje largo',
    'No importa',
  ];
  fundacionesPrueba: any[] = ['Perritos Felices', 'Fundacion CR7'];
  tiempoDeEspera: boolean = false;
  edad: boolean = false;
  valoresColumna1: number[] = [];
  valoresColumna2: number[] = [];
  valoresColumna3: number[] = [];
  validador: number = 0;
  nombreFundacion: string | undefined;
  logoFundacion: string | undefined;
  indicesBorrar: number[] = [];
  estaAlReves: boolean = false;
  borrarAnimal: string[] = [];

  constructor(
    private animalService: AnimalService,
    private router: Router,
    public dialog: MatDialog,
    private fundacionService: FundacionService,
  ) {}

  ngOnInit(): void {
    this.traerFundaciones();
    this.animalService.getAnimales().subscribe({
      next: (res) => {
        this.animales = res;
        this.animales2 = Array.from(this.animales);
        this.columnas = this.animales.length;

        this.dividirColumnas();

        console.log(this.animales);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
  dividirColumnas(): void {
    for (var i = 0; i < this.columnas; i++) {
      if (this.validador == 0) {
        this.valoresColumna1.push(i);
        this.validador++;
      } else if (this.validador == 1) {
        this.valoresColumna2.push(i);
        this.validador++;
      } else if (this.validador == 2) {
        this.valoresColumna3.push(i);
        this.validador = 0;
      }
    }
  }
  openPreview(animal: EntidadAnimal | any) {
    const dialogRef = this.dialog.open(PreviewAnimalComponent, {
      width: '600px',
      height: '500px',
      data: { animal: animal },
    });
  }
  filtrarAnimales(form: NgForm) {
    const datosFiltro = {
      especie: form.value.especieAnimal,
      organizar: form.value.organizar,
      fundacion: form.value.fundacion,
    };

    console.log(datosFiltro);
    this.valoresColumna1 = [];
    this.valoresColumna2 = [];
    this.valoresColumna3 = [];
    this.borrarAnimal = [];
    this.animales = Array.from(this.animales2);
    let tamanoArreglo = this.animales.length;
    let codigoFundacion;
    console.log(datosFiltro.organizar);
    if (datosFiltro.especie != '' && datosFiltro.especie != 'No importa') {
      console.log(this.animales.length);

      for (var i = 0; i < this.animales.length; i++) {
        if (this.animales[i].tipo_animal != datosFiltro.especie) {
          this.borrarAnimal[i] = 'borrar';
        }
      }

      while (tamanoArreglo--) {
        if (this.borrarAnimal[tamanoArreglo] === 'borrar') {
          this.animales.splice(tamanoArreglo, 1);
        }
      }
      tamanoArreglo = this.animales.length;
      this.borrarAnimal = [];
    }
    tamanoArreglo = this.animales.length;
    this.borrarAnimal = [];
    if (
      datosFiltro.fundacion != '' &&
      datosFiltro.fundacion.nombreFund != 'No importa'
    ) {
      for (var i = 0; i < this.animales.length; i++) {
        if (this.animales[i].ownerFundacion != datosFiltro.fundacion._id) {
          this.borrarAnimal[i] = 'borrar';
        }
      }

      while (tamanoArreglo--) {
        if (this.borrarAnimal[tamanoArreglo] === 'borrar') {
          this.animales.splice(tamanoArreglo, 1);
        }
      }
    }
    if (datosFiltro.organizar == true) {
      this.animales.reverse();
      this.estaAlReves = true;
    }
    console.log(this.animales);
    this.columnas = this.animales.length;
    this.dividirColumnas();
  }
  traerFundaciones() {
    this.fundacionService.getFundaciones().subscribe({
      next: (res) => {
        this.fundaciones = res;
        this.fundaciones.push(this.fundacionNoImporta);
        console.log(this.fundaciones);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
