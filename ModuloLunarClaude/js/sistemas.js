"use strict";
// sistemas.ts
// Implementación de sistemas de entrada y salida de datos
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormatoAmericano = exports.FormatoEuropeo = exports.EntradaReducida = exports.EntradaExtendida = void 0;
// ==================== SISTEMAS DE ENTRADA ====================
var EntradaExtendida = /** @class */ (function () {
    function EntradaExtendida() {
    }
    EntradaExtendida.prototype.muestra = function () {
        return "extendido";
    };
    return EntradaExtendida;
}());
exports.EntradaExtendida = EntradaExtendida;
var EntradaReducida = /** @class */ (function () {
    function EntradaReducida() {
    }
    EntradaReducida.prototype.muestra = function () {
        return "reducido";
    };
    return EntradaReducida;
}());
exports.EntradaReducida = EntradaReducida;
// ==================== SISTEMAS DE SALIDA ====================
var FormatoEuropeo = /** @class */ (function () {
    function FormatoEuropeo() {
    }
    FormatoEuropeo.prototype.mostrar = function (mineral) {
        var tempC = (mineral.temperaturaFormacion - 273.15).toFixed(2);
        return "\n            <div class=\"row\">\n                <div class=\"col-md-6\">\n                    <h6 class=\"fw-bold text-primary\">Informaci\u00F3n del Mineral</h6>\n                    <table class=\"table table-sm\">\n                        <tbody>\n                            <tr><td class=\"fw-bold\">ID:</td><td>".concat(mineral.id, "</td></tr>\n                            <tr><td class=\"fw-bold\">Nombre:</td><td>").concat(mineral.nombre, "</td></tr>\n                            <tr><td class=\"fw-bold\">Grupo:</td><td>").concat(mineral.grupo, "</td></tr>\n                            <tr><td class=\"fw-bold\">Dureza:</td><td>").concat(mineral.dureza, " (Mohs)</td></tr>\n                            <tr><td class=\"fw-bold\">Tama\u00F1o de grano:</td><td>").concat(mineral.tamanoGrano, "</td></tr>\n                            <tr><td class=\"fw-bold\">Textura:</td><td>").concat(mineral.textura, "</td></tr>\n                        </tbody>\n                    </table>\n                </div>\n                <div class=\"col-md-6\">\n                    <h6 class=\"fw-bold text-primary\">Detalles Adicionales</h6>\n                    <table class=\"table table-sm\">\n                        <tbody>\n                            <tr><td class=\"fw-bold\">Clasificaci\u00F3n:</td><td>").concat(mineral.clasificacion, "</td></tr>\n                            <tr><td class=\"fw-bold\">Tama\u00F1o cristales:</td><td>").concat(mineral.tamanoCristales, "</td></tr>\n                            <tr><td class=\"fw-bold\">Temperatura:</td><td>").concat(tempC, " \u00B0C</td></tr>\n                            <tr><td class=\"fw-bold\">Estructura:</td><td>").concat(mineral.estructura || 'N/A', "</td></tr>\n                            <tr><td class=\"fw-bold\">Forma granos:</td><td>").concat(mineral.formaGranos || 'N/A', "</td></tr>\n                        </tbody>\n                    </table>\n                </div>\n            </div>\n        ");
    };
    return FormatoEuropeo;
}());
exports.FormatoEuropeo = FormatoEuropeo;
var FormatoAmericano = /** @class */ (function () {
    function FormatoAmericano() {
    }
    FormatoAmericano.prototype.mostrar = function (mineral) {
        var tempF = (((mineral.temperaturaFormacion - 273.15) * 9 / 5) + 32).toFixed(2);
        return "\n            <div class=\"row\">\n                <div class=\"col-md-6\">\n                    <h6 class=\"fw-bold text-primary\">Mineral Information</h6>\n                    <table class=\"table table-sm\">\n                        <tbody>\n                            <tr><td class=\"fw-bold\">ID:</td><td>".concat(mineral.id, "</td></tr>\n                            <tr><td class=\"fw-bold\">Name:</td><td>").concat(mineral.nombre, "</td></tr>\n                            <tr><td class=\"fw-bold\">Group:</td><td>").concat(mineral.grupo, "</td></tr>\n                            <tr><td class=\"fw-bold\">Hardness:</td><td>").concat(mineral.dureza, " (Mohs)</td></tr>\n                            <tr><td class=\"fw-bold\">Grain Size:</td><td>").concat(mineral.tamanoGrano, "</td></tr>\n                            <tr><td class=\"fw-bold\">Texture:</td><td>").concat(mineral.textura, "</td></tr>\n                        </tbody>\n                    </table>\n                </div>\n                <div class=\"col-md-6\">\n                    <h6 class=\"fw-bold text-primary\">Additional Details</h6>\n                    <table class=\"table table-sm\">\n                        <tbody>\n                            <tr><td class=\"fw-bold\">Classification:</td><td>").concat(mineral.clasificacion, "</td></tr>\n                            <tr><td class=\"fw-bold\">Crystal Size:</td><td>").concat(mineral.tamanoCristales, "</td></tr>\n                            <tr><td class=\"fw-bold\">Temperature:</td><td>").concat(tempF, " \u00B0F</td></tr>\n                            <tr><td class=\"fw-bold\">Structure:</td><td>").concat(mineral.estructura || 'N/A', "</td></tr>\n                            <tr><td class=\"fw-bold\">Grain Shape:</td><td>").concat(mineral.formaGranos || 'N/A', "</td></tr>\n                        </tbody>\n                    </table>\n                </div>\n            </div>\n        ");
    };
    return FormatoAmericano;
}());
exports.FormatoAmericano = FormatoAmericano;
