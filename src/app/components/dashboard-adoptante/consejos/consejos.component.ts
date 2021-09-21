import { Component, OnInit } from '@angular/core';
import { CrearPublicacionService } from 'src/app/services/crear-publicacion.service';
import { EntidadPublicacion } from '../../interfaces/entidadPublicacion';

@Component({
  selector: 'app-consejos',
  templateUrl: './consejos.component.html',
  styleUrls: ['./consejos.component.css']
})
export class ConsejosComponent implements OnInit {
  consejos: EntidadPublicacion | any;
  nombreFundacion: string | any;
  logoFundacion: string | any;
  constructor(private consejosService: CrearPublicacionService) { }

  ngOnInit(): void {
    this.cargarConsejos();
  }
  cargarConsejos()
  {
    this.consejos = this.consejosService.getPublicaciones();
    this.nombreFundacion = "Perritos felices";
    this.logoFundacion = "../../../assets/Images/fundacion_logo.png"
  }
}
