// variables que voy a usar:
const inicio = document.getElementById('inicio');
const body = document.querySelector('body');
const registro = document.getElementById('registro');
const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const button = document.getElementById('btn');
button.disabled = true;
let firstTime = true;

// para detectar si las teclas presionadas son las adecuadas
body.addEventListener('keydown', (event) => {
    if(firstTime){
        if (event.ctrlKey && event.key == 'b') {
            inicio.textContent = '';
            registro.style.visibility = 'visible';
            clearTimeout(espera); 
            firstTime = false;
        }
    }
});

// si no se pulsan las teclas, a los 5s se cargara la pagina igualmente
const espera = setTimeout(() => {
    inicio.textContent = '';
    registro.style.visibility = 'visible';
    firstTime = false;
}, 5000);

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

// comienza mi código.
const correo = document.getElementById('correo');
const error = document.getElementById('error');

// para saber si el correo es aceptable o no
correo.addEventListener('blur', () => {
    if(regex.test(correo.value)){
        error.style.visibility = 'hidden';
        correo.style.border = 'solid green 2px';
        correo.style.borderRadius = '5px';
        button.disabled = false;
    } else {
        error.style.visibility = 'visible';
        correo.style.border = 'solid red 2px';
        correo.style.borderRadius = '5px';
        button.disabled = true;
    }
});    

// para guardar la informacion en la cookie de sesion.
registro.addEventListener('submit', function(event) {
    event.preventDefault();
    if(getCookie('userInfo') != ''){
        console.log('existe la cookie');
    } else {
        console.log('no existe la cookie');
        const infoJSON = {
            correo: correo.value,
            ultimaConexion: Date.now(),
            preguntas:[]
        }
        const userInfo = JSON.stringify(infoJSON);
        setCookie(correo.value,userInfo,7);
    }
    sessionStorage.setItem('usuarioActual',correo.value);
    window.location.href = "pantalla2.html";
});


