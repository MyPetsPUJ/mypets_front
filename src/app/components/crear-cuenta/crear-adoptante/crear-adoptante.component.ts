import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { CrearAdoptanteService } from 'src/app/services/adoptante/crearAdoptante.service';
import { Localidad } from '../../interfaces/datos-app/entidadLocalidad';
import { Genero } from '../../interfaces/datos-app/entidadGenero';
import { DatosCrearAdoptanteService } from 'src/app/services/datos-app/datos-crear-adoptante.service';
import { TipoDoc } from '../../interfaces/datos-app/entidadTipoDoc';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-adoptante',
  templateUrl: './crear-adoptante.component.html',
  styleUrls: ['./crear-adoptante.component.css'],
})
export class CrearAdoptanteComponent implements OnInit {
  minDate: Date | any;
  maxDate: Date | any;
  generos: Genero[] = [];
  localidadesBack: Localidad[] = [];
  tipo_docs: TipoDoc[] = [];
  file!: File;
  photoSelected: string | ArrayBuffer = '';

  constructor(
    public crearAdoptanteService: CrearAdoptanteService,
    private sanitizer: DomSanitizer,
    private getDatosService: DatosCrearAdoptanteService,
    private _router: Router
  ) {
    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 110, 0, 1);
    this.maxDate = new Date(currentYear - 18, 11, 31);
  }
  public archivos: any = [];
  public previsualizacion: string | any;
  // localidades: Localidad[] = [];
  ngOnInit(): void {
    this.previsualizacion = '../../../assets/Images/adopt.png';
    this.cargarDatos();
  }
  tiles: any[] = [
    { text: 'One', cols: 3, rows: 1, color: 'lightblue' },
    { text: 'Two', cols: 1, rows: 2, color: 'lightgreen' },
    { text: 'Three', cols: 1, rows: 1, color: 'lightpink' },
    { text: 'Four', cols: 2, rows: 1, color: '#DDBDF1' },
  ];
  selectedValue: string | undefined;
  selectedCar: string | undefined;

  cargarDatos() {
    this.getDatosService.getDatos().subscribe((res) => {
      this.generos = res.generos;
      this.tipo_docs = res.tipo_docs;
      this.localidadesBack = res.localidades;
    });
  }

  onSignUp(form: NgForm) {
    console.log(form.value);
    if (form.invalid) {
      return;
    }

    //TODO pasar objetos y no params
    //this.authservice.crearUsuarioAdoptante(datosAdoptante);
    this.crearAdoptanteService.crearUsuarioAdoptante(
      form.value.nombre,
      form.value.apellidos,
      form.value.fecha_nac,
      form.value.tipo_doc,
      form.value.num_doc,
      form.value.genero,
      form.value.localidad,
      form.value.num_cel,
      form.value.correo,
      form.value.password,
      this.file,
      'Adoptante'
    );
    this._router.navigate(['/login']);
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
}
