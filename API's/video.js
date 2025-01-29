const video = document.getElementById("miVideo");
const duracion = document.getElementById("duracion");

video.addEventListener("click", function(event) {
    if (event.button === 0) { 
        if (video.paused) {
            video.play();
        } else {
            video.pause();
        }
    }
});


video.addEventListener("contextmenu", function(event) {
    event.preventDefault();  
    const tiempo = video.duration;
    const min = Math.floor(tiempo / 60);
    const sec = Math.floor(tiempo % 60);
    duracion.textContent = 'Tiempo total: '+min+'m '+sec+'s';
});


