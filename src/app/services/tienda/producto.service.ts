import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Producto } from 'src/app/components/interfaces/tienda/entidadProducto';

@Injectable({
  providedIn: 'root',
})
export class ProductoService {
  dominio: string = 'localhost';
  puerto: number = 3000;
  pathIntermedio: string = 'api';
  entidadAdmin: string = 'dashboard-admin';
  entidadAdoptante: string = 'dashboard-adoptante';
  entidadFundacion: string = 'dashboard';
  pathTienda: string = 'tienda';
  pathItem: string = 'item';
  pathItemsAdmin: string = 'traer-todos-mis-items';
  pathAllItems: string = 'traer-todos-los-items';

  constructor(private http: HttpClient) {}

  getProductosAdmin() {
    return this.http.get<Producto[]>(
      `http://${this.dominio}:${this.puerto}/${this.pathIntermedio}/${this.entidadAdmin}/${this.pathTienda}/${this.pathItemsAdmin}`
    );
  }

  getProductoByIdAdmin(id: string) {
    return this.http.get<Producto>(
      `http://${this.dominio}:${this.puerto}/${this.pathIntermedio}/${this.entidadAdmin}/${this.pathTienda}/${this.pathItem}/${id}`
    );
  }

  mostrarProductosFundacion() {
    return this.http.get<Producto[]>(
      `http://${this.dominio}:${this.puerto}/${this.pathIntermedio}/${this.entidadFundacion}/${this.pathTienda}/${this.pathAllItems}`
    );
  }

  getProductoByIdFundacin(id: string) {
    return this.http.get<Producto>(
      `http://${this.dominio}:${this.puerto}/${this.pathIntermedio}/${this.entidadFundacion}/${this.pathTienda}/${this.pathItem}/${id}`
    );
  }

  mostrarProductosAdoptante() {
    return this.http.get<Producto[]>(
      `http://${this.dominio}:${this.puerto}/${this.pathIntermedio}/${this.entidadAdoptante}/${this.pathTienda}/${this.pathAllItems}`
    );
  }

  getProductoByIdAdoptante(id: string) {
    return this.http.get<Producto>(
      `http://${this.dominio}:${this.puerto}/${this.pathIntermedio}/${this.entidadAdoptante}/${this.pathTienda}/${this.pathItem}/${id}`
    );
  }
}
