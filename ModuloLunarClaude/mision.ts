// mision.ts
// Clase Misión que coordina entrada, salida, validación y piloto

import { IMisionable, IEntrada, ISalida, IValidable, IPilotable } from './interfaces';
import { Mineral } from './types';

export class Mision implements IMisionable {
    constructor(
        private entrada: IEntrada,
        private salida: ISalida,
        private criterio: IValidable,
        private piloto: IPilotable
    ) {}

    /**
     * Analiza un mineral según el criterio de validación actual
     * @param mineral - Mineral a analizar
     * @returns Objeto con validez y mensaje
     */
    Analiza(mineral: Mineral): { valido: boolean; mensaje: string } {
        const esValido = this.criterio.esValid(mineral);
        
        const mensaje = esValido 
            ? `El mineral ${mineral.nombre} cumple con el ${this.criterio.getNombre()}`
            : `El mineral ${mineral.nombre} NO cumple con el ${this.criterio.getNombre()}`;
        
        return {
            valido: esValido,
            mensaje: mensaje
        };
    }

    /**
     * Muestra el mineral en el formato de salida actual
     * @param mineral - Mineral a mostrar
     * @returns HTML formateado del mineral
     */
    muestra(mineral: Mineral): string {
        return this.salida.mostrar(mineral);
    }

    /**
     * Obtiene el piloto asignado a la misión
     */
    getPiloto(): IPilotable {
        return this.piloto;
    }

    /**
     * Obtiene el criterio de validación actual
     */
    getCriterio(): IValidable {
        return this.criterio;
    }

    /**
     * Cambia el criterio de validación
     */
    setCriterio(criterio: IValidable): void {
        this.criterio = criterio;
    }

    /**
     * Cambia el sistema de salida
     */
    setSalida(salida: ISalida): void {
        this.salida = salida;
    }

    /**
     * Cambia el sistema de entrada
     */
    setEntrada(entrada: IEntrada): void {
        this.entrada = entrada;
    }
}
