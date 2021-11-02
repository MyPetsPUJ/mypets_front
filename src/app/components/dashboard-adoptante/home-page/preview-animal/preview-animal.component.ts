import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { LoginService } from 'src/app/services/auth/login.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmarSolicitudComponent } from './confirmar-solicitud/confirmar-solicitud.component';
import { EntidadAnimal } from 'src/app/components/interfaces/usuarios/entidadAnimal';
import { EnviarSolicitudAdopcionService } from 'src/app/services/adopcion/enviar-solicitud-adopcion.service';
import { EntidadSolicitudAdopcion } from 'src/app/components/interfaces/solicitud-adopcion/entidadSolicitudAdopcion';
@Component({
  selector: 'app-preview-animal',
  templateUrl: './preview-animal.component.html',
  styleUrls: ['./preview-animal.component.css']
})
export class PreviewAnimalComponent implements OnInit, OnDestroy {

  usuarioAutenticado: boolean = false;
  userId: string = '';
  solicitudesAdop: EntidadSolicitudAdopcion[] =[];
  private authListenerSubs: Subscription | undefined;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialog: MatDialog, private authService: LoginService,
  private solicitudService: EnviarSolicitudAdopcionService, public dialogRef: MatDialogRef<PreviewAnimalComponent>) { }

  ngOnInit(): void {
      this.usuarioAutenticado = this.authService.getIsAuth();
      this.userId = this.authService.getUserId();
      this.authListenerSubs = this.authService.getAuthStatusListener().subscribe(isAuth => {
      this.usuarioAutenticado = isAuth;
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
  ngOnDestroy(){
    this.authListenerSubs?.unsubscribe();
  }
  accion(nombre: string)
  {
    if(nombre == 'cerrar')
    {
      this.dialogRef.close();
    }
  }
  actualizar()
  {
    this.solicitudService.getSolicitudesAdoptante(this.userId).subscribe({
      next:(res) => {
        this.solicitudesAdop = res;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  openCompromiso(animal: EntidadAnimal | any, solicitudes: EntidadSolicitudAdopcion[]) 
   {
    this.actualizar();

    const dialogRef = this.dialog.open(ConfirmarSolicitudComponent, {
      width: '500px',
      height: '355px',
      data: { animal: animal, solicitudes:solicitudes}
    });
    this.dialogRef.close();
    
   }
}
