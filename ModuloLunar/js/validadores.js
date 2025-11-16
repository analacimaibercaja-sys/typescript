// validadores.ts
import { TipoRoca, TamanoGrano, Textura } from './types.js';
export class ValidadorIgneas {
    getNombre() {
        return 'Criterio Ígneas';
    }
    isValid(mineral) {
        // Criterio Igneas: ígneas + grano muy grueso
        return (mineral.grupo === TipoRoca.Ignea &&
            mineral.tamanoGrano === TamanoGrano.MuyGrueso);
    }
}
export class ValidadorMetamorficas {
    getNombre() {
        return 'Criterio Metamórficas';
    }
    isValid(mineral) {
        // Criterio Metamórficas:  Metamórfica + Grano medio o fino + Vitrea
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
        // Criterio Sedimentaria: sedimentaria + Fanerítica
        return (mineral.grupo === TipoRoca.Sedimentaria &&
            mineral.textura === Textura.Faneritica);
    }
}
//# sourceMappingURL=validadores.js.map