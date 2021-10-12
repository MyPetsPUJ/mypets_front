import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { EnviarSolicitudAdopcionService } from 'src/app/services/adopcion/enviar-solicitud-adopcion.service';


@Component({
  selector: 'app-solicitud-adopcion',
  templateUrl: './solicitud-adopcion.component.html',
  styleUrls: ['./solicitud-adopcion.component.css']
})
export class SolicitudAdopcionComponent implements OnInit {

  constructor(public enviarSolicitudAdopcionService : EnviarSolicitudAdopcionService) { }

  ngOnInit(): void {
  }
  tipo_doc: any[] =[,'CC (Cédula de ciudadanía)', 'CE (Cédula de extranjería)', 'NIP (Número de identificación personal)',
  'NIT (Número de identificación tributaria)', 'TI (Tarjeta de identidad)', 'PAP (Pasaporte)'];
  localidad: any[] = ['1.Usaquén','2.Chapinero','3.Santa Fé','4.San Cristobal',
  '5.Usme', '6. Tunjuelito', '7.Bosa', '8.Kennedy','9.Fontibón','10.Engativá','11.Suba','12.Barrios Unidos',
  '13.Teusaquillo','14.Los Mártires', '15.Antonio Nariño', '16.Puente Aranda', '17.Candelaria',
  '18.Rafael Uribe Uribe','19.Ciudad Bolivar','20.Sumapaz'];
  onEnviarSolicitud(form: NgForm){
    console.log(form.value); 
    if (form.invalid){
      return;
    }
    const datosAdoptante = {nombresAdoptante: form.value.nombresAdoptante, apellidosAdoptante: form.value.apellidosAdoptante, edadAdoptante: form.value.edadAdoptante,
      tipoDocAdoptante: form.value.tipoDocAdoptante, numDocAdoptante: form.value.numDocAdoptante, localidad: form.value.localidad, barrio: form.value.barrio, 
      direccion: form.value.direccion, numeroCelular: form.value.numeroCelular, correoElectronico: form.value.correoElectronico, ocupacion: form.value.ocupacion, 
      mascotaSolicitud: form.value.mascotaSolicitud, fundacionSolicitud: form.value.fundacionSolicitud};
    //this.authservice.crearUsuarioAdoptante(datosAdoptante);
    this.enviarSolicitudAdopcionService.solicitudAdopcion(datosAdoptante);
  }

}
