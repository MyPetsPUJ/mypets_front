import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductoService } from 'src/app/services/tienda/producto.service';
import { Producto } from '../../interfaces/tienda/entidadProducto';

@Component({
  selector: 'app-productos-list',
  templateUrl: './productos-list.component.html',
  styleUrls: ['./productos-list.component.css'],
})
export class ProductosListComponent implements OnInit {
  productos: Producto[] = [];

  constructor(
    private productosService: ProductoService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.cargarProductos();
  }

  cargarProductos() {
    this.productosService.getProductosAdmin().subscribe((res) => {
      this.productos = res;
    });
  }

  onProductoSelected(id: string) {
    this._router.navigate(['/dashboard-admin/tienda/item/editar-item', id]);
  }
}
