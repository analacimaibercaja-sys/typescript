"use strict";
// mision.ts
// Clase Misión que coordina entrada, salida, validación y piloto
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mision = void 0;
var Mision = /** @class */ (function () {
    function Mision(entrada, salida, criterio, piloto) {
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
    Mision.prototype.Analiza = function (mineral) {
        //const esValido = this.criterio.esValid(mineral);
        var esValido = this.criterio.isValid(mineral);
        var mensaje = esValido
            ? "El mineral ".concat(mineral.nombre, " cumple con el ").concat(this.criterio.getNombre())
            : "El mineral ".concat(mineral.nombre, " NO cumple con el ").concat(this.criterio.getNombre());
        return {
            valido: esValido,
            mensaje: mensaje
        };
    };
    /**
     * Muestra el mineral en el formato de salida actual
     * @param mineral - Mineral a mostrar
     * @returns HTML formateado del mineral
     */
    Mision.prototype.muestra = function (mineral) {
        return this.salida.mostrar(mineral);
    };
    /**
     * Obtiene el piloto asignado a la misión
     */
    Mision.prototype.getPiloto = function () {
        return this.piloto;
    };
    /**
     * Obtiene el criterio de validación actual
     */
    Mision.prototype.getCriterio = function () {
        return this.criterio;
    };
    /**
     * Cambia el criterio de validación
     */
    Mision.prototype.setCriterio = function (criterio) {
        this.criterio = criterio;
    };
    /**
     * Cambia el sistema de salida
     */
    Mision.prototype.setSalida = function (salida) {
        this.salida = salida;
    };
    /**
     * Cambia el sistema de entrada
     */
    Mision.prototype.setEntrada = function (entrada) {
        this.entrada = entrada;
    };
    return Mision;
}());
exports.Mision = Mision;
