function filtro(array,funcion){
    return funcion(array);
}

function multiplicarX2(numeros){
    for (let i=0; i<numeros.length; i++) {
        numeros[i] *= 2;
    }
    return numeros;
}

function mayusculas(palabras){
    for(let i=0; i<palabras.length; i++){
        palabras[i] = palabras[i].toUpperCase();
    }
    return palabras;
}

let nums = [1,2,3,4];

let res = filtro(nums,multiplicarX2);
console.log(res)

let palabras = ['hola','mesa','oso'];

let mayus = filtro(palabras,mayusculas);
console.log(palabras)