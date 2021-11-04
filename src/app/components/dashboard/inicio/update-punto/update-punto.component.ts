import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  form: FormGroup
  constructor(
    private activatedRoute: ActivatedRoute,
    private _router: Router,
    private mapService: MapServiceService,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group(
      {
        direccionLugar: ['Dirección cualquiera',Validators.required],
        tituloLugar: ['Título cualquiera', Validators.required],
        descripcionLugar: ['Descripción cualquiera',Validators.required]
      }
    )
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.puntoId = params['id'];
      this.mapService.getPuntoById(this.puntoId).subscribe((res) => {
        console.log(res);
        this.puntoDeInteres = res;
      });
    });
  }
}
