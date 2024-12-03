const imagen = document.getElementById('imagen');
const body = document.querySelector('body');

body.addEventListener('keydown',(event) => {
    if(event.ctrlKey && event.key == 'F12'){
        imagen.style.backgroundImage = 'url(https://picsum.photos/2000/1000)';
    }
});





