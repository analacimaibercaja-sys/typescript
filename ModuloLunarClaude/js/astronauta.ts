// astronauta.ts
// Implementación de la clase Astronauta

import { IPilotable } from './interfaces.js';

export class Astronauta implements IPilotable {
    constructor(
        private identificador: string,
        private nombreCompleto: string,
        private edad: number
    ) {}

    dameIdentificador(): string {
        return this.identificador;
    }

    dameNombreCompleto(): string {
        return this.nombreCompleto;
    }

    dameEdad(): number {
        return this.edad;
    }
}
