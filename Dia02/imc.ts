class Persona{
    nombre:string;
    altura:number;
    peso:number;
    constructor(nombre:string, altura:number, peso:number){
        this.nombre=nombre;
        this.altura=altura;
        this.peso=peso;
    }

    calcularIMC():number{
        return this.peso / Math.pow(this.altura,2);
    }

    mostrarIMC():string{
        let imc=this.calcularIMC();
        let composicionCorporal="";

        switch (true) {
            case imc < 18.5:
                composicionCorporal = "Peso inferior al normal";
                break;
            case imc >= 18.5 && imc <= 24.9:
                composicionCorporal = "Normal";
                break;
            case imc >= 25.0 && imc <= 29.9:
                composicionCorporal = "Peso superior al normal";
                break;
            case imc >= 30.0:
                composicionCorporal = "Obesidad";
                break;
            default:
                composicionCorporal = "IMC no válido";
                break;
        }

        return `El IMC de ${this.nombre} es ${imc} y su composición corporal es ${composicionCorporal}.`;
    }
}

const persona1 = new Persona("Luis",1.75,70);
console.log(persona1.calcularIMC());
console.log(persona1.mostrarIMC())