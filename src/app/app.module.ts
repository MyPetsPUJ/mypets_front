import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCheckboxModule} from '@angular/material/checkbox'

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

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CrearCuentaComponent,
    CrearAdoptanteComponent,
    CrearFundacionComponent,
    CrearAnimalGatoComponent,
    CrearAnimalComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    MatCheckboxModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
