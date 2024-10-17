
// ejercicio 1 cambiar valor a un array constante
const colores = ['rojo','verde','azul'];
console.log(colores);
colores[1] = 'amarillo';
console.log(colores);

// ejercicio 2 recorrer arrays tras eliminar
let paises = ['España','Francia','Alemania','Italia'];
for(let i=0; i<3; i++){
    console.log(paises[i]);
}
delete paises[0];
console.log('una vez cambiado...');
for(let i=0; i<3; i++){
    console.log(paises[i]);
}

// ejercicio 3 mayores de edad
let nombres = ['Sandra','Ariel','Paula','Celia','Mario'];
let edades = [19,10,15,26,32];
let mayoresDeEdad = [];

for(let indice in nombres){
    if(edades[indice] > 18){
        mayoresDeEdad[mayoresDeEdad.length] = nombres[indice];
    }
}

console.log(mayoresDeEdad);

// ejercicio 4 palíndromos
const palabras = ['ana','radar','javascript','reconocer','oro','palindromo','salas'];
let palindromos = [];

for(let palabra of palabras){

    let comprobar = true;
    let tamaño=palabra.length;
    let mitad = parseInt(tamaño/2);
    
    for(let i=0; i<mitad; i++){
        let letra = palabra.charAt(i);
        if(letra != palabra.charAt(tamaño-(i+1))){
            comprobar = false;
            break;
        } else {
           comprobar = true;
        }
        
    }

    if(comprobar == true){
        palindromos[palindromos.length] = palabra; 
    }
}
console.log(palindromos);