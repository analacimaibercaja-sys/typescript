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
        return "Ígneo";
    }
    valida(mineral) {
        return mineral.grupo === "igneas" && mineral.tamanoGrano === "muy-grueso";
    }
}
class CriterioMetamorficas {
    getNombre() {
        return "Metamórfico";
    }
    valida(mineral) {
        return (mineral.grupo === "metamorficas" &&
            (mineral.tamanoGrano === "medio" || mineral.tamanoGrano === "fino") &&
            mineral.textura === "vitrea");
    }
}
class CriterioSedimentaria {
    getNombre() {
        return "Sedimentario";
    }
    valida(mineral) {
        return (mineral.grupo === "sedimentarias" && mineral.textura === "faneritica");
    }
}
// ============================================
// SISTEMAS DE ENTRADA
// ============================================
class IntroduccionExtendida {
    getNombre() {
        return "Extendida";
    }
    capturar() {
        return this.capturarDatos();
    }
    capturarDatos() {
        return new Mineral(document.getElementById("id").value, document.getElementById("nombre").value, document.getElementById("grupo").value, parseInt(document.getElementById("dureza").value), document.getElementById("tamano-grano")
            .value, document.getElementById("clasificacion")
            .value, parseInt(document.getElementById("cristales").value), parseInt(document.getElementById("temperatura").value), document.getElementById("estructura").value, document.getElementById("forma-granos").value, document.getElementById("textura").value);
    }
    renderizarFormulario() {
        const formularioContainer = document.getElementById("formulario-container");
        formularioContainer.innerHTML = this.generarHTMLFormulario();
    }
    generarHTMLFormulario() {
        return `
        <div class="row g-3 formulario-dinamico">
            <div class="col-md-6">
                <div class="campo">
                    <label for="id" class="form-label fw-semibold">ID (LLDDDDLL):</label>
                    <input type="text" id="id" class="form-control" required>
                    <div class="form-text">Formato: 2 letras, 4 números, 2 letras (ej: AB1234CD)</div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="campo">
                    <label for="nombre" class="form-label fw-semibold">Nombre:</label>
                    <input type="text" id="nombre" class="form-control" required>
                </div>
            </div>
            
            <div class="col-md-6">
                <div class="campo">
                    <label for="grupo" class="form-label fw-semibold">Grupo/Origen:</label>
                    <select id="grupo" class="form-select">
                        <option value="igneas">Ígneas</option>
                        <option value="metamorficas">Metamórficas</option>
                        <option value="sedimentarias">Sedimentarias</option>
                    </select>
                </div>
            </div>
            <div class="col-md-6">
                <div class="campo">
                    <label for="dureza" class="form-label fw-semibold">Dureza (1-10):</label>
                    <input type="number" id="dureza" class="form-control" min="1" max="10" required>
                </div>
            </div>
            
            <div class="col-md-6">
                <div class="campo">
                    <label for="tamano-grano" class="form-label fw-semibold">Tamaño de grano:</label>
                    <select id="tamano-grano" class="form-select">
                        <option value="muy-grueso">Muy grueso (&gt; 30mm)</option>
                        <option value="grueso">Grueso (5-30mm)</option>
                        <option value="medio">Medio (2-5mm)</option>
                        <option value="fino">Fino (&lt; 2mm)</option>
                    </select>
                </div>
            </div>
            <div class="col-md-6">
                <div class="campo">
                    <label for="clasificacion" class="form-label fw-semibold">Clasificación:</label>
                    <select id="clasificacion" class="form-select">
                        <option value="construccion">Construcción</option>
                        <option value="ornamental">Ornamental</option>
                        <option value="utensilios">Utensilios</option>
                        <option value="machacadas">Piedras machacadas</option>
                    </select>
                </div>
            </div>
            
            <div class="col-md-6">
                <div class="campo">
                    <label for="cristales" class="form-label fw-semibold">Tamaño de cristales (0-10):</label>
                    <input type="number" id="cristales" class="form-control" min="0" max="10" required>
                </div>
            </div>
            <div class="col-md-6">
                <div class="campo">
                    <label for="temperatura" class="form-label fw-semibold">Temperatura de formación (K):</label>
                    <input type="number" id="temperatura" class="form-control" min="-100" max="100" required>
                </div>
            </div>
            
            <div class="col-md-6">
                <div class="campo">
                    <label for="estructura" class="form-label fw-semibold">Estructura:</label>
                    <input type="text" id="estructura" class="form-control" required>
                </div>
            </div>
            <div class="col-md-6">
                <div class="campo">
                    <label for="forma-granos" class="form-label fw-semibold">Forma de los granos:</label>
                    <input type="text" id="forma-granos" class="form-control" required>
                </div>
            </div>
            
            <div class="col-12">
                <div class="campo">
                    <label for="textura" class="form-label fw-semibold">Textura:</label>
                    <select id="textura" class="form-select">
                        <option value="vitrea">Vítrea</option>
                        <option value="afanitica">Afanítica</option>
                        <option value="faneritica">Fanerítica</option>
                    </select>
                </div>
            </div>
            
            <div class="col-12">
                <button class="btn btn-primary btn-lg w-100 py-3" onclick="analizarMineral()">
                    <i class="bi bi-search me-2"></i>Analizar Mineral
                </button>
            </div>
        </div>
        `;
    }
}
class IntroduccionReducida {
    getNombre() {
        return "Reducida";
    }
    capturar() {
        return this.capturarDatos();
    }
    capturarDatos() {
        return new Mineral(document.getElementById("id").value, document.getElementById("nombre").value, document.getElementById("grupo").value, parseInt(document.getElementById("dureza").value), document.getElementById("tamano-grano")
            .value, document.getElementById("clasificacion")
            .value, parseInt(document.getElementById("cristales").value), parseInt(document.getElementById("temperatura").value), document.getElementById("estructura").value, document.getElementById("forma-granos").value, document.getElementById("textura").value);
    }
    renderizarFormulario() {
        const formularioContainer = document.getElementById("formulario-container");
        formularioContainer.innerHTML = this.generarHTMLFormulario();
    }
    generarHTMLFormulario() {
        return `
        <div class="row g-3 formulario-dinamico">
            <div class="col-md-6">
                <div class="campo">
                    <input type="text" id="id" class="form-control" placeholder="ID (ej: AB1234CD)" required>
                </div>
            </div>
            <div class="col-md-6">
                <div class="campo">
                    <input type="text" id="nombre" class="form-control" placeholder="Nombre del mineral" required>
                </div>
            </div>
            
            <div class="col-md-6">
                <div class="campo">
                    <select id="grupo" class="form-select">
                        <option value="">-- Grupo/Origen --</option>
                        <option value="igneas">Ígneas</option>
                        <option value="metamorficas">Metamórficas</option>
                        <option value="sedimentarias">Sedimentarias</option>
                    </select>
                </div>
            </div>
            <div class="col-md-6">
                <div class="campo">
                    <input type="number" id="dureza" class="form-control" placeholder="Dureza (1-10)" min="1" max="10" required>
                </div>
            </div>
            
            <div class="col-md-6">
                <div class="campo">
                    <select id="tamano-grano" class="form-select">
                        <option value="">-- Tamaño de grano --</option>
                        <option value="muy-grueso">Muy grueso</option>
                        <option value="grueso">Grueso</option>
                        <option value="medio">Medio</option>
                        <option value="fino">Fino</option>
                    </select>
                </div>
            </div>
            <div class="col-md-6">
                <div class="campo">
                    <select id="clasificacion" class="form-select">
                        <option value="">-- Clasificación --</option>
                        <option value="construccion">Construcción</option>
                        <option value="ornamental">Ornamental</option>
                        <option value="utensilios">Utensilios</option>
                        <option value="machacadas">Machacadas</option>
                    </select>
                </div>
            </div>
            
            <div class="col-md-6">
                <div class="campo">
                    <input type="number" id="cristales" class="form-control" placeholder="Tamaño cristales (0-10)" min="0" max="10" required>
                </div>
            </div>
            <div class="col-md-6">
                <div class="campo">
                    <input type="number" id="temperatura" class="form-control" placeholder="Temperatura (K)" min="-100" max="100" required>
                </div>
            </div>
            
            <div class="col-md-6">
                <div class="campo">
                    <input type="text" id="estructura" class="form-control" placeholder="Estructura" required>
                </div>
            </div>
            <div class="col-md-6">
                <div class="campo">
                    <input type="text" id="forma-granos" class="form-control" placeholder="Forma de los granos" required>
                </div>
            </div>
            
            <div class="col-12">
                <div class="campo">
                    <select id="textura" class="form-select">
                        <option value="">-- Textura --</option>
                        <option value="vitrea">Vítrea</option>
                        <option value="afanitica">Afanítica</option>
                        <option value="faneritica">Fanerítica</option>
                    </select>
                </div>
            </div>
            
            <div class="col-12">
                <button class="btn btn-primary btn-lg w-100 py-3" onclick="analizarMineral()">
                    <i class="bi bi-search me-2"></i>Analizar Mineral
                </button>
            </div>
        </div>
    `;
    }
}
// ============================================
// SISTEMAS DE SALIDA
// ============================================
class FormatoEuropeo {
    getNombre() {
        return "Europeo";
    }
    kelvinToCelsius(k) {
        return (k - 273.15).toFixed(2);
    }
    mostrar(mineral) {
        const infoDiv = document.getElementById("info-roca");
        infoDiv.innerHTML = `
        <div class="row">
            <div class="col-md-6">
                <div class="mb-3">
                    <strong class="text-primary">ID:</strong> 
                    <span class="badge bg-secondary">${mineral.id}</span>
                </div>
                <div class="mb-3">
                    <strong class="text-primary">Nombre:</strong> 
                    ${mineral.nombre}
                </div>
                <div class="mb-3">
                    <strong class="text-primary">Grupo:</strong> 
                    <span class="badge bg-info">${mineral.grupo}</span>
                </div>
                <div class="mb-3">
                    <strong class="text-primary">Dureza:</strong> 
                    ${mineral.dureza}/10
                </div>
                <div class="mb-3">
                    <strong class="text-primary">Tamaño de grano:</strong> 
                    ${mineral.tamanoGrano}
                </div>
            </div>
            <div class="col-md-6">
                <div class="mb-3">
                    <strong class="text-primary">Clasificación:</strong> 
                    ${mineral.clasificacion}
                </div>
                <div class="mb-3">
                    <strong class="text-primary">Tamaño de cristales:</strong> 
                    ${mineral.tamanoCristales}/10
                </div>
                <div class="mb-3">
                    <strong class="text-primary">Temperatura:</strong> 
                    ${this.kelvinToCelsius(mineral.temperaturaFormacion)}°C
                </div>
                <div class="mb-3">
                    <strong class="text-primary">Estructura:</strong> 
                    ${mineral.estructura}
                </div>
                <div class="mb-3">
                    <strong class="text-primary">Forma de los granos:</strong> 
                    ${mineral.formaGranos}
                </div>
                <div class="mb-3">
                    <strong class="text-primary">Textura:</strong> 
                    <span class="badge bg-warning text-dark">${mineral.textura}</span>
                </div>
            </div>
        </div>
    `;
    }
}
class FormatoAmericano {
    getNombre() {
        return "Americano";
    }
    kelvinToFahrenheit(k) {
        return (((k - 273.15) * 9) / 5 + 32).toFixed(2);
    }
    mostrar(mineral) {
        const infoDiv = document.getElementById("info-roca");
        infoDiv.innerHTML = `
        <div class="row">
            <div class="col-md-6">
                <div class="mb-3">
                    <strong class="text-primary">ID:</strong> 
                    <span class="badge bg-secondary">${mineral.id}</span>
                </div>
                <div class="mb-3">
                    <strong class="text-primary">Name:</strong> 
                    ${mineral.nombre}
                </div>
                <div class="mb-3">
                    <strong class="text-primary">Group:</strong> 
                    <span class="badge bg-info">${mineral.grupo}</span>
                </div>
                <div class="mb-3">
                    <strong class="text-primary">Hardness:</strong> 
                    ${mineral.dureza}/10
                </div>
                <div class="mb-3">
                    <strong class="text-primary">Grain size:</strong> 
                    ${mineral.tamanoGrano}
                </div>
            </div>
            <div class="col-md-6">
                <div class="mb-3">
                    <strong class="text-primary">Classification:</strong> 
                    ${mineral.clasificacion}
                </div>
                <div class="mb-3">
                    <strong class="text-primary">Crystal size:</strong> 
                    ${mineral.tamanoCristales}/10
                </div>
                <div class="mb-3">
                    <strong class="text-primary">Temperature:</strong> 
                    ${this.kelvinToFahrenheit(mineral.temperaturaFormacion)}°C
                </div>
                <div class="mb-3">
                    <strong class="text-primary">Structure:</strong> 
                    ${mineral.estructura}
                </div>
                <div class="mb-3">
                    <strong class="text-primary">Grain shape:</strong> 
                    ${mineral.formaGranos}
                </div>
                <div class="mb-3">
                    <strong class="text-primary">Texture:</strong> 
                    <span class="badge bg-warning text-dark">${mineral.textura}</span>
                </div>
            </div>
        </div>
    `;
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
    document.getElementById("astronauta-info").textContent = `Astronauta: ${astronauta.dameNombre()} (ID: ${astronauta.dameId()}, Edad: ${astronauta.dameEdad()})`;
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
    document
        .getElementById("tipo-formulario")
        .addEventListener("change", function () {
        if (this.value === "extendida") {
            misionActual.setEntrada(new IntroduccionExtendida());
        }
        else {
            misionActual.setEntrada(new IntroduccionReducida());
        }
    });
    // Cambio de criterio de validación
    document
        .getElementById("validador")
        .addEventListener("change", function () {
        if (this.value === "igneo") {
            misionActual.setCriterio(new CriterioIgneas());
        }
        else if (this.value === "metamorfico") {
            misionActual.setCriterio(new CriterioMetamorficas());
        }
        else {
            misionActual.setCriterio(new CriterioSedimentaria());
        }
    });
    // Cambio de formato de salida
    document
        .getElementById("formato-salida")
        .addEventListener("change", function () {
        if (this.value === "europeo") {
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
            alert("El ID debe tener el formato LLDDDDLL (2 letras, 4 números, 2 letras)");
            return;
        }
        // Validar campos completos
        if (!mineral.grupo || !mineral.tamanoGrano || !mineral.textura) {
            alert("Por favor completa todos los campos");
            return;
        }
        // Analizar el mineral usando la misión
        const esValido = misionActual.analiza(mineral);
        // Mostrar resultado
        mostrarResultadoValidacion(esValido);
    }
    catch (error) {
        console.error("Error al analizar mineral:", error);
        alert("Error al procesar los datos. Por favor, verifica que todos los campos estén completos.");
    }
}
function mostrarResultadoValidacion(esValido) {
    const resultadoDiv = document.getElementById("resultado");
    const validacionDiv = document.getElementById("validacion-display");
    const formato = document.getElementById("formato-salida").value;
    resultadoDiv.style.display = "block";
    if (esValido) {
        validacionDiv.className = "validacion valida";
        validacionDiv.innerHTML = `
            <div class="emoji">✅</div>
            <h2 class="mb-3">${formato === "americano" ? "Valid Mineral!" : "¡Mineral Válido!"}</h2>
            <p class="mb-0">${formato === "americano"
            ? "The mineral meets all validation criteria."
            : "El mineral cumple con todos los criterios de validación."}</p>
        `;
    }
    else {
        validacionDiv.className = "validacion invalida";
        validacionDiv.innerHTML = `
            <div class="emoji">❌</div>
            <h2 class="mb-3">${formato === "americano" ? "Invalid Mineral" : "Mineral No Válido"}</h2>
            <p class="mb-0">${formato === "americano"
            ? "The mineral does not meet the validation criteria."
            : "El mineral no cumple con los criterios de validación."}</p>
        `;
        document.getElementById("info-roca").innerHTML = "";
    }
}
/*
function mostrarResultadoValidacion(esValido: boolean): void {
  const resultadoDiv = document.getElementById("resultado")!;
  const validacionDiv = document.getElementById("validacion-display")!;
  const formato = (
    document.getElementById("formato-salida") as HTMLSelectElement
  ).value;

  resultadoDiv.classList.add("visible");

  if (esValido) {
    validacionDiv.className = "validacion valida";
    validacionDiv.innerHTML = `
            <div class="emoji">😊</div>
            <h2>${
              formato === "americano" ? "Valid Mineral!" : "¡Mineral Válido!"
            }</h2>
        `;
  } else {
    validacionDiv.className = "validacion invalida";
    validacionDiv.innerHTML = `
            <div class="emoji">😠</div>
            <h2>${
              formato === "americano" ? "Invalid Mineral" : "Mineral No Válido"
            }</h2>
        `;
    document.getElementById("info-roca")!.innerHTML = "";
  }
}
*/
// ============================================
// INICIALIZACIÓN AL CARGAR LA PÁGINA
// ============================================
document.addEventListener("DOMContentLoaded", inicializarAplicacion);
// Hacer la función global accesible desde el HTML
window.analizarMineral = analizarMineral;
export {};
