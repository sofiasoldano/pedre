/* Elementos */
var comenzar_app = document.getElementById('comenzar-app');

/* Eventos */
comenzar_app.addEventListener('click', function(){
    redirigirPagina('settings.html');
}, false);

formulario.addEventListener('click', function(){
    redirigirPagina('juegos.html');
}, false);

/* Funciones */

function redirigirPagina(pagina) {
    window.location.href = pagina;
}