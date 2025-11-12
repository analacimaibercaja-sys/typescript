/*
class Mineral{
    id: string;
    nombre: string;
    grupo: string;
    dureza: number;
    TamanioGrano: number;
    clasificacion: string;
    tamanioCristal: number;
    temperaturaFormacion:number;
    estructura: string;
    formaGranos: string;
    textura: string;
}*/
/*
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
*/

// ejecución al cambiar el select
const selVersion = document.getElementById('selVersion') as HTMLSelectElement;

function cambiarFormulario(tipo: 'extendida' | 'reducida') {
  const extendida = document.getElementById('frmExtendida');
  const reducida = document.getElementById('frmReducida');
  
  if (tipo === 'extendida') {
    extendida.style.display = 'block';
    reducida.style.display = 'none';
  } else {
    extendida.style.display = 'none';
    reducida.style.display = 'block';
  }
}