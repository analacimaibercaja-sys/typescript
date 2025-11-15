// sistemas.ts
// Implementación de sistemas de entrada y salida de datos
import { capitalize } from './main.js';
// ==================== SISTEMAS DE ENTRADA ====================
export class EntradaExtendida {
    muestra() {
        return "extendido";
    }
}
export class EntradaReducida {
    muestra() {
        return "reducido";
    }
}
// ==================== SISTEMAS DE SALIDA ====================
export class FormatoEuropeo {
    mostrar(mineral) {
        const tempC = (mineral.temperaturaFormacion - 273.15).toFixed(2);
        return `
            <div class="row">
                <div class="col-md-6">
                    <h6 class="fw-bold text-primary">Información del Mineral</h6>
                    <table class="table table-sm">
                        <tbody>
                            <tr><td class="fw-bold">ID:</td><td>${mineral.id}</td></tr>
                            <tr><td class="fw-bold">Nombre:</td><td>${capitalize(mineral.nombre)}</td></tr>
                            <tr><td class="fw-bold">Grupo:</td><td>${capitalize(mineral.grupo)}</td></tr>
                            <tr><td class="fw-bold">Dureza:</td><td>${mineral.dureza} (Mohs)</td></tr>
                            <tr><td class="fw-bold">Tamaño de grano:</td><td>${capitalize(mineral.tamanoGrano)}</td></tr>
                            <tr><td class="fw-bold">Textura:</td><td>${capitalize(mineral.textura)}</td></tr>
                        </tbody>
                    </table>
                </div>
                <div class="col-md-6">
                    <h6 class="fw-bold text-primary">Detalles Adicionales</h6>
                    <table class="table table-sm">
                        <tbody>
                            <tr><td class="fw-bold">Clasificación:</td><td>${capitalize(mineral.clasificacion)}</td></tr>
                            <tr><td class="fw-bold">Tamaño cristales:</td><td>${mineral.tamanoCristales}</td></tr>
                            <tr><td class="fw-bold">Temperatura:</td><td>${tempC} °C</td></tr>
                            <tr><td class="fw-bold">Estructura:</td><td>${mineral.estructura ? capitalize(mineral.estructura) : 'N/A'}</td></tr>
                            <tr><td class="fw-bold">Forma granos:</td><td>${mineral.formaGranos ? capitalize(mineral.formaGranos) : 'N/A'}</td></tr>
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    }
}
export class FormatoAmericano {
    mostrar(mineral) {
        const tempF = (((mineral.temperaturaFormacion - 273.15) * 9 / 5) + 32).toFixed(2);
        return `
            <div class="row">
                <div class="col-md-6">
                    <h6 class="fw-bold text-primary">Mineral Information</h6>
                    <table class="table table-sm">
                        <tbody>
                            <tr><td class="fw-bold">ID:</td><td>${mineral.id}</td></tr>
                            <tr><td class="fw-bold">Name:</td><td>${capitalize(mineral.nombre)}</td></tr>
                            <tr><td class="fw-bold">Group:</td><td>${capitalize(mineral.grupo)}</td></tr>
                            <tr><td class="fw-bold">Hardness:</td><td>${mineral.dureza}</td></tr>
                            <tr><td class="fw-bold">Grain Size:</td><td>${capitalize(mineral.tamanoGrano)}</td></tr>
                            <tr><td class="fw-bold">Texture:</td><td>${capitalize(mineral.textura)}</td></tr>
                        </tbody>
                    </table>
                </div>
                <div class="col-md-6">
                    <h6 class="fw-bold text-primary">Additional Details</h6>
                    <table class="table table-sm">
                        <tbody>
                            <tr><td class="fw-bold">Classification:</td><td>${capitalize(mineral.clasificacion)}</td></tr>
                            <tr><td class="fw-bold">Crystal Size:</td><td>${mineral.tamanoCristales}</td></tr>
                            <tr><td class="fw-bold">Temperature:</td><td>${tempF} °F</td></tr>
                            <tr><td class="fw-bold">Structure:</td><td>${mineral.estructura ? capitalize(mineral.estructura) : 'N/A'}</td></tr>
                            <tr><td class="fw-bold">Grain Shape:</td><td>${mineral.formaGranos ? capitalize(mineral.formaGranos) : 'N/A'}</td></tr>
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    }
}
//# sourceMappingURL=sistemas.js.map