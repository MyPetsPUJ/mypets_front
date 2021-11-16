import { Component, OnInit , Inject, OnDestroy} from '@angular/core';
import { Producto } from 'src/app/components/interfaces/tienda/entidadProducto';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { threadId } from 'worker_threads';
@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})

export class CarritoComponent implements OnInit {
  productos: Producto[]=this.data.animales;
  sumarProductos: number=0;
  constructor(
  @Inject(MAT_DIALOG_DATA) public data: any,
  public dialogRef: MatDialogRef<CarritoComponent>,
  private _router: Router) { }

  ngOnInit(): void {
    this.sumar()
  }
  accion(nombre: string) {
    if (nombre == 'cerrar') {
      this.dialogRef.close();
    }
  }
  sumar(){
    for(var i=0;i<this.productos.length;i++)
      {
        this.sumarProductos=this.sumarProductos+parseInt(this.productos[i].precio)
      }
  }
  
  

}
