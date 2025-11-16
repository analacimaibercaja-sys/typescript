// mision.ts
export class Mision {
    constructor(entrada, salida, criterio, piloto) {
        this.entrada = entrada;
        this.salida = salida;
        this.criterio = criterio;
        this.piloto = piloto;
    }
    Analiza(mineral) {
        const esValido = this.criterio.isValid(mineral);
        const mensaje = esValido
            ? `El mineral ${mineral.nombre} cumple con el ${this.criterio.getNombre()}`
            : `El mineral ${mineral.nombre} NO cumple con el ${this.criterio.getNombre()}`;
        return {
            valido: esValido,
            mensaje: mensaje
        };
    }
    muestra(mineral) {
        return this.salida.mostrar(mineral);
    }
    getPiloto() {
        return this.piloto;
    }
    getCriterio() {
        return this.criterio;
    }
    setCriterio(criterio) {
        this.criterio = criterio;
    }
    setSalida(salida) {
        this.salida = salida;
    }
    setEntrada(entrada) {
        this.entrada = entrada;
    }
}
//# sourceMappingURL=mision.js.map