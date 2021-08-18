import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './dashboard.component';
import { InicioComponent } from './inicio/inicio.component';
import { NavbarComponent } from './navbar/navbar.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { ReportesComponent } from './reportes/reportes.component';
import { CrearAnimalComponent } from './usuarios/crear-animal/crear-animal.component';
import { SeleccionAnimalComponent } from './usuarios/crear-animal/seleccion-animal/seleccion-animal.component';
import { CrearAnimalGatoComponent } from './usuarios/crear-animal/crear-animal-gato/crear-animal-gato.component';
import { MiCuentaComponent } from './mi-cuenta/mi-cuenta.component';
import { PublicacionesComponent } from './publicaciones/publicaciones.component';
import { CrearPublicacionComponent } from './publicaciones/crear-publicacion/crear-publicacion.component';


@NgModule({
  declarations: [
    DashboardComponent,
    InicioComponent,
    NavbarComponent,
    UsuariosComponent,
    ReportesComponent,
    //CrearAnimalComponent,
    SeleccionAnimalComponent,
    MiCuentaComponent,
    PublicacionesComponent,
    CrearPublicacionComponent
    //CrearAnimalGatoComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule
  ]
})
export class DashboardModule { }
