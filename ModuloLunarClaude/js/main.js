"use strict";
// main.ts
// Archivo principal de la aplicación
Object.defineProperty(exports, "__esModule", { value: true });
var astronauta_1 = require("./astronauta");
var validadores_1 = require("./validadores");
var sistemas_1 = require("./sistemas");
var mision_1 = require("./mision");
var types_1 = require("./types");
// Estado global de la aplicación
var astronauta;
var modoFormulario = "extendido";
var formatoSalida = "europeo";
var validadorActual;
var sistemaEntrada;
var sistemaSalida;
var mision;
/**
 * Inicializa la aplicación
 */
function inicializarApp() {
    astronauta = new astronauta_1.Astronauta("AG001", "Agmunsen Pérez", 45);
    validadorActual = new validadores_1.ValidadorIgneas();
    sistemaEntrada = new sistemas_1.EntradaExtendida();
    sistemaSalida = new sistemas_1.FormatoEuropeo();
    mision = new mision_1.Mision(sistemaEntrada, sistemaSalida, validadorActual, astronauta);
    mostrarInfoAstronauta();
    configurarEventos();
    renderizarFormulario();
}
/**
 * Muestra la información del astronauta
 */
function mostrarInfoAstronauta() {
    var elemento = document.getElementById('astronautaInfo');
    if (elemento) {
        elemento.textContent =
            "".concat(astronauta.dameNombreCompleto(), " (").concat(astronauta.dameIdentificador(), ") - ").concat(astronauta.dameEdad(), " a\u00F1os");
    }
}
/**
 * Configura todos los eventos de la aplicación
 */
function configurarEventos() {
    var _a, _b, _c, _d, _e;
    // Eventos de modo de formulario
    (_a = document.getElementById('btnExtendido')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', function () { return cambiarModoFormulario('extendido'); });
    (_b = document.getElementById('btnReducido')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', function () { return cambiarModoFormulario('reducido'); });
    // Eventos de formato de salida
    (_c = document.getElementById('btnEuropeo')) === null || _c === void 0 ? void 0 : _c.addEventListener('click', function () { return cambiarFormatoSalida('europeo'); });
    (_d = document.getElementById('btnAmericano')) === null || _d === void 0 ? void 0 : _d.addEventListener('click', function () { return cambiarFormatoSalida('americano'); });
    // Evento de cambio de criterio
    (_e = document.getElementById('criterioSelect')) === null || _e === void 0 ? void 0 : _e.addEventListener('change', function (e) {
        var select = e.target;
        cambiarCriterio(select.value);
    });
}
/**
 * Cambia el modo del formulario
 */
function cambiarModoFormulario(modo) {
    var _a, _b;
    modoFormulario = modo;
    sistemaEntrada = modo === 'extendido' ? new sistemas_1.EntradaExtendida() : new sistemas_1.EntradaReducida();
    mision.setEntrada(sistemaEntrada);
    (_a = document.getElementById('btnExtendido')) === null || _a === void 0 ? void 0 : _a.classList.toggle('active', modo === 'extendido');
    (_b = document.getElementById('btnReducido')) === null || _b === void 0 ? void 0 : _b.classList.toggle('active', modo === 'reducido');
    var textoModo = document.getElementById('modoFormularioTexto');
    if (textoModo) {
        textoModo.textContent = modo === 'extendido' ? 'Modo Extendido' : 'Modo Reducido';
    }
    renderizarFormulario();
}
/**
 * Cambia el formato de salida
 */
function cambiarFormatoSalida(formato) {
    var _a, _b;
    formatoSalida = formato;
    sistemaSalida = formato === 'europeo' ? new sistemas_1.FormatoEuropeo() : new sistemas_1.FormatoAmericano();
    mision.setSalida(sistemaSalida);
    (_a = document.getElementById('btnEuropeo')) === null || _a === void 0 ? void 0 : _a.classList.toggle('active', formato === 'europeo');
    (_b = document.getElementById('btnAmericano')) === null || _b === void 0 ? void 0 : _b.classList.toggle('active', formato === 'americano');
    var textoFormato = document.getElementById('formatoSalidaTexto');
    if (textoFormato) {
        textoFormato.textContent = formato === 'europeo' ? 'Formato Europeo' : 'Formato Americano';
    }
}
/**
 * Cambia el criterio de validación
 */
function cambiarCriterio(tipo) {
    switch (tipo) {
        case 'igneas':
            validadorActual = new validadores_1.ValidadorIgneas();
            break;
        case 'metamorficas':
            validadorActual = new validadores_1.ValidadorMetamorficas();
            break;
        case 'sedimentarias':
            validadorActual = new validadores_1.ValidadorSedimentarias();
            break;
    }
    mision.setCriterio(validadorActual);
    var criterioTexto = document.getElementById('criterioActual');
    if (criterioTexto) {
        criterioTexto.textContent = validadorActual.getNombre();
    }
    ocultarResultados();
}
/**
 * Valida el formato del ID
 */
function validarId(id) {
    var patron = /^[A-Za-z]{2}\d{4}[A-Za-z]{2}$/;
    return patron.test(id);
}
/**
 * Analiza el mineral del formulario
 */
function analizarMineral() {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
    var id = (_a = document.getElementById('inputId')) === null || _a === void 0 ? void 0 : _a.value.trim();
    var nombre = (_b = document.getElementById('inputNombre')) === null || _b === void 0 ? void 0 : _b.value.trim();
    var grupo = (_c = document.querySelector('input[name="grupo"]:checked')) === null || _c === void 0 ? void 0 : _c.value;
    var dureza = parseInt((_d = document.getElementById('inputDureza')) === null || _d === void 0 ? void 0 : _d.value);
    var tamanoCristales = parseFloat((_e = document.getElementById('inputCristales')) === null || _e === void 0 ? void 0 : _e.value);
    var tamanoGrano = (_f = document.querySelector('input[name="tamanoGrano"]:checked')) === null || _f === void 0 ? void 0 : _f.value;
    var clasificacion = (_g = document.getElementById('inputClasificacion')) === null || _g === void 0 ? void 0 : _g.value;
    var temperaturaFormacion = parseFloat((_h = document.getElementById('inputTemperatura')) === null || _h === void 0 ? void 0 : _h.value);
    var estructura = (_j = document.getElementById('inputEstructura')) === null || _j === void 0 ? void 0 : _j.value.trim();
    var formaGranos = (_k = document.getElementById('inputForma')) === null || _k === void 0 ? void 0 : _k.value.trim();
    var textura = (_l = document.querySelector('input[name="textura"]:checked')) === null || _l === void 0 ? void 0 : _l.value;
    // Validaciones
    if (!id || !nombre || !grupo || !tamanoGrano || !clasificacion || !textura) {
        alert('Por favor, complete todos los campos obligatorios');
        return;
    }
    if (!validarId(id)) {
        alert('El ID debe tener el formato LLDDDDLL (2 letras, 4 números, 2 letras)');
        return;
    }
    // Crear mineral
    var mineral = {
        id: id,
        nombre: nombre,
        grupo: grupo,
        dureza: dureza,
        tamanoCristales: tamanoCristales,
        tamanoGrano: tamanoGrano,
        clasificacion: clasificacion,
        temperaturaFormacion: temperaturaFormacion,
        estructura: estructura,
        formaGranos: formaGranos,
        textura: textura
    };
    // Analizar con la misión
    var resultado = mision.Analiza(mineral);
    mostrarResultado(resultado, mineral);
}
/**
 * Muestra el resultado del análisis
 */
function mostrarResultado(resultado, mineral) {
    var resultadoCard = document.getElementById('resultadoCard');
    var resultadoHeader = document.getElementById('resultadoHeader');
    var resultadoTitulo = document.getElementById('resultadoTitulo');
    var resultadoEmoji = document.getElementById('resultadoEmoji');
    var resultadoMensaje = document.getElementById('resultadoMensaje');
    if (!resultadoCard || !resultadoHeader || !resultadoTitulo || !resultadoEmoji || !resultadoMensaje) {
        return;
    }
    resultadoCard.style.display = 'block';
    if (resultado.valido) {
        resultadoHeader.className = 'card-header bg-success text-white';
        resultadoTitulo.textContent = '✓ Mineral Válido';
        resultadoEmoji.textContent = '😊';
        resultadoMensaje.textContent = resultado.mensaje;
        // Mostrar salida formateada
        var salidaCard = document.getElementById('salidaCard');
        var salidaContainer = document.getElementById('salidaContainer');
        if (salidaCard && salidaContainer) {
            salidaCard.style.display = 'block';
            salidaContainer.innerHTML = mision.muestra(mineral);
        }
    }
    else {
        resultadoHeader.className = 'card-header bg-danger text-white';
        resultadoTitulo.textContent = '✗ Mineral No Válido';
        resultadoEmoji.textContent = '😠';
        resultadoMensaje.textContent = resultado.mensaje;
        var salidaCard = document.getElementById('salidaCard');
        if (salidaCard) {
            salidaCard.style.display = 'none';
        }
    }
}
/**
 * Oculta los resultados
 */
function ocultarResultados() {
    var resultadoCard = document.getElementById('resultadoCard');
    var salidaCard = document.getElementById('salidaCard');
    if (resultadoCard)
        resultadoCard.style.display = 'none';
    if (salidaCard)
        salidaCard.style.display = 'none';
}
/**
 * Limpia el formulario
 */
function limpiarFormulario() {
    renderizarFormulario();
    ocultarResultados();
}
/**
 * Renderiza el formulario según el modo actual
 */
function renderizarFormulario() {
    var _a, _b;
    var container = document.getElementById('formularioContainer');
    if (!container)
        return;
    var isExtendido = modoFormulario === "extendido";
    container.innerHTML = generarHTMLFormulario(isExtendido);
    // Configurar eventos del formulario
    (_a = document.getElementById('btnAnalizar')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', analizarMineral);
    (_b = document.getElementById('btnLimpiar')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', limpiarFormulario);
}
/**
 * Genera el HTML del formulario
 */
function generarHTMLFormulario(isExtendido) {
    var labelId = isExtendido ? '<label class="form-label-extended">ID (LLDDDDLL)</label>' : '';
    var labelNombre = isExtendido ? '<label class="form-label-extended">Nombre</label>' : '';
    var labelDureza = isExtendido ? '<label class="form-label-extended">Dureza (Escala de Mohs, 1-10)</label>' : '';
    var labelCristales = isExtendido ? '<label class="form-label-extended">Tamaño de cristales (0-10)</label>' : '';
    var labelClasificacion = isExtendido ? '<label class="form-label-extended">Clasificación</label>' : '';
    var labelTemperatura = isExtendido ? '<label class="form-label-extended">Temperatura de formación (K)</label>' : '';
    var labelEstructura = isExtendido ? '<label class="form-label-extended">Estructura</label>' : '';
    var labelForma = isExtendido ? '<label class="form-label-extended">Forma de los granos</label>' : '';
    return "\n        <div class=\"row\">\n            <div class=\"col-md-6 mb-3\">\n                ".concat(labelId, "\n                <input type=\"text\" class=\"form-control\" id=\"inputId\" maxlength=\"8\" \n                       placeholder=\"").concat(!isExtendido ? 'ID (formato LLDDDDLL) - Ej: AB1234CD' : 'Ej: AB1234CD', "\" required>\n                <div class=\"hint-text mt-1\">2 letras, 4 n\u00FAmeros, 2 letras</div>\n            </div>\n            <div class=\"col-md-6 mb-3\">\n                ").concat(labelNombre, "\n                <input type=\"text\" class=\"form-control\" id=\"inputNombre\" \n                       placeholder=\"").concat(!isExtendido ? 'Nombre del mineral' : '', "\" required>\n            </div>\n        </div>\n\n        <div class=\"mb-3\">\n            <label class=\"form-label-extended\">Grupo / Origen</label>\n            <div class=\"d-flex gap-3\">\n                <div class=\"form-check\">\n                    <input class=\"form-check-input\" type=\"radio\" name=\"grupo\" value=\"").concat(types_1.TipoRoca.Ignea, "\" id=\"grupoIgnea\">\n                    <label class=\"form-check-label\" for=\"grupoIgnea\">").concat(types_1.TipoRoca.Ignea, "</label>\n                </div>\n                <div class=\"form-check\">\n                    <input class=\"form-check-input\" type=\"radio\" name=\"grupo\" value=\"").concat(types_1.TipoRoca.Metamorfica, "\" id=\"grupoMeta\">\n                    <label class=\"form-check-label\" for=\"grupoMeta\">").concat(types_1.TipoRoca.Metamorfica, "</label>\n                </div>\n                <div class=\"form-check\">\n                    <input class=\"form-check-input\" type=\"radio\" name=\"grupo\" value=\"").concat(types_1.TipoRoca.Sedimentaria, "\" id=\"grupoSedi\">\n                    <label class=\"form-check-label\" for=\"grupoSedi\">").concat(types_1.TipoRoca.Sedimentaria, "</label>\n                </div>\n            </div>\n        </div>\n\n        <div class=\"row\">\n            <div class=\"col-md-6 mb-3\">\n                ").concat(labelDureza, "\n                <input type=\"number\" class=\"form-control\" id=\"inputDureza\" min=\"1\" max=\"10\" value=\"5\"\n                       placeholder=\"").concat(!isExtendido ? 'Dureza (1-10)' : '', "\" required>\n            </div>\n            <div class=\"col-md-6 mb-3\">\n                ").concat(labelCristales, "\n                <input type=\"number\" class=\"form-control\" id=\"inputCristales\" min=\"0\" max=\"10\" step=\"0.1\" value=\"5\"\n                       placeholder=\"").concat(!isExtendido ? 'Tamaño de cristales (0-10)' : '', "\" required>\n            </div>\n        </div>\n\n        <div class=\"mb-3\">\n            <label class=\"form-label-extended\">Tama\u00F1o de grano</label>\n            <div class=\"row\">\n                <div class=\"col-6 col-md-3\">\n                    <div class=\"form-check\">\n                        <input class=\"form-check-input\" type=\"radio\" name=\"tamanoGrano\" value=\"").concat(types_1.TamanoGrano.MuyGrueso, "\" id=\"granoMuyGrueso\">\n                        <label class=\"form-check-label small\" for=\"granoMuyGrueso\">").concat(types_1.TamanoGrano.MuyGrueso, "</label>\n                    </div>\n                </div>\n                <div class=\"col-6 col-md-3\">\n                    <div class=\"form-check\">\n                        <input class=\"form-check-input\" type=\"radio\" name=\"tamanoGrano\" value=\"").concat(types_1.TamanoGrano.Grueso, "\" id=\"granoGrueso\">\n                        <label class=\"form-check-label small\" for=\"granoGrueso\">").concat(types_1.TamanoGrano.Grueso, "</label>\n                    </div>\n                </div>\n                <div class=\"col-6 col-md-3\">\n                    <div class=\"form-check\">\n                        <input class=\"form-check-input\" type=\"radio\" name=\"tamanoGrano\" value=\"").concat(types_1.TamanoGrano.Medio, "\" id=\"granoMedio\">\n                        <label class=\"form-check-label small\" for=\"granoMedio\">").concat(types_1.TamanoGrano.Medio, "</label>\n                    </div>\n                </div>\n                <div class=\"col-6 col-md-3\">\n                    <div class=\"form-check\">\n                        <input class=\"form-check-input\" type=\"radio\" name=\"tamanoGrano\" value=\"").concat(types_1.TamanoGrano.Fino, "\" id=\"granoFino\">\n                        <label class=\"form-check-label small\" for=\"granoFino\">").concat(types_1.TamanoGrano.Fino, "</label>\n                    </div>\n                </div>\n            </div>\n        </div>\n\n        <div class=\"row\">\n            <div class=\"col-md-6 mb-3\">\n                ").concat(labelClasificacion, "\n                <select class=\"form-select\" id=\"inputClasificacion\" required>\n                    <option value=\"\">-- Seleccionar clasificaci\u00F3n --</option>\n                    <option value=\"").concat(types_1.Clasificacion.Construccion, "\">Construcci\u00F3n</option>\n                    <option value=\"").concat(types_1.Clasificacion.Ornamental, "\">Ornamental</option>\n                    <option value=\"").concat(types_1.Clasificacion.Utensilios, "\">Utensilios</option>\n                    <option value=\"").concat(types_1.Clasificacion.Machacadas, "\">Piedras machacadas</option>\n                </select>\n            </div>\n            <div class=\"col-md-6 mb-3\">\n                ").concat(labelTemperatura, "\n                <input type=\"number\" class=\"form-control\" id=\"inputTemperatura\" min=\"-100\" max=\"100\" step=\"0.1\" value=\"0\"\n                       placeholder=\"").concat(!isExtendido ? 'Temperatura (-100 a 100 K)' : '', "\" required>\n                <div class=\"hint-text mt-1\">Rango: -100 a 100 K</div>\n            </div>\n        </div>\n\n        <div class=\"mb-3\">\n            ").concat(labelEstructura, "\n            <textarea class=\"form-control\" id=\"inputEstructura\" rows=\"2\"\n                      placeholder=\"").concat(!isExtendido ? 'Estructura - Texto libre' : 'Texto libre sobre la estructura', "\"></textarea>\n        </div>\n\n        <div class=\"mb-3\">\n            ").concat(labelForma, "\n            <textarea class=\"form-control\" id=\"inputForma\" rows=\"2\"\n                      placeholder=\"").concat(!isExtendido ? 'Forma de los granos - Texto libre' : 'Texto libre sobre la forma de los granos', "\"></textarea>\n        </div>\n\n        <div class=\"mb-3\">\n            <label class=\"form-label-extended\">Textura</label>\n            <div class=\"d-flex gap-3\">\n                <div class=\"form-check\">\n                    <input class=\"form-check-input\" type=\"radio\" name=\"textura\" value=\"").concat(types_1.Textura.Vitrea, "\" id=\"texturaVitrea\">\n                    <label class=\"form-check-label\" for=\"texturaVitrea\">").concat(types_1.Textura.Vitrea, "</label>\n                </div>\n                <div class=\"form-check\">\n                    <input class=\"form-check-input\" type=\"radio\" name=\"textura\" value=\"").concat(types_1.Textura.Afanitica, "\" id=\"texturaAfanitica\">\n                    <label class=\"form-check-label\" for=\"texturaAfanitica\">").concat(types_1.Textura.Afanitica, "</label>\n                </div>\n                <div class=\"form-check\">\n                    <input class=\"form-check-input\" type=\"radio\" name=\"textura\" value=\"").concat(types_1.Textura.Faneritica, "\" id=\"texturaFaneritica\">\n                    <label class=\"form-check-label\" for=\"texturaFaneritica\">").concat(types_1.Textura.Faneritica, "</label>\n                </div>\n            </div>\n        </div>\n\n        <div class=\"d-flex gap-2\">\n            <button type=\"button\" class=\"btn btn-primary\" id=\"btnAnalizar\">Analizar Mineral</button>\n            <button type=\"button\" class=\"btn btn-secondary\" id=\"btnLimpiar\">Limpiar</button>\n        </div>\n    ");
}
// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', inicializarApp);
