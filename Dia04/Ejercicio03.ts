class Animal{
    mes:number;
    dia:number;
    anio:number;
    nombre: string;
    constructor(mes:number,dia:number, anio:number,nombre:string){
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
        return `El nombre del animal es ${this.nombre} y nació el día ${this.dia}-${this.mes}-${this.anio}`;
    }
}
// (mes,dia,año,nombre)
let perro = new Animal (10,7,2017,"Cora");
console.log(perro.dameEdad());
console.log(perro.dameDatos);

class Mamifero extends Animal{
    
}

