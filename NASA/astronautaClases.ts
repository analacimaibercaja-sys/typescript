// Untitled-7.ts
// Implementación en TypeScript de las clases e interfaces solicitadas.
// Dependencias inyectadas en el constructor de Mision.
export enum TipoRoca
{
    Ignea,
    Metamórfica,
    Sedimentaria
}
export enum TipoGrano
{
    GranoMuyGrueso,
    GranoGrueso,
    GranoMedio,
    GranoFino
}
export enum TipoTextura
{
    Vitrea,
    Afanilitica,
    Fanerítica
}

export class Dureza
{
    private readonly dureza : number;
    constructor(dureza:number)
    {
        if (dureza > 0 && dureza < 11)
        {
            this.dureza = dureza;
        }
        else
        {
            throw new Error("La dureza tiene que estar entre 1 y 10");
        }
    }
    getDureza():number
    {
        return this.dureza;
    }
}
export interface ICapturable {
    nombre: string;
    tipo: TipoRoca; // e.g. "Ígnea", "Metamórfica", "Sedimentaria"
    dureza: Dureza; // escala de Mohs
    textura: TipoTextura; 
    // Valida usando un criterio o un predicado directo
}

export class Mineral implements ICapturable {
    constructor(
        public nombre: string,
        public tipo: TipoRoca,
        public dureza: Dureza,
        public textura: TipoTextura,
    ) {}
}

/* Sistema de Entrada */
export interface ISistemaEntrada {
    // Devuelve una lista de capturables (p. ej. minerales) a analizar
    muestra(): string;
    leer(): ICapturable;
}

export class IntroduccionReducido implements ISistemaEntrada {
    muestra(): string
    {
        return "muestraReducido";
    }
    leer(): ICapturable
    {
        // implementación reducida: devuelve la lista tal cual
        return new Mineral("Topacio",TipoRoca.Ignea,new Dureza(8),TipoTextura.Vitrea);;
    }
}

export class IntroduccionExtendido implements ISistemaEntrada {
    constructor(private fuente: () => ICapturable[] = () => []) {}
    muestra():string
    {
        return "muestra Extendido";
    }
    leer(): ICapturable{
        return new Mineral("Topacio",TipoRoca.Ignea,new Dureza(8),TipoTextura.Vitrea);;
    }
}

/* Sistema de Salida */
export interface ISistemaSalida {
    // Formatea la salida de una colección de capturables
    mostrar(mision: Imisionable): string;
}

export class FormatoAmericano implements ISistemaSalida {
    mostrar(mision: Imisionable): string
    {
        return ("American "+mision);
    }
}

export class FormatoEuropeo implements ISistemaSalida {
    mostrar(mision: Imisionable): string
    {
        return ("European "+mision);
    }    
}

/* Criterios de Validación */
export interface ICriterioValidacion {
    esValido(item: ICapturable): boolean;
}

export class CriterioIgneas implements ICriterioValidacion {
    readonly minDureza :number = 3;
    esValido(item: ICapturable): boolean {
        // ejemplo simple: tipo y dureza mínima
        return item.tipo == TipoRoca.Ignea && item.dureza.getDureza()<3 
    }
}

export class CriterioMetamorficas implements ICriterioValidacion {
    constructor(private composicionPermitida: string[] = []) {}
    esValido(item: ICapturable): boolean {
        return (item.tipo == TipoRoca.Metamórfica &&
           item.dureza.getDureza()<=5 &&
           item.textura == TipoTextura.Vitrea)
    }
}

export class CriterioSedimentaria implements ICriterioValidacion {
    constructor(private maxDureza = 6) {}
    esValido(item: ICapturable): boolean {
        return (item.tipo == TipoRoca.Sedimentaria &&
                item.textura == TipoTextura.Fanerítica)
    }
}

/* Piloto */
export interface IPiloto {
    nombre: string;
    id?: string;
    reportar(mensaje: string): void;
}

export class Astronauta implements IPiloto {
    constructor(public nombre: string, public id?: string) {}
    reportar(mensaje: string): void {
        // implementación simple de reporte (puede integrarse con logs externos)
        console.log(`[Piloto ${this.nombre}${this.id ? " - " + this.id : ""}]: ${mensaje}`);
    }
}

/* Misión */
export interface Imisionable {
    Analiza(item: ICapturable): string;
}

export class Mision implements Imisionable {
    constructor(
        private entrada: ISistemaEntrada,
        private salida: ISistemaSalida,
        private criterio: ICriterioValidacion,
        private piloto: IPiloto
    ) {}

    // Analiza un único capturable usando el criterio inyectado y notifica al piloto.
    Analiza(item: ICapturable): string {
        let resultado : string = "";
        if (this.criterio.esValido(item))
        {
            resultado = `Mineral ${item.nombre} cumple criterio ${typeof(this.criterio)}.`;
        }
        else
        {
            resultado = `Mineral ${item.nombre} NO cumple criterio ${typeof(this.criterio)}.`;
        }          
        return resultado;
    }
    muestra()
    {   
        console.log(this.salida.mostrar(this));
    }
}


    //Nos creamos una colección de Minerales con diferentes caracteristicas para poder probar nuestro programa
    // Método de utilidad: procesa todo el flujo completo: leer, analizar, formatear y devolver salida.
function ejecutarTodo(): void
{
        const MisionApoloXI :Imisionable = new Mision(
                            new IntroduccionReducido(),
                            new FormatoEuropeo(),
                            new CriterioIgneas(),
                            new Astronauta("Jacintin"));
        MisionApoloXI.Analiza(Yeso);
        
}
ejecutarTodo();