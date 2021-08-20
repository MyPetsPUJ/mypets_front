import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardAdoptanteRoutingModule } from './dashboard-adoptante-routing.module';
import { SharedModule } from '../shared/shared.module';
import { DashboardAdoptanteComponent } from './dashboard-adoptante.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MapaComponent } from './mapa/mapa.component';
import { AdoptameComponent } from './adoptame/adoptame.component';
import { FundacionesComponent } from './fundaciones/fundaciones.component';
import { ConsejosComponent } from './consejos/consejos.component';


@NgModule({
  declarations: [
    DashboardAdoptanteComponent,
    NavbarComponent,
    MapaComponent,
    AdoptameComponent,
    FundacionesComponent,
    ConsejosComponent
  ],
  imports: [
    CommonModule,
    DashboardAdoptanteRoutingModule,
    SharedModule
  ]
})
export class DashboardAdoptanteModule { }
