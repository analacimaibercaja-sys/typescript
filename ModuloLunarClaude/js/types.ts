// types.ts

export enum TipoRoca {
    Ignea = 'ígneas',
    Metamorfica = 'metamórficas',
    Sedimentaria = 'sedimentarias'
}

export enum TamanoGrano {
    MuyGrueso = 'muy grueso',
    Grueso = 'grueso',
    Medio = 'medio',
    Fino = 'fino'
}

export enum Textura {
    Vitrea = 'vítrea',
    Afanitica = 'afanítica',
    Faneritica = 'fanerítica'
}

export enum Clasificacion {
    Construccion = 'construcción',
    Ornamental = 'ornamental',
    Utensilios = 'utensilios',
    Machacadas = 'machacadas'
}

export interface Mineral {
    id: string;
    nombre: string;
    grupo: TipoRoca;
    dureza: number;
    tamanoGrano: TamanoGrano;
    clasificacion: Clasificacion;
    tamanoCristales: number;
    temperaturaFormacion: number;
    estructura: string;
    formaGranos: string;
    textura: Textura;
}
