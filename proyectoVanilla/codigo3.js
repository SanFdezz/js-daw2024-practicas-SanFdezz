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

// creamos esto para que los campos de checkbox no se puedan activar a la vez, si algo es verdad, que no pueda ser mentira a su vez.
const checkVerdadero = document.getElementById('verdadero');
const checkFalso = document.getElementById('falso');
const puntuacion = document.getElementById('puntos');
const pregunta = document.getElementById('pregunta');
const grabar = document.getElementById('grabar');
const atras = document.getElementById('atras');
const tabla = document.getElementById('tabla');
const cargando = document.getElementById('cargando');
// para obtener el nombre del usuario que inicio sesion.
const user = sessionStorage.getItem('usuarioActual');
const soloNum = /^[0-9]$/; // para que la puntuacion solo sea del 0 al 9
let cookie = JSON.parse(getCookie(user));
let contador = 0;
let buenaPunt = false;
let buenaPreg = false;
let checked = false;
let respuesta;

// creo el temporizador para simular los 5 segundos de carga
let timeout = setTimeout(()=>{
    cargando.hidden = true;
    tabla.hidden = false;
},5000);


pregunta.addEventListener('blur',()=>{
if(pregunta.value != ''){
    buenaPreg = true;
    } else {
        buenaPreg = false;
    }

    if(buenaPreg && buenaPunt && checked){
        grabar.disabled = false;
    } else {
        grabar.disabled = true;
    }

});

puntuacion.addEventListener('blur', () => {
    if(soloNum.test(puntuacion.value)){
        puntuacion.style.border = 'solid green 2px';
        puntuacion.style.borderRadius = '5px';
        buenaPunt = true;
    } else {
        puntuacion.style.border = 'solid red 2px';
        puntuacion.style.borderRadius = '5px';
        buenaPunt = false;
    }

    if(buenaPreg && buenaPunt && checked){
        grabar.disabled = false;
    } else {
        grabar.disabled = true;
    }

});  

checkVerdadero.addEventListener('change',()=>{
    if(checkVerdadero.checked){
        checkFalso.checked = false;
        checked = true;
    }else{
        checked = false;
    }

    if(buenaPreg && buenaPunt && checked){
        grabar.disabled = false;
    } else {
        grabar.disabled = true;
    }

});

checkFalso.addEventListener('change',()=>{
    if(checkFalso.checked){
        checkVerdadero.checked = false;
        checked = true;
    }else{
        checked = false;
    }

    if(buenaPreg && buenaPunt && checked){
        grabar.disabled = false;
    } else {
        grabar.disabled = true;
    }

});

atras.addEventListener('click',()=>{
    window.location.href = "pantalla2.html";
});

function guardarPregunta(){
    pregunta.value;
    puntuacion.value;
    if(checkVerdadero.checked){
        respuesta = 'verdadero';
    } else {
        respuesta = 'falso';
    }
}










// esto es lo último a realizar, que sera quien tenga los .then y .catch de la promesa
grabar.addEventListener('click',()=>{

});