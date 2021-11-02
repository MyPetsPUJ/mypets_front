import { Component, OnInit } from '@angular/core';
import { CrearAnimalService } from 'src/app/services/animal/crearAnimal.service';
import { EntidadAnimal } from '../../interfaces/usuarios/entidadAnimal';
import { AnimalService } from 'src/app/services/animal/animal.service';
import { MatDialog } from '@angular/material/dialog';
import { AnimalPreviewComponent } from './animal-preview/animal-preview.component';
import { CrearAdoptanteService } from 'src/app/services/adoptante/crearAdoptante.service';
import { LoginService } from 'src/app/services/auth/login.service';
import { EnviarSolicitudAdopcionService } from 'src/app/services/adopcion/enviar-solicitud-adopcion.service';
import { EntidadSolicitudAdopcion } from '../../interfaces/solicitud-adopcion/entidadSolicitudAdopcion';

@Component({
  selector: 'app-adoptame',
  templateUrl: './adoptame.component.html',
  styleUrls: ['./adoptame.component.css'],
})
export class AdoptameComponent implements OnInit {
  animales: EntidadAnimal[] = [];
  userId: string ='';
  nombreFundacion: string | undefined;
  logoFundacion: string | undefined;
  solicitudesAdop: EntidadSolicitudAdopcion[] =[];

  constructor(private animalService: AnimalService,  public dialog: MatDialog,
    private adoptanteService: CrearAdoptanteService, private authService: LoginService,
    private solicitudService: EnviarSolicitudAdopcionService) {}

  ngOnInit(): void {
    // this.cargarAnimalesXFundacion();
    this.userId = this.authService.getUserId();
    
    this.animalService.getAnimales().subscribe({
      next: (res) => {
        console.log(res)
        this.animales = res;
        console.log("animales", this.animales)
      },
      error: (error) => {
        console.log(error);
      }
    });

    this.solicitudService.getSolicitudesAdoptante(this.userId).subscribe({
      next:(res) => {
        this.solicitudesAdop = res;
      },
      error: (error) => {
        console.log(error);
      }
    });
    
  }
  //   cargarAnimalesXFundacion()
  //  {
  //     this.animales = this.animalService.getAnimales();
  //     this.nombreFundacion = 'Perritos Felices';
  //     this.logoFundacion = "../../../assets/Images/fundacion_logo.png"
  //   }
   openPreview(animal: EntidadAnimal | any, solicitudes: EntidadSolicitudAdopcion[]) 
   {

    this.solicitudService.getSolicitudesAdoptante(this.userId).subscribe({
      next:(res) => {
        this.solicitudesAdop = res;
      },
      error: (error) => {
        console.log(error);
      }
    });
    const dialogRef = this.dialog.open(AnimalPreviewComponent, {
      width: '600px',
      height: '500px',
      data: { animal: animal, solicitudes: this.solicitudesAdop}
    });
   }
}
