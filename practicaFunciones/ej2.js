var palabras = pedirPalabras();

var mapa = new Map();
palabras.forEach(function(palabra){
    if(mapa.has(palabra)){
        let cantidad = mapa.get(palabra);
        mapa.set(palabra,cantidad+1);
    } else {
        mapa.set(palabra,1);
    }
});

const lista = document.getElementById("mapaPalabras");

mapa.forEach(function(valor,clave){
    const item = document.createElement("li"); 
    item.textContent = clave+': '+valor;
    lista.appendChild(item);
});