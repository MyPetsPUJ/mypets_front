import { Component, OnInit } from '@angular/core';
import { LoginService } from './services/auth/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ProyectoMaterial';

  constructor(private authService: LoginService){}

  ngOnInit(){
    this.authService.autoAuthUser();
  }
}
