import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AnimalService } from 'src/app/services/animal/animal.service';

@Component({
  selector: 'app-pet-preview',
  templateUrl: './pet-preview.component.html',
  styleUrls: ['./pet-preview.component.css'],
})
export class PetPreviewComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<PetPreviewComponent>,
    private _router: Router,
    private animalService: AnimalService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  accion(nombre: string) {
    if (nombre == 'cerrar') {
      this.dialogRef.close();
    }
  }
  onAnimalSelected(id: string) {
    this._router.navigate(['/dashboard/editar-animal', id]);
    this.dialogRef.close();
  }
  deleteAnimal(id: string) {
    this.animalService.deleteAnimal(id).subscribe((res) => {
      console.log(res);
      this._snackBar.open('Animal correctamente eliminado ', '', {
        duration: 5000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
      });
      setTimeout(() => {
        this.dialogRef.close();
        this._router.navigate(['/dashboard']);
      }, 1000);
    });
  }
}
