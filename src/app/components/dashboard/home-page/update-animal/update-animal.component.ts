import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EntidadAnimal } from 'src/app/components/interfaces/usuarios/entidadAnimal';
import { AnimalService } from 'src/app/services/animal/animal.service';

@Component({
  selector: 'app-update-animal',
  templateUrl: './update-animal.component.html',
  styleUrls: ['./update-animal.component.css'],
})
export class UpdateAnimalComponent implements OnInit {
  aux: boolean = false;
  tipo_animal: string = 'Gato';
  file!: File;
  animal!: EntidadAnimal;
  animalId: string = '';
  edadAnimal: string = '';
  generoAnimal: string = '';
  tamanoAnimal: string = '';
  colorOjosAnimal: string = '';
  tipoPeloAnimal: string = '';
  situacionAnimal: string = '';
  desparasitadoAnimal: string = '';
  photoSelected: string | ArrayBuffer = '';
  edad: any[] = [
    'menos de 1 mes ',
    '1 mes',
    '2 meses',
    '3 meses',
    '4 meses',
    '5 meses',
    '6 meses',
    '7 meses',
    '8 meses',
    '9 meses',
    '10 meses',
    '11 meses',
    '1 año',
    '2 años',
    '3 años',
    '4 años',
    '5 años',
    '6 años',
    '7 años',
    '8 años',
    '9 años',
    '10 años',
    '11 años',
    '12 años',
    '13 años',
    '14 años',
    '15 años',
    'más de 15 años',
  ];
  tipo: any[] = ['Perro', 'Gato'];
  genero: any[] = ['Macho', 'Hembra'];
  tamano: any[] = ['Pequeño', 'Mediano', 'Grande'];
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
  lista_vacunas_perro: any[] = [
    'Moquillo canino',
    'Hepatitis',
    'Parvovirosis',
    'Leptospirosis',
    'Rabia',
  ];
  lista_vacunas_gato: any[] = [
    'Leucemia viral felina',
    'Triple felina',
    'Segunda dosis leucemia',
    'Refuerzo triple felina',
    'Rabia',
  ];

  previsualizacion: string = '';
  minDate: Date | any;
  maxDate: Date | any;
  desparasitado: any[] = ['Sí', 'No'];
  situacion: any[] = ['Sin esterilizar', 'Esterilizado'];
  constructor(
    private activatedRoute: ActivatedRoute,
    private _router: Router,
    private animalService: AnimalService
  ) {
    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 19, 0, 1);
    this.maxDate = new Date();
  }

  generos: any[] = ['Masculino', 'Femenino'];

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.animalId = params['id'];
      this.animalService.getAnimalById(this.animalId).subscribe((res) => {
        this.previsualizacion = res.urlImg;
        this.animal = res;
        this.edadAnimal = res.edad;
        this.colorOjosAnimal = res.color_ojos;
        this.generoAnimal = res.sexo;
        this.situacionAnimal = res.situacion;
        this.desparasitadoAnimal = res.desparasitado;
        this.tamanoAnimal = res.tamano;
        this.tipoPeloAnimal = res.tipo_pelaje;
        if (res.tipo_animal == this.tipo_animal) {
          this.aux = true;
        }
      });
    });
  }

  onPhotoSelected(event: any): void {
    if (event.target?.files && event.target.files[0]) {
      this.file = <File>event.target.files[0];
      //image preview
      const reader = new FileReader();
      reader.onload = (e) => (this.photoSelected = reader.result as string);
      reader.readAsDataURL(this.file);
    }
  }

  editarAnimal(
    nombre: HTMLInputElement,
    edadAnimal: string,
    raza: HTMLInputElement,
    generoAnimal: string,
    tamanoAnimal: string,
    colorOjosAnimal: string,
    tipoPeloAnimal: string,
    situacionAnimal: string,
    desparasitadoAnimal: string,
    ultima_vac: HTMLInputElement,
    descripcion: HTMLTextAreaElement
  ) {
    this.animalService.editarAnimal(
      this.animalId,
      nombre.value,
      edadAnimal,
      raza.value,
      generoAnimal,
      tamanoAnimal,
      colorOjosAnimal,
      tipoPeloAnimal,
      situacionAnimal,
      desparasitadoAnimal,
      ultima_vac.value,
      descripcion.value,
      this.file
    ).subscribe((res)=>{
      console.log(res)
      this._router.navigate(['dashboard']);
    })
  }
}
