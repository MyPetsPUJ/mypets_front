import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EntidadPublicacion } from 'src/app/components/interfaces/entidadPublicacion';
import { PublicacionService } from 'src/app/services/publicacion/publicacion.service';

@Component({
  selector: 'app-consejo-preview',
  templateUrl: './consejo-preview.component.html',
  styleUrls: ['./consejo-preview.component.css'],
})
export class ConsejoPreviewComponent implements OnInit {
  consejo!: EntidadPublicacion;
  consejoId: string = '';
  constructor(
    private consejoService: PublicacionService,
    private activatedRoute: ActivatedRoute,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.consejoId = params['id'];
      this.consejoService
        .getConsejo(this.consejoId)
        .subscribe((res) => {
          console.log(res)
          this.consejo = res;
        });
    });
  }

  
}
