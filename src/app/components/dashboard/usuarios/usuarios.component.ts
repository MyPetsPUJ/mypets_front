import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { noop } from 'rxjs';
import { AnimalService } from 'src/app/services/animal.service';
import { CrearAnimalService } from 'src/app/services/crearAnimal.service';
import { LoginService } from 'src/app/services/login.service';
import { EntidadAnimal } from '../../interfaces/entidadAnimal';
import { UserFundacion } from '../../interfaces/userFundacion';
import { PetPreviewComponent } from './pet-preview/pet-preview.component';



@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  animales: EntidadAnimal[] = [];
  userId: string = '';
  userFundacion: UserFundacion | undefined;
  displayedColumns: string[] = ['foto', 'edad', 'tipo', 'sexo', 'situacion', 'EsquemaVac', 'publicar'];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private crearAnimalService: CrearAnimalService, private snackbar: MatSnackBar,
    public dialog: MatDialog, private authService: LoginService, private animalService: AnimalService) { }

  ngOnInit(): void {
    this.userId = this.authService.getUserId();
    console.log('Este es el id', this.userId);
    this.cargarAnimales();
  }

  cargarAnimales() {
    // this.animales = this.crearAnimalService.getAnimales();
    // this.dataSource = new MatTableDataSource(this.animales);
    this.animalService.populateAnimales(this.userId).subscribe((res) => {
      console.log("Animales:", res.animales);
      console.log("User:", res.resultado);
      this.userFundacion = res.resultado;
      this.animales = res.animales;
      this.dataSource = new MatTableDataSource(this.animales)
    })
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  eliminarAnimal(index: number) {
    this.crearAnimalService.eliminarAnimal(index);
    this.cargarAnimales();
    this.snackbar.open('Animal eliminado de manera correcta', '',
      {
        duration: 1500,
        horizontalPosition: 'center',
        verticalPosition: 'bottom'
      })
  }
  visualizarAnimal(animal: EntidadAnimal) {
    const dialogRef = this.dialog.open(PetPreviewComponent, {
      width: '600px',
      height: '500px',
      data: { animal: animal }
    });
  }
  publicarAnimal(i: number, accion: string) {
    this.crearAnimalService.ponerEnAdopcion(i, accion);
    this.cargarAnimales();
    if (accion == 'publicar') {
      this.snackbar.open('Animal publicado en adopción', '',
        {
          duration: 1500,
          horizontalPosition: 'center',
          verticalPosition: 'bottom'
        });
    }
    if (accion == 'cancelar')
    {
      this.snackbar.open('Publicación cancelada','',
      {
        duration: 1500,
        horizontalPosition: 'center',
       verticalPosition : 'bottom'
      });
    }

  }
}
