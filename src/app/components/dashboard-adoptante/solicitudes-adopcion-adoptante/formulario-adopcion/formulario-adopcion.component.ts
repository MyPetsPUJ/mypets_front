import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { EnviarFormularioAdopcionService } from 'src/app/services/enviar-formulario-adopcion.service';
import { UserAdoptante } from 'src/app/components/interfaces/userAdoptante';
import { InformacionFamiliar } from 'src/app/components/interfaces/formularioInformacionFamiliar';
import { InformacionRelacionada } from 'src/app/components/interfaces/formularioInformacionRelacionada';
import { EntidadAnimal } from 'src/app/components/interfaces/entidadAnimal';
import { Referencias } from 'src/app/components/interfaces/formularioReferencia';
import { FormularioAdopcion } from 'src/app/components/interfaces/formularioAdopcion';
import { ThemePalette } from '@angular/material/core';

export interface Vacuna_box {
  nombre: String;
  completado: boolean;
  color: ThemePalette;
  esquema?: Vacuna_box[];
}

@Component({
  selector: 'app-formulario-adopcion',
  templateUrl: './formulario-adopcion.component.html',
  styleUrls: ['./formulario-adopcion.component.css']
})
export class FormularioAdopcionComponent implements OnInit {

  constructor(public enviarFormularioAdopcionService: EnviarFormularioAdopcionService) { }

  ngOnInit(): void {
  }
  dineroEstimadoMascota:any[]=["Menos de 50 mil pesos", "Entre 50 y 150 mil pesos", "Entre 200 y 300 mil pesos","Más de 300 mil pesos"];
  gastosMascota:any[]=["Veterinario","Vacunas y desparasitación","Alimento","Accesorios(juguetes,plato,etc)","Cama","Correa","Placa de Identificación"]
  lugarDeJugar:any[]=["Patio Interior","Patio Exterior","Garaje","Zonas verdes cercanas","Parques en las zonas de domicilio"];
  lugarDeVivienda:any[]= ["Casa", "Apartamento", "Finca"];
  horasSolo:any[]= ["No se quedaría solo nunca","Hasta la 1 P.M","Hasta las 6 P.M", "Más de las 6 P.M"];
  decision:any[]= ["SI","NO"];
  temperamentos: any[]=['Amigable','Manso','Brusco','Agresivo'];
  tipo_doc: any[] =['Cédula de ciudadanía', 'Cédula de extranjería'];
  localidad: any[] = ['1.Usaquén','2.Chapinero','3.Santa Fé','4.San Cristobal',
  '5.Usme', '6. Tunjuelito', '7.Bosa', '8.Kennedy','9.Fontibón','10.Engativá','11.Suba','12.Barrios Unidos',
  '13.Teusaquillo','14.Los Mártires', '15.Antonio Nariño', '16.Puente Aranda', '17.Candelaria',
  '18.Rafael Uribe Uribe','19.Ciudad Bolivar','20.Sumapaz'];
  onEnviarSolicitud(form: NgForm){
    console.log(form.value); 
    if (form.invalid){
      return;
    }
    const adoptante : UserAdoptante = {nombre: form.value.nombresAdoptante, apellidos: form.value.apellidosAdoptante, fecha_nacimiento: form.value.fecha_nacimiento,
      tipo_doc: form.value.tipo_doc, num_doc: form.value.num_doc, localidad: form.value.localidad, genero: form.value.genero,
      num_celular: form.value.num_celular, correo: form.value.correo, password: form.value.password, 
      tipo_usuario: form.value.tipo_usuario};
    const informacionFamiliar : InformacionFamiliar={numPersonasCasa: form.value.numPersonasCasa,numAdultos: form.value.numAdultos,numNiños: form.value.numNiños,edadesAdultos: form.value.edadesAdultos,
        edadesNiños : form.value.edadesNiños,numMascotas : form.value.numMascotas,razasMascotas : form.value.razasMascotas,temperamentoMascotas : form.value.temperamentoMascotas,
        tiempoConMascotas : form.value.tiempoConMascotas,nombreFamiliarContacto : form.value.nombreFamiliarContacto,numeroFamiliarContacto : form.value.numeroFamiliarContacto,
        familiaresDeAcuerdo : form.value.familiaresDeAcuerdo,familiaresAlergias : form.value.familiaresAlergias,familiaresPlaneaEmbarazo : form.value.familiaresPlaneaEmbarazo};
    const informacionRelacionada: InformacionRelacionada = {tiempoEnCasaHoras: form.value.tiempoEnCasaHoras,horaRegresoCasa: form.value.horaRegresoCasa,lugarDeVivienda: form.value.lugarDeVivienda,lugarViviendaDeMascota: form.value.lugarViviendaDeMascota,
      patioInteriorJugar: form.value.patioInteriorJugar,patioExteriorJugar: form.value.patioExteriorJugar,garajeJugar: form.value.garajeJugar,zonasVerdesCercanas: form.value.zonasVerdesCercanas,parquesZonaDomicilio: form.value.parquesZonaDomicilio,
      veterinarioGastos: form.value.veterinarioGastos,vacunasGastos: form.value.vacunasGastos,alimentoGastos: form.value.alimentoGastos,accesoriosGastos: form.value.accesoriosGastos,camaGastos: form.value.camaGastos,
      correaGastos: form.value.correaGastos,placaIdentificacionGastos: form.value.placaIdentificacionGastos,dineroEstimadoMascota: form.value.dineroEstimadoMascota,mascotaAnterior: form.value.mascotaAnterior,especie: form.value.especie,
      raza: form.value.raza,tiempoMascotaAnterior: form.value.tiempoMascotaAnterior,razonMascotaAnterior: form.value.razonMascotaAnterior,conoceCuidadosMascota: form.value.conoceCuidadosMascota,veterinarioDeConfianza: form.value.veterinarioDeConfianza,
      conscienteResponsabilidad15años: form.value.conscienteResponsabilidad15años,actividadesConMascota: form.value.actividadesConMascota,alternativaPaseador: form.value.alternativaPaseador,espacioViviendaMascota: form.value.espacioViviendaMascota,
      razonesAdopcion: form.value.razonesAdopcion,disposicionMudarseConElAnimal: form.value.disposicionMudarseConElAnimal,disposicionPasearAlAnimalPerro: form.value.disposicionPasearAlAnimalPerro,disposicionAdaptacionAnimal: form.value.disposicionAdaptacionAnimal,
      tiempoAdaptacionAnimal: form.value.tiempoAdaptacionAnimal, asumirGastosAnimal: form.value.asumirGastosAnimal,adoptanteAlternativoAusencia: form.value.adoptanteAlternativoAusencia,permisionTenenciaAnimales: form.value.permisionTenenciaAnimales,lugarDormitorioAnimal: form.value.lugarDormitorioAnimal}
    const animalAdopcion: EntidadAnimal={nombre: form.value.nombre,edad: form.value.edad,raza: form.value.raza,sexo: form.value.sexo,tamano: form.value.tamano,color_ojos: form.value.color_ojos,tipo_pelaje: form.value.tipo_pelaje,situacion: form.value.situacion,desparasitado: form.value.desparasitado,
      ultima_vac: form.value.ultima_vac,descripcion: form.value.descripcion,esquema_vac: form.value.esquema_vac,urlImg: form.value.urlImg,tipo_animal: form.value.tipo_animal, idDueño: form.value.tipo_doc};
    const referenciaFamiliar: Referencias={nombres: form.value.nombresFamiliar,apellidos: form.value.apellidosFamiliar,numFijo: form.value.numFijoFamiliar,numCelular: form.value.numCelularFamiliar,parentezco: form.value.parentezcoFamiliar,tiempoDeConocimiento: form.value.tiempoDeConocimientoFamiliar};
    const referenciaPersonal: Referencias={nombres: form.value.nombresAmigo,apellidos: form.value.apellidosAmigo,numFijo: form.value.numFijoAmigo,numCelular: form.value.numCelularAmigo,parentezco: form.value.parentezcoAmigo,tiempoDeConocimiento: form.value.tiempoDeConocimientoAmigo};
      const formularioAdopcion: FormularioAdopcion = {adoptante,informacionFamiliar, informacionRelacionada, animalAdopcion, referenciaFamiliar, referenciaPersonal};
    //this.authservice.crearUsuarioAdoptante(datosAdoptante);
    this.enviarFormularioAdopcionService.formularioAdopcion(formularioAdopcion);
  }

}
