import { EntidadAnimal } from "./entidadAnimal";

export interface UserAdoptante {
    nombre: string;
    foto: string; 
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
}