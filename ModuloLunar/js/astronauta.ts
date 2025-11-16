// astronauta.ts

import { IPilotable } from './interfaces.js';

export class Astronauta implements IPilotable {
    constructor(
        private readonly identificador: string,
        private readonly nombreCompleto: string,
        private readonly edad: number
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
