import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Producto } from 'src/app/components/interfaces/tienda/entidadProducto';
import { CrearProductoService } from 'src/app/services/tienda/crear-producto.service';
import { ProductoService } from 'src/app/services/tienda/producto.service';

@Component({
  selector: 'app-producto-preview',
  templateUrl: './producto-preview.component.html',
  styleUrls: ['./producto-preview.component.css'],
})
export class ProductoPreviewComponent implements OnInit {
  productoId: string = '';
  file!: File;
  photoSelected: string | ArrayBuffer = '';
  previsualizacion: string = '';
  producto: Producto = {
    nombre: '',
    tipoAnimal: '',
    urlImg: '',
    seccion: '',
    precio: '',
  };
  constructor(
    private crudProductoService: CrearProductoService,
    private productoService: ProductoService,
    private _router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.productoId = params['id'];
      this.productoService
        .getProductoByIdAdmin(this.productoId)
        .subscribe((res) => {
          console.log(res);
          this.previsualizacion = res.urlImg;
          this.producto = res;
        });
    });
  }

  onPhotoSelected(event: any): void {
    if (event.target?.files && event.target.files[0]) {
      this.file = <File>event.target.files[0];
      //image preview
      const reader = new FileReader();
      reader.onload = (e) => (this.photoSelected = reader.result as string);
      reader.readAsDataURL(this.file);
    }
  }

  editarProducto(nombre: HTMLInputElement, precio: HTMLInputElement) {}

  deleteProducto(id: string) {}
}
