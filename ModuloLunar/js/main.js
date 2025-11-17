// main.ts
import { Astronauta } from "./astronauta.js";
import { ValidadorIgneas, ValidadorMetamorficas, ValidadorSedimentarias, } from "./validadores.js";
import { EntradaExtendida, EntradaReducida, FormatoEuropeo, FormatoAmericano, } from "./sistemas.js";
import { Mision } from "./mision.js";
import { TipoRoca, TamanoGrano, Textura, Clasificacion, } from "./types.js";
let astronauta;
let modoFormulario = "extendido";
let validadorActual;
let sistemaEntrada;
let sistemaSalida;
let mision;
export function capitalize(text) {
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}
function inicializarApp() {
    astronauta = new Astronauta("AH31639", "Agmunsen Haakon", 41);
    validadorActual = new ValidadorIgneas();
    sistemaEntrada = new EntradaExtendida();
    sistemaSalida = new FormatoEuropeo();
    mision = new Mision(sistemaEntrada, sistemaSalida, validadorActual, astronauta);
    mostrarInfoAstronauta();
    configurarEventos();
    renderizarFormulario();
}
function mostrarInfoAstronauta() {
    const elemento = document.getElementById("astronautaInfo");
    if (elemento) {
        elemento.textContent = `${astronauta.dameNombreCompleto()} (${astronauta.dameIdentificador()}) - ${astronauta.dameEdad()} años`;
    }
}
function configurarEventos() {
    /***  Eventos de modo de formulario ***/
    const radiosModo = document.querySelectorAll('input[name="modoFormulario"]');
    for (const radio of Array.from(radiosModo)) {
        radio.addEventListener("change", (e) => {
            const valor = e.target.value;
            cambiarModoFormulario(valor);
        });
    }
    /*** Eventos de formato de salida ***/
    const radiosFormato = document.querySelectorAll('input[name="formatoSalida"]');
    for (const radio of Array.from(radiosFormato)) {
        radio.addEventListener("change", (e) => {
            const valor = e.target.value;
            cambiarFormatoSalida(valor);
        });
    }
    /*** Evento de cambio de criterio ***/
    document.getElementById("criterioSelect")?.addEventListener("change", (e) => {
        const select = e.target;
        cambiarCriterio(select.value);
    });
}
function cambiarModoFormulario(modo) {
    modoFormulario = modo;
    sistemaEntrada =
        modo === "extendido" ? new EntradaExtendida() : new EntradaReducida();
    mision.setEntrada(sistemaEntrada);
    renderizarFormulario();
}
function cambiarFormatoSalida(formato) {
    sistemaSalida =
        formato === "europeo" ? new FormatoEuropeo() : new FormatoAmericano();
    mision.setSalida(sistemaSalida);
}
function cambiarCriterio(tipo) {
    switch (tipo) {
        case "igneas":
            validadorActual = new ValidadorIgneas();
            break;
        case "metamorficas":
            validadorActual = new ValidadorMetamorficas();
            break;
        case "sedimentarias":
            validadorActual = new ValidadorSedimentarias();
            break;
    }
    mision.setCriterio(validadorActual);
    ocultarResultados();
}
function validarId(id) {
    const patron = /^[A-Za-z]{2}\d{4}[A-Za-z]{2}$/;
    return patron.test(id);
}
function analizarMineral() {
    limpiarValidaciones();
    const datosFormulario = obtenerDatosFormulario();
    if (!validarDatosFormulario(datosFormulario)) {
        alert("Por favor, complete todos los campos obligatorios");
        return;
    }
    if (!validarId(datosFormulario.id)) {
        marcarCampoInvalido("inputId");
        alert("El ID debe tener el formato LLDDDDLL (2 letras, 4 números, 2 letras)");
        return;
    }
    const mineral = crearMineral(datosFormulario);
    const resultado = mision.Analiza(mineral);
    mostrarResultado(resultado, mineral);
}
function obtenerDatosFormulario() {
    return {
        id: document.getElementById("inputId")?.value.trim(),
        nombre: document.getElementById("inputNombre")?.value.trim(),
        grupo: document.querySelector('input[name="grupo"]:checked')?.value,
        dureza: Number.parseInt(document.getElementById("inputDureza")?.value),
        tamanoCristales: Number.parseFloat(document.getElementById("inputCristales")?.value),
        tamanoGrano: document.querySelector('input[name="tamanoGrano"]:checked')?.value,
        clasificacion: document.getElementById("inputClasificacion")?.value,
        temperaturaFormacion: Number.parseFloat(document.getElementById("inputTemperatura")?.value),
        estructura: document.getElementById("inputEstructura")?.value.trim(),
        formaGranos: document.getElementById("inputForma")?.value.trim(),
        textura: document.querySelector('input[name="textura"]:checked')?.value,
    };
}
function validarDatosFormulario(datos) {
    let esValido = true;
    if (!datos.id) {
        marcarCampoInvalido("inputId");
        esValido = false;
    }
    if (!datos.nombre) {
        marcarCampoInvalido("inputNombre");
        esValido = false;
    }
    if (!datos.grupo) {
        marcarGrupoRadioInvalido("grupo");
        esValido = false;
    }
    if (!datos.tamanoGrano) {
        marcarGrupoRadioInvalido("tamanoGrano");
        esValido = false;
    }
    if (!datos.clasificacion) {
        marcarCampoInvalido("inputClasificacion");
        esValido = false;
    }
    if (!datos.estructura) {
        marcarCampoInvalido("inputEstructura");
        esValido = false;
    }
    if (!datos.formaGranos) {
        marcarCampoInvalido("inputForma");
        esValido = false;
    }
    if (!datos.textura) {
        marcarGrupoRadioInvalido("textura");
        esValido = false;
    }
    return esValido;
}
function crearMineral(datos) {
    return {
        id: datos.id,
        nombre: datos.nombre,
        grupo: datos.grupo,
        dureza: datos.dureza,
        tamanoCristales: datos.tamanoCristales,
        tamanoGrano: datos.tamanoGrano,
        clasificacion: datos.clasificacion,
        temperaturaFormacion: datos.temperaturaFormacion,
        estructura: datos.estructura,
        formaGranos: datos.formaGranos,
        textura: datos.textura,
    };
}
function mostrarResultado(resultado, mineral) {
    const resultadoCard = document.getElementById("resultadoCard");
    const resultadoHeader = document.getElementById("resultadoHeader");
    const resultadoTitulo = document.getElementById("resultadoTitulo");
    const resultadoEmoji = document.getElementById("resultadoEmoji");
    const resultadoMensaje = document.getElementById("resultadoMensaje");
    if (!resultadoCard ||
        !resultadoHeader ||
        !resultadoTitulo ||
        !resultadoEmoji ||
        !resultadoMensaje) {
        return;
    }
    resultadoCard.style.display = "block";
    if (resultado.valido) {
        resultadoHeader.className = "card-header bg-success text-white";
        resultadoTitulo.textContent = "✓ Mineral válido";
        resultadoEmoji.textContent = "😊";
        resultadoMensaje.textContent = resultado.mensaje;
        // Mostrar tabla de datos
        const salidaCard = document.getElementById("salidaCard");
        const salidaContainer = document.getElementById("salidaContainer");
        if (salidaCard && salidaContainer) {
            salidaCard.style.display = "block";
            salidaContainer.innerHTML = mision.muestra(mineral);
            addRoca();
        }
    }
    else {
        resultadoHeader.className = "card-header bg-danger text-white";
        resultadoTitulo.textContent = "✗ Mineral no válido";
        resultadoEmoji.textContent = "😞";
        resultadoMensaje.textContent = resultado.mensaje;
        // Ocultar tabla si no es válido
        const salidaCard = document.getElementById("salidaCard");
        if (salidaCard) {
            salidaCard.style.display = "none";
        }
    }
    // Scroll al resultado
    setTimeout(() => {
        resultadoCard.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
}
function addRoca() {
    const rocaId = document.querySelector('#inputId');
    const rocaNombre = document.querySelector('#inputNombre');
    const rocaGrupo = document.querySelector('input[name="grupo"]:checked');
    const rocaDureza = document.querySelector('#inputDureza');
    const rocaCristales = document.querySelector('#inputCristales');
    const rocaTamanoGrano = document.querySelector('input[name="tamanoGrano"]:checked');
    const rocaClasificacion = document.querySelector('#inputClasificacion');
    const rocaTemperatura = document.querySelector('#inputTemperatura');
    const rocaEstructura = document.querySelector('#inputEstructura');
    const rocaForma = document.querySelector('#inputForma');
    const rocaTextura = document.querySelector('input[name="textura"]:checked');
    // Verificar que los elementos existen
    if (!rocaId || !rocaNombre) {
        console.error('No se encontraron los elementos del formulario');
        return;
    }
    const nuevaRoca = {
        identificador: rocaId.value,
        nombre: rocaNombre.value,
        grupo: rocaGrupo.value,
        dureza: rocaDureza.value,
        tamanoCristales: rocaCristales.value,
        tamanoGrano: rocaTamanoGrano.value,
        clasificacion: rocaClasificacion.value,
        temperaturaFormacion: rocaTemperatura.value,
        estructura: rocaEstructura.value,
        formaGranos: rocaForma.value,
        textura: rocaTextura.value
    };
    const transaction = db.transaction(['rocas_db'], 'readwrite');
    const objectStore = transaction.objectStore('rocas_db');
    const query = objectStore.add(nuevaRoca);
    query.addEventListener('success', () => {
        rocaId.value = '';
        rocaNombre.value = '';
        rocaGrupo.value = '';
        rocaDureza.value = '';
        rocaCristales.value = '';
        rocaTamanoGrano.value = '';
        rocaClasificacion.value = '';
        rocaTemperatura.value = '';
        rocaEstructura.value = '';
        rocaForma.value = '';
        rocaTextura.value = '';
    });
    transaction.addEventListener('error', () => console.log('Transaction error'));
}
function ocultarResultados() {
    const resultadoCard = document.getElementById("resultadoCard");
    const salidaCard = document.getElementById("salidaCard");
    if (resultadoCard)
        resultadoCard.style.display = "none";
    if (salidaCard)
        salidaCard.style.display = "none";
}
function limpiarFormulario() {
    renderizarFormulario();
    ocultarResultados();
    window.scrollTo({ top: 0, behavior: "smooth" });
}
function renderizarFormulario() {
    const container = document.getElementById("formularioContainer");
    if (!container)
        return;
    const isExtendido = modoFormulario === "extendido";
    container.innerHTML = generarHTMLFormulario(isExtendido);
    document
        .getElementById("btnAnalizar")
        ?.addEventListener("click", analizarMineral);
    document
        .getElementById("btnLimpiar")
        ?.addEventListener("click", limpiarFormulario);
}
function generarHTMLFormulario(isExtendido) {
    const capitalize = (text) => {
        return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
    };
    const labelId = isExtendido
        ? '<label class="form-label fw-semibold" for="inputId">ID (LLDDDDLL)</label>'
        : "";
    const labelNombre = isExtendido
        ? '<label class="form-label fw-semibold" for="inputNombre">Nombre</label>'
        : "";
    const labelDureza = isExtendido
        ? '<label class="form-label fw-semibold" for="inputDureza">Dureza (1-10)</label>'
        : "";
    const labelCristales = isExtendido
        ? '<label class="form-label fw-semibold" for="inputCristales">Tamaño de cristales (0-10)</label>'
        : "";
    const labelClasificacion = isExtendido
        ? '<label class="form-label fw-semibold" for="inputClasificacion">Clasificación</label>'
        : "";
    const labelTemperatura = isExtendido
        ? '<label class="form-label fw-semibold" for="inputTemperatura">Temperatura de formación (K)</label>'
        : "";
    const labelEstructura = isExtendido
        ? '<label class="form-label fw-semibold" for="inputEstructura">Estructura</label>'
        : "";
    const labelForma = isExtendido
        ? '<label class="form-label fw-semibold" for="inputForma">Forma de los granos</label>'
        : "";
    // Placeholders para modo reducido
    const placeholderId = isExtendido
        ? "Ej: AB1234CD"
        : "ID (formato LLDDDDLL) - Ej: AB1234CD";
    const placeholderNombre = isExtendido ? "" : "Nombre del mineral";
    const placeholderDureza = isExtendido ? "" : "Dureza (1-10)";
    const placeholderCristales = isExtendido ? "" : "Tamaño de cristales (0-10)";
    const placeholderTemperatura = isExtendido
        ? ""
        : "Temperatura (-100 a 100 K)";
    const placeholderEstructura = isExtendido ? "" : "Estructura de la roca";
    const placeholderForma = isExtendido ? "" : "Forma de los granos";
    return `
        <div class="row">
            <div class="col-md-6 mb-3">
                ${labelId}
                <input type="text" class="form-control" id="inputId" maxlength="8" name="inputId"
                       placeholder="${placeholderId}" required>
            </div>
            <div class="col-md-6 mb-3">
                ${labelNombre}
                <input type="text" class="form-control" id="inputNombre" name="inputNombre" 
                       placeholder="${placeholderNombre}" required>
            </div>
        </div>

        <fieldset class="mb-3">
            <legend class="form-label fw-semibold">Grupo / Origen</legend>
            <div class="d-flex gap-3 flex-wrap">
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="grupo" value="${TipoRoca.Ignea}" id="grupoIgnea" required>
                    <label class="form-check-label" for="grupoIgnea">${capitalize(TipoRoca.Ignea)}</label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="grupo" value="${TipoRoca.Metamorfica}" id="grupoMeta" required>
                    <label class="form-check-label" for="grupoMeta">${capitalize(TipoRoca.Metamorfica)}</label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="grupo" value="${TipoRoca.Sedimentaria}" id="grupoSedi" required>
                    <label class="form-check-label" for="grupoSedi">${capitalize(TipoRoca.Sedimentaria)}</label>
                </div>
            </div>
        </fieldset>

        <div class="row">
            <div class="col-md-6 mb-3">
                ${labelDureza}
                <input type="number" class="form-control" id="inputDureza" min="1" max="10" value="5"
                       placeholder="${placeholderDureza}" required>
            </div>
            <div class="col-md-6 mb-3">
                ${labelCristales}
                <input type="number" class="form-control" id="inputCristales" min="0" max="10" step="0.1" value="5"
                       placeholder="${placeholderCristales}" required>
            </div>
        </div>

        <fieldset class="mb-3">
            <legend class="form-label fw-semibold">Tamaño de grano</legend>
            <div class="row">
                <div class="col-6 col-md-3">
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="tamanoGrano" value="${TamanoGrano.MuyGrueso}" id="granoMuyGrueso" required>
                        <label class="form-check-label small" for="granoMuyGrueso">${capitalize(TamanoGrano.MuyGrueso)}</label>
                    </div>
                </div>
                <div class="col-6 col-md-3">
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="tamanoGrano" value="${TamanoGrano.Grueso}" id="granoGrueso" required>
                        <label class="form-check-label small" for="granoGrueso">${capitalize(TamanoGrano.Grueso)}</label>
                    </div>
                </div>
                <div class="col-6 col-md-3">
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="tamanoGrano" value="${TamanoGrano.Medio}" id="granoMedio" required>
                        <label class="form-check-label small" for="granoMedio">${capitalize(TamanoGrano.Medio)}</label>
                    </div>
                </div>
                <div class="col-6 col-md-3">
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="tamanoGrano" value="${TamanoGrano.Fino}" id="granoFino" required>
                        <label class="form-check-label small" for="granoFino">${capitalize(TamanoGrano.Fino)}</label>
                    </div>
                </div>
            </div>
        </fieldset>

        <div class="row">
            <div class="col-md-6 mb-3">
                ${labelClasificacion}
                <select class="form-select" id="inputClasificacion" required>
                    <option value="">-- Seleccionar clasificación --</option>
                    <option value="${Clasificacion.Construccion}">${capitalize(Clasificacion.Construccion)}</option>
                    <option value="${Clasificacion.Ornamental}">${capitalize(Clasificacion.Ornamental)}</option>
                    <option value="${Clasificacion.Utensilios}">${capitalize(Clasificacion.Utensilios)}</option>
                    <option value="${Clasificacion.Machacadas}">${capitalize(Clasificacion.Machacadas)}</option>
                </select>
            </div>
            <div class="col-md-6 mb-3">
                ${labelTemperatura}
                <input type="number" class="form-control" id="inputTemperatura" min="-100" max="100" step="0.1" value="0"
                       placeholder="${placeholderTemperatura}" required>
                <div class="form-text">Rango: -100 a 100 K</div>
            </div>
        </div>

        <div class="mb-3">
            ${labelEstructura}
            <textarea class="form-control" id="inputEstructura" rows="2"
                      placeholder="${placeholderEstructura}" required></textarea>
        </div>

        <div class="mb-3">
            ${labelForma}
            <textarea class="form-control" id="inputForma" rows="2"
                      placeholder="${placeholderForma}" required></textarea>
        </div>

        <fieldset class="mb-3">
            <legend class="form-label fw-semibold">Textura</legend>
            <div class="d-flex gap-3 flex-wrap">
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="textura" value="${Textura.Vitrea}" id="texturaVitrea" required>
                    <label class="form-check-label" for="texturaVitrea">${capitalize(Textura.Vitrea)}</label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="textura" value="${Textura.Afanitica}" id="texturaAfanitica" required>
                    <label class="form-check-label" for="texturaAfanitica">${capitalize(Textura.Afanitica)}</label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="textura" value="${Textura.Faneritica}" id="texturaFaneritica" required>
                    <label class="form-check-label" for="texturaFaneritica">${capitalize(Textura.Faneritica)}</label>
                </div>
            </div>
        </fieldset>

        <div class="d-flex gap-2">
            <button type="button" class="btn btn-primary flex-fill" id="btnAnalizar">Analizar Mineral</button>
            <button type="button" class="btn btn-outline-secondary" id="btnLimpiar">Limpiar</button>
        </div>
    `;
}
function marcarCampoInvalido(idCampo) {
    document.getElementById(idCampo)?.classList.add("campo-invalido");
}
function marcarGrupoRadioInvalido(nombreGrupo) {
    document
        .querySelector(`input[name="${nombreGrupo}"]`)
        ?.closest("fieldset")
        ?.classList.add("fieldset-invalido");
}
function limpiarValidaciones() {
    for (const el of Array.from(document.querySelectorAll('.campo-invalido, .fieldset-invalido'))) {
        el.classList.remove('campo-invalido', 'fieldset-invalido');
    }
}
document.addEventListener("DOMContentLoaded", inicializarApp);
//# sourceMappingURL=main.js.map