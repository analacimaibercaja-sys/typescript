// Selecciona el botón y el input del formulario
const boton = document.getElementById('btnSaludar') as HTMLButtonElement;
const nombreInput = document.getElementById('nombre') as HTMLInputElement;

// Agrega un evento 'click' al botón
boton?.addEventListener('click', () => {
    // Obtiene el valor del input
    const nombre = nombreInput?.value;
    if (nombre) {
        alert(`¡Hola, ${nombre}!`);
    } else {
        alert('Por favor, introduce tu nombre.');
    }
});