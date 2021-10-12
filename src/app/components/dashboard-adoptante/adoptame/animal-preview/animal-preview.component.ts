import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { LoginService } from 'src/app/services/auth/login.service';

@Component({
  selector: 'app-animal-preview',
  templateUrl: './animal-preview.component.html',
  styleUrls: ['./animal-preview.component.css']
})
export class AnimalPreviewComponent implements OnInit, OnDestroy {

  usuarioAutenticado: boolean = false;
  userId: string = '';
  private authListenerSubs: Subscription | undefined;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private authService: LoginService) { }

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

}
