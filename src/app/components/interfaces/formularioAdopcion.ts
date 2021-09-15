import { UserAdoptante } from "./userAdoptante";
import { InformacionFamiliar } from "./formularioInformacionFamiliar";
import { InformacionRelacionada } from "./formularioInformacionRelacionada";
import { EntidadAnimal } from "./entidadAnimal";
import { Referencias } from "./formularioReferencia";
export interface FormularioAdopcion{
    adoptante : UserAdoptante;
    informacionFamiliar : InformacionFamiliar;
    informacionRelacionada: InformacionRelacionada;
    animalAdopcion: EntidadAnimal;
    referenciaFamiliar: Referencias;
    referenciaPersonal: Referencias;
}

