import { FormularioAdopcion } from "../formularios/formularioAdopcion";
import { EntidadAnimal } from "../usuarios/entidadAnimal";
import { UserAdoptante } from "../usuarios/userAdoptante";
import { UserFundacion } from "../usuarios/userFundacion";

export interface EntidadSolicitudAdopcion{
       
    adoptante:UserAdoptante;
    idFundacion:string;
    animal:EntidadAnimal;
    formulario:FormularioAdopcion;
    fecha:string;
    estado1:string;
    estado2: string;
}