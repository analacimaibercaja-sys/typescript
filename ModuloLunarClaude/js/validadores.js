"use strict";
// validadores.ts
// Implementación de los criterios de validación de minerales
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidadorSedimentarias = exports.ValidadorMetamorficas = exports.ValidadorIgneas = void 0;
var types_1 = require("./types");
var ValidadorIgneas = /** @class */ (function () {
    function ValidadorIgneas() {
    }
    ValidadorIgneas.prototype.getNombre = function () {
        return 'Criterio Ígneas';
    };
    ValidadorIgneas.prototype.isValid = function (mineral) {
        // Criterio Igneas: Roca de grupo ígneas + Grano muy grueso
        return (mineral.grupo === types_1.TipoRoca.Ignea &&
            mineral.tamanoGrano === types_1.TamanoGrano.MuyGrueso);
    };
    return ValidadorIgneas;
}());
exports.ValidadorIgneas = ValidadorIgneas;
var ValidadorMetamorficas = /** @class */ (function () {
    function ValidadorMetamorficas() {
    }
    ValidadorMetamorficas.prototype.getNombre = function () {
        return 'Criterio Metamórficas';
    };
    ValidadorMetamorficas.prototype.isValid = function (mineral) {
        // Criterio Metamórficas: Rocas de grupo Metamórfica + Grano medio o fino + Textura Vitrea
        return (mineral.grupo === types_1.TipoRoca.Metamorfica &&
            (mineral.tamanoGrano === types_1.TamanoGrano.Medio ||
                mineral.tamanoGrano === types_1.TamanoGrano.Fino) &&
            mineral.textura === types_1.Textura.Vitrea);
    };
    return ValidadorMetamorficas;
}());
exports.ValidadorMetamorficas = ValidadorMetamorficas;
var ValidadorSedimentarias = /** @class */ (function () {
    function ValidadorSedimentarias() {
    }
    ValidadorSedimentarias.prototype.getNombre = function () {
        return 'Criterio Sedimentarias';
    };
    ValidadorSedimentarias.prototype.isValid = function (mineral) {
        // Criterio Sedimentaria: Rocas de grupo sedimentaria + Textura: Fanerítica
        return (mineral.grupo === types_1.TipoRoca.Sedimentaria &&
            mineral.textura === types_1.Textura.Faneritica);
    };
    return ValidadorSedimentarias;
}());
exports.ValidadorSedimentarias = ValidadorSedimentarias;
