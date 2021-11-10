import { MapsAPILoader } from '@agm/core';
import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_TOOLTIP_DEFAULT_OPTIONS_FACTORY } from '@angular/material/tooltip';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { take } from 'rxjs/operators';
import { PuntoInteres } from 'src/app/components/interfaces/entidadPuntoInteres';
import { MapServiceService } from 'src/app/services/map-service.service';

@Component({
  selector: 'app-update-punto',
  templateUrl: './update-punto.component.html',
  styleUrls: ['./update-punto.component.css'],
})
export class UpdatePuntoComponent implements OnInit {
  @ViewChild('search') searchElementRef: ElementRef | any;
  puntoId: string = '';
  puntoDeInteres!: PuntoInteres;
  updatedPunto!: PuntoInteres;
  subject = new Subject<any>();
  constructor(
    private activatedRoute: ActivatedRoute,
    private _router: Router,
    private mapService: MapServiceService,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone
  ) {}

  async ngOnInit(): Promise<void> {
    var info;
    
    this.activatedRoute.params.subscribe(async (params) => {
      
      this.puntoId = params['id'];

      this.mapService.getPuntoById(this.puntoId).subscribe((res) => {
        console.log(res);
        this.puntoDeInteres = res;
        this.subject.next(res);
      });
      this.subject.next( await this.subject.asObservable().pipe(take(1)).toPromise());
    });
    var info = await this.subject.asObservable().pipe(take(1)).toPromise();
    this.puntoDeInteres = info;
    console.log('Esta es la info sacada: ', this.puntoDeInteres)
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

  editarPunto(
    direccion: HTMLInputElement,
    titulo: HTMLInputElement,
    descripcion: HTMLTextAreaElement
  ) {
    this.puntoDeInteres.titulo = titulo.value;
    this.puntoDeInteres.descripcion = descripcion.value;
    this.puntoDeInteres.direccion = direccion.value;

    this.mapService
      .editarPunto(this.puntoId, this.puntoDeInteres)
      .subscribe((res) => console.log('Res: ', res));
  }
}
