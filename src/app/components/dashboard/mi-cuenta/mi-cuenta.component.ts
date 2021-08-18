import { Component, OnInit} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-mi-cuenta',
  templateUrl: './mi-cuenta.component.html',
  styleUrls: ['./mi-cuenta.component.css']
})
export class MiCuentaComponent implements OnInit {
  nombreFun: string = 'Perritos felices';
  nombreEncargado: string | undefined;
  apellidosEncargado: string | undefined;
  fechaCreacion: Date | undefined;
  localidadSelected: string | undefined;
  correo: string | undefined;
  numCelular: number | undefined;
  contrasena: string | undefined;
  localidad: any[] = ['1.Usaquén','2.Chapinero','3.Santa Fé','4.San Cristobal',
  '5.Usme', '6. Tunjuelito', '7.Bosa', '8.Kennedy','9.Fontibón','10.Engativá','11.Suba','12.Barrios Unidos',
  '13.Teusaquillo','14.Los Mártires', '15.Antonio Nariño', '16.Puente Aranda', '17.Candelaria',
  '18.Rafael Uribe Uribe','19.Ciudad Bolivar','20.Sumapaz'];
  constructor(private sanitizer: DomSanitizer) { }
  public archivos: any = [];
  public previsualizacion: string | undefined;
  ngOnInit(): void {
    this.nombreEncargado = 'Juan Felipe';
    this.apellidosEncargado = 'Vanegas Patiño';
    this.localidadSelected = this.localidad[8];
    this.correo = 'j_vanegas@javeriana.edu.co';
    this.numCelular = 3205586237;
    this.contrasena = '12345';
    this.previsualizacion = "../../../assets/Images/pet-hotel.png"
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
