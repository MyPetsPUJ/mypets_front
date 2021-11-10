import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';

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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VentanaReporteComponent } from './reportes/ventana-reporte/ventana-reporte.component';
import { VerFotoComponent } from './mi-cuenta/ver-foto/ver-foto.component';
import { PublicacionListComponent } from './publicaciones/publicacion-list/publicacion-list/publicacion-list.component';
import { PublicacionPreviewComponent } from './publicaciones/publicacion-preview/publicacion-preview/publicacion-preview.component';
import { HomePageComponent } from './home-page/home-page.component';
import { TextoInteresComponent } from './inicio/texto-interes/texto-interes.component';
import { AnimalesAdoptadosComponent } from './animales-adoptados/animales-adoptados.component';
import { PetPreviewComponent } from './usuarios/pet-preview/pet-preview.component';
import { SolicitudesComponent } from './solicitudes/solicitudes.component';
import { FormulariosViewComponent } from './solicitudes/formularios-view/formularios-view.component';
import { FooterComponent } from './footer/footer.component';
import { AnimalPreviewComponent } from './home-page/animal-preview/animal-preview.component';
import { PreviewComponent } from './animales-adoptados/preview/preview.component';
import { FundacionesComponent } from './fundaciones/fundaciones.component';
import { UpdateAnimalComponent } from './home-page/update-animal/update-animal.component';
import { UpdatePuntoComponent } from './inicio/update-punto/update-punto.component';
import { EliminarAnimalComponent } from './home-page/eliminar-animal/eliminar-animal.component';


@NgModule({
  declarations: [
    DashboardComponent,
    InicioComponent,
    NavbarComponent,
    UsuariosComponent,
    ReportesComponent,
    CrearAnimalComponent,
    SeleccionAnimalComponent,
    MiCuentaComponent,
    PublicacionesComponent,
    CrearPublicacionComponent,
    CrearAnimalGatoComponent,
    VentanaReporteComponent,
    VerFotoComponent,
    PublicacionListComponent,
    PublicacionPreviewComponent,
    HomePageComponent,
    TextoInteresComponent,
    AnimalesAdoptadosComponent,
    PetPreviewComponent,
    SolicitudesComponent,
    FormulariosViewComponent,
    FooterComponent,
    AnimalPreviewComponent,
    PreviewComponent,
    FundacionesComponent,
    UpdateAnimalComponent,
    UpdatePuntoComponent,
    EliminarAnimalComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    MatCheckboxModule
  ]
})
export class DashboardModule { }
