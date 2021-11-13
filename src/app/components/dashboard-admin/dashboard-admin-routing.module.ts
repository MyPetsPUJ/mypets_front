import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearProductoComponent } from './crear-producto/crear-producto.component';
import { DashboardAdminComponent } from './dashboard-admin.component';
import { HomePageComponent } from './home-page/home-page.component';
import { ProductoPreviewComponent } from './productos-list/producto-preview/producto-preview.component';
import { ProductosListComponent } from './productos-list/productos-list.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardAdminComponent,
    children: [
      { path: '', component: HomePageComponent },
      {
        path: 'tienda/agregar-nuevo-item',
        component: CrearProductoComponent,
      },
      {
        path: 'tienda/traer-todos-mis-items',
        component: ProductosListComponent,
      },
      { path: 'tienda/item/:id', component: ProductoPreviewComponent },
      {
        path: 'tienda/item/editar-item/:id',
        component: ProductoPreviewComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardAdminRoutingModule {}
