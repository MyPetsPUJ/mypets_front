import { Component, OnInit } from '@angular/core';
import { ProductoService } from 'src/app/services/tienda/producto.service';
import { Producto } from '../../interfaces/tienda/entidadProducto';

@Component({
  selector: 'app-productos-list',
  templateUrl: './productos-list.component.html',
  styleUrls: ['./productos-list.component.css'],
})
export class ProductosListComponent implements OnInit {
  productos: Producto[] = [];

  constructor(private productosService: ProductoService) {}

  ngOnInit(): void {
    this.cargarProductos();
  }

  cargarProductos() {
    this.productosService.getProductosAdmin().subscribe((res) => {
      this.productos = res;
    });
  }

  onProductoSelected(id: string) {}
}
