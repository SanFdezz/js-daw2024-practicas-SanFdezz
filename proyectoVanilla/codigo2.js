// las funciones para crear cookies, obtenerlas y borrarlas son las proporcionadas en el apartado de COOKIES del tema 9

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function deleteCookie(cname) {
    document.cookie = cname+'=; expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/';
}

// creo las variables que voy a usar
const textFecha = document.getElementById('ultimaEntrada');
const textSaludo = document.getElementById('saludo');
const userActual = sessionStorage.getItem('usuarioActual');
const cookie = JSON.parse(getCookie(userActual));
console.log(cookie);
const fecha = new Date();
fecha.setTime(cookie.ultimaConexion);
const dia = fecha.getDate();
const mes = fecha.getMonth()+1;
const anyo = fecha.getFullYear();
const hora = fecha.getHours();
const min = fecha.getMinutes();

// creo lo que va a decir la pagina
textSaludo.textContent = 'Hola, '+userActual;
textFecha.textContent = 'La última vez que entraste fue el '+dia+'-'+mes+'-'+anyo+' a las '+hora+':'+min;

// y envio a la pagina 3 si se presiona el boton adecuado.
document.getElementById('btn').addEventListener('click',()=>{
    window.location.href = "pantalla3.html";
});
