// interfaces.ts

import { Mineral } from './types';

export interface IPilotable {
    dameIdentificador(): string;
    dameNombreCompleto(): string;
    dameEdad(): number;
}

export interface IValidable {
    isValid(mineral: Mineral): boolean;
    getNombre(): string;
}

export interface IEntrada {
    muestra(): string;
}

export interface ISalida {
    mostrar(mineral: Mineral): string;
}

export interface IMisionable {
    Analiza(mineral: Mineral): { valido: boolean; mensaje: string };
    muestra(mineral: Mineral): string;
}
