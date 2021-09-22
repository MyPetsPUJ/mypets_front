import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MapaComponent } from '../mapa.component';

@Component({
  selector: 'app-lista-fundaciones',
  templateUrl: './lista-fundaciones.component.html',
  styleUrls: ['./lista-fundaciones.component.css']
})
export class ListaFundacionesComponent implements OnInit {
  displayedColumns: string[] = ['nombre','distancia','duracion','direccion'];
  dataSource!: MatTableDataSource<any>;
  infoDisplayed: undefined[] = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
   }

  ngOnInit(): void {
    console.log(this.data.informacion[0]);
    var i = 0;
    this.infoDisplayed = this.data.informacion;
    this.dataSource = new MatTableDataSource (this.data.informacion);
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

}
