class Coche{
    matricula: string;
    potencia: number;
    velocidad: number;
    modelo: string;
    constructor(matricula:string, potencia:number, velocidad:number, modelo:string){
        this.matricula=matricula;
        this.potencia=potencia;
        this.velocidad=velocidad;
        this.modelo=modelo;
    }
    imprime():string{
        return `El coche con matricula ${this.matricula} de modelo ${this.modelo}, tiene una velocidad de ${this.velocidad} para una potencia de ${this.potencia}.`;
    }
    velocidadCrucero():number{
        return this.velocidad/this.potencia;
    }
}

let coche1 = new Coche("zaader", 120.5, 110, "Seat 600");
let coche2 = new Coche("ZZ-2443", 130.3, 125, "Volvo 678");
let coche3 = new Coche("iuhsuahs", 150.8, 135.6, "Mercedes 500");

let ArrayCoches:Coche[] = [coche1,coche2,coche3];
for(const element of ArrayCoches){
    console.log(element.imprime());
}
console.log("Velocidad de cada coche:")
let velocidadtotal=0;
let potenciaTotal=0;
for(const element of ArrayCoches){
    velocidadtotal+=element.velocidad;
    potenciaTotal+=element.potencia;
    console.log(element.matricula+ ":",element.velocidadCrucero());
}
console.log("Velocidad media: ", velocidadtotal/ArrayCoches.length);
console.log("Potencia media: ", potenciaTotal/ArrayCoches.length);