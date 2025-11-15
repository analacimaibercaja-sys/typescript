// validadores.ts
// Implementación de los criterios de validación de minerales
import { TipoRoca, TamanoGrano, Textura } from './types.js';
export class ValidadorIgneas {
    getNombre() {
        return 'Criterio Ígneas';
    }
    isValid(mineral) {
        // Criterio Igneas: Roca de grupo ígneas + Grano muy grueso
        return (mineral.grupo === TipoRoca.Ignea &&
            mineral.tamanoGrano === TamanoGrano.MuyGrueso);
    }
}
export class ValidadorMetamorficas {
    getNombre() {
        return 'Criterio Metamórficas';
    }
    isValid(mineral) {
        // Criterio Metamórficas: Rocas de grupo Metamórfica + Grano medio o fino + Textura Vitrea
        return (mineral.grupo === TipoRoca.Metamorfica &&
            (mineral.tamanoGrano === TamanoGrano.Medio ||
                mineral.tamanoGrano === TamanoGrano.Fino) &&
            mineral.textura === Textura.Vitrea);
    }
}
export class ValidadorSedimentarias {
    getNombre() {
        return 'Criterio Sedimentarias';
    }
    isValid(mineral) {
        // Criterio Sedimentaria: Rocas de grupo sedimentaria + Textura: Fanerítica
        return (mineral.grupo === TipoRoca.Sedimentaria &&
            mineral.textura === Textura.Faneritica);
    }
}
//# sourceMappingURL=validadores.js.map