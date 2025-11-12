// Selecciona el botón y el input del formulario
var boton = document.getElementById('btnSaludar');
var nombreInput = document.getElementById('nombre');
// Agrega un evento 'click' al botón
boton === null || boton === void 0 ? void 0 : boton.addEventListener('click', function () {
    // Obtiene el valor del input
    var nombre = nombreInput === null || nombreInput === void 0 ? void 0 : nombreInput.value;
    if (nombre) {
        alert("\u00A1Hola, ".concat(nombre, "!"));
    }
    else {
        alert('Por favor, introduce tu nombre.');
    }
});
