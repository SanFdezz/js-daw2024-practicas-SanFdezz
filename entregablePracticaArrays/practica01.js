
var boletos = new Array();

for(let i=0; i<50;i++){
    var combinacion = new Set();
    while(true){
        let numero = Math.floor(Math.random() * 49) + 1;
        combinacion.add(numero);
        if(combinacion.size == 6){
            break;
        }
    }
    let boleto = [...combinacion];
    boletos.push(boleto);
}

console.log('Boletos de lotería:');
boletos.forEach(function(numero,indice){
    console.log((indice+1)+': '+numero);
});