/* Elementos */

// Variables Generales
var jugador				= Math.floor(Math.random()*2) +1;
var casilleros			= document.getElementsByClassName('casillero');
var juego_terminado		= false;
var casilla				= [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
                      ];
var ganador				= document.getElementById('ganador'); 
var btn_reset			= document.getElementById('btn-reset');
var puntaje_j1			= 0;
var puntaje_j2			= 0;
var puntos_jugador1		= document.getElementById('puntos-jugador1'); 
var puntos_jugador2		= document.getElementById('puntos-jugador2'); 

// Variables Fichas Recolectadas por Jugador
var fichas_j1			= 0;
var fichas_j2			= 0;
var fichas_jugadas = [];

// Variables Seccion Introductoria Dificultad
var titulo_dificultad	= document.getElementById('titulo-dificultad'); 
var btn_dificultad		= document.getElementsByClassName('btn-dificultad');

// Variables Seccion Juego
var seccion_memotest	= document.getElementById('juego_memotest');
// Variable Fila
var fila_memotest;
// Variables de Textos Instanciados a la Fila (Puntos parciales y Turno del Jugador)
var h_jugador = document.createElement("p");    
var turno_jugador;
var contenedor_puntosparciales = document.createElement("div"); 
var titulo_parcialesj1 = document.createElement("p");
var titulo_parcialesj2 = document.createElement("p");
var puntos_parcialesj1;
var puntos_parcialesj2;

// Array Random para Cartas
var array_random		= [];

// Variable para guardar cantidad Total de Cartas
var total_cartas;

/* Eventos */

// Recorro Botones para asignar Funcion
for (var i = 0; i < btn_dificultad.length; i++) {
    btn_dificultad[i].addEventListener('click', getCantidadFichasSegunDificultad);
}

//btn_reset.addEventListener('click', resetearJuego);

/* Funciones */

function getCantidadFichasSegunDificultad () {
	
	// Si el boton tiene data de dificultad Facil
	if (this.getAttribute("data-dificultad") == "facil") {
		// Deja de mostrar todo lo que concierne a Seccion Dificultad
		deshabilitarSeccionDificultad();
		// Imprime 16 cartas 
 		imprimirCartas(16);
	} else {
		deshabilitarSeccionDificultad();
		// Imprime 36 cartas 
		imprimirCartas(36);
	}
}

function deshabilitarSeccionDificultad() {
	
	// Agrega la clase de Display None a Botones y Titulo
	titulo_dificultad.classList.add("display-none");
	for (var i = 0; i < btn_dificultad.length; i++) {
		btn_dificultad[i].classList.add("display-none");
	}
}

function imprimirCartas(cantidad) {
	
	//Se agrega la fila
	seccion_memotest.innerHTML += '<div class="fila"></div>';
	//Se guarda en una variable a la fila
	fila_memotest = seccion_memotest.children[3];
    
    //Instancio Turno Jugador
    turno_jugador = document.createTextNode("Turno Jugador: " + jugador);
    h_jugador.appendChild(turno_jugador);  
    fila_memotest.appendChild(h_jugador);
    h_jugador.classList.add('jugador');
    
    //Instancio Cartas
	for (var i = 0; i < cantidad; i++) {
		//Instancio la carta
		var cartas_columna		= document.createElement("div");
		var cartas_caja			= document.createElement("div");
		cartas_caja.classList.add("caja", "grid", "fondo-rojo", "carta-memotest");
		cartas_columna.appendChild(cartas_caja);

		// Depende el nivel cambio el numero de columnas
		if (cantidad == 16) {

			cartas_columna.classList.add("columna-xs-3");
			fila_memotest.appendChild(cartas_columna);

		} else {
			cartas_columna.classList.add("columna-xs-2");
			fila_memotest.appendChild(cartas_columna);
		}
		
	}

    //Instancio Puntos Parciales
    puntos_parcialesj1 = document.createTextNode("Puntos Jugador 1 : " + fichas_j1);
    puntos_parcialesj2 = document.createTextNode("Puntos Jugador 2 : " + fichas_j2);
    titulo_parcialesj1.appendChild(puntos_parcialesj1); 
    titulo_parcialesj2.appendChild(puntos_parcialesj2); 
    contenedor_puntosparciales.appendChild(titulo_parcialesj1);
    contenedor_puntosparciales.appendChild(titulo_parcialesj2);
    fila_memotest.appendChild(contenedor_puntosparciales);

	// Guardo la mitad del numero de cartas (Para hacer PARES)
	for (var j = 0; j < (cantidad/2); j++) {
		array_random.push(j);
	}

	// Duplico Array
	duplicarArrayRandom();
}

function duplicarArrayRandom() {
	
	// Auto concateno el array
	array_random = array_random.concat(array_random);
	
	// Randomizo el Array
	shuffleArrayRandom();
}

function shuffleArrayRandom() {

	array_random.sort(() => Math.random() - 0.5);
	// Aplico valor a las cartas
	aplicarValorRandomACartas();
}

function aplicarValorRandomACartas() {

	total_cartas = document.getElementsByClassName('carta-memotest');
	// Recorro las cartas
	for (var i = 0; i < total_cartas.length; i++) {
		// Seteo el atributo del dato 
		total_cartas[i].setAttribute("data-carta", array_random[i]);
		// Listener de Jugada
		total_cartas[i].addEventListener('click', jugada);
	}

	instanciarImagenes();
}

function instanciarImagenes() {

	// Recorro el total de las cartas
	for (var i = 0; i < total_cartas.length; i++) {
		// Instancio una imagen con el numero del array
		var imagen		= document.createElement("img");
		imagen.classList.add("visibility-hidden");
		imagen.setAttribute("src", "img/memotest/imagen_"+ array_random[i] + ".jpg");
		total_cartas[i].appendChild(imagen);
	}
}

function jugada() {

    if(!juego_terminado) {
        this.children[0].classList.remove("visibility-hidden");
        var ficha    = this.getAttribute("data-carta");
        fichas_jugadas.push(ficha);
        console.log(fichas_jugadas);

        if (fichas_jugadas.length == 2) {
            comprobarGanador();
            fichas_jugadas = [];
            //console.log(fichas_jugadas);
        }
           /*
            // Compruebo Jugador
            if (jugador == 1) {

                // En el h2 se escribe (X o O)
                jugada.innerHTML = "X";

                // Agrego Jugada al Array
                var fila    = this.getAttribute("data-fila");
                var columna = this.getAttribute("data-columna");
                casilla[fila][columna] = jugador;
                
                // Sumo Movimientos
                movimientos++;
                
                // Verifico si gano
                comprobarGanador();

                // Paso de Turno
                jugador = 2;
            } else {

                jugada.innerHTML = "O";

                // Agrego Jugada al Array
                var fila    = this.getAttribute("data-fila");
                var columna = this.getAttribute("data-columna");
                casilla[fila][columna] = jugador;
                
                // Sumo Movimientos
                movimientos++;
                
                // Verifico si gano
                comprobarGanador();

                // Paso de Turno
                jugador = 1;
            }

            // Se agregar la clase Jugada (estilos)
            jugada.classList.add("jugada");

            // Se apendiza al div
            this.appendChild(jugada);
        }*/
    } else {
        return false
    }
}

function comprobarGanador() {
console.log("holis");
    if(fichas_jugadas[0] == fichas_jugadas[1]){
        sumarPuntosParciales();
    } else{
        var ficha1 = document.querySelectorAll(".carta-memotest[data-carta='" + fichas_jugadas[0] + "'] img");
        var ficha2 = document.querySelectorAll(".carta-memotest[data-carta='" + fichas_jugadas[1] + "'] img");
        
        setTimeout(function(){ 
            ficha1.item(0).classList.add("visibility-hidden");
            ficha2.item(0).classList.add("visibility-hidden");
            ficha1.item(1).classList.add("visibility-hidden");
            ficha2.item(1).classList.add("visibility-hidden");
        
        }, 1000);
    }
    
     cambiarJugador();
	/*for(var i=0; i<3;i++) {

		//Si es Horizontal
		if (casilla[i][0] === jugador && casilla[i][1] === jugador && casilla[i][2] === jugador) {

            ganador.innerHTML = 'Ganaste Jugador ' + jugador;

            btn_reset.classList.remove("display-none");
            
            juego_terminado = true;
            sumarPuntos();
			return false;
        }

		//Si es vertical
		if (casilla[0][i] === jugador && casilla[1][i] === jugador && casilla[2][i] === jugador) {
            ganador.innerHTML = 'Ganaste Jugador ' + jugador;

            btn_reset.classList.remove("display-none");
            
            juego_terminado = true;
            sumarPuntos();
			return false;
		}		  	
    }

    //Si es diagonal 
    if (casilla[0][0] === jugador && casilla[1][1] === jugador && casilla[2][2] === jugador){
        ganador.innerHTML = 'Ganaste Jugador ' + jugador;
        
		btn_reset.classList.remove("display-none");
   
        juego_terminado = true;
        sumarPuntos();
        return false;
    }

    //Si es diagonal invertida
    if (casilla[0][2] === jugador && casilla[1][1] === jugador && casilla[2][0] === jugador){
        ganador.innerHTML = 'Ganaste Jugador ' + jugador;

        btn_reset.classList.remove("display-none");
        
        juego_terminado = true;
        sumarPuntos();
        return false;
    }*/
}
function cambiarJugador(){
    if(jugador == 1){
        jugador = 2;
    } else{
        jugador = 1;
    }
    turno_jugador = document.createTextNode("Turno Jugador: " + jugador);
    console.log(jugador);
}
function sumarPuntosParciales() {
    //debugger
    if (jugador == 1) {
        fichas_j1++;
        puntos_parcialesj1 = document.createTextNode("Puntos Jugador 1 : " + fichas_j1);
        
        
        console.log(fichas_j1);
    } else {
        fichas_j2++;
        puntos_parcialesj2 = document.createTextNode("Puntos Jugador 2 : " + fichas_j2);
        
        
        console.log(fichas_j2);
    }
    
}

function sumarPuntos() {
    if (juego_terminado) {
        if (jugador == 1) {
            puntaje_j1 = puntaje_j1 +1;
            puntos_jugador1.innerHTML= puntaje_j1;
            console.log("PUNTOS 1:" + puntaje_j1);
        } else {
            puntaje_j2 = puntaje_j2 +1;
            puntos_jugador2.innerHTML= puntaje_j2;
            console.log("PUNTOS 2:" + puntaje_j2);
        }
    }
}

function resetearJuego() {

    for (var i = 0; i < casilleros.length; i++) {
        casilleros[i].innerHTML = "";
        casilleros[i].classList.remove('jugado');
    }
    ganador.innerHTML = "";
    btn_reset.classList.add("display-none");
    casilla = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
    ];
    juego_terminado = false;
}