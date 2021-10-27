import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { LoginService } from 'src/app/services/auth/login.service';

@Component({
  selector: 'app-preview-animal',
  templateUrl: './preview-animal.component.html',
  styleUrls: ['./preview-animal.component.css']
})
export class PreviewAnimalComponent implements OnInit, OnDestroy {

  usuarioAutenticado: boolean = false;
  userId: string = '';
  private authListenerSubs: Subscription | undefined;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private authService: LoginService,
  public dialogRef: MatDialogRef<PreviewAnimalComponent>) { }

  ngOnInit(): void {
      this.usuarioAutenticado = this.authService.getIsAuth();
      this.userId = this.authService.getUserId();
      this.authListenerSubs = this.authService.getAuthStatusListener().subscribe(isAuth => {
      this.usuarioAutenticado = isAuth;
    });
  }
  ngOnDestroy(){
    this.authListenerSubs?.unsubscribe();
  }
  accion(nombre: string)
  {
    if(nombre == 'cerrar')
    {
      this.dialogRef.close();
    }
  }
}
