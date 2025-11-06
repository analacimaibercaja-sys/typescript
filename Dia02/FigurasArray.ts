abstract class Figura
{
    readonly x: number;
    readonly y: number;
    abstract damePerimetro():number;
    abstract dameSuperficie():number;
    
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

class Rectangulo extends Figura
{
    ladoCorto: number;
    ladoLargo: number;
    constructor(x: number, y: number, ladoCorto: number, ladoLargo: number)
    {
        super(x,y);
        this.ladoLargo = ladoLargo;
        this.ladoCorto = ladoCorto;
    }
    damePerimetro(): number {
        return (this.ladoCorto*2) + (this.ladoLargo*2);
    }
    dameSuperficie(): number {
        return this.ladoCorto*this.ladoLargo;
    }
}
let Arreglo: Figura [] = [new Cuadrado(4,5,6),new Cuadrado(3,3,4),new Circulo(5,6,7),
    new Rectangulo(5,6,3,4)];
Arreglo.forEach(element => {
    console.log(element.damePerimetro());
    console.log(element.dameSuperficie());
});
