import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CrearPublicacionService } from 'src/app/services/crear-publicacion.service';
import { PublicacionService } from 'src/app/services/publicacion.service';
import { EntidadPublicacion } from '../../interfaces/entidadPublicacion';
import { ConsejoPreviewComponent } from './consejo-preview/consejo-preview.component';

@Component({
  selector: 'app-consejos',
  templateUrl: './consejos.component.html',
  styleUrls: ['./consejos.component.css']
})
export class ConsejosComponent implements OnInit {
  consejos: EntidadPublicacion[] = [];
  nombreFundacion: string | any;
  logoFundacion: string | any;
  constructor(private consejosService: PublicacionService, public dialog: MatDialog) { }

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

    this.consejosService.getConsejos().subscribe({
      next: (res) => {
        this.consejos = res;
      },
      error: (error) => {
        console.log(error);
      }
    });
    // this.consejos = this.consejosService.getPublicaciones();
    // this.nombreFundacion = "Perritos felices";
    // this.logoFundacion = "../../../assets/Images/fundacion_logo.png"
  }
}
