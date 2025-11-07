class Envio{
    identificador:string;
    numero:number;
    precio: number;
    recibido:boolean;
    constructor(identificador:string,numero:number,precio:number,recibido:boolean){
        if (this.validador(identificador))
            this.identificador=identificador;
        else
            throw new Error("Identificador no válido");
        this.numero=numero;
        this.precio=precio;
        this.recibido=recibido;
    }
    calculoIVa():number{
        return this.precio*0.21;
    }
    
    validador(id):boolean{
        let patron = /^[A-H]{2}[0-9]{2}[I-Z]{2}$/;
        return patron.test(id);
    }
        
}
let envio1 = new Envio("AB12ZZ",152,365,true);
let envio2 = new Envio("AA12ZZ",248,569,false);
let envio3 = new Envio("AZ12ZI",987,125,true);// envío erróneo

let ArrayEnvios:Envio[]=[envio1,envio2,envio3];
for(const element of ArrayEnvios){
    console.log(`El IVA del envío con identificador ${element.identificador} es`,element.calculoIVa());
}
