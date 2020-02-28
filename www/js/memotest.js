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
var cartas_disponibles  = 0;

// Variables Fichas Recolectadas por Jugador
var fichas_j1			= 0;
var fichas_j2			= 0;
var cartas_recolectadas1 = document.getElementById("cartas-recolectadas1");
var cartas_recolectadas2 = document.getElementById("cartas-recolectadas2");
var fichas_jugadas = [];

// Variables Seccion Introductoria Dificultad
var titulo_dificultad	= document.getElementById('titulo-dificultad'); 
var btn_dificultad		= document.getElementsByClassName('btn-dificultad');
var dificultad;

// Variables Seccion Juego
var seccion_memotest	= document.getElementById('juego_memotest');
// Variable Fila
var fila_memotest;
var caja_j1         = document.getElementsByClassName('caja-j1');
var caja_j2         = document.getElementsByClassName('caja-j2');

// Array Random para Cartas
var array_random		= [];

// Variable para guardar cantidad Total de Cartas
var total_cartas;

/* Eventos */

// Recorro Botones para asignar Funcion
for (var i = 0; i < btn_dificultad.length; i++) {
    btn_dificultad[i].addEventListener('click', getCantidadFichasSegunDificultad);
}

btn_reset.addEventListener('click', resetearJuego);

/* Funciones */

function estilizarTurnoJugador() {
    if (jugador == 1) {
        caja_j2[0].classList.remove("turno_jugador");
        caja_j1[0].classList.add("turno_jugador");
    } else {
        caja_j1[0].classList.remove("turno_jugador");
        caja_j2[0].classList.add("turno_jugador");
    }
}

function eliminarEstiloTurno() {
    caja_j1[0].classList.remove("turno_jugador");
    caja_j2[0].classList.remove("turno_jugador");
}

function getCantidadFichasSegunDificultad () {
    
    //Funcion para que, al Iniciar, ya se sepa de quien es el turno
    estilizarTurnoJugador();
	// Si el boton tiene data de dificultad Facil
	if (this.getAttribute("data-dificultad") == "facil") {
        this.classList.add("boton-elegido");
		// Deja de mostrar todo lo que concierne a Seccion Dificultad
        deshabilitarSeccionDificultad();
        cartas_disponibles = 16;
        dificultad = "facil";
		// Imprime 16 cartas 
 		imprimirCartas(16);
	} else {
        this.classList.add("boton-elegido");
        deshabilitarSeccionDificultad();
        cartas_disponibles = 36;
        dificultad = "dificil";
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
    
    //Instancio Cartas
	for (var i = 0; i < cantidad; i++) {
		//Instancio la carta
		var cartas_columna		= document.createElement("div");
		var cartas_caja			= document.createElement("div");
		cartas_caja.classList.add("caja", "grid", "carta-memotest");
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

        this.classList.add('notclick');
        this.children[0].classList.remove("visibility-hidden");
        var ficha    = this.getAttribute("data-carta");
        fichas_jugadas.push(ficha);
        console.log(fichas_jugadas);

        if (fichas_jugadas.length == 2) {
            if (jugador == 1) {
                caja_j1[0].classList.remove("turno_jugador");
                caja_j2[0].classList.add("turno_jugador");
            } else {
                caja_j2[0].classList.remove("turno_jugador");
                caja_j1[0].classList.add("turno_jugador");
            }
            comprobarGanador();
            fichas_jugadas = [];
            //console.log(fichas_jugadas);
        }
    } else {
        return false
    }
}

function comprobarGanador() {

    if(fichas_jugadas[0] == fichas_jugadas[1]){
        sumarPuntosParciales();
        var ficha = document.querySelectorAll(".carta-memotest[data-carta='" + fichas_jugadas[0] + "']");
        
        ficha.item(0).classList.add("notclick");
        ficha.item(1).classList.add("notclick");
        
        cartas_disponibles = cartas_disponibles - 2;
        chequearCartasDisponibles();
    } else {
        var caja1 = document.querySelectorAll(".carta-memotest[data-carta='" + fichas_jugadas[0] + "']");
        var caja2 = document.querySelectorAll(".carta-memotest[data-carta='" + fichas_jugadas[1] + "']");
        
        caja1.item(0).classList.remove("notclick");
        caja2.item(0).classList.remove("notclick");
        caja1.item(1).classList.remove("notclick");
        caja2.item(1).classList.remove("notclick");
        
        var ficha1 = document.querySelectorAll(".carta-memotest[data-carta='" + fichas_jugadas[0] + "'] img");
        var ficha2 = document.querySelectorAll(".carta-memotest[data-carta='" + fichas_jugadas[1] + "'] img");
        
        setTimeout(function(){ 
            ficha1.item(0).classList.add("visibility-hidden");
            ficha2.item(0).classList.add("visibility-hidden");
            ficha1.item(1).classList.add("visibility-hidden");
            ficha2.item(1).classList.add("visibility-hidden");
        
        }, 500);
    }
    
    cambiarJugador();
}

function chequearCartasDisponibles() {
    if (cartas_disponibles == 0) {
        juego_terminado = true;
        if (fichas_j1 == fichas_j2) {
            //Empate
            caja_j1[0].classList.add("fondo-win");
            caja_j2[0].classList.add("fondo-win");
            ganador.innerHTML = "Empate!";
            seccion_memotest.classList.add('display-none');
            btn_reset.classList.remove("display-none");
        } else {
            sumarPuntos();
        }
    }
}

function cambiarJugador(){

    if(jugador == 1){
        jugador = 2;
    } else{
        jugador = 1;
    }
}

function sumarPuntosParciales() {

    if (jugador == 1) {
        fichas_j1++;
        cartas_recolectadas1.innerHTML = "Cartas: " + fichas_j1;
    } else {
        fichas_j2++;
        cartas_recolectadas2.innerHTML = "Cartas: " + fichas_j2;
    }
}

function sumarPuntos() {

    if(dificultad == "facil") {
        darPuntosAGanador(5);
    } else {
        darPuntosAGanador(10);
    }
}

function darPuntosAGanador(puntos) {
    if (juego_terminado) {
        if (fichas_j1 > fichas_j2) {
            eliminarEstiloTurno();
            ganador.innerHTML = 'Ganaste Jugador ' + jugador;
            
            caja_j1[0].classList.add("fondo-win");
            var puntos_actual = Store.load('puntos1');
            Store.save('puntos1', puntos_actual + puntos);
            puntos1.innerHTML= "Puntaje:" + Store.load('puntos1');
        } else {
            eliminarEstiloTurno();
            ganador.innerHTML = 'Ganaste Jugador ' + jugador;
            caja_j2[0].classList.add("fondo-win");
            var puntos_actual = Store.load('puntos2');
            Store.save('puntos2', puntos_actual + puntos);
            puntos2.innerHTML= "Puntaje:" + Store.load('puntos2');
        }
    }

    seccion_memotest.classList.add('display-none');
    btn_reset.classList.remove("display-none");
}

function resetearJuego() {

    window.location.href = "memotest.html";
}