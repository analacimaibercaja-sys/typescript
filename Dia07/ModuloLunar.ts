

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

   esValida(): boolean;
}

interface ISistemaEntrada {
  capturar(): ICapturable;
  getNombre(): string;
}

interface ISistemaSalida {
  mostrar(mineral: ICapturable): void;
  getNombre(): string;
}

interface ICriterioValidacion {
  esValida(roca: ICapturable): boolean;
  getNombre(): string;
}

interface IPiloto {
  dameID(): string;
  dameNombre(): string;
  dameEdad(): number;
}

interface IMisionable {
  Analiza(roca: ICapturable): boolean;
}

class Mision implements IMisionable {
  Entrada: ISistemaEntrada;
  Salida: ISistemaSalida;
  Criterio: ICriterioValidacion;
  Piloto: IPiloto;

  constructor(entrada: ISistemaEntrada, salida: ISistemaSalida, criterio: ICriterioValidacion, piloto: IPiloto) {
    this.Entrada = entrada;
    this.Salida = salida;
    this.Criterio = criterio;
    this.Piloto = piloto;
  }
  Analiza(roca: ICapturable): boolean {
    return false; // Valor de ejemplo
  }
}







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

selVersion?.addEventListener('change', () => {
  const tipo = selVersion.value as 'extendida' | 'reducida';
  cambiarFormulario(tipo);
});

// Inicializa el formulario con la opción seleccionada
if (selVersion) {
  cambiarFormulario(selVersion.value as 'extendida' | 'reducida');
}