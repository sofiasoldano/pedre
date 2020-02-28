/* Elementos */

var jugador         = Math.floor(Math.random()*2) +1;
var casilleros      = document.getElementsByClassName('casillero');
var juego_terminado = false;
var casilla         = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
                      ];
var ganador         = document.getElementById('ganador'); 
var btn_reset       = document.getElementById('btn-reset');
var movimientos     = 0;
var puntos_jugador1 = document.getElementById('puntos1'); 
var puntos_jugador2 = document.getElementById('puntos2'); 
var caja_j1         = document.getElementsByClassName('caja-j1');
var caja_j2         = document.getElementsByClassName('caja-j2');

/* Eventos */

// Recorro Casilleros
for (var i = 0; i < casilleros.length; i++) {
    casilleros[i].addEventListener('click', jugada);
}

btn_reset.addEventListener('click', resetearJuego);

/* Funciones */

//Funcion para que, al Iniciar, ya se sepa de quien es el turno
estilizarTurnoJugador();

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

function jugada() {
    if(!juego_terminado) {
        // Si el casillero contiene la clase Jugado = Ya fue utilizado
        if(this.classList.contains('jugado')){

            console.log("No me pueden usar, tengo una jugada");
        } else {

            // Se agrega la clase Jugado
            this.classList.add("jugado");

            // Se crea Elemento H2
            var jugada = document.createElement("h2");
            
            // Compruebo Jugador
            if (jugador == 1) {
                estilizarTurnoJugador();
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
                estilizarTurnoJugador();
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
        }
    } else {
        return false
    }
}

function comprobarGanador() {

	for(var i=0; i<3;i++) {

		//Si es Horizontal
		if (casilla[i][0] === jugador && casilla[i][1] === jugador && casilla[i][2] === jugador) {
            eliminarEstiloTurno();
            ganador.innerHTML = 'Ganaste Jugador ' + jugador;

            btn_reset.classList.remove("display-none");
            
            var jugada_1 = document.querySelectorAll(".casillero[data-fila='"+ i +"'][data-columna='0']");
            var jugada_2 = document.querySelectorAll(".casillero[data-fila='"+ i +"'][data-columna='1']");
            var jugada_3 = document.querySelectorAll(".casillero[data-fila='"+ i +"'][data-columna='2']");
            jugada_1.item(0).classList.add("fondo-ganador");
            jugada_2.item(0).classList.add("fondo-ganador");
            jugada_3.item(0).classList.add("fondo-ganador");

            juego_terminado = true;
            sumarPuntos();
			return false;
        }

		//Si es vertical
		if (casilla[0][i] === jugador && casilla[1][i] === jugador && casilla[2][i] === jugador) {
            eliminarEstiloTurno();
            ganador.innerHTML = 'Ganaste Jugador ' + jugador;

            btn_reset.classList.remove("display-none");
            
            var jugada_1 = document.querySelectorAll(".casillero[data-fila='0'][data-columna='"+ i +"']");
            var jugada_2 = document.querySelectorAll(".casillero[data-fila='1'][data-columna='"+ i +"']");
            var jugada_3 = document.querySelectorAll(".casillero[data-fila='2'][data-columna='"+ i +"']");
            jugada_1.item(0).classList.add("fondo-ganador");
            jugada_2.item(0).classList.add("fondo-ganador");
            jugada_3.item(0).classList.add("fondo-ganador");
            
            juego_terminado = true;
            sumarPuntos();
			return false;
		}		  	
    }

    //Si es diagonal 
    if (casilla[0][0] === jugador && casilla[1][1] === jugador && casilla[2][2] === jugador){
        eliminarEstiloTurno();
        ganador.innerHTML = 'Ganaste Jugador ' + jugador;

        btn_reset.classList.remove("display-none");
        
        var jugada_1 = document.querySelectorAll(".casillero[data-fila='0'][data-columna='0']");
        var jugada_2 = document.querySelectorAll(".casillero[data-fila='1'][data-columna='1']");
        var jugada_3 = document.querySelectorAll(".casillero[data-fila='2'][data-columna='2']");

        jugada_1.item(0).classList.add("fondo-ganador");
        jugada_2.item(0).classList.add("fondo-ganador");
        jugada_3.item(0).classList.add("fondo-ganador");

        juego_terminado = true;
        sumarPuntos();
        return false;
    }

    //Si es diagonal invertida
    if (casilla[0][2] === jugador && casilla[1][1] === jugador && casilla[2][0] === jugador){
        eliminarEstiloTurno();
        ganador.innerHTML = 'Ganaste Jugador ' + jugador;

        btn_reset.classList.remove("display-none");
        
        var jugada_1 = document.querySelectorAll(".casillero[data-fila='0'][data-columna='2']");
        var jugada_2 = document.querySelectorAll(".casillero[data-fila='1'][data-columna='1']");
        var jugada_3 = document.querySelectorAll(".casillero[data-fila='2'][data-columna='0']");

        jugada_1.item(0).classList.add("fondo-ganador");
        jugada_2.item(0).classList.add("fondo-ganador");
        jugada_3.item(0).classList.add("fondo-ganador");

        juego_terminado = true;

        sumarPuntos();
        return false;
    }

    //Si es empate
    if (movimientos === 9 && juego_terminado !== true) {
        eliminarEstiloTurno();
        juego_terminado = true;
        ganador.innerHTML = 'Empate';
        btn_reset.classList.remove("display-none");
        var puntos_actual = Store.load('puntos1');
            Store.save('puntos1', puntos_actual + 1);
        var puntos_actual = Store.load('puntos2');
            Store.save('puntos2', puntos_actual + 1);
    }
}

function sumarPuntos() {
    if (juego_terminado) {
        if (jugador == 1) {
            var puntos_actual = Store.load('puntos1');
            Store.save('puntos1', puntos_actual + 2);
            puntos_jugador1.innerHTML= Store.load('puntos1');
        } else {
            var puntos_actual = Store.load('puntos2');
            Store.save('puntos2', puntos_actual + 2);
            puntos_jugador2.innerHTML= Store.load('puntos2');
        }
    }
}

function resetearJuego() {

    for (var i = 0; i < casilleros.length; i++) {
        casilleros[i].innerHTML = "";
        casilleros[i].classList.remove('jugado');
        casilleros[i].classList.remove('fondo-ganador');
    }
    ganador.innerHTML = "";
    movimientos = 0;
    btn_reset.classList.add("display-none");
    casilla = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
    ];
    juego_terminado = false;
    estilizarTurnoJugador();
}

