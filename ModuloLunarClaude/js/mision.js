// mision.ts
// Clase Misión que coordina entrada, salida, validación y piloto
export class Mision {
    constructor(entrada, salida, criterio, piloto) {
        this.entrada = entrada;
        this.salida = salida;
        this.criterio = criterio;
        this.piloto = piloto;
    }
    /**
     * Analiza un mineral según el criterio de validación actual
     * @param mineral - Mineral a analizar
     * @returns Objeto con validez y mensaje
     */
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
    /**
     * Muestra el mineral en el formato de salida actual
     * @param mineral - Mineral a mostrar
     * @returns HTML formateado del mineral
     */
    muestra(mineral) {
        return this.salida.mostrar(mineral);
    }
    /**
     * Obtiene el piloto asignado a la misión
     */
    getPiloto() {
        return this.piloto;
    }
    /**
     * Obtiene el criterio de validación actual
     */
    getCriterio() {
        return this.criterio;
    }
    /**
     * Cambia el criterio de validación
     */
    setCriterio(criterio) {
        this.criterio = criterio;
    }
    /**
     * Cambia el sistema de salida
     */
    setSalida(salida) {
        this.salida = salida;
    }
    /**
     * Cambia el sistema de entrada
     */
    setEntrada(entrada) {
        this.entrada = entrada;
    }
}
//# sourceMappingURL=mision.js.map