import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardAdoptanteRoutingModule } from './dashboard-adoptante-routing.module';
import { SharedModule } from '../shared/shared.module';
import { DashboardAdoptanteComponent } from './dashboard-adoptante.component';
import { NavbarComponent } from './navbar/navbar.component';


@NgModule({
  declarations: [
    DashboardAdoptanteComponent,
    NavbarComponent
  ],
  imports: [
    CommonModule,
    DashboardAdoptanteRoutingModule,
    SharedModule
  ]
})
export class DashboardAdoptanteModule { }
