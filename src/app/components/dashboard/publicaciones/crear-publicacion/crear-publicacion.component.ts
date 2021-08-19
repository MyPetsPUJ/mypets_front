import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { CrearPublicacionService } from 'src/app/services/crear-publicacion.service';


@Component({
  selector: 'app-crear-publicacion',
  templateUrl: './crear-publicacion.component.html',
  styleUrls: ['./crear-publicacion.component.css']
})
export class CrearPublicacionComponent implements OnInit {
  

  constructor(public crearPublicacionService : CrearPublicacionService) { }

  ngOnInit(): void {
  }
  fechaPublicacion: string = Date().toLocaleString();
  imagenPublicacion: string = "src\assets\Images\dog.png";
  onCrearPublicacion(form: NgForm){
    console.log(form.value);
    if(form.invalid){
      return;
    }
    this.crearPublicacionService.crearPublicacion(form.value.nombrePublicacion,form.value.cuerpoPublicacion,Date().toLocaleString(),"src\assets\Images\dog.png");

  }



}
