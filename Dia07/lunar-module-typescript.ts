// ============================================
// INTERFACES
// ============================================

/**
 * Interface ICapturable
 * Representa algo que puede ser capturado/analizado
 */
interface ICapturable {
    id: string;
    nombre: string;
    grupo: 'igneas' | 'metamorficas' | 'sedimentarias';
    dureza: number;
    tamanoGrano: 'muy-grueso' | 'grueso' | 'medio' | 'fino';
    clasificacion: 'construccion' | 'ornamental' | 'utensilios' | 'machacadas';
    tamanoCristales: number;
    temperaturaFormacion: number;
    estructura: string;
    formaGranos: string;
    textura: 'vitrea' | 'afanitica' | 'faneritica';

    valida(criterio: ICriterioValidacion): boolean;

}

/**
 * Interface IPiloto
 * Define las operaciones de un piloto
 */
interface IPiloto {
    dameId(): string;
    dameNombre(): string;
    dameEdad(): number;
}

/**
 * Interface ICriterioValidacion
 * Define un criterio de validación
 */
interface ICriterioValidacion {
    valida(mineral: ICapturable): boolean;
    getNombre(): string;
}

/**
 * Interface ISistemaEntrada
 * Sistema para capturar datos del mineral
 */
interface ISistemaEntrada {
    capturar(): ICapturable;
    getNombre(): string;
}

/**
 * Interface ISistemaSalida
 * Sistema para mostrar información del mineral
 */
interface ISistemaSalida {
    mostrar(mineral: ICapturable): void;
    getNombre(): string;
}

/**
 * Interface IMisionable
 * Define las operaciones de una misión
 */
interface IMisionable {
    analiza(capturable: ICapturable): boolean;
}

// ============================================
// CLASE MINERAL
// ============================================

/**
 * Clase Mineral
 * Gestiona los datos de un mineral con método de validación predicado
 */
class Mineral implements ICapturable {
    constructor(
        public id: string,
        public nombre: string,
        public grupo: 'igneas' | 'metamorficas' | 'sedimentarias',
        public dureza: number,
        public tamanoGrano: 'muy-grueso' | 'grueso' | 'medio' | 'fino',
        public clasificacion: 'construccion' | 'ornamental' | 'utensilios' | 'machacadas',
        public tamanoCristales: number,
        public temperaturaFormacion: number,
        public estructura: string,
        public formaGranos: string,
        public textura: 'vitrea' | 'afanitica' | 'faneritica'
    ) { }

    /**
     * Método predicado para validar según un criterio
     */
    valida(criterio: ICriterioValidacion): boolean {
        return criterio.valida(this);
    }

    static validarID(id: string): boolean {
        const regex = /^[A-Z]{2}\d{4}[A-Z]{2}$/;
        return regex.test(id);
    }
}

// ============================================
// CLASE ASTRONAUTA
// ============================================

class Astronauta implements IPiloto {
    constructor(
        private identificador: string,
        private nombreCompleto: string,
        private edad: number
    ) { }

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
// CRITERIOS DE VALIDACIÓN
// ============================================

class CriterioIgneas implements ICriterioValidacion {
    getNombre(): string {
        return 'Ígneo';
    }

    valida(mineral: ICapturable): boolean {
        return mineral.grupo === 'igneas' && mineral.tamanoGrano === 'muy-grueso';
    }
}

class CriterioMetamorficas implements ICriterioValidacion {
    getNombre(): string {
        return 'Metamórfico';
    }

    valida(mineral: ICapturable): boolean {
        return mineral.grupo === 'metamorficas' &&
            (mineral.tamanoGrano === 'medio' || mineral.tamanoGrano === 'fino') &&
            mineral.textura === 'vitrea';
    }
}

class CriterioSedimentaria implements ICriterioValidacion {
    getNombre(): string {
        return 'Sedimentario';
    }

    valida(mineral: ICapturable): boolean {
        return mineral.grupo === 'sedimentarias' && mineral.textura === 'faneritica';
    }
}

// ============================================
// SISTEMAS DE ENTRADA
// ============================================

class IntroduccionExtendida implements ISistemaEntrada {
    getNombre(): string {
        return 'Extendida';
    }

    capturar(): ICapturable {
        return this.capturarDatos('ext');
    }

    private capturarDatos(prefix: string): ICapturable {
        return new Mineral(
            (document.getElementById(`${prefix}-id`) as HTMLInputElement).value,
            (document.getElementById(`${prefix}-nombre`) as HTMLInputElement).value,
            (document.getElementById(`${prefix}-grupo`) as HTMLSelectElement).value as any,
            parseInt((document.getElementById(`${prefix}-dureza`) as HTMLInputElement).value),
            (document.getElementById(`${prefix}-tamano-grano`) as HTMLSelectElement).value as any,
            (document.getElementById(`${prefix}-clasificacion`) as HTMLSelectElement).value as any,
            parseInt((document.getElementById(`${prefix}-cristales`) as HTMLInputElement).value),
            parseInt((document.getElementById(`${prefix}-temperatura`) as HTMLInputElement).value),
            (document.getElementById(`${prefix}-estructura`) as HTMLInputElement).value,
            (document.getElementById(`${prefix}-forma-granos`) as HTMLInputElement).value,
            (document.getElementById(`${prefix}-textura`) as HTMLSelectElement).value as any
        );
    }
}

class IntroduccionReducida implements ISistemaEntrada {
    getNombre(): string {
        return 'Reducida';
    }

    capturar(): ICapturable {
        return this.capturarDatos('red');
    }

    private capturarDatos(prefix: string): ICapturable {
        return new Mineral(
            (document.getElementById(`${prefix}-id`) as HTMLInputElement).value,
            (document.getElementById(`${prefix}-nombre`) as HTMLInputElement).value,
            (document.getElementById(`${prefix}-grupo`) as HTMLSelectElement).value as any,
            parseInt((document.getElementById(`${prefix}-dureza`) as HTMLInputElement).value),
            (document.getElementById(`${prefix}-tamano-grano`) as HTMLSelectElement).value as any,
            (document.getElementById(`${prefix}-clasificacion`) as HTMLSelectElement).value as any,
            parseInt((document.getElementById(`${prefix}-cristales`) as HTMLInputElement).value),
            parseInt((document.getElementById(`${prefix}-temperatura`) as HTMLInputElement).value),
            (document.getElementById(`${prefix}-estructura`) as HTMLInputElement).value,
            (document.getElementById(`${prefix}-forma-granos`) as HTMLInputElement).value,
            (document.getElementById(`${prefix}-textura`) as HTMLSelectElement).value as any
        );
    }
}

// ============================================
// SISTEMAS DE SALIDA
// ============================================

class FormatoEuropeo implements ISistemaSalida {
    getNombre(): string {
        return 'Europeo';
    }

    mostrar(mineral: ICapturable): void {
        const infoDiv = document.getElementById('info-roca')!;
        infoDiv.innerHTML = `
            <h3>Información del Mineral (Formato Europeo)</h3>
            <p><strong>ID:</strong> ${mineral.id}</p>
            <p><strong>Nombre:</strong> ${mineral.nombre}</p>
            <p><strong>Grupo:</strong> ${mineral.grupo}</p>
            <p><strong>Dureza:</strong> ${mineral.dureza}</p>
            <p><strong>Tamaño de grano:</strong> ${mineral.tamanoGrano}</p>
            <p><strong>Clasificación:</strong> ${mineral.clasificacion}</p>
            <p><strong>Tamaño de cristales:</strong> ${mineral.tamanoCristales}</p>
            <p><strong>Temperatura:</strong> ${this.kelvinToCelsius(mineral.temperaturaFormacion)}°C</p>
            <p><strong>Estructura:</strong> ${mineral.estructura}</p>
            <p><strong>Forma de los granos:</strong> ${mineral.formaGranos}</p>
            <p><strong>Textura:</strong> ${mineral.textura}</p>
        `;
    }

    private kelvinToCelsius(k: number): string {
        return (k - 273.15).toFixed(2);
    }
}

class FormatoAmericano implements ISistemaSalida {
    getNombre(): string {
        return 'Americano';
    }

    mostrar(mineral: ICapturable): void {
        const infoDiv = document.getElementById('info-roca')!;
        infoDiv.innerHTML = `
            <h3>Mineral Information (American Format)</h3>
            <p><strong>ID:</strong> ${mineral.id}</p>
            <p><strong>Name:</strong> ${mineral.nombre}</p>
            <p><strong>Group:</strong> ${mineral.grupo}</p>
            <p><strong>Hardness:</strong> ${mineral.dureza}</p>
            <p><strong>Grain size:</strong> ${mineral.tamanoGrano}</p>
            <p><strong>Classification:</strong> ${mineral.clasificacion}</p>
            <p><strong>Crystal size:</strong> ${mineral.tamanoCristales}</p>
            <p><strong>Temperature:</strong> ${this.kelvinToFahrenheit(mineral.temperaturaFormacion)}°F</p>
            <p><strong>Structure:</strong> ${mineral.estructura}</p>
            <p><strong>Grain shape:</strong> ${mineral.formaGranos}</p>
            <p><strong>Texture:</strong> ${mineral.textura}</p>
        `;
    }

    private kelvinToFahrenheit(k: number): string {
        return ((k - 273.15) * 9 / 5 + 32).toFixed(2);
    }
}

// ============================================
// CLASE MISIÓN - Central del desarrollo
// ============================================

class Mision implements IMisionable {
    constructor(
        private piloto: IPiloto,
        private criterio: ICriterioValidacion,
        private entrada: ISistemaEntrada,
        private salida: ISistemaSalida
    ) { }

    /**
     * Método principal: Analiza un mineral capturable
     */
    analiza(capturable: ICapturable): boolean {
        const esValido = this.criterio.valida(capturable);

        if (esValido) {
            this.salida.mostrar(capturable);
        }

        return esValido;
    }

    // Getters
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

    // Setters
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
// GESTIÓN DE LA APLICACIÓN
// ============================================

let misionActual: Mision;
let astronauta: IPiloto;

function inicializarAplicacion(): void {
    // Crear astronauta
    astronauta = new Astronauta("AG001", "Agmunsen Pérez", 45);

    // Mostrar información del astronauta
    document.getElementById('astronauta-info')!.textContent =
        `Astronauta: ${astronauta.dameNombre()} (ID: ${astronauta.dameId()}, Edad: ${astronauta.dameEdad()})`;

    // Crear misión inicial
    const criterioInicial = new CriterioIgneas();
    const entradaInicial = new IntroduccionExtendida();
    const salidaInicial = new FormatoEuropeo();

    misionActual = new Mision(astronauta, criterioInicial, entradaInicial, salidaInicial);

    // Configurar event listeners
    configurarEventListeners();
}

function configurarEventListeners(): void {
    // Cambio de tipo de formulario
    document.getElementById('tipo-formulario')!.addEventListener('change', function (this: HTMLSelectElement) {
        const formExt = document.getElementById('form-extendida')!;
        const formRed = document.getElementById('form-reducida')!;

        if (this.value === 'extendida') {
            formExt.classList.remove('oculto');
            formRed.classList.add('oculto');
            misionActual.setEntrada(new IntroduccionExtendida());
        } else {
            formExt.classList.add('oculto');
            formRed.classList.remove('oculto');
            misionActual.setEntrada(new IntroduccionReducida());
        }
    });

    // Cambio de criterio de validación
    document.getElementById('validador')!.addEventListener('change', function (this: HTMLSelectElement) {
        if (this.value === 'igneo') {
            misionActual.setCriterio(new CriterioIgneas());
        } else if (this.value === 'metamorfico') {
            misionActual.setCriterio(new CriterioMetamorficas());
        } else {
            misionActual.setCriterio(new CriterioSedimentaria());
        }
    });

    // Cambio de formato de salida
    document.getElementById('formato-salida')!.addEventListener('change', function (this: HTMLSelectElement) {
        if (this.value === 'europeo') {
            misionActual.setSalida(new FormatoEuropeo());
        } else {
            misionActual.setSalida(new FormatoAmericano());
        }
    });
}

function analizarMineral(): void {
    try {
        // Capturar el mineral usando el sistema de entrada actual
        const mineral = misionActual.getEntrada().capturar();

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
        const esValido = misionActual.analiza(mineral);

        // Mostrar resultado
        mostrarResultadoValidacion(esValido);

    } catch (error) {
        console.error('Error al analizar mineral:', error);
        alert('Error al procesar los datos. Por favor, verifica que todos los campos estén completos.');
    }
}

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
        `;
    } else {
        validacionDiv.className = 'validacion invalida';
        validacionDiv.innerHTML = `
            <div class="emoji">😠</div>
            <h2>${formato === 'americano' ? 'Invalid Mineral' : 'Mineral No Válido'}</h2>
        `;
        document.getElementById('info-roca')!.innerHTML = '';
    }
}

// ============================================
// INICIALIZACIÓN AL CARGAR LA PÁGINA
// ============================================

document.addEventListener('DOMContentLoaded', inicializarAplicacion);

// Hacer la función global accesible desde el HTML
(window as any).analizarMineral = analizarMineral;

// ============================================
// EJEMPLO DE USO SEGÚN EL PLANTEAMIENTO
// ============================================

console.log("=== SISTEMA DE MISIÓN LUNAR ===\n");

// Crear componentes según el planteamiento
const piloto: IPiloto = new Astronauta("AG001", "Agmunsen Pérez", 45);
const criterioIgneo: ICriterioValidacion = new CriterioIgneas();
const entradaExtendida: ISistemaEntrada = new IntroduccionExtendida();
const salidaEuropea: ISistemaSalida = new FormatoEuropeo();

// Crear misión con todos los componentes
const misionIgnea: Mision = new Mision(piloto, criterioIgneo, entradaExtendida, salidaEuropea);

console.log(`Piloto: ${piloto.dameNombre()}`);
console.log(`Criterio: ${criterioIgneo.getNombre()}`);
console.log(`Sistema Entrada: ${entradaExtendida.getNombre()}`);
console.log(`Sistema Salida: ${salidaEuropea.getNombre()}\n`);

// Crear minerales de prueba
const mineralIgneoValido: ICapturable = new Mineral(
    "AB1234CD",
    "Granito Lunar",
    "igneas",
    7,
    "muy-grueso",
    "construccion",
    5,
    50,
    "Cristalina",
    "Angulares",
    "faneritica"
);

const mineralIgneoInvalido: ICapturable = new Mineral(
    "XY5678ZW",
    "Basalto Lunar",
    "igneas",
    6,
    "fino",
    "construccion",
    2,
    30,
    "Vítrea",
    "Redondeados",
    "vitrea"
);

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
const criterioTest = new CriterioIgneas();
console.log("Mineral.valida() con criterio ígneo:", mineralIgneoValido.valida(criterioTest)); // true