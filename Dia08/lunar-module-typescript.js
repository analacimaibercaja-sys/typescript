// ============================================
// INTERFACES
// ============================================
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
// SISTEMAS DE ENTRADA
// ============================================
var IntroduccionExtendida = /** @class */ (function () {
    function IntroduccionExtendida() {
    }
    IntroduccionExtendida.prototype.getNombre = function () {
        return 'Extendida';
    };
    IntroduccionExtendida.prototype.capturar = function () {
        return this.capturarDatos('ext');
    };
    IntroduccionExtendida.prototype.capturarDatos = function (prefix) {
        return new Mineral(document.getElementById("".concat(prefix, "-id")).value, document.getElementById("".concat(prefix, "-nombre")).value, document.getElementById("".concat(prefix, "-grupo")).value, parseInt(document.getElementById("".concat(prefix, "-dureza")).value), document.getElementById("".concat(prefix, "-tamano-grano")).value, document.getElementById("".concat(prefix, "-clasificacion")).value, parseInt(document.getElementById("".concat(prefix, "-cristales")).value), parseInt(document.getElementById("".concat(prefix, "-temperatura")).value), document.getElementById("".concat(prefix, "-estructura")).value, document.getElementById("".concat(prefix, "-forma-granos")).value, document.getElementById("".concat(prefix, "-textura")).value);
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
        return this.capturarDatos('red');
    };
    IntroduccionReducida.prototype.capturarDatos = function (prefix) {
        return new Mineral(document.getElementById("".concat(prefix, "-id")).value, document.getElementById("".concat(prefix, "-nombre")).value, document.getElementById("".concat(prefix, "-grupo")).value, parseInt(document.getElementById("".concat(prefix, "-dureza")).value), document.getElementById("".concat(prefix, "-tamano-grano")).value, document.getElementById("".concat(prefix, "-clasificacion")).value, parseInt(document.getElementById("".concat(prefix, "-cristales")).value), parseInt(document.getElementById("".concat(prefix, "-temperatura")).value), document.getElementById("".concat(prefix, "-estructura")).value, document.getElementById("".concat(prefix, "-forma-granos")).value, document.getElementById("".concat(prefix, "-textura")).value);
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
    // Configurar event listeners
    configurarEventListeners();
}
function configurarEventListeners() {
    // Cambio de tipo de formulario
    document.getElementById('tipo-formulario').addEventListener('change', function () {
        var formExt = document.getElementById('form-extendida');
        var formRed = document.getElementById('form-reducida');
        if (this.value === 'extendida') {
            formExt.classList.remove('oculto');
            formRed.classList.add('oculto');
            misionActual.setEntrada(new IntroduccionExtendida());
        }
        else {
            formExt.classList.add('oculto');
            formRed.classList.remove('oculto');
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
// ============================================
// EJEMPLO DE USO SEGÚN EL PLANTEAMIENTO
// ============================================
console.log("=== SISTEMA DE MISIÓN LUNAR ===\n");
// Crear componentes según el planteamiento
var piloto = new Astronauta("AG001", "Agmunsen Pérez", 45);
var criterioIgneo = new CriterioIgneas();
var entradaExtendida = new IntroduccionExtendida();
var salidaEuropea = new FormatoEuropeo();
// Crear misión con todos los componentes
var misionIgnea = new Mision(piloto, criterioIgneo, entradaExtendida, salidaEuropea);
console.log("Piloto: ".concat(piloto.dameNombre()));
console.log("Criterio: ".concat(criterioIgneo.getNombre()));
console.log("Sistema Entrada: ".concat(entradaExtendida.getNombre()));
console.log("Sistema Salida: ".concat(salidaEuropea.getNombre(), "\n"));
// Crear minerales de prueba
var mineralIgneoValido = new Mineral("AB1234CD", "Granito Lunar", "igneas", 7, "muy-grueso", "construccion", 5, 50, "Cristalina", "Angulares", "faneritica");
var mineralIgneoInvalido = new Mineral("XY5678ZW", "Basalto Lunar", "igneas", 6, "fino", "construccion", 2, 30, "Vítrea", "Redondeados", "vitrea");
// Probar la misión
console.log("=== PRUEBA MISIÓN ÍGNEA ===");
console.log("Mineral válido:", misionIgnea.analiza(mineralIgneoValido)); // true
console.log("Mineral inválido:", misionIgnea.analiza(mineralIgneoInvalido)); // false
// Cambiar a criterio metamórfico
console.log("\n=== CAMBIO A CRITERIO METAMÓRFICO ===");
misionIgnea.setCriterio(new CriterioMetamorficas());
console.log("Mineral (ahora inválido):", misionIgnea.analiza(mineralIgneoValido)); // false
// Probar método predicado del mineral
console.log("\n=== MÉTODO PREDICADO MINERAL ===");
var criterioTest = new CriterioIgneas();
console.log("Mineral.valida() con criterio ígneo:", mineralIgneoValido.valida(criterioTest)); // true
