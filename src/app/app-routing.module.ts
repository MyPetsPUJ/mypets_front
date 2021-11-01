import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearAdoptanteReactivoComponent } from './components/crear-cuenta/crear-adoptante-reactivo/crear-adoptante-reactivo.component';
import { CrearAdoptanteComponent } from './components/crear-cuenta/crear-adoptante/crear-adoptante.component';
import { CrearCuentaComponent } from './components/crear-cuenta/crear-cuenta.component';
import { CrearFundacionComponent } from './components/crear-cuenta/crear-fundacion/crear-fundacion.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { AuthGuardAdoptante } from './guards/authAdoptante.guard';
const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'crear-cuenta', component: CrearCuentaComponent },
  { path: 'crear-cuenta/crear-adoptante', component: CrearAdoptanteComponent },
  { path: 'crear-cuenta/crear-fundacion', component: CrearFundacionComponent },
  {
    path: 'crear-cuenta/crear-adoptante-reactivo',
    component: CrearAdoptanteReactivoComponent,
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./components/dashboard/dashboard.module').then(
        (x) => x.DashboardModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'dashboard-adoptante',
    loadChildren: () =>
      import(
        './components/dashboard-adoptante/dashboard-adoptante.module'
      ).then((x) => x.DashboardAdoptanteModule),
  }, //Carga perezosa
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard, AuthGuardAdoptante],
})
export class AppRoutingModule {}
