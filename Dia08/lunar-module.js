// ============================================
// SISTEMA DE ANÁLISIS DE MINERALES LUNARES
// ============================================
// Implementación basada en los requerimientos del módulo lunar
// Astronauta: Agmunsen Pérez
// ============================================
// ============================================
// ENUMERACIONES PARA VALORES PREDEFINIDOS
// ============================================
/**
 * Enumeración para los tipos de roca según su origen
 */
var TipoRoca;
(function (TipoRoca) {
    TipoRoca["Igneas"] = "igneas";
    TipoRoca["Metamorficas"] = "metamorficas";
    TipoRoca["Sedimentarias"] = "sedimentarias";
})(TipoRoca || (TipoRoca = {}));
/**
 * Enumeración para el tamaño del grano de la roca
 */
var TamanioGrano;
(function (TamanioGrano) {
    TamanioGrano["MuyGrueso"] = "muy-grueso";
    TamanioGrano["Grueso"] = "grueso";
    TamanioGrano["Medio"] = "medio";
    TamanioGrano["Fino"] = "fino";
})(TamanioGrano || (TamanioGrano = {}));
/**
 * Enumeración para la textura de la roca
 */
var Textura;
(function (Textura) {
    Textura["Vitrea"] = "vitrea";
    Textura["Afanitica"] = "afanitica";
    Textura["Faneritica"] = "faneritica";
})(Textura || (Textura = {}));
/**
 * Enumeración para la clasificación de uso de la roca
 */
var Clasificacion;
(function (Clasificacion) {
    Clasificacion["Construccion"] = "construccion";
    Clasificacion["Ornamental"] = "ornamental";
    Clasificacion["Utensilios"] = "utensilios";
    Clasificacion["Machacadas"] = "machacadas";
})(Clasificacion || (Clasificacion = {}));
// ============================================
// CLASE MINERAL - Implementación principal
// ============================================
/**
 * Clase Mineral
 * Representa un mineral lunar con todas sus características
 * Implementa ICapturable y contiene lógica de validación
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
     * Método predicado para validar el mineral según un criterio específico
     * @param criterio Criterio de validación a aplicar
     * @returns true si el mineral cumple el criterio
     */
    Mineral.prototype.valida = function (criterio) {
        return criterio.valida(this);
    };
    /**
     * Valida el formato del ID (2 letras + 4 números + 2 letras)
     * @param id ID a validar
     * @returns true si el formato es correcto
     */
    Mineral.validarID = function (id) {
        var regex = /^[A-Z]{2}\d{4}[A-Z]{2}$/;
        return regex.test(id);
    };
    return Mineral;
}());
// ============================================
// CLASE ASTRONAUTA - Nuestro piloto Agmunsen
// ============================================
/**
 * Clase Astronauta
 * Representa al astronauta Agmunsen que realiza la misión
 */
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
// CRITERIOS DE VALIDACIÓN - Según geólogos
// ============================================
/**
 * Criterio para rocas ígneas
 * Requisito: Grupo ígneas y grano muy grueso
 */
var CriterioIgneas = /** @class */ (function () {
    function CriterioIgneas() {
    }
    CriterioIgneas.prototype.getNombre = function () {
        return 'Ígneo';
    };
    CriterioIgneas.prototype.valida = function (mineral) {
        return mineral.grupo === TipoRoca.Igneas &&
            mineral.tamanoGrano === TamanioGrano.MuyGrueso;
    };
    return CriterioIgneas;
}());
/**
 * Criterio para rocas metamórficas
 * Requisito: Grupo metamórficas, grano medio o fino, y textura vítrea
 */
var CriterioMetamorficas = /** @class */ (function () {
    function CriterioMetamorficas() {
    }
    CriterioMetamorficas.prototype.getNombre = function () {
        return 'Metamórfico';
    };
    CriterioMetamorficas.prototype.valida = function (mineral) {
        return mineral.grupo === TipoRoca.Metamorficas &&
            (mineral.tamanoGrano === TamanioGrano.Medio ||
                mineral.tamanoGrano === TamanioGrano.Fino) &&
            mineral.textura === Textura.Vitrea;
    };
    return CriterioMetamorficas;
}());
/**
 * Criterio para rocas sedimentarias
 * Requisito: Grupo sedimentarias y textura fanerítica
 */
var CriterioSedimentaria = /** @class */ (function () {
    function CriterioSedimentaria() {
    }
    CriterioSedimentaria.prototype.getNombre = function () {
        return 'Sedimentario';
    };
    CriterioSedimentaria.prototype.valida = function (mineral) {
        return mineral.grupo === TipoRoca.Sedimentarias &&
            mineral.textura === Textura.Faneritica;
    };
    return CriterioSedimentaria;
}());
// ============================================
// SISTEMAS DE ENTRADA - Dos formas de introducir datos
// ============================================
/**
 * Sistema de entrada genérico
 * Puede crear múltiples formularios con diferentes prefijos
 */
var IntroduccionGenerica = /** @class */ (function () {
    function IntroduccionGenerica(nombre, prefix) {
        this.nombre = nombre;
        this.prefix = prefix;
    }
    IntroduccionGenerica.prototype.getNombre = function () {
        return this.nombre;
    };
    IntroduccionGenerica.prototype.capturar = function () {
        // Funciones auxiliares para obtener valores del DOM
        var obtenerValor = function (id) {
            return document.getElementById(id).value;
        };
        var obtenerValorSelect = function (id) {
            return document.getElementById(id).value;
        };
        var obtenerNumero = function (id) {
            return parseInt(obtenerValor(id));
        };
        // Crear y retornar el mineral con los datos capturados
        return new Mineral(obtenerValor("".concat(this.prefix, "-id")), obtenerValor("".concat(this.prefix, "-nombre")), obtenerValorSelect("".concat(this.prefix, "-grupo")), obtenerNumero("".concat(this.prefix, "-dureza")), obtenerValorSelect("".concat(this.prefix, "-tamano-grano")), obtenerValorSelect("".concat(this.prefix, "-clasificacion")), obtenerNumero("".concat(this.prefix, "-cristales")), obtenerNumero("".concat(this.prefix, "-temperatura")), obtenerValor("".concat(this.prefix, "-estructura")), obtenerValor("".concat(this.prefix, "-forma-granos")), obtenerValorSelect("".concat(this.prefix, "-textura")));
    };
    return IntroduccionGenerica;
}());
// ============================================
// SISTEMAS DE SALIDA - Formatos NASA y ESA
// ============================================
/**
 * Formato Europeo
 * Textos en español y temperaturas en Celsius
 */
var FormatoEuropeo = /** @class */ (function () {
    function FormatoEuropeo() {
    }
    FormatoEuropeo.prototype.getNombre = function () {
        return 'Europeo';
    };
    FormatoEuropeo.prototype.mostrar = function (mineral) {
        var infoDiv = document.getElementById('info-roca');
        infoDiv.innerHTML = "\n            <h3>\uD83C\uDF0D Informaci\u00F3n del Mineral (Formato Europeo)</h3>\n            <div class=\"grid-info\">\n                <div class=\"info-item\"><strong>ID:</strong> ".concat(mineral.id, "</div>\n                <div class=\"info-item\"><strong>Nombre:</strong> ").concat(mineral.nombre, "</div>\n                <div class=\"info-item\"><strong>Grupo:</strong> ").concat(this.traducirGrupo(mineral.grupo), "</div>\n                <div class=\"info-item\"><strong>Dureza (Mohs):</strong> ").concat(mineral.dureza, "</div>\n                <div class=\"info-item\"><strong>Tama\u00F1o de grano:</strong> ").concat(this.traducirGrano(mineral.tamanoGrano), "</div>\n                <div class=\"info-item\"><strong>Clasificaci\u00F3n:</strong> ").concat(this.traducirClasificacion(mineral.clasificacion), "</div>\n                <div class=\"info-item\"><strong>Tama\u00F1o de cristales:</strong> ").concat(mineral.tamanoCristales, "/10</div>\n                <div class=\"info-item\"><strong>Temperatura formaci\u00F3n:</strong> ").concat(this.kelvinToCelsius(mineral.temperaturaFormacion), "\u00B0C</div>\n                <div class=\"info-item\"><strong>Estructura:</strong> ").concat(mineral.estructura, "</div>\n                <div class=\"info-item\"><strong>Forma de los granos:</strong> ").concat(mineral.formaGranos, "</div>\n                <div class=\"info-item\"><strong>Textura:</strong> ").concat(this.traducirTextura(mineral.textura), "</div>\n            </div>\n        ");
    };
    FormatoEuropeo.prototype.kelvinToCelsius = function (k) {
        return (k - 273.15).toFixed(2);
    };
    FormatoEuropeo.prototype.traducirGrupo = function (grupo) {
        var _a;
        var traducciones = (_a = {},
            _a[TipoRoca.Igneas] = "Ígneas",
            _a[TipoRoca.Metamorficas] = "Metamórficas",
            _a[TipoRoca.Sedimentarias] = "Sedimentarias",
            _a);
        return traducciones[grupo];
    };
    FormatoEuropeo.prototype.traducirGrano = function (grano) {
        var _a;
        var traducciones = (_a = {},
            _a[TamanioGrano.MuyGrueso] = "Muy grueso (>30mm)",
            _a[TamanioGrano.Grueso] = "Grueso (5-30mm)",
            _a[TamanioGrano.Medio] = "Medio (2-5mm)",
            _a[TamanioGrano.Fino] = "Fino (<2mm)",
            _a);
        return traducciones[grano];
    };
    FormatoEuropeo.prototype.traducirClasificacion = function (clasif) {
        var _a;
        var traducciones = (_a = {},
            _a[Clasificacion.Construccion] = "Construcción",
            _a[Clasificacion.Ornamental] = "Ornamental",
            _a[Clasificacion.Utensilios] = "Utensilios",
            _a[Clasificacion.Machacadas] = "Machacadas",
            _a);
        return traducciones[clasif];
    };
    FormatoEuropeo.prototype.traducirTextura = function (textura) {
        var _a;
        var traducciones = (_a = {},
            _a[Textura.Vitrea] = "Vítrea",
            _a[Textura.Afanitica] = "Afanítica",
            _a[Textura.Faneritica] = "Fanerítica",
            _a);
        return traducciones[textura];
    };
    return FormatoEuropeo;
}());
/**
 * Formato Americano
 * Textos en inglés y temperaturas en Fahrenheit
 */
var FormatoAmericano = /** @class */ (function () {
    function FormatoAmericano() {
    }
    FormatoAmericano.prototype.getNombre = function () {
        return 'Americano';
    };
    FormatoAmericano.prototype.mostrar = function (mineral) {
        var infoDiv = document.getElementById('info-roca');
        infoDiv.innerHTML = "\n            <h3>\uD83C\uDDFA\uD83C\uDDF8 Mineral Information (American Format)</h3>\n            <div class=\"grid-info\">\n                <div class=\"info-item\"><strong>ID:</strong> ".concat(mineral.id, "</div>\n                <div class=\"info-item\"><strong>Name:</strong> ").concat(mineral.nombre, "</div>\n                <div class=\"info-item\"><strong>Group:</strong> ").concat(this.translateGroup(mineral.grupo), "</div>\n                <div class=\"info-item\"><strong>Hardness (Mohs):</strong> ").concat(mineral.dureza, "</div>\n                <div class=\"info-item\"><strong>Grain size:</strong> ").concat(this.translateGrain(mineral.tamanoGrano), "</div>\n                <div class=\"info-item\"><strong>Classification:</strong> ").concat(this.translateClassification(mineral.clasificacion), "</div>\n                <div class=\"info-item\"><strong>Crystal size:</strong> ").concat(mineral.tamanoCristales, "/10</div>\n                <div class=\"info-item\"><strong>Formation temperature:</strong> ").concat(this.kelvinToFahrenheit(mineral.temperaturaFormacion), "\u00B0F</div>\n                <div class=\"info-item\"><strong>Structure:</strong> ").concat(mineral.estructura, "</div>\n                <div class=\"info-item\"><strong>Grain shape:</strong> ").concat(mineral.formaGranos, "</div>\n                <div class=\"info-item\"><strong>Texture:</strong> ").concat(this.translateTexture(mineral.textura), "</div>\n            </div>\n        ");
    };
    FormatoAmericano.prototype.kelvinToFahrenheit = function (k) {
        return ((k - 273.15) * 9 / 5 + 32).toFixed(2);
    };
    FormatoAmericano.prototype.translateGroup = function (grupo) {
        var _a;
        var translations = (_a = {},
            _a[TipoRoca.Igneas] = "Igneous",
            _a[TipoRoca.Metamorficas] = "Metamorphic",
            _a[TipoRoca.Sedimentarias] = "Sedimentary",
            _a);
        return translations[grupo];
    };
    FormatoAmericano.prototype.translateGrain = function (grano) {
        var _a;
        var translations = (_a = {},
            _a[TamanioGrano.MuyGrueso] = "Very coarse (>30mm)",
            _a[TamanioGrano.Grueso] = "Coarse (5-30mm)",
            _a[TamanioGrano.Medio] = "Medium (2-5mm)",
            _a[TamanioGrano.Fino] = "Fine (<2mm)",
            _a);
        return translations[grano];
    };
    FormatoAmericano.prototype.translateClassification = function (clasif) {
        var _a;
        var translations = (_a = {},
            _a[Clasificacion.Construccion] = "Construction",
            _a[Clasificacion.Ornamental] = "Ornamental",
            _a[Clasificacion.Utensilios] = "Tools",
            _a[Clasificacion.Machacadas] = "Crushed stone",
            _a);
        return translations[clasif];
    };
    FormatoAmericano.prototype.translateTexture = function (textura) {
        var _a;
        var translations = (_a = {},
            _a[Textura.Vitrea] = "Glassy",
            _a[Textura.Afanitica] = "Aphanitic",
            _a[Textura.Faneritica] = "Phaneritic",
            _a);
        return translations[textura];
    };
    return FormatoAmericano;
}());
// ============================================
// CLASE MISIÓN - Núcleo del sistema
// ============================================
/**
 * Clase Mision
 * Coordina todas las operaciones: entrada, validación y salida
 * Implementa el patrón de inyección de dependencias
 */
var Mision = /** @class */ (function () {
    function Mision(piloto, criterio, entrada, salida) {
        this.piloto = piloto;
        this.criterio = criterio;
        this.entrada = entrada;
        this.salida = salida;
    }
    /**
     * Método principal: Analiza un mineral capturable
     * @param capturable Mineral a analizar
     * @returns true si el mineral es válido según el criterio
     */
    Mision.prototype.analiza = function (capturable) {
        var esValido = this.criterio.valida(capturable);
        if (esValido) {
            this.salida.mostrar(capturable);
        }
        return esValido;
    };
    // Getters para acceso a los componentes
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
    // Setters para cambiar componentes dinámicamente
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
// GESTIÓN DE LA APLICACIÓN - Lógica de UI
// ============================================
// Variables globales para el estado de la aplicación
var misionActual;
var astronauta;
/**
 * Inicializa la aplicación cuando se carga la página
 * Configura al astronauta Agmunsen y crea la misión inicial
 */
function inicializarAplicacion() {
    // Crear astronauta Agmunsen según el enunciado
    astronauta = new Astronauta("AG001", "Agmunsen Pérez", 45);
    // Mostrar información del astronauta en la UI
    document.getElementById('astronauta-info').textContent =
        "\uD83D\uDC68\u200D\uD83D\uDE80 Astronauta: ".concat(astronauta.dameNombre(), " (ID: ").concat(astronauta.dameId(), ", Edad: ").concat(astronauta.dameEdad(), ")");
    // Crear misión inicial con configuración por defecto
    var criterioInicial = new CriterioIgneas();
    var entradaInicial = new IntroduccionGenerica('Extendida', 'ext');
    var salidaInicial = new FormatoEuropeo();
    misionActual = new Mision(astronauta, criterioInicial, entradaInicial, salidaInicial);
    // Configurar event listeners para los controles
    configurarEventListeners();
    console.log("🚀 Módulo Lunar inicializado - Astronauta Agmunsen listo para analizar minerales");
}
/**
 * Configura los event listeners para los controles de la interfaz
 */
function configurarEventListeners() {
    // Cambio de tipo de formulario (Extendida/Reducida)
    document.getElementById('tipo-formulario').addEventListener('change', function () {
        var formExt = document.getElementById('form-extendida');
        var formRed = document.getElementById('form-reducida');
        if (this.value === 'extendida') {
            formExt.classList.remove('oculto');
            formRed.classList.add('oculto');
            misionActual.setEntrada(new IntroduccionGenerica('Extendida', 'ext'));
        }
        else {
            formExt.classList.add('oculto');
            formRed.classList.remove('oculto');
            misionActual.setEntrada(new IntroduccionGenerica('Reducida', 'red'));
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
/**
 * Función principal llamada al hacer clic en "Analizar Mineral"
 * Captura los datos, valida y muestra resultados
 */
function analizarMineral() {
    try {
        // Capturar el mineral usando el sistema de entrada actual
        var mineral = misionActual.getEntrada().capturar();
        // Validar formato del ID
        if (!Mineral.validarID(mineral.id)) {
            alert('❌ El ID debe tener el formato LLDDDDLL (2 letras MAYÚSCULAS, 4 números, 2 letras MAYÚSCULAS)\nEjemplo: AB1234CD');
            return;
        }
        // Validar que todos los campos requeridos estén completos
        if (!mineral.nombre || !mineral.grupo || !mineral.tamanoGrano || !mineral.textura) {
            alert('⚠️ Por favor completa todos los campos requeridos');
            return;
        }
        // Validar rango de dureza (1-10 escala Mohs)
        if (mineral.dureza < 1 || mineral.dureza > 10) {
            alert('❌ La dureza debe estar entre 1 y 10 (escala de Mohs)');
            return;
        }
        // Analizar el mineral usando la misión actual
        var esValido = misionActual.analiza(mineral);
        // Mostrar resultado de la validación
        mostrarResultadoValidacion(esValido);
    }
    catch (error) {
        console.error('Error al analizar mineral:', error);
        alert('❌ Error al procesar los datos. Por favor, verifica que todos los campos estén completos y tengan valores válidos.');
    }
}
/**
 * Muestra el resultado de la validación con caritas felices/enfadadas
 * @param esValido Resultado de la validación
 */
function mostrarResultadoValidacion(esValido) {
    var resultadoDiv = document.getElementById('resultado');
    var validacionDiv = document.getElementById('validacion-display');
    var formato = document.getElementById('formato-salida').value;
    resultadoDiv.classList.add('visible');
    if (esValido) {
        validacionDiv.className = 'validacion valida';
        validacionDiv.innerHTML = "\n            <div class=\"emoji\">\uD83D\uDE0A</div>\n            <h2>".concat(formato === 'americano' ? 'Valid Mineral!' : '¡Mineral Válido!', "</h2>\n            <p>").concat(formato === 'americano' ? 'This mineral meets the criteria!' : '¡Este mineral cumple los criterios!', "</p>\n        ");
    }
    else {
        validacionDiv.className = 'validacion invalida';
        validacionDiv.innerHTML = "\n            <div class=\"emoji\">\uD83D\uDE20</div>\n            <h2>".concat(formato === 'americano' ? 'Invalid Mineral' : 'Mineral No Válido', "</h2>\n            <p>").concat(formato === 'americano' ? 'This mineral does not meet the criteria.' : 'Este mineral no cumple los criterios.', "</p>\n        ");
        document.getElementById('info-roca').innerHTML = '';
    }
}
// ============================================
// INICIALIZACIÓN Y CONFIGURACIÓN GLOBAL
// ============================================
// Inicializar la aplicación cuando se carga el DOM
document.addEventListener('DOMContentLoaded', inicializarAplicacion);
// Hacer la función analizarMineral accesible globalmente para el HTML
window.analizarMineral = analizarMineral;
// ============================================
// EJEMPLOS DE USO Y PRUEBAS (para consola)
// ============================================
console.log("=== 🌙 SISTEMA DE MISIÓN LUNAR - AGMUNSEN ===\n");
// Ejemplo de creación de componentes según el planteamiento
var pilotoEjemplo = new Astronauta("AG001", "Agmunsen Pérez", 45);
var criterioIgneo = new CriterioIgneas();
var entradaExtendida = new IntroduccionGenerica('Extendida', 'ext');
var salidaEuropea = new FormatoEuropeo();
// Crear misión de ejemplo
var misionEjemplo = new Mision(pilotoEjemplo, criterioIgneo, entradaExtendida, salidaEuropea);
console.log("\uD83D\uDC68\u200D\uD83D\uDE80 Piloto: ".concat(pilotoEjemplo.dameNombre()));
console.log("\uD83D\uDD0D Criterio: ".concat(criterioIgneo.getNombre()));
console.log("\uD83D\uDCDD Sistema Entrada: ".concat(entradaExtendida.getNombre()));
console.log("\uD83D\uDCCA Sistema Salida: ".concat(salidaEuropea.getNombre(), "\n"));
// Minerales de prueba para demostración
var mineralIgneoValido = new Mineral("AB1234CD", "Granito Lunar", TipoRoca.Igneas, 7, TamanioGrano.MuyGrueso, Clasificacion.Construccion, 5, 50, "Cristalina", "Angulares", Textura.Faneritica);
var mineralIgneoInvalido = new Mineral("XY5678ZW", "Basalto Lunar", TipoRoca.Igneas, 6, TamanioGrano.Fino, Clasificacion.Construccion, 2, 30, "Vítrea", "Redondeados", Textura.Vitrea);
console.log("=== PRUEBAS DE VALIDACIÓN ===");
console.log("Mineral ígneo válido:", misionEjemplo.analiza(mineralIgneoValido));
console.log("Mineral ígneo inválido:", misionEjemplo.analiza(mineralIgneoInvalido));
// Demostración de cambio dinámico de criterio
console.log("\n=== CAMBIO DINÁMICO DE CRITERIO ===");
misionEjemplo.setCriterio(new CriterioMetamorficas());
console.log("Mismo mineral con criterio metamórfico:", misionEjemplo.analiza(mineralIgneoValido));
// Demostración del método predicado del mineral
console.log("\n=== MÉTODO PREDICADO DEL MINERAL ===");
var criterioTest = new CriterioIgneas();
console.log("Mineral.valida() con criterio ígneo:", mineralIgneoValido.valida(criterioTest));
console.log("\n✅ Sistema listo para uso en navegador");
