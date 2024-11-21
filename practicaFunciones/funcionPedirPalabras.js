function pedirPalabras(){
    var palabras = [];
    while(true){
        let palabra = window.prompt('Introduce una palabra');
        if(palabra==""||palabra==null){
            break;
        }
        palabras.push(palabra);
    }
    return palabras;
}