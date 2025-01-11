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
const cargando = document.getElementById('cargando');
const soloNum = /^[0-9]$/; // para que la puntuacion solo sea del 0 al 9
// para obtener el nombre del usuario que inicio sesion.
const tabla = document.getElementById('tabla');
const usuario = sessionStorage.getItem('usuarioActual');
let cookie = JSON.parse(getCookie(usuario));
let contador = 0;
let buenaPunt = false;
let buenaPreg = false;
let checked = false;
var respuesta;
let token = false;

// creo el temporizador para simular los 5 segundos de carga
if(token){
    setTimeout(()=>{
        cargando.hidden = true;
        tabla.hidden = false;
    },5000);
} else {
    cargando.hidden = true;
    tabla.hidden = false; 
}

// para detectar si la pregunta esta aceptada

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

// para que solo se acepte una puntuacion adecuada

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

// checkFalso y checkVerdadero son para q no se puedan seleccionar ambos a la vez

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

// volvemos atras si queremos
atras.addEventListener('click',()=>{
    window.location.href = "pantalla2.html";
});


// funcion para detectar si era falso o verdadero
function guardarPregunta(){
    pregunta.value;
    puntuacion.value;
    if(checkVerdadero.checked){
        respuesta = 'verdadero';
    } else {
        respuesta = 'falso';
    }
}

//funciones asincronas

// para crear el delay de guardado
function delay(){
    return new Promise((resolve)=>{
        setTimeout(()=>{
            resolve('Guardando...');
        },5000);
    });
}

// para poder guardar la info introducida en las cookies
function guardar(){
    return new Promise((resolve)=>{
        guardarPregunta();
        let info = [pregunta.value,respuesta,puntuacion.value];
        console.log(info);
        cookie.preguntas.push(info);
        let nuevaCookie = JSON.stringify(cookie);
        setCookie(usuario,nuevaCookie,7)
        resolve('OK!');
    });
}


// esto es lo último a realizar, que sera quien tenga los .then y .catch de la promesa
grabar.addEventListener('click', () => {
    delay()
        .then(() => guardar()) // Llama a la función guardar después del delay
        .then((mensaje) => console.log(mensaje)) // no falla
        .catch((error) => console.log(error)); // si hay error
});