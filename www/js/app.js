var nro_jugador;

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
    //Lo nuevo
    Store.save('puntos1',0);
    Store.save('puntos2',0);
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
    foto1.src           = Store.load("imagenjugador1");
    foto2.src           = Store.load("imagenjugador2");
}