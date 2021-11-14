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
import { FormularioAdopcionComponent } from './solicitudes-adopcion-adoptante/formulario-adopcion/formulario-adopcion.component';
import { HomePageComponent } from './home-page/home-page.component';
import { ListaFundacionesComponent } from './mapa/lista-fundaciones/lista-fundaciones.component';
import { ConsejoPreviewComponent } from './consejos/consejo-preview/consejo-preview.component';
import { AnimalPreviewComponent } from './adoptame/animal-preview/animal-preview.component';
import { PreviewAnimalComponent } from './home-page/preview-animal/preview-animal.component';
import { FooterComponent } from './footer/footer.component';
import { MiCuentaAdoptanteComponent } from './mi-cuenta-adoptante/mi-cuenta-adoptante.component';
import { ConfirmarSolicitudComponent } from './home-page/preview-animal/confirmar-solicitud/confirmar-solicitud.component';
import { TiendaComponent } from './tienda/tienda.component';
import { CarritoComponent } from './tienda/carrito/carrito.component';

@NgModule({
  declarations: [
    DashboardAdoptanteComponent,
    NavbarComponent,
    MapaComponent,
    AdoptameComponent,
    FundacionesComponent,
    ConsejosComponent,
    SolicitudAdopcionComponent,
    SolicitudesAdopcionAdoptanteComponent,
    FormularioAdopcionComponent,
    HomePageComponent,
    ListaFundacionesComponent,
    ConsejoPreviewComponent,
    AnimalPreviewComponent,
    PreviewAnimalComponent,
    FooterComponent,
    MiCuentaAdoptanteComponent,
    ConfirmarSolicitudComponent,
    TiendaComponent,
    CarritoComponent,
  ],
  imports: [
    CommonModule,
    DashboardAdoptanteRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class DashboardAdoptanteModule {}
