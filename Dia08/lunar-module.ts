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
enum TipoRoca {
    Igneas = "igneas",
    Metamorficas = "metamorficas",
    Sedimentarias = "sedimentarias"
}

/**
 * Enumeración para el tamaño del grano de la roca
 */
enum TamanioGrano {
    MuyGrueso = "muy-grueso",
    Grueso = "grueso",
    Medio = "medio",
    Fino = "fino"
}

/**
 * Enumeración para la textura de la roca
 */
enum Textura {
    Vitrea = "vitrea",
    Afanitica = "afanitica",
    Faneritica = "faneritica"
}

/**
 * Enumeración para la clasificación de uso de la roca
 */
enum Clasificacion {
    Construccion = "construccion",
    Ornamental = "ornamental",
    Utensilios = "utensilios",
    Machacadas = "machacadas"
}

// ============================================
// INTERFACES PRINCIPALES
// ============================================

/**
 * Interface ICapturable
 * Representa cualquier mineral que puede ser capturado y analizado por Agmunsen
 * Contiene todas las propiedades requeridas del mineral
 */
interface ICapturable {
    id: string;
    nombre: string;
    grupo: TipoRoca;
    dureza: number;
    tamanoGrano: TamanioGrano;
    clasificacion: Clasificacion;
    tamanoCristales: number;
    temperaturaFormacion: number;
    estructura: string;
    formaGranos: string;
    textura: Textura;
    valida(criterio: ICriterioValidacion): boolean;
}

/**
 * Interface IPiloto
 * Define las operaciones que debe implementar un astronauta/piloto
 */
interface IPiloto {
    dameId(): string;
    dameNombre(): string;
    dameEdad(): number;
}

/**
 * Interface ICriterioValidacion
 * Define un criterio para validar si un mineral es útil según los geólogos
 */
interface ICriterioValidacion {
    valida(mineral: ICapturable): boolean;
    getNombre(): string;
}

/**
 * Interface ISistemaEntrada
 * Sistema para capturar datos del mineral desde diferentes interfaces
 */
interface ISistemaEntrada {
    capturar(): ICapturable;
    getNombre(): string;
}

/**
 * Interface ISistemaSalida
 * Sistema para mostrar información del mineral en diferentes formatos
 */
interface ISistemaSalida {
    mostrar(mineral: ICapturable): void;
    getNombre(): string;
}

/**
 * Interface IMisionable
 * Define las operaciones de una misión de análisis
 */
interface IMisionable {
    analiza(capturable: ICapturable): boolean;
}

// ============================================
// CLASE MINERAL - Implementación principal
// ============================================

/**
 * Clase Mineral
 * Representa un mineral lunar con todas sus características
 * Implementa ICapturable y contiene lógica de validación
 */
class Mineral implements ICapturable {
    constructor(
        public id: string,
        public nombre: string,
        public grupo: TipoRoca,
        public dureza: number,
        public tamanoGrano: TamanioGrano,
        public clasificacion: Clasificacion,
        public tamanoCristales: number,
        public temperaturaFormacion: number,
        public estructura: string,
        public formaGranos: string,
        public textura: Textura
    ) {}

    /**
     * Método predicado para validar el mineral según un criterio específico
     * @param criterio Criterio de validación a aplicar
     * @returns true si el mineral cumple el criterio
     */
    valida(criterio: ICriterioValidacion): boolean {
        return criterio.valida(this);
    }

    /**
     * Valida el formato del ID (2 letras + 4 números + 2 letras)
     * @param id ID a validar
     * @returns true si el formato es correcto
     */
    static validarID(id: string): boolean {
        const regex = /^[A-Z]{2}\d{4}[A-Z]{2}$/;
        return regex.test(id);
    }
}

// ============================================
// CLASE ASTRONAUTA - Nuestro piloto Agmunsen
// ============================================

/**
 * Clase Astronauta
 * Representa al astronauta Agmunsen que realiza la misión
 */
class Astronauta implements IPiloto {
    constructor(
        private identificador: string,
        private nombreCompleto: string,
        private edad: number
    ) {}

    dameId(): string {
        return this.identificador;
    }

    dameNombre(): string {
        return this.nombreCompleto;
    }

    dameEdad(): number {
        return this.edad;
    }
}

// ============================================
// CRITERIOS DE VALIDACIÓN - Según geólogos
// ============================================

/**
 * Criterio para rocas ígneas
 * Requisito: Grupo ígneas y grano muy grueso
 */
class CriterioIgneas implements ICriterioValidacion {
    getNombre(): string {
        return 'Ígneo';
    }

    valida(mineral: ICapturable): boolean {
        return mineral.grupo === TipoRoca.Igneas && 
               mineral.tamanoGrano === TamanioGrano.MuyGrueso;
    }
}

/**
 * Criterio para rocas metamórficas
 * Requisito: Grupo metamórficas, grano medio o fino, y textura vítrea
 */
class CriterioMetamorficas implements ICriterioValidacion {
    getNombre(): string {
        return 'Metamórfico';
    }

    valida(mineral: ICapturable): boolean {
        return mineral.grupo === TipoRoca.Metamorficas && 
               (mineral.tamanoGrano === TamanioGrano.Medio || 
                mineral.tamanoGrano === TamanioGrano.Fino) &&
               mineral.textura === Textura.Vitrea;
    }
}

/**
 * Criterio para rocas sedimentarias
 * Requisito: Grupo sedimentarias y textura fanerítica
 */
class CriterioSedimentaria implements ICriterioValidacion {
    getNombre(): string {
        return 'Sedimentario';
    }

    valida(mineral: ICapturable): boolean {
        return mineral.grupo === TipoRoca.Sedimentarias && 
               mineral.textura === Textura.Faneritica;
    }
}

// ============================================
// SISTEMAS DE ENTRADA - Dos formas de introducir datos
// ============================================

/**
 * Sistema de entrada genérico
 * Puede crear múltiples formularios con diferentes prefijos
 */
class IntroduccionGenerica implements ISistemaEntrada {
    constructor(
        private nombre: string,
        private prefix: string
    ) {}

    getNombre(): string {
        return this.nombre;
    }

    capturar(): ICapturable {
        // Funciones auxiliares para obtener valores del DOM
        const obtenerValor = (id: string): string => 
            (document.getElementById(id) as HTMLInputElement).value;
        
        const obtenerValorSelect = (id: string): string => 
            (document.getElementById(id) as HTMLSelectElement).value;
        
        const obtenerNumero = (id: string): number => 
            parseInt(obtenerValor(id));

        // Crear y retornar el mineral con los datos capturados
        return new Mineral(
            obtenerValor(`${this.prefix}-id`),
            obtenerValor(`${this.prefix}-nombre`),
            obtenerValorSelect(`${this.prefix}-grupo`) as TipoRoca,
            obtenerNumero(`${this.prefix}-dureza`),
            obtenerValorSelect(`${this.prefix}-tamano-grano`) as TamanioGrano,
            obtenerValorSelect(`${this.prefix}-clasificacion`) as Clasificacion,
            obtenerNumero(`${this.prefix}-cristales`),
            obtenerNumero(`${this.prefix}-temperatura`),
            obtenerValor(`${this.prefix}-estructura`),
            obtenerValor(`${this.prefix}-forma-granos`),
            obtenerValorSelect(`${this.prefix}-textura`) as Textura
        );
    }
}

// ============================================
// SISTEMAS DE SALIDA - Formatos NASA y ESA
// ============================================

/**
 * Formato Europeo
 * Textos en español y temperaturas en Celsius
 */
class FormatoEuropeo implements ISistemaSalida {
    getNombre(): string {
        return 'Europeo';
    }

    mostrar(mineral: ICapturable): void {
        const infoDiv = document.getElementById('info-roca')!;
        infoDiv.innerHTML = `
            <h3>🌍 Información del Mineral (Formato Europeo)</h3>
            <div class="grid-info">
                <div class="info-item"><strong>ID:</strong> ${mineral.id}</div>
                <div class="info-item"><strong>Nombre:</strong> ${mineral.nombre}</div>
                <div class="info-item"><strong>Grupo:</strong> ${this.traducirGrupo(mineral.grupo)}</div>
                <div class="info-item"><strong>Dureza (Mohs):</strong> ${mineral.dureza}</div>
                <div class="info-item"><strong>Tamaño de grano:</strong> ${this.traducirGrano(mineral.tamanoGrano)}</div>
                <div class="info-item"><strong>Clasificación:</strong> ${this.traducirClasificacion(mineral.clasificacion)}</div>
                <div class="info-item"><strong>Tamaño de cristales:</strong> ${mineral.tamanoCristales}/10</div>
                <div class="info-item"><strong>Temperatura formación:</strong> ${this.kelvinToCelsius(mineral.temperaturaFormacion)}°C</div>
                <div class="info-item"><strong>Estructura:</strong> ${mineral.estructura}</div>
                <div class="info-item"><strong>Forma de los granos:</strong> ${mineral.formaGranos}</div>
                <div class="info-item"><strong>Textura:</strong> ${this.traducirTextura(mineral.textura)}</div>
            </div>
        `;
    }

    private kelvinToCelsius(k: number): string {
        return (k - 273.15).toFixed(2);
    }

    private traducirGrupo(grupo: TipoRoca): string {
        const traducciones = {
            [TipoRoca.Igneas]: "Ígneas",
            [TipoRoca.Metamorficas]: "Metamórficas",
            [TipoRoca.Sedimentarias]: "Sedimentarias"
        };
        return traducciones[grupo];
    }

    private traducirGrano(grano: TamanioGrano): string {
        const traducciones = {
            [TamanioGrano.MuyGrueso]: "Muy grueso (>30mm)",
            [TamanioGrano.Grueso]: "Grueso (5-30mm)",
            [TamanioGrano.Medio]: "Medio (2-5mm)",
            [TamanioGrano.Fino]: "Fino (<2mm)"
        };
        return traducciones[grano];
    }

    private traducirClasificacion(clasif: Clasificacion): string {
        const traducciones = {
            [Clasificacion.Construccion]: "Construcción",
            [Clasificacion.Ornamental]: "Ornamental",
            [Clasificacion.Utensilios]: "Utensilios",
            [Clasificacion.Machacadas]: "Machacadas"
        };
        return traducciones[clasif];
    }

    private traducirTextura(textura: Textura): string {
        const traducciones = {
            [Textura.Vitrea]: "Vítrea",
            [Textura.Afanitica]: "Afanítica",
            [Textura.Faneritica]: "Fanerítica"
        };
        return traducciones[textura];
    }
}

/**
 * Formato Americano
 * Textos en inglés y temperaturas en Fahrenheit
 */
class FormatoAmericano implements ISistemaSalida {
    getNombre(): string {
        return 'Americano';
    }

    mostrar(mineral: ICapturable): void {
        const infoDiv = document.getElementById('info-roca')!;
        infoDiv.innerHTML = `
            <h3>🇺🇸 Mineral Information (American Format)</h3>
            <div class="grid-info">
                <div class="info-item"><strong>ID:</strong> ${mineral.id}</div>
                <div class="info-item"><strong>Name:</strong> ${mineral.nombre}</div>
                <div class="info-item"><strong>Group:</strong> ${this.translateGroup(mineral.grupo)}</div>
                <div class="info-item"><strong>Hardness (Mohs):</strong> ${mineral.dureza}</div>
                <div class="info-item"><strong>Grain size:</strong> ${this.translateGrain(mineral.tamanoGrano)}</div>
                <div class="info-item"><strong>Classification:</strong> ${this.translateClassification(mineral.clasificacion)}</div>
                <div class="info-item"><strong>Crystal size:</strong> ${mineral.tamanoCristales}/10</div>
                <div class="info-item"><strong>Formation temperature:</strong> ${this.kelvinToFahrenheit(mineral.temperaturaFormacion)}°F</div>
                <div class="info-item"><strong>Structure:</strong> ${mineral.estructura}</div>
                <div class="info-item"><strong>Grain shape:</strong> ${mineral.formaGranos}</div>
                <div class="info-item"><strong>Texture:</strong> ${this.translateTexture(mineral.textura)}</div>
            </div>
        `;
    }

    private kelvinToFahrenheit(k: number): string {
        return ((k - 273.15) * 9/5 + 32).toFixed(2);
    }

    private translateGroup(grupo: TipoRoca): string {
        const translations = {
            [TipoRoca.Igneas]: "Igneous",
            [TipoRoca.Metamorficas]: "Metamorphic",
            [TipoRoca.Sedimentarias]: "Sedimentary"
        };
        return translations[grupo];
    }

    private translateGrain(grano: TamanioGrano): string {
        const translations = {
            [TamanioGrano.MuyGrueso]: "Very coarse (>30mm)",
            [TamanioGrano.Grueso]: "Coarse (5-30mm)",
            [TamanioGrano.Medio]: "Medium (2-5mm)",
            [TamanioGrano.Fino]: "Fine (<2mm)"
        };
        return translations[grano];
    }

    private translateClassification(clasif: Clasificacion): string {
        const translations = {
            [Clasificacion.Construccion]: "Construction",
            [Clasificacion.Ornamental]: "Ornamental",
            [Clasificacion.Utensilios]: "Tools",
            [Clasificacion.Machacadas]: "Crushed stone"
        };
        return translations[clasif];
    }

    private translateTexture(textura: Textura): string {
        const translations = {
            [Textura.Vitrea]: "Glassy",
            [Textura.Afanitica]: "Aphanitic",
            [Textura.Faneritica]: "Phaneritic"
        };
        return translations[textura];
    }
}

// ============================================
// CLASE MISIÓN - Núcleo del sistema
// ============================================

/**
 * Clase Mision
 * Coordina todas las operaciones: entrada, validación y salida
 * Implementa el patrón de inyección de dependencias
 */
class Mision implements IMisionable {
    constructor(
        private piloto: IPiloto,
        private criterio: ICriterioValidacion,
        private entrada: ISistemaEntrada,
        private salida: ISistemaSalida
    ) {}

    /**
     * Método principal: Analiza un mineral capturable
     * @param capturable Mineral a analizar
     * @returns true si el mineral es válido según el criterio
     */
    analiza(capturable: ICapturable): boolean {
        const esValido = this.criterio.valida(capturable);
        
        if (esValido) {
            this.salida.mostrar(capturable);
        }
        
        return esValido;
    }

    // Getters para acceso a los componentes
    getPiloto(): IPiloto {
        return this.piloto;
    }

    getCriterio(): ICriterioValidacion {
        return this.criterio;
    }

    getEntrada(): ISistemaEntrada {
        return this.entrada;
    }

    getSalida(): ISistemaSalida {
        return this.salida;
    }

    // Setters para cambiar componentes dinámicamente
    setPiloto(piloto: IPiloto): void {
        this.piloto = piloto;
    }

    setCriterio(criterio: ICriterioValidacion): void {
        this.criterio = criterio;
    }

    setEntrada(entrada: ISistemaEntrada): void {
        this.entrada = entrada;
    }

    setSalida(salida: ISistemaSalida): void {
        this.salida = salida;
    }
}

// ============================================
// GESTIÓN DE LA APLICACIÓN - Lógica de UI
// ============================================

// Variables globales para el estado de la aplicación
let misionActual: Mision;
let astronauta: IPiloto;

/**
 * Inicializa la aplicación cuando se carga la página
 * Configura al astronauta Agmunsen y crea la misión inicial
 */
function inicializarAplicacion(): void {
    // Crear astronauta Agmunsen según el enunciado
    astronauta = new Astronauta("AG001", "Agmunsen Pérez", 45);
    
    // Mostrar información del astronauta en la UI
    document.getElementById('astronauta-info')!.textContent = 
        `👨‍🚀 Astronauta: ${astronauta.dameNombre()} (ID: ${astronauta.dameId()}, Edad: ${astronauta.dameEdad()})`;

    // Crear misión inicial con configuración por defecto
    const criterioInicial = new CriterioIgneas();
    const entradaInicial = new IntroduccionGenerica('Extendida', 'ext');
    const salidaInicial = new FormatoEuropeo();
    
    misionActual = new Mision(astronauta, criterioInicial, entradaInicial, salidaInicial);

    // Configurar event listeners para los controles
    configurarEventListeners();
    
    console.log("🚀 Módulo Lunar inicializado - Astronauta Agmunsen listo para analizar minerales");
}

/**
 * Configura los event listeners para los controles de la interfaz
 */
function configurarEventListeners(): void {
    // Cambio de tipo de formulario (Extendida/Reducida)
    document.getElementById('tipo-formulario')!.addEventListener('change', function(this: HTMLSelectElement) {
        const formExt = document.getElementById('form-extendida')!;
        const formRed = document.getElementById('form-reducida')!;
        
        if (this.value === 'extendida') {
            formExt.classList.remove('oculto');
            formRed.classList.add('oculto');
            misionActual.setEntrada(new IntroduccionGenerica('Extendida', 'ext'));
        } else {
            formExt.classList.add('oculto');
            formRed.classList.remove('oculto');
            misionActual.setEntrada(new IntroduccionGenerica('Reducida', 'red'));
        }
    });
/*
    // Cambio de criterio de validación
    document.getElementById('validador')!.addEventListener('change', function(this: HTMLSelectElement) {
        if (this.value === 'igneo') {
            misionActual.setCriterio(new CriterioIgneas());
        } else if (this.value === 'metamorfico') {
            misionActual.setCriterio(new CriterioMetamorficas());
        } else {
            misionActual.setCriterio(new CriterioSedimentaria());
        }
    });
    */

    // Cambio de formato de salida
    document.getElementById('formato-salida')!.addEventListener('change', function(this: HTMLSelectElement) {
        if (this.value === 'europeo') {
            misionActual.setSalida(new FormatoEuropeo());
        } else {
            misionActual.setSalida(new FormatoAmericano());
        }
    });
}

/**
 * Función principal llamada al hacer clic en "Analizar Mineral"
 * Captura los datos, valida y muestra resultados
 */
function analizarMineral(): void {
    try {
        // Capturar el mineral usando el sistema de entrada actual
        const mineral = misionActual.getEntrada().capturar();
        
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
        const esValido = misionActual.analiza(mineral);
        
        // Mostrar resultado de la validación
        mostrarResultadoValidacion(esValido);
        
    } catch (error) {
        console.error('Error al analizar mineral:', error);
        alert('❌ Error al procesar los datos. Por favor, verifica que todos los campos estén completos y tengan valores válidos.');
    }
}

/**
 * Muestra el resultado de la validación con caritas felices/enfadadas
 * @param esValido Resultado de la validación
 */
function mostrarResultadoValidacion(esValido: boolean): void {
    const resultadoDiv = document.getElementById('resultado')!;
    const validacionDiv = document.getElementById('validacion-display')!;
    const formato = (document.getElementById('formato-salida') as HTMLSelectElement).value;
    
    resultadoDiv.classList.add('visible');
    
    if (esValido) {
        validacionDiv.className = 'validacion valida';
        validacionDiv.innerHTML = `
            <div class="emoji">😊</div>
            <h2>${formato === 'americano' ? 'Valid Mineral!' : '¡Mineral Válido!'}</h2>
            <p>${formato === 'americano' ? 'This mineral meets the criteria!' : '¡Este mineral cumple los criterios!'}</p>
        `;
    } else {
        validacionDiv.className = 'validacion invalida';
        validacionDiv.innerHTML = `
            <div class="emoji">😠</div>
            <h2>${formato === 'americano' ? 'Invalid Mineral' : 'Mineral No Válido'}</h2>
            <p>${formato === 'americano' ? 'This mineral does not meet the criteria.' : 'Este mineral no cumple los criterios.'}</p>
        `;
        document.getElementById('info-roca')!.innerHTML = '';
    }
}

// ============================================
// INICIALIZACIÓN Y CONFIGURACIÓN GLOBAL
// ============================================

// Inicializar la aplicación cuando se carga el DOM
document.addEventListener('DOMContentLoaded', inicializarAplicacion);

// Hacer la función analizarMineral accesible globalmente para el HTML
(window as any).analizarMineral = analizarMineral;

// ============================================
// EJEMPLOS DE USO Y PRUEBAS (para consola)
// ============================================

console.log("=== 🌙 SISTEMA DE MISIÓN LUNAR - AGMUNSEN ===\n");

// Ejemplo de creación de componentes según el planteamiento
const pilotoEjemplo: IPiloto = new Astronauta("AG001", "Agmunsen Pérez", 45);
const criterioIgneo: ICriterioValidacion = new CriterioIgneas();
const entradaExtendida: ISistemaEntrada = new IntroduccionGenerica('Extendida', 'ext');
const salidaEuropea: ISistemaSalida = new FormatoEuropeo();

// Crear misión de ejemplo
const misionEjemplo: Mision = new Mision(pilotoEjemplo, criterioIgneo, entradaExtendida, salidaEuropea);

console.log(`👨‍🚀 Piloto: ${pilotoEjemplo.dameNombre()}`);
console.log(`🔍 Criterio: ${criterioIgneo.getNombre()}`);
console.log(`📝 Sistema Entrada: ${entradaExtendida.getNombre()}`);
console.log(`📊 Sistema Salida: ${salidaEuropea.getNombre()}\n`);

// Minerales de prueba para demostración
const mineralIgneoValido: ICapturable = new Mineral(
    "AB1234CD",
    "Granito Lunar",
    TipoRoca.Igneas,
    7,
    TamanioGrano.MuyGrueso,
    Clasificacion.Construccion,
    5,
    50,
    "Cristalina",
    "Angulares",
    Textura.Faneritica
);

const mineralIgneoInvalido: ICapturable = new Mineral(
    "XY5678ZW",
    "Basalto Lunar",
    TipoRoca.Igneas,
    6,
    TamanioGrano.Fino,
    Clasificacion.Construccion,
    2,
    30,
    "Vítrea",
    "Redondeados",
    Textura.Vitrea
);

console.log("=== PRUEBAS DE VALIDACIÓN ===");
console.log("Mineral ígneo válido:", misionEjemplo.analiza(mineralIgneoValido));
console.log("Mineral ígneo inválido:", misionEjemplo.analiza(mineralIgneoInvalido));

// Demostración de cambio dinámico de criterio
console.log("\n=== CAMBIO DINÁMICO DE CRITERIO ===");
misionEjemplo.setCriterio(new CriterioMetamorficas());
console.log("Mismo mineral con criterio metamórfico:", misionEjemplo.analiza(mineralIgneoValido));

// Demostración del método predicado del mineral
console.log("\n=== MÉTODO PREDICADO DEL MINERAL ===");
const criterioTest = new CriterioIgneas();
console.log("Mineral.valida() con criterio ígneo:", mineralIgneoValido.valida(criterioTest));

console.log("\n✅ Sistema listo para uso en navegador");