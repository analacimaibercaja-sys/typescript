class Punto{
    x: number;
    y: number;
    
    constructor(x:number, y:number)
    {
        this.x=x;
        this.y=y;
    }
}

const miPrimerPunto = new Punto(4,5);
miPrimerPunto.x=10;
miPrimerPunto.y=20;

class Alumno{
    nombre: String;
    edad:number;
    soltero:boolean;

    constructor(nombre:String, edad:number, soltero:boolean){
        this.nombre=nombre;
        this.edad=edad;
        this.soltero=soltero;
    }
}

let alumno1=new Alumno("Manolo",67,true);
let alumno2=new Alumno("Ana",43,false);

class boton{
    posicionX:number;
    posicionY:number;
    textoBoton:String;

    constructor(posicionX:number, posicionY:number,textoBoton:String){
        this.posicionX=posicionX;
        this.posicionY=posicionY;
        this.textoBoton=textoBoton;
    }
}

//Crear tres botones, el botón 1, el botón 2 y el botón hola.
let boton1=new boton(40,50,"1");
let boton2=new boton(100,20,"2");
let boton3=new boton(80,90,"Hola")


class viewport{
    anchura: number;
    altura: number;
    color:String;

    constructor(anchura:number, altura:number,color:String){
        this.anchura=anchura;
        this.altura=altura;
        this.color=color;
    }
}

let viewport1=new viewport(400,200,"lightblue");
let viewport2=new viewport(300,100,"yellow");