export interface EntidadAnimal {
  _id?: string;
  nombre: string;
  edad: string;
  raza: string;
  sexo: string;
  tamano: string;
  color_ojos: string;
  tipo_pelaje: string;
  situacion: string;
  desparasitado: string;
  ultima_vac: string;
  descripcion: string;
  esquema_vac: string;
  urlImg: string;
  tipo_animal: string;
  ownerFundacion: string;
  enAdopcion: boolean;
  adoptado?: boolean;
  ownerAdoptante?: string;
}
