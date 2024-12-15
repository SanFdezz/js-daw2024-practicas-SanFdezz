// parte de copia/pega de los apuntes:

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

// parte del código hecho por mi:
const btn = document.getElementById('enviar');
const formulario = document.getElementById('formulario');
const bloque = document.getElementById('bloque');

if(getCookie('nombre')==''){
    formulario.style.visibility= 'visible';
    bloque.style.visibility='hidden';
    btn.addEventListener('click',()=>{
        const nombre = document.getElementById('nombre').value;
        setCookie('nombre',nombre,7);
    });
} else {
    formulario.style.visibility ='hidden';
    bloque.style.visibility='visible';
    bloque.textContent = 'Hola '+getCookie('nombre');
}

