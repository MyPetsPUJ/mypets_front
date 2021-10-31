import { MapsAPILoader } from '@agm/core';
import {
  Component,
  ElementRef,
  NgZone,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { UnaryFunction } from 'rxjs';
import { LoginService } from 'src/app/services/auth/login.service';
import { FundacionService } from 'src/app/services/fundacion/fundacion.service';
import { UserFundacion } from '../../interfaces/usuarios/userFundacion';
import { VerFotoComponent } from './ver-foto/ver-foto.component';

@Component({
  selector: 'app-mi-cuenta',
  templateUrl: './mi-cuenta.component.html',
  styleUrls: ['./mi-cuenta.component.css'],
})
export class MiCuentaComponent implements OnInit {
  userId = '';
  inputValue = '';
  fecha: string = '';
  file!: File;
  tipo_doc: string = '';
  photoSelected: string | ArrayBuffer = '';
  fundacion: UserFundacion = {
    nombreFund: '',
    nombreEncar: '',
    apellidosEncar: '',
    tipo_doc: '',
    num_doc: 0,
    fecha_creacion: '',
    latitud: 0,
    longitud: 0,
    distancia: '',
    duracion: '',
    correo: '',
    num_celular: '',
    password: '',
    urlImg: '',
    tipo_usuario: '',
    direccion: '',
    mision: '',
    vision: '',
    publicaciones: [],
    ubicacion: [],
    _id: '',
  };

  form: FormGroup | any;
  documentos: String[] = [
    'Cédula de ciudadanía',
    'Cédula de extranjería',
    'Pasaporte',
  ];
  @ViewChild('search') searchElementRef: ElementRef | any;
  nombreFun: String | any;

  constructor(
    private sanitizer: DomSanitizer,
    private fb: FormBuilder,
    public dialog: MatDialog,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private _router: Router,
    private fundacionService: FundacionService,
    private authService: LoginService
  ) {}
  public archivos: any = [];
  public previsualizacion: string | undefined;

  ngOnInit(): void {
    this.userId = this.authService.getUserId();
    this.fundacionService.getFundacionById(this.userId).subscribe((res) => {
      this.fundacion = res;
      this.fecha = this.fundacion.fecha_creacion;
    });
    // this.nombreFun = 'Perritos felices';
    // var fecha = new Date(2005, 2, 24);

    // this.form = this.fb.group({
    //   nombreFundacion: [this.fundacion.nombreFund, Validators.required],
    //   nombreEncargado: [this.fundacion?.nombreEncar, Validators.required],
    //   apellidosEncargado: ['Vanegas Patiño', Validators.required],
    //   fechaCreacion: [fecha, Validators.required],
    //   localidad: ['8.Kennedy', Validators.required],
    //   correo: ['j_vanegas@javeriana.edu.co', Validators.required],
    //   numCelular: [3205586237, Validators.required],
    //   contrasena: ['12345', Validators.required],
    //   tipo_doc: ['Cédula de ciudadanía',Validators.required],
    //   num_doc:['1233511884',Validators.required],
    //   mision:['Hacer a los animales felices', Validators.required],
    //   vision:['En 5 años ser la fundación más grande de Colombia',Validators.required],
    //   direccionPunto:['Cl 2 #91c-85',Validators.required],

    // })
    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(
        this.searchElementRef.nativeElement,
        { types: ['address'] }
      );
      autocomplete.setComponentRestrictions({ country: ['co'] });
      autocomplete.addListener('place_changed', () => {
        this.ngZone.run(() => {
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();
          if (place.geometry === undefined || place.geometry == null) {
            return;
          } else {
          }
        });
      });
    });
    this.previsualizacion = '../../../assets/Images/pet-hotel.png';
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

  onFileInput(event): any {
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
  verFoto() {
    if (!this.photoSelected) {
      this.dialog.open(VerFotoComponent, {
        width: '500px',
        height: '500px',
        data: { foto: this.fundacion.urlImg },
      });
    } else {
      this.dialog.open(VerFotoComponent, {
        width: '500px',
        height: '500px',
        data: { foto: this.photoSelected },
      });
    }
  }

  updatePerfil(
    nombreFund: HTMLInputElement,
    nombreEncar: HTMLInputElement,
    apellidosEncar: HTMLInputElement,
    tipo_doc: string,
    num_doc: HTMLInputElement,
    mision: HTMLInputElement,
    vision: HTMLInputElement,
    fecha_creacion: HTMLInputElement,
    direccion: HTMLInputElement,
    correo: HTMLInputElement,
    num_celular: HTMLInputElement,
    password: HTMLInputElement
  ) {
    this.fundacionService
      .editarFundacion(
        this.userId,
        nombreFund.value,
        nombreEncar.value,
        apellidosEncar.value,
        tipo_doc,
        num_doc.value,
        mision.value,
        vision.value,
        fecha_creacion.value,
        direccion.value,
        correo.value,
        num_celular.value,
        password.value,
        this.file
      )
      .subscribe((res) => {
        console.log('RESPUESTA', res);
        this._router.navigate(['dashboard']);
      });
  }
}
