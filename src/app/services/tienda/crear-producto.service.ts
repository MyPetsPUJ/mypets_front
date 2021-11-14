import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CrearProductoService {
  dominio: string = 'localhost';
  puerto: number = 3000;
  pathIntermedio: string = 'api';
  entidad: string = 'dashboard-admin';
  pathTienda: string = 'tienda';
  pathCrear: string = 'agregar-nuevo-item';
  pathItem: string = 'item';
  pathEditar: string = 'editar-item';
  pathEliminar: string = 'eliminar-item';

  constructor(private http: HttpClient) {}

  crearProducto(
    nombre: string,
    tipo_animal: string,
    imagen: File,
    seccion: string,
    precio: string
  ) {
    const fd = new FormData();
    fd.append('nombre', nombre);
    fd.append('tipoAnimal', tipo_animal);
    fd.append('image', imagen);
    fd.append('seccion', seccion);
    fd.append('precio', precio);

    return this.http.post(
      `http://${this.dominio}:${this.puerto}/${this.pathIntermedio}/${this.entidad}/${this.pathTienda}/${this.pathCrear}`,
      fd
    );
  }

  editarProducto(
    id: string,
    nombre: string,
    tipoAnimal: string,
    seccion: string,
    precio: string,
    imagen: File
  ) {
    if (!imagen) {
      const fd = new FormData();
      fd.append('nombre', nombre);
      fd.append('tipoAnimal', tipoAnimal);
      fd.append('seccion', seccion);
      fd.append('precio', precio);

      return this.http.put(
        `http://${this.dominio}:${this.puerto}/${this.pathIntermedio}/${this.entidad}/${this.pathTienda}/${this.pathItem}/${this.pathEditar}/${id}`,
        fd
      );
    } else {
      const fd = new FormData();
      fd.append('nombre', nombre);
      fd.append('tipoAnimal', tipoAnimal);
      fd.append('seccion', seccion);
      fd.append('precio', precio);
      fd.append('image', imagen);

      return this.http.put(
        `http://${this.dominio}:${this.puerto}/${this.pathIntermedio}/${this.entidad}/${this.pathTienda}/${this.pathItem}/${this.pathEditar}/${id}`,
        fd
      );
    }
  }

  deleteProducto(id: string) {
    return this.http.delete(
      `http://${this.dominio}:${this.puerto}/${this.pathIntermedio}/${this.entidad}/${this.pathTienda}/${this.pathItem}/${this.pathEliminar}/${id}`
    );
  }
}
