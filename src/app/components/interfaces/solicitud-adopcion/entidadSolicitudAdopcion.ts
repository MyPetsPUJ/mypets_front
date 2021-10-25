import { EntidadAnimal } from "../usuarios/entidadAnimal";

export interface EntidadSolicitudAdopcion{
       
    idAdoptante:string;
    idFundacion:string;
    animal:EntidadAnimal;
    idFormulario:string;
    fecha:string;
    estado:string;
}