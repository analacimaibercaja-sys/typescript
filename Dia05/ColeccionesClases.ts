abstract class Regalo{
    readonly identificador:string;
    precioCompra: number;
    precioVenta: number;
    constructor(id:string, precioCompra:number, precioVenta:number){
        // validar id
        this.identificador=id;
        this.precioCompra=precioCompra;
        this.precioVenta=precioVenta;
    }
    calcularBeneficio():number{
        return this.precioVenta - this.precioCompra;
    }
}

class JarronMing extends Regalo {
    constructor(id:string) {
        super(id, 100, 200);
    }
}

class TazaMong extends Regalo {
    constructor(id:string) {
        super(id, 10, 22);
    }
}

class ColganteChulin extends Regalo {
    constructor(id:string) {
        super(id, 120, 140);
    }
}

let jarron1 = new JarronMing("jarron1");
let jarron2 = new JarronMing("jarron2");
let taza1 = new TazaMong("taza1");
let taza2 = new TazaMong("taza2");
let colgante1 = new ColganteChulin("colgante1");
let colgante2 = new ColganteChulin("colgante2");
let coleccionDeRegalos:Regalo[]=[jarron1,jarron2,taza1,taza2,colgante1,colgante2];

let precioCompraTotal=0;
let precioVentaTotal=0;
let beneficioTotal=0;
for(const element of coleccionDeRegalos){
    precioCompraTotal+=element.precioCompra;
    precioVentaTotal+=element.precioVenta;
    beneficioTotal+= element.calcularBeneficio();
}
let precioCompraMedio= precioCompraTotal/coleccionDeRegalos.length;
let precioVentaMedio=precioVentaTotal/coleccionDeRegalos.length
console.log("Precio de compra total: ",precioCompraTotal);
console.log("Precio de venta total: ",precioVentaTotal);
console.log("Precio de compra medio: ",precioCompraMedio);
console.log("Precio de venta medio: ",precioVentaMedio);
console.log("Beneficio total: ",beneficioTotal);

function ordenarPorCompra() {
    return coleccionDeRegalos.sort((a, b) => a.precioCompra - b.precioCompra);
}
function ordenarPorVenta(){
    return coleccionDeRegalos.sort((a, b) => a.precioVenta - b.precioVenta);
}

for (const element of ordenarPorCompra()){
    console.log(element.identificador, element.precioCompra);
}
for (const element of ordenarPorVenta()){
    console.log(element.identificador, element.precioVenta);
}