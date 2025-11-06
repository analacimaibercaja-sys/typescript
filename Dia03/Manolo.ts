abstract class Repuesto{
    id:string;
    precio:number;
    constructor(id:string,precio:number){
        this.id=id;
        this.precio=precio;
    }
    abstract damePrecio():number;
    abstract dameIdentificador():string;
}

class Rueda extends Repuesto{
    damePrecio():number{
        return 200;
    }
    dameIdentificador(): string {
        return `Soy una rueda con identificador ${this.id}`;
    }
}

class Retrovisor extends Repuesto{
    damePrecio():number{
        return 50;
    }
    dameIdentificador(): string {
        return `Soy un retrovisor con identificador ${this.id}`;
    }
}

class LuzCruce extends Repuesto{
    damePrecio():number{
        return 60;
    }
    dameIdentificador(): string {
        return `Soy una luz de cruce con identificador ${this.id}`;
    }
}

let ArrayRepuestos : Repuesto[] = [new Rueda("repuesto01",200), new Rueda("repuesto02",200), new Retrovisor("repuesto03",50),
     new Retrovisor("repuesto04",50),new LuzCruce("repuesto05",60),new LuzCruce("respuesto06",60)];
let precioTotal=0;
ArrayRepuestos.forEach(element=>{
    precioTotal+=element.damePrecio();
})
console.log("El importe total de los repuestos es: ",precioTotal);
