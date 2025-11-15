// main.ts
// Archivo principal de la aplicación

import { Astronauta } from './astronauta.js';
import { ValidadorIgneas, ValidadorMetamorficas, ValidadorSedimentarias } from './validadores.js';
import { EntradaExtendida, EntradaReducida, FormatoEuropeo, FormatoAmericano } from './sistemas.js';
import { Mision } from './mision.js';
import { Mineral, TipoRoca, TamanoGrano, Textura, Clasificacion } from './types.js';
import { IValidable, ISalida, IEntrada } from './interfaces.js';
// Estado global de la aplicación
let astronauta: Astronauta;
let modoFormulario: string = "extendido";
let formatoSalida: string = "europeo";
let validadorActual: IValidable;
let sistemaEntrada: IEntrada;
let sistemaSalida: ISalida;
let mision: Mision;

/**
 * Inicializa la aplicación
 */
function inicializarApp(): void {
    astronauta = new Astronauta("AG001", "Agmunsen Pérez", 45);
    validadorActual = new ValidadorIgneas();
    sistemaEntrada = new EntradaExtendida();
    sistemaSalida = new FormatoEuropeo();
    mision = new Mision(sistemaEntrada, sistemaSalida, validadorActual, astronauta);

    mostrarInfoAstronauta();
    configurarEventos();
    renderizarFormulario();
}

/**
 * Muestra la información del astronauta
 */
function mostrarInfoAstronauta(): void {
    const elemento = document.getElementById('astronautaInfo');
    if (elemento) {
        elemento.textContent = 
            `${astronauta.dameNombreCompleto()} (${astronauta.dameIdentificador()}) - ${astronauta.dameEdad()} años`;
    }
}

/**
 * Configura todos los eventos de la aplicación
 */
function configurarEventos(): void {
    // Eventos de modo de formulario
    const radiosModo = document.querySelectorAll<HTMLInputElement>('input[name="modoFormulario"]');
    for (const radio of Array.from(radiosModo)) {
        radio.addEventListener('change', (e: Event) => {
            const valor = (e.target as HTMLInputElement).value;
            cambiarModoFormulario(valor);
        });
    }

    // Eventos de formato de salida
    const radiosFormato = document.querySelectorAll<HTMLInputElement>('input[name="formatoSalida"]');
    for (const radio of Array.from(radiosFormato)) {
        radio.addEventListener('change', (e: Event) => {
            const valor = (e.target as HTMLInputElement).value;
            cambiarFormatoSalida(valor);
        });
    }

    // Evento de cambio de criterio
    document.getElementById('criterioSelect')?.addEventListener('change', (e) => {
        const select = e.target as HTMLSelectElement;
        cambiarCriterio(select.value);
    });
}

/**
 * Cambia el modo del formulario
 */
function cambiarModoFormulario(modo: string): void {
    modoFormulario = modo;
    sistemaEntrada = modo === 'extendido' ? new EntradaExtendida() : new EntradaReducida();
    mision.setEntrada(sistemaEntrada);

    const textoModo = document.getElementById('modoFormularioTexto');
    if (textoModo) {
        textoModo.textContent = modo === 'extendido' ? 'Modo Extendido' : 'Modo Reducido';
    }

    renderizarFormulario();
}

/**
 * Cambia el formato de salida
 */
function cambiarFormatoSalida(formato: string): void {
    formatoSalida = formato;
    sistemaSalida = formato === 'europeo' ? new FormatoEuropeo() : new FormatoAmericano();
    mision.setSalida(sistemaSalida);
    
    const textoFormato = document.getElementById('formatoSalidaTexto');
    if (textoFormato) {
        textoFormato.textContent = formato === 'europeo' ? 'Formato Europeo' : 'Formato Americano';
    }
}

/**
 * Cambia el criterio de validación
 */
function cambiarCriterio(tipo: string): void {
    switch(tipo) {
        case 'igneas':
            validadorActual = new ValidadorIgneas();
            break;
        case 'metamorficas':
            validadorActual = new ValidadorMetamorficas();
            break;
        case 'sedimentarias':
            validadorActual = new ValidadorSedimentarias();
            break;
    }
    
    mision.setCriterio(validadorActual);
    
    const criterioTexto = document.getElementById('criterioActual');
    if (criterioTexto) {
        criterioTexto.textContent = validadorActual.getNombre();
    }

    ocultarResultados();
}

/**
 * Valida el formato del ID
 */
function validarId(id: string): boolean {
    const patron = /^[A-Za-z]{2}\d{4}[A-Za-z]{2}$/;
    return patron.test(id);
}

/**
 * Analiza el mineral del formulario
 */
function analizarMineral(): void {
    const id = (document.getElementById('inputId') as HTMLInputElement)?.value.trim();
    const nombre = (document.getElementById('inputNombre') as HTMLInputElement)?.value.trim();
    const grupo = (document.querySelector('input[name="grupo"]:checked') as HTMLInputElement)?.value as TipoRoca;
    const dureza = parseInt((document.getElementById('inputDureza') as HTMLInputElement)?.value);
    const tamanoCristales = parseFloat((document.getElementById('inputCristales') as HTMLInputElement)?.value);
    const tamanoGrano = (document.querySelector('input[name="tamanoGrano"]:checked') as HTMLInputElement)?.value as TamanoGrano;
    const clasificacion = (document.getElementById('inputClasificacion') as HTMLSelectElement)?.value as Clasificacion;
    const temperaturaFormacion = parseFloat((document.getElementById('inputTemperatura') as HTMLInputElement)?.value);
    const estructura = (document.getElementById('inputEstructura') as HTMLTextAreaElement)?.value.trim();
    const formaGranos = (document.getElementById('inputForma') as HTMLTextAreaElement)?.value.trim();
    const textura = (document.querySelector('input[name="textura"]:checked') as HTMLInputElement)?.value as Textura;

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
    const mineral: Mineral = {
        id, nombre, grupo, dureza, tamanoCristales, tamanoGrano,
        clasificacion, temperaturaFormacion, estructura, formaGranos, textura
    };

    // Analizar con la misión
    const resultado = mision.Analiza(mineral);
    mostrarResultado(resultado, mineral);
}

/**
 * Muestra el resultado del análisis
 */
function mostrarResultado(resultado: { valido: boolean; mensaje: string }, mineral: Mineral): void {
    const resultadoCard = document.getElementById('resultadoCard');
    const resultadoHeader = document.getElementById('resultadoHeader');
    const resultadoTitulo = document.getElementById('resultadoTitulo');
    const resultadoEmoji = document.getElementById('resultadoEmoji');
    const resultadoMensaje = document.getElementById('resultadoMensaje');

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
        const salidaCard = document.getElementById('salidaCard');
        const salidaContainer = document.getElementById('salidaContainer');
        if (salidaCard && salidaContainer) {
            salidaCard.style.display = 'block';
            salidaContainer.innerHTML = mision.muestra(mineral);
        }
    } else {
        resultadoHeader.className = 'card-header bg-danger text-white';
        resultadoTitulo.textContent = '✗ Mineral No Válido';
        resultadoEmoji.textContent = '😠';
        resultadoMensaje.textContent = resultado.mensaje;
        
        const salidaCard = document.getElementById('salidaCard');
        if (salidaCard) {
            salidaCard.style.display = 'none';
        }
    }
}

/**
 * Oculta los resultados
 */
function ocultarResultados(): void {
    const resultadoCard = document.getElementById('resultadoCard');
    const salidaCard = document.getElementById('salidaCard');
    
    if (resultadoCard) resultadoCard.style.display = 'none';
    if (salidaCard) salidaCard.style.display = 'none';
}

/**
 * Limpia el formulario
 */
function limpiarFormulario(): void {
    renderizarFormulario();
    ocultarResultados();
}

/**
 * Renderiza el formulario según el modo actual
 */
function renderizarFormulario(): void {
    const container = document.getElementById('formularioContainer');
    if (!container) return;

    const isExtendido = modoFormulario === "extendido";
    
    container.innerHTML = generarHTMLFormulario(isExtendido);

    // Configurar eventos del formulario
    document.getElementById('btnAnalizar')?.addEventListener('click', analizarMineral);
    document.getElementById('btnLimpiar')?.addEventListener('click', limpiarFormulario);
}

/**
 * Genera el HTML del formulario
 */
function generarHTMLFormulario(isExtendido: boolean): string {
    const labelId = isExtendido ? '<label class="form-label-extended">ID (LLDDDDLL)</label>' : '';
    const labelNombre = isExtendido ? '<label class="form-label-extended">Nombre</label>' : '';
    const labelDureza = isExtendido ? '<label class="form-label-extended">Dureza (Escala de Mohs, 1-10)</label>' : '';
    const labelCristales = isExtendido ? '<label class="form-label-extended">Tamaño de cristales (0-10)</label>' : '';
    const labelClasificacion = isExtendido ? '<label class="form-label-extended">Clasificación</label>' : '';
    const labelTemperatura = isExtendido ? '<label class="form-label-extended">Temperatura de formación (K)</label>' : '';
    const labelEstructura = isExtendido ? '<label class="form-label-extended">Estructura</label>' : '';
    const labelForma = isExtendido ? '<label class="form-label-extended">Forma de los granos</label>' : '';

    return `
        <div class="row">
            <div class="col-md-6 mb-3">
                ${labelId}
                <input type="text" class="form-control" id="inputId" maxlength="8" 
                       placeholder="${!isExtendido ? 'ID (formato LLDDDDLL) - Ej: AB1234CD' : 'Ej: AB1234CD'}" required>
                <div class="hint-text mt-1">2 letras, 4 números, 2 letras</div>
            </div>
            <div class="col-md-6 mb-3">
                ${labelNombre}
                <input type="text" class="form-control" id="inputNombre" 
                       placeholder="${!isExtendido ? 'Nombre del mineral' : ''}" required>
            </div>
        </div>

        <div class="mb-3">
            <label class="form-label-extended">Grupo / Origen</label>
            <div class="d-flex gap-3">
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="grupo" value="${TipoRoca.Ignea}" id="grupoIgnea">
                    <label class="form-check-label" for="grupoIgnea">${TipoRoca.Ignea}</label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="grupo" value="${TipoRoca.Metamorfica}" id="grupoMeta">
                    <label class="form-check-label" for="grupoMeta">${TipoRoca.Metamorfica}</label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="grupo" value="${TipoRoca.Sedimentaria}" id="grupoSedi">
                    <label class="form-check-label" for="grupoSedi">${TipoRoca.Sedimentaria}</label>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-md-6 mb-3">
                ${labelDureza}
                <input type="number" class="form-control" id="inputDureza" min="1" max="10" value="5"
                       placeholder="${!isExtendido ? 'Dureza (1-10)' : ''}" required>
            </div>
            <div class="col-md-6 mb-3">
                ${labelCristales}
                <input type="number" class="form-control" id="inputCristales" min="0" max="10" step="0.1" value="5"
                       placeholder="${!isExtendido ? 'Tamaño de cristales (0-10)' : ''}" required>
            </div>
        </div>

        <div class="mb-3">
            <label class="form-label-extended">Tamaño de grano</label>
            <div class="row">
                <div class="col-6 col-md-3">
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="tamanoGrano" value="${TamanoGrano.MuyGrueso}" id="granoMuyGrueso">
                        <label class="form-check-label small" for="granoMuyGrueso">${TamanoGrano.MuyGrueso}</label>
                    </div>
                </div>
                <div class="col-6 col-md-3">
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="tamanoGrano" value="${TamanoGrano.Grueso}" id="granoGrueso">
                        <label class="form-check-label small" for="granoGrueso">${TamanoGrano.Grueso}</label>
                    </div>
                </div>
                <div class="col-6 col-md-3">
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="tamanoGrano" value="${TamanoGrano.Medio}" id="granoMedio">
                        <label class="form-check-label small" for="granoMedio">${TamanoGrano.Medio}</label>
                    </div>
                </div>
                <div class="col-6 col-md-3">
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="tamanoGrano" value="${TamanoGrano.Fino}" id="granoFino">
                        <label class="form-check-label small" for="granoFino">${TamanoGrano.Fino}</label>
                    </div>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-md-6 mb-3">
                ${labelClasificacion}
                <select class="form-select" id="inputClasificacion" required>
                    <option value="">-- Seleccionar clasificación --</option>
                    <option value="${Clasificacion.Construccion}">Construcción</option>
                    <option value="${Clasificacion.Ornamental}">Ornamental</option>
                    <option value="${Clasificacion.Utensilios}">Utensilios</option>
                    <option value="${Clasificacion.Machacadas}">Piedras machacadas</option>
                </select>
            </div>
            <div class="col-md-6 mb-3">
                ${labelTemperatura}
                <input type="number" class="form-control" id="inputTemperatura" min="-100" max="100" step="0.1" value="0"
                       placeholder="${!isExtendido ? 'Temperatura (-100 a 100 K)' : ''}" required>
                <div class="hint-text mt-1">Rango: -100 a 100 K</div>
            </div>
        </div>

        <div class="mb-3">
            ${labelEstructura}
            <textarea class="form-control" id="inputEstructura" rows="2"
                      placeholder="${!isExtendido ? 'Estructura - Texto libre' : 'Texto libre sobre la estructura'}"></textarea>
        </div>

        <div class="mb-3">
            ${labelForma}
            <textarea class="form-control" id="inputForma" rows="2"
                      placeholder="${!isExtendido ? 'Forma de los granos - Texto libre' : 'Texto libre sobre la forma de los granos'}"></textarea>
        </div>

        <div class="mb-3">
            <label class="form-label-extended">Textura</label>
            <div class="d-flex gap-3">
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="textura" value="${Textura.Vitrea}" id="texturaVitrea">
                    <label class="form-check-label" for="texturaVitrea">${Textura.Vitrea}</label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="textura" value="${Textura.Afanitica}" id="texturaAfanitica">
                    <label class="form-check-label" for="texturaAfanitica">${Textura.Afanitica}</label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="textura" value="${Textura.Faneritica}" id="texturaFaneritica">
                    <label class="form-check-label" for="texturaFaneritica">${Textura.Faneritica}</label>
                </div>
            </div>
        </div>

        <div class="d-flex gap-2">
            <button type="button" class="btn btn-primary" id="btnAnalizar">Analizar Mineral</button>
            <button type="button" class="btn btn-secondary" id="btnLimpiar">Limpiar</button>
        </div>
    `;
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', inicializarApp);
