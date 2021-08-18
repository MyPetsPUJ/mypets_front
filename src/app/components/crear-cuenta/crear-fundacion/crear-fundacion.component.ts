import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';

import { AuthFundacionService } from 'src/app/services/authFundacion.service';

@Component({
  selector: 'app-crear-fundacion',
  templateUrl: './crear-fundacion.component.html',
  styleUrls: ['./crear-fundacion.component.css']
})
export class CrearFundacionComponent implements OnInit {

  constructor(public authFundacionService: AuthFundacionService, private sanitizer: DomSanitizer) {}
  public archivos: any = [];
  public previsualizacion: string | undefined;

  ngOnInit(): void {
    this.previsualizacion = "../../../assets/Images/chat.png";
  }
  localidad: any[] = ['1.Usaquén','2.Chapinero','3.Santa Fé','4.San Cristobal',
  '5.Usme', '6. Tunjuelito', '7.Bosa', '8.Kennedy','9.Fontibón','10.Engativá','11.Suba','12.Barrios Unidos',
  '13.Teusaquillo','14.Los Mártires', '15.Antonio Nariño', '16.Puente Aranda', '17.Candelaria',
  '18.Rafael Uribe Uribe','19.Ciudad Bolivar','20.Sumapaz'];
  nombreFun:string = 'nombreFundacion';
  onSignUp(form: NgForm){
    console.log(form.value);
    if(form.invalid){
      return;
    }
    this.authFundacionService.crearUsuarioFundacion(form.value.nombreFun, form.value.nombreEncar, form.value.apellidos, form.value.fecha_creacion, form.value.localidad, form.value.correo, form.value.num_cel, form.value.contrasena, 'Fundacion');

  }
  onFileInput(event): any
  {
    const archivo = event.target.files[0];
    this.archivos.push(archivo);
    this.extraerBase64(archivo).then((imagen: any) => 
    {
      this.previsualizacion = imagen.base;
    });
  }
  extraerBase64 = async ($event: any) => new Promise((resolve) => {
    try{
      const unsafeImg = window.URL.createObjectURL($event);
      const image = this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
      const reader = new FileReader();
      reader.readAsDataURL($event);
      reader.onload = () => {
        resolve({
          base: reader.result
        });
      };
      reader.onerror = error => {
        resolve({
          base:null
        });
      };
      return resolve;
    }catch(e)
    {
      return null;
    }
  });


}
