import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { FormularioAdopcion } from 'src/app/components/interfaces/formularios/formularioAdopcion';
import { EntidadSolicitudAdopcion } from 'src/app/components/interfaces/solicitud-adopcion/entidadSolicitudAdopcion';
import { EntidadAnimal } from 'src/app/components/interfaces/usuarios/entidadAnimal';
import { UserAdoptante } from 'src/app/components/interfaces/usuarios/userAdoptante';
import { EnviarSolicitudAdopcionService } from 'src/app/services/adopcion/enviar-solicitud-adopcion.service';
import { CrearAdoptanteService } from 'src/app/services/adoptante/crearAdoptante.service';
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
  solicitudAdop: EntidadSolicitudAdopcion | undefined;
  solicitudesAdop: EntidadSolicitudAdopcion[] =[];
  form: FormularioAdopcion | any;
  userAdoptante : UserAdoptante = {
    nombre: '',
    foto: '',
    apellidos: '',
    fecha_nacimiento: '',
    tipo_doc: '',
    num_doc: '',
    genero: '',
    localidad: '',
    correo: '',
    num_celular: '',
    password: '',
    tipo_usuario: '',
    animales: [],
    solicitudesAdoptante:[]
  };
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private authService: LoginService, 
  private solicitudService: EnviarSolicitudAdopcionService, private adoptanteService: CrearAdoptanteService) {  
  }

  ngOnInit(): void {
    this.usuarioAutenticado = this.authService.getIsAuth();
    this.userId = this.authService.getUserId();
    this.authListenerSubs = this.authService.getAuthStatusListener().subscribe(isAuth => {
      this.usuarioAutenticado = isAuth;
    });
    this.adoptanteService.getAdoptanteById(this.userId).subscribe({
      next: (res) => {
        this.userAdoptante = res;
      },
      error: (error) => {
        console.log(error);
      }
    });

    console.log("solicitudes",this.data.solicitudes);

    for(var i = 0; i < this.data.solicitudes.length; i++)
      {
        if(this.data.solicitudes[i].idAnimal == this.data.animal._id )
        {
          this.enviado = true;
        }
      } 
  }

  ngOnDestroy(){
    this.authListenerSubs?.unsubscribe();
  }
  solicitud(animal: EntidadAnimal|any,adoptante: UserAdoptante|any,accion: string)
  {
    if(accion == 'enviar')
    {
      console.log("Data",adoptante);
      this.solicitudAdop = 
      {
        adoptante: adoptante,
        idFundacion:animal.ownerFundacion,
        animal: animal,
        formulario: this.form,
        fecha: Date().toLocaleString(),
        estado: 'En espera',
      }
      console.log(this.solicitudAdop);
      this.solicitudService.postSolicitudAdopcion(this.solicitudAdop);
      this.enviado = true;
    }
    if(accion == 'cancelar')
    {
      this.solicitudService.deleteSolicitud(this.data.adoptante, animal);
      this.enviado = false;
    }
  }
}
