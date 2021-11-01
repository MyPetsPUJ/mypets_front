import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdoptameComponent } from './adoptame/adoptame.component';
import { ConsejosComponent } from './consejos/consejos.component';
import { DashboardAdoptanteComponent } from './dashboard-adoptante.component';
import { FundacionesComponent } from './fundaciones/fundaciones.component';
import { MapaComponent } from './mapa/mapa.component';
import { SolicitudAdopcionComponent } from './adoptame/solicitud-adopcion/solicitud-adopcion.component';
import { SolicitudesAdopcionAdoptanteComponent } from './solicitudes-adopcion-adoptante/solicitudes-adopcion-adoptante.component';
import { FormularioAdopcionComponent } from './solicitudes-adopcion-adoptante/formulario-adopcion/formulario-adopcion.component';
import { HomePageComponent } from './home-page/home-page.component';
import { MiCuentaAdoptanteComponent } from './mi-cuenta-adoptante/mi-cuenta-adoptante.component';
const routes: Routes = [
  {
    path: '',
    component: DashboardAdoptanteComponent,
    children: [
      { path: '', component: HomePageComponent },
      { path: 'adoptame', component: AdoptameComponent },
      { path: 'get-fundaciones', component: FundacionesComponent },
      { path: 'consejos', component: ConsejosComponent },
      { path: 'mapa', component: MapaComponent },
      {
        path: 'adoptame/solicitud-adopcion',
        component: SolicitudAdopcionComponent,
      },
      {
        path: 'solicitudes-adopcion-adoptante',
        component: SolicitudesAdopcionAdoptanteComponent,
      },
      {
        path: 'solicitudes-adopcion-adoptante/formulario-adopcion',
        component: FormularioAdopcionComponent,
      },
      { path: 'mi_cuenta/:id', component: MiCuentaAdoptanteComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardAdoptanteRoutingModule {}
