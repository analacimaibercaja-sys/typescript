"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// ============================================
// CLASE MINERAL
// ============================================
/**
 * Clase Mineral
 * Gestiona los datos de un mineral con método de validación predicado
 */
var Mineral = /** @class */ (function () {
    function Mineral(id, nombre, grupo, dureza, tamanoGrano, clasificacion, tamanoCristales, temperaturaFormacion, estructura, formaGranos, textura) {
        this.id = id;
        this.nombre = nombre;
        this.grupo = grupo;
        this.dureza = dureza;
        this.tamanoGrano = tamanoGrano;
        this.clasificacion = clasificacion;
        this.tamanoCristales = tamanoCristales;
        this.temperaturaFormacion = temperaturaFormacion;
        this.estructura = estructura;
        this.formaGranos = formaGranos;
        this.textura = textura;
    }
    /**
     * Método predicado para validar según un criterio
     */
    Mineral.prototype.valida = function (criterio) {
        return criterio.valida(this);
    };
    Mineral.validarID = function (id) {
        var regex = /^[A-Z]{2}\d{4}[A-Z]{2}$/;
        return regex.test(id);
    };
    return Mineral;
}());
// ============================================
// CLASE ASTRONAUTA
// ============================================
var Astronauta = /** @class */ (function () {
    function Astronauta(identificador, nombreCompleto, edad) {
        this.identificador = identificador;
        this.nombreCompleto = nombreCompleto;
        this.edad = edad;
    }
    Astronauta.prototype.dameId = function () {
        return this.identificador;
    };
    Astronauta.prototype.dameNombre = function () {
        return this.nombreCompleto;
    };
    Astronauta.prototype.dameEdad = function () {
        return this.edad;
    };
    return Astronauta;
}());
// ============================================
// CRITERIOS DE VALIDACIÓN
// ============================================
var CriterioIgneas = /** @class */ (function () {
    function CriterioIgneas() {
    }
    CriterioIgneas.prototype.getNombre = function () {
        return 'Ígneo';
    };
    CriterioIgneas.prototype.valida = function (mineral) {
        return mineral.grupo === 'igneas' && mineral.tamanoGrano === 'muy-grueso';
    };
    return CriterioIgneas;
}());
var CriterioMetamorficas = /** @class */ (function () {
    function CriterioMetamorficas() {
    }
    CriterioMetamorficas.prototype.getNombre = function () {
        return 'Metamórfico';
    };
    CriterioMetamorficas.prototype.valida = function (mineral) {
        return mineral.grupo === 'metamorficas' &&
            (mineral.tamanoGrano === 'medio' || mineral.tamanoGrano === 'fino') &&
            mineral.textura === 'vitrea';
    };
    return CriterioMetamorficas;
}());
var CriterioSedimentaria = /** @class */ (function () {
    function CriterioSedimentaria() {
    }
    CriterioSedimentaria.prototype.getNombre = function () {
        return 'Sedimentario';
    };
    CriterioSedimentaria.prototype.valida = function (mineral) {
        return mineral.grupo === 'sedimentarias' && mineral.textura === 'faneritica';
    };
    return CriterioSedimentaria;
}());
// ============================================
// SISTEMAS DE ENTRADA (CON RENDERIZADO DINÁMICO)
// ============================================
var IntroduccionExtendida = /** @class */ (function () {
    function IntroduccionExtendida() {
    }
    IntroduccionExtendida.prototype.getNombre = function () {
        return 'Extendida';
    };
    IntroduccionExtendida.prototype.capturar = function () {
        return this.capturarDatos();
    };
    IntroduccionExtendida.prototype.capturarDatos = function () {
        return new Mineral(document.getElementById('id').value, document.getElementById('nombre').value, document.getElementById('grupo').value, parseInt(document.getElementById('dureza').value), document.getElementById('tamano-grano').value, document.getElementById('clasificacion').value, parseInt(document.getElementById('cristales').value), parseInt(document.getElementById('temperatura').value), document.getElementById('estructura').value, document.getElementById('forma-granos').value, document.getElementById('textura').value);
    };
    IntroduccionExtendida.prototype.renderizarFormulario = function () {
        var formularioContainer = document.getElementById('formulario-container');
        formularioContainer.innerHTML = this.generarHTMLFormulario();
    };
    IntroduccionExtendida.prototype.generarHTMLFormulario = function () {
        return "\n            <div class=\"grid-2col\">\n                <div class=\"campo\">\n                    <label>ID (LLDDDDLL):</label>\n                    <input type=\"text\" id=\"id\" required>\n                </div>\n                <div class=\"campo\">\n                    <label>Nombre:</label>\n                    <input type=\"text\" id=\"nombre\" required>\n                </div>\n                <div class=\"campo\">\n                    <label>Grupo/Origen:</label>\n                    <select id=\"grupo\">\n                        <option value=\"igneas\">\u00CDgneas</option>\n                        <option value=\"metamorficas\">Metam\u00F3rficas</option>\n                        <option value=\"sedimentarias\">Sedimentarias</option>\n                    </select>\n                </div>\n                <div class=\"campo\">\n                    <label>Dureza (1-10):</label>\n                    <input type=\"number\" id=\"dureza\" min=\"1\" max=\"10\" required>\n                </div>\n                <div class=\"campo\">\n                    <label>Tama\u00F1o de grano:</label>\n                    <select id=\"tamano-grano\">\n                        <option value=\"muy-grueso\">Muy grueso (&gt; 30mm)</option>\n                        <option value=\"grueso\">Grueso (5-30mm)</option>\n                        <option value=\"medio\">Medio (2-5mm)</option>\n                        <option value=\"fino\">Fino (&lt; 2mm)</option>\n                    </select>\n                </div>\n                <div class=\"campo\">\n                    <label>Clasificaci\u00F3n:</label>\n                    <select id=\"clasificacion\">\n                        <option value=\"construccion\">Construcci\u00F3n</option>\n                        <option value=\"ornamental\">Ornamental</option>\n                        <option value=\"utensilios\">Utensilios</option>\n                        <option value=\"machacadas\">Piedras machacadas</option>\n                    </select>\n                </div>\n                <div class=\"campo\">\n                    <label>Tama\u00F1o de cristales (0-10):</label>\n                    <input type=\"number\" id=\"cristales\" min=\"0\" max=\"10\" required>\n                </div>\n                <div class=\"campo\">\n                    <label>Temperatura de formaci\u00F3n (K):</label>\n                    <input type=\"number\" id=\"temperatura\" min=\"-100\" max=\"100\" required>\n                </div>\n                <div class=\"campo\">\n                    <label>Estructura:</label>\n                    <input type=\"text\" id=\"estructura\" required>\n                </div>\n                <div class=\"campo\">\n                    <label>Forma de los granos:</label>\n                    <input type=\"text\" id=\"forma-granos\" required>\n                </div>\n                <div class=\"campo\">\n                    <label>Textura:</label>\n                    <select id=\"textura\">\n                        <option value=\"vitrea\">V\u00EDtrea</option>\n                        <option value=\"afanitica\">Afan\u00EDtica</option>\n                        <option value=\"faneritica\">Faner\u00EDtica</option>\n                    </select>\n                </div>\n            </div>\n            <button class=\"btn-submit\" onclick=\"analizarMineral()\">Analizar Mineral</button>\n        ";
    };
    return IntroduccionExtendida;
}());
var IntroduccionReducida = /** @class */ (function () {
    function IntroduccionReducida() {
    }
    IntroduccionReducida.prototype.getNombre = function () {
        return 'Reducida';
    };
    IntroduccionReducida.prototype.capturar = function () {
        return this.capturarDatos();
    };
    IntroduccionReducida.prototype.capturarDatos = function () {
        return new Mineral(document.getElementById('id').value, document.getElementById('nombre').value, document.getElementById('grupo').value, parseInt(document.getElementById('dureza').value), document.getElementById('tamano-grano').value, document.getElementById('clasificacion').value, parseInt(document.getElementById('cristales').value), parseInt(document.getElementById('temperatura').value), document.getElementById('estructura').value, document.getElementById('forma-granos').value, document.getElementById('textura').value);
    };
    IntroduccionReducida.prototype.renderizarFormulario = function () {
        var formularioContainer = document.getElementById('formulario-container');
        formularioContainer.innerHTML = this.generarHTMLFormulario();
    };
    IntroduccionReducida.prototype.generarHTMLFormulario = function () {
        return "\n            <div class=\"campo\">\n                <input type=\"text\" id=\"id\" placeholder=\"ID (ej: AB1234CD)\" required>\n            </div>\n            <div class=\"campo\">\n                <input type=\"text\" id=\"nombre\" placeholder=\"Nombre del mineral\" required>\n            </div>\n            <div class=\"campo\">\n                <select id=\"grupo\">\n                    <option value=\"\">-- Grupo/Origen --</option>\n                    <option value=\"igneas\">\u00CDgneas</option>\n                    <option value=\"metamorficas\">Metam\u00F3rficas</option>\n                    <option value=\"sedimentarias\">Sedimentarias</option>\n                </select>\n            </div>\n            <div class=\"campo\">\n                <input type=\"number\" id=\"dureza\" placeholder=\"Dureza (1-10)\" min=\"1\" max=\"10\" required>\n            </div>\n            <div class=\"campo\">\n                <select id=\"tamano-grano\">\n                    <option value=\"\">-- Tama\u00F1o de grano --</option>\n                    <option value=\"muy-grueso\">Muy grueso</option>\n                    <option value=\"grueso\">Grueso</option>\n                    <option value=\"medio\">Medio</option>\n                    <option value=\"fino\">Fino</option>\n                </select>\n            </div>\n            <div class=\"campo\">\n                <select id=\"clasificacion\">\n                    <option value=\"\">-- Clasificaci\u00F3n --</option>\n                    <option value=\"construccion\">Construcci\u00F3n</option>\n                    <option value=\"ornamental\">Ornamental</option>\n                    <option value=\"utensilios\">Utensilios</option>\n                    <option value=\"machacadas\">Machacadas</option>\n                </select>\n            </div>\n            <div class=\"campo\">\n                <input type=\"number\" id=\"cristales\" placeholder=\"Tama\u00F1o cristales (0-10)\" min=\"0\" max=\"10\" required>\n            </div>\n            <div class=\"campo\">\n                <input type=\"number\" id=\"temperatura\" placeholder=\"Temperatura (K)\" min=\"-100\" max=\"100\" required>\n            </div>\n            <div class=\"campo\">\n                <input type=\"text\" id=\"estructura\" placeholder=\"Estructura\" required>\n            </div>\n            <div class=\"campo\">\n                <input type=\"text\" id=\"forma-granos\" placeholder=\"Forma de los granos\" required>\n            </div>\n            <div class=\"campo\">\n                <select id=\"textura\">\n                    <option value=\"\">-- Textura --</option>\n                    <option value=\"vitrea\">V\u00EDtrea</option>\n                    <option value=\"afanitica\">Afan\u00EDtica</option>\n                    <option value=\"faneritica\">Faner\u00EDtica</option>\n                </select>\n            </div>\n            <button class=\"btn-submit\" onclick=\"analizarMineral()\">Analizar Mineral</button>\n        ";
    };
    return IntroduccionReducida;
}());
// ============================================
// SISTEMAS DE SALIDA
// ============================================
var FormatoEuropeo = /** @class */ (function () {
    function FormatoEuropeo() {
    }
    FormatoEuropeo.prototype.getNombre = function () {
        return 'Europeo';
    };
    FormatoEuropeo.prototype.mostrar = function (mineral) {
        var infoDiv = document.getElementById('info-roca');
        infoDiv.innerHTML = "\n            <h3>Informaci\u00F3n del Mineral (Formato Europeo)</h3>\n            <p><strong>ID:</strong> ".concat(mineral.id, "</p>\n            <p><strong>Nombre:</strong> ").concat(mineral.nombre, "</p>\n            <p><strong>Grupo:</strong> ").concat(mineral.grupo, "</p>\n            <p><strong>Dureza:</strong> ").concat(mineral.dureza, "</p>\n            <p><strong>Tama\u00F1o de grano:</strong> ").concat(mineral.tamanoGrano, "</p>\n            <p><strong>Clasificaci\u00F3n:</strong> ").concat(mineral.clasificacion, "</p>\n            <p><strong>Tama\u00F1o de cristales:</strong> ").concat(mineral.tamanoCristales, "</p>\n            <p><strong>Temperatura:</strong> ").concat(this.kelvinToCelsius(mineral.temperaturaFormacion), "\u00B0C</p>\n            <p><strong>Estructura:</strong> ").concat(mineral.estructura, "</p>\n            <p><strong>Forma de los granos:</strong> ").concat(mineral.formaGranos, "</p>\n            <p><strong>Textura:</strong> ").concat(mineral.textura, "</p>\n        ");
    };
    FormatoEuropeo.prototype.kelvinToCelsius = function (k) {
        return (k - 273.15).toFixed(2);
    };
    return FormatoEuropeo;
}());
var FormatoAmericano = /** @class */ (function () {
    function FormatoAmericano() {
    }
    FormatoAmericano.prototype.getNombre = function () {
        return 'Americano';
    };
    FormatoAmericano.prototype.mostrar = function (mineral) {
        var infoDiv = document.getElementById('info-roca');
        infoDiv.innerHTML = "\n            <h3>Mineral Information (American Format)</h3>\n            <p><strong>ID:</strong> ".concat(mineral.id, "</p>\n            <p><strong>Name:</strong> ").concat(mineral.nombre, "</p>\n            <p><strong>Group:</strong> ").concat(mineral.grupo, "</p>\n            <p><strong>Hardness:</strong> ").concat(mineral.dureza, "</p>\n            <p><strong>Grain size:</strong> ").concat(mineral.tamanoGrano, "</p>\n            <p><strong>Classification:</strong> ").concat(mineral.clasificacion, "</p>\n            <p><strong>Crystal size:</strong> ").concat(mineral.tamanoCristales, "</p>\n            <p><strong>Temperature:</strong> ").concat(this.kelvinToFahrenheit(mineral.temperaturaFormacion), "\u00B0F</p>\n            <p><strong>Structure:</strong> ").concat(mineral.estructura, "</p>\n            <p><strong>Grain shape:</strong> ").concat(mineral.formaGranos, "</p>\n            <p><strong>Texture:</strong> ").concat(mineral.textura, "</p>\n        ");
    };
    FormatoAmericano.prototype.kelvinToFahrenheit = function (k) {
        return ((k - 273.15) * 9 / 5 + 32).toFixed(2);
    };
    return FormatoAmericano;
}());
// ============================================
// CLASE MISIÓN - Central del desarrollo
// ============================================
var Mision = /** @class */ (function () {
    function Mision(piloto, criterio, entrada, salida) {
        this.piloto = piloto;
        this.criterio = criterio;
        this.entrada = entrada;
        this.salida = salida;
    }
    /**
     * Método principal: Analiza un mineral capturable
     */
    Mision.prototype.analiza = function (capturable) {
        var esValido = this.criterio.valida(capturable);
        if (esValido) {
            this.salida.mostrar(capturable);
        }
        return esValido;
    };
    // Getters
    Mision.prototype.getPiloto = function () {
        return this.piloto;
    };
    Mision.prototype.getCriterio = function () {
        return this.criterio;
    };
    Mision.prototype.getEntrada = function () {
        return this.entrada;
    };
    Mision.prototype.getSalida = function () {
        return this.salida;
    };
    // Setters
    Mision.prototype.setPiloto = function (piloto) {
        this.piloto = piloto;
    };
    Mision.prototype.setCriterio = function (criterio) {
        this.criterio = criterio;
    };
    Mision.prototype.setEntrada = function (entrada) {
        this.entrada = entrada;
        entrada.renderizarFormulario();
    };
    Mision.prototype.setSalida = function (salida) {
        this.salida = salida;
    };
    return Mision;
}());
// ============================================
// GESTIÓN DE LA APLICACIÓN
// ============================================
var misionActual;
var astronauta;
function inicializarAplicacion() {
    // Crear astronauta
    astronauta = new Astronauta("AG001", "Agmunsen Pérez", 45);
    // Mostrar información del astronauta
    document.getElementById('astronauta-info').textContent =
        "Astronauta: ".concat(astronauta.dameNombre(), " (ID: ").concat(astronauta.dameId(), ", Edad: ").concat(astronauta.dameEdad(), ")");
    // Crear misión inicial
    var criterioInicial = new CriterioIgneas();
    var entradaInicial = new IntroduccionExtendida();
    var salidaInicial = new FormatoEuropeo();
    misionActual = new Mision(astronauta, criterioInicial, entradaInicial, salidaInicial);
    // Renderizar formulario inicial
    entradaInicial.renderizarFormulario();
    // Configurar event listeners
    configurarEventListeners();
}
function configurarEventListeners() {
    // Cambio de tipo de formulario
    document.getElementById('tipo-formulario').addEventListener('change', function () {
        if (this.value === 'extendida') {
            misionActual.setEntrada(new IntroduccionExtendida());
        }
        else {
            misionActual.setEntrada(new IntroduccionReducida());
        }
    });
    // Cambio de criterio de validación
    document.getElementById('validador').addEventListener('change', function () {
        if (this.value === 'igneo') {
            misionActual.setCriterio(new CriterioIgneas());
        }
        else if (this.value === 'metamorfico') {
            misionActual.setCriterio(new CriterioMetamorficas());
        }
        else {
            misionActual.setCriterio(new CriterioSedimentaria());
        }
    });
    // Cambio de formato de salida
    document.getElementById('formato-salida').addEventListener('change', function () {
        if (this.value === 'europeo') {
            misionActual.setSalida(new FormatoEuropeo());
        }
        else {
            misionActual.setSalida(new FormatoAmericano());
        }
    });
}
function analizarMineral() {
    try {
        // Capturar el mineral usando el sistema de entrada actual
        var mineral = misionActual.getEntrada().capturar();
        // Validar ID
        if (!Mineral.validarID(mineral.id)) {
            alert('El ID debe tener el formato LLDDDDLL (2 letras, 4 números, 2 letras)');
            return;
        }
        // Validar campos completos
        if (!mineral.grupo || !mineral.tamanoGrano || !mineral.textura) {
            alert('Por favor completa todos los campos');
            return;
        }
        // Analizar el mineral usando la misión
        var esValido = misionActual.analiza(mineral);
        // Mostrar resultado
        mostrarResultadoValidacion(esValido);
    }
    catch (error) {
        console.error('Error al analizar mineral:', error);
        alert('Error al procesar los datos. Por favor, verifica que todos los campos estén completos.');
    }
}
function mostrarResultadoValidacion(esValido) {
    var resultadoDiv = document.getElementById('resultado');
    var validacionDiv = document.getElementById('validacion-display');
    var formato = document.getElementById('formato-salida').value;
    resultadoDiv.classList.add('visible');
    if (esValido) {
        validacionDiv.className = 'validacion valida';
        validacionDiv.innerHTML = "\n            <div class=\"emoji\">\uD83D\uDE0A</div>\n            <h2>".concat(formato === 'americano' ? 'Valid Mineral!' : '¡Mineral Válido!', "</h2>\n        ");
    }
    else {
        validacionDiv.className = 'validacion invalida';
        validacionDiv.innerHTML = "\n            <div class=\"emoji\">\uD83D\uDE20</div>\n            <h2>".concat(formato === 'americano' ? 'Invalid Mineral' : 'Mineral No Válido', "</h2>\n        ");
        document.getElementById('info-roca').innerHTML = '';
    }
}
// ============================================
// INICIALIZACIÓN AL CARGAR LA PÁGINA
// ============================================
document.addEventListener('DOMContentLoaded', inicializarAplicacion);
// Hacer la función global accesible desde el HTML
window.analizarMineral = analizarMineral;
