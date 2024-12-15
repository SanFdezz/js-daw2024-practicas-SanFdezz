const lista = ['Figura', 'Perro', 'Lámpara', 'Abanico', 'Rampa', 'Zapatilla', 'Hermano', 'Bolso', 'Gula', 'Manta'];
const parrafo = document.getElementById('lista');
parrafo.textContent = lista;

setTimeout(function (){
    let result = confirm('Quieres que aparezca la lista ordenada?')
    if(result){
        lista.sort();
        parrafo.textContent = lista;
    }
},3000);












