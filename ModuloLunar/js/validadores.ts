// validadores.ts

import { IValidable } from './interfaces.js';
import { Mineral, TipoRoca, TamanoGrano, Textura } from './types.js';

export class ValidadorIgneas implements IValidable {
    getNombre(): string {
        return 'Criterio Ígneas';
    }

    isValid(mineral: Mineral): boolean {
        // Criterio Igneas: ígneas + grano muy grueso
        return (
            mineral.grupo === TipoRoca.Ignea &&
            mineral.tamanoGrano === TamanoGrano.MuyGrueso
        );
    }
}

export class ValidadorMetamorficas implements IValidable {
    getNombre(): string {
        return 'Criterio Metamórficas';
    }

    isValid(mineral: Mineral): boolean {
        // Criterio Metamórficas:  Metamórfica + Grano medio o fino + Vitrea
        return (
            mineral.grupo === TipoRoca.Metamorfica &&
            (mineral.tamanoGrano === TamanoGrano.Medio || 
             mineral.tamanoGrano === TamanoGrano.Fino) &&
            mineral.textura === Textura.Vitrea
        );
    }
}

export class ValidadorSedimentarias implements IValidable {
    getNombre(): string {
        return 'Criterio Sedimentarias';
    }

    isValid(mineral: Mineral): boolean {
        // Criterio Sedimentaria: sedimentaria + Fanerítica
        return (
            mineral.grupo === TipoRoca.Sedimentaria &&
            mineral.textura === Textura.Faneritica
        );
    }
}
