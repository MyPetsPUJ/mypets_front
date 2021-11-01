import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoginService } from 'src/app/services/auth/login.service';
@Component({
  selector: 'app-animal-preview',
  templateUrl: './animal-preview.component.html',
  styleUrls: ['./animal-preview.component.css'],
})
export class AnimalPreviewComponent implements OnInit, OnDestroy {
  usuarioAutenticado: boolean = false;
  userId: string = '';
  private authListenerSubs: Subscription | undefined;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private authService: LoginService,
    public dialogRef: MatDialogRef<AnimalPreviewComponent>,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.usuarioAutenticado = this.authService.getIsAuth();
    this.userId = this.authService.getUserId();
    this.authListenerSubs = this.authService
      .getAuthStatusListener()
      .subscribe((isAuth) => {
        this.usuarioAutenticado = isAuth;
      });
  }
  ngOnDestroy() {
    this.authListenerSubs?.unsubscribe();
  }
  accion(nombre: string) {
    if (nombre == 'cerrar') {
      this.dialogRef.close();
    }
  }

  // onAnimalSelected(id: string) {
  //   this._router.navigate(['/dashboard/editar-animal', id]);
  //   this.dialogRef.close();
  // }
}
