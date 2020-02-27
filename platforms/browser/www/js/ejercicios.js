/* Ejercicio 1 */

/*
Crea un script para generar una pirámide siguiente con los números del 1 al número que indique el usuario (no mayor de 50) :
1
12
123
1234
12345
123456
……
*/

var numero = prompt("Ingrese un numero del 1 al 50");

for (var i = 1; i <= numero; i++) {
    for (var j = 1; j <= i; j++) {
        document.write(j);
    }
    document.write("<br>");
}

/*
for (var i = 1; i <= 30; i++) {
    for (var j = 1; j <= i; j++) {
        document.write(i);
    }
    document.write("<br>");
}
*/

/*
var numero;
var numeros_ingresados = [];
var suma = 0;

pedirNumero();

function pedirNumero() {
    numero = prompt("Introduzca un número");
    guardarNumeros();
}

function guardarNumeros() {
    if(numero=="" || numero==null) {
        for (var i = 0; i < numeros_ingresados.length; i++) {
            suma = suma + numeros_ingresados[i];
        }
        console.log(suma);        
        return false
    } else if (!isNaN(numero)) {
        numeros_ingresados.push(parseInt(numero));
        pedirNumero();
    } else {
        alert("Poné un número");
        pedirNumero();
    }
}

*/





/*
var edad = prompt("Introduzca su edad:");

if(!isNaN(edad)) {
    if (edad>=18 && edad<=84) {
        alert("Podes conducir");
    } else if (edad<=0) {
        alert("NO naciste");
    } else if (edad>=85) {
        alert("Es ilegal o te moriste sry");
    } else {
        alert("Tas chiquito");
    }
} else {
   alert("Pone un numero");
}

*/