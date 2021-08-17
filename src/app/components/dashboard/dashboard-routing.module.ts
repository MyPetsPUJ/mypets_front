import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { InicioComponent } from './inicio/inicio.component';
import { MiCuentaComponent } from './mi-cuenta/mi-cuenta.component';
import { ReportesComponent } from './reportes/reportes.component';
import { CrearAnimalGatoComponent } from './usuarios/crear-animal/crear-animal-gato/crear-animal-gato.component';
import { CrearAnimalComponent } from './usuarios/crear-animal/crear-animal.component';
import { SeleccionAnimalComponent } from './usuarios/crear-animal/seleccion-animal/seleccion-animal.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { PublicacionesComponent } from './publicaciones/publicaciones.component';

const routes: Routes = [
  {path: '', component: DashboardComponent, children:  [
    {path: '',component: InicioComponent},
    {path: 'animales',component: UsuariosComponent},
    {path: 'reportes',component: ReportesComponent},
    {path: 'mi_cuenta',component: MiCuentaComponent},
    {path:'seleccion-animal',component: SeleccionAnimalComponent},
    {path: 'seleccion-animal/crear-animal-perro',component: CrearAnimalComponent},
    {path: 'seleccion-animal/crear-animal-gato', component: CrearAnimalGatoComponent},
    {path: 'publicaciones', component: PublicacionesComponent}
    
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
