import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CrearPublicacionService } from 'src/app/services/crear-publicacion.service';
import { EntidadPublicacion } from '../../interfaces/entidadPublicacion';
import { ConsejoPreviewComponent } from './consejo-preview/consejo-preview.component';

@Component({
  selector: 'app-consejos',
  templateUrl: './consejos.component.html',
  styleUrls: ['./consejos.component.css']
})
export class ConsejosComponent implements OnInit {
  consejos: EntidadPublicacion | any;
  nombreFundacion: string | any;
  logoFundacion: string | any;
  constructor(private consejosService: CrearPublicacionService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.cargarConsejos();
  }
  openDialog(publicacion: EntidadPublicacion)
  {
    const dialogRef = this.dialog.open(ConsejoPreviewComponent, {
      width: '600px',
      height: '500px',
      data: { publicacion: publicacion }
    });
  }
  cargarConsejos()
  {
    this.consejos = this.consejosService.getPublicaciones();
    this.nombreFundacion = "Perritos felices";
    this.logoFundacion = "../../../assets/Images/fundacion_logo.png"
  }
}
