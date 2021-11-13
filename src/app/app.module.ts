import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCheckboxModule} from '@angular/material/checkbox';
import { HttpClientModule } from '@angular/common/http';

//Angular material

//Componentes
import { LoginComponent } from './components/login/login.component';
import { SharedModule } from './components/shared/shared.module';
import { CrearCuentaComponent } from './components/crear-cuenta/crear-cuenta.component';
import { CrearAdoptanteComponent } from './components/crear-cuenta/crear-adoptante/crear-adoptante.component';
import { CrearFundacionComponent } from './components/crear-cuenta/crear-fundacion/crear-fundacion.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CrearAnimalGatoComponent } from './components/dashboard/usuarios/crear-animal/crear-animal-gato/crear-animal-gato.component';
import { CrearAnimalComponent } from './components/dashboard/usuarios/crear-animal/crear-animal.component';
import { CrearPublicacionComponent } from './components/dashboard/publicaciones/crear-publicacion/crear-publicacion.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './components/interfaces/authInterceptor';
import { HomeComponent } from './components/home/home.component';
import { TokenInterceptorService } from './services/auth/token-interceptor.service';
import { CrearAdoptanteReactivoComponent } from './components/crear-cuenta/crear-adoptante-reactivo/crear-adoptante-reactivo.component';
import { DashboardAdminComponent } from './components/dashboard-admin/dashboard-admin.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CrearCuentaComponent,
    CrearAdoptanteComponent,
    CrearFundacionComponent,
    HomeComponent,
    CrearAdoptanteReactivoComponent,
    DashboardAdminComponent,
    
    
    //CrearAnimalGatoComponent
    //CrearAnimalComponent,
    //CrearPublicacionComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }














