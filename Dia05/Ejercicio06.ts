let nombres01 = [
    "Andra",
    "Aneu",
    "Arlet",
    "Ehud",
    "Indivar",
    "Samay",
    "Sança",
    "Tanit",
    "Uxia",
    "Zenda"
];

let nombres02 = [
    "Abba",
    "Acfred", 
    "Areu",
    "Drac",
    "Guim",
    "Iol",
    "Kilian",
    "Mirt",
    "Yannick",
    "Zigor",
    "Tanit"
];

for(const element of nombres01){
    console.log(element);
}
//1
function mostrar(array) {
    array.forEach(nombre => console.log(nombre));
}

mostrar(nombres01);
mostrar(nombres02);
//2
console.log(nombres01.every((letra) => letra.length >2));
//3
let nombreFiltrados=nombres01.filter((nombres01) => nombres01>"i");

mostrar(nombreFiltrados);

//4
function crearPalindromo(nombre) {
    return nombre + nombre.split('').reverse().join('');
}

// Aplicar la función palíndromo a nombres01
let palindromos01 = nombres01.map(crearPalindromo);

// Aplicar la función palíndromo a nombres02  
let palindromos02 = nombres02.map(crearPalindromo);

mostrar(palindromos01);
mostrar(palindromos02);

//5
console.log ("Tanit está en la posición ", nombres01.indexOf("Tanit"));
console.log ("Tanit está en la posición ", nombres02.indexOf("Tanit"));
console.log ("Jacinto está en la posición ", nombres01.indexOf("Jacinto"));
console.log ("Jacinto está en la posición ", nombres02.indexOf("Jacinto"));

//6
let lista01= nombres01.join(", ");
console.log(lista01);
let lista02= nombres02.join(", ");
console.log(lista02);

//7
let longitudes: number[] = nombres01.map((element) => element.length);
console.log(longitudes);

//8
console.log(nombres01.length);
console.log(nombres02.length);
nombres01.pop();
nombres02.pop();
console.log(nombres01.length);
console.log(nombres02.length);

//9
nombres01.push("Jacinto");
nombres02.push("Jacinto");
mostrar(nombres01);

//10
let total: number = longitudes.reduce((acumulador, num) => acumulador + num, 0);
console.log(total);

//11


//12


//13

nombres01.sort();
console.log("Orden ascendente: (nombres01)")
mostrar(nombres01);

nombres01.sort((a, b) => a.localeCompare(b)).reverse();
console.log("Orden descendente: (nombres01)")
mostrar(nombres01);