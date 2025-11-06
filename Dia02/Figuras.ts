class Figura
{
    readonly x: number;
    readonly y: number;
    constructor(x: number, y: number)
    {
        if (x < 0)
        {
            this.x = 0;
        }
        else
        {
            this.x = x;
        }
        if (y < 0)
        {
            this.y = 0;
        }
        else
        {
            this.y = y;
        }
    }
}

class Cuadrado extends Figura
{
    lado: number;
    constructor(x: number, y: number, lado: number)
    {
        super(x,y);
        this.lado = lado;
    }
    damePerimetro():number
    {
        return this.lado*4;
    }
    dameSuperficie():number
    {
        return this.lado*this.lado;
    }
}
class Circulo extends Figura
{
    radio: number;
    constructor(x: number,y: number,radio:number)
    {
        super(x,y);
        this.radio = radio;
    }
    damePerimetro(): number
    {
        return 2*Math.PI*this.radio;
    }
    dameSuperficie(): number
    {
        return Math.PI*Math.pow(this.radio,2);
    }
    damePosicion(): string
    {
        return "Pos X: "+this.x+"Pos Y:"+this.y;
    }
}


class Triangulo extends Figura{
    ladoA: number;
    ladoB: number;
    ladoC: number;
    
    constructor(x: number, y: number, ladoA: number, ladoB: number, ladoC: number)
    {
        super(x,y);
        this.ladoA = ladoA;
        this.ladoB = ladoB;
        this.ladoC = ladoC;
    }
    damePerimetro():number
    {
        return this.ladoA+this.ladoB+this.ladoC;
    }
    dameSuperficie():number
    {   
        let a=this.ladoA;
        let b=this.ladoB;
        let c=this.ladoC;
        let s = this.damePerimetro()/2;

        let area = Math.sqrt(s * (s - a)* (s - b)* (s - c));
        return area;
    }
}

class Rectangulo extends Figura{
    ladoA:number;
    ladoB:number;
    constructor(x: number, y: number, ladoA: number, ladoB: number){
        super(x,y);
        this.ladoA = ladoA;
        this.ladoB = ladoB;
    }
    
    damePerimetro():number
    {
        return (this.ladoA+this.ladoB)*2;
    }
    dameSuperficie():number
    {
        return this.ladoA*this.ladoB;
    }
}

let miCuadrado1 = new Cuadrado(3,3,4);
let miCuadrado2 = new Cuadrado(5,5,7);
let miCirculo1 = new Circulo(5,6,5);
let miCirculo2 = new Circulo(7,4,3);
let miTriangulo1 = new Triangulo(10,20,2,3,4);
let miTriangulo2 = new Triangulo(10,20,2,3,4);
let miRectangulo1 = new Rectangulo(10,20,3,4);
let miRectangulo2 = new Rectangulo(5,2,5,4);


console.log(`El cuadrado de lados 4, tiene un perimetro de ${miCuadrado1.damePerimetro()}`);
console.log(`El cuadrado de lados 4, tiene un area de ${miCuadrado1.dameSuperficie()}`);
console.log(`El cuadrado de lados 7, tiene un perimetro de ${miCuadrado2.damePerimetro()}`);
console.log(`El cuadrado de lados 7, tiene un area de ${miCuadrado2.dameSuperficie()}`);
console.log(`El circulo de radio 5, tiene un perimetro de ${miCirculo1.damePerimetro()}`);
console.log(`El circulo de radio 5, tiene un area de ${miCirculo1.dameSuperficie()}`);
console.log(`El circulo de radio 3, tiene un perimetro de ${miCirculo2.damePerimetro()}`);
console.log(`El circulo de radio 3, tiene un area de ${miCirculo2.dameSuperficie()}`);
console.log(`El triángulo1 tiene un perimetro de ${miTriangulo1.damePerimetro()}`);
console.log(`El triángulo1 tiene un area de ${miTriangulo1.dameSuperficie()}`);
console.log(`El triángulo2 tiene un perimetro de ${miTriangulo2.damePerimetro()}`);
console.log(`El triángulo2 tiene un area de ${miTriangulo2.dameSuperficie()}`);
console.log(`El rectángulo1 tiene un perimetro de ${miRectangulo1.damePerimetro()}`);
console.log(`El rectángulo1 tiene un area de ${miRectangulo1.dameSuperficie()}`);
console.log(`El rectángulo2 tiene un perimetro de ${miRectangulo2.damePerimetro()}`);
console.log(`El rectángulo2 tiene un area de ${miRectangulo2.dameSuperficie()}`);