
var mapaDeNumeros = new Map();

for(let i=1; i<11; i++){
    mapaDeNumeros.set(i,0);
}

for(let i=0; i<10000; i++){
    let numeroRandom = Math.floor(Math.random()*10)+1;
    let cantidadNumeros = mapaDeNumeros.get(numeroRandom);
    mapaDeNumeros.set(numeroRandom,(cantidadNumeros+1));
}

for(let [clave,valor] of mapaDeNumeros){
    console.log('Numero '+clave+': '+valor);
}
