export interface PuntoInteres {
  _id?: string;
  titulo: string;
  descripcion: string;
  direccion: string;
  autorPuntoDeInteres: string;
  ubicacion: {
    type: 'Point';
    coordinates: Array<number>;
    direccionFormateada: '';
  };
  latitud: number;
  longitud: number;
}
