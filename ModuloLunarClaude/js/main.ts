// main.ts

import { Astronauta } from './astronauta.js';
import { ValidadorIgneas, ValidadorMetamorficas, ValidadorSedimentarias } from './validadores.js';
import { EntradaExtendida, EntradaReducida, FormatoEuropeo, FormatoAmericano } from './sistemas.js';
import { Mision } from './mision.js';
import { Mineral, TipoRoca, TamanoGrano, Textura, Clasificacion } from './types.js';
import { IValidable, ISalida, IEntrada } from './interfaces.js';

let astronauta: Astronauta;
let modoFormulario: string = "extendido";
let validadorActual: IValidable;
let sistemaEntrada: IEntrada;
let sistemaSalida: ISalida;
let mision: Mision;


function inicializarApp(): void {
    astronauta = new Astronauta("AL31639", "Agmunsen Lacima", 49);
    validadorActual = new ValidadorIgneas();
    sistemaEntrada = new EntradaExtendida();
    sistemaSalida = new FormatoEuropeo();
    mision = new Mision(sistemaEntrada, sistemaSalida, validadorActual, astronauta);

    mostrarInfoAstronauta();
    configurarEventos();
    renderizarFormulario();
}

function mostrarInfoAstronauta(): void {
    const elemento = document.getElementById('astronautaInfo');
    if (elemento) {
        elemento.textContent = 
            `${astronauta.dameNombreCompleto()} (${astronauta.dameIdentificador()}) - ${astronauta.dameEdad()} años`;
    }
}


function configurarEventos(): void {
    /***  Eventos de modo de formulario ***/
    const radiosModo = document.querySelectorAll<HTMLInputElement>('input[name="modoFormulario"]');
    for (const radio of Array.from(radiosModo)) {
        radio.addEventListener('change', (e: Event) => {
            const valor = (e.target as HTMLInputElement).value;
            cambiarModoFormulario(valor);
        });
    }

    /*** Eventos de formato de salida ***/
    const radiosFormato = document.querySelectorAll<HTMLInputElement>('input[name="formatoSalida"]');
    for (const radio of Array.from(radiosFormato)) {
        radio.addEventListener('change', (e: Event) => {
            const valor = (e.target as HTMLInputElement).value;
            cambiarFormatoSalida(valor);
        });
    }

    /*** Evento de cambio de criterio ***/
    document.getElementById('criterioSelect')?.addEventListener('change', (e) => {
        const select = e.target as HTMLSelectElement;
        cambiarCriterio(select.value);
    });
}

function cambiarModoFormulario(modo: string): void {
    modoFormulario = modo;
    sistemaEntrada = modo === 'extendido' ? new EntradaExtendida() : new EntradaReducida();
    mision.setEntrada(sistemaEntrada);

    renderizarFormulario();
}

function cambiarFormatoSalida(formato: string): void {
    sistemaSalida = formato === 'europeo' ? new FormatoEuropeo() : new FormatoAmericano();
    mision.setSalida(sistemaSalida);
}

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

    ocultarResultados();
}

function validarId(id: string): boolean {
    const patron = /^[A-Za-z]{2}\d{4}[A-Za-z]{2}$/;
    return patron.test(id);
}

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

    const mineral: Mineral = {
        id, nombre, grupo, dureza, tamanoCristales, tamanoGrano,
        clasificacion, temperaturaFormacion, estructura, formaGranos, textura
    };

    const resultado = mision.Analiza(mineral);
    mostrarResultado(resultado, mineral);
}

function mostrarResultado(resultado: { valido: boolean; mensaje: string }, mineral: Mineral): void {
    const resultadoCard = document.getElementById('resultadoCard');
    const resultadoHeader = document.getElementById('resultadoHeader');
    const resultadoTitulo = document.getElementById('resultadoTitulo');
    const resultadoEmoji = document.getElementById('resultadoEmoji');
    const resultadoMensaje = document.getElementById('resultadoMensaje');
    const formularioContainer = document.getElementById('formularioContainer');

    if (!resultadoCard || !resultadoHeader || !resultadoTitulo || !resultadoEmoji || !resultadoMensaje || !formularioContainer) {
        return;
    }

    resultadoCard.style.display = 'block';

    if (resultado.valido) {
        resultadoHeader.className = 'card-header bg-success text-white';
        resultadoTitulo.textContent = '✓ Mineral válido';
        resultadoEmoji.textContent = '😊';
        resultadoMensaje.textContent = resultado.mensaje;

        // Mostrar salida formateada (europea o americanoa
        const salidaCard = document.getElementById('salidaCard');
        const salidaContainer = document.getElementById('salidaContainer');
        if (salidaCard && salidaContainer) {
            salidaCard.style.display = 'block';
            salidaContainer.innerHTML = mision.muestra(mineral);

            // Mover la card de salida entre resultado y formulario
            const formularioCard = formularioContainer.closest('.card');
            if (formularioCard && formularioCard.parentNode) {
                formularioCard.parentNode.insertBefore(salidaCard, formularioCard);
            }
        }
    } else {
        resultadoHeader.className = 'card-header bg-danger text-white';
        resultadoTitulo.textContent = '✗ Mineral no válido';
        resultadoEmoji.textContent = '😞';
        resultadoMensaje.textContent = resultado.mensaje;
        
        // Si el mineral no es válido no mostramos la tarjeta de salida
        const salidaCard = document.getElementById('salidaCard');
        if (salidaCard) {
            salidaCard.style.display = 'none';
        }
    }
    // Hacer scroll suave al resultado
    setTimeout(() => {
        resultadoCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
}

function ocultarResultados(): void {
    const resultadoCard = document.getElementById('resultadoCard');
    const salidaCard = document.getElementById('salidaCard');
    
    if (resultadoCard) resultadoCard.style.display = 'none';
    if (salidaCard) salidaCard.style.display = 'none';
}

function limpiarFormulario(): void {
    renderizarFormulario();
    ocultarResultados();

        // Devolver la card de salida a su posición original (al final)
    const salidaCard = document.getElementById('salidaCard');
    const contenedorPrincipal = salidaCard?.parentNode;
    if (salidaCard && contenedorPrincipal) {
        contenedorPrincipal.appendChild(salidaCard);
    }
}

function renderizarFormulario(): void {
    const container = document.getElementById('formularioContainer');
    if (!container) return;

    const isExtendido = modoFormulario === "extendido";
    
    container.innerHTML = generarHTMLFormulario(isExtendido);

    document.getElementById('btnAnalizar')?.addEventListener('click', analizarMineral);
    document.getElementById('btnLimpiar')?.addEventListener('click', limpiarFormulario);
}

function generarHTMLFormulario(isExtendido: boolean): string {
    const labelId = isExtendido ? '<label class="form-label fw-semibold" for="inputId">ID (LLDDDDLL)</label>' : '';
    const labelNombre = isExtendido ? '<label class="form-label fw-semibold" for="inputNombre">Nombre</label>' : '';
    const labelDureza = isExtendido ? '<label class="form-label fw-semibold" for="inputDureza">Dureza (1-10)</label>' : '';
    const labelCristales = isExtendido ? '<label class="form-label fw-semibold" for="inputCristales">Tamaño de cristales (0-10)</label>' : '';
    const labelClasificacion = isExtendido ? '<label class="form-label fw-semibold" for="inputClasificacion">Clasificación</label>' : '';
    const labelTemperatura = isExtendido ? '<label class="form-label fw-semibold" for="inputTemperatura">Temperatura de formación (K)</label>' : '';
    const labelEstructura = isExtendido ? '<label class="form-label fw-semibold" for="inputEstructura">Estructura</label>' : '';
    const labelForma = isExtendido ? '<label class="form-label fw-semibold" for="inputForma">Forma de los granos</label>' : '';

    return `
        <div class="row">
            <div class="col-md-6 mb-3">
                ${labelId}
                <input type="text" class="form-control" id="inputId" maxlength="8" name="inputId"
                       placeholder="${!isExtendido ? 'ID (formato LLDDDDLL) - Ej: AB1234CD' : 'Ej: AB1234CD'}" required>
            </div>
            <div class="col-md-6 mb-3">
                ${labelNombre}
                <input type="text" class="form-control" id="inputNombre" name="inputNombre" 
                       placeholder="${!isExtendido ? 'Nombre del mineral' : ''}" required>
            </div>
        </div>

        <fieldset class="mb-3">
            <legend class="form-label fw-semibold">Grupo / Origen</legend>
            <div class="d-flex gap-3 flex-wrap">
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="grupo" value="${TipoRoca.Ignea}" id="grupoIgnea" required>
                    <label class="form-check-label" for="grupoIgnea">${TipoRoca.Ignea}</label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="grupo" value="${TipoRoca.Metamorfica}" id="grupoMeta" required>
                    <label class="form-check-label" for="grupoMeta">${TipoRoca.Metamorfica}</label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="grupo" value="${TipoRoca.Sedimentaria}" id="grupoSedi" required>
                    <label class="form-check-label" for="grupoSedi">${TipoRoca.Sedimentaria}</label>
                </div>
            </div>
        </fieldset>

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

        <fieldset class="mb-3">
            <legend class="form-label fw-semibold">Tamaño de grano</legend>
            <div class="row">
                <div class="col-6 col-md-3">
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="tamanoGrano" value="${TamanoGrano.MuyGrueso}" id="granoMuyGrueso" required>
                        <label class="form-check-label small" for="granoMuyGrueso">${TamanoGrano.MuyGrueso}</label>
                    </div>
                </div>
                <div class="col-6 col-md-3">
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="tamanoGrano" value="${TamanoGrano.Grueso}" id="granoGrueso" required>
                        <label class="form-check-label small" for="granoGrueso">${TamanoGrano.Grueso}</label>
                    </div>
                </div>
                <div class="col-6 col-md-3">
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="tamanoGrano" value="${TamanoGrano.Medio}" id="granoMedio" required>
                        <label class="form-check-label small" for="granoMedio">${TamanoGrano.Medio}</label>
                    </div>
                </div>
                <div class="col-6 col-md-3">
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="tamanoGrano" value="${TamanoGrano.Fino}" id="granoFino" required>
                        <label class="form-check-label small" for="granoFino">${TamanoGrano.Fino}</label>
                    </div>
                </div>
            </div>
        </fieldset>

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
                <div class="form-text">Rango: -100 a 100 K</div>
            </div>
        </div>

        <div class="mb-3">
            ${labelEstructura}
            <textarea class="form-control" id="inputEstructura" rows="2"
                      placeholder="${!isExtendido ? 'Estructura - Texto libre' : 'Texto libre sobre la estructura'}" required></textarea>
        </div>

        <div class="mb-3">
            ${labelForma}
            <textarea class="form-control" id="inputForma" rows="2"
                      placeholder="${!isExtendido ? 'Forma de los granos - Texto libre' : 'Texto libre sobre la forma de los granos'}" required></textarea>
        </div>

        <fieldset class="mb-3">
            <legend class="form-label fw-semibold">Textura</legend>
            <div class="d-flex gap-3 flex-wrap">
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="textura" value="${Textura.Vitrea}" id="texturaVitrea" required>
                    <label class="form-check-label" for="texturaVitrea">${Textura.Vitrea}</label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="textura" value="${Textura.Afanitica}" id="texturaAfanitica" required>
                    <label class="form-check-label" for="texturaAfanitica">${Textura.Afanitica}</label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="textura" value="${Textura.Faneritica}" id="texturaFaneritica" required>
                    <label class="form-check-label" for="texturaFaneritica">${Textura.Faneritica}</label>
                </div>
            </div>
        </fieldset>

        <div class="d-flex gap-2">
            <button type="button" class="btn btn-primary flex-fill" id="btnAnalizar">Analizar Mineral</button>
            <button type="button" class="btn btn-outline-secondary" id="btnLimpiar">Limpiar</button>
        </div>
    `;
}
// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', inicializarApp);
