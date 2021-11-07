import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_TOOLTIP_DEFAULT_OPTIONS_FACTORY } from '@angular/material/tooltip';
import { ActivatedRoute, Router } from '@angular/router';
import { PuntoInteres } from 'src/app/components/interfaces/entidadPuntoInteres';
import { MapServiceService } from 'src/app/services/map-service.service';

@Component({
  selector: 'app-update-punto',
  templateUrl: './update-punto.component.html',
  styleUrls: ['./update-punto.component.css'],
})
export class UpdatePuntoComponent implements OnInit {
  puntoId: string = '';
  puntoDeInteres!: PuntoInteres;
  updatedPunto!: PuntoInteres;

  constructor(
    private activatedRoute: ActivatedRoute,
    private _router: Router,
    private mapService: MapServiceService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.puntoId = params['id'];

      this.mapService.getPuntoById(this.puntoId).subscribe((res) => {
        console.log(res);
        this.puntoDeInteres = res;
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
