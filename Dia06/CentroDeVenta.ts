interface IValorable{
    damePrecio():number;
}

class Rueda implements IValorable{
    damePrecio(): number {
        return 200;
    }
}
class Carroceria implements IValorable{
    damePrecio(): number {
        return 3000;
    }
}
class Volante implements IValorable{
    damePrecio(): number {
        return 400;
    }
}
class Coche implements IValorable{
    Ruedas: Rueda[];
    Carroceria: Carroceria;
    Volante: Volante;
    constructor(rueda:Rueda[], carroceria:Carroceria, volante:Volante){
        this.Ruedas= rueda;
        this.Carroceria= carroceria;
        this.Volante= volante;
    }
    
    damePrecio(): number {
        return this.Carroceria.damePrecio() + this.Volante.damePrecio() + this.Ruedas.reduce((total, rueda) => total + rueda.damePrecio(), 0);
    }
}
class Concesionario implements IValorable{
    Coches: Coche[];
    constructor(coches:Coche[]){
        this.Coches= coches;
    }
    damePrecio(): number {
        return this.Coches.reduce((total, coche) => total + coche.damePrecio(), 0);
    }     
}

let ruedaDelantera= new Rueda();
let ruedaTrasera= new Rueda();
let ruedasCoche: Rueda[] = [ruedaDelantera, ruedaDelantera, ruedaTrasera, ruedaTrasera];
let miCarroceria= new Carroceria();
let miVolante= new Volante();
console.log("El precio de la rueda es: ",ruedaDelantera.damePrecio());
let miCoche= new Coche(ruedasCoche, miCarroceria, miVolante);
console.log("El precio del coche es: ",miCoche.damePrecio());
let concesionarioDeCoches= new Concesionario([miCoche, miCoche]);
console.log("El precio del concesionario es: ",concesionarioDeCoches.damePrecio());
