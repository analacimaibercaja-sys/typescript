abstract class Persona{
    nombre:string;
    edad:number;
    abstract dameSueldo():number;
    constructor(nombre:string, edad:number){
        this.nombre=nombre;
        this.edad=edad;
    }
}

class Ejecutivo extends Persona{

    dameSueldo():number{
        return 100 * this.edad;
    }
}

class Secretario extends Persona{

    dameSueldo():number{
        return 50 * this.edad;
    }
}

class Aprendiz extends Persona{

    dameSueldo():number{
        return 10 * this.edad;
    }
}

let miArrayDePersonas: Persona [] = [new Ejecutivo("Isabel",30), new Ejecutivo("Julio",20), new Secretario("Iria",20), 
    new Secretario("Enrique",22), new Aprendiz("Estela",22), new Aprendiz("Ricardo",24)];

for (const element of miArrayDePersonas) {
    console.log("El sueldo de",element.nombre, "es", element.dameSueldo());
}