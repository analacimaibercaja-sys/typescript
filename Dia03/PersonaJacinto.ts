abstract class Persona
{
    readonly nombre: string;
    readonly edad: number;
    constructor(nombre: string, edad: number)
    {
        if (edad < 0)
            this.edad = 0;
        else
            this.edad = edad;
        this.nombre = nombre;
        this.edad = edad;
    }
    abstract dameNombre(): string
}

class Alumno extends Persona
{
    readonly identificador : string;
    readonly estudios: boolean;

    constructor(name: string, edad: number, identificador: string, estudios: boolean)
    {
        super(name,edad);
        if (identificador.length == 0)
            this.identificador = "No identificado";
        else
            this.identificador = identificador;
        
        this.estudios = estudios;
    }
    dameNombre(): string
    {
        return "El alumno tiene como nombre"+ this.nombre;
    }
}

class Profesor extends Persona{
    dameNombre(): string {
        return "El profesor tiene como nombre "+this.nombre;
    }
    readonly estudios :string;
    constructor(name: string, edad: number, estudios : string)
    {
        super(name,edad);
        this.estudios = estudios;
    }
}

class Coordinador extends Profesor
{
    dameNombre(): string {
        return "El coordinador tiene como nombre "+this.nombre;
    }
    readonly turno: string;
    constructor(name: string, edad: number, estudios: string, turno: string)
    {
        super(name,edad,estudios);
        this.turno = turno;
    }
}

let Rocio = new Alumno("Rocio",30,"76328278D",true);
let Jacinto  =  new Profesor("Jacinto",23,"Medidos");
let Pilar = new Coordinador("Pila",34,"universitarios","mañana");

let ArrayPersonas :Persona[] = []
ArrayPersonas.push(Rocio); 
ArrayPersonas.push(Jacinto);
ArrayPersonas.push(Pilar);
ArrayPersonas.forEach(element => {
    console.log(element.dameNombre());
});