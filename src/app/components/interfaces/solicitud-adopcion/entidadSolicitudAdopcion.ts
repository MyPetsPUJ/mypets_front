import { FormularioAdopcion } from "../formularios/formularioAdopcion";
import { EntidadAnimal } from "../usuarios/entidadAnimal";
import { UserAdoptante } from "../usuarios/userAdoptante";
import { UserFundacion } from "../usuarios/userFundacion";

export interface EntidadSolicitudAdopcion{
       
    idAdoptante:string;
    idFundacion:string;
    idAnimal:string;
    formulario:FormularioAdopcion;
    fecha_solicitud:string;
    estado:string;
}