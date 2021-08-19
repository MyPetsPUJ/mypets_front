import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardAdoptanteComponent } from './dashboard-adoptante.component';

const routes: Routes = [
  {path:'',component: DashboardAdoptanteComponent, children: [
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardAdoptanteRoutingModule { }
