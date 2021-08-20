import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-mi-cuenta',
  templateUrl: './mi-cuenta.component.html',
  styleUrls: ['./mi-cuenta.component.css']
})
export class MiCuentaComponent implements OnInit {
  localidad: any[] = ['1.Usaquén','2.Chapinero','3.Santa Fé','4.San Cristobal',
  '5.Usme', '6. Tunjuelito', '7.Bosa', '8.Kennedy','9.Fontibón','10.Engativá','11.Suba','12.Barrios Unidos',
  '13.Teusaquillo','14.Los Mártires', '15.Antonio Nariño', '16.Puente Aranda', '17.Candelaria',
  '18.Rafael Uribe Uribe','19.Ciudad Bolivar','20.Sumapaz'];
  form: FormGroup;
  constructor(private sanitizer: DomSanitizer, private fb: FormBuilder) {
    this.form = this.fb.group({
      nombreFundacion: ['Perritos felices', Validators.required],
      nombreEncargado: ['Juan Felipe', Validators.required],
      apellidosEncargado: ['Vanegas Patiño', Validators.required],
      fechaCreacion: ['12/4/1999', Validators.required],
      localidad: ['8.Kennedy', Validators.required],
      correo: ['j_vanegas@javeriana.edu.co', Validators.required],
      numCelular: [3205586237, Validators.required],
      contrasena: ['12345', Validators.required]
    })
   }
  public archivos: any = [];
  public previsualizacion: string | undefined;
  
  ngOnInit(): void {
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
