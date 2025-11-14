"use strict";
// types.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.Clasificacion = exports.Textura = exports.TamanoGrano = exports.TipoRoca = void 0;
var TipoRoca;
(function (TipoRoca) {
    TipoRoca["Ignea"] = "\u00EDgneas";
    TipoRoca["Metamorfica"] = "metam\u00F3rficas";
    TipoRoca["Sedimentaria"] = "sedimentarias";
})(TipoRoca || (exports.TipoRoca = TipoRoca = {}));
var TamanoGrano;
(function (TamanoGrano) {
    TamanoGrano["MuyGrueso"] = "muy grueso";
    TamanoGrano["Grueso"] = "grueso";
    TamanoGrano["Medio"] = "medio";
    TamanoGrano["Fino"] = "fino";
})(TamanoGrano || (exports.TamanoGrano = TamanoGrano = {}));
var Textura;
(function (Textura) {
    Textura["Vitrea"] = "v\u00EDtrea";
    Textura["Afanitica"] = "afan\u00EDtica";
    Textura["Faneritica"] = "faner\u00EDtica";
})(Textura || (exports.Textura = Textura = {}));
var Clasificacion;
(function (Clasificacion) {
    Clasificacion["Construccion"] = "construcci\u00F3n";
    Clasificacion["Ornamental"] = "ornamental";
    Clasificacion["Utensilios"] = "utensilios";
    Clasificacion["Machacadas"] = "machacadas";
})(Clasificacion || (exports.Clasificacion = Clasificacion = {}));
