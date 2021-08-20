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
  tipo_doc: any[] =['Cédula de ciudadanía', 'Cédula de extranjería']
  localidad: any[] = ['1.Usaquén','2.Chapinero','3.Santa Fé','4.San Cristobal',
  '5.Usme', '6. Tunjuelito', '7.Bosa', '8.Kennedy','9.Fontibón','10.Engativá','11.Suba','12.Barrios Unidos',
  '13.Teusaquillo','14.Los Mártires', '15.Antonio Nariño', '16.Puente Aranda', '17.Candelaria',
  '18.Rafael Uribe Uribe','19.Ciudad Bolivar','20.Sumapaz'];

  onSignUp(form: NgForm){
    console.log(form.value); 
    if (form.invalid){
      return;
    }
    const datosAdoptante = {nombre: form.value.nombre, apellidos: form.value.apellidos, fecha_nacimiento: form.value.fecha_nac,
    tipo_doc: form.value.tipo_doc, num_doc: form.value.num_doc, genero: form.value.genero, localidad: form.value.localidad, correo: form.value.correo, num_celular: form.value.num_cel, password: form.value.password, tipo_usuario: 'Adoptante'} //TODO pasar objetos y no params
    //this.authservice.crearUsuarioAdoptante(datosAdoptante);
    this.authservice.crearUsuarioAdoptante(datosAdoptante);
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
