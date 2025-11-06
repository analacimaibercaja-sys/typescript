class Cuadrado{
    x: number;
    y: number;
    lado: number;
    constructor(x:number, y:number, lado: number){
        this.x=x;
        this.y=y;
        this.lado=lado;
    }

    calcularSuperficie():number{
        
        return this.lado*this.lado;
    }

    calcularPerimetro():number{
        return this.lado*4;
    }
    
    mostrar():string{
        let resultado:string;
        let superficie=this.calcularSuperficie();
        let perimetro=this.calcularPerimetro();
        resultado=`la posición x es: ${this.x} y la posición y es: ${this.y}. La superficie del cuadrado es ${superficie} y su perímetro ${perimetro}`
        return resultado;
    }
}

class Circulo{
    x: number;
    y: number;
    radio: number;
    constructor(x:number, y:number, radio: number){
        this.x=x;
        this.y=y;
        this.radio=radio;
    }

    calcularSuperficie():number{
       return 2* Math.PI * this.radio; 
    }

    calcularPerimetro():number{
        return Math.PI *Math.pow(this.radio,2);
    }
    
    mostrar():string{
        let resultado:string;
        let superficie=this.calcularSuperficie();
        let perimetro=this.calcularPerimetro();
        resultado=`la posición x es: ${this.x} y la posición y es: ${this.y}. La superficie del círculo es ${superficie} y su perímetro ${perimetro}`
        return resultado;
    }
}

const cuadrado1 = new Cuadrado(10,20,5);
console.log(cuadrado1.mostrar());
console.log(cuadrado1.calcularPerimetro());
console.log(cuadrado1.calcularSuperficie());

const circulo1 = new Circulo(10,20,5);
console.log(circulo1.mostrar());
console.log(circulo1.calcularPerimetro());
console.log(circulo1.calcularSuperficie());