import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-crear-adoptante',
  templateUrl: './crear-adoptante.component.html',
  styleUrls: ['./crear-adoptante.component.css']
})
export class CrearAdoptanteComponent implements OnInit {

  
  constructor(public authservice: AuthService, private sanitizer: DomSanitizer) { }
  public archivos: any = [];
  public previsualizacion: string | undefined;
  ngOnInit(): void {
    this.previsualizacion = "../../../assets/Images/adopt.png";
  }
  tiles: any[] = [
    {text: 'One', cols: 3, rows: 1, color: 'lightblue'},
    {text: 'Two', cols: 1, rows: 2, color: 'lightgreen'},
    {text: 'Three', cols: 1, rows: 1, color: 'lightpink'},
    {text: 'Four', cols: 2, rows: 1, color: '#DDBDF1'},
  ];
  selectedValue: string | undefined;
  selectedCar: string | undefined;

  genero: any[] = ['Masculino','Femenino'];
  localidad: any[] = ['1.Usaquén','2.Chapinero','3.Santa Fé','4.San Cristobal',
  '5.Usme', '6. Tunjuelito', '7.Bosa', '8.Kennedy','9.Fontibón','10.Engativá','11.Suba','12.Barrios Unidos',
  '13.Teusaquillo','14.Los Mártires', '15.Antonio Nariño', '16.Puente Aranda', '17.Candelaria',
  '18.Rafael Uribe Uribe','19.Ciudad Bolivar','20.Sumapaz'];

  onSignUp(form: NgForm){
    console.log(form.value); 
    if (form.invalid){
      return;
    }
    this.authservice.crearUsuarioAdoptante(form.value.nombre, form.value.apellidos, form.value.fecha_nac, form.value.genero, form.value.localidad, form.value.correo, form.value.num_cel, form.value.password, 'Adoptante');
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
