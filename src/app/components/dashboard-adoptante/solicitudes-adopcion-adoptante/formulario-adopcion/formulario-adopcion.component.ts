import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { EnviarFormularioAdopcionService } from 'src/app/services/formulario/enviar-formulario-adopcion.service';
import { UserAdoptante } from 'src/app/components/interfaces/usuarios/userAdoptante';
import { InformacionFamiliar } from 'src/app/components/interfaces/formularios/formularioInformacionFamiliar';
import { InformacionRelacionada } from 'src/app/components/interfaces/formularios/formularioInformacionRelacionada';
import { EntidadAnimal } from 'src/app/components/interfaces/usuarios/entidadAnimal';
import { Referencias } from 'src/app/components/interfaces/formularios/formularioReferencia';
import { FormularioAdopcion } from 'src/app/components/interfaces/formularios/formularioAdopcion';
import { ThemePalette } from '@angular/material/core';
import { EntidadSolicitudAdopcion } from 'src/app/components/interfaces/solicitud-adopcion/entidadSolicitudAdopcion';
import { Router } from '@angular/router';
import { EnviarSolicitudAdopcionService } from 'src/app/services/adopcion/enviar-solicitud-adopcion.service';


export interface Vacuna_box {
  nombre: String;
  completado: boolean;
  color: ThemePalette;
  esquema?: Vacuna_box[];
}

@Component({
  selector: 'app-formulario-adopcion',
  templateUrl: './formulario-adopcion.component.html',
  styleUrls: ['./formulario-adopcion.component.css'],
})
export class FormularioAdopcionComponent implements OnInit {
  constructor(
    public enviarFormularioAdopcionService: EnviarFormularioAdopcionService,
    private router: Router,
    private solicitudService: EnviarSolicitudAdopcionService
  ) {
  }
  @Input() data: any;
  @Output() salida: EventEmitter<any> = new EventEmitter();
  formAdopcion: FormularioAdopcion | undefined;
  ngOnInit(): void {
    console.log(this.data);
  }
  tiempoConocimiento: any[] = [
    'Entre 0 y 2 años',
    'Entre 2 y 5 años',
    'Entre 5 y 10 años',
    'Entre 10 y 20 años',
    'Más de 20 años o toda la vida',
  ];
  parentezcos: any[] = [
    'Padre o Madre',
    'Tío',
    'Abuelo',
    'Hijo',
    'Sobrino',
    'Primo',
    'Hermano',
    'Otro',
  ];
  periodoAdaptacion: any = [
    'Menos de dos meses',
    'Entre 2 y 5 meses',
    'Entre 5 y 12 meses',
    'El tiempo que sea necesario',
  ];
  casaDeLaMascota: any[] = [
    'Patio',
    'Terraza',
    'Garaje',
    'Dentro de la casa',
    'Dormirá conmigo',
  ];
  actividadesConMascota: any[] = [
    'Senderismo',
    'Montañismo',
    'Ciclovía',
    'Llevarla regularmente al trabajo',
    'Llevarla con usted de viaje',
    'Llevarla con usted a hacer ejercicio',
    'Llevarla a parques',
  ];
  dineroEstimadoMascota: any[] = [
    'Menos de 50 mil pesos',
    'Entre 50 y 150 mil pesos',
    'Entre 200 y 300 mil pesos',
    'Más de 300 mil pesos',
  ];
  gastosMascota: any[] = [
    'Veterinario',
    'Vacunas y desparasitación',
    'Alimento',
    'Accesorios(juguetes,plato,etc)',
    'Cama',
    'Correa',
    'Placa de Identificación',
  ];
  lugarDeJugar: any[] = [
    'Patio Interior',
    'Patio Exterior',
    'Garaje',
    'Zonas verdes cercanas',
    'Parques en las zonas de domicilio',
  ];
  lugarDeVivienda: any[] = ['Casa', 'Apartamento', 'Finca'];
  horasSolo: any[] = [
    'No se quedaría solo nunca',
    'Hasta la 1 P.M',
    'Hasta las 6 P.M',
    'Más de las 6 P.M',
  ];
  decision: any[] = ['SI', 'NO'];
  temperamentos: any[] = ['Amigable', 'Manso', 'Brusco', 'Agresivo'];
  tipo_doc: any[] = ['Cédula de ciudadanía', 'Cédula de extranjería'];
  localidad: any[] = [
    '1.Usaquén',
    '2.Chapinero',
    '3.Santa Fé',
    '4.San Cristobal',
    '5.Usme',
    '6. Tunjuelito',
    '7.Bosa',
    '8.Kennedy',
    '9.Fontibón',
    '10.Engativá',
    '11.Suba',
    '12.Barrios Unidos',
    '13.Teusaquillo',
    '14.Los Mártires',
    '15.Antonio Nariño',
    '16.Puente Aranda',
    '17.Candelaria',
    '18.Rafael Uribe Uribe',
    '19.Ciudad Bolivar',
    '20.Sumapaz',
  ];
  onEnviarSolicitud(form: NgForm) {
    console.log(form.value);
    if (form.invalid) {
      return;
    }
    const adoptante: UserAdoptante = {
      nombre: form.value.nombresAdoptante,
      urlImg: '',
      apellidos: form.value.apellidosAdoptante,
      fecha_nacimiento: form.value.fecha_nacimiento,
      tipo_doc: form.value.tipo_doc,
      num_doc: form.value.num_doc,
      localidad: form.value.localidad,
      genero: form.value.genero,
      num_celular: form.value.num_celular,
      correo: form.value.correo,
      password: form.value.password,
      tipo_usuario: form.value.tipo_usuario,
      animales: [],
      solicitudesAdoptante: []
    };
    const informacionFamiliar: InformacionFamiliar = {
      numAdultos: form.value.numAdultos,
      numNinos: form.value.numNiños,
      edadesAdultos: form.value.edadesAdultos,
      edadesNinos: form.value.edadesNiños,
      numMascotas: form.value.numMascotas,
      razasMascotas: form.value.razasMascotas,
      temperamentoMascotas: form.value.temperamentoMascotas,
      tiempoConMascotas: form.value.tiempoConMascotas,
      nombreFamiliarContacto: form.value.nombreFamiliarContacto,
      numeroFamiliarContacto: form.value.numeroFamiliarContacto,
      familiaresDeAcuerdo: form.value.familiaresDeAcuerdo,
      familiaresAlergias: form.value.familiaresAlergias,
      familiaresPlaneaEmbarazo: form.value.familiaresPlaneaEmbarazo,
    };
    const informacionRelacionada: InformacionRelacionada = {
      tiempoEnCasaHoras: form.value.tiempoEnCasaHoras,
      horaRegresoCasa: form.value.horaRegresoCasa,
      lugarViviendaDeMascota: form.value.lugarViviendaDeMascota,
      patioInteriorJugar: form.value.patioInteriorJugar,
      veterinarioGastos: form.value.veterinarioGastos,
      mascotaAnterior: form.value.mascotaAnterior,
      conoceCuidadosMascota: form.value.conoceCuidadosMascota,
      veterinarioDeConfianza: form.value.veterinarioDeConfianza,
      conscienteResponsabilidad15anos:form.value.conscienteResponsabilidad15años,
      actividadesConMascota: form.value.actividadesConMascota,
      alternativaPaseador: form.value.alternativaPaseador,
      espacioViviendaMascota: form.value.espacioViviendaMascota,
      razonesAdopcion: form.value.razonesAdopcion,
      disposicionMudarseConElAnimal: form.value.disposicionMudarseConElAnimal,
      disposicionPasearAlAnimalPerro: form.value.disposicionPasearAlAnimalPerro,
      disposicionAdaptacionAnimal: form.value.disposicionAdaptacionAnimal,
      asumirGastosAnimal: form.value.asumirGastosAnimal,
      adoptanteAlternativoAusencia: form.value.adoptanteAlternativoAusencia,
      permisionTenenciaAnimales: form.value.permisionTenenciaAnimales,
    };
    const animalAdopcion: EntidadAnimal = {
      nombre: form.value.nombre,
      edad: form.value.edad,
      raza: form.value.raza,
      sexo: form.value.sexo,
      tamano: form.value.tamano,
      color_ojos: form.value.color_ojos,
      tipo_pelaje: form.value.tipo_pelaje,
      situacion: form.value.situacion,
      desparasitado: form.value.desparasitado,
      ultima_vac: form.value.ultima_vac,
      descripcion: form.value.descripcion,
      esquema_vac: form.value.esquema_vac,
      urlImg: form.value.urlImg,
      tipo_animal: form.value.tipo_animal,
      ownerFundacion: form.value.tipo_doc,
      enAdopcion: true,
    };
    const referenciaFamiliar: Referencias = {
      nombres: form.value.nombresFamiliar,
      apellidos: form.value.apellidosFamiliar,
      numFijo: form.value.numFijoFamiliar,
      numCelular: form.value.numCelularFamiliar,
      parentezco: form.value.parentezcoFamiliar,
      tiempoDeConocimiento: form.value.tiempoDeConocimientoFamiliar,
    };
    const referenciaPersonal: Referencias = {
      nombres: form.value.nombresAmigo,
      apellidos: form.value.apellidosAmigo,
      numFijo: form.value.numFijoAmigo,
      numCelular: form.value.numCelularAmigo,
      parentezco: form.value.parentezcoAmigo,
      tiempoDeConocimiento: form.value.tiempoDeConocimientoAmigo,
    };
    const formularioAdopcion: FormularioAdopcion = {
      adoptante,
      informacionFamiliar,
      informacionRelacionada,
      animalAdopcion,
      referenciaFamiliar,
      referenciaPersonal,
    };
    //this.authservice.crearUsuarioAdoptante(datosAdoptante);
    this.enviarFormularioAdopcionService.formularioAdopcion(formularioAdopcion);
  }
  salir()
  {
    this.salida.emit(false);
  }
  enviarFormQuemado()
  {
    this.formAdopcion = 
    {
      adoptante: this.data.adoptante,
      animalAdopcion: this.data.animal,
      informacionFamiliar: {
        numAdultos: '4',
        numNinos: '2',
        edadesAdultos: '87',
        edadesNinos: '16',
        numMascotas: '3',
        razasMascotas: 'Schnauzer, carey y 2 hamsters',
        temperamentoMascotas: 'Amigable',
        tiempoConMascotas: '11',
        nombreFamiliarContacto: 'Angela Patiño',
        numeroFamiliarContacto: '3057471184',
        familiaresDeAcuerdo: 'SI',
        familiaresAlergias: 'NO',
        familiaresPlaneaEmbarazo: 'NO'
      },
      informacionRelacionada: 
      {
        tiempoEnCasaHoras: '12',
        horaRegresoCasa: 'Hasta las 6 P.M',
        lugarViviendaDeMascota: 'Casa',
        patioInteriorJugar: 'Zonas verdes cercanas, Parques en las zonas de domicilio',
        veterinarioGastos: 'Menos de 50 mil pesos',
        mascotaAnterior: 'SI',
        conoceCuidadosMascota: 'SI',
        veterinarioDeConfianza: 'SI',
        conscienteResponsabilidad15anos: 'SI',
        actividadesConMascota: 'Llevarla con usted de viaje, Llevarla a parques',
        alternativaPaseador: 'SI',
        espacioViviendaMascota: 'Dentro de la casa, Dormirá conmigo',
        razonesAdopcion:'Me gustán las mascotas y considero que le puedo dar una buena vida a mi peludito',
        disposicionMudarseConElAnimal: 'SI',
        disposicionPasearAlAnimalPerro: 'NO',
        disposicionAdaptacionAnimal: 'El tiempo que sea necesario',
        asumirGastosAnimal: 'yo',
        adoptanteAlternativoAusencia: 'Mis hermanas',
        permisionTenenciaAnimales: 'SI'
      },
      referenciaFamiliar: 
      {
        nombres:'Angela Yesenia',
        apellidos: 'Patiño Gantiva',
        numFijo: 'No aplica',
        numCelular: '3057471184',
        parentezco: 'Padre o madre',
        tiempoDeConocimiento: ''
      },
      referenciaPersonal: 
      {
        nombres:'Juan Sebastian',
        apellidos: 'Martinez Alvarado',
        numFijo: 'No aplica',
        numCelular: '3205586321',
        parentezco: '',
        tiempoDeConocimiento: 'Entre 2 y 5 años'
      }
    }
    var index;
    for(var i = 0; i < this.solicitudService.getSolicitudesQuemadas().length; i++)
    {
      if(this.data == this.solicitudService.getSolicitudesQuemadas()[i])
      {
        this.solicitudService.solicitudes[i].formulario = this.formAdopcion; // asigna el formulario a la solicitud 
        this.solicitudService.solicitudes[i].estado = 'Aceptado, formulario en espera de respuesta.'; 
        index = i;
      }
    }
    this.salir()
  }
}
