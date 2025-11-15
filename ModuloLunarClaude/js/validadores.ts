// validadores.ts
// Implementación de los criterios de validación de minerales

import { IValidable } from './interfaces.js';
import { Mineral, TipoRoca, TamanoGrano, Textura } from './types.js';

export class ValidadorIgneas implements IValidable {
    getNombre(): string {
        return 'Criterio Ígneas';
    }

    isValid(mineral: Mineral): boolean {
        // Criterio Igneas: Roca de grupo ígneas + Grano muy grueso
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
        // Criterio Metamórficas: Rocas de grupo Metamórfica + Grano medio o fino + Textura Vitrea
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
        // Criterio Sedimentaria: Rocas de grupo sedimentaria + Textura: Fanerítica
        return (
            mineral.grupo === TipoRoca.Sedimentaria &&
            mineral.textura === Textura.Faneritica
        );
    }
}
