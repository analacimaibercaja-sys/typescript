// ============================================
// CLASE MINERAL
// ============================================
/**
 * Clase Mineral
 * Gestiona los datos de un mineral con método de validación predicado
 */
class Mineral {
    constructor(id, nombre, grupo, dureza, tamanoGrano, clasificacion, tamanoCristales, temperaturaFormacion, estructura, formaGranos, textura) {
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
    valida(criterio) {
        return criterio.valida(this);
    }
    static validarID(id) {
        const regex = /^[A-Z]{2}\d{4}[A-Z]{2}$/;
        return regex.test(id);
    }
}
// ============================================
// CLASE ASTRONAUTA
// ============================================
class Astronauta {
    constructor(identificador, nombreCompleto, edad) {
        this.identificador = identificador;
        this.nombreCompleto = nombreCompleto;
        this.edad = edad;
    }
    dameId() {
        return this.identificador;
    }
    dameNombre() {
        return this.nombreCompleto;
    }
    dameEdad() {
        return this.edad;
    }
}
// ============================================
// CRITERIOS DE VALIDACIÓN
// ============================================
class CriterioIgneas {
    getNombre() {
        return 'Ígneo';
    }
    valida(mineral) {
        return mineral.grupo === 'igneas' && mineral.tamanoGrano === 'muy-grueso';
    }
}
class CriterioMetamorficas {
    getNombre() {
        return 'Metamórfico';
    }
    valida(mineral) {
        return mineral.grupo === 'metamorficas' &&
            (mineral.tamanoGrano === 'medio' || mineral.tamanoGrano === 'fino') &&
            mineral.textura === 'vitrea';
    }
}
class CriterioSedimentaria {
    getNombre() {
        return 'Sedimentario';
    }
    valida(mineral) {
        return mineral.grupo === 'sedimentarias' && mineral.textura === 'faneritica';
    }
}
// ============================================
// SISTEMAS DE ENTRADA (CON RENDERIZADO DINÁMICO)
// ============================================
class IntroduccionExtendida {
    getNombre() {
        return 'Extendida';
    }
    capturar() {
        return this.capturarDatos();
    }
    capturarDatos() {
        return new Mineral(document.getElementById('id').value, document.getElementById('nombre').value, document.getElementById('grupo').value, parseInt(document.getElementById('dureza').value), document.getElementById('tamano-grano').value, document.getElementById('clasificacion').value, parseInt(document.getElementById('cristales').value), parseInt(document.getElementById('temperatura').value), document.getElementById('estructura').value, document.getElementById('forma-granos').value, document.getElementById('textura').value);
    }
    renderizarFormulario() {
        const formularioContainer = document.getElementById('formulario-container');
        formularioContainer.innerHTML = this.generarHTMLFormulario();
    }
    generarHTMLFormulario() {
        return `
            <div class="grid-2col">
                <div class="campo">
                    <label>ID (LLDDDDLL):</label>
                    <input type="text" id="id" required>
                </div>
                <div class="campo">
                    <label>Nombre:</label>
                    <input type="text" id="nombre" required>
                </div>
                <div class="campo">
                    <label>Grupo/Origen:</label>
                    <select id="grupo">
                        <option value="igneas">Ígneas</option>
                        <option value="metamorficas">Metamórficas</option>
                        <option value="sedimentarias">Sedimentarias</option>
                    </select>
                </div>
                <div class="campo">
                    <label>Dureza (1-10):</label>
                    <input type="number" id="dureza" min="1" max="10" required>
                </div>
                <div class="campo">
                    <label>Tamaño de grano:</label>
                    <select id="tamano-grano">
                        <option value="muy-grueso">Muy grueso (&gt; 30mm)</option>
                        <option value="grueso">Grueso (5-30mm)</option>
                        <option value="medio">Medio (2-5mm)</option>
                        <option value="fino">Fino (&lt; 2mm)</option>
                    </select>
                </div>
                <div class="campo">
                    <label>Clasificación:</label>
                    <select id="clasificacion">
                        <option value="construccion">Construcción</option>
                        <option value="ornamental">Ornamental</option>
                        <option value="utensilios">Utensilios</option>
                        <option value="machacadas">Piedras machacadas</option>
                    </select>
                </div>
                <div class="campo">
                    <label>Tamaño de cristales (0-10):</label>
                    <input type="number" id="cristales" min="0" max="10" required>
                </div>
                <div class="campo">
                    <label>Temperatura de formación (K):</label>
                    <input type="number" id="temperatura" min="-100" max="100" required>
                </div>
                <div class="campo">
                    <label>Estructura:</label>
                    <input type="text" id="estructura" required>
                </div>
                <div class="campo">
                    <label>Forma de los granos:</label>
                    <input type="text" id="forma-granos" required>
                </div>
                <div class="campo">
                    <label>Textura:</label>
                    <select id="textura">
                        <option value="vitrea">Vítrea</option>
                        <option value="afanitica">Afanítica</option>
                        <option value="faneritica">Fanerítica</option>
                    </select>
                </div>
            </div>
            <button class="btn-submit" onclick="analizarMineral()">Analizar Mineral</button>
        `;
    }
}
class IntroduccionReducida {
    getNombre() {
        return 'Reducida';
    }
    capturar() {
        return this.capturarDatos();
    }
    capturarDatos() {
        return new Mineral(document.getElementById('id').value, document.getElementById('nombre').value, document.getElementById('grupo').value, parseInt(document.getElementById('dureza').value), document.getElementById('tamano-grano').value, document.getElementById('clasificacion').value, parseInt(document.getElementById('cristales').value), parseInt(document.getElementById('temperatura').value), document.getElementById('estructura').value, document.getElementById('forma-granos').value, document.getElementById('textura').value);
    }
    renderizarFormulario() {
        const formularioContainer = document.getElementById('formulario-container');
        formularioContainer.innerHTML = this.generarHTMLFormulario();
    }
    generarHTMLFormulario() {
        return `
            <div class="campo">
                <input type="text" id="id" placeholder="ID (ej: AB1234CD)" required>
            </div>
            <div class="campo">
                <input type="text" id="nombre" placeholder="Nombre del mineral" required>
            </div>
            <div class="campo">
                <select id="grupo">
                    <option value="">-- Grupo/Origen --</option>
                    <option value="igneas">Ígneas</option>
                    <option value="metamorficas">Metamórficas</option>
                    <option value="sedimentarias">Sedimentarias</option>
                </select>
            </div>
            <div class="campo">
                <input type="number" id="dureza" placeholder="Dureza (1-10)" min="1" max="10" required>
            </div>
            <div class="campo">
                <select id="tamano-grano">
                    <option value="">-- Tamaño de grano --</option>
                    <option value="muy-grueso">Muy grueso</option>
                    <option value="grueso">Grueso</option>
                    <option value="medio">Medio</option>
                    <option value="fino">Fino</option>
                </select>
            </div>
            <div class="campo">
                <select id="clasificacion">
                    <option value="">-- Clasificación --</option>
                    <option value="construccion">Construcción</option>
                    <option value="ornamental">Ornamental</option>
                    <option value="utensilios">Utensilios</option>
                    <option value="machacadas">Machacadas</option>
                </select>
            </div>
            <div class="campo">
                <input type="number" id="cristales" placeholder="Tamaño cristales (0-10)" min="0" max="10" required>
            </div>
            <div class="campo">
                <input type="number" id="temperatura" placeholder="Temperatura (K)" min="-100" max="100" required>
            </div>
            <div class="campo">
                <input type="text" id="estructura" placeholder="Estructura" required>
            </div>
            <div class="campo">
                <input type="text" id="forma-granos" placeholder="Forma de los granos" required>
            </div>
            <div class="campo">
                <select id="textura">
                    <option value="">-- Textura --</option>
                    <option value="vitrea">Vítrea</option>
                    <option value="afanitica">Afanítica</option>
                    <option value="faneritica">Fanerítica</option>
                </select>
            </div>
            <button class="btn-submit" onclick="analizarMineral()">Analizar Mineral</button>
        `;
    }
}
// ============================================
// SISTEMAS DE SALIDA
// ============================================
class FormatoEuropeo {
    getNombre() {
        return 'Europeo';
    }
    mostrar(mineral) {
        const infoDiv = document.getElementById('info-roca');
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
    kelvinToCelsius(k) {
        return (k - 273.15).toFixed(2);
    }
}
class FormatoAmericano {
    getNombre() {
        return 'Americano';
    }
    mostrar(mineral) {
        const infoDiv = document.getElementById('info-roca');
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
    kelvinToFahrenheit(k) {
        return ((k - 273.15) * 9 / 5 + 32).toFixed(2);
    }
}
// ============================================
// CLASE MISIÓN - Central del desarrollo
// ============================================
class Mision {
    constructor(piloto, criterio, entrada, salida) {
        this.piloto = piloto;
        this.criterio = criterio;
        this.entrada = entrada;
        this.salida = salida;
    }
    /**
     * Método principal: Analiza un mineral capturable
     */
    analiza(capturable) {
        const esValido = this.criterio.valida(capturable);
        if (esValido) {
            this.salida.mostrar(capturable);
        }
        return esValido;
    }
    // Getters
    getPiloto() {
        return this.piloto;
    }
    getCriterio() {
        return this.criterio;
    }
    getEntrada() {
        return this.entrada;
    }
    getSalida() {
        return this.salida;
    }
    // Setters
    setPiloto(piloto) {
        this.piloto = piloto;
    }
    setCriterio(criterio) {
        this.criterio = criterio;
    }
    setEntrada(entrada) {
        this.entrada = entrada;
        entrada.renderizarFormulario();
    }
    setSalida(salida) {
        this.salida = salida;
    }
}
// ============================================
// GESTIÓN DE LA APLICACIÓN
// ============================================
let misionActual;
let astronauta;
function inicializarAplicacion() {
    // Crear astronauta
    astronauta = new Astronauta("AG001", "Agmunsen Pérez", 45);
    // Mostrar información del astronauta
    document.getElementById('astronauta-info').textContent =
        `Astronauta: ${astronauta.dameNombre()} (ID: ${astronauta.dameId()}, Edad: ${astronauta.dameEdad()})`;
    // Crear misión inicial
    const criterioInicial = new CriterioIgneas();
    const entradaInicial = new IntroduccionExtendida();
    const salidaInicial = new FormatoEuropeo();
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
    }
    catch (error) {
        console.error('Error al analizar mineral:', error);
        alert('Error al procesar los datos. Por favor, verifica que todos los campos estén completos.');
    }
}
function mostrarResultadoValidacion(esValido) {
    const resultadoDiv = document.getElementById('resultado');
    const validacionDiv = document.getElementById('validacion-display');
    const formato = document.getElementById('formato-salida').value;
    resultadoDiv.classList.add('visible');
    if (esValido) {
        validacionDiv.className = 'validacion valida';
        validacionDiv.innerHTML = `
            <div class="emoji">😊</div>
            <h2>${formato === 'americano' ? 'Valid Mineral!' : '¡Mineral Válido!'}</h2>
        `;
    }
    else {
        validacionDiv.className = 'validacion invalida';
        validacionDiv.innerHTML = `
            <div class="emoji">😠</div>
            <h2>${formato === 'americano' ? 'Invalid Mineral' : 'Mineral No Válido'}</h2>
        `;
        document.getElementById('info-roca').innerHTML = '';
    }
}
// ============================================
// INICIALIZACIÓN AL CARGAR LA PÁGINA
// ============================================
document.addEventListener('DOMContentLoaded', inicializarAplicacion);
// Hacer la función global accesible desde el HTML
window.analizarMineral = analizarMineral;
export {};
