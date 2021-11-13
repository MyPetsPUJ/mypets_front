import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardAdminRoutingModule } from './dashboard-admin-routing.module';
import { NavbarComponent } from './navbar/navbar.component';
import { CrearProductoComponent } from './crear-producto/crear-producto.component';
import { HomePageComponent } from './home-page/home-page.component';
import { ProductosListComponent } from './productos-list/productos-list.component';
import { ProductoPreviewComponent } from './productos-list/producto-preview/producto-preview.component';


@NgModule({
  declarations: [
    NavbarComponent,
    CrearProductoComponent,
    HomePageComponent,
    ProductosListComponent,
    ProductoPreviewComponent
  ],
  imports: [
    CommonModule,
    DashboardAdminRoutingModule,
  ]
})
export class DashboardAdminModule { }
