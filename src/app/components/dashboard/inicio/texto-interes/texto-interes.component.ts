import {
  Component,
  ElementRef,
  Inject,
  NgZone,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { MapServiceService } from 'src/app/services/map-service.service';
import { PuntoInteres } from 'src/app/components/interfaces/entidadPuntoInteres';
import { MapsAPILoader } from '@agm/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-texto-interes',
  templateUrl: './texto-interes.component.html',
  styleUrls: ['./texto-interes.component.css'],
})
export class TextoInteresComponent implements OnInit {
  @ViewChild('search') searchElementRef: ElementRef | any;
  direccionDevuelta: string | any;
  tituloDevuelta: string | any;
  textoDevuelta: string | any;
  form: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<TextoInteresComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _snackBar: MatSnackBar,
    private fb: FormBuilder,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private _router: Router,
  ) {
    this.form = this.fb.group({
      direccionLugar: [this.data.direccion, Validators.required],
      tituloLugar: [this.data.titulo, Validators.required],
    });
    console.log(this.data.texto);
    this.textoDevuelta = this.data.texto;
  }
  ngOnInit(): void {
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
  }
  guardarTexto(nombre: string) {
    if (nombre == 'aceptar') {
      this.direccionDevuelta = (
        document.getElementById('direccionPunto') as HTMLInputElement
      ).value;
      this.tituloDevuelta = (
        document.getElementById('tituloPunto') as HTMLInputElement
      ).value;
      this.textoDevuelta = (
        document.getElementById('txtInput') as HTMLInputElement
      ).value;
      if (this.direccionDevuelta == '') {
        this._snackBar.open(
          'Proporcione una dirección para el punto de interés',
          '',
          {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
          }
        );
      } else if (this.tituloDevuelta == '') {
        this._snackBar.open('Proporcione un título a su punto de interés', '', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        });
      } else if (this.textoDevuelta == '') {
        this._snackBar.open(
          'Proporcione una descripción de su punto de interés',
          '',
          {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
          }
        );
      } else {
        this.dialogRef.close({
          titulo: this.tituloDevuelta,
          texto: this.textoDevuelta,
          direccion: this.direccionDevuelta,
          accion: nombre,
        });
      }
    }
    if (nombre == 'cancelar') {
      this.dialogRef.close({
        titulo: this.tituloDevuelta,
        texto: this.textoDevuelta,
        direccion: this.direccionDevuelta,
        accion: nombre,
      });
    }
  }
accion(nombre:string)
{
  if(nombre=="confirmar")
  {
    this.dialogRef.close(
      {
        confirmacion: true
      } 
    )
  }
  if(nombre == "cancelar")
  {
    this.dialogRef.close();
  }
}
}
