import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AnimalService } from 'src/app/services/animal/animal.service';

@Component({
  selector: 'app-eliminar-animal',
  templateUrl: './eliminar-animal.component.html',
  styleUrls: ['./eliminar-animal.component.css'],
})
export class EliminarAnimalComponent implements OnInit {
  constructor(
    private animalService: AnimalService,
    private _snackBar: MatSnackBar,
    private _router: Router
  ) {}

  ngOnInit(): void {}

  deleteAnimal(id: string) {
    this.animalService.deleteAnimal(id).subscribe((res) => {
      console.log(res);
      this._snackBar.open('Animal correctamente eliminado ', '', {
        duration: 5000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
      });
      setTimeout(() => {
        this._router.navigate(['/dashboard/mis-animales']);
      }, 1500);
    });
  }
}
