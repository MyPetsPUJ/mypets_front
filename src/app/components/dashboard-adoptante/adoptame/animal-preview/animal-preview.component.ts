import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { FormularioAdopcion } from 'src/app/components/interfaces/formularios/formularioAdopcion';
import { EntidadSolicitudAdopcion } from 'src/app/components/interfaces/solicitud-adopcion/entidadSolicitudAdopcion';
import { EntidadAnimal } from 'src/app/components/interfaces/usuarios/entidadAnimal';
import { EnviarSolicitudAdopcionService } from 'src/app/services/adopcion/enviar-solicitud-adopcion.service';
import { LoginService } from 'src/app/services/auth/login.service';

@Component({
  selector: 'app-animal-preview',
  templateUrl: './animal-preview.component.html',
  styleUrls: ['./animal-preview.component.css']
})
export class AnimalPreviewComponent implements OnInit, OnDestroy {

  usuarioAutenticado: boolean = false;
  userId: string = '';
  private authListenerSubs: Subscription | undefined;
  enviado: boolean | undefined = false;
  solicitudAdop: EntidadSolicitudAdopcion | undefined
  form: FormularioAdopcion | any;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private authService: LoginService, 
  private solicitudService: EnviarSolicitudAdopcionService) { 
      
  }

  ngOnInit(): void {
    this.usuarioAutenticado = this.authService.getIsAuth();
    this.userId = this.authService.getUserId();
    this.authListenerSubs = this.authService.getAuthStatusListener().subscribe(isAuth => {
      this.usuarioAutenticado = isAuth;
    });
      for(var i = 0; i < this.solicitudService.getSolicitudesQuemadas().length; i++)
      {
        if(this.solicitudService.getSolicitudesQuemadas()[i].adoptante == this.data.adoptante
           && this.solicitudService.getSolicitudesQuemadas()[i].animal == this.data.animal)
        {
          this.enviado = true;
        }
      }
    
  }

  ngOnDestroy(){
    this.authListenerSubs?.unsubscribe();
  }
  solicitud(animal: EntidadAnimal,accion: string)
  {
    if(accion == 'enviar')
    {
      this.solicitudAdop = 
      {
        adoptante: this.data.adoptante,
        idFundacion:"123",
        animal: animal,
        formulario: this.form,
        fecha: Date().toLocaleString(),
        estado: 'En espera',
      }
      this.solicitudService.addSolicitud(this.solicitudAdop);
      this.enviado = true;
    }
    if(accion == 'cancelar')
    {
      this.solicitudService.deleteSolicitud(this.data.adoptante, animal);
      this.enviado = false;
    }
  }
}
