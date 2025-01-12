// codigo para gestionar las cookies
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
        atras.disabled = true;
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
        atras.disabled = false;
    });
}


// esto hace que se carguen las preguntas en la tabla al entrar a la pagina
document.addEventListener('DOMContentLoaded', () => {
        mostrar();
});

function mostrar() {
    //vacio la tabla adrede para reescribirla
    tabla.innerHTML = ''; 
    // creo los campos de la tabla
    const encabezado = document.createElement('tr');
    encabezado.innerHTML = `
        <th>PREGUNTA</th>
        <th>RESPUESTA</th>
        <th>PUNTUACION</th>
        <th>ESTADO</th>`;
    tabla.appendChild(encabezado); // y lo añado a la tabla
    // creo una fila por cada pregunta sacada de la cookie
    cookie.preguntas.forEach(pregunta => {
        const fila = document.createElement('tr');
        pregunta.forEach(dato => {
            const info = document.createElement('td');
            info.textContent = dato;
            fila.appendChild(data);
        });
        // le añado el estado, en este caso a 'OK!' xq ya esta guardado.
        const estadoCell = document.createElement('td');
        estadoCell.textContent = 'OK!';
        row.appendChild(estadoCell);
        tabla.appendChild(row); // y lo añado a la fila
    });
}


// creo el evento de guardar, donde va a estar la promesa:
grabar.addEventListener('click', () => {
    // creo la fila nueva donde voy a añadir la pregunta a guardar
    const nuevaFila = document.createElement('tr');

    // y sus datos:
    const preguntaTabla = document.createElement('td');
    preguntaTabla.textContent = pregunta.value;
    nuevaFila.appendChild(preguntaTabla);

    const respuestaTabla = document.createElement('td');
    respuestaTabla.textContent = checkVerdadero.checked ? 'verdadero' : 'falso'; // si el verdadero esta activo, se guarda como verdad y si no, como falso.
    nuevaFila.appendChild(respuestaTabla);

    const puntuacionTabla = document.createElement('td');
    puntuacionTabla.textContent = puntuacion.value;
    nuevaFila.appendChild(puntuacionTabla);

    const estadoTabla = document.createElement('td');
    estadoTabla.textContent = 'Guardando...'; // antes de guardar se pone como guardando...
    nuevaFila.appendChild(estadoTabla);

    tabla.appendChild(nuevaFila); //añado la fila a la tabla existente

    //por ultimo, ejecutar las promesas
    delay()
        .then(() => {
            return guardar();
        })
        .then(() => {
            estadoTabla.textContent = 'OK!'; //si se ha podido guardar:
        })
        .catch(() => {
            estadoTabla.textContent = 'ERROR!'; //si no:
        });
});


