import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DashboardAdoptanteRoutingModule } from './dashboard-adoptante-routing.module';
import { SharedModule } from '../shared/shared.module';
import { DashboardAdoptanteComponent } from './dashboard-adoptante.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MapaComponent } from './mapa/mapa.component';
import { AdoptameComponent } from './adoptame/adoptame.component';
import { FundacionesComponent } from './fundaciones/fundaciones.component';
import { ConsejosComponent } from './consejos/consejos.component';
import { SolicitudAdopcionComponent } from './adoptame/solicitud-adopcion/solicitud-adopcion.component';
import { SolicitudesAdopcionAdoptanteComponent } from './solicitudes-adopcion-adoptante/solicitudes-adopcion-adoptante.component';



@NgModule({
  declarations: [
    DashboardAdoptanteComponent,
    NavbarComponent,
    MapaComponent,
    AdoptameComponent,
    FundacionesComponent,
    ConsejosComponent,
    SolicitudAdopcionComponent,
    SolicitudesAdopcionAdoptanteComponent
  ],
  imports: [
    CommonModule,
    DashboardAdoptanteRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class DashboardAdoptanteModule { }
