export interface InformacionFamiliar{
    numPersonasCasa : number;
    numAdultos: number;
    numNiños: number;
    edadesAdultos : Array<number>;
    edadesNiños : Array<number>;
    numMascotas: number;
    razasMascotas: Array<String>;
    temperamentoMascotas: Array<String>;
    tiempoConMascotas: Array<number>;
    nombreFamiliarContacto: String;
    numeroFamiliarContacto: number;
    familiaresDeAcuerdo: boolean;
    familiaresAlergias: boolean;
    familiaresPlaneaEmbarazo: boolean;
}

