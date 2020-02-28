var nro_jugador;
var apodos_random = ["TheRealWinner", "GamerProfessional", "DeathlyGood", "MagicMind", "Rockandroller", "TimeTraveller"];
var apodos_seleccionados = [];

// Libreria Local Storage
var Store = {
	load: function(key) {
		return JSON.parse(window.localStorage.getItem(key));
	},
	save: function(key, obj) {
		window.localStorage.setItem(key, JSON.stringify(obj));
	},
	dele: function(key) {
		window.localStorage.removeItem(key);
	},
	kill: function(){
		window.localStorage.clear();
	}
};

if(document.getElementsByClassName('page-settings').length != 0){
    
    // Cargo Imagenes Por Default
    if (Store.load("imagenjugador1") == null) { 
        Store.save("imagenjugador1", "img/usuario.jpg");
    }
    if (Store.load("imagenjugador2") == null) { 
        Store.save("imagenjugador2", "img/usuario.jpg");
    }

    // Elementos Formulario

    var nombre1         = document.getElementById("nombre1").value;
    var nombre2         = document.getElementById("nombre2").value;
    var apodo1          = document.getElementById("apodo1").value;
    var apodo2          = document.getElementById("apodo2").value;
    var guardar_form    = document.getElementById("guardar_form");
    var localStorage    = window.localStorage;

    /* Eventos */

    guardar_form.addEventListener('click', submitSettings);
    
}

/* Funciones */

function submitSettings() {

    Store.save("nombre1",   document.getElementById("nombre1").value);
    Store.save("nombre2",   document.getElementById("nombre2").value);
    Store.save("apodo1",    document.getElementById("apodo1").value);
    Store.save("apodo2",    document.getElementById("apodo2").value);
    Store.save('puntos1',0);
    Store.save('puntos2',0); 
    validarForm();
}

function validarForm() {
    
    shuffleApodos();

    if (Store.load("nombre1") == "") { 
        Store.save("nombre1", "Jugador 1");
    }
    if (Store.load("nombre2") == "") { 
        Store.save("nombre2", "Jugador 2");
    }
    if (Store.load("apodo1") == "") { 
        Store.save("apodo1", apodos_seleccionados[0]);
    }
    if (Store.load("apodo2") == "") { 
        Store.save("apodo2", apodos_seleccionados[1]);
    }
    //if(Store.load("apodo2",apodos_random[random]))
}

function shuffleApodos() {

    for (var i = 0; i <= 1; i++) {
        var random = Math.floor(Math.random() * apodos_random.length);
        apodos_seleccionados.push(apodos_random[random]);
        apodos_random.splice(random, 1);
    }
}

if(document.getElementsByClassName('page-juegos').length != 0){
    var nombre1         = document.getElementById("nombre1");
    var nombre2         = document.getElementById("nombre2");
    var apodo1          = document.getElementById("apodo1");
    var apodo2          = document.getElementById("apodo2");
    var foto1           = document.getElementById("imgjugador_1");
    var foto2           = document.getElementById("imgjugador_2");


    nombre1.innerHTML   = Store.load("nombre1");
    nombre2.innerHTML   = Store.load("nombre2");
    apodo1.innerHTML    = Store.load("apodo1");
    apodo2.innerHTML    = Store.load("apodo2");
    puntos1.innerHTML   = Store.load("puntos1");
    puntos2.innerHTML   = Store.load("puntos2");
    foto1.src           = Store.load("imagenjugador1");
    foto2.src           = Store.load("imagenjugador2");
}

if(document.getElementsByClassName('page-tateti').length != 0){
    var nombre1         = document.getElementById("nombre1");
    var nombre2         = document.getElementById("nombre2");
    var apodo1          = document.getElementById("apodo1");
    var apodo2          = document.getElementById("apodo2");
    var foto1           = document.getElementById("imgjugador_1");
    var foto2           = document.getElementById("imgjugador_2");


    nombre1.innerHTML   = Store.load("nombre1");
    nombre2.innerHTML   = Store.load("nombre2");
    apodo1.innerHTML    = Store.load("apodo1");
    apodo2.innerHTML    = Store.load("apodo2");
    puntos1.innerHTML   = "Puntaje: " + Store.load("puntos1");
    puntos2.innerHTML   = "Puntaje: " + Store.load("puntos2");
    foto1.src           = Store.load("imagenjugador1");
    foto2.src           = Store.load("imagenjugador2");
}

if(document.getElementsByClassName('page-memotest').length != 0){
    var nombre1         = document.getElementById("nombre1");
    var nombre2         = document.getElementById("nombre2");
    var apodo1          = document.getElementById("apodo1");
    var apodo2          = document.getElementById("apodo2");
    var foto1           = document.getElementById("imgjugador_1");
    var foto2           = document.getElementById("imgjugador_2");


    nombre1.innerHTML   = Store.load("nombre1");
    nombre2.innerHTML   = Store.load("nombre2");
    apodo1.innerHTML    = Store.load("apodo1");
    apodo2.innerHTML    = Store.load("apodo2");
    puntos1.innerHTML   = "Puntaje: " + Store.load("puntos1");
    puntos2.innerHTML   = "Puntaje: " + Store.load("puntos2");
    foto1.src           = Store.load("imagenjugador1");
    foto2.src           = Store.load("imagenjugador2");
}

// Perfiles

function cargarDatos(jugador) {
    var nombre         = document.getElementById("nombre"+jugador);
    var apodo          = document.getElementById("apodo"+jugador);
    var foto           = document.getElementById("imgjugador_"+jugador);

    nombre.value   = Store.load("nombre"+jugador);
    apodo.value    = Store.load("apodo"+jugador);
    foto.src       = Store.load("imagenjugador"+jugador);
}

function submitSettingsPerfiles(jugador) {
    if(confirm("¿Está seguro? Si modifica los datos se reiniciarán los puntos.")){
        Store.save("nombre"+jugador,   document.getElementById("nombre"+jugador).value);
        Store.save("apodo"+jugador,    document.getElementById("apodo"+jugador).value);
        Store.save('puntos'+jugador,0);
        validarForm();
    } else {
        return false
    }
}