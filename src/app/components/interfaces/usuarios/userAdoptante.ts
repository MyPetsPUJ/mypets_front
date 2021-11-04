import { EntidadSolicitudAdopcion } from "../solicitud-adopcion/entidadSolicitudAdopcion";
import { EntidadAnimal } from "./entidadAnimal";

export interface UserAdoptante {
    _id?: string;
    nombre: string;
    urlImg: string; 
    apellidos: string; 
    fecha_nacimiento: string;
    tipo_doc: string;
    num_doc: string; 
    genero: string;
    localidad: string;
    correo: string; 
    num_celular:string; 
    password: string;
    tipo_usuario: string;
    animales: EntidadAnimal[];
    solicitudesAdoptante: EntidadSolicitudAdopcion[];
}