var Punto = /** @class */ (function () {
    function Punto(x, y) {
        this.x = x;
        this.y = y;
    }
    return Punto;
}());
var miPrimerPunto = new Punto(4, 5);
var Alumno = /** @class */ (function () {
    function Alumno(nombre, edad, soltero) {
        this.nombre = nombre;
        this.edad = edad;
        this.soltero = soltero;
    }
    return Alumno;
}());
var alumno1 = new Alumno("Manolo", 67, true);
var alumno2 = new Alumno("Ana", 43, false);
var boton = /** @class */ (function () {
    function boton(posicionX, posicionY, textoBoton) {
        this.posicionX = posicionX;
        this.posicionY = posicionY;
        this.textoBoton = textoBoton;
    }
    return boton;
}());
//Crear tres botones, el botón 1, el botón 2 y el botón hola.
var boton1 = new boton(40, 50, "1");
var boton2 = new boton(100, 20, "2");
var boton3 = new boton(80, 90, "Hola");
var viewport = /** @class */ (function () {
    function viewport(anchura, altura, color) {
        this.anchura = anchura;
        this.altura = altura;
        this.color = color;
    }
    return viewport;
}());
var viewport1 = new viewport(400, 200, "lightblue");
var viewport2 = new viewport(300, 100, "yellow");
