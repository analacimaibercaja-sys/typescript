 class Animal{
    readonly mes:number;
    readonly dia:number;
    readonly anio:number;
    readonly nombre: string;
    constructor(anio:number, mes:number, dia:number, nombre:string){
        if (dia>=1 && dia<=31){
            this.dia=dia;
        }
        else
            throw new Error ("El día debe estar entre 1 y 31.");
        
        if(mes >=1 && mes <=12){
            this.mes=mes;
        }
        else{
            throw new Error ("El mes debe estar entre 1 y 12.");
        }
        if(anio >=2000 && anio <=2024){
            this.anio=anio;
        }
        else{
            throw new Error ("El año debe estar entre 2000 y 2024.");
        }
        this.nombre=nombre;
    }
    dameEdad():number{
        const fechaHoy = new Date();
        return fechaHoy.getFullYear() -this.anio;
    }
    dameDatos():string{
        return `Nombre: ${this.nombre}.\nFecha de nacimiento: ${this.dia}-${this.mes}-${this.anio}.`;
    }
}

let perro = new Animal (2017,10,7,"Cora");
console.log(perro.dameEdad());
console.log(perro.dameDatos);

class Mamifero extends Animal{
    mesesGestacion: number;
    constructor(anio:number, mes:number, dia:number, nombre:string, mesesGestacion:number){
        super(anio,mes,dia,nombre);
        if (mesesGestacion>=1 && mesesGestacion<=18){
            this.mesesGestacion=mesesGestacion;
        }
        else{
            throw new Error ("El tiempo de gestación debe estar entre 1 y 18 meses.")
        }
    }
    dameDatos(): string {
        return `Nombre: ${this.nombre}. Fecha de nacimiento: ${this.dia}-${this.mes}-${this.anio}. Meses de gestación: ${this.mesesGestacion}`;
    }
}

class Primate extends Mamifero{
    masaCerebral:number;
    constructor(anio:number, mes:number, dia:number, nombre:string, mesesGestacion:number, masaCerebral:number){
        super(anio,mes,dia,nombre,mesesGestacion);
        if (masaCerebral>=100 && masaCerebral<=2000){
            this.masaCerebral=masaCerebral;
        }
        else{
            throw new Error ("La masa cerebral debe estar entre 100 y 2000 gramos.")
        }
    }
    dameDatos(): string {
        return `Nombre: ${this.nombre}. Fecha de nacimiento: ${this.dia}-${this.mes}-${this.anio}. Meses de gestación: ${this.mesesGestacion}. Su proporción de masa cerebral es ${this.masaCerebral/this.mesesGestacion}.`;
    }
}

class Humano extends Primate{
    apellidos:string;
    constructor(anio:number, mes:number, dia:number, nombre:string, mesesGestacion:number, masaCerebral:number,apellidos:string){
        super(anio,mes,dia,nombre,mesesGestacion,masaCerebral);
        this.apellidos=apellidos;
    }
    dameDatos(): string {
        return `Nombre: ${this.nombre}. \nApellidos: ${this.apellidos}. Nació el día ${this.dia}-${this.mes}-${this.anio}. Meses de gestación: ${this.mesesGestacion}. Su proporción de masa cerebral es ${this.masaCerebral/this.mesesGestacion}.`;
    }
}

