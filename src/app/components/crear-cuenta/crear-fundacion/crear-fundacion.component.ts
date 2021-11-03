import {
  Component,
  ElementRef,
  NgZone,
  OnInit,
  ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { MapsAPILoader } from '@agm/core';
declare var google: any;

import { CrearFundacionService } from 'src/app/services/fundacion/crearFundacion.service';
import { LocalidadesService } from 'src/app/services/datos-app/localidades.service';
import { Localidad } from '../../interfaces/datos-app/entidadLocalidad';
import { Router } from '@angular/router';
import { TipoDocsService } from 'src/app/services/datos-app/tipo-docs.service';
import { TipoDoc } from '../../interfaces/datos-app/entidadTipoDoc';
import { DatosCrearFundacionService } from 'src/app/services/datos-app/datos-crear-fundacion.service';

interface HtmlInputEvent extends Event {
  target: (HTMLInputElement & EventTarget) | null;
}

@Component({
  selector: 'app-crear-fundacion',
  templateUrl: './crear-fundacion.component.html',
  styleUrls: ['./crear-fundacion.component.css'],
})
export class CrearFundacionComponent implements OnInit {
  maxDate: Date | any;
  tipo_docs: TipoDoc[] = [];
  public previsualizacion: string | undefined;
  file!: File;
  photoSelected: string | ArrayBuffer = '';
  localidades: Localidad[] = [];
  latitud: number | any;
  longitud: number | any;

  constructor(
    public crearFundacionService: CrearFundacionService,
    private sanitizer: DomSanitizer,
    private getDatosService: DatosCrearFundacionService,
    private getTipoDocService: TipoDocsService,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private _router: Router
  ) {
    const currentYear = new Date().getFullYear();
    this.maxDate = new Date();
  }
  //public archivos: any = [];

  @ViewChild('search')
  public searchElementRef: ElementRef | any;
  ngOnInit(): void {
    this.previsualizacion = '../../../assets/Images/chat.png';
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
            this.longitud = place.geometry.location?.lng();
            this.latitud = place.geometry.location?.lat();
          }
        });
      });
    });
    this.getDatosService.getDatos().subscribe(
      (res) => {
        this.tipo_docs = res.tipo_docs;
      },
      (err) => console.log(err)
    );
  }

  onSignUp(form: NgForm) {
    console.log(this.latitud);
    console.log(this.longitud);
    console.log(form.value);
    if (form.invalid) {
      return;
    }

    this.crearFundacionService
      .crearUsuarioFundacion(
        form.value.nombreFun,
        form.value.nombreEncar,
        form.value.apellidos,
        form.value.tipo_doc.nombre,
        form.value.num_doc,
        form.value.fecha_creacion,
        form.value.direccion,
        form.value.mision,
        form.value.vision,
        form.value.correo,
        form.value.num_cel,
        form.value.contrasena,
        this.file,
        'Fundacion'
      )
      .subscribe((respuesta) => {
        console.log(respuesta);
        (err) => console.log(err);
        // const token = respuesta.token;
        // this.token = token;
      });
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
