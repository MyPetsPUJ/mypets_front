import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardAdminRoutingModule } from './dashboard-admin-routing.module';
import { NavbarComponent } from './navbar/navbar.component';
import { CrearProductoComponent } from './crear-producto/crear-producto.component';
import { HomePageComponent } from './home-page/home-page.component';
import { ProductosListComponent } from './productos-list/productos-list.component';
import { ProductoPreviewComponent } from './productos-list/producto-preview/producto-preview.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DashboardAdminComponent } from './dashboard-admin.component';

@NgModule({
  declarations: [
    DashboardAdminComponent,
    NavbarComponent,
    CrearProductoComponent,
    HomePageComponent,
    ProductosListComponent,
    ProductoPreviewComponent,
  ],
  imports: [
    CommonModule,
    DashboardAdminRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
})
export class DashboardAdminModule {}
