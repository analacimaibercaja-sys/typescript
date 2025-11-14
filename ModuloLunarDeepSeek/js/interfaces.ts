// interfaces.ts
export interface ICapturable {
    id: string;
    nombre: string;
    grupo: 'igneas' | 'metamorficas' | 'sedimentarias';
    dureza: number;
    tamanoGrano: 'muy-grueso' | 'grueso' | 'medio' | 'fino';
    clasificacion: 'construccion' | 'ornamental' | 'utensilios' | 'machacadas';
    tamanoCristales: number;
    temperaturaFormacion: number;
    estructura: string;
    formaGranos: string;
    textura: 'vitrea' | 'afanitica' | 'faneritica';
    valida(criterio: ICriterioValidacion): boolean;
}

export interface IPiloto {
    dameId(): string;
    dameNombre(): string;
    dameEdad(): number;
}

export interface ICriterioValidacion {
    valida(mineral: ICapturable): boolean;
    getNombre(): string;
}

export interface ISistemaEntrada {
    capturar(): ICapturable;
    getNombre(): string;
    renderizarFormulario(): void;
}

export interface ISistemaSalida {
    mostrar(mineral: ICapturable): void;
    getNombre(): string;
}

export interface IMisionable {
    analiza(capturable: ICapturable): boolean;
}