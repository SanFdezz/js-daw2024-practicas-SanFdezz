
// obtengo el elemento para mostrar la cuenta atras.
const cuentaAtras = document.getElementById("cuentaAtras");
// creo mi propia funcion timeout a modo de promesa, para poderla usar con async
function timeout(ms){
    return new Promise((res)=>{setTimeout(res,ms)});
}

// el async y el await es para poder hacer la cuenta atras
async function iniciarCuentaRegresiva() {

    // creo el contador para ir creando la cuenta atrás
    let cont = 5;

    while (cont >= 0) {
        cuentaAtras.textContent =cont;
        await timeout(1000); // aqui uso mi timeout
        cont--;
    }

    let permiso = Notification.permission;
    if (permiso === 'default') {
        Notification.requestPermission().then((resp) => {
            if (resp === 'granted') {
                mostrarNotificacion();
            }
        });
    } else if (permiso === 'granted') {
        mostrarNotificacion();
    }

}



function mostrarNotificacion() {
    let notificacion = new Notification('¡Nuevo video!', {
        body: '¡Puedes ir a verlo haciendo click!',
    });
    // Evento que se dispara al hacer clic en la notificación
    notificacion.addEventListener('click', () => {
        window.open('video.html');
    });
}


document.addEventListener('DOMContentLoaded', iniciarCuentaRegresiva);