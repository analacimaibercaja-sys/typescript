// mision.ts

import { IMisionable, IEntrada, ISalida, IValidable, IPilotable } from './interfaces.js';
import { Mineral } from './types';

export class Mision implements IMisionable {
    constructor(
        private entrada: IEntrada,
        private salida: ISalida,
        private criterio: IValidable,
        private piloto: IPilotable
    ) {}

    Analiza(mineral: Mineral): { valido: boolean; mensaje: string } {
        const esValido = this.criterio.isValid(mineral);
        
        const mensaje = esValido 
            ? `El mineral ${mineral.nombre} cumple con el ${this.criterio.getNombre()}`
            : `El mineral ${mineral.nombre} NO cumple con el ${this.criterio.getNombre()}`;
        
        return {
            valido: esValido,
            mensaje: mensaje
        };
    }

    muestra(mineral: Mineral): string {
        return this.salida.mostrar(mineral);
    }

    getPiloto(): IPilotable {
        return this.piloto;
    }

    getCriterio(): IValidable {
        return this.criterio;
    }

    setCriterio(criterio: IValidable): void {
        this.criterio = criterio;
    }

    setSalida(salida: ISalida): void {
        this.salida = salida;
    }

    setEntrada(entrada: IEntrada): void {
        this.entrada = entrada;
    }
}
