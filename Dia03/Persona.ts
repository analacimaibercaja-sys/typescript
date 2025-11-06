abstract class Persona{
    readonly nombre: string;
    readonly edad: number;
    constructor (nombre:string, edad:number){
        if (edad<0){
            this.edad=0;
        }
        else{
            this.edad=edad;
        }
        this.nombre=nombre;
    }
    abstract dameNombre():string;
    dameEdad():number{
        return this.edad;
    }
}

class Alumno extends Persona{
    readonly identificador: string;
    readonly estudios: boolean;

    constructor(name:string, edad: number, identificador: string, estudios: boolean){
        super(name,edad);
        if(identificador.length ==0){
            this.identificador="No identificado";
        }
        else{
            this.identificador=identificador;
        }
        this.estudios=estudios;
    }
    dameNombre(): string {
        return `El alumno tiene como nombre ${this.nombre}`;
    }
}

class Profesor extends Persona{
    readonly estudios: string;
    constructor(name:string, edad:number, estudios:string){
        super(name,edad);
        this.estudios=estudios;
    }
    dameNombre(): string {
        return `El profesor tiene como nombre ${this.nombre}`;
    }
}

class Coordinador extends Profesor{
    readonly turno: string;
    constructor(name:string, edad:number, estudios:string,turno:string){
        super(name,edad,estudios);
        this.turno=turno;
    }
    dameNombre(): string {
        return `El coordinador tiene como nombre ${this.nombre}`;
    }
}


let Rocio = new Alumno("Rocio",30,"76328278D",true);
let Jacinto  =  new Profesor("Jacinto",23,"Medidos");
let Pilar = new Coordinador("Pila",34,"universitarios","mañana");
let Isabel = new Alumno("Isabel",25,"77256987V",true);
let Arturo = new Alumno("Arturo",12,"",false);
let Esther = new Alumno("Esther",18,"17852963E",true);
let Juan = new Profesor("Juan",38,"Máster");



let ArrayPersonas :Persona[] = []
ArrayPersonas.push(Rocio); 
ArrayPersonas.push(Jacinto);
ArrayPersonas.push(Pilar);
ArrayPersonas.push(Isabel);
ArrayPersonas.push(Arturo);
ArrayPersonas.push(Esther);
ArrayPersonas.push(Juan);
let total=0;
ArrayPersonas.forEach(element => {
    console.log(element.dameNombre());
    total+=element.dameEdad();
});
let media = total / ArrayPersonas.length;
console.log("total",total);
console.log("media", media);
