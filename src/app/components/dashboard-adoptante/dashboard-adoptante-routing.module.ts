import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdoptameComponent } from './adoptame/adoptame.component';
import { ConsejosComponent } from './consejos/consejos.component';
import { DashboardAdoptanteComponent } from './dashboard-adoptante.component';
import { FundacionesComponent } from './fundaciones/fundaciones.component';
import { MapaComponent } from './mapa/mapa.component';

const routes: Routes = [
  {path:'',component: DashboardAdoptanteComponent, children: [
    {path: '',component: MapaComponent},
    {path: 'adoptame',component: AdoptameComponent},
    {path: 'fundaciones',component: FundacionesComponent},
    {path: 'consejos',component: ConsejosComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardAdoptanteRoutingModule { }
