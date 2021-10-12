import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { CrearAdoptanteService } from 'src/app/services/adoptante/crearAdoptante.service';
import { Localidad } from '../../interfaces/datos-app/entidadLocalidad';
import { LocalidadesService } from 'src/app/services/datos-app/localidades.service';
import { DomSanitizer } from '@angular/platform-browser';




@Component({
  selector: 'app-crear-adoptante-reactivo',
  templateUrl: './crear-adoptante-reactivo.component.html',
  styleUrls: ['./crear-adoptante-reactivo.component.css']
})
export class CrearAdoptanteReactivoComponent implements OnInit {
  minDate: Date | any;
  maxDate: Date | any;
  formRegistro = new FormGroup({})
  constructor(private formBuilder: FormBuilder, 
    public crearAdoptanteService: CrearAdoptanteService,
    private sanitizer: DomSanitizer,
    private getLocalidadesService: LocalidadesService) { 

    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 110, 0, 1);
    this.maxDate = new Date(currentYear - 18, 11, 31);

    }
  public archivos: any = [];
  public previsualizacion: string | undefined;
  localidades: Localidad[] = [];

  ngOnInit(): void {
    this.previsualizacion = '../../../assets/Images/adopt.png';
    this.getLocalidadesService.getLocalidadesAdoptante().subscribe(
      (res) => {
        this.localidades = res;
      },
      (err) => console.log(err)
    );
    this.formRegistro= this.formBuilder.group(
      {
        nombre:['',[Validators.required]],
        apellidos:['', [Validators.required]],
        fecha_nacimiento:['', [Validators.required]],
        tipo_doc:['', [Validators.required]],
        num_doc:['',[Validators.required]],
        genero:['', [Validators.required]],
        localidad:['', [Validators.required, Validators.email]],
        correo:['', [Validators.required]],
        num_celular:['', [Validators.required]],
        password:['', [Validators.required]],
    });
  }
  tiles: any[] = [
    { text: 'One', cols: 3, rows: 1, color: 'lightblue' },
    { text: 'Two', cols: 1, rows: 2, color: 'lightgreen' },
    { text: 'Three', cols: 1, rows: 1, color: 'lightpink' },
    { text: 'Four', cols: 2, rows: 1, color: '#DDBDF1' },
  ];
  selectedValue: string | undefined;
  selectedCar: string | undefined;

  genero: any[] = ['Masculino', 'Femenino'];
  tipo_doc: any[] = ['Cédula de ciudadanía', 'Cédula de extranjería'];

  send(): any{
    console.log(this.formRegistro.value)
  }
  sendForm(): any{
    /*
    const datosAdoptante = {
      nombre: this.formRegistro.value.nombre,
      apellidos: this.formRegistro.value.apellidos,
      fecha_nacimiento: this.formRegistro.value.fecha_nac,
      tipo_doc: this.formRegistro.value.tipo_doc,
      num_doc: this.formRegistro.value.num_doc,
      genero: this.formRegistro.value.genero,
      localidad: this.formRegistro.value.localidad,
      correo: this.formRegistro.value.correo,
      num_celular: this.formRegistro.value.num_cel,
      password: this.formRegistro.value.password,
      tipo_usuario: 'Adoptante',
    };
    this.crearAdoptanteService.crearUsuarioAdoptante(datosAdoptante);
    **/
  }
  onFileInput(event):any{
     const archivo = event.target.files[0];
      this.archivos.push(archivo);
      this.extraerBase64(archivo).then((imagen: any) => {
      this.previsualizacion = imagen.base;
    });

  }
  extraerBase64 = async ($event: any) =>
  new Promise((resolve) => {
    try {
      const unsafeImg = window.URL.createObjectURL($event);
      const image = this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
      const reader = new FileReader();
      reader.readAsDataURL($event);
      reader.onload = () => {
        resolve({
          base: reader.result,
        });
      };
      reader.onerror = (error) => {
        resolve({
          base: null,
        });
      };
      return resolve;
    } catch (e) {
      return null;
    }
  });

}
