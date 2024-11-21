var palabras = pedirPalabras();
var palabrasSinRepetidos = new Set(palabras);
palabras = [...palabrasSinRepetidos];

palabras.sort((a,b)=>b.localeCompare(a));
console.log(palabras);

const lista = document.getElementById("listaPalabras");

palabras.forEach(palabra => {
    const item = document.createElement("li"); 
    item.textContent = palabra;
    lista.appendChild(item);
});