import { Component, OnInit , Inject, OnDestroy} from '@angular/core';
import { Producto } from 'src/app/components/interfaces/tienda/entidadProducto';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})

export class CarritoComponent implements OnInit {
  productos: Producto[]=this.data.animales
  constructor(
  @Inject(MAT_DIALOG_DATA) public data: any,
  public dialogRef: MatDialogRef<CarritoComponent>,
  private _router: Router) { }

  ngOnInit(): void {
    
  }
  accion(nombre: string) {
    if (nombre == 'cerrar') {
      this.dialogRef.close();
    }
  }
  

}
